# Thread Q Playtest Report v4 - family-v3-01

테스트 범위:
- `node scripts/generic-case-run-pipeline.cjs --case family-v3-01 --validate-only`
- `node scripts/audit-v3-scripted-fallback-coverage.cjs`
- browser runtime probe 10세션 (`tmp/thread-q-v3-browser-retest.mjs`, 결과 `tmp/thread-q-v3-browser-retest.json`)
- 원문 직접 readback (`src/data/scriptedText/family-v3-01.json`, `tmp/family-v3-01-stage3-validate.txt`)

## 1. P0 해결 확인

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| dossier 런타임 | PASS | dossier resolve가 실제로 state를 밈 |
| events / transitionBeats authored 복구 | FAIL | runtime sample이 `family-v3-01-fallback-contradiction-2`, `family-v3-01-fallback-interjection-b`, `family-v3-01-fallback-outburst-b`, `family-v3-01-fallback-beat-a-d-5-S2-S3-0` |
| TypeError 0건 | PASS | 브라우저 런타임 에러 0 |
| system_message 런타임 wiring | FAIL | audit는 여전히 `system_message=false`, browser probe system hit 0 |
| hotfix 오염 0건 | FAIL | `src/data/scriptedText/family-v3-01.json:16427` `누군이`, `src/data/scriptedText/family-v3-01.json:20360` `타가밍`, `src/data/scriptedText/family-v3-01.json:35522` `h-d3`/설계 문장 누출, `tmp/family-v3-01-stage3-validate.txt`에서 FAIL 30 |
| 호칭 0건 | PASS | `~씨` 직접 hit 없음. `정후야/형/제 동생/제 형` 체계는 유지 |
| LLM fallback miss 0건 | CONDITIONAL | browser probe `hitCount=40`, `missCount=0`. 다만 system_message는 런타임 미사용 |
| validate-only 기능 게이트 | FAIL | `summary={"WARN":193,"FAIL":30}`. release 전 스크립트 게이트에서 이미 탈락 |

핵심 인용:
- 좋은 예시: `src/data/scriptedText/family-v3-01.json:47507` `... 형제가 마주치면 일이 커질까 봐 조급해하는 쪽에 가까웠습니다.`
- 나쁜 예시: `src/data/scriptedText/family-v3-01.json:16427` `... 누군이 두려워했을 수 있다는 ...`
- 나쁜 예시: `src/data/scriptedText/family-v3-01.json:20360` `... 타가밍을 피하려 한 겁니다. 그 차가를 봐 주셨으면 ...`
- 나쁜 예시: `tmp/family-v3-01-stage3-validate.txt:133` 이후 `a|h-d3|S5|*` / `b|h-d3|S5|*` 전부 `S5 구체적 금액 미포함`
- 나쁜 예시: `tmp/thread-q-v3-browser-retest.json:839` 이후 family events-transition 전부 fallback ID 사용

## 2. Level 1~3 결과

| 구간 | 판정 | 근거 |
| --- | --- | --- |
| Level 1-A 게임 로드 | PASS | caseId, 당사자 정보, 쟁점 5건, 증거 7건, baseEvidenceIds `e-1/e-2/e-3` 일치 |
| Level 1-B Phase 전환 | PASS | phase 흐름 자체는 동작 |
| Level 1-C Phase 1/2 자동 재생 | PASS | phase1 10개, phase2 8개 로드 |
| Level 1-D 증거 뷰어 | PASS | evidence smoke 이상 없음 |
| Level 1-E ScriptedText 매칭 | FAIL | bundle coverage는 PASS지만 system_message runtime hit 0 |
| Level 2 증거 해금 체인 | PASS | 숨은 쟁점, evidence late, dossier push 작동 |
| Level 3 LieState 전이 | PASS | 전이 자체는 일어남. 다만 authored beat가 아니라 fallback beat가 섞임 |

## 3. Level 4 전수 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 4-A NPC 대사 호칭/어체 | WARN | 관계 호칭은 맞지만 fallback event 설명에서 `윤정후은`처럼 형태가 깨짐 |
| 4-A Truth Throttle + 맥락 정합 | FAIL | `tmp/family-v3-01-stage3-validate.txt`에 `S5 구체적 금액 미포함` FAIL 30건. `h-d3` S5가 완전 공개에 도달하지 못함 |
| 4-A 캐릭터 일관성 | PASS | 형제 보호, 말년 돌봄, 상속 불안이라는 family fit은 강함 |
| 4-A 금지 패턴 | FAIL | `누군이`, `타가밍`, `h-d3`/설계 문장 누출이 그대로 섞임 |
| 4-B 재판관 질문 | PASS | fact/motive/empathy에 따라 응답 톤 차이 존재 |
| 4-C 시스템 메시지 | FAIL | runtime scripted 미배선 |
| 4-D 증인 증언 | WARN | `w-1 partial`, `w-3 vague/partial`는 고유 단서가 약하다는 validator 경고가 있음. 다만 `src/data/scriptedText/family-v3-01.json:47507` 수준의 좋은 증언도 존재 |
| 4-E 증거 반응 + 특수 | FAIL | events/transition은 authored가 아니라 fallback 합성. dossier도 질문 고유 전제 반영이 약함 |
| 4-F 한국어 품질 | FAIL | sentence-level 오염이 대량 잔존. 660건 보강 이후 release-ready 상태라고 보기 어려움 |
| 4-G variant 다양성 | FAIL | `validate-scripted-text WARN 193` |
| 4-H aftermath | FAIL | 결과 분화는 있으나 generic 후일담 경향 + 품질 경고 잔존 |

