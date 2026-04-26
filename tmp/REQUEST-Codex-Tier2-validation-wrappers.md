# REQUEST: Tier 2 Validation Wrappers (Codex 주도)

**작성**: ClaudeCode CT (2026-04-27)
**근거**: Tier 1 종료 (spouse/family/friend 3 active case 정책 완성) → Tier 2 진입
**분담**: Codex 주도 / ClaudeCode CT 검수 / 사용자 최종 승인
**참조 의뢰서**: `tmp/REQUEST-Codex-Tier1-spouse-01-progression-d2-d3-d4-redraft.md` (인코딩 검증 학습)

---

## 0. 절대 회피 (가장 위)

### 0.1 정책 위반

- ❌ **runtime 코드 변경 X** — Tier 2 wrapper는 검증 전용 (`tmp/`)
- ❌ **`src/engine/`, `src/components/`, `src/hooks/`, `src/app/`, `src/store/` 어떤 파일도 import X**
- ❌ **`src/data/disclosurePolicy/*.json` runtime import X** (Tier 3 진입 전)
- ❌ **ScriptedText / caseData 자동 수정 X** — wrapper는 read-only
- ❌ **baseline-pre-policy-v1 (a10b801) 회귀 X**
- ❌ **Tier 1 정책 commits 변경 X**:
  - `19e4c4e` (spouse-01 schema)
  - `6ee9690` (spouse-01 progression)
  - `2dd17e2` (family-01)
  - `396b9fa` (friend-01)

### 0.2 인코딩 (spouse-01 사고 학습)

- ❌ **PowerShell here-string → node stdin 방식 금지**
- ✅ **apply_patch 또는 UTF-8 보장 방식**
- ✅ wrapper script 자체 한글 출력 시 UTF-8 명시

---

## 1. 목표

**Tier 2 검증 wrapper 3종 작성** — 기존 8 layer + 정책↔데이터 cross-check + Markdown↔JSON sync.

이번 단계 = 검증 layer 추가 (런타임 영향 0). 다음 단계 = Tier 2 안정 운영 30일 후 Tier 3 LLM/Fallback Guard 진입 검토.

---

## 2. 근거

- 정책 §10 향후 확장 — Tier 2 검증 wrapper
- 정책 §7.3 정책 변경 절차 — quality gate
- spouse-01 / family-01 / friend-01 cross-check.md 패턴 (검증 12~16 항목 반복) → 자동화
- baseline anchor: `baseline-pre-policy-v1` (a10b801)

---

## 3. 분담

| 영역 | 주도 | 검토 |
|---|---|---|
| 3종 wrapper 스크립트 작성 | Codex | ClaudeCode (출력 가독성 + 에러 처리) |
| 자체 검증 (3 case 모두 PASS 확인) | Codex | ClaudeCode (sample 재실행) |
| package.json npm scripts 등록 | Codex | ClaudeCode (명령 명확성) |
| 위치 결정 (tmp/ 초기) | Codex | ClaudeCode (안정 운영 후 scripts/quality/ 이전 시점 별도 결정) |

---

## 4. 산출물

### 4.1 필수 (blocker)

#### A. `tmp/run-all-checks.cjs` — 8 layer 단일 wrapper

**목적**: 기존 검증 layer 모두 단일 entry로 호출 + 종합 결과 출력.

**대상 (8 layer)**:
1. v6 liestate-flow (`tmp/codex-recovery-v6/precheck-liestate-flow.cjs`)
2. v6 evidence-unlock (`tmp/codex-recovery-v6/precheck-evidence-unlock.cjs`)
3. v6 archetype-quant (`tmp/codex-recovery-v6/precheck-archetype-quant.cjs`)
4. v6 meter-timing (`tmp/codex-recovery-v6/precheck-meter-timing.cjs`)
5. v3 stage-aware (`tmp/codex-recovery-v3/precheck-stage-aware.cjs`)
6. v4 qa-coherence (`tmp/codex-recovery-v4/precheck-qa-coherence.cjs`)
7. v5 broad-detection (`tmp/codex-recovery-v5/precheck-broad-detection.cjs`)
8. legacy precheck-matrix (`tmp/precheck-matrix.cjs`)
9. truth-leak detection (`tmp/detect-truth-leak.cjs`) — 추가 (실은 9 layer, 보고 표는 9건)

