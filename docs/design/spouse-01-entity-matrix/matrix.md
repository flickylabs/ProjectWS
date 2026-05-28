# spouse-01 entity 등장 조건 매트릭스 (2026-05-28)

> **2026-05-28 비자금 라인 정리**: 사용자 결정으로 「비자금의 원래 목적」 라인 전체 폐기 — 쟁점 **h-d4**, 증거 **e-9**, 단서 **dc-8**, 결합 **combine-7** 제거. 쟁점 4(d-1/d-2/h-d3/d-3) · 증거 9(e-1~e-8 + e-10) · 단서 6. 「주차 영수증」(e-8)은 d-3 misdirection 증거로 유지(「출산 준비 도서」 조사 2단계 목차에서 발견). 아래 표의 ~~취소선~~ 행은 폐기됨.

본 자료 = spouse-01 의 쟁점 5개 + 증거 10개 + 단서 7개 + 증인 3명 의 등장 조건 매트릭스 정리. 본 thread 적용 영역 (e-10/e-4 fix + 박지연 6 turn + 이준호 5 turn) 반영 후 상태.

## 1. 쟁점 (5개)

| 쟁점 | v3Visibility | hidden | unlockCondition | narrativeTriggers | 등장 종합 |
|------|--------------|--------|------------------|-------------------|------------|
| **d-1** 「외도 의심」 | initial | false | 없음 | 없음 | 사건 시작 시점 visible |
| **d-2** 「남편 명의 계좌의 목돈 출금」 | hidden | false | requireDispute d-1 S3 | 없음 | d-1 S3 도달 시 prereq gate (automatic) |
| **h-d3** 「공동 적금 2,000만원 해지 경위」 | hidden | true | requireDispute d-2 S3 | hd3NarrativeTriggers | d-2 S3 도달 + narrative trigger 발동 시 |
| ~~**h-d4** 「비자금의 원래 목적」~~ | — | — | — | — | **2026-05-28 폐기 (비자금 라인 정리)** — 쟁점 제거 |
| **d-3** 「내연녀 임신 의심」 | hidden | false | 없음 (2026-05-28 requireDispute d-1 S2 제거) | 없음 (자동 경로 제거) | **두 진입점** (먼저 도달한 쪽, hidden guard): ① C-3c hook = 「영수증 묶음」 stage 3 박지연 제시 → e-10 dual emergence / ② 「블랙박스 GPS」(e-2) 조사 3단계 hook (2026-05-28 신설) |

### 적절성 의문 / 잠재 회귀 영역

- **d-2 narrative wrapper 없음**: d-1 S3 시점에 d-2 자동 등장. 사건 흐름의 핵심 진입 영역인데 narrative emergence 영역이 부족. 단 unlockCondition.runtimeRule + authoredRule 영역으로 trigger 묘사 영역 있음 — runtime 영역에서 어떻게 처리되는지 확인 필요. 적절성 = 사용자 판단 영역.
- **h-d3/h-d4 narrative trigger 영역**: priorCard 영역 (h-d3=dc-7 line / h-d4=dc-8 line) 으로 cascade 묶음. 적절.
- **d-3 narrative trigger 제거**: 본 thread 적용 영역. e-10 6 turn 시퀀스 통합 발화. manual 테스트 확인 영역.

## 2. 증거 (10개)