## 4. Level 5 결과

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 5-A 중재 | PASS | mediation path 존재 |
| 5-B 판결 | PASS | 판결/결과 flow는 동작 |
| 5-C 결과 | FAIL | aftermath 품질과 특수 연출 authored 복구 실패로 release 미달 |

## 5. 맥락 정합성 + 공개 단계 체크

- early probe 범위에서는 `90%`, `20년 송금`, `출생 비밀`의 S0~S1 선행 누출을 직접 잡지는 못했다.
- 그러나 `h-d3` S5는 validator가 전부 `구체적 금액 미포함`으로 실패시켰다. 이것만으로도 “S5 전부 공개” 기준을 충족하지 못한다.
- family 갈등 자체는 “형제가 아니면 성립하기 어려운 싸움”으로 잘 서 있다.
- 결론: relation fit은 PASS, release fit은 FAIL이다.

## 6. 10회차 요약

| 회차 | 접근 | 결과 | 특이사항 |
| --- | --- | --- | --- |
| 1 | 사실추궁 중심 | PASS | 유서/공증/방문 기록 축은 잘 선다 |
| 2 | 동기탐색 중심 | PASS | 돌봄, 보호, 형제 부채감이 잘 드러남 |
| 3 | 공감접근 중심 | PASS | 배제감과 상실감은 강하다 |
| 4 | 증거 early | PASS | early는 모호성 유지 |
| 5 | 증거 late | FAIL | late 단계부터 오염 문장과 설계 문장 누출이 급증 |
| 6 | 증인 depth | WARN | 좋은 full witness가 있지만 partial/vague 밀도는 약함 |
| 7 | dossier push | WARN | state push는 성공, 반응 강도는 부족 |
| 8 | 끼어들기/감정 폭발 | FAIL | 동작은 하나 authored가 아니라 fallback ID |
| 9 | 극단 플레이 / aftermath | FAIL | 결과 분화는 있으나 문장 품질이 못 버팀 |
| 10 | 자유 플레이 | FAIL | family fit은 강하지만 release 기준에는 미달 |

## 7. 심문 유형별 차이 비교

- 사실추궁: 누가 문서와 말년 돌봄을 쥐었는지 묻는다.
- 동기탐색: 형제 보호, 죄책감, 상속 불안을 드러낸다.
- 공감접근: 배제감과 상실 공포가 먼저 나온다.
- 결론: 유형 차이는 PASS. 하지만 S5에서 핵심 숫자를 끝내 못 말하는 순간 전체 설계가 무너진다.

## 8. 호칭 전수 체크

| 항목 | 결과 |
| --- | --- |
| A→B `정후야` | PASS |
| B→A `형` | PASS |
| A→재판관 `제 동생` | PASS |
| B→재판관 `제 형` | PASS |
| 격앙 시 `윤정후!/형!` | PASS |
| `~씨` 계열 0건 | PASS |

## 9. LLM 폴백 체크

- bundle coverage: PASS
- browser probe scripted hits: 40
- browser probe scripted misses: 0
- system_message scripted hits: 0
- 판정: FAIL
  - bundle은 있으나 runtime 배선이 끝나지 않았고, event/transition authored 복구도 안 됐다.

## 10. 증거/증인/조합/끼어들기 작동

- 증거 연계: PASS
- 증인 소환: WARN
- 조합/Lead/DossierCard: PASS
- DossierCard state push: PASS
- 끼어들기/감정 폭발: FAIL
  - fallback 텍스트와 fallback beat ID가 그대로 노출된다.

## 11. 버그 / 이슈 목록

- [P0][Thread G] family event/transition authored 데이터가 런타임에서 fallback으로 대체됨
- [P0][Thread G] `system_message` runtime scripted wiring 미구현
- [P0][Thread W] `누군이`, `타가밍`, `차가를`, 설계 문장/ID 누출 잔존
- [P0][Thread W] `h-d3` S5가 구체 금액을 끝내 공개하지 못함
- [P1][Thread W] variant 중복 심함: `validate-scripted-text WARN 193`
- [P1][Thread W] witness/dossier의 질문 고유성 부족

## 12. 대사 품질 평가

좋은 예시:
- `src/data/scriptedText/family-v3-01.json:47507`
  - `... 형제가 마주치면 일이 커질까 봐 조급해하는 쪽에 가까웠습니다.`
  - family 사건에서만 나올 수 있는 압박과 조급함이 잘 살아 있다.

나쁜 예시:
- `src/data/scriptedText/family-v3-01.json:16427`
  - `... 누군이 두려워했을 수 있다는 ...`
- `src/data/scriptedText/family-v3-01.json:20360`
  - `... 타가밍을 피하려 한 겁니다. 그 차가를 봐 주셨으면 ...`
- `tmp/thread-q-v3-browser-retest.json:839` 이후
  - `family-v3-01-fallback-*` ID가 그대로 작동
- `tmp/family-v3-01-stage3-validate.txt:133-201`
  - `S5 구체적 금액 미포함` 30건

평가:
- 관계 적합성은 강하다.
- 하지만 Level 4 핵심 게이트인 “소리 내어 읽어도 사람이 쓴 문장처럼 자연스러운가”를 통과하지 못했다.

## 13. 종합 판정

- `FAIL`

판정 이유:
- family는 crash는 막았지만 release-ready가 아니다.
- fallback event/beat, system_message 미배선, S5 공개 실패 30건, 다수 오염 잔존으로 유료 판매 기준 FAIL이다.
