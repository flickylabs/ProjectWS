# REQUEST — Integrated Script Patch v2 (All-Cases P0 Triage)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: P0 출시 차단
**기준 SHA**: `439cb5b` Expand runtime QA gate to all cases
**대체 대상**: `6643035` spouse-01 단독 의뢰서 (보존 / superseded)

---

## 1. 본질

`439cb5b` 시점에 3 사건 전수 sweep이 완료되어 P0 243건이 확정된 상황입니다. 본 의뢰서는 이 P0를 3 묶음으로 나누어 단계별로 닫는 통합 patch 절차를 정의합니다.

핵심 결정 사항:
- spouse-01 단독 의뢰서 `6643035`는 sweep 이전 기준이라 그대로 진입하지 않습니다. 자료 가치는 보존하되 본 의뢰서가 superset으로 대체합니다.
- patch 본문은 GPT Pro 세션을 거쳐 생성하고 Claude/Codex-Dev가 보정·적용·검증합니다. Codex-Dev가 단독으로 243건 문안을 대량 창작하지 않습니다.
- RC4 (`evidence_investigate` Gate spec / runtime contract)는 본 의뢰서에서 제외하고 별도 의뢰서로 분리합니다.

---

## 2. 진입 조건

```bash
git pull origin main
git log --oneline -1                    # HEAD = 439cb5b 또는 그 이후
git status --short --branch             # tracked dirty 0
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all                       # PASS — hard 0
npm run build:pc                        # PASS
npx tsc -b --force                      # PASS
```

PASS 후 진행. tracked dirty / hard > 0 / build fail 시 즉시 중단 + CT-Main 보고.

baseline anchor `baseline-pre-policy-v1` / `baseline-pre-policy-v2`는 보존합니다. v3 anchor는 단계별로 추가 생성합니다 (§7).

---

## 3. 분담

| 역할 | 담당 |
|---|---|
| 정책 / triage / 의뢰서 / commit 검토 / 단계 승인 | CT-Main |
| Detection 결과 (이미 완료) | Codex-Dev (`439cb5b`) |
| Patch 본문 생성 | GPT Pro 세션 (사용자 진행 / CT 의뢰서 작성) |
| Patch 본문 보정 | Claude (CT 보정 후 Codex-Dev에 전달) |
| Patch 적용 / Gate 재실행 / 검증 / commit / tag | Codex-Dev |
| 사용자 | scope 결정 / GPT Pro 세션 진행 / 단계별 commit 승인 |

---

## 4. 입력 자료

### 4.1 Detection 결과 (`439cb5b`, 본 의뢰서 기준 입력)
- `tmp/qa-runtime-gate-results/findings.json`
- `tmp/qa-runtime-gate-results/20260427-all-cases-summary.md`
- `tmp/qa-runtime-gate-results/patch-priority.md`
- `tmp/qa-runtime-gate-results/spouse-01-summary.md`
- `tmp/qa-runtime-gate-results/family-01-summary.md`
- `tmp/qa-runtime-gate-results/friend-01-summary.md`
- `tmp/qa-runtime-gate-results/channel-summary.md`

### 4.2 Phase A audit (참고 / RC1·2·3·5 root cause)
- `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md`
- `tmp/qa-codex-spouse-01-p0-patch-results/baseline-anchor-v3-proposal.md`

### 4.3 Superseded (보존 / 진입 X)
- `tmp/REQUEST-Codex-Integrated-Script-Patch-Spouse-01-P0.md` (`6643035`)

### 4.4 정책
- `docs/disclosure-policy.md` v1.1 (§4.1·4.2·4.3 paraphrase / §13 audit 패턴 / §3.2·3.3 매트릭스 / §5.2 lieState)
- `docs/information-surface-policy.md` v1.1 (§2.1 surface-only / §2.6 VFX / §5.5 fallback)
- `docs/spot-check-format.md` (8필드)
- `CLAUDE.md` (게임 핵심 / 한국어 품질)

### 4.5 메모리 / 잘못 패턴 (운영 Claude memory 참조 — repo-local 파일 X)