**출력 형식 (예시)**:
```
=== run-all-checks.cjs ===
baseline anchor: a10b8011...
generatedAt: 2026-04-27T...

[ ] truth-leak ............... PASS (0 leaks across 3 cases)
[ ] v6-liestate-flow ......... PASS (0 hard / 772 candidates)
[ ] v6-evidence-unlock ....... PASS
[ ] v6-archetype-quant ....... PASS
[ ] v6-meter-timing .......... PASS
[ ] v3-stage-aware ........... PASS
[ ] v4-qa-coherence .......... PASS
[ ] v5-broad-detection ....... PASS
[!] legacy-precheck-matrix ... WARN (10 known HIGH on family/friend d-5, baseline-known)

result: PASS (8/9 hard PASS, 1 warn known-issue)
exitCode: 0
```

**기능 요구사항**:
- 단일 명령 호출 (`node tmp/run-all-checks.cjs`)
- 9 layer 순차 실행 + 결과 집계
- exit code: hard FAIL 발견 시 1, 그 외 0
- 알려진 이슈 (precheck-matrix family/friend d-5 HIGH 10건) WARN 분류 — exit 0 유지
- 출력 = JSON option (`--json` 플래그)도 지원하면 가산점

**주의**:
- 각 layer 스크립트가 작성한 tracked JSON 결과 파일 (`tmp/codex-recovery-*/*.json` 등)을 갱신할 수 있음 — wrapper는 이 영향을 명시. 가능하면 임시 디렉토리에서 실행하거나 결과 비교만 하고 원래 상태 복원 (이전 의뢰들에서 본 패턴).
- **runtime 코드 import 0건** — wrapper도 read-only

#### B. `tmp/policy-vs-data-cross-check.cjs` — 정책 ↔ caseData/ScriptedText

**목적**: 3 case 정책 JSON의 각 영역이 실제 caseData/ScriptedText와 정합한지 검증.

**대상 (3 case)**:
- spouse-01 / family-01 / friend-01

**검증 항목** (각 case별):
1. **surfaceMap.evidence vs caseData.evidence**:
   - 모든 caseData evidence ID가 정책에 존재
   - `surfaceName` 일치 (정책의 surfaceName ↔ caseData의 surfaceName)
   - `name` 일치 (`name` 필드)

2. **surfaceMap.disputes vs caseData.disputes**:
   - 모든 caseData dispute ID가 정책에 존재
   - 정책 surface ↔ caseData name 의미 일치 (heuristic, exact match 안 됨)

3. **surfaceMap.witnesses vs caseData.duo.socialGraph**:
   - witness ID 일치 (없으면 정책에 명시된 sourceStatus와 cross-check)
   - friend-01: w-1 김세라 / w-2 박준혁 / w-3 오미경 → caseData socialGraph 정합

4. **forbiddenLexemes ↔ ScriptedText surface-only 채널**:
   - 채널 list (`judge_question` / `judge_contradiction` / `judge_evidence_combo` / `judge_witness_summon` / `system_message` / `dossier`)에서 forbiddenLexeme 노출 0건 검출
   - 검출 발견 시 sample 출력
   - 알려진 누설 0건 (baseline 시점)이라 새 위반 발견 시 즉시 FAIL

5. **lieStateGate.npcPolicies ↔ ScriptedText interrogation entries**:
   - 각 lieState별 차단 영역이 ScriptedText interrogation에서 위반 검출
   - 예: spouse-01 partyA S2 차단 lexeme이 `interrogation:a-d-1-S2-*` entries에 노출 X

6. **issueProgression.disputes.requiredEvidence vs caseData.evidence ID**:
   - 모든 requiredEvidence ID가 caseData에 존재
   - dangling reference 검출

7. **discoveryText.entries ↔ caseData.combinationLab / evidenceCombinations**:
   - inputs (e-X / stmt-Y) 가 실제 caseData에 존재
   - dangling reference 검출

