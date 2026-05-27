# friend-01 narrative integrity review — proposals

> `review-findings.md` 28건 항목별 권장 안 + reasoning + 적용 영역. 사용자 결정 받은 후 case.ts 수정 적용.

**원칙**:
- 영역이 큰 변경 (사건 진실 자체 / 책임 분배) = P0/P1 = 사용자 결정 필수
- 영역이 작은 변경 (description 1줄 추가 / 표기 통일) = P2/P3 = 권장 안 일괄
- 변경 영역 = case.ts 중심. ScriptedText / narrative.ts / 다국어 영역 외 (별도 thread 안내)

---

## P0 — 사건 진실 자체 모순 (3건)

### F-01. A 아버지 character 동기 명시
**권장 = F-01-B** (timeline stage 0 description 에 동기 frame 1~2 줄 추가)

**Reasoning**:
- F-01-A (유지): 사건 anchorTruth 핵심 영역 (사기 패턴 반복) 의 driver character 가 입체성 없으면 사건 자체 개연성 약화.
- F-01-C (별도 schema 신설): 변경 영역 큼 + 다른 사건 (spouse-01 / family-01) 영역 영향 가능 → 공통 CT 영역.
- F-01-B (description 보강): timeline stage 0 영역의 자연 확장. 새 schema 없이 frame 명시.

**변경 안**:
- timeline stage 0 description 추가: 「최수민 부모가 운영한 작은 사업장이 어려움을 겪던 시기, 친분이 있던 송다은 아버지가 투자 명목으로 돈을 빌렸다. (또는 사용자 결정 frame)」
- 또는 사용자 결정 frame 으로 1~2 줄.

### F-02. Timeline stage 0 — A 아버지 ↔ B 직접 돈 거래 자연성
**권장 = F-02-B** (두 가족 사전 관계 frame 1줄 추가)

**Reasoning**: F-01 과 통합 가능. stage 0 description 에 「두 가족 사전 관계」 frame + A 아버지 동기 frame 함께 명시.

**변경 안**: F-01 의 변경과 통합. timeline stage 0 description = 「두 가족 사전 관계 + A 아버지 동기 + 5년 전 사건」 frame 으로 1~2 줄 보강.

### F-03. B 의 9일간 우회 경고 행동 영역 자연성
**권장 = F-03-C** (timeline stage 4 description 에 B 동기 frame 강화) + F-18 통합

**Reasoning**:
- F-03-A (유지): 사용자 player frame 답 영역 미흡.
- F-03-B (verbalTells 추가): character verbalTells = 일상 frame 영역, 위기 영역과 다른 layer.
- F-03-C (description 강화): timeline + e-1 description 영역에 「평소와 다른 적극 행동 동기」 frame 명시 = 가장 자연.

**변경 안**:
- timeline stage 4 description 추가: 「최수민은 평소처럼 조용히 사라지는 방식 대신, 결혼이 무너질 수 있다는 위기감으로 평소와 다르게 9일간 반복 연락했다.」
- F-18 (B archetype 정합) 과 통합.

---

## P1 — 책임 분배 / 진실 노출 정책 (6건)

### F-04. d-2 correctResponsibility A:20 / B:80 — 예비신랑 책임 영역
**권장 = F-04-C** (case.ts 주석 명시) **+ 사용자 결정 필수**

**Reasoning**:
- F-04-A (유지): 책임 frame 의미 불명확 → player frame 충돌.
- F-04-B (A:30/B:70 보정): A 의 모른 채 단정 책임 = 다른 dispute (d-5) 영역에 더 가까움. d-2 = 「예비신랑 선 넘기」 진실 영역에서 두 당사자 정직 책임은 B 가 다은에게 직접 말 안 한 영역이 큼.
- F-04-C (주석 명시): correctResponsibility frame 정책 명확화 — 「두 당사자 정직 책임. 3rd party (예비신랑) 책임은 별도 영역」.

**변경 안**: disputes 영역 상단 주석 또는 d-2 영역 주석으로 「correctResponsibility = 두 당사자 정직 책임. 3rd party 책임은 officialRecordRecommendations 영역」 명시. F-12 / F-23 통합.

