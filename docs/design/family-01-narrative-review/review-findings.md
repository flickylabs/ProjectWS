# family-01 narrative integrity review — findings

본 문서 = family-01 사건 데이터 자체 (timeline / parties / 5 쟁점 / 7 증거 / 5 단서 / 3 증인 / 12 결합 / 진실 노출 정책 / 사건 핵심 진실) 의 개연성·일관성·자연성 비판적 검토 결과.

- 작성 시점: 2026-05-27 HEAD `abfa7abe` (직전 family-01 trigger 재편성 thread 종료 + friend-01 thread main 통합 후)
- 권위 source:
  - `src/data/coreCases/family-01.case.ts` (3021 line)
  - `src/data/coreCases/family-01.narrative.ts` (757 line)
  - `docs/design/family-01-trigger-redesign/structure-overview.html` (878 line)
- 영역 외 (본 thread 관여 X):
  - narrative trigger schema 영역 = 직전 thread (family-01 trigger 재편성) 완료
  - ScriptedText / 다국어 sync = 별도 다음 thread
  - 공통 모듈 / UI / engine / build = 공통 CT thread
  - spouse-01 / friend-01 사건 영역 = 각 thread

## 우선순위 정의

| 우선순위 | 의미 |
|---|---|
| **P0** | 사건 진실 자체 모순 / schema 정합 위험 (방치 시 게임 진행 / 추리 흐름 깨짐) |
| **P1** | 노출 정책 / character integrity / cross-layer 정합 위험 |
| **P2** | 자연성 / 개연성 영역 (방치 시 player immersion 약화) |
| **P3** | 디테일 영역 — 정독 결과 자연·정합 / 변경 불요 |

## 발견 항목 종합

- P0 = 4건
- P1 = 5건
- P2 = 11건
- P3 = 7건 (변경 불요 영역, 본 문서 하단 short list)

**총 25건 중 수정 검토 영역 = 20건**.

---

## P0 영역 (4건) — 사건 진실 자체 모순 / schema 정합

### P0-1. 윤정후 자금 규모 정합 불명

- **영역**: `parties.b.dailyRoutine` (line 189-191) + `meta.anchorTruth` (line 84-86) + `timeline` stage 0+1 + 사건 핵심 진실
- **현 상태**:
  - parties.b.dailyRoutine = "본래 부모님이 자신에게 물려주려던 가업 공장을 형에게 양보하고 본인은 **작은 자동차부품 가게**로 시작했으며, 그 가게를 운영하며 틈틈이 어머니에게 송금하고 형 몰래 정기 지원금과 병원비를 대 왔다"
  - meta.anchorTruth = "그 뒤 20년 동안 어머니 통장을 거쳐 형 쪽으로 월 정기금과 **공장 위기 3억원**을 보내왔다"
  - timeline stage 1 = "약 20년간 매달 일정액 + 공장 위기 3억원"
- **문제**: "작은 자동차부품 가게" 운영자 (윤정후 약 24~44세) 가 본인 생활 + 어머니 송금 + 형 매달 정기 지원 + 형 공장 위기 **한 번에 3억원** + 어머니 병원비 = 약 5채널 자금 부담을 어디서 형성했는지 자료 어디에도 명시 없음. "작은" 어휘 vs 3억 한 번에 의 비대칭. 가능성 = (가게가 시간이 지나 충분히 성장 / 다른 자산 / 부동산 / 일시 차입 / 다른 사업) — 어느 것도 timeline / truthTable / e-6 description / dailyRoutine 에 영역 없음
- **영향**: 본 사건 핵심 진실 (정후 = 형의 진짜 후원자) 의 개연성 약화. player 가 e-6 (계좌 흐름) Established 도달 시 "이 큰 자금이 어디서 왔는가?" 의문 → 추리 흐름 갭. 또한 d-3 S5 truthDescription "20년간 어머니 통장을 거쳐 월 정기 지원금과 공장 위기 3억원을 형에게 전달" 의 자기 책임 진술 자연성 영역
- **수정 영역 후보**: parties.b.dailyRoutine 어휘 보강 (예: "가게가 시간이 지나 자리잡고…") / timeline stage 추가 또는 stage 1 action 보강 / e-6 depthStages context 영역 추가 / truthTable t-3 의 자금 형성 영역 보강 — 둘 이상 조합 가능

