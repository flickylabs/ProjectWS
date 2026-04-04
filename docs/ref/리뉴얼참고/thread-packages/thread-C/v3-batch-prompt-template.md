# V3 스크립트 대량 생성 — GPT Pro 세션 분리 프롬프트

> 스레드 C — 2026-04-04 (v2: 컨트롤 타워 결정 5건 반영)

---

## 세션 분할 원칙

볼륨: questionType 4 x lieState 6 x party 2 x dispute 5 = 최대 240개 beat + scriptedResponse + witness
한 세션에 모두 넣으면 품질 저하. **6개 세션으로 분할**.

```
gpt-session-C-partyA-d1d2/       ← A(한지석) dispute 1,2 beat + 해당 evidence 응답
gpt-session-C-partyA-d3d4d5/     ← A(한지석) dispute 3,4,5 beat
gpt-session-C-partyB-d1d2/       ← B(오세린) dispute 1,2 beat + 해당 evidence 응답
gpt-session-C-partyB-d3d4d5/     ← B(오세린) dispute 3,4,5 beat
gpt-session-C-dossier/           ← 18개 DossierCard scriptedResponse
gpt-session-C-witness/           ← 4명 x 3 depth 증인 증언
```

---

## 각 세션 공통 첨부 파일

1. `spouse-01.json` — 사건 데이터 (disputes, evidence, duo, socialGraph)
2. `spouse-01-v2-atoms.json` — StateUnlockAtom (truthLevel 기준선)
3. `spouse-01-tells-beats.json` — 캐릭터 tell 정의
4. `spouse-01-v3-pilot.json` — 파일럿 레퍼런스 (**이미 검증 완료**)
5. `stage3-verification-spec.md` — 검증 규칙 (GPT가 자가 검증용으로 사용)

---

## 세션 1: partyA-d1d2

```
너는 Solomon 법정 게임의 V3 BeatScript 작성 전문가다.

## 대상
- 사건: spouse-01
- 대상 파티: A (한지석, 39세, 물류센터 야간 운영팀장)
- 대상 쟁점: d-1 (비밀 송금 280만원), d-2 (세린의 새벽 휴대폰 열람 — A 관찰자 시점)
- 대상 증거: e-1, e-2 (A가 주체), e-3 (A가 대상)

## 레퍼런스
첨부한 spouse-01-v3-pilot.json의 party A beats를 참고하라.
포맷, 필드, 톤, Truth Throttle 준수 방식을 동일하게 따른다.

## 생성할 데이터: BeatScriptV3

### d-1 (A가 주체 — 방어적 응답)
아래 조합을 모두 커버:
- deny (S0-S1, none) — 범용 + fact_pursuit + empathy_approach
- hedge (S2, hint) — 범용 + motive_search
- partial (S3, partial) — 범용
- blame (S3, partial) — 범용
- emotional (S3-S4, partial) — 범용
- confession (S4-S5, full) — 범용
- evidence_hit (e-1, S2-S3, hint)
- evidence_hit (e-2, S3-S4, partial)

### d-2 (A는 관찰자 — 공격/관찰 반응)
- deny (S0-S1, none) — "제 폰을 열었다는 건 따로 문제입니다" 류
- hedge (S2, hint) — 상대 행위를 지적하면서도 자기 잘못을 인식
- 최소 2-3개

### 각 beat 규칙
- alternatives 최소 2개
- truthLevel 필수 기재
- 한지석의 tell 반영: over_precision(숫자 정밀), counter_question(되묻기), timeline_padding(동선 늘어놓기)
- 호칭: toPartner="자기", toJudge="제 아내", angry="오세린 씨!"

### d-1, d-2 관련 investigationStage scriptedNpcResponses
- e-1: stage 0~2에 대한 A 응답 (subjectParty=a)
- e-2: stage 0~2에 대한 A 응답 (subjectParty=a)
- e-3: stage 0~2에 대한 A 응답 (subjectParty=both → A 시점)

## Truth Throttle 규칙 (절대 위반 금지)

| truthLevel | 허용 state | 금지 요소 |
|-----------|-----------|----------|
| none | S0, S1 | 기관명, 인물직함, 서비스명, 대상자 실명, **구체적 금액** ([\d,]+원, \d+만원) |
| hint | S2 | 위와 동일. "가족 일"/"개인 사정" 수준까지만. **금액도 금지** |
| partial | S3 | 행위 인정 가능. 기관 정식명칭/대상자 실명 금지. **금액은 허용** |
| full | S4, S5 | 모두 허용 |

### applicableStates ↔ truthLevel 엄밀 규칙

```
applicableStates에 S0 또는 S1 포함 → truthLevel 반드시 "none"
applicableStates 최저가 S2          → truthLevel 최대 "hint"
applicableStates 최저가 S3          → truthLevel 최대 "partial"
applicableStates 최저가 S4/S5       → truthLevel 최대 "full"

