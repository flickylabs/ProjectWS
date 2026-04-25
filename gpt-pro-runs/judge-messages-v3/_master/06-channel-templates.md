# 67 채널 템플릿 + 본 세션 가이드

## 채널 분류 (총 67종)

### A. judge_* 37종

#### 기본 질문 (9 sub × 3 tone = 9)
- judge_question_fact_pursuit × tone (3)
- judge_question_motive_search × tone (3)
- judge_question_empathy_approach × tone (3)

#### 모순/증거/증인 (9)
- judge_contradiction
- judge_evidence_present_response
- judge_evidence_combo_response
- judge_evidence_combo_unlock
- judge_witness_summon (3 depth: vague/partial/full)
- judge_witness_institutional
- judge_dossier_killshot
- judge_dossier_unlock_announcement

#### 통제/관리 (10)
- judge_interjection_block
- judge_double_speak_block
- judge_silence_break_force
- judge_mutual_silence_break
- judge_summarize_request
- judge_summary_recap
- judge_credibility_challenge
- judge_perjury_warning
- judge_legal_warning
- judge_sensitivity_warning

#### 흐름/유도 (5)
- judge_timeline_probe
- judge_free_question_relay
- judge_post_confession_followup
- judge_confession_opening_invitation
- judge_question_ineffective_feedback

#### Phase/판결 (8)
- judge_redirect
- judge_timeout_warning
- judge_final_statement_offer
- judge_case_intro (Phase 0)
- judge_background_brief
- judge_phase_transition
- judge_phase_3a_mediation_open
- judge_mediation_intro (Phase 6)
- judge_mediation_proposal
- judge_mediation_reject_response

#### 결과 (4)
- judge_verdict_open (Phase 7)
- judge_verdict_responsibility_split
- judge_case_close
- judge_persona_variant (optional)

### B. npc_* 20종
base / cornered / interjected / evidence_pressed / contradicted / emotional_outburst / confession_open / silenced / deflecting / counter_attack / breakdown / resigned / memory_unclear / justification_long / attack_partner / rapport_warm / fatigue_irritated / opening_test / free_question_refusal / mutual_clash

### C. system_* 10종
system_phase_transition / system_evidence_unlock / system_dossier_ready / system_witness_ready / system_lieState_change / system_emotion_phase_change / system_contradiction_detected / system_resonance_unlock / system_observation_log / system_case_intro

## 본 세션 채널

본 세션의 정확한 채널 범위는 같은 폴더의 `MESSAGE.md` 참조.

## 채널별 작성 가이드

### judge_question (3 type × 3 tone)
- soft: 정리 요청 톤 ("우선 그 부분부터 답해 주십시오")
- mid: 추궁 톤 ("어떤 사정인지 정확히 말씀해 주십시오")
- hard: 단호 톤 ("계속 답을 하지 않으시면 ~ 정리하겠습니다")

### judge_contradiction (Path B 단일 캐릭터 진술 변화 — **활성**)
**시스템**: `useActionDispatch.ts:notifyLieTransition` 내부 호출.
**트리거**: 한 캐릭터가 lieState 전이 시 (S0/S1 → S2+ 경계 교차) — 진술이 달라진 것을 재판관이 추궁.
**범위**: 같은 캐릭터의 진술 변화만. 양측 충돌은 X (별 시스템).

**작성 규칙**:
간접 인용 + 본질 추궁.
- ❌ "'A라고 하셨는데, B라는 내용이 확인됩니다'"
- ✅ "아까는 ~쪽으로 말씀하셨는데, 지금은 ~. 왜 달라졌습니까?"

**참고**: 양측 의견 충돌(V2 ConflictEventV2, `judge_opinion_conflict` 채널)은 **별 GPT Pro 패키지에서 처리**:
- 위치: `gpt-pro-runs/contradiction-events-v2/`
- 본 v3 패키지에서는 다루지 않음 — judge_contradiction (Path B)만.

### judge_evidence_present_response
증거 종류 × stage별 다른 표현.
- bank: "이 출금 내역을 보면 ~"
- chat: "이 카톡 스레드는 ~"
- log: "이 GPS 기록을 보면 ~"
- contract: "이 서류를 보면 ~"
- testimony: "이 증언이 가리키는 바는 ~"
- device: "이 블랙박스 영상을 보면 ~"
- sns: "이 SNS 게시물은 ~"
- cctv: "이 CCTV 화면은 ~"

### judge_witness_*
- vague depth: "그날 일을 본 사람의 진술이 있습니다."
- partial: "증인 말씀에 의하면 ~"
- full: 구체 진술 인용 (단, 직접 인용 X — 간접 인용)

### judge_phase_transition
Phase 진입 알림 톤. 단호하지만 자연스럽게.
- 예: "이제 증거를 함께 보겠습니다." (Phase 4)
- 예: "지금부터 양측의 책임을 나누는 단계로 들어갑니다." (Phase 6)

### judge_mediation_proposal (Phase 6)
양측 책임 / 일방 책임 / 미해결 / 자백 4 패턴별 다른 톤.

### judge_verdict_open (Phase 7)
- 4 stage × 2 party × tone

### system_*
**기계적 관찰문 금지** (`feedback_judge_question_quality.md`).
- ❌ "태도에 변화가 감지된다"
- ✅ "진술이 달라지기 시작한다"
자연어 narrative 톤. 직접 인용 X.

## 산출물 형식 (channel별 entry)

각 entry 메타:
- channel: judge_question / judge_contradiction / npc_response_S0 / system_lieState_change 등
- key: scene_id 또는 dispute|tone|target 등
- target: a | b | both | system
- text: 본문
- behaviorHint: NPC 행동 묘사 (선택)
- tags: archetype_tell / lieState / emotion_phase 등
