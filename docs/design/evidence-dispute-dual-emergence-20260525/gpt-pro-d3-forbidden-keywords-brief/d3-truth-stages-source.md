# d-3 truthStages — KO 본문 발췌 (case.ts L1582-1764)

본 문서는 `src/data/coreCases/spouse-01.case.ts`의 d-3 dispute truthStages KO 본문 발췌이다. 작성 권위 결정 시 본 영역의 `admittedFact` / `allowedKeywords` / `answerFrame`을 기반으로 lieState 단계별 forbidden lexeme를 결정한다.

## 메타

- **id**: d-3
- **name**: 내연녀 임신 의심
- **truth**: false (misdirection 쟁점)
- **quadrant**: a_only
- **correctResponsibility**: { a: 80, b: 20 }
- **requiredEvidence**: ['e-10']
- **unlockCondition**: { requireDispute: { id: 'd-1', minState: 'S2' } }
- **lieConfig**:
  - a: LT-2 / L2 / self_protection / S0 / collapseViaTrust=false
  - b: LT-6 / L2 / partner_protection / S0 / collapseViaTrust=true

## truthDescription

> 내연녀가 존재하지 않으며 임신도 사실이 아니다. e-10 예비 부모 정서 도서와 e-8/e-9 산부인과 자료들은 모두 이준호 본인이 박지연 난임 진단 후 아내에게 부담을 주지 않으려 혼자 부모 될 마음을 정리하던 흔적이다. 본 misdirection 쟁점은 d-1(가족 돌봄) 또는 h-d4(난임 치료비) 진실 확정 시 자연 무너진다.

## S0 — 단정 + 부정 frame

### a (박지연)

- **admittedFact**: 남편 차에서 예비 부모 정서 도서가 나왔다. 내연녀가 임신했고 그래서 이런 책을 본 게 아니냐.
- **allowedKeywords**: '예비 부모 책', '내연녀 임신', '의심'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: A는 내연녀 임신 단정 frame을 강하게 유지.

### b (이준호)

- **admittedFact**: 그건 오해다. 그런 일은 없다.
- **allowedKeywords**: '오해', '없다'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: B는 부정으로 일관. 본인 동기는 회피.

## S1 — 단정 미세 완화 / 책 본 사실 인정

### a

- **admittedFact**: 단정까지는 아니지만 그쪽 가능성이 가장 커 보인다.
- **allowedKeywords**: '가능성 큼'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: A는 단정 톤을 미세하게 완화.
- **transitionBeat**: 박지연은 단정 어휘를 한 발만 누른다. (어깨가 굳는다.)

### b

- **admittedFact**: 그 책을 본 적은 있다. 자세한 사정은 말하기 어렵다.
- **allowedKeywords**: '본 적 있음', '말하기 어려움'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: B는 책을 본 사실 부분 인정. 동기는 회피.
- **transitionBeat**: 이준호는 한 박자 늦게 "본 적은 있다"고 답한다. (답이 짧다.)

## S2 — 단정 부족 / 본인 자료 인정

### a

- **admittedFact**: 내연녀 임신이라고 단정하기엔 입증이 부족하지만, 그렇다고 다른 설명도 잘 보이지 않는다.
- **allowedKeywords**: '단정 부족', '다른 설명 없음'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: A는 단정에서 한 발 물러나 의심 톤으로 완화.
- **transitionBeat**: 박지연은 "그럼 도대체 왜 이런 책을 봤느냐"고 묻는다. (책을 다시 한 번 들춰본다.)

### b

- **admittedFact**: 그 책은 본인이 보던 것이 맞다. 누구를 위해 봤는지는 말하기 어렵다.
- **allowedKeywords**: '본인이 봄', '말하기 어려움'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: B는 본인 자료임은 인정하되 동기는 회피.
- **transitionBeat**: 이준호는 "내가 본 거 맞다"고 처음으로 인정한다. (숨을 한 박자 늦게 쉰다.)

