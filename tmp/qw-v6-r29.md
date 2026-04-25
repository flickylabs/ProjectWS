# QW V6 R29: 전체 transcript batch 스캔 — 3사건만 추출

## 실행
- tests/transcripts/*.json 전체 batch 스캔
- **활성 3사건(spouse-01/friend-01/family-01)만 관심, legacy 81건은 범위 외**

## 활성 3사건 요약
| 사건 | 전사본 | 8-a | 8-b | 8-c | 8-d | 9-a~g | 10-a~e | forbid |
|---|---|---|---|---|---|---|---|---|
| spouse-01 | Apr 24 latest | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| friend-01 | Apr 24 latest | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| family-01 | Apr 24 latest | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## 과거 변이에서 발견된 V6 집중-8 true positives (2건)
1. `spouse-01-r1-v3 turn12 B` (Apr 7) — `재판관님 + 제 남편 + 이걸...생각이야?`
2. `family-01-r1-v3 turn22 B` (Apr 7) — `제 동생 + 도현아,` (단, 캐릭터 이름 불일치)

## 의미
- **현재(Apr 24) 상태는 clean**
- 과거 드리프트 사례가 존재했고, V6 CT 문서가 경고하는 "실플레이에서 호칭 혼종 발견"의 근원 확인
- R22/R27의 `enforceHonorifics` 확장으로 **동일 패턴 재발 시 자동 교정**

## Legacy 사건 (범위 외) 발견 forbid 건수
- family-02~07, partnership, workplace 등 다수 transcript에서 forbid 1~3건
- 이들은 V6 범위 외 — 기록만 남기고 수정 없음

## 라운드 판정: **PASS** (활성 3사건 clean 확인, 범위 외 legacy는 CT 판단)
