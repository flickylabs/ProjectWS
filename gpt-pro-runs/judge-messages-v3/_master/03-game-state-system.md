# Solomon Court 동적 상태 시스템 — 25 메커니즘 카탈로그 (정밀화)

이 문서는 GPT가 scene variants를 생성할 때 **반드시 참조해야 하는 25 메커니즘**을 게임 엔진 코드 분석 기반으로 정확히 정리한다.
한 entry라도 이 메커니즘과 어긋나면 게임 동작이 깨진다.

## A. 진실/쟁점/증거 공개 (1~7)

### 1. 거짓말 상태 전이 (lieStateMachine.ts) — 정확
**전이 트리거**: 점수 임계값 X. **trigger 문자열 매칭** 기반.
- 기본 경로: config.transitions 맵에서 (currentState, trigger) 정합 시 전이
- trigger는 정확 문자열 또는 `_or_` 분리 조건

**특수 전이 3종**:
1. **신뢰 루트** (collapseViaTrust): `trustTowardJudge ≥ TRUST_THRESHOLDS.voluntaryConfession` + empathy/trust 트리거 → S5 즉시
2. **동기별 스킵 (LM-3/4/7)**:
   - 복수 동기 + S2 → S4
   - 제3자 보호 + S3 + trust 확보 + retaliationWorry < 30 → S5
   - 관계 유지 + S4 + trust/empathy + trustTowardJudge ≥ confidentialAcceptance → S5
3. **하드 증거 보장**: trigger.includes('hard_evidence') && S ≠ S5 → 최소 1단계 진행

**GPT 작성 시**: NPC 발화에 트리거 키워드 일관성 유지. 신뢰/동기 누적은 empathy/motive 누적으로만 변화.

### 2. 쟁점 확장 순서 (linkEdges + unlockCondition)
- relation: unlocks_layer / retaliation / supports
- 예 (spouse-01): d-1 ≥ S3 → d-2 열림. d-2 ≥ S1 → h-d3 역공. d-2 + h-d3 ≥ S1 → h-d4 자동.
- **등장 전 NPC가 그 dispute 언급 X.**

### 3. 증거 엔진 + investigationStages (정확)
**해금 조건 이중**:
- requires[] (선행 증거 모두 presented/unlocked)
- requiredLieState (해당 쟁점 maxLieState ≥ 조건)

**investigationStages 3단계**:
- stage 0: 표면 (조회 직후)
- stage 1: 중간 (1회 조사 후 해금)
- stage 2: 핵심 진실 (2회 이상 조사)

**조합 업그레이드 (combo)**: combo.requires[] 모든 증거 presented + investigationStages 완료 + deepInvestigated flag.

### 4. 증인 메시지 깊이 게이팅 (witnessEngine.ts) — 정확
**해당 쟁점 maxLieState 기준**:
- maxLieState < S2 → **vague** (모호 답변, 2문장 이내)
- S2 ≤ maxLieState < S4 → **partial** (부분 공개, 3문장)
- maxLieState ≥ S4 → **full** (전체 공개)

**기관 증인 예외**: slot === 'institutional' && maxState ≥ S2 → full 자동 승격
**depthMessage**: 깊이별 시스템 공지문 자동 생성

### 5. Truth Throttle (lieState별 정보 노출)
| State | 금액 | 인물 | 기관 | 시각 |
|---|---|---|---|---|
| S0~S1 | "해당 금액" | "그 사람" | "그곳" | 허용 |
| S2 | "200만원대" | "김 씨" | 약칭만 | 허용 |
| S3+ | 구체값 허용 | 실명 | 정식명칭 | 전부 |
| S5 | 전부 공개 | 전부 | 전부 | 전부 |

자세한 건 04-truth-throttle.md.

### 6. 감정 페이즈 (emotionEngine.ts) — 정확
**internalValue 0~100 범위, 임계값 자동 페이즈 결정**:
- 0~19: defensive (안정 부정)
- 20~39: confident (자신감)
- 40~59: shaken (흔들림)
- 60~79: angry (분노)
- 80~100: resigned (체념)

**작동**: updateEmotion(delta)으로 누적, PHASE_THRESHOLDS 매핑.

**Archetype × Phase = 30개 행동 단서**:
- avoidant: defensive("시선 아래") → shaken("침묵 길어진다") → resigned("어깨 떨린다")
- 자세한 매핑: 05-archetype-guide.md

### 7. 쟁점 가시성 v3 (visibility: initial / hidden + unlockCondition)
- initial: 시작 시 보임 (Phase 1부터)
- hidden: unlockCondition 충족 시만 등장
- **등장 전 NPC가 그 dispute 언급 X**

## B. 시스템 동작 (8~17)

