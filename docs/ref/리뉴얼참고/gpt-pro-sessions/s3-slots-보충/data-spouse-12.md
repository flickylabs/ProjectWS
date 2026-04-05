# spouse-12 — S3+ slots 보충 데이터

## 1. 당사자

| | 이름 |
|---|---|
| partyA (a) | 문세아 |
| partyB (b) | 최재우 |

## 2. 쟁점 (disputes)

### d-1: 재우의 확인 없는 선제 전파
> 재우는 세아 확인 9분 전에 세 채널로 캡처를 돌리며 아마 세아가 맞다고 반복했다. 위조 가능성 검토 없이 2023년 확인 전 전달 금지 합의를 정면으로 어겼다.

### d-2: 세아의 백업 선별 은닉
> 세아는 백업 복원 후 한유진에게 보낸 모진 메시지 1건을 별도 폴더로 옮기고 재우 공유 파일에서 뺐다. 원문 조작은 아니지만 노출 범위를 조정한 것은 사실상 증거 은닉.

### d-3: 익명 계정 — 한유진인가 박하린인가
> 세아와 재우 모두 한유진을 의심했지만, 계정 복구 메일은 박하린 예비 주소, 게시 시각 직전 와이파이에는 박하린 기기가 접속. 동기와 실행자가 다를 수 있다.

### d-4: 결정적 증거는 2026년 위조본
> 방명록 배경은 2008년 스킨, 문자 말풍선은 2024년 복원앱 템플릿. 시간대와 출처가 다른 두 소스를 2026년에 합성한 위조본. 세아를 소문 유포자로 단정할 근거가 없다.

### d-5: 세아의 2006년 실제 행위 범위
> 세아가 한유진에게 모진 메시지를 보낸 것은 사실이다. 그러나 생활지도실 메모에 익명 소문 발신자 미특정으로 기록. 모진 메시지와 소문 유포는 별개의 층위.

## 3. 진실표 (truthTable)

- **t-1**: 재우는 세아와 확인하기 전에 익명 게시물 캡처를 외부로 돌리며 세아를 사실상 가해자로 단정했다.
- **t-2**: 세아는 옛 백업 자료 중 자신에게 불리한 모진 메시지 한 개를 먼저 숨겼다.
- **t-3**: 익명 계정 운영자는 한유진이 아니라 박하린 쪽이었다.
- **t-4**: 결정적 증거처럼 보인 2006년 방명록과 문자 이미지는 2026년에 합성된 위조본이었다.
- **t-5**: 세아는 과거에 한유진에게 상처를 줬지만 익명 소문의 원작성자는 아니었다.

## 4. S3+ empty-slots atoms (보충 대상)

### a(문세아).d-1

**참고 — 이미 채워진 slots:**

```json
// a.d-1.S3.claimAtoms[0] (S3)
{"channel":{"exact":"동창회 운영진 단톡","neutral":"그 채널"}}
// a.d-1.S3.claimAtoms[1] (S3)
{"channel1":{"exact":"가족 단톡","neutral":"가족 채널"},"channel2":{"exact":"가까운 직장 인맥","neutral":"직장 쪽"}}
// a.d-1.S4.claimAtoms[1] (S4)
{"year":{"exact":"2006년","neutral":"그때","dateExact":"2006년","period":"학창시절"}}
// a.d-1.S5.claimAtoms[0] (S5)
{"person":{"exact":"최재우","neutral":"상대방","fullName":"최재우","judgeRef":"최재우 씨"}}
// a.d-1.S5.claimAtoms[1] (S5)
{"person":{"exact":"최재우","neutral":"상대방","fullName":"최재우","judgeRef":"최재우 씨"}}
```

**보충 대상 (empty slots):**

- `a.d-1.S4.claimAtoms[0]`
  - factText: "배우자에게 처리 대상으로 느껴졌다는 정서"
  - tags: ["emotion","relationship","harm"]

### a(문세아).d-2

**참고 — 이미 채워진 slots:**

```json
// a.d-2.S3.claimAtoms[1] (S3)
{"person":{"exact":"최재우","neutral":"상대방","fullName":"최재우","judgeRef":"최재우 씨"}}
// a.d-2.S4.claimAtoms[0] (S4)
{"message":{"exact":"한유진에게 보낸 모진 메시지 1건","neutral":"그 메시지"}}
// a.d-2.S4.claimAtoms[1] (S4)
{"year":{"exact":"2006년","neutral":"그때","dateExact":"2006년","period":"학창시절"}}
// a.d-2.S5.claimAtoms[0] (S5)
{"message":{"exact":"한유진에게 보낸 모진 메시지 1건","neutral":"그 메시지"}}
// a.d-2.S5.claimAtoms[1] (S5)
{"account":{"exact":"익명 SNS 계정","neutral":"그 계정"}}
```

**보충 대상 (empty slots):**

- `a.d-2.S3.claimAtoms[0]`
  - factText: "문세아는 선택 삭제를 '노출 순서 조정'으로 축소해 말한다"
  - tags: ["self_justification","counter"]

