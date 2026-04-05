# family-08 — S3+ slots 보충 데이터

## 1. 당사자

| | 이름 |
|---|---|
| partyA (a) | 이세라 |
| partyB (b) | 이준호 |

## 2. 쟁점 (disputes)

### d-1: 준호의 대기금 송금과 즉시 미통보
> 준호는 은솔요양원에 150만원을 송금하며 평가입소용 대기 자리를 먼저 확보했고, 작년 합의에 있던 '같은 날 공유' 원칙을 지키지 않았다.

### d-2: 세라의 친척방 공개 비난
> 세라는 계약의 정확한 성격을 확인하기 전 친척 단톡과 사촌 통화에서 준호가 어머니를 몰래 시설에 넣었다는 취지로 공개 비난을 퍼뜨렸다.

### d-3: 150만원은 영구입소 계약금인가
> 문제가 된 150만원은 영구입소 확정금이 아니라 2주 평가입소 침상 홀드와 대기등록을 위한 환불 가능 금액이었다.

### d-4: 이미 입소 조건에 합의했는가
> 작년 가을 가족회의와 치매안심센터 기록에는 배회 재발 또는 화재 위험 재발 시 은솔요양원 대기·평가입소를 진행할 수 있다는 사전 합의가 남아 있었다. 다만 준호는 통보 의무를, 세라는 합의 존재 자체를 현재에 와서 서로 다르게 축소했다.

### d-5: 배신 프레임을 키운 공동 책임
> 준호는 이번에도 중요한 정보를 늦게 알렸고, 세라는 과거 ICU 지연 연락 기억을 현재 사실확인보다 앞세워 배신 서사를 친척들에게 먼저 확산시켰다.

## 3. 진실표 (truthTable)

- **t-1**: 준호는 150만원을 먼저 보내고도 그날 안에 가족 단톡으로 공유하지 않았다.
- **t-2**: 세라는 계약의 성격을 확인하기 전 친척들에게 준호를 공개적으로 비난했다.
- **t-3**: 150만원은 영구입소 확정금이 아니라 평가입소용 대기금이었다.
- **t-4**: 작년 가을 형제와 어머니는 배회 재발 시 은솔요양원 대기·평가입소를 진행하기로 이미 합의했었다.
- **t-5**: 현재의 배신 프레임은 준호의 미통보와 세라의 공개 비난, 그리고 과거 ICU 지연 연락 기억이 함께 키웠다.

## 4. S3+ empty-slots atoms (보충 대상)

### a(이세라).d-1

**참고 — 이미 채워진 slots:**

```json
// a.d-1.S3.claimAtoms[0] (S3)
{"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"}}
// a.d-1.S3.claimAtoms[2] (S3)
{"time":{"dateExact":"작년 가을 가족회의","period":"작년 가을","neutral":"그 회의 때"}}
// a.d-1.S4.claimAtoms[0] (S4)
{"time":{"dateExact":"2021년 아버지 ICU 전원 때","period":"그때 ICU 때","neutral":"과거 그 사건"},"delay":{"exact":"5시간","neutral":"오래 늦은 시간"}}
// a.d-1.S5.claimAtoms[0] (S5)
{"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"}}
// a.d-1.S5.claimAtoms[1] (S5)
{"amount":{"exact":"1,500,000원","rounded":"150만원","neutral":"해당 금액"},"delay":{"exact":"19시간","rounded":"하룻밤 가까이","neutral":"상당 시간"}}
// a.d-1.S5.claimAtoms[2] (S5)
{"group":{"exact":"가족 단톡방","neutral":"가족 대화방"}}
```

**보충 대상 (empty slots):**

- `a.d-1.S3.claimAtoms[1]`
  - factText: "현장 부담은 이해해도 설명 지연은 선택이었다는 판단"
  - tags: ["context","self_justification","counter","responsibility"]
- `a.d-1.S4.claimAtoms[1]`
  - factText: "'또 나만 나중에 안다'는 감각이 배신 프레임을 키웠다는 사실"
  - tags: ["emotion","quote","harm","relationship"]
- `a.d-1.S4.claimAtoms[2]`
  - factText: "상대의 악의보다 자신의 상처가 먼저 반응했다는 자각"
  - tags: ["admission","fear","context"]

### a(이세라).d-2

**참고 — 이미 채워진 slots:**

