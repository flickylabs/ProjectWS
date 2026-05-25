# Batch 1 — family-01 d-4 + e-7 emergence narrative (GPT Pro Upload Bundle)

## Batch 범위

비밀+최종 line의 **시작점 2 emergence**:

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 쟁점 | `d-4` | 가족 기록과 침묵의 이유 | Cycle 6 마지막 단서 [20년의 돈] 후, "그 흐름 *동기*" 자연 후속 — 가족 영역 진입 |
| 2 | 증거 | `e-7` | 오래된 노트 사본 (lockedName=어머니 일기장) | d-4 unlock 후 자료 영역 cascade — 어머니 유품 일기장 첫 surface |

dc-3 → d-4 cascade: Cycle 6 마지막 단서 [20년의 돈] 등록 후, "그 흐름 *동기*가 별도 영역" 명시 → 가족 영역 (d-4 + e-7) 자연 진입.
d-4 → e-7 cascade: 가족 영역 진입 후, 자료(어머니 일기장) 등재 자연 연속.

## 본 batch 핵심 surface 영역 (그룹 1/4)

**surface OK (본 batch 영역)**:
- d-4 S1 영역 = "어머니가 두 아들을 똑같이 보셨다" / "가족 사정 한 줄" (출생 비밀 hook)
- d-4 S2 영역 = "어머니의 우려" / "한쪽이 무너지면 형제 멀어짐"
- d-4 S3 영역 = **출생 비밀 + 친자 양보 surface 시작** (그룹 1/4)
- e-7 surface 자체 = OK (단 "친부 실명" 절대 X — 영구 봉인)

**surface 절대 X (본 batch 모든 entry)**:
- 그룹 3 정확 수치 (90:10 / 60:40) — 본 cycle 모든 batch
- 친부 실명 / 구체적 출생 경위 — 영구 봉인 정책
- 그룹 5 직접 명시 ("보호 명분" / "두 번 왜곡") — Batch 2/3 영역

## 업로드 파일 (총 17개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — d-4 (5 trigger) + e-7 (4 trigger) 명세 |
| 2 | [family01-tone-samples.md](family01-tone-samples.md) | family-01 톤 reference |
| 3 | [sample/output-cycle6-family01-line-b.json](sample/output-cycle6-family01-line-b.json) | **Cycle 6 산출 sample** — entry/tag 형식 직접 reference (가장 최근 동일 패턴) |
| 4~15 | [reference/](reference/) — 권위 메모리 12종 | |

권위 메모리 12종:
- `design_core_narrative_cycle_procedure.md` (8단계 절차)
- `feedback_new_dispute_evidence_narrative_justification.md` (multi-trigger + First-Fired-Wins)
- `design_narrative_cascade_from_card.md` (cascade priorCard 일반화)
- `design_family01_truth_disclosure_policy.md` (그룹 1/4 surface 정책 — **본 batch 핵심**)
- `design_truth_leak_keyword_nature.md` (hidden keyword 본성)
- `feedback_dossier_card_renamed_to_clue.md` (단서 명칭)
- `feedback_judge_dispassionate_action_focused.md` (재판관 어법 — **본 cycle 핵심**)
- `feedback_judge_question_quality.md` (재판관 질문 품질)
- `feedback_family_address_speaker_perspective.md` (본인 가족 호칭 자기 시점)
- `feedback_natural_korean_npc_active_voice.md` (NPC 적극 발화 5 차원)
- `feedback_self_reference_speaker_context.md` (자기지시 발화 주체별)
- `feedback_avoid_code_abbreviations_with_user.md` (코드 약어)

## GPT Pro 사용 절차

1. 위 17개 파일 모두 GPT Pro Project File로 업로드
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 family-01 Cycle 7 Batch 1 (d-4 + e-7)
   emergence narrative KO entry 작성.

   - family01-tone-samples.md의 톤·tag·캐릭터 voice와 일관
   - sample/output-cycle6-family01-line-b.json의 entry/tag 형식 reference
   - feedback_new_dispute_evidence_narrative_justification 정책 준수 (multi-trigger + First-Fired-Wins)
   - design_narrative_cascade_from_card spec 준수 (d-4 cascade priorCard:dc-3 / e-7 cascade priorCard:d-4)
   - design_family01_truth_disclosure_policy 그룹 1 surface 시작 OK (단 친부 실명 X), 그룹 3 정확 수치 X, 그룹 5 직접 명시 X (Batch 2/3 영역)
   - feedback_dossier_card_renamed_to_clue: '단서' 명칭 사용
   - feedback_judge_dispassionate_action_focused 정책 준수
   - 의뢰서 §3 미스터리 dynamics 정책 엄수
   - 의뢰서 §4 시스템 용어 절대 금지
   - 출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - 응답 파일명: output-cycle7-batch1-d4-e7.json
   ```
3. GPT Pro 응답 → 메인 Claude 세션에 전달

## 산출 처리 (메인 세션)

1. JSON 정합성 + tags 검증 + cascade priorCard 정합 확인
2. `src/data/scriptedText/family-01.json` `emergence_narrative` channel 추가 (22 entry append)
3. (6단계) d-4 (Dispute) + e-7 (Evidence) `narrativeTriggers` 부착 — `src/data/coreCases/family-01.case.ts` 변경 + `src/data/coreCases/family-01.narrative.ts` 신규 export 추가
4. `npx tsc --noEmit` + `npm run build` + `npm run -s qa:fast` 모두 PASS
5. Codex 다국어 sync 의뢰서 (KO entry × 3 lang)
6. commit + push

## 폴더 정책

self-contained — 외부 참조 X. 모든 권위 메모리는 reference/ 폴더에 복사.