### a(문세아).d-3

**참고 — 이미 채워진 slots:**

```json
// a.d-3.S3.claimAtoms[1] (S3)
{"person":{"exact":"박하린","neutral":"그 사람","fullName":"박하린","judgeRef":"박하린 씨"},"wifi":{"exact":"동창회장 와이파이 접속기록","neutral":"행사장 접속 기록"}}
// a.d-3.S4.claimAtoms[0] (S4)
{"person":{"exact":"한유진","neutral":"그 사람","fullName":"한유진","judgeRef":"한유진 씨"}}
// a.d-3.S5.claimAtoms[0] (S5)
{"person":{"exact":"박하린","neutral":"그 사람","fullName":"박하린","judgeRef":"박하린 씨"},"wifi":{"exact":"동창회장 와이파이 접속기록","neutral":"행사장 접속 기록"},"mail":{"exact":"버너계정 복구 메일","neutral":"계정 복구 기록"}}
// a.d-3.S5.claimAtoms[1] (S5)
{"person1":{"exact":"한유진","neutral":"그 사람","fullName":"한유진","judgeRef":"한유진 씨"},"person2":{"exact":"박하린","neutral":"그 사람","fullName":"박하린","judgeRef":"박하린 씨"}}
```

**보충 대상 (empty slots):**

- `a.d-3.S3.claimAtoms[0]`
  - factText: "문세아는 자신을 지키려다 다른 사람을 빨리 후보로 세웠다고 돌아본다"
  - tags: ["self_justification","responsibility"]
- `a.d-3.S4.claimAtoms[1]`
  - factText: "문세아는 억울함과 별개로 이 추측 자체는 사과할 일이라고 본다"
  - tags: ["admission","responsibility"]

### a(문세아).d-4

**참고 — 이미 채워진 slots:**

```json
// a.d-4.S3.claimAtoms[0] (S3)
{"year1":{"exact":"2006년","neutral":"그때","dateExact":"2006년","period":"학창시절"},"year2":{"exact":"2026년","neutral":"이번","dateExact":"2026년","period":"동창회 직후"}}
// a.d-4.S3.claimAtoms[1] (S3)
{"person":{"exact":"문세아","neutral":"상대방","fullName":"문세아","judgeRef":"문세아 씨"}}
// a.d-4.S4.claimAtoms[0] (S4)
{"year":{"exact":"2006년","neutral":"그때","dateExact":"2006년","period":"학창시절"},"reputation":{"exact":"가게 평판","neutral":"지금의 평판"}}
// a.d-4.S5.claimAtoms[0] (S5)
{"year":{"exact":"2006년","neutral":"그때","dateExact":"2006년","period":"학창시절"}}
// a.d-4.S5.claimAtoms[1] (S5)
{"forensic":{"exact":"플랫폼 포렌식 보고서","neutral":"포렌식 자료"},"year":{"exact":"2026년","neutral":"이번","dateExact":"2026년","period":"동창회 직후"}}
```

**보충 대상 (empty slots):**

- `a.d-4.S4.claimAtoms[1]`
  - factText: "과거 장면 일부가 현재 허위 유포의 재료가 된 구조"
  - tags: ["legacy_sentence","context","harm"]

### a(문세아).d-5

**참고 — 이미 채워진 slots:**

```json
// a.d-5.S3.claimAtoms[0] (S3)
{"year":{"exact":"2006년","neutral":"그때","dateExact":"2006년","period":"학창시절"}}
// a.d-5.S4.claimAtoms[0] (S4)
{"message":{"exact":"한유진에게 보낸 모진 메시지 1건","neutral":"그 메시지"},"year":{"exact":"2006년","neutral":"그때","dateExact":"2006년","period":"학창시절"}}
// a.d-5.S5.claimAtoms[0] (S5)
{"person":{"exact":"한유진","neutral":"그 사람","fullName":"한유진","judgeRef":"한유진 씨"}}
// a.d-5.S5.claimAtoms[1] (S5)
{"account":{"exact":"장학금 특혜 소문 작성자","neutral":"그 작성자"}}
```

**보충 대상 (empty slots):**

- `a.d-5.S3.claimAtoms[1]`
  - factText: "공개 충돌과 익명 유포는 행동 양식이 다르다는 선 긋기"
  - tags: ["counter","identity","rule"]
- `a.d-5.S4.claimAtoms[1]`
  - factText: "'전부 누명'이라는 표현이 거짓이었다는 자기 정정"
  - tags: ["responsibility","admission","counter"]

### b(최재우).d-1

**참고 — 이미 채워진 slots:**