> 아래 항목은 Claude 운영 메모리 / 세션 규칙으로 관리되는 참조 자료입니다. repo 안에 동명의 파일이 존재하지 않으므로 구현 세션에서 파일 검색 시 찾을 수 없습니다. 본 의뢰서 적용 시 CT-Main 또는 사용자가 해당 메모리 본문을 별도로 전달합니다.

- `feedback_revision_meaning_over_form` (#6 9차원 의미 정확성)
- `feedback_truth_leak_prohibition` (#9 진실 누설 금지)
- `feedback_broad_homologous_detection` (#11 동형 광범위 검출)
- `feedback_static_analysis_limit` (#12 정적 분석 한계)
- `feedback_use_gpt_pro` (대량 콘텐츠 = GPT Pro 경유)
- `feedback_gpt_pro_claude_review` (GPT 산출물 = Claude 한국어 보정 후 적용)

### 4.6 코드 (read-only / 정합 확인용)
- `src/data/scriptedText/{spouse-01,family-01,friend-01}.json`
- `src/data/cases/generated/{spouse-01,family-01,friend-01}.json`
- `src/data/disclosurePolicy/{spouse-01,family-01,friend-01}.json`
- `src/data/emergenceHooks.ts`

---

## 5. Scope

### 5.1 대상
- 3 활성 사건: spouse-01 / family-01 / friend-01
- P0 243건만. P1 1,048 / P2 623 / RC4는 본 의뢰서 외 (§5.4 분리).

### 5.2 P0 3 묶음

| 단계 | 묶음 | total | 분포 (s/f/fr) | root cause | detector category |
|---|---|---|---|---|---|
| 1 | P0-evidence-stage-gate | 122 | 10 / 60 / 52 | RC2 | `evidence_stage_truth_description_exposure` |
| 2 | P0-disclosure-gate | 98 | 54 / 37 / 7 | RC1 + RC3 | `truth_lexeme_early_exposure` 31 / `surface_only_channel_truth_leak` 58 / `npc_truth_leak_s0_s2` 9 |
| 3 | P0-surface-name-gate | 23 | 0 / 20 / 3 | RC1 변형 | `locked_evidence_name_exposed` 19 / `surface_name_violation` 4 |

### 5.3 묶음별 patch 방향

#### 단계 1 — P0-evidence-stage-gate (122)
- **현상**: 진실 description이 `evidenceStage` 게이트 이전(early / mid stage 1·2)에 노출됨.
- **정책**: stage gate 정합 — early/stage1에서는 surfaceName + 추상 표현, deep stage(2~3)에서만 진실 lexeme 허용. `caseData.evidence[*].partyContext.{a,b}.implication` / `v3DepthPlan.excerpt.summary` / `description` / `investigationResults` 모두 stage 정합 검증.
- **주 채널**: `evidence_present` / `caseData.evidence`

#### 단계 2 — P0-disclosure-gate (98)
- **현상**: judge 채널(`judge_question`, `judge_contradiction`, `judge_evidence_combo`, `judge_witness_summon`, `dossier`)에 진실 lexeme이 등장. NPC S0~S2 단계에서 자백 게이트 이전에 truth 직접 노출(`interrogation`, `contradiction_pursuit`).
- **정책**:
  - judge surface-only 채널: surfaceName + 추상 / paraphrase set 안. 진실 lexeme 직접 X.
  - NPC S0~S2: paraphrase set 안. truth lexeme 직접 X. S3 이상에서만 단계적 노출.
- **주 채널**: judge_*, dossier, interrogation S0~S2, contradiction_pursuit S0~S2

#### 단계 3 — P0-surface-name-gate (23)
- **현상**: 잠금 상태 evidence가 `surfaceName` 대신 truth `name`으로 노출.
- **정책**: `caseData.evidence[*].surfaceName` ↔ `disclosurePolicy.evidence[*].surfaceName` 일치. ScriptedText의 evidence reference도 surfaceName 사용. `combinationLab.nodes.e-X.label` / `outputs.dc-X.judgeHint·summary` / `v3DepthPlan` summary도 surface 표현 정합.
- **주 채널**: `evidence_present` (family-01 위주)

### 5.4 분리 항목 (본 의뢰서 X)

| 분리 대상 | 사유 |
|---|---|
| P1-script-focus-review (`qa_mismatch_candidate` 822) | intent classifier / disputeId 매핑이 본질이라 ScriptedText 단순 patch로 닫히지 않음 |
| P1-script-metadata-review (36) | scripted entry metadata 정합 — 별도 정리 의뢰 |
| P1-surface-copy-hygiene (`internal_label_or_term_exposed` 128) | `behaviorHint` 등 내부 필드 — 별도 정리 |
| P2-fallback-polish (82) | polish 후순위 |
| P2-korean-polish (541) | 자동 정정 후보 — 별도 일괄 |
| **RC4 (`evidence_investigate` Gate spec)** | runtime contract / Gate spec 결정이 본질이라 별도 의뢰서로 분리. 본 sweep mode는 정적 scan이라 detector silent (route 미실행). Phase A audit의 3옵션은 별도 의뢰서에서 유지. |

---

## 6. Patch 정책

### 6.1 본문 생성 = GPT Pro 경유 (필수)
- Codex-Dev가 단독으로 243건 본문을 대량 창작하지 않습니다.
- 단계별 GPT Pro 세션은 CT-Main이 별도 의뢰서로 작성합니다 (단계 1 / 2 / 3 각각).
- Claude가 GPT 산출물을 한국어 자연성·게임 정합·9차원 의미 정확성 기준으로 보정한 뒤 Codex-Dev에 전달합니다.
- Codex-Dev는 받은 보정본을 적용하고 Gate 재실행·검증·commit·tag를 진행합니다.

### 6.2 9차원 의미 정확성 (`feedback #6` 기준)

보정·적용 시 다음 9 항목을 보존합니다:

1. **화자 / 청자 / 호칭** — `callTerms.toJudge` vs `toPartner` 구분, 합니다체/반말 톤
2. **상대 인물 / 쟁점 / 증거 target** — disputeId / evidenceId / target 그대로
3. **lieState / evidenceStage 진실 노출 단계** — Truth Throttle 표 정합
4. **질문 의도** — fact_pursuit는 사실 추궁, motive_search는 동기 탐색, empathy_approach는 공감 유지
5. **stance 강도** — defensive / confident / shaken / angry / resigned 그대로
6. **judge 톤 단계** — soft vs hard 구분
7. **새 증거 / 새 동기 / 부당한 확신 추가 X**
8. **한국어 자연성** — 조사·어절·문장 경계, `fixPostpositions()` 정합
9. **scope 한정** — 다른 사건 / runtime 코드 / 정책 docs / Gate runner 변경 X

### 6.3 진실 누설 금지 (`feedback #9` / CLAUDE.md 게임 핵심)
- 재판관 surface-only 채널에서 NPC 자백 이전 truth lexeme 직접 노출 금지
- evidence는 surfaceName, dossier 카드 의미는 추상화
- S0~S2 NPC 발화에서 paraphrase set 외 truth lexeme 직접 사용 금지

### 6.4 동형 검출 (`feedback #11`)
- 단계별 patch는 발견 case 단위가 아니라 **동형 lexeme 패턴 단위**로 처리
- GPT Pro 의뢰서에 동형 패턴 추출 결과 첨부 → 동일 패턴이 추가 등장 시 같은 회차에 일괄 처리
- patch 후 Gate 재실행으로 회귀 0 확인

---

## 7. 진행 절차 (3 단계 분할 commit)

### Stage 1 — P0-evidence-stage-gate (122)

1. CT-Main: GPT Pro 의뢰서 작성 → 사용자 GPT Pro 세션 진행 → 산출물 회수
2. Claude: 한국어 자연성·9차원 보정 → Codex-Dev에 전달
3. Codex-Dev:
   - patch 적용 (`src/data/scriptedText/*.json` + `src/data/cases/generated/*.json`)
   - `node scripts/qa-runtime-gate.cjs` 재실행
   - 종료 조건: P0-evidence-stage-gate findings = 0 / 다른 묶음 회귀 0
   - `npm run check:all` / `npm run build:pc` / `npx tsc -b --force` PASS
   - commit: `fix(scripts): close P0-evidence-stage-gate findings (122 → 0)`
   - tag: `baseline-pre-policy-v3-stage1`
   - push + CT-Main 보고 (commit hash + Gate findings 변화 + tag)

### Stage 2 — P0-disclosure-gate (98) [Stage 1 closing 후]

1. CT-Main: GPT Pro 의뢰서 작성 (RC1 + RC3 통합) → 세션 → 회수
2. Claude: 보정 → Codex-Dev 전달
3. Codex-Dev:
   - patch 적용
   - Gate 재실행 — P0-disclosure-gate = 0 / Stage 1 회귀 0
   - 검증 PASS
   - commit: `fix(scripts): close P0-disclosure-gate findings (98 → 0)`
   - tag: `baseline-pre-policy-v3-stage2`
   - push + 보고

### Stage 3 — P0-surface-name-gate (23) [Stage 2 closing 후]

1. CT-Main: GPT Pro 의뢰서 작성 → 세션 → 회수
2. Claude: 보정 → Codex-Dev 전달
3. Codex-Dev:
   - patch 적용 (`src/data/disclosurePolicy/*.json` 정합 포함)
   - Gate 재실행 — P0-surface-name-gate = 0 / Stage 1·2 회귀 0
   - 검증 PASS
   - commit: `fix(scripts): close P0-surface-name-gate findings (23 → 0)`
   - tag: `baseline-pre-policy-v3` (final)
   - push + 보고 (P0 243건 closing 종료)

---

## 8. Write Scope

### 8.1 변경 OK (각 단계 scope 안에서만)
- `src/data/scriptedText/{spouse-01,family-01,friend-01}.json` (P0 patch 대상 variant만)
- `src/data/cases/generated/{spouse-01,family-01,friend-01}.json` (단계 1·3 대상 필드만)
- `src/data/disclosurePolicy/{spouse-01,family-01,friend-01}.json` (단계 3 surfaceName 정합)
- `tmp/qa-codex-integrated-script-patch-v2-results/{stage1,stage2,stage3}.md` (단계별 검증 기록)
- baseline anchor v3 단계 tag 3종

### 8.2 read-only / 변경 X
- runtime 본체 (`useActionDispatch` / `judgeQuestionEngine` / `scriptedTextLoader` / `llmDialogueResolver` / `freeInterrogation` / `judgeProgressionEngine` 등)
- `src/data/emergenceHooks.ts` / `discoveryEngine` / `meterStagingV2` / `gameEventTriggerEngine`
- `scripts/qa-runtime-gate.cjs` (read 검증만 / detector 변경 X)
- `pc.css` / 정책 docs / API proxy / `VITE_OPENAI_API_KEY` 참조
- 다른 사건 (`_LEGACY_84CASES_DO_NOT_REFERENCE/` 절대 참조 X)
- `6643035` spouse-01 단독 의뢰서 (보존 / superseded 표시 외 변경 X)
- 보류 상태 `tmp/REQUEST-Codex-Runtime-Gate-AllCases-Sweep.md` / `tmp/PASTE-Runtime-Gate-AllCases-Sweep-FIRST-MESSAGE.md` (commit X / 삭제 X)

---

## 9. 절대 회피선

### 사용자 명시
- patch 본문 대량 창작 X (GPT Pro 경유 / `feedback_use_gpt_pro.md`)
- 9차원 의미 정확성 위반 X (`feedback #6`)
- 진실 누설 X (`feedback #9` / CLAUDE.md)
- 동형 검출 누락 X (`feedback #11`)
- RC4 / P1 / P2 영역 침범 X
- baseline anchor v1 / v2 변경 X
- ScriptedText 단순 키워드 치환 X — 의미 보존 우선

### CT 영역
- `_LEGACY_84CASES_DO_NOT_REFERENCE/` 어떤 자료도 참조 X
- runtime 본체 / Gate runner / API proxy 변경 X
- `VITE_OPENAI_API_KEY` / `OPENAI_API_KEY` 참조 X
- secret / 실제 키 / 사용자 PII 출력 X
- LLM sampling harness X / browser full playthrough harness X

### 운영
- 한 단계 closing 전에 다음 단계 진입 X (분할 commit 정합)
- 각 단계 closing 시 다른 단계 회귀 검증 필수
- 같은 shared worktree에서 tracked dirty 0으로만 진입

---

## 10. 종료 조건

- [ ] Stage 1 closing — P0-evidence-stage-gate = 0 / commit + tag `baseline-pre-policy-v3-stage1`
- [ ] Stage 2 closing — P0-disclosure-gate = 0 / commit + tag `baseline-pre-policy-v3-stage2`
- [ ] Stage 3 closing — P0-surface-name-gate = 0 / commit + tag `baseline-pre-policy-v3`
- [ ] P0 findings 0 (243 → 0)
- [ ] P1 / P2 / RC4 회귀 0 (본 의뢰서 외 scope이지만 데이터 회귀 점검)
- [ ] `npm run check:all` / `npm run build:pc` / `npx tsc -b --force` PASS (각 단계)
- [ ] 3 commit + 3 tag push 완료
- [ ] CT-Main 단계별 보고 완료

---

## 11. 후속 (본 의뢰서 closing 후 CT-Main 작업)

1. **RC4 별도 의뢰서**: `evidence_investigate` Gate spec / runtime contract 결정. Phase A audit 3옵션 유지:
   - (i) `evidence_investigate` 응답 커버리지를 위한 scoped runtime/Gate fix
   - (ii) Gate 재정의 — system-only를 response-required에서 제외
   - (iii) `investigationStages[].scriptedNpcResponses` 필드를 runtime + Gate 양쪽에 wire
2. **P1-script-focus-review** (`qa_mismatch_candidate` 822): intent classifier / disputeId 매핑 검토 의뢰서
3. **P1-script-metadata-review** (36): entry metadata 정합 의뢰서
4. **P1-surface-copy-hygiene** (128): `behaviorHint` 정리 의뢰서
5. **P2-fallback-polish** (82) / **P2-korean-polish** (541): 별도 일괄
6. **6643035 spouse-01 의뢰서**: superseded 표시 commit (자료 가치 보존, 진입 X)
7. **보류 상태 sweep 의뢰서 2종**: 그대로 보류 (commit X / 삭제 X). archive 가치 낮음으로 결정됨.

---

## 12. 관련 자료

### Detection (`439cb5b`)
- `tmp/qa-runtime-gate-results/findings.json` (1,914 findings)
- `tmp/qa-runtime-gate-results/20260427-all-cases-summary.md`
- `tmp/qa-runtime-gate-results/patch-priority.md`
- `tmp/qa-runtime-gate-results/{spouse-01,family-01,friend-01}-summary.md`
- `tmp/qa-runtime-gate-results/channel-summary.md`

### Phase A audit
- `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md`
- `tmp/qa-codex-spouse-01-p0-patch-results/baseline-anchor-v3-proposal.md`

### Superseded
- `tmp/REQUEST-Codex-Integrated-Script-Patch-Spouse-01-P0.md` (`6643035`)

### 정책
- `docs/disclosure-policy.md` v1.1
- `docs/information-surface-policy.md` v1.1
- `docs/spot-check-format.md`
- `CLAUDE.md`

### 메모리 (운영 Claude memory 참조 — repo-local 파일 X / CT-Main 또는 사용자가 본문 전달)
- `feedback_revision_meaning_over_form`
- `feedback_truth_leak_prohibition`
- `feedback_broad_homologous_detection`
- `feedback_static_analysis_limit`
- `feedback_use_gpt_pro`
- `feedback_gpt_pro_claude_review`

---

**상태**: v2 의뢰서 v1 작성 완료. CT-Main 검토 / 사용자 승인 / commit 대기.

**다음 단계 옵션**:
- (1) v2 의뢰서 commit + 단계 1 GPT Pro 의뢰서 작성 진행
- (2) v2 의뢰서 보강 / scope 조정
- (3) v2 의뢰서 commit + RC4 별도 의뢰서 우선 작성
