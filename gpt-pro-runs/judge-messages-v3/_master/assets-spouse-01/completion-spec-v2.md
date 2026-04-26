# spouse-01 ScriptedText 보완 명세 v2 (확정)

> **작성**: 2026-04-26 메인 직접 (Claude Opus 4.7)
> **사용자 결정 모두 반영**:
> 1. variants 풀 정책: NPC 10v / 재판관 5v / 시스템 5v / milestone 5v / aftermath 5v
> 2. evidence_discovery 채널 폐기 → evidence_present에 stage 차원 통합
> 3. judge_evidence_combo 5v 일관 적용 (재판관 정책)
> 4. 작업 분할 — 메인 + GPT Pro 8~9 세션 + 서브에이전트 병렬
> 5. DossierCard 활성 확인 완료 (Legacy 아님)
>
> **상위 문서**:
> - [`02-tone-guide.md`](../02-tone-guide.md) — 보정 톤 8원칙
> - [`character-info.md`](./character-info.md) — 인물 정보 (정정본)
> - [`phase1-2-dialogue.md`](./phase1-2-dialogue.md) — base voice 톤
> - [`gap-analysis-v1.md`](./gap-analysis-v1.md) — 부족 영역 분석

---

## 0. v 정책 관리 표 (사용자 요청 — 기록 보존)

| 카테고리 | 채널 | 현재 v | **확정 v** | 사유 |
|---|---|---|---|---|
| **NPC 발화 (10v)** | interrogation | 5 | **10** | 반복 액션 alt 풍부 |
| | evidence_present | 5 | **10** | + stage 차원 (옵션 A) |
| | dossier | 3 | **10** | 8 question × 10v |
| | witness | 3 | **10** | 9 keys × 10v |
| | contradiction_pursuit | 3 | **10** | 모순 추궁 NPC 응답 |
| | interjection | 3 | **10** | 끼어들기 풍부 |
| | emotional_overload | 2 | **10** | 감정 과부하 변형 |
| | trust_action | 2 | **10** | 신뢰 행동 |
| | mediation (paths→entries) | 1 | **10** | Phase 6 중재 |
| **재판관 발화 (5v)** | judge_question | 2 | **5** | 톤 일관성 |
| | judge_contradiction | 3 | **5** | |
| | judge_evidence_combo (신규) | — | **5** | 사용자 5v 통일 |
| | judge_witness_summon (신규) | — | **5** | |
| **시스템 (5v)** | system_message | 2 | **5** | narrative 톤 다양성 |
| **milestone (5v)** | rapport_milestone (신규) | — | **5** | 임계점 발화 |
| | contradict_milestone (신규) | — | **5** | |
| **aftermath (5v)** | aftermath | 2 | **5** | 결과 화면 |
| **폐기** | evidence_discovery | 1 | **0 (폐기)** | evidence_present의 stage 차원으로 통합 |

---

## 1. 9차원 맥락 매핑 — 데이터 출처 (확정)

| 차원 | 데이터 출처 | 검증 상태 |
|---|---|---|
| 쟁점 (4 disputes: d-1, d-2, h-d3, h-d4) | `claimPolicies/spouse-01-structure-v2.json` | ✅ |
| 캐릭터 (a 박지연, b 이준호) | `cases/generated/spouse-01.json` | ✅ |
| lieState (S0~S5) | `claimPolicies/spouse-01-v2-atoms.json` (4d × 6S × 2p = 48 sections) | ✅ |
| emotion (6종) | ScriptedText 내 tag (cautious/measured/shaken/resigned/guarded/defensive) | ✅ |
| rapport | `game-events.json` transitionBeats (20건) + 신규 milestone 채널 | ✅ |
| contradict_token | `game-events-v2.json` contradictions (16건) + 신규 milestone 채널 | ✅ |
| q_type (3종 fact_pursuit/motive_search/empathy_approach) | interrogation entry meta | ✅ |
| tone (soft/mid/hard) | judge_contradiction 채널 외 신규 적용 | ✅ |
| 시점 (tense:present만) | 단일 — 변경 없음 | ✅ |

