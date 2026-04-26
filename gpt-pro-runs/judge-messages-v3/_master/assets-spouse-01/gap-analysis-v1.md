# spouse-01 ScriptedText 보완 영역 매핑 v1

> **출처**: 메인이 `src/data/scriptedText/spouse-01.json` (2,049,576 bytes) 직접 read + 분석
> **분석 스크립트**: `tmp/analyze-spouse-01-scripted.cjs`, `tmp/analyze-spouse-01-scripted-2.cjs`
> **목적**: v3 작업 = "신규 작성 X, 기존 보완". 부족 영역을 entries 단위로 정밀 매핑

---

## 0. 인수인계 vs 실제 정정

| 항목 | 인수인계 | 실제 |
|---|---|---|
| 채널 수 | 6 | **14 + 1 빈 mediation = 15** |
| 총 entries | 1,051 | **1,245 + mediation 8 라인 = 1,253** |
| 누락이라던 채널 | judge_question / judge_contradiction | **이미 존재** (단 분량 부족) |

**누락이라던 인수인계 #4, #5는 부정확**. 실제로는 채널은 있으나:
- 분량 부족 (judge_q 24 keys × 2v = 48만)
- h-d3, h-d4 disputes 누락 (다음 절 참조)
- judge_evidence_combo / judge_witness_summon 등 일부 누락

---

## 1. 채널 인벤토리 (실측)

| 채널 | keys | v/key | entries | 차원 |
|---|---|---|---|---|
| interrogation | 144 | 5 | 720 | 2p × 4d × 6S × 3q (완전) |
| evidence_present | 42 | 5 | 210 | 2p × 7e × 3lieBand |
| dossier | 24 | 3 | 72 | 8q × 3lieBand |
| witness | 9 | 3 | 27 | 3w × 3 depth |
| aftermath | 5 | 2 | 10 | 5 resultClass |
| system_message | 6 | 2 | 12 | 6 event |
| **contradiction_pursuit** | 16 | 3 | 48 | 2p × **2d** × 4S(S1~S4) |
| **interjection** | 8 | 3 | 24 | 2p × **2d** × 2 severity |
| **emotional_overload** | 4 | 2 | 8 | 2p × **2d** |
| **evidence_discovery** | 12 | **1** | 12 | 2p × **3 evi(e-1/3/5)** × 4 step |
| **trust_action** | 18 | 2 | 36 | 2p × 3 actionType × 3S(S1~S3) |
| mediation (paths 형식) | 4 paths | 단일 | 8 lines | 4 paths × 2 speakers, **variants 없음** |
| **judge_question** | 24 | 2 | 48 | **2d** × 3q × 4 depth |
| **judge_contradiction** | 6 | 3 | 18 | **2d** × 3 tone |
| 합계 | 318 | — | **1,253** | — |

★ 굵은 차원이 누락 차원

---

## 2. 9차원 맥락 매핑 — 차원별 커버리지 (interrogation 기준)