**출력 형식**:
```
=== policy-vs-data-cross-check.cjs ===
baseline anchor: a10b801

[case spouse-01]
  surfaceMap.evidence: PASS (7/7 ID match)
  surfaceMap.disputes: PASS (4/4)
  surfaceMap.witnesses: PASS (3 policy-defined, no caseData socialGraph)
  forbiddenLexemes ↔ ScriptedText: PASS (0 violations across 6 channels)
  lieStateGate.npcPolicies ↔ ScriptedText: PASS
  issueProgression.requiredEvidence: PASS
  discoveryText.entries: PASS (7 combines validated)

[case family-01]
  ...

[case friend-01]
  ...

result: PASS (all 3 cases)
exitCode: 0
```

**기능 요구사항**:
- 3 case 순차 검증 + 종합 결과
- 각 검증 항목별 sample (FAIL 시) 출력
- exit code: hard FAIL 시 1
- caseData / ScriptedText 변경 X (read-only)

#### C. `tmp/policy-md-json-sync-check.cjs` — Markdown ↔ JSON sync

**목적**: `docs/disclosure-policy.md` 본문과 `src/data/disclosurePolicy/*.json` 정합 검증.

**Tier 1 단계 = 경고만 (정책 §8 명시)**. Tier 2 진입 후 quality gate. Tier 3+ release gate.

**검증 항목**:
1. **§2 채널 분류 ↔ JSON channelAuthority**:
   - Markdown § 2.1 surface-only 6채널 ↔ JSON surfaceOnly entries
   - § 2.2 lieStateDriven 9채널 ↔ JSON lieStateDriven
   - § 2.3 player-discovered 2채널 ↔ JSON playerDiscovered
   - § 2.4 자유 공개 1채널 ↔ JSON freeAfterVerdict

2. **§3.1 Truth Throttle 표 ↔ JSON lieStateGate.truthThrottle**:
   - S0~S5 행이 JSON에 모두 존재
   - 각 lieState의 amount/person/institution/truthLexemeAccess 일치 (heuristic)

3. **§3.3 채널 × lieState 교차표 ↔ JSON lieStateGate.channelMatrix**:
   - 표의 각 cell ↔ JSON channelMatrix 정합

4. **§4.1 spouse-01 surfaceMap 표 ↔ spouse-01.json surfaceMap**:
   - e-1~e-7 매핑 일치 (이번엔 spouse-01만 본문, family/friend는 보류)

5. **§11.1 감정·신뢰·누설 재정의 ↔ JSON issueProgression.principles.meterRole**:
   - emotion / trust / leak 재정의 텍스트 일치

**출력 형식 (Tier 1 단계, 경고만)**:
```
=== policy-md-json-sync-check.cjs ===
mode: WARN-ONLY (Tier 1 stage)

[§2 channel taxonomy]
  surface-only: 6 channels match (PASS)
  lieStateDriven: 9 channels match (PASS)
  ...

[§3.1 Truth Throttle]
  S0-S5 amount/person/institution: 6/6 match (PASS)

[§3.3 channel × lieState matrix]
  judge_question column: all 6 lieStates blocked (PASS)
  ...

[§4.1 spouse-01 surfaceMap (Markdown body)]
  e-1 surfaceName match: PASS
  ...

[§11.1 meterRole redefinition]
  emotion / trust / leak: text match (PASS)

result: PASS (Tier 1 warn-only mode)
exitCode: 0 (Tier 1: warn does not fail)
```

**기능 요구사항**:
- mode 옵션: `--tier=1` (default, warn-only) / `--tier=2` (quality gate, fail on diff) / `--tier=3` (release gate, strict)
- Markdown 파싱 (heuristic — 섹션 헤더 + 표 / 목록)
- JSON 정확 비교
- exit code: tier=1 → 0 (warn) / tier=2+ → 1 if diff

#### D. `package.json` npm scripts 등록

기존 `package.json`에 다음 추가 (다른 scripts 변경 X):
```json
{
  "scripts": {
    "check:policy": "node tmp/policy-vs-data-cross-check.cjs",
    "check:sync": "node tmp/policy-md-json-sync-check.cjs",
    "check:all": "node tmp/run-all-checks.cjs && node tmp/policy-vs-data-cross-check.cjs && node tmp/policy-md-json-sync-check.cjs"
  }
}
```

기존 scripts (`dev` / `build` / `tsc -b --force` 등) **절대 변경 X**.

### 4.2 선택 (best-effort)

- 각 wrapper에 `--json` / `--quiet` / `--verbose` 플래그
- 결과 캐싱 (재실행 시 skip option)
- CI 통합용 출력 형식 (JUnit XML 등)

