# partnership-10 — S3+ slots 보충 데이터

## 1. 당사자

| | 이름 |
|---|---|
| partyA (a) | 오준서 |
| partyB (b) | 박혜린 |

## 2. 쟁점 (disputes)

### d-1: 준서의 최종 승인 없는 오퍼 발송
> 준서는 혜린과 급여 조건을 확정하지 않은 채 민서에게 정식 오퍼 메일, 계좌정보 요청, 온보딩 문서를 먼저 보냈다.

### d-2: 혜린의 일방적 보류 통보와 내부 확산
> 혜린은 준서와 재확인하지 않은 채 민서와 기존 트레이너들에게 '채용은 없던 일'이라고 말하며, 준서가 몰래 사람을 앉히려 했다는 취지로 상황을 퍼뜨렸다.

### d-3: 준서가 의도적으로 동업자를 속여 독단 채용했는가
> 혜린은 배신을 의심했고 준서는 승인이 끝났다고 믿었지만, 실제로는 혜린의 '이번 주부터 한번 같이 돌아보자'는 말과 자동 생성된 온보딩 캘린더 초대가 겹치며 trial 승인과 최종 채용이 서로 다르게 이해된 오해였다.

### d-4: 공동 채용 프로토콜의 쌍방 위반
> 두 사람은 체험평가표, 급여 시트, 공동 final message를 거치기로 해놓고 준서는 오퍼를 먼저 보내고 혜린은 별도 보류 통보를 먼저 하며 같은 규칙을 함께 무너뜨렸다.

### d-5: 온보딩 캘린더의 자동 발송 오해
> HR 툴은 후보자 이메일을 온보딩 단계에 넣는 순간 자동으로 'Day 1 Orientation' 캘린더 초대를 발송했고, 이 문구가 민서와 두 대표 모두에게 최종 채용 확정처럼 읽혔다.

## 3. 진실표 (truthTable)

- **t-1**: 준서는 최종 공동 승인 없이 오퍼 메일과 온보딩 서류를 먼저 보냈다.
- **t-2**: 혜린은 재확인 없이 후보자와 기존 직원들에게 보류 통보를 먼저 했다.
- **t-3**: 이번 채용은 계획적인 배신보다 trial 승인과 최종 승인 해석이 엇갈린 오해에 가까웠다.
- **t-4**: 두 사람 모두 합의된 채용 체크리스트와 단일 커뮤니케이션 원칙을 어겼다.
- **t-5**: HR 툴의 자동 캘린더 초대가 최종 채용 확정처럼 보이게 만든 기술적 요인이 있었다.

## 4. S3+ empty-slots atoms (보충 대상)

### a(오준서).d-1

**참고 — 이미 채워진 slots:**

```json
// a.d-1.S3.claimAtoms[0] (S3)
{"protocol":{"exact":"체험평가표, 급여 시트, 공동 final message","neutral":"합의된 3단계"},"sheet":{"exact":"민서 급여 시트","neutral":"급여 시트"}}
// a.d-1.S3.claimAtoms[1] (S3)
{"quote":{"exact":"'이번 주부터 한번 같이 돌아보자'","neutral":"그 승인처럼 들린 말"},"person":{"exact":"박혜린","neutral":"공동대표","fullName":"박혜린","judgeRef":"혜린 씨"}}
// a.d-1.S5.claimAtoms[0] (S5)
{"person":{"exact":"한민서","neutral":"지원자","fullName":"한민서","judgeRef":"민서 씨"},"protocol":{"exact":"체험평가표, 급여 시트, 공동 final message","neutral":"합의된 3단계"}}
// a.d-1.S5.claimAtoms[1] (S5)
{"quote":{"exact":"체험근무","neutral":"그 이름표"}}
```

**보충 대상 (empty slots):**

