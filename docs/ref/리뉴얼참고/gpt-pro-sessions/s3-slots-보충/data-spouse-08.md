# spouse-08 — S3+ slots 보충 데이터

## 1. 당사자

| | 이름 |
|---|---|
| partyA (a) | 한서진 |
| partyB (b) | 류현석 |

## 2. 쟁점 (disputes)

### d-1: 법무사 상담은 합의인가 독단인가
> 서진의 상담은 카페 합의 범위 안이었고 접수 번호도 사건 번호도 없다. 법무사 CRM 기록으로 확인된다. 판단 포인트는 '범위 안이었느냐'이지 '서류를 보냈느냐'가 아니다.

### d-2: 상담 폴더에 끼워 넣은 대출 정리서
> 계약서 47분 뒤 서진은 대출 정리서를 추가했다. 이미 덮은 과거를 상담 폴더에 끼워 넣었다. 상담 방어와 과거 무기화의 경계가 핵심.

### d-3: 카페 합의 번복과 외부 선제 통보
> 현석은 카페 합의에 참여했고 음성메모에 목소리가 남아 있다. 그런데 알림 12분 뒤 누나에게, 31분 뒤 임대인에게 '서진 독단'이라 설명했다. 합의를 알면서 없었던 것처럼 프레임을 짰다.

### d-4: 비공식 합의 쌍방 위반
> 서진은 합의에 없던 대출 문서를 폴더에 끼워 문서 범위를 넘겼다. 현석은 재논의 없이 누나와 임대인에게 알려 비공개 원칙을 깼다. 둘 다 합의를 위반했고 어느 쪽이 본질을 더 훼손했는지가 갈린다.

### d-5: 전세 위기 — 상담 탓인가 답변 지연 탓인가
> 갱신 확답 시한이 사흘 앞이었고 두 사람 모두 답변을 미루고 있었다. 현석의 임대인 선제 전화가 겹쳤다. 법무 상담 자체가 위기를 만든 게 아니라 시한+지연+선제 통화가 동시에 터진 것이다.

## 3. 진실표 (truthTable)

- **t-1**: 서진의 법무사 접촉은 갑작스러운 독단이 아니라 한 달 전 비공식 합의된 상담 범위 안에 있었다.
- **t-2**: 서진은 그 범위를 넘겨 현석의 2022년 대출정리서를 상담 폴더에 추가했다.
- **t-3**: 현석은 나중에 사전 합의를 부정하며 서진의 행동을 독단처럼 외부에 설명했다.
- **t-4**: 두 사람 모두 '상담까지만, 가족·임대인에는 아직 비공개'라는 비공식 합의의 범위를 다른 방식으로 깼다.
- **t-5**: 보증금 갱신 위기는 상담 그 자체보다 시한 압박과 현석의 선제 통화, 두 사람의 지연이 함께 만든 결과였다.

## 4. S3+ empty-slots atoms (보충 대상)

### a(한서진).d-1

**참고 — 이미 채워진 slots:**

```json
// a.d-1.S3.claimAtoms[1] (S3)
{"document":{"exact":"2022년 대출정리서","neutral":"그 문서"}}
// a.d-1.S5.claimAtoms[1] (S5)
{"time":{"exact":"한 달 전 카페 음성메모","neutral":"그때","dateExact":"한 달 전","period":"카페 합의 시점"}}
```

**보충 대상 (empty slots):**

- `a.d-1.S3.claimAtoms[0]`
  - factText: "겉보기와 달리 실제 제출·신고는 없었다는 반박"
  - tags: ["counter","act"]
- `a.d-1.S4.claimAtoms[0]`
  - factText: "업로드 직후 다시 설명하지 않은 책임을 서진도 느끼고 있다는 점"
  - tags: ["responsibility","admission"]
- `a.d-1.S4.claimAtoms[1]`
  - factText: "주거와 생활비를 한꺼번에 잃을까 두려워 상담과 실행을 과도하게 분리했다는 심리"
  - tags: ["fear","emotion"]
