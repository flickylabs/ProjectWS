# Thread Q Playtest Report v3 - spouse-v3-01

테스트 범위:
- `node scripts/generic-case-run-pipeline.cjs --case spouse-v3-01 --validate-only`
- browser runtime probe 10세션 (`tmp/thread-q-v3-browser-retest.mjs`, 결과 `tmp/thread-q-v3-browser-retest.json`)
- scripted fallback audit (`tmp/v3-scripted-fallback-audit.json`)
- 원문 직접 readback (`src/data/scriptedText/spouse-v3-01.json`, `tmp/spouse-v3-01-stage3-validate.txt`)

## 1. P0 해결 확인 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| events / transition / dossier 런타임 작동 | PASS | dossierCard 5장, `contradictions=2`, `interjections=2`, `outbursts=2`, `transitionBeatCount=6`, `resolveDossierQuestion('dc-1.b.q1') -> spouse-v3-01:b:d-1:S3:0` |
| family/friend TypeError 계열 재발 | PASS | spouse 케이스에서는 런타임 에러 0건 |
| hotfix 오염 0건 | FAIL | `움직였은데`, `옮겨갔은지`, `보가는` 잔존 |
| 호칭 0건 | FAIL | `src/data/scriptedText/spouse-v3-01.json:41400`에 `제수씨` 노출 |
| LLM fallback miss 0건 | CONDITIONAL | browser probe `[Scripted] hit=41`, `[Scripted miss]=0`, dossier hit 확인. 다만 audit 기준 `runtimeWiring.system_message=false` |

핵심 인용:
- `src/data/scriptedText/spouse-v3-01.json:3766` `재판관님, 공동 적금에서 큰 금액이 움직였은데 제 남편은 정리한 거라고만 했습니다.`
- `src/data/scriptedText/spouse-v3-01.json:3918` `재판관님, 같이 모는 걸 왜 혼자 건드렸은지 그때부터 납득이 안 됐습니다. 공동 적금에서 큰 금액이 움직였은데 제 남편은 정리한 거라고만 했습니다.`
- `src/data/scriptedText/spouse-v3-01.json:41400` `... 제수씨 쪽과 또 부딪힐까 봐 ...`
- `src/data/scriptedText/spouse-v3-01.json:42264` `박지연은 그제야 왜 분노가 외도보다 통장으로 옮겨갔은지 조용히 설명할 수 있었습니다.`
- `src/data/scriptedText/spouse-v3-01.json:42739` `표면상 강해 보가는 단서입니다. 다만 맥락이 붙으면 의미가 달라질 수 있습니다.`

## 2. Level 1~3 결과

| 구간 | 판정 | 근거 |
| --- | --- | --- |
| Level 1-A 게임 로드 | PASS | caseId, 당사자 정보, 쟁점 4건, 증거 7건, baseEvidenceIds `e-1/e-2/e-3` 일치 |
| Level 1-B Phase 전환 | PASS | validate-only 및 runtime probe에서 Phase 흐름 자체는 이상 없음 |
| Level 1-C Phase 1/2 자동 재생 | PASS | loader 기준 phase1 10개, phase2 8개 스크립트 로드 |
| Level 1-D 증거 뷰어 | PASS | evidence 7건 메타/순서/타입 smoke 기준 이상 없음 |
| Level 1-E ScriptedText 매칭 | FAIL | 6채널 bundle coverage는 PASS지만 runtime wiring에서 `system_message=false` |
| Level 2 증거 해금 체인 | PASS | Dossier 해금, revealKey, state push, late evidence 반응 작동 |
| Level 3 LieState 전이 | PASS | S1/S2/S4/S5 probe에서 대사 변화와 state unlock 확인 |

## 3. Level 4 전수 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 4-A NPC 대사 호칭/어체 | FAIL | 배우자 호칭 `자기` 자체는 맞지만 `제수씨` 1건으로 호칭 규칙 파손 |
| 4-A Truth Throttle + 맥락 정합 | PASS | 재확인한 S0~S1 probe 범위에서는 `3,000만 원`, `형`, `조카`, `시댁` 선행 누출 직접 확인 안 됨 |
| 4-A 캐릭터 일관성 | WARN | 사실추궁/동기탐색/공감접근 차이는 살아 있으나 S5 admission contour가 약한 구간 존재 |
| 4-A 금지 패턴 | FAIL | hotfix 잔여 오탈자와 `제수씨` 노출로 Level 4 금지선 하회 |
| 4-B 재판관 질문 | PASS | 질문 유형에 따라 응답 톤 차이가 실제로 발생 |
| 4-C 시스템 메시지 | FAIL | 문구 자체에 `표면상 강해 보가는 단서입니다` 오탈자, runtime scripted wiring도 미연결 |
| 4-D 증인 증언 | FAIL | depth 차이는 있으나 validator가 `w-2|vague` 사건 고유 단서 부족 경고, 실문장에 `제수씨` 혼선 |
| 4-E 증거 반응 + 특수 | WARN | evidence/dossier/event는 작동. 다만 dossier 질문 고유 전제 반영 부족 경고 다수 |
| 4-F 한국어 품질 | FAIL | `움직였은데`, `옮겨갔은지`, `보가는`은 release 불가 수준 |
| 4-G variant 다양성 | FAIL | `validate-scripted-text WARN 134`, 다수 94~100% 유사도 |
| 4-H aftermath | FAIL | 결과 분화는 있으나 `옮겨갔은지`가 aftermath 본문에 잔존 |

