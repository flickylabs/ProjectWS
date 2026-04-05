# Thread B — 77건 확장 미션: Evidence 안전성 + DossierCard 검증

> 발신: 컨트롤 타워
> 수신: Thread B
> 일시: 2026-04-05
> 상태: 신규 미션 (Phase 2 완료 후 착수)

---

## 1. 미션 개요

Stage-1에서 대표 7건(각 카테고리 -01)의 evidence 안전성 교정과 DossierCard 검증을 완료했다.
이제 나머지 **77건(-02~-12)**에 동일 기준을 적용한다.

| 작업 | 내용 | 대상 |
|------|------|------|
| **작업 1** | evidence surfaceName/surfaceDescription 안전성 교정 | 77건 case JSON |
| **작업 2** | DossierCard 질문 검증/교정 | 77건 v3-game-loop-data |

### 도구 분담
- **GPT Pro**: 구조 검증 (금지어 패턴 매칭, requiredLieState 정합성, anchorTruth 키워드 대조)
- **Claude Code**: 톤 검수 (번역체 잔존, 자연스러운 한국어, 뉘앙스)

---

## 2. 작업 1: evidence 안전성 교정

### 교정 기준 (Stage-1에서 확립)

#### surfaceName 금지 항목
- 기관명, 서비스명, 직함, 인물 실명

| 위반 예시 | 교정 후 |
|-----------|---------|
| "재가돌봄센터 이체 내역" | "이체 내역" |
| "최민정 명의 영수증" | "영수증" |
| "강남구청 민원 접수 확인서" | "민원 접수 확인서" |
| "김대리 업무 보고서" | "업무 보고서" |

허용 패턴: 증거 종류만 ("이체 내역", "통화 기록", "영수증", "캡처 이미지", "계약서 사본")

#### surfaceDescription 금지 항목
- 핵심 진실 직접 노출
- 기관명/서비스명/인물 직함
- 번역체 9패턴 (했던 것이다, 한 바 있다, 인 것으로 보인다, 것으로 확인된다, 할 수 있을 것이다, 라고 할 수 있다, 에 해당한다, 인 것으로 판단된다, 인 것으로 사료된다)
- "특정 X" 패턴 ("특정 기관", "특정 인물" 등)

#### name/description
- 스포일러 소재 최소화 (내부 참조용이지만 불필요한 노출 제거)

### 기준본 (spouse-01)
```
e-1: surfaceName="은행 이체 내역서"
     surfaceDescription="은행에서 발급된 계좌 거래 기록이다. 이체 금액과 수취인 정보가 포함되어 있다."
e-2: surfaceName="예약 확인 문서"
     surfaceDescription="기관에서 발급된 예약 관련 문서다. 기관명과 예약 내용은 조사가 필요하다."
e-3: surfaceName="메신저 대화 캡처"
     surfaceDescription="휴대폰에서 캡처된 메신저 대화 화면이다. 대화 일부만 보여 전체 맥락을 파악하려면 조사가 필요하다."
```

### GPT Pro 프롬프트 (복사용)

```
너는 솔로몬 법정 게임의 증거 텍스트 안전성 검수 전문가다.
각 사건의 evidence 배열을 검수하고, 스포일러 표현을 교정해.

[핵심 원칙]
"증거의 surfaceName과 surfaceDescription은 플레이어가 처음 보는 텍스트다.
핵심 진실이 여기서 노출되면 게임이 무너진다."

[surfaceName 금지]
- 기관명, 서비스명, 직함, 인물 실명
- 허용: 증거 종류 ("이체 내역", "통화 기록", "영수증", "캡처 이미지")

[surfaceDescription 금지]
- 핵심 진실 직접 노출
- 기관명/서비스명/인물 직함
- 번역체 (했던 것이다, 한 바 있다, 인 것으로 보인다, 것으로 확인된다, 할 수 있을 것이다, 라고 할 수 있다, 에 해당한다, 인 것으로 판단된다, 인 것으로 사료된다)
- "특정 X" 패턴

[anchorTruth 키워드 대조]
각 사건의 disputes[].anchorTruth에서 핵심 키워드를 추출하고,
그 키워드가 surfaceName/surfaceDescription에 포함되면 반드시 교정.

[출력 형식]
교정이 필요한 증거만 출력:
{ "evidenceId": "e-1", "field": "surfaceName", "before": "...", "after": "...", "reason": "기관명 포함" }

교정 불필요 시: "검수 완료 — 교정 0건"

지금부터 사건 JSON을 보내줄게.
```

### Stage-1 교정률 참고
- 7건(대표) × 24개 증거 = 168건 검수 → 46건 교정 (약 27%)
- 77건 예상: ~600건 이상 검수 → **~150건 교정 예상**

---

## 3. 작업 2: DossierCard 질문 검증