```json
// a.d-2.S3.claimAtoms[0] (S3)
{"group":{"exact":"친척 단톡방","neutral":"가족 외 친척 대화방"},"time":{"dateExact":"2021년 아버지 ICU 전원 때","period":"그때 ICU 때","neutral":"과거 그 사건"}}
// a.d-2.S3.claimAtoms[1] (S3)
{"delay":{"exact":"5시간","neutral":"오래 늦은 시간"}}
// a.d-2.S4.claimAtoms[1] (S4)
{"group":{"exact":"친척 단톡방","neutral":"가족 외 친척 대화방"}}
// a.d-2.S5.claimAtoms[0] (S5)
{"group":{"exact":"친척 단톡방","neutral":"가족 외 친척 대화방"}}
```

**보충 대상 (empty slots):**

- `a.d-2.S3.claimAtoms[2]`
  - factText: "사건의 첫 정의를 친척들 앞에서 선점해 버린 효과"
  - tags: ["harm","privacy","identity"]
- `a.d-2.S4.claimAtoms[0]`
  - factText: "'또 나만 나중이다'라는 감각이 공개 비난 욕구로 이어졌다는 고백"
  - tags: ["quote","emotion","relationship","harm"]
- `a.d-2.S4.claimAtoms[2]`
  - factText: "도움 요청이라는 명분이 분노 표출과 섞여 있었다는 인정"
  - tags: ["admission","self_justification","emotion"]
- `a.d-2.S5.claimAtoms[1]`
  - factText: "준호의 미통보와 별개로 공개 비난 책임을 자신에게 돌리는 정리"
  - tags: ["admission","counter","relationship"]
- `a.d-2.S5.claimAtoms[2]`
  - factText: "정정과 사과가 신뢰 회복의 전제라는 인식"
  - tags: ["relationship","rule","responsibility"]

### a(이세라).d-3

**참고 — 이미 채워진 slots:**

```json
// a.d-3.S3.claimAtoms[0] (S3)
{"amount":{"exact":"1,500,000원","rounded":"150만원","neutral":"해당 금액"},"rule":{"exact":"환불 가능","neutral":"환불 조항 존재"},"term":{"exact":"2주 평가입소 침상 홀드","neutral":"평가입소용 자리 확보"},"person":{"fullName":"송하린","judgeRef":"상담사","neutral":"시설 담당자"}}
// a.d-3.S3.claimAtoms[2] (S3)
{"person":{"fullName":"송하린","judgeRef":"상담사","neutral":"시설 담당자"}}
// a.d-3.S4.claimAtoms[0] (S4)
{"amount":{"exact":"1,500,000원","rounded":"150만원","neutral":"해당 금액"}}
// a.d-3.S4.claimAtoms[1] (S4)
{"time":{"dateExact":"2021년 아버지 ICU 전원 때","period":"그때 ICU 때","neutral":"과거 그 사건"}}
// a.d-3.S5.claimAtoms[0] (S5)
{"amount":{"exact":"1,500,000원","rounded":"150만원","neutral":"해당 금액"},"term":{"exact":"2주 평가입소 침상 홀드","neutral":"평가입소용 자리 확보"},"rule":{"exact":"환불 가능","neutral":"환불 조항 존재"},"institution":{"fullName":"은솔요양원","neutral":"해당 요양원"}}
// a.d-3.S5.claimAtoms[1] (S5)
{"amount":{"exact":"1,500,000원","rounded":"150만원","neutral":"해당 금액"}}
// a.d-3.S5.claimAtoms[2] (S5)
{"person":{"fullName":"송하린","judgeRef":"상담사","neutral":"시설 담당자"}}
```

**보충 대상 (empty slots):**

- `a.d-3.S3.claimAtoms[1]`
  - factText: "초기 해석이 계약 자체보다 불안의 투사였다는 자기 진단"
  - tags: ["admission","emotion","fear"]
- `a.d-3.S4.claimAtoms[2]`
  - factText: "최악 의미를 스스로 덧씌웠다는 인정"
  - tags: ["admission","uncertainty","fear"]

### a(이세라).d-4

**참고 — 이미 채워진 slots:**

