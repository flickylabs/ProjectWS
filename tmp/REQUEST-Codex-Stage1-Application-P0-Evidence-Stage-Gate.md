# REQUEST — Codex-Dev Stage 1 적용: P0-evidence-stage-gate (122 → 0)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**상위 의뢰서**: `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (commit `3973ac6`)
**GPT Pro 의뢰서**: `tmp/REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate.md` (commit `10f5aed`)
**기준 SHA**: `434fdba` 또는 그 이후
**작업 본질**: GPT Pro 산출물 + CT 보정본을 적용 → Gate 재실행 → P0-evidence-stage-gate findings 0 → commit + tag + push

---

## 1. 본질

상위 v2 의뢰서의 **Stage 1 closing 세션**입니다. patch 본문은 이미 생성·보정 완료되어 있고, Codex-Dev는 **적용·재실행·검증·commit·tag·push**만 수행합니다. patch 본문을 추가 창작하거나 임의 조정하지 않습니다.

scope:
- P0-evidence-stage-gate 122건만
- 입력: `tmp/qa-codex-integrated-script-patch-v2-results/stage1-patch-output.json` (122 items / GPT Pro + CT 4건 보정)
- 출력: 3 사건 source data 갱신 + Gate findings 0 + commit + tag `baseline-pre-policy-v3-stage1`

---

## 2. 진입 조건

```bash
git pull origin main
git log --oneline -1                    # HEAD = 434fdba 또는 그 이후
git status --short --branch             # tracked dirty 0 / untracked 보존
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all                       # PASS — hard 0
npm run build:pc                        # PASS
npx tsc -b --force                      # PASS
```

PASS 후 진행. tracked dirty / hard > 0 / build fail 시 즉시 중단 + CT-Main 보고.

---

## 3. 입력 자료

### 3.1 적용 입력 (필수)
- **`tmp/qa-codex-integrated-script-patch-v2-results/stage1-patch-output.json`**
  - 구조: `{ meta: {...}, items: [...] }`
  - `items` = 122 patch object
  - 각 item 필드:
    - `id`, `clusterId`, `caseId`, `evidenceId`, `evidenceStage`, `lieBand`, `matchedLexemes`
    - `sourcePath` (적용 경로 — Codex-Dev 적용 핵심 키)
    - `textField` (변경 대상 필드)
    - `original` (Detection 시점 본문)
    - `patched` (적용할 새 본문)
    - `preservation`, `rationale`, `confidenceFlags`
  - meta:
    - `revisionPolicy: option-2-policy-a`
    - `revisedIds`: `["QARG-01334", "QARG-00589", "QARG-01333", "QARG-01287"]` (CT 4건 보정 적용됨)

### 3.2 입력 dataset (참고)
- `tmp/REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate-dataset.json` (의뢰서 commit `10f5aed`)

### 3.3 Detection (변경 비교 baseline)
- `tmp/qa-runtime-gate-results/findings.json` (1,914 findings — `439cb5b`)
- `tmp/qa-runtime-gate-results/patch-priority.md`
- `tmp/qa-runtime-gate-results/{spouse-01,family-01,friend-01}-summary.md`

### 3.4 정책
- `docs/disclosure-policy.md` v1.1
- `docs/information-surface-policy.md` v1.1
- `docs/spot-check-format.md`
- `CLAUDE.md`

### 3.5 Source data (적용 대상)
- `src/data/scriptedText/{spouse-01,family-01,friend-01}.json`
- `src/data/cases/generated/{spouse-01,family-01,friend-01}.json`
- `src/data/disclosurePolicy/{spouse-01,family-01,friend-01}.json`

---

## 4. Scope

### 4.1 적용 대상 — 122 finding × `sourcePath` × `textField`

분포 (참고용):

| sourceKind | count | textField 예 |
|---|---|---|
| `scriptedText` | 80 | `text` 79 / `behaviorHint` 1 |
| `caseData` | 31 | `partyContext.implication` 11 / `description` 8 / `v3DepthPlan.summary` 3 / `investigationResults.request_original` 2 / `investigationStage.question.text` 1 / `discoveryText.surfaceFallback` 2 / `partyContext.questionAngle` 1 / `text` (system_message) ... |
| `disclosurePolicy` | 11 | `surfaceName` 9 / `surfaceDescription` 5 + |

case별:
- `spouse-01`: 10 patch
- `family-01`: 60 patch
- `friend-01`: 52 patch

### 4.2 적용 X (다른 트랙 / 다른 단계)

- P0-disclosure-gate (98) — Stage 2 영역
- P0-surface-name-gate (23) — Stage 3 영역
- P1-* (script-focus / metadata / surface-copy-hygiene)
- P2-* (fallback / korean polish)
- RC4 (`evidence_investigate` Gate spec) — Phase B 별도 트랙
- runtime 코드 / Gate runner / 정책 docs / pc.css / API proxy
- baseline anchor v1 / v2

---

## 5. 적용 절차

### 5.1 적용 알고리즘 (각 item)

