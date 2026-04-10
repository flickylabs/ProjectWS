# CT → 스레드 A: core 6 테스트 결과 — 수정 3건 요청

> 발신: CT
> 수신: 스레드 A (스크립트 생성)
> 일시: 2026-04-09
> 중요도: Critical (FAIL 3건 포함)

---

## 테스트 결과 요약

스레드 C가 core 6 상세 테스트(Level 1~5)를 완료했습니다.

- **조건부 PASS**: workplace-11, neighbor-08, spouse-12
- **FAIL**: partnership-09, tenant-09, family-09

Level 1(로드), Level 2(증거 해금), Level 3(LieState 전이), Level 5(판결) — 전부 PASS.
**Level 4(스크립트 품질)에서만 FAIL과 WARN**이 발생했습니다.

---

## 수정 요청 1: partnership-09 scripted key 매핑 오류 (Critical)

### 현상
- 콘솔에서 `[Scripted]` 로그 미출력, generic fallback 응답만 반환
- validator FAIL 90건

### 원인
- **실제 runtimeKey**: `partner-09`
- **scripted bundle 파일명**: `partnership-09`
- Key mismatch로 scripted 응답이 전혀 매칭되지 않음

### 해결
- `scriptedTextLoader.ts`에서 `partner-09` → `partnership-09` 매핑 추가
- 또는 runtime caseId를 `partnership-09`로 통일
- 또는 scripted bundle 파일명을 `partner-09`로 변경

**어느 방식이든 key가 일치하면 됩니다.** 가장 영향 범위가 작은 방법을 선택해 주세요.

---

## 수정 요청 2: S5 interrogation 구체적 금액 미포함 (FAIL)

### 현상
- partnership-09: d-3, d-4, d-5 / A, B 양측 / S5 interrogation — **FAIL 90건**
- tenant-09: d-4 / A, B 양측 / S5 interrogation — **FAIL 30건**
- family-09: d-5 / A, B 양측 / S5 interrogation — **FAIL 30건**

### 원인
- S5(자백 단계)에서는 Truth Throttle에 의해 **구체적 금액/수치를 포함해야** 합니다
- 현재 해당 쟁점의 S5 variant에 구체적 금액이 없음

### 해결
- 대상 쟁점의 S5 interrogation variant에 `monetaryDisputeIds`에 해당하는 쟁점의 금액 정보를 삽입
- scripted builder에서 S5 금액 삽입 규칙이 해당 dispute에 적용되는지 확인

예시:
```
// S5에서 나와야 할 내용
partnership-09/d-3: "실제 절감률은 12%가 아니라 4%였고, 차액 3,400만원은..."
tenant-09/d-4: "허위 정리비 2,000만원은..."  
family-09/d-5: "계약 외 보전금 6,600만원은..."
```

---

## 수정 요청 3: socialGraph witness relatedDisputeIds 보강 (WARN)

### 현상
- 6건 공통: witness의 `relatedDisputeIds`가 비어있음
- 결과: witness depth gate가 비활성화되어 S0에서도 full depth 증언이 나옴

### 해결
- 각 케이스의 socialGraph/thirdParty 데이터에 `relatedDisputeIds` 추가
- 증인이 아는 정보의 범위를 쟁점별로 연결

예시:
```json
{
  "id": "tp-1",
  "name": "증인 이름",
  "relatedDisputeIds": ["d-1", "d-3"],  // ← 이 증인이 아는 쟁점
  ...
}
```

이렇게 설정하면 관련 쟁점의 LieState에 따라 증인 depth가 제한됩니다.

---

## 우선순위

| 순서 | 이슈 | 영향 |
|------|------|------|
| 1 | **partnership-09 key 매핑** | scripted 응답 전체 미작동 — Critical |
| 2 | **S5 금액 미포함** (3건) | validator FAIL — 수정 후 재검증 필요 |
| 3 | **witness relatedDisputeIds** (6건) | depth gate 미작동 — 게임플레이 품질 |

수정 완료 후 validator 재실행 + CT에 보고 부탁합니다.
