# Thread Q Playtest Report v4 - spouse-v3-01

테스트 범위:
- `node scripts/generic-case-run-pipeline.cjs --case spouse-v3-01 --validate-only`
- `node scripts/audit-v3-scripted-fallback-coverage.cjs`
- browser runtime probe 10세션 (`tmp/thread-q-v3-browser-retest.mjs`, 결과 `tmp/thread-q-v3-browser-retest.json`)
- 원문 직접 readback (`src/data/scriptedText/spouse-v3-01.json`, `tmp/spouse-v3-01-stage3-validate.txt`)

## 1. P0 해결 확인

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| events / transitionBeats / dossier 런타임 | PASS | `transitionSample.id=spouse-v3-01-beat-b-d1-s1-s2`, event textId도 `spouse-v3-01-*` authored ID로 동작. dossier resolve도 `spouse-v3-01:b:d-1:S3:0`까지 밀림 |
| system_message 런타임 wiring | FAIL | audit가 여전히 `system_message=false`를 출력하고, browser probe scripted hit 중 `system_message` hit는 0건 |
| hotfix 오염 0건 | FAIL | `src/data/scriptedText/spouse-v3-01.json:18189` `누군이를`, `src/data/scriptedText/spouse-v3-01.json:38655` `타가밍`, `src/data/scriptedText/spouse-v3-01.json:42378` `움직였은지`/`사와한` 잔존 |
| 호칭 0건 | FAIL | runtime witness 산출물에 `제수씨` 잔존: `tmp/thread-q-v3-browser-retest.json:566`, `tmp/thread-q-v3-browser-retest.json:761` |
| LLM fallback miss 0건 | CONDITIONAL | browser probe `hitCount=41`, `missCount=0`. 다만 system_message 채널만 런타임 미배선 |
| validate-only 기능 게이트 | PASS | 기능 실행 자체는 PASS. release 기준 PASS와는 별개 |

핵심 인용:
- 좋은 예시: `src/data/scriptedText/spouse-v3-01.json:41277` `재판관님, 오피스텔에 온 사람은 외도 상대가 아니라 제 동생이었습니다...`
- 나쁜 예시: `src/data/scriptedText/spouse-v3-01.json:18189` `재판관님, 저는 누군이를 돕은다고 움직였지만...`
- 나쁜 예시: `src/data/scriptedText/spouse-v3-01.json:38655` `... 사실을 말할 타가밍을 계속 놓쳤습니다.`
- 나쁜 예시: `src/data/scriptedText/spouse-v3-01.json:42378` `... 먼저 사와한 쪽과 먼저 계산서를 펼친 쪽은...`
- 나쁜 예시: `tmp/thread-q-v3-browser-retest.json:566` `... 제수씨 쪽과 또 부딪힐까 봐 ...`

## 2. Level 1~3 결과

| 구간 | 판정 | 근거 |
| --- | --- | --- |
| Level 1-A 게임 로드 | PASS | caseId, 당사자 정보, 쟁점 4건, 증거 7건, baseEvidenceIds `e-1/e-2/e-3` 일치 |
| Level 1-B Phase 전환 | PASS | phase 흐름 자체는 정상. 런타임 에러 0 |
| Level 1-C Phase 1/2 자동 재생 | PASS | phase1 10개, phase2 8개 로드 |
| Level 1-D 증거 뷰어 | PASS | evidence 7건 smoke 기준 이상 없음 |
| Level 1-E ScriptedText 매칭 | FAIL | `[Scripted miss]=0`은 맞지만 `system_message` 런타임 hit 0건, audit도 unwired |
| Level 2 증거 해금 체인 | PASS | evidence late 반응, dossier 해금, state push 작동 |
| Level 3 LieState 전이 | PASS | S1/S2/S4/S5 probe에서 대사 변화와 dossier push 확인 |

## 3. Level 4 전수 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 4-A NPC 대사 호칭/어체 | FAIL | 배우자간 `자기` 체계는 유지되지만 witness 산출물에 `제수씨` 1건이 섞임 |
| 4-A Truth Throttle + 맥락 정합 | WARN | 재확인한 early probe에서는 `3,000만 원/형/조카/시댁`의 S0~S1 선행 누출은 직접 잡히지 않음. 다만 텍스트 오염 때문에 안정성 신뢰가 떨어짐 |
| 4-A 캐릭터 일관성 | PASS | 부부 관계 특유의 외도 오해, 시댁 공포, 자기방어 축은 실제로 살아 있음 |
| 4-A 금지 패턴 | FAIL | `누군이를`, `타가밍`, `사와한`은 release 금지 수준 |
| 4-B 재판관 질문 | PASS | fact/motive/empathy에 따라 응답 톤 차이가 실제로 남 |
| 4-C 시스템 메시지 | FAIL | system_message 런타임 scripted 미배선 |
| 4-D 증인 증언 | FAIL | depth 차이는 있으나 `제수씨` 혼선 1건으로 품질 붕괴 |
| 4-E 증거 반응 + 특수 | WARN | evidence/dossier/event는 동작. 다만 dossier 질문 고유 전제 반영은 약함 |
| 4-F 한국어 품질 | FAIL | sentence-level 오염 잔존. CT가 말한 “잔존 0건”을 재테스트 기준으로 확인하지 못함 |
| 4-G variant 다양성 | FAIL | `validate-scripted-text WARN 134`, 일부 S5 fact/motive/empathy 변형은 사실상 동일 |
| 4-H aftermath | FAIL | `src/data/scriptedText/spouse-v3-01.json:42378` aftermath에 오염 잔존 |

