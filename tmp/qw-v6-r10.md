# QW V6 R10: R5~R9 재검증 + 3사건 scriptedText 누적 카운트

## 실행
- R5~R9 수정 건수: **0건** → 재스캔 결과 불변
- 3사건 scriptedText 전체 재집계 (빠른 검증)

## 3사건 누적 카운트 (정적)
| 카테고리 | 합계 | 실 FAIL | FP / WARN |
|---|---|---|---|
| 8-a (재판관+상대호격) | 0 | 0 | - |
| 8-b (재판관+반말종결) | 0 | 0 | - |
| 8-c (합니다체+반말종결) | 1 | 0 | 1 FP (내부 따옴표 재인용, spouse a\|d-1\|S3\|empathy v4) |
| 8-d (간접지칭+상대호격) | 1 | 0 | 1 FP (-야 어미 false match, family a\|d-2\|S4) |
| FORBID(금지 10종) | 9 | 0 | 3 FP NPC 간접인용 + 6 WARN judge evidence_discovery 단어되묻기 |
| PLACEHOLDER 9-a~g | 0 | 0 | - |

## FP/WARN 분류 상세
- **FP (4건)**: 내부 따옴표 재인용 1, 가족 발화 간접인용 3. 스캐너 regex 개선 필요
- **WARN (6건)**: "지금/방금 X라고 하셨습니다" 단어되묻기 패턴 (spouse evidence_discovery 2, friend evidence_discovery 3+witness 1, family evidence_discovery 1)
- **FAIL: 0**

## witnessTestimonyData 누적
- spouse-01: JSON 아닌 내부 스크립트 형태 (증인 생성 로직에 텍스트 포함 여부 재확인 필요)
- friend-01.ts: FORBID 1 (judge 단어되묻기)
- family-01.ts: FORBID 0

## phase1/phase2 dialogues 누적
- 3사건 전부 issues 0 (R5, R8/R9 내 확인 완료)

## 수정 (이번 라운드, 권한 내)
- 없음

## CT 검토 요청 (권한 초과)
- R8 내용 유지 — "X라고 하셨습니다" 단어되묻기 총 **7건 WARN** 일괄 교정 필요 여부 판단

## 다음 라운드로 이월
- R11: 3사건 끼어들기(interjection) + 모순추궁(contradiction_pursuit) 집중
- R12: 3사건 증인 다층
- R13: 3사건 증거/판결/aftermath

## 라운드 판정: **PASS**
