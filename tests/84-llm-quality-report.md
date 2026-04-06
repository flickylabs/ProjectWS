# 84건 LLM 헤드리스 품질 리포트

작성일: 2026-04-06  
작성자: Codex

## 1. 범위

이번 사이클에서 실제 수행한 검증은 아래 두 축이다.

1. 동적 LLM 헤드리스 플레이스루
- 84건 × 3회 = 252회
- 20턴 × 252회 = 5,040턴
- round 1 `basic`, round 2 `evidence`, round 3 `empathy`
- 산출물: `tests/transcripts/{case-id}-r{1,2,3}.json`

2. 정적 84건 전수 감사
- `tests/full-84-audit.cjs`
- Phase 1 기준 28개 항목
- 산출물: `tests/full-84-audit-report.json`

사전 점검:
- `spouse` 12건 × 1회 파일럿으로 기존 러너와 검증 로직을 먼저 확인했다.

실행 시간:
- round 1: 5,010초
- round 2: 1,964초
- round 3: 1,966초
- 총합: 8,940초 = 2시간 29분

## 2. 중요한 한계

이번 리포트는 CT v2 문서의 목표를 최대한 따르되, 실제 전수 실행 범위는 아래처럼 나뉜다.

- 전수 동적 검증 완료:
  - NPC 대사 채널
- 전수 정적 검증 완료:
  - investigationStages
  - DossierCard 데이터
  - Phase 1/2 스크립트
  - 증거/교차참조 계열
- 전용 헤드리스 harness 부재로 전수 동적 검증 미완료:
  - 증인 증언
  - 끼어들기
  - 자유 질문 응답
  - 후일담(Phase 6)

즉, 이 문서는 `NPC 동적 품질 + 정적 채널 품질`에 대해서는 신뢰할 수 있지만, `11개 채널 전체의 동적 전수 검증 완료`로 간주하면 안 된다.

## 3. 전체 결론

결론: **Phase 1 품질 잠금 실패**

동적 반복 기준 결과:

| 상태 | 사건 수 |
|---|---:|
| CRITICAL | 13 |
| FAIL | 32 |
| WARN | 17 |
| PASS | 22 |

동적 턴 기준 결과:

| 상태 | 턴 수 |
|---|---:|
| PASS | 4,477 |
| WARN | 269 |
| FAIL | 234 |
| CRITICAL | 59 |
| ERROR | 1 |

턴 단위 PASS율은 `88.83%`이지만, 사건 단위 반복 결함이 많아서 품질 잠금 기준에는 도달하지 못했다.

CT v2 기준(`CRITICAL 0건, FAIL 10건 이하`)과 비교하면:
- 실제: `CRITICAL 13건, FAIL 32건`
- 판정: **미달**

## 4. 카테고리별 상태

| 카테고리 | PASS | WARN | FAIL | CRITICAL |
|---|---:|---:|---:|---:|
| family | 3 | 0 | 7 | 2 |
| friend | 8 | 1 | 2 | 1 |
| neighbor | 5 | 4 | 1 | 2 |
| partnership | 3 | 3 | 4 | 2 |
| spouse | 2 | 4 | 4 | 2 |
| tenant | 0 | 1 | 10 | 1 |
| workplace | 1 | 4 | 4 | 3 |

메모:
- 가장 위험한 카테고리는 `tenant`, `workplace`, `spouse`.
- 가장 안정적인 카테고리는 `friend`.
- `tenant`는 PASS 사건이 0건이다.

## 5. 반복 패턴 Top 10

| 순위 | 패턴 | 횟수 | 해석 |
|---|---|---:|---|
| 1 | `B4 S5 구체적 금액 미포함` | 152 | 금전 사건 자백 완결성 부족 |
| 2 | `A4 클리셰: 미리말씀` | 97 | 말투 다양성 부족 |
| 3 | `C4 해요체 잔존` | 42 | 경칭/어법 혼선 |
| 4 | `A2 번역체: 불찰` | 18 | 번역체 잔존 |
| 5 | `C2 이중 조사: 만을` | 18 | 조사 후처리 미흡 |
| 6 | `D2 2턴 연속 반복 표현` | 167 | 표현 반복 누적 |
| 7 | `B1 S0-S1 금액 노출` | 10 | Truth Throttle 파손 |
| 8 | `A1 비금전 사건에 금전 행위 표현` | 10 | 상황/맥락 오염 |
| 9 | `A5 특정X패턴` | 10 | 어색한 회피 표현 잔존 |
| 10 | `B2 S0-S1 실명 노출` | 34 | Truth Throttle 파손 |

