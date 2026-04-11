# Thread Q Playtest Report — friend-v3-01

테스트 전제
- 범위: 요청된 10개 접근을 기준으로 `--validate-only`, semantic heuristics, `ScriptedText` 전 채널 정독, `phase1/phase2/mediation` 정독, 앱 연결 상태 점검을 함께 수행했다.
- 한계: 현재 앱 코드에는 `friend-v3-01` 전용 `src/data/claimPolicies/*.ts` 등록이 없어 `DossierCard/stateUnlockAtoms/transitionBeats`의 실제 런타임 노출을 확인하지 못했다. 또한 authored v3 data 자체에 `events`가 없어 Round 8은 설계 단계에서 막혀 있다.
- 자동 점검: `generic-case-run-pipeline --validate-only` PASS, `validate-scripted-semantic-heuristics` PASS. 그러나 `WARN:104 / WARN:469 / WARN:26`으로 3건 중 가장 시끄럽다.

## 1. 10회차 요약
1. 사실추궁 중심: `d-1`과 `d-4`에서 "집착 vs 경고", "손절 vs 변심" 프레임은 잘 잡힌다. 다만 유사한 변명 구조가 너무 자주 반복된다.
2. 동기탐색 중심: 예비신랑, 과거 손절, A 아버지의 돈 접근이 연결되며 숨은 쟁점은 잘 열린다. 설계만 보면 friend 관계 특수성이 충분하다.
3. 공감접근 중심: "악역을 자처한 보호자" 감정은 잡히지만, 후반부에는 사실추궁/동기탐색과 거의 같은 결론으로 수렴한다.
4. 증거 심층 1차: `e-4/e-5/e-6` 계열은 early-late 차이가 있고, late에서는 "먼저 선을 넘은 쪽", "과거와 현재 같은 패턴"이 분명해진다.
5. 증거 심층 2차: `e-5+e-6 -> lead-5`로 과거/현재를 한 패턴에 묶는 조합은 좋다. 다만 이후 dossier push가 앱에서 확인되지 않는다.
6. 증인 + 조합 1차: 증인 증언은 stance 방향이 살아 있다. 특히 회식 후 분위기, 관심의 방향, 먼저 선을 넘은 쪽을 설명하는 데는 유효하다.
7. 증인 + 조합 2차: 늦은 증언일수록 정보는 세지지만 `수민 씨`, `다은 씨`와 형태 오류가 함께 증가한다. 좋은 reveal이 copy 문제에 묻힌다.
8. 끼어들기 + 감정 폭발: 실제 검증 불가. authored v3 data에 `events`가 없어 Round 8 요구를 채울 수 없다.
9. 극단 플레이: 최소 행동만 하면 "B의 집착과 손절"로 거의 고정된다. 풀 루트를 읽어야 "경고 실패 + 낙인 + 제3자 돈 패턴"으로 전환되지만, 반복 문구 때문에 보상이 약하다.
10. 자유 플레이: 가장 재밌는 축은 `경고였는가 -> 예전 손절의 진짜 시작 -> 아버지 돈 패턴 -> 누가 먼저 명예를 무너뜨렸는가`다. 설계 의도는 좋지만 체감 완성도는 3건 중 가장 낮다.

## 2. 채널별 스크립트 품질
- `interrogation`: 총 180개. 기본 프레임은 분명하지만 variant similarity가 과도하다. 질문 유형을 바꿔도 "내가 혼자 악역이 됐다" 류 응답으로 자주 수렴한다.
- `evidence_present`: 총 42개. 예비신랑 메시지, 단톡 낙인, 아버지 돈 접근을 구체적으로 인식한다. 사건 핵심 키워드 회수는 잘 된다.
- `witness`: 총 9개. vague/partial/full은 존재한다. 그러나 `수민 씨`, `다은 씨`가 직접 드러나고 몇몇 문장은 형태가 무너져 집중력이 떨어진다.
- `dossier`: 총 15개. late 반전 자체는 좋다. 하지만 question-specific reflection 경고가 있고, 현재 앱에서는 실제 해금/압박 확인이 막혀 있다.
- `system_message`: 총 6개. 과도한 스포일러는 없다.
- `aftermath`: 총 5개. 결과별 분화는 되지만 genericity가 있고, friend 특유의 씁쓸함이 충분히 날카롭지는 않다.