```
for each item in stage1-patch-output.json.items:
  1. sourcePath 파싱 (예: "src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-7|early|request_original].variants[id=a-e-7-early-request_original-v4]")
  2. 파일 read + JSON parse
  3. JSON path traversal (channels.X.entries[key=Y].variants[id=Z]) → 대상 객체 위치 찾기
  4. 대상 객체의 textField (예: "text") 값 == item.original (정합 검증)
     - 일치 시: textField = item.patched로 교체
     - 불일치 시: 즉시 중단 + 해당 item.id 보고 (drift 영역)
  5. 모든 item 처리 후 파일 write (JSON pretty-print 정합 / EOL 보존)
```

### 5.2 sourcePath 파싱 규칙

3 sourceKind 별:

#### `scriptedText`
- 형식: `src/data/scriptedText/{caseId}.json:channels.{channel}.entries[key={entryKey}].variants[id={variantId}]`
- entryKey 안에 `|` 포함 → 그대로 string 매칭 (분리 X)
- `behaviorHint` field는 variant.behaviorHint, `text` field는 variant.text

#### `caseData`
- 형식: `src/data/cases/generated/{caseId}.json:{evidence|investigationStages|...path}`
- 예 1: `evidence.e-1.partyContext.b.implication`
- 예 2: `evidence.e-4.v3DepthPlan.excerpt.summary`
- 예 3: `evidence.e-5.investigationResults.request_original`
- 예 4: `evidence.e-1.investigationStages[0].question.text`
- 예 5: `evidence.e-1.discoveryText.surfaceFallback`

#### `disclosurePolicy`
- 형식: `src/data/disclosurePolicy/{caseId}.json:evidence.e-X.{surfaceName|surfaceDescription}`

> 파싱 시 `[idx]` 또는 `[key=...]` 형태 모두 처리. 정확한 path를 보장하려면 사전에 5건 spot 적용 후 결과 검증 권장.

### 5.3 Drift 영역 (item.original ≠ 현재 source 값)

Stage 1 patch는 `439cb5b` 시점 detection 기준입니다. 현재 HEAD가 `434fdba`이므로 그 사이에 source data 변경은 없어야 합니다 (Phase B 의뢰서는 source data 변경 X). 만약 drift 발생 시:

1. 즉시 적용 중단
2. drift 발생 item.id + 현재 source 값 + item.original 차이 보고
3. CT-Main이 검토 후 결정 (skip / 재보정 / 전체 재진행)

### 5.4 적용 후 검증

```bash
node scripts/qa-runtime-gate.cjs
```

종료 조건:
- **P0-evidence-stage-gate findings = 0** (122 → 0)
- 다른 P0 묶음(P0-disclosure-gate / P0-surface-name-gate) 회귀 0
- 전체 finding 변화: 1,914 → 약 1,792 (122 감소) 정합
- 새로운 P0 generation 0 (다른 detector에 걸리는 변경 X)

```bash
npm run check:all                       # PASS — hard 0
npm run build:pc                        # PASS
npx tsc -b --force                      # PASS
```

### 5.5 commit + tag + push

```bash
git add src/data/scriptedText/{spouse-01,family-01,friend-01}.json \
        src/data/cases/generated/{spouse-01,family-01,friend-01}.json \
        src/data/disclosurePolicy/{spouse-01,family-01,friend-01}.json \
        tmp/qa-runtime-gate-results/
git commit -m "fix(scripts): close P0-evidence-stage-gate findings (122 -> 0)"
git tag baseline-pre-policy-v3-stage1
git push origin main
git push origin baseline-pre-policy-v3-stage1
```

> 정확한 commit message는 의뢰서 §10.1 기준. emdash 영역은 ASCII `->`로 안전 처리.

CT-Main 보고:
- new HEAD SHA
- tag `baseline-pre-policy-v3-stage1`
- Gate findings 변화 (before / after)
- 회귀 검증 결과 (P0-disclosure-gate / P0-surface-name-gate 회귀 0)
- drift 발생 여부 (있었으면 처리 영역)

---

## 6. Write Scope

### 6.1 변경 OK (적용 대상)
- `src/data/scriptedText/{spouse-01,family-01,friend-01}.json` (Stage 1 patch 대상 variant text/behaviorHint만)
- `src/data/cases/generated/{spouse-01,family-01,friend-01}.json` (Stage 1 patch 대상 evidence 필드만)
- `src/data/disclosurePolicy/{spouse-01,family-01,friend-01}.json` (Stage 1 patch 대상 surfaceName/surfaceDescription만)
- `tmp/qa-runtime-gate-results/*` (Gate 재실행 결과 갱신)
- `tmp/qa-codex-integrated-script-patch-v2-results/stage1-application-log.md` (적용 로그 / drift 영역 / 통계)
- baseline anchor tag `baseline-pre-policy-v3-stage1`

### 6.2 read-only / 변경 X
- `tmp/qa-codex-integrated-script-patch-v2-results/stage1-patch-output.json` (입력 / 변경 X)
- `tmp/REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate.md` / `*-dataset.json` (입력 / 변경 X)
- runtime 본체 (`src/hooks/*` / `src/store/*` / `src/engine/*` / `src/components/*`)
- `src/data/emergenceHooks.ts`
- `scripts/qa-runtime-gate.cjs` / `scripts/qa-route-simulator.cjs` (Phase B 트랙 영역)
- 정책 docs / pc.css / API proxy
- baseline anchor v1 / v2

