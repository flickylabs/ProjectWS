# REQUEST: Tier 0 Baseline Freeze (Codex 주도)

**작성**: ClaudeCode CT (2026-04-27)
**근거**: Tier 0~3 합의안 — Codex 4차 의견 + ClaudeCode CT 합의 + 사용자 승인
**분담**: Codex 주도 / ClaudeCode CT 확인 / 사용자 최종 승인

---

## 목표

origin/main SHA `a10b801` 기준 **rollback anchor** 생성. 향후 모든 정책/검증/런타임 변경(Tier 1~4+)은 이 anchor로 즉시 복원 가능해야 함.

사용자 우려 직접 처방: "잘못하면 완전히 망가져서 이도저도 아니게 될 위험" → Baseline 있으면 언제든 복원.

---

## Baseline 기준 (확정)

| 항목 | 값 |
|---|---|
| **baselineTargetSha** | `a10b801` (full: `a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3`) |
| 근거 | origin/main = 사용자 플레이 검증 + Vercel 배포 |
| 로컬 ahead 2 commits | `a319692` (pc-home-band) / `42587a4` (pc-header-band) — **baseline에 미포함** |
| 로컬 ahead 변경 파일 | `src/app/pc.css` 만 (UI CSS, src/data 무관) |
| dirty worktree | stash 완료 (CT가 사전 처리, `stash@{0}: pre-baseline-tier0`) |
| baseline 디렉토리 | `baseline/pre-policy-v1/` |
| git tag | `baseline-pre-policy-v1` (target = a10b801) |

**baseline 순도 보장**: src/data 파일은 a10b801 시점과 현재 worktree 동일하지만, 명시적 안전을 위해 모든 checksum/검증은 `git show a10b801:<path>` 기준 또는 현재 worktree 기준(메타에 baselineTargetSha 명시) 중 선택. 둘 다 동일 결과 보장.

---

## 필수 산출물 7개 (blocker)

### 1. `baseline/pre-policy-v1/commit-sha.txt`
```
a10b801
a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3
```
- 1행: short SHA / 2행: full SHA

### 2. `baseline/pre-policy-v1/scripted-text-checksum.json`
대상 (활성 3건):
- `src/data/scriptedText/spouse-01.json`
- `src/data/scriptedText/family-01.json`
- `src/data/scriptedText/friend-01.json`

추출: `git show a10b801:<path>` 권장 (or 현재 worktree, src/data 미변경 확인됨)

형식:
```json
{
  "baselineTargetSha": "a10b801",
  "generatedAt": "2026-04-27T...",
  "method": "git-show OR worktree (명시)",
  "files": {
    "src/data/scriptedText/spouse-01.json": {
      "sha256": "...",
      "sizeBytes": 0,
      "variantCount": 0,
      "topLevelKeyCount": 0
    },
    "src/data/scriptedText/family-01.json": { ... },
    "src/data/scriptedText/friend-01.json": { ... }
  }
}
```

### 3. `baseline/pre-policy-v1/case-data-checksum.json`
대상 (활성 3건):
- `src/data/cases/generated/spouse-01.json`
- `src/data/cases/generated/family-01.json`
- `src/data/cases/generated/friend-01.json`

형식: scripted-text-checksum과 동일. variantCount 대신 `disputeCount` / `evidenceCount` / `characterCount` 등 핵심 메타.

### 4. `baseline/pre-policy-v1/truth-leak-snapshot.json`
실행: `node tmp/detect-truth-leak.cjs` (활성 3건)

형식:
```json
{
  "baselineTargetSha": "a10b801",
  "scriptPath": "tmp/detect-truth-leak.cjs",
  "executedAt": "2026-04-27T...",
  "result": "PASS",
  "leakCount": 0,
  "perCase": {
    "spouse-01": { "leakCount": 0, "scannedVariants": 0 },
    "family-01": { "leakCount": 0, "scannedVariants": 0 },
    "friend-01": { "leakCount": 0, "scannedVariants": 0 }
  },
  "rawOutput": "..."
}
```

**필수**: leakCount = 0 검증. > 0 이면 baseline 자격 미달, 사용자에게 즉시 보고.

### 5. `baseline/pre-policy-v1/precheck-snapshot.json`
실행 대상 (전수):
- v6 4 specialist:
  - `tmp/codex-recovery-v6/precheck-liestate-flow.cjs`
  - `tmp/codex-recovery-v6/precheck-evidence-unlock.cjs`
  - `tmp/codex-recovery-v6/precheck-archetype-quant.cjs`
  - `tmp/codex-recovery-v6/precheck-meter-timing.cjs`
- 기존 layer:
  - `tmp/precheck-matrix.cjs`
  - `tmp/codex-recovery-v3/precheck-stage-aware.cjs`
  - `tmp/codex-recovery-v4/precheck-qa-coherence.cjs`
  - `tmp/codex-recovery-v5/precheck-broad-detection.cjs`

형식:
```json
{
  "baselineTargetSha": "a10b801",
  "executedAt": "2026-04-27T...",
  "checks": [
    { "name": "v6-liestate-flow", "result": "PASS|FAIL", "details": "..." },
    ...
  ],
  "allPass": true
}
```

