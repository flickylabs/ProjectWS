# family-01 narrative integrity review — proposals

본 문서 = `review-findings.md` 의 20건 (P0 4 + P1 5 + P2 11) 영역별 수정 옵션 좌표.

작성 시점: 2026-05-27 HEAD `abfa7abe`.

각 항목 = (발견 요약 / 옵션 1~3 / Claude 추천).

---

## 우선순위 결정 흐름 권장

1. **P0 4건 먼저 결정 + 적용 + commit** (사건 진실 자체 모순 / dead path 영역 — 가장 안전 영역 단독 처리)
2. **P1 5건 결정 + 적용 + commit** (cross-layer / character integrity 영역)
3. **P2 11건 결정 + 적용 + commit** (자연성 영역)

각 round commit 분리 + tsc / qa:fast 검증 후 다음 round 진입.

---

## P0-1. 윤정후 자금 규모 정합 불명

### 발견 요약
parties.b dailyRoutine 의 "작은 자동차부품 가게" 운영자 = 본인 생활 + 어머니 송금 + 형 매달 정기금 + 공장 위기 3억 + 어머니 병원비 = 약 5채널 자금 부담 형성 경로 명시 없음. anchorTruth / timeline / e-6 description 어디에도 없음.

### 옵션
- **옵션 1 (Recommended)**: parties.b.dailyRoutine 어휘 보강
  - 현: "본인은 작은 자동차부품 가게로 시작했으며, 그 가게를 운영하며 틈틈이 어머니에게 송금하고 형 몰래 정기 지원금과 병원비를 대 왔다"
  - 안: "본인은 자동차부품 가게로 시작했고 십수 년 사이에 거래처가 안정되며 자리잡았다. 그 가게를 운영하며 어머니에게 정기 송금을 보내고 형 몰래 정기 지원금과 병원비를 대왔으며, 형 공장 위기 때는 가게 자산을 일부 담보로 잡아 3억원을 마련해 어머니 통장을 거쳐 보냈다"
  - 영향: dailyRoutine 영역만 변경. 다른 영역 무영향
- **옵션 2**: timeline stage 1 action 영역 보강 + e-6 description 보강 + dailyRoutine 영역 동시 다듬기 (3 영역)
  - 영향: 자금 형성 영역 명시 영역 다중 채널 — 자료 분산 자연성 / 그러나 변경 영역 큼
- **옵션 3**: 현재 유지 (player 가 자연 추론 영역 의식)
  - 영향: P0 자체 잔존

### Claude 추천
**옵션 1**. 단일 영역 변경 + 자금 형성 영역 명시. "가게가 자리잡았다 + 일시 자산 담보" 영역이 정후 자금 규모 자연성 영역. character integrity 영역에 부정 영향 X.

---

## P0-2. e-5 unlock 시점 vs combine-2/combine-3 gate 불일치

### 발견 요약
e-5.requiredLieState='S5' (d-5 S5 도달 후만 unlock). 그러나 combine-2 gate = d-5 S3 / combine-3 gate = d-3 S2. 두 결합 모두 e-5 input 사용 → e-5 unlock 후만 발동 가능 → 실질 dead path.

### 옵션
- **옵션 1 (Recommended)**: combine-2/combine-3 gate.requiredTruthStage 영역 격상
  - combine-2 → d-5 S5
  - combine-3 → d-3 S5 (또는 d-5 S5)
  - 영향: combine-2/combine-3 = dc-5/dc-3 의 사건 후반 unlock 영역으로 의미 부여. 다른 unlock 경로 (combine-8/combine-9 → dc-5 / combine-6/combine-10 → dc-3 / cascade / force-unlock) 영향 X
- **옵션 2**: combine-2/combine-3 폐기
  - 영향: dc-5/dc-3 unlock 경로 = combine-8/9 + cascade / force-unlock 영역으로 충분. 자료 영역 단순화. ScriptedText 영역 영향 (combine-2/3 의 emerge-d3-dc3-via-combo / emerge-dc5-via-combo refs 없음 — 통합 event ref 별도 / combine 자체는 mechanical 만)
