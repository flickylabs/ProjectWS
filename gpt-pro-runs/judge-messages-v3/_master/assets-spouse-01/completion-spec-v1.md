# spouse-01 ScriptedText 보완 명세 v1 (entries 단위)

> **작성**: 메인 직접 (`src/data/scriptedText/spouse-01.json`, `src/data/cases/generated/spouse-01.json`, `src/data/claimPolicies/spouse-01-*` 모두 직접 read 후)
> **사용자 결정 반영** (2026-04-26):
> 1. variants 풀 5 → **10 (적극)**
> 2. investigationStages = **옵션 A** (evidence_present에 stage 차원 신설)
> 3. rapport_milestone / contradict_milestone **신규 채널**
> 4. judge_evidence_combo **8 dossier × 3 tone × 3v = 72**
> 5. 전수 보정 (서브에이전트/Codex/GPT Pro 병렬)
> **결정 필요 (명세 안에 ⚠️로 표시)**: 채널별 v 차등 정책, evidence_discovery 처리, milestone v

---

## 0. 9차원 맥락 매핑 — 데이터 출처 확정

| 차원 | 데이터 출처 |
|---|---|
| 쟁점 (4 disputes) | `src/data/claimPolicies/spouse-01-structure-v2.json` (depthLayers + linkEdges) |
| 캐릭터 (a/b) | `cases/generated/spouse-01.json` (parties + archetype) |
| lieState (S0~S5) | `claimPolicies/spouse-01-v2-atoms.json` (claimPolicies.{a|b}.{disputeId}.{S0~S5}.claimAtoms[]) |
| emotion (6종) | ScriptedText 내 tag 분포 (cautious/measured/shaken/resigned/guarded/defensive) |
| rapport | `game-events.json` transitionBeats + 신규 milestone 채널 |
| contradict_token | `game-events-v2.json` contradictions 16건 + 신규 milestone 채널 |
| q_type (3종) | interrogation entry meta |
| tone (soft/mid/hard) | judge_contradiction 채널 외 신규 적용 |
| 시점 (tense) | 단일 (present) — 변경 없음 |
| **편향성 (subjectParty)** | `cases/generated/spouse-01.json` evidences[].subjectParty (a/b/both) |

**증거 편향성 매핑 (사용자 강조 사항)**:
| evidence | subjectParty | 의미 |
|---|---|---|
| e-1 영수증 | b | 이준호 사정 (조카 돌봄) |
| e-2 GPS | b | 이준호 동선 |
| e-3 통화기록 | b | 이준호 새벽 통화 |
| e-4 형 문자 | b | 이준호 가족 관계 |
| e-5 이준호 출금 | both | 양측 (B 비자금 / A가 안 경위) |
| e-6 박지연 투자 | a | 박지연 송금 |
| e-7 공동 적금 | (재확인 필요) | A 위임장 조작 의심 |

**evidence_present의 subjectRole = 자동 결정** (party와 evidence.subjectParty 조합):
- evidence.subjectParty = 'b' & 응답자 'b' → subjectRole 'self'
- evidence.subjectParty = 'b' & 응답자 'a' → subjectRole 'other'
- evidence.subjectParty = 'both' & 응답자 'a/b' → subjectRole 'both' / 'self' (비대칭)

→ **신규 entries 작성 시 self/other/both에 따라 stance/truthLevel 매트릭스 반영 필수**.

---

## 1. 채널별 v 정책 (⚠️ 결정 필요)

| 카테고리 | 채널 | 현재 v | 권장 v | 사유 |
|---|---|---|---|---|
| **NPC 발화** | interrogation, evidence_present, dossier, witness, evidence_discovery, contradiction_pursuit, interjection, emotional_overload, trust_action, mediation | 1~5 | **10** (사용자 결정) | 반복 액션 시 alt 풍부함 |
| **재판관 발화** | judge_question, judge_contradiction, judge_evidence_combo (신규), judge_witness_summon (신규) | 2~3 | **5** | 재판관 톤 일관성 유지 |
| **시스템** | system_message | 2 | **5** | narrative 톤 다양성 |
| **milestone (신규)** | rapport_milestone, contradict_milestone | — | **5** | 전환 순간만 발화 |
| **aftermath** | aftermath | 2 | **5** | 결과 화면 다양성 |

⚠️ **사용자 확인 1**: 재판관 5v / 시스템 5v / milestone 5v / aftermath 5v 정책 OK?

---

## 2. 영역별 보완 명세

### #1 alt 풀 확장 (사용자: 5→10 적극)