**필수**: allPass = true. FAIL 발견 시 사용자에게 즉시 보고.

### 6. `baseline/pre-policy-v1/rollback-procedure.md`
ClaudeCode CT가 한국어 자연체 검수. 다음 항목 포함:

**A. Rollback 조건**
- ScriptedText checksum mismatch (활성 3건 어느 것이든)
- caseData checksum mismatch
- truth-leak-snapshot.json leakCount > 0
- precheck-snapshot.json 어느 항목 FAIL
- 사용자 spot check 회귀 발견
- 사용자 명시 요청

**B. Rollback 절차 (3단계 옵션)**

옵션 1 — 부분 복원 (권장):
```bash
git checkout a10b801 -- src/data/scriptedText/<file>
git checkout a10b801 -- src/data/cases/generated/<file>
node tmp/detect-truth-leak.cjs  # 검증
```

옵션 2 — 전체 데이터 복원:
```bash
git checkout a10b801 -- src/data/
node tmp/detect-truth-leak.cjs && node tmp/run-all-checks.cjs  # Tier 2 시점부터
```

옵션 3 — 완전 reset (최후 수단):
```bash
git tag emergency-pre-rollback-$(date +%Y%m%d-%H%M)  # 안전망
git reset --hard baseline-pre-policy-v1
```

**C. Rollback 후 검증**
- 모든 baseline checksum 재계산 → 일치 확인
- truth-leak 0건 / precheck allPass 재실행

**D. dirty worktree 정리 절차**
- stash pop 시점: baseline 검증 PASS 후
- CT-NEXT-START-MESSAGE.md commit 또는 .gitignore 추가 결정 (사용자)

### 7. git tag `baseline-pre-policy-v1`
```bash
git tag -a baseline-pre-policy-v1 a10b801 -m "Baseline anchor before Tier 1 Disclosure Policy. Rollback target for all subsequent policy/validation/runtime changes."
git push origin baseline-pre-policy-v1  # (선택, 사용자 승인 후)
```

---

## 선택 산출물 (best-effort, 30분 timer)

### 8. `baseline/pre-policy-v1/play-transcripts/`
- `tests/run-84-headless.cjs` 활성 3건 transcript 캡처 시도
- 가능하면 phase 0~7 모두 cover
- 30분 초과 시 skip 표시:
  ```
  baseline/pre-policy-v1/play-transcripts/SKIPPED.md
  ```
  내용: 자동화 한계 + 향후 사용자 수동 캡처 대체 가능성

---

## 절대 조건

1. ✅ baselineTargetSha = `a10b801` 모든 snapshot 메타데이터에 명시
2. ✅ 로컬 ahead 2 commits (a319692, 42587a4) baseline 데이터 미포함
3. ✅ dirty worktree 사전 stash 완료 (CT 처리, `stash@{0}: pre-baseline-tier0`)
4. ✅ baseline/ 디렉토리 .gitignore 미포함 (영구 추적 자산)
5. ✅ 산출물 생성 후 자체 검증 PASS (leak 0 / precheck allPass)
6. ✅ git tag baseline-pre-policy-v1 = a10b801 (HEAD가 아님)
7. ✅ 완료 선언 = 자동 검증 PASS + ClaudeCode CT 리뷰 PASS + 사용자 confirm

---

## ClaudeCode CT 검증 영역 (Codex 산출물 수신 후)

- [ ] `rollback-procedure.md` 한국어 자연체 검수 (잘못 패턴 #6 회피)
- [ ] 7개 필수 산출물 누락 검토
- [ ] baselineTargetSha = `a10b801` 모든 snapshot 일치 확인
- [ ] git tag = a10b801 commit 검증 (HEAD 아님)
- [ ] checksum 재계산 sample (1건) → 산출물과 일치 확인
- [ ] truth-leak 0건 / precheck allPass 재현 (sample)
- [ ] Tier 1 정책 작업 진입 시 anchor로서 충분한지 판단
- [ ] 사용자 보고 + 승인 요청

---

## 다음 단계 (Tier 0 완료 후)

1. CT가 stash pop → `tmp/CT-NEXT-START-MESSAGE.md` 처리 (commit / gitignore / 무시 사용자 결정)
2. Tier 1 Markdown 정책 (`docs/disclosure-policy.md`) — ClaudeCode 주도 / Codex 검토
3. Tier 1 JSON 정책 (`src/data/disclosurePolicy/spouse-01.json`) — Codex 주도 / ClaudeCode 검수
4. spouse-01 완성 후 family-01 / friend-01 확장 (5~7일 → 2~3일 → 2~3일 = 9~13일)

---

## 참고 메모리 (Codex가 baseline 작업 중 참조)

- `feedback_truth_leak_prohibition.md` — 잘못 패턴 #9, 사건별 surface↔진실 매핑
- `feedback_static_analysis_limit.md` — 잘못 패턴 #12, 정적 분석 한계
- `project_active_cases.md` — 활성 3건 한정
- `story_v2_confirmed_3cases.md` — 3건 사건 fact (절대 보존)
- `CLAUDE.md` — "진실은 플레이어가 직접 밝혀낸다"

---

**의뢰서 작성**: ClaudeCode CT
**대기**: 사용자 검토 + Codex 전달 승인
