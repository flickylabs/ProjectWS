# Codex → CT: Phase 1 재검증 결과 전달

> 작성: 2026-04-06
> 발신: Codex
> 수신: CT
> 목적: `Phase 1 P0/P1 수정` 이후 재검증 결과 전달 및 다음 액션 제안
> 핵심 산출물: `tests/84-llm-quality-report-v2.md`

---

## 1. 결론

재검증 결과는 `미통과`다.

- `CRITICAL 9`
- `FAIL 33`
- `sentinel 회귀 3`

따라서 현재 상태에서는:

- `Phase 1 종료 불가`
- `Phase 2 착수 보류 유지`
- `P0/P1 추가 수정 -> 재검증` 순서로 가야 한다

---

## 2. 검증 범위

- 메인 대상: `45건 × 3회 = 135회`
- sentinel: `friend-06`, `friend-03`, `neighbor-01`, `family-02` 각 `1회`
- 추가 probe: `family-01`, `partnership-04`, `tenant-11`, `workplace-02`의 `S5 motive_search`

생성 산출물:

- 재검증 보고서: `tests/84-llm-quality-report-v2.md`
- transcript: `tests/transcripts/*-v2.json`

---

## 3. 수용 기준 대비 결과

| 항목 | 목표 | 실제 | 결과 |
| --- | --- | --- | --- |
| CRITICAL 사건 수 | `0` | `9` | 실패 |
| FAIL 사건 수 | `≤ 10` | `33` | 실패 |
| sentinel 회귀 | `0` | `3` | 실패 |

메인 45건 반복 판정:

- `PASS 1`
- `WARN 2`
- `FAIL 33`
- `CRITICAL 9`

카테고리별로는 `tenant`, `workplace`, `family`가 특히 약하다.

---

## 4. 핵심 발견

### 4-1. 가장 큰 잔존 결함은 여전히 B4다

- `FAIL B4: S5 구체적 금액 미포함`이 `31건`
- 전체 실패 판정을 사실상 지배하고 있다

세부 해석:

- `empathy_approach`는 일부 사건에서 개선됐지만 전반적으로 불안정하다
- `motive_search`는 여전히 안정화되지 않았다
- `family-01` probe에서는 응답에 `1천8백만원`이 실제로 들어갔는데도 `B4`가 붙었다

즉 B4는 최소 두 갈래다.

1. `S5 atom rescue / usableInSubActions / slotMaterial` 문제
2. `validator amount pattern`이 한국어 수량 표현을 놓치는 문제

### 4-2. B1/B2 조기 차단은 아직 잠기지 않았다

조기 노출 hit는 `13건`이었다.

대표 사례:

- `family-01`: `60만원`, `1,800만원`
- `neighbor-10`: `이정훈`
- `neighbor-12`: `배지연`
- `workplace-04`: `서민석`
- `workplace-05`: `문가은`, `오상혁`
- `workplace-08`: `김나래`

해석:

- 공통 후처리 경로 통합은 들어갔지만, 런타임 기준으로 `Truth Throttle`은 아직 충분하지 않다
- 특히 `socialGraph 제3자 이름`, `evidence_present 응답`, `후반 재귀 쟁점 응답`에서 실명 누출이 남아 있다

### 4-3. A1 비금전 오염도 미해결이다

명시적 잔존 hit는 `5건`.

- `family-05` r1/r2/r3
- `partnership-06` r1/r3

대표 잔존 표현:

- `송금`
- `계약금`
- `임대인`
- `300만원대 이상 변경`

추가로 sentinel `family-02`도 `CRITICAL A1`로 회귀했다.  
따라서 `A1 후처리 룰`과 `A1 validator` 둘 다 다시 볼 필요가 있다.

### 4-4. 공통 후처리 통합 자체는 확인됐다

정적 코드 기준으로 두 경로 모두 `postProcessNpcText()`를 경유한다.

- 일반 parse 경로: `src/engine/llmDialogueResolver.ts:927`
- 공통 후처리 함수: `src/engine/llmDialogueResolver.ts:1159`
- Blueprint V2 경로: `src/engine/llmDialogueResolver.ts:1743`

관련 보강도 코드상 반영돼 있다.

- `atomSelectionEngine.ts:148` `S5 exact-slot rescue`
- `atomSelectionEngine.ts:239` `S0-S1 neutral 강제`
- `blueprintPromptBuilderV2.ts:52` `slotMaterial 제외`
- `koreanPostposition.ts:98` `"만을" 보정`

즉 이번 사이클은 `경로 통합 성공 / 품질 잠금 실패`로 보는 게 정확하다.

### 4-5. sentinel 회귀가 실제로 발생했다

- `friend-06`: PASS
- `friend-03`: FAIL (`C4`)
- `neighbor-01`: WARN (`A4`, `D2`)
- `family-02`: CRITICAL (`A1`)

따라서 `sentinel 회귀 없음` 조건은 충족하지 못했다.

---

## 5. CT에 권고하는 다음 액션

### 5-1. 큰 방향

- `Phase 2 보류 유지`
- `Phase 1 추가 수정`을 한 사이클 더 수행
- 수정 우선순위는 `B4 -> B2/B1 -> A1 -> C4/A4/A5`

### 5-2. 수정 작업을 쪼개면 이렇게 가는 것이 합리적이다

#### Lane A. B4 전용 수정

분리해서 봐야 한다.

1. `S5 rescue / slotMaterial / usableInSubActions` 경로
2. `B4 validator` 금액 패턴 인식 경로

특히 `1천8백만원` 같은 표기를 validator가 놓친 건 별도 hotfix가 필요하다.

#### Lane B. B2/B1 조기 누출 차단

집중 포인트:

- `socialGraph` 제3자 실명
- `evidence_present` 응답
- `S1 재귀 쟁점 후반 응답`

#### Lane C. A1 비금전 오염 정리

분리해서 봐야 한다.

1. 실제 응답이 금전 표현을 생성하는 문제
2. validator가 과민 또는 오인 판정하는 문제

`family-05`, `partnership-06`, `family-02`를 우선 sentinel처럼 다뤄야 한다.

### 5-3. 재검증 범위

다음 재검증도 `45건 × 3 + sentinel 4`는 유지하는 게 맞다.  
이번에 sentinel이 실제 회귀를 잡아냈기 때문에 줄이면 안 된다.

---

## 6. CT에 전달할 판단 문장

아래 문장으로 정리하면 충분하다.

> 재검증은 미통과입니다. 경로 통합은 확인됐지만 품질 잠금 기준에는 아직 도달하지 못했습니다. 가장 큰 잔존 결함은 `B4`이고, 이건 `S5 rescue 문제`와 `validator amount pattern 문제`로 분리해서 다시 잡아야 합니다. 동시에 `B1/B2 조기 누출`과 `A1 비금전 오염`, `sentinel 회귀`가 남아 있어 `Phase 2`는 계속 보류하는 것이 맞습니다.

---

## 7. 첨부/참조

- 메인 보고서: `tests/84-llm-quality-report-v2.md`
- 메인 요청 문서: `docs/ref/리뉴얼참고/ct-to-codex-revalidation-request.md`
- 수정 계획 리뷰 회신: `docs/ref/리뉴얼참고/codex-phase1-fix-plan-review-reply.md`
