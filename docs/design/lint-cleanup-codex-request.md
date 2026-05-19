---
name: lint-cleanup-codex-request
description: 출시 전 ESLint 1324 errors cleanup. claimV2.ts / disputeV2.ts / utils/contradiction.ts / tmp/ / LEGACY/ 영역. 다른 active thread와 영역 disjoint.
metadata:
  origin: claude (CT main thread)
  anchor: 24bb72a8
  severity: P2 (pre-launch quality, blocking factor 없음)
  parent_handoff: session_handoff_20260428_final_p0_closing §2 미해결 + session_handoff_20260519_post_lqa_phase0 §2.2
---

# ESLint 1324 errors cleanup 의뢰서

Anchor: `24bb72a8`
대상: 출시 전 lint 부채 청산 (claimV2.ts / disputeV2.ts / utils/contradiction.ts / tmp/ / LEGACY/ 등 pre-existing 영역).

---

## 1. 배경

- Final P0 closing handoff (`session_handoff_20260428_final_p0_closing.md`)에서 P0 232 → 0 closing 시점에 lint errors는 별도 트랙으로 분리됨.
- Post-LQA Phase 0 handoff (`session_handoff_20260519_post_lqa_phase0.md`) §C.2 미해결로 표시: "lint 1324 errors pre-existing. 출시 전 별도 cleanup 트랙."
- Phase 2 (Codex β1~β10) + Discovery i18n + truth-leak matrix + d-2 bug fix와 영역 disjoint → 동시 spawn 안전.

## 2. Scope

### 2.1. 대상 영역 (handoff 명시)

- `src/data/claimV2.ts` / `src/data/disputeV2.ts` (또는 비슷한 경로)
- `src/utils/contradiction.ts`
- `tmp/` 영역
- `docs/LEGACY/` 영역 (legacy code, lint 위반 누적)
- 그 외 pre-existing 위반 영역 모두

### 2.2. 정책

- **rule-by-rule 청산**: ESLint rule 단위로 fix. 한 rule에 ~100건이면 한 batch로 처리.
- **자동 fix 우선**: `npx eslint --fix` 가능한 영역은 자동 적용. 수동 영역은 별도 batch.
- **삭제 권한**: `tmp/` / `LEGACY/` 영역 중 진짜로 dead code면 삭제 가능 (별도 commit, 사용자 confirm).
- **콘텐츠 변경 금지**: src/data/cases / src/data/scriptedText / src/data/scriptedAngles 영역 lint 위반은 콘텐츠 데이터라 변경 시 부작용 위험. 영역에서 제외 또는 사용자 confirm 후.

### 2.3. 검증

```bash
npm run lint              # 0 errors 목표 (1324 → 0)
npx tsc -b --noEmit       # 타입 회귀 없음
npm run qa:fast           # P0=0 유지
node scripts/detect-truth-leak.cjs  # baseline 유지
```

---

## 3. 작업 환경

### 3.1. 별도 worktree

```powershell
git fetch
git worktree add D:/solomon-lint-cleanup -b codex/lint-cleanup 24bb72a8
```

### 3.2. 산출물

- Commit 분리: rule별 또는 영역별 batch (`fix(lint): X-rule-name across Y files`)
- 결과 문서: `docs/design/lint-cleanup-codex-request-result.md`
  - 1324 → N 변동 (목표 0)
  - rule별 fix 통계
  - 삭제한 파일 (있다면) 일람 + 삭제 근거
  - 잔여 위반 (영역 외 또는 사용자 confirm 필요한 영역) 일람

---

## 4. 안전 규칙

- ✅ READ from `src/`, `docs/`, `scripts/`, `tmp/`
- ✅ WRITE to src/ 영역 (단, scriptedText / scriptedAngles / cases generated 콘텐츠 영역 제외)
- ✅ WRITE to tmp/, LEGACY/ (필요 시 삭제 포함, 별도 commit 표시)
- ❌ src/data/scriptedText, scriptedAngles, cases/generated 콘텐츠 영역 (Phase 2 thread 영역)
- ❌ docs/design/translation-lqa-phase/reports/ (Phase 2 출력 영역)
- ❌ docs/localization/non-dialogue-extract/truth-leak-matrix.json (truth-leak matrix thread 영역)
- ❌ src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx (Discovery i18n thread 영역)
- ❌ origin/main push

---

## 5. 우선순위

**P2** — 출시 전 자연스러운 트랙. Phase 2 (~2일) 진행 중 동시 진행 안전. 완료 시 cherry-pick.
