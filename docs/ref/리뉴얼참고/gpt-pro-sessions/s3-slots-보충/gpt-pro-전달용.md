# v2-atoms S3+ slots 보충 작업

## 역할
너는 솔로몬 법정 게임의 v2-atoms 데이터 보충 전문가다.
아래 6건의 사건에서 S3/S4/S5 state의 claimAtoms slots가 불완전하다(empty `{}`).
각 사건의 anchorTruth(진실)과 기존 채워진 slots 패턴을 참고하여, empty slots에 구체적 값을 채워줘.

---

## Truth Throttle 규칙

| State | 금액 | 인물 | 기관 | 시각 |
|-------|------|------|------|------|
| S3 | `rounded`("280만원") | `fullName`(실명), `judgeRef`("OO 씨") | 약칭 허용 | `dateExact`, `period` 허용 |
| S4 | 전체 허용 | 전체 허용 | 전체 허용 | 전체 허용 |
| S5 | 전체 허용 — `rounded` 우선, `exact`("2,800,000원") 미사용 | 전체 허용 | 전체 허용 | 전체 허용 |

### slot 키 종류 (참고)
```
amount:  { exact, rounded, neutral }
person:  { exact, fullName, judgeRef, neutral, role? }
time:    { exact, dateExact, period, neutral }
document/file/channel/quote 등: { exact, neutral }
institution: { exact, fullName, neutral, judgeRef? }
```

---

## 판단 규칙

1. **empty slots(`{}`)인 atom만 대상** — 이미 값이 있는 atom은 절대 건드리지 마
2. factText를 읽고, 해당 atom이 참조하는 사실(인물/금액/시각/문서/장소 등)을 anchorTruth에서 찾아 slot에 채워
3. factText가 감정/관계/공포/자기반성 중심이라 구체적 사실 참조가 없는 atom은 **slots를 `{}` 그대로 유지**하고 `"skip": true` 표시
4. neutral 값은 항상 포함 — "그 사람", "해당 금액", "그때" 등 모호한 표현
5. S3에서는 fullName + judgeRef까지, S4/S5에서는 role/dateExact/rounded 등 최대한 구체적으로
6. **기존 채워진 같은 dispute의 다른 atom slots를 참고**하여 일관된 명칭 사용

---

## 출력 형식

사건별로 아래 JSON 배열을 출력해줘:

```json
{
  "caseId": "spouse-08",
  "fixes": [
    {
      "path": "a.d-1.S3.claimAtoms[0].slots",
      "factText": "겉보기와 달리 실제 제출·신고는 없었다는 반박",
      "action": "fill",
      "newSlots": {
        "procedure": {
          "exact": "법무사 CRM 접수 번호",
          "neutral": "그 절차"
        }
      }
    },
    {
      "path": "a.d-1.S4.claimAtoms[0].slots",
      "factText": "업로드 직후 다시 설명하지 않은 책임을...",
      "action": "skip",
      "reason": "감정/반성 중심, 구체적 사실 참조 없음"
    }
  ]
}
```

- `action: "fill"` — slots에 값을 채움
- `action: "skip"` — 구체적 사실 참조 없어서 empty 유지

---

## 대상 사건 6건

아래에 6건의 데이터가 순서대로 이어져 있다. 각 파일에 다음이 포함됨:
1. duo 이름 (partyA/B)
2. disputes 목록 (id, name, truthDescription)
3. truthTable (진실 5개)
4. S3+ empty-slots atom 목록 (path + factText + tags)
5. 같은 dispute의 이미 채워진 slots (참고용)

### 사건 목록
1. `spouse-08` — 한서진 vs 류현석 (39개 empty atoms)
2. `spouse-12` — 문세아 vs 최재우 (13개 empty atoms)
3. `family-08` — 이세라 vs 이준호 (42개 empty atoms)
4. `neighbor-08` — 황민석 vs 주하린 (1개 empty atom)
5. `partnership-07` — 문태경 vs 서유나 (7개 empty atoms)
6. `partnership-10` — 오준서 vs 박혜린 (6개 empty atoms)

