# QW V6 R13: 3사건 증거 뷰어 + 판결/결과 (집중-6/7) — Phase A 종료

## 실행
- viewerData 재확인 + truthTable / solutions / evidenceCombinations / aftermath 텍스트 스캔

## 집중-6 증거 뷰어 데이터 정합성
- 3사건 × 7 evidence = 21 evidence 전수 viewerData 존재 (R4에서 확인)
- evidence.type ↔ viewerData.meta.type ↔ 슬롯 키 **전수 일치**

## 집중-7 판결/결과 화면
| 사건 | disputes | truthTable | solutions | evidenceCombinations | aftermath |
|---|---|---|---|---|---|
| spouse-01 | 4 | 5 | 3 | **5** | 5 |
| friend-01 | 5 | 5 | 3 | **4** | 5 |
| family-01 | 5 | 5 | 3 | **5** | 5 |

- **family-01 `evidenceCombinations` = 5** (V5 리포트에선 undefined였음 → 이후 보완됨)
- aftermath 5 시나리오(a_primary_fault/b_primary_fault/shared_fault/protective_resolution/procedural_caution) 3사건 전부 완비
- solutions 3종 각 사건 고유 네이밍 (ex. spouse=공동재산회복/신뢰순서분리/봉인정보경계)

## 텍스트 품질 스캔 (truthTable + solutions + evidenceCombinations + disputes)
- FORBID 금지패턴: **0건** (3사건)
- PLACEHOLDER 9-a~g: **0건** (3사건)

## Phase A 종합 (R1~R13)
| 항목 | spouse-01 | friend-01 | family-01 | 총 |
|---|---|---|---|---|
| 8-a 재판관+상대호격 | 0 | 0 | 0 | **0** |
| 8-b 재판관+반말 | 0 | 0 | 0 | **0** |
| 8-c 합니다체+반말(FP 포함) | 1 FP | 0 | 0 | 0 실 |
| 8-d 간접지칭+상대호격(FP 포함) | 0 | 0 | 1 FP | 0 실 |
| 9-a~g Placeholder | 0 | 0 | 0 | **0** |
| FORBID "라고 하셨" | 2 WARN | 3 WARN+1 FP | 1 WARN+2 FP | 6 WARN+3 FP |
| 기타 FORBID 9종 | 0 | 0 | 0 | **0** |
| 집중-3 끼어들기 대상 | PASS | PASS | PASS | PASS |
| 집중-4 모순추궁 체인 | PASS | NOTE(S3/4 갭) | NOTE(S3/4 갭) | NOTE |
| 집중-5 증인 다층 | PASS | PASS | PASS | PASS |
| 집중-6 증거 뷰어 | PASS | PASS | PASS | PASS |
| 집중-7 판결/결과 | PASS | PASS | PASS | PASS |

## 수정 (이번 라운드, 권한 내)
- 없음 (Phase A 통해 총 수정 0건)

## CT 검토 요청 (권한 초과)
1. **"지금/방금 X라고 하셨습니다" 단어되묻기 6건** — 교정 필요 여부 결정
2. **friend/family contradiction_pursuit S3/S4 공란 16 entries** — 데이터 보완 여부 결정
3. **스캐너 regex 개선** — 8-d vocative 구분, 내부 따옴표 재인용 감지

## 다음 라운드 준비 (R14 이전)
- ⚠️ **`tests/qw-runtime-audit.cjs` 작성 필요**
- ⚠️ **`tests/run-84-headless.cjs`에 로그 덤프 옵션(`--output <path>`) 확인 → 없음**. 기존 `tests/transcripts/<caseId>.json` 이 전사본 용도로 활용됨. 그러나 **V6 스키마(speaker/role/phase/eventType)와 매핑 불일치** → R14 시작 전 어댑터 또는 runner 확장 필요
- CT 보고 필요: run-84-headless.cjs 턴 데이터 스키마를 V6 형식(speaker/role/phase/eventType)으로 확장할지, 또는 별도 어댑터에서 매핑할지

## Phase A 판정: **PASS** (FAIL 0, WARN 6건, FP 3건, NOTE 1건)
