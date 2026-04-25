# scene yaml 형식 정의

## scene 단위
scene = (dispute × target × lieState × q_type) — 가장 좁은 분기 단위.
한 scene 안에서 같은 의도의 다양한 표현 풀(variants)을 생성한다.

## scene 형식

```yaml
scene_id: <dispute>_<target>_<lieState>_<q_type>      # 예: d1_b_S0_fact_pursuit
context:
  dispute: d-1                                          # dispute id
  dispute_name: "오피스텔 방문과 새벽 전화"
  target: 이준호 (B, archetype=avoidant)
  current_lieState: S0
  question_type: fact_pursuit
  arc_role: "외도 프레임 첫 균열 전 — B의 부정/회피"
  truth_leak_allowed: 0                                 # 노출 허용 진실 단계
  forbid_atom_ids: [d1.junho_full_care_confess, ...]    # 이 scene에서 금지된 atom
  forbid_tokens: [형, 조카, 개인회생, 돌봄, ...]        # 금지 어휘

judge_variants:
  soft:
    - "이준호 씨, ..."
    - "이준호 씨, ..."
    - ... (4~6개)
  mid:
    - ... (4~6개)
  hard:
    - ... (4~6개)

npc_variants:
  base:
    - "재판관님, ..."
    - ... (7~10개)
  cornered:
    - ... (3~5개, judge hard 압박 후)
  silenced:
    - ... (3~5개, 침묵 일관)
  deflecting:
    - ... (3~5개, 다른 화제 우회)
  justification_long:
    - ... (3~5개, 긴 자기 정당화)

transitions:
  stay_S0:
    condition: judge soft만 반복 (압박 누적 X)
  S0_to_S1:
    triggers:
      - judge hard tone 2회 누적
      - 증거 e-2 (블랙박스 GPS) 제시
      - A 격앙 발언이 B의 침묵 강제로 깸
    next_scene: d1_b_S1_fact_pursuit
  emotional_route:
    condition: 너무 강한 hard tone 1회 (rapport 미달)
    next_scene: scene_emotional_b_outburst
  target_switch:
    condition: 플레이어가 A로 추궁 전환
    next_scene: d1_a_S0_fact_pursuit

next_scene_candidates:
  primary: d1_b_S1_fact_pursuit
  alt: [d1_a_S0_fact_pursuit, d1_b_S0_motive_search, d1_b_S0_empathy_approach]
  evidence_route: scene_evidence_e2_GPS_present
  emotional_route: scene_emotional_b_outburst

reuse_from_existing:
  phase1_dialogue:
    - "재판관님, 그건 오해입니다." (현재 phase1 톤 base)
  v2_atoms:
    - d1.junho_avoidance_initial
  scripted_text:
    - 기존 scriptedText 활용 entry id

quality_check:
  archetype_tells_used: [answer_delay, partial_scope, minimize_harm]
  truth_throttle_compliance: pass
  banned_translation_patterns_check: pass
  honorifics_check: pass
  charcount_judge_30_70: pass
  charcount_npc_40_80: pass
  lint_R1_R10: pass
```

## 필수 필드
- scene_id, context (전체 필드), judge_variants, npc_variants (해당 그룹), transitions, quality_check

## 선택 필드 (있으면 좋음)
- reuse_from_existing (기존 자산 재활용 매핑)
- next_scene_candidates (다음 진행 후보)

## 산출물 (scene-output yaml)
synopsis 골격의 모든 scene을 채운 형태. 각 scene에 위 형식 따른 풀 명시.
