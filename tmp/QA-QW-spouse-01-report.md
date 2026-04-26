# Thread-QW QA 보고 — spouse-01 ScriptedText 통합 보완 깊은 검증

> **대상**: `src/data/scriptedText/spouse-01.json`
> **검증자**: Thread-QW (ClaudeCode)
> **검증 시각**: 2026-04-26
> **총 variants**: 4,677 (18 채널)
> **수단**: [tmp/QA-QW-spouse-01-audit.cjs](../tmp/QA-QW-spouse-01-audit.cjs) (자동 감사) + 수동 sample 검토
> **결과 데이터**: [tmp/QA-QW-spouse-01-findings.json](../tmp/QA-QW-spouse-01-findings.json)

---

## 종합 결론

| 항목 | 결과 |
|------|------|
| 정합 (OK / INFO) | **24** 작업 |
| 보완 후보 (WARN) | **2** 작업 |
| 위반 (FAIL) | **0** 작업 |
| **추가 발견 (감사 외)** | **6 조사 오류** + **1 voice 분포 약점** |

**주요 결론**: 통합 보완 결과의 **구조적·의미적 정합성은 매우 우수**. 신규 4 채널 / dossier lieBand / evidence_present stage 모두 캐릭터 voice + Truth Throttle + dispute 매핑 일관됨. 단, **한국어 조사 오류 6건 (모두 "서류이" 패턴) 즉시 패치 권장**.

---

## 채널별 variants 통계

| 채널 | cells | variants | 비고 |
|------|------:|---------:|------|
| interrogation | 144 | 1440 | S0~S5 × party × dispute × q_type, v6~v10 다양성 OK |
| evidence_present | 168 | 1470 | subjectRole 키(42) + lieBand 키(126) 공존, 충돌 없음 |
| dossier | 24 | 240 | early/mid/late × dc-1~5 × q1/q2 |
| witness | 9 | 90 | w-1/w-2/w-3 × vague/partial/full × 10v |
| aftermath | 5 | 25 | 5 resultClass × 5v |
| system_message | 11 | 55 | 평서체 narrative ✓ |
| contradiction_pursuit | 32 | 320 | h-d3/h-d4 신규 포함 |
| interjection | 16 | 160 | minor/major × dispute × party |
| emotional_overload | 8 | 80 | dispute × party |
| evidence_discovery | 12 | 12 | 보존 |
| trust_action | 18 | 180 | actionType × lieState × party |
| mediation | 8 | 80 | path × speaker (entries 형식 변환) |
| judge_question | 48 | 240 | dispute × q_type × depth |
| judge_contradiction | 12 | 60 | dispute × tone |
| **judge_evidence_combo** | 24 | 120 | **신규** — dc-1~5 × q × tone |
| **judge_witness_summon** | 9 | 45 | **신규** — w-1/2/3 × tone |
| **rapport_milestone** | 6 | 30 | **신규** — party × threshold |
| **contradict_milestone** | 6 | 30 | **신규** — party × token_count |
| **합계** | **560** | **4,677** | 신규 4 채널 = 45 cells / 225 variants |

---

## Section A — 9차원 매핑 정합성 (10/10)

### A.1 ✓ interrogation a/d-1/S0~S2 Truth Throttle (90 variants)
- "위임장 / 3,000만 원 / 2,000만 원" 직접 언급 **0건**
- 박지연 voice — 정황·감각 묘사 중심 ("같은 시간/같은 오피스텔", "손끝이 싸해졌습니다")
- victim_frame 활성: "한 달을 더 참았습니다" / "석 달이었습니다"