총 108개 empty atoms 중, 감정/반성 중심은 skip하고 사실 참조가 있는 것만 fill.

---

## 작업 순서

1. 아래 6건 데이터를 모두 읽어
2. 각 사건마다 위 JSON 형식으로 응답해줘
3. 6건 모두 끝나면 통계 요약(fill 몇 개 / skip 몇 개)도 해줘

---
---

# [1/6] spouse-08 — S3+ slots 보충 데이터

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

> 총 39개 empty-slots atoms

---

# [2/6] spouse-12 — S3+ slots 보충 데이터

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

> 총 13개 empty-slots atoms

---

# [3/6] family-08 — S3+ slots 보충 데이터

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

> 총 42개 empty-slots atoms

---

# [4/6] neighbor-08 — S3+ slots 보충 데이터

## 1. 당사자

| | 이름 |
|---|---|
| partyA (a) | 황민석 |
| partyB (b) | 주하린 |

## 2. 쟁점 (disputes)

### d-1: 민석의 미통보 설치와 초반 촬영각 초과
> 민석은 관리실 사전 통보 없이 카메라를 설치했고, 초기 이틀간 하린의 도어매트와 문틀 일부가 저장 영상에 포함되도록 각도를 넓게 두었다.

### d-2: 하린의 공개 낙인과 위조 클립 유포
> 하린은 관리실 판단 전 주민방에 위조 영상을 돌리며 '현관 앞을 노리는 사람'이라고 표현해 민석의 평판을 공개 훼손했다.

### d-3: 27초 클립은 원본 영상인가
> 27초 클립은 프리뷰 6초 + 다른 시점 복도 영상을 합친 뒤 디지털 줌·좌우 반전·가짜 타임스탬프를 덧씌운 위조본이었다.

### d-4: 카메라가 하린 집 내부를 추적했는가
> 해당 기기는 팬·틸트 없는 고정렌즈 모델이다. 원본 저장 영상에도 하린 집 내부 추적은 없고 복도와 도어매트 일부만 담겨 있었다.

### d-5: 관리실 확인 우선 원칙의 쌍방 파기
> 전단지 분실 뒤 '관리실을 먼저 거치자'고 합의했지만, 하린은 공개 낙인 글부터 올렸고 민석은 방어한다며 하린의 귀가 시간표를 주민방에 올렸다.

## 3. 진실표 (truthTable)

- **t-1**: 민석은 사전 통보 없이 카메라를 달았고 초기 이틀간 맞은편 도어매트와 문틀 일부가 저장 영상에 잡혔다.
- **t-2**: 하린은 주민방에 편집 영상을 돌리며 민석을 현관을 노리는 사람처럼 공개적으로 표현했다.
- **t-3**: 27초 클립은 원본이 아니라 설치 프리뷰와 다른 복도 영상을 합친 위조본이었다.
- **t-4**: 민석의 기기는 고정렌즈 모델이어서 원격으로 하린 집 안쪽을 추적 촬영할 수 없었다.
- **t-5**: 두 사람 모두 관리사무소 확인보다 공개 게시와 역공 게시를 먼저 선택해 사생활 분쟁 절차를 무너뜨렸다.

## 4. S3+ empty-slots atoms (보충 대상)

### b(주하린).d-1

**참고 — 이미 채워진 slots:**

```json
// b.d-1.S3.claimAtoms[0] (S3)
{"range":{"exact":"맞은편 도어매트와 문틀 일부","neutral":"문틀 바깥 범위"}}
// b.d-1.S5.claimAtoms[0] (S5)
{"institution":{"exact":"관리사무소","neutral":"관리실","judgeRef":"관리실"},"time":{"exact":"설치 직후 이틀","dateExact":"설치 직후 이틀","period":"초기 이틀","neutral":"그 초반 기간"},"range":{"exact":"맞은편 도어매트와 문틀 일부","neutral":"문틀 바깥 범위"}}
```

**보충 대상 (empty slots):**

- `b.d-1.S4.claimAtoms[0]`
  - factText: "작년 밤늦은 방문객 소문까지 겹쳐서, 나는 '문 앞 카메라'라는 말만 들어도 먼저 몸이 굳는다."
  - tags: ["fear","legacy_sentence","emotion"]

