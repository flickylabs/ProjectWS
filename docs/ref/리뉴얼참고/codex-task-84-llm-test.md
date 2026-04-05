# Codex 위임: 84건 헤드리스 LLM 플레이스루 + 심층 품질 검증

> 발신: CT
> 수신: Codex
> 일시: 2026-04-06
> 우선순위: 최상

---

## 미션

84건 전체를 헤드리스로 실행하고, 기존 20항목 자동 검증에 더해 **LLM 응답의 실질적 품질**을 검증해줘.

API 호출 가능 확인 완료. 바로 착수해.

---

## 실행 순서

### Step 1: 기존 검증 로직 범위 감사 (이미 네가 파악한 상태)

`tests/playthrough-runner.cjs`의 `validateResponse()` 20항목:
- A: 금지 표현 5종
- B: Truth Throttle 4종
- C: 호칭/조사 4종
- D: 반복/다양성 3종
- E: Hallucination 2종
- + 기존 3종 (반말, 문장 초과, deny 불일치)

### Step 2: 추가 품질 검증 레이어 설계 + 구현

기존 20항목이 못 잡는 것들을 **후처리 평가 함수**로 추가해줘:

#### F. 의미/내용 정합성

```javascript
// F1: NPC 응답이 재판관 질문에 대한 답변인지 (질문과 무관한 답 감지)
// - 재판관이 "언제 했습니까?"라고 물었는데 "저는 잘못한 게 없습니다"만 반복하면 FAIL
// - 방법: 질문의 핵심 키워드(시간/이유/사실 여부)와 응답의 연관성 체크

// F2: 이전 턴과의 모순
// - 턴 N에서 "그런 적 없습니다"라고 했���데 턴 N+2에서 "그건 제가 했습니다" (S 전이 없이)
// - 방법: deny stance에서 한 부정 표현을, 같은 stance에서 번복하는지

// F3: 사건 데이터에 없는 사실 생성 (hallucination 심화)
// - 현재 E1/E2는 시스템 거절만 감지
// - 추가: 응답에 등장하는 인물명이 case JSON의 duo/socialGraph에 없��면 CRITICAL
// - 추가: 응답에 등장하는 금액이 v2-atoms slots에 정의되지 않은 값이면 WARN
```

#### G. 호칭/경칭/어법 심화

```javascript
// G1: 재판관 질문에서 당사자 지칭 방식
// - 재판관은 반드시 "OOO 씨"로 지칭
// - "제 아내", "제 남편" 등 당사자 관점 호칭 사용 시 CRITICAL
// - (기존 C1과 유사하나, 재판관 질문 텍스트까지 검증 범위 확대)

// G2: 당사자가 재판관에게 말할 때 callTerms.toJudge 준수
// - case JSON의 callTerms.toJudge 값과 실제 응답에서 상대 언급 방식 비교
// - "제 아내"라고 해야 하는데 "세린이"라고 하면 FAIL

// G3: 경어법 일관성
// - 같은 턴 안에서 합니다체와 해요체가 섞이면 WARN
// - 합니��체 중간에 갑자기 반말이 나오면 FAIL (emotional/confess 예외)

// G4: 조사 정합성 (fixPostpositions 후에도 잔존하는 오류)
// - "이입니다", "이습니다" 패턴 잔존 → FAIL
// - "만을 " 패턴 잔존 → WARN
// - 받침 없는 글자 + "이 " (조사) → WARN
```

#### H. 단계별 정보 공개 (Truth Throttle 심화)

```javascript
// H1: S0-S1에서 구체적 인물 관계 노출
// - "재가돌봄센터 상담팀장"처럼 직함+기관 조합이 S0-S1에 나오면 CRITICAL
// - 단순 "상담사", "관계자"는 OK

// H2: S0-S1에서 사건의 핵심 결론 노출
// - anchorTruth의 핵심 문장과 유사한 내용이 S0-S1 응답에 나오면 CRITICAL
// - 방법: anchorTruth에서 핵심 동사구 추출하여 유사도 체크

// H3: S5에서 구체적 사실 포함 여부 (기존 B4 강화)
// - 금전 사건: 금액 + 인물 + 기관 최소 2개 포함
// - 비금전 사건: 핵심 행위 + 관련자 최소 1개 포함
// - 미포함 시 FAIL ("잘못했습니다"만으로 끝나면 안 됨)

// H4: 정보 공개의 점진성
// - S(N)에서 공개한 정보가 S(N-1)보다 구체적인지
// - 같은 수준의 추상성이 3턴 이상 반복되면 WARN
```

