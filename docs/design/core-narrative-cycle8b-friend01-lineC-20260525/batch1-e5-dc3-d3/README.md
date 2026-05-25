# Batch 1 — friend-01 e-5 + dc-3 + d-3 emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

friend-01 Line C-1 (현재 아버지 패턴 확인)의 **3 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 증거 | `e-5` | 예비신랑 회사 단톡 떠벌림 + 최수민의 9일간 차단 연락 | Line C-1 시작점 — d-2 fired 후 새 자료 영역 |
| 2 | 단서 (dossier) | `dc-3` | 같은 부탁 | e-5 + e-6 조합 결과 — 아버지 반복 시도 패턴 확정 |
| 3 | 쟁점 (hidden) | `d-3` | 아버지의 돈 접근 패턴 | dc-3 fired 후 새 쟁점 등재 — d-4 unlock 전제 |

**본 batch는 cycle 8b 시작점**: e-5 자료가 surface되면 dc-3 combo (e-5+e-6) 가능 → d-3 (아버지 패턴) 새 쟁점 등재. 본 batch 산출이 batch 2 (과거 사기 + 손절 + 증인) 영역의 base.

**핵심 plot revision base**: e-5 자료는 CT plot revision 완료 — 예비신랑 회사 단톡 떠벌림 + 최수민 9일 차단 메시지. 작성 시 본 자료 본질을 정확히 반영 필수.

## 업로드 파일 (총 12개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — e-5 + dc-3 + d-3 emergence narrative 37 entry KO 명세 |
| 2 | [friend01-tone-samples.md](friend01-tone-samples.md) | friend-01 톤 reference (interjection/judge_question/judge_evidence_combo/judge_witness_summon/emotional_overload/contradiction_pursuit) |
| 3 | [feedback_new_dispute_evidence_narrative_justification.md](feedback_new_dispute_evidence_narrative_justification.md) | Core narrative trigger 권위 (multi-trigger + First-Fired-Wins) |
| 4 | [design_core_narrative_cycle_procedure.md](design_core_narrative_cycle_procedure.md) | 8단계 절차 권위 (본 작업은 4단계) |
| 5 | [design_narrative_cascade_from_card.md](design_narrative_cascade_from_card.md) | cascade_from_card trigger spec (Cycle 2 도입) |
| 6 | [feedback_dossier_card_renamed_to_clue.md](feedback_dossier_card_renamed_to_clue.md) | 사건 카드 → 단서 명칭 변경 (Cycle 5 도입) |
| 7 | [feedback_judge_dispassionate_action_focused.md](feedback_judge_dispassionate_action_focused.md) | **재판관 어법 — 감정·가치 판단 회피, 사실/행위 중심 (Cycle 7 도입)** |
| 8 | [feedback_judge_question_quality.md](feedback_judge_question_quality.md) | 재판관 질문 quality |
| 9 | [feedback_natural_korean_npc_active_voice.md](feedback_natural_korean_npc_active_voice.md) | NPC 적극 발화 자연화 5 차원 |
| 10 | [feedback_family_address_speaker_perspective.md](feedback_family_address_speaker_perspective.md) | 본인 가족 호칭 자기 시점 (Cycle 3 도입) |
| 11 | [feedback_avoid_code_abbreviations_with_user.md](feedback_avoid_code_abbreviations_with_user.md) | 사용자 대화 약어 풀어쓰기 |
| 12 | [design_friend01_truth_disclosure_policy.md](design_friend01_truth_disclosure_policy.md) | **friend-01 진실 노출 정책 — 본 batch 핵심 (그룹 2/3 surface tier)** |

## GPT Pro 사용 절차

1. 위 12개 파일 모두 GPT Pro Project File로 업로드 (또는 채팅 첨부)
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 friend-01 Batch 1 (e-5 + dc-3 + d-3) emergence narrative 37개 KO entry 작성.

   준수 정책 (모든 권위 메모리 정독 필수):
   - feedback_new_dispute_evidence_narrative_justification: multi-trigger + First-Fired-Wins
   - design_narrative_cascade_from_card: cascade_from_card trigger spec
   - feedback_dossier_card_renamed_to_clue: "사건 카드" → "단서" 명칭 (player-visible text 영역만)
   - feedback_judge_dispassionate_action_focused: 재판관 감정·가치 판단 회피, 사실/행위 중심 ("선/흐름/낙인" X / "정황/선후관계/관련" O, "과거" 같은 불필요 수식어 회피, "정렬되다" 같은 번역체 회피)
   - design_friend01_truth_disclosure_policy: 본 batch 영역에서 "아버지 사기/투자 명목 사기/미상환" 절대 등장 X (그룹 2는 d-4 영역). d-3 영역에서는 "같은 흐름 / 같은 부탁" 패턴 인식까지만, "사기" 단어 회피
   - feedback_family_address_speaker_perspective: 본인 가족 호칭 자기 시점
   - friend01-tone-samples.md의 캐릭터 voice/tag/register와 일관

   본 cycle 캐릭터 frame (필수):
   - B(최수민) affect_flattening: 자제 톤. b-submit trigger는 "어쩔 수 없이 단답으로 제출" frame. b-outburst trigger 사용 X
   - A(송다은) premature_summary: 결론 먼저 + 부정 외침. a-outburst trigger는 격앙 부정 frame ("그건 조작이야!" / "아버지 일 끌고 들어오지 마!" 등)

   출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - 37 entry id는 의뢰서 §2~§4의 ID 명세 정확히 사용
   - tags는 friend01-tone-samples.md "공통 tag 예시" 패턴 + "Cycle 7 entry 작성 시 신규 tag" 패턴 모두 적용
   - 응답 파일명: output-cycle8b-batch1.json
   ```
3. GPT Pro 응답 (37 entry JSON) → 메인 Claude 세션(ws-friend-01-cycle worktree)에 그대로 붙여넣기 또는 파일 첨부

## 산출 처리 (메인 세션)

GPT Pro 응답 도착 시:
1. JSON 정합성 + tags 검증 + trigger spec 정합 확인
2. `src/data/scriptedText/friend-01.json` emergence_narrative channel에 37 entry 추가
3. (6단계) `src/data/coreCases/friend-01.narrative.ts` 신규 export — `e5NarrativeTriggers` / `dc3NarrativeTriggers` / `d3NarrativeTriggers` (각 4 trigger candidate)
4. `src/data/coreCases/friend-01.case.ts` e-5 / dc-3 / d-3 `narrativeTriggers` field 부착
5. tsc + build + qa:fast PASS 필수
6. Codex 다국어 sync 의뢰서 (37 × 3 lang = 111 entry, 별도 self-contained 폴더 — Batch 2 + plot revision sync와 통합 또는 분리 사용자 결정)

## 폴더 정책

self-contained — 외부 참조 X. 일관 정책: `feedback_external_brief_self_contained_folder` 권위.
