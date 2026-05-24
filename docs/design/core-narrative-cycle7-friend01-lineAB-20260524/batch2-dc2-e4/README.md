# Batch 2 — friend-01 dc-2 + e-4 emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

friend-01 Line B (예비신랑 선 넘기 reframe)의 **2 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 단서 (dossier) | `dc-2` | 먼저 넘은 선 | Line B 핵심 reframe — d-2 truth advance + d-3 unlock 게이트 |
| 2 | 증거 | `e-4` | 예비신랑의 선 넘는 메시지와 최수민의 거절 답장 | dc-2 입력 증거 — 거의 동시 surface |

**dc-2 + e-4는 인과적으로 함께 등장**: combine-2 (e-1 + e-4) 성공 시 dc-2 부상. e-4가 dc-2 입력이므로 dc-2 trigger의 제출 명령이 곧 e-4 surface 경로.

본 batch 양 emergence 모두 처리 — narrative entry 25개 (dc-2 13 + e-4 12).

## 핵심 진실 노출 정책 (본 batch 영역)

- `예비신랑이 먼저` / `선 넘는 메시지` / `최수민의 거절` — **dc-2 부상 시점부터 surface OK** (이전엔 X)
- 본 batch의 dc-2 / e-4 entry에서 위 keyword 자연 등장 OK (단, "선을 넘다" 표현은 dossier label 외엔 재판관 발화 X — 재판관은 "먼저 연락한 메시지" 같은 사실 표현)
- `아버지 사기/돈 접근/미상환` — 절대 등장 X (Line C / Cycle 8 영역)

## 업로드 파일 (총 12개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — dc-2 13 entry + e-4 12 entry = 25 KO entry |
| 2 | [friend01-tone-samples.md](friend01-tone-samples.md) | friend-01 톤 reference |
| 3 | [feedback_new_dispute_evidence_narrative_justification.md](feedback_new_dispute_evidence_narrative_justification.md) | Core narrative trigger 권위 |
| 4 | [design_core_narrative_cycle_procedure.md](design_core_narrative_cycle_procedure.md) | 8단계 절차 |
| 5 | [design_narrative_cascade_from_card.md](design_narrative_cascade_from_card.md) | cascade_from_card trigger spec |
| 6 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | "사건 카드" → "단서" 명칭 |
| 7 | [feedback_judge_dispassionate_action_focused.md](feedback_judge_dispassionate_action_focused.md) | 재판관 어법 |
| 8 | [feedback_judge_question_quality.md](feedback_judge_question_quality.md) | 재판관 질문 quality |
| 9 | [feedback_natural_korean_npc_active_voice.md](feedback_natural_korean_npc_active_voice.md) | NPC 적극 발화 |
| 10 | [feedback_family_address_speaker_perspective.md](feedback_family_address_speaker_perspective.md) | 본인 가족 호칭 자기 시점 |
| 11 | [feedback_avoid_code_abbreviations_with_user.md](feedback_avoid_code_abbreviations_with_user.md) | 약어 풀어쓰기 |
| 12 | [design_friend01_truth_disclosure_policy.md](design_friend01_truth_disclosure_policy.md) | friend-01 진실 노출 정책 |

## GPT Pro 사용 절차

1. 12개 파일 모두 GPT Pro Project File로 업로드
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 friend-01 Batch 2 (dc-2 = 먼저 넘은 선 + e-4 = 예비신랑 메시지/거절) emergence narrative 25개 KO entry 작성.

   준수 정책: Batch 1과 동일 (12개 메모리 + tone samples)
   - dc-1 reference 시 새 label "단톡방 글의 근거" 사용 (cascade trigger의 priorCard reference 포함)
   - dc-2 / e-4 cascade trigger는 priorCard:dc-1 또는 priorCard:dc-2
   - 진실 노출: "예비신랑이 먼저" 영역은 dc-2 부상 시점부터 OK, "아버지/사기/미상환" 절대 X

   출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - 25 entry id는 의뢰서 §2의 ID 명세 정확히 사용
   - 응답 파일명: output-cycle7-batch2.json
   ```
3. GPT Pro 응답 → 메인 Claude 세션에 전달

## 산출 처리 (메인 세션)

1. JSON 정합성 + tags 검증
2. `src/data/scriptedText/friend-01.json` emergence_narrative 채널에 25 entry 추가
3. `src/data/coreCases/friend-01.case.ts`:
   - `dossierCards[id='dc-2'].narrativeTriggers` 부착 (4 후보)
   - `evidence[id='e-4'].narrativeTriggers` 부착 (4 후보)
4. tsc + build + qa:fast PASS
5. Codex 다국어 sync (25 × 3 lang = 75 entry)