```json
// a.d-4.S3.claimAtoms[0] (S3)
{"threshold":{"exact":"화재 위험 재발","neutral":"위험 신호 재발"},"institution":{"fullName":"은솔요양원","neutral":"해당 요양원"},"time":{"dateExact":"작년 가을 가족회의","period":"작년 가을","neutral":"그 회의 때"}}
// a.d-4.S3.claimAtoms[1] (S3)
{"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"}}
// a.d-4.S4.claimAtoms[0] (S4)
{"time":{"dateExact":"작년 가을 가족회의","period":"작년 가을","neutral":"그 회의 때"}}
// a.d-4.S4.claimAtoms[1] (S4)
{"person":{"fullName":"정옥자","judgeRef":"어머니","neutral":"가족 어르신"}}
// a.d-4.S5.claimAtoms[0] (S5)
{"time":{"dateExact":"작년 가을 가족회의","period":"작년 가을","neutral":"그 회의 때"},"threshold":{"exact":"화재 위험 재발","neutral":"위험 신호 재발"},"institution":{"fullName":"치매안심센터","neutral":"센터"}}
// a.d-4.S5.claimAtoms[1] (S5)
{"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"}}
```

**보충 대상 (empty slots):**

- `a.d-4.S3.claimAtoms[2]`
  - factText: "자신이 합의 존재를 축소해 왔다는 자각"
  - tags: ["admission","legacy_sentence","shame"]
- `a.d-4.S4.claimAtoms[2]`
  - factText: "합의 부정이 자기방어였다는 인정"
  - tags: ["self_justification","admission","shame"]
- `a.d-4.S5.claimAtoms[2]`
  - factText: "자신이 합의 존재를 축소해 자기보호를 했다는 고백"
  - tags: ["self_justification","admission","shame"]

### a(이세라).d-5

**참고 — 이미 채워진 slots:**

```json
// a.d-5.S3.claimAtoms[0] (S3)
{"time":{"dateExact":"2021년 아버지 ICU 전원 때","period":"그때 ICU 때","neutral":"과거 그 사건"}}
// a.d-5.S3.claimAtoms[2] (S3)
{"group":{"exact":"친척 단톡방","neutral":"가족 외 친척 대화방"}}
// a.d-5.S4.claimAtoms[2] (S4)
{"group":{"exact":"친척 단톡방","neutral":"가족 외 친척 대화방"}}
// a.d-5.S5.claimAtoms[1] (S5)
{"time":{"dateExact":"2021년 아버지 ICU 전원 때","period":"그때 ICU 때","neutral":"과거 그 사건"},"group":{"exact":"친척 단톡방","neutral":"가족 외 친척 대화방"}}
```

**보충 대상 (empty slots):**

- `a.d-5.S3.claimAtoms[1]`
  - factText: "미통보 추궁과 별개로 자신이 배신 서사를 확대한 책임 인정"
  - tags: ["admission","relationship","harm","responsibility"]
- `a.d-5.S4.claimAtoms[0]`
  - factText: "다시는 마지막 사람이 되고 싶지 않았다는 핵심 공포"
  - tags: ["fear","emotion","relationship"]
- `a.d-5.S4.claimAtoms[1]`
  - factText: "배신당한 사람의 자리를 먼저 확보하려 했다는 고백"
  - tags: ["identity","motive","admission"]
- `a.d-5.S5.claimAtoms[0]`
  - factText: "배신 프레임 확대에 자신의 공동 책임을 명시적으로 인정"
  - tags: ["admission","relationship","responsibility","harm"]
- `a.d-5.S5.claimAtoms[2]`
  - factText: "과거 사건과 현재 사건을 분리해 다뤄야 한다는 인식"
  - tags: ["rule","relationship","context"]

### b(이준호).d-1

**참고 — 이미 채워진 slots:**

```json
// b.d-1.S3.claimAtoms[0] (S3)
{"time":{"dateExact":"작년 가을 가족회의","period":"작년 가을","neutral":"그 회의 때"},"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"}}
// b.d-1.S4.claimAtoms[1] (S4)
{"time":{"dateExact":"2021년 아버지 ICU 전원 때","period":"그때 ICU 때","neutral":"과거 그 사건"}}
// b.d-1.S4.claimAtoms[2] (S4)
{"time":{"dateExact":"작년 가을 가족회의","period":"작년 가을","neutral":"그 회의 때"},"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"}}
// b.d-1.S5.claimAtoms[0] (S5)
{"amount":{"exact":"1,500,000원","rounded":"150만원","neutral":"해당 금액"},"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"},"institution":{"fullName":"은솔요양원","neutral":"해당 요양원"}}
// b.d-1.S5.claimAtoms[1] (S5)
{"term":{"exact":"2주 평가입소 침상 홀드","neutral":"평가입소용 자리 확보"}}
```

