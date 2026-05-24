# Cycle 3 — spouse-01 외도 line emergence narrative (GPT Pro Upload, 단일 Batch)

## Cycle 3 개요

배우자 사건(spouse-01)의 **외도 line(d-1 영역) emergence 4개**에 narrative wrapper 부착. d-1 쟁점(오피스텔 방문과 새벽 전화 — 외도 의심) 자체는 게임 시작부터 노출되는 initial dispute이므로 wrapper 대상 X. 본 cycle은 d-1 line 진행 중 등장하는 새 증거/사건 카드/증인의 발현 narrative를 처리.

### 대상 emergence 4개

| # | 영역 | id | 자연 명칭 | 인과 위치 |
|---|---|---|---|---|
| 1 | 증거 | `e-4` | 발신자 미상 문자 | d-1 S1 시점 통화기록(e-3) cascade로 등장하는 반전 단서 |
| 2 | 사건 카드 | `dc-1` | 오피스텔의 사람들 | combine-1 (e-1+e-2) 조합 → 외도 frame 반전 첫 카드 |
| 3 | 증인 | `w-1` | 오피스텔 경비 | dc-1 발현 후 호출 가능 surface 등장 |
| 4 | 사건 카드 | `dc-2` | 시댁 얘기만 나오면 싸움 | combine-6 (stmt-b-family + e-4) → 동기 frame (cross-line: d-1 + d-2) |

### 외도 line 인과 chain

```
[초기 노출 — 외도 frame 시작]
  e-1 (영수증 5장) + e-2 (블랙박스 GPS) + e-3 (통화기록)  ← 게임 시작
      ↓
[Cycle 3 처리 영역]
  e-4 (발신자 미상 문자)          ← e-3 cascade 또는 npc 끼어듦으로 등장
      ↓
  dc-1 (오피스텔의 사람들)         ← combine-1 또는 e-4 cascade로 등장
      ↓
  w-1 (오피스텔 경비 호출 가능)     ← dc-1 cascade
      ↓
  dc-2 (시댁 얘기만 나오면 싸움)    ← combine-6 또는 dc-1 cascade (cross-line)
```

## 본 cycle 주의사항 (사용자 권위 명시)

### 본인 가족 호칭 자기 시점 정책 (신규 메모리 등재)

dc-2 emergence Trigger 3(이준호 감정 돌발)에서 처음 발견된 패턴:
- ✗ B(이준호) 격앙: "**시댁** 얘기는 이제 그만 좀!"
- ✓ B(이준호) 격앙: "**우리 집** 얘기는 이제 그만 좀!"

"시댁"은 아내 시점 호칭(시집 = 며느리 입장 표현). 남편 본인이 자기 가족을 "시댁"으로 부르는 것은 자기 객관화의 어색함. 자기 시점 호칭("우리 집/우리 가족/형/형네")이 자연.

권위 메모리: `feedback_family_address_speaker_perspective.md` (본 폴더 포함)

### 진실 노출 정책 엄격 적용

`design_spouse01_truth_disclosure_policy.md` 권위:
- 본 cycle 모든 emergence narrative entry에서 "친형 / 조카 / 중2 / 개인회생 / 형사 절차" keyword 절대 X
- d-1 S0~S3 영역까지의 표면 단어 (가족 쪽 일 / 시댁 갈등 공포 / 챙겨야 할 사람) 까지만 surface 가능
- 특히 dc-2 emergence narrative가 가장 위험 영역 — "시댁 갈등 공포" 동기 frame까지는 OK, "형 조카 돌봄"은 X

### 신규 정책: cascade_from_card trigger (Cycle 2에서 도입)

본 cycle도 4 emergence 중 3개에서 cascade_from_card trigger 사용 (e-4 ← e-3, dc-1 ← e-4, w-1 ← dc-1, dc-2 ← dc-1). 권위: `design_narrative_cascade_from_card.md`

## 본 폴더 업로드 파일 (총 12개)

