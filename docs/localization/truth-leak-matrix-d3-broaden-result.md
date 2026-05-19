# Truth-Leak Matrix d-3 Broaden — Result

Anchor: `bf162409`

---

## 1. 변경 요약

`docs/localization/non-dialogue-extract/truth-leak-matrix.json` — `friend-01.d-3.hidden` 4-lang broaden.

### 추가된 keyword (보수 + 중간 정책)

| lang | 추가 keyword |
|---|---|
| ko | `"돈을 요구"`, `"돈을 빌려 달라"` |
| en | `"request for money"`, `"borrow money"` |
| ja | `"金を貸して"` (subset of `"お金を貸して"`도 catch) |
| zh-CN | `"要钱"` (substring of `"索要钱"`), `"借钱"` |

기존 keyword (`"예비신랑에게 돈 얘기를 꺼냄"`, `"돈을 빌려달라고 접근"`, `"과거 같은 패턴"`, `"같은 피해를 막으려 했다"` 등) 모두 보존.

---

## 2. detect-truth-leak before/after

```
before (d-3 broaden 적용 전): findings = 5
  byCase: {family-01: 3, friend-01: 2}
  byLang: {ko: 2, en: 0, ja: 0, zh-CN: 3}

after (d-3 broaden 적용): findings = 34
  byCase: {family-01: 3, friend-01: 31}
  byLang: {ko: 13, en: 5, ja: 6, zh-CN: 10}
```

신규 catch = **29건** (모두 friend-01 d-3).

---

## 3. 29 신규 Catch 채널 분류

| 채널 | 건수 | 분류 |
|---|---:|---|
| `judge_question` | 24 | **P0 정책 위반** — 재판관 정식 질문, pre-confession 진실 노출 |
| `judge_contradiction` | 2 | **P0 정책 위반** — 재판관 모순 추궁, pre-confession |
| `judge_evidence_combo` | 2 | **P0 정책 위반 (룰 기준)** — 매트릭스 룰상 모든 judge 채널 leak. post-unlock 디자인 의도로 분류 가능하나 본 룰셋에서 P0. |
| `dossier` | 1 | **디자인 의도 수용** — 자백 path 채널, zh-CN dossier 변형 |

→ **28 P0 + 1 디자인 의도**

### 후속 fix 의뢰서 영역 (별도 task)

신규 28 P0 = 후속 P0 fix 의뢰서로 분리. lang 분포:
- ko: 11건 (judge_question 9 + judge_contradiction 1 + judge_evidence_combo 1)
- en: 5건 (judge_question 4 + judge_evidence_combo 1)
- ja: 5건 (judge_question 4 + judge_contradiction 1)
- zh-CN: 7건 (judge_question 7)

4-lang sync 정책 필요 — entry 다수가 4 lang 동일 id이라 단일 의뢰서 batch 가능.

---

## 4. 디자인 의도 1건

```
caseId: friend-01
disputeId: d-3
lang: zh-CN
file: src/data/scriptedText/friend-01.zh-CN.json
key: channels.dossier.entries[5].variants[0].text
keyword: 要钱
snippet: "我是担心多恩的父亲会用同样的方式开口要钱，所以想提醒他。"
```

dossier 채널 (자백 path). 최수민(b) 측의 dossier 답변 — "다은이 아버지가 같은 방식으로 돈 요구할 것을 걱정해 경고하려 했다" = d-3/d-1 진실 자백 (motive 명확화).

이 entry는 dossier 자백 channel 디자인 의도와 일치 — **잔존 6건 디자인 의도 그룹에 합산** (5 → 6).

---

## 5. 매트릭스 현재 상태 (적용 후)

| dispute | hidden keyword count (ko) | 변경 |
|---|---:|---|
| spouse-01 d-1 | 4 | unchanged |
| spouse-01 d-2 | 5 | unchanged |
| spouse-01 h-d3 | 3 | unchanged |
| spouse-01 h-d4 | 4 | unchanged |
| family-01 d-1 | 4 | unchanged |
| family-01 d-2 | 4 | unchanged |
| family-01 d-3 | 4 | unchanged |
| family-01 d-4 | 4 | unchanged |
| family-01 d-5 | 4 | unchanged |
| friend-01 d-1 | 5 | +1 (5월 19일 matrix tuning: "경고 연락") |
| friend-01 d-2 | 4 | unchanged |
| **friend-01 d-3** | **6** | **+2 (본 broaden: "돈을 요구", "돈을 빌려 달라")** |
| friend-01 d-4 | 5 | unchanged |
| friend-01 d-5 | 4 | unchanged |

---

## 6. 다음 단계 (별도 task)

1. **friend-01 d-3 28 P0 fix 의뢰서** — Codex 4-lang sync batch
2. **C1 detector schema 확장** — dossier/judgeec 디자인 의도 whitelist 로직 추가 후 잔존 6건 catch 해소

---

## 7. 검증

```
node scripts/detect-truth-leak.cjs  => findings 5 -> 34 (+29 신규)
npx tsc -b --noEmit                 => PASS (matrix 영역 무관)
npm run qa:fast                     => P0=0
```