핵심 해석:
- 가장 큰 구조 결함은 `S5 자백 완결성 부족(B4)`이다.
- 그다음은 `클리셰/해요체/번역체`로 대표되는 어법 품질 문제다.
- CRITICAL은 대부분 `Truth Throttle 조기 노출(B1/B2)` 또는 `비금전 사건 금전 오염(A1)`이다.

## 6. 우선 수정 권고

P0:
- `B4`를 먼저 잡아야 한다. 현재 금전 사건의 S5 자백이 금액/대상/목적을 안정적으로 포함하지 못한다.
- `B1/B2` 조기 노출을 막아야 한다. 실명/금액이 S1에서 새는 사건은 Phase 1 전체를 깨뜨린다.
- `A1` 비금전 사건 금전 표현 오염은 케이스별 가드 강화를 우선해야 한다.

P1:
- `C4` 해요체 잔존과 `A2/A4` 번역체/클리셰를 같이 정리해야 한다.
- `A5 특정X패턴`, `C2 조사 오류`는 규칙 기반 후처리로 빠르게 줄일 수 있다.

P2:
- `D2` 반복 표현은 전체적으로 많지만, 사건 단위 구조 결함보다는 후순위다.
- `F1 atoms_empty_fallback`은 콘텐츠 누락 신호라서 특정 사건에 한해 별도 보강이 필요하다.

## 7. CRITICAL 사건

반복 기준으로 `CRITICAL` 판정된 사건은 13건이다.

- `family-01`: `B1 S0-S1 금액 노출` 2/3, `B4 S5 구체적 금액 미포함` 2/3, `F1 atoms_empty_fallback` 3/3
- `family-05`: `A1 비금전 사건에 금전 행위 표현` 3/3
- `friend-01`: `B1 S0-S1 금액 노출` 2/3, `B4 S5 구체적 금액 미포함` 3/3
- `neighbor-10`: `B2 S0-S1 실명 노출: 하윤` 3/3, `B2 S0-S1 실명 노출: 민우` 2/3
- `neighbor-12`: `B2 S0-S1 실명 노출: 배지연` 2/3, `C4 해요체 잔존` 2/3
- `partnership-04`: `B1 S0-S1 금액 노출` 2/3, `B4 S5 구체적 금액 미포함` 3/3
- `partnership-06`: `A1 비금전 사건에 금전 행위 표현` 2/3
- `spouse-04`: `B2 S0-S1 실명 노출: 강정희` 3/3
- `spouse-12`: `A1 비금전 사건에 금전 행위 표현` 2/3
- `tenant-11`: `B1 S0-S1 금액 노출` 2/3, `B4 S5 구체적 금액 미포함` 3/3, `C4 해요체 잔존` 3/3
- `workplace-04`: `B2 S0-S1 실명 노출: 배지우` 3/3, `B2 S0-S1 실명 노출: 서민석` 2/3
- `workplace-05`: `B2 S0-S1 실명 노출: 오상혁` 3/3
- `workplace-06`: `B2 S0-S1 실명 노출: 권하늘` 2/3

## 8. FAIL 사건

반복 기준으로 `FAIL` 판정된 사건은 32건이다.