| 채널 | 현재 keys × v | 목표 keys × v | 추가 entries |
|---|---|---|---|
| interrogation | 144 × 5 = 720 | 144 × 10 = 1,440 | **+720** |
| evidence_present | 42 × 5 = 210 | 42 × 10 = 420 | +210 *(stage 차원과 결합 — 다음 절) |
| dossier | 24 × 3 = 72 | 24 × 10 = 240 | **+168** |
| witness | 9 × 3 = 27 | 9 × 10 = 90 | **+63** |
| evidence_discovery | 12 × 1 = 12 | 12 × 10 = 120 | **+108** ⚠️ (다음 절에서 처리 결정) |
| contradiction_pursuit | 16 × 3 = 48 | 16 × 10 = 160 | **+112** |
| interjection | 8 × 3 = 24 | 8 × 10 = 80 | **+56** |
| emotional_overload | 4 × 2 = 8 | 4 × 10 = 40 | **+32** |
| trust_action | 18 × 2 = 36 | 18 × 10 = 180 | **+144** |
| mediation (paths→entries) | 8 × 1 = 8 | 8 × 10 = 80 | **+72** |
| judge_question | 24 × 2 = 48 | 24 × 5 = 120 (재판관 5v) | **+72** |
| judge_contradiction | 6 × 3 = 18 | 6 × 5 = 30 | **+12** |
| system_message | 6 × 2 = 12 | 6 × 5 = 30 | **+18** |
| aftermath | 5 × 2 = 10 | 5 × 5 = 25 | **+15** |
| **소계 #1** | | | **+1,802 entries** |

### #2 evidence_present에 stage 차원 신설 (옵션 A)

**현재 키**: `party | evidenceId | lieBand` × subjectRole 자동 (42 cells)
**보완 키**: `party | evidenceId | lieBand | investigationStage` (126 cells)

| 차원 | 값 |
|---|---|
| party | a, b (2) |
| evidenceId | e-1~e-7 (7) |
| lieBand | early, mid, late (3) |
| **investigationStage** | **0 (request_original), 1 (check_metadata), 2 (restore_context)** (3) |

**총 cells**: 2 × 7 × 3 × 3 = **126** (기존 42의 3배)
**총 entries**: 126 × 10v = **1,260** (현재 210 → +1,050)

**stage별 텍스트 차이 가이드**:
- stage 0: 증거 자체 인지 ("이 영수증, 누가 산 것입니까?" → NPC 답변)
- stage 1: 메타데이터 ("이 품목들이 가리키는 상대는?")
- stage 2: 맥락 복원 ("중학생 참고서는 누구를 위해?")

→ 사건 데이터 `evidences[].investigationStages[].revealKey` + `partyContext.{a,b}.questionAngle` 활용 필수.

⚠️ **결정 필요 2 — evidence_discovery 채널 처리**:
- 옵션 X1 (권장): **evidence_discovery 폐기**, evidence_present의 stage 차원으로 통합 → -120 entries
- 옵션 X2: evidence_discovery 별도 유지 (step=probe/slip/capture/confirm은 다른 의미 — 진행 단계, stage는 정보 깊이)

→ X1 권장 (의미 중복 + 단순화). 사용자 확인 필요.

**소계 #2 (X1 채택 시)**: +1,050 - 120 = **+930 entries** (X1 시)

### #3 rapport_milestone / contradict_milestone 신규 채널

**rapport_milestone** (신뢰 게이지 임계점 전환 시 NPC 발화):
- 임계점: `low → mid` (+15), `mid → high` (+30), `high → trust_open` (+50)
- 키: `party | milestone_threshold` (3 단계)
- cells: 2p × 3 milestone = 6
- entries: 6 × 5v = **30**

**contradict_milestone** (모순 누적 토큰 임계점 발화):
- 임계점: `1 token → 2 tokens → 3+ tokens` (NPC가 압박 무게 인지)
- 키: `party | token_threshold`
- cells: 2p × 3 milestone = 6
- entries: 6 × 5v = **30**

**소계 #3**: **+60 entries**

### #4 judge_question 4 disputes 완성

**현재**: 24 keys = 2d × 3q × 4depth (h-d3/h-d4 누락)
**보완**: 48 keys = 4d × 3q × 4depth
**추가 cells**: 24
**추가 entries**: 24 × 5v = **+120**

