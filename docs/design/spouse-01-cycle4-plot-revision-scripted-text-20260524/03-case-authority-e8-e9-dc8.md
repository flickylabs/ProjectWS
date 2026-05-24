# 03. 신규 증거 + 단서 카드 Authority 정의

## e-8 — 휴대폰 의학 검색 기록

| field | 값 |
|---|---|
| id | `e-8` |
| name | 이준호 휴대폰의 의학 검색 기록 |
| surfaceName | 휴대폰 의학 검색 기록 |
| type | device |
| reliability | hard |
| completeness | original |
| provenance | self_possessed |
| legitimacy | lawful |
| subjectParty | b |
| proves | `h-d4` |
| requires | `e-3` |
| requiredLieState | S2 |

### description (진실 영역)

> 이준호의 휴대폰 검색 기록 중 산부인과·여성 질환·임신 관련 검색이 반복된다. 일부는 의사 친구와의 통화 직후 시기에 몰려 있다.

### surfaceDescription (표면)

> 이준호 휴대폰에 남은 산부인과·여성 질환 검색 기록.

### partyContext

- A questionAngle: 남편 휴대폰에서 산부인과 검색이 반복된 이유를 어떻게 보는지
- A implication: 산부인과·여성 질환 검색 = 외도 상대 관련 의심으로 frame 강화.
- B questionAngle: 이 검색 기록을 본인 영역에서 어떻게 설명할 것인지
- B implication: 혼자만 알아본 의학 영역의 조사 흔적.

### depthStages (5단계)

| id | summary |
|---|---|
| stub | 의학 관련 검색 기록 존재 표시. |
| excerpt | 산부인과·여성 질환 검색만 우선 보임 — 외도 의심 frame. |
| original | 임신·여성 의학 영역 검색 전체와 의사 친구 통화 시각 정합 확인. |
| context | 검색 영역이 형 사정과는 무관한 부부 영역이라는 점이 복원됨. |
| established | B가 혼자 의학 영역을 지속적으로 알아봐 왔다고 공식기록 채택. |

### trustStates

| id | summary |
|---|---|
| submitted | A가 휴대폰 일부 캡처 제출 또는 B 휴대폰 발췌. |
| verifying | 휴대폰 원본 검색 기록 대조. |
| authenticated | 검색 시점·키워드가 통화 기록과 일치. |
| challenged | 외도 frame과 혼자 알아본 frame 두 해석이 충돌. |
| misread | 검색 자체는 인증되지만 의도 해석은 심문과 맥락으로 확정. |

---

## e-9 — 보험사 견적 자료 (가입 없음)

| field | 값 |
|---|---|
| id | `e-9` |
| name | 이준호의 보험사 견적 자료 (가입 없음) |
| surfaceName | 보험사 견적 자료 |
| type | contract |
| reliability | hard |
| completeness | original |
| provenance | self_possessed |
| legitimacy | lawful |
| subjectParty | b |
| proves | `h-d4` |
| requires | `e-8` |
| requiredLieState | S2 |

### description

> 이준호가 여러 보험사에서 받은 의료비 보장 특약 견적서 묶음. 모두 견적·상담 단계에서 멈춰 있고 실제 가입 흔적은 없다.

### surfaceDescription

> 이준호 명의 보험사 견적서들.

### partyContext

- A questionAngle: 남편이 혼자 받은 보험 견적의 정체가 무엇인지
- A implication: 수익자 공란/타인 상담 = 외도 상대 수익자 의심.
- B questionAngle: 가입까지 가지 않은 보험을 왜 여러 곳에서 상담만 받았는지
- B implication: 의료비 대비를 알아본 것이지만 결정을 내리지 못함.

### depthStages