**증거 편향성 매핑 (사용자 강조)** — `cases/generated/spouse-01.json` evidences[].subjectParty:

| evidence | name | subjectParty | 의미 |
|---|---|---|---|
| e-1 | 영수증 묶음 5장 | **b** | 이준호 사정 (조카 돌봄) |
| e-2 | 블랙박스 GPS | **b** | 이준호 동선 |
| e-3 | 통화기록 | **b** | 이준호 새벽 통화 |
| e-4 | 형 문자 스레드 | **b** | 이준호 가족 관계 (requiredLieState: S1) |
| e-5 | 이준호 출금 내역 | **both** | B 비자금 + A가 안 경위 (requiredLieState: S2) |
| e-6 | 박지연 투자방 | **a** | 박지연 송금 (requiredLieState: S2) |
| e-7 | 공동 적금 해지 | (재확인) | A 위임장 조작 의심 (e-7 requires 1 item) |

**investigationStages 3단계** (각 evidence에 정의됨):
- stage 1 (request_original) — attackVector: authenticity / 영수확인 / 기록확인 등
- stage 2 (check_metadata) — attackVector: context / 품목대조 / 동선대조 등
- stage 3 (restore_context) — attackVector: responsibility / 대상복원 / 시간패턴 등

→ 신규 entries 작성 시 `evidences[].investigationStages[].revealKey` + `partyContext.{a,b}.questionAngle` 그대로 활용.

**DossierCard 정의 위치 (검증 완료)**:
- spouse-01: `claimPolicies/spouse-01-v3-game-loop-data.json` 안 `dossierCards[]` (통합 형식)
- 카드 5장 (dc-1 ~ dc-5) × 8 question (dc-1.b.q1 / dc-2.b.q1 / dc-3.b.q1 / dc-3.b.q2 / dc-4.a.q1 / dc-4.a.q2 / dc-5.b.q1 / dc-5.a.q1)
- family-01 / friend-01은 별도 파일 (`*-dossier-cards.json`) — 파일 조직만 다름, 기능 동일
- 활성 검증: `v3GameLoopLoader.getDossierCards()` → `meterStagingV2.evaluateDossierUnlock()` → `ActionPanel.tsx:177-191` → `DossierHint.tsx:44-80` → `scriptedTextLoader.ts:447-483 getScriptedDossier()` 전체 체인 연결됨

---

## 2. 채널 인벤토리 (현재 → 보완 후)

| 채널 | 현재 keys × v = entries | 보완 후 keys × v = entries | 추가 |
|---|---|---|---|
| interrogation | 144 × 5 = 720 | **144 × 10 = 1,440** | +720 |
| evidence_present | 42 × 5 = 210 | **126 × 10 = 1,260** (stage 신설) | +1,050 |
| dossier | 8q × 3 = 24 entry... 실은 24 × 3 = 72 | **8q × 10 + 16q?** ⚠️ 결정 후술 | (후술) |
| witness | 9 × 3 = 27 | **9 × 10 = 90** | +63 |
| contradiction_pursuit | 16 × 3 = 48 | **32 × 10 = 320** (h-d3/h-d4 추가) | +272 |
| interjection | 8 × 3 = 24 | **16 × 10 = 160** (h-d3/h-d4 추가) | +136 |
| emotional_overload | 4 × 2 = 8 | **8 × 10 = 80** (h-d3/h-d4 추가) | +72 |
| trust_action | 18 × 2 = 36 | **18 × 10 = 180** | +144 |
| mediation (paths→entries) | 8 lines × 0 v = 8 | **8 × 10 = 80** | +72 |
| ~~evidence_discovery~~ | ~~12 × 1 = 12~~ | **폐기** (-12) | -12 |
| judge_question | 24 × 2 = 48 | **48 × 5 = 240** (h-d3/h-d4 추가) | +192 |
| judge_contradiction | 6 × 3 = 18 | **12 × 5 = 60** (h-d3/h-d4 추가) | +42 |
| judge_evidence_combo (신규) | 0 | **24 × 5 = 120** (8 dossier × 3 tone) | +120 |
| judge_witness_summon (신규) | 0 | **9 × 5 = 45** (3w × 3 tone) | +45 |
| system_message | 6 × 2 = 12 | **11 × 5 = 55** (5 신규 event 추가) | +43 |
| rapport_milestone (신규) | 0 | **6 × 5 = 30** (2p × 3 단계) | +30 |
| contradict_milestone (신규) | 0 | **6 × 5 = 30** (2p × 3 단계) | +30 |
| aftermath | 5 × 2 = 10 | **5 × 5 = 25** | +15 |
| **합계** | 1,253 | **≈ 4,415** | **+3,162** |

