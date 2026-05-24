# Batch 1 — friend-01 dc-1 emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

friend-01 Line A (낙인 시작 frame)의 **시작 단서 1 emergence**:

| # | 영역 | id | 자연 명칭 (변경 후) | 인과 위치 |
|---|---|---|---|---|
| 1 | 단서 (dossier) | `dc-1` | **단톡방 글의 근거** (이름 변경) | Line A 시작점 — A 측 단정 책임 frame 부상 |

**dc-1은 cycle 7 시작점**: e-1(연락 기록) + e-2(단톡방 캡처) 모두 baseline → combine-1 성공 시 dc-1 부상. friend-01 사건 진입 직후 매우 일찍 발생 가능.

**핵심 정책 변경**: dc-1 label "확인 없이 매도한 건 누구인가" → "**단톡방 글의 근거**" ("누구" frame이 아닌 "행위/근거" frame). 본 batch entry 작성 시 cascade priorCard reference도 새 label 사용.

## 업로드 파일 (총 12개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — dc-1 13 entry KO 명세 |
| 2 | [friend01-tone-samples.md](friend01-tone-samples.md) | friend-01 톤 reference (interjection/judge_question/judge_evidence_combo/judge_witness_summon/emotional_overload/contradiction_pursuit) |
| 3 | [feedback_new_dispute_evidence_narrative_justification.md](feedback_new_dispute_evidence_narrative_justification.md) | Core narrative trigger 권위 (multi-trigger + First-Fired-Wins) |
| 4 | [design_core_narrative_cycle_procedure.md](design_core_narrative_cycle_procedure.md) | 8단계 절차 권위 (본 작업은 4단계) |
| 5 | [design_narrative_cascade_from_card.md](design_narrative_cascade_from_card.md) | cascade_from_card trigger 신규 spec (Cycle 2 도입) |
| 6 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | 사건 카드 → 단서 명칭 변경 (Cycle 5 도입) |
| 7 | [feedback_judge_dispassionate_action_focused.md](feedback_judge_dispassionate_action_focused.md) | **재판관 어법 — 감정·가치 판단 회피, 사실/행위 중심 (Cycle 7 본 cycle 도입)** |
| 8 | [feedback_judge_question_quality.md](feedback_judge_question_quality.md) | 재판관 질문 quality |
| 9 | [feedback_natural_korean_npc_active_voice.md](feedback_natural_korean_npc_active_voice.md) | NPC 적극 발화 자연화 5 차원 |
| 10 | [feedback_family_address_speaker_perspective.md](feedback_family_address_speaker_perspective.md) | 본인 가족 호칭 자기 시점 (Cycle 3 도입) |
| 11 | [feedback_avoid_code_abbreviations_with_user.md](feedback_avoid_code_abbreviations_with_user.md) | 사용자 대화 약어 풀어쓰기 |
| 12 | [design_friend01_truth_disclosure_policy.md](design_friend01_truth_disclosure_policy.md) | friend-01 진실 노출 정책 (5 keyword 그룹별 단계별 등장 정책) |

## GPT Pro 사용 절차

1. 위 12개 파일 모두 GPT Pro Project File로 업로드 (또는 채팅 첨부)
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 friend-01 Batch 1 (dc-1 = 단톡방 글의 근거) emergence narrative 13개 KO entry 작성.

   준수 정책 (모든 권위 메모리 정독 필수):
   - feedback_new_dispute_evidence_narrative_justification: multi-trigger + First-Fired-Wins
   - design_narrative_cascade_from_card: cascade_from_card trigger spec
   - feedback_dossier_card_renamed_to_clue: "사건 카드" → "단서" 명칭 (player-visible text 영역만)
   - feedback_judge_dispassionate_action_focused: 재판관 감정·가치 판단 회피, 사실/행위 중심 (특히 "선을 넘다"/"흐름" 같은 평가 어휘 X, "먼저 연락"/"정황/선후관계" O)
   - design_friend01_truth_disclosure_policy: 본 cycle (Line A+B) 영역에서 "아버지 사기/투자 명목 사기/미상환" 절대 등장 X, "예비신랑이 먼저"는 A 측 S0~S2 발화에 등장 X
   - feedback_family_address_speaker_perspective: 본인 가족 호칭 자기 시점 (남자가 본인 가족 "시댁" X 등)
   - friend01-tone-samples.md의 캐릭터 voice/tag/register와 일관

   출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - 13 entry id는 의뢰서 §2의 ID 명세 정확히 사용
   - tags는 friend01-tone-samples.md "공통 tag 예시" 패턴 + "Cycle 7 entry 작성 시 신규 tag" 패턴 모두 적용
   - 응답 파일명: output-cycle7-batch1.json
   ```
3. GPT Pro 응답 (13 entry JSON) → 메인 Claude 세션(ws-friend-01-cycle worktree)에 그대로 붙여넣기 또는 파일 첨부

## 산출 처리 (메인 세션)

GPT Pro 응답 도착 시:
1. JSON 정합성 + tags 검증 + trigger spec 정합 확인
2. `src/data/scriptedText/friend-01.json` emergence_narrative channel 추가 (신규 channel)
3. (6단계) `src/data/coreCases/friend-01.case.ts` dc-1 label 변경 ("단톡방 글의 근거") + dc-1 `narrativeTriggers` 부착
4. useActionDispatch / narrativeIntegration 통합 (Cycle 2에서 이미 dispatch hook 설치 — 본 cycle은 데이터만 추가)
5. tsc + build + qa:fast PASS 필수
6. Codex 다국어 sync 의뢰서 (13 × 3 lang = 39 entry, 별도 self-contained 폴더)

## 폴더 정책

self-contained — 외부 참조 X. 일관 정책: `feedback_external_brief_self_contained_folder` 권위.
