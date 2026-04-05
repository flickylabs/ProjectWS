# Thread E → CT: 84건 헤드리스 + GPT Pro 품질 분석 결과 보고

> 발신: Thread E (통합 테스트)
> 수신: 컨트롤 타워
> 일시: 2026-04-06
> 건명: 84건 헤드리스 플레이스루 + GPT Pro 7세션 품질 분석 결과

---

## 1. 실행 결과 요약

84건 × 20턴 = 1,680턴 헤드리스 플레이스루 실행 후, GPT Pro 7세션에서 카테고리별 품질 분석을 수행했습니다.

### 자동 검증 (playthrough-runner 내장)

| 카테고리 | PASS | WARN | ERR |
|----------|------|------|-----|
| spouse | 240 | 0 | 0 |
| family | 237 | 3 | 0 |
| friend | 239 | 1 | 0 |
| neighbor | 240 | 0 | 0 |
| partnership | 238 | 2 | 0 |
| tenant | 238 | 2 | 0 |
| workplace | 239 | 1 | 0 |
| **합계** | **1,671** | **9** | **0** |

자동 검증 단독으로는 WARN 9건(0.54%)으로 양호했습니다.

### GPT Pro 심층 분석 (사람 관점 재판정)

| 세션 | 카테고리 | PASS | FAIL | CRITICAL |
|------|----------|------|------|----------|
| S1 | spouse | 3 | 9 | 2 |
| S2 | family | 4 | 8 | 2 |
| S3 | friend | 6 | 6 | 9 |
| S4 | neighbor | 4 | 8 | 5 |
| S5 | partnership | 7 | 5 | 2 |
| S6 | tenant | 7 | 5 | 3 |
| S7 | workplace | 0 | 12 | 8 |
| **합계** | **31 (37%)** | **53 (63%)** | **31** |

**자동 검증과 GPT Pro 판정의 괴리가 큽니다.** 자동 검증은 반말종결어미·문장수 정도만 잡지만, 실제 플레이어 관점 품질(Truth Throttle 위반, hallucination, S5 미완결, 번역체)은 놓치고 있습니다.

---

## 2. 근본 원인 5가지

### 원인 1: 프롬프트 예시 하드코딩 (영향: ~8건 CRITICAL)

`playthrough-runner.cjs`의 `buildPrompt()` 안에 spouse-01 기반 예시가 박혀 있습니다:
```
[deny/S1 회피형+over_precision] "14시 03분에 제 폰에서 나간 건 맞습니다"
[hedge/S2] "집안에 급한 일이 생겨 먼저 움직였습니다"
```

이 예시가 **비금전 사건(neighbor, workplace)에서도 LLM이 "송금", "적지 않은 돈"을 모방**하게 만듭니다.

- spouse-07 (육아 공로 사건에 "송금" 삽입)
- neighbor-07 (잠금함 분쟁에 "송금한 건 사실" 삽입)
- workplace-01/07/09/10 (성과 평가 사건에 "금액", "송금" 삽입)
- partnership-04/07 (편집 거래/누설 사건에 "송금" 삽입)

### 원인 2: 재판관 질문 조사 오류 (영향: ~10건 FAIL)

`generateScenario()`에서 증거 질문을 자동 생성할 때:
```javascript
question: `${name} 씨, 이 ${evidence.surfaceName}를 보시고 설명해 주십시오.`
```

surfaceName이 받침으로 끝나면 "를" → "을"이어야 하는데, 무조건 "를"을 붙이고 있습니다.
- "기록**를**", "묶음**를**", "메일**를**", "내역서**를**" 등

### 원인 3: v2-atoms 빈약 → 시스템 거절/프롬프트 누출 (영향: ~4건 CRITICAL)

일부 사건의 v2-atoms가 특정 dispute/state 조합에서 빈약하여 LLM이 맥락을 잃고:
- "I'm sorry, I can't assist with that request." (family-06)
- "이전 턴의 지시서를 다시 제공해..." (family-05)
- "죄송합니다, 제가 데이터를 더 제공할 수 없습니다." (tenant-06)
- "구체적인 정보를 제공해 주시면..." (tenant-09)

### 원인 4: S5 confess 구체성 부족 (영향: ~12건 FAIL)

S5 도달 후에도 "잘못했습니다" 수준에 머물고, 금액/인물/기관/용도 전체를 펼치지 못하는 사건이 다수.
- confess 프롬프트 지시가 "표현 재료의 구체적 이름/금액/기관명을 반드시 사용하라"로 되어 있지만, atoms의 S5 privateKnowledge가 감정 위주인 사건에서 효과 부족