**보충 대상 (empty slots):**

- `b.d-1.S3.claimAtoms[1]`
  - factText: "세라의 격한 반응을 예상해 설명을 미뤘다는 고백"
  - tags: ["fear","relationship","motive"]
- `b.d-1.S3.claimAtoms[2]`
  - factText: "'일단 안전부터'라는 말로 절차 위반을 눌러온 패턴"
  - tags: ["quote","self_justification","context"]
- `b.d-1.S4.claimAtoms[0]`
  - factText: "불효자 낙인 공포가 통보 지연을 부른 면"
  - tags: ["fear","shame","motive"]
- `b.d-1.S5.claimAtoms[2]`
  - factText: "세라에게 '또 배신'처럼 읽히게 만든 결과 책임"
  - tags: ["harm","relationship","admission"]

### b(이준호).d-2

**참고 — 이미 채워진 slots:**

```json
// b.d-2.S3.claimAtoms[0] (S3)
{"group":{"exact":"친척 단톡방","neutral":"가족 외 친척 대화방"}}
// b.d-2.S3.claimAtoms[1] (S3)
{"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"}}
// b.d-2.S4.claimAtoms[0] (S4)
{"person":{"fullName":"정옥자","judgeRef":"어머니","neutral":"가족 어르신"}}
// b.d-2.S4.claimAtoms[2] (S4)
{"group":{"exact":"친척 단톡방","neutral":"가족 외 친척 대화방"}}
```

**보충 대상 (empty slots):**

- `b.d-2.S3.claimAtoms[2]`
  - factText: "양쪽의 행동이 합쳐져 배신 프레임이 커졌다는 인식"
  - tags: ["relationship","harm","context"]
- `b.d-2.S4.claimAtoms[1]`
  - factText: "사실보다 모욕감이 먼저 올라와 방어적으로 굴었다는 고백"
  - tags: ["admission","emotion","shame"]
- `b.d-2.S5.claimAtoms[0]`
  - factText: "세라의 공개 비난 잘못을 분명히 하되 미통보 책임도 함께 인정"
  - tags: ["admission","counter","relationship","responsibility"]
- `b.d-2.S5.claimAtoms[1]`
  - factText: "양쪽 행동이 모두 가족 신뢰를 깎았다는 정리"
  - tags: ["relationship","harm","admission"]
- `b.d-2.S5.claimAtoms[2]`
  - factText: "공개 비난과 미통보를 함께 수습해야 한다는 인식"
  - tags: ["rule","relationship","responsibility"]

### b(이준호).d-3

**참고 — 이미 채워진 slots:**

```json
// b.d-3.S3.claimAtoms[0] (S3)
{"rule":{"exact":"환불 가능","neutral":"환불 조항 존재"},"person":{"fullName":"송하린","judgeRef":"상담사","neutral":"시설 담당자"},"amount":{"exact":"1,500,000원","rounded":"150만원","neutral":"해당 금액"}}
// b.d-3.S3.claimAtoms[1] (S3)
{"person":{"fullName":"송하린","judgeRef":"상담사","neutral":"시설 담당자"}}
// b.d-3.S4.claimAtoms[2] (S4)
{"amount":{"exact":"1,500,000원","rounded":"150만원","neutral":"해당 금액"}}
// b.d-3.S5.claimAtoms[0] (S5)
{"amount":{"exact":"1,500,000원","rounded":"150만원","neutral":"해당 금액"},"rule":{"exact":"환불 가능","neutral":"환불 조항 존재"},"term":{"exact":"2주 평가입소 침상 홀드","neutral":"평가입소용 자리 확보"},"institution":{"fullName":"은솔요양원","neutral":"해당 요양원"}}
```

**보충 대상 (empty slots):**

- `b.d-3.S3.claimAtoms[2]`
  - factText: "갈등 회피 때문에 명칭을 흐렸다는 자기진단"
  - tags: ["fear","self_justification","relationship"]
- `b.d-3.S4.claimAtoms[0]`
  - factText: "사실 관계 하나만 붙잡고 상대 감정을 외면했다는 고백"
  - tags: ["admission","emotion","relationship"]
- `b.d-3.S4.claimAtoms[1]`
  - factText: "용어 축소가 싸움을 줄일 거라는 착각"
  - tags: ["self_justification","fear","admission"]
