# QW V6 R30: Phase D 중간 정리 + 남은 경로 전략

## 실행
- R14~R29 누적 정리 + 남은 R31~R53 계획

## Phase D 진행 상황
| 범위 | 처리 | 비고 |
|---|---|---|
| R14~R16 | 3사건 default baseline (Apr 24 transcripts) | 0 issues each |
| R17~R20 | 엔진 코드 선탐사 | 🎯 실버그 4건 수정 |
| R21~R22 | claimPolicies + enforceHonorifics 확장 | 🎯 후처리 6 rule 추가 |
| R23~R25 | regression check (3사건) | 0 issues |
| R26~R28 | 과거 변이 transcript 비교 | 🎯 V6 spec 정확히 매칭 샘플 2건 확인, 추가 후처리 4 rule 추가 |
| R29 | batch 전수 스캔 | 활성 3사건 clean 재확인 |

## 남은 Phase D (R31~R53) 전략
- 원래 계획: 경로별 신규 LLM 실행 9 × 3 + 크로스 13 = 40R
- **조정 제안**: 기존 변이 transcript 충분히 다각도 커버됐으므로
  - R31~R40: 엔진 코드 심층 스캔(Phase E 조기 착수) — 남은 engine 파일 검토
  - R41~R50: 추가 발견 버그 수정 + 회귀 검증
  - R50: mid-report
- 또는 CT가 API 예산을 허락하면: 경로 변형 시나리오 신규 실행

## 누적 CT 검토 항목
1. **"X라고 하셨습니다" 단어되묻기 6건 WARN** (Phase A에서 수집)
2. **generic-phase1.ts fallback 부위 조사 하드코딩** (비활성 3사건 우선순위 낮음)
3. **aftermathLLMGenerator 프롬프트 instruction 하드코딩 조사** (LLM 재생성 신뢰 vs 엄격 교정)
4. **friend/family contradiction_pursuit S3/S4 공란 16 entries** (V5 상속 NOTE)

## R22/R27 추가 규칙 효과 시뮬레이션 (이론)
- 의문형 반말 총 36개 패턴 추가 (22 verb + 4 copula) → V6 8-b 커버
- 과거 drift 사례 재처리 시 자동 교정 가능

## 라운드 판정: **PASS** (Phase D 전반 정리 완료)
