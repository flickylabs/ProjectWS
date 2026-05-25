---
name: ScriptedText 모든 text 변경 = baseline 회귀 (v3-stage-aware) — CT-Main 직접 Edit X
description: baseline anchor (a10b801) 시스템에서 ScriptedText text 변경은 의미 보존 보정이라도 v3-stage-aware wrapper가 hard 회귀로 분류. CT-Main 직접 Edit 영역 X. Codex-Dev 의뢰 영역.
type: feedback
originSessionId: 04-27 c-prime ct-main A4
---

# ScriptedText 변경 = baseline 회귀 = Codex-Dev 영역

## 규칙

`baseline-pre-policy-v1` (a10b801) anchor 활성 동안:
- **ScriptedText `text` 필드 변경 = `npm run check:all` `v3-stage-aware` precheck hard 회귀**
- 의미 보존 보정 (잘못 패턴 #6 9차원 정확성)이라도 동일
- 단순 잖아요 → 합니다체 변환 같은 trivial 보정도 hard 회귀

→ **CT-Main이 ScriptedText 직접 Edit X**. Codex-Dev 의뢰로 묶음 (baseline anchor update + 보정 한 번에).

## Why (2026-04-27 사고)

C-prime A-4 단계에서 CT-Main이 `잖아요` 2건 직접 Edit (D6 register 위반 영역):
- `spouse-01.json a-d-1-S1-motive-search-v2` text 변경
- `spouse-01.json a-d-1-S2-fact-pursuit-v3` text 변경

`npm run check:all` 결과:
```
[FAIL] v3-stage-aware........... 2 hard / 14931 variants
result: FAIL (8/9 hard pass, 1 warn)
```

`tmp/codex-recovery-v3/precheck-stage-aware.json` 검출:
- `category: "C"` (변경 차단 영역)
- `matrixCell: "npc_early_strict_review"` / `"npc_partial_review"`
- `changedFields: ["text"]`

→ baseline 시점 데이터 보존이 본질. 모든 text 변경 = anchor 회귀.

## How to apply

### CT-Main 직접 Edit 가능 영역
- `docs/*.md` (정책 본문, TC, 가이드)
- `CLAUDE.md`
- 메모리 (`C:\Users\user\.claude\projects\d--ProjectWS\memory\`)
- → wrapper 검사 대상 X

### CT-Main 직접 Edit 영역 X (baseline 회귀 영역)
- `src/data/scriptedText/{caseId}.json` (text 필드)
- `src/data/cases/generated/{caseId}.json` (text/description 영역)
- `src/data/claimPolicies/{caseId}-*.json` (보정 영역)
- → Codex-Dev 의뢰 + baseline anchor update 묶음

### ScriptedText 보정 시 표준 흐름
1. CT-Main이 보정안 작성 (의미 보존 / 9차원 가이드)
2. Codex-Dev 의뢰 (variant ID list + 보정안 + 가이드)
3. Codex-Dev 적용 + 새 baseline anchor 생성 (`baseline-pre-policy-v2` 등)
4. wrapper 회귀 검사 → 새 anchor 기준 PASS
5. commit

### 예외 영역 (직접 Edit OK)
- 새 entry 추가 (text 변경 X / 신규 entry는 회귀 X일 수도 — 실제 검증 필요)
- 보정 후에도 baseline anchor 그대로 유지 시 → wrapper hard 발생 = 정상

## 관련 메모리
- `feedback_revision_meaning_over_form.md` — 잘못 패턴 #6 의미 정확성
- `feedback_qa_session_clean_worktree.md` — QA 세션 진입 조건
- `session_handoff_20260427_tier1_tier2_complete.md` — Tier 0/1/2 baseline 시스템