### P0-2. e-5 unlock 시점 vs combine-2/combine-3 gate 불일치

- **영역**: `evidence` e-5 (line 1987-2039) + `combinationRecipes` combine-2 (line 2629-2642) + combine-3 (line 2643-2657)
- **현 상태**:
  - e-5.requiredLieState = **'S5'** (line 2002) — d-5 S5 도달 후만 evidence access 가능. sensitiveSealTargets.recommendedTiming = "d-5 S5 도달 후만 노출"
  - combine-2 (e-4 + e-5 → dc-5) gate.requiredTruthStage = **d-5: 3** (line 2638)
  - combine-3 (e-5 + e-6 → dc-3) gate.requiredTruthStage = **d-3: 2** (line 2653)
- **문제**:
  - combine-3 = d-3 S2 시점에 e-5 input 결합 필요. **e-5 access 자체가 d-5 S5 봉인** → d-3 S2 시점에 e-5 미해금 → combine-3 발동 불가
  - combine-2 = d-5 S3 시점에 e-5 input 결합 필요. **e-5 S5 봉인** → d-5 S3 시점에 e-5 미해금 → combine-2 발동 불가
  - 즉 e-5 input 사용하는 결합 recipe 2건 모두 e-5 unlock 시점 (S5) 이후에야 발동 가능. **실질 발동 시점 모순**
- **영향**: combine-2 → dc-5 / combine-3 → dc-3 두 결합 영역 = unlock 불가능한 dead path. dc-3 = d-3 통합 event (force-unlock 별도 경로) / dc-5 = combine-8 + combine-9 + cascade priorCard 별도 경로 — 즉 두 dossier 모두 다른 경로로 unlock 가능. 그러나 combine-2/combine-3 자체는 실질 dead path
- **수정 영역 후보**:
  - 안 1: combine-2/combine-3 gate.requiredTruthStage 영역 = d-5 S5 으로 격상 (실질 의미 부여)
  - 안 2: combine-2/combine-3 폐기 (다른 경로 충분)
  - 안 3: e-5.requiredLieState 'S5' → 'S3' 완화 + sensitiveSealTargets 별도 unlock 영역 분리

### P0-3. 윤태성 거주·돌봄 frame vs 어머니 요양 timeline 정합 누락

- **영역**: `parties.a.dailyRoutine` (line 143-145) + `parties.a.verbalTells` rank_pull (line 153-156) + `timeline` stage 2 (line 256-269)
- **현 상태**:
  - parties.a.dailyRoutine = "공장에서 주문을 처리하고 **저녁엔 어머니 집에 들러** 자신이 돌봤다는 생활을 유지해왔다"
  - parties.a.verbalTells.rank_pull = "불리해지면 **'형인 내가 모시고 살았다'**며 서열을 내세워 논점을 돌린다"
  - timeline stage 2 (말년 2025.09~10) = "어머니가 **요양 단계**에 들어선 후 윤정후의 요양원 방문이 공증 3주 전부터 급증한다"
- **문제**:
  - "저녁엔 어머니 집에 들러" + "모시고 살았다" = A 인식 frame. 그러나 timeline stage 2 = 어머니 요양 단계. **어머니가 본인 집 → 요양원으로 이행한 시점 자료에 없음**
  - A 의 "모시고 살았다" = 실제 동거 영역인지 / 빈번 방문 + 일상 챙김 영역인지 / 자기 frame 과장인지 영역 모호
  - 이 영역이 모호하면 d-1 (요양원 방문 빈도) + d-5 (장남 당연시 frame) 양측 인식 정합 약화
- **영향**: A 의 dailyRoutine + verbalTell + d-5 S0 admittedFact "내가 평생 어머니를 모셨으니 더 받는 것은 당연하다" 의 frame 진실성 영역. timeline 시점 보강 또는 dailyRoutine 명시 영역 보강 필요
- **수정 영역 후보**:
  - 안 1: timeline 에 어머니 거주 영역 명시 추가 (예: stage 1 ~ stage 2 사이 또는 stage 2 action 보강 "본인 집 거주 후 요양원 이행")
  - 안 2: parties.a.dailyRoutine 영역에 "어머니 집 거주 시기" + "요양 단계 이후 방문" 두 영역 분리 명시
  - 안 3: A verbalTell rank_pull pattern 영역 어휘 다듬기 (예: "내가 늘 챙겼다" 또는 시점별 frame 분리)

