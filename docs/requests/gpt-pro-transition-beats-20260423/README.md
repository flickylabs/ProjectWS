# GPT Pro 요청 — transitionBeats 전수 보강 (2026-04-23)

## 목적

3사건(spouse-01/family-01/friend-01)의 `transitionBeats` **82건**을 추가 생성합니다.
Thread-Q 2차 R8 WARN 해소 — S4/S5 authored beat 부족 문제.

## 현황

| 사건 | 기존 | 추가 필요 | 완성 후 |
|------|-----|---------|--------|
| spouse-01 | 0 | 25 | 25 |
| family-01 | 9 | 29 | 38 |
| friend-01 | 9 | 28 | 37 |
| **합계** | **18** | **82** | **100** |

> 이전 `메시지.md`에는 총 77건으로 표기되어 있었으나, 원본 문서의 내역 합계 계산 오류였음. 각 스레드 메시지에서 정확한 건수로 정정됨 (family: 27→29, friend: 25→28).

---

## ★ 병렬 3-스레드 실행 방식 (현재 권장)

spouse-01 / family-01 / friend-01을 **3개의 독립된 GPT Pro 스레드**에서 동시에 진행합니다.

### 각 스레드 공통으로 "소스"에 넣을 파일 (1개)

프로젝트 소스/지식 영역에 **아래 파일 하나**를 올려두고 3개 스레드가 공유 참조:

- [`common-source/quality-rules.md`](common-source/quality-rules.md) — 한국어 품질 규칙 전체 (번역체 금지/호칭/TruthThrottle/behaviorHint 구체성)

### 스레드 1 — spouse-01

| 항목 | 내용 |
|------|------|
| 스레드 폴더 | [`thread-spouse-01/`](thread-spouse-01/) |
| 첨부 파일 | [`thread-spouse-01/spouse-01-game-events.json`](thread-spouse-01/spouse-01-game-events.json) |
| 메시지 | [`thread-spouse-01/메시지.md`](thread-spouse-01/메시지.md) |
| 생성량 | **25건** (전체 신규) |
| 캐릭터 | A=박지연(avoidant) / B=이준호(cold_logic) |

### 스레드 2 — family-01

| 항목 | 내용 |
|------|------|
| 스레드 폴더 | [`thread-family-01/`](thread-family-01/) |
| 첨부 파일 | [`thread-family-01/family-01-game-events.json`](thread-family-01/family-01-game-events.json) |
| 메시지 | [`thread-family-01/메시지.md`](thread-family-01/메시지.md) |
| 생성량 | **29건** (기존 9건 보존, 추가분만) |
| 캐릭터 | A=윤태성(confrontational) / B=윤정후(affect_flattening) |

### 스레드 3 — friend-01

| 항목 | 내용 |
|------|------|
| 스레드 폴더 | [`thread-friend-01/`](thread-friend-01/) |
| 첨부 파일 | [`thread-friend-01/friend-01-game-events.json`](thread-friend-01/friend-01-game-events.json) |
| 메시지 | [`thread-friend-01/메시지.md`](thread-friend-01/메시지.md) |
| 생성량 | **28건** (기존 9건 보존, 추가분만) |
| 캐릭터 | A=송다은(confrontational) / B=최수민(avoidant) |

---

## 발송 절차

### 사전 준비 (1회)
1. GPT Pro 프로젝트의 공통 **"소스"**(지식/파일 참조 영역)에 `common-source/quality-rules.md` 업로드

### 스레드별 (3회 병렬)
각 스레드마다 아래를 동일하게 수행:
1. 해당 `thread-{case}/{case}-game-events.json`을 스레드 **첨부 파일**로 업로드
2. 해당 `thread-{case}/메시지.md` 전체 내용을 대화창에 그대로 붙여넣기
3. GPT Pro 응답(JSON 배열) 대기

3개 스레드가 독립 작동하므로 응답 속도가 빠른 순서대로 Claude가 보정/병합 가능.

---

## 산출물 수령

각 스레드 응답을 아래 파일로 저장 (또는 대화에 붙여넣기):

- `thread-spouse-01/response.md`
- `thread-family-01/response.md`
- `thread-friend-01/response.md`

---

## 후속 작업 (Claude)

1. GPT Pro 응답 → 한국어 보정 (번역체/메타 누출 재검토, 3인칭 고정, TruthThrottle 준수 확인)
2. 3개 `src/data/claimPolicies/{case}-game-events.json` 파일의 `transitionBeats` 배열에 **append 병합**
3. `npx tsc -b --force` + 실 플레이 스팟 체크 (spouse-01 우선 — 현재 0건)
4. 커밋 (유저 지시 시)

---

## Legacy (이전 단일 세션 방식)

- [`메시지.md`](메시지.md) — 초기 통합 메시지 (3사건 일괄)
- [`refs/`](refs/) — 초기 첨부 파일 세트

병렬 방식으로 전환한 뒤에는 참조하지 않아도 됩니다. 필요시 이력 추적용으로만 보관.
