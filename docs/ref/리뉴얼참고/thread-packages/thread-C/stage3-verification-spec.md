# 3단계: V3 데이터 검증 명세서

> 스레드 C — 검증 에이전트 산출물
> 이 명세서를 기반으로 모든 V3 데이터의 truthLevel ↔ 대사 내용 일치를 검증한다.

---

## 검증 규칙

### 규칙 1: applicableStates ↔ truthLevel 매칭

BeatScriptV3의 `applicableStates`에 포함된 **가장 낮은 state**가 truthLevel 상한을 결정한다.

| 최저 state | truthLevel 상한 |
|-----------|----------------|
| S0 또는 S1 | `none`만 허용 |
| S2 | `none`, `hint` |
| S3 | `none`, `hint`, `partial` |
| S4 또는 S5 | 모두 허용 (`full` 포함) |

**위반 = FAIL**. 예: `applicableStates: ["S1", "S2"]` + `truthLevel: "hint"` → FAIL (S1이 있으므로 none만 가능)

### 규칙 2: truthLevel ↔ 대사 내용 (사건별 금지어)

각 사건마다 금지어 목록을 정의한다. spouse-01 기준:

#### `none` (S0-S1) 금지어 — 절대 포함 불가
```
재가돌봄센터, 돌봄센터, 상담팀장, 간병, 예약금, 최민정, 오미숙, 장모님,
동생 월세, 내용증명, 돌봄 대상자, 센터 후문, 상담실,
구체적 금액 ([\d,]+원, \d+만원 — 예: 280만원, 2,800,000원, 150만원)
```

#### `hint` (S2) 금지어 — 구체적 기관/직함/금액 불가
```
재가돌봄센터, 상담팀장, 최민정, 오미숙, 장모님,
동생 월세, 내용증명, 간병 예약, 돌봄 대상자,
구체적 금액 ([\d,]+원, \d+만원)
```
허용 표현: "가족 일", "개인 사정", "집안 급한 일", "가족 어른 쪽", "급한 돈", "가족 중에", "상당한 금액", "적지 않은 돈", "큰돈"

#### `partial` (S3) 금지어 — 전체 진실 불가
```
재가돌봄센터 (기관 정식명칭), 최민정의 역할 설명,
간병 예약금 (구체적 용처), 오미숙 (대상자 실명)
```
허용: "상담", "기관", "예약", "가족 어른" 등 간접 표현. 행위 인정 가능.

#### `full` (S4-S5) — 모두 허용

### 규칙 3: DossierCard scriptedResponse ↔ requiredLieState

| requiredLieState | scriptedResponse.truthLevel |
|-----------------|---------------------------|
| 없음 (q1 계열) | `hint` |
| S2 (q2 계열) | `partial` |
| S3 (q3 계열) | `full` (고정) |

### 규칙 4: 증인 scriptedTestimonies depth ↔ truthLevel

| depth | truthLevel 상한 | 내용 규칙 |
|-------|----------------|----------|
| vague | `hint` | 핵심 사실 노출 금지, 모호하고 조심스러운 톤 |
| partial | `partial` | 핵심 일부 공개 가능, 기관 정식명칭은 기관 증인만 허용 |
| full | `full` | 알고 있는 전부 공개 |

**예외**: 기관 증인(institutional)은 자기 기관의 업무 사실을 partial에서 일부 공개 가능.
(예: 최민정이 "간병 예약 건으로 상담을 요청하셨습니다"는 partial에서 허용)

### 규칙 5: investigationStage scriptedNpcResponses

stage 번호가 올라갈수록 truthLevel이 점진적으로 높아져야 한다:
- stage 0: `none` ~ `hint`
- stage 1: `hint` ~ `partial`
- stage 2: `partial` ~ `full`

---

## 검증 프로세스 (자동화 가능)

```
FOR EACH beatScriptsV3 entry:
  1. min_state = min(applicableStates)
  2. max_truth = state_to_max_truth[min_state]
  3. ASSERT truthLevel <= max_truth
  4. FOR keyword IN forbidden_words[truthLevel]:
       ASSERT keyword NOT IN line
       ASSERT keyword NOT IN each alternative
  5. IF truthLevel IN ['none', 'hint']:
       ASSERT line does NOT match /[\d,]+원/ or /\d+만\s*원/
       ASSERT each alternative does NOT match same patterns

FOR EACH dossierCardScriptedResponse:
  1. lookup requiredLieState from original question
  2. expected_truth = q1→hint, q2→partial, q3→full (고정)
  3. ASSERT truthLevel == expected_truth
  4. ASSERT npcResponse does NOT contain forbidden_words[truthLevel]
  5. IF truthLevel IN ['none', 'hint']:
       ASSERT npcResponse does NOT match /[\d,]+원/ or /\d+만\s*원/

FOR EACH witnessScriptedTestimony:
  1. ASSERT vague.truthLevel <= 'hint'
  2. ASSERT partial.truthLevel <= 'partial'
  3. ASSERT full.truthLevel == 'full'
  4. ASSERT vague testimony does NOT contain core facts
  5. ASSERT vague testimony does NOT match /[\d,]+원/ or /\d+만\s*원/

FOR EACH investigationStageResponse:
  1. ASSERT stage0.truthLevel <= 'hint'
  2. ASSERT progression: stage(N).truthLevel >= stage(N-1).truthLevel
  3. IF truthLevel IN ['none', 'hint']:
       ASSERT npcResponse does NOT match /[\d,]+원/ or /\d+만\s*원/
```

---

## spouse-01 검증 결과 (최종 — S2 패치 + 금액 패치 후)

| 카테고리 | 총 항목 | PASS | FAIL |
|---------|---------|------|------|
| BeatScriptV3 state↔truth | 55 | 55 | 0 |
| BeatScriptV3 금지어 | 55 | 55 | 0 |
| BeatScriptV3 금액 | 55 | 55 | 0 |
| DossierCard truthLevel | 18 | 18 | 0 |
| DossierCard 금액 | 18 | 18 | 0 |
| 증인 testimony | 12 | 12 | 0 |
| Investigation responses | ~24 | 24 | 0 |
| **총** | **~237** | **237** | **0** |

수정 이력:
- 1차: S2+partial 위반 8건 → applicableStates에서 S2 제거
- 2차: 금액 노출 11건 → 컨트롤 타워에서 모호 표현으로 교체 완료

수정 전 위반 15건 → 수정 후 0건 확인.