**dossier 채널 옵션 B 확정 (사용자 결정 2026-04-26)**:
- 새 키: `dossierQuestionId | lieBand` (8 × 3 = 24 cells)
- 보완: 24 × 10v = 240 entries (+216 vs 현재 24)
- lieBand 차원 신설 → 다른 채널과 일관성 (early/mid/late별 다른 NPC 응답)
- ScriptedText의 dossier entry meta에 lieBand field 추가 필요

---

## 3. entries 단위 키 패턴 매트릭스 (확정)

### 3.1 interrogation (변경 X, v 확장만)
- 키: `party | disputeId | lieState | questionType` (144 cells)
- 보완: 각 cell의 variants 풀 5 → 10
- 추가 entries: 144 × 5 = +720

### 3.2 evidence_present (stage 차원 신설, 옵션 A)
- 새 키: `party | evidenceId | lieBand | investigationStage` (2 × 7 × 3 × 3 = 126 cells)
- subjectRole은 자동 결정 (party × evidence.subjectParty)
- 보완: 126 × 10v = 1,260 entries
- 추가 entries: 1,260 - 210 = +1,050
- **stage 차원 작성 가이드**: 사건 데이터의 `investigationStages[stage].revealKey` + `partyContext.{a,b}.questionAngle` + `attackVector` 정합 유지

### 3.3 dossier (옵션 B 권장 — lieBand 신설)
- 새 키: `dossierQuestionId | lieBand` (8 × 3 = 24 cells)
- 보완: 24 × 10v = 240 entries
- 추가 entries: 240 - 24 = +216
- 단 이미 ScriptedText는 `dc-1.b.q1` 등 questionId 키 형식 사용 → lieBand 차원은 entry meta로 추가 필요

### 3.4 witness (변경 X, v 확장만)
- 키: `witnessId | depth` (9 cells)
- 보완: 9 × 10v = 90 entries
- 추가 entries: +63

### 3.5 contradiction_pursuit (h-d3/h-d4 추가 + v 확장)
- 새 키: `party | disputeId | lieState` (2 × **4d** × 4S = 32 cells)
- 보완: 32 × 10v = 320 entries
- 추가 entries: +272

### 3.6 interjection (h-d3/h-d4 추가 + v 확장)
- 새 키: `party | disputeId | severity` (2 × **4d** × 2 severity = 16 cells)
- 보완: 16 × 10v = 160 entries
- 추가 entries: +136

### 3.7 emotional_overload (h-d3/h-d4 추가 + v 확장)
- 새 키: `party | disputeId` (2 × **4d** = 8 cells)
- 보완: 8 × 10v = 80 entries
- 추가 entries: +72

### 3.8 trust_action (변경 X, v 확장만)
- 키: `party | actionType | lieState` (2 × 3 × 3 = 18 cells)
- 보완: 18 × 10v = 180 entries
- 추가 entries: +144

