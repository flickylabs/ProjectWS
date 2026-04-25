# spouse-01 — 현재 자산 인벤토리 + 활용 가이드

## 현재 보유 자산 (모두 atoms-current.json + scripted-text-current.json 등으로 cp됨)

| 파일 | 크기 | 용도 |
|---|---|---|
| `atoms-current.json` | 295KB | **ClaimPolicyV2 atom 풀** — NPC 발화 원자 단위 (기반) |
| `scripted-text-current.json` | 2,049KB | 현재 ScriptedText entries (interrogation 144 + evidence 42 + dossier 24 + witness 9 등) |
| `case-structure-v2.json` | 23KB | 4 dispute의 depthLayers/linkEdges/freeQuestionHooks |
| `game-events-v2.json` | 33KB | V2 ConflictEventV2 데이터 (의견 충돌 시스템, 별 패키지에서 다룸) |
| `character-info.md` | 5KB | 박지연/이준호 캐릭터 정보 |
| `phase1-2-dialogue.md` | 6KB | Phase 1/2 대사 톤 참고 |

## v3 작업의 핵심 = 자산 보정 + 발전 + 빈틈 채우기

### 1. atoms-current.json 활용 방향
- **S3+ atoms 절대 변경 X** (구체 truth 값 보존)
- S0~S2 atoms → 보정 톤 8원칙 적용해서 발전
- 신규 lieState/dispute/sub-channel 빈틈 → 신규 atom 추가
- atom_id는 그대로 유지 (게임 코드 참조)

### 2. scripted-text-current.json 활용 방향
| 채널 | 현재 | v3 목표 | 작업 |
|---|---|---|---|
| interrogation | 144 (2×4×6×3 매트릭스 완성) | × 약 22배 확장 (~3,200) | 보정 + 변형 풀 추가 |
| evidence_present | 42 (2×7×3) | × 2 확장 (~84) — stage 별 분리 | stage 0/1/2 정밀화 |
| dossier | 24 (8 × 3) | × 1.5 확장 (~36) | tone 단계 추가 |
| witness | 9 (3 × 3 depth) | × 3 확장 (~27) | 사건 컨텍스트 보강 |
| system_message | 6+ | × 5 확장 (~30) | 정밀화 (기계적 관찰문 X) |

### 3. 신규 작성 채널
67 채널 중 현재 ScriptedText에 없는 것:
- judge_contradiction (Path B 활성, 신규 풀 작성)
- judge_evidence_combo_response / judge_dossier_unlock / judge_interjection_block / judge_double_speak_block / judge_silence_break / judge_summarize_request / judge_credibility_challenge / judge_perjury_warning / judge_legal_warning / judge_sensitivity_warning / judge_timeline_probe / judge_free_question_relay / judge_post_confession / judge_confession_opening / judge_question_ineffective_feedback / judge_redirect / judge_timeout_warning / judge_final_statement / judge_case_intro / judge_background_brief / judge_phase_transition / judge_phase_3a_mediation / judge_mediation_intro/proposal/reject / judge_verdict_open/responsibility/case_close
- npc_variants 신규 14 카테고리 (cornered/silenced/deflecting/justification_long/contradicted/evidence_pressed/attack_partner/mutual_clash/free_refusal/breakdown/resigned/opening_test/rapport_warm/fatigue_irritated)
- system_* 10종

### 4. game-events-v2.json (참고만)
V2 의견 충돌 시스템. **본 v3 패키지에서는 다루지 않음.**
- 별 GPT Pro 패키지: `gpt-pro-runs/contradiction-events-v2/`에서 처리 중
- 본 v3 작업과 분리 (중복 X)

## 캐릭터별 voice 가이드

### 박지연 (A, victim_cosplay)
- 현재 atom + interrogation a-* entries 활용
- S0~S1 fact: 증거 정리 톤 ("재판관님, 제가 본 건 ~")
- S2~S3 motive: 시댁 갈등 비약 ("제 남편이 항상 ~")
- S4~S5 empathy: 수치심 + 위임장 두려움 ("그때는 다른 선택이 ~")

**보정 적용**:
- 호칭: "부인" → "OOO 씨"/"아내분"
- victim_frame tell 1개 이상 유지
- character-info.md verbalTells 우선

### 이준호 (B, avoidant)
- 현재 atom + interrogation b-* entries 활용
- S0~S1: 짧은 부정 ("재판관님, 그건 오해입니다")
- S2~S3: 부분 인정 + 회피 ("그건 사실입니다. 다만 ~")
- S4~S5: 진심 단편 + 가족 언급 ("재판관님, 사실은 ~")

**보정 적용**:
- answer_delay tell 1개 이상 ("그건…", "잠시 후에")
- partial_scope (큰 사실만 인정, 핵심 자름)

## GPT 작성 시 우선순위

1. **atoms-current.json read 필수** — 기존 atom id/content/slot/tags 정확히 파악
2. **scripted-text-current.json read 필수** — 현재 entries 구조 파악
3. **case-structure-v2.json read 필수** — 4 dispute의 depthLayers/linkEdges/freeQuestionHooks/correctResponsibility 정확
4. 보정 톤 8원칙 적용해서 기존 자산 발전
5. 부족한 채널 신규 작성 (위 3번 항목 참조)
6. 모든 entry는 atom-like 형식 (id 부여 가능)
7. R1~R10 lint 통과 (07 참조)

## 산출물 형식 권장

GPT가 작성할 산출물은 **두 종류** 동시 출력:
1. **scene-output-{caseId}-{X}.yaml** — scene별 변형 풀 (일반 ScriptedText 채널)
2. **atoms-extension-{caseId}-{X}.json** — 신규/보정된 atom (atoms-current.json 확장 버전)

ClaudeCode 검수 시 atoms-extension은 atoms-current에 머지 → src/data/claimPolicies/{caseId}-v2-atoms.json 갱신.