## 4. Level 5 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 5-A 중재 | PASS | mediation paths 4종 존재, 흐름 작동 |
| 5-B 판결 | PASS | 판결/결과 분기 자체는 smoke 기준 정상 |
| 5-C 결과 | FAIL | aftermath 본문 오탈자와 system_message 미배선으로 release 품질 미달 |

## 5. 맥락 정합성 + 공개 단계 체크 결과

- S0~S1 재확인 probe에서는 숨은 쟁점 h-d3/h-d4의 핵심 내용이 먼저 새는 직접 사례는 못 봤다.
- `spouse-v3-01:b:d-1:S3:0` 해금 전후로 dossier push가 실제 state를 민다.
- A/B 정보 비대칭도 probe 범위에서는 심각한 선행 누출이 없었다.
- 다만 문장 품질 FAIL이 이미 다수라 공개 단계 PASS만으로 출시는 불가하다.

## 6. 10회차 요약

| 회차 | 접근 | 결과 | 특이사항 |
| --- | --- | --- | --- |
| 1 | 사실추궁 중심 | PASS | 모호어 감소와 책임 축 분리가 분명함 |
| 2 | 동기탐색 중심 | PASS | 형네 사정, 가족 의무, 자기방어 동기가 관계 맥락에 맞게 열림 |
| 3 | 공감접근 중심 | PASS | 감정 폭이 넓어지고 자백 압력이 자연스럽게 올라감 |
| 4 | 증거 early | PASS | early 반응은 아직 구체 금액 대신 흐름 중심으로 답함 |
| 5 | 증거 late | PASS | late 반응은 적금/계좌 이동을 구체적으로 인지함 |
| 6 | 증인 depth | FAIL | vague/partial/full 차이는 있으나 witness 본문에 `제수씨`가 섞여 품질 붕괴 |
| 7 | dossier push | WARN | state push는 성공, 질문 고유 전제 반영은 약함 |
| 8 | 끼어들기/감정 폭발 | PASS | spouse는 authored event id로 작동, 자연스러움도 양호 |
| 9 | 판결 min/max | FAIL | 결과 분화는 있으나 aftermath 본문 오탈자 잔존 |
| 10 | 자유 혼합 | FAIL | session fit은 강하지만 release blocker를 덮지 못함 |

## 7. 심문 유형별 차이 비교

- 사실추궁: 책임과 사실관계를 먼저 고정한다. 가장 날카롭다.
- 동기탐색: `왜 숨겼는가`와 가족 의무를 연결해 spouse 관계에서만 가능한 방어 논리를 만든다.
- 공감접근: 감정 균열과 부끄러움이 먼저 튀어나온다.
- 결론: 유형 차이 자체는 PASS다. 문제는 각 유형 내부 variant가 지나치게 닮아 있다는 점이다.

## 8. 호칭 전수 체크 결과

| 항목 | 결과 |
| --- | --- |
| A→B `자기/자기야/자기가/자기는` | PASS |
| B→A `자기` | PASS |
| A→재판관 `제 남편` | PASS |
| B→재판관 `제 아내` | PASS |
| 격앙 시 실명 호칭 | PASS |
| `~씨` 계열 0건 | FAIL (`제수씨`) |

## 9. LLM 폴백 체크 결과

- bundle key coverage: PASS
- browser probe scripted hits: 41
- browser probe scripted misses: 0
- dossier 채널 scripted hit: 확인
- release 판정용 결론: FAIL
  - 이유: `system_message`는 bundle에 있어도 runtime scripted wiring이 없다.

## 10. 증거/증인/조합/끼어들기 작동 확인

- 증거 연계: PASS
- 증인 소환: WARN
- 조합/Lead/DossierCard: PASS
- DossierCard state push: PASS
- 끼어들기/감정 폭발: PASS

## 11. 발견된 버그/이슈 목록

- [P0][Thread W] spouse witness 본문에 `제수씨` 잔존
- [P0][Thread W] hotfix 오염 잔존: `움직였은데`, `옮겨갔은지`, `보가는`
- [P1][Thread W] interrogation variant 중복 심각: `validate-scripted-text WARN 134`
- [P1][Thread W] dossier 질문 고유 전제 반영 약함
- [P1][Thread G] `system_message` runtime scripted wiring 미구현

## 12. 대사 품질 평가

좋은 예시:
- `재판관님, 오피스텔에 온 사람은 외도 상대가 아니라 제 동생이었습니다. 제가 집 사정이 복잡하다고만 하고 구체적으로 말을 막아 둔 탓에, 준호가 왜 갔은지 이상하게 보였을 겁니다.`
- spouse 사건만의 관계 충돌과 방어 논리가 선명하다.

나쁜 예시:
- `재판관님, 공동 적금에서 큰 금액이 움직였은데 제 남편은 정리한 거라고만 했습니다.`
- `... 제수씨 쪽과 또 부딪힐까 봐 ...`
- `표면상 강해 보가는 단서입니다.`

평가:
- 사건 구조와 session fit은 강하다.
- 그러나 release 품질은 문장 한 줄에서 무너진다. 이번 버전은 기능 PASS여도 유료 판매 기준 PASS는 아니다.

## 13. 종합 판정

- `FAIL`

판정 이유:
- spouse는 runtime 기능은 거의 복구됐다.
- 하지만 `제수씨` 1건, hotfix 오염 다수, `system_message` 미배선, S5 variant 중복으로 release 기준을 통과하지 못한다.
