---
name: thread-phase2-fix-zhcn-3case-bundle
description: Phase 2 LQA fix cycle ZH-CN lang 묶음 — spouse-01 + family-01 + friend-01 ZH-CN 3 CSV 총 116 entries (2 P0 / 98 P1 / 16 P2). 단일 Codex thread ZH-CN word-order/literal-EN batch.
metadata:
  origin: claude (CT main thread)
  anchor: 22429735
  severity: P1 (LQA ZH-CN 누적 부채 + word-order/literal-EN)
---

# Phase 2 P0/P1 Fix — ZH-CN 3-Case Bundle

Anchor: `22429735`

---

## 1. 배경

JA bundle 의뢰서 (`22429735`) 작성 직후 ZH-CN bundle 동등 작성. ZH-CN 영역도 lang 단위 일관성 (word order, literal-EN translation, particle 등) 관점에서 묶음 처리 효율적.

기준 메모리:
- [[feedback-revision-meaning-over-form]] — 9차원 의미 정확성
- [[feedback-claude-ko-needs-codex-multilang]] — 본 의뢰는 ZH-CN 단독 sync (KO source unchanged)

---

## 2. 입력 CSV 3개

| CSV | entries | P0 | P1 | P2 |
|---|---:|---:|---:|---:|
| `docs/design/translation-lqa-phase/reports/spouse-01_zh-CN.csv` | 39 | 0 | 35 | 4 |
| `docs/design/translation-lqa-phase/reports/family-01_zh-CN.csv` | 32 | 2 | 23 | 7 |
| `docs/design/translation-lqa-phase/reports/friend-01_zh-CN.csv` | 45 | 0 | 40 | 5 |
| **합계** | **116** | **2** | **98** | **16** |

P0=2 (family-01 zh-CN). 나머지 영역은 P1/P2 (LQA 부채).

---

## 3. row_id → target 파일 매핑

각 case의 row_id form은 JA bundle 의뢰서와 동일 패턴:
- **spouse-01 zh-CN**: short id form (`spouse-01-a-*`, `spouse-01-b-*`, `spouse-01-angle-*`, `spouse-01-judgeq-*`, `spouse-01-mediation-*`, `spouse-01-case-*`, `spouse-01-phase1-*`)
- **family-01 zh-CN**: path-based form (`scriptedText-interrogation-N`, `case-v3-depth-*`)
- **friend-01 zh-CN**: mixed form (`friend-01-case-*`, `friend-01-angle-*`, `judgeq-d-*`, `a-d-*`)

타겟 파일 매핑은 [thread-phase2-fix-ja-3case-bundle.md §3](thread-phase2-fix-ja-3case-bundle.md) 동일. lang suffix만 `.ja` → `.zh-CN` 변경.

---

## 4. 작업

### 4.1. P0 2건 우선 (family-01 zh-CN)

P0 entries는 family-01 zh-CN에만 2건. 우선 적용 + tsc/qa:fast 검증.

### 4.2. P1 98건 batch

3 case 합쳐 가장 큰 batch. P1 위주이지만 다국어 누적 부채 해소 핵심.

### 4.3. P2 16건 (선택)

P0/P1 완료 후 시간 여유 시 P2 적용.

### 4.4. ZH-CN 특수 issue_dim 처리

- **D3 word order**: ZH-CN 어순 문제 (영어 직역의 흔적). 자연 중국어 어순 정렬.
- **D6 literal_EN**: literal English noun phrase 잔여 (e.g., "Ms.", 직역 표현). ZH-CN 표현으로 대체.
- **D2 cross_batch**: 다른 entries에서 같은 phrase 다르게 번역된 inconsistency.
- **D6 glossary**: 인명 spelling lock (Park Ji-yeon, Yoon Jeong-hu, Choi Su-min 등 — KO source의 한자 표기 일관성).

### 4.5. truth-leak 정책 준수

직전 batch에서 family-01 d-4 "出生秘密" / friend-01 d-3 "借钱·要钱" / d-4 "扮演反派" hidden keyword 추상화. ZH-CN 본 batch 적용 후 동일 keyword 재도입 X 확인.

특히 family-01 zh-CN 2 P0 영역은 truth-leak 잔존 catch와 무관한지 검증 필요 (현재 잔존 25 P0는 friend-01 d-3 ko/en/ja/zh-CN entries).

### 4.6. confidence 가이드

family-01 EN 의뢰서와 동일.

---

## 5. 검증

```powershell
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs        # baseline 25 유지
npm run qa:lqa                            # ZH-CN 영역 issue 감소
```

---

## 6. 작업 환경

### 6.1. 별도 worktree

```powershell
git fetch
git worktree add D:/solomon-phase2-zhcn-bundle -b codex/phase2-fix-zhcn-3case 22429735
```

### 6.2. 산출물

- Fix commits (case별 + P0/P1/P2 분리 권장)
- `docs/design/translation-lqa-phase/reports/{spouse,family,friend}-01_zh-CN_applied.csv` × 3
- `docs/design/translation-lqa-phase/zhcn-3case-fix-result.md`

---

## 7. 안전 규칙

- ✅ READ: 3개 ZH-CN CSV, KO 정본 파일들, glossary.csv
- ✅ WRITE:
  - `src/data/scriptedText/{spouse,family,friend}-01.zh-CN.json`
  - `src/data/scriptedAngles/{spouse,family,friend}-01_*.zh-CN.json`
  - `src/data/cases/generated/{spouse,family,friend}-01.zh-CN.json`
  - `src/data/dialogues/phase1/{spouse,family,friend}-01.zh-CN.json` (해당 시)
- ✅ WRITE: 산출물 (applied.csv × 3, result.md)
- ❌ KO 정본 / 다른 lang (en/ja) 수정 X
- ❌ matrix.json / glossary.csv 수정 X
- ❌ origin/main push

---

## 8. 우선순위

**P1** — 누적 LQA 부채 해소 묶음. P0는 2건뿐이지만 ZH-CN 일관성 batch로 묶음 처리.

Phase 2 cycle 마무리에 가까운 batch. 후속: spouse-01 EN (P0=0 / P1=20 / P2=6 — 별개 의뢰서).
