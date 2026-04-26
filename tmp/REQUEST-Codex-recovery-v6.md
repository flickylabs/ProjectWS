# Codex 종합 수습 의뢰 v6 — 새 4 검출 차원 + Thread-QW-Cross 강화

> **작업 성격**: v5 (광범위 동형 검출) 회수 후 효율 한계 도달 (Thread-QW-Cross 600회 결과 P0 0 / P1 3 / P2 1).
> 단순 양적 증가는 효율 제한적 → **새 차원 4개 추가**로 검출 영역 확장.
>
> **사용자 명시**: "Thread-QW-Cross를 깊게 + 더 꼼꼼하게 잡아내기".
>
> **시간 제약 없음**. 14,931 variants 전수 정독 + 새 차원에서 동형 광범위 처리.

---

## 0. TL;DR

**v5 baseline 보존** (466 patches 회귀 X) + **새 4 검출 차원 추가**:

| 차원 | 영역 | 검출 대상 |
|---|---|---|
| **D1 LieState Flow** | 게임 흐름 정합 | NPC의 lieState S0→S5 진행이 의미·톤·정황상 자연스러운지 |
| **D2 Evidence Unlock 정합** | 게임 메커니즘 정합 | 발화가 unlock 안 된 evidence 진실을 노출하는지 |
| **D3 Archetype Voice 정량** | 캐릭터 일관성 | 같은 NPC의 entries 전체에서 archetype voice 정량 일관 |
| **D4 Meter Timing 정합** | 게임 상태 정합 | 발화가 기대되는 meter (rapport / contradict / evidence) 상태에서만 트리거되는지 |

기존 specialist 5종 (A~E) + 신규 4종 (F~I) = 9 specialist. 라운드 구조 v4/v5 재사용.

산출물: 수정된 ScriptedText (직접) + 변경 log + Claude 폴리싱 후보 + 종합 리포트.
대상: 3 사건 (`spouse-01`, `family-01`, `friend-01`) ScriptedText 14,931 variants.

---

## 1. v5 baseline 평가

### 1.1 v5 결과 (객관)

| 항목 | 결과 |
|---|---|
| v3+v4+v5 누적 patches | 466 (spouse 174 / family 120 / friend 172) |
| 누설 (v3 매트릭스) | 0건 |
| 사용자 사례 13개 처리율 | 92% (12/13, P1 1건 부분 수정) |
| 자동 검증 PASS | precheck-stage-aware / precheck-qa-coherence / precheck-broad-detection |
| 빌드 / tsc | PASS |
| Claude polish candidates | 2,637건 (C1 1,338 / C2 193 / C3 1,080 / C4 17 / C5 9) |
| **이전 Thread-QW-Cross 600회** | **P0 0 / P1 3 / P2 1** ← 효율 한계 |

### 1.2 v5 한계 영역 (v6에서 보강)

- **P1 Q-A 정합 광범위 검출**: v4/v5 모두 1건만 처리. 의미 분석 차원의 자동 검출 한계
- **lieState 진행 자연성**: 정적 검증만. NPC의 S0→S5 흐름이 의미·톤상 자연스러운지 검증 X
- **evidence unlock 시점 정합**: 발화 ↔ evidence unlock 시점 cross-check 안 됨
- **archetype voice 정량**: 정성 검증만. "박지연 victim_cosplay 단정 빈도" 같은 정량 메트릭 X
- **meter 정합**: rapport / contradict / evidence meter 상태와 발화 트리거 정합 검증 X

→ v5는 정적 키워드/패턴 분석에 머물렀음. v6는 **게임 흐름 / 메커니즘 / 정량 차원**으로 확장.

---

## 2. 작업 원칙 (v5 + 강화 #12)

### 2.1 핵심 원칙

| # | 원칙 | 비고 |
|---|---|---|
| P1~P11 | v5 원칙 유지 | |
| **P12** | **★ 정적 분석의 한계 — 게임 흐름 / 메커니즘 / 정량 차원 추가** | 키워드/패턴 정적 분석 = 측정한 차원만 검증. 게임 본체 흐름은 별개 차원 |

### 2.2 잘못 패턴 #12 (NEW v6)

**규칙**: 정적 키워드 / 메타 / 매트릭스 검증은 **측정한 차원만 정상**. 게임 흐름 (lieState 진행, evidence unlock, archetype voice 정량, meter 시점 정합)은 별도 차원이며 정적 분석으로 검증 X.

