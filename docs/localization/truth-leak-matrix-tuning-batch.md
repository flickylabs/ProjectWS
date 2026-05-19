---
name: truth-leak-matrix-tuning-batch
description: detect-truth-leak.cjs matrix 4-lang phrasing 부정합 정밀 정리. friend-01 d-1 "경고 연락" 영역만 좁게 추가 (4 신규 P0 finding 예상). d-3 광범위 patterns + d-5 dossier 디자인 의도 영역은 별개 task.
metadata:
  origin: claude (CT main thread)
  anchor: 5161004e
  severity: P1 (검출 정확성 향상, 누락 P0 4건 추가 catch)
---

# Truth-Leak Matrix Tuning — friend-01 d-1 Phrasing Batch

Anchor: `5161004e`

---

## 1. 배경

매트릭스 확장 (commit `77f15684`) 후 detect-truth-leak findings = 11 (baseline 3 → 11). 직전 main thread 분류로 P0 6 / 디자인 5 / matrix tuning 3 후보 식별.

본 의뢰는 **matrix tuning 3 후보 중 안전 영역 1개만** 다룬다:
- **friend-01 d-1 "경고 연락" 4-lang phrasing 부정합**
  - 4-lang text 모두 "경고 연락" / "warning contact" / "警告の連絡" / "警告联系" form 사용
  - 매트릭스는 specific form ("경고 목적 연락" 등) 등록 — 4-lang 동시 부정합
  - 추가 catch 예상: ko 2 + ja 1 + zh-CN 1 = **4 신규 P0 finding** (en은 이미 catch 중)
  - 모두 judge channel entries → P0 violation 확정

별개 task로 분리:
- **friend-01 d-3 "돈을 빌려" broaden**: surface "돈 부탁 정황" vs hidden "돈을 빌려달라고 접근" 경계 모호. ko 40 hits 스캔 채널 — 다수 noise 위험. 정책 결정 필요.
- **family-01 d-5 "그대로 두지 못" broaden**: dossier 7 hits — 디자인 의도 (dossier confession) 영역. broaden 대신 detector whitelist 로직 권장. detector schema 확장 task.

---

## 2. Matrix 변경 영역

### 2.1. 파일

`docs/localization/non-dialogue-extract/truth-leak-matrix.json`

### 2.2. friend-01.d-1.hidden 변경

**현재**:
```json
{
  "ko": ["송다은 아버지의 돈 접근 패턴을 경고", "집착이 아니라 경고", "직접 말할 길이 없었다", "경고 목적 연락"],
  "en": ["warning about Song Da-eun's father's money pattern", "not obsession but warning", "no direct way to say it", "warning contact"],
  "ja": ["ソン・ダウンの父の金銭接近パターンを警告", "執着ではなく警告", "直接言う方法がなかった", "警告目的の連絡"],
  "zh-CN": ["警告宋多恩父亲接近钱财的模式", "不是执念而是警告", "没有办法直接说出来", "出于警告目的的联系"]
}
```

**추가 (기존 보존)**:
- ko: `"경고 연락"` 추가
- ja: `"警告の連絡"` 추가
- zh-CN: `"警告联系"` 추가
- en: 변경 X (`"warning contact"` 이미 존재)

**최종**:
```json
{
  "ko": ["송다은 아버지의 돈 접근 패턴을 경고", "집착이 아니라 경고", "직접 말할 길이 없었다", "경고 목적 연락", "경고 연락"],
  "en": ["warning about Song Da-eun's father's money pattern", "not obsession but warning", "no direct way to say it", "warning contact"],
  "ja": ["ソン・ダウンの父の金銭接近パターンを警告", "執着ではなく警告", "直接言う方法がなかった", "警告目的の連絡", "警告の連絡"],
  "zh-CN": ["警告宋多恩父亲接近钱财的模式", "不是执念而是警告", "没有办法直接说出来", "出于警告目的的联系", "警告联系"]
}
```

---

## 3. 신규 Catch 예상 (4건)

`node scripts/detect-truth-leak.cjs` 재실행 시 catch될 신규 P0 findings:

| # | case | dispute | lang | file | key | keyword | snippet |
|---|---|---|---|---|---|---|---|
| 1 | friend-01 | d-1 | ko | scriptedText/friend-01.json | channels.judge_contradiction.entries[7].variants[2].text | 경고 연락 | "두 분, 돈을 요구한 흐름과 경고 연락의 시점이 겹칩니다. 각자 숨긴 이유를 답하십시오." |
| 2 | friend-01 | d-1 | ko | scriptedText/friend-01.json | channels.judge_question.entries[25].variants[2].text | 경고 연락 | "두 분, 돈을 빌려 달라는 말과 경고 연락이 겹친 시점을..." (이미 truth-leak P0 의뢰서 278767e4 fix 대상) |
| 3 | friend-01 | d-1 | ja | scriptedText/friend-01.ja.json | channels.judge_question.entries[25].variants[2].text | 警告の連絡 | "お二人とも、お金を貸してほしいという話と警告の連絡が重なった時点を..." (truth-leak P0 의뢰서 fix 대상) |
| 4 | friend-01 | d-1 | zh-CN | scriptedText/friend-01.zh-CN.json | channels.judge_question.entries[25].variants[2].text | 警告联系 | "两位，请根据资料说明借钱的话与警告联系重叠的时间点。" (truth-leak P0 의뢰서 fix 대상) |

**상호작용**:
- 4건 중 #2/#3/#4 = truth-leak P0 fix 의뢰서 (`278767e4`, `docs/localization/truth-leak-p0-fix-batch.md`)의 fix 대상과 같은 entry. 본 의뢰 적용 순서에 따라:
  - 매트릭스 튜닝 먼저 → P0 의뢰서 fix → fix 후 #2/#3/#4 사라짐
  - P0 의뢰서 fix 먼저 → 매트릭스 튜닝 → #2/#3/#4 catch X (이미 추상화)
- **#1 (judge_contradiction entries[7].variants[2])은 신규 P0**. P0 fix 의뢰서에 추가되거나 별도 cycle 필요.

---

## 4. 검증

```powershell
node scripts/detect-truth-leak.cjs
```

**기대 결과** (P0 의뢰서 fix 미적용 상태에서):
- findings: 11 → **15** (4 신규 catch)
- byCase: family-01:6, friend-01:9
- byLang: ko 변동 (+2), ja 변동 (+1), zh-CN 변동 (+1)

**기대 결과** (P0 의뢰서 fix 적용 후 동시 매트릭스 튜닝):
- findings: ~6 (디자인 의도 5 + #1 신규 catch만 잔존)
- #1 영역 (`judge_contradiction.entries[7].variants[2]`)은 별도 P0 fix 필요

---

## 5. 작업 환경

### 5.1. 별도 worktree

```powershell
git fetch
git worktree add D:/solomon-matrix-tuning -b codex/matrix-tuning 5161004e
```

매트릭스 변경 영역이 좁아 Codex thread 또는 Claude 직접 패치 양쪽 가능. 사용자 결정.

### 5.2. 산출물

- Matrix update commit (단일 commit 권장)
- `docs/localization/truth-leak-matrix-tuning-result.md`
  - matrix diff
  - detect-truth-leak before/after count + byCase/byLang
  - 신규 4 findings 분류 (P0 violation 확정)
  - #1 (judge_contradiction entries[7].variants[2]) P0 fix 후속 권고

---

## 6. 안전 규칙

- ✅ READ: `docs/localization/non-dialogue-extract/truth-leak-matrix.json`, `src/data/scriptedText/friend-01*.json`
- ✅ WRITE: `docs/localization/non-dialogue-extract/truth-leak-matrix.json` (4-lang d-1 hidden keyword 추가만)
- ❌ d-3 / d-5 matrix broaden — 별개 task (사용자 정책 결정 필요)
- ❌ detect-truth-leak.cjs 로직 수정 — 별개 task (디자인 의도 whitelist)
- ❌ src/data scriptedText 수정 — truth-leak P0 fix 의뢰서 영역
- ❌ origin/main push

---

## 7. 우선순위

**P1** — 검출 정확성 향상. 누락된 P0 finding 4건 catch 추가. 매트릭스 schema 확장 X (단순 keyword 추가).

후속 영역:
1. friend-01 d-3 "돈을 빌려" matrix broaden 정책 결정
2. family-01 d-5 dossier 디자인 의도 영역 detector schema 확장
3. 신규 catch #1 (judge_contradiction entries[7].variants[2]) P0 fix