### A.2 ⚠️ interrogation b/d-2/S3~S5 자백 줄기 (27 samples)
- 키워드 검색에서 2건 미스 (`b-d-2-S5-fact-pursuit-v3`, `b-d-2-S5-motive-search-v2`)
- **수동 검토 결과 둘 다 정합** — fact-pursuit-v3은 "오늘 처음 들었습니다"라는 충격 반응(자백 직전 상태), motive-search-v2는 "남편으로는 틀린 선택이었을지 몰라도, 동생으로는… 외면할 수가 없었습니다"라는 동기 자백
- 자동 검출의 한계 — **실제 위반 없음, 보완 불필요**

### A.3 ✓ interrogation v6~v10 다양성
- 검사 cells: `a|d-1|S1`, `b|d-1|S1`, `a|d-2|S1`, `b|h-d3|S1`, `a|h-d4|S1`, `b|h-d4|S1`
- 각 cell 변형 갯수: 모두 10개 / trigram-overlap > 0.6 듀프 **0건**
- 신규 v6~v10이 의미·표현·각도에서 명확히 구분됨

### A.4 ✓ evidence_present 두 키 패턴 분포
- subjectRole-only: 42 cells / lieBand-only: 126 cells / both: 0 / neither: 0
- 키 충돌: **0건**
- 코드(`scriptedTextLoader.ts:409-444`) 측 호출 시 `subjectRole` vs `lieBand` 분기 가능

### A.5 ✓ evidence_present 신규 stage cells (126)
- lieBands: `early`, `mid`, `late` (각 42)
- 키 형식: `{party}|{evidenceId}|{lieBand}|{role}` (e.g., `b|e-1|early|self`)
- 샘플: `b|e-1|early|self` "그건... 제가 산 겁니다." (얼버무림) → `b|e-1|late|self` "조카한테 필요한 거 사다 준 겁니다. 참고서는 중학교 2학년 거예요." (구체적 자백)
- **단계별 진실 노출 곡선 잘 구현**

### A.6 ✓ dossier 24 cells (lieBand 차원)
- 분포: dc-1/dc-2 = 3 (단일 q1) / dc-3/dc-4/dc-5 = 6 (q1+q2) — 총 24
- `dc-1.b.q1|early` vs `late` trigram-overlap **0.11** (낮을수록 차이 큼)
  - early: "그 일이 집안 쪽 사정인 건 맞습니다. 다만 제 아내가 다시 크게 상처받을까 봐 입을 닫았습니다."
  - late: "맞습니다. 외도가 아니라 형과 조카 일이었고, 시댁 불화가 다시 터질까 봐 끝까지 말하지 못했습니다."
- **단계별 차이 명확** — 형/조카는 late에서만 명시화

### A.7 ⚠️ witness w-3 박미라 hiddenAgenda (h-d3 친구 → 오피스텔 무관)
- "오피스텔" 언급 **0건** ✓
- BUT 발견: `witnessName` 불일치 — case `combinationLab.nodes.w-1-angle.label`은 "이성호" (형으로 추정)인데 scriptedText / `context.socialGraph[0]`는 "오피스텔 경비"
- 또한 `combinationLab.nodes`에 `w-2-angle` 누락 (scriptedText는 w-2 = 은행 직원 보유)
- → **structure 자료 vs scriptedText 불일치 — combinationLab 측 정정 필요** (이번 통합 보완 직접 영향 X, 단 추후 정리 필요)

### A.8 ✓ contradiction_pursuit h-d3/h-d4 신규 cells (총 16)
- party × dispute × lieState 매핑 정합
- S1~S4 단계별 voice 변화: S1 부정 → S2 핑계 → S3 부분 인정 → S4 감정적
- 예: `a|h-d3|S4-v1` "그렇게 안 했으면 저는 끝장이었습니다! 3,000만 원이 사라지기 전에 제 몫이라도 붙잡아야 했습니다." (S4 감정적 — 구체 금액 허용)

### A.9 ✓ interjection / emotional_overload h-d3/h-d4
- interjection 8 cells (party × severity × dispute) / overload 4 cells
- severity `minor` vs `major` 톤 차이 명확
- 예: `interject-a-h-d3-major-v1` (h-d3 격앙) vs `overload-a-h-d3-v1` (감정 폭발)