### F-05. d-4 correctResponsibility A:30 / B:70 — A 아버지 행위 책임 frame
**권장 = F-05-A** (현재 유지) **+ F-04-C 통합** **+ 사용자 결정 필수**

**Reasoning**:
- F-05-A (유지): 두 당사자 정직 책임 frame 으로 자연. B (피해자) 가 정직 책임 더 큰 영역 = 「말하지 못한 침묵」영역 (10년 영향 frame).
- F-05-B (A:50/B:50 보정): A 아버지 행위 책임 명확화 — 단 책임 frame 의미 약화 (B 정직 책임 영역).
- F-05-C: F-04-C 와 통합.

**변경 안**: d-4 case.ts 영역 변경 X. F-04-C 의 주석으로 통합 처리.

### F-06. d-3 quadrant = 'b_only' vs A S2/S3 인지 영역
**권장 = F-06-C** (b_only 유지 + truthDescription 에 「A 는 알면서 모른 척」 frame 명시) **+ 사용자 결정**

**Reasoning**:
- F-06-A (유지): b_only frame 으로 LLM 진술 영역 처리 — 단 frame 충돌 영역.
- F-06-B (both_know 변경): schema 영역 변경 — LLM frame inject 영역 영향.
- F-06-C (b_only 유지 + truthDescription 보강): schema 영역 유지 + 사건 진실 frame 「A 는 알면서 모른 척」 명시 = 자연.

**변경 안**: d-3 truthDescription 보강: 현재 「송다은 아버지가 예비신랑에게 결혼 자금 명목으로 접근을 시도하려 하고 있었고, 최수민은 과거에 같은 일을 당한 적이 있어 결혼 자체가 위기에 빠질까 봐 예비신랑에게 직접 연락해 막으려 했다.」 → 추가: 「**송다은은 아버지의 흐름을 알면서도 모른 척했다.**」 또는 사용자 결정 frame.

### F-07. w-1 김세라 hiddenAgenda 시점 자연성
**권장 = F-07-B** (knowledgeScope 보강)

**Reasoning**:
- F-07-A (유지): 시점 frame 미흡.
- F-07-B (knowledgeScope 보강): 「사건 진행 중 진실 인지 후 찜찜함 확산」 frame 1줄 추가 = 자연.
- F-07-C (testimony 영역 추가): testimony.byDispute 는 「쟁점별 증언」 영역, 시점 frame 은 knowledgeScope 영역이 더 자연.

**변경 안**: w-1 knowledgeScope 추가: 「단톡방에서 송다은의 글을 보고 최수민을 비난하는 데 동조했다. 사건이 본 법정으로 넘어가면서 진실 일부가 드러난 뒤로 본인이 동조한 책임이 부끄러워졌다.」

### F-08. B 손절 결정 「돈 문제」 frame 자연성
**권장 = F-08-B** (timeline + e-3 description 보강)

**Reasoning**:
- F-08-A (유지): A 단정 frame 자연성 미흡.
- F-08-B (description 보강): 「A 가 평소 B 의 회피 패턴을 변심으로 단정」 frame 명시 = 자연.
- F-08-C (depthStages 보강): description 영역 보강이 더 직접적.

**변경 안**:
- timeline stage 1 aPerception 보강: 「'넌 돈만 엮이면 사람이 달라진다'고 답하며 변심으로 단정한다.」 → 추가 frame: 「**평소 최수민이 어려운 얘기를 우회로 처리하는 패턴을 변심으로 단정하는 습관**」
- 또는 e-3 description 보강 — 「최수민의 짧은 한 마디가 송다은의 평소 단정 습관과 만나 변심으로 받아들여진 대화 기록」.

### F-09. A 아버지 결혼 3주 전 동일 패턴 반복 시점 자연성
**권장 = F-01 / F-02 통합** (F-09-B + F-01-B + F-02-B 모두 timeline 보강으로 통합)

**Reasoning**: F-01, F-02 와 동일 영역 (A 아버지 character 동기). 통합 처리.

**변경 안**: timeline stage 0 + stage 3 description 에 A 아버지 character 동기 frame 통합 명시.