> 총 1개 empty-slots atoms

---

# [5/6] partnership-07 — S3+ slots 보충 데이터

## 1. 당사자

| | 이름 |
|---|---|
| partyA (a) | 문태경 |
| partyB (b) | 서유나 |

## 2. 쟁점 (disputes)

### d-1: 유나의 업계 내 누설자 낙인
> 유나는 바이어와 협회 사무국 쪽에 태경이 경쟁사로 자료를 흘린 것 같다고 반복적으로 말해, 실제 확인 전부터 태경을 사실상 누설자로 낙인찍었다.

### d-2: 태경의 비식별 없는 전체 덱 외부 전달
> 태경은 유나에게 다시 묻지 않고 행사 운영사의 프로젝터 점검 요청에 전체 도매단가와 팝업 일정이 포함된 덱을 첨부로 보냈다.

### d-3: 동업자 중 누군가 경쟁사에 고의로 정보를 흘렸는가
> 두 사람 모두 내부 고의 유출을 의심했지만, 실제 경쟁사 유입 경로는 박수민 AE의 후속메일 오발송이었고 동업자 어느 쪽도 경쟁사에 직접 자료를 넘기지 않았다.

### d-4: 행사 자료 통제 원칙의 쌍방 위반
> 태경은 전체 덱을 첨부로 보냈고, 유나는 추적 링크가 걸린 축약본 대신 최신 단가가 포함된 전체 파일을 QR 후속자료 폴더에 올려 기존 행사 보안 원칙을 둘 다 어겼다.

### d-5: 실제 유출 경로는 운영사의 단순 오발송
> 운영사 AE는 스피커용 백업 폴더를 참석자 follow-up 메일에 잘못 붙였고, 그 결과 경쟁사 바이어도 동일한 파일을 받았다.

## 3. 진실표 (truthTable)

- **t-1**: 유나는 실제 확인 전부터 태경을 업계에 누설자로 특정하는 말을 반복했다.
- **t-2**: 태경은 유나에게 다시 승인받지 않고 전체 덱을 외부 운영사에 첨부로 보냈다.
- **t-3**: 동업자 중 누군가 경쟁사에 고의로 자료를 흘렸다는 믿음은 거짓이며, 실제 경로는 운영사 AE의 오발송이었다.
- **t-4**: 두 사람 모두 외부 행사 자료는 비식별 축약본과 추적 링크만 쓰기로 한 원칙을 어겼다.
- **t-5**: 실제 유출처럼 보였던 정보 이동은 제3자의 가벼운 첨부 실수에서 시작됐다.

## 4. S3+ empty-slots atoms (보충 대상)

### a(문태경).d-2

**참고 — 이미 채워진 slots:**

```json
// a.d-2.S3.claimAtoms[0] (S3)
{"file":{"exact":"final_all_v3","neutral":"그 첨부파일"},"person":{"exact":"서유나","neutral":"그 사람","fullName":"서유나","judgeRef":"서 대표"}}
// a.d-2.S5.claimAtoms[0] (S5)
{"file":{"exact":"전체 도매단가·팝업 일정 덱","neutral":"전체 자료","judgeRef":"전체 덱"},"institution":{"exact":"박수민 AE","neutral":"운영사 쪽","fullName":"박수민","judgeRef":"운영사 AE"}}
```

**보충 대상 (empty slots):**

- `a.d-2.S4.claimAtoms[0]`
  - factText: "의도와 절차를 분리해 버텼지만 결국 통제 실패를 인정하는 진술"
  - tags: ["self_justification","admission","rule"]

### a(문태경).d-4

**참고 — 이미 채워진 slots:**

```json
// a.d-4.S3.claimAtoms[0] (S3)
{"file":{"exact":"전체 도매단가·팝업 일정 덱","neutral":"전체 자료","judgeRef":"전체 덱"},"folder":{"exact":"QR 후속자료 폴더","neutral":"QR 폴더"}}
// a.d-4.S5.claimAtoms[0] (S5)
{"rule":{"exact":"비식별 축약본과 추적 링크만 사용","neutral":"기존 보안 원칙"},"person":{"exact":"서유나","neutral":"그 사람","fullName":"서유나","judgeRef":"서 대표"}}
```