### 8. DossierCard 해금 (meterStagingV2.ts) — **정확** (이전 추정 정정)
**3미터 조합 X** — 실제 조건:
- `lie_s2_contradiction_3`: lieRank ≥ 2 && contradictionTokens ≥ 3
- `lie_s2_turn_8`: lieRank ≥ 2 && turn ≥ 8
- `turn_10_safety`: turn ≥ 10 (안전 해금, 항상)

**GPT 작성 시**: dossier_killshot 발동 시점은 위 조건 셋 중 하나 도달 후. NPC는 해금 가능한 dossier 조건 인지 X (자연 톤).

### 9. 모순 감지 — **Path B 활성 + V2 의견 충돌 신규** (정정)

#### Path B (단일 캐릭터 진술 변화) — **활성**, 사용자 정의 '모순'
- 호출: `useActionDispatch.ts:notifyLieTransition` 내부
- 트리거: lieState 전이 직후 (S0/S1 → S2+ 경계 교차)
- 동적 생성 (claimGraph + transition desc)
- → `judge_contradiction` 채널 entries는 **이 시스템에 사용**

#### Path A (양측 충돌 statementA/B) — **임시 비활성화**
- `gameEventTriggerEngine.checkContradiction` 현재 `return null`
- 이유: 양측 사전 작성 statementA/B가 스포일러 누설
- 함수 본문 보존 (M단계에서 재활용)

#### V2 ConflictEventV2 — **신규 시스템 도입 예정** (사용자 정의 '의견 충돌')
- M1~M7 마이그레이션 계획 (메모리 `design_contradiction_system_unified.md`)
- 신규 트리거: `checkConflict()` (gameEventTriggerEngine 신설)
- 데이터: `claimPolicies/{caseId}-game-events.json` (이미 spouse-01 V2 적용 완료)
- 발동 조건: 극단적 누설/감정 차이/critical 후속만
- → 신규 채널 `judge_opinion_conflict` 작성 대상
- 기존 GPT Pro 패키지: `gpt-pro-runs/contradiction-events-v2/`

**GPT 작성 시 정확 매핑**:
| 채널 | 시스템 | 활성 |
|---|---|---|
| `judge_contradiction` | Path B (단일 캐릭터 진술 변화) | ✅ 활성, 정상 사용 |
| `judge_opinion_conflict` | V2 ConflictEventV2 (양측 의견 충돌) | ✅ V2 도입 예정, 신규 작성 |

### 10. 감정 폭발 (gameEventTriggerEngine.ts)
**조건**:
- internalValue ≥ 75 (EMOTIONAL_BURST_THRESHOLD)
- 누설미터 80% 이상 OR 최근 lie_advance 전이 있음
- 쿨다운 4턴

**결과**: emotion spike -20 (급감) + critical면 lieState +1

### 11. 신뢰 창구 (trustWindow / rapport_meter) — 정확
empathy_approach 성공 시 +12 기본 + lieState 보너스
- **60% 도달**: 자발 시인 창구 개방 → npc `rapport_warm` 발동

### 12. 누설 미터 (leak_meter) — 정확
motive_search 성공 시 +15 기본 + emotionTier 보너스
- **50% 도달**: suppression 누설 + 감정 +8
- **80% 도달**: 감정 폭발 유도

### 13. 모순 토큰 (contradict_token) — 정확
fact_pursuit 성공 시 +1 (연속 +1 보너스, max 5)
- **2개 이상**: lieState 전이 보너스 +20%
- **3개 이상**: timeline_padding 봉쇄
- **4개 이상**: flat_denial 방어 약화

### 14. 피로도 (questionFatigueEngine.ts) — **정확** (이중 배율)
**localStreak × spotlightStreak 이중 배율**:
- localStreak (같은 dispute 연속): 1:1.0, 2:0.7, 3:0.35, 4:0.1
- spotlightStreak (전체 streak): 1:1.0, 2:0.9, 3:0.75, 4:0.6, 5:0.45
- 최종 = local × spotlight (범위 0.05~1.0)

**fatigueLevel**:
- ≥0.9: fresh
- ≥0.5: wary
- ≥0.2: high
- <0.2: exhausted (NPC `fatigue_irritated` 발동)

**리셋**: new_evidence / layer_unlock → 해당 쟁점 전체 로컬 피로 초기화. Dossier 실행 시 dispute 전체 streak = 0.

### 15. 답변 효과성 (computeEffectiveness)
질문 유형별 strong/weak 조건:
| 유형 | Strong | Weak |
|---|---|---|
| fact_pursuit | S0~S1 | explosive/shutdown 감정 |
| motive_search | S2~S3 | trustWindow < 20 (역공 위험) |
| empathy_approach | S4 | cold_logic && S0~S2 && contradictionTokens < 2 |

비효과 시 `judge_question_ineffective_feedback` 발동.

### 16. 재판관 성향 (judgeProgressionEngine caseAxis)
사건 결과로 9 조각 → 6 성향. 발화 톤 부가 변형 (선택적, optional).