---

## P2 — 자연성 / character 일관성 (10건)

### F-10. Timeline stage 2~3 B 인지 경로 미명시
**권장 = F-10-B** (stage 3 description 보강)

**변경 안**: timeline stage 3 description 추가: 「최수민은 박준혁(예비신랑 회사 후배 + 본인 필라테스 수강생)을 통해 우연히 이 흐름을 알게 된다.」

### F-11. A 단톡방 매도 즉각성 + 친구 동조 즉각성
**권장 = F-11-B** (e-2 depthStages.original 보강)

**변경 안**: e-2 depthStages.original 추가 frame: 「**김세라 등 1~2명이 즉각 동조 + 나머지 친구는 침묵하는 그룹 분위기**」.

### F-12. 예비신랑 김태윤 character 입체성 + 사건 종결 frame
**권장 = F-12-B** (officialRecord 추가) **+ F-23 통합**

**변경 안**: officialRecordRecommendations 에 항목 1줄 추가: 「예비신랑 김태윤의 선 넘는 접근 + 회사 단톡방 떠벌림 영역의 책임은 본 사건 외 별도 정리 권고.」

### F-13. w-2 박준혁 이중 관계 + B 에게 알리는 동기
**권장 = F-13-B** (knowledgeScope 보강)

**변경 안**: w-2 knowledgeScope 추가: 「회사에서 예비신랑이 떠벌린 이야기를 우연히 듣고 최수민에게 알린 적이 있다. **결혼 자체가 위태로워 보였고, 필라테스 수강생으로 더 가까운 관계였기에 회사 영역을 넘어서라도 알릴 수밖에 없다고 판단했다.**」

### F-14. w-3 오미경 5년 전 장면 기억 자연성
**권장 = F-14-B** (knowledgeScope 보강)

**변경 안**: w-3 knowledgeScope 추가 frame: 「**송다은 아버지가 평소 단골이라 가게 앞에서의 돈 요구 장면이 강한 인상으로 남았다.**」

### F-15. dc-1.b.q1 ↔ dc-5.b.q1 frame 동일 (mirror vs 중복)
**권장 = F-15-B** (dc-5.b.q1 frame 변경)

**변경 안**: dc-5.b.q1 변경: 「이번에도 스스로 악역이 되면 같은 낙인이 반복된다는 걸 알면서, 왜 끝까지 혼자 버텼습니까?」 → 「**두 시점 모두 혼자 막으려 한 행동이 결국 송다은을 또 한 번 무너뜨리는 결과로 이어졌다는 점은 어떻게 받아들이고 있습니까?**」 (반복 구조 + 결과 frame 으로 dc-1 과 분화).

### F-16. e-6 5년 전 자료 B 보존 자연성
**권장 = F-16-A** (현재 유지) — 사기 피해 자료 보존 = 일반적 정황으로 자연

### F-17. e-5 회사 동료 실명 봉인 = w-2 박준혁 본인 영역
**권장 = F-17-B** (sensitiveSealTargets.labels 명확화)

**변경 안**: e-5 sensitiveSealTargets.labels 변경: `'회사 동료 실명'` → `'**예비신랑 회사 다른 동료 실명 (박준혁 외)**'`

### F-18. B archetype + 9일간 적극 우회 정합
**권장 = F-03-C 통합** — timeline stage 4 description 보강으로 통합 처리

### F-19. 9일간 연락 내용 frame 모호성
**권장 = F-19-B** (timeline stage 4 또는 e-1 depthStages 보강)

**변경 안**: e-1 depthStages.context 추가 frame: 「**최수민의 우회 frame ('다은이 관련' / '예전에 같은 일') 이 예비신랑이 자기 frame 으로 해석하기 좋은 모호성으로 작용한 흐름**」

---

## P3 — 디테일 / 정합 (9건)

### F-20. dc-5 leadLine 미정의
**권장 = F-20-B** (leadLine 신설)

