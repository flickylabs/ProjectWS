# [Session B-2] workplace-01 v2-atoms Progressive Truth Throttle 교정

## 이 폴더의 파일 목록
1. **rules.md** — 교정 규칙 (먼저 읽으세요)
2. **workplace-01-v2-atoms.json** — 교정 대상 원본
3. **prompt.md** — 이 문서 (작업 지시)

## 배경
솔로몬 게임의 NPC 심문 시스템에서 lieState(S0~S5)에 따라 NPC가 말할 수 있는 진실의 범위가 제한된다.
현재 workplace-01의 v2-atoms에서 S0~S2 atoms가 구체적 진실을 그대로 노출하고 있어 교정이 필요하다.

## 작업
1. `rules.md`의 교정 규칙을 숙지한다.
2. `workplace-01-v2-atoms.json`을 읽는다.
3. S0~S2 상태의 모든 atom에 대해 아래 위반 목록을 참고하여 `factText`와 `slots`를 교정한다.
4. S3 이상의 atom은 **원본 그대로 유지**한다.
5. 교정된 전체 JSON을 출력한다.

## 이 사건의 인물 정보
- 윤태성 (partyA) — 팀장
- 박서윤 (partyB) — 대리, 보고서 실무 작성자
- 이지안 — HR 담당자

## 위반 목록

### Side A (윤태성)

**d-1 (보고서 저작 분쟁):**
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| a:d-1:denial:1 | S0 | fullName, judgeRef | "박서윤", "박 대리" |
| a:d-1:self_justification:3 | S1 | rule | "실무 기여자 병기 관행" |
| a:d-1:admission:4 | S2 | fullName, role (factText!) | factText: "핵심 분석 프레임과 KPI 표의 원 작성자가 박서윤이었다는 사실" |
| a:d-1:context:5 | S2 | fullName, judgeRef | "윤태성", "윤 팀장" |

**d-2 (인사정보 열람):**
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| a:d-2:privacy:0 | S0 | fullName, institution | "박서윤", "HR" |
| a:d-2:rule:1 | S0 | rule (factText!) | factText: "인사 화면 공유" |
| a:d-2:context:2 | S1 | fullName | "박서윤" |
| a:d-2:timeline:3 | S1 | time | "새벽 1시대" |
| a:d-2:emotion:4 | S2 | fullName (factText!) | factText: "박서윤이 억울함과 불안을" |
| a:d-2:responsibility:5 | S2 | fullName, evidence, service | "슬랙 캡처 묶음" |

**d-3 (수정이력 위조):**
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| a:d-3:evidence:0 | S0 | fullName, time (factText!) | factText: "PDF상 박서윤이 23시 48분 최종 수정자" |
| a:d-3:responsibility:1 | S0 | time | "23시 48분" |
| a:d-3:self_justification:2 | S1 | evidence | "문서 수정 이력 PDF" |
| a:d-3:uncertainty:3 | S1 | institution | "공용 PC 세션" |
| a:d-3:admission:4 | S2 | evidence | "문서 수정 이력 PDF" |

**d-4 (평가 개입):**
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| a:d-4:denial:0 | S0 | institution (factText!) | factText: "HR 초안에 비공식 개입" |
| a:d-4:rule:1 | S0 | rule | "평가 보정 권한 구분" |
| a:d-4:self_justification:2 | S1 | evidence, institution | "HR 평가 초안 버전기록" |
| a:d-4:context:3 | S1 | institution, fullName, judgeRef | "HR", "이지안", "HR 담당자" |
| a:d-4:admission:4 | S2 | evidence, institution | "HR 평가 초안 버전기록" |
| a:d-4:quote:5 | S2 | verbatim quote | "기여는 있으나 리스크가 크다" |

**d-5 (크레딧 분쟁):**
| atom ID | state | 위반 | 문제 값 |
|---------|-------|------|---------|
| a:d-5:rule:0 | S0 | rule | "실무 기여자 병기 관행" |
| a:d-5:counter:1 | S0 | evidence, fullName, service | "슬랙 캡처 묶음", "박서윤" |
| a:d-5:threshold:2 | S1 | rule, evidence | "실무 기여자 병기 관행", "슬랙 캡처 묶음" |
| a:d-5:self_justification:3 | S1 | fullName, judgeRef | "윤태성", "윤 팀장" |
| a:d-5:admission:4 | S2 | rule | "실무 기여자 병기 관행" |
| a:d-5:counter:5 | S2 | fullName, evidence, service | "박서윤", "슬랙 캡처 묶음" |

### Side B (박서윤)
Side A와 동일 유형의 위반이 Side B 전체에도 반복됨:
- fullName("윤태성","박서윤"), judgeRef("윤 팀장","박 대리") — S0부터 전면 노출
- institution("HR") — S0부터 노출
- evidence("문서 수정 이력 PDF","슬랙 캡처 묶음","HR 평가 초안 버전기록") — S0부터 노출
- service("슬랙") — S0부터 노출
- time("23시 48분","20시 17분","23시 41분","새벽 1시대") — S0부터 노출
- rule("실무 기여자 병기 관행","인사 정보 비공개 원칙") — S0부터 노출
- role("보고서 오너","보조 분석") — S0부터 노출

**Side B도 동일한 교정 규칙을 적용하여 S0-S2 atoms 전체를 교정해 주세요.**

## 산출물 형식
- 교정된 `workplace-01-v2-atoms.json` 전체를 JSON으로 출력
- 구조는 원본과 완전히 동일, S0-S2 atoms의 factText와 slots 값만 교정
- S3+ atoms는 한 글자도 변경하지 말 것