### 6.3 절대 변경 X
- `_LEGACY_84CASES_DO_NOT_REFERENCE/` 어떤 자료도 참조 X
- VITE_OPENAI_API_KEY / OPENAI_API_KEY 참조 X
- secret / 실제 키 / 사용자 PII 출력 X
- LLM 실호출 X
- 패치 본문 추가 창작 / 임의 조정 X (입력 JSON `patched` 그대로 적용)
- Stage 2/3 patch 영역 침범 X
- Phase B 트랙 산출물 / 의뢰서 / dataset 변경 X
- 보류 untracked 영역 (sweep 의뢰서 2종 / Phase A audit / handoff 3 / 본 의뢰서 외 PASTE) commit X / 삭제 X

---

## 7. 절대 회피선

### 사용자 명시
- patch 본문 추가 창작 X — 입력 JSON `patched` 필드 그대로
- 9차원 의미 정확성 위반 X
- 진실 누설 X (truth lexeme 재도입 X)
- baseline anchor v1/v2 변경 X
- ScriptedText / caseData / 정책 docs scope 외 변경 X

### 운영
- drift 발생 시 임의 처리 X — 즉시 중단 + 보고
- 같은 shared worktree에 Phase B 세션 동시 X (별도 worktree 정합)
- 보류 untracked 영역 변경 X

---

## 8. 종료 조건

- [ ] 122 patch item 모두 적용 (drift 0 또는 보고 후 결정)
- [ ] Gate findings: P0-evidence-stage-gate = 0 / 다른 P0 묶음 회귀 0 / 전체 finding 122 감소 정합
- [ ] `npm run check:all` / `build:pc` / `tsc -b --force` PASS
- [ ] commit `fix(scripts): close P0-evidence-stage-gate findings (122 -> 0)` + push
- [ ] tag `baseline-pre-policy-v3-stage1` + push
- [ ] `tmp/qa-codex-integrated-script-patch-v2-results/stage1-application-log.md` 작성 (적용 통계 / drift 영역 / Gate 결과 비교)
- [ ] CT-Main 보고 (commit hash + tag + Gate 결과 + drift)

---

## 9. 후속 (CT-Main 영역)

1. Stage 1 closing 보고 받은 후 → Stage 2 GPT Pro 의뢰서 (P0-disclosure-gate 98) 작성
2. `baseline-pre-policy-v3-stage1` tag 정합 확인 → Stage 2 진입 조건 수립
3. Phase B 트랙 spike 결과 받은 후 → Gate spec 옵션 결정 정리
4. 6643035 spouse-01 단독 의뢰서: superseded 표시 (Stage 3 closing 후 일괄 처리)

---

## 10. 관련 자료

### 본 단계 입력
- `tmp/qa-codex-integrated-script-patch-v2-results/stage1-patch-output.json` (122 items / GPT Pro + CT 4건 보정 / option-2-policy-a)
- `tmp/REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate.md` (GPT Pro 의뢰서 / commit `10f5aed`)
- `tmp/REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate-dataset.json`

### 상위 / 병행
- `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (상위 / commit `3973ac6`)
- `tmp/REQUEST-Codex-Fast-Tester-Phase-B-Route-Simulator.md` (병행 트랙 / commit `434fdba`)

### Detection / audit
- `tmp/qa-runtime-gate-results/findings.json` (1,914 findings / `439cb5b`)
- `tmp/qa-runtime-gate-results/{20260427-all-cases-summary.md, patch-priority.md, channel-summary.md, {caseId}-summary.md}`
- `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md` (RC2 root cause / 참고)
- `tmp/qa-codex-spouse-01-p0-patch-results/baseline-anchor-v3-proposal.md`

### 정책
- `docs/disclosure-policy.md` v1.1
- `docs/information-surface-policy.md` v1.1
- `docs/spot-check-format.md`
- `CLAUDE.md`

### Superseded
- `tmp/REQUEST-Codex-Integrated-Script-Patch-Spouse-01-P0.md` (`6643035` — 보존 / 진입 X / Stage 3 closing 후 superseded 표시)

### 메모리 (운영 Claude memory — repo-local 파일 X / CT-Main 또는 사용자 본문 동봉)
- `feedback_revision_meaning_over_form` (#6 9차원 의미 정확성)
- `feedback_truth_leak_prohibition` (#9)
- `feedback_broad_homologous_detection` (#11)
- `feedback_baseline_anchor_scripted_text` (baseline anchor 정합)
- `feedback_wrapper_baseline_is_head`

---

**상태**: Stage 1 적용 의뢰서 v1 작성 완료. 사용자 승인 / commit 대기.

**다음 단계 옵션**:
- (1) 본 의뢰서 commit + Codex-Dev Stage 1 적용 세션 진입 (PASTE 전달)
- (2) 의뢰서 보강 / scope 조정