**변경 안**: dc-5 leadLine 추가:
```typescript
leadLine: {
  id: 'L-5',
  name: ko('Synthesis Lead'),
  leadType: 'Synthesis', // 또는 'Timeline' (다시 사용)
  firstInputs: ['e-2', 'e-7'],
  secondInputs: ['L-5', 'dc-4'],
  interpretationChoices: [...]
}
```

**검토**: leadType `Synthesis` 가 schema 영역에 정의되어 있는지 + 다른 사건 (spouse-01 / family-01) 영역 사용 사례 검토 필요. 없으면 `Timeline` 재사용.

### F-21. truthTable t-5 weight=8
**권장 = F-21-C** (case.ts 주석 명시) — 의도된 차별 (절차 책임 영역)

**변경 안**: t-5 직전 주석: 「t-5 weight=8 (다른 t-1~t-4 = 10). 절차/매도 책임 = 실체 진실 frame 보다 가벼움 영역 의도.」

### F-22. 「예비 신랑」 vs 「예비신랑」 표기 일관성
**권장 = F-22-B** (검색 + 통일)

**변경 안**: grep 검색 후 발견 시 「예비신랑」 으로 통일.

### F-23. 김태윤 실명 영역 + 사건 종결 frame
**권장 = F-12 통합** (F-12-B 와 함께 처리)

### F-24. e-1 ↔ e-4 출처 분리
**권장 = F-24-A** (현재 유지) — 정독 결과 정합

### F-25. e-1 / e-4 / e-5 9일간 영역 중첩 정합
**권장 = F-25-A** (현재 유지) — 각 evidence 의 frame 분리 자연

### F-26. anchorTruth 다층 진실 disclosure tier
**권장 = F-26-A** (현재 유지) — disclosure tier 정합

### F-27. e-7 provenance='self_possessed' vs trustStates "본 법정 정리"
**권장 = F-27-C** (공통 CT thread 안내) **+ 사용자 결정**

**Reasoning**: provenance schema 변경 = 다른 사건 영향. 공통 CT 영역.

**변경 안**: 본 thread 변경 X. 공통 CT thread 에 「`court_compiled` provenance type 신설 검토 — friend-01 e-7 / spouse-01 등 본 법정 정리 자료 영역」 안내.

### F-28. truthLeakOverride.perDispute 비움 정책 정합
**권장 = F-28-A** (현재 유지) — 정책 정합

---

## 변경 영역 종합 (사용자 결정 후 적용)

### 1차 commit (timeline + character 영역) — case.ts
- F-01 + F-02 + F-09 통합: timeline stage 0 description 보강 (A 아버지 동기 + 두 가족 사전 관계)
- F-03 + F-18 통합: timeline stage 4 description 보강 (B 위기 동기)
- F-08: timeline stage 1 aPerception 보강 + e-3 description 보강
- F-10: timeline stage 3 description 보강

### 2차 commit (책임 분배 frame 정책) — case.ts
- F-04 + F-05 + F-23: disputes 영역 또는 d-2 / d-4 주석 명시 (correctResponsibility = 두 당사자 정직 책임 frame)
- F-12: officialRecordRecommendations 1줄 추가

### 3차 commit (dispute / evidence / witness 보강) — case.ts
- F-06: d-3 truthDescription 보강
- F-07: w-1 knowledgeScope 보강
- F-11: e-2 depthStages.original 보강
- F-13: w-2 knowledgeScope 보강
- F-14: w-3 knowledgeScope 보강
- F-17: e-5 sensitiveSealTargets.labels 변경
- F-19: e-1 depthStages.context 보강

### 4차 commit (단서 + truthTable 영역) — case.ts
- F-15: dc-5.b.q1 변경
- F-20: dc-5 leadLine 신설
- F-21: t-5 주석 명시
- F-22: 「예비신랑」 표기 통일

### 5차 commit (자료 + HTML + 핸드오프)
- discussion-summary.html 시각화
- 핸드오프 메모리

### 공통 CT thread 안내 (본 thread 변경 X)
- F-27: provenance `court_compiled` type 신설 검토

### 다음 thread 안내 (별도 진입)
- ScriptedText 영역 영향 (dc-5.b.q1 / d-3 truthDescription) — 별도 thread
- 다국어 sync — 별도 thread
