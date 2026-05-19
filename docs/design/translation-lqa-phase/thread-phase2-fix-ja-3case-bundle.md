---
name: thread-phase2-fix-ja-3case-bundle
description: Phase 2 LQA fix cycle JA lang 묶음 — spouse-01 + family-01 + friend-01 JA 3 CSV 총 103 entries (27 P0 / 62 P1 / 14 P2). 단일 Codex thread JA 일관성 batch.
metadata:
  origin: claude (CT main thread)
  anchor: a4783759
  severity: P0 (LQA JA 누적 부채 + particle/honorific 일관성)
---

# Phase 2 P0 Fix — JA 3-Case Bundle

Anchor: `a4783759`

---

## 1. 배경

Phase 2 LQA cycle 진행 상황:
- family-01 EN 적용 완료 (`4207c53d`/`318ea0d2`/`a01362ae`)
- ui-global 3 lang 의뢰서 작성 (`315301e8` — Codex 대기)
- friend-01 EN 의뢰서 작성 (`06bf64ab` — Codex 대기)
- truth-leak P0 batch 2 의뢰서 (`f8806582` — Codex 대기)
- 본 의뢰: **JA lang 3 case 묶음**

JA 영역은 일관성 (particle / 어미 / honorific / length expansion) 측면에서 lang 단위 처리가 효율적이라 **단일 Codex thread**에 묶음.

기준 메모리:
- [[feedback-revision-meaning-over-form]] — 9차원 의미 정확성
- [[feedback-claude-ko-needs-codex-multilang]] — 본 의뢰는 JA 단독 sync (KO source unchanged)

---

## 2. 입력 CSV 3개

| CSV | entries | P0 | P1 | P2 | row_id form |
|---|---:|---:|---:|---:|---|
| `docs/design/translation-lqa-phase/reports/spouse-01_ja.csv` | 31 | 12 | 13 | 6 | short id (`spouse-01-a-d-1-...`) |
| `docs/design/translation-lqa-phase/reports/family-01_ja.csv` | 37 | 6 | 23 | 8 | path-based (`scriptedText-interrogation-N`, `case-v3-depth`) |
| `docs/design/translation-lqa-phase/reports/friend-01_ja.csv` | 35 | 9 | 26 | 0 | mixed (`friend-01-case`, `friend-01-angle`, `judgeq-d-1`, `a-d-3`) |
| **합계** | **103** | **27** | **62** | **14** | |

---

## 3. row_id → target 파일 매핑

### 3.1. spouse-01 (short id form, family-01 EN 패턴 동일)

| row_id prefix | target file |
|---|---|
| `spouse-01-a-*` / `spouse-01-b-*` | `src/data/scriptedText/spouse-01.ja.json` 또는 `src/data/scriptedAngles/spouse-01_interrogation_answers.ja.json` |
| `spouse-01-angle-*` | `src/data/scriptedAngles/spouse-01_angle_catalog.ja.json` |
| `spouse-01-judgeq-*` | `src/data/scriptedAngles/spouse-01_judge_questions.ja.json` |
| `spouse-01-mediation-*` | `src/data/scriptedText/spouse-01.ja.json` mediation channel |
| `spouse-01-case-*` | `src/data/cases/generated/spouse-01.ja.json` |
| `spouse-01-phase1-*` | `src/data/dialogues/phase1/spouse-01.ja.json` |
| `spouse-01-aftermath-*` | `src/data/scriptedText/spouse-01.ja.json` aftermath channel |

### 3.2. family-01 (path-based form)

| row_id prefix | target file |
|---|---|
| `scriptedText-interrogation-N` | `src/data/scriptedText/family-01.ja.json` (interrogation channel) ⚠ N=entry index |
| `case-v3-depth-*` | `src/data/cases/generated/family-01.ja.json` (v3Design.depthAtoms 등) |
| 기타 | source_ko + row_id 정밀 매칭으로 식별 |

### 3.3. friend-01 (mixed form, friend-01 EN 패턴과 유사)

| row_id prefix | target file |
|---|---|
| `friend-01-case-*` | `src/data/cases/generated/friend-01.ja.json` |
| `friend-01-angle-*` | `src/data/scriptedAngles/friend-01_angle_catalog.ja.json` |
| `judgeq-d-1-*` ~ `judgeq-d-4-*` | `src/data/scriptedAngles/friend-01_judge_questions.ja.json` |
| `a-d-1-*` / `a-d-3-*` etc. | `src/data/scriptedText/friend-01.ja.json` (interrogation channel variant) 또는 `src/data/scriptedAngles/friend-01_interrogation_answers.ja.json` |