#### I. 화자 시점/주체-객체 구분

```javascript
// I1: NPC가 자신의 행위를 상대방 행위��� 말하는 경우
// - partyA의 응답인데 "상대방이 그렇게 했다"로 자기 행위를 전가하는지
// - (blame stance에서는 자연스러울 수 있으므로 stance 고려)

// I2: 1인���/3인칭 혼동
// - NPC가 자기 이름을 3인칭으로 부르면 WARN ("한지석은 그런 적 없습니다" ← 본인이)
// - NPC가 "저"/"제가" 대신 이름을 쓰면 WARN

// I3: 증인 증언에서의 화자 구분
// - 증인이 말하는데 당사자 시점의 호칭을 쓰면 FAIL
// - 증인은 addressA/addressB를 사용해야 함
```

#### J. 상황 파악 / 캐릭터 일관성

```javascript
// J1: archetype에 맞는 말투
// - avoidant인데 "단호하게 부정합니다" 식의 confrontational 톤 → WARN
// - confrontational인데 "말하기 조심스럽지만..." 식의 avoidant 톤 → WARN
// - 방법: archetype별 금지 키워��� 목록

// J2: tell 발현 빈도
// - 20턴 중 tell이 0회면 WARN (15-25% 목표)
// - tell이 5턴 연속이면 WARN

// J3: 감정 곡선 자연스러움
// - S0에서 갑자기 울먹이면 WARN
// - S5에서 여전히 강하게 부정하면 FAIL
// - 방법: stance와 응답 톤의 정합성

// J4: 비금전 사건에서 금전 표현 (기존 A1 강화)
// - "큰돈", "돈을 보내다" 같은 은유적 금전 표현까지 체크
// - 기존 A1보다 패턴 확장
```

### Step 3: 84건 실행

```bash
node tests/run-84-headless.cjs --all
```

- API 호출 간 3초 딜레이 (rate limit)
- 실패 시 해당 사건 스킵 + 에러 로그
- 트랜스크립트: tests/transcripts/{case-id}.json

### Step 4: 품질 리포트

#### 사건별 리포트
```
## {caseId} 품질 리포트
- 총 턴: 20
- 자동 검증: PASS {N}/20턴, FAIL {N}, WARN {N}
- 심층 검증: F{N} G{N} H{N} I{N} J{N}

### CRITICAL (상세)
[턴 3] H1: S1에서 "재가돌봄센터 상담팀장" 노출
[턴 15] G1: 재판관이 "제 아내에게" 사용

### FAIL (상세)
[턴 8] F2: 이전 턴 부정과 ���순 (S 전이 없이)
...
```

#### 종합 리포트
```
## 84건 종합
- PASS: {N}건 / FAIL: {N}건
- CRITICAL 분포: H1({N}), G1({N}), ...
- 카테��리별: spouse {N}/12, family {N}/12, ...

## 반복 패턴 Top 5
1. {패턴}: {N}건
2. ...
```

산출물 위치:
- 사건별: `tests/transcripts/{case-id}.json`
- 종합 리포트: `tests/84-llm-quality-report.md`

---

## 참조 파일

- `CLAUDE.md` — 프로젝트 구조
- `tests/playthrough-runner.cjs` — 기존 실행+검증 로직
- `tests/run-84-headless.cjs` — 84건 ���행 스크립트
- `docs/ref/리뉴얼참고/codex-engine-audit-report.md` — 네가 만든 엔진 감사
- `src/engine/llmClient.ts` — 모델 설정 (gpt-4o / gpt-4o-mini)

---

## 주의

- 기존 20항목 + 신규 F~J 항목 = **총 30+항목** 검증
- 신규 항목은 **완벽할 필요 없다** — 패턴 매칭 수준이면 충분. LLM으로 평가하려 하지 마.
- 84건이 오래 걸리면 카테고리 1개(spouse 12건)로 먼저 테스트 실행 → 검증 로직 확인 → 나머지 실행
- 실행 실패 사건은 스킵하고 별도 목록으로 보고
- **v2-atoms, case JSON 등 데이터 파일은 수정하지 마**
