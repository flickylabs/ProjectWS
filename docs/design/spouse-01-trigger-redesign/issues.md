# spouse-01 trigger 영역 회귀/문제/의문 영역 (재설계 진입 전 issue 매트릭스)

> 작성일: 2026-05-26  
> 본 매트릭스 참조: [inventory.md](./inventory.md)

본 문서는 inventory 영역에서 식별된 **회귀/부적절 발동/누락/의문** 영역을 정리. 재설계 협의 시 사용자 결정 영역.

---

## Issue 1: e-1 (영수증 묶음 5장) stage 1 도달 시 e-10 / e-4 부적절 발동 — **사용자 명시 회귀**

### 증상
manual 검증 영역에서 「영수증 묶음 5장」(e-1) stage 1 도달 시점에 「발신자 미상 문자」(e-4) 또는 「출산 준비 도서」(e-10)가 부적절하게 발동된다는 보고.

### root cause 분석

#### A. e-10 cascade 영역 (e-1 → e-10)
- 영역: C-3c hook (useActionDispatch.ts line 1158~1204) + schema `e10-via-bookbaby-question-angle`
- 조건: `action.evidenceId === 'e-1'` + `action.target === 'b'` + `e1LatestStage >= 3`
- **stage 3 gate 적용 영역** — stage 1 발동 X. C-3c hook 자체는 stage 3 강제.
- 단 schema의 `e10-via-bookbaby-question-angle` 영역 precondition은 `requirePriorCardFired: 'e-1'` + `contextAction: 'evidence_present.b.e-1'`만 — **stage gate 영역 X**. hook이 schema attemptNarrativeForEvidence 영역 호출하므로 hook 영역에서 stage gate 영역 보장.
- → e-10 영역은 stage 1에서 발동 영역 X (이론상). manual 검증 회귀 보고 영역 = 다른 source?

#### B. e-4 cascade 영역 (e-3 → e-4)
- 영역: C-2 hook (useActionDispatch.ts line 1206~1252) + schema `e4-via-e3-stage2`
- 조건: `action.evidenceId === 'e-3'` + `action.target === 'b'` + `e3LatestStage >= 2`
- e-1 영역 관련 X — e-1 stage 1 영역에서 e-4 발동 source 아님.

#### C. **e-4 broad candidate 영역 — 진짜 root cause 후보**

| candidate | precondition | broad 위험 |
|---|---|---|
| `e4-via-a-interject` | OR 배열: `[{ d-1 S1+ + evidence_present.b }]` OR `[{ distrust.a≥50 + evidence_present.b }]` | ⚠️ **contextAction이 `evidence_present.b` (어떤 evidence든)** — e-1을 b에게 제시 시점에 d-1 S1+ 영역 만족 시 발동 가능 |
| `e4-via-b-interject` | `d-1 S1+` + `partyPhase.b: [defensive, shaken]` | ⚠️ **contextAction 영역 없음** — B 방어/충격 phase 도달만으로 발동. e-1 stage 1 발동 시 player 추궁 영역에서 B 방어 도달 가능 |
| `e4-via-judge-auto` | `d-1 S1+` + `turnsAfterEligible: 5` | 5턴 fallback — d-1 S1+ 도달 후 5턴이면 자동 발동 |

**결론**: e-4 broad candidate 영역이 「영수증 묶음」 stage 1 영역에서 player가 b에게 영수증 제시 → d-1 S1+ + evidence_present.b 영역 만족 → `e4-via-a-interject` 발동 가능. **e-4 broad candidate 영역이 회귀 source 영역.**

### 영향 영역
- e-4가 의도된 영역 (e-3 stage 2 → e-4 cascade)이 아닌 e-1 stage 1 영역에서 조기 발동
- player 인지: "영수증에서 발신자 미상 문자가 나오는 게 이상함"

---

## Issue 2: 유사 broad 패턴 다른 entity 영역 (전수 적용 필요)

