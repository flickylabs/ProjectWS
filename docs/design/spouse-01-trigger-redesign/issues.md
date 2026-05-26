# spouse-01 trigger 회귀·문제·의문 매트릭스 (재설계 진입 전)

> 작성일: 2026-05-26 (보강: 한글 명칭 병기 + 텍스트 정리)
> 매트릭스 본체: [inventory.md](./inventory.md)

본 문서는 inventory에서 식별된 **회귀·부적절 발동·누락·의문**을 정리한다. 재설계 협의 시 사용자 결정 사안.

---

## Issue 1: 「영수증 묶음 5장」(e-1) stage 1 도달 시 「발신자 미상 문자」(e-4) 또는 「출산 준비 도서」(e-10) 부적절 발동 — **사용자 명시 회귀**

### 증상
manual 검증에서 「영수증 묶음 5장」(e-1) stage 1 도달 시점에 「발신자 미상 문자」(e-4) 또는 「출산 준비 도서」(e-10)가 부적절하게 발동된다는 보고.

### root cause 분석

#### A. 「출산 준비 도서」(e-10) cascade 경로 (e-1 → e-10)
- 위치: C-3c hook (useActionDispatch.ts line 1158~1204) + schema `e10-via-bookbaby-question-angle`
- 조건: `action.evidenceId === 'e-1'` + `action.target === 'b'` + `e1LatestStage >= 3`
- **stage 3 gate 적용됨** — stage 1에서는 발동 안 함. C-3c hook 자체가 stage 3을 강제.
- 단 schema의 `e10-via-bookbaby-question-angle` precondition은 `requirePriorCardFired: 'e-1'` + `contextAction: 'evidence_present.b.e-1'`만 있고 **stage gate 없음**. hook이 schema attemptNarrativeForEvidence를 호출하므로 hook이 stage gate를 보장.
- → 「출산 준비 도서」(e-10)는 stage 1에서 발동 안 함 (이론상). manual 검증 회귀 보고는 다른 source일 가능성.

#### B. 「발신자 미상 문자」(e-4) cascade 경로 (e-3 → e-4)
- 위치: C-2 hook (useActionDispatch.ts line 1206~1252) + schema `e4-via-e3-stage2`
- 조건: `action.evidenceId === 'e-3'` + `action.target === 'b'` + `e3LatestStage >= 2`
- 「영수증 묶음 5장」(e-1)과 무관 — 「영수증 묶음」 stage 1에서 「발신자 미상 문자」(e-4) 발동의 source가 아님.

#### C. **「발신자 미상 문자」(e-4) broad candidate — 진짜 root cause 후보**

| candidate | precondition | broad 위험 |
|---|---|---|
| `e4-via-a-interject` | OR 배열: `[{ d-1 S1+ + evidence_present.b }]` OR `[{ distrust.a≥50 + evidence_present.b }]` | ⚠️ **contextAction이 `evidence_present.b` (어떤 evidence든)** — 「영수증 묶음」을 b에게 제시한 시점에 외도 의심(d-1) S1+ 만족 시 발동 가능 |
| `e4-via-b-interject` | `d-1 S1+` + `partyPhase.b: [defensive, shaken]` | ⚠️ **contextAction 없음** — B의 방어·충격 phase 도달만으로 발동. 「영수증 묶음」 stage 1 발동 시 player 추궁에서 B 방어 도달 가능 |
| `e4-via-judge-auto` | `d-1 S1+` + `turnsAfterEligible: 5` | 5턴 fallback — 외도 의심(d-1) S1+ 도달 후 5턴이면 자동 발동 |

**결론**: 「발신자 미상 문자」(e-4)의 broad candidate가 「영수증 묶음」 stage 1에서 player가 b에게 영수증을 제시 → d-1 S1+ + evidence_present.b 만족 → `e4-via-a-interject` 발동 가능. **이게 회귀 원인.**

### 영향
- 「발신자 미상 문자」(e-4)가 의도된 경로 (「통화기록」 stage 2 → cascade)가 아닌 「영수증 묶음」 stage 1에서 조기 발동
- player 인지: "영수증에서 발신자 미상 문자가 나오는 게 이상함"

---

## Issue 2: 유사 broad 패턴 (다른 entity)

`evidence_present.b` (어떤 evidence든) + `d-X S1+` 조합의 broad precondition. 동일 패턴:

| candidate (entity) | precondition | broad 위험 |
|---|---|---|
| `dc3-via-a-interject` (「이준호의 비밀 개인 계좌」) | OR: `[{ d-2 S1+ + evidence_present.b }]` OR `[{ distrust.a≥50 + evidence_present.b }]` | ⚠️ 비자금 사용처(d-2) S1+ + 아무 evidence b 제시 → 발동. **「블랙박스 GPS」/「통화기록」/「개인 계좌 출금 내역」/「공동 적금 해지 서류」 등 어떤 evidence든** |
| `e5-via-a-interjection` (「개인 계좌 출금 내역」) | OR: `[{ d-1 S2+ }]` OR `[{ distrust.a≥50 }]` (contextAction **없음**) | ⚠️ 외도 의심(d-1) S2+ 단독으로 발동. 어떤 action이든 무관 |
| `e9-via-a-interject` (「산전우울증 자가진단」) | OR: `[{ e-8 fired + distrust.a≥50 + evidence_present.b }]` OR `[{ e-8 fired + distrust.a≥50 + question.fact_pursuit.b }]` | 「주차 영수증」(e-8) fired 추가 — 비교적 정밀. 단 evidence_present.b가 broad |

**Issue 2-1**: 「이준호의 비밀 개인 계좌」(dc-3) 의도 = 자금 line의 단서. 비자금 사용처(d-2) S1+ + 「영수증 묶음」을 b에게 제시 시 발동 가능 → "영수증에서 비밀 계좌 단서가 나오는" 의도 불일치.

**Issue 2-2**: 「개인 계좌 출금 내역」(e-5) 의도 = 박지연 본인 계좌. 외도 의심(d-1) S2+ 단독 (외도 line 진행 중)만으로 발동 → 외도 line 진행 중 박지연 자기 자금을 self-disclose? narrative 측면 의도 불일치 가능.

**Issue 2-3**: 「산전우울증 자가진단」(e-9)은 「주차 영수증」(e-8) fired 전제 + evidence_present.b. 「주차 영수증」 발동 후 어떤 evidence든 b에게 제시 → 발동. 「주차 영수증」 자체만 전제이므로 비교적 정밀이지만 contextAction이 `evidence_present.b`만이라 「주차 영수증」 직접 연결은 X.

---

## Issue 3: type 불일치

| candidate | 명시 type | 실제 의도 | 분석 |
|---|---|---|---|
| `e9-via-b-submit` (「산전우울증」) | `npc_interjection` | `emotional_outburst` 추정 | `partyPhase.b: [defensive, shaken]` — defensive는 outburst와 부정합. 다른 곳: b 발화가 모두 emotional_outburst (「투자방 텔레그램」(e-6) / 「주차 영수증」(e-8) / 「이준호의 또 다른 침묵」(dc-8) / 「난임 치료비 진실」(h-d4) / 「오피스텔 경비」(w-1) / 「시댁 얘기만 나오면 싸움」(dc-2) / 「돌이키고 싶은 2,000만 원」(dc-4)). 단 「투자방 텔레그램」(e-6) / 「공동 적금 2,000만 원의 해지」(dc-7) / 「은행 직원」(w-2) / 「박미라」(w-3) 의 b 발화 = npc_interjection. |
| `dc7-via-b-interject` (「공동 적금 2,000만 원의 해지」) | `npc_interjection` | (확인 필요) | partyPhase: [defensive, confident, shaken, angry] — npc_interjection 이 맞는지 |
| `e-6/dc-7/w-2/w-3 의 b-interject` 일관성 | `npc_interjection` | (확인 필요) | 같은 b source 발화이지만 일부는 emotional_outburst, 일부는 npc_interjection. **분기 기준 명확화 필요** |

**분기 기준 의문**:
- `npc_interjection` = NPC가 추궁 도중 끼어드는 선제 발화 — emotional 압박 X
- `emotional_outburst` = 감정 폭발로 인한 발화 (shaken / angry / resigned partyPhase 필수) — emotional 압박 O
- 같은 entity에 두 type 중복 부착 시 candidate 분기 기준을 명확화해야 함

---

## Issue 4: 누락 — 「영수증 묶음 5장」 / 「블랙박스 GPS 기록」 / 「통화기록」 narrative trigger 미부착

`evidence` 첫 등장 시점에 narrative wrapper가 없음:

| entity | 첫 등장 메커니즘 | narrative wrapper |
|---|---|---|
| 「영수증 묶음 5장」(e-1) | initial discover (게임 시작 시 보유) | **없음** |
| 「블랙박스 GPS 기록」(e-2) | initial discover (게임 시작 시 보유) | **없음** |
| 「통화기록」(e-3) | initial discover (게임 시작 시 보유) | **없음** |
| 「발신자 미상 문자」(e-4) | 「통화기록」 stage 2 → cascade (C-2 hook) | 4 candidate |
| 「개인 계좌 출금 내역」(e-5) | (확인 필요) initial 또는 discover? | 4 candidate (inline) |
| 「투자방 텔레그램」(e-6) | 「공동 적금 2,000만 원의 해지」 cascade | 4 candidate |
| 「공동 적금 해지 서류」(e-7) | 「이준호의 비밀 개인 계좌」 cascade | 4 candidate |
| 「주차 영수증」(e-8) | 「이준호의 비밀 개인 계좌」 + 비자금 사용처(d-2) S5+ cascade | 4 candidate |
| 「산전우울증 자가진단」(e-9) | 「주차 영수증」 cascade | 4 candidate |
| 「출산 준비 도서」(e-10) | 「영수증 묶음」 stage 3 → cascade (C-3c hook) | 1 candidate (inline) |

**의문**: 「영수증 묶음」/「블랙박스 GPS」/「통화기록」은 사건 시작 시점에 player에게 자동 부여되는가? 초기 chapter에서 부여되는가? narrative wrapper 부착이 필요한가?

**사용자 의도 확인 필요**:
- 옵션 A: 초기 부여 — narrative wrapper 불필요 (player가 직접 탐색)
- 옵션 B: 초기 부여이지만 narrative wrapper 부착 (탐색 trigger surface)
- 옵션 C: emergence trigger — 첫 등장 시 narrative event 필요

---

## Issue 5: 「이준호의 비밀 개인 계좌」(dc-3) ↔ 「주차 영수증」(e-8) chain 의 frame 충돌

비자금 진실 chain (Chain 4): `dc-3 → e-8 → e-9 → dc-8 → h-d4`

- 「이준호의 비밀 개인 계좌」(dc-3) = 자금 line 단서
- 「주차 영수증」(e-8) = 산부인과 단서 (헤라 여성 메디컬 센터)

「이준호의 비밀 개인 계좌」에서 「주차 영수증」 cascade 의도 = "비밀 계좌 단서 인지 후 → 같은 시기 산부인과 단서(e-8) 등장". 단:
- 「이준호의 비밀 개인 계좌」(dc-3)는 자금 line (위임장 조작 line)에 속함
- 「주차 영수증」(e-8)은 비자금 진실 line (난임 치료비 진실 h-d4 line)에 속함
- **dc-3 fire 후 e-8 cascade 는 비자금 사용처(d-2) S5+ 전제** — 즉 비자금 사용처 자백 후만 가능

frame 정합성:
- 비자금 사용처(d-2) S5+ 에서 「주차 영수증」(e-8) cascade → "비자금 사용처 자백 후 산부인과 단서 등장" frame
- 비자금 사용처(d-2) S5+ 시점에는 이미 비자금 = 형 사정이 surface 인 상태. 「주차 영수증」(산부인과)은 외도 line frame 강화 (「내연녀 임신 의심」(d-3)) — frame 충돌 가능성

---

## Issue 6: 진입 path 이중성 — 「난임 치료비 진실」(h-d4) surface

「난임 치료비 진실」(h-d4) surface 2 path:

| path | trigger | precondition |
|---|---|---|
| A. 비자금 chain | `hd4-via-cascade` | `requirePriorCardFired: dc-8` + `d-2 S5+` |
| B. 비자금 chain | `hd4-via-b-outburst` / `hd4-via-a-confront` | `dc-8 fired` + partyPhase |
| C. 비자금 chain | `hd4-via-judge-auto` | `dc-8 fired` + `turnsAfterEligible: 5` |
| **D. misdirection path** | (없음 — schema 외) | 「내연녀 임신 의심」(d-3) S5 `successUnlocks: ['h-d4']` (truthStages) |

→ 「난임 치료비 진실」(h-d4)이 **「이준호의 또 다른 침묵」(dc-8) 또는 「내연녀 임신 의심」(d-3) S5 중 하나라도 만족 시** unlock 가능. 사용자 보기 어느 path가 우선·자연인지 결정 필요.

**path A/B/C (비자금 chain)** = e-8 → e-9 → dc-8 사슬 거친 진입.
**path D (misdirection 무너짐)** = 「출산 준비 도서」(e-10) → 「내연녀 임신 의심」(d-3) dual emergence → d-3 추궁 → S5 → h-d4. 이 path 는 schema narrative trigger 와 별도로 `truthStages.successUnlocks` 가 처리. **runtime 발동 시 narrative event 없이 즉시 unlock 가능** — 자연성 검토 필요.

---