### A.10 ✓ trust_action / mediation
- trust_action 18 cells × 10v = 180 variants — 신뢰 행동(separation/private/etc) × lieState × party
- mediation: `immediate / conditional / postponed / decline` × `a/b` = 8 cells × 10v
- 예: `mediation-immediate-a-v1` "지금 정리하셔도 됩니다. 다만 외도 의심과 제가 공동 적금을 움직인 일은 따로 봐주셨으면 합니다." — 분리 책임 요구
- d-1/d-2/h-d3/h-d4 4 쟁점 모두 자연스럽게 호환

---

## Section B — 신규 4 채널 의미 정합성 (15/15)

### B.11~13 ✓ judge_evidence_combo 24 cells
- tone 분포: soft/mid/hard 각 8 cells
- dossierCard 분포: dc-1/dc-2 = 3, dc-3/4/5 = 6
- **정형화된 재판관 발언 패턴**:
  - soft: "이 자료들을 함께 보겠습니다. {party} 씨, {context} 설명해 주십시오."
  - mid: "{evidence A}와 {evidence B}이 같은 방향입니다. {party} 씨, 더 미루지 마십시오."
  - hard: "이 조합의 뜻은 분명합니다. {party} 씨, 지금 답하십시오."
- 각 dossier별 evidence 조합 문맥 정확:
  - dc-1 mid: "GPS 기록과 형 문자 스레드" (e-2 + e-4 ✓)
  - dc-3 mid: "형 문자와 출금 내역" (e-4 + e-5 ✓)
  - dc-5 mid: "출금 내역, 송금 기록, 적금 해지 서류" (e-5 + e-6 + e-7 ✓)

### B.14~16 ✓ judge_witness_summon 9 cells
- w-1 (오피스텔 경비): "차량 출입 기록" 강조 — d-1 직접 연결
- w-2 (은행 직원): "위임장 절차 / 적금 해지 절차" 강조 — h-d3 직접 연결
- w-3 (박미라): "송금 경로 / 박지연 씨와 가까운 사이" 강조 — h-d3 (투자방) 연결, 오피스텔 미언급 ✓
- tone 분포: soft (요청) / mid (필요성 명시) / hard (즉시 소환)

### B.17~19 ✓ rapport_milestone 6 cells (party × threshold)
- 박지연 (victim) 단계적 풀림: "처음보다 덜 무섭습니다" → "정확히 하겠습니다" → "끝까지 말씀드리겠습니다"
- 이준호 (avoidant) 단계적 풀림: "몰아붙이기만 하지는 않으셔서" → "사정과 책임을 따로 보신다면" → "끝까지 들어주실 거라는 믿음"
- **두 캐릭터의 신뢰 인지 메커니즘이 archetype-specific하게 차별화됨**

### B.20~22 ✓ contradict_milestone 6 cells (party × token_count)
- 1 토큰: 인정 + 변명 ("좀 흔들린 건 인정합니다. 다만 그만큼 놀랐다는 것도")
- 2 토큰: 인정 + 두려움 ("두 번이나 달라졌다면 제가 피한 부분이 있는 겁니다. 그래도 바로 다 말하기가 무섭습니다")
- 3+ 토큰: 완전 인정 + 행동 변화 ("제가 피하고 있었다는 걸 인정해야 합니다. 제 불리한 부분도 말하겠습니다")
- 박지연 / 이준호 voice 차별화 유지