`evidence_present.b` (어떤 evidence든) + `d-X S1+` 조합 영역의 broad precondition 영역. 동일 패턴 다른 entity 영역 매트릭스:

| candidate | precondition | broad 위험 |
|---|---|---|
| `dc3-via-a-interject` | OR: `[{ d-2 S1+ + evidence_present.b }]` OR `[{ distrust.a≥50 + evidence_present.b }]` | ⚠️ d-2 S1+ + 아무 evidence b 제시 → dc-3 발동. **e-2/e-3/e-5/e-7 등 어떤 evidence든** |
| `e5-via-a-interjection` | OR: `[{ d-1 S2+ }]` OR `[{ distrust.a≥50 }]` (contextAction **없음**) | ⚠️ d-1 S2+ 단독으로 발동. 아무 action 영역 무관 |
| `e9-via-a-interject` | OR: `[{ e-8 + distrust.a≥50 + evidence_present.b }]` OR `[{ e-8 + distrust.a≥50 + question.fact_pursuit.b }]` | e-8 fired 영역 추가 — 비교적 정밀. 단 evidence_present.b 영역 broad |

**Issue 2-1**: dc-3 의도 영역 = "이준호의 비밀 개인 계좌"가 자금 line의 dossier card. d-2 S1+ + e-1을 b에게 제시 시 발동 가능 → "영수증에서 비밀 계좌 단서가 나오는 영역" 의도 불일치.

**Issue 2-2**: e-5 의도 영역 = "박지연의 개인 계좌 출금 내역" — 이건 박지연 본인 영역. d-1 S2+ 단독 (외도 의심 진행)만으로 발동 → 외도 line 진행 중 박지연 자기 자금 영역 self-disclose? narrative 측면 의도 불일치 가능.

**Issue 2-3**: e-9 (산전우울증)는 e-8 fired 영역 전제 + evidence_present.b 영역. e-8 발동 후 어떤 evidence든 b에게 제시 → e-9 발동. e-8 영역만 전제이므로 비교적 정밀이지만 contextAction 영역 `evidence_present.b` 영역만 = e-8 영역 직접 연결 X.

---

## Issue 3: type 불일치 영역

| candidate | 명시 type | 실제 의도 | 분석 |
|---|---|---|---|
| `e9-via-b-submit` | `npc_interjection` | `emotional_outburst` 추정 | `partyPhase.b: [defensive, shaken]` 영역 — defensive는 outburst 영역과 부정합. 다른 source: b 발화 영역은 모두 emotional_outburst (e-6 / e-8 / dc-8 / hd4 / w-1 / dc-2 / dc-4). 단 e-6/dc-7/w-2/w-3 영역 b 발화 = npc_interjection. |
| `dc7-via-b-interject` | `npc_interjection` | (확인 필요) | partyPhase: [defensive, confident, shaken, angry] — npc_interjection 영역 OK인지 |
| `e-6/dc-7/w-2/w-3 b-interject` 일관성 영역 | `npc_interjection` | (확인 필요) | 같은 b source 발화이지만 일부는 emotional_outburst, 일부는 npc_interjection. **분기 기준 영역 명확화 필요** |

**분기 기준 의문**:
- `npc_interjection` = NPC가 추궁 도중 끼어드는 영역 (선제 발화) — emotional 압박 X
- `emotional_outburst` = 감정 폭발로 인한 발화 (shaken/angry/resigned partyPhase 필수) — emotional 압박 O
- 같은 entity에 두 type 영역 중복 부착 시 candidate 분기 기준 영역 명확화 필요

---

## Issue 4: 누락 영역 — e-1 / e-2 / e-3 narrative trigger 미부착

`evidence` 영역 첫 등장 시점에 narrative wrapper 영역이 없음:

| entity | 첫 등장 메커니즘 | narrative wrapper |
|---|---|---|
| e-1 | initial discover (player가 게임 시작 시 보유) | **없음** |
| e-2 | initial discover (게임 시작 시 보유) | **없음** |
| e-3 | initial discover (게임 시작 시 보유) | **없음** |
| e-4 | e-3 stage 2 → cascade (C-2 hook) | 4 candidate |
| e-5 | (확인 필요) initial 또는 discover? | 4 candidate (inline) |
| e-6 | dc-7 cascade | 4 candidate |
| e-7 | dc-3 cascade | 4 candidate |
| e-8 | dc-3 + d-2 S5+ cascade | 4 candidate |
| e-9 | e-8 cascade | 4 candidate |
| e-10 | e-1 stage 3 → cascade (C-3c hook) | 1 candidate (inline) |

**의문**: e-1/e-2/e-3 영역은 사건 시작 시점에 player에게 자동 부여되는 영역인가? 또는 초기 chapter 영역에서 부여되는 영역인가? narrative wrapper 영역 영역 부착이 필요한 영역인가?

**사용자 영역 의도 확인 필요**:
- 옵션 A: 초기 부여 영역 — narrative wrapper 불필요 (player가 직접 탐색)
- 옵션 B: 초기 부여 영역인데 narrative wrapper 영역 부착 (탐색 trigger surface 영역)
- 옵션 C: emergence trigger 영역 — 첫 등장 시점 narrative event 영역 필요

---

## Issue 5: dc-3 ↔ e-8 chain 영역의 frame 충돌

비자금 진실 chain (Chain 4): `dc-3 → e-8 → e-9 → dc-8 → h-d4`

- dc-3 = "이준호의 비밀 개인 계좌" (자금 line dossier)
- e-8 = "주차 영수증 (헤라 여성 메디컬 센터)" (산부인과 단서)

dc-3 영역에서 e-8 cascade 영역 의도 = "비밀 계좌 단서 인지 후 → 같은 시기 산부인과 영역 단서 (e-8) 등장". 단:
- dc-3은 자금 line (위임장 조작 line)에 속함
- e-8은 비자금 진실 line (h-d4 line)에 속함
- **dc-3 fire 영역 후 e-8 cascade 영역은 d-2 S5+ 전제** — 즉 d-2 비자금 사용처 자백 후만 가능

frame 정합성:
- d-2 S5+ 영역에서 e-8 cascade → "비자금 사용처 자백 후 산부인과 영역 단서 등장" frame
- d-2 S5+ 시점에서는 이미 비자금 = 형 영역이 surface인 상태. e-8 (산부인과) 영역은 외도 line frame 강화 영역 (d-3) — frame 충돌 가능성

---

## Issue 6: 진입 path 이중성 영역 — h-d4 surface

h-d4 surface 영역 2 path:

| path | trigger | precondition |
|---|---|---|
| A. 비자금 chain | `hd4-via-cascade` | `requirePriorCardFired: dc-8` + `d-2 S5+` |
| B. 비자금 chain | `hd4-via-b-outburst` / `hd4-via-a-confront` | `dc-8 fired` + partyPhase 영역 |
| C. 비자금 chain | `hd4-via-judge-auto` | `dc-8 fired` + `turnsAfterEligible: 5` |
| **D. misdirection path** | (없음 — schema 영역) | d-3 S5 `successUnlocks: ['h-d4']` (truthStages 영역) |

→ h-d4 영역이 **dc-8 영역 또는 d-3 S5 영역 어느 하나라도 만족 시** unlock 가능. 사용자 보기 어느 path가 우선/자연인지 영역 결정 필요.

**path A/B/C 영역 (비자금 chain)** = e-8/e-9/dc-8 사슬 거친 진입.  
**path D 영역 (misdirection 무너짐)** = e-10 (출산 준비 도서) → d-3 dual emergence → d-3 추궁 → S5 → h-d4. 이 path 영역은 schema narrative trigger 영역과 별도로 `truthStages.successUnlocks` 영역이 처리. **runtime 발동 시 narrative event 영역 없이 즉시 unlock 가능** — 자연성 영역 검토 필요.