**보충 대상 (empty slots):**

- `a.d-4.S4.claimAtoms[0]`
  - factText: "일정 압박을 이유로 예외를 합리화한 자신의 태도에 대한 고백"
  - tags: ["shame","motive","self_justification"]

### b(서유나).d-1

**참고 — 이미 채워진 slots:**

```json
// b.d-1.S3.claimAtoms[0] (S3)
{"network":{"exact":"전 직장 인맥","neutral":"예전 인맥"},"person":{"exact":"문태경","neutral":"그 사람","fullName":"문태경","judgeRef":"문 대표"}}
// b.d-1.S5.claimAtoms[0] (S5)
{"person":{"exact":"문태경","neutral":"그 사람","fullName":"문태경","judgeRef":"문 대표"},"reputation":{"exact":"업계 내 누설자 이미지","neutral":"그 낙인"}}
```

**보충 대상 (empty slots):**

- `b.d-1.S4.claimAtoms[0]`
  - factText: "영업총괄로서 체면 손상을 막기 위해 범인을 빨리 정하고 싶었다는 고백"
  - tags: ["motive","fear","shame"]

### b(서유나).d-3

**참고 — 이미 채워진 slots:**

```json
// b.d-3.S5.claimAtoms[0] (S5)
{"institution":{"exact":"박수민 AE","neutral":"운영사 쪽","fullName":"박수민","judgeRef":"운영사 AE"},"event":{"exact":"참석자 follow-up 메일","neutral":"후속메일"}}
```

**보충 대상 (empty slots):**

- `b.d-3.S3.claimAtoms[0]`
  - factText: "문맥을 자르고 의도만 키운 자신의 해석 습관을 인정하는 진술"
  - tags: ["shame","admission","self_justification"]
- `b.d-3.S4.claimAtoms[0]`
  - factText: "상처와 체면 때문에 누군가의 고의를 믿고 싶었다는 고백"
  - tags: ["fear","motive","emotion"]

### b(서유나).d-4

**참고 — 이미 채워진 slots:**

```json
// b.d-4.S3.claimAtoms[0] (S3)
{"person":{"exact":"문태경","neutral":"그 사람","fullName":"문태경","judgeRef":"문 대표"},"folder":{"exact":"QR 후속자료 폴더","neutral":"QR 폴더"}}
// b.d-4.S5.claimAtoms[0] (S5)
{"folder":{"exact":"QR 후속자료 폴더","neutral":"QR 폴더"},"rule":{"exact":"비식별 축약본과 추적 링크만 사용","neutral":"기존 보안 원칙"}}
```

**보충 대상 (empty slots):**

- `b.d-4.S4.claimAtoms[0]`
  - factText: "영업총괄로 뒤처져 보일까 봐 최신 전체 덱을 넣었다는 감정 고백"
  - tags: ["fear","motive","emotion"]

### b(서유나).d-5

**참고 — 이미 채워진 slots:**

```json
// b.d-5.S3.claimAtoms[0] (S3)
{"event":{"exact":"참석자 follow-up 메일","neutral":"후속메일"}}
// b.d-5.S5.claimAtoms[0] (S5)
{"institution":{"exact":"박수민 AE","neutral":"운영사 쪽","fullName":"박수민","judgeRef":"운영사 AE"},"institution2":{"exact":"경쟁사 바이어","neutral":"저쪽"},"event":{"exact":"참석자 follow-up 메일","neutral":"후속메일"}}
```

**보충 대상 (empty slots):**

- `b.d-5.S4.claimAtoms[0]`
  - factText: "배신 서사에 매달리며 외부 오발송 가능성을 밀어냈다는 고백"
  - tags: ["emotion","motive","shame"]

> 총 7개 empty-slots atoms

---

# [6/6] partnership-10 — S3+ slots 보충 데이터

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

> 총 6개 empty-slots atoms