위반 예: ["S2","S3"] + "partial" → FAIL (S2에선 hint까지만)
정상 예: ["S3"] + "partial" → OK
```

### 금액 숨김 규칙 (결정 5)

- truthLevel "none"/"hint" 대사에서 구체적 금액 절대 금지
  - 금지: "280만원", "2,800,000원", "150만원" 등
  - 허용: "상당한 금액", "적지 않은 돈", "큰돈" 등 모호 표현
- over_precision tell은 **시각/절차 정밀**로 대체
  - 허용: "14시 03분", "9월 20일" 등 시간 정밀
  - 금지: 금액 정밀 ("2,800,000원 딱")
- truthLevel "partial" 이상에서는 금액 허용

## 출력 형식
spouse-01-v3-pilot.json의 beatScriptsV3 배열과 동일한 JSON 구조.

## 자가 검증 체크리스트
출력 전 반드시 확인:
- [ ] S0-S1 대사에 금지어가 없는가?
- [ ] none/hint 대사에 구체적 금액([\d,]+원, \d+만원)이 없는가?
- [ ] applicableStates 최저 state와 truthLevel이 매칭되는가?
- [ ] partial beat의 applicableStates에 S2가 포함되어 있지 않은가?
- [ ] 모든 beat에 alternatives 2개 이상인가?
- [ ] over_precision tell이 금액이 아닌 시각/절차 정밀로 표현되어 있는가?
- [ ] evidence_hit에 afterEvidence가 정확히 기재되어 있는가?
```

---

## 세션 2: partyA-d3d4d5

```
[위 세션 1과 동일한 프레임. 차이점:]

## 대상
- 대상 쟁점: d-3 (최민정은 외도 상대인가 — A 방어), d-4 (세린의 우회 송금 — A 관찰자), d-5 (약속 위반 — A 당사자)
- 대상 증거: e-4 (A가 주체), e-5/e-6 (A 관찰자)

### d-3 (A가 오해의 당사자 — 방어)
- deny, hedge, partial, evidence_hit(e-3, e-4)

### d-4 (A는 관찰자 — 충격/공격)
- deny, hedge 최소 2개

### d-5 (A가 공동 당사자)
- deny, partial, blame, emotional, confession
```

---

## 세션 3: partyB-d1d2

```
[세션 1 미러. 차이점:]

## 대상
- 대상 파티: B (오세린, 36세, 프리랜서 플로리스트)
- 대상 쟁점: d-1 (비밀 송금 — B 관찰자/피해자), d-2 (새벽 폰 열람 — B 주체)

### 오세린 tell 반영
- evidence_waving: 캡처 흔들며 결론부터
- motive_jump: 행동→의도 단정
- selective_quote: 약한 고리만 반복
- 호칭: toPartner="자기", toJudge="제 남편", angry="한지석 씨!"
```

---

## 세션 4: partyB-d3d4d5

```
[세션 2 미러. B 시점.]
```

---

## 세션 5: dossier (DossierCard scriptedResponse)