| # | 파일 | 역할 |
|---|---|---|
| 1 | [gpt-pro-brief.md](gpt-pro-brief.md) | **주 의뢰서** — 4 emergence × 4 trigger = ~52 KO entry 명세 |
| 2 | [spouse01-tone-samples.md](spouse01-tone-samples.md) | spouse-01 톤 reference |
| 3 | [feedback_new_dispute_evidence_narrative_justification.md](feedback_new_dispute_evidence_narrative_justification.md) | Core narrative trigger 권위 |
| 4 | [design_core_narrative_cycle_procedure.md](design_core_narrative_cycle_procedure.md) | 8단계 절차 권위 |
| 5 | [design_narrative_cascade_from_card.md](design_narrative_cascade_from_card.md) | cascade_from_card 권위 |
| 6 | [project_spouse01_event_timeline.md](project_spouse01_event_timeline.md) | spouse-01 사건 흐름 |
| 7 | [feedback_natural_korean_npc_active_voice.md](feedback_natural_korean_npc_active_voice.md) | NPC 발화 자연화 5 차원 |
| 8 | [feedback_judge_question_quality.md](feedback_judge_question_quality.md) | 재판관 질문 품질 |
| 9 | [design_spouse01_truth_disclosure_policy.md](design_spouse01_truth_disclosure_policy.md) | 진실 노출 정책 |
| 10 | [design_core_case_derive_hybrid_merge.md](design_core_case_derive_hybrid_merge.md) | Core System derive 권위 |
| 11 | [feedback_self_reference_speaker_context.md](feedback_self_reference_speaker_context.md) | 자기지시 정밀 |
| 12 | [feedback_family_address_speaker_perspective.md](feedback_family_address_speaker_perspective.md) | **신규** — 본인 가족 호칭 자기 시점 정책 |

## GPT Pro 사용 절차

1. 위 12개 파일 모두 GPT Pro Project File로 업로드 (또는 채팅 첨부)
2. 다음 prompt:
   ```
   첨부한 gpt-pro-brief.md 의뢰서대로 spouse-01 Cycle 3 외도 line
   emergence narrative ~52개 KO entry 작성.

   - spouse01-tone-samples.md의 톤·tag·캐릭터 voice와 일관
   - feedback_new_dispute_evidence_narrative_justification 정책 준수
   - design_narrative_cascade_from_card 신규 trigger spec 준수
   - design_spouse01_truth_disclosure_policy 진실 노출 정책 엄격 준수
   - feedback_family_address_speaker_perspective 본인 가족 호칭 자기 시점 (시댁/처가 → 우리 집/친정)
   - 출력 형식: JSON 배열 (각 entry: {id, text, behaviorHint, tags})
   - entry id는 의뢰서 §2의 ID 명세 정확히 사용
   - 응답 파일명: output-cycle3-affair-line.json
   ```
3. GPT Pro 응답 (~52 entry JSON) → 메인 Claude 세션에 그대로 전달 (파일 또는 paste)

## 산출 처리 흐름 (메인 Claude 세션)

8단계 절차 ([[design_core_narrative_cycle_procedure]]) 기준:

- ✅ 0~2단계 완료 (정찰 / 기획 / 사용자 승인)
- 🟢 **3단계 (본 폴더)** — GPT 의뢰서 준비
- ⬜ 4단계 — 사용자 GPT Pro 진행
- ⬜ 5단계 — Claude 검토 + 수정 시안 제안 + 사용자 승인
- ⬜ 6단계 — 4 entity (e-4 evidence / dc-1·dc-2 dossier / w-1 witness) narrativeTriggers 부착 + dispatch 통합 + tsc/build + qa:fast
- ⬜ 7단계 — Codex 다국어 sync 의뢰서 (약 52 × 3 lang = 156 entry)
- ⬜ 8단계 — 사후 통합

## 폴더 정책

본 폴더 self-contained — 외부 참조 X.
권위: [[feedback-external-brief-self-contained-folder]] / [[feedback-external-brief-path-explicit]]