| 증거 | proves | requires | requiredLieState | base | narrative trigger | 등장 종합 |
|------|--------|----------|------------------|------|-------------------|------------|
| **e-1** 「영수증 묶음 5장」 | d-1 | [] | 없음 | ✅ | inline (stage 3 박지연 자동 + 이준호 5 turn 분기) | 사건 시작 visible + stage 3 시점 분기 |
| **e-2** 「블랙박스 GPS」 | d-1 | [] | 없음 | ✅ | e-2 조사 3단계(restore_context) → d-3 emerge hook (2026-05-28 신설, handleEvidenceInvestigate) | 사건 시작 visible + 조사 3단계 시 d-3 「내연녀 임신 의심」 발동 |
| **e-3** 「카드 사용 명세서」 | d-1 | [] | 없음 | ✅ | 없음 | 사건 시작 visible |
| **e-4** 「발신자 미상 문자」 | d-1 | [] (본 thread fix) | 없음 (본 thread fix) | ❌ | e4NarrativeTriggers (priorCard 'e-3', C-2 hook) | narrative trigger only |
| **e-5** 「SNS DM 캡처」 | d-2 | [e-4] | S2 | ❌ | inline (Trigger 1/2/3 narrative gate) | automatic unlock (e-4 presented + d-1 S2) ⚠️ |
| **e-6** 「공동 적금 해지서」 | h-d3 | [e-7] | S2 | ❌ | e6NarrativeTriggers (priorCard 'dc-7') | automatic unlock (e-7 presented + h-d3 S2) ⚠️ |
| **e-7** 「위임장 사본」 | h-d3 | [e-5] | S3 | ❌ | e7NarrativeTriggers (priorCard 'dc-3') | automatic unlock (e-5 presented + d-2 S3) ⚠️ |
| **e-8** 「주차 영수증」 | **d-3** (2026-05-28, h-d4→d-3) | [] | 없음 | ❌ | e8NarrativeTriggers dead (잔존) | **e-10 조사 2단계 hook (forceUnlock + popup)** — handleEvidenceInvestigate. 책 목차에서 발견 |
| ~~**e-9** 「예비 부모 정서 자가진단 + 상담 예약」~~ | — | — | — | — | **2026-05-28 폐기 (비자금 라인 정리)** — 증거 제거 |
| **e-10** 「출산 준비 도서」 | **d-3** (2026-05-28, h-d4 link 제거) | [] | 없음 | ❌ | inline (C-3c hook + candidate 1: e-1 stage 3 박지연 6 turn) | narrative trigger only |

### ⚠ 잠재 회귀 영역 (5건)

본 thread 에서 e-4, e-10 의 자동 unlock 영역 제거로 회귀 fix 했으나 **동일 패턴이 e-5/e-6/e-7/e-8/e-9 에도 존재**.

