# Thread-E Wave B DEVELOP List

## 기준

- 원판정 기준: `GPT_review/solomon_100_cases_review.csv`
- 실행 기준: `ct-to-threadE-and-threadA-gpt-followup.md`
- 주의: CT 후속 문서는 `neighbor-new-10`, `civic-new-07`을 DROP 대상으로 지정했다. 원 CSV에서는 `neighbor-new-10 = DEVELOP`, `civic-new-07 = KEEP`이다. 아래 표는 두 사실을 동시에 남기고, 실제 작업 우선순위는 CT 지시를 따른다.

## Wave B 10 현황

| global | caseId | 제목 | score | CSV verdict | 실행 조치 | 메모 |
|---:|---|---|---:|---|---|---|
| 3 | `spouse-new-03` | 특공 신청의 밤 | 9.0 | KEEP | 유지 | 수정 없음 |
| 12 | `family-new-02` | 어머니 떡집의 손글씨 | 9.0 | KEEP | 유지 | 수정 없음 |
| 21 | `friend-new-01` | 1초 빠른 피니시칩 | 8.5 | KEEP | 유지 | 수정 없음 |
| 40 | `neighbor-new-10` | 공용보험의 수분계 | 7.0 | DEVELOP | DROP 대체 | 원 CSV 기준 유일한 Wave B DEVELOP |
| 41 | `partnership-new-01` | 장애보고서의 47분 | 9.0 | KEEP | 유지 | 수정 없음 |
| 60 | `tenant-new-10` | 렌트프리 14일 | 8.5 | KEEP | 유지 | 수정 없음 |
| 70 | `workplace-new-10` | 퇴직동의서의 Track Changes | 8.5 | KEEP | 유지 | 수정 없음 |
| 76 | `online-new-06` | 멤버십 ZIP 3.2GB | 8.0 | KEEP | 유지 | 수정 없음 |
| 90 | `professional-new-10` | final_final_v7.docx | 8.0 | KEEP | 유지 | 수정 없음 |
| 97 | `civic-new-07` | 포상금 15퍼센트 | 8.0 | KEEP | DROP 대체 | CT 후속 문서에서 DROP override |

## 실제 DEVELOP 식별

### 1. `neighbor-new-10` — 공용보험의 수분계

- CSV 판정: `DEVELOP 7.0`
- GPT 약점 요약: 누수·곰팡이·보험금 계열이 기존 완성/리디자인 축과 가깝고, 이웃 배치 안에서도 센서·측정값 조작군 피로가 누적된다.
- GPT 보정 방향: `보험사가 같은 벽면으로 두 건의 상반된 누수 신고를 받는다` 수준으로 첫 문장을 압축하고, `자동관수기 app alert`를 핵심 증거축으로 끌어올릴 것.
- 실행 판단: 이번 라운드에서는 살리는 쪽보다 대체 기획이 효율적이다. CT 지시에 따라 DROP 후 replacement로 교체한다.

## Thread-A 전달용 정리

- 원 CSV 기준 Wave B DEVELOP는 `neighbor-new-10` 1건뿐이다.
- 실행 기준으로는 `neighbor-new-10`, `civic-new-07` 모두 생성 제외 후 replacement 대기 상태로 본다.
- 따라서 현재 Thread-A가 바로 참조 가능한 Wave B 유지군은 8건이다.