### 데이터 위치
```
docs/ref/리뉴얼참고/gpt-batch/{case}/{case}-v3-game-loop-data.json
→ dossierCards 배열
```

### 검증 기준

| 질문 단계 | 역할 | requiredLieState | truthLevel |
|-----------|------|-----------------|------------|
| q1 | hint — 방향만 제시, 구체적 정보 금지 | S1 이상 | hint |
| q2 | partial — 핵심 일부 노출 | S2 | partial |
| q3 | full — 결정적 질문 | S3 | full |

### 금지 사항
- 번역체 9패턴
- "특정 X" 패턴
- surfaceName/surfaceDescription에서 이미 노출된 정보를 질문에서 반복
- 비자연스러운 한국어

### GPT Pro 프롬프트 (복사용)

```
너는 솔로몬 법정 게임의 DossierCard 질문 검증 전문가다.
각 사건의 DossierCard를 검수하고, 규칙 위반을 교정해.

[규칙]
1. q1(hint): 방향만 제시. 구체적 정보 금지.
   예) "이 서류가 어디서 발급됐는지 확인해 보셨습니까?"
2. q2(partial): 핵심 일부 노출. requiredLieState = S2
   예) "이 금액이 정기적으로 이체된 이유가 있습니까?"
3. q3(full): 결정적 질문. requiredLieState = S3
   예) "이 영수증의 실제 사용처를 알고 있지 않습니까?"
4. scriptedResponse의 truthLevel이 질문 단계와 일치
5. 번역체 금지 (했던 것이다, 한 바 있다, 인 것으로 보인다 등 9패턴)
6. "특정 X" 금지
7. 자연스러운 한국어

[출력]
위반 카드만 출력:
{ "cardId": "dc-1", "questionId": "q1", "issue": "...", "fix": "..." }

위반 없으면: "검수 완료 — 위반 0건"
```

---

## 4. 배치 순서

evidence 교정과 DossierCard 검증을 **같은 배치에서 동시 처리**한다.
한 배치에 7건씩, GPT Pro에 사건 JSON + v3-game-loop-data를 함께 전달.

| 배치 | 사건 | 건수 |
|------|------|------|
| 1 | spouse-02 ~ spouse-08 | 7 |
| 2 | spouse-09 ~ spouse-12, family-02 ~ family-04 | 7 |
| 3 | family-05 ~ family-11 | 7 |
| 4 | family-12, friend-02 ~ friend-07 | 7 |
| 5 | friend-08 ~ friend-12, neighbor-02 ~ neighbor-03 | 7 |
| 6 | neighbor-04 ~ neighbor-10 | 7 |
| 7 | neighbor-11 ~ neighbor-12, partnership-02 ~ partnership-06 | 7 |
| 8 | partnership-07 ~ partnership-12, tenant-02 | 7 |
| 9 | tenant-03 ~ tenant-09 | 7 |
| 10 | tenant-10 ~ tenant-12, workplace-02 ~ workplace-05 | 7 |
| 11 | workplace-06 ~ workplace-12 | 7 |

**총 11배치 × 7건 = 77건**

---

## 5. 검증 체크리스트

배치별로 완료 후 아래 항목을 확인:

- [ ] surfaceName에 기관명/서비스명/직함/실명 → 0건
- [ ] surfaceDescription에 핵심 진실 직접 노출 → 0건
- [ ] 번역체 9패턴 → 0건
- [ ] "특정 X" 패턴 → 0건
- [ ] DossierCard q1/q2/q3 truthLevel 정합성 → 전건 일치
- [ ] requiredLieState 적절성 (q2=S2, q3=S3) → 전건 일치
- [ ] anchorTruth 키워드가 surface 텍스트에 미포함 → 0건

---

## 6. 산출물

| 산출물 | 형식 | 위치 |
|--------|------|------|
| 77건 evidence 교정 결과 | case JSON 직접 수정 | `src/data/cases/generated/{case}.json` |
| 77건 DossierCard 교정 결과 | v3-game-loop-data 직접 수정 | `docs/ref/리뉴얼참고/gpt-batch/{case}/` |
| 배치별 교정 리포트 | markdown | `thread-packages/thread-B/reports/` |

**모든 배치 완료 후 컨트롤 타워에 최종 보고.**

---

## 7. 주의사항

1. **기준본(-01) 파일은 절대 건드리지 마라** — Stage-1에서 이미 교정 완료
2. 교정 시 name/description(내부 참조용)도 같이 확인하되, surface 필드가 최우선
3. GPT Pro 출력을 맹신하지 말 것 — 특히 번역체 탐지는 Claude Code로 이중 검증
4. 배치 중간에 패턴이 발견되면 (예: 특정 카테고리에서 동일 위반 반복) CT에 보고