- **옵션 3**: e-5.requiredLieState 'S5' → 'S3' 완화 + sensitiveSealTargets 봉인 영역 분리
  - 영향: e-5 unlock 시점 격하 → 자필 비율 정확 수치 봉인은 별도 (depthStages established 영역 / sensitiveSealTargets) 영역으로 분리. 그러나 evidence schema requiredLieState 의 의미 와 다른 영역 분리 정책 영향. 광역 영역 변경

### Claude 추천
**옵션 1**. dead path 영역 만 정리. 다른 영역 영향 최소.

---

## P0-3. 윤태성 거주·돌봄 frame vs 어머니 요양 timeline 정합 누락

### 발견 요약
A dailyRoutine "저녁엔 어머니 집에 들러" + rank_pull "모시고 살았다". timeline stage 2 = 어머니 요양 단계. 어머니 거주 영역 timeline 명시 X.

### 옵션
- **옵션 1 (Recommended)**: timeline stage 2 action 영역 보강 + parties.a dailyRoutine 영역 시점 분리
  - timeline stage 2 action 보강: "어머니가 요양 단계에 들어선 후 (그 이전까지는 어머니 본인 집 거주) 윤정후의 요양원 방문이 공증 3주 전부터 급증한다"
  - parties.a dailyRoutine 보강: "공장에서 주문을 처리하고 저녁엔 어머니 집에 들러 일상을 챙겼다. 어머니가 요양 단계에 들어선 후로는 요양원 방문 빈도가 낮아졌다"
  - 영향: timeline + parties.a 두 영역 변경. A frame "모시고 살았다" = 일상 챙김 영역으로 분리 영역 자연. d-5 S0 "장남 당연시 + 평생 모심" 자연성 영역 강화
- **옵션 2**: timeline 신규 stage 추가 — stage 1.5 = "어머니 거주 영역 (본인 집 → 요양 단계 이행)"
  - 영향: timeline 영역 stage 수 증가 (현재 6 → 7). 광역 변경
- **옵션 3**: parties.a verbalTell rank_pull pattern 어휘 다듬기 — "모시고 살았다" → "내가 늘 챙겼다" 또는 "내가 어머니 가까이서 모셨다"
  - 영향: verbalTell 영역만 변경. timeline 영역 미변경 — 그러나 timeline 갭 자체 잔존

### Claude 추천
**옵션 1**. timeline + parties.a 영역 동시 보강. A frame integrity 영역 정합 강화.

---

## P0-4. timeline 자필 90:10 작성 시점 누락

### 발견 요약
자필 90:10 작성 시점 timeline 어디에도 없음. stage 5 = "발견" 시점만. stage 4 (공증 당일) 어머니 상태 불안정 vs 자필 명료 정신 작성 영역 갭.

### 옵션
- **옵션 1 (Recommended)**: timeline stage 2 action 영역 보강 + d-5 truthDescription 영역 보강
  - timeline stage 2 action: "어머니가 요양 단계에 들어선 후 윤정후의 요양원 방문이 공증 3주 전부터 급증한다. 어머니는 명료한 시기에 자필 연습본 (정후 90, 태성 10) 을 미리 남겼고, 정후가 그 자필 연습본을 보고 비율을 정리하려 한다"
  - d-5 truthDescription 영역에 작성 시점 명시 가능
  - 영향: stage 2 action 확장 + d-5 영역 보강. 자필 작성 시점 = 어머니 명료 시기 (stage 2 초반) 인식 영역 명확
- **옵션 2**: timeline 신규 stage 추가 — stage 1.5 또는 stage 2 직전 단계 = "어머니의 자필 연습본 작성 시점"
  - 영향: stage 수 증가. 광역 변경
- **옵션 3**: e-5 description 영역에 작성 시점 명시
  - 영향: e-5 영역만 변경. timeline 영역 미변경 — 그러나 timeline 갭 자체 잔존

