# CT 보고서 — Thread-E 100신규 사건 GPT 리뷰 반영 결과 (2026-04-09)

## 1. 검토 범위

- GPT 리뷰 원문: `docs/ref/리뉴얼참고/GPT_review/solomon_100_cases_review.md`
- GPT 평점 CSV: `docs/ref/리뉴얼참고/GPT_review/solomon_100_cases_review.csv`
- Thread-E 기존 기준 문서:
  - `docs/ref/리뉴얼참고/thread-e-100-new-cases-master-index.md`
  - `docs/ref/리뉴얼참고/thread-e-100-new-cases-priority-top20.md`
  - `docs/ref/리뉴얼참고/thread-e-100-new-cases-wave-a-authoring-order.md`
- Thread-E 후속 조치 문서:
  - `docs/ref/리뉴얼참고/thread-e-gpt-review-followup-action.md`

이 보고서는 GPT 피드백 자체의 요약이 아니라, 그 피드백을 Thread-E 생산 파이프라인 기준으로 다시 해석한 결과를 정리한 것이다.

## 2. GPT 리뷰 핵심 결과

- 전체 판정: `KEEP 75 / DEVELOP 23 / DROP 2`
- 평균 재미 점수: `8.0 / 10`
- 강세 카테고리: `spouse / online / workplace / professional`
- 약세 구간: `neighbor / civic / easy 일부`

### 상위 10건

- `[6]` 냉동배아 연장동의서 — `9.5`
- `[50]` 데이터룸의 체크박스 — `9.5`
- `[75]` 음성모델 11초 — `9.5`
- `[81]` 주황 팔찌의 13분 — `9.5`
- `[28]` 구조보다 먼저 올라간 릴스 — `9.0`
- `[41]` 장애보고서의 47분 — `9.0`
- `[46]` 원본클라우드의 워터마크 — `9.0`
- `[51]` 보일러 앱의 18도 — `9.0`
- `[55]` 전자계약서의 빈 페이지 — `9.0`
- `[62]` 행사가 72시간 — `9.0`

### 하위 10건

- `[39]` 공동텃밭의 pH센서 — `5.5`, `DROP`
- `[93]` 1365의 18시간 — `5.5`, `DROP`
- `[22]` 바우처의 로마자 철자 — `6.0`, `DEVELOP`
- `[59]` 주차스티커의 QR 두 개 — `6.0`, `DEVELOP`
- `[15]` 상속포기 링크 — `6.5`, `DEVELOP`
- `[29]` 렌즈 보험의 찍힘 — `6.5`, `DEVELOP`
- `[37]` 재활주차 스티커 — `6.5`, `DEVELOP`
- `[69]` 교육 QR의 두 얼굴 — `6.5`, `DEVELOP`
- `[88]` 보조교사 2반 화요일 — `6.5`, `DEVELOP`
- `[13]` 실버타운 대기번호 — `7.0`, `DEVELOP`

### GPT가 짚은 핵심 패턴

- `34 / 36 / 56`: 센서·측정값 편향
- `35 / 53`: 보관공간 무단 점유·중복배정
- `69 / 93`: QR 대리출석 + 실적 밀어넣기
- `31 / 59`: 공용 주차·접근권 편법
- `72 / 79`: 공동운영 권한 남용
- 기존 진행 사건과의 근접군:
  - `40`, `58`: 누수·보험·하자 조작
  - `71`, `23`: 창작 협업 파탄 + 디지털 여론전
- 빠진 영역:
  - 플랫폼 노동/기가경제
  - 비혼 연인·동거 해체
  - 세무사·노무사·중개사 등 전문 서비스 권한 남용
  - 교회·동호회·맘카페형 오프라인 관계권력

## 3. Thread-E 해석

Thread-E 입장에서 이번 GPT 리뷰는 세 가지를 확인해 준다.

### A. 구조 실패보다 훅/차별화 문제가 더 크다