```json
// b.d-1.S3.claimAtoms[0] (S3)
{"channel1":{"exact":"가족 단톡","neutral":"가족 채널"},"channel2":{"exact":"가까운 직장 인맥","neutral":"직장 쪽"}}
// b.d-1.S3.claimAtoms[1] (S3)
{"person":{"exact":"문세아","neutral":"상대방","fullName":"문세아","judgeRef":"문세아 씨"}}
// b.d-1.S4.claimAtoms[0] (S4)
{"person":{"exact":"문세아","neutral":"상대방","fullName":"문세아","judgeRef":"문세아 씨"}}
// b.d-1.S5.claimAtoms[0] (S5)
{"person":{"exact":"문세아","neutral":"상대방","fullName":"문세아","judgeRef":"문세아 씨"},"time":{"exact":"세아에게 확인 문자 보내기 9분 전","neutral":"확인 전","period":"확인 직전"}}
// b.d-1.S5.claimAtoms[1] (S5)
{"channel1":{"exact":"동창회 운영진 단톡","neutral":"그 채널"},"channel2":{"exact":"가족 단톡","neutral":"가족 채널"},"channel3":{"exact":"가까운 직장 인맥","neutral":"직장 쪽"}}
```

**보충 대상 (empty slots):**

- `b.d-1.S4.claimAtoms[1]`
  - factText: "부부 사이 확인 후 공유 원칙을 스스로 깼다는 인식"
  - tags: ["rule","responsibility","relationship"]

### b(최재우).d-2

**참고 — 이미 채워진 slots:**

```json
// b.d-2.S4.claimAtoms[0] (S4)
{"message":{"exact":"한유진에게 보낸 모진 메시지 1건","neutral":"그 메시지"}}
// b.d-2.S5.claimAtoms[0] (S5)
{"message":{"exact":"한유진에게 보낸 모진 메시지 1건","neutral":"그 메시지"}}
// b.d-2.S5.claimAtoms[1] (S5)
{"account":{"exact":"익명 SNS 계정","neutral":"그 계정"}}
```

**보충 대상 (empty slots):**

- `b.d-2.S3.claimAtoms[0]`
  - factText: "최재우는 누락을 본 뒤 '더 숨기는 게 있다'는 방향으로 달려갔다고 돌아본다"
  - tags: ["quote","motive","threshold"]
- `b.d-2.S3.claimAtoms[1]`
  - factText: "선택 삭제를 빌미로 자신의 추정을 사실처럼 밀어붙인 책임"
  - tags: ["responsibility","admission"]
- `b.d-2.S4.claimAtoms[1]`
  - factText: "문세아의 잘못과 자신의 과잉 대응은 별개로 판단해야 한다는 인식"
  - tags: ["counter","rule","responsibility"]

### b(최재우).d-4

**참고 — 이미 채워진 slots:**

```json
// b.d-4.S3.claimAtoms[0] (S3)
{"forensic":{"exact":"플랫폼 포렌식 보고서","neutral":"포렌식 자료"}}
// b.d-4.S4.claimAtoms[0] (S4)
{"role":{"exact":"구청 홍보팀 주무관","neutral":"공적 자리"}}
// b.d-4.S4.claimAtoms[1] (S4)
{"person":{"exact":"문세아","neutral":"상대방","fullName":"문세아","judgeRef":"문세아 씨"}}
// b.d-4.S5.claimAtoms[0] (S5)
{"forensic":{"exact":"플랫폼 포렌식 보고서","neutral":"포렌식 자료"},"year":{"exact":"2026년","neutral":"이번","dateExact":"2026년","period":"동창회 직후"}}
// b.d-4.S5.claimAtoms[1] (S5)
{"person":{"exact":"문세아","neutral":"상대방","fullName":"문세아","judgeRef":"문세아 씨"}}
```

**보충 대상 (empty slots):**

- `b.d-4.S3.claimAtoms[1]`
  - factText: "정정하면 자신의 성급함이 드러날까 망설였다는 두려움"
  - tags: ["fear","shame","motive"]

### b(최재우).d-5

**참고 — 이미 채워진 slots:**

```json
// b.d-5.S3.claimAtoms[0] (S3)
{"person":{"exact":"문세아","neutral":"상대방","fullName":"문세아","judgeRef":"문세아 씨"}}
// b.d-5.S4.claimAtoms[0] (S4)
{"person":{"exact":"문세아","neutral":"상대방","fullName":"문세아","judgeRef":"문세아 씨"}}
// b.d-5.S4.claimAtoms[1] (S4)
{"role":{"exact":"구청 홍보팀 주무관","neutral":"공적 자리"}}
// b.d-5.S5.claimAtoms[0] (S5)
{"person1":{"exact":"문세아","neutral":"상대방","fullName":"문세아","judgeRef":"문세아 씨"},"person2":{"exact":"한유진","neutral":"그 사람","fullName":"한유진","judgeRef":"한유진 씨"}}
// b.d-5.S5.claimAtoms[1] (S5)
{"account":{"exact":"익명 소문 작성자 낙인","neutral":"그 낙인"}}
```

**보충 대상 (empty slots):**

- `b.d-5.S3.claimAtoms[1]`
  - factText: "과거 직접 상처와 현재 허위 유포를 섞을수록 자신의 책임이 커진다는 인식"
  - tags: ["counter","rule","responsibility"]

---

> 총 13개 empty-slots atoms
