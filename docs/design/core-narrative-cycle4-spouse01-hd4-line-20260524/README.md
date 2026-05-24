# Cycle 4 — spouse-01 h-d4 line emergence narrative (GPT Pro 의뢰서 폴더)

작성일: 2026-05-25
주체: Claude (정찰/기획/3단계) → GPT Pro (4단계 KO 시안) → Claude (5~8단계 검증·적용·다국어·통합)
범위: 4 emergence (e-8 / e-9 / dc-8 / h-d4) × 4 trigger 후보 = 16 trigger / **총 51 KO entry**
선행: CT 세션 [`session_handoff_20260524_ct_spouse01_cycle4_plot_revision_complete`] HEAD `cb3e9d01`에서
case.ts authority 14 영역 + ScriptedText 6 채널 KO base 6 batch / 62 entry / ~162 variant 적용 완료.
본 cycle은 narrative wrapper 단일 채널(`emergence_narrative`)만 작업.

---

## 폴더 구성

| 파일 | 용도 |
|---|---|
| `README.md` | 본 인덱스 + GPT Pro 사용 절차 |
| `gpt-pro-brief.md` | **메인 의뢰서** — 16 trigger × 51 KO entry 정밀 명세 |
| `spouse01-tone-samples.md` | spouse-01 emergence_narrative 13 기존 entry 발췌 + 채널 톤 reference |
| `batch7-reuse-spec.md` | **Batch 7 mediation 시안 → h-d4 fallback (4-d) 재활용 명세** |
| `batch7-original.json` | Batch 7 원본 시안 사본 (재활용 대상 = `mediation-h-d4-S4-responsibility-split-v1`) |
| `memory/` | 권위 메모리 9개 사본 (정독 필수) |
| `result/` | GPT Pro 응답 파일 저장 위치 (`output-cycle4-hd4-line.json`) |

---

## GPT Pro 사용 절차 (사용자 진행 4단계)

1. ChatGPT Projects 에 본 폴더 전체 업로드 (Projects File 영구 저장 — [[design_gpt_projects_workflow]])
2. 새 thread 시작 → 다음 prompt 사용:

```
첨부 폴더의 README.md 정독 후 gpt-pro-brief.md 의 §1~§7 spec에 따라
spouse-01 Cycle 4 emergence narrative KO entry 51개를 작성해 주세요.

권위 메모리 (memory/ 폴더) 9개 모두 정독 필수:
- design_core_narrative_cycle_procedure.md (8단계 절차)
- feedback_new_dispute_evidence_narrative_justification.md (multi-trigger + First-Fired-Wins)
- design_narrative_cascade_from_card.md (cascade trigger)
- design_spouse01_truth_disclosure_policy.md (**본 cycle 가장 위험 — h-d4 발현 전까지 박지연 난임/치료비 keyword 절대 surface X**)
- feedback_family_address_speaker_perspective.md (B 발화에 자기 가족 "시댁" X)
- feedback_judge_dispassionate_action_focused.md (재판관 평가 어휘 회피)
- feedback_natural_korean_npc_active_voice.md (NPC 발화 자연화 5 차원)
- feedback_self_reference_speaker_context.md (자기지시 정밀)
- project_spouse01_event_timeline.md (사건 흐름)

추가 톤 reference: spouse01-tone-samples.md
**fallback (4-d Batch 7 재활용)**: batch7-reuse-spec.md 명세 따라
Batch 7 4 variant 중 mediation-h-d4-S4-responsibility-split-v1 톤만 차용하여
emerge-hd4-via-judge-auto-decree-v1 entry로 재작성.

출력은 JSON 파일 형식. 파일명: output-cycle4-hd4-line.json
구조: { batch: 4, channel: "emergence_narrative", entries: [{ key, evidenceId|disputeId|dossierId, variants: [{id, text, behaviorHint, tags}] }] }

총 51 entry (4 emergence × 평균 12.75 entry). entry key 형식:
- emerge-e-8 (entity-key 형식)
- emerge-e-9
- emerge-dc-8
- emerge-h-d4

variant id 형식: emerge-{entityIdNoHash}-via-{triggerSuffix}-v{N}
예: emerge-e8-via-cascade-judge-mention-v1
```

3. GPT 응답 JSON 파일을 `result/output-cycle4-hd4-line.json` 으로 다운로드 후 Claude에 알림
4. Claude가 5단계 진행 (검토 + 사용자 의견)

---

## 본 cycle 핵심 권위 (요약)

1. **단일 batch 4 emergence 일괄 처리** (Cycle 7 friend-01 패턴 동일)
2. **cascade chain**: d-2 S5 자백 (선행) → e-8 → e-9 → dc-8 → h-d4
3. **frame 충돌**: A의 외도 의심 강화 (e-8 → e-9 → dc-8) → h-d4에서 결정적 역전 (난임 치료비 진실)
4. **책임 B 70 / A 30**: B 침묵·독단 우위, A 화제 회피 일부 책임 — h-d4 narrative entry에 반영
5. **진실 노출 정책 (가장 위험)**: h-d4 fire 전까지 **박지연 난임/치료비/난임 진단/출산 가능성/의사 친구 상담** 키워드 절대 surface X
6. **Batch 7 시안 재활용**: h-d4 fallback (4-d) judge-decree v1만 재활용. 나머지 3 variant 보존만.

---

## 검증·통합 (Claude 5~8단계 책임)

본 cycle은 단일 GPT Pro thread + 4단계 → Claude apply → Codex sync 4 batch skeleton 패턴.
검증: tsc + build + qa:fast PASS 필수 ([[design_core_narrative_cycle_procedure]] 6단계).