### P0-4. timeline 자필 90:10 작성 시점 누락

- **영역**: `timeline` 6 stage (line 224-315) + `disputes` d-5 truthDescription (line 1569-1571) + `evidence` e-5 (line 1987-2039)
- **현 상태**:
  - timeline stage 4 (공증 당일 2025.11.05) = "오전 1차 공란 → 오후 수정 60:40 + 어머니 상태 불안정 + 정후 진행 압박"
  - timeline stage 5 (사망 직후 ~ 조사) = "어머니 자필 연습본 (정후 90, 태성 10) 이 유품에서 **발견**된다"
  - d-5 truthDescription = "어머니가 자필 연습본에 남긴 90:10 을 정후가 공증 60:40 으로 줄인 것"
- **문제**:
  - 자필 90:10 = 어머니가 **언제** 작성했는가? timeline 어디에도 없음
  - stage 4 (공증 당일) = "어머니 상태 불안정" → 자필이 그 직전 영역? 그러나 자필 = 명료한 정신으로 작성한 영역 (90:10 명시 = 어머니의 의지 표현)
  - 자필 작성 시점 vs 공증 시점 갭 자연성 영역 모호 — player 가 "어머니가 명료할 때 자필 90:10 작성 → 흐려진 후 공증 단계에서 정후가 60:40 으로 줄임" 인식 영역 timeline 명시 영역 필요
- **영향**: d-5 의 핵심 진실 (어머니 뜻 = 90:10 / 공증 = 60:40 정후 축소) 의 시간 정합. player 가 자필 시점 인식 갭 시 정후의 "보호 명분" 동기 (d-5 S3 b admittedFact) 자연성 약화
- **수정 영역 후보**:
  - 안 1: timeline stage 3.5 또는 stage 4 직전 단계 신설 — "어머니가 명료한 시기에 자필 연습본 90:10 작성. 정후가 그 자필을 본 시점"
  - 안 2: timeline stage 2 (말년 2025.09~10) action 영역에 "어머니의 자필 연습본을 함께 보고 비율을 정리하려 했다" (현 stage 2 b perception 영역의 표현) → action 영역으로 격상 + 작성 시점 명시
  - 안 3: e-5 description 또는 d-5 truthDescription 영역에 자필 작성 시점 명시

---

## P1 영역 (5건) — 노출 정책 / character integrity / cross-layer 정합

### P1-1. w-3 bias=pro_a + biased vs 어머니 발화 '정후가 더 짊어졌다' 충돌

- **영역**: `witnesses` w-3 (line 2204-2245) + testimony.byDispute['d-5'].canProve (line 2232-2241)
- **현 상태**:
  - w-3.bias = 'pro_a' / distortionRisk = 'biased' / hiddenAgenda = "**윤태성에 대한 동정심이 강해 일부 정보를 자기 해석으로 포장한다**"
  - testimony['d-5'].canProve = "어머니가 두 아들에 대해 **'정후가 더 짊어졌다'**고 말한 적이 있다는 사실" + "태성에 대한 어머니의 안쓰러움 발화"
- **문제**:
  - 박순애 = 윤태성 동정심 강함 (자기 해석으로 포장하는 영역). 그러나 testimony 영역에서 자기 동정심에 반하는 어머니 발화 **'정후가 더 짊어졌다'** 를 정확히 기억·증언
  - "태성에 대한 어머니의 안쓰러움" 발화 = w-3 본인 frame 부합 (동정심 강화) — OK
  - "정후가 더 짊어졌다" = w-3 본인 frame 에 반하는 발화. **w-3 distortionRisk='biased' 영역의 발화 왜곡 가능성 vs canProve 영역 정확성 영역 모호**
