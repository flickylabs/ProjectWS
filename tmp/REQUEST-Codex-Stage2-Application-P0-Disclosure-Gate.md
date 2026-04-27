# REQUEST — Codex-Dev Stage 2 적용: P0-disclosure-gate (87 → 0) + Final Closing

**상태**: **v1 확정** — GPT Pro Stage 2 산출물 + CT 보정 4건 완료 / 자동 검증 PASS / 사용자 승인 / Codex-Dev 진입 대기.

**의뢰일**: 2026-04-27 (v1 확정)
**요청자**: ClaudeCode CT-Main
**상위 의뢰서**: `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (commit `3973ac6`)
**GPT Pro 의뢰서**: `tmp/REQUEST-GPT-Pro-Stage2-P0-Disclosure-Gate.md` (v2 / 87건)
**기준 SHA**: `6d18c63` 또는 그 이후 (Phase B Route Simulator merge — origin/main 최신)
**Stage 1 closing**: `de3ad48` + tag `baseline-pre-policy-v3-stage1`
**작업 본질**: GPT Pro Stage 2 산출물 + CT 보정본을 적용 → Gate 재실행 → P0-disclosure-gate findings 0 → **단일 commit에 두 tag 동시 발행 (Stage 2 closing = Final P0 closing)**

---

## 1. 본질

상위 v2 의뢰서의 **Stage 2 closing 세션** + **Final P0 closing**입니다. patch 본문은 GPT Pro + CT 보정으로 사전 확정. Codex-Dev는 **적용·재실행·검증·commit·두 tag 동시·push**만 수행합니다.

**Final closing 정책 (사용자 결정 (α) 정합)**:
- Stage 2 closing이 곧 final P0 closing. Stage 3은 Stage 1 cross-effect로 auto-closed (`6d18c63` detection 재실행 검증 완료) → 별도 patch X.
- 단일 commit에 두 tag 동시 발행:
  - `baseline-pre-policy-v3-stage2` (단계 tag)
  - `baseline-pre-policy-v3` (final tag)

scope:
- P0-disclosure-gate 87건만
- P0-evidence-stage-gate (Stage 1 closing 완료 / 0 유지 검증) / P0-surface-name-gate (Stage 3 auto-closed / 0 유지 검증) / RC4 / P1 / P2 X
- runtime 코드 / 정책 docs / Gate runner / API proxy X
- 다른 사건(`_LEGACY_84CASES_*`) X

---

## 2. 진입 조건

```bash
git pull origin main
git log --oneline -1                    # HEAD = 6d18c63 또는 그 이후
git status --short --branch             # tracked dirty 0
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
git show baseline-pre-policy-v3-stage1 --stat --no-patch  # tag 정합 확인
npm run check:all                       # PASS — hard 0
npm run build:pc                        # PASS
npx tsc -b --force                      # PASS
```

PASS 후 진행. tracked dirty / hard > 0 / build fail / tag 불일치 시 즉시 중단 + CT-Main 보고.

---

## 3. 입력 자료

### 3.1 적용 입력 (필수 / GPT Pro 산출물 + Claude 보정 4건 적용 완료)
- **`tmp/qa-codex-integrated-script-patch-v2-results/stage2-patch-output.json`** (v1 확정)
- 구조 (Stage 1 schema 정합):
  ```jsonc
  {
    "meta": {
      "source": "tmp/GPT-Pro-Stage2-P0-Disclosure-Gate-PACKET/output/stage2_patch_output.json (via tmp/GPT_output/ourput.json)",
      "revisedAt": "2026-04-27",
      "revisedBy": "CT-Main (Claude)",
      "revisionPolicy": "option-2-policy-a (Stage 2 v2 / 인물명 보존 / stance·judge 톤 보존)",
      "revisionCount": 4,
      "revisedIds": ["QARG-00919", "QARG-01208", "QARG-01209", "QARG-00589"],
      "totalItems": 87,
      "notes": "Stage 1 closing (de3ad48) 후 87건 재산정. 정책 (a) 정합 — 인물명 보존, matchedLexemes만 surface 대체. judge hard 톤 / 화자 stance 강도 보존."
    },
    "items": [ /* 87 patch object — 4건 ct-revised flag */ ]
  }
  ```
- 각 item 핵심 필드: `id`, `clusterId`, `sourcePath`, `textField`, `caseId`, `evidenceId`, `evidenceStage`, `lieBand`, `lieState`, `matchedLexemes`, `detectorCategory`, `channel`, `original`, `patched`, `preservation` (5 항목), `rationale`, `confidenceFlags`

### 3.1.1 CT 보정 4건 (정책 (a) 정합 / 인물명 보존 + stance / judge 톤 보존)

| id | cluster | matchedLexemes | 보정 본질 |
|---|---|---|---|
| QARG-00919 | C4-family-factory-funds | `공장 자금` | 인물명 `윤정후 씨` 보존 + judge 단언 강도 (`근거가 있었습니다`) 보존 |
| QARG-01208 | C6-tail-friend-01 | `예비신랑이 먼저` | 화자 stance (`거절했습니다` → `분명히 선을 그었습니다`) 보존 |
| QARG-01209 | C6-tail-friend-01 | `예비신랑이 먼저` | 화자 자기 인식 (`먼저 접근한 사람처럼 남았습니다`) 원문 그대로 |
| QARG-00589 | C6-tail-spouse-01 | `위임장 조작` | judge hard 톤 + 단언 (`범죄입니다` → `중대한 법적 책임이 따릅니다`) 보존 |

모두 `confidenceFlags: ["ct-revised"]` 표시. truth lexeme 재도입 0 / 9차원 정합 / 자동 검증 재실행 PASS.

### 3.2 입력 dataset (참고 / Codex-Dev read-only)
- `tmp/REQUEST-GPT-Pro-Stage2-P0-Disclosure-Gate-dataset.json` (87 items / 8 cluster)

### 3.3 검증 스크립트 (Codex-Dev 사전 검증용)
- `tmp/scripts/verify-stage-output.cjs --stage 2`
- 자동 검증 항목 9종 (다음 §5에 명시)

### 3.4 GPT Pro 의뢰서 + Stage 1 컨텍스트 (참고)
- `tmp/REQUEST-GPT-Pro-Stage2-P0-Disclosure-Gate.md` (v2)
- `tmp/qa-codex-integrated-script-patch-v2-results/stage1-application-log.md` (Stage 1 application log / `de3ad48`)
- `tmp/qa-codex-integrated-script-patch-v2-results/stage1-patch-output.json` (commit `7eaad2e`)

### 3.5 Detection (변경 비교 baseline / `6d18c63` 시점)
- `tmp/qa-runtime-gate-results/findings.json` (1,757 findings)
- `tmp/qa-runtime-gate-results/patch-priority.md`

### 3.6 정책
- `docs/disclosure-policy.md` v1.1 (§4.1·4.2·4.3 paraphrase / §3.2·3.3 Truth Throttle / §5.2 lieState)
- `docs/information-surface-policy.md` v1.1 (§2.1 surface-only / §2.5·5.5 fallback)
- `CLAUDE.md`

### 3.7 Source data (적용 대상)
- `src/data/scriptedText/{spouse-01,family-01,friend-01}.json`
- `src/data/cases/generated/{spouse-01,family-01,friend-01}.json`
- `src/data/disclosurePolicy/{spouse-01,family-01,friend-01}.json`
- `src/data/emergenceHooks.ts` (read-only / 본 단계 emergence_event 채널 2건은 emergenceHooks 정합 영역)

---

## 4. Scope

### 4.1 적용 대상 분포 (87건 / 8 cluster)

cluster별 (의뢰서 §3 정합):

| cluster | count | 주 channel |
|---|---|---|
| C1 spouse-formal-family `형네` | 16 | dossier 16 |
| C2 spouse-family-circumstance `가족 사정` | 15 | judge_evidence_combo / judge_question / 등 |
| C3 family-birth-secret | 17 | dossier 13 / judge 3 / interrogation 1 |
| C4 family-factory-funds `공장 자금` | 8 | judge_evidence_combo / judge_witness_summon / judge_question |
| C5 spouse-nephew-care | 15 | dossier 12 / interrogation 2 / judge_evidence_combo 1 |
| C6-tail-spouse-01 | 2 | judge_contradiction / judge_question |
| C6-tail-family-01 | 8 | interrogation / case_data |
| C6-tail-friend-01 | 6 | dossier / judge_question |
| **합계** | **87** | |

### 4.2 적용 X (final closing 정합)

- **P0-evidence-stage-gate**: Stage 1 closing 완료 (`de3ad48`) — 회귀 검증만 수행 (0 유지)
- **P0-surface-name-gate**: Stage 3 auto-closed by Stage 1 cross-effect — 회귀 검증만 수행 (0 유지)
- P1 / P2 / RC4 / 다른 사건 / runtime / Gate runner / 정책 / pc.css / API proxy / `_LEGACY_*` X

---

## 5. 사전 자동 검증 (Codex-Dev 적용 전 필수)

### 5.1 검증 스크립트 실행

```bash
node tmp/scripts/verify-stage-output.cjs --stage 2 \
  --output tmp/qa-codex-integrated-script-patch-v2-results/stage2-patch-output.json \
  --dataset tmp/REQUEST-GPT-Pro-Stage2-P0-Disclosure-Gate-dataset.json