---

## 5. 검증

### 5.1 자동 검증 (Codex 자체)

```bash
# 1. wrapper script 자체 valid JS
node -c tmp/run-all-checks.cjs
node -c tmp/policy-vs-data-cross-check.cjs
node -c tmp/policy-md-json-sync-check.cjs

# 2. 실제 실행 — baseline 시점 모두 PASS
node tmp/run-all-checks.cjs
node tmp/policy-vs-data-cross-check.cjs
node tmp/policy-md-json-sync-check.cjs

# 3. baseline anchor 회귀 X
sha256sum src/data/scriptedText/spouse-01.json     # 8298ead7...
sha256sum src/data/scriptedText/family-01.json     # c0393287...
sha256sum src/data/scriptedText/friend-01.json     # 4135dfb8...
sha256sum src/data/cases/generated/spouse-01.json  # d3c1377f...
sha256sum src/data/cases/generated/family-01.json  # 281b8741...
sha256sum src/data/cases/generated/friend-01.json  # 4b742b92...

# 4. Tier 1 정책 회귀 X
git diff 396b9fa -- src/data/disclosurePolicy/ docs/disclosure-policy.md docs/codex-request-template.md docs/spot-check-format.md
# expected: empty

# 5. runtime 코드 import X
grep -rn "from\|import\|require" tmp/run-all-checks.cjs tmp/policy-vs-data-cross-check.cjs tmp/policy-md-json-sync-check.cjs | grep -v "^tmp/.*: //" | grep -v "node:" | grep -v "fs\|path\|crypto" | head -20
# expected: only Node stdlib + tmp/ scripts (no src/ imports)

# 6. npm script 동작 확인
npm run check:policy
npm run check:sync
npm run check:all
```

### 5.1.1 작업 완료 보고 필수 포함 (사용자 명시 패턴 — Tier 1과 동일)

작업 완료 보고에 다음 8개 검증 결과를 **모두** 포함한다:

1. **3개 wrapper 자체 valid JS** (`node -c` PASS)
2. **3개 wrapper 실행 결과 (sample 출력)**
3. **baseline anchor 회귀 X** (6 checksum 일치)
4. **Tier 1 정책 회귀 X** (`git diff 396b9fa` empty)
5. **runtime 코드 import 0건** (wrapper 자체 src/ import 0건)
6. **npm scripts 등록 확인** (package.json diff sample)
7. **알려진 이슈 명시** (precheck-matrix family/friend d-5 HIGH 10건은 WARN 분류로 exit 0)
8. **Tier 2 진입 조건** — wrapper 모두 PASS / 30일 안정 운영 후 Tier 3 진입 검토

### 5.2 ClaudeCode CT 검수 영역

- [ ] 3개 wrapper 자체 valid (node -c)
- [ ] runtime 코드 import 0건 (`grep -r "src/" tmp/run-all-checks.cjs tmp/policy-vs-data-cross-check.cjs tmp/policy-md-json-sync-check.cjs` = 0건 / Node stdlib만)
- [ ] baseline anchor 회귀 X (6 checksum 일치)
- [ ] Tier 1 정책 회귀 X (`396b9fa` byte 동일)
- [ ] `package.json` 기존 scripts 변경 X (dev/build/tsc 등)
- [ ] `tmp/` 디렉토리 외 위치 변경 X
- [ ] run-all-checks 9 layer 모두 호출 + 결과 집계 정확
- [ ] policy-vs-data-cross-check 7 검증 항목 모두 작동 (3 case)
- [ ] policy-md-json-sync-check Tier 1 = warn-only / Tier 2+ option 작동
- [ ] 출력 형식 가독성 (CI 통합 가능)
- [ ] 에러 처리 (스크립트 실패 시 명확한 메시지)
- [ ] 알려진 이슈 (precheck-matrix d-5 HIGH 10건) WARN 분류 정확

### 5.3 사용자 confirm 영역

- 3개 wrapper 동작 확인 (실제 실행 sample)
- npm scripts 명령 명확성
- 안정 운영 30일 후 `scripts/quality/` 이전 시점 결정 (별도 의뢰)
- Tier 3 진입 조건 (LLM/Fallback Guard) 검토

---