- `family-03`: `B4 S5 구체적 금액 미포함` 3/3
- `family-04`: `B4 S5 구체적 금액 미포함` 3/3
- `family-06`: `B4 S5 구체적 금액 미포함` 3/3
- `family-08`: `A2 번역체:불찰` 2/3
- `family-09`: `B4 S5 구체적 금액 미포함` 3/3
- `family-10`: `B4 S5 구체적 금액 미포함` 3/3
- `family-12`: `B4 S5 구체적 금액 미포함` 3/3, `C2 이중 조사: 만을` 3/3
- `friend-04`: `B4 S5 구체적 금액 미포함` 3/3
- `friend-08`: `C4 해요체 잔존` 2/3
- `neighbor-06`: `B4 S5 구체적 금액 미포함` 3/3
- `partnership-05`: `B4 S5 구체적 금액 미포함` 3/3
- `partnership-08`: `B4 S5 구체적 금액 미포함` 3/3
- `partnership-10`: `B4 S5 구체적 금액 미포함` 3/3
- `partnership-11`: `B4 S5 구체적 금액 미포함` 3/3
- `spouse-01`: `B4 S5 구체적 금액 미포함` 3/3, `F1 atoms_empty_fallback` 3/3
- `spouse-03`: `B4 S5 구체적 금액 미포함` 2/3
- `spouse-06`: `C4 해요체 잔존` 2/3
- `spouse-08`: `B4 S5 구체적 금액 미포함` 3/3
- `tenant-01`: `B4 S5 구체적 금액 미포함` 3/3
- `tenant-03`: `B4 S5 구체적 금액 미포함` 3/3
- `tenant-04`: `B4 S5 구체적 금액 미포함` 3/3, `A2 번역체:불찰` 2/3
- `tenant-05`: `B4 S5 구체적 금액 미포함` 3/3
- `tenant-06`: `B4 S5 구체적 금액 미포함` 3/3
- `tenant-07`: `B4 S5 구체적 금액 미포함` 3/3
- `tenant-08`: `B4 S5 구체적 금액 미포함` 3/3
- `tenant-09`: `B4 S5 구체적 금액 미포함` 3/3
- `tenant-10`: `B4 S5 구체적 금액 미포함` 3/3
- `tenant-12`: `B4 S5 구체적 금액 미포함` 3/3
- `workplace-02`: `B4 S5 구체적 금액 미포함` 3/3
- `workplace-03`: `A5 특정X패턴` 3/3
- `workplace-07`: `A5 특정X패턴` 2/3
- `workplace-08`: `B4 S5 구체적 금액 미포함` 3/3, `C4 해요체 잔존` 2/3

## 9. WARN 사건

반복 기준으로 `WARN` 판정된 사건은 17건이다.

- `friend-05`: `A4 클리셰:미리말씀` 2/3
- `neighbor-04`: `A4 클리셰:미리말씀` 2/3
- `neighbor-05`: `A4 클리셰:미리말씀` 3/3
- `neighbor-07`: `A4 클리셰:미리말씀` 3/3
- `neighbor-09`: `A4 클리셰:미리말씀` 2/3
- `partnership-02`: `A4 클리셰:미리말씀` 3/3
- `partnership-03`: `A4 클리셰:미리말씀` 3/3
- `partnership-12`: `C2 이중 조사: 만을` 3/3, `A4 클리셰:미리말씀` 2/3
- `spouse-02`: `D2 반복 표현` 2/3
- `spouse-05`: `D2 반복 표현` 2/3
- `spouse-07`: `D2 반복 표현` 2/3
- `spouse-10`: `D2 반복 표현` 2/3
- `tenant-02`: `A4 클리셰:미리말씀` 2/3
- `workplace-01`: `D2 반복 표현` 2/3
- `workplace-09`: `A4 클리셰:미리말씀` 3/3
- `workplace-10`: `A4 클리셰:미리말씀` 2/3
- `workplace-11`: `A4 클리셰:미리말씀` 2/3

## 10. PASS 사건

반복 기준으로 `PASS` 판정된 사건은 22건이다.

`family-02`, `family-07`, `family-11`, `friend-02`, `friend-03`, `friend-06`, `friend-07`, `friend-09`, `friend-10`, `friend-11`, `friend-12`, `neighbor-01`, `neighbor-02`, `neighbor-03`, `neighbor-08`, `neighbor-11`, `partnership-01`, `partnership-07`, `partnership-09`, `spouse-09`, `spouse-11`, `workplace-12`

## 11. 정적 전수 감사 결과

`tests/full-84-audit.cjs` 결과:

| 항목 | 수치 |
|---|---:|
| 총 사건 | 84 |
| PASS | 67 |
| FAIL | 17 |
| CRITICAL | 0 |
| FAIL severity | 2 |
| WARN severity | 16 |