**Why**: v3/v4/v5 자동 검증 모두 PASS이지만 사용자 spot check가 새 차원의 issue 발견. 즉 v3/v4/v5의 검증 정의가 게임 본체 메커니즘을 포괄하지 못함.

**How to apply**:
1. 정적 검증 외 게임 흐름/메커니즘/정량 검증 차원 추가
2. 다른 차원에서 검출 0건 도달 후에 종료
3. "PASS = 측정 차원만 정상" 인지 강화

---

## 3. 새 4 검출 차원 (★ v6 핵심)

### 3.1 D1 — LieState Flow 정합 (NPC 흐름)

#### 정의
같은 disputeId × party의 S0/S1/S2/S3/S4/S5 entries text가 lieState 진행에 자연스러운 의미·톤 흐름을 가지는지.

#### 진단 방법
1. case data + ScriptedText 결합. 각 NPC × disputeId의 6단계 entries 추출
2. 각 lieState 단계에 기대되는 의미 차원:
   - S0: 완전 부정 (진실 lexeme X / 강한 부정 톤)
   - S1: 일부 인정 (작은 사실만)
   - S2: 핑계 (사정 / 약칭)
   - S3: 책임 전가 (구체적 진실 일부 / 외부 탓)
   - S4: 감정적 (격앙 / 자기 변호 깨짐)
   - S5: 자백 (전부 공개 / 인정)
3. 각 단계가 그 의미 차원에 정합?
   - 위반 sample: S2 entry에 자백 톤 ("사실은 ~") / S3 entry에 부정 톤 ("아닙니다") / S5 entry에 회피 톤
4. semantic-quality validator의 T1/T2/T4 패턴이 이 차원과 직결 (FAIL 9,500건)

#### 처리 방법
- 단계 정합 어긋난 entry → 해당 lieState 의미·톤으로 재작성
- archetype voice 보존 + lieState 단계 정합
- ★ semantic validator FAIL 영역과 cross-check (이전 "범위 밖"으로 분류했지만 실제로는 D1 차원)

#### 광범위 검출 알고리즘

```
모든 NPC interrogation entry에 대해:
1. variantId에서 lieState marker 추출 (S0~S5 또는 early/mid/late/stage3)
2. 텍스트 의미 분석:
   - 부정 indicator: "아닙니다", "그런 적 없", "사실이 아"
   - 자백 indicator: "사실은", "솔직히", "그때는 ~한 것입니다"
   - 핑계 indicator: "사정이", "그땐", "어쩔 수 없"
   - 책임 전가 indicator: "그쪽이", "오히려 그쪽", "제가 그렇게 한 건 ~ 때문"
   - 감정 indicator: 격앙 어휘, 짧은 문장, 강한 어미
3. lieState marker × 의미 차원 매트릭스 cross-check:
   - S0/S1 entry에 자백 indicator → 위반
   - S3+ entry에 부정 indicator → 위반 (자백 진행 안 보임)
   - S5 entry에 회피 indicator → 위반
4. 위반 entries 검출 + patch 적용
```

#### 합산 목표

semantic-quality validator FAIL ~9,500건 중 D1 차원 비율 검출. 
**최소 200~500건 처리 예상** (이전 v3/v4/v5에서 미처리 영역).

### 3.2 D2 — Evidence Unlock 정합 (게임 메커니즘)

#### 정의
NPC 발화가 게임 시점에 unlock 가능한 evidence만 진실 lexeme으로 노출하는지.

#### 진단 방법
1. case data `evidence[]` 정독 — 각 evidence의 surfaceName / name / unlockedByDossier / proves
2. 각 disputeId 추궁 시점에 unlock 가능한 evidence 매트릭스 구축
3. ScriptedText NPC 발화에서 evidence 진실 lexeme이 등장하면 — 그 시점에 unlock 가능한지
4. lieState S3+ NPC 자백은 정상 (unlock 안 됐어도 NPC가 자백 가능) but 재판관/시스템은 unlock된 것만

#### 처리 방법
- 재판관 / 시스템에서 unlock 안 된 evidence 진실 노출 시 → surface 변경
- NPC 자백은 lieState 정합 따라 보존

#### 광범위 검출 알고리즘