### Claude 추천
**옵션 1**. timeline stage 2 action 영역 보강 + d-5 truthDescription 영역 보강. 자필 작성 시점 = stage 2 초반 (어머니 명료 시기) 인식 영역 자연.

---

## P1-1. w-3 bias=pro_a + biased vs 어머니 발화 '정후가 더 짊어졌다' 충돌

### 발견 요약
박순애 = 윤태성 동정심 강함 (자기 해석 포장). 그러나 testimony['d-5'].canProve = 본인 frame 에 반하는 "정후가 더 짊어졌다" 발화 정확 증언.

### 옵션
- **옵션 1 (Recommended)**: testimony['d-5'].canProve 영역에 cross-frame 인식 영역 메타 추가
  - 안: "어머니가 두 아들에 대해 '정후가 더 짊어졌다'고 말한 적이 있다는 사실 (본인 frame 에 반하는 영역이라 자주 꺼내지 않지만, 직접 들은 발화이므로 부인할 수는 없다)" + 기존 "태성에 대한 어머니의 안쓰러움 발화"
  - 영향: testimony 영역만 보강. w-3 character integrity 영역 정합 강화 (자기 frame vs 정확 기억 영역 분리)
- **옵션 2**: testimony['d-5'].canProve 영역에서 "정후가 더 짊어졌다" → "어머니가 정후에 대해서도 안쓰러워하는 마음을 표현했던 적이 있다" 다듬기 (w-3 frame 정합)
  - 영향: testimony 의미 약화. d-5 양측 책임축 영역에서 w-3 발화의 무게 감소. 사건 핵심 진실 영역 영향 검토
- **옵션 3**: w-3.bias / distortionRisk 영역 자체 변경 — d-5 영역만 'mixed' 명시 (그러나 schema 영역 변경 = 본 thread 영역 외 = 공통 CT thread)

### Claude 추천
**옵션 1**. testimony 영역만 보강. w-3 character integrity 영역 정합 강화 + d-5 양측 책임축 영역의 w-3 발화 무게 보존.

---

## P1-2. w-1 + w-3 cross-witness 두 채널 전달 자연성

### 발견 요약
어머니 → 박순애 → 최복순 = 간접 전달 2 채널. w-3 frame (pro_a + biased) 거쳐서 w-1 (neutral · accurate) 에 도달.

### 옵션
- **옵션 1 (Recommended)**: w-1.testimony['d-1'].canProve 영역에 간접 전달 명시
  - 현: "박순애로부터 전해 들은 어머니 평소 마음 영역 일부 (자기 관찰 영역 외 보강)"
  - 안: "박순애로부터 전해 들은 어머니 평소 마음 영역 일부 (직접 청취 영역과 분리 — 박순애의 자기 해석이 일부 섞여 있을 수 있음)"
  - 영향: w-1 testimony 만 보강. cross-channel 영역 인식 강화
- **옵션 2**: w-1 박순애 간접 전달 영역 제거 — w-1 = d-1 직접 관찰 만 (종이 읽는 장면 + 형 오기 전 발화)
  - 영향: w-1 영역 단순화. 그러나 w-1 knowledgeScope 영역의 "오랜 이웃 박순애" 영역 의도 부분 약화
- **옵션 3**: cannotDisprove 영역에 "박순애로부터 들은 영역은 직접 청취 영역 외" 명시 추가
  - 영향: cannotDisprove 영역만 보강. canProve 영역의 정확성 영역과 분리 명시 OK

### Claude 추천
**옵션 1**. canProve 영역 보강 = player 가 발화 채널 인식 영역 자연.

---

## P1-3. w-3 narrative wrapper dc-5 분기 없음

### 발견 요약
w-3.unlockedByDossier = [dc-3, dc-5]. 그러나 narrative.ts w3NarrativeTriggers = dc-3 분기만. dc-5 unlock 후 w-3 re-surface narrative 누락.

