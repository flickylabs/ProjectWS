# family-01 — 캐릭터 정보

## 사건 개요
- **caseId**: family-01 (case-family-01)
- **title**: 치매 어머니의 유서
- **anchorTruth**: 유서를 직접 손댄 건 분명히 B다. 하지만 그 조작은 자기 몫을 줄인 조작이고, 20년간 형과 어머니를 몰래 떠받쳐 온 것도 B다.
- **emotionalBait**: 배다른 동생을 평생 못마땅해하던 윤태성은, 치매 어머니가 남긴 유서에서 자기 몫이 40퍼센트라는 걸 보고 무너진다. 동생은 끝까지 담담하다. 그래서 더 수상해 보인다.
- **resolutionDilemma**: 유서를 직접 손댄 행위(위법성)와 그 동기(자기 몫을 줄인 조작 + 형의 출생 비밀 보호) 사이의 충돌.

## 윤태성 (party A)

### 기본 정보
- 나이: 48세
- 직업: 주방가구 공장 대표
- 소득: mid
- pride: 8 / fear: **평생 장남이라 믿었던 자기 정체성이 무너지는 것**

### archetype: confrontational
목소리를 높여 상대를 누르고, 형이라는 위치를 먼저 내세운다. 불리해지면 동생의 인격을 깎아내리며 질문 자체를 무력화하려 든다.

### sensitivePoints
- 장남 정체성
- 공장 부도 이력
- 출생 비밀

### verbalTells (3종)
| type | trigger | pattern |
|---|---|---|
| rank_pull | cornered | "형인 내가 모시고 살았다"며 서열을 내세워 논점을 돌린다. |
| character_attack | lying | 동생의 성격이나 과거를 꺼내며 상대 신뢰도를 먼저 깎는다. |
| volume_escalation | emotional | 감정이 올라오면 목소리부터 커지며 상대 말을 끊는다. |

### callTerms
- toPartner: "정후야"
- toJudge: "제 동생"
- angry: "윤정후!"

### dailyRoutine
공장에서 주문을 처리하고 저녁엔 어머니 집에 들러 자신이 돌봤다는 생활을 유지해왔다.

---

## 윤정후 (party B)

### 기본 정보
- 나이: 44세
- 직업: 자동차부품 가게 운영
- 소득: mid
- pride: 5 / fear: **형이 출생 비밀을 알게 되는 것**

### archetype: affect_flattening
감정을 최대한 억누르며 사실만 짧게 말한다. 담담해 보이지만 그 담담함이 오히려 의심을 산다. 진짜 감정은 마지막까지 드러내지 않으려 한다.

### sensitivePoints
- 유서 조작 사실
- 20년 비밀 지원
- 형의 출생 비밀

### verbalTells (3종)
| type | trigger | pattern |
|---|---|---|
| flat_deflection | cornered | "그건 제가 말할 수 있는 부분이 아닙니다" 식으로 감정 없이 차단. |
| silence_shield | lying | 거짓보다 침묵으로 진실을 숨긴다. |
| delayed_crack | emotional | 오래 참다가 한 번에 무너지듯 말하며, 가장 깊은 진실이 그때 나온다. |

### callTerms
- toPartner: "형"
- toJudge: "저희 형"
- angry: "윤태성!"

### dailyRoutine
가게를 운영하며 틈틈이 어머니에게 송금하고, 형 몰래 생활비와 병원비를 대 왔다.

---

## 5 dispute 책임 배분

| dispute | 쟁점 | A 책임 | B 책임 | 핵심 truth |
|---|---|---|---|---|
| d-1 | 유서 작성과 판단 능력 | 30 | 70 | 어머니 의사 부분 반영 + B 개입 적법성 문제 |
| d-2 | 60:40 유서의 진짜 의도 | 15 | 85 | B가 90:10 원본을 60:40으로 위조 (자기 몫 줄임) |
| d-3 | 20년 송금의 실체 | (TBD) | (TBD) | B가 매달 어머니에게 송금, A 부도 때 대신 갚음 |
| d-4 | 출생 비밀과 침묵의 이유 | (TBD) | (TBD) | A의 출생 비밀(친자 X)을 B만 앎 |
| d-5 | 어머니 이용의 진짜 주체 | (TBD) | (TBD) | B의 행동이 자기 이익이 아니라 형/어머니 보호였음 |

