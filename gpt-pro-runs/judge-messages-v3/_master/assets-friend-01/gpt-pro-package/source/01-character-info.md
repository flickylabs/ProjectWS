# friend-01 — 캐릭터 정보

## 사건 개요
- **caseId**: friend-01 (case-friend-01)
- **title**: 손절한 절친
- **anchorTruth**: B는 예비신랑을 꼬시려 한 게 아니라 경고하려 했고, 그보다 오래전에는 A 아버지에게 당한 일을 말하지 못한 채 스스로 악역이 되었다.
- **emotionalBait**: 손절한 전 절친이 내 예비신랑에게 계속 연락한다. 결혼 3주 전, 그 장면만 보면 누구라도 친구가 선을 넘었다고 생각한다.
- **resolutionDilemma**: B의 침묵이 매번 보호에서 비롯됐다 해도, 결과적으로 더 큰 오해와 낙인을 만들었다. A의 성급한 단정은 잔인했지만 아버지의 진실을 모른 채 반응한 것이기도 하다.

## 송다은 (party A)

### 기본 정보
- 나이: 31세
- 직업: 온라인 쇼핑몰 CS 직원
- 소득: mid
- pride: 7 / fear: **아버지의 진짜 모습이 드러나는 것**

### archetype: premature_summary
결론부터 말하고 그 안에 근거를 끼워 넣는다. 상대가 반박하면 이미 끝난 얘기를 다시 꺼내며 맥락을 자기 쪽으로 좁힌다.

### sensitivePoints
- 아버지의 돈 문제
- 과거 손절의 진짜 이유
- 확인 없이 단톡방에 올린 일

### verbalTells (3종)
| type | trigger | pattern |
|---|---|---|
| premature_conclusion | cornered | 상대 말이 끝나기 전에 "그러니까 결국~"으로 결론을 먼저 내려버린다. |
| pattern_citation | defensive | "예전에도 그랬잖아"라며 과거 사례를 현재 판단의 근거로 가져온다. |
| scope_narrowing | shame | 불리한 지점이 나오면 "그건 지금 얘기가 아니다"라며 범위를 좁힌다. |

### callTerms
- toPartner: "수민아"
- toJudge: "제 전 친구"
- angry: "최수민!"

### dailyRoutine
쇼핑몰 CS 업무를 마치면 예비신랑과 결혼 준비를 하고, 공통 친구 단톡방에 일상을 올리며 관계를 유지한다.

---

## 최수민 (party B)

### 기본 정보
- 나이: 31세
- 직업: 필라테스 강사
- 소득: mid
- pride: 5 / fear: **A에게 아버지의 진실을 말하면 친구가 아버지를 사기꾼으로 봐야 하는 것**

### archetype: affect_flattening
감정을 눌러 담고 사실만 나열한다. 정작 가장 아픈 이야기를 할 때 목소리가 더 평평해진다.

### sensitivePoints
- A 아버지에게 당한 사기
- 예비신랑이 먼저 선을 넘은 사실
- 또 악역이 된 현재 상황

### verbalTells (3종)
| type | trigger | pattern |
|---|---|---|
| flat_delivery | emotional | 가장 아픈 이야기를 할 때 오히려 톤이 더 평평해지고 감정이 사라진다. |
| self_blame_shield | cornered | "제가 그냥 참았어야 했는데"라며 책임을 먼저 가져가 상대 추궁을 무력화한다. |
| third_party_protection | avoiding | 핵심 인물의 행동을 직접 말하지 않고 "그쪽 상황이 있었다"로 에둘러 말한다. |

### callTerms
- toPartner: "다은아"
- toJudge: "다은이"
- angry: "송다은!"

### dailyRoutine
필라테스 수업을 마치면 혼자 정리하고, 공통 친구들과의 연락은 점점 줄었다. 예비신랑에게 연락할 때도 카페에서 혼자 문자를 보냈다.

---

## 5 dispute