---

## Issue 7: judge_auto fallback 영역 turnsAfterEligible 차등 영역

모든 entity의 `*-via-judge-auto` 영역 turnsAfterEligible 분포:

| entity | turnsAfterEligible | dispute 영역 |
|---|---|---|
| e-4 | 5 | d-1 S1+ |
| dc-1 | 4 | d-1 S2+ |
| w-1 | 4 | d-1 S3+ |
| dc-2 | 4 | d-1 S3+ |
| e-5 | 5 | (없음) |
| dc-3 | 5 | (없음) |
| e-7 | 3 | h-d3 S2+ |
| dc-7 | 4 | (없음, 단 priorCard) |
| e-6 | 3 | (없음, 단 priorCard) |
| dc-4 | 3 | (없음, 단 priorCard) |
| w-3 | 4 | h-d3 S3+ |
| h-d3 | 4 | d-2 S4+ |
| w-2 (h-d3) | 2 | (없음, 단 priorCard) |
| e-8 | 5 | d-2 S5+ |
| e-9 | 3 | (없음, 단 priorCard) |
| dc-8 | 4 | (없음, 단 priorCard) |
| h-d4 | 5 | (없음, 단 priorCard) |

**의문**:
- 일관성 영역 — 일부 entity는 dispute 영역 추가, 일부는 priorCard만. 정합성 영역 정책 영역 결정 필요
- turnsAfterEligible 값 영역 차등 영역 의미 (2/3/4/5)의 기준 영역 명확화 필요
- judge_auto 영역 fallback 영역의 정책 = "정합성 영역 게이트 통과 후 N턴 동안 trigger 영역 발동 X 시 자동 발동". player가 다른 영역 진행 중에도 fallback fire 영역 자연 영역인지 확인 필요

---

## Issue 8: dc-2 cross-line 영역 정합 영역

dc-2 = "시댁 얘기만 나오면 싸움" — proves 영역은 외도 line (d-1) + 자금 line (d-2) cross-line.

- `dc2-via-combo` (combine-6) — d-1 S2+
- `dc2-via-cascade` — `requirePriorCardFired: dc-1` + d-1 S2+
- `dc2-via-b-outburst` — `requirePriorCardFired: dc-1` + partyPhase.b + `contextAction: question.motive_search.b`
- `dc2-via-judge-auto` — `requirePriorCardFired: dc-1` + d-1 S3+

**모두 d-1 (외도 line) 영역만 의존** — d-2 영역 cross-line 영역인데 d-2 영역 진행 시 dc-2 영역 발동 없는 영역. 사용자 의도?

---

## 종합 — 재설계 결정 영역

본 thread 재설계 시 사용자 결정 필요 영역:

1. **e-4 broad candidate 영역 정밀화 vs 폐기** (Issue 1)
2. **유사 broad 패턴 (dc-3 / e-5 / e-9) 일괄 정밀화 vs 영역 유지** (Issue 2)
3. **e-9-via-b-submit type 정정** (Issue 3)
4. **e-1/e-2/e-3 narrative wrapper 영역 부착 여부** (Issue 4)
5. **dc-3 → e-8 frame 충돌 영역 정합 영역** (Issue 5)
6. **h-d4 진입 path 우선순위** (Issue 6)
7. **judge_auto fallback 영역 정책 일관성 영역** (Issue 7)
8. **dc-2 cross-line 영역 d-2 영역 진입 영역 추가** (Issue 8)

추가 영역:
- **사건 흐름 영역 정합** — Chain 1 (외도 의심) ↔ Chain 5 (misdirection ↔ 진실 전환) 영역 연결 자연 영역. e-1 (영수증) stage 3 → e-10 (출산 준비 도서) 영역의 자연성 영역 검토.
- **재설계 영역 schema 영역 적용 vs 추가 Hybrid hook 영역 확대 영역**