분포:
- `B3 비표준 archetype`: 15건
- `A4 S3+ 구체 slots 미보존`: 2건
- `E3 DossierCard 데이터 없음`: 1건

정적 실패 사건:
- `spouse-01`: `E3 DossierCard 데이터 없음`
- `spouse-02~07,09~12`: `B3 비표준 archetype`
- `spouse-08`: `A4 S3+ 구체 slots 미보존` + `B3 비표준 archetype`
- `neighbor-05`, `neighbor-06`, `neighbor-09`, `neighbor-10`: `B3 비표준 archetype`
- `neighbor-08`: `A4 S3+ 구체 slots 미보존`

해석:
- 정적 감사의 다수는 `WARN 성격 B3`다.
- 실제로 우선순위가 높은 정적 문제는 `slots 미보존 2건`과 `DossierCard 데이터 없음 1건`이다.

## 12. 런타임 메모

- `spouse-11-r2.json` turn 6에서 `API 400` 1회 발생
- 반복되지 않았고 동일 사건이 다른 라운드에서는 정상 진행됨
- 이번 판정에서는 인프라성 단발 변동으로 기록만 남김

## 13. 권장 액션

1. `B4`를 전 사건군 우선 과제로 지정
2. `B1/B2/A1` CRITICAL 사건 13건을 바로 P0 버킷으로 고정
3. `C4`, `A2`, `C2`, `A5`는 후처리/프롬프트 규칙 강화로 묶어서 해결
4. `spouse-01`의 `atoms_empty_fallback`과 `spouse-01 static E3`는 데이터 결손 이슈로 별도 추적
5. `witness/interjection/freeQuestion/epilogue`는 전용 헤드리스 harness를 추가해서 다음 사이클에 동적 전수 검증 필요

## 14. 부록: 사건별 회차 요약

형식: `rN:C{critical}/F{fail}/W{warn}/{passRate}%`