(★ #1에서는 기존 24 keys × 5v=120만 카운트했음 → #4가 별도 추가)

### #5 모순/이벤트 발동 보강 + 신규 채널

#### 5-1. h-d3/h-d4 추가 (5개 채널)

| 채널 | 추가 cells | × v | 추가 entries |
|---|---|---|---|
| judge_contradiction | 2d × 3 tone = 6 | × 5 | **+30** |
| contradiction_pursuit | 2p × 2d × 4S = 16 | × 10 | **+160** |
| interjection | 2p × 2d × 2 severity = 8 | × 10 | **+80** |
| emotional_overload | 2p × 2d = 4 | × 10 | **+40** |
| **소계 5-1** | | | **+310** |

#### 5-2. judge_evidence_combo 신규 (사용자 결정 8 × 3 × 3 = 72)

⚠️ **결정 필요 3**: 사용자 결정 "8 dossier × 3 tone × 3v = 72". 재판관 5v 정책 일관성 위해 **8 × 3 × 5 = +120**으로 변경 검토? 아니면 사용자 결정 그대로 3v?

키: `combo_id | tone` (24 cells, 8 dossier 콤보 기반)
사용자 결정 그대로: **+72 entries**

#### 5-3. judge_witness_summon 신규

키: `witnessId | tone` 또는 `witnessId | depth`
- 옵션 1: 3 witness × 3 tone × 5v = 45
- 옵션 2: 3 witness × 3 depth × 3v = 27 (분량 작음)
- **권장**: 3 × 3 × 5 = **+45 entries**

#### 5-4. system_message 새 이벤트

추가 eventType 후보:
- judge_contradiction_trigger (모순 발동)
- judge_combo_trigger (콤보 발동)
- witness_summon_trigger
- rapport_milestone_trigger
- emotion_phase_shift_trigger

5 새 events × 5v = **+25 entries**

**소계 #5 전체**: 310 + 72 + 45 + 25 = **+452 entries**

### #6 mediation paths 형식 → entries 형식 전환

현재: `paths.{4 paths}.dialogues[].{2 speakers × 1 line}` = 8 lines
보완:
- entries 형식으로 전환 (key: `path | speaker`)
- 8 keys × 10v = 80 entries
- 단 #1에서 이미 +72로 카운트했음 → 중복 제거

**소계 #6**: 0 (이미 #1에 포함)

---

## 3. 총 분량 합산

| 영역 | 추가 entries |
|---|---|
| #1 alt 풀 5→10 (전 채널) | +1,802 |
| #2 evidence stage 차원 (옵션 A + X1) | +930 |
| #3 rapport/contradict_milestone | +60 |
| #4 judge_q h-d3/h-d4 | +120 |
| #5 모순/이벤트 신규 + 보강 | +452 |
| **총 보완** | **+3,364 entries** |
| 현재 1,253 → 보완 후 ≈ **4,617** | |

---

## 4. 톤 보정 (기존 entries 전수)

사용자 결정: **전수 보정 + 서브에이전트/Codex/병렬 ClaudeCode 활용**.

### 보정 대상 우선순위
1. **interrogation S3+ confession 줄기** (144 keys 중 S3/S4/S5 = 72 keys × 5v = 360 entries) — 자백 진행 핵심 톤
2. **judge_contradiction 6 keys × 3v = 18 entries** — 가장 시연 빈도 높음 (모순 발동 시 매번)
3. **mediation 8 lines** — Phase 6 결정 시점, 짧지만 영향 큼
4. **judge_question 24 keys × 2v = 48 entries** — 모든 심문 시작점
5. **interjection / emotional_overload** — 개입 순간 톤 강조 필수
6. **나머지 interrogation (S0~S2 + 신규 작성 분량)** — 부피 큼

### 보정 작업 분할 (권장 — ⚠️ 사용자 확인 4)

| 작업 | 실행 주체 | 예상 분량 |
|---|---|---|
| 우선순위 1~5 (485 entries 보정) | **Claude 메인 + 서브에이전트 병렬 (5 그룹 분할)** | 한 세션 내 |
| 우선순위 6 (기존 + 신규 alt 풀) | **GPT Pro (3 세션)** | 사건당 2~3 세션 |
| #2 evidence stage 신설 (1,260 entries 신규) | **GPT Pro (2 세션)** | 큰 분량 |
| #3 milestone 채널 신규 (60 entries) | **Claude 메인** | 짧은 작업 |
| #4 judge_q 보강 (120 entries) | **GPT Pro (1 세션)** | 재판관 톤 일관성 |
| #5 신규 채널 + 누락 disputes (452 entries) | **GPT Pro (2 세션)** | |

**총 GPT Pro 세션**: ≈ **8~9 세션** (인수인계의 "사건당 2~3 세션"을 초과 — 사용자 결정 5→10 + 옵션 A 영향)

---

## 5. ⚠️ 사용자 결정 요청 항목

명세 작성 진행 전 답변 부탁:

1. **채널별 v 차등 정책 OK?** (NPC 10v / 재판관 5v / 시스템 5v / milestone 5v / aftermath 5v)
2. **evidence_discovery 채널 폐기 (X1) OK?** (evidence_present stage 차원으로 통합)
3. **judge_evidence_combo v**: 사용자 결정 3v 그대로 vs 5v 일관성 적용?
4. **보정/신규 작업 분할 OK?** (메인 우선순위 1~5 + GPT Pro 8~9 세션)
5. **DossierCard 정의 위치 확인 필요** — `dossier-cards.json` 없음. 사건 데이터 또는 v3-game-loop-data.json 안에 있는지 다음 단계에서 확인 필요 (보완 명세 정확성 영향)

---

## 6. 다음 단계 — 결정 후 실행

1. 위 5개 결정 받음
2. DossierCard 정의 위치 확인 → dossier 신규 alt 풀 작성 시 정확도 확보
3. **명세 v2 확정** (entries 단위 키 패턴 매트릭스 별표)
4. GPT Pro 의뢰 패키지 (각 세션별 입력 자료 + 출력 스키마)
5. 메인 직접 작업 (보정 우선순위 1~3)
6. 작업 완료분 → src/data/scriptedText/spouse-01.json patch + 빌드 검증