- `a.d-1.S4.claimAtoms[0]`
  - factText: "후보자 이탈과 운영 공백에 대한 두려움 때문에 승인 확인을 건너뛰었습니다."
  - tags: ["fear","motive","context"]
- `a.d-1.S4.claimAtoms[1]`
  - factText: "배신감 문제를 일정 문제처럼 줄여 말한 것이 제 방어였습니다."
  - tags: ["emotion","self_justification","admission"]

### a(오준서).d-3

**참고 — 이미 채워진 slots:**

```json
// a.d-3.S3.claimAtoms[0] (S3)
{"quote":{"exact":"'이번 주부터 한번 같이 돌아보자'","neutral":"그 승인처럼 들린 말"},"tool":{"exact":"'Day 1 Orientation'","neutral":"첫 출근처럼 보이는 일정 문구"}}
// a.d-3.S5.claimAtoms[0] (S5)
{"person":{"exact":"박혜린","neutral":"공동대표","fullName":"박혜린","judgeRef":"혜린 씨"}}
```

**보충 대상 (empty slots):**

- `a.d-3.S4.claimAtoms[0]`
  - factText: "운영 공백이 두려워 trial 승인과 최종 승인을 제게 유리한 방향으로 묶어 읽었습니다."
  - tags: ["fear","motive","admission"]

### b(박혜린).d-2

**참고 — 이미 채워진 slots:**

```json
// b.d-2.S3.claimAtoms[0] (S3)
{"person":{"exact":"오준서","neutral":"공동대표","fullName":"오준서","judgeRef":"준서 씨"},"candidate":{"exact":"한민서","neutral":"지원자","fullName":"한민서","judgeRef":"민서 씨"}}
// b.d-2.S5.claimAtoms[0] (S5)
{"person":{"exact":"오준서","neutral":"공동대표","fullName":"오준서","judgeRef":"준서 씨"},"candidate":{"exact":"한민서","neutral":"지원자","fullName":"한민서","judgeRef":"민서 씨"}}
```

**보충 대상 (empty slots):**

- `b.d-2.S4.claimAtoms[0]`
  - factText: "제 영역이 무시됐다는 감정 때문에 의심을 확인 전에 퍼뜨렸다고 감정적으로 털어놓는다."
  - tags: ["emotion","fear","admission"]

### b(박혜린).d-3

**참고 — 이미 채워진 slots:**

```json
// b.d-3.S3.claimAtoms[0] (S3)
{"quote":{"exact":"'트라이얼로'","neutral":"그 표현"}}
// b.d-3.S5.claimAtoms[0] (S5)
{"quote":{"exact":"'이번 주부터 한번 같이 돌아보자'","neutral":"그 승인처럼 들린 말"},"invite":{"exact":"'Day 1 Orientation'","neutral":"첫 출근처럼 보이는 일정 문구"}}
```

**보충 대상 (empty slots):**

- `b.d-3.S4.claimAtoms[0]`
  - factText: "승인권이 지워진다는 공포 때문에 확인보다 배신이라는 이름을 먼저 붙였어요."
  - tags: ["fear","emotion","admission"]

### b(박혜린).d-4

**참고 — 이미 채워진 slots:**

```json
// b.d-4.S3.claimAtoms[0] (S3)
{"protocol":{"exact":"체험평가표, 급여 시트, 공동 final message","neutral":"합의된 3단계"},"person":{"exact":"오준서","neutral":"공동대표","fullName":"오준서","judgeRef":"준서 씨"}}
// b.d-4.S5.claimAtoms[0] (S5)
{"protocol":{"exact":"체험평가표, 급여 시트, 공동 final message","neutral":"합의된 3단계"}}
```

**보충 대상 (empty slots):**

- `b.d-4.S4.claimAtoms[0]`
  - factText: "배제감이 올라온 순간 저도 규칙을 자기 방식으로 뒤집었다고 감정적으로 인정해요."
  - tags: ["emotion","rule","admission"]

---

> 총 6개 empty-slots atoms
