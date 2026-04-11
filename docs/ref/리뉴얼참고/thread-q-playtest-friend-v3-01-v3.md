# Thread Q Playtest Report v3 - friend-v3-01

테스트 범위:
- `node scripts/generic-case-run-pipeline.cjs --case friend-v3-01 --validate-only`
- browser runtime probe 10세션 (`tmp/thread-q-v3-browser-retest.mjs`, 결과 `tmp/thread-q-v3-browser-retest.json`)
- scripted fallback audit (`tmp/v3-scripted-fallback-audit.json`)
- 원문 직접 readback (`src/data/scriptedText/friend-v3-01.json`, `tmp/friend-v3-01-stage3-validate.txt`)

## 1. P0 해결 확인 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| events / transition / dossier 런타임 작동 | PASS | dossierCard 5장, `contradictions=2`, `interjections=2`, `outbursts=2`, `transitionBeatCount=6`, `resolveDossierQuestion('dc-1.b.q1') -> friend-v3-01:b:h-d2:S3:0` |
| TypeError 해소 | PASS | friend runtime error 0건 |
| authored event / transition 복구 | FAIL | sample id가 `friend-v3-01-fallback-beat-a-d-5-S2-S3-0`, `friend-v3-01-fallback-interjection-b`, `friend-v3-01-fallback-outburst-b` |
| hotfix 오염 0건 | FAIL | `갔은지`, `보가는 행동`, `사와는 했지만`, `둘 사가는` 잔존 |
| 호칭 0건 | PASS | `수민아/다은아/제 친구` 체계 유지, `~씨` hit 없음 |
| LLM fallback miss 0건 | CONDITIONAL | browser probe `[Scripted] hit=41`, miss 0. 다만 audit 기준 `runtimeWiring.system_message=false` |

핵심 인용:
- `src/data/scriptedText/friend-v3-01.json:347` `재판관님, 왜 저를 두고 제 예비신랑에게 갔은지 저는 하나로만 읽혔습니다...`
- `src/data/scriptedText/friend-v3-01.json:787` `재판관님, 다른 사정이 있었을 수 있다는 말은 들었지만 반복된 연락 자체는 여전히 이상했습니다. 저는 일단 보가는 행동부터 붙잡을 수밖에 없었습니다...`
- `src/data/scriptedText/friend-v3-01.json:48331` `수민에게 사와는 했지만...`
- `src/data/scriptedText/friend-v3-01.json:48409` `둘 사가는 완전히 끊기진 않았지만...`
- `tmp/thread-q-v3-browser-retest.json:1807` `저는 일단 보가는 행동부터 붙잡을 수밖에 없었습니다.`

## 2. Level 1~3 결과

| 구간 | 판정 | 근거 |
| --- | --- | --- |
| Level 1-A 게임 로드 | PASS | caseId, 당사자 정보, 쟁점 5건, 증거 7건, baseEvidenceIds `e-1/e-2/e-3` 일치 |
| Level 1-B Phase 전환 | PASS | runtime 에러 없이 phase 흐름 유지 |
| Level 1-C Phase 1/2 자동 재생 | PASS | loader 기준 phase1 10개, phase2 8개 스크립트 로드 |
| Level 1-D 증거 뷰어 | PASS | evidence 7건 smoke 이상 없음 |
| Level 1-E ScriptedText 매칭 | FAIL | runtime wiring에서 `system_message=false` |
| Level 2 증거 해금 체인 | PASS | evidence, hidden issue, dossier state push 작동 |
| Level 3 LieState 전이 | PASS | S1/S2/S4/S5 probe에서 lie advance와 대사 변화 확인 |

## 3. Level 4 전수 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 4-A NPC 대사 호칭/어체 | PASS | `수민아/다은아/제 친구` 체계 유지 |
| 4-A Truth Throttle + 맥락 정합 | WARN | early probe에서 h-d2/h-d3 선행 누출 직접 확인 안 됨. 다만 문장 오염이 많아 안정성 신뢰가 낮다 |
| 4-A 캐릭터 일관성 | PASS | 보호와 배신, 경고와 집착의 friend 관계 갈등은 선명 |
| 4-A 금지 패턴 | FAIL | `보가는 행동`, `사와는 했지만`, `둘 사가는`은 즉시 QA block |
| 4-B 재판관 질문 | PASS | 질문 유형에 따라 응답 톤 차이는 분명 |
| 4-C 시스템 메시지 | FAIL | runtime scripted wiring 부재. 전 채널 scripted 보장 불가 |
| 4-D 증인 증언 | FAIL | validator가 `w-1 vague`, `w-2 vague` 사건 고유 단서 부족 경고 |
| 4-E 증거 반응 + 특수 | FAIL | evidence/dossier는 작동하지만 event/transition은 fallback 합성 |
| 4-F 한국어 품질 | FAIL | `갔은지`, `보가는`, `사와는`, `사가는` 잔존 |
| 4-G variant 다양성 | FAIL | `validate-scripted-text WARN 336`, 3건 중 최악 |
| 4-H aftermath | FAIL | 결과 분기는 있으나 핵심 문장에 오탈자 다수 |