### B.23~25 ⚠️ 4 채널 잘못 패턴 #6 (9건 검출)
- 1건 (judgewit-w-3-mid-v1) "박미라 씨가 알고 있는 부분이 있습니다" — 재판관 발언 / "부분이 있다" 약한 표현. **보완 후보** (예: "박미라 씨가 송금 경로를 알고 있습니다. 직접 확인하겠습니다.")
- 8건 (rapport_milestone × 6, contradict_milestone × 2) "것 같다" 패턴
  - 모두 NPC 1인칭 발화에서 **자기 단정을 부드럽게 약화**하는 의도된 voice ("조금 더 말할 수 있을 것 같습니다", "제가 먼저 단정하는 것 같습니다")
  - victim_cosplay 박지연 / avoidant 이준호의 자기 인지 표현 — **잘못 패턴 #6 적용 대상 아님** (재판관/시스템 기계적 관찰문이 아니라 캐릭터 voice)
- **net: 1건만 보완 후보**, 나머지 8건은 의도된 voice

---

## Section C — 캐릭터 voice 깊은 검증 (10/10)

### C.26~30 ✓ 박지연 victim_cosplay markers — 채널별 분포

| 채널 | total | victim_frame | helplessness | soft_confession |
|------|------:|------:|------:|------:|
| interrogation | 720 | 126 (17.5%) | 0 (0%) | 25 (3.5%) |
| evidence_present | 735 | 48 (6.5%) | 0 | 32 (4.4%) |
| dossier | 90 | 14 (15.6%) | 0 | 3 (3.3%) |
| contradiction_pursuit | 160 | 29 (18.1%) | 0 | 14 (8.8%) |
| aftermath | 25 | 8 (32%) | 0 | 0 |

- victim_frame: **고르게 분포** ✓
- soft_confession: **lieState 진행에 비례하여 증가** (S3+에서 자백 표현 출현)
- **helplessness verbalTell 약점 발견** — 확장 정규식 (`어쩔/선택의/방법이 없/할 수 있는`) 검사 결과 4건만 검출
  - 4건 모두 적절한 위치 (S0/S4/S5에서 동기 회피 → 자백 일관)
  - 다만 verbalTells 정의의 "그때는 다른 선택이 없었다는 말로 계산된 선택의 각도를 흐린다"가 변형 분포에서 약하게 표현됨
  - **개선 후보** — 향후 v3 보완 시 helplessness markers를 S2/S3 비중에 추가 고려

### C.31~35 ✓ 이준호 avoidant markers — 채널별 분포

| 채널 | total | answer_delay | partial_scope | minimize_harm |
|------|------:|------:|------:|------:|
| interrogation | 720 | 174 (24%) | 24 (3%) | 5 (0.7%) |
| evidence_present | 735 | 124 (17%) | 22 (3%) | 5 (0.7%) |
| dossier | 150 | 29 (19%) | 1 (0.7%) | 4 (2.7%) |
| contradiction_pursuit | 160 | 38 (24%) | 11 (6.9%) | 7 (4.4%) |
| aftermath | 25 | 12 (48%) | 0 | 1 |

- answer_delay: **고르게 분포** ✓ — avoidant archetype의 핵심 voice
- partial_scope: 합당한 비중
- minimize_harm: 조금 약하나 confession 단계로 갈수록 자연 감소 — OK

---

## Section D — 메인 13 patch 보존 + S7 system_message (5/5)

### D.36 ✓ judge_contradiction patch 보존
- `judgec-d-1-soft-v2` ✓
- `judgec-d-1-mid-v1` ✓ (명사형 "돌본 것이라고" 보존)
- `judgec-d-2-soft-v1` ✓ (명사형 "도운 것이었다고" 보존)

### D.37 ✓ judge_question patch 보존
- `judgeq-d-1-empathy_approach-4-v1` ✓
- `judgeq-d-1-empathy_approach-4-v2` ✓

### D.38 ✓ interrogation patch 보존
- `b-h-d3-S5-fact-pursuit-v5` ✓

### D.39 ✓ 명사형 보정 patch 보존
- v1: "이준호 씨, 아까는 가족 일이라고만 말씀하셨는데 지금은 가족을 돌본 것이라고 하십니다." ✓
- v2: "이준호 씨, 아까는 가족 사정이라고만 말씀하셨는데 지금은 가족을 도운 것이었다고 하십니다." ✓