| dispute | 쟁점 | A 책임 | B 책임 | 비고 |
|---|---|---|---|---|
| d-1 | 9일간의 연락 의도 | (TBD) | (TBD) | initial |
| d-2 | 예비신랑의 선넘는 접근 | (TBD) | (TBD) | hidden |
| d-3 | 아버지의 돈 접근 패턴 | (TBD) | (TBD) | hidden |
| d-4 | 과거 손절과 아버지의 사기 | (TBD) | (TBD) | hidden |
| d-5 | 단톡방 매도와 명예훼손 | (TBD) | (TBD) | hidden |

(정확 책임 배분: `04-case-friend-01.json` `disputes[].correctResponsibility` 참조)

## 7 evidence (e-1 ~ e-7)
정확 정의: `04-case-friend-01.json` top-level **`evidence` 필드 (단수형)** + ScriptedText의 evidence_present 키 분포 참조.

ScriptedText 확인된 evidenceId: `e-1, e-2, e-3, e-4, e-5, e-6, e-7`

## DossierCard 5장 (총 9 dossier question)
파일: `07-dossier-cards.json`

| id | name | evidence | relatedDispute | subjectParty | 질문 |
|---|---|---|---|---|---|
| dc-1 | 집착의 겉면 | e-1, e-2 | d-1, d-5 | both | a q1, b q1 |
| dc-2 | 먼저 넘은 선 | e-1, e-4 | d-1, d-2 | b | b q1 |
| dc-3 | 같은 부탁 | e-5, e-6 | d-3, d-4 | both | b q1, a q1 |
| dc-4 | 손절의 값 | e-3, e-6 | d-4 | both | b q1, a q1 |
| dc-5 | 낙인의 순서 | e-2, e-7 | d-1, d-5 | both | a q1, b q1 |

## 인물 관계 (실명 미공개 / 호칭만)

- **A 아버지**: 사건 핵심 인물 — A에게 친아버지 / B에게 과거 사기범. **B만 진실을 앎**. 호칭만 ("아버지", "그분")
- **예비신랑**: A의 결혼 상대. **B에게 먼저 선넘는 메시지를 보낸 사실** (B만 알고 있음)이 핵심 단서. 호칭만 ("예비신랑", "그분")
- **공통 친구들**: 단톡방 동조자. 호칭만 ("공통 친구")

## 증인 3종 (socialGraph)

| id | 이름 | 역할 | bias | sentA / sentB | addressA / addressB | hiddenAgenda |
|---|---|---|---|---|---|---|
| w-1 | 김세라 | 미용실 직원 (32, A의 고등학교 친구) | **pro_a** | 30 / -10 | "다은이" / "수민 씨" | 자신도 B를 비난하는 데 가담한 것이 부끄럽다 |
| w-2 | 박준혁 | 예비신랑의 회사 후배 | neutral | 0 / 0 | "그분" / "그 여자분" | 예비신랑과의 직장 관계가 불편해질까 조심 |
| w-3 | 오미경 | (B 측 친분) | **pro_b** | 0 / 20 | "그 집 딸" / "수민이" | 없음 |

증인별 관련 dispute / dossier:
- w-1: d-5 / dc-3 해금
- w-2: d-2 / dc-2 해금
- w-3: d-4 / dc-4 해금

## ⚠️ GPT 작성 시 주의

- **A 아버지/예비신랑 임의 실명 부여 X** — 호칭만 ("아버지", "예비신랑", "그분")
- **A 아버지 사기 사건**은 B의 핵심 fear — S0~S2 NPC 발화에서 직접 언급 X. S3+ 점진적 공개. S5 자백 단계에서 명확
- **예비신랑이 먼저 선넘은 사실** = 사건 반전의 핵심 — B의 발화에서만 후반 공개. A는 모름
- **단톡방 매도 (d-5)**는 A의 sensitivePoint — A가 "사실 알린 것"이라 자기 정당화 (premature_summary archetype)
- 김세라 (w-1) addressA "다은이"는 친밀 관계 + sentB -10이라 B에 대한 부정적 인식. addressB "수민 씨"는 거리감
- 오미경 (w-3) "그 집 딸" 표현은 A에 대한 거리감 + sentB +20 친밀 관계 반영
