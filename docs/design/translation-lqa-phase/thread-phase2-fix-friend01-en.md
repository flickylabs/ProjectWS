---
name: thread-phase2-fix-friend01-en
description: Phase 2 LQA fix cycle 3차 — friend-01 EN 60 entries (18 P0 + 38 P1 + 4 P2). row_id가 path-based 명시 형식이라 write target 다양 (scriptedText/scriptedAngles/cases/generated/witnessTestimonyData). 단일 Codex thread 일괄 적용.
metadata:
  origin: claude (CT main thread)
  anchor: f8806582
  severity: P0 (LQA 누적 외국어 부채)
---

# Phase 2 P0 Fix — friend-01 EN 의뢰서

Anchor: `f8806582`

---

## 1. 배경

직전 cycle 진행 사항:
- Phase 2 family-01 EN 적용 완료 (208 entries / `4207c53d`/`318ea0d2`/`a01362ae`)
- Phase 2 ui-global 3 lang 의뢰서 작성 (Codex 대기)
- 본 의뢰: 다음 hot = friend-01 EN (18 P0 / 38 P1 / 4 P2 = 60 entries)

기준 메모리:
- [[feedback-revision-meaning-over-form]] — 9차원 의미 정확성
- [[feedback-claude-ko-needs-codex-multilang]] — 본 의뢰는 EN 단독 sync (KO source unchanged)

---

## 2. 입력 CSV

**파일**: `docs/design/translation-lqa-phase/reports/friend-01_en.csv`

**Header**: `row_id, source_ko, target_text, category, issue_dim, severity, option_a, option_b, recommendation, confidence, notes`

**Severity 분포**: 18 P0 + 38 P1 + 4 P2 = 60 entries.

**Category 분포**:
- `case_surface_content` — case 메타 / evidence / duo / disputes / combinationLab 영역 (다수)
- `non_party_scripted_text` — dossier / mediation / aftermath variants
- `witness_testimony` — witness testimony 영역
- `judge_question_script` — scriptedAngles judgeQuestions
- `question_angle_catalog` — angle catalog descriptions

---

## 3. row_id → target 파일 매핑

⚠ family-01 EN의 row_id (`family-01-a-d-1-...`)와 **다른 형식**. friend-01 EN row_id는 **path-based 명시 형식**:

```
{category}_src_data_{...path segments...}_{leaf field}
```

각 row_id를 split + 매핑:

| category | 대표 row_id (앞부분) | target 파일 | 비고 |
|---|---|---|---|
| case_surface_content | `..._src_data_cases_generated_friend-01_meta.anchorTruth` | `src/data/cases/generated/friend-01.en.json` | meta/evidence/duo/disputes/combinationLab/v3Design 등 |
| non_party_scripted_text (dossier) | `..._src_data_scriptedText_friend-01_channels_dossier_.entries_dc-2.b.q1_mid_.variants_dc-...` | `src/data/scriptedText/friend-01.en.json` | dossier channel entries.variants |
| non_party_scripted_text (mediation) | `..._channels_mediation_.entries_postpone_a_.variants_mediation-postpone` | `src/data/scriptedText/friend-01.en.json` | mediation channel |
| non_party_scripted_text (aftermath) | `..._channels_aftermath_.entries_protective_resolution_.variants_...` | `src/data/scriptedText/friend-01.en.json` | aftermath channel |
| witness_testimony | `..._src_data_witnessTestimonyData_friend-01.ts_friend-01_witnessTestimony_w3` | `src/data/witnessTestimonyData/friend-01.ts` | TypeScript 파일 — `.en` 분기 위치 확인 후 적용 |
| judge_question_script | `..._src_data_scriptedAngles_friend-01_judgeQuestions_d-1_.variants_judgeq-...` | `src/data/scriptedAngles/friend-01_judge_questions.en.json` | scriptedAngles judgeQuestions |
| question_angle_catalog | `..._src_data_scriptedAngles_friend-01_angles_d-2_.description` | `src/data/scriptedAngles/friend-01_angle_catalog.en.json` 또는 `friend-01_angles.en.json` 확인 필요 | angle 메타 |

row_id의 path segments는 underscore로 split — 각 segment가 JSON 객체 key 또는 배열 인덱스. Codex가 path traversal 직접 구현.

---