(d-3 ~ d-5 정확 책임 배분: `04-case-family-01.json` `disputes[].correctResponsibility` 참조)

## linkEdges (dispute 진행 순서)
- d-1: initial
- d-2: hidden, B의 d-1 ≥ S3 → 열림
- d-3, d-4, d-5: 추가 unlockCondition (`05-structure-v2.json` 참조)

## 7 evidence (e-1 ~ e-7)
정확 정의: `04-case-family-01.json` top-level `evidence` 필드 + ScriptedText의 evidence_present 키 분포 참조.

ScriptedText 확인된 evidenceId: `e-1, e-2, e-3, e-4, e-5, e-6, e-7`

각 evidence의 `subjectParty / requiredLieState / investigationStages / partyContext` 정보는 source 04 파일 직접 read.

## DossierCard 5장 (subjectParty 매핑)

위치: `07-dossier-cards.json`

| id | name | evidence | relatedDispute | subjectParty | 질문 수 |
|---|---|---|---|---|---|
| dc-1 | 말년의 종이 | e-1, e-2, e-3 | d-1 | b | 2 (b q1, b q2) |
| dc-2 | 줄인 유서 | e-4, e-5 | d-2 | b | 2 (b q1, b q2) |
| dc-3 | 20년의 돈 | e-5, e-6 | d-3 | b | 2 (b q1, b q2) |
| dc-4 | 감춘 이유 | e-6, e-7 | d-4 | b | 2 (b q1, b q2) |
| dc-5 | 어머니의 뜻 | e-1, e-6, e-7 | d-5 | both | 3 (a q1, b q1, b q2) |

총 dossier question: **11개** (spouse-01 8개와 다름).

## 인물 관계 (실명 미공개 / 호칭만)

- **어머니**: 치매로 사망. 유서의 90:10 원본 vs 60:40 위조본의 진짜 작성자. 호칭만 ("어머님", "치매 어머니").
- **아버지**: A의 친자가 아니라는 출생 비밀의 핵심 인물. **B만 앎**.

## 증인 3종 (socialGraph)

| id | 이름 | 역할 | bias | sentA / sentB | addressA / addressB | hiddenAgenda |
|---|---|---|---|---|---|---|
| w-1 | 최복순 | 전 요양보호사 (61) | neutral | 0 / 10 | "큰아들분" / "작은아들분" | 요양보호사 교체 과정에서 자기 책임 불거질까 조심 |
| w-2 | 김영수 | 공증사무실 직원 (57) | neutral | 0 / 0 | "큰아들분" / "서류 제출자분" | 공증 절차상 확인 부족이 불거질까 선 그음 |
| w-3 | 박순애 | 어머니 친구 (69, 퇴직) | **pro_a** | 20 / 0 | "태성이" / "정후" | 어머니의 비밀(출생 비밀)을 자기도 알고 있었는지 모호하게 넘김 |

증인별 관련 dispute / dossier:
- w-1: d-1 / dc-1 해금
- w-2: d-2 / dc-3 해금
- w-3: d-3, d-5 / dc-2, dc-5 해금

## ⚠️ GPT 작성 시 주의

- **어머니/아버지 임의 실명 부여 X** — 호칭만 ("어머님", "어머니", "아버지", "그분")
- **출생 비밀**은 매우 민감 정보 — S0~S2 NPC 발화에서 직접 언급 X (B의 fear = 형이 알게 되는 것)
- **20년 송금 정보**는 d-3 핵심 — S0~S2에서 NPC가 직접 명명 X
- **공장 부도 이력**은 A의 sensitivePoint — 신중히 다룸
- 박순애 (w-3)는 pro_a 편향 + 어머니 친구로 두 사람 모두 어릴 때부터 알고 있는 입장. addressA "태성이" / addressB "정후" 정합 유지.
