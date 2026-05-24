# Batch 4 — spouse-01 h-d3 + w-2(h-d3 영역) emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

자금 line과 병행 발현되는 **잠재 쟁점 + 은행 직원 증인 2 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 쟁점 | `h-d3` | 공동 적금 2,000만원 해지 경위 | 잠재 쟁점 발현 (Hidden Dispute) |
| 2 | 증인 | `w-2` (h-d3 영역) | 은행 직원 (위임장 처리 증언) | dc-7 cascade — 위임장 처리 절차 증언 분기 |

⚠ **w-2 증인의 특수성:** w-2는 d-2 영역(창구 출금)과 h-d3 영역(위임장 해지) 양쪽 모두 cover. 본 batch는 **h-d3 영역 호출 narrative만** 작성. d-2 영역 증언은 별도 cycle.

⚠ **Issue B 영역 — 사용자 권위 보고:** w-2 첫 호출만으로 hidden 쟁점이 풀려나면 안 됨. cascade_from_card (dc-7) 또는 NPC interjection 등 narrative wrapper 필수.

## 업로드 파일 (총 10개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — h-d3 13 entry + w-2(h-d3) 9 entry = 22 KO entry 명세 |
| 2 | [spouse01-tone-samples.md](spouse01-tone-samples.md) | spouse-01 톤 reference |
| 3 | [feedback_new_dispute_evidence_narrative_justification.md](feedback_new_dispute_evidence_narrative_justification.md) | Core narrative trigger 권위 |
| 4 | [design_core_narrative_cycle_procedure.md](design_core_narrative_cycle_procedure.md) | 8단계 절차 권위 |
| 5 | [project_spouse01_event_timeline.md](project_spouse01_event_timeline.md) | spouse-01 사건 흐름 |
| 6 | [feedback_natural_korean_npc_active_voice.md](feedback_natural_korean_npc_active_voice.md) | NPC 발화 자연화 5 차원 |
| 7 | [feedback_judge_question_quality.md](feedback_judge_question_quality.md) | 재판관 질문 품질 |
| 8 | [design_spouse01_truth_disclosure_policy.md](design_spouse01_truth_disclosure_policy.md) | 진실 노출 정책 |
| 9 | [design_core_case_derive_hybrid_merge.md](design_core_case_derive_hybrid_merge.md) | Core System derive 권위 |
| 10 | [feedback_self_reference_speaker_context.md](feedback_self_reference_speaker_context.md) | 자기지시 정밀 |

## GPT Pro 사용 절차

1. 위 10개 파일 모두 GPT Pro Project File로 업로드
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 spouse-01 Batch 4 (h-d3 + w-2 h-d3 영역)
   emergence narrative 22개 KO entry 작성.

   - spouse01-tone-samples.md의 톤·tag·캐릭터 voice와 일관
   - feedback_new_dispute_evidence_narrative_justification 정책 준수
   - cascade_from_card trigger 신규 spec (의뢰서 §3) 준수
   - h-d3는 잠재 쟁점(hidden dispute) — 발현 narrative가 결정적
   - w-2(h-d3) emergence는 호출 가능 surface + h-d3 증언 분기 진입만 작성 (창구 출금 영역 X)
   - 출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - 22 entry id는 의뢰서 §2의 ID 명세 정확히 사용
   - 응답 파일명: output-cycle2-batch4.json
   ```
3. GPT Pro 응답 → 메인 Claude 세션 전달

## 산출 처리 (메인 세션)

1. JSON 정합성 + tags 검증
2. `src/data/scriptedText/spouse-01.json` emergence_narrative channel 추가
3. h-d3 narrativeTriggers + w-2 narrativeTriggers 부착 (dispute type / witness type schema 확장)
4. Codex 다국어 sync 의뢰서 (22 × 3 lang = 66 entry)
5. tsc + build + commit

## 폴더 정책

self-contained. 권위: [[feedback-external-brief-self-contained-folder]]