## 3. 심문 유형별 차이 비교
- 사실추궁: 낙인과 메시지 흔적을 모으는 데는 가장 효율적이다.
- 동기탐색: 이 사건의 숨은 재미인 "경고하려 했지만 말을 못 했다", "아버지 돈 패턴이 반복됐다"를 가장 잘 연다.
- 공감접근: 피해감, 고립감, 자기희생 프레임은 보이지만 다른 유형과의 실질 차이가 가장 약하다.
- 총평: 유형 차이는 entry line에서는 있으나, 후반부 체감 차이는 3건 중 가장 얇다.

## 4. 호칭 전수 체크 결과
- 기대값: A->B `수민아`, B->A `다은아`, A->재판관 `제 친구`, B->재판관 `제 친구`, 격앙 시 `최수민! / 송다은!`
- 실제 위반:
  - `src/data/dialogues/phase1/friend-v3-01.json:30` `최수민 씨`
  - `src/data/dialogues/phase1/friend-v3-01.json:39` `송다은 씨`
  - `src/data/dialogues/phase2/friend-v3-01.json:12` `최수민 씨`
  - `src/data/dialogues/phase2/friend-v3-01.json:21` `송다은 씨`
  - `src/data/scriptedText/friend-v3-01.json:47592` `수민 씨`
  - `src/data/scriptedText/friend-v3-01.json:47914` `수민 씨`
- 판정: FAIL

## 5. 증거 연계 / 증인 / 조합 / 끼어들기 작동 확인
- 증거 연계: PASS. 예비신랑 메시지, 단톡방 낙인, 아버지 돈 접근이 서로 잘 묶인다.
- 증인 깊이: PASS. relation direction은 살아 있다.
- 조합 스킬: PASS at data level. `combinationLab`에 10개 recipe가 있고 hidden dispute를 여는 방향도 적절하다.
- DossierCard 질문 성공 후 state push: CONDITIONAL. authored data는 있으나 앱 등록 누락으로 체감 확인 불가다.
- 끼어들기 / 감정 폭발: FAIL for current build. `docs/ref/리뉴얼참고/friend-v3-01-v3-game-loop-data.json`에 `events`가 없어 Round 8을 충족하지 못한다.
- Level 5 session fit: CONDITIONAL. "손절한 절친", "예비신랑 경고", "친구 아버지의 돈 패턴", "단톡 낙인"은 friend 관계로만 성립한다. 다만 실제 대사 체감은 반복이 심해 관계 고유성이 충분히 전달되지 않는다.

## 6. 발견된 버그 / 이슈 목록
- [P0][Thread G] `friend-v3-01`용 `src/data/claimPolicies/*.ts` 등록이 없어 `registerV3GameLoopData`가 호출되지 않는다. dossier, unlock atom, transition beat가 앱에 연결되지 않는다.
- [P0][Thread G] `docs/ref/리뉴얼참고/friend-v3-01-v3-game-loop-data.json`에 `events` 섹션이 없다. Round 8 테스트를 구조적으로 수행할 수 없다.
- [P0][Thread W->G] 사용자 노출 텍스트에 `~씨` 호칭이 남아 있다. FAIL.
- [P1][Thread W->G] variant similarity가 지나치게 높다. 3유형을 갈라 플레이해도 후반 체감 차이가 약하다.
- [P1][Thread W->G] `문제이`, `보가는`, `없었은데`, `뒤가어` 등 형태 오류가 다수 남아 있다.
- [P1][Thread W->G] `phase1/phase2/mediation`가 다른 사건과 너무 비슷한 문장 골격을 쓴다. friend 사건 고유의 날카로움이 희석된다.

## 7. 대사 품질 전반 평가
- 좋은 예시: `"예전 손절의 시작은 제 변심이 아니라 제 친구 아버지의 돈 문제였습니다."` friend 관계에서만 가능한 과거-현재 역전 포인트가 정확하다.
- 좋은 예시: `"남은 건 제 집착처럼 보이는 모양뿐이었습니다."` 경고와 집착의 프레임 충돌을 짧게 잘 잡았다.
- 나쁜 예시: `"그 자리에선 수민 씨가 없었은데도"` 핵심 witness 대사에서 바로 형태가 깨진다.
- 나쁜 예시: `"문제이 가볍지 않다는 건 압니다."` phase 대사 초입부터 완성도가 무너진다.

## 8. 종합 판정
- FAIL
- 이유: 콘셉트와 hidden pattern 설계는 좋다. 그러나 `~씨` 하드 FAIL, Round 8 불가, 앱-side v3 등록 누락, 과도한 variant similarity, copy 오류가 겹쳐 실제 플레이 완성도가 가장 낮다. 우선순위는 `claimPolicies 등록 + events 보강 + variant 재작성 + 호칭/형태 교정`이다.
