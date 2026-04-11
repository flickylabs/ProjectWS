# Thread Q Playtest Report v3 - family-v3-01

테스트 범위:
- `node scripts/generic-case-run-pipeline.cjs --case family-v3-01 --validate-only`
- browser runtime probe 10세션 (`tmp/thread-q-v3-browser-retest.mjs`, 결과 `tmp/thread-q-v3-browser-retest.json`)
- scripted fallback audit (`tmp/v3-scripted-fallback-audit.json`)
- 원문 직접 readback (`src/data/scriptedText/family-v3-01.json`, `tmp/family-v3-01-stage3-validate.txt`)

## 1. P0 해결 확인 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| events / transition / dossier 런타임 작동 | PASS | dossierCard 5장, `contradictions=2`, `interjections=2`, `outbursts=2`, `transitionBeatCount=6`, `resolveDossierQuestion('dc-1.b.q1') -> family-v3-01:b:d-1:S3:0` |
| TypeError 해소 | PASS | family runtime error 0건 |
| authored event / transition 복구 | FAIL | sample id가 `family-v3-01-fallback-beat-a-d-5-S2-S3-0`, `family-v3-01-fallback-interjection-b`, `family-v3-01-fallback-outburst-b`로 fallback 합성 |
| hotfix 오염 0건 | FAIL | `90대 10이었은이`, `보가는`, `10원 수준`, `윤정후은`, `격앙됐은지` 잔존 |
| 호칭 0건 | PASS | `~씨` 직접 hit 없음. `정후야/형/제 동생/제 형` 체계 유지 |
| LLM fallback miss 0건 | CONDITIONAL | browser probe `[Scripted] hit=40`, miss 0. 다만 audit 기준 `runtimeWiring.system_message=false` |

핵심 인용:
- `src/data/scriptedText/family-v3-01.json:14015` `왜 원래 유서는 90대 10이었은이... 문제가 된 금액은 10원 수준이었습니다`
- `src/data/scriptedText/family-v3-01.json:19241` `재판관님, 불리해 보가는 부분이 있다는 점은 압니다...`
- `src/data/scriptedText/family-v3-01.json:32458` `왜 원래 유서는 90대 10이었은이... 겉으로 보가는 충돌보다 동기 구조가 더 큽니다.`
- `src/data/scriptedText/family-v3-01.json:36453` `재판관님, 유서가 60대 40으로 나왔은데 제가 가만히 있을 이유가 없었습니다.`
- `src/data/scriptedText/family-v3-01.json:38356` `재판관님, 공증 스캔 보관본이 두 버전 흐름을 보여 주면 제가 왜 격앙됐은지 이해하실 겁니다. 누군이 급히 다시 가져간 겁니다.`
- `tmp/thread-q-v3-browser-retest.json:882` `윤정후은 ...`

## 2. Level 1~3 결과

| 구간 | 판정 | 근거 |
| --- | --- | --- |
| Level 1-A 게임 로드 | PASS | caseId, 당사자 정보, 쟁점 5건, 증거 7건, baseEvidenceIds `e-1/e-2/e-3` 일치 |
| Level 1-B Phase 전환 | PASS | runtime 에러 없이 phase 흐름 유지 |
| Level 1-C Phase 1/2 자동 재생 | PASS | loader 기준 phase1 10개, phase2 8개 스크립트 로드 |
| Level 1-D 증거 뷰어 | PASS | evidence 7건 smoke 이상 없음 |
| Level 1-E ScriptedText 매칭 | FAIL | runtime wiring에서 `system_message=false` |
| Level 2 증거 해금 체인 | PASS | hidden issue 포함 증거/해금 구조 작동 |
| Level 3 LieState 전이 | PASS | dossier push, S2→S3, transition beat 수 자체는 확보 |

## 3. Level 4 전수 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 4-A NPC 대사 호칭/어체 | PASS | 가족 호칭 규칙 자체는 유지 |
| 4-A Truth Throttle + 맥락 정합 | WARN | 재확인한 early probe에서는 h-d3/h-d4 선행 누출 직접 확인 안 됨. 하지만 late 문장 오염이 너무 심해 신뢰도 하락 |
| 4-A 캐릭터 일관성 | WARN | family 관계 특유의 보호/개입/부채감은 살아 있음 |
| 4-A 금지 패턴 | FAIL | `10원 수준`, `보가는`, `윤정후은`은 금지선 위반 |
| 4-B 재판관 질문 | PASS | 질문 유형별 응답 톤 차이 확인 |
| 4-C 시스템 메시지 | FAIL | `새 자료가 열렸습니다... 보가지 않던 흐름` 오탈자 + runtime scripted wiring 부재 |
| 4-D 증인 증언 | FAIL | validator가 `w-1 partial`, `w-3 vague/partial` 사건 고유 단서 부족 경고 |
| 4-E 증거 반응 + 특수 | FAIL | family/friend 이벤트는 런타임상 fallback 합성으로만 복구됨. authored 특수 대사로 보기 어렵다 |
| 4-F 한국어 품질 | FAIL | `90대 10이었은이`, `10원 수준`, `윤정후은`은 즉시 QA block |
| 4-G variant 다양성 | FAIL | `validate-scripted-text WARN 193` |
| 4-H aftermath | FAIL | 결과 분화는 있으나 `형제 사가는 늦게...` 등 문장 붕괴와 generic ending 경고 동시 존재 |

