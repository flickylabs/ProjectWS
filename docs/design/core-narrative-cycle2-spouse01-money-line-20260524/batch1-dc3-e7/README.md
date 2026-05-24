# Batch 1 — spouse-01 dc-3 + e-7 emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

자금 흐름 line의 **시작점 2 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 사건 카드 | `dc-3` | 이준호의 비밀 개인 계좌 | B 비자금 출처 — line 시작 |
| 2 | 증거 | `e-7` | 공동 적금 해지 서류 | A 위임장 단서 — 자금 line의 A 측 진입 |

dc-3 → e-7 cascade — B 비자금이 드러난 직후, A 측 자금 흐름도 같이 검토되며 위임장 단서 부각.

## 업로드 파일 (총 10개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — dc-3 13 entry + e-7 12 entry = 25 KO entry 명세 |
| 2 | [spouse01-tone-samples.md](spouse01-tone-samples.md) | spouse-01 톤 reference (judge/interjection/judge_evidence_combo/emotional_overload) |
| 3 | [feedback_new_dispute_evidence_narrative_justification.md](feedback_new_dispute_evidence_narrative_justification.md) | Core narrative trigger 권위 |
| 4 | [design_core_narrative_cycle_procedure.md](design_core_narrative_cycle_procedure.md) | 8단계 절차 권위 |
| 5 | [project_spouse01_event_timeline.md](project_spouse01_event_timeline.md) | spouse-01 사건 흐름 |
| 6 | [feedback_natural_korean_npc_active_voice.md](feedback_natural_korean_npc_active_voice.md) | NPC 적극 발화 자연화 5 차원 |
| 7 | [feedback_judge_question_quality.md](feedback_judge_question_quality.md) | 재판관 질문 품질 |
| 8 | [design_spouse01_truth_disclosure_policy.md](design_spouse01_truth_disclosure_policy.md) | spouse-01 진실 노출 정책 |
| 9 | [design_core_case_derive_hybrid_merge.md](design_core_case_derive_hybrid_merge.md) | Core System derive 권위 |
| 10 | [feedback_self_reference_speaker_context.md](feedback_self_reference_speaker_context.md) | 자기지시 발화 정밀 |

## GPT Pro 사용 절차

1. 위 10개 파일 모두 GPT Pro Project File로 업로드 (또는 채팅 첨부)
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 spouse-01 Batch 1 (dc-3 + e-7)
   emergence narrative 25개 KO entry 작성.

   - spouse01-tone-samples.md의 톤·tag·캐릭터 voice와 일관
   - feedback_new_dispute_evidence_narrative_justification 정책 준수
   - cascade_from_card trigger 신규 spec (의뢰서 §3) 준수
   - 출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - 25 entry id는 의뢰서 §2의 ID 명세 정확히 사용
   - 응답 파일명: output-cycle2-batch1.json
   ```
3. GPT Pro 응답 (25 entry JSON) → 메인 Claude 세션에 그대로 붙여넣기 또는 파일 첨부

## 산출 처리 (메인 세션)

GPT Pro 응답 도착 시:
1. JSON 정합성 + tags 검증 + cascade_from_card trigger spec 정합 확인
2. `src/data/scriptedText/spouse-01.json` emergence_narrative channel 추가
3. (6단계) schema 확장 (`cascade_from_card` trigger type 신규) + dc-3 / e-7 narrativeTriggers 부착
4. useActionDispatch 통합 (dossierCard 발현 시점에서도 dispatch 호출 — 신규 hook)
5. Codex 다국어 sync 의뢰서 (25 × 3 lang = 75 entry, 별도 self-contained 폴더)
6. tsc + build + commit + push

## 폴더 정책

self-contained — 외부 참조 X. 일관 정책: [[feedback-external-brief-self-contained-folder]] 권위.
