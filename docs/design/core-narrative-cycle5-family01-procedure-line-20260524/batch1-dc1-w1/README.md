# Batch 1 — family-01 dc-1 + w-1 emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

절차/판단 line의 **시작점 2 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 단서 | `dc-1` | 말년의 종이 | 어머니 말년 방문 + 종이 낭독 정황 — Line A 시작 |
| 2 | 증인 | `w-1` | 전 요양보호사 최복순 | dc-1 unlock 후 직접 청취 가능 — cascade |

dc-1 → w-1 cascade: 단서 [말년의 종이] 등록 직후, 그 단서의 직접 목격자(최복순)를 호출하는 자연 흐름.

## 업로드 파일 (총 11개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — dc-1 (4 trigger × 약 3 entry) + w-1 (3 trigger × 약 3 entry) 명세 |
| 2 | [family01-tone-samples.md](family01-tone-samples.md) | family-01 톤 reference (judge/interjection/judge_evidence_combo/emotional_overload/dossier/witness 채널) |
| 3 | [feedback_new_dispute_evidence_narrative_justification.md](feedback_new_dispute_evidence_narrative_justification.md) | Core narrative trigger 권위 (multi-trigger + First-Fired-Wins) |
| 4 | [design_narrative_cascade_from_card.md](design_narrative_cascade_from_card.md) | cascade_from_card trigger 정책 (본 batch 핵심 — w-1 cascade) |
| 5 | [design_core_narrative_cycle_procedure.md](design_core_narrative_cycle_procedure.md) | 8단계 절차 권위 (본 작업은 4단계) |
| 6 | [design_family01_truth_disclosure_policy.md](design_family01_truth_disclosure_policy.md) | family-01 진실 노출 정책 (Line A 허용/금지 영역 명시) |
| 7 | [design_truth_leak_keyword_nature.md](design_truth_leak_keyword_nature.md) | truth-leak hidden 본성 분류 |
| 8 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | **'사건 카드 → 단서' 명칭 변경 (Cycle 5 신규)** |
| 9 | [feedback_natural_korean_npc_active_voice.md](feedback_natural_korean_npc_active_voice.md) | NPC 적극 발화 자연화 5 차원 |
| 10 | [feedback_judge_question_quality.md](feedback_judge_question_quality.md) | 재판관 질문 품질 |
| 11 | [feedback_self_reference_speaker_context.md](feedback_self_reference_speaker_context.md) | 자기지시 정밀 |
| 12 | [feedback_family_address_speaker_perspective.md](feedback_family_address_speaker_perspective.md) | 본인 가족 호칭 자기 시점 정책 |

## GPT Pro 사용 절차

1. 위 12개 파일 모두 GPT Pro Project File로 업로드 (또는 채팅 첨부)
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 family-01 Cycle 5 Batch 1 (dc-1 + w-1)
   emergence narrative KO entry 작성.

   - family01-tone-samples.md의 톤·tag·캐릭터 voice와 일관
   - feedback_new_dispute_evidence_narrative_justification 정책 준수
   - design_narrative_cascade_from_card spec 준수 (w-1 cascade priorCard:dc-1)
   - design_family01_truth_disclosure_policy 그룹 1~5 surface 금지 영역 엄수 (Line A는 그룹 1~5 어디에도 진입 X)
   - feedback_dossier_card_renamed_to_clue: 'dossier card / 사건 카드' → '단서' (player-visible text)
   - 출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - entry id는 의뢰서 §2의 ID 명세 정확히 사용
   - 응답 파일명: output-cycle5-batch1.json
   ```
3. GPT Pro 응답 (KO entry JSON) → 메인 Claude 세션에 그대로 붙여넣기 또는 파일 첨부

## 산출 처리 (메인 세션)

GPT Pro 응답 도착 시:
1. JSON 정합성 + tags 검증 + cascade_from_card trigger spec 정합 확인 (priorCard:dc-1 명시)
2. `src/data/scriptedText/family-01.json` 의 `emergence_narrative` channel 추가 (신규 channel 작성)
3. (6단계) dc-1 (DossierCard) + w-1 (Witness) narrativeTriggers 부착
4. dc-2 label rename 적용 ('줄인 유서' → '수정된 유언장') — Batch 3 emergence 진입 전 사전 작업
5. tsc + build + qa:fast PASS
6. Codex 다국어 sync 의뢰서 (Batch 1 entry × 3 lang, 별도 self-contained 폴더)
7. commit + push

## 폴더 정책

self-contained — 외부 참조 X. 일관 정책: [[feedback-external-brief-self-contained-folder]] 권위.
