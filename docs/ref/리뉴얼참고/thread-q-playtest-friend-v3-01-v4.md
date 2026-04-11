# Thread Q Playtest Report v4 - friend-v3-01

테스트 범위:
- `node scripts/generic-case-run-pipeline.cjs --case friend-v3-01 --validate-only`
- `node scripts/audit-v3-scripted-fallback-coverage.cjs`
- browser runtime probe 10세션 (`tmp/thread-q-v3-browser-retest.mjs`, 결과 `tmp/thread-q-v3-browser-retest.json`)
- 원문 직접 readback (`src/data/scriptedText/friend-v3-01.json`, `tmp/friend-v3-01-stage3-validate.txt`)

## 1. P0 해결 확인

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| dossier 런타임 | PASS | dossier resolve가 실제로 `friend-v3-01:b:h-d2:S3:0`까지 밂 |
| events / transitionBeats authored 복구 | FAIL | runtime sample이 `friend-v3-01-fallback-contradiction-2`, `friend-v3-01-fallback-interjection-b`, `friend-v3-01-fallback-outburst-b`, `friend-v3-01-fallback-beat-a-d-5-S2-S3-0` |
| TypeError 0건 | PASS | 브라우저 런타임 에러 0 |
| system_message 런타임 wiring | FAIL | audit는 여전히 `system_message=false`, browser probe system hit 0 |
| hotfix 오염 0건 | FAIL | `src/data/scriptedText/friend-v3-01.json:7822` `누군이에게`, `src/data/scriptedText/friend-v3-01.json:45721` `타가밍`, `src/data/scriptedText/friend-v3-01.json:39570` 이후 `B/A/e-4/e-5` 설계 문장 노출 |
| 호칭 0건 | PASS | `수민아/다은아/제 친구` 체계 유지, `~씨` 직접 hit 없음 |
| LLM fallback miss 0건 | CONDITIONAL | browser probe `hitCount=41`, `missCount=0`. 다만 system_message는 런타임 미사용 |
| validate-only 기능 게이트 | PASS | 기능 실행 자체는 PASS. 다만 `WARN 336`으로 release와는 거리가 멂 |

핵심 인용:
- 좋은 예시: `src/data/scriptedText/friend-v3-01.json:988` `저를 거치지 않고 제 예비신랑에게만 가는 건 의심을 살 수밖에 없다고 봤습니다...`
- 나쁜 예시: `src/data/scriptedText/friend-v3-01.json:7822` `누군이에게 바로 말하지 않으면...`
- 나쁜 예시: `src/data/scriptedText/friend-v3-01.json:45721` `타가밍만 재고 있었습니다`
- 나쁜 예시: `src/data/scriptedText/friend-v3-01.json:39570` `B가 왜 A에게 직접 말하지 못하고...`
- 나쁜 예시: `src/data/scriptedText/friend-v3-01.json:41164` `e-4와 e-5가 붙으면 반복 연락의 목적이 경고로 재맥락화된다...`

## 2. Level 1~3 결과

| 구간 | 판정 | 근거 |
| --- | --- | --- |
| Level 1-A 게임 로드 | PASS | caseId, 당사자 정보, 쟁점 5건, 증거 7건, baseEvidenceIds `e-1/e-2/e-3` 일치 |
| Level 1-B Phase 전환 | PASS | phase 흐름 자체는 동작 |
| Level 1-C Phase 1/2 자동 재생 | PASS | phase1 10개, phase2 8개 로드 |
| Level 1-D 증거 뷰어 | PASS | evidence smoke 이상 없음 |
| Level 1-E ScriptedText 매칭 | FAIL | `[Scripted miss]=0`이지만 system_message runtime hit 0 |
| Level 2 증거 해금 체인 | PASS | evidence late, dossier push, hidden issue 경로는 작동 |
| Level 3 LieState 전이 | PASS | lie advance는 발생. 다만 일부 event/beat는 fallback 합성 |

## 3. Level 4 전수 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 4-A NPC 대사 호칭/어체 | PASS | `수민아/다은아/제 친구` 체계 유지 |
| 4-A Truth Throttle + 맥락 정합 | WARN | early probe에서 핵심 비밀 선행 자백은 직접 못 봄. 다만 late evidence에서 설계 문장 노출이 심함 |
| 4-A 캐릭터 일관성 | PASS | 친구 관계 특유의 보호/배신/경고 프레임은 매우 강함 |
| 4-A 금지 패턴 | FAIL | `누군이에게`, `타가밍`, `B/A/e-4/e-5`와 같은 scaffold/field leakage가 그대로 나옴 |
| 4-B 재판관 질문 | PASS | fact/motive/empathy 차이가 분명 |
| 4-C 시스템 메시지 | FAIL | runtime scripted 미배선 |
| 4-D 증인 증언 | WARN | depth 차이는 있으나 validator가 witness 사건 고유 단서 부족 경고를 남김 |
| 4-E 증거 반응 + 특수 | FAIL | evidence late 반응에 raw ID와 설계 문장이 섞이고, events/transition도 fallback ID |
| 4-F 한국어 품질 | FAIL | sentence-level 오염과 meta leakage가 동시 존재 |
| 4-G variant 다양성 | FAIL | `validate-scripted-text WARN 336`으로 3건 중 최악 |
| 4-H aftermath | FAIL | bad ending 문장에 오염이 남음. 완성품 톤이 아님 |