### 옵션
- **옵션 1**: narrative.ts w3NarrativeTriggers 영역에 w3-via-cascade-dc5 candidate 신설
  - 영향: narrative wrapper 영역 변경 — 직전 thread (family-01 trigger 재편성) 영역. 본 thread 영역 외 침범 가능성 검토. 만약 본 thread 영역으로 인식 시 narrativeTrigger 신설 1건 + ScriptedText ref 신설 영역 + 다국어 sync (별도 thread)
- **옵션 2 (Recommended)**: 본 thread 영역 외로 인식 + 후속 thread 안내
  - 영향: 본 thread 영역 명확. 그러나 cross-cycle 영역 narrative 갭 잔존 — 사건 후반 d-5 영역 w-3 발화 = mechanical dispute 도달 기반 surface (testimony.byDispute['d-5'] 등록 영역) 자동
- **옵션 3**: w-3.unlockedByDossier 영역 = [dc-3] 단일로 축소 (case.ts 영역만 변경)
  - 영향: w-3 의 dc-5 unlock 영역 영역 외 — d-5 영역 증언 자체는 testimony.byDispute['d-5'] 등록 영역으로 자동 surface 가능. 그러나 unlockedByDossier 의미 약화

### Claude 추천
**옵션 2**. 본 thread 영역 외 명확 + 후속 ScriptedText/다국어 thread 종료 후 narrative wrapper 영역 별도 thread 검토.

---

## P1-4. dc-3 통합 event description 시점 정합

### 발견 요약
dc-3.noteText 영역에 "공장 위기 3억원의 실체" 명시. d-3 S2 force-unlock 시 dossier surface. d-3 S2 발화 영역 forbiddenKeywords '3억원' 봉인. dossier 채널 vs 발화 채널 분리 정합 영역 확인.

### 옵션
- **옵션 1 (Recommended)**: 현재 유지 + 분리 정책 명시 강화
  - dossier 채널 (dc-3 noteText) = d-3 S2 unlock 후 surface OK. disclosure policy 그룹 2 (정후 돈 / 3억 / 통장 경유) = d-3 S2 이후 인정 가능 영역. dossier 채널 unlock = OK 영역. 발화 채널 (interrogation / contradiction_pursuit) = forbiddenKeywords 영역 으로 별도 frame inject — 두 채널 분리 정합
  - 영향: 변경 X. design 정책 자료 별도 명시 가능 (review 문서)
- **옵션 2**: dc-3.noteText 영역 시점 영역 다듬기 — "공장 위기 3억원" 단어 일부 다듬기
  - 영향: dc-3 영역 약화. disclosure policy 정합 영역 영향
- **옵션 3**: dc-3 force-unlock 시점 격상 (d-3 S3 또는 S5) — 그러나 narrative wrapper 영역 변경 (직전 thread 영역) 침범

### Claude 추천
**옵션 1**. 분리 정책 정합 영역 — 변경 X. disclosure policy 영역 별도 design 자료 명시만 권장.

---

## P1-5. e-5 surfaceDescription 메타 표현

### 발견 요약
e-5.surfaceDescription = "구체 비율은 단계 조사로 확인된다" 메타 어휘. 다른 evidence surfaceDescription 톤과 어긋남.

### 옵션
- **옵션 1 (Recommended)**: 자연 어휘 변경
  - 안: "어머니가 남긴 자필 유언장 연습본. 분배 흔적이 일부 보인다"
  - 또는: "어머니가 남긴 자필 유언장 연습본. 비율 영역의 흔적이 일부만 보인다"
  - 영향: surfaceDescription 영역만 변경. 다른 영역 무영향
- **옵션 2**: 현재 유지 (메타 명시 의도 의식)

### Claude 추천
**옵션 1**. 자연 어휘 변경.

---

## P2-1. timeline stage 0 윤정후 24세 인생 결정 자연성

### 발견 요약
20여 년 전 = 정후 약 24세. 24세 시점의 인생 무게 결정 자연성.

### 옵션
- **옵션 1**: timeline stage 0 whenLabel "20여 년 전" → "약 20년 전 (정후 20대 후반)" 다듬기 + parties.b dailyRoutine 영역 정합
  - 영향: 시점 명시 영역만 변경. parties.b.age 변경 X
