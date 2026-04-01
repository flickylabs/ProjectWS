# Session 3: family-01 — ClaimPolicy + RuntimeStartBridge + EvidenceChallenge

## 배경

spouse-01 파일럿 데이터(Session 1~2)는 완료되어 엔진에 통합됐습니다. 이제 두 번째 파일럿 사건인 family-01을 진행합니다.

**family-01이 두 번째 파일럿인 이유**: 가족 관계(부모-자녀, 형제)는 호칭 체계와 감정 표현의 난이도가 가장 높습니다. 이 사건에서 blueprint 시스템이 제대로 작동하면 나머지 관계 유형은 더 쉽습니다.

## 사건 개요 (family-01)

- **관계**: 형제 (누나-동생) — 부모 간병 중 재산·돌봄 분쟁
- **당사자 A**: 윤서아 (42세, 프리랜서 보험설계사) — archetype: **victim_cosplay**
- **당사자 B**: 윤도현 (38세, 냉동설비 유지보수 기사) — archetype: **cold_logic**
- **핵심 갈등**: 서아가 부모 계좌에서 1,800만원을 선이체한 사건 + 도현의 간병비 분담 지연 + 아버지 메모장의 상속 해석

### 쟁점 배분
- 서아(a): d-1(부모예금 선이체), d-3(메모장 상속 해석), d-5(공동기록 위반)
- 도현(b): d-2(간병비 지연), d-4(초기비용 분담), d-5(공동기록 위반)

### verbalTell
- 서아(a): sacrifice_rollcall(희생 나열), tear_brake(눈물 브레이크), echo_blame(되받아치기)
- 도현(b): receipt_stack(날짜·금액 나열), clipped_denial(짧은 부정), dry_sarcasm(건조한 빈정)

## 첨부 파일

1. **session3-family-01-case.json** — 사건 전체 데이터
2. **session3-family-01-phase1.json** — Phase 1 스크립트
3. **renewal-schemas.ts** — 타입 정의 (이전과 동일)

## 생성 요청 (Session 1과 동일 구조)

### 1. ClaimPolicy

서아(a): d-1, d-3, d-5 × 6상태 = 18항목
도현(b): d-2, d-4, d-5 × 6상태 = 18항목
양측 보조 레이어 (상대 쟁점): 각 12항목
**총 60항목**

규칙은 Session 1과 동일. 단, 다음에 특별히 주의해주세요:

**가족 관계 호칭 특수 규칙**:
- 서아→도현: "도현아" (반말, 누나→동생)
- 도현→서아: "누나" (반말이지만 존칭)
- 서아→재판관 앞 도현 언급: "제 동생" / "도현이"
- 도현→재판관 앞 서아 언급: "제 누나" / "서아 누나"
- 양측 모두 부모 관련: "아버지", "어머니"
- **이 호칭 규칙이 publicClaim 자연문에 반영되어야 합니다**

**archetype 특수 규칙**:
- victim_cosplay(서아): 모든 상태에서 자기 희생/억울함이 기저에 깔림. publicClaim도 "제가 ~했는데", "왜 저만~" 뉘앙스
- cold_logic(도현): 감정 배제, 기준/순서/액수 중심. publicClaim도 "~일 기준", "절차상", "금액으로 보면" 뉘앙스

### 2. RuntimeStartBridge (10항목)

Phase 1 스크립트(첨부)를 분석하여 Phase 3 시작 상태를 결정해주세요. spouse-01과 동일한 분석 기준입니다.

### 3. EvidenceChallenge (6항목)

증거 6개 각각에 대해 attackVectors/resolvedBy/whenAllResolved를 매핑.

**특별 주의: e-4(아버지 메모장 사진)**:
- `isTrap: true` — 잘린 사진으로, 전체 맥락 없이 제시하면 오해를 부름
- attackVectors에 `context`가 반드시 포함되어야 함
- `restore_context`로 전체 스캔(e-5)과 연결 시 context 봉쇄

## 출력 형식

Session 1과 동일한 JSON 구조:

```json
{
  "caseId": "family-01",
  "claimPolicies": { "a": { ... }, "b": { ... } },
  "bridges": [ { "party": "a", "entries": [...] }, { "party": "b", "entries": [...] } ],
  "evidenceChallenges": [ ... ]
}
```

## 다음 Session

Session 4에서 family-01의 ExecutableVerbalTell + BeatScript를 이어서 요청할 예정입니다. 이번 Session에서는 ClaimPolicy + Bridge + EvidenceChallenge에 집중해주세요.
