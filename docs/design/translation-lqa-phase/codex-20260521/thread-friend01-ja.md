---
name: thread-friend01-ja
description: 2026-05-21 witness/cutscene KO 변경 다국어 적용 — friend-01 JA
metadata:
  origin: claude (CT main thread)
  anchor: afbc7c4b
  severity: KO 변경 mirror
---

# Thread — friend-01 JA

Anchor: `afbc7c4b` (main HEAD).

본 thread는 [base 의뢰서](../codex-20260521-witness-family-cutscene-multilang.md) §2 friend-01 영역 + §4 cutscene friend-01 5 dispute의 **JA 적용**을 담당.

---

## 1. 작업 범위

### 1.1. Witness overlay (ja) — 12 slot

`src/data/witnessTestimonyData/localized.ts` 안의 `FRIEND_01_OVERLAYS.ja`:

위 friend EN thread의 1.1 slot 리스트 동일. base 의뢰서 §2 friend-01 표 JA 가이드 적용.

특히 오미경 testimony 주체 (年配の男性 = 송다은 아버지 / 若い方 = 최수민) 명시.

### 1.2. Cutscene phase2 (ja) — 5 dispute

`src/data/cutsceneText/friend-01/{d-1~d-5}.json` → `slip_explosive.phase2.ja`

base 의뢰서 §4 friend-01 5 dispute 의도 + JA 톤 "それは…" 트레일링.

**주의**: d-5는 송다은 시점.

### 1.3. friend-01.ja.json mirror 검토

---

## 2. 안전 규칙

- ✅ WRITE: friend-01 JA 영역만
- ❌ KO / EN / ZH-CN X
- ❌ spouse / family X
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
git worktree add D:/solomon-codex-friend-ja -b codex/witness-cutscene-friend-ja afbc7c4b
cd D:/solomon-codex-friend-ja
git config user.name "codex"
git config user.email "codex@anthropic.local"
git config commit.gpgsign false
git config --global --add safe.directory D:/solomon-codex-friend-ja
```

산출물: WRITE commits + `docs/design/translation-lqa-phase/codex-20260521/result-friend01-ja.md`.
