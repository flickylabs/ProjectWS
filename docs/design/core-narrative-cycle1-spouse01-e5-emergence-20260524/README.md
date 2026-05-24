# Cycle 1 — spouse-01 e-5 emergence narrative (GPT Pro Upload Bundle)

## 폴더 목적

GPT Pro에 한 번에 업로드할 self-contained 묶음. 별도 외부 참조 X — 본 폴더 파일만으로 작업 가능.

## 업로드 파일 (총 7개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — 13 KO entry 명세 (트리거 3 + fallback) |
| 2 | [spouse01-tone-samples.md](spouse01-tone-samples.md) | spouse-01 4 채널 톤 reference (judge_question / interjection / judge_evidence_combo / emotional_overload) |
| 3 | [feedback_new_dispute_evidence_narrative_justification.md](feedback_new_dispute_evidence_narrative_justification.md) | Core narrative trigger 권위 (multi-trigger + first-fired-wins) |
| 4 | [project_spouse01_event_timeline.md](project_spouse01_event_timeline.md) | spouse-01 사건 흐름 (외도 의심 → 위임장 → 적금 해지 → 투자방) |
| 5 | [feedback_natural_korean_npc_active_voice.md](feedback_natural_korean_npc_active_voice.md) | NPC 적극 발화 자연화 5 차원 |
| 6 | [feedback_judge_question_quality.md](feedback_judge_question_quality.md) | 재판관 질문 품질 (간접 인용 / 자연어) |
| 7 | [design_spouse01_truth_disclosure_policy.md](design_spouse01_truth_disclosure_policy.md) | spouse-01 진실 노출 정책 (S5 전 자백 surface 금지 영역) |

## GPT Pro 사용 절차

1. 위 7개 파일 모두 GPT Pro Project File로 업로드 (또는 채팅 첨부)
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 spouse-01 e-5 emergence narrative 13개 KO entry 작성.

   - spouse01-tone-samples.md의 톤·tag·캐릭터 voice와 일관
   - feedback_new_dispute_evidence_narrative_justification 정책 준수
   - 출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - 13 entry id는 의뢰서 §2의 ID 명세 정확히 사용
   ```
3. GPT Pro 응답 (13 entry JSON) → 메인 Claude 세션에 그대로 붙여넣기

## 산출 처리 (메인 세션)

GPT Pro 응답 도착 시 메인 Claude 세션이:
1. JSON 정합성 + tags 검증
2. `src/data/scriptedText/spouse-01.json` 적절 위치 추가
3. e-5 `narrativeTriggers` wiring (Phase 4)
4. 신규 combine recipe `clue-cash-pattern` 추가
5. useActionDispatch refreshEvidenceUnlocks 경로 통합
6. VFX wiring
7. Codex 다국어 sync 의뢰서 (13 × 3 lang = 39 entry, 별도 self-contained 폴더)
8. tsc + commit + push

## 폴더 정책

본 폴더는 self-contained — 메모리 파일들이 폴더에 복사돼 있어 외부 참조 X. 일관 정책: [feedback-external-brief-path-explicit](../../../memory/feedback_external_brief_path_explicit.md) 및 [feedback-external-brief-self-contained-folder](../../../memory/feedback_external_brief_self_contained_folder.md) 권위.