```
재판관 4채널 + system_message + mediation entries 정독:
1. evidence 진실 lexeme 검출 (case data evidence.name)
2. 그 entry의 disputeId × tone × stage marker
3. case data dossierCards × unlockedByDossier 매핑으로 unlock 시점 추출
4. 발화 시점 (disputeId + stage)에 evidence unlock 안 된 경우 → 위반
   (현재 v3/v4/v5는 채널 × 시점 매트릭스만. evidence unlock 시점은 별개)
```

#### 합산 목표

**최소 30~80건 처리 예상**. 미세한 부정합이지만 게임 메커니즘에 직접 영향.

### 3.3 D3 — Archetype Voice 정량 검증 (캐릭터 일관성)

#### 정의
같은 NPC의 entries 전체에서 archetype voice 정량 메트릭이 일관 유지되는지.

#### 진단 방법
1. case data `partyA/B.archetype` + `verbalTells[]` 추출
2. 각 archetype의 정량 메트릭 정의:
   - **victim_cosplay** (박지연): 단정 어미 빈도 ≥ 70%, 모호어 ≤ 10%, "그쪽이" 책임 전가 빈도
   - **avoidant** (이준호): 모호어 빈도 ≥ 50% (S0~S2), 핵심어 회피 패턴
   - **affect_flattening** (윤정후 / 최수민): 격앙 표현 ≤ 10% (emotional_overload 채널 포함)
   - **confrontational** (윤태성): 강한 단정 빈도 ≥ 80%, 공격적 반박 어휘
   - **premature_summary** (송다은): 결론 먼저 패턴 ("결국 ~", "뭐, ~")
3. NPC entries 전체 분석 + 메트릭 측정 → 기대치 미달/초과 시 위반

#### 처리 방법
- 메트릭 미달 entries 식별 → archetype voice 강화
- 메트릭 초과 entries 식별 → 균형 맞춤
- archetype voice 보존이 게임 인물 정체성 유지 핵심

#### 광범위 검출 알고리즘

```
각 NPC × archetype에 대해:
1. 모든 entries 모음 (interrogation / evidence_present / contradiction_pursuit / etc)
2. archetype별 정량 indicator 빈도 측정
3. 기대 메트릭 매트릭스 cross-check
4. 메트릭 위반 entries patch 후보
```

#### 합산 목표

**최소 50~150건 처리 예상**. 미세 일관 보강이지만 누적 시 캐릭터 인상 강화.

### 3.4 D4 — Meter Timing 정합 (게임 상태)

#### 정의
NPC 발화 / 재판관 발화가 기대되는 game meter 상태 (rapport / contradict / evidence / fatigue) 에서만 트리거되는지.

#### 진단 방법
1. trust_action / rapport_milestone / contradict_milestone 채널 정독
2. 각 entry의 트리거 조건 (e.g., rapport ≥ 50 / contradict_token 누적 ≥ 3) 추출
3. 텍스트 내용이 그 meter 상태에 정합하는지
   - rapport ≥ 70 entry에 "신뢰가 깊어진다" 톤 ✓
   - rapport ≤ 30 entry에 "마음을 열고" 톤 → 위반
   - contradict_token ≥ 5 entry에 "처음 엇갈린다" 톤 → 위반

#### 처리 방법
- 트리거 조건과 텍스트 내용 정합 안 되는 entries 재작성
- meter 상태 톤 일관

#### 광범위 검출 알고리즘

```
trust_action / rapport_milestone / contradict_milestone / fatigue 관련 채널 정독:
1. 트리거 조건 메타 추출 (variantId / behaviorHint / 기타)
2. 텍스트 내용 의미 분석 — meter 상태 indicator
3. 트리거 조건 ↔ 텍스트 내용 정합 cross-check
4. 위반 entries patch 후보
```

#### 합산 목표

**최소 20~60건 처리 예상**. 채널 한정이라 양 적음 but 정량 정합.

---

## 4. Specialist 9종 (v5 5종 + 신규 4종)

### 4.1 specialist 분담

```
v5 specialist (유지):
- A_TruthLeak (누설 — v3 매트릭스)
- B_RegisterAngle (P2 화법 + P3 추궁 각도 + P4 정황)
- C_FactCheck (사건 fact)
- D_QACoherence (P1 Q-A 정합)
- E_SystemAlignment (P5 코드명 + P6 시스템 트리거)

v6 신규 specialist:
- F_LieStateFlow (D1 lieState 진행 자연성)
- G_EvidenceUnlock (D2 evidence unlock 시점 정합)
- H_ArchetypeQuant (D3 archetype voice 정량)
- I_MeterTiming (D4 meter 시점 정합)
```