- **옵션 2**: parties.b.age 영역 변경 — 44 → 46 (정후 26세 결정 영역) 또는 48 (28세 결정 영역)
  - 영향: parties.b.age 영역 변경. 다른 영역 정합 검토 필요
- **옵션 3 (Recommended)**: 현재 유지 (정후 affect_flattening + 어머니 결정 따른 영역 자연 인식 가능). 단 timeline stage 0 action 영역에 "어머니의 결정을 따라" 영역 보강

### Claude 추천
**옵션 3**. 현재 유지 + stage 0 action 영역에 "어머니의 결정에 따라" 영역 명시 (정후 24세 단독 결정 frame X / 어머니 영역 결정 frame 강화).

---

## P2-2. 어머니 통장 경유 매달 20년 영역의 어머니 인지·참여

### 발견 요약
stage 1 = 어머니 통장을 거쳐 매달. 어머니 능동 관리 영역 명시 X.

### 옵션
- **옵션 1 (Recommended)**: timeline stage 1 action 영역 보강
  - 현: "윤정후는 어머니 통장을 거쳐 매달 일정액의 정기 지원금을 보낸다. 형은 그 돈이 어머니 돈인 줄 안다. 공장 위기 시점에는 3억원도 같은 경로로 형에게 흘러간다"
  - 안: "윤정후는 어머니 통장을 거쳐 매달 일정액의 정기 지원금을 보낸다. 어머니는 이 흐름을 알면서 정후 뜻을 따라 형 쪽으로 전달한다. 형은 그 돈이 어머니 돈인 줄 안다. 공장 위기 시점에는 3억원도 같은 경로로 형에게 흘러간다"
- **옵션 2**: e-6 description 영역 보강 ("어머니 통장 경유 흐름의 능동 관리 영역 명시")
- **옵션 3**: 현재 유지

### Claude 추천
**옵션 1**. timeline stage 1 action 영역 보강. 어머니 능동 영역 = 사건 진실 영역 정합 (w-3 testimony "정후가 더 짊어졌다" 발화 영역 자연 정합).

---

## P2-3. d-1 truthDescription vs timeline stage 2 방문 빈도 어휘 정합

### 발견 요약
d-1 truthDescription "자주 방문" vs timeline stage 2 "급증" 어휘 분리.

### 옵션
- **옵션 1 (Recommended)**: d-1 truthDescription 어휘 정밀화
  - 현: "윤정후는 어머니 말년에 자주 방문하며 유서 내용을 논의했다"
  - 안: "윤정후는 어머니 말년에 (특히 공증 직전 3주간) 방문이 늘었고 유서 내용을 논의했다"
- **옵션 2**: 현재 유지

### Claude 추천
**옵션 1**. truthDescription 영역만 정밀화. timeline 영역과 어휘 정합.

---

## P2-4. w-2 (김영수) bias=neutral + accurate vs hiddenAgenda 정합

### 발견 요약
neutral·accurate vs hiddenAgenda 존재. testimony 영역 정확 전달 영역과 자기 책임 회피 영역 분리.

### 옵션
- **옵션 1 (Recommended)**: 현재 유지 (직업적 자기방어 영역 별도 / testimony 정확성 영역과 hiddenAgenda 영역 분리 정합)
- **옵션 2**: hiddenAgenda 영역 보강 — "자기 책임 영역만 선을 긋되 메모 자체는 정확 전달"

### Claude 추천
**옵션 1**. 현재 유지. hiddenAgenda 영역 의도 정합.

---

## P2-5. e-6 depthStages context 두 흐름 시점 격차

### 발견 요약
정후 입금 vs 형 출금 시점 격차 영역 명시 없음.

### 옵션
- **옵션 1**: context 영역에 시점 격차 명시
  - 안: "...같은 통장 한 곳에 모두 기록된 것이 복원된다. 정후 이름으로 들어온 입금과 어머니 통장에서 형 쪽으로 나간 출금의 시점이 며칠 사이에 거의 매번 짝을 이룬다"