### 3.9 mediation (paths 형식 → entries 형식 변환 + v 확장)
- 새 키: `path | speaker` (4 × 2 = 8 cells)
- 보완: 8 × 10v = 80 entries
- 추가 entries: +72
- ⚠️ 변환 시 기존 paths 형식의 `relatedDisputes` 필드는 entry tag로 보존

### 3.10 judge_question (h-d3/h-d4 추가 + v 5)
- 새 키: `disputeId | questionType | depth` (**4d** × 3q × 4 depth = 48 cells)
- 보완: 48 × 5v = 240 entries
- 추가 entries: +192

### 3.11 judge_contradiction (h-d3/h-d4 추가 + v 5)
- 새 키: `disputeId | tone` (**4d** × 3 tone = 12 cells)
- 보완: 12 × 5v = 60 entries
- 추가 entries: +42

### 3.12 judge_evidence_combo (신규)
- 키: `dossierCardId | tone` (**8 dossier 콤보** × 3 tone = 24 cells, 사용자 결정)
- 보완: 24 × 5v = 120 entries
- 추가 entries: +120
- **작성 가이드**: 각 dossier card의 `name` + `description` + `successConditionSummary` + `successEffects` 활용
  - 예 dc-1: "오피스텔의 사람들" — "외도 서사를 가족 돌봄 서사로 뒤집는 첫 반전 카드"
  - tone soft: "이 두 기록을 합치면 그 시각, 그 장소에 누가 있었는지가 분명해집니다. 이준호 씨, 정확히 답변해 주십시오."
  - tone mid: "두 증거가 같은 방향을 가리키고 있습니다. 이준호 씨, 더 미루지 마십시오."
  - tone hard: "이 콤보가 가리키는 것은 분명합니다. 이준호 씨, 핵심을 지금 답하십시오."

### 3.13 judge_witness_summon (신규)
- 키: `witnessId | tone` (**3 witness** × 3 tone = 9 cells)
- 보완: 9 × 5v = 45 entries
- 추가 entries: +45
- **작성 가이드**: 각 증인의 hiddenAgenda + addressJudge 정합
  - w-1 오피스텔 경비 / w-2 은행 직원 / w-3 박미라 (A의 친구, pro_a 편향)

### 3.14 system_message (5 신규 event + v 5)
- 새 keys 추가:
  - `interrogation | judge_contradiction_trigger`
  - `evidence | judge_combo_trigger`
  - `witness | judge_summon_trigger`
  - `meta | rapport_milestone_trigger`
  - `meta | emotion_phase_shift_trigger`
- 보완: 11 × 5v = 55 entries
- 추가 entries: +43

### 3.15 rapport_milestone (신규)
- 키: `party | threshold` (2 × 3 = 6 cells)
- threshold: `low_to_mid (+15)`, `mid_to_high (+30)`, `high_to_open (+50)`
- 보완: 6 × 5v = 30 entries
- 추가 entries: +30

### 3.16 contradict_milestone (신규)
- 키: `party | token_count` (2 × 3 = 6 cells)
- token_count: `1`, `2`, `3+`
- 보완: 6 × 5v = 30 entries
- 추가 entries: +30

### 3.17 aftermath (변경 X, v 확장만)
- 키: `resultClass` (5 cells)
- 보완: 5 × 5v = 25 entries
- 추가 entries: +15

---

## 4. 분량 합계 (확정)