- **영향**: d-5 S3 도달 후 (양측 책임축 영역) w-3 testimony 신뢰성 영역. player 가 w-3 발화 = "정후 짊어졌다" 받아들일 때 w-3 본인 동정심 frame 인식 영역 정합. 또한 evidence canProve 영역의 정확성과 hiddenAgenda 영역의 왜곡 영역 분리 정책 명시 필요
- **수정 영역 후보**:
  - 안 1: w-3 testimony['d-5'].canProve 영역에 "다만 본인 동정심 frame 에 반하는 발화라 박순애 본인도 평소엔 잘 꺼내지 않음" 메타 영역 추가 (player 가 발화 신뢰성 영역 판단 가능)
  - 안 2: testimony['d-5'].canProve 영역에서 "정후가 더 짊어졌다" 발화 → "어머니가 정후에 대해서도 안쓰러워하는 마음을 표현했던 적이 있다" 영역 다듬기 (w-3 frame 정합)
  - 안 3: w-3.bias / distortionRisk 영역 자체 재검토 — 어머니 발화 정확 전달 영역 신뢰성 검토 (d-5 영역만 'mixed' 같은 영역 명시)

### P1-2. w-1 + w-3 cross-witness 두 채널 전달 자연성

- **영역**: `witnesses` w-1 (line 2138-2170) + w-1.testimony['d-1'].canProve (line 2154-2167) + w-3.knowledgeScope (line 2212)
- **현 상태**:
  - w-1.knowledgeScope = "어머니의 오랜 이웃 박순애와 **동네에서 오래 알고 지낸 사이**라, 어머니가 평소 두 아들에 대해 박순애에게 한 말도 일부 전해 들었다"
  - w-1.testimony['d-1'].canProve = "박순애로부터 전해 들은 어머니 평소 마음 영역 일부 (자기 관찰 영역 외 보강)"
  - w-3.knowledgeScope = "어머니로부터 두 아들에 대한 속마음을 자주 들었고"
- **문제**:
  - 어머니 → 박순애 → 최복순 = **간접 전달 2 채널**. 어머니 발화 진실성 영역에서 박순애 frame (pro_a + biased) 가 거쳐서 최복순 (neutral · accurate) 에게 도달
  - 최복순 testimony = neutral·accurate. 그러나 cross-channel 전달 자체의 신뢰성 영역 — 박순애의 자기 해석 포장 영역이 최복순 단계에서 정확 인지 가능?
  - 본 영역 = d-1 (요양 영역) 외 어머니 마음 영역 보강용. 사건 후반 (d-5) 양측 책임축 영역과 무관 — 그러나 player 가 w-1 발화 받아들일 때 cross-channel 영역 인식 정합 영역
- **영향**: w-1 발화 신뢰성 채널이 d-1 직접 관찰 (종이 읽는 장면 / 형 오기 전 발화) + 박순애 간접 전달 (어머니 마음 영역) 두 영역 — player 가 두 영역 자연 분리 가능?
- **수정 영역 후보**:
  - 안 1: w-1.testimony['d-1'].canProve 영역에 박순애 간접 전달 영역 = "박순애로부터 전해 들은 어머니의 평소 마음 영역 (간접 전달이라 정확성 영역 별도)" 메타 영역 추가
  - 안 2: w-1 박순애 간접 전달 영역 제거 — w-1 = d-1 직접 관찰만, 어머니 마음 영역 = w-3 단독
  - 안 3: cannotDisprove 영역에 "박순애로부터 들은 영역은 직접 청취 영역 외" 명시

### P1-3. w-3 narrative wrapper dc-5 분기 없음

- **영역**: `witnesses` w-3.unlockedByDossier (line 2219) + `narrative.ts` w3NarrativeTriggers (line 329-368)
- **현 상태**:
  - w-3.unlockedByDossier = ['dc-3', 'dc-5'] (case.ts authority)
  - w-3.relatedDisputes = ['d-3', 'd-5']
  - narrative.ts w3NarrativeTriggers:
    - w3-via-cascade preconditions.requirePriorCardFired = **'dc-3' 단일** + disputeLieState d-3:S2+
    - w3-via-b-interject preconditions.disputeLieState = d-3:S2+
    - w3-via-judge-auto turnsAfterEligible 5