- `DROP`은 2건뿐이다.
- `DEVELOP 23`도 대부분 구조 붕괴가 아니라 아래 문제로 분류된다.
  - 훅이 약함
  - stakes가 작음
  - 기존 사건/동일 배치 내 중복감이 큼
  - easy 사건이라 첫인상 강도가 낮음

즉, 신규 100건의 기본 설계는 대체로 살아 있고, 대량 폐기보다 선별 보강이 효율적이다.

### B. 기존 Wave A 10건은 유지 가능하다

기존 Wave A 10건은 GPT 기준으로 `10/10 전부 KEEP`이다.

| caseId | 사건명 | 점수 | 판정 |
|---|---|---:|---|
| `workplace-new-02` | 행사가 72시간 | 9.0 | KEEP |
| `tenant-new-01` | 보일러 앱의 18도 | 9.0 | KEEP |
| `civic-new-10` | 심사표 72점 | 8.0 | KEEP |
| `partnership-new-10` | 데이터룸의 체크박스 | 9.5 | KEEP |
| `spouse-new-06` | 냉동배아 연장동의서 | 9.5 | KEEP |
| `neighbor-new-03` | 전자동의서의 지문 | 8.5 | KEEP |
| `online-new-05` | 음성모델 11초 | 9.5 | KEEP |
| `professional-new-01` | 주황 팔찌의 13분 | 9.5 | KEEP |
| `friend-new-08` | 구조보다 먼저 올라간 릴스 | 9.0 | KEEP |
| `family-new-04` | 가족클라우드의 복원본 | 9.0 | KEEP |

따라서 기존 Thread-E의 `Wave A handoff` 판단은 유지해도 된다.

### C. 다만 재미 점수만 보면 승격 후보가 있다

기존 top20 밖이지만 GPT 재미 점수 `9.0` 이상으로 강하게 나온 사례가 있다.

- `tenant-new-05` — 전자계약서의 빈 페이지
- `workplace-new-05` — 면접평가표의 별 세 개
- `online-new-01` — 삭제로그 04:12
- `online-new-04` — 레이어 27의 워터마크
- `online-new-07` — 테스트키 40개
- `online-new-10` — DMCA 19건
- `civic-new-02` — 산재일지의 11분

이들은 `기존 비중복 기준 때문에 보수적으로 밀렸던 케이스`이지, 품질이 낮아서 빠진 케이스는 아니다.

## 4. Thread-E가 이미 취한 조치

### 1) 후속 실행 기준 문서 작성

- 작성 완료: `docs/ref/리뉴얼참고/thread-e-gpt-review-followup-action.md`

포함 내용:

- `DROP 2` 즉시 제외
- `DEVELOP 23` 우선순위 재배치
- 중복군 관리 규칙
- `KEEP 75` 중 즉시 생성 우선군 정리
- 기존 `top20 / waveA`와의 관계 정리

### 2) DROP 2 활성 풀 제외 결정

- `neighbor-new-09` — 공동텃밭의 pH센서
- `civic-new-03` — 1365의 18시간

현재 판단은 `부분 수정 salvage`보다 `replacement 설계`가 더 효율적이라는 쪽이다.

### 3) DEVELOP 23 보정 큐 확정

보정 작업은 `Priority 1 → Priority 2 → Priority 3` 순서로 들어간다.

#### Priority 1

- `family-new-03`
- `family-new-05`
- `friend-new-02`
- `friend-new-09`
- `neighbor-new-07`
- `tenant-new-09`
- `workplace-new-09`
- `professional-new-08`

공통 보정 목표:

- 첫 문장 훅 강화
- stakes 상향
- 2차 피해 명시
- easy 사건의 존재감 상승

#### Priority 2

- `family-new-08`
- `friend-new-05`
- `neighbor-new-10`
- `partnership-new-05`
- `partnership-new-08`
- `partnership-new-09`
- `tenant-new-02`
- `workplace-new-04`
- `civic-new-05`

공통 보정 목표:

- 현장감/생존감 강화
- 구조 설명보다 상황 압박을 앞세우기