### 4.2 Coordinator 우선순위 (v5 + 신규)

```
TruthLeak (P0 — 누설 절대 회피) ★★★★★
  ↓
FactCheck (P0 — 사건 무결성) ★★★★
  ↓
QACoherence (P0 — 게임 본체 메커니즘) ★★★★
  ↓
EvidenceUnlock (P1 — 게임 메커니즘 정합) ★★★★
  ↓
LieStateFlow (P1 — NPC 흐름 자연성) ★★★
  ↓
RegisterAngle (P1 — 화법 / 추궁) ★★★
  ↓
ArchetypeQuant (P2 — 캐릭터 일관성) ★★
  ↓
MeterTiming (P2 — 게임 상태 정합) ★★
  ↓
SystemAlignment (P3 — 코드명 / 트리거) ★
```

EvidenceUnlock + LieStateFlow는 게임 본체 메커니즘 직결이라 P0/P1 등급.

---

## 5. Thread-QW-Cross 강화 (v6 핵심)

### 5.1 차원 cross-validation

기존 5 specialist × 5 = 25 cross-check 매트릭스.
v6 9 specialist × 9 = **81 cross-check 매트릭스** (대각선 제외 72).

각 specialist가 다른 8 specialist의 patch 결과 검증:
- A_TruthLeak이 patch한 후 → F_LieStateFlow가 그 patch가 lieState 흐름 깨뜨렸는지 검증
- F_LieStateFlow가 patch한 후 → G_EvidenceUnlock이 그 patch가 evidence 노출 만들었는지 검증
- ...

### 5.2 라운드 구조 (v4 9.3 재사용 + 9 specialist)

```
ROUND 1 — Detection (9 specialist 병렬)
  → tmp/codex-recovery-v6/round-N/{A~I}-proposals.json

ROUND 2 — Coordination (X_Coordinator)
  → 우선순위 매트릭스 (9 specialist 통합)
  → coordinated-patches.json

ROUND 3 — Cross-Validation (9x9 매트릭스)
  → cross-validation.json

ROUND 4 — Re-Detection
  → residual-issues.json

ROUND 5 — Final Validation + Claude Polish 분류
```

종료 조건:
- 모든 9 specialist 잔여 0건
- 변경 0건 round 1회
- max 7 round (9 specialist 부담 고려, v5 max 5에서 확장)
- patch oscillation

### 5.3 Thread-QW-Cross 추가 sampling

기존 600 entries cross-check 외 추가 검토:
- D1~D4 신규 차원에서 발견된 patches 중 1,000 entries 무작위 sampling → 9 specialist cross-check
- 이전 600회는 5 specialist 한정이었으나 v6는 9 specialist이라 검증 깊이 ↑

---

## 6. v5 산출물 baseline + 보존

### 6.1 입력

```
tmp/codex-recovery-v5/
├── changes-log-v5.json (v4 81 + v5 추가 385 = 466 patches — 보존)
├── claude-polish-candidates-v5.json (2,637 — 갱신/추가)
├── precheck-stage-aware.cjs / precheck-qa-coherence.cjs / precheck-broad-detection.cjs (유지)
├── precheck-comprehensive-v5.cjs (확장 → v6)
├── fact-matrix.json
└── ...
```

### 6.2 출력

```
tmp/codex-recovery-v6/
├── FINAL-REPORT-v6.md
├── changes-log-v6.json (v5 466 + v6 추가 patches 통합)
├── claude-polish-candidates-v6.json (2,637 + 추가)
├── p7-ui-surface-leaks-v6.json
├── round-1/ ~ round-N/
│   ├── A-proposals.json ~ I-proposals.json (9 specialist)
│   ├── coordinated-patches.json
│   ├── cross-validation.json (9x9 매트릭스)
│   └── residual-issues.json
├── round-log-v6.json
├── precheck-liestate-flow.cjs (NEW — D1)
├── precheck-evidence-unlock.cjs (NEW — D2)
├── precheck-archetype-quant.cjs (NEW — D3)
├── precheck-meter-timing.cjs (NEW — D4)
├── precheck-comprehensive-v6.cjs (통합)
├── thread-qw-cross-v6-results.json (1,000 entries sampling 결과)
├── final-validation-v6.json
└── (sample 패치 30건 / 각 specialist 대표 5건)
```