- **옵션 2 (Recommended)**: 현재 유지

### Claude 추천
**옵션 2**. 현재 영역 충분. 시점 격차 영역 명시 = e-6 의 의미 영역 자연.

---

## P2-6. e-7 일기장 정보 집중 영역 자연성

### 발견 요약
한 일기장에 5 영역 (친부 / 두 아들 동등 / 정후 사전 인지 / 친자 양보 / 침묵 동기) 집중.

### 옵션
- **옵션 1 (Recommended)**: 현재 유지 (어머니의 사적 일기장 = 정보 집중 자연)
- **옵션 2**: 일기장 영역 분산 (여러 일기장 / 편지 / 메모) — 광역 변경

### Claude 추천
**옵션 1**. 현재 유지.

---

## P2-7. dc-3 noteText "d-4로 이어진다" 메타 표현

### 발견 요약
"d-4로 이어진다" 메타 어휘. 게임 자연 표현 영역 검토.

### 옵션
- **옵션 1 (Recommended)**: 메타 어휘 다듬기
  - 현: "형이 모르게 한 결정의 동기가 d-4로 이어진다"
  - 안: "형이 모르게 한 결정의 동기는 가족 기록 영역으로 이어진다"
- **옵션 2**: 현재 유지

### Claude 추천
**옵션 1**. 메타 어휘 다듬기.

---

## P2-8. dc-5 challenges.b q2 양측 책임 인정 시점 정합

### 발견 요약
dc-5 = linkedParty 'b'. b.q2 = "두 형제 모두" 양측 책임 인정 발화.

### 옵션
- **옵션 1 (Recommended)**: 현재 유지 (양측 책임 인정 영역 d-5 의 핵심 / B challenge 영역 자연)
- **옵션 2**: q2 영역 다른 영역 (B 단독 책임) — d-5 영역 약화

### Claude 추천
**옵션 1**. 현재 유지.

---

## P2-9. combine-9 (stmt-a-heir + e-7) → dc-5 자연성

### 발견 요약
e-7 (출생 비밀 영역) + A 발화 = dc-5 (어머니 뜻 영역) 결합.

### 옵션
- **옵션 1 (Recommended)**: 현재 유지 (e-7 = 어머니 마음 영역 + 어머니 기록 영역 / dc-5 = 양측 책임축 영역 자연)
- **옵션 2**: combine-9 폐기

### Claude 추천
**옵션 1**. 현재 유지.

---

## P2-10. parties.b sensitivePoints "자필 연습본 비율을 줄인 책임" UI 노출 시점

### 발견 요약
uiExposure.partyB.sensitivePoints gate = 'after_any_collapse'. sensitivePoints[0] 어휘 = 자필 90:10 영역 (그룹 3 정책 d-5 S5 한정).

### 옵션
- **옵션 1**: uiExposure.fieldPolicy.partyB.sensitivePoints 영역에 requireDisputeCollapse 'd-5' 명시 추가 (schema 영역 — 본 thread 영역 외 검토)
- **옵션 2 (Recommended)**: 현재 유지 (gate 'after_any_collapse' 영역 충분 / sensitivePoints[0] 어휘 자체가 그룹 3 영역이라 노출 시점 d-5 S5 정합 자연)

### Claude 추천
**옵션 2**. 현재 유지.

---

## P2-11. dc-4 type='note' vs 다른 dossier 'derived_evidence'

### 발견 요약
dc-1/dc-2/dc-3/dc-5 = 'derived_evidence'. dc-4만 'note'.

### 옵션
- **옵션 1**: dc-4.type 'derived_evidence' 으로 일관 (현재 영역 단순화)
- **옵션 2**: 현재 유지 + 의도 명시 자료 추가 (note = 민감 봉인 영역 분류 의도)
- **옵션 3 (Recommended)**: 현재 유지 (의도된 분류) + design 자료 검토

### Claude 추천
**옵션 3**. 현재 유지 + design 자료 명시. dc-4 = 출생 비밀 봉인 영역 type 'note' 의도 정합.