```

### 5.2 사전 검증 결과 (CT 보정 적용 후 / `2026-04-27` 시점)

```
=== Stage 2 GPT Pro Output Verification ===
[1] item count: dataset=87, output=87                                ✓ PASS
[2] id missing: 0, extra: 0                                          ✓ PASS
[3] order mismatch: 0                                                ✓ PASS
[4] original == patched (must be 0): 0                               ✓ PASS
[5] matchedLexemes leak in patched (must be 0): 0                    ✓ PASS
[6] preservation issues: 0                                           ✓ PASS
[7] rationale empty (must be 0): 0                                   ✓ PASS
[8] confidenceFlags set: 4 (ct-revised — Stage 2 4건 보정)            ⓘ WARN (CT 검토 완료)
[9] cluster surface consistency                                      ✓ 양호

=== RESULT === PASS — all auto-verification checks succeeded.
(WARNINGS above require Claude/CT manual review before Codex-Dev application — already resolved.)
```

### 5.3 cluster surface 일관성 (sample / 8 cluster)

| cluster | count | surface 일관 |
|---|---|---|
| C1 형네 | 16 | 그 댁 / 그쪽 |
| C2 가족 사정 | 15 | 그쪽 일 / 사정 |
| C3 출생 비밀 / 배다른 | 17 | 그 사실 / 가족사 / 깎아내리는 말 |
| C4 공장 자금 | 8 | 사업 자금 |
| C5 조카 / 가족을 돕는 | 15 | 친척 아이·그 아이 / 그 일 |
| C6-tail-family 유서 | 8 | 그 문서 / 문서에 손댄 |
| C6-tail-friend | 6 | 접촉의 선후 / 그때의 입장 / 갚지 못한 흐름 |
| C6-tail-spouse | 2 | 그 서류 처리 / 그쪽으로 전달 |

### 5.4 검증 실패 시
- 즉시 적용 중단 + CT-Main 보고
- `confidenceFlags: ["ct-revised"]` warning은 CT 보정 완료 표시 — 적용 진행 가능
- 다른 flag (예: `context-uncertain`)는 추가 보정 필요

---

## 6. 적용 절차

### 6.1 알고리즘 (Stage 1 정합 / sourcePath traversal)

```
for each item in stage2-patch-output.json.items:
  1. sourcePath 파싱 (sourceKind 별 형식)
  2. 파일 read + JSON parse
  3. JSON path traversal (channels.X.entries[key=Y].variants[id=Z] 또는 evidence.e-X.partyContext... 등)
  4. 대상 객체의 textField 값 == item.original (정합 검증)
     - 일치: textField = item.patched
     - 불일치: 즉시 중단 + item.id 보고 (drift 영역)
  5. 모든 item 처리 후 파일 write (JSON pretty-print 정합 / EOL 보존)