회귀 mechanism:
1. evidence_investigate / evidence_present 액션 후 `evidenceEngine.checkUnlocks` 가 cascade unlock 처리
2. `consumeLastInvestigateUnlocks` → `enqueueNewEvidenceCutscene` ([useActionDispatch.ts:1737~1748](src/hooks/useActionDispatch.ts#L1737)) 영역이 narrative gate **우회** popup 발동
3. narrative trigger 영역이 같은 시점에 발동되지 않으면 popup 만 단독 출현 (narrative wrapper 없는 surface)

회귀 잠재 시점:
- e-5: e-4 present 직후 d-1 S2 시점 (e-4 candidate (C-2 hook) 발동 직후 동시 발생 가능)
- e-7: e-5 present 직후 d-2 S3 시점 (h-d3 unlock 과 동시)
- e-6: e-7 present 직후 h-d3 S2 시점 (h-d3 narrative wrapper 진행 중)
- ~~e-8: e-3 present 직후 d-1 S2 시점~~ → **2026-05-28 FIXED** (requires:[] + requiredLieState 제거, e-10 조사 2단계 hook 으로 등장 이전. manual 테스트 보고 fix)
- e-9: e-8 present 직후 h-d4 S2 시점 (h-d4 도달 자체가 d-2 S5 이후라 cascade timing 영역)

**판단 영역**: 본 thread fix 패턴 (자동 unlock 제거 + narrative trigger only) 을 e-5/e-6/e-7/e-8/e-9 에도 일괄 적용할지 사용자 결정 필요. 단 cascade chain 자체가 사건 진행 기제이므로 — narrative trigger 가 cascade 시점에 controlled 영역이라면 OK. 단 사용자 manual 테스트에서 실제 회귀 확인된 영역만 fix 하는 영역이 시간 절약 우선.

## 3. 단서 (7개)

| 단서 | leadLine | combination | inputs | requiredEvidenceStages | requiredTruthStage | narrative trigger | linkedDispute |
|------|----------|-------------|--------|------------------------|---------------------|-------------------|---------------|
| **dc-cash-clue** 「정기 자금 이동의 흔적」 | L-cash-clue | clue-cash-pattern | e-3 + e-4 | e-3 original, e-4 original | 없음 | 없음 (다른 trigger 의 priorCard) | d-2 |
| **dc-1** 「오피스텔의 사람들」 | L-1 | combine-1 | e-1 + e-2 | e-1 excerpt, e-2 original | 없음 | dc1NarrativeTriggers (priorCard 'e-4') | d-1 |
| **dc-2** 「시댁/조카 frame」 | L-2 | combine-6 | stmt-b-family + e-4 | e-4 original | 없음 | dc2NarrativeTriggers (priorCard 'dc-1' + 'dc-3') | d-1 |
| **dc-3** 「이준호의 비밀 개인 계좌」 | L-3 | combine-4 | e-4 + e-5 | e-4 original, e-5 original | 없음 | dc3NarrativeTriggers (priorCard 'dc-cash-clue') | d-2 |
| **dc-4** 「돌이키고 싶은 2,000만 원」 | L-4 | combine-3 | e-6 + e-7 | e-6 original, e-7 original | 없음 | dc4NarrativeTriggers (priorCard 'e-6') | h-d3 |
| **dc-7** 「공동 적금 2,000만 원의 해지」 | **없음** ⚠ | combine-5 | e-7 + stmt-a-protect | e-7 original | h-d3 stage 2 | dc7NarrativeTriggers (priorCard 'e-7') | h-d3 |
| ~~**dc-8** 「이준호의 또 다른 침묵」~~ | — | — | — | — | — | **2026-05-28 폐기 (비자금 라인 정리)** — 단서 + combine-7 제거 |

### ⚠ 적절성 의문 (1건)

- **dc-7 의 leadLine 영역 부재**: 다른 dossier 6개 모두 leadLine 영역 (L-* lead 카드) 있음. dc-7 만 leadLine 없이 successConditionSummary + combine-5 (statement_combine) + narrativeTriggers 영역만으로 등장. UI 표시 영역 (lead inspection / interpretation choices) 갭 가능성. 적절성 = 사용자 판단 영역.

## 4. 증인 (3명)

| 증인 | relatedDisputes | unlockedByDossier | narrative trigger |
|------|-----------------|---------------------|-------------------|
| **w-1** 「오피스텔 경비」 | d-1 | dc-1 | w1NarrativeTriggers (priorCard 'dc-1') |
| **w-2** 「은행 직원」 | d-2, h-d3 | dc-3, dc-4, dc-7 | w2NarrativeTriggers (priorCard 'dc-7') |
| **w-3** 「박미라」 (카페 운영) | h-d3 | dc-4 | w3NarrativeTriggers (priorCard 'dc-4') |

### 적절성 영역

- 모든 증인이 unlockedByDossier 영역으로 controlled. dc-cash-clue / dc-8 은 증인 unlock 영역 없음 (h-d4 line 은 별도 증인 없음, dc-cash-clue 는 dc-3 cascade priorCard 영역).
- narrative trigger 영역도 모두 dossier priorCard 영역으로 controlled. 적절.

## 5. cascade chain 시각화

### Track A (외도 의심 → 위임장 → h-d3 line)

```
e-1, e-2, e-3 (base, 사건 시작 visible)
   ↓
e-4 (narrative C-2 hook priorCard e-3)
   ↓                          ↓
e-5 (자동, d-1 S2)        dc-1 (combine e-1+e-2, narrative priorCard e-4)
   ↓                          ↓                ↓
dc-3 (combine e-4+e-5)    w-1 (dc-1)      dc-2 (combine stmt+e-4)
   ↓                                          ↓
e-7 (자동, d-2 S3)                    (dc-1 priorCard cascade)
   ↓
dc-7 (combine e-7+stmt-a, h-d3 S2)
   ↓                          ↓
w-2 (dc-7)                e-6 (자동, h-d3 S2)
                              ↓
                         dc-4 (combine e-6+e-7)
                              ↓
                         w-3 (dc-4)
```

### Track B (h-d4 비자금 원래 목적 line) — **2026-05-28 폐기**

사용자 결정으로 비자금 원래 목적 라인 전체 정리: **e-9(증거) + dc-8(단서) + h-d4(쟁점) + combine-7 모두 제거**. 「주차 영수증」(e-8)은 유지하되 d-3 misdirection 증거로 재배치(아래 Track C).

```
(폐기) e-8 → e-9 → dc-8 → h-d4
```

### Track C (d-3 misdirection line)

```
e-1 stage 3 박지연(a) 제시
   ↓
e-10 candidate 1 (e-1 stage 3 박지연 자동 6 turn)
   ↓ (6번째 ref 통합 발화)
e-10 「출산 준비 도서」 등장 + d-3 「내연녀 임신 의심」 등장 (dual emergence, C-3c hook)
   ↓
e-10 조사 2단계 (목차 탐색)
   ↓ (2026-05-28 hook — 목차 사이에서 발견)
e-8 「주차 영수증」 등장 (d-3 「내연녀 임신 의심」 misdirection 보강 증거. proves d-3)
```

## 6. 잠재 fix 영역 추출 (사용자 결정 필요)

### 우선순위 P0 (manual 테스트 회귀 보고 시 즉시 fix)

본 thread 에서 e-4, e-10 영역 fix 완료. 추가 회귀 보고 받는 영역.

### 우선순위 P1 (잠재 회귀 — 본 thread 패턴 일괄 적용 여부)

| ID | 잠재 영역 | 본 thread 패턴 적용 시 변경 |
|----|-----------|----------------------------|
| P1-1 | e-5 자동 unlock 영역 | requires:[] + requiredLieState 제거. e-5 inline narrative trigger 가 cascade 시점에 controlled 영역인지 확인 후 결정 |
| P1-2 | e-6 자동 unlock 영역 | requires:[] + requiredLieState 제거. e6NarrativeTriggers (priorCard 'dc-7') 가 cascade 시점에 controlled 영역인지 확인 |
| P1-3 | e-7 자동 unlock 영역 | requires:[] + requiredLieState 제거. e7NarrativeTriggers (priorCard 'dc-3') 가 cascade 시점에 controlled |
| ~~P1-4~~ | ~~e-8 자동 unlock 영역~~ | **2026-05-28 FIXED** — requires:[] + requiredLieState 제거 완료. e-10 조사 2단계 hook (handleEvidenceInvestigate) 으로 등장 이전. e8NarrativeTriggers (d-2 S5+) 는 auto-unlock 의존이라 dead 처리 (ScriptedText 정리 후속) |
| P1-5 | e-9 자동 unlock 영역 | requires:[] + requiredLieState 제거. e9NarrativeTriggers (priorCard 'e-8') 가 cascade 시점에 controlled |

**판단**: cascade chain 자체가 사건 진행의 기제이므로 — narrative trigger 영역이 cascade 시점에 controlled 영역이라면 OK. 본 thread 처럼 manual 테스트 회귀 확인 시점에만 영역별 fix 영역이 시간 절약 우선.

### 우선순위 P2 (적절성 의문)

| ID | 영역 | 의문 |
|----|------|------|
| P2-1 | dc-7 leadLine 영역 부재 | 다른 dossier 6개 모두 leadLine 영역 있음. dc-7 만 없어 UI 표시 갭 가능. lead 영역 신설 여부 사용자 결정 |
| P2-2 | d-2 narrative wrapper 영역 없음 | d-1 S3 시점에 d-2 자동 등장. 사건 진입 핵심 영역인데 narrative emergence 영역 부족. 단 unlockCondition.runtimeRule + authoredRule 영역으로 trigger 묘사 있음 — runtime 영역 실제 표시 확인 필요 |

### 우선순위 P3 (영역 외 — 본 thread 이미 fix 또는 정상)

- d-3 narrative trigger 영역 제거 + e-10 6 turn 통합 발화 = 본 thread 적용 완료
- 모든 evidence inline narrativeTriggers + narrative.ts var 영역 = 정상 cascade
