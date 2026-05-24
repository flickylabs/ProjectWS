# Batch 3 — spouse-01 dc-4 + w-3 emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

자금 흐름 line의 **종결 + 외부 증인 2 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 사건 카드 | `dc-4` | 돌이키고 싶은 2,000만 원 | A 사기 손실 line 종결 (수치·후회) |
| 2 | 증인 | `w-3` | 박미라 (카페 운영) | 투자방 링크 전달자 — 외부 증인 |

dc-4 → w-3 cascade — A의 사기 손실이 확정된 직후, 투자방 링크 출처 확인 필요성 → 박미라 호출 가능 surface.

⚠ **증인 emergence의 특수성:** 증언 자체는 별도 `witness` channel이 담당. 본 batch의 w-3 emergence는 **"호출 가능 surface" 시점의 narrative wrapper**만 작성.

## 업로드 파일 (총 10개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — dc-4 12 entry + w-3 13 entry = 25 KO entry 명세 |
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
   첨부한 gpt-pro-brief.md 의뢰서대로 spouse-01 Batch 3 (dc-4 + w-3)
   emergence narrative 25개 KO entry 작성.

   - spouse01-tone-samples.md의 톤·tag·캐릭터 voice와 일관
   - feedback_new_dispute_evidence_narrative_justification 정책 준수
   - cascade_from_card trigger 신규 spec (의뢰서 §3) 준수
   - w-3 emergence는 "호출 가능 surface" 시점의 narrative만 작성 (증언 자체는 별도 channel)
   - 출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - 25 entry id는 의뢰서 §2의 ID 명세 정확히 사용
   - 응답 파일명: output-cycle2-batch3.json
   ```
3. GPT Pro 응답 → 메인 Claude 세션 전달

## 산출 처리 (메인 세션)

1. JSON 정합성 + tags 검증
2. `src/data/scriptedText/spouse-01.json` emergence_narrative channel 추가
3. dc-4 narrativeTriggers + w-3 narrativeTriggers 부착 (witness type 신규 schema 확장)
4. Codex 다국어 sync 의뢰서 (25 × 3 lang = 75 entry)
5. tsc + build + commit

## 폴더 정책

self-contained. 권위: [[feedback-external-brief-self-contained-folder]]
