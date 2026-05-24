---
name: feedback-avoid-code-abbreviations-with-user
description: "사용자와 대화 시 코드 약어(dc, e-, w-, h-d, S0~S5 등) 단독 사용 X. 항상 풀어쓰거나 게임 내 자연 명칭 병기."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 13115bcb-1440-4e69-9d18-2cc04b4569f7
---

## 규칙

사용자와 대화할 때 코드 약어를 단독 사용하지 않는다. 약어를 써야 할 때는 항상:
- 풀어서 쓰거나 (`dc-cash-clue` → `사건 카드 dc-cash-clue`)
- 게임 내 자연 명칭과 병기 (`dc-1` → `dc-1 "오피스텔의 사람들"`)
- 첫 등장 시 정의 (`dc = dossier card = 사건 카드`)

특히 옵션/결정 질문에서는 사용자가 즉시 이해할 수 있는 용어가 핵심. 코드 약어만으로 옵션 제시하면 사용자가 결정 못함.

## 풀어쓰기 reference

| 약어 | 풀이 | 사용자용 자연 명칭 |
|---|---|---|
| dc | dossier card | 사건 카드 |
| e- (e-1, e-5 등) | evidence | 증거 |
| w- (w-1, w-2 등) | witness | 증인 |
| d- (d-1, d-2 등) | dispute | 쟁점 |
| h-d- (h-d3, h-d4 등) | hidden dispute | 숨겨진 쟁점 |
| S0~S5 | lie state stages | 진실 파악 단계 0~5 |
| T1/T2/T3 | Trigger 1/2/3 | 발동 후보 1/2/3 |
| KO/EN/JA/ZH-CN | 한국어/영어/일본어/중국어 | 그대로 OK (사용자 익숙) |
| tsc | TypeScript compile | 타입 체크 |

## Why

2026-05-24 Cycle 1 Phase 4-E4b 옵션 제시에서 "신규 dossier card dc-cash-clue 추가" 같이 사용자가 모르는 약어 사용. 사용자 지적:
> "신규 dc라는게 뭘 말하는거야? 내가 이해할 수 있는 표현을 사용해줘."

옵션 선택을 사용자가 결정해야 하는데 약어 때문에 결정 자체가 불가능해진 사례.

## How to apply

### 옵션/결정 질문 작성 시
- 모든 옵션 라벨에서 약어 단독 사용 X
- description에 풀이 또는 자연 명칭 포함
- 첫 등장 시 정의 (예: "dc(사건 카드) 신규 추가")

### 진단/보고에서
- 코드 영역 진단은 약어 OK (file:line 옆에 풀이 첨부 권장)
- 사용자 결정 영역은 자연 명칭 우선

### 메모리 작성 시
- 메모리 본문은 약어 OK (내부 문서)
- README/brief 등 사용자가 직접 읽는 문서는 풀이/병기

## 관련 메모리

- [[feedback_style]] — 유저 선호 작업 방식과 톤
- [[feedback_external_brief_path_explicit]] — 외부 도구 의뢰서 경로 명시
- [[feedback_external_brief_self_contained_folder]] — self-contained 폴더 정책
