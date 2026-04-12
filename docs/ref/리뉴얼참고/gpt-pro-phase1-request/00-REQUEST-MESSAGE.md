# GPT Pro 요청: Phase 1 스크립트 2건

## 요청 개요

솔로몬 법정(법정 시뮬레이션 게임)의 Phase 1 대화 스크립트를 2건 생성해주세요.
Phase 1은 재판 시작 시 양측 초기 진술을 자동 재생하는 파트입니다.
플레이어는 재판관 역할이며, 중간에 3번의 **선택지**(재판관 발언)를 골라 분기를 탑니다.

## 첨부 파일 설명

| 파일 | 용도 |
|------|------|
| `reference-spouse-01-phase1.json` | **완성본 레퍼런스** — spouse-01의 Phase 1. 34대사, 선택지 3세트, 분기 대사 포함. 이 구조를 그대로 따라주세요. |
| `01-family-01-phase1-prompt.md` | **family-01 요청** — 사건 정보, 캐릭터, 호칭, 구조 규칙, 금지 사항 |
| `02-friend-01-phase1-prompt.md` | **friend-01 요청** — 동일 구조 |
| `ref-family-story.md` | family-01 전체 스토리 설계 (쟁점/증거/LieState/증인) |
| `ref-friend-story.md` | friend-01 전체 스토리 설계 |

## 작업 순서

1. `reference-spouse-01-phase1.json`을 먼저 읽고 JSON 구조를 파악
2. `01-family-01-phase1-prompt.md` + `ref-family-story.md`를 참고하여 family-01 Phase 1 JSON 생성
3. `02-friend-01-phase1-prompt.md` + `ref-friend-story.md`를 참고하여 friend-01 Phase 1 JSON 생성

## 핵심 규칙 (모든 사건 공통)

### 구조
- 총 30~36대사
- system 대사 2개 (시작 요약 + 종료 안내)
- 선택지 3세트 (c1, c2, c3). 각 3옵션, 옵션별 2~3 분기 대사
- 분기 대사는 `branchCondition` 필드로 연결

### 톤
- 재판관 대상: **합니다체 필수**
- 당사자 간: **반말**
- 번역체 금지 ("~된 것으로 생각됩니다", "부득이하게" 등)

### 중요
- Phase 1에서는 **초기 공개 쟁점(d-1)**만 다룸
- 숨겨진 쟁점(d-2~d-5) 내용은 **절대 언급 금지** (아직 미발견)
- 단, 숨겨진 쟁점의 **힌트**는 대화 분위기에 깔려도 OK (직접 밝히지만 않으면)
- behaviorHint: 각 대사에 1문장 연출 힌트 (표정, 몸짓, 말투)

## 산출물

2개 JSON 파일:
- `family-01-phase1.json`
- `friend-01-phase1.json`

각각 위 레퍼런스와 동일한 구조.