- `a.d-1.S5.claimAtoms[0]`
  - factText: "비밀 이혼 실행은 아니지만 오해를 키운 행동 방식에는 서진의 책임이 있다는 정리"
  - tags: ["admission","responsibility"]

### a(한서진).d-2

**참고 — 이미 채워진 slots:**

```json
// a.d-2.S3.claimAtoms[0] (S3)
{"document":{"exact":"2022년 대출정리서","neutral":"그 문서"}}
// a.d-2.S4.claimAtoms[0] (S4)
{"document":{"exact":"2022년 대출정리서","neutral":"그 문서"}}
// a.d-2.S5.claimAtoms[0] (S5)
{"document":{"exact":"2022년 대출정리서","neutral":"그 문서"}}
```

**보충 대상 (empty slots):**

- `a.d-2.S3.claimAtoms[1]`
  - factText: "과거 은폐가 없었다면 첨부까지는 가지 않았을 것이라는 책임 전가"
  - tags: ["counter","responsibility"]
- `a.d-2.S4.claimAtoms[1]`
  - factText: "말만으로는 안전을 지킬 수 없다는 공포가 문서 의존을 키웠다는 점"
  - tags: ["fear","context"]
- `a.d-2.S5.claimAtoms[1]`
  - factText: "필요성보다 먼저 범위 동의와 절차 확인이 있었어야 한다는 정리"
  - tags: ["rule","context"]

### a(한서진).d-3

**참고 — 이미 채워진 slots:**

```json
// a.d-3.S3.claimAtoms[0] (S3)
{"family":{"exact":"류미경","neutral":"가족","fullName":"류미경","judgeRef":"누나"},"person":{"exact":"임대인","neutral":"집주인","judgeRef":"임대인"}}
```

**보충 대상 (empty slots):**

- `a.d-3.S3.claimAtoms[1]`
  - factText: "합의 부정이 체면 방어를 위한 재서술이라는 서진의 판단"
  - tags: ["counter","self_justification"]
- `a.d-3.S4.claimAtoms[0]`
  - factText: "합의 부정이 서진에게 독단 프레임과 배신감으로 남았다는 점"
  - tags: ["harm","emotion"]
- `a.d-3.S4.claimAtoms[1]`
  - factText: "둘 사이의 말이 지워졌다고 느낀 감정"
  - tags: ["emotion","relationship"]
- `a.d-3.S5.claimAtoms[0]`
  - factText: "합의 관리의 느슨함은 양측 책임이지만 외부에 독단 프레임을 만든 책임은 현석에게 크다는 정리"
  - tags: ["admission","responsibility"]
- `a.d-3.S5.claimAtoms[1]`
  - factText: "서진도 자기 몫과 상대 몫을 나눠 말하려는 태도"
  - tags: ["context","relationship"]

### a(한서진).d-4

**참고 — 이미 채워진 slots:**

```json
// a.d-4.S3.claimAtoms[0] (S3)
{"family":{"exact":"류미경","neutral":"가족","fullName":"류미경","judgeRef":"누나"},"person":{"exact":"임대인","neutral":"집주인","judgeRef":"임대인"}}
```

**보충 대상 (empty slots):**

- `a.d-4.S3.claimAtoms[1]`
  - factText: "서진은 문서를, 현석은 사람을 넓혔다는 책임 비교"
  - tags: ["counter","relationship"]
- `a.d-4.S4.claimAtoms[0]`
  - factText: "둘 다 불안을 처리하는 방식으로 약속 범위를 깼다는 인식"
  - tags: ["relationship","emotion"]
- `a.d-4.S4.claimAtoms[1]`
  - factText: "문서와 사람으로 각자 불안을 처리했다는 심리 해석"
  - tags: ["fear","context"]
- `a.d-4.S5.claimAtoms[0]`
  - factText: "문서 범위 초과와 제3자 공개가 모두 비공식 합의 위반이었다는 정리"
  - tags: ["admission","responsibility"]
