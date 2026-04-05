# 배치 1 교정 리포트 — spouse-02 ~ spouse-08

> 작성: Thread B
> 일시: 2026-04-05
> 빌드: PASS (tsc --noEmit 에러 0건)

---

## 1. 검수 범위

| 항목 | 수량 |
|------|------|
| 대상 사건 | spouse-02 ~ spouse-08 (7건) |
| evidence 검수 | 42건 (7건 × 6 증거) |
| DossierCard 질문 검수 | 126건 (7건 × 3카드 × 2challenge × 3q) |
| lockedHint 검수 | 포함 |

---

## 2. Evidence 안전성 교정 — 12건

### spouse-02 (anchorTruth: 산후 상담 종결서 학교 학부모방 유출)

| 증거 | 필드 | before | after | 위반 유형 |
|------|------|--------|-------|-----------|
| e-3 | surfaceDescription | "**학부모** 채팅방에 올라온 익명 글의 캡처 화면이다" | "**온라인** 채팅방에 올라온 익명 글의 캡처 화면이다" | anchorTruth "학교 학부모방" 키워드 |
| e-6 | surfaceDescription | "**관리사무소** 정정 공문과 **학교** 내부 메모다" | "**기관** 정정 공문과 내부 **보류** 메모다" | anchorTruth "학교" + 기관명 |

### spouse-03 (anchorTruth: 비상금에서 뺀 160만원 + 적금 정지)

| 증거 | 필드 | before | after | 위반 유형 |
|------|------|--------|-------|-----------|
| e-1 | surfaceName | "**비상금** 계좌 인출 내역" | "**공동** 계좌 인출 내역" | anchorTruth "비상금" |
| e-1 | surfaceDescription | "공동 **비상금** 계좌의 은행 원본 거래내역" | "공동 계좌의 은행 원본 거래내역" | anchorTruth "비상금" |

### spouse-04 (anchorTruth: 어머니가 예약 코드로 레스토랑/픽업지 변경)

| 증거 | 필드 | before | after | 위반 유형 |
|------|------|--------|-------|-----------|
| e-1 | surfaceDescription | "**특정 날짜**의 동선과 일정을 대조" | "**일별** 동선과 일정을 대조" | "특정 X" 금지 패턴 |
| e-4 | surfaceName | "예약 변경 통화기록과 **픽업** 대장" | "예약 변경 통화기록과 **수령** 대장" | anchorTruth "픽업지" |

### spouse-05 (anchorTruth: 녹취는 이어 붙인 위조본)

| 증거 | 필드 | before | after | 위반 유형 |
|------|------|--------|-------|-----------|
| e-5 | surfaceDescription | "**음성 편집**을 의뢰한 메신저 대화" | "**편집**을 의뢰한 메신저 대화" | anchorTruth "위조본" 간접 노출 |

### spouse-06 — 위반 0건

### spouse-07 (anchorTruth: 소아과/세탁까지 합치면 기여 거의 같음)

| 증거 | 필드 | before | after | 위반 유형 |
|------|------|--------|-------|-----------|
| e-4 | surfaceDescription | "**소아과** 예약, 약국 영수증, **세탁**·식재료 주문 기록" | "**병원** 예약과 약국 영수증, **생활 서비스** 주문 기록" | anchorTruth "소아과·세탁" 직접 일치 |

### spouse-08 (anchorTruth: 법무사에게 서류 넘긴 건 + 카페 합의)

| 증거 | 필드 | before | after | 위반 유형 |
|------|------|--------|-------|-----------|
| e-1 | surfaceName | "**카페** 음성메모와 결제 영수증" | "음성메모와 결제 영수증" | anchorTruth "카페" |
| e-1 | surfaceDescription | "**카페에서** 녹음된 음성메모" | "녹음된 음성메모" | anchorTruth "카페" |
| e-4 | surfaceName | "**법무** 상담 접수표와 요약문" | "**전문** 상담 접수표와 요약문" | anchorTruth "법무사" |
| e-4 | surfaceDescription | "**법무사** 사무실의 상담 접수표" | "**전문가** 사무실의 상담 접수표" | anchorTruth "법무사" |

---

## 3. DossierCard 질문 교정 — 10건

모두 **q1(hint 단계)에서 구체적 정보 과다 노출** 패턴.

### spouse-02 — 3건

| 질문ID | before | after | 위반 유형 |
|--------|--------|-------|-----------|
| dossier-2.b.q1 | "복구 정보가 본인 쪽과 맞아떨어지는 보조 계정을 왜 사용했습니까?" | "보조 계정을 따로 사용한 이유부터 설명하십시오." | 구체적 사실 확정 |
| dossier-3.a.q1 | "스캔 시각이 익명 글보다 **사흘 전**이라는 점이" | "스캔 시각과 익명 글 시점 사이에 **차이가 있습니다**." | 구체 수치 제거 |
| dossier-3.b.q1 | "**의료정보가 포함된** 서류를 집 장비에서 스캔해 **가족클라우드**에 올린" | "집에서 스캔한 서류를 **가족 공유 공간**에 올린" | 의료정보 특정 + full 수준 |