- **문제**: w-3 = 사건 영역 (case.ts) 에서 dc-5 unlock 후 d-5 영역 발화 가능. 그러나 narrative wrapper (cycle 6 영역) 에서 dc-5 분기 narrativeTrigger 없음. dc-5 unlock 시 w-3 re-surface 영역 narrative 누락
- **영향**: 사건 후반 (d-5 S2+ / dc-5 unlock) 영역에서 w-3 가 d-5 영역 (어머니 발화 '정후가 더 짊어졌다' + 태성 안쓰러움) 발화 자연성 — narrative wrapper 없으면 mechanical surface 만 / 자연 발동 영역 없음. 직전 trigger 재편성 thread 의 Issue 9 영역에서 "현재 유지" 결정 — 즉 cross-cycle 영역 narrative 보강 책임 본 thread 영역
- **수정 영역 후보**:
  - 안 1: narrative.ts w3NarrativeTriggers 영역에 w3-via-cascade-dc5 candidate 신설 (priorCard 'dc-5' + d-5:S2+) — d-5 영역 cascade 영역 신설. 그러나 narrative 영역 변경은 직전 thread 종료 — 본 thread 결정 검토
  - 안 2: 본 thread 영역 외 (narrative wrapper = 직전 thread). w-3 cross-cycle 영역은 case.ts 사건 데이터 영역만 (현재 testimony.byDispute['d-5'] 등록 영역) 으로 충분 인식
  - 안 3: w-3.unlockedByDossier 영역 = [dc-3] 단일로 축소 + d-5 영역 증언 = mechanical dispute 도달 기반 surface (현재 testimony.byDispute['d-5'] 가 자료에 등록되어 있어 dispute 도달 후 자동 surface 가능)

### P1-4. dc-3 통합 event description 시점 정합

- **영역**: `dossierCards` dc-3 noteText (line 2408) + `narrative.ts` d3NarrativeTriggers 통합 event 영역 (line 258-326)
- **현 상태**:
  - dc-3.noteText = "윤정후 계좌 → 어머니 통장 → 윤태성 쪽으로 20년간 흘러간 월 정기 지원금과 **공장 위기 3억원의 실체**. 형이 모르게 한 결정의 동기가 d-4로 이어진다"
  - 통합 event = d-3 trigger fire 시 narrativeIntegration force-unlock generic 매핑으로 dc-3 동시 surface. d-3 S2+ 도달 시 fire
  - d-3 S2 surfaceClaim = "계좌 자료 / 형 쪽으로 흘러간 본인 돈"
  - d-3 S2 forbiddenKeywords 영역 = "윤정후 돈", "20년 비밀 지원" (S2 a 영역) / "3억원 전달", "공장 양보", "형 자존심" (S2 b 영역) — **즉 d-3 S2 시점에 양측 발화 영역에서 "3억원" 단어 봉인**
- **문제**:
  - dc-3 noteText 영역에 "**공장 위기 3억원의 실체**" 명시. d-3 S2 force-unlock 시 dc-3 surface = dc-3 noteText 도 surface
  - 그러나 d-3 S2 b forbiddenKeywords = '3억원 전달' (line 1083-1087)
  - dc-3 description 채널 vs 발화 채널 분리 영역 — dc-3 = dossier surface 채널 / 발화 = interrogation 채널. 두 채널 다른 정책 가능. 그러나 disclosure-policy 그룹 2 "정후 돈 / 3억원 전달 / 어머니 통장 경유" 의 등장 정책 = d-3 S2 이후 인정 가능 — dossier 채널은 S2 이후 노출 가능 영역
  - 즉 d-3 S2 force-unlock 시점 = dossier surface OK. 정합 영역 확인
- **영향**: 실질 검증 영역 — d-3 S2 force-unlock 시 dossier 채널 vs 발화 채널 분리 인식 정합. 또한 dc-3 noteText "형이 모르게 한 결정의 동기가 d-4로 이어진다" 메타 영역 (P2-7 별도 영역)
- **수정 영역 후보**: 분리 정책 명시 강화 (변경 X) 또는 dc-3 noteText 영역 시점 영역 다듬기

### P1-5. e-5 surfaceDescription 메타 표현

- **영역**: `evidence` e-5.surfaceDescription (line 1992)
- **현 상태**: e-5.surfaceDescription = "어머니가 남긴 자필 유언장 연습본. **구체 비율은 단계 조사로 확인된다**"
- **문제**:
  - "단계 조사로 확인된다" = 게임 시스템 메타 안내 어휘. 다른 evidence surfaceDescription 영역 (e-1 "어머니의 유서 사본이 존재한다" / e-6 "장기간 반복된 송금과 특정 시점의 큰 자금 이동을 보여주는 은행 자료" / e-7 "어머니의 흰색 자필 공책 사진이 존재한다") 영역 어휘와 톤 어긋남
  - surfaceDescription = surface 단계 (stub/excerpt) 영역의 player 가 본 evidence 영역 — 메타 표현보다 자연 어휘 영역
