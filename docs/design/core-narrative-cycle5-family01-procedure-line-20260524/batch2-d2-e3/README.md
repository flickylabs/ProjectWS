# Batch 2 — family-01 d-2 + e-3 emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

절차/판단 line의 **중간 2 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 쟁점 | `d-2` | 공증 절차의 개입 | d-1 S3 도달 후 쟁점 분리 |
| 2 | 증거 | `e-3` | 전 요양보호사 음성증언 | d-1 S1 + e-2 보유 후 증거 추가 |

dc-1 → d-2 / dc-1 → e-3 cascade — Batch 1 결과(dc-1 단서)에서 두 갈래 자연 분기. d-2는 절차 쟁점 분리, e-3은 절차 증거 보강.

## 업로드 파일 (총 12개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — d-2 (4 trigger) + e-3 (4 trigger) 명세 |
| 2 | [family01-tone-samples.md](family01-tone-samples.md) | family-01 톤 reference |
| 3 | [feedback_new_dispute_evidence_narrative_justification.md](feedback_new_dispute_evidence_narrative_justification.md) | Core narrative trigger 권위 |
| 4 | [design_narrative_cascade_from_card.md](design_narrative_cascade_from_card.md) | cascade_from_card 정책 (d-2/e-3 모두 cascade priorCard:dc-1 사용) |
| 5 | [design_core_narrative_cycle_procedure.md](design_core_narrative_cycle_procedure.md) | 8단계 절차 권위 |
| 6 | [design_family01_truth_disclosure_policy.md](design_family01_truth_disclosure_policy.md) | family-01 진실 노출 정책 |
| 7 | [design_truth_leak_keyword_nature.md](design_truth_leak_keyword_nature.md) | truth-leak hidden 본성 |
| 8 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | '단서' 명칭 변경 |
| 9 | [feedback_natural_korean_npc_active_voice.md](feedback_natural_korean_npc_active_voice.md) | NPC 발화 자연화 |
| 10 | [feedback_judge_question_quality.md](feedback_judge_question_quality.md) | 재판관 질문 품질 |
| 11 | [feedback_self_reference_speaker_context.md](feedback_self_reference_speaker_context.md) | 자기지시 정밀 |
| 12 | [feedback_family_address_speaker_perspective.md](feedback_family_address_speaker_perspective.md) | 본인 가족 호칭 |

## GPT Pro 사용 절차

1. 위 12개 파일 모두 GPT Pro Project File로 업로드
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 family-01 Cycle 5 Batch 2 (d-2 + e-3)
   emergence narrative KO entry 작성.

   - family01-tone-samples.md의 톤·tag·캐릭터 voice와 일관
   - feedback_new_dispute_evidence_narrative_justification 정책 준수
   - design_narrative_cascade_from_card spec 준수 (d-2/e-3 모두 cascade priorCard:dc-1)
   - design_family01_truth_disclosure_policy 그룹 1~5 surface 금지 (Line A 영역 진입 X)
   - feedback_dossier_card_renamed_to_clue: '단서' 명칭 사용
   - 출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - entry id는 의뢰서 §2의 ID 명세 정확히 사용
   - 응답 파일명: output-cycle5-batch2.json
   ```
3. GPT Pro 응답 → 메인 Claude 세션에 전달

## 산출 처리 (메인 세션)

1. JSON 정합성 + tags 검증
2. `src/data/scriptedText/family-01.json` `emergence_narrative` channel 추가
3. (6단계) d-2 (Dispute) + e-3 (EvidenceNode) narrativeTriggers 부착
4. tsc + build + qa:fast PASS
5. Codex 다국어 sync 의뢰서 (Batch 2 entry × 3 lang)
6. commit + push

## 폴더 정책

self-contained — 외부 참조 X.