```

### 6.2 sourcePath 형식 (Stage 1 정합)

#### scriptedText (대다수)
```
src/data/scriptedText/{caseId}.json:channels.{channel}.entries[key={entryKey}].variants[id={variantId}]
```
entryKey 안에 `|` 포함 → 그대로 string 매칭. textField는 `text` / `behaviorHint`.

#### caseData
```
src/data/cases/generated/{caseId}.json:{path}
```
path 예: `evidence.e-X.partyContext.b.implication`, `evidence.e-X.investigationStages[idx].question.text`, `evidence.e-X.discoveryText.surfaceFallback`, 등.

#### disclosurePolicy (소수)
```
src/data/disclosurePolicy/{caseId}.json:evidence.e-X.{surfaceName|surfaceDescription|paraphraseSet[idx]}
```

#### emergenceHooks (소수)
```
src/data/emergenceHooks.ts:hooks[id].text
```
> 주: `emergenceHooks.ts`는 TypeScript 영역. 본 의뢰서에서 변경 X 가정 (emergence_event 채널 2건이 본 cluster에 있을 경우 GPT Pro/CT가 patched에 동일 텍스트 출력 또는 `confidenceFlags: ["needs-runtime-decision"]`로 표시 — 후자라면 적용 X / CT 보고).

### 6.3 Drift 영역 처리

`6d18c63` 시점 detection 기준이라 본 단계 진입 시 source data 변경 없음 가정. 단:
- Stage 2 application 이전에 다른 commit이 main에 들어가면 drift 발생 가능
- drift 발생 시 즉시 중단 + drift item.id + 현재 source 값 + item.original 차이 보고

### 6.4 적용 후 검증 (사후)

```bash
node scripts/qa-runtime-gate.cjs
```

종료 조건 (final closing):

| 검증 항목 | 종료 조건 |
|---|---|
| **P0-disclosure-gate findings** | **87 → 0** ✓ |
| **P0-evidence-stage-gate** | **0 유지** (Stage 1 결과 보존) ✓ |
| **P0-surface-name-gate** | **0 유지** (Stage 3 auto-closed 영역 / 재오염 X) ✓ |
| 다른 묶음 (P1 / P2 / RC4) | 회귀 0 |
| 전체 finding 변화 | 1,757 → 약 1,670 (87 감소) 정합 |
| 새로운 P0 generation | 0 |

```bash
npm run check:all                       # PASS — hard 0
npm run build:pc                        # PASS
npx tsc -b --force                      # PASS
```

> Phase B route simulator도 회귀 검증 권장:
> ```bash
> npm run qa:route                        # P0 0 / P1 9 (evidence_investigate_no_npc_followup) / P2 0
> ```

### 6.5 commit + 두 tag 동시 + push (사용자 결정 (α) 정합)

```bash
git add src/data/scriptedText/{spouse-01,family-01,friend-01}.json \
        src/data/cases/generated/{spouse-01,family-01,friend-01}.json \
        src/data/disclosurePolicy/{spouse-01,family-01,friend-01}.json \
        tmp/qa-runtime-gate-results/ \
        tmp/qa-codex-integrated-script-patch-v2-results/stage2-application-log.md

