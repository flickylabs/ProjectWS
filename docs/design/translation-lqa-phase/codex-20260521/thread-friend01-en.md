---
name: thread-friend01-en
description: 2026-05-21 witness/cutscene KO 변경 다국어 적용 — friend-01 EN
metadata:
  origin: claude (CT main thread)
  anchor: afbc7c4b
  severity: KO 변경 mirror
---

# Thread — friend-01 EN

Anchor: `afbc7c4b` (main HEAD).

본 thread는 [base 의뢰서](../codex-20260521-witness-family-cutscene-multilang.md) §2 friend-01 영역 + §4 cutscene friend-01 5 dispute의 **EN 적용**을 담당.

---

## 1. 작업 범위

### 1.1. Witness overlay (en) — 12 slot

`src/data/witnessTestimonyData/localized.ts` 안의 `FRIEND_01_OVERLAYS.en`:

w-1 (김세라):
- `w1-d1-chat-mood`
- `w1-d1-frame-wording`
- `w1-d2-no-one-checked`
- `w1-d2-blame-spread`
- `w1-d3-first-conclusion` ⭐

w-2 (박준혁):
- `w2-d1-contact-reaction`
- `w2-d2-flirt-remark`
- `w2-d2-why-looked-caught`
- `w2-d3-rejection-ignored` ⭐

w-3 (오미경):
- `w3-d2-overheard-phrase`
- `w3-d2-father-identity`
- `w3-d3-breakup-cause` ⭐

base 의뢰서 §2 friend-01 표 EN 가이드 그대로.

특히 주체 명확화 (오미경 testimony — "그 남성분" = 송다은 아버지 / "그 젊은 분" = 최수민) 다국어에서 명시.

### 1.2. Cutscene phase2 (en) — 5 dispute

`src/data/cutsceneText/friend-01/{d-1, d-2, d-3, d-4, d-5}.json` → `slip_explosive.phase2.en`

base 의뢰서 §4 friend-01 5 dispute의 EN 톤.

**주의**: d-5는 송다은 자백 (다른 4 dispute는 최수민 자백). 시점 전환 주의.

KO 원문 (참고):
- d-1: "그게... 다은이한테 직접 말했어야 했는데, 그 아버지 일을 어떻게 꺼내야 할지 모르겠어서 태윤 씨만 붙잡은 거예요. 그게 더 의심을 키운 거였고..."
- d-2: "그게... 원본을 보여주면 결혼이 무너질 게 뻔했어요. 그래서 거절만 하고 끝내려 했는데, 다은이가 캡처를 들고 나오는 순간 입이 막혔고..."
- d-3: "그게... 그 돈 얘긴 다은이도 모르는 일이고, 제가 다은이한테 말하면 가족 전부를 흔드는 거잖아요. 그래서 끝까지 입을 다물려고 했는데..."
- d-4: "그게... 금액을 말하면 다은이가 아버지를 의심해야 했어요. 그건 친구로서 시킬 수 없는 일이라, 차라리 제가 변한 사람이 되는 게 나았는데..."
- d-5 (송다은 시점): "그게... 그 캡처를 보자마자 머리에 다른 그림이 떠올랐어요. 제가 먼저 결론을 정해두고 친구들 동조를 받으려고 한 거고, 수민이한테 묻는 순서는 처음부터 빠져 있었어요..."

### 1.3. friend-01.en.json mirror 검토

`src/data/scriptedText/friend-01.en.json` / `src/data/cases/generated/friend-01.en.json` 변경 영역 검토.

---

## 2. 안전 규칙

- ✅ WRITE: friend-01 EN 영역만
- ❌ KO / JA / ZH-CN X
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
git worktree add D:/solomon-codex-friend-en -b codex/witness-cutscene-friend-en afbc7c4b
cd D:/solomon-codex-friend-en
git config user.name "codex"
git config user.email "codex@anthropic.local"
git config commit.gpgsign false
git config --global --add safe.directory D:/solomon-codex-friend-en
```

산출물: WRITE commits + `docs/design/translation-lqa-phase/codex-20260521/result-friend01-en.md`.