- **영향**: e-5 surfaceDescription = 메타 영역으로 보이면 player immersion 약화
- **수정 영역 후보**:
  - 안 1: "어머니가 남긴 자필 유언장 연습본. 비율 영역은 일부 흔적만 보인다" 또는 "어머니가 남긴 자필 유언장 연습본. 분배 흔적이 일부 보인다"
  - 안 2: 현재 표현 유지 (메타 명시 의도 의식)

---

## P2 영역 (11건) — 자연성 / 개연성

### P2-1. timeline stage 0 윤정후 24세 인생 결정 자연성

- **영역**: `timeline` stage 0 (line 224-239) + `parties.b.age` (44) (line 178)
- **현 상태**: 20여 년 전 시점 = 윤정후 (44세 기준) **약 24세**. 친부 아닌 사실 인지 + 가업 양보 + 자동차부품 가게 시작 + 출생 비밀 침묵 결정 + 20년 이후 송금 결정의 시발점
- **문제**: 24세 시점의 인생 무게 결정 자연성. 그 무게 = "형이 무너지지 않게 하기 위함" (truthStages d-4 S4+ 영역 정후 발화). 24세 결정 후 20년 동안 일관 유지 영역 자연성
- **수정 영역 후보**: 안 1 timeline stage 0 의 "20여 년 전" → "20대 후반/30대 초반" 등 시점 다듬기 / 안 2 윤정후 나이 영역 변경 / 안 3 현재 유지 (정후 affect_flattening + 어머니 결정 따른 영역으로 자연 인식 가능)

### P2-2. 어머니 통장 경유 매달 20년 영역의 어머니 인지·참여

- **영역**: `timeline` stage 1 (line 241-254) + `truthTable` t-3 (line 333-339) + `disputes` d-3 truthDescription (line 957-959)
- **현 상태**: stage 1 = "어머니 통장을 거쳐 매달 일정액". 어머니가 이 흐름을 매달 능동 관리/전달했는지 / 통장만 빌려준 영역인지 명시 X
- **문제**: 어머니 = 출생 비밀 인지 + 정후 사전 인지 확인 + 자필 90:10 작성 = 사건 영역 핵심 결정자. 정후 송금에 대한 어머니의 동의·전달 영역 정합 — 어머니 = "정후가 더 짊어졌다" 발화 (w-3 testimony) 영역 정합
- **수정 영역 후보**: 안 1 timeline stage 1 action 영역 보강 ("어머니가 이 통장 흐름을 알면서 정후 뜻을 따라 매달 입금 흐름을 형 쪽으로 전달한다") / 안 2 e-6 description 영역 보강

### P2-3. d-1 truthDescription vs timeline stage 2 방문 빈도 어휘 정합

- **영역**: `disputes` d-1 truthDescription (line 368-370) + `timeline` stage 2 (line 256-269)
- **현 상태**:
  - d-1 truthDescription = "윤정후는 어머니 **말년에 자주 방문**하며 유서 내용을 논의했다"
  - timeline stage 2 = "어머니가 요양 단계에 들어선 후 윤정후의 요양원 방문이 **공증 3주 전부터 급증**한다"
- **문제**: "자주 방문" = stage 2 (말년 2025.09~10) 자체에 한정인지, 그 이전 영역 (요양 단계 진입 전) 인지 모호. timeline stage 1 (약 20년간) + stage 2 (말년) 영역 방문 빈도 영역 다듬기
- **수정 영역 후보**: 안 1 d-1 truthDescription 어휘 정밀화 ("어머니 말년 + 공증 직전 방문이 늘었다") / 안 2 현재 유지 (자연 어휘)

### P2-4. w-2 (김영수) bias=neutral + distortionRisk=accurate vs hiddenAgenda 정합