| 영역 | 추가 entries |
|---|---|
| interrogation v 확장 | +720 |
| evidence_present stage 차원 | +1,050 |
| dossier (옵션 B 확정) | +216 |
| witness v 확장 | +63 |
| contradiction_pursuit + h-d3/h-d4 | +272 |
| interjection + h-d3/h-d4 | +136 |
| emotional_overload + h-d3/h-d4 | +72 |
| trust_action v 확장 | +144 |
| mediation 변환 + v 확장 | +72 |
| evidence_discovery 폐기 | -12 |
| judge_question + h-d3/h-d4 | +192 |
| judge_contradiction + h-d3/h-d4 | +42 |
| judge_evidence_combo 신규 | +120 |
| judge_witness_summon 신규 | +45 |
| system_message 신규 event | +43 |
| rapport_milestone 신규 | +30 |
| contradict_milestone 신규 | +30 |
| aftermath v 확장 | +15 |
| **총 추가** | **+3,250 entries (옵션 B 시)** |
| 현재 1,253 → 보완 후 **≈ 4,503** | |

---

## 5. 톤 보정 우선순위 (전수, 사용자 결정 5번)

기존 1,253 entries 보정 — 메인/서브에이전트/Codex 병렬:

| 순위 | 대상 | entries | 실행 주체 |
|---|---|---|---|
| 1 | judge_contradiction 6 keys × 3v | 18 | 메인 직접 (모순 발동 핵심 톤) |
| 2 | mediation 8 paths lines | 8 | 메인 직접 (Phase 6 결정 시점) |
| 3 | system_message 6 × 2 | 12 | 메인 직접 (기계식 → narrative) |
| 4 | judge_question 24 × 2 | 48 | 메인 직접 또는 서브에이전트 (재판관 톤) |
| 5 | interrogation S3+ confession (72 keys × 5v) | 360 | 서브에이전트 병렬 (3 그룹: a/b × d-1+d-2 / h-d3+h-d4 / 전체 emotion 보강) |
| 6 | interjection 8 × 3 + emotional_overload 4 × 2 | 32 | 서브에이전트 병렬 |
| 7 | 나머지 interrogation S0~S2 (72 keys × 5v) | 360 | GPT Pro에 보정 패치 의뢰 |
| 8 | evidence_present + dossier + witness + 기타 | 415 | 신규 작성 시 통합 보정 (GPT Pro) |
| 합계 | | **1,253** | |

---

## 6. GPT Pro 의뢰 분할 (8 세션)

| 세션 | 작업 | 분량 | 입력 자료 |
|---|---|---|---|
| **S1** | interrogation v 확장 (5→10) | +720 신규 | 02-tone-guide + character-info + scripted-text-current dossier 추출 + atoms-current.json |
| **S2** | evidence_present stage 차원 신설 (1) — d-1, d-2 | +500 신규 | + evidence 정의 + investigationStages + partyContext |
| **S3** | evidence_present stage 차원 신설 (2) — h-d3, h-d4 | +550 신규 | (S2 동일) |
| **S4** | dossier 옵션 B + witness v 확장 | +279 신규 | + dossier-cards 정의 (v3-game-loop-data.json) + witnessProfile |
| **S5** | h-d3/h-d4 추가 채널 (contradiction_pursuit + interjection + emotional_overload) | +480 신규 | + game-events + game-events-v2 |
| **S6** | judge 채널 보강 (judge_question + judge_contradiction h-d3/h-d4) + judge_evidence_combo + judge_witness_summon 신규 | +399 신규 | + structure-v2 (depthLayers/linkEdges) + dossier-cards 정의 |
| **S7** | trust_action 보강 + mediation 변환 + system_message 신규 + milestone 채널 신규 | +260 신규 | + game-events transitionBeats + emotion phase 정의 |
| **S8** | aftermath v 확장 + 기존 entries 톤 보정 patch (우선순위 7~8) | +15 + 보정 patch | 전 자료 |

**총 GPT Pro 분량**: 약 +3,200 신규 entries + 보정 patch

---

## 7. 다음 단계 — 실행 진입 (확정)

