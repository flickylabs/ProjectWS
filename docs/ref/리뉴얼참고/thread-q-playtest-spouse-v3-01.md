# Thread Q Playtest Report — spouse-v3-01

테스트 전제
- 범위: 요청된 10개 접근을 기준으로 `--validate-only`, semantic heuristics, `ScriptedText` 전 채널 정독, `phase1/phase2/mediation` 정독, 앱 연결 상태 점검을 함께 수행했다.
- 한계: 현재 앱 코드에는 `spouse-v3-01` 전용 `src/data/claimPolicies/*.ts` 등록이 없어 `DossierCard/stateUnlockAtoms/events/transitionBeats`의 실제 런타임 노출을 끝까지 확인하지 못했다. 따라서 본 리포트는 "실제 사용자 노출 텍스트 + 현재 앱 연결 상태" 기준 판정이다.
- 자동 점검: `generic-case-run-pipeline --validate-only` PASS, `validate-scripted-semantic-heuristics` PASS. 다만 `WARN:45 / WARN:134 / WARN:26` 수준의 품질 경고가 남았다.

## 1. 10회차 요약
1. 사실추궁 중심: `d-1`과 `d-2`를 축으로 읽으면 모순 토큰용 재료는 충분하다. 다만 `S2` 이후에는 사실추궁, 동기탐색, 공감접근이 비슷한 결론으로 빨리 수렴한다.
2. 동기탐색 중심: "형네 오피스텔", "조카 돌봄", "시댁 폭발 회피"가 열리며 숨은 쟁점 생성력이 가장 좋다. 배우자 관계에서만 가능한 은폐 동기가 살아 있다.
3. 공감접근 중심: 수치심, 배신감, 체면 회피가 전면에 나온다. 감정선은 좋지만 후반부 독점 정보가 더 늘어나지는 않아 차별성이 약해진다.
4. 증거 심층 1차: `e-1/e-2/e-5` 계열은 early-late 차이가 분명하다. late 반응에서는 "3,000만 원", "공동 적금", "동의 없이" 같은 키워드가 구체적으로 살아난다.
5. 증거 심층 2차: `e-1+e-2 -> L-1`, `L-1+e-4 -> dossier` 등 조합 설계는 배우자 서사와 잘 맞는다. 다만 dossier 런타임 등록이 없어 실제 앱 플레이에서 마지막 밀어붙이기까지는 확인 불가다.
6. 증인 + 조합 1차: `w-1`과 `w-3`의 vague/partial/full 깊이 차이는 분명하다. 특히 조카/가족 돌봄 증언은 외도 오해를 뒤집는 힘이 있다.
7. 증인 + 조합 2차: 늦게 부른 증인일수록 구조상 더 센 정보가 열리게 설계돼 있다. 다만 증인 대사에도 `지연 씨`, `준호 씨`가 남아 호칭 FAIL이다.
8. 끼어들기 + 감정 폭발: authored data에는 interjection/outburst가 있다. 그러나 앱 등록 누락 때문에 실제 발생 여부와 누출 정보량은 확인하지 못했다.
9. 극단 플레이: 최소 행동만 하면 "외도 + 돈 빼돌림"으로 오독될 가능성이 높다. 반대로 끝까지 읽으면 "가족 돌봄 은폐 + 공동재산 독단 + 자기방어 송금"의 삼각 충돌이 보인다.
10. 자유 플레이: 가장 재밌는 축은 `새벽 통화 -> 오피스텔 출입 -> 공동 적금 3,000만 원 -> 아내 2,000만 원 송금 -> 누가 먼저 신뢰를 깼는가` 순이다. session fit은 3건 중 가장 강하다.

## 2. 채널별 스크립트 품질
- `interrogation`: 총 144개. `S0 -> S5` 정보 상승은 보인다. 사실추궁보다 동기탐색, 공감접근이 관계 특수성을 더 잘 살린다. 다만 adjacent variant 유사도 경고가 많고 후반부 차별화가 약하다.
- `evidence_present`: 총 42개. 증거 제시 시 카드/문자/적금/송금 같은 핵심 단어를 직접 언급한다. investigationStage가 높아질수록 구체 책임 문장이 붙는 점은 좋다.
- `witness`: 총 9개. vague/partial/full 깊이 차이는 명확하다. 그러나 `지연 씨`, `준호 씨` 같은 직접 호칭 위반과 `있은`, `없은` 류 어색한 형태가 섞여 있다.
- `dossier`: 총 24개. late 단계 압박감은 좋고 state를 강제로 미는 질문으로 쓰기에 적합하다. 다만 일부 B측 질문은 question-specific reflection이 약하고, 현재 앱에서는 등록 누락으로 실제 해금 확인이 막혀 있다.
- `system_message`: 총 6개. 정답을 직접 알려주지 않고 조합/전환 힌트만 주는 점은 적절하다.
- `aftermath`: 총 5개. 결과별 분화는 있지만 문장 끝 moralizing이 다소 템플릿처럼 느껴진다.