- **영역**: `witnesses` w-2 (line 2171-2203)
- **현 상태**: bias=neutral / distortionRisk=accurate / hiddenAgenda="공증 절차상 확인이 부족했던 점이 불거질까 봐 선을 긋는다"
- **문제**: neutral·accurate 평가 vs hiddenAgenda 존재. testimony 영역 = 사실 정확 전달 가능하지만 hiddenAgenda 영역 = 자기 책임 영역 회피
- **수정 영역 후보**: 안 1 현재 유지 (직업적 자기방어 영역 별도 / testimony 정확성 영역과 hiddenAgenda 영역 분리 정합) / 안 2 hiddenAgenda 영역 보강 ("자기 책임 영역만 선을 긋되 메모 자체는 정확 전달")

### P2-5. e-6 depthStages context 두 흐름 시점 격차

- **영역**: `evidence` e-6.depthStages.context (line 2070)
- **현 상태**: "어머니 통장에 정후 이름으로 입금된 송금 흐름과 어머니 통장에서 형 쪽으로 빠진 입금 흐름이 같은 통장 한 곳에 모두 기록된 것이 복원된다"
- **문제**: 정후 입금 vs 형 출금 두 흐름의 시점 격차 영역 명시 없음. 정후 매달 입금 / 어머니 → 형 매달 출금 + 공장 위기 한 번에 3억 출금 — 두 패턴 정합. **두 흐름 시점이 동일한 영역인지, 시간 차이가 있는 영역인지** (예: 정후 입금 후 며칠/몇 달 안에 형 쪽 출금) 명시 영역 검토
- **수정 영역 후보**: 안 1 context 영역에 시점 격차 영역 추가 명시 / 안 2 현재 유지 (충분한 영역)

### P2-6. e-7 일기장 정보 집중 영역 자연성

- **영역**: `evidence` e-7.description (line 2085) + `truthTable` t-4 (line 340-346) + `dossierCards` dc-4.noteText (line 2475)
- **현 상태**: 한 일기장에 친부 아님 + 두 아들 동등 + 정후 사전 인지 + 친자 양보 + 침묵 동기 = 모두 기록
- **문제**: 어머니 자필 일기장 = 한정된 양. 5 영역 모두 한 일기장에 집중 vs 정보 분산 (예: 자필 90:10 = 별도 연습본 / 일기장 = 다른 영역) 자연성
- **수정 영역 후보**: 안 1 현재 유지 (일기장 = 어머니의 사적 기록이라 정보 집중 자연) / 안 2 일기장 영역 분산 (여러 일기장 / 편지 / 메모)

### P2-7. dc-3 noteText "d-4로 이어진다" 메타 표현

- **영역**: `dossierCards` dc-3.noteText (line 2408)
- **현 상태**: "윤정후 계좌 → 어머니 통장 → 윤태성 쪽으로 20년간 흘러간 월 정기 지원금과 공장 위기 3억원의 실체. 형이 모르게 한 결정의 동기가 **d-4로 이어진다**"
- **문제**: "d-4로 이어진다" = 게임 시스템 메타 안내. dossier noteText 영역 = player 가 본 직접 영역 — 메타 표현보다 자연 어휘 영역
- **수정 영역 후보**: 안 1 "형이 모르게 한 결정의 동기가 다음 영역으로 이어진다" 등 메타 어휘 다듬기 / 안 2 현재 유지

### P2-8. dc-5 challenges.b q2 양측 책임 인정 시점 정합

- **영역**: `dossierCards` dc-5.challenges.b.questions[1] (line 2589-2600)
- **현 상태**: dc-5.b.q2 text = "결국 두 형제 모두 어머니를 있는 그대로 두지 못했다는 말, 이제는 인정하십니까?" / requiredLieState = 'S3'
- **문제**: dc-5 = linkedParty 'b' (B 측 책임 영역). q2 = "두 형제 모두" 양측 책임 인정 발화 — B 측 challenge 영역에 양측 책임 인정 영역 등장. d-5 S3 = "보호 명분 + A 당연시 부분 인정" 영역 정합
- **수정 영역 후보**: 안 1 현재 유지 (양측 책임 인정 영역 d-5 의 핵심 / B challenge 영역 자연) / 안 2 q2 영역 다른 영역 (B 단독 책임)

### P2-9. combine-9 (stmt-a-heir + e-7) → dc-5 자연성