### 원인 5: 번역체/공문서체 잔존 (영향: ~15건 WARN~FAIL)

"~수밖에 없었습니다", "제 불찰", "문의를 드린 것이었고", "해당 건에 대하여" 등이 반복.
현재 프롬프트에 금지 표현이 있지만, LLM이 여전히 생성하는 패턴이 있음.

---

## 3. Thread E의 수정 제안 (우선순위)

| 순위 | 문제 | 수정 방향 | 수정 위치 | 난이도 |
|------|------|-----------|-----------|--------|
| **P0** | 조사 오류 "기록를" | `koreanPostposition.ts`의 `pp을를()`을 질문 생성에 적용 | `run-84-headless.cjs` generateScenario() | 낮음 |
| **P0** | 예시 하드코딩 → 카테고리별 분기 | 금전/비금전 사건별 예시 2세트 구분 | `playthrough-runner.cjs` buildPrompt() | 중간 |
| **P1** | 빈 atoms fallback | atoms 없을 때 기본 방어 프롬프트 제공 | `playthrough-runner.cjs` run() | 낮음 |
| **P1** | S5 confess 지시 강화 | "반드시 N가지 팩트를 나열하라" 구조화 | `playthrough-runner.cjs` buildPrompt() | 중간 |
| **P2** | 번역체 금지 목록 보강 | 후처리 정규식 추가 or 프롬프트 예시 보강 | `playthrough-runner.cjs` | 낮음 |
| **P2** | v2-atoms S0-S1 재검증 | Truth Throttle 조기 노출 6건 대상 | v2-atoms 데이터 | 수동 |

---

## 4. CT에 묻고 싶은 것

### Q1: 수정 범위

위 P0~P2를 모두 진행할지, 아니면 P0만 먼저 수정 → 재실행 → 다시 GPT Pro 돌릴지?

### Q2: 프롬프트 예시 분기 전략

현재 예시가 spouse-01 하드코딩인데, 7카테고리 각각에 맞는 예시를 넣을지 vs 금전/비금전 2분류만 할지?
- A안: 7카테고리별 예시 (정밀하지만 코드가 길어짐)
- B안: 금전(spouse/family/friend/partnership/tenant) vs 비금전(neighbor/workplace) 2분류
- C안: 사건 JSON에서 금전 관련 키워드 자동 감지하여 예시 동적 선택

### Q3: 재실행 범위

84건 전체를 다시 돌릴지, 아니면 CRITICAL이 나온 사건만 선별 재실행할지?
- 전체 재실행: ~3시간 + $5~10 API 비용
- CRITICAL 사건만: ~30건 × 2분 = ~1시간

### Q4: GPT Pro 분석의 일부 판정에 대한 CT 의견

GPT Pro가 일부 항목을 과하게 잡은 것 같은 부분도 있습니다:
- friend-01의 "김 씨" — 이건 v2-atoms S2에서 성씨 수준 공개가 정상인데, GPT Pro가 "사건 정보에 없는 제3자"로 CRITICAL 처리
- friend-11의 "14시 03분" — over_precision tell이 발현된 것인데, GPT Pro가 Truth Throttle 위반으로 CRITICAL 처리
- 이런 판정 차이는 GPT Pro에 v2-atoms 원본을 함께 제공하지 않아서 발생한 것으로 보입니다

### Q5: 추가 아이디어

CT 쪽에서 다른 접근이나 추가 아이디어가 있다면 말씀해 주세요. 예를 들어:
- 자동 검증 스크립트 자체를 GPT Pro 수준으로 고도화?
- v2-atoms를 GPT Pro에 함께 제공하여 오탐 줄이기?
- 사건별 맞춤 시나리오를 GPT가 동적 생성하게 하기?

---

## 5. 산출물 위치

```
tests/transcripts/                    ← 84건 JSON 트랜스크립트
tests/gptpro-input/session-1~7/      ← 세션별 프롬프트 + 트랜스크립트
tests/gptpro-input/output/output.md  ← GPT Pro 7세션 분석 원문
tests/gptpro-input/output/thread-E-84-analysis-to-CT.md  ← 이 보고서
```

---

## 6. 한줄 요약

**84건 자동 검증은 99.5% PASS였지만, GPT Pro 심층 분석에서 37% PASS / 63% FAIL. 근본 원인 5가지 중 P0 2건(조사 오류 + 예시 하드코딩)을 수정하면 CRITICAL 31건 중 ~18건이 해소될 것으로 예상합니다. CT의 수정 범위/전략 결정을 요청합니다.**