## 4. 작업

### 4.1. P0 18건 우선

각 P0 row:
1. row_id parse → target 파일 + path 식별
2. CSV `recommendation` (a/b)에 따라 option_x 값 채택
3. EN 파일의 target_text 필드 교체
4. 9차원 의미 검증 ([[feedback-revision-meaning-over-form]]):
   - 캐릭터 인지 단계 (lieState) 보존
   - 추궁 차원 (정보/동기/책임) 보존
   - source_ko 톤 보존
   - **truth-leak 정책 준수** (글로벌 게이트: d-1 "warning contact" / d-3 "borrow money" / d-4 "villain" 등 hidden keyword 도입 금지)

### 4.2. P1 38건 후순위

P0 완료 + tsc/qa:fast 통과 후 P1 batch.

### 4.3. P2 4건 (선택)

P0/P1 완료 후 시간 여유 시 P2도 적용.

### 4.4. issue_dim 별 처리

CSV `issue_dim`:
- **D2** (consistency) — glossary/용어 일관성
- **D6** (glossary lock) — `docs/localization/glossary.csv` lock term에 정렬 (특히 인명 spelling: Choi Sumin → Choi Su-min 등)
- 기타 — notes 참조

### 4.5. confidence 가이드 (family-01 EN 의뢰서와 동일)

- ≥0.85: recommendation 그대로
- 0.6~0.85: recommendation + retouch 가능
- <0.6: 재작성 권장

---

## 5. 검증

```powershell
npx tsc -b --noEmit                       # PASS (witnessTestimonyData/*.ts 변경 시 type 검증 필요)
npm run qa:fast                           # static P0=0, route P0=0
node scripts/detect-truth-leak.cjs        # baseline 27 (또는 D1 batch 2 적용 후 2) 유지
npm run qa:lqa                            # friend-01 EN 영역 issue 감소
```

**기대 결과**:
- qa:lqa total issues 감소 (family-01 EN 적용 시 -88 감소 사례 참고)
- truth-leak baseline 변동 X (본 의뢰가 새 hidden keyword 도입 X 검증)
- witnessTestimonyData/*.ts 수정 시 tsc 타입 검증 통과

---

## 6. 작업 환경

### 6.1. 별도 worktree

```powershell
git fetch
git worktree add D:/solomon-phase2-friend01-en -b codex/phase2-fix-friend01-en f8806582
```

### 6.2. 산출물

- Fix commits (P0/P1/P2 분리 권장)
- `docs/design/translation-lqa-phase/reports/friend-01_en_applied.csv`
  - 원본 + `applied_text`, `applied_decision` 컬럼
- `docs/design/translation-lqa-phase/friend-01-en-fix-result.md`
  - P0/P1/P2 적용 건수 + skip 건수 + 이유
  - 9차원 검증 메모
  - tsc/qa:fast/lqa before/after

---

## 7. 안전 규칙

- ✅ READ: `docs/design/translation-lqa-phase/reports/friend-01_en.csv`, KO 정본 파일들 (source 참조), glossary.csv
- ✅ WRITE:
  - `src/data/scriptedText/friend-01.en.json`
  - `src/data/scriptedAngles/friend-01_*.en.json`
  - `src/data/cases/generated/friend-01.en.json`
  - `src/data/witnessTestimonyData/friend-01.ts` (EN 분기 영역만)
- ✅ WRITE: 산출물 (applied.csv, result.md)
- ❌ KO 정본 (`.json` non-suffix) 수정 X
- ❌ 다른 case (spouse/family) 또는 다른 lang (ja/zh-CN) 수정 X
- ❌ matrix.json / truth-leak / glossary.csv 수정 X
- ❌ origin/main push

---

## 8. 우선순위

**P0** — Phase 2 LQA cycle 진행, friend-01 EN hot batch. 본 의뢰 완료 시 EN 영역 95% 정리 (잔여 spouse-01 EN 26 P1 / ui-global EN 24 = 별개).

본 의뢰 후 다음 hot:
- JA 3 case 묶음 (spouse 12 P0 + friend 9 P0 + family 6 P0 = 27 P0)
- ui-global JA + ZH-CN (이미 의뢰서 작성됨)
- family-01 zh-CN (2 P0 / 23 P1)
- 잔여 P1/P2 일괄