---

## 4. 작업

### 4.1. P0 27건 우선

각 P0 row:
1. row_id parse + source_ko 매치로 target 파일 + path 식별
2. CSV `recommendation` (a/b)에 따라 option_x 값 채택
3. JA 파일의 target_text 필드 교체
4. 9차원 의미 검증 ([[feedback-revision-meaning-over-form]]):
   - 캐릭터 lieState 보존
   - 추궁 차원 보존
   - source_ko 톤 보존
   - **truth-leak 정책 준수** — 직전 batch (`4207c53d`)에서 family-01 d-4 "출생 비밀" / friend-01 d-3·d-4 hidden keyword 추상화. JA 본 batch 적용 후 동일 keyword 도입 X 확인.

### 4.2. P1 62건 후순위

P0 27건 완료 + tsc/qa:fast 통과 후 P1 batch.

### 4.3. P2 14건 (선택)

P0/P1 완료 후 시간 여유 시 P2도 적용.

### 4.4. JA 특수 issue_dim 처리

- **D2 particle**: JA 조사 (が/は/を/に/で) 일관성 — verify-translations strict 모드의 JA particle 룰
- **D4 length**: JA 자연 길이 (KO 대비 1.1~1.3× 일반). 과도한 expansion 회피.
- **D6 honorific**: 인명 spelling lock + 호칭 (さん/씨 등) 일관성
- **D2 voice**: 캐릭터별 어미 (です/ます vs だ) 일관성

### 4.5. confidence 가이드

family-01 EN 의뢰서와 동일:
- ≥0.85: recommendation 그대로
- 0.6~0.85: recommendation + retouch 가능
- <0.6: 재작성 권장

---

## 5. 검증

```powershell
npx tsc -b --noEmit                       # PASS
npm run qa:fast                           # static P0=0, route P0=0
node scripts/detect-truth-leak.cjs        # baseline 25 유지 (JA 영역 truth-leak 도입 X)
npm run qa:lqa                            # JA 영역 issue 감소
```

**기대 결과**:
- qa:lqa total issues 감소 (family-01 EN cycle 적용 시 -88 사례 참고. JA 3 case = 더 큰 감소 예상)
- truth-leak baseline 25 유지 (변동 X)
- tsc PASS, qa:fast P0=0

---

## 6. 작업 환경

### 6.1. 별도 worktree

```powershell
git fetch
git worktree add D:/solomon-phase2-ja-bundle -b codex/phase2-fix-ja-3case f8806582  # 또는 더 최신 anchor a4783759
```

### 6.2. 산출물

- Fix commits (case별 + P0/P1/P2 분리 권장)
- 3개 applied csv:
  - `docs/design/translation-lqa-phase/reports/spouse-01_ja_applied.csv`
  - `docs/design/translation-lqa-phase/reports/family-01_ja_applied.csv`
  - `docs/design/translation-lqa-phase/reports/friend-01_ja_applied.csv`
- `docs/design/translation-lqa-phase/ja-3case-fix-result.md`
  - case별 P0/P1/P2 적용 건수 + skip 건수
  - JA 특수 issue dim별 정리
  - tsc/qa:fast/lqa before/after

---

## 7. 안전 규칙

- ✅ READ: 3개 JA CSV, KO 정본 파일들, glossary.csv
- ✅ WRITE: 
  - `src/data/scriptedText/{spouse,family,friend}-01.ja.json`
  - `src/data/scriptedAngles/{spouse,family,friend}-01_*.ja.json`
  - `src/data/cases/generated/{spouse,family,friend}-01.ja.json`
  - `src/data/dialogues/phase1/{spouse,family,friend}-01.ja.json` (해당 시)
- ✅ WRITE: 산출물 (applied.csv × 3, result.md)
- ❌ KO 정본 (`.json` non-suffix) 수정 X
- ❌ 다른 lang (en / zh-CN) 수정 X
- ❌ matrix.json / glossary.csv 수정 X
- ❌ origin/main push

---

## 8. 우선순위

**P0** — JA 영역 누적 부채 최대 묶음 (27 P0 + 62 P1). 본 의뢰 완료 시 JA 영역 약 90% 정리.

후속 영역:
- family-01 zh-CN (2 P0 / 23 P1)
- spouse-01 EN/ZH-CN (P0=0, P1만)
- friend-01 ZH-CN (P0=0, P1만)