| 차원 | 매핑 위치 | 종 | 결론 |
|---|---|---|---|
| 쟁점 | `disputeId` (entry meta) | 4 (d-1, d-2, h-d3, h-d4) | OK |
| 캐릭터 | `party` (entry meta) | 2 | OK |
| lieState | `lieState` (entry meta) | 6 (S0~S5) | OK |
| q_type | `questionType` (entry meta) | 3 | OK |
| emotion | `emotion:*` tag (variants 내) | 6 (cautious/measured/shaken/resigned/guarded/defensive) | **차원 분리 X** — variants 사이에서만 변동, key 단위 emotion 구분 X |
| reveal | `reveal:*` + `disclosure:*` + `revealGuard:*` tags | reveal:4종 / discl:3 / guard:3 | OK (Truth Throttle 제어) |
| continuity | `continuity:*` tag | 6 (opening_guard / opening_pressure / partial_slip / counter_blame / surface / confession_pivot) | OK |
| rapport | — | **0** | **부재** (5가지 부족 #3) |
| contradict_token | — | **0** | **부재** (5가지 부족 #3, #5) |
| investigationStage | — | **0** | **부재** (5가지 부족 #2) |
| tone | — | **0** | **부재** (judge_contradiction에만 tone 있음) |
| 시점 (tense) | `tense:*` tag | 1종 (present만) | 유의 X |
| address | `address:*` tag | 1종 (toJudge만) | OK (interrogation은 재판관 대상) |

---

## 3. 인수인계 5가지 부족 영역 — 실제 매핑

### #1 캐릭터 메시지 alt 부족 (variantsPerKey 5 → 8~10)

| 채널 | 현재 v/key | 목표 v/key | 추가 entries |
|---|---|---|---|
| interrogation | 5 | 8 | 144 × 3 = **+432** |
| evidence_present | 5 | 8 | 42 × 3 = **+126** |
| dossier | 3 | 5 | 24 × 2 = **+48** |
| witness | 3 | 5 | 9 × 2 = **+18** |
| evidence_discovery | 1 | 3 | 12 × 2 = **+24** |
| **소계** | | | **+648 entries** |

→ 9차원 맥락 정확 매핑 후 작성 (같은 key 내에서도 emotion 변동/continuity sub-state 구분)

### #2 investigationStages (0/1/2) 미반영

evidence_present 차원에 stage 없음. evidence_discovery는 step(probe/slip/capture/confirm) 있으나 e-1/3/5만.

**선택지**:
- 옵션 A: evidence_present에 stage 차원 추가 (lieBand 유지) → 2p × 7e × 3lb × **3stage** = 126 cells × 5v = **630 entries 신규** (큰 분량)
- 옵션 B: evidence_discovery 채널 확장 (4 evi 추가 + variants 1→3) → 2p × 7e × 4 step × 3v = 168 entries (현재 12 → +156). **권장**
- 옵션 C: 신규 채널 `evidence_investigation` (2p × 7e × 3stage × 3v) = +126 entries

→ **권장**: 옵션 B (기존 채널 확장 = 보완 정신과 일치). evidence_discovery를 `2p × 7e × 4step × 3v = 168 entries`로 확장 → **+156 entries**

### #3 쟁점/감정 단계/신뢰 상태별 메시지 차이 X

| 차원 | 현재 | 보완 |
|---|---|---|
| emotion | tag만 (key 차원 X) | 기존 entries variants 사이에서 emotion 다양화 (#1 작업과 결합) |
| rapport (신뢰 게이지) | **부재** | trust_action 채널이 부분 대응. 추가: interrogation entries에 `rapport:*` tag 추가 + rapport 임계점별 변형 (rapport_milestone 신규 채널 검토) |
| contradict_token (모순 누적) | **부재** | contradiction_pursuit 채널이 부분 대응. 추가: 기존 entries에 `contradict_token:*` tag 추가 + token 임계점별 변형 |

**최소 보완**: 기존 720 interrogation entries에 rapport/contradict_token tag 추가 (**메인 작업 가능**, GPT Pro 의뢰 X)
**적극 보완**: rapport_milestone (3 단계 × 2p × 3v = +18) + contradict_milestone (3 단계 × 2p × 3v = +18) → **+36 entries**

### #4 재판관 메시지 누락

judge_question 24 keys = **2d × 3q × 4 depth** → **h-d3, h-d4 누락** (interrogation에는 4 dispute 다 있음)

| 부족 | 분량 |
|---|---|
| judge_question 4 disputes 완성 | 2 추가 dispute × 3q × 4depth × 2v = **+48 entries** |
| judge_question depth 5 (final 추궁) 추가 검토 | 4d × 3q × 1depth × 2v = +24 entries (옵션) |

→ **최소 +48 entries** (h-d3/h-d4 보완)

### #5 모순/이벤트 발동 시 기계식

기존 채널 보강 + 신규 채널:

| 채널 | 현재 | 보완 |
|---|---|---|
| judge_contradiction | 6 keys (2d × 3 tone × 3v) | h-d3/h-d4 추가 → **+18 entries** |
| contradiction_pursuit | 16 keys (2p × 2d × 4S) | h-d3/h-d4 추가 → 2p × 2d × 4S × 3v = **+48 entries** |
| interjection | 8 keys (2p × 2d × 2 severity) | h-d3/h-d4 추가 → **+24 entries** |
| emotional_overload | 4 keys (2p × 2d) | h-d3/h-d4 추가 → 2p × 2d × 2v = **+8 entries** |
| **judge_evidence_combo (신규)** | **부재** | spouse-01 dossier 8장 기준 콤보 트리거 → 8 cells × 3 tone × 3v = **+72 entries** (또는 축소 검토) |
| **judge_witness_summon (신규)** | **부재** | 3 witness × 3 depth × 3v = **+27 entries** |
| system_message 추가 이벤트 | 6 keys × 2v | judge_contradiction_trigger / judge_combo_trigger / judge_witness_summon_trigger 추가 → 3 새 event × 2v = **+6 entries** |

소계: **+203 entries**

### + mediation 보완 (인수인계 누락이지만 발견)

mediation paths 형식 → variants 없음. Phase 6 중재 단계 다양성 부재.

| 항목 | 현재 | 보완 |
|---|---|---|
| 4 paths × 2 speakers × 1 line | 8 lines | 각 라인 v 3개로 → 8 × 3 = **24 lines** (+16) |

소계: **+16 entries**

---

## 4. 총 보완 분량 (보수적 합산)

| 영역 | 추가 entries | 비중 |
|---|---|---|
| #1 alt 부족 | +648 | 65% |
| #2 evidence_discovery 확장 | +156 | 16% |
| #3 rapport/contradict 신설 | +36 | 4% |
| #4 judge_question h-d3/h-d4 | +48 | 5% |
| #5 모순/이벤트 신규 + 보강 | +203 | 20% |
| mediation variants | +16 | 2% |
| **총 보완** | **+1,107 entries** | — |
| (현재 1,253 → 보완 후 ≈2,360) | | |

**기존 entries 보정 (텍스트 자체 톤 보정 8원칙 적용)**: 별도 작업.
- 톤 보정 8원칙은 신규 작성 + 기존 보정 모두에 적용
- 1,253 entries 전수 보정은 GPT Pro로도 부담 → 우선순위: 가장 보일 채널부터 (interrogation S3+ confession 줄기, judge_contradiction 등)

---

## 5. GPT Pro 의뢰 권장 분할 (사건당 2~3 세션 목표)

### 세션 1: variants 풀 확장 + 톤 보정 (최대 부피)
- interrogation 144 keys × 변형 +3 = +432
- 기존 720 entries 톤 보정 (선별)
- 산출물: ~432 신규 entries + 보정 patch

### 세션 2: 누락 disputes (h-d3/h-d4) + investigation 확장
- judge_question 2d 추가 = +48
- judge_contradiction 2d 추가 = +18
- contradiction_pursuit / interjection / emotional_overload 2d 추가 = +80
- evidence_discovery 4 evi 확장 = +156
- 산출물: ~302 신규 entries

### 세션 3: 신규 채널 + tag 보강 + mediation
- judge_evidence_combo / judge_witness_summon = +99
- rapport / contradict_milestone = +36
- mediation variants = +16
- system_message 새 event = +6
- 기존 entries에 rapport/contradict_token tag 추가 patch
- 산출물: ~157 신규 entries + tag patch

---

## 6. 다음 작업 — 보완 명세 (entries 단위) 작성 시 결정 사항

1. v/key 목표값 (5 → 8 vs 5 → 10)
2. evidence stage 옵션 (A vs B vs C — 권장 B)
3. rapport / contradict_token 차원 (tag만 vs 신규 milestone 채널)
4. judge_evidence_combo 분량 (8 dossier × 3 tone vs 축소)
5. 톤 보정 우선순위 (어느 채널부터)

위 5개 결정 후 entries 단위 보완 명세 작성 → GPT Pro 의뢰 패키지 분할.