### D.40 ✓ system_message 평서체 narrative 검증 (11 cells × 5v = 55 variants)
- "감지됩니다 / 확인됩니다 / 관찰됩니다 / 나타납니다" **0건**
- 모든 variant 평서체 ("진다 / 흔들린다 / 들어왔다 / 갈린다 / 준비된다") ✓
- 예: `sys-evidence-new_unlock-v2` "새 자료가 손에 들어왔다. 앞선 말을 다시 보자."
- 예: `sys-dossier-challenge_cleared-v3` "도망치던 핵심을 겨눌 질문이 준비된다."

---

## Section E — 통합 데이터 정합성 (10/10)

### E.41~43 ✓ evidence_present 두 키 패턴 충돌 없음
- subjectRole-only: 42 / lieBand-only: 126 / both: 0
- 키 충돌: 0건 / 중복 키: 0건
- 코드 호출 시 분기 안전

### E.44~46 ✓ mediation 새 형식 정합
- entries 8 × 10v = 80 variants
- "베팅 / 공동 통장" 미언급 — d-3 inconsistency 정정 (S7) 정합 ✓
- d-1/d-2/h-d3/h-d4 4 쟁점 분리 책임 요구 voice 정합

### E.47~48 ✓ evidence_discovery 보존
- 12 cells × 1v = 12 (보존)
- 옵션 B로 폐기 명세이지만 데이터 보존 ✓

### E.49~50 ✓ aftermath 5 resultClass — 실명 미언급
- 박미라 / 이성호 실명 언급 **0건** ✓
- 5 resultClass × 5v = 25 variants — 모두 형 / 조카 호칭만 사용

---

## ★ 추가 발견 — 한국어 조사 오류 6건 (즉시 패치 권장)

자동 감사 외 보조 검사로 발견.

| # | channel | id | 위반 | 패치 |
|---|---------|----|----|------|
| 1 | evidence_present | `b-e-7-early-request_original-v7` | "그 서류**이** 붙어 있어도" | "그 서류**가** 붙어 있어도" |
| 2 | witness | `w-2-partial-v1` | "그 서류**이** 첨부돼 있었습니다" | "그 서류**가** 첨부돼 있었습니다" |
| 3 | witness | `w-2-partial-v4` | "명의자분 그 서류**이라고** 설명했습니다" | "명의자분 그 서류**라고** 설명했습니다" |
| 4 | witness | `w-2-full-v2` | "그 서류**이** 있었지만" | "그 서류**가** 있었지만" |
| 5 | witness | `w-2-full-v4` | "신분증 사본과 그 서류**이** 있어서" | "신분증 사본과 그 서류**가** 있어서" |
| 6 | emotional_overload | `overload-a-h-d3-v2` | "그 서류**이라는** 말만 나오면" | "그 서류**라는** 말만 나오면" |

**원인 분석**: "서류"는 받침 없는 명사 → "이/이라고/이라는" 결합 모두 오류. `koreanPostposition.ts:fixPostpositions()`가 런타임 후처리하지만 scriptedText는 author-time data이므로 직접 수정 권장.

---

## ★ 보완 후보 — judgewit-w-3-mid-v1 약한 표현 1건

- 현재: "박미라 씨가 알고 있는 부분이 있습니다. 직접 확인하겠습니다."
- 제안: "박미라 씨가 송금 경로를 알고 있습니다. 직접 확인하겠습니다."
- 이유: w-3 hiddenAgenda + h-d3 (위임장 송금) 정합. "부분이 있다"는 잘못 패턴 #6의 약한 명사형.

---

## 종합 평가

### 정합 (24)
A.1, A.3, A.4, A.5, A.6, A.7-w3, A.8, A.9, A.10, B.11-13, B.14-16, B.17-19, B.20-22, C.26-30 (분포), C.31-35, D.36, D.37, D.38, D.39, D.40, E.41-43, E.44-46, E.47-48, E.49-50

