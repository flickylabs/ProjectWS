# 84건 LLM 재검증 보고서 v2

작성일: 2026-04-06  
작성자: Codex  
판정: `Phase 1 품질 잠금 실패` / `재검증 미통과`

## 1. 범위

- 기준 문서: `docs/ref/리뉴얼참고/ct-to-codex-revalidation-request.md`
- 주 대상: `CRITICAL 13 + FAIL 32 = 45건`
- 동적 실행: `45건 × 3회 = 135회`
- sentinel: `friend-06`, `friend-03`, `neighbor-01`, `family-02` 각 `1회`
- 보조 확인: `family-01`, `partnership-04`, `tenant-11`, `workplace-02`에 대해 `S5 motive_search` 1턴 probe 추가 실행
- 저장 산출물:
  - 메인/센티널 transcript: `tests/transcripts/*-v2.json`
  - 본 보고서: `tests/84-llm-quality-report-v2.md`

실행 수 기준으로는 transcript `139개`를 생성했다.

- 메인 재검증: `135개`
- sentinel: `4개`

메인 45건 기준 총 분석 턴 수는 `2,700턴`이다.

- `PASS 2,279`
- `WARN 159`
- `FAIL 221`
- `CRITICAL 40`
- `ERROR 1`

`ERROR 1`은 `family-06 r1 t3`의 `API 400` 1건이다. 최종 판정에 영향을 준 주 패턴은 아니었다.

## 2. 최종 판정

CT 수용 기준과 실제 결과는 아래와 같다.

| 항목 | 목표 | 실제 | 판정 |
| --- | --- | --- | --- |
| CRITICAL 사건 수 | `0` | `9` | 실패 |
| FAIL 사건 수 | `≤ 10` | `33` | 실패 |
| sentinel 회귀 | `0` | `3` | 실패 |

최종 결론:

- `Phase 1 종료 불가`
- `Phase 2 착수 보류 유지`
- `P0/P1 추가 수정 + 재검증`이 필요하다

## 3. 핵심 수치

### 3-1. 메인 45건 반복 판정

| 상태 | 사건 수 |
| --- | ---: |
| PASS | 1 |
| WARN | 2 |
| FAIL | 33 |
| CRITICAL | 9 |

반복 PASS는 `workplace-07` 1건뿐이다.

반복 WARN은 2건이다.

- `family-08` (`A4: 클리셰: 미리말씀`)
- `spouse-04` (`D2: 2턴 연속: "처리해야 할 일이"`)

### 3-2. 카테고리별 현황

| 카테고리 | PASS | WARN | FAIL | CRITICAL |
| --- | ---: | ---: | ---: | ---: |
| family | 0 | 1 | 6 | 2 |
| friend | 0 | 0 | 3 | 0 |
| neighbor | 0 | 0 | 1 | 2 |
| partnership | 0 | 0 | 4 | 2 |
| spouse | 0 | 1 | 5 | 0 |
| tenant | 0 | 0 | 11 | 0 |
| workplace | 1 | 0 | 3 | 3 |

가장 취약한 군은 `tenant`, `workplace`, `family`였다.

## 4. 반복 패턴 요약

반복 기준 상위 패턴은 아래와 같다.

1. `FAIL B4: S5 구체적 금액 미포함` -> `31건`
2. `WARN A4: 클리셰: 미리말씀` -> `12건`
3. `FAIL C4: 해요체 잔존` -> `6건`
4. `CRITICAL A1: 비금전 사건에 금전 행위 표현` -> `2건`
5. `FAIL A5: 특정X패턴` -> `2건`
6. `WARN D2: 2턴 연속 동일 표현` -> 다수 소규모 분산
7. `WARN F1: atoms_empty_fallback` -> `2건`

이번 수정 이후에도 가장 큰 잔존 결함은 여전히 `B4`였다. 단순히 남아 있는 수준이 아니라, 전체 실패 판정을 사실상 지배하고 있다.

## 5. 특별 확인 5가지

### 5-1. B4: S5에서 `motive_search` / `empathy_approach` 시 구체적 금액 포함 여부

결론:

- `empathy_approach`는 일부 개선됐지만 전반적으로 안정화되지 않았다.
- `motive_search`는 아직 안정적이라고 보기 어렵다.
- 특히 `validator`가 한국어 수량 표현을 놓치는 케이스가 확인됐다.

`empathy_approach` 긍정 사례:

- `family-01` r1/r2/r3 turn 18: 모두 `60만원` 포함
- `neighbor-12` r1/r2/r3 turn 18: 모두 `32만 원` 포함

`empathy_approach` 부정 사례:

- `friend-01` r1/r2/r3 turn 18: 금액 없음
- `partnership-04` r1/r2/r3 turn 18: 금액 없음

`motive_search` 보조 probe 결과:

- `family-01`: 응답에 `1천8백만원`이 들어갔지만 여전히 `FAIL B4`로 판정됨
- `partnership-04`: `FAIL B4` + `문장 부족`
- `tenant-11`: `FAIL B4`
- `workplace-02`: `FAIL B4` + `CRITICAL E1`

해석:

- `S5 exact-slot rescue`만으로는 `motive_search` 경로를 안정화하지 못했다.
- `family-01`은 금액이 실제 응답에 있는데도 `B4`가 붙었다. 즉, rescue 문제와 별개로 `B4 validator`가 `1천8백만원` 같은 한국어 수량 표기를 인식하지 못하는 문제가 추가로 있다.

### 5-2. B1/B2: S0-S1에서 금액/실명 완전 차단 여부

결론: `완전 차단 실패`

조기 노출 hit는 총 `13건`이었다. 대표 사례는 아래와 같다.

- `family-01` r1 t4: `60만원` 노출
- `family-01` r3 t20: `1,800만원` 노출
- `neighbor-10` r1 t5: `이정훈` 실명 노출
- `neighbor-12` r2/r3 t20: `배지연` 실명 노출
- `workplace-04` r2 t14, r3 t15: `서민석` 실명 노출
- `workplace-05` r1/r2/r3: `문가은`, `오상혁` 실명 노출
- `neighbor-06` r2 t1: `9만원` 노출
- `spouse-01` r1 t20: `125만원` 노출
- `workplace-08` r2 t1: `김나래` 실명 노출

해석:

- `postProcessNpcText()` 공통화 자체는 들어갔지만, 실제 런타임 결과 기준으로는 `Truth Throttle`이 조기 금액/실명 차단을 아직 완전히 잠그지 못했다.
- 실명 노출은 `socialGraph` 인물, 증거 제시 응답, 후반 재귀 쟁점 응답에서 특히 취약하다.

### 5-3. A1: `family-05`, `partnership-06`, `spouse-12` 비금전 오염 제거 여부

결론: `미해결`

명시적 잔존 hit는 `5건`이었다.

- `family-05` r1/r2/r3 turn 17
- `partnership-06` r1/r3 turn 17

대표 문장:

- `family-05`: `송금`, `계약금`, `임대인`, `취소 요청 문자`가 계속 남아 있었다.
- `partnership-06`: `300만원대 이상 변경` 표현이 남아 있었다.

추가로 sentinel `family-02`도 `CRITICAL A1`로 회귀했다. 이 케이스는 위 두 사건처럼 노골적인 금전 어휘가 아니어서, `A1` 규칙 자체도 별도로 다시 봐야 한다.

### 5-4. 후처리 두 경로 모두 `postProcessNpcText()` 경유 여부

정적 코드 확인 결과, 두 경로 모두 공통 후처리를 경유한다.

- 일반 parse 경로: `src/engine/llmDialogueResolver.ts:927`
- 공통 후처리 함수: `src/engine/llmDialogueResolver.ts:1159`
- `enforceTruthThrottle()`: `src/engine/llmDialogueResolver.ts:1195`
- `enforceMonetaryGuard()`: `src/engine/llmDialogueResolver.ts:1230`
- `enforceClicheFilter()`: `src/engine/llmDialogueResolver.ts:1246`
- `enforceHaeyoMidSentence()`: `src/engine/llmDialogueResolver.ts:1263`
- Blueprint V2 경로: `src/engine/llmDialogueResolver.ts:1743`

관련 보강도 코드상 반영돼 있다.

- `atomSelectionEngine.ts:148` `S5 exact-slot rescue`
- `atomSelectionEngine.ts:239` `S0-S1 neutral 강제`
- `blueprintPromptBuilderV2.ts:52` `amount/time/person/beneficiary slotMaterial 제외`
- `koreanPostposition.ts:98` `"만을"` 후처리 보정

정리하면, `경로 통합`은 되었지만 `품질 잠금`은 아직 아니다.

### 5-5. sentinel PASS 사건 회귀 없음 확인

결론: `회귀 있음`

