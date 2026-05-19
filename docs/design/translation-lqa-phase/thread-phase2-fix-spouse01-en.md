---
name: thread-phase2-fix-spouse01-en
description: Phase 2 LQA fix cycle — spouse-01 EN 26 entries (0 P0 / 20 P1 / 6 P2). P1 누적 부채 해소 batch. 단일 Codex thread.
metadata:
  origin: claude (CT main thread)
  anchor: 22429735
  severity: P1 (LQA EN 누적 부채)
---

# Phase 2 P1 Fix — spouse-01 EN

Anchor: `22429735`

---

## 1. 배경

Phase 2 EN 영역 정리 마무리. spouse-01 EN은 **P0 없음** (Codex β1~β10 cycle에서 spouse-01 EN: 0 P0 / 20 P1 / 6 P2 보고). P1 누적 부채만 26 entries.

family-01 EN (208 entries) / friend-01 EN (60 entries — 의뢰서 작성됨) 적용 후 EN 영역 마지막 batch.

기준 메모리:
- [[feedback-revision-meaning-over-form]] — 9차원 의미 정확성
- [[feedback-claude-ko-needs-codex-multilang]] — EN 단독 sync

---

## 2. 입력

**파일**: `docs/design/translation-lqa-phase/reports/spouse-01_en.csv`

**Header**: `row_id, source_ko, target_text, category, issue_dim, severity, option_a, option_b, recommendation, confidence, notes`

**Severity**: 0 P0 + 20 P1 + 6 P2 = 26 entries.

row_id form = spouse-01 short id (`spouse-01-a-*`, `spouse-01-b-*`, etc.). JA bundle 의뢰서 spouse-01 매핑 참조.

---

## 3. row_id → target 파일 매핑

| row_id prefix | target file |
|---|---|
| `spouse-01-a-*` / `spouse-01-b-*` | `src/data/scriptedText/spouse-01.en.json` 또는 `src/data/scriptedAngles/spouse-01_interrogation_answers.en.json` |
| `spouse-01-angle-*` | `src/data/scriptedAngles/spouse-01_angle_catalog.en.json` |
| `spouse-01-judgeq-*` | `src/data/scriptedAngles/spouse-01_judge_questions.en.json` |
| `spouse-01-mediation-*` | `src/data/scriptedText/spouse-01.en.json` mediation channel |
| `spouse-01-case-*` | `src/data/cases/generated/spouse-01.en.json` |
| `spouse-01-phase1-*` | `src/data/dialogues/phase1/spouse-01.en.json` |
| `spouse-01-aftermath-*` | `src/data/scriptedText/spouse-01.en.json` aftermath channel |

---

## 4. 작업

### 4.1. P1 20건

CSV recommendation 적용. issue_dim별 (D2/D3/D4/D6) 9차원 검증.

### 4.2. P2 6건 (선택)

P1 완료 후 시간 여유.

### 4.3. truth-leak 정책 준수

spouse-01 영역은 d-1 (조카 돌봄) / d-2 (비자금) / h-d3 (공동 적금 해지) / h-d4 (위임장 조작) 진실. EN LQA fix 적용 후 hidden keyword 재도입 X 검증.

### 4.4. confidence 가이드

family-01 EN 의뢰서 동일.

---

## 5. 검증

```powershell
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs        # baseline 25 유지
npm run qa:lqa                            # spouse-01 EN 영역 issue 감소
```

---

## 6. 작업 환경

### 6.1. 별도 worktree

```powershell
git fetch
git worktree add D:/solomon-phase2-spouse01-en -b codex/phase2-fix-spouse01-en 22429735
```

### 6.2. 산출물

- Fix commits (P1 + P2 분리)
- `docs/design/translation-lqa-phase/reports/spouse-01_en_applied.csv`
- `docs/design/translation-lqa-phase/spouse-01-en-fix-result.md`

---

## 7. 안전 규칙

- ✅ READ: `spouse-01_en.csv`, KO 정본, glossary.csv
- ✅ WRITE:
  - `src/data/scriptedText/spouse-01.en.json`
  - `src/data/scriptedAngles/spouse-01_*.en.json`
  - `src/data/cases/generated/spouse-01.en.json`
  - `src/data/dialogues/phase1/spouse-01.en.json` (해당 시)
- ❌ KO 정본 / 다른 lang 수정 X
- ❌ matrix.json / glossary.csv 수정 X
- ❌ origin/main push

---

## 8. 우선순위

**P1** — 누적 LQA 부채 해소. Phase 2 EN 영역 마무리 batch.

본 의뢰 완료 시 Phase 2 P0 100% / P1 영역 대부분 정리.
