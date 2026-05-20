---
name: thread-spouse01-ja
description: 2026-05-21 witness/cutscene KO 변경 다국어 적용 — spouse-01 JA
metadata:
  origin: claude (CT main thread)
  anchor: afbc7c4b
  severity: KO 변경 mirror
---

# Thread — spouse-01 JA

Anchor: `afbc7c4b` (main HEAD).

본 thread는 [base 의뢰서](../codex-20260521-witness-family-cutscene-multilang.md) §2 spouse-01 영역 + §4 cutscene spouse-01 4 dispute의 **JA 적용**을 담당.

---

## 1. 작업 범위

### 1.1. Witness overlay (JA)

`src/data/witnessTestimonyData/localized.ts` 안의 `SPOUSE_01_OVERLAYS.ja`:
- `w1-d1-resident-info`
- `w1-d1-no-single-woman`
- `w1-d1-core` ⭐
- `w2-d2-cash-pattern`
- `w2-hd3-signature-doubt`
- `w2-hd3-core` ⭐

base 의뢰서 §2 spouse-01 표의 JA 가이드 따름.

### 1.2. Cutscene phase2 (ja)

`src/data/cutsceneText/spouse-01/{d-1, d-2, h-d3, h-d4}.json` → `slip_explosive.phase2.ja`

base 의뢰서 §4 spouse-01 JA 톤: "それは…" / "そのことは…" 트레일링 "…".

### 1.3. (조사) spouse-01.ja.json mirror 검토

`src/data/cases/generated/spouse-01.ja.json` / `src/data/scriptedText/spouse-01.ja.json` 변경 영역 검토 (있을 시).

---

## 2. 안전 규칙

- ✅ WRITE: spouse-01 JA 영역만
- ❌ KO / EN / ZH-CN 수정 X
- ❌ family / friend 영역 X
- ❌ glossary / matrix X
- ❌ origin push X

---

## 3. 검증

```powershell
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs
```

---

## 4. Worktree

```powershell
git worktree add D:/solomon-codex-spouse-ja -b codex/witness-cutscene-spouse-ja afbc7c4b
cd D:/solomon-codex-spouse-ja
git config user.name "codex"
git config user.email "codex@anthropic.local"
git config commit.gpgsign false
git config --global --add safe.directory D:/solomon-codex-spouse-ja
```

산출물: WRITE commit + `docs/design/translation-lqa-phase/codex-20260521/result-spouse01-ja.md`.