```text
family-01	r1:C1/F2/W2/80%	r2:C1/F0/W1/90%	r3:C0/F2/W1/90%
family-02	r1:C0/F0/W0/100%	r2:C0/F0/W0/100%	r3:C0/F0/W0/100%
family-03	r1:C0/F1/W3/80%	r2:C0/F1/W0/95%	r3:C0/F1/W2/85%
family-04	r1:C0/F1/W1/90%	r2:C0/F2/W1/85%	r3:C0/F2/W1/85%
family-05	r1:C1/F0/W0/95%	r2:C1/F0/W1/90%	r3:C2/F0/W1/85%
family-06	r1:C0/F2/W0/90%	r2:C0/F3/W0/85%	r3:C0/F2/W0/90%
family-07	r1:C0/F0/W0/100%	r2:C0/F0/W1/95%	r3:C0/F0/W1/95%
family-08	r1:C0/F1/W0/95%	r2:C0/F0/W1/95%	r3:C0/F1/W2/90%
family-09	r1:C0/F2/W1/85%	r2:C0/F1/W0/95%	r3:C0/F1/W1/90%
family-10	r1:C0/F2/W1/85%	r2:C0/F3/W1/80%	r3:C0/F2/W1/85%
family-11	r1:C0/F0/W0/100%	r2:C0/F0/W2/90%	r3:C0/F1/W0/95%
family-12	r1:C0/F2/W5/70%	r2:C0/F2/W2/80%	r3:C0/F2/W2/80%
friend-01	r1:C1/F2/W2/75%	r2:C1/F2/W1/80%	r3:C0/F3/W1/80%
friend-02	r1:C0/F1/W0/95%	r2:C0/F0/W2/90%	r3:C0/F1/W1/90%
friend-03	r1:C0/F0/W1/95%	r2:C0/F0/W0/100%	r3:C0/F0/W0/100%
friend-04	r1:C0/F1/W0/95%	r2:C0/F1/W1/90%	r3:C0/F1/W0/95%
friend-05	r1:C0/F0/W1/95%	r2:C0/F0/W1/95%	r3:C0/F0/W1/95%
friend-06	r1:C0/F0/W0/100%	r2:C0/F0/W0/100%	r3:C0/F0/W0/100%
friend-07	r1:C0/F0/W0/100%	r2:C1/F0/W1/90%	r3:C0/F0/W0/100%
friend-08	r1:C0/F0/W2/90%	r2:C0/F3/W0/85%	r3:C0/F3/W2/80%
friend-09	r1:C0/F0/W2/90%	r2:C0/F0/W0/100%	r3:C0/F1/W3/80%
friend-10	r1:C0/F0/W0/100%	r2:C0/F2/W0/90%	r3:C0/F0/W2/90%
friend-11	r1:C0/F0/W0/100%	r2:C0/F0/W0/100%	r3:C0/F0/W1/95%
friend-12	r1:C0/F0/W1/95%	r2:C0/F0/W0/100%	r3:C0/F0/W1/95%
neighbor-01	r1:C0/F0/W1/95%	r2:C0/F0/W0/100%	r3:C0/F0/W3/85%
neighbor-02	r1:C0/F1/W0/95%	r2:C0/F0/W1/95%	r3:C0/F1/W1/90%
neighbor-03	r1:C0/F0/W0/100%	r2:C0/F1/W1/90%	r3:C0/F1/W3/80%
neighbor-04	r1:C0/F0/W1/95%	r2:C0/F0/W2/90%	r3:C0/F1/W0/95%
neighbor-05	r1:C0/F0/W2/90%	r2:C0/F1/W3/85%	r3:C0/F0/W1/95%
neighbor-06	r1:C0/F1/W0/95%	r2:C0/F1/W1/90%	r3:C0/F1/W2/85%
neighbor-07	r1:C0/F0/W1/95%	r2:C0/F1/W2/85%	r3:C0/F0/W5/75%
neighbor-08	r1:C0/F0/W3/85%	r2:C0/F0/W0/100%	r3:C1/F0/W1/90%
neighbor-09	r1:C0/F1/W1/95%	r2:C0/F0/W1/95%	r3:C0/F0/W2/90%
neighbor-10	r1:C3/F1/W2/75%	r2:C4/F0/W0/80%	r3:C4/F0/W0/85%
neighbor-11	r1:C0/F1/W2/85%	r2:C1/F0/W0/95%	r3:C0/F2/W1/85%
neighbor-12	r1:C2/F2/W0/80%	r2:C0/F1/W0/95%	r3:C1/F0/W1/90%
partnership-01	r1:C0/F0/W2/90%	r2:C0/F0/W2/90%	r3:C0/F0/W1/95%
partnership-02	r1:C0/F0/W4/80%	r2:C0/F0/W1/95%	r3:C0/F0/W3/85%
partnership-03	r1:C0/F0/W2/90%	r2:C0/F0/W2/90%	r3:C0/F0/W2/90%
partnership-04	r1:C0/F1/W0/95%	r2:C1/F2/W0/85%	r3:C1/F2/W0/85%
partnership-05	r1:C0/F1/W1/90%	r2:C0/F1/W0/95%	r3:C1/F2/W2/75%
partnership-06	r1:C0/F0/W1/95%	r2:C1/F0/W0/95%	r3:C1/F1/W1/85%
partnership-07	r1:C0/F0/W0/100%	r2:C0/F0/W2/90%	r3:C0/F0/W3/85%
partnership-08	r1:C0/F2/W1/90%	r2:C0/F2/W0/90%	r3:C0/F2/W1/85%
partnership-09	r1:C0/F0/W1/95%	r2:C0/F0/W1/95%	r3:C1/F0/W1/90%
partnership-10	r1:C0/F3/W3/75%	r2:C0/F2/W3/75%	r3:C0/F3/W3/70%
partnership-11	r1:C0/F1/W0/95%	r2:C0/F2/W0/95%	r3:C1/F2/W1/85%
partnership-12	r1:C0/F0/W4/80%	r2:C0/F0/W5/75%	r3:C0/F0/W7/70%
spouse-01	r1:C0/F1/W2/85%	r2:C0/F2/W2/80%	r3:C0/F1/W2/85%
spouse-02	r1:C0/F0/W0/100%	r2:C0/F0/W2/90%	r3:C0/F0/W2/90%
spouse-03	r1:C1/F1/W3/75%	r2:C0/F1/W1/90%	r3:C0/F1/W1/90%
spouse-04	r1:C1/F0/W0/95%	r2:C1/F2/W2/80%	r3:C1/F0/W2/85%
spouse-05	r1:C0/F0/W3/85%	r2:C0/F0/W0/100%	r3:C0/F0/W2/90%
spouse-06	r1:C0/F2/W0/90%	r2:C0/F1/W0/95%	r3:C0/F2/W0/90%
spouse-07	r1:C0/F1/W1/90%	r2:C0/F0/W1/95%	r3:C0/F0/W0/100%
spouse-08	r1:C0/F2/W1/85%	r2:C0/F2/W1/85%	r3:C0/F2/W0/90%
spouse-09	r1:C0/F0/W1/95%	r2:C0/F0/W1/95%	r3:C0/F2/W1/90%
spouse-10	r1:C0/F0/W3/85%	r2:C0/F1/W0/95%	r3:C0/F0/W1/95%
spouse-11	r1:C1/F0/W1/90%	r2:C0/F0/W1/90%	r3:C0/F0/W1/95%
spouse-12	r1:C2/F0/W0/90%	r2:C0/F1/W0/95%	r3:C1/F0/W1/90%
tenant-01	r1:C0/F2/W0/90%	r2:C0/F2/W1/85%	r3:C0/F2/W0/90%
tenant-02	r1:C0/F0/W2/90%	r2:C0/F0/W1/95%	r3:C0/F0/W0/100%
tenant-03	r1:C0/F2/W1/85%	r2:C0/F2/W1/85%	r3:C0/F2/W2/80%
tenant-04	r1:C0/F3/W1/85%	r2:C0/F3/W2/80%	r3:C0/F2/W2/80%
tenant-05	r1:C0/F2/W0/90%	r2:C0/F2/W2/85%	r3:C0/F2/W0/90%
tenant-06	r1:C0/F2/W0/90%	r2:C0/F2/W0/90%	r3:C0/F2/W1/85%
tenant-07	r1:C0/F2/W1/85%	r2:C0/F2/W0/90%	r3:C0/F3/W1/80%
tenant-08	r1:C0/F2/W1/85%	r2:C0/F2/W0/90%	r3:C0/F1/W1/90%
tenant-09	r1:C0/F3/W0/85%	r2:C1/F2/W2/75%	r3:C0/F3/W2/75%
tenant-10	r1:C0/F3/W2/75%	r2:C0/F2/W0/95%	r3:C0/F2/W3/75%
tenant-11	r1:C0/F6/W0/70%	r2:C1/F5/W2/65%	r3:C1/F7/W3/60%
tenant-12	r1:C0/F2/W0/90%	r2:C0/F2/W0/90%	r3:C0/F2/W0/90%
workplace-01	r1:C0/F0/W3/85%	r2:C0/F0/W0/100%	r3:C0/F0/W2/90%
workplace-02	r1:C0/F3/W1/85%	r2:C0/F2/W2/80%	r3:C0/F2/W2/80%
workplace-03	r1:C1/F1/W1/85%	r2:C0/F2/W3/75%	r3:C0/F1/W1/90%
workplace-04	r1:C2/F0/W2/80%	r2:C3/F0/W2/75%	r3:C2/F1/W2/75%
workplace-05	r1:C1/F1/W1/85%	r2:C1/F0/W0/95%	r3:C2/F0/W2/80%
workplace-06	r1:C0/F0/W2/90%	r2:C2/F0/W2/80%	r3:C1/F0/W1/90%
workplace-07	r1:C0/F1/W2/85%	r2:C0/F0/W0/100%	r3:C0/F1/W0/95%
workplace-08	r1:C0/F3/W0/85%	r2:C1/F2/W1/80%	r3:C0/F4/W2/70%
workplace-09	r1:C0/F0/W2/90%	r2:C0/F0/W1/95%	r3:C0/F0/W2/90%
workplace-10	r1:C0/F0/W3/90%	r2:C0/F0/W2/90%	r3:C0/F0/W1/95%
workplace-11	r1:C0/F0/W1/95%	r2:C0/F0/W1/95%	r3:C0/F0/W2/90%
workplace-12	r1:C0/F0/W0/100%	r2:C1/F0/W0/95%	r3:C0/F1/W0/95%
```
