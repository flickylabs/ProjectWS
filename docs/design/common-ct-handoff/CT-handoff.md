# 공통 CT thread 위임 사안 (spouse-01 manual 테스트 thread 발신)

본 자료 = 사건별 thread (spouse-01) 에서 처리 불가한 공통 영역 (UI/VFX/공통 시스템) 사안 모음. 공통 CT thread 가 처리.

진입 base = 공통 CT thread 진입 핸드오프 `session-handoff-20260527-common-ct-pending` (base HEAD 70a114f2).

---

## Issue A — 박지연(원고 A) 제시 버튼 stage 3 활성화

### 현상
「영수증 묶음 5장」 (e-1) 조사 3단계 도달 후 박지연(원고 A)에게 제시하는 버튼이 비활성 상태로 6 turn 시퀀스 (박지연 분기 「내연녀 임신 의심」 등장) 진입 불가.

### 영역
증거 제시 버튼의 활성화 조건 영역 (UI/store). 사건 데이터 영역 아님 → 공통 CT thread.

### 기대
e-1 조사 3단계 + 박지연(A) 제시 버튼 활성화 → spouse-01 thread 가 적용한 박지연 6 turn 시퀀스 발동 가능.

---

## Issue B — 「새 확인 쟁점」 라벨

### 현상
새 쟁점 등장 시 표시되는 라벨 영역 (「새 확인 쟁점」) 의 문구/표현 영역.

### 영역
공통 UI 라벨 영역. 모든 사건 공통 → 공통 CT thread.

---

## Issue C — 새 쟁점/증거 추가 VFX (Issue D 에 흡수)

### 현상
새 쟁점/증거 추가 시 VFX 임팩트 영역.

### 처리
**Issue D (새 항목 등장 통일 패널/VFX 정책) 에 superset 으로 흡수.** Issue D 참조.

---

## Issue D — 새 항목 등장 통일 패널/VFX 최상위 필수 규칙 (2026-05-28 사용자 명시)

### 정책 (사용자 명시 권위)

**같은 위상에 있는 새 항목 등장 = 동일한 형태의 패널 + VFX 사용 최상위 필수 규칙.**

- 모든 새로운 **쟁점** 등장 시 동일한 형태의 패널, VFX 사용
- 모든 새로운 **증거** 등장 시 동일한 형태의 패널, VFX 사용
- 모든 새로운 **증인** 등장 시 동일한 형태의 패널, VFX 사용
- 즉, 같은 위상(tier)에 있는 항목은 동일한 형태로 노출

### 적용 범위

| 위상 | 등장 경로 (현재 코드) | 통일 필요 영역 |
|------|----------------------|----------------|
| 쟁점 | unlockCondition 자동 등장 / narrative trigger 발동 / cascade | 새 쟁점 등장 패널 + VFX 통일 |
| 증거 | newlyUnlocked path ([useActionDispatch.ts:1737](src/hooks/useActionDispatch.ts#L1737) enqueueNewEvidenceCutscene) / narrative trigger 발동 | 새 증거 등장 패널 + VFX 통일 |
| 증인 | unlockedByDossier 만족 / narrative trigger 발동 | 새 증인 등장 패널 + VFX 통일 |

### 구체 사안 — spouse-01 「남편 명의 계좌의 목돈 출금」 쟁점 (영역 코드 d-2)

- 「외도 의심」 (d-1) 자백 (S3) 시점에 「남편 명의 계좌의 목돈 출금」 쟁점이 자동 등장
- 현재 narrative wrapper / 통일 패널 / VFX 영역 없음
- unlockCondition.runtimeRule + authoredRule 영역에 trigger 묘사는 있으나 runtime 통일 연출 영역 부재
- **본 정책 위반 사례** — 공통 CT thread 가 통일 패널/VFX 시스템 구현 시 d-2 도 자동 적용 영역

### thread 영역 분담

- 사건별 thread (spouse-01/family-01/friend-01) = 새 쟁점/증거/증인의 narrative trigger 시점 / unlock 조건 / 발화 영역 결정
- **공통 CT thread** = 모든 사건 공통의 패널 컴포넌트 + VFX 시스템 영역 결정 + 구현 + 통일

### 관련 memory

- `design-new-entity-emergence-unified-vfx-panel` (본 정책 권위)
- `feedback-new-dispute-evidence-narrative-justification` (새 쟁점/증거 narrative justification, 보완 관계)

---

## 발신 thread 정보

- 발신 = spouse-01 manual 테스트·수정 thread (2026-05-28)
- 발신 thread 영역 = spouse-01 data only (사건별)
- 공통 영역 (UI/VFX/store) 은 본 자료로 공통 CT thread 위임
- spouse-01 매트릭스 자료 = `docs/design/spouse-01-entity-matrix/matrix.md`
