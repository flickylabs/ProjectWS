# Truth-Leak Matrix Tuning — Result

Anchor: `a01362ae`

---

## 1. 변경 요약

`docs/localization/non-dialogue-extract/truth-leak-matrix.json` 단일 파일 수정.

`friend-01.d-1.hidden`에 4-lang phrasing 부정합 보강:
- **ko 추가**: `"경고 연락"` (기존 `"경고 목적 연락"` 보존)
- **ja 추가**: `"警告の連絡"` (기존 `"警告目的の連絡"` 보존)
- **zh-CN 추가**: `"警告联系"` (기존 `"出于警告目的的联系"` 보존)
- **en**: 변경 X (`"warning contact"` 이미 정렬)

---

## 2. detect-truth-leak before/after

```
before (anchor a01362ae): findings = 5
  byCase: {family-01: 3, friend-01: 2}
  byLang: {ko: 2, en: 0, ja: 0, zh-CN: 3}

after (matrix tuning 적용): findings = 6
  byCase: {family-01: 3, friend-01: 3}
  byLang: {ko: 3, en: 0, ja: 0, zh-CN: 3}
```

신규 catch = **1건** (의뢰서 예상치 4건 중 3건은 직전 cherry-pick `4207c53d` (truth-leak P0 fix)로 entries[25].variants[2] 추상화돼 catch 안 됨 — 정확한 의도된 동작).

---

## 3. 신규 Catch 1건 정밀

### finding

```
caseId: friend-01
disputeId: d-1
lang: ko
file: src/data/scriptedText/friend-01.json
key: channels.judge_contradiction.entries[7].variants[2].text
keyword: 경고 연락
snippet: "두 분, 돈을 요구한 흐름과 경고 연락의 시점이 겹칩니다. 각자 숨긴 이유를 답하십시오."
```

entry id = `judgec-d-3-mid-v3` (key `d-3|mid`). judge_contradiction 채널, mid-band variant.

### 4-lang 비교 — KO만 정책 위반

| lang | text | 진실 노출 |
|---|---|---|
| **ko** | "두 분, **돈을 요구한 흐름**과 **경고 연락**의 시점이 겹칩니다. 각자 숨긴 이유를 답하십시오." | d-3 진실 (돈 요구) + d-1 진실 (경고 연락) 동시 노출 |
| en | "Both of you, the record now turns on the father's money approach and the repeated pattern. Explain the choice now." | 추상 (surface 어휘 사용) |
| ja | "お二人、記録は今、父の金銭接近と反復するパターンを中心に動いています。その選択を今説明してください。" | 추상 |
| zh-CN | "两位，现在记录的关键在于父亲接近钱财与反复出现的模式。现在请说明这个选择。" | 추상 |

**KO 원문이 외국어보다 더 구체적**. 외국어는 이미 우회 표현 사용. 후속 P0 fix는 **KO만 추상화**하면 충분 (외국어 sync 불필요).

### 추상화 권고 패턴

KO 원문:
> 두 분, **돈을 요구한 흐름**과 **경고 연락**의 시점이 겹칩니다. 각자 숨긴 이유를 답하십시오.

추상화 후보:
> 두 분, **돈 관련 흐름**과 **연속된 연락**의 시점이 겹칩니다. 각자 숨긴 이유를 답하십시오.

또는:
> 두 분, **양측 발언 흐름**과 **반복된 연락 시점**이 겹칩니다. 각자 숨긴 이유를 답하십시오.

또는 외국어 표현에 정렬:
> 두 분, **돈 관련 흐름**과 **반복 패턴**의 시점이 겹칩니다. 각자 숨긴 이유를 답하십시오.

---

## 4. 잔여 5건 (디자인 의도 수용, 매트릭스 튜닝 영향 X)

본 매트릭스 튜닝과 무관하게 잔존 (검출 후 디자인 의도로 수용 결정):

| # | caseId | disputeId | lang | file | key |
|---|---|---|---|---|---|
| 1 | family-01 | d-5 | zh-CN | scriptedText/family-01.zh-CN.json | channels.dossier.entries[27].variants[1].text |
| 2 | family-01 | d-5 | zh-CN | scriptedText/family-01.zh-CN.json | channels.dossier.entries[31].variants[7].text |
| 3 | family-01 | d-3 | zh-CN | scriptedText/family-01.zh-CN.json | channels.judge_evidence_combo.entries[17].variants[0].text |
| 4 | friend-01 | d-4 | ko | scriptedAngles/friend-01_judge_questions.json | judgeQuestions[89].variants[0].text (gated angle `protective_silence`) |
| 5 | friend-01 | d-4 | ko | scriptedText/friend-01.json | channels.dossier.entries[26].variants[6].text (lieBand:late confession) |

해소 방법:
- **detect-truth-leak.cjs schema 확장** — dossier/judgeec/gated-angle 영역 별도 처리 (whitelist 로직)
- 별개 task로 분리됨

---

## 5. 후속 권고

1. **신규 catch #1 (KO judgec d-3|mid v3) P0 fix** — 작은 단일 entry, KO 단독 변경. truth-leak P0 fix batch에 추가 또는 ad-hoc fix.
2. **friend-01 d-3 "돈을 빌려" matrix broaden 정책 결정** — 별개 task (surface/hidden 경계 모호).
3. **family-01 d-5 dossier 디자인 의도 처리** — detector schema 확장 별개 task.

---

## 6. 검증

```
node scripts/detect-truth-leak.cjs        # findings 6 = 1 신규 P0 + 5 디자인 의도
npx tsc -b --noEmit                       # PASS (matrix.json 영역과 무관)
npm run qa:fast                           # PASS (P0=0)
```

본 변경은 matrix.json 1 파일 단일 keyword 추가 (4-lang 중 3개 lang). source code / src 영역 무영향.