## 4. Level 5 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 5-A 중재 | PASS | mediation paths 4종 존재 |
| 5-B 판결 | PASS | 판결/결과 flow 자체는 동작 |
| 5-C 결과 | FAIL | aftermath 품질 붕괴, event/transition authored 미복구 |

## 5. 맥락 정합성 + 공개 단계 체크 결과

- early probe 범위에서는 `90%`, `20년 송금`, `출생 비밀`이 S0~S1에서 먼저 터지는 직접 사례는 못 봤다.
- hidden issue h-d4 선행 누출도 재확인 범위에서는 못 봤다.
- 그러나 late 문장에 `90대 10`이 `10원 수준`으로 오염되는 순간, 플레이어는 공개 단계 자체를 신뢰하기 어렵다.
- 결론: 정보 순서는 대체로 버티지만, 텍스트 품질이 단계 설계를 훼손한다.

## 6. 10회차 요약

| 회차 | 접근 | 결과 | 특이사항 |
| --- | --- | --- | --- |
| 1 | 사실추궁 중심 | PASS | 유서 조작 vs 말년 개입 축이 또렷함 |
| 2 | 동기탐색 중심 | PASS | 형제 보호와 상속 계산이 함께 드러남 |
| 3 | 공감접근 중심 | PASS | `어머니 곁에서 무슨 말이 오갔은지도...` 라인은 강함 |
| 4 | 증거 early | PASS | early 단계는 아직 모호성 유지 |
| 5 | 증거 late | FAIL | late 문장에 `90대 10이었은이`, `10원 수준` 오염 확인 |
| 6 | 증인 depth | WARN | vague/partial/full 차이는 있으나 고유 단서 밀도가 약함 |
| 7 | dossier push | WARN | state push는 성공, 질문별 반응은 generic |
| 8 | 끼어들기/감정 폭발 | FAIL | 작동은 하지만 fallback id와 `윤정후은` 문장으로 release 불가 |
| 9 | 판결 min/max | FAIL | 결과 분기 존재. 다만 `형제 사가는...` 류 문장으로 마감 품질 붕괴 |
| 10 | 자유 혼합 | FAIL | family session fit은 강하지만 문장 QA가 버티지 못함 |

## 7. 심문 유형별 차이 비교

- 사실추궁: 유서/방문기록/개입 여부를 정면으로 묻는다.
- 동기탐색: 형제 보호, 부채감, 말년 돌봄의 도덕적 프레임이 붙는다.
- 공감접근: 배제감과 말 못 한 원망이 가장 잘 살아난다.
- 결론: 유형 차이는 PASS다. 그러나 variant 내부 중복과 오염 문장이 너무 많다.

## 8. 호칭 전수 체크 결과

| 항목 | 결과 |
| --- | --- |
| A→B `정후야` | PASS |
| B→A `형` | PASS |
| A→재판관 `제 동생` | PASS |
| B→재판관 `제 형` | PASS |
| 격앙 시 `윤정후!/형!` | PASS |
| `~씨` 계열 | PASS |

## 9. LLM 폴백 체크 결과

- bundle key coverage: PASS
- browser probe scripted hits: 40
- browser probe scripted misses: 0
- dossier 채널 scripted hit: 확인
- release 판정용 결론: FAIL
  - 이유 1: `system_message` runtime scripted wiring 미구현
  - 이유 2: event/transition은 런타임 fallback 합성

## 10. 증거/증인/조합/끼어들기 작동 확인

- 증거 연계: PASS
- 증인 소환: WARN
- 조합/Lead/DossierCard: PASS
- DossierCard state push: PASS
- 끼어들기/감정 폭발: FAIL
  - 동작은 하지만 authored 품질이 아니라 fallback 합성으로 보임

## 11. 발견된 버그/이슈 목록

- [P0][Thread G] family event/transition은 runtime에서 fallback id로만 복구됨
- [P0][Thread W] hotfix 오염 잔존: `90대 10이었은이`, `10원 수준`, `보가는`, `윤정후은`, `격앙됐은지`
- [P1][Thread W] interrogation variant 중복 심각: `validate-scripted-text WARN 193`
- [P1][Thread W] dossier question-specific 반응 부족
- [P1][Thread W] witness 고유 단서 밀도 부족
- [P1][Thread G] `system_message` runtime scripted wiring 미구현

## 12. 대사 품질 평가

좋은 예시:
- `재판관님, 어머니 곁에서 무슨 말이 오갔은지도 모른 채 밖에 선 기분이었습니다.`
- family 사건 특유의 배제감과 형제 감정선은 분명하다.

나쁜 예시:
- `왜 원래 유서는 90대 10이었은이... 문제가 된 금액은 10원 수준이었습니다`
- `윤정후은 ‘60대 40 유서는 정말 어머니의 마지막 뜻이었는가’ 문제까지 같이 봐야 한다고 말을 자른다.`
- `불리해 보가는 부분이 있다는 점은 압니다`

평가:
- session fit은 강하다. 이 싸움은 가족 관계가 아니면 성립하기 어렵다.
- 하지만 sentence-level 품질은 셋 중 가장 위험한 축이다. 지금 상태로는 판매 불가다.

## 13. 종합 판정

- `FAIL`

판정 이유:
- family는 runtime crash는 막았다.
- 그러나 authored event/transition 미복구, 심각한 hotfix 오염, generic dossier/witness/aftermath, system_message 미배선으로 release 기준을 전혀 충족하지 못한다.
