# QW V5 R4: 3사건 viewerData 교차검증 + R1~R3 결산

**커밋**: c193f03

---

## viewerData 교차검증

### spouse-01 (7 evidence items)

| 증거 | 타입 | viewerData | 검증 |
|------|------|-----------|------|
| e-1 | log | receipt × 5 | ✅ 전부 신한카드 ****-3892, 품목 사건과 일치 |
| e-2 | device | gps_log × 18 | ✅ 호수 참조 0건, 봉천동 오피스텔 방문 패턴 일관 |
| e-3 | log | log (통화) | ✅ 새벽 통화 기록 포함 |
| e-4 | chat | chat (형 문자) | ✅ 형과의 문자 스레드 |
| e-5 | bank | bank × 11 | ✅ 계좌 출금 내역 |
| e-6 | chat | chat (투자방) | ✅ 투자방 카톡 |
| e-7 | contract | contract | ✅ 적금 해지 서류 |

### friend-01 (7 evidence items)

| 증거 | 타입 | viewerData | 검증 |
|------|------|-----------|------|
| e-1 | log | log (연락기록) | ✅ 날짜/시간/내용 스토리 일치, "다은이 아버지 건" 언급 정상 |
| e-2 | chat | chat (단톡방 11건) | ✅ 송다은 먼저 올림, 친구 반응 자연스러움 |
| e-3 | chat | chat (과거 손절 카톡) | ✅ |
| e-4 | chat | chat (예비신랑 메시지) | ✅ |
| e-5 | chat | chat (아버지-예비신랑) | ✅ |
| e-6 | bank | bank (송금 영수증) | ✅ |
| e-7 | log | log (대조표) | ✅ |

### family-01 (7 evidence items)

| 증거 | 타입 | viewerData | 검증 |
|------|------|-----------|------|
| e-1 | contract | contract (유서) | ✅ 60:40 비율 명확, 공증번호, 부동산/예금 |
| e-2 | log | log (방문기록) | ✅ |
| e-3 | testimony | testimony (요양보호사) | ✅ |
| e-4 | log | log (공증 스캔) | ✅ |
| e-5 | contract | contract (원본 유서) | ✅ |
| e-6 | bank | bank × 8 (20년 송금) | ✅ 월 80~150만원, 총 2.4억, 공장 부도 8천만 |
| e-7 | device | device (일기장) | ✅ |

**3사건 viewerData 판정: PASS**

---

## R1~R3 발견 건 결산

| 라운드 | FAIL | WARN | 수정 필요 |
|--------|------|------|----------|
| R1 (spouse-01) | 0건 | 2건 (해요체 경미) | 불요 |
| R2 (friend-01) | 0건 | 0건 | 불요 |
| R3 (family-01) | 0건 | 0건 | 불요 |

### WARN 2건 판정 (수정 불요)

1. **spouse-01** `[interrogation] a|d-1|S0|empathy_approach`: "안 믿는 편**인데요**"
   - empathy 맥락에서 자연스러운 구어체. 강제 교정 시 오히려 부자연스러움. → **유지**

2. **spouse-01** `[evidence_present] a|e-3|early|other`: "누군지 **물어보세요**"
   - 당사자가 재판관에게 상대를 추궁해달라는 요청. 자연스러운 요청형. → **유지**

**수정 0건 → 재스캔 불요**

---

## R4 종합

| 항목 | 판정 |
|------|------|
| spouse-01 viewerData | ✅ PASS |
| friend-01 viewerData | ✅ PASS |
| family-01 viewerData | ✅ PASS |
| R1~R3 발견 건 수정 | 해당 없음 (0건) |

**R4 판정: PASS — Phase A 전체 완료**
