# Thread Q Playtest Report v2 — spouse-v3-01

테스트 전제
- 이번 v2는 기존 Thread Q 10회차 시나리오를 유지한 상태에서 P0 재테스트를 위해 `--validate-only`, semantic heuristics, 런타임 headless probe, visible-text 전수 스캔을 다시 수행한 보고서다.
- 판정 원칙은 그대로다. validator PASS만으로 출시 가능 판정을 주지 않고, 실제 문장과 런타임 동작을 직접 확인한 결과를 우선 기록한다.

## 1. P0 해결 확인 결과

- `claimPolicies` 런타임: PASS
  - `registerSpouseV301Data()` 후 `hasClaimPolicy=true`, `dossierCardCount=5`.
  - `resolveDossierQuestion('spouse-v3-01', 'dc-1.b.q1')`가 `blockedVector=context`, `revealedAtomId=spouse-v3-01:b:d-1:S3:0`, `lieAdvance=true`를 반환했다.
  - `events`는 `contradictions=2`, `interjections=2`, `emotionalOutbursts=2`.
  - `transitionBeatCount=6`, `getTransitionBeat('spouse-v3-01','b','d-1','S1','S2')`가 `spouse-v3-01-beat-b-d1-s1-s2`를 반환했다.
  - `evaluateEventTriggers(...)`로 `spouse-v3-01-interjection-b`, `spouse-v3-01-outburst-a` 슬롯까지 확인했다.
- 호칭 0건: PASS
  - `scriptedText/phase1/phase2/mediation`에서 `이준호 씨`, `박지연 씨`, `준호 씨`, `지연 씨` exact hit 0건.
  - runtime callTerms는 `자기 / 제 남편 / 제 아내 / 이준호! / 박지연!`로 교정돼 있다.
  - 실제 문장도 자연스럽다. 예: `자기, ...`, `자기가 붙잡고 있는 건 결과 쪽이고...`.
- 형태 오류 0건: FAIL
  - visible text에 잔존 오류가 남아 있다.
  - `src/data/scriptedText/spouse-v3-01.json:31852` `보가는 순간`
  - `src/data/scriptedText/spouse-v3-01.json:34444` `왜 갔은지까지 보가지 않습니다`
  - `src/data/scriptedText/spouse-v3-01.json:42264` `옮겨갔은지`
  - `src/data/scriptedText/spouse-v3-01.json:42739` `표면상 강해 보가는 단서입니다`
- friend S5 유사도 해소: 해당 없음
- P0 종합: `CONDITIONAL`
  - 런타임 P0는 실제로 복구됐다.
  - 다만 visible typo가 남아 있어 “완전 해결”로는 볼 수 없다.

## 2. 10회차 요약

1. 사실추궁 중심: `d-1`, `d-2` 축에서 외도 오해와 공동 적금 문제를 빠르게 갈라낸다. 모순 토큰 축적은 여전히 잘 된다.
2. 동기탐색 중심: `형네 돌봄`, `시댁 불화 회피`, `조카 사정`이 드러나며 spouse 관계에서만 가능한 숨김 동기가 선명해진다.
3. 공감접근 중심: 박지연/이준호 모두 “충돌 회피”와 “두려움”을 먼저 꺼내며 오프더레코드형 고백으로 연결된다.
4. 증거 심층 1: `e-1/e-2/e-5`는 investigationStage가 올라갈수록 `3,000만 원`, `공동 적금`, `동의 없이` 같은 책임 언어가 붙는다.
5. 증거 심층 2: `e-2+e-4 -> L-1` 흐름과 `dc-1` 질문이 이어지며, v1에서 막히던 Dossier state push가 이번 v2에서는 실제 런타임으로 확인됐다.
6. 증인 + 조합 1: `w-1`은 vague/partial/full 깊이 차이가 분명하고, 돌봄 서사와 적금 전용 문제를 동시에 묶어 준다.
7. 증인 + 조합 2: 증거+발언 조합은 spouse 특유의 “외도처럼 보인 돌봄” 구조를 살린다. 다만 witness vague depth는 메모리 제한 문구가 약하다.
8. 끼어들기 + 감정 폭발: authored event와 trigger slot은 런타임으로 확인됐다. 끼어들기와 outburst 모두 문맥상 자연스럽다.
9. 극단 플레이: 최소 행동으로 가면 외도 오해만 남고, 전부 소진하면 “외도 오해 vs 공동 재산 선행 훼손”의 이중 구조가 살아난다.
10. 자유 플레이: session fit은 강하다. 이 사건의 싸움은 배우자 관계가 아니면 성립하기 어렵다.

## 3. 채널별 스크립트 품질

- `interrogation`: CONDITIONAL
  - 질문 유형 차이는 실제로 존재한다.
  - 그러나 `scripted-semantic-quality WARN:45`, `validate-scripted-text WARN:134`, `heuristics WARN:26`으로 S5 인접 variant 유사도가 여전히 높다.
