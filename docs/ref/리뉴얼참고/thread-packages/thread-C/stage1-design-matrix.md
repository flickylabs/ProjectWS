# 1단계: V3 필요 데이터 매트릭스

> 스레드 C — 설계 에이전트 산출물
> 기존 타입(renewal.ts, case.ts, character.ts)을 기반으로, spouse-01에 필요한 V3 데이터를 열거한다.
> **타입은 이미 확장 완료 — 여기서는 타입을 변경하지 않는다.**

---

## 확정된 타입 요약

| 위치 | 타입 | 핵심 V3 필드 |
|------|------|-------------|
| renewal.ts:198 | `BeatScriptV3` | `questionType?`, `afterInvestigationStage?`, `alternatives?`, `truthLevel` (required) |
| renewal.ts:266 | `DossierChallengeQuestion.scriptedResponse` | `{ npcResponse, behaviorHint, truthLevel }` |
| case.ts:63 | `investigationStages[].scriptedNpcResponses` | `{ a?: {...}, b?: {...} }` |
| character.ts:94 | `ThirdParty.scriptedTestimonies` | `{ vague, partial, full }` |

---

## spouse-01 사건 구조

### Disputes (5개)
| ID | 이름 | quadrant | 주 party | weight |
|----|------|----------|---------|--------|
| d-1 | 지석의 비밀 송금 280만원 | a_only | A(지석) | high |
| d-2 | 세린의 새벽 휴대폰 열람 | b_only | B(세린) | high |
| d-3 | 최민정은 외도 상대인가 | shared_misconception | 양쪽 | high |
| d-4 | 세린의 우회 송금 150만원 | b_only | B(세린) | high |
| d-5 | 100만원 사전 상의 약속 위반 | both_know | 양쪽 | medium |

### Evidence (6개)
| ID | 이름 | subjectParty | stages수 |
|----|------|-------------|---------|
| e-1 | 공동계좌→최민정 280만원 이체 내역 | a | 3 |
| e-2 | 재가돌봄센터 간병 예약 확인서 | a | 3 |
| e-3 | 지석 휴대폰 메신저 캡처본 | both | 3 |
| e-4 | 상담동 출입기록과 카페 영수증 | a | (확인 필요) |
| e-5 | 정우성 경유 150만원 이체기록 | b | (확인 필요) |
| e-6 | 월세 수납증과 메신저 대화 | b | (확인 필요) |

### DossierCards (3개)
| ID | 이름 | targetParty별 질문수 |
|----|------|--------------------|
| dossier-1 | 자금 흐름 | a: 3 / b: 3 |
| dossier-2 | 잘린 대화 | a: 3 / b: 3 |
| dossier-3 | 우회 송금 | a: 3 / b: 3 |

### 증인 (4명)
| ID | 이름 | bias | 관련 쟁점 |
|----|------|------|----------|
| tp-1 | 오미숙 (세린의 어머니) | pro_b | d-4, d-5 |
| tp-2 | 이재훈 (지석의 직장 동료) | pro_a | d-1 |
| tp-3 | 최민정 (재가돌봄센터 상담팀장) | neutral | d-1, d-3 |
| tp-4 | 정우성 (세린의 대학 동기) | neutral | d-4 |

---

## 필요 데이터 볼륨 산정

### A. BeatScriptV3

**전체 이론적 최대값:**
- questionType 4종 × applicableStates 구간 3개(S0-S1/S2-S3/S4-S5) × party 2 × dispute 5 = 120개
- + evidence_hit × 증거 6개 × party(해당) ≈ 10~15개
- + alternatives 각 2개 → 줄 수 기준 360+

**현실적 목표 (dispute별 최소 커버리지):**

| dispute | party | 필수 beat 구성 | 예상 개수 |
|---------|-------|---------------|----------|
| d-1 | a | deny(S0-S1), hedge(S1-S2), partial(S2-S3), blame(S3), emotional(S3-S4), confession(S4-S5) + evidence_hit(e-1, e-2) | 8 |
| d-1 | b | 관찰자 반응 minimal — deny(S0-S1), hedge(S1-S2) | 2 |
| d-2 | a | 관찰자 반응 — deny, hedge | 2 |
| d-2 | b | deny, hedge, partial, emotional + evidence_hit(e-3) | 5 |
| d-3 | a | deny, hedge, partial + evidence_hit(e-3, e-4) | 5 |
| d-3 | b | deny, hedge, partial, emotional | 4 |
| d-4 | a | 관찰자 — deny, hedge | 2 |
| d-4 | b | deny, hedge, partial, blame + evidence_hit(e-5) | 5 |
| d-5 | a | deny, partial, blame, emotional | 4 |
| d-5 | b | deny, partial, blame, emotional | 4 |