### 17. 재판관 퍼크 (judgePerks 15종)
메이저 6 + 마이너 9. 발화 톤 영향 일부 (예: "마음의 다리"=empathy +α).

## C. 캐릭터/입력 (18~25)

### 18. freeQuestionHooks (자유 질문)
사건 데이터의 8 hooks × allowedAtStates × forbidAtomIds.
NPC refusalTemplates 풀 활용 (`free_question_refusal` variant).

### 19. 증거 조합 (combo upgrade)
2 evidence 조합 시 정보 강화. deepInvestigated flag로 surface→real 전환.
별도 channel: `judge_evidence_combo_response`.

### 20. Phase 전이 트리거
Phase 0~7. 진입 조건 (예: 모든 dispute≥S2 → Phase 6).
전이 시 `system_phase_transition` + `judge_phase_transition`.

### 21. 끼어들기 (interjection) (gameEventTriggerEngine.ts)
**조건**:
- 쿨다운 6턴
- 상대 emotion.internalValue ≥ 55
- 현재 쟁점 S1~S3 (S0 동기 부족, S4/S5 이미 무너짐)
- fact_pursuit OR evidence_present 질문 유형
- V3 미사용 interjection 존재 필수

**GPT**: `judge_interjection_block` 발동 빈도 제한적. 쿨다운 6턴 지킴.

### 22. 새 쟁점 출현 (gameEventTriggerEngine.ts)
**조건**:
- 숨겨진 쟁점 존재
- 진행된 쟁점 ≥ 2개
- 이번 턴 S3 이상 전이 감지 (S_from < 3, S_to ≥ 3)

### 23. archetype × verbal tells (6 × 6)
6 archetype × 6 tell 조합. 자세한 내용 05-archetype-guide.md.

### 24. callTerms 3종 분기
- toPartner: 직접 호칭 ("자기")
- toJudge: 재판관에게 상대 언급 ("제 아내")
- angry: 격앙 시 ("이준호!")

### 25. schemaVersion structure_v2 의존성
depthLayers + linkEdges + v3UnlockPlan + correctResponsibility.
NPC 발화는 항상 현재 layer + lieState 정합.
사건별 정확 데이터: assets/case-structure-v2.json.

### 26. ClaimPolicyV2 atom 시스템 (atomSelectionEngine.ts) — **활성 핵심**
**위치**: `src/data/claimPolicies/{caseId}-v2-atoms.json` (assets/atoms-current.json으로 cp됨)

**역할**: NPC 발화의 원자 단위 데이터.
- claimAtoms[]: dispute별 × lieState별 atom (id, content, slot, tags 등)
- subAction별 atom 우선순위 (SUBACTION_ATOM_RULES)
- evidence 조건 / suppression / blockedAtomIds 필터링
- scoring → 상위 atom 선택 → BlueprintAtomPlan 생성

**GPT 작성 시 활용 방향**:
1. atoms-current.json 기존 atom **보정 + 발전** (S3+ 보존 정책)
2. 부족 atom 신규 생성 (특히 S0~S2 neutral 단계 + 새 dispute 등장 시)
3. 신규 NPC variants는 atom-like 풀로 작성 후 게임 적용 시 atom으로 변환 가능

## scene 작성 시 체크리스트

각 scene 생성 시 GPT가 확인해야 할 항목:
- [ ] 현재 lieState에서 허용되는 atom인가? (forbid_atom_ids)
- [ ] depthLayer 정합? (unlock 안 된 layer 정보 누설 X)
- [ ] 다른 dispute 내용 누설 X? (unlockCondition 미충족 시)
- [ ] Truth Throttle 단계별 표현 정확? (대명사 vs 실명)
- [ ] archetype tell 1개 이상 포함?
- [ ] callTerms 정확? (toPartner/toJudge/angry)
- [ ] 감정 페이즈 부합? (internalValue 임계값)
- [ ] 보정 톤 8원칙 (02-tone-guide.md)?
- [ ] 글자수 (judge 30~70 / npc 40~80)?

## 위반 사례 (V2 산출물에서 발견)

(추가 보완 시 ClaudeCode 검수 결과 추출 예정)

## 핵심 정정 사항 (이전 추정 → Agent 보고서 기반 정정)

| # | 메커니즘 | 이전 추정 | 정확 동작 |
|---|---|---|---|
| 8 | DossierCard | "3미터 조합" | lieRank≥2 && (contradictionTokens≥3 OR turn≥8) |
| 9 | 모순 감지 | "단일 캐릭터 진술 변화 활성" | **현재 비활성화 (return null)** |
| 14 | 피로도 | "3단계" | localStreak × spotlightStreak 이중 배율 4단계 |
| 11~13 | 3미터 | "임계점 발동" | 정확 % 임계값 (60/50/2~4) |