## 3. 심문 유형별 차이 비교
- 사실추궁: 증거 축적과 모순 확보에는 가장 효율적이다. 대신 배우자 관계의 감정적 파열은 비교적 평면적으로 들린다.
- 동기탐색: "형네를 감춘 이유", "시댁 싸움 회피", "배우자보다 집안 폭발을 먼저 두려워한 선택"이 가장 잘 열린다. 숨은 쟁점 생성력은 이 유형이 최고다.
- 공감접근: "말하는 쪽도 버겁다", "먼저 당하기 싫었다" 같은 정서 언어가 살아 있다. 다만 S4-S5로 가면 다른 유형과 같은 자백 구조로 합쳐진다.
- 총평: 유형 차이는 분명히 존재하지만 후반부 독점 분기가 더 필요하다.

## 4. 호칭 전수 체크 결과
- 기대값: A->B `여보`, B->A `여보`, A->재판관 `제 남편`, B->재판관 `제 아내`, 격앙 시 `이준호! / 박지연!`
- 실제 위반:
  - `src/data/dialogues/phase1/spouse-v3-01.json:30` `이준호 씨`
  - `src/data/dialogues/phase1/spouse-v3-01.json:39` `박지연 씨`
  - `src/data/dialogues/phase2/spouse-v3-01.json:12` `이준호 씨`
  - `src/data/dialogues/phase2/spouse-v3-01.json:21` `박지연 씨`
  - `src/data/scriptedText/spouse-v3-01.json:41324` `지연 씨`
  - `src/data/scriptedText/spouse-v3-01.json:42015` `준호 씨`
- 판정: FAIL

## 5. 증거 연계 / 증인 / 조합 / 끼어들기 작동 확인
- 증거 연계: PASS. early-late 반응 차이와 핵심 키워드 반영이 확인된다.
- 증인 깊이: PASS. vague/partial/full 차이는 선명하다.
- 조합 스킬: PASS at data level. `combinationLab`에 10개 recipe가 있고 lead-dossier 흐름도 의미 있다.
- DossierCard 질문 성공 후 state push: CONDITIONAL. authored data는 충분하지만 앱 등록 누락으로 실제 런타임 push는 확인 못 했다.
- 끼어들기 / 감정 폭발: CONDITIONAL. `docs/ref/리뉴얼참고/spouse-v3-01-v3-game-loop-data.json`에는 `events`가 있으나 앱 연결이 빠져 실제 발화 확인이 막혀 있다.
- Level 5 session fit: PASS. `외도 오해`, `공동재산`, `시댁/조카 돌봄`, `이혼 대비 송금`은 spouse 관계가 아니면 성립하기 어렵다.

## 6. 발견된 버그 / 이슈 목록
- [P0][Thread G] `spouse-v3-01`용 `src/data/claimPolicies/*.ts` 등록이 없어 `registerV3GameLoopData`가 호출되지 않는다. 결과적으로 dossier, unlock atom, event, transition beat 실플레이 검증이 막힌다.
- [P0][Thread W->G] 사용자 노출 텍스트에 `~씨` 호칭이 남아 있다. Thread Q 규칙상 FAIL이다.
- [P1][Thread W->G] `했은데`, `망이진다`, `보가실`, `있은` 등 형태 오류가 다수 남아 몰입을 깨뜨린다.
- [P1][Thread W->G] `phase1/phase2/mediation`가 다른 v3 사건과 문장 골격을 거의 공유한다. 관계 고유성이 script layer에서 깎인다.
- [P1][Thread G] `src/data/dialogues/mediation/spouse-v3-01.json:54`의 `fact_first` judge 문구는 같은 쟁점명을 두 번 반복한다.

## 7. 대사 품질 전반 평가
- 좋은 예시: `"그 판단에 제 아내를 넣지 않은 순간 이미 잘못이었습니다."` 배우자 관계에서의 절차 위반과 감정적 책임이 한 줄에 같이 잡힌다.
- 좋은 예시: `"외도가 아니었다는 안도보다 왜 저만 바보가 됐나가 먼저 왔습니다."` 오해 해소 후에도 관계가 회복되지 않는 spouse 특유의 뒤끝을 잘 잡았다.
- 나쁜 예시: `"같은 오피스텔을 들락거리고 새벽마다 같은 번호와 통화했은데"` 문장 첫 핵심 증거 문구부터 형태가 무너진다.
- 나쁜 예시: `"지연 씨 쪽에 말이 들어가면 또 크게 부딪힐까 봐"` 내용은 좋지만 호칭이 즉시 FAIL 조건을 밟는다.

## 8. 종합 판정
- FAIL
- 이유: 관계 적합성과 core reveal 구조는 3건 중 가장 좋다. 그러나 `~씨` 하드 FAIL, 앱-side v3 등록 누락, 형태 오류가 동시에 존재한다. 우선순위는 `claimPolicies 등록 -> 호칭 교정 -> 형태/템플릿 정리`다.
