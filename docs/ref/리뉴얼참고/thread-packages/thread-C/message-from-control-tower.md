# 컨트롤 타워 → 스레드 C 전달

> 일시: 2026-04-04
> 건: 설계 결정 확정 + 금액 패치 요청 + 잔여 작업 안내

---

## 1. 설계 결정 회신 (3건 요청 → 4건 확정)

### 결정 1: Truth Throttle ↔ applicableStates 매핑
**승인. 83건 동일 적용.**
```
S0/S1 포함 → none만
S2 최저    → hint까지
S3 최저    → partial까지
S4/S5 최저 → full까지
```
이 규칙을 83건 배치 프롬프트 + 검증 자동화에 그대로 사용하라.

### 결정 2: S2에서 partial beat 불가
**(A) 현행 유지. S2 = hedge(hint)까지만.**
- S2 전용 partial beat 추가하지 않음
- hedge의 alternatives + questionType 분기로 다양성 확보
- 단, Thread E 테스트에서 S2 다양성이 부족하다고 판명되면 재논의 예정

### 결정 3: DossierCard q3 = full 고정
**q3은 "full" 고정. "partial~full" 범위가 아님.**
- q1=hint, q2=partial, q3=full
- 83건 배치 프롬프트에 이 기준을 명시하라

### 결정 4: 기관 증인 partial 예외
**승인. 83건 동일 적용.**
- institutional 증인은 partial에서 자기 업무 범위 사실 공개 허용
- 대상자 실명은 full에서만

---

## 2. 추가 확정: V3 금액 숨김 (결정 5)

**V3 BeatScript에서도 구체적 금액을 숨긴다.**

### 규칙
- truthLevel "none" 또는 "hint"인 대사에서 구체적 금액 금지
  - 금지 패턴: `2,800,000원`, `280만원`, `150만원`, `[\d,]+원`, `\d+만\s*원`
- over_precision tell은 **시각/절차 정밀**로 대체
  - 허용: "14시 03분", "9월 20일", "물류 마감 끝나고" 등
  - 금지: "2,800,000원", "280만원" 등
- truthLevel "partial" 이상에서는 금액 허용
- truthLevel "full"에서는 모두 허용

### 즉시 작업: spouse-01 파일럿 금액 패치

다음 6개 세션 output 파일에서 truthLevel이 "none" 또는 "hint"인 대사(line + alternatives)에 구체적 금액이 있으면 교체:

```
session-1: partyA-d1d2.json
session-2: spouse-01-partyA-d3d4d5-v3.json
session-3: spouse-01-session-partyB-d1d2.json
session-4: spouse-01-partyB-d3d4d5-v3.json
session-5: spouse-01-dossier-scripted-responses.json
session-6: spouse-01-witness-scriptedTestimonies.json
```

교체 기준:
- "2,800,000원" / "280만원" → "상당한 금액" 또는 "적지 않은 돈" 또는 문맥에 맞는 모호 표현
- "150만원" → "적지 않은 돈" 또는 문맥에 맞는 표현
- 단, 같은 파일 내에서 같은 대체 표현이 3회 이상 반복되지 않도록 다양하게
- 교체 후 대사의 자연스러움과 over_precision tell의 느낌이 유지되는지 확인

### 83건 배치 프롬프트 업데이트

`v3-batch-prompt-template.md`의 Truth Throttle 규칙 표에 금액 규칙을 추가:

```
| truthLevel | 허용 state | 금지 요소 |
|-----------|-----------|----------|
| none | S0, S1 | 기존 금지어 + 구체적 금액([\d,]+원, \d+만원) |
| hint | S2 | 기존 금지어 + 구체적 금액 |
| partial | S3 | 기존 금지어 (금액은 허용) |
| full | S4, S5 | 모두 허용 |
```

---

## 3. 잔여 작업 순서

| 순서 | 작업 | 상태 |
|------|------|------|
| 1 | **spouse-01 금액 패치** | 즉시 착수 |
| 2 | **v3-batch-prompt-template.md 금액 규칙 추가** | 패치와 함께 |
| 3 | Thread E 테스트 대기 | E가 Stage 1-3 통과 후 |
| 4 | 엔진 연결 (v3GameLoopLoader 확장) | 테스트 통과 후 |
| 5 | 83건 V3 GPT 배치 시작 | 엔진 연결 + 템플릿 확정 후 |

### 엔진 연결 상세 (순서 4)
Thread E 통과 후 진행. 현재는 참고만:
- `v3GameLoopLoader.ts`에 BeatScriptV3 로더 추가 (questionType/alternatives 순환 로직)
- `getFallbackBeat` 확장 (truthLevel 검증 + alternatives 순환)
- `resolveDossierQuestion`에서 scriptedResponse 반환
- `witnessEngine`에서 scriptedTestimonies depth별 조회

---

## 4. 새 설계 아이디어 (참고, 향후 구현)

컨트롤 타워에서 다음 아이디어가 나왔다. 지금 당장 구현하지 않지만, 83건 배치 시 데이터 구조에 영향을 줄 수 있으니 인지하라:

1. **DossierCard q3 극적 효과** — q3에서 NPC가 전면 인정할 때 시스템 메시지/이벤트 씬 추가
2. **증인 심문 메커닉** — 증인이 자동으로 증언하지 않고, 단계별 질문 선택지를 통해 정답을 뽑아내는 과정
3. **기관 증인 소환 게이팅** — 관련 dispute 진실이 일정 수준 밝혀진 시점에 소환 가능