---

## 종합 — Claude 추천 합산

### 변경 영역 (case.ts)

| # | 영역 | Claude 추천 |
|---|---|---|
| P0-1 | parties.b.dailyRoutine | 옵션 1 (자금 형성 영역 보강) |
| P0-2 | combine-2/combine-3 gate | 옵션 1 (gate 격상) |
| P0-3 | timeline stage 2 + parties.a.dailyRoutine | 옵션 1 (timeline 보강 + dailyRoutine 시점 분리) |
| P0-4 | timeline stage 2 + d-5 truthDescription | 옵션 1 (자필 작성 시점 명시) |
| P1-1 | w-3 testimony['d-5'].canProve | 옵션 1 (cross-frame 메타 추가) |
| P1-2 | w-1 testimony['d-1'].canProve | 옵션 1 (간접 전달 명시) |
| P1-3 | (narrative wrapper 영역) | 옵션 2 (본 thread 영역 외) |
| P1-4 | dc-3 noteText | 옵션 1 (현재 유지 + design 정책 명시) |
| P1-5 | e-5 surfaceDescription | 옵션 1 (자연 어휘 변경) |
| P2-1 | timeline stage 0 action | 옵션 3 (어머니 결정 frame 보강) |
| P2-2 | timeline stage 1 action | 옵션 1 (어머니 능동 영역 명시) |
| P2-3 | d-1 truthDescription | 옵션 1 (어휘 정밀화) |
| P2-4 | w-2 | 옵션 1 (현재 유지) |
| P2-5 | e-6 depthStages context | 옵션 2 (현재 유지) |
| P2-6 | e-7 정보 집중 | 옵션 1 (현재 유지) |
| P2-7 | dc-3 noteText 메타 | 옵션 1 (메타 어휘 다듬기) |
| P2-8 | dc-5 challenges.b.q2 | 옵션 1 (현재 유지) |
| P2-9 | combine-9 | 옵션 1 (현재 유지) |
| P2-10 | parties.b sensitivePoints UI | 옵션 2 (현재 유지) |
| P2-11 | dc-4 type='note' | 옵션 3 (현재 유지) |

### 변경 영역 합산

| 영역 | 변경 entity 수 |
|---|---|
| `parties.a.dailyRoutine` | 1 (P0-3) |
| `parties.b.dailyRoutine` | 1 (P0-1) |
| `timeline` stage 0/1/2 action | 3 (P0-3 + P0-4 + P2-1 + P2-2 — stage 0/1/2 영역 동시 변경 / stage 2 = P0-3 + P0-4 동시) |
| `disputes` d-1.truthDescription | 1 (P2-3) |
| `disputes` d-5.truthDescription | 1 (P0-4) |
| `evidence` e-5.surfaceDescription | 1 (P1-5) |
| `dossierCards` dc-3.noteText | 1 (P2-7) |
| `witnesses` w-1.testimony['d-1'] | 1 (P1-2) |
| `witnesses` w-3.testimony['d-5'] | 1 (P1-1) |
| `combinationRecipes` combine-2/combine-3 gate | 2 (P0-2) |

→ **case.ts 변경 영역 약 13 spot**. 영역별 commit 분리:
- commit 1 = P0 (자금 + dead path + 거주 + 자필 시점) 4건
- commit 2 = P1 (testimony 영역) 2건 (P1-2 + P1-1) + e-5 surface (P1-5) = 3건
- commit 3 = P2 (자연성 어휘 영역) 4건 (P2-1 + P2-2 + P2-3 + P2-7)
- commit 4 = HTML + 핸드오프

각 commit 후 tsc + qa:fast 검증.

---

## 다음 단계

1. 사용자 결정 — P0 4건 먼저 (안 1 합산 채택 / 다른 옵션 / 보류) 옵션 선택
2. P0 적용 → 검증 → commit
3. P1 결정 + 적용 → 검증 → commit
4. P2 결정 + 적용 → 검증 → commit
5. discussion-summary.html + 핸드오프 + main push
