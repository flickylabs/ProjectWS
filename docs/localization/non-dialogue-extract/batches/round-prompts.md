# GPT Pro 배치별 작업 메시지 일괄 — 라운드 1~4

GPT Pro Project가 셋업된 상태에서 각 배치 작업 메시지 일괄 정리.
각 메시지는 새 대화에 첨부 + 복붙으로 사용.

배치 진행 라운드:
- **라운드 0 (완료):** batch_01 (spouse-01 part 1)
- **라운드 1 (진행 중):** batch_02 / batch_03 / batch_04 + (옵션) batch_21
- **라운드 2:** batch_05~08 (family-01)
- **라운드 3:** batch_09~12 (friend-01)
- **라운드 4:** batch_13~16 (global UI / hardcoded)
- **라운드 5:** batch_17~20 (global scripted)

각 배치 작업 메시지는 모두 동일 패턴. 첨부 파일과 배치 ID·case·part 라벨만 다름.

---

## 공통 작업 메시지 템플릿

배치마다 새 대화에 다음 파일 1개 첨부 후, 아래 메시지 복붙(라벨만 교체).

**첨부 (1개):** `docs/localization/non-dialogue-extract/batches/{BATCH_FILE}.csv`

**메시지 (복붙, `{...}` 부분만 교체):**

```
{BATCH_FILE}.csv 첨부합니다.

이 배치({CASE_OR_GLOBAL_LABEL})의 모든 행을 프로젝트 instructions + glossary 기준으로 재번역해주세요.

규칙 재확인:
- id, category, source, case_id, key_path, ko, notes 컬럼은 절대 수정 금지
- en/ja/zh-CN 컬럼만 재번역
- placeholder({count}, {party}, {name}, {phase}) 모든 언어 정확 보존
- e-N, d-N, dc-N, w-N, h-d-N ID 접두 유지
- 빈 ko는 모든 언어 빈 칸 유지
- 동일 ko가 배치 내 반복되면 동일 번역
- 사건 진실은 surface label만 (결과/해석 추가 X)

출력은 동일 컬럼 구조 / 동일 행 순서 CSV. 파일로 출력해주세요.
저장 파일명 권장: {BATCH_FILE}_retranslated.csv
```

---

## 라운드 1 (진행 중) — spouse-01 part 2~4

### batch_02
- **첨부:** `batches/batch_02_spouse01_part2.csv`
- **라벨:** spouse-01 part 2

### batch_03
- **첨부:** `batches/batch_03_spouse01_part3.csv`
- **라벨:** spouse-01 part 3

### batch_04
- **첨부:** `batches/batch_04_spouse01_part4.csv`
- **라벨:** spouse-01 part 4 — spouse-01 마지막 배치

### batch_21 (옵션 — 4번째 슬롯 또는 라운드 5와 함께)
- **첨부:** `batches/batch_21_tutorial_impact_addendum.csv`
- **라벨:** tutorial + impact carrier-script addendum (27행, 빠른 처리)
- 비고: spouse-01 한정 카피(튜토리얼) + 일반 카피(임팩트) 혼합. 진실 누설 사전 통과(메모 컬럼 참조).

---

## 라운드 2 — family-01 part 1~4

### batch_05
- **첨부:** `batches/batch_05_family01_part1.csv`
- **라벨:** family-01 part 1

### batch_06
- **첨부:** `batches/batch_06_family01_part2.csv`
- **라벨:** family-01 part 2

### batch_07
- **첨부:** `batches/batch_07_family01_part3.csv`
- **라벨:** family-01 part 3

### batch_08
- **첨부:** `batches/batch_08_family01_part4.csv`
- **라벨:** family-01 part 4 — family-01 마지막 배치

---

## 라운드 3 — friend-01 part 1~4

### batch_09
- **첨부:** `batches/batch_09_friend01_part1.csv`
- **라벨:** friend-01 part 1

### batch_10
- **첨부:** `batches/batch_10_friend01_part2.csv`
- **라벨:** friend-01 part 2

### batch_11
- **첨부:** `batches/batch_11_friend01_part3.csv`
- **라벨:** friend-01 part 3

### batch_12
- **첨부:** `batches/batch_12_friend01_part4.csv`
- **라벨:** friend-01 part 4 — friend-01 마지막 배치

---

## 라운드 4 — global UI / hardcoded part 1~4

### batch_13
- **첨부:** `batches/batch_13_global_ui_part1.csv`
- **라벨:** global UI part 1 — 시스템 메뉴·버튼·툴팁 영역. 케이스 무관

### batch_14
- **첨부:** `batches/batch_14_global_ui_part2.csv`
- **라벨:** global UI part 2

### batch_15
- **첨부:** `batches/batch_15_global_hardcoded_part1.csv`
- **라벨:** global hardcoded part 1 — 소스에 박힌 한국어/CJK 리터럴

### batch_16
- **첨부:** `batches/batch_16_global_hardcoded_part2.csv`
- **라벨:** global hardcoded part 2

---

## 라운드 5 — global scripted (재판관/시스템/증인 등 비당사자 스크립트) part 1~4

### batch_17
- **첨부:** `batches/batch_17_global_scripted_part1.csv`
- **라벨:** global scripted part 1 — 재판관/증인/시스템 멘트. 진실 누설 가장 위험한 영역

### batch_18
- **첨부:** `batches/batch_18_global_scripted_part2.csv`
- **라벨:** global scripted part 2

### batch_19
- **첨부:** `batches/batch_19_global_scripted_part3.csv`
- **라벨:** global scripted part 3

### batch_20
- **첨부:** `batches/batch_20_global_scripted_part4.csv`
- **라벨:** global scripted part 4 — 본 번역 마지막 배치

---

## 진행 추적

각 배치 완료 시 메인 세션에 알림 → spot check + verify + 다음 라운드 발송. 권장:

- **라운드 1 완료 (spouse-01)** → spouse-01 4건 통합 verify + 다국어 적용 가능 시점
- **라운드 2 완료 (family-01)** → family-01 통합 verify
- **라운드 3 완료 (friend-01)** → friend-01 통합 verify
- **라운드 4 완료 (global UI/hardcoded)** → UI 영역 통합 + UI overflow 점검
- **라운드 5 완료 (global scripted)** → 전체 19,203행 마지막 verify + Phase 3 Codex 반영 의뢰

## 결과 저장 위치 (사용자)

```
docs/localization/non-dialogue-extract/batches/GPT_Result/
├─ batch_01_spouse01_part1_retranslated.csv   ✅
├─ batch_02_spouse01_part2_retranslated.csv   ⏳ 진행 중
├─ batch_03_spouse01_part3_retranslated.csv   ⏳ 진행 중
├─ batch_04_spouse01_part4_retranslated.csv   ⏳ 진행 중
├─ batch_21_tutorial_impact_addendum_retranslated.csv  (옵션)
├─ batch_05~08_family01_partN_retranslated.csv
├─ batch_09~12_friend01_partN_retranslated.csv
├─ batch_13~16_global_*_retranslated.csv
└─ batch_17~20_global_scripted_partN_retranslated.csv
```

## 일관성 위험 사후 검증

- Project 공유 instructions + glossary → 자동 일관성
- 각 라운드 후 `node scripts/verify-translations.cjs --input {결과파일} --glossary GPT_Result/glossary_locked.csv` 실행
- glossary 위배 / placeholder 누락 / CJK 잔류 / English length spike 검출
