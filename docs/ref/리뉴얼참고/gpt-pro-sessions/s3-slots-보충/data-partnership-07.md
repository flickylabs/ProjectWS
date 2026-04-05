# partnership-07 — S3+ slots 보충 데이터

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

---

> 총 7개 empty-slots atoms