## 4. Level 5 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 5-A 중재 | PASS | mediation path 존재 |
| 5-B 판결 | PASS | 판결/결과 flow 동작 |
| 5-C 결과 | FAIL | aftermath 품질과 특수 연출 authored 복구 실패 |

## 5. 맥락 정합성 + 공개 단계 체크

- early probe 범위에서는 `아버지 사기`, `예비신랑 찝적`이 S0~S1에서 직접 자백으로 새는 장면은 못 잡았다.
- relation fit은 셋 중 가장 강하다. 이 싸움은 친구 관계와 예비신랑/과거 손절 사건 축이 아니면 성립하기 어렵다.
- 하지만 late evidence와 dossier 일부가 사람이 아니라 설계서처럼 들린다.
- 결론: “이 관계에서만 가능한 싸움인가?”는 PASS. “상품 문장인가?”는 FAIL이다.

## 6. 10회차 요약

| 회차 | 접근 | 결과 | 특이사항 |
| --- | --- | --- | --- |
| 1 | 사실추궁 중심 | PASS | 경고인가 집착인가를 정면으로 민다 |
| 2 | 동기탐색 중심 | PASS | 과거 손절, 예비신랑, 친구 배신 프레임이 선명하다 |
| 3 | 공감접근 중심 | PASS | 상처와 불안의 톤은 좋다 |
| 4 | 증거 early | PASS | early는 아직 단정 대신 불신 중심 |
| 5 | 증거 late | FAIL | `e-4/e-5`, `B/A` 설계 문장이 그대로 튀어나옴 |
| 6 | 증인 depth | WARN | depth 차이는 있으나 밀도 편차 큼 |
| 7 | dossier push | WARN | state push는 성공, 질문별 반응 차이는 약함 |
| 8 | 끼어들기/감정 폭발 | FAIL | 동작은 하나 fallback ID 기반 |
| 9 | 극단 플레이 / aftermath | FAIL | 결과 분화는 있으나 문장 품질이 못 버팀 |
| 10 | 자유 플레이 | FAIL | 사건 자체는 재미있지만 release 기준은 미달 |

## 7. 심문 유형별 차이 비교

- 사실추궁: 누가 먼저 선을 넘었는지, 누가 명예를 먼저 무너뜨렸는지에 집중한다.
- 동기탐색: 왜 직접 말하지 못했는지, 왜 예비신랑 쪽으로 갔는지의 심리를 판다.
- 공감접근: 친구 관계가 깨지는 공포와 불안을 먼저 끌어낸다.
- 결론: 유형 차이는 PASS. 반복 variant 다양성은 FAIL이다.

## 8. 호칭 전수 체크

| 항목 | 결과 |
| --- | --- |
| A→B `수민아` | PASS |
| B→A `다은아` | PASS |
| A→재판관 `제 친구` | PASS |
| B→재판관 `제 친구` | PASS |
| 격앙 시 `최수민!/송다은!` | PASS |
| `~씨` 계열 0건 | PASS |

## 9. LLM 폴백 체크

- bundle coverage: PASS
- browser probe scripted hits: 41
- browser probe scripted misses: 0
- system_message scripted hits: 0
- 판정: FAIL
  - bundle은 있으나 runtime 배선이 끝나지 않았고, events/transition도 authored가 아니다.

## 10. 증거/증인/조합/끼어들기 작동

- 증거 연계: PASS
- 증인 소환: WARN
- 조합/Lead/DossierCard: PASS
- DossierCard state push: PASS
- 끼어들기/감정 폭발: FAIL
  - fallback event/beat가 그대로 노출된다.

## 11. 버그 / 이슈 목록

- [P0][Thread G] friend event/transition authored 데이터가 런타임에서 fallback으로 대체됨
- [P0][Thread G] `system_message` runtime scripted wiring 미구현
- [P0][Thread W] `누군이에게`, `타가밍` 오염 잔존
- [P0][Thread W] evidence late / dossier late에 `B`, `A`, `e-4`, `e-5` 같은 설계 문장 누출
- [P1][Thread W] variant 중복 심함: `validate-scripted-text WARN 336`
- [P1][Thread W] witness/dossier의 사건 고유성 밀도 부족

## 12. 대사 품질 평가

좋은 예시:
- `src/data/scriptedText/friend-v3-01.json:988`
  - `저를 거치지 않고 제 예비신랑에게만 가는 건 의심을 살 수밖에 없다고 봤습니다...`
  - friend 관계에서만 가능한 질투, 불안, 배신감이 한 줄에 들어가 있다.

나쁜 예시:
- `src/data/scriptedText/friend-v3-01.json:7822`
  - `누군이에게 바로 말하지 않으면...`
- `src/data/scriptedText/friend-v3-01.json:39570`
  - `B가 왜 A에게 직접 말하지 못하고...`
- `src/data/scriptedText/friend-v3-01.json:41164`
  - `e-4와 e-5가 붙으면 반복 연락의 목적이 경고로 재맥락화된다...`
- `src/data/scriptedText/friend-v3-01.json:45721`
  - `타가밍만 재고 있었습니다`

평가:
- 세 사건 중 relation fit은 가장 강하다.
- 그러나 세 사건 중 release blocker도 가장 많다. 오탈자만이 아니라 설계 문장 자체가 플레이 텍스트로 튀어나온다.

## 13. 종합 판정

- `FAIL`

판정 이유:
- friend는 사건 설계는 좋다.
- 하지만 fallback event/beat, system_message 미배선, 오염 잔존, raw field leakage, variant 중복으로 유료 판매 기준 FAIL이다.