### 6.3 v5 patches 보존 검증

v6 적용 후에도 v5 466 patches의 (entryKey × variantId × after) 매핑이 보존되는지 검증.

---

## 7. 게임 구조 / 누설 정의 / 사건 fact (v4 의뢰서 2~7절 참조)

v4 의뢰서 2~7절 (게임 구조 / 누설 정의 매트릭스 / 재판관 말투 품질 / NPC 발화 / 사건별 핵심 fact)는 v6에서도 동일 적용. 본 의뢰서는 변경 없는 영역 압축.

핵심 보존:
- 채널 × 시점 × 화자 누설 매트릭스 (v3 정립) — 절대 위반 X
- 사건별 핵심 fact (family A 40/B 60 등)
- archetype voice 보존
- 사용자 모범 4 patch (Patch 1~3 = Codex / Patch 4 = Claude)

---

## 8. ClaudeCode 2차 영역 (v5 6절 유지)

**Codex 작업 X (Claude가 처리)**:
- C1. 주어 보완 + 명사형 → 동사형
- C2. 묘사 자연체
- C3. 일상 어휘
- C4. 시스템 관찰자 톤
- C5. UI 카피
- 호칭 / callTerms / 합니다체 / 깨진 조사 / 번역체 / 부인 동사 / 단조 어미

**Codex 작업 O (v6)**:
- v3+v4+v5 patches 보존
- D1~D4 신규 차원 + 광범위 검출
- v3/v4/v5 매트릭스 회귀 X

---

## 9. 작업 절차

### 9.1 1단계: v5 산출물 정독 + 새 차원 알고리즘 정의

```
- tmp/codex-recovery-v5/changes-log-v5.json
- tmp/codex-recovery-v5/claude-polish-candidates-v5.json
- tmp/codex-recovery-v5/FINAL-REPORT-v5.md
- src/data/cases/generated/{caseId}.json (evidence / dossier / archetype / verbalTells)
- src/data/scriptedText/{caseId}.json (14,931 variants)
```

### 9.2 2단계: 9 specialist 병렬 detection (D1~D4 신규 차원 강조)

### 9.3 3단계: 라운드 자동화 (max 7 round)

### 9.4 4단계: Thread-QW-Cross 1,000 entries sampling

### 9.5 5단계: 자체 검증

```bash
npm run build
npx tsc -b --force
node tmp/codex-recovery-v6/precheck-stage-aware.cjs (v3 매트릭스)
node tmp/codex-recovery-v6/precheck-qa-coherence.cjs (v4)
node tmp/codex-recovery-v6/precheck-broad-detection.cjs (v5)
node tmp/codex-recovery-v6/precheck-liestate-flow.cjs (v6 D1)
node tmp/codex-recovery-v6/precheck-evidence-unlock.cjs (v6 D2)
node tmp/codex-recovery-v6/precheck-archetype-quant.cjs (v6 D3)
node tmp/codex-recovery-v6/precheck-meter-timing.cjs (v6 D4)
node tmp/codex-recovery-v6/precheck-comprehensive-v6.cjs (통합)
```

### 9.6 6단계: 산출물 저장

---

## 10. 검증 체크리스트 (v6)

### 10.1 v3/v4/v5 회귀 방지
- [ ] 누설 키워드 0 hits (v3 매트릭스)
- [ ] precheck-stage-aware PASS
- [ ] precheck-qa-coherence PASS
- [ ] precheck-broad-detection PASS
- [ ] v5 466 patches 보존 (entryKey × after 매핑)
- [ ] NPC S3+/late/stage3 자기 호칭 보존
- [ ] aftermath 보존

### 10.2 v6 신규 검증
- [ ] D1 LieState Flow PASS (precheck-liestate-flow.cjs)
- [ ] D2 Evidence Unlock 정합 PASS (precheck-evidence-unlock.cjs)
- [ ] D3 Archetype Voice 정량 PASS (precheck-archetype-quant.cjs)
- [ ] D4 Meter Timing 정합 PASS (precheck-meter-timing.cjs)
- [ ] precheck-comprehensive-v6 통합 PASS

### 10.3 Thread-QW-Cross 강화
- [ ] 1,000 entries sampling 검증 결과 기록
- [ ] 9x9 cross-validation 매트릭스 결과 기록
- [ ] 신규 issue 검출 통계 (D1~D4 별)