```
너는 Solomon 법정 게임의 DossierCard scriptedResponse 작성 전문가다.

## 대상
spouse-01의 dossierCards 3개, 질문 총 18개

## 규칙
카드 질문은 "정답"이다. NPC도 상당히 인정하는 반응이어야 한다.
단, truthLevel은 질문의 requiredLieState에 대응:

| requiredLieState | scriptedResponse.truthLevel |
|-----------------|---------------------------|
| 없음 (q1) | hint |
| S2 (q2) | partial |
| S3 (q3) | full (고정) |

## 출력 형식
{ "질문ID": { "npcResponse": "...", "behaviorHint": "...", "truthLevel": "..." } }

## 자가 검증
- [ ] q1의 truthLevel이 모두 "hint"인가?
- [ ] q2의 truthLevel이 모두 "partial"인가?
- [ ] q3의 truthLevel이 모두 "full"인가? (full 고정!)
- [ ] hint 응답에 금지어가 없는가?
- [ ] hint 응답에 구체적 금액([\d,]+원, \d+만원)이 없는가?
- [ ] NPC가 "인정"하는 톤인가? (단순 부정 X)
```

---

## 세션 6: witness (증인 scriptedTestimonies)

```
너는 Solomon 법정 게임의 증인 증언 스크립트 작성 전문가다.

## 대상
spouse-01의 증인 4명:
- tp-1: 오미숙 (세린의 어머니) — pro_b, 훈계 톤
- tp-2: 이재훈 (지석의 직장 동료) — pro_a, 조심스러운 톤
- tp-3: 최민정 (재가돌봄센터 상담팀장) — neutral/institutional, 사무적 톤
- tp-4: 정우성 (세린의 대학 동기) — neutral, 편한→존댓말 전환

## depth별 규칙

| depth | truthLevel | 내용 수준 |
|-------|-----------|----------|
| vague | hint | 모호하고 조심스러운. 핵심 사실 노출 금지. |
| partial | partial | 핵심 일부 공개. 기관 증인만 기관명 사용 가능. |
| full | full | 알고 있는 전부. 구체적 사실/이름/시각 모두 가능. |

## 증인별 특수 규칙
- tp-1 (오미숙): 딸 편이면서도 객관적으로 보이려 함. full에서 양쪽 다 안쓰러워함.
- tp-2 (이재훈): 본인 평판 걱정. partial에서 "기관" 수준, full에서 "장모님 간병" 구체적.
- tp-3 (최민정): 기관 증인이므로 partial에서도 "간병 예약"/"상담" 등 업무 사실 허용.
  단, partial에서 대상자 실명(오미숙)은 개인정보로 보류 → full에서만.
- tp-4 (정우성): hiddenAgenda 없음. partial에서 "급한 돈" 수준, full에서 "동생 월세 석 달".

## 출력 형식
spouse-01-v3-pilot.json의 witnessScriptedTestimonies와 동일.
```

---

## 83건 확장 시 배치 순서

spouse-01이 파일럿으로 완성되면, 나머지 83건은 카테고리별 배치:

| 배치 | 카테고리 | 건수 | 세션수 |
|------|---------|------|-------|
| 1 | spouse-02~12 | 11 | 11 x 6 = 66 세션 |
| 2 | family-01~12 | 12 | 72 |
| 3 | friend-01~12 | 12 | 72 |
| 4 | neighbor-01~12 | 12 | 72 |
| 5 | workplace-01~12 | 12 | 72 |
| 6 | partnership-01~12 | 12 | 72 |
| 7 | tenant-01~12 | 12 | 72 |
| 8 | 검수 + 누락 보충 | - | - |

각 배치에서 GPT에 전달:
1. 이 프롬프트 (세션별 프레임 고정)
2. spouse-01 파일럿 (고정 레퍼런스)
3. stage3-verification-spec.md (검증 규칙)
4. 해당 사건 JSON + tells-beats + v2-atoms (가변)
5. **사건별 금지어 목록** — 각 사건의 anchorTruth에서 추출

---

## 사건별 금지어 자동 추출 규칙

각 사건의 `anchorTruth`에서 다음을 추출하여 none/hint 금지어로 설정:
- 기관/회사/단체 정식 명칭
- 인물의 직함/역할
- 서비스/상품 명칭
- 대상자 실명
- 구체적 금액 용처 (금액 자체가 아니라 "무엇에 쓴 돈인지")
- **구체적 금액** ([\d,]+원, \d+만원) — none/hint에서 금지, partial 이상에서 허용