- `a.d-4.S5.claimAtoms[1]`
  - factText: "양측 위반을 동시에 인정해야 이후 규칙 재설계가 가능하다는 태도"
  - tags: ["relationship","rule"]

### a(한서진).d-5

**참고 — 이미 채워진 slots:**

```json
// a.d-5.S3.claimAtoms[0] (S3)
{"person":{"exact":"임대인","neutral":"집주인","judgeRef":"임대인"}}
// a.d-5.S5.claimAtoms[0] (S5)
{"time":{"exact":"상담 직후 사흘 내 확답 시한","neutral":"그 시한","period":"갱신 답변 시한 직전"},"person":{"exact":"임대인","neutral":"집주인","judgeRef":"임대인"}}
```

**보충 대상 (empty slots):**

- `a.d-5.S3.claimAtoms[1]`
  - factText: "자기 지연과 별개로 상대의 외부 움직임이 결정적이었다는 비교"
  - tags: ["counter","context"]
- `a.d-5.S4.claimAtoms[0]`
  - factText: "주거 불안 때문에 직접 결정 대신 시나리오 정리에 머문 심리"
  - tags: ["fear","emotion"]
- `a.d-5.S4.claimAtoms[1]`
  - factText: "자신의 지연이 상황을 길게 만든 몫이 있다는 인정"
  - tags: ["admission","responsibility"]
- `a.d-5.S5.claimAtoms[1]`
  - factText: "주거결정과 관계논쟁을 분리했어야 했다는 교훈"
  - tags: ["rule","context"]

### b(류현석).d-1

**참고 — 이미 채워진 slots:**

```json
// b.d-1.S3.claimAtoms[0] (S3)
{"alert":{"exact":"정유나 상담폴더 업로드 완료 알림","neutral":"그 알림"}}
// b.d-1.S5.claimAtoms[1] (S5)
{"quote":{"exact":"상담까지만, 실제 제출 전엔 다시 얘기","neutral":"그 합의 문구"}}
```

**보충 대상 (empty slots):**

- `b.d-1.S3.claimAtoms[1]`
  - factText: "외부 설명도 그 충격의 프레임을 따라갔다는 자기 정당화"
  - tags: ["self_justification","responsibility"]
- `b.d-1.S4.claimAtoms[0]`
  - factText: "상담과 실행을 구분할 여유가 없을 만큼 끝난 사람처럼 느꼈다는 감정"
  - tags: ["emotion","fear"]
- `b.d-1.S4.claimAtoms[1]`
  - factText: "가족 체면과 버려짐 공포가 판단을 흐렸다는 숨은 수치심"
  - tags: ["shame","fear"]
- `b.d-1.S5.claimAtoms[0]`
  - factText: "실제 접수는 없었는데도 비밀 이혼 준비처럼 과장해 말한 책임 인정"
  - tags: ["admission","responsibility"]

### b(류현석).d-2

**참고 — 이미 채워진 slots:**

```json
// b.d-2.S3.claimAtoms[0] (S3)
{"document":{"exact":"2022년 대출정리서","neutral":"그 문서"}}
// b.d-2.S4.claimAtoms[0] (S4)
{"document":{"exact":"2022년 대출정리서","neutral":"그 문서"}}
// b.d-2.S5.claimAtoms[0] (S5)
{"document":{"exact":"2022년 대출정리서","neutral":"그 문서"}}
// b.d-2.S5.claimAtoms[1] (S5)
{"document":{"exact":"2022년 대출정리서","neutral":"그 문서"}}
```

**보충 대상 (empty slots):**

- `b.d-2.S3.claimAtoms[1]`
  - factText: "불안 이해와 별개로 방식이 처벌처럼 느껴졌다는 반발"
  - tags: ["counter","shame"]
- `b.d-2.S4.claimAtoms[1]`
  - factText: "수치심 때문에 더 공격적으로 반응했다는 배경"
  - tags: ["emotion","context"]

### b(류현석).d-3

**참고 — 이미 채워진 slots:**