### 보완 후보 (2)
- B.23-25 (1건만 — judgewit-w-3-mid-v1 "부분이 있" 약한 표현)
- A.2 (false positive — 실제 위반 없음)

### 위반 (0)

### 추가 발견 (auditplan 외)
- **조사 오류 6건** (서류이 → 서류가/라고/라는) — **즉시 패치 권장**
- 박지연 helplessness verbalTell 분포 약점 (4건) — 향후 v3 보완 시 고려
- combinationLab.nodes 측 witness label 불일치 (w-1 = 이성호로 라벨 / scriptedText는 오피스텔 경비) + w-2-angle 누락 — **scriptedText 영역 외 / 추후 정리**

### 핵심 발견 (3~5)
1. **신규 4 채널 (judge_evidence_combo / judge_witness_summon / rapport_milestone / contradict_milestone) 모두 캐릭터 voice + dispute 매핑 + tone 단계 일관성 우수**. 정형 패턴이지만 evidence/witness/milestone마다 문맥 정확.
2. **dossier lieBand 차원 신설 효과 명확** — early/late trigram-overlap 0.11로 단계별 진실 노출 곡선 분명.
3. **system_message 평서체 narrative 보정 (S7) 완벽 적용** — 합니다체 / "감지됩니다" 패턴 0건.
4. **evidence_present 두 키 패턴 (subjectRole 42 + lieBand 126) 공존 안전** — 충돌/중복 0건. 코드 측 분기 가능 형태.
5. **메인 13 patch 모두 보존** — judge_contradiction 명사형 / interrogation S5 patch 정상 유지.

### 다음 단계 권장
1. **즉시 패치 (메인 결정)**: 조사 오류 6건 (위 표) — 1줄 Edit으로 적용 가능
2. **B.23-25 1건 보완** (judgewit-w-3-mid-v1): 의미 강화 patch 적용 검토
3. **(향후 v3)** 박지연 helplessness markers 보강 — S2/S3에서 "그때는 어쩔 수 없었습니다" 톤 추가 고려
4. **(structure 정리, 별도 작업)** combinationLab.nodes의 witness label 불일치 정정 + w-2-angle 추가

---

## Patch 제안 (메인 적용 결정 후)

```json
[
  {
    "channel": "evidence_present",
    "id": "b-e-7-early-request_original-v7",
    "old": "그 서류이 붙어 있어도",
    "new": "그 서류가 붙어 있어도"
  },
  {
    "channel": "witness",
    "id": "w-2-partial-v1",
    "old": "그 서류이 첨부돼 있었습니다",
    "new": "그 서류가 첨부돼 있었습니다"
  },
  {
    "channel": "witness",
    "id": "w-2-partial-v4",
    "old": "그 서류이라고 설명했습니다",
    "new": "그 서류라고 설명했습니다"
  },
  {
    "channel": "witness",
    "id": "w-2-full-v2",
    "old": "그 서류이 있었지만",
    "new": "그 서류가 있었지만"
  },
  {
    "channel": "witness",
    "id": "w-2-full-v4",
    "old": "그 서류이 있어서",
    "new": "그 서류가 있어서"
  },
  {
    "channel": "emotional_overload",
    "id": "overload-a-h-d3-v2",
    "old": "그 서류이라는 말만 나오면",
    "new": "그 서류라는 말만 나오면"
  },
  {
    "channel": "judge_witness_summon",
    "id": "judgewit-w-3-mid-v1",
    "old": "박미라 씨가 알고 있는 부분이 있습니다. 직접 확인하겠습니다.",
    "new": "박미라 씨가 송금 경로를 알고 있습니다. 직접 확인하겠습니다."
  }
]
```

— Thread-QW QA 종료. 메인은 사용자 승인 후 패치 적용 결정.