**최소 커버리지: ~41개 beat + 각 alternatives 2개 = ~123줄**

**questionType 분기 추가 (핵심 dispute만):**
- d-1 party a: fact_pursuit용 deny, motive_search용 hedge, empathy_approach용 emotional → +3개
- d-3 party a: fact_pursuit용 partial, evidence_present용 partial → +2개
- d-4 party b: fact_pursuit용 deny, motive_search용 hedge → +2개

**총 예상: ~48~55개 BeatScriptV3**

### B. DossierCard scriptedResponse
- dossier-1: 6개 질문 (a: 3, b: 3)
- dossier-2: 6개 질문 (a: 3, b: 3)
- dossier-3: 6개 질문 (a: 3, b: 3)
- **총 18개 scriptedResponse**

**truthLevel 결정 규칙:**
| requiredLieState | scriptedResponse.truthLevel |
|-----------------|---------------------------|
| 없음 (q1) | `hint` (S1~S2 수준 응답) |
| S2 (q2) | `partial` |
| S3 (q3) | `partial` ~ `full` |

### C. InvestigationStage scriptedNpcResponses
- e-1: 3 stages × subjectParty a → 3개 (+ b 관찰자 응답 1~2개)
- e-2: 3 stages × subjectParty a → 3개
- e-3: 3 stages × subjectParty both → a: 2개, b: 3개
- e-4: stages 확인 필요
- e-5: stages 확인 필요
- e-6: stages 확인 필요
- **예상 총 15~25개**

### D. 증인 scriptedTestimonies
- 4명 × 3 depth = **12개**

---

## GPT Pro 세션 분할 계획

볼륨이 크므로 세션을 4개로 나눈다:

```
gpt-session-C-partyA-d1d2/    → A(지석)의 d-1, d-2 beat + 해당 증거 응답
gpt-session-C-partyA-d3d4d5/  → A(지석)의 d-3, d-4, d-5 beat
gpt-session-C-partyB-d1d2/    → B(세린)의 d-1, d-2 beat + 해당 증거 응답
gpt-session-C-partyB-d3d4d5/  → B(세린)의 d-3, d-4, d-5 beat
```

추가 세션:
```
gpt-session-C-dossier/        → 18개 DossierCard scriptedResponse
gpt-session-C-witness/        → 4명 × 3 depth 증인 증언
```

각 세션에 첨부할 파일:
1. spouse-01.json (사건 데이터 — disputes, evidence, duo)
2. spouse-01-v2-atoms.json (StateUnlockAtom — truthLevel 기준선)
3. spouse-01-tells-beats.json (캐릭터 tell 정의)
4. Truth Throttle 규칙표 (아래)

---

## Truth Throttle 엄밀 규칙 (GPT/검증 양쪽에 적용)

```
┌─────────────────────────────────────────────────────────────┐
│ truthLevel   │ 허용 LieState │ 대사 내 금지 요소            │
├──────────────┼───────────────┼─────────────────────────────┤
│ 'none'       │ S0, S1        │ 기관명, 인물직함, 서비스명,  │
│              │               │ 정확한 금액 용처, 대상자 실명│
├──────────────┼───────────────┼─────────────────────────────┤
│ 'hint'       │ S2            │ 구체적 기관명/직함 금지      │
│              │               │ ("개인 사정"/"가족 일" OK)   │
├──────────────┼───────────────┼─────────────────────────────┤
│ 'partial'    │ S3            │ 전체 진실 금지              │
│              │               │ 행위 인정 가능, 상대 탓 가능│
├──────────────┼───────────────┼─────────────────────────────┤
│ 'full'       │ S4, S5        │ 전체 진실 허용              │
│              │               │ 기관명/직함/대상자 실명 가능│
└─────────────────────────────────────────────────────────────┘
```

### spouse-01 구체적 금지어 목록 (S0-S1 'none' 대사)
절대 포함 금지:
- "재가돌봄센터", "돌봄센터", "상담팀장", "간병", "예약금"
- "최민정" (이름 자체)
- "오미숙", "장모님" (대상자)
- "동생 월세", "내용증명" (d-4 관련)
- "100만원 약속" (d-5 구체적 언급)

S2 'hint' 대사 허용 표현:
- "가족 일", "개인 사정", "집안 급한 일", "가족 어른 쪽"
- "급한 돈", "돌려보낸 돈"

---

## 다음 단계로의 인풋

이 매트릭스를 기반으로:
- **2단계(파일럿)**: spouse-01 전체 데이터 작성 → GPT Pro 권장
- **3단계(검증)**: truthLevel ↔ 대사 내용 크로스체크 자동화