## 6. 완료 조건

세 가지 모두 충족 시:
1. 자동 검증 PASS (5.1)
2. ClaudeCode CT 12개 체크리스트 PASS (5.2)
3. 사용자 confirm (5.3)

이번 단계 = Tier 2 wrapper 작성. 다음 의뢰 = 30일 안정 운영 후 Tier 3 LLM/Fallback Guard 또는 stale identifier cleanup (friend-01 game-events-v2 h-d3/h-d4 / spouse-01 v3-game-loop-data 충돌 4건).

---

## 7. 참조 자료

### 정책 / 의뢰서
- `docs/disclosure-policy.md` (특히 §10 Tier 진입 조건 / §7.3 정책 변경 절차)
- `docs/codex-request-template.md`
- 이전 의뢰서 6건 (`tmp/REQUEST-Codex-Tier0-baseline-freeze.md` ~ `Tier1-friend-01-schema.md`)

### Tier 1 정책 commits (보존)
- `19e4c4e` (spouse-01 schema)
- `6ee9690` (spouse-01 progression)
- `2dd17e2` (family-01)
- `396b9fa` (friend-01)

### Baseline anchor
- `baseline/pre-policy-v1/` (a10b801)

### 검증 layer 8개 (이미 존재)
- `tmp/codex-recovery-v6/precheck-{liestate-flow,evidence-unlock,archetype-quant,meter-timing}.cjs`
- `tmp/codex-recovery-v3/precheck-stage-aware.cjs`
- `tmp/codex-recovery-v4/precheck-qa-coherence.cjs`
- `tmp/codex-recovery-v5/precheck-broad-detection.cjs`
- `tmp/precheck-matrix.cjs`
- `tmp/detect-truth-leak.cjs`

### 정책 JSON (Read 전용)
- `src/data/disclosurePolicy/_schema.md`
- `src/data/disclosurePolicy/spouse-01.json` (+ cross-check)
- `src/data/disclosurePolicy/family-01.json` (+ cross-check)
- `src/data/disclosurePolicy/friend-01.json` (+ cross-check)

### Source data (Read 전용)
- `src/data/cases/generated/{spouse,family,friend}-01.json`
- `src/data/scriptedText/{spouse,family,friend}-01.json`
- `src/data/claimPolicies/{spouse,family,friend}-01-*.json`

### 메모리
- `feedback_static_analysis_limit.md` (#12 — 정적 분석 한계, JSON parse만으로 완료 X)
- `feedback_truth_leak_prohibition.md` (#9)
- `project_active_cases.md` (활성 3건)

---

## 8. 진행 절차

1. ✅ ClaudeCode CT 의뢰서 작성 (이 단계)
2. 사용자 검토 → Codex 전달 승인
3. Codex 3개 wrapper 작성 (UTF-8 보장, runtime import 0)
4. Codex 자동 검증 (5.1)
5. ClaudeCode CT 검수 (5.2 12 체크리스트)
6. 사용자 confirm (5.3)
7. commit (영구 기록)
8. 30일 안정 운영 → `scripts/quality/` 이전 시점 별도 결정
9. Tier 3 진입 검토 (LLM/Fallback Guard, feature flag default-off)

---

## 9. 메타

**Timeline 예상**: 2~3일 (3개 wrapper 작성 + 자체 검증)

**Tier 2 운영 timeline**:
- 작성 + CT 검수 + commit: 2~3일
- 안정 운영: 30일
- `scripts/quality/` 이전: 안정 운영 후 별도 결정
- Tier 3 진입: 안정 운영 + 사용자 명시 승인

**Tier 1 진행 결과 (참고)**:
- spouse-01: `19e4c4e` schema + `6ee9690` progression (4 dispute sample-complete)
- family-01: `2dd17e2` (5 dispute sample-complete)
- friend-01: `396b9fa` (5 dispute sample-complete)
- 합산 commits 4 / Timeline 4일 (예상 9~13일보다 빠름)

**현재 상태**:
- HEAD = 396b9fa (origin/main pushed)
- working tree clean
- baseline-pre-policy-v1 (a10b801) 보존
- runtime import 0건 유지
- 3 active case 정책 모두 정착

**상태**: ClaudeCode CT 의뢰서 작성 완료. 사용자 검토 + Codex 전달 대기.