## 4. Level 5 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 5-A 중재 | PASS | mediation path 4종 존재 |
| 5-B 판결 | PASS | 판결/결과 flow 자체는 동작 |
| 5-C 결과 | FAIL | aftermath 오염 + system_message 미배선으로 release 품질 미달 |

## 5. 맥락 정합성 + 공개 단계 체크

- S0~S1 직접 probe 범위에서는 hidden issue `h-d3`, `h-d4`의 핵심 내용 선행 누출은 못 잡았다.
- dossier push는 실제로 `spouse-v3-01:b:d-1:S3:0`까지 밀린다.
- A/B 정보 비대칭도 재확인 범위에서는 치명적 선행 누출을 직접 보지 못했다.
- 결론: 공개 단계 설계는 대체로 버티지만, 최종 문장 품질 FAIL이 release를 막는다.

## 6. 10회차 요약

| 회차 | 접근 | 결과 | 특이사항 |
| --- | --- | --- | --- |
| 1 | 사실추궁 중심 | PASS | 외도 오해 vs 송금 책임 축 분리가 분명함 |
| 2 | 동기탐색 중심 | PASS | 시댁 공포와 숨김 동기가 spouse 관계에 맞게 열림 |
| 3 | 공감접근 중심 | PASS | 수치심, 부끄러움, 억울함이 잘 살아남 |
| 4 | 증거 early | PASS | early는 아직 흐름 중심, 과도한 선행 공개 없음 |
| 5 | 증거 late | PASS | late는 적금/계좌 이동을 구체적으로 인지 |
| 6 | 증인 depth | FAIL | depth 차이는 있으나 `제수씨`로 즉시 block |
| 7 | dossier push | WARN | state push는 성공, 질문별 반응 차이는 약함 |
| 8 | 끼어들기/감정 폭발 | PASS | authored event/beat는 실제로 작동 |
| 9 | 극단 플레이 / aftermath | FAIL | 결과 분화는 있으나 aftermath 오염이 남음 |
| 10 | 자유 플레이 | FAIL | session fit은 강하지만 release blocker를 덮지 못함 |

## 7. 심문 유형별 차이 비교

- 사실추궁: 책임과 송금 사실을 먼저 고정한다.
- 동기탐색: 시댁 불화, 조카 돌봄, 말 못 한 이유가 더 선명하게 열린다.
- 공감접근: 수치심과 억울함이 먼저 나온다.
- 결론: 유형 차이는 PASS. 문제는 유형 내부 variant 유사도가 높다는 점이다.

## 8. 호칭 전수 체크

| 항목 | 결과 |
| --- | --- |
| A→B `자기/자기야/자기가/자기는` | PASS |
| B→A `자기` | PASS |
| A→재판관 `제 남편` | PASS |
| B→재판관 `제 아내` | PASS |
| 격앙 시 실명 호칭 | PASS |
| `~씨` 계열 0건 | FAIL (`제수씨`) |

## 9. LLM 폴백 체크

- bundle coverage: PASS
- browser probe scripted hits: 41
- browser probe scripted misses: 0
- system_message scripted hits: 0
- 판정: FAIL
  - bundle은 있지만 runtime 배선이 끝나지 않았다.

## 10. 증거/증인/조합/끼어들기 작동

- 증거 연계: PASS
- 증인 소환: FAIL
- 조합/Lead/DossierCard: PASS
- DossierCard state push: PASS
- 끼어들기/감정 폭발: PASS

## 11. 버그 / 이슈 목록

- [P0][Thread G] `system_message` runtime scripted wiring 미구현
- [P0][Thread W] spouse witness 산출물에 `제수씨` 잔존
- [P0][Thread W] hotfix 오염 잔존: `누군이를`, `타가밍`, `사와한`, `움직였은지`
- [P1][Thread W] interrogation variant 중복 심함: `validate-scripted-text WARN 134`
- [P1][Thread W] dossier 반응이 질문 고유 전제를 충분히 끌어오지 못함

## 12. 대사 품질 평가

좋은 예시:
- `src/data/scriptedText/spouse-v3-01.json:41277`
  - `재판관님, 오피스텔에 온 사람은 외도 상대가 아니라 제 동생이었습니다...`
  - spouse 관계에서만 가능한 오해의 구조가 한 줄 안에 들어가 있다.

나쁜 예시:
- `src/data/scriptedText/spouse-v3-01.json:18189`
  - `재판관님, 저는 누군이를 돕은다고 움직였지만...`
- `src/data/scriptedText/spouse-v3-01.json:38655`
  - `... 사실을 말할 타가밍을 계속 놓쳤습니다.`
- `src/data/scriptedText/spouse-v3-01.json:42378`
  - `... 먼저 사와한 쪽과 ...`
- `tmp/thread-q-v3-browser-retest.json:566`
  - `... 제수씨 쪽과 또 부딪힐까 봐 ...`

평가:
- 사건 구조와 session fit은 좋다.
- 하지만 sentence-level 품질이 무너져 있어서 “validator PASS”와 무관하게 release 후보로 올릴 수 없다.

## 13. 종합 판정

- `FAIL`

판정 이유:
- 기능 smoke는 통과했다.
- 그러나 `system_message` 미배선, `제수씨` 호칭 혼선, 다수 오염 잔존, aftermath 오염, variant 중복으로 유료 판매 기준 FAIL이다.