- `b.d-3.S5.claimAtoms[1]`
  - factText: "'그냥 자리만 잡아둔 거'라는 축약이 오해를 키웠다는 인정"
  - tags: ["quote","admission","harm","self_justification"]
- `b.d-3.S5.claimAtoms[2]`
  - factText: "계약 의미와 설명 책임을 함께 받아들이는 태도"
  - tags: ["responsibility","relationship","admission"]

### b(이준호).d-4

**참고 — 이미 채워진 slots:**

```json
// b.d-4.S3.claimAtoms[0] (S3)
{"institution":{"fullName":"치매안심센터","neutral":"센터"},"person":{"fullName":"배수진","judgeRef":"사례관리사","neutral":"센터 담당자"},"time":{"dateExact":"작년 가을 가족회의","period":"작년 가을","neutral":"그 회의 때"}}
// b.d-4.S3.claimAtoms[1] (S3)
{"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"}}
// b.d-4.S4.claimAtoms[1] (S4)
{"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"}}
// b.d-4.S5.claimAtoms[0] (S5)
{"time":{"dateExact":"작년 가을 가족회의","period":"작년 가을","neutral":"그 회의 때"},"threshold":{"exact":"화재 위험 재발","neutral":"위험 신호 재발"},"institution":{"fullName":"은솔요양원","neutral":"해당 요양원"}}
// b.d-4.S5.claimAtoms[1] (S5)
{"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"},"group":{"exact":"가족 단톡방","neutral":"가족 대화방"}}
```

**보충 대상 (empty slots):**

- `b.d-4.S3.claimAtoms[2]`
  - factText: "자신도 기억을 유리하게 왜곡했다는 자각"
  - tags: ["admission","shame","legacy_sentence"]
- `b.d-4.S4.claimAtoms[0]`
  - factText: "합의 존재만 강조하면 자신이 덜 나빠 보일 것이라 계산했다는 고백"
  - tags: ["motive","self_justification","shame"]
- `b.d-4.S4.claimAtoms[2]`
  - factText: "낙인을 피하려 기억을 편의적으로 사용했다는 점"
  - tags: ["identity","fear","admission"]
- `b.d-4.S5.claimAtoms[2]`
  - factText: "사전합의와 통보의무를 함께 복원해야 한다는 인식"
  - tags: ["relationship","rule","responsibility"]

### b(이준호).d-5

**참고 — 이미 채워진 slots:**

```json
// b.d-5.S3.claimAtoms[1] (S3)
{"group":{"exact":"친척 단톡방","neutral":"가족 외 친척 대화방"},"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"}}
// b.d-5.S4.claimAtoms[2] (S4)
{"person":{"fullName":"정옥자","judgeRef":"어머니","neutral":"가족 어르신"}}
// b.d-5.S5.claimAtoms[1] (S5)
{"rule":{"exact":"그날 안에 가족 단톡 공유","neutral":"같은 날 공유 원칙"},"time":{"dateExact":"2021년 아버지 ICU 전원 때","period":"그때 ICU 때","neutral":"과거 그 사건"}}
```

**보충 대상 (empty slots):**

- `b.d-5.S3.claimAtoms[0]`
  - factText: "현장 부담만 내세워 상대 해석을 보지 못했다는 인정"
  - tags: ["admission","context","emotion"]
- `b.d-5.S3.claimAtoms[2]`
  - factText: "서로의 취약점이 맞물려 프레임이 커졌다는 인식"
  - tags: ["relationship","harm","context"]
- `b.d-5.S4.claimAtoms[0]`
  - factText: "불효자 낙인 공포 때문에 설명을 늦췄다는 고백"
  - tags: ["fear","identity","admission"]
- `b.d-5.S4.claimAtoms[1]`
  - factText: "세라의 버려졌다는 감정과 자신의 공포가 동시에 작동했다는 인식"
  - tags: ["relationship","emotion","context"]
- `b.d-5.S5.claimAtoms[0]`
  - factText: "배신 프레임 확대에 양측 공동 책임을 분명히 인정"
  - tags: ["admission","relationship","responsibility","harm"]
- `b.d-5.S5.claimAtoms[2]`
  - factText: "공개 비난 중단과 늦은 통보 중단이 신뢰 복구 규칙이라는 인식"
  - tags: ["rule","relationship","responsibility"]

---

> 총 42개 empty-slots atoms