#### Priority 3

- `spouse-new-05`
- `spouse-new-07`
- `partnership-new-03`
- `tenant-new-06`
- `tenant-new-08`
- `online-new-09`

공통 보정 목표:

- 유사군과 차별화
- 훅 재배치
- 감정 stakes 선명화

### 4) 즉시 생성 우선 KEEP 풀 고정

GPT 점수 `9.0+ KEEP` 기준으로 21건을 `즉시 생성 우선군`으로 별도 묶었다.

핵심 상위군:

- `spouse-new-06`
- `partnership-new-10`
- `online-new-05`
- `professional-new-01`
- `friend-new-08`
- `partnership-new-01`
- `partnership-new-06`
- `tenant-new-01`
- `workplace-new-02`
- `family-new-04`

이 풀은 `재미 검증 통과 우선군`이고, 기존 top20은 `비중복/카테고리 밸런스까지 본 운영 우선군`으로 분리해서 관리하기로 했다.

## 5. 현재 기준 결론

CT가 지금 확인해야 할 핵심은 아래 다섯 가지다.

1. GPT 기준으로 신규 100건은 전반적으로 살아 있다.  
   `DROP 2`만 제외하면 대량 폐기 상황은 아니다.

2. 현재 가장 효율적인 순서는  
   `DROP 2 제외 → DEVELOP 23 보정 → KEEP 75 생성 투입`이다.

3. 기존 Wave A 10건은 유지 가능하다.  
   전부 KEEP이므로 handoff 판단을 뒤집을 필요는 없다.

4. 다만 재미 점수만 보면 기존 top20 바깥 승격 후보가 분명히 존재한다.  
   특히 `tenant-new-05`, `workplace-new-05`, `online 신규군`, `civic-new-02`는 재선별 후보 가치가 높다.

5. Thread-E는 현재 `재미 우선`과 `비중복/운영 우선`을 분리해서 다루고 있다.  
   즉, 이번 GPT 리뷰를 top20 문서에 즉시 덮어쓰기보다, `운영 기준 유지 + 점수 기반 승격 후보 별도 관리`가 더 안전하다고 본다.

## 6. 권장 다음 단계

### 권장안 A

- 기존 Wave A 10건은 그대로 Thread A에 넘긴다.
- 동시에 Thread-E는 `Priority 1` 8건 보정을 먼저 수행한다.
- 그 뒤 `DEVELOP 23` 보정 완료본을 기준으로 `top20 / waveA`를 한 번 더 재정렬한다.

장점:

- 현재 파이프라인을 끊지 않는다.
- 이미 `9.0~9.5` 검증을 받은 핵심본을 바로 생산에 태울 수 있다.
- 저점 DEVELOP 군은 별도 품질 보정에 집중할 수 있다.

### 권장안 B

- 생산 전, GPT 점수 기준으로 `top20 / waveA`를 먼저 다시 짠다.

이 방식은 가능하지만, 현재 Thread-E 판단으로는 권장도가 낮다.

이유:

- 재미 점수는 높아도 기존 완성/리디자인과 전장 감각이 더 겹칠 수 있다.
- 운영 기준이 흔들리면 이미 만든 handoff 문서와 정렬이 깨진다.
- 지금은 `보정 대상 23건`이 먼저라, top20 재편을 서두를 실익이 크지 않다.

## 7. Thread-E 공식 제안

Thread-E 제안은 아래 한 줄로 정리된다.

> `Wave A는 유지`, `DROP 2는 폐기`, `DEVELOP 23은 우선순위대로 보정`,  
> 그리고 보정 완료 후에만 `top20 / waveA` 재선별 여부를 다시 판단하는 것이 가장 안전하다.

현재 기준으로는 GPT 피드백이 기존 설계를 뒤엎는 결과가 아니라,  
`상위권은 더 확신해 주고`, `중하위권은 무엇을 고치면 되는지 선명하게 알려준 검증 결과`로 보는 것이 맞다.