git commit -m "fix(scripts): close P0-disclosure-gate findings (87 -> 0)"

# 두 tag 동시 발행 (단일 commit / final closing)
git tag baseline-pre-policy-v3-stage2
git tag baseline-pre-policy-v3

git push origin main
git push origin baseline-pre-policy-v3-stage2
git push origin baseline-pre-policy-v3
```

CT-Main 보고:
- new HEAD SHA
- 두 tag (`baseline-pre-policy-v3-stage2` + `baseline-pre-policy-v3`)
- Gate findings 변화 (before / after / category별)
- 회귀 검증 결과 (Stage 1 / Stage 3 / Phase B)
- drift 발생 여부 + 처리

---

## 7. application log (작성 필수)

`tmp/qa-codex-integrated-script-patch-v2-results/stage2-application-log.md`

다음 항목 포함 (Stage 1 application log 정합):
- Date / Worktree / Branch / Input / Scope
- Application section: packet items / applied / drift / skipped / resolver note / post-gate correction
- Applied counts: by file / by field / by cluster
- Runtime Gate: baseline (1,757 findings) → after application
- Final closing: 두 tag 발행 + final 정합

---

## 8. Write Scope

### 8.1 변경 OK
- `src/data/scriptedText/{spouse-01,family-01,friend-01}.json` (Stage 2 patch 대상 variant text/behaviorHint만)
- `src/data/cases/generated/{spouse-01,family-01,friend-01}.json` (Stage 2 patch 대상 evidence 필드만)
- `src/data/disclosurePolicy/{spouse-01,family-01,friend-01}.json` (Stage 2 patch 대상 surface 영역만)
- `tmp/qa-runtime-gate-results/*` (Gate 재실행 결과 갱신)
- `tmp/qa-codex-integrated-script-patch-v2-results/stage2-application-log.md` (NEW)
- baseline anchor tags `baseline-pre-policy-v3-stage2` + `baseline-pre-policy-v3`

### 8.2 read-only / 변경 X
- `tmp/qa-codex-integrated-script-patch-v2-results/stage2-patch-output.json` (입력)
- `tmp/REQUEST-GPT-Pro-Stage2-P0-Disclosure-Gate.md` / `*-dataset.json` (입력)
- `tmp/qa-codex-integrated-script-patch-v2-results/stage1-patch-output.json` (Stage 1 결과 / 변경 X)
- `tmp/qa-codex-integrated-script-patch-v2-results/stage1-application-log.md` (Stage 1 log / 변경 X)
- runtime 본체 / `src/data/emergenceHooks.ts`
- `scripts/qa-runtime-gate.cjs` / `scripts/qa-route-simulator.cjs` (Phase B 트랙)
- 정책 docs / pc.css / API proxy
- baseline anchor v1 / v2 / v3-stage1

### 8.3 절대 변경 X
- `_LEGACY_84CASES_DO_NOT_REFERENCE/` 어떤 자료도 참조 X
- `VITE_OPENAI_API_KEY` / `OPENAI_API_KEY` 참조 X
- secret / 실제 키 / 사용자 PII 출력 X
- LLM 실호출 X
- patch 본문 추가 창작 / 임의 조정 X (입력 JSON `patched` 그대로 적용)
- Stage 1 application 결과 영역 침범 X
- Stage 3 별도 patch X (auto-closed / final verification만)
- 보류 untracked 영역 (sweep 의뢰서 2종 / handoff 등) commit X / 삭제 X

---

## 9. 절대 회피선

### 사용자 명시
- patch 본문 추가 창작 X — 입력 JSON `patched` 필드 그대로
- 9차원 의미 정확성 위반 X (정책 (a) 정합 — 인물명 보존)
- 진실 누설 X (truth lexeme 재도입 X)
- baseline anchor v1/v2/v3-stage1 변경 X
- Stage 3 별도 적용 X
- 두 tag 동시 발행 정책 (α) 위반 X

### 운영
- drift 발생 시 임의 처리 X — 즉시 중단 + 보고
- Phase B route simulator 회귀 검증 (qa:route P1 9 유지) 정합
- 같은 shared worktree에 다른 active 세션 동시 X (별도 worktree 정합)

---

## 10. 종료 조건

### 10.1 사전 자동 검증 (CT 영역 / 적용 의뢰 전 완료)
- [x] **사전 자동 검증 PASS** (`verify-stage-output.cjs --stage 2` / 87 PASS / `ct-revised` 4건 / `2026-04-27`)
- [x] **CT 보정 4건 적용 완료** (`QARG-00919` / `QARG-01208` / `QARG-01209` / `QARG-00589`)
- [x] **cluster surface 일관성 검토 PASS** (8 cluster)

### 10.2 Codex-Dev 적용 후 검증 (Codex-Dev 영역)
- [ ] 87 patch item 모두 적용 (drift 0 또는 보고 후 결정)
- [ ] Gate findings (final closing 검증):
  - [ ] **P0-disclosure-gate = 0 (87 → 0)**
  - [ ] **P0-evidence-stage-gate 0 유지** (Stage 1 결과 보존)
  - [ ] **P0-surface-name-gate 0 유지** (Stage 3 auto-closed 영역 / Stage 3 final verification)
  - [ ] 다른 묶음 (P1 / P2 / RC4) 회귀 0
- [ ] `npm run check:all` / `build:pc` / `tsc -b --force` PASS
- [ ] `npm run qa:route` PASS — P0 0 / P1 9 / P2 0 (Phase B 회귀 X)

### 10.3 commit + 두 tag 동시 + push (final closing)
- [ ] commit `fix(scripts): close P0-disclosure-gate findings (87 -> 0)` + push
- [ ] tag `baseline-pre-policy-v3-stage2` + push
- [ ] **tag `baseline-pre-policy-v3` (final / 단일 commit) + push**

### 10.4 보고
- [ ] `tmp/qa-codex-integrated-script-patch-v2-results/stage2-application-log.md` 작성
- [ ] CT-Main 보고 (commit hash + 두 tag + Gate findings 변화 + 회귀 검증 결과 + drift 영역)

---

## 11. 후속 (CT-Main 영역)

본 세션 closing (= Final P0 closing) 보고 후:
1. `6643035` spouse-01 단독 의뢰서: superseded 표시 commit (자료 가치 보존, 별도 commit / final closing 후 정리)
2. **Full Fast Test Finalization 의뢰서** (`tmp/REQUEST-Codex-Full-Fast-Test-Finalization.md`) 진입 — qa:fast 통합 npm script + consolidated summary
3. RC4 별도 의뢰서: `evidence_investigate` Gate spec 옵션 (i)/(iii) 진입 결정 시 (현재 옵션 (ii) 확정 / Phase B-3에서 P1 reclassify 완료)
4. P1-* (script-focus 822 / metadata 36 / surface-copy-hygiene 128) 별 의뢰서 (Stage 2 closing 후 후속)
5. P2-* (fallback 82 / korean polish 540) 별 일괄 트랙
6. wip branch cleanup (사용자 명시 보류 → 사용자 승인 후)

---

## 12. 관련 자료

### 본 단계 입력 / 산출물
- `tmp/qa-codex-integrated-script-patch-v2-results/stage2-patch-output.json` (입력 / GPT Pro + CT 보정 후 / Stage 1 schema 정합)
- `tmp/REQUEST-GPT-Pro-Stage2-P0-Disclosure-Gate.md` (v2 / 87건)
- `tmp/REQUEST-GPT-Pro-Stage2-P0-Disclosure-Gate-dataset.json`
- `tmp/scripts/verify-stage-output.cjs` (사전 자동 검증)

### 상위 / 병행
- `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (상위 / commit `3973ac6`)
- `tmp/REQUEST-Codex-Stage1-Application-P0-Evidence-Stage-Gate.md` (Stage 1 application 의뢰서 / commit `7eaad2e`)
- `tmp/qa-codex-integrated-script-patch-v2-results/stage1-application-log.md` (Stage 1 log)
- `tmp/REQUEST-Codex-Fast-Tester-Phase-B-Route-Simulator.md` (Phase B / commit `434fdba` / merged at `6d18c63`)

### Detection / audit
- `tmp/qa-runtime-gate-results/findings.json` (1,757 findings @ `6d18c63`)
- `tmp/qa-runtime-gate-results/patch-priority.md`
- `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md`

### Stage 3 (auto-closed)
- `tmp/REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate.md` (auto-closed v2 / final verification 절차 §0 명시)
- `tmp/REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate-dataset.json` (재오염 시 재활성화 자료)

### Superseded
- `tmp/REQUEST-Codex-Integrated-Script-Patch-Spouse-01-P0.md` (`6643035` — final closing 후 superseded 표시 commit)

### 정책
- `docs/disclosure-policy.md` v1.1
- `docs/information-surface-policy.md` v1.1
- `docs/spot-check-format.md`
- `CLAUDE.md`

### 메모리 (운영 Claude memory — repo-local 파일 X / CT 또는 사용자 동봉)
- `feedback_revision_meaning_over_form` / `feedback_truth_leak_prohibition` / `feedback_broad_homologous_detection` / `feedback_baseline_anchor_scripted_text` / `feedback_wrapper_baseline_is_head` / `feedback_use_gpt_pro` / `feedback_gpt_pro_claude_review`

---

**상태**: **v1 확정** — GPT Pro Stage 2 산출물 + CT 보정 4건 + 자동 검증 PASS. 사용자 승인 / Codex-Dev 진입 대기.

**완료된 CT 영역**:
- ✓ §3.1 meta `revisionCount: 4` / `revisedIds: [QARG-00919, QARG-01208, QARG-01209, QARG-00589]`
- ✓ §5 사전 자동 검증 PASS (87 / 87 / 9 항목 / cluster 8 일관성)
- ✓ §10.1 CT 영역 체크리스트 PASS

**Codex-Dev 영역 (진입 후 채움)**:
- §10.2 적용 후 Gate findings 검증
- §10.3 commit + 두 tag 동시 발행 (`baseline-pre-policy-v3-stage2` + `baseline-pre-policy-v3` final)
- §10.4 application log + CT-Main 보고