- `evidence_present`: PASS
  - late 단계에서 구체 금액과 권한 문제를 직접 말한다.
  - 증거 키워드 반영도 충분하다.
- `witness`: CONDITIONAL
  - 깊이 차이는 분명하다.
  - 다만 vague witness가 “기억 한계” 언어 없이 단정적으로 말하는 구간이 있어 heuristics 경고가 남는다.
- `dossier`: CONDITIONAL
  - 런타임 해금/사용은 실제로 된다.
  - 그러나 일부 Dossier 반응은 질문 고유 전제가 약하다는 validator 경고가 남는다.
- `system_message`: FAIL
  - 스포일러는 없지만 visible typo가 남아 있다.
- `aftermath`: CONDITIONAL
  - 판결별 분위기 차이는 좋다.
  - 그러나 일부 문장에 visible typo가 남아 있다.

## 4. 심문 유형별 차이 비교

- 사실추궁
  - `오피스텔에 간 건 외도가 아니라 형네 때문이었습니다.`
  - 책임과 사실관계를 먼저 세운다.
- 동기탐색
  - `시댁 얘기만 나오면 제 아내와 크게 부딪혔습니다. 그래서 형네 사정을 숨긴 채 제가 혼자 움직였습니다.`
  - 숨긴 이유와 제3자 lead를 여는 데 가장 강하다.
- 공감접근
  - `조카를 그냥 두고 오기 어려웠습니다. 동시에 집에서는 또 싸움이 날까 봐 겁났습니다.`
  - 감정 노출은 가장 좋다.
- 종합
  - 세 유형이 entry tone 수준을 넘어서 실제 공개 정보의 방향까지 다르게 만든다.
  - 다만 후반 S5 variant 압축은 아직 심하다.

## 5. 호칭 전수 체크 결과

- A→B: `자기`, `자기가`, `자기는` 확인
- B→A: `자기` 확인
- A→재판관: `제 남편` 확인
- B→재판관: `제 아내` 확인
- 격앙: `이준호!`, `박지연!` runtime callTerms 확인
- exact-name `~씨`: 0건
- 판정: PASS

## 6. 증거 연계 / 증인 / 조합 / 끼어들기 작동 확인

- 증거 연계: PASS
  - `e-5` late 반응은 `적금 해지 3,000만 원`, `제 혼자 결정`, `제 권한을 만들 수는 없습니다`까지 직접 말한다.
- 증인: PASS
  - `w-1` full은 조카 저녁, 편의점, 시댁 충돌 회피, 적금 미안함까지 연결한다.
- 조합 스킬: PASS
  - spouse 관계에서 `외도처럼 보인 가족 돌봄`과 `공동 적금 unilateral transfer`가 맞물리며 lead와 dossier로 자연스럽게 이어진다.
- DossierCard state push: PASS
  - `dc-1.b.q1` 사용 시 `spouse-v3-01:b:d-1:S3:0` 조기 해금이 실제로 발생한다.
- 끼어들기 / 감정 폭발: PASS
  - interjection/outburst authored slot과 trigger 결과를 모두 확인했다.

## 7. 발견된 버그 / 이슈 목록

- [P0][Thread W→G] visible typo가 아직 남아 있다.
- [P1][Thread W→G] S5 interrogation variant 유사도가 높다. validator 경고가 아직 대량 남아 있다.
- [P1][Thread W→G] 일부 Dossier 반응이 질문 고유 전제를 충분히 반영하지 못한다.
- [P1][Thread W→G] witness vague depth에 “정확히는 기억 안 난다”류의 제한 언어가 부족하다.

## 8. 대사 품질 전반 평가

- 좋은 예시
  - `재판관님, 시댁 얘기만 나오면 제 아내와 크게 부딪혔습니다. 그래서 형네 사정을 숨긴 채 제가 혼자 움직였습니다.`
  - `그때 준호가 퇴근하고 들러 밥 챙기고 편의점에서 필요한 걸 사다 준 겁니다.`
  - spouse 사건의 관계성과 숨김 동기를 직접 살린다.
- 나쁜 예시
  - `표면상 강해 보가는 단서입니다.`
  - `왜 분노가 외도보다 통장으로 옮겨갔은지`
  - 오탈자 하나가 살아 있는 순간 QA 기준으로는 바로 감점이다.

## 9. 종합 판정

- `CONDITIONAL`
- 이유
  - P0 중 런타임 축은 실제로 복구됐다. DossierCard, event, transition이 이번 빌드에서 작동한다.
  - 그러나 visible typo가 남아 있고, 후반 variant 중복도 심하다.
  - 출시 전 기준으로는 한 번 더 다듬어야 한다.