## Issue 7: judge_auto fallback turnsAfterEligible 차등

모든 entity 의 `*-via-judge-auto` turnsAfterEligible 분포:

| entity | turnsAfterEligible | dispute |
|---|---|---|
| 「발신자 미상 문자」(e-4) | 5 | 외도 의심(d-1) S1+ |
| 「오피스텔의 사람들」(dc-1) | 4 | 외도 의심(d-1) S2+ |
| 「오피스텔 경비」(w-1) | 4 | 외도 의심(d-1) S3+ |
| 「시댁 얘기만 나오면 싸움」(dc-2) | 4 | 외도 의심(d-1) S3+ |
| 「개인 계좌 출금 내역」(e-5) | 5 | (없음) |
| 「이준호의 비밀 개인 계좌」(dc-3) | 5 | (없음) |
| 「공동 적금 해지 서류」(e-7) | 3 | 위임장 조작(h-d3) S2+ |
| 「공동 적금 2,000만 원의 해지」(dc-7) | 4 | (없음, 단 priorCard) |
| 「투자방 텔레그램」(e-6) | 3 | (없음, 단 priorCard) |
| 「돌이키고 싶은 2,000만 원」(dc-4) | 3 | (없음, 단 priorCard) |
| 「박미라」(w-3) | 4 | 위임장 조작(h-d3) S3+ |
| 위임장 조작(h-d3) | 4 | 비자금 사용처(d-2) S4+ |
| 「은행 직원」(w-2, h-d3 분기) | 2 | (없음, 단 priorCard) |
| 「주차 영수증」(e-8) | 5 | 비자금 사용처(d-2) S5+ |
| 「산전우울증 자가진단」(e-9) | 3 | (없음, 단 priorCard) |
| 「이준호의 또 다른 침묵」(dc-8) | 4 | (없음, 단 priorCard) |
| 「난임 치료비 진실」(h-d4) | 5 | (없음, 단 priorCard) |

**의문**:
- 일관성 — 일부 entity 는 dispute 추가, 일부는 priorCard 만. 정합성 정책 결정 필요
- turnsAfterEligible 값 차등(2/3/4/5) 기준 명확화 필요
- judge_auto fallback 정책 = "게이트 통과 후 N턴 동안 trigger 발동 X 시 자동 발동". player 가 다른 곳 진행 중에도 fallback fire 가 자연인지 확인 필요

---

## Issue 8: 「시댁 얘기만 나오면 싸움」(dc-2) cross-line 정합

「시댁 얘기만 나오면 싸움」(dc-2) = proves: 외도 line (d-1) + 자금 line (d-2) cross-line.

- `dc2-via-combo` (combine-6) — d-1 S2+
- `dc2-via-cascade` — `requirePriorCardFired: dc-1` + d-1 S2+
- `dc2-via-b-outburst` — `requirePriorCardFired: dc-1` + partyPhase.b + `contextAction: question.motive_search.b`
- `dc2-via-judge-auto` — `requirePriorCardFired: dc-1` + d-1 S3+

**모두 외도 의심(d-1) 만 의존** — 비자금 사용처(d-2) cross-line 인데 d-2 진행 시에는 dc-2 발동 없음. 사용자 의도?

---

## 종합 — 재설계 결정 사안

본 thread 재설계 시 사용자 결정 필요:

1. **「발신자 미상 문자」(e-4) broad candidate 정밀화 vs 폐기** (Issue 1)
2. **유사 broad 패턴 (dc-3 / e-5 / e-9) 일괄 정밀화 vs 유지** (Issue 2)
3. **「산전우울증 자가진단」(e-9) `e9-via-b-submit` type 정정** (Issue 3)
4. **「영수증 묶음 5장」/「블랙박스 GPS 기록」/「통화기록」 narrative wrapper 부착 여부** (Issue 4)
5. **「이준호의 비밀 개인 계좌」(dc-3) → 「주차 영수증」(e-8) frame 충돌 정합** (Issue 5)
6. **「난임 치료비 진실」(h-d4) 진입 path 우선순위** (Issue 6)
7. **judge_auto fallback 정책 일관성** (Issue 7)
8. **「시댁 얘기만 나오면 싸움」(dc-2) cross-line d-2 진입 추가** (Issue 8)

추가:
- **사건 흐름 정합** — Chain 1 (외도 의심) ↔ Chain 5 (misdirection ↔ 진실 전환) 연결 자연성. 「영수증 묶음 5장」(e-1) stage 3 → 「출산 준비 도서」(e-10) 자연성 검토.
- **재설계: schema 적용 vs 추가 Hybrid hook 확대**