```json
// b.d-3.S3.claimAtoms[0] (S3)
{"family":{"exact":"류미경","neutral":"가족","fullName":"류미경","judgeRef":"누나"},"person":{"exact":"임대인","neutral":"집주인","judgeRef":"임대인"}}
```

**보충 대상 (empty slots):**

- `b.d-3.S3.claimAtoms[1]`
  - factText: "과민한 사람처럼 보일까 봐 합의 문구를 뺐다는 체면 방어"
  - tags: ["shame","self_justification"]
- `b.d-3.S4.claimAtoms[0]`
  - factText: "버려지는 사람처럼 느껴져 합의 효력을 스스로 지워버렸다는 고백"
  - tags: ["fear","emotion"]
- `b.d-3.S4.claimAtoms[1]`
  - factText: "배제 공포가 강할수록 약속의 의미를 줄이는 말버릇"
  - tags: ["identity","context"]
- `b.d-3.S5.claimAtoms[0]`
  - factText: "합의를 알고도 외부에는 독단 프레임으로 설명한 책임 인정"
  - tags: ["admission","responsibility"]
- `b.d-3.S5.claimAtoms[1]`
  - factText: "그 왜곡이 다른 쟁점들의 확대에도 영향을 줬다는 인식"
  - tags: ["context","relationship"]

### b(류현석).d-4

**참고 — 이미 채워진 slots:**

```json
// b.d-4.S3.claimAtoms[0] (S3)
{"document":{"exact":"2022년 대출정리서","neutral":"그 문서"}}
// b.d-4.S5.claimAtoms[0] (S5)
{"family":{"exact":"류미경","neutral":"가족","fullName":"류미경","judgeRef":"누나"},"person":{"exact":"임대인","neutral":"집주인","judgeRef":"임대인"}}
```

**보충 대상 (empty slots):**

- `b.d-4.S3.claimAtoms[1]`
  - factText: "빠져나갈 길이 없다고 느껴 제3자를 불렀다는 공포"
  - tags: ["fear","self_justification"]
- `b.d-4.S4.claimAtoms[0]`
  - factText: "당사자 대화에서 밀려날까 두려워 사람을 넓혔다는 고백"
  - tags: ["fear","emotion"]
- `b.d-4.S4.claimAtoms[1]`
  - factText: "정보 확인보다 제 편을 확보하려는 동기가 있었다는 인정"
  - tags: ["motive","context"]
- `b.d-4.S5.claimAtoms[1]`
  - factText: "비공식 합의의 제3자 비공개 원칙을 자신도 깼다는 정리"
  - tags: ["rule","context"]

### b(류현석).d-5

**참고 — 이미 채워진 slots:**

```json
// b.d-5.S3.claimAtoms[0] (S3)
{"person":{"exact":"임대인","neutral":"집주인","judgeRef":"임대인"},"alert":{"exact":"정유나 상담폴더 업로드 완료 알림","neutral":"그 알림"}}
// b.d-5.S4.claimAtoms[1] (S4)
{"person":{"exact":"임대인","neutral":"집주인","judgeRef":"임대인"}}
// b.d-5.S5.claimAtoms[0] (S5)
{"person":{"exact":"임대인","neutral":"집주인","judgeRef":"임대인"},"time":{"exact":"상담 직후 사흘 내 확답 시한","neutral":"그 시한","period":"갱신 답변 시한 직전"}}
```

**보충 대상 (empty slots):**

- `b.d-5.S3.claimAtoms[1]`
  - factText: "가만히 있을 수 없었던 배경이 상실 공포였다는 점"
  - tags: ["fear","emotion"]
- `b.d-5.S4.claimAtoms[0]`
  - factText: "집과 관계를 동시에 잃을까 두려워 외부 확인을 택했다는 고백"
  - tags: ["fear","emotion"]
- `b.d-5.S5.claimAtoms[1]`
  - factText: "상담 하나로 몰아간 말이 자신의 부끄러움을 가리려는 것이었다는 고백"
  - tags: ["shame","responsibility"]

---

> 총 39개 empty-slots atoms