### 10.4 메타 보존
- [ ] 14,931 variants 보존
- [ ] id / tags / sourceRefs / status 보존
- [ ] status='skipped' 미변경
- [ ] case data 미변경

### 10.5 빌드
- [ ] npm run build PASS
- [ ] npx tsc -b --force PASS

---

## 11. 잘못 패턴 #1~#12 (절대 회피)

(#1~#11 v5 의뢰서 9절 유지)

### #12 (NEW v6) 정적 분석의 한계 — 게임 흐름 / 메커니즘 / 정량 차원 추가
- 정적 키워드 / 매트릭스 검증은 측정한 차원만 정상
- 게임 흐름 (lieState 진행 / evidence unlock / archetype 정량 / meter 시점)은 별도 차원
- 정적 PASS = "측정 차원만 정상". 다른 차원은 별개 검출 필요

---

## 12. 산출물 형식 (v5와 동일 + D1~D4 추가)

### 12.1 changes-log-v6.json

```json
{
  "generatedAt": "ISO8601",
  "totalPatches": 0,
  "v5BaselinePreserved": true,
  "v6AddedPatches": 0,
  "byCase": { "spouse-01": 0, "family-01": 0, "friend-01": 0 },
  "byPattern": {
    "P1_QACoherence": 0,
    "P2_CharacterRegister": 0,
    "P3_JudgeAngle": 0,
    "P4_NarrativeDetail": 0,
    "P5_CodeNameResolve": 0,
    "P6_SystemTrigger": 0,
    "D1_LieStateFlow": 0,
    "D2_EvidenceUnlock": 0,
    "D3_ArchetypeQuant": 0,
    "D4_MeterTiming": 0
  },
  "patches": [...]
}
```

### 12.2 thread-qw-cross-v6-results.json

```json
{
  "samplingSize": 1000,
  "byDimension": {
    "v5_existing": { "issues": 0, "byPriority": {} },
    "D1_LieStateFlow": { "issues": 0, "samples": [] },
    "D2_EvidenceUnlock": { "issues": 0, "samples": [] },
    "D3_ArchetypeQuant": { "issues": 0, "samples": [] },
    "D4_MeterTiming": { "issues": 0, "samples": [] }
  },
  "crossValidationMatrix": {
    "9x9": [...]
  }
}
```

### 12.3 FINAL-REPORT-v6.md

```markdown
# Codex Recovery v6 Final Report

## 작업 요약
- 시간 / 라운드 수 / 종료 사유
- v5 baseline 466 patches 보존 + v6 추가 N patches
- D1~D4 신규 차원 검출 통계

## D1~D4 별 통계
- D1 LieState Flow: 검출 N → 처리 N → 잔여 0
- D2 Evidence Unlock: 검출 N → 처리 N → 잔여 0
- D3 Archetype Quant: 검출 N → 처리 N → 잔여 0
- D4 Meter Timing: 검출 N → 처리 N → 잔여 0

## Thread-QW-Cross 1,000 entries 결과
- 9x9 cross-validation 매트릭스
- 새 issue 검출

## 라운드 진행 추적
| Round | A | B | C | D | E | F | G | H | I | 적용 | 잔여 |
| ... |

## 대표 patch 사례 (각 차원 5건씩)

## 검증 결과 (모든 precheck PASS)

## ClaudeCode 인계
- claude-polish-candidates-v6.json (C1~C5 영역)
- p7-ui-surface-leaks-v6.json

## Known Issue
- d-5 신규 cell (사용자 GPT Pro)
- P7 UI 누설 (별도 코드 fix)

## 결정 대기 항목
```

---

## 13. 참고 자료

### 13.1 의뢰서
- `tmp/REQUEST-Codex-recovery-v2.md` — 게임 구조 / 누설 정의 / 라운드 구조
- `tmp/REQUEST-Codex-recovery-v4.md` — P1~P6 의미·맥락 + 9차원 + 사례 11
- `tmp/REQUEST-Codex-recovery-v5.md` — 광범위 동형 검출 강화
- 본 v6 — 새 4 차원 (D1~D4) + Thread-QW-Cross 강화

### 13.2 v5 산출물 (입력 baseline)
- `tmp/codex-recovery-v5/` — changes-log / candidates / precheck / FINAL-REPORT

### 13.3 데이터
- `src/data/cases/generated/{spouse-01,family-01,friend-01}.json`
- `src/data/scriptedText/{spouse-01,family-01,friend-01}.json`
- `src/data/claimPolicies/{caseId}-*.json`

### 13.4 메모리 / 도메인
- `CLAUDE.md`
- `gpt-pro-runs/script-redo-20260426/source/04~07-*.md`

### 13.5 게임 엔진 (D1~D4 검증 영역 이해)
- `src/engine/lieStateMachine.ts` — S0~S5 전이 규칙
- `src/engine/evidenceEngine.ts` — evidence 해금 / 조합
- `src/engine/blueprintPromptBuilderV2.ts` — archetype voice
- `src/engine/questionMeters.ts` — meter 정의

---

## 14. 작업 시 주의

1. **시간 제약 없음** — D1~D4 깊이 우선
2. **자율 판단** — 각 specialist 자기 차원만. 다른 차원 변경 X
3. **분담 엄격** — Codex = 의미·맥락·게임 메커니즘 / Claude = 호칭·존칭·어법
4. **메타 보존** — text 교체만. status='skipped' 보존
5. **archetype voice 절대 보존** — D3는 정량 보강이지 변형 X
6. **v3/v4/v5 매트릭스 절대 보존** — 회귀 0
7. **사건 fact 절대 보존** — family A 40/B 60 등
8. **claude-polish-candidates에 어법 issue 표시** — Codex 안 처리할 영역
9. **Thread-QW-Cross 1,000 sampling** — D1~D4 차원 검증 깊이
10. **patch 충돌 시 우선순위** — TruthLeak > FactCheck > QACoherence > EvidenceUnlock > LieStateFlow > RegisterAngle > ArchetypeQuant > MeterTiming > SystemAlignment

---

## 15. ClaudeCode 회수 후 작업 흐름

```
[Codex v6 — 본 의뢰]
- v5 baseline 보존 + D1~D4 신규 차원
- 9 specialist 라운드 자동화
- Thread-QW-Cross 1,000 sampling
- 자체 검증 PASS
- 산출물 저장
       ↓
[ClaudeCode CT 회수]
- FINAL-REPORT-v6.md 검토
- changes-log-v6.json spot check (각 차원 / 각 사건 10건)
- precheck-comprehensive-v6 재실행 → ALL PASS
- 빌드 / tsc 재확인
       ↓
[ClaudeCode 2차 — C1~C5 어법 폴리싱 (있으면)]
       ↓
[commit + push]
- 사용자 명시 후
```

---

## 16. 본 의뢰 범위 X (별도 작업)

- **P7 UI 누설** — 코드 fix (UI 렌더 영역)
- **d-5 신규 cell 작성** — 사용자 GPT Pro
- **코드 fallback 23건** — 별도 의뢰
- **C3 일상 어휘 487건** — 사용자 spot check 영역
- **C1 주어/명사형 1,338건** — false positive 의심, 보류
- **신규 사건 / 신규 콘텐츠** — 보완 X 신규 X (잘못 패턴 #4)

---

## 17. 마무리 — Codex에게

v3 (누설 매트릭스) + v4 (의미·맥락 P1~P6) + v5 (광범위 동형) 누적 466 patches로 정적 키워드/패턴/매트릭스 검증은 완료 영역입니다. 그러나 사용자 spot check가 새 차원의 issue를 계속 발견 (예: semantic-quality validator FAIL 9,500건 — D1 차원).

v6 핵심은 "**게임 흐름 / 메커니즘 / 정량 차원**"입니다:
- D1 LieState Flow — NPC 진행 자연성
- D2 Evidence Unlock 정합 — 게임 메커니즘
- D3 Archetype Voice 정량 — 캐릭터 일관성
- D4 Meter Timing 정합 — 게임 상태

5 specialist 한정의 v3/v4/v5에서 검출 못한 차원입니다. 9 specialist 확장 + Thread-QW-Cross 1,000 sampling으로 깊이 검증.

종료 조건이 "잔여 issue 0건"이지만, semantic-quality validator FAIL 9,500건이 D1 차원이라면 그 처리량이 본 의뢰의 핵심 KPI입니다.

자체 검증 PASS 후 `tmp/codex-recovery-v6/FINAL-REPORT-v6.md`로 종합 보고. ClaudeCode CT 회수 + 폴리싱 + commit.

— END —