| id | summary |
|---|---|
| stub | 보험 견적서 묶음 존재 표시. |
| excerpt | 고액 의료비 특약·수익자 공란 견적만 보임 — 외도 의심 frame. |
| original | 의료비 보장 특약 견적이 여성 의학 영역까지 포함된다는 점과 가입 0건이라는 점이 확인됨. |
| context | e-8 휴대폰 검색 시기와 상담일이 정합되며 모든 견적이 결정 단계에 도달하지 못함. |
| established | B가 의학 영역의 의료비 대비만 알아봤으나 결정에는 도달하지 못했다고 공식기록 채택. |

### trustStates

| id | summary |
|---|---|
| submitted | B 측 제출 또는 A 발견 사본 제출. |
| verifying | 보험사 원본 견적서 대조. |
| authenticated | 상담일·상담 항목·미가입 사실 확인. |
| challenged | A가 수익자 의심을 제기 / B가 의학 영역 대비라고 주장. |
| misread | 상담 사실은 인증되지만 진짜 의도는 심문과 맥락으로 확정. |

---

## dc-8 — 이준호의 또 다른 침묵

| field | 값 |
|---|---|
| id | `dc-8` |
| label | 이준호의 또 다른 침묵 |
| type | derived_note |
| linkedDisputes | `h-d4` |
| linkedParty | b |
| linkedEvidence | `e-8`, `e-9` |

### description

> 형 사건과는 무관한 영역에서도 이준호가 혼자 무언가를 준비해 왔다는 단서. 외도 의심과 출산 조사 두 해석 사이.

### noteText (진실 영역)

> 휴대폰 검색 기록과 보험 상담 기록이 같은 시기·같은 영역(산부인과·고위험 임신·시험관)으로 모인다. 형 사건과는 연결되지 않는 영역이며 가입 흔적은 없다 — 결정에 도달하지 못한 혼자만의 조사.

### leadLine

- name: Hidden Purpose Lead
- leadType: Beneficiary
- firstInputs: `e-8`, `e-9`
- secondInputs: `L-8`, `stmt-b-family`

#### interpretationChoices

| id | text | implication |
|---|---|---|
| L-8-A | 외도 상대를 위한 준비다 | A의 외도 의심을 강화한다. |
| L-8-B | 부부의 출산 영역을 혼자 알아본 흔적이다 | 진짜 목적이 형 사정과는 별개 영역임을 본다. |
| L-8-C | 단순한 정보 수집일 수 있다 | 판단을 유보한다. |

### challenges — B 측 질문

| id | text | attackVector | requiredLieState | revealAtom |
|---|---|---|---|---|
| dc-8.b.q1 | 아내 모르게 출산 관련 영역을 혼자 알아봐 온 결정의 무게를 어떻게 보십니까? | responsibility | S3 | spouse-01:b:h-d4:S4:0 |
| dc-8.b.q2 | 이 자료들의 진짜 목적이 무엇이었는지 직접 답해 주십시오. | motive | S4 | spouse-01:b:h-d4:S5:0 |

### successConditionSummary

- e-8 Original 이상
- e-9 Original 이상
- B에게 동기 추궁 또는 공감 접근 누적

### successEffects

- h-d4 핵심 사실 "비자금 원래 목적 = 난임 치료비" 잠정 인정
- B가 혼자 출산 가능성을 알아본 사실 직접 언급

---

## combine-7 — e-8 + e-9 → dc-8

| field | 값 |
|---|---|
| id | `combine-7` |
| inputs | `e-8`, `e-9` |
| cost | 2 |
| outputId | `dc-8` |
| discoveryText | 휴대폰의 산부인과·난임 검색 기록과 가입 없이 멈춘 보험 상담 견적이 같은 시기·같은 영역으로 모인다. |
| route | evidence_combine |
| gate | allowedChannels `evidence_present`/`dossier`; requiredEvidenceStages e-8 `original` / e-9 `original`; requiredTruthStage `d-2`: 5; autoSurfaceAllowed false |
| surfaceFallback | B의 휴대폰 검색과 보험 상담 견적을 대조 중. |