### spouse-03 — 2건

| 질문ID | before | after | 위반 유형 |
|--------|--------|-------|-----------|
| dossier-1.a.q1 | "공동 비상금에서 **160만원**이 빠져나간 날" | "공동 계좌에서 **금액**이 빠져나간 날" | anchorTruth 핵심 금액 |
| dossier-3.b.q1 | "같은 날 **적금 정지**와 건조기 계약을 묶어" | "같은 날 **두 건의 금융 조정**을 묶어" | anchorTruth "적금 정지" |

### spouse-04 — 5건

| 질문ID | before | after | 위반 유형 |
|--------|--------|-------|-----------|
| dossier-1.a.q1 | "출입기록상 **18시 07분** 퇴실 뒤 **긴급 납품이 비어 있습니다**" | "출입기록과 '클라이언트 긴급 호출' 사이에 **빈 시간이 있습니다**" | 구체 시각 + 사실 확정 |
| dossier-1.b.q1 | "**브로치를 빌리려 연락하면서 예약 캡처까지 보낸** 시점부터" | "**가족에게 연락한 시점**과 그 내용부터" | 구체 행위 전부 명시 |
| dossier-2.a.q1 | "**실제 요청자는 따로입니다**. 코드와 케이크 문구를 알고 움직일 사람이 누구" | "실제 요청 경위가 **다를 수 있습니다**. 그 흐름을 먼저 설명하십시오." | anchorTruth 거의 확정 |
| dossier-3.a.q1 | "음성메모엔 '**둘만 보내면 다음부터도 빠질 거다**'는 취지가" | "음성메모에 남아 있는 **취지를 보면** 우연한 참견이라 보기 어렵습니다" | 구체 내용 직접 인용 |
| dossier-3.b.q1 | "브로치를 빌리려는 연락에서 왜 **예약 캡처와 코드까지 함께 보냈**습니까?" | "브로치 건 외에 **추가로 전달한 정보**가 있었습니까?" | 구체 행위 명시 + 중복 |

### spouse-05~08 — 위반 0건

---

## 4. 검증 체크리스트

- [x] surfaceName에 기관명/서비스명/직함/실명 → **0건** (교정 후)
- [x] surfaceDescription에 핵심 진실 직접 노출 → **0건** (교정 후)
- [x] 번역체 9패턴 → **0건**
- [x] "특정 X" 패턴 → **0건** (교정 후)
- [x] DossierCard q1/q2/q3 truthLevel 정합성 → **전건 일치**
- [x] requiredLieState 적절성 (q1=none, q2=S2, q3=S3) → **전건 일치**
- [x] anchorTruth 키워드가 surface 텍스트에 미포함 → **0건** (교정 후)
- [x] 빌드 확인 (tsc --noEmit) → **PASS**

---

## 5. 위반 패턴 분석

| 패턴 | evidence 교정 | DossierCard 교정 | 합계 |
|------|:---:|:---:|:---:|
| anchorTruth 키워드 노출 | 10 | 5 | 15 |
| "특정 X" 금지 패턴 | 1 | 0 | 1 |
| q1 hint 수준 초과 | - | 10 | 10 |
| 번역체 | 0 | 0 | 0 |
| "당신" / 클리셰 | 0 | 0 | 0 |

**주요 발견**: spouse-04가 가장 많은 위반 (evidence 2건 + DossierCard 5건 = 7건). 사건 구조가 복잡하고 anchorTruth(어머니 개입)를 가리키는 단서가 많아 q1에서 과도하게 구체화되는 경향.

---

## 6. 수정된 파일 목록

| 파일 | 교정 건수 |
|------|-----------|
| `src/data/cases/generated/spouse-02.json` | 2 |
| `src/data/cases/generated/spouse-03.json` | 2 |
| `src/data/cases/generated/spouse-04.json` | 2 |
| `src/data/cases/generated/spouse-05.json` | 1 |
| `src/data/cases/generated/spouse-07.json` | 1 |
| `src/data/cases/generated/spouse-08.json` | 4 |
| `docs/ref/리뉴얼참고/gpt-batch/spouse-02/spouse-02-v3-game-loop-data.json` | 3 |
| `docs/ref/리뉴얼참고/gpt-batch/spouse-03/spouse-03-v3-game-loop-data.json` | 2 |
| `docs/ref/리뉴얼참고/gpt-batch/spouse-04/spouse-04-v3-game-loop-data.json` | 5 |
| **합계** | **22건** |
