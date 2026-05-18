# Translation Batch Progress

Status values: `pending`, `in-gpt-pro`, `translated`, `applied`, `verified`.


Note: the current priority inventory stores `non_party_scripted_text` and `judge_question_script` with case scopes, so those rows are included in batches 01-12. Batches 17-20 keep the requested slots and carry global overflow rows instead.

| Batch | File | Rows | Case scope | Categories | Status | Notes |
| --- | --- | ---: | --- | --- | --- | --- |
| 01 | batch_01_spouse01_part1.csv | 1137 | spouse-01 | case_surface_content:1137 | translated | verify-report PASS (length spike only) |
| 02 | batch_02_spouse01_part2.csv | 1459 | spouse-01 | case_surface_content:139;judge_question_script:1320 | translated | verify-report PASS (length spike only) |
| 03 | batch_03_spouse01_part3.csv | 1349 | spouse-01 | mediation_judge_line:4;non_party_scripted_text:1345 | translated | verify-report PASS (length spike only) |
| 04 | batch_04_spouse01_part4.csv | 564 | spouse-01 | non_party_scripted_text:485;phase_dialogue_judge_choice:11;question_angle_catalog:8;witness_testimony:60 | translated | verify-report PASS (length spike only) |
| 05 | batch_05_family01_part1.csv | 1449 | family-01 | case_surface_content:1089;judge_question_script:360 | translated | verify-report 미생성 |
| 06 | batch_06_family01_part2.csv | 1200 | family-01 | judge_question_script:1200 | translated | verify-report 미생성 |
| 07 | batch_07_family01_part3.csv | 1164 | family-01 | mediation_judge_line:4;non_party_scripted_text:1160 | translated | verify-report 미생성 |
| 08 | batch_08_family01_part4.csv | 1046 | family-01 | non_party_scripted_text:965;phase_dialogue_judge_choice:11;question_angle_catalog:10;witness_testimony:60 | translated | verify-report 미생성 |
| 09 | batch_09_friend01_part1.csv | 1527 | friend-01 | case_surface_content:1527 | translated | verify-report 미생성 |
| 10 | batch_10_friend01_part2.csv | 1422 | friend-01 | case_surface_content:702;judge_question_script:720 | translated | verify-report 미생성 |
| 11 | batch_11_friend01_part3.csv | 1439 | friend-01 | judge_question_script:480;mediation_judge_line:4;non_party_scripted_text:955 | translated | verify-report 미생성 |
| 12 | batch_12_friend01_part4.csv | 1046 | friend-01 | non_party_scripted_text:965;phase_dialogue_judge_choice:11;question_angle_catalog:10;witness_testimony:60 | translated | verify-report 미생성 |
| 13 | batch_13_global_ui_part1.csv | 583 | (global) | ui_i18n_message:583 | translated | verify-report PASS (length spike 24건) |
| 14 | batch_14_global_ui_part2.csv | 546 | (global) | hardcoded_source_literal:150;ui_i18n_message:396 | translated | verify-report PASS (length spike 23건) |
| 15 | batch_15_global_hardcoded_part1.csv | 546 | (global) | hardcoded_source_literal:546 | translated | verify-report PASS (length spike 34건) |
| 16 | batch_16_global_hardcoded_part2.csv | 546 | (global) | hardcoded_source_literal:546 | translated | verify-report PASS (length spike 38건) |
| 17 | batch_17_global_scripted_part1.csv | 545 | (global) | hardcoded_source_literal:545 | translated | verify-report PASS (length spike 14건) |
| 18 | batch_18_global_scripted_part2.csv | 545 | (global) | hardcoded_source_literal:545 | translated | verify-report PASS (length spike 34건) |
| 19 | batch_19_global_scripted_part3.csv | 545 | (global) | hardcoded_source_literal:545 | translated | verify-report PASS (length spike 65건) |
| 20 | batch_20_global_scripted_part4.csv | 545 | (global) | hardcoded_source_literal:545 | translated | verify-report PASS (length spike 54건) |
| 21 | batch_21_tutorial_impact_addendum.csv | 27 | mixed | ui_i18n_message:27 | translated | tutorial/impact addendum mini-batch. verify-report PASS (length spike 2건) |
| 22 | batch_22_consolidated_retranslation.csv | 11 | mixed | ui_i18n_message:10 + non_party_scripted_text:1 | translated | verify-report PASS (P0 0건, length spike 2건). batch_11 row 503 EN "整理" 잔류 + 3개 언어 4번째 문장 truncation 모두 fix 확인 |
| 23 | batch_23_aftermath_audit.csv | 100 | mixed | non_party_scripted_text:100 (channels[aftermath] 전체) | translated | verify-report PASS (P0 0건, length spike 77건). spot check: 검출 10건 truncation 모두 KR 문장 수 일치로 완치 (예: spouse-01 procedural_caution-v2 JA 1→3 sents). batch_03/07/11 aftermath 영역 무효화, batch_23이 권위. phase3_effective에 100/100 매치 머지 완료 |
| 24 | batch_24_tutorial_copy_refresh.csv | 14 | spouse-01 | ui_i18n_message:14 | translated | verify PASS (P0 0, length spike 2). spot check: 마스코트 톤 + UI 라벨 4언어 통일 ✓. phase3_effective에 11 replace + 3 append (총 19,243 rows). 단 step 2 body 신규 variant 2건은 batch_25로 분리 |
| 25 | batch_25_tutorial_statement_variants.csv | 2 | spouse-01 | ui_i18n_message:2 | translated | verify PASS (P0 0). tutorial.ts에 4언어 직접 적용 + phase3_effective에 2 append → 19,245 rows. tutorial 영역 단일 source of truth |
