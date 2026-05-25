# h-d4 forbiddenKeywords — 4언어 reference 패턴

본 문서는 d-3 forbiddenKeywords 작성 시 reference로 활용할 같은 사건(spouse-01)의 **h-d4 (비자금의 원래 목적)** dispute forbiddenKeywords 4언어 권위 영역이다.

h-d4는 d-3와 truth 영역이 **수렴 관계** (둘 다 박지연 난임 진실로 귀결). 단, 다음 차이가 있음:

| | d-3 | h-d4 |
|---|---|---|
| truth 값 | false (misdirection) | true (진실) |
| 표면 | 내연녀 임신 의심 | 비자금 = 형으로 간 돈 |
| 진실 | 내연녀 없음 + B 본인 정서 준비 | 비자금 원래 목적 = 박지연 난임 치료비 |
| correctResponsibility | a:80 b:20 | a:30 b:70 |
| 책임 우위 | A 단정 frame 책임 | B 침묵의 책임 |

따라서 forbidden lexeme는 두 영역이 공유 가능 (특히 '난임 치료비', '난임 진단', '출산 가능성 조사' 등). d-3에서는 더 강한 misdirection 차단이 필요할 수 있음.

## h-d4 forbiddenKeywords 4언어 영역 (S0 ~ S5)

### S0 — a / b 모두 비자금 원래 목적 부정

**a 측 forbiddenKeywords**:
```
ko:    ['난임 치료비', '난임 진단', '출산 가능성 조사', '보험 상담', '의사 친구 상담']
en:    ['infertility treatment funds', 'infertility diagnosis', 'fertility research', 'insurance consultation', 'doctor friend consultation']
ja:    ['不妊治療費', '不妊診断', '妊娠可能性の調査', '保険相談', '医師の友人への相談']
zh-CN: ['不孕治疗费', '不孕诊断', '生育可能性调查', '保险咨询', '医生朋友咨询']
```

**b 측 forbiddenKeywords**:
```
ko:    ['난임 치료비', '난임 진단', '아내 모르게', '출산 가능성 조사', '보험 상담']
en:    ['infertility treatment funds', 'infertility diagnosis', 'unbeknownst to wife', 'fertility research', 'insurance consultation']
ja:    ['不妊治療費', '不妊診断', '妻に内緒で', '妊娠可能性の調査', '保険相談']
zh-CN: ['不孕治疗费', '不孕诊断', '瞒着妻子', '生育可能性调查', '保险咨询']
```

### S1 — 다른 이유 가능성 인정 / 처음부터 형 아님

**a 측 forbiddenKeywords**:
```
ko:    ['난임 치료비', '난임 진단', '출산 가능성 조사']
en:    ['infertility treatment funds', 'infertility diagnosis', 'fertility research']
ja:    ['不妊治療費', '不妊診断', '妊娠可能性の調査']
zh-CN: ['不孕治疗费', '不孕诊断', '生育可能性调查']
```

**b 측 forbiddenKeywords**:
```
ko:    ['난임 치료비', '난임 진단', '아내 모르게', '출산 가능성 조사']
en:    ['infertility treatment funds', 'infertility diagnosis', 'unbeknownst to wife', 'fertility research']
ja:    ['不妊治療費', '不妊診断', '妻に内緒で', '妊娠可能性の調査']
zh-CN: ['不孕治疗费', '不孕诊断', '瞒着妻子', '生育可能性调查']
```

### S2 — 신규 자료 영역 인정 / 자료 본인 것 인정 (동기 회피)

**a 측 forbiddenKeywords**:
```
ko:    ['난임 치료비', '난임 진단', '출산 가능성 조사']
en:    ['infertility treatment funds', 'infertility diagnosis', 'fertility research']
ja:    ['不妊治療費', '不妊診断', '妊娠可能性の調査']
zh-CN: ['不孕治疗费', '不孕诊断', '生育可能性调查']
```

**b 측 forbiddenKeywords**:
```
ko:    ['난임 치료비', '난임 진단', '출산 가능성 조사', '아내 모르게']
en:    ['infertility treatment funds', 'infertility diagnosis', 'fertility research', 'unbeknownst to wife']
ja:    ['不妊治療費', '不妊診断', '妊娠可能性の調査', '妻に内緒で']
zh-CN: ['不孕治疗费', '不孕诊断', '生育可能性调查', '瞒着妻子']
```

### S3 — 출산 관련 조사 사실 인정 / 혼자 알아봄 (정확 표현 보류)

**a 측 forbiddenKeywords**:
```
ko:    ['난임 진단']
en:    ['infertility diagnosis']
ja:    ['不妊診断']
zh-CN: ['不孕诊断']
```

**b 측 forbiddenKeywords**:
```
ko:    ['난임 진단', '난임 치료비']
en:    ['infertility diagnosis', 'infertility treatment funds']
ja:    ['不妊診断', '不妊治療費']
zh-CN: ['不孕诊断', '不孕治疗费']
```

### S4 — 난임 진단 영역 직접 인정 / 본 목적 명시

**a 측 forbiddenKeywords**: `[], [], [], []` (빈 배열)
**b 측 forbiddenKeywords**: `[], [], [], []`

### S5 — 완전 자백

**a / b 모두 forbiddenKeywords**: `[], [], [], []`

## 패턴 분석

1. **lexeme 단위 정밀**: '난임 치료비' (4글자 명사구), '아내 모르게' (5글자 부사구) — 자유 발화 frame inject 시 NPC 입에서 자연스럽게 나올 수 있는 형태
2. **lieState 점진 축소**: S0 5개 → S1 3-4개 → S2 3-4개 → S3 1-2개 → S4/S5 0개
3. **a vs b 차이**: b측 forbidden에 `'아내 모르게'` 추가 (b 침묵 책임 영역). a측은 frame 책임이라 lexeme 영역 다소 좁음
4. **stage transition 정합**: S{N+1}의 admittedFact가 forbidden을 부분 해제 (S3 b에서 "아내에게 알리지 않은" 발화 가능해지므로 '아내 모르게' 제거)
5. **4언어 일관성**: KO 한 개 lexeme = EN/JA/ZH-CN 한 개 lexeme. KO가 권위.

## d-3 작성 시 적용 권고

- S0 / S1는 광범위 차단 (4~5 lexeme 정도)
- S2부터 점진 축소
- S4부터 빈 배열로 진입
- d-3 진실 핵심 lexeme:
  - '내연녀 없음' (misdirection 핵심)
  - '임신 사실 아님'
  - '혼자 부모 될 마음 정리'
  - '본인 위한 책'
  - '아내에게 알리지 않고 알아봄'
  - '박지연 난임' (h-d4 진실 영역과 겹침 — d-3에서는 매우 강하게 차단)
  - '난임 진단'

작성 권한은 GPT Pro. 본 문서는 reference만.
