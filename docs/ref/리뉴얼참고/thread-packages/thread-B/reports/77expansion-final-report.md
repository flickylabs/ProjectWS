# Thread B — 77건 확장 최종 보고서

> 작성: Thread B
> 일시: 2026-04-05
> 빌드: **PASS** (tsc --noEmit 에러 0건)

---

## 1. 작업 요약

| 항목 | 수량 |
|------|------|
| 대상 사건 | 77건 (7카테고리 × 11건, -02~-12) |
| Evidence 교정 | **480건** |
| DossierCard 교정 | **489건** |
| **교정 합계** | **969건** |
| 수정 파일 (Evidence) | 77개 case JSON |
| 수정 파일 (DossierCard) | 77개 v3-game-loop-data.json |
| GPT Pro 세션 | 11배치 × 1세션 = 11세션 |

---

## 2. 배치별 교정 건수

| 배치 | 사건 | Evidence | DossierCard | 합계 |
|------|------|:---:|:---:|:---:|
| 1 | spouse-02~08 | 13 | 25 | 38 |
| 2 | spouse-09~12, family-02~04 | 35 | 45 | 80 |
| 3 | family-05~11 | 49 | 43 | 92 |
| 4 | family-12, friend-02~07 | 50 | 54 | 104 |
| 5 | friend-08~12, neighbor-02~03 | 41 | 44 | 85 |
| 6 | neighbor-04~10 | 48 | 48 | 96 |
| 7 | neighbor-11~12, partnership-02~06 | 68 | 55 | 123 |
| 8 | partnership-07~12, tenant-02 | 52 | 47 | 99 |
| 9 | tenant-03~09 | 38 | 42 | 80 |
| 10 | tenant-10~12, workplace-02~05 | 32 | 49 | 81 |
| 11 | workplace-06~12 | 61 | 38 | 99 |
| **합계** | **77건** | **487** | **490** | **977** |

*Note: 에이전트 보고 합계와 소폭 차이는 batch-01 이중검증 시 기존 교정분과의 중복 처리에 의한 것.*

---

## 3. 교정 패턴 분석

### Evidence (surfaceName / surfaceDescription)

| 위반 유형 | 건수 | 비율 |
|-----------|:---:|:---:|
| anchorTruth 핵심어 노출 | ~180 | 37% |
| 기관명/서비스명 (카카오톡, 노션, SNS, 병원, 약국 등) | ~120 | 25% |
| 직함 노출 (중개사, 법무사, 심사위원, 운영자 등) | ~80 | 16% |
| 핵심 진실 직접 노출 / 결론형 표현 | ~60 | 12% |
| "특정 X" 금지 패턴 | ~15 | 3% |
| 번역체 / 기술 용어 (포렌식, 해시, export 등) | ~30 | 6% |

### DossierCard

| 위반 유형 | 건수 | 비율 |
|-----------|:---:|:---:|
| q1 hint 수준 초과 (구체 정보 과다) | ~420 | 86% |
| "당신" 금지 위반 (q2/q3) | ~30 | 6% |
| 클리셰 표현 (말씀해 보십시오 등) | ~15 | 3% |
| 영문/기술 용어 혼용 (form, export, ID 노출) | ~15 | 3% |
| evidence ID 질문 본문 노출 | ~5 | 1% |

---

## 4. 프로세스

```
GPT Pro 검수 (11세션)
  → GPT 결과 Thread B 확인 (형식/품질/누락 체크)
  → 원본 파일에 일괄 반영 (에이전트 병렬 처리)
  → tsc --noEmit 빌드 확인 → PASS
```

---

## 5. 수정된 파일

### Evidence (77건 case JSON)
```
src/data/cases/generated/spouse-{02~12}.json     (11건)
src/data/cases/generated/family-{02~12}.json     (11건)
src/data/cases/generated/friend-{02~12}.json     (11건)
src/data/cases/generated/neighbor-{02~12}.json   (11건)
src/data/cases/generated/partnership-{02~12}.json (11건)
src/data/cases/generated/tenant-{02~12}.json     (11건)
src/data/cases/generated/workplace-{02~12}.json  (11건)
```

### DossierCard (77건 v3-game-loop-data)
```
docs/ref/리뉴얼참고/gpt-batch/{category}-{02~12}/{category}-{02~12}-v3-game-loop-data.json
```

---

## 6. 검증 체크리스트

- [x] surfaceName에 기관명/서비스명/직함/실명 → **0건** (교정 후)
- [x] surfaceDescription에 핵심 진실 직접 노출 → **0건** (교정 후)
- [x] 번역체 9패턴 → **0건** (교정 후)
- [x] "특정 X" 패턴 → **0건** (교정 후)
- [x] DossierCard q1 hint 수준 초과 → **0건** (교정 후)
- [x] requiredLieState 정합성 → **전건 일치**
- [x] "당신" 금지 → **0건** (교정 후)
- [x] 빌드 확인 (tsc --noEmit) → **PASS**

---

## 7. 기준본(-01) 확인

**기준본 7건은 일절 수정하지 않았다.** (미션 문서 지시 준수)

---

## 8. GPT Pro 세션 자료 위치

```
docs/ref/리뉴얼참고/thread-packages/thread-B/gpt-pro-sessions/
├── batch-01-spouse-02-08/       (prompt.md + 14 data files + output/)
├── batch-02-spouse09-family04/
├── batch-03-family05-11/
├── batch-04-family12-friend07/
├── batch-05-friend08-neighbor03/
├── batch-06-neighbor04-10/
├── batch-07-neighbor11-partner06/
├── batch-08-partner07-tenant02/
├── batch-09-tenant03-09/
├── batch-10-tenant10-workplace05/
└── batch-11-workplace06-12/
```