sentinel 결과:

| 사건 | 결과 | 비고 |
| --- | --- | --- |
| `friend-06` | PASS | 회귀 없음 |
| `friend-03` | FAIL | `t4 C4 해요체 잔존` |
| `neighbor-01` | WARN | `A4`, `D2`, `A4` |
| `family-02` | CRITICAL | `t13 A1` |

즉 `sentinel 회귀 없음` 조건은 충족하지 못했다.

## 6. CRITICAL 사건 9건

| 사건 | 반복 이슈 |
| --- | --- |
| `family-01` | `B1`, `B4`, `A4`, `F1` |
| `family-05` | `A1` |
| `neighbor-10` | `B2(민우/하윤 계열 실명 노출)` |
| `neighbor-12` | `B2(배지연)` |
| `partnership-05` | `B2(박태성)` + `B4` |
| `partnership-06` | `A1` |
| `workplace-04` | `B2(서민석)` + `A4` |
| `workplace-05` | `B2(오상혁)` |
| `workplace-06` | `B2(권하늘)` + `A4` |

`CRITICAL`의 중심은 `B2 실명 노출`과 `A1 비금전 오염`이었다.

## 7. FAIL 사건 33건

### 7-1. `B4` 중심 실패

아래 사건들은 `S5 구체적 금액 미포함`이 반복적으로 남았다.

- `family-03`
- `family-04`
- `family-06`
- `family-09`
- `family-10`
- `family-12`
- `friend-01`
- `friend-04`
- `neighbor-06`
- `partnership-04`
- `partnership-08`
- `partnership-10`
- `partnership-11`
- `spouse-01`
- `spouse-03`
- `spouse-08`
- `tenant-01`
- `tenant-03`
- `tenant-04`
- `tenant-05`
- `tenant-06`
- `tenant-07`
- `tenant-08`
- `tenant-09`
- `tenant-10`
- `tenant-11`
- `tenant-12`
- `workplace-02`
- `workplace-08`

### 7-2. `C4` 중심 실패

- `friend-08`
- `spouse-06`
- `spouse-12`

### 7-3. `A5` 잔존 실패

- `workplace-02`
- `workplace-03`

보조 패턴으로는 `A4`, `D2`, `F1`, `C2`가 섞여 있었다.

## 8. 해석과 권고

### 8-1. 이번 수정의 효과

- `공통 후처리 경로 통합` 자체는 성공했다.
- `empathy_approach` 일부 사건에서는 `S5 금액 노출`이 실제로 개선됐다.
- `"만을"` 후처리는 반복 상위 패턴에서 사실상 내려왔다.

### 8-2. 그러나 Phase 1 기준으로는 실패인 이유

- `B4`가 여전히 `31건`이라 핵심 결함이 닫히지 않았다.
- `B1/B2` 조기 차단이 완전히 잠기지 않았다.
- `A1` 비금전 오염이 남아 있고, sentinel까지 회귀했다.
- `C4`, `A4`, `A5`도 Phase 1 종료 수준으로 정리되지 않았다.

### 8-3. 다음 수정 우선순위

1. `B4`를 두 갈래로 분리해서 잡아야 한다.
   - `atom rescue / usableInSubActions / slotMaterial` 측면
   - `validator amount pattern` 측면
2. `B2`는 `socialGraph` / 제3자 이름 / 증거제시 응답까지 포함해 다시 잠가야 한다.
3. `A1`은 `family-05`, `partnership-06`의 명시적 오염 제거와 `family-02` sentinel 회귀 원인을 분리 분석해야 한다.
4. `C4`는 남은 패턴 수가 줄었으므로 후처리 규칙과 검증식 보강으로 닫을 가능성이 높다.
5. 다음 재검증도 현재 sentinel 4건은 그대로 유지해야 한다.

## 9. 산출물

- 보고서: `tests/84-llm-quality-report-v2.md`
- 메인 transcript: `tests/transcripts/*-r1-v2.json`, `tests/transcripts/*-r2-v2.json`, `tests/transcripts/*-r3-v2.json`
- sentinel transcript: `tests/transcripts/friend-06-r1-v2.json`, `tests/transcripts/friend-03-r1-v2.json`, `tests/transcripts/neighbor-01-r1-v2.json`, `tests/transcripts/family-02-r1-v2.json`

최종 판단은 변경 없음:

- `재검증 미통과`
- `Phase 1 계속`
- `Phase 2 착수 보류`
