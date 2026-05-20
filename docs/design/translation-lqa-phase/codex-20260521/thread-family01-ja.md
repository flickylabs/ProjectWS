---
name: thread-family01-ja
description: 2026-05-21 witness/case-data/cutscene KO 변경 다국어 적용 — family-01 JA
metadata:
  origin: claude (CT main thread)
  anchor: afbc7c4b
  severity: KO 변경 mirror + case truth correction
---

# Thread — family-01 JA

Anchor: `afbc7c4b` (main HEAD).

본 thread는 [base 의뢰서](../codex-20260521-witness-family-cutscene-multilang.md) §2 family-01 영역 + §3 family-01 case data 진실 정정 + §4 cutscene family-01 5 dispute의 **JA 적용**을 담당.

---

## 1. 작업 범위

### 1.1. Witness overlay (ja) — 13 slot

`src/data/witnessTestimonyData/localized.ts` 안의 `FAMILY_01_OVERLAYS.ja`:

위 EN thread의 1.1 slot 리스트 동일. base 의뢰서 §2 family-01 표 JA 가이드 적용.

특히 w3-d3-why-kept-secret ⭐ — "本人(夫の方/長男)が父の実子ではないこと" 주체 명확화. **絶対に윤정후를 가리키게 X.**

### 1.2. Case data 다국어 mirror — `src/data/cases/generated/family-01.ja.json`

base 의뢰서 §3 6 truth 영역 JA 적용:
- d-4 truthDescription — "**尹泰成**(長男)が父の実子ではない事実" + "母の立場では両親の息子として等しい" + "実子である尹正厚がその事実を知りながら家業の工場を兄に譲った" + "プライドの高い兄"
- 그 외 dailyRoutine / d-3 / e-7 / truthTable t-4 / officialRecord / v3DepthPlan summary

### 1.3. Cutscene phase2 (ja) — 5 dispute

`src/data/cutsceneText/family-01/{d-1~d-5}.json` → `slip_explosive.phase2.ja`

base 의뢰서 §4 family-01 5 dispute 의도 + JA 톤 "それは…" 트레일링.

### 1.4. scriptedText family-01.ja.json 검토

---

## 2. 안전 규칙

- ✅ WRITE: family-01 JA 영역만
- ❌ KO / EN / ZH-CN 수정 X
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

⚠️ 박순애 testimony 주체 (he himself = 兄 = 윤태성) 절대 윤정후로 오역 X.

---

## 4. Worktree

```powershell
git worktree add D:/solomon-codex-family-ja -b codex/witness-cutscene-family-ja afbc7c4b
cd D:/solomon-codex-family-ja
git config user.name "codex"
git config user.email "codex@anthropic.local"
git config commit.gpgsign false
git config --global --add safe.directory D:/solomon-codex-family-ja
```

산출물: WRITE commits + `docs/design/translation-lqa-phase/codex-20260521/result-family01-ja.md`.