## S3 — frame 흔들림 / 침묵 동기 일부 인정

### a

- **admittedFact**: 내연녀 임신 frame이 흔들린다. 다만 그럼 누구를 위한 자료인지가 분명치 않다.
- **allowedKeywords**: 'frame 흔들림', '누구를 위함 불분명'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: A는 misdirection frame에서 한 발 더 물러남.
- **transitionBeat**: 박지연은 "그럼 누구를 위해서…"라며 말을 흐린다. (숨을 짧게 들이마신다.)

### b

- **admittedFact**: 아내에게는 알리지 않은 채 알아본 자료가 맞다. 동기는 마지막에 말씀드리겠다.
- **allowedKeywords**: '아내에게 알리지 않음', '동기 마지막'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: B는 침묵 동기 인정. 진실 핵심은 회피.
- **transitionBeat**: 이준호는 "아내 모르게 본 게 맞다"고 인정한다. (시선이 잠시 떨어진다.)

## S4 — 단정 잘못 인정 / 본인 부모 가능성 인정

### a

- **admittedFact**: 내연녀 임신은 거의 아니라고 보인다. 본인의 단정 frame이 잘못이었을 가능성을 받아들인다.
- **allowedKeywords**: '내연녀 임신 거의 아님', '단정 frame 잘못'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: A는 misdirection frame 거의 무너짐. 단정 책임 일부 인정.
- **transitionBeat**: 박지연은 "내가 잘못 본 거였을 수도…"라며 말끝을 흐린다. (손이 책 위에서 잠시 멈춘다.)

### b

- **admittedFact**: 이 자료들은 본인이 부모 될 가능성을 혼자 알아본 흔적이다. 다른 사람을 위한 것이 아니다.
- **allowedKeywords**: '본인 부모 될 가능성', '혼자 알아봄'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: B는 misdirection 진실 거의 인정. 정확한 표현은 다음 단계.
- **transitionBeat**: 이준호는 처음으로 "혼자 알아봤다"고 분명히 말한다. (숨이 길어진다.)

## S5 — 완전 자백 (h-d4 진입점)

### a

- **admittedFact**: 내연녀 임신 의심은 본인의 단정이었다. 남편이 본인을 위해 혼자 부모 될 준비를 알아본 흔적이었다는 점을 받아들인다.
- **allowedKeywords**: '단정의 책임', '본인 위한 흔적'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: A는 misdirection 단정 책임 완전 인정.
- **transitionBeat**: 박지연은 "내가 잘못 본 거였다"고 말한다. (손이 책 위에 길게 머문다.)

### b

- **admittedFact**: 그 책은 본인이 박지연 모르게 부모 될 마음을 혼자 정리하려 산 책이다. 내연녀는 없고 임신도 사실이 아니다.
- **allowedKeywords**: '본인을 위한 책', '부모 될 마음 정리', '내연녀 없음'
- **forbiddenKeywords**: (작성 대상)
- **answerFrame**: B는 misdirection 진실 완전 인정. h-d4 진실로의 진입점.
- **transitionBeat**: 이준호는 "그 책은 나 혼자 보려고 산 거였다"고 말한다. (시선이 처음으로 박지연을 향한다.)

## verdictOptions

- **wrong**: 내연녀가 임신했고 이준호가 그 사실을 알고 있었다.
- **partial**: 내연녀의 존재 자체가 의심되지만 임신은 단정할 수 없다.
- **truth**: 내연녀 임신은 사실이 아니다. 예비 부모 정서 도서는 이준호 본인이 부모 될 마음을 혼자 정리한 흔적이다.
- **defer**: 현재로서는 실체를 단정할 수 없다. 판단을 유보한다.

## judgmentStatement

> 내연녀 임신 의심은 사실이 아니다. 본 dispute는 misdirection이며 e-10은 B 본인이 부모 될 준비를 혼자 알아본 흔적이다.