## 4. Level 5 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 5-A 중재 | PASS | mediation paths 4종 존재 |
| 5-B 판결 | PASS | 판결/결과 flow 자체는 작동 |
| 5-C 결과 | FAIL | aftermath 문장 붕괴 + authored 특수 연출 부재 |

## 5. 맥락 정합성 + 공개 단계 체크 결과

- early probe 범위에서는 `아버지 사기`, `예비신랑의 선넘는 메시지`가 해금 전 직접 자백으로 새는 장면은 못 봤다.
- `friend-v3-01:b:h-d2:S3:0` 해금은 실제로 state를 민다.
- relation fit은 셋 중 가장 강하다. 이 싸움은 친구 관계와 예비신랑/아버지 축이 아니면 성립하기 어렵다.
- 그러나 release는 relation fit이 아니라 문장 품질에서 막힌다.

## 6. 10회차 요약

| 회차 | 접근 | 결과 | 특이사항 |
| --- | --- | --- | --- |
| 1 | 사실추궁 중심 | PASS | 경고인가 집착인가를 정면으로 밀어붙임 |
| 2 | 동기탐색 중심 | PASS | friend 관계 특유의 보호/배신 프레임이 선명함 |
| 3 | 공감접근 중심 | PASS | 상처/버림받음 감정선이 잘 산다 |
| 4 | 증거 early | PASS | early는 아직 단정 대신 불신 중심 |
| 5 | 증거 late | WARN | late evidence는 구체화되나 문장 오염이 남음 |
| 6 | 증인 depth | WARN | depth 차이는 있으나 고유 단서 밀도가 약함 |
| 7 | dossier push | WARN | state push는 성공, 질문별 응답은 generic |
| 8 | 끼어들기/감정 폭발 | FAIL | 작동은 하지만 fallback id 기반 |
| 9 | 판결 min/max | FAIL | 결과 차이는 있으나 `사와는`, `사가는`로 마감 붕괴 |
| 10 | 자유 혼합 | FAIL | session fit은 최고, QA 품질은 아직 최저 |

## 7. 심문 유형별 차이 비교

- 사실추궁: 누가 먼저 선을 넘었는지, 누가 명예를 먼저 무너뜨렸는지에 집중한다.
- 동기탐색: 경고 의도, 과거 손절 사건, 아버지 개입의 방향을 묻는다.
- 공감접근: 배신감과 상처, 친구 관계의 파열음을 먼저 끌어낸다.
- 결론: 유형 간 차이는 PASS다. 문제는 각 유형 안의 variant가 너무 비슷해서 반복 플레이 가치가 급락한다.

## 8. 호칭 전수 체크 결과

| 항목 | 결과 |
| --- | --- |
| A→B `수민아` | PASS |
| B→A `다은아` | PASS |
| A→재판관 `제 친구` | PASS |
| B→재판관 `제 친구` | PASS |
| 격앙 시 `최수민!/송다은!` | PASS |
| `~씨` 계열 | PASS |

## 9. LLM 폴백 체크 결과

- bundle key coverage: PASS
- browser probe scripted hits: 41
- browser probe scripted misses: 0
- dossier 채널 scripted hit: 확인
- release 판정용 결론: FAIL
  - 이유 1: `system_message` runtime scripted wiring 미구현
  - 이유 2: event/transition은 fallback 합성

## 10. 증거/증인/조합/끼어들기 작동 확인

- 증거 연계: PASS
- 증인 소환: WARN
- 조합/Lead/DossierCard: PASS
- DossierCard state push: PASS
- 끼어들기/감정 폭발: FAIL
  - 작동하지만 authored 연출이 아니라 fallback 합성

## 11. 발견된 버그/이슈 목록

- [P0][Thread G] friend event/transition은 runtime에서 fallback id로만 복구됨
- [P0][Thread W] hotfix 오염 잔존: `갔은지`, `보가는 행동`, `사와는 했지만`, `둘 사가는`
- [P0][Thread W] friend S5 재작성 이후에도 `validate-scripted-text WARN 336`
- [P1][Thread W] dossier question-specific 반응 부족
- [P1][Thread W] witness 고유 단서 밀도 부족
- [P1][Thread G] `system_message` runtime scripted wiring 미구현

## 12. 대사 품질 평가

좋은 예시:
- `재판관님, 정말 전할 말이 있었다면 제게 먼저 말했어야 한다고 봤습니다. 그래서 왜 저를 두고 제 예비신랑에게 갔은지 저는 하나로만 읽혔습니다...`
- friend 사건 특유의 보호와 배신, 오해와 명예훼손 구조는 선명하다.

나쁜 예시:
- `저는 일단 보가는 행동부터 붙잡을 수밖에 없었습니다`
- `수민에게 사와는 했지만`
- `둘 사가는 완전히 끊기진 않았지만`

평가:
- 구조와 session fit은 셋 중 가장 강하다.
- 그러나 이번 release 판정에서 가장 큰 리스크도 friend다. variant 반복과 문장 오염이 동시에 심각하다.

## 13. 종합 판정

- `FAIL`

판정 이유:
- friend는 사건 구조 자체는 매우 좋다.
- 하지만 fallback event/transition, `system_message` 미배선, 336건 variant 경고, aftermath 오탈자로 release 기준을 통과하지 못한다.