1. ~~사용자 추가 결정~~ — dossier 옵션 B 확정
2. **메인 직접 보정 (우선순위 1~3, 38 entries) 즉시 착수**
3. 메인 보정 결과 → 사용자 검증 후 다음 우선순위
4. 서브에이전트 병렬 (보정 우선순위 5~6, 392 entries) 패키지 분할
5. GPT Pro 의뢰 패키지 (S1~S8, 8 세션) 입력 자료 한 번에 묶기
6. 작업 결과 → `src/data/scriptedText/spouse-01.json` patch + 빌드 검증
7. spouse-01 완료 후 → family-01 / friend-01 동일 절차 반복

---

## 8. 절대 준수 규칙 (잊지 말 것)

- 활성 3건만 (spouse-01 / family-01 / friend-01) — _LEGACY 절대 참조 X
- 보정 톤 8원칙 ([02-tone-guide.md](../02-tone-guide.md)) 일관 기준
- 9차원 맥락 정확 매핑 (위 1.절 데이터 출처 참조)
- 임의 이름/정보 작성 X (특히 형/조카는 호칭만, 박미라는 h-d3/h-d4 친구이지 오피스텔 무관)
- Agent 보고 무비판 수용 X — 메인이 데이터 직접 read 검증
- 이모지 X (어떤 entry에도)
- 글자수: 재판관 30~70자 / NPC 40~80자 / system 20~50자 (단 ±5자 편차 허용 — 의미 정확성 우선)
- 호칭 규칙: 재판관→당사자 "OOO 씨" / "부인" 단어 금지 / "아내분" "남편분" OK

## 9. 보정 작업 절차 (메인 잘못 패턴 #6 반영, 2026-04-26)

**보정 ≠ 글자수 / 표면 어휘 교체**. 보정 = **9차원 맥락-의미 정확성** 살리기.

### 점검 차원
1. 모순의 종류 — 사실 변화? 입장 변화? 인지 단계 변화?
2. NPC 캐릭터 archetype — 박지연 victim_cosplay / 이준호 avoidant 표현 무게 차이
3. lieState 단계 — S1 모순 vs S3 모순 톤 차이
4. 추궁 강도 — soft/mid/hard 외 의미의 첨예함
5. NPC 마지막 발언 맥락 — 직접 인용 X but 발언 본질 정확히 짚기
6. 인지 변화 단계 표현 — "확실 → 정황 해석 → 인정" / "오해 → 사정 → 자백"

### 사용자 보정 모범 (2026-04-26 judge_contradiction 3 patch)
- "쪽" 같은 약한 단어 → "주장" / "의견" — 인지 단계 단계적 약화 정확 반영
- "무엇을 알고 무엇을 밀어붙였습니까" → "왜 그렇게 확신하고 밀어붙였습니까" — **정보 추궁 → 동기/심리 추궁** (더 깊은 차원)
- "흐리면" → "밝히지 않으면" / "본 방식과 본 뒤의 행동" → "관련내용" — 추상 → 직접 행동 / 어색 표현 → 자연스러운 일반화

### 작업 단계
1. 해당 entry의 9차원 메타 모두 확인 (party / disputeId / lieState / questionType / tone / 발동 맥락)
2. NPC archetype 별 표현 무게 검토
3. 추궁이 무엇 차원인지 식별 (정보 / 동기 / 책임 / 인지 단계)
4. 의미 정확성 우선 — 글자수 ±5자 편차 허용
5. 단순 어휘 교체 시 의미 손상 위험 검토
6. 패치마다 사용자 검증 받기 (특히 첫 patch — 기준 잡기 위해)

### 자동화 한계 점검 (재발 방지)
- 자동 점검 (글자수/번역체/직접인용 검출) **OK = 보정 불필요 X**
- "이미 GPT Pro 산출물이라 품질 우수"로 깊은 검토 회피 X
- "신규 작성 vs 보완 혼동" 회피한답시고 보수적 무수정 패스 X
- → **9차원 맥락 차원 표현 정확성은 적극 검토** 필수

관련 메모리: [`feedback_revision_meaning_over_form.md`](../../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/feedback_revision_meaning_over_form.md)
