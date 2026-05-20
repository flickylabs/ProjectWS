---
name: thread-family01-zh
description: 2026-05-21 witness/case-data/cutscene KO 변경 다국어 적용 — family-01 ZH-CN
metadata:
  origin: claude (CT main thread)
  anchor: afbc7c4b
  severity: KO 변경 mirror + case truth correction
---

# Thread — family-01 ZH-CN

Anchor: `afbc7c4b` (main HEAD).

본 thread는 [base 의뢰서](../codex-20260521-witness-family-cutscene-multilang.md) §2 family-01 영역 + §3 family-01 case data 진실 정정 + §4 cutscene family-01 5 dispute의 **ZH-CN 적용**을 담당.

---

## 1. 작업 범위

### 1.1. Witness overlay (zh-CN) — 13 slot

`src/data/witnessTestimonyData/localized.ts` 안의 `FAMILY_01_OVERLAYS["zh-CN"]`:

위 family EN thread의 1.1 slot 리스트 동일. base 의뢰서 §2 family-01 표 ZH 가이드 적용.

특히 w3-d3-why-kept-secret ⭐ — "察觉到自己(大儿子尹泰成)不是父亲亲生的". **绝对不能指代尹正厚.**

### 1.2. Case data 다국어 mirror — `src/data/cases/generated/family-01.zh-CN.json`

base 의뢰서 §3 6 truth 영역 ZH 적용:
- d-4 truthDescription — "**尹泰成**(大儿子)不是父亲亲生的事实" + "在母亲眼里两个儿子都是亲生孩子" + "亲生儿子尹正厚明知此事仍把家业工厂让给哥哥" + "自尊心强的哥哥"
- 그 외 dailyRoutine / d-3 / e-7 / truthTable t-4 / officialRecord / v3DepthPlan summary / evidence-2 restore_context

### 1.3. Cutscene phase2 (zh-CN) — 5 dispute

`src/data/cutsceneText/family-01/{d-1~d-5}.json` → `slip_explosive.phase2.zh-CN`

base 의뢰서 §4 family-01 5 dispute 의도 + ZH 톤 "那个..." / "其实..." 트레일링.

### 1.4. scriptedText family-01.zh-CN.json 검토

---

## 2. 안전 규칙

- ✅ WRITE: family-01 ZH-CN 영역만
- ❌ KO / EN / JA 수정 X
- ❌ spouse / friend X
- ❌ glossary / matrix X
- ❌ origin push X

---

## 3. 검증

```powershell
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs    # 0건
npm run qa:lqa
```

⚠️ 박순애 testimony 주체 절대 정후 오역 X.

---

## 4. Worktree

```powershell
git worktree add D:/solomon-codex-family-zh -b codex/witness-cutscene-family-zh afbc7c4b
cd D:/solomon-codex-family-zh
git config user.name "codex"
git config user.email "codex@anthropic.local"
git config commit.gpgsign false
git config --global --add safe.directory D:/solomon-codex-family-zh
```

산출물: WRITE commits + `docs/design/translation-lqa-phase/codex-20260521/result-family01-zh.md`.