- **영역**: `combinationRecipes` combine-9 (line 2733-2747)
- **현 상태**: discoveryText = "형의 '모시고 산 건 나인데'라는 말과 오래된 노트 사본의 기록이 충돌"
- **문제**: e-7 = 출생 비밀 영역 (d-4 영역). dc-5 = 어머니 뜻 영역 (d-5). 두 영역 결합 자연성 — e-7 의 어머니 기록 (두 아들 동등) + A 발화 = 어머니 뜻 영역 결합 영역
- **수정 영역 후보**: 안 1 현재 유지 (e-7 = 어머니 마음 영역도 포함 / dc-5 = 양측 책임축 영역 자연) / 안 2 combine-9 영역 폐기 또는 다른 결합

### P2-10. parties.b sensitivePoints "자필 연습본의 비율을 줄인 책임" UI 노출 시점

- **영역**: `uiExposure.fieldPolicy.partyB.sensitivePoints` (line 2964-2966) + `parties.b.sensitivePoints` (line 192-197)
- **현 상태**: partyB.sensitivePoints gate = 'after_any_collapse' / sensitivePoints[0] = "자필 연습본의 비율을 줄인 책임"
- **문제**: 거짓말 완전 붕괴 (S5 도달) 시점 = d-5 S5 영역. 자필 90:10 노출 정책 (그룹 3) = d-5 S5만 노출 — 정합 OK. 다만 partyB sensitivePoints 영역 = B 의 어느 dispute S5 도달 시 unlock? d-5 S5 한정인지 / 임의 dispute S5 가능한지 schema 명시 확인 필요
- **수정 영역 후보**: 안 1 uiExposure.fieldPolicy.partyB.sensitivePoints 영역에 requireDisputeCollapse 'd-5' 명시 추가 / 안 2 현재 유지 (gate 'after_any_collapse' = 광역, 그러나 sensitivePoints[0] 의 자필 어휘 자체가 grupo 3 정책 영역)

### P2-11. dc-4 type='note' vs 다른 dossier 'derived_evidence'

- **영역**: `dossierCards` dc-4.type (line 2460)
- **현 상태**: dc-1/dc-2/dc-3/dc-5 = 'derived_evidence'. **dc-4만 'note'**
- **문제**: type 분류 차이 의도 명시 없음. dc-4 = 출생 비밀 영역 (민감 봉인 영역) — type='note' 가 민감 영역 분류인 영역? schema 정합 영역
- **수정 영역 후보**: 안 1 현재 유지 (의도된 분류) / 안 2 dc-4.type 'derived_evidence' 으로 일관 / 안 3 dc-4 type='note' 의도 영역 자료 명시

---

## P3 영역 (7건) — 정독 결과 자연·정합 / 변경 불요

| # | 영역 | 검토 결과 |
|---|---|---|
| P3-1 | d-3 S0 forbiddenKeywords "20년 비밀 지원" | 그룹 2 정책 정합 / 어휘 OK |
| P3-2 | d-3 S2 transitionBeat "그 흐름 중 상당수가 내 돈" | hard_evidence trigger + e-6 unlock 시점 정합 |
| P3-3 | d-4 S1 b transitionBeat "그 한 줄 때문에 형에게 말하지 못한 게 있다" | 일기장 영역 모호어 사용 / 노출 정책 정합 |
| P3-4 | d-4 S2 b transitionBeat "어머니가 그걸 가장 걱정하셨다" + 일기 사진 시선 | e-7 requiredLieState='S2' + S2 단계 surface 정합 |
| P3-5 | d-5 S5 a transitionBeat "처음으로 자필 사진을 끝까지 들여다본다" | S5 정확 수치 노출 + behaviorHint 자연 |
| P3-6 | e-5 surfaceName "자필 메모 사본" vs name "어머니 자필 유언장 연습본" | surface tier 분리 자연 / 봉인 영역 분리 OK |
| P3-7 | meta.anchorTruth 4 핵심 사실 + emotionalBait + resolutionDilemma 정합 | 사건 핵심 진실 정합 |

## 다음 단계

→ `proposals.md` 작성 (P0 4건 + P1 5건 + P2 11건 = 20건의 수정 옵션 좌표).
→ 사용자 결정 (영역별 단계적, P0 먼저 권장).
→ 결정된 수정 case.ts 적용 (영역별 commit 분리).
→ 검증 (tsc + qa:fast).
→ discussion-summary.html 시각화 + commit + 핸드오프.
