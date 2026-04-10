# CT → 스레드 A: 스레드 E core 6 기획서 전달 + 작업 안내

> 발신: CT
> 수신: 스레드 A (스크립트 생성)
> 일시: 2026-04-09

---

## 현재 상태 확인

#5 엔진 호환성, #3 pilot 3건, #4 파이프라인 안정화 — 완료 확인했습니다.
#1 semantic warning 감소, #2 variant selection 보강 — 진행 중인 것도 확인했습니다.

## 새 작업: 스레드 E core 6 기획서 → RuntimeCaseData 변환

스레드 E가 84건 독립 재선별 + 상세 기획 리디자인을 완료했습니다. 아래 6건의 기획서가 나왔고, 이것을 RuntimeCaseData + ScriptedText로 변환해야 합니다.

### 기획서 위치

**`docs/ref/리뉴얼참고/thread-e-phase2-redesign-core6.md`**

### 대상 6건

| caseId | 사건명 | 핵심 |
|--------|--------|------|
| workplace-11 | 특허 마감 전야 | 발명자 삭제 + 브로커 유출 공모 |
| partnership-09 | 실적의 얼굴 | 지원금 실적 공동 부풀리기 |
| tenant-09 | 8천만원의 계약서 | 보증금 허위 정리비 + 중개사 공모 |
| spouse-12 | 2006년의 캡처 | 과거 소문 재소환 + 현재 위조 증거 |
| family-09 | 부모 집 6,600만원의 차이 | 남매+중개사 오프북 공모 |
| neighbor-08 | 복도의 27초 | 도어벨카메라 위조 클립 + 역침범 |

### 기획서에 포함된 것 (케이스별)

- 사건 훅
- 양측 프로필 (이름, 직업, 숨긴 것, 거짓말 전략)
- 쟁점 구조 (3~5개)
- **증거 설계 + 해금 순서** (초기 → 1차 해금 → 2차 해금 → 최종)
- **LieState 전이 설계** (관문별 트리거)
- 핵심 모순 쌍
- 판결 딜레마

### 주의: 이미 완성된 3건과 겹침

pilot 3건(workplace-11, partnership-09, neighbor-08)이 **스레드 A에서 이미 생성 완료**되어 있습니다. 스레드 E의 기획서는 **이 사건들을 더 재미있게 리디자인**한 것입니다.

따라서:
- workplace-11, partnership-09, neighbor-08 → **기존 데이터를 기획서 기준으로 덮어쓰기**
- tenant-09, spouse-12, family-09 → **신규 생성**

기존 데이터와 기획서의 차이가 클 수 있습니다 (증거 해금 조건, 쟁점 구조, LieState 전이 등이 재설계됨).

### 변환 시 반영 필수 사항

기획서의 증거 설계를 RuntimeCaseData로 변환할 때 아래 필드를 반드시 채워 주세요:

```
evidence[].requires          — 기획서의 "해금 순서"에 따라
evidence[].requiredLieState  — 기획서의 "S1+", "S2+" 등에 따라
evidenceCombinations         — 기획서의 "핵심 조합"에 따라
lieConfig[].transitions      — 기획서의 "LieState 전이 설계"에 따라 (hard_evidence 관문 포함)
```

CT가 수정한 `evidenceEngine.ts:22` (`unlocked: e.requires.length === 0 && !e.requiredLieState`)와 호환되어야 합니다.

### 스토리 강화 참조

**`docs/ref/리뉴얼참고/thread-e-phase2-story-boost-12.md`**도 참고하세요. 12건 전체의 스토리 자극도 강화 방향이 정리되어 있습니다. RuntimeCaseData의 `meta.emotionalBait`, `meta.anchorTruth`, `meta.resolutionDilemma` 등에 반영할 수 있습니다.

---

## 작업 우선순위 (갱신)

| 순서 | 작업 | 상태 |
|------|------|------|
| 1 | ~~엔진 호환성 확인 (#5)~~ | 완료 |
| 2 | ~~pilot 3건 생성 (#3)~~ | 완료 |
| 3 | ~~파이프라인 안정화 (#4)~~ | 완료 |
| 4 | semantic warning 감소 (#1) | **진행 중** — 계속 |
| 5 | variant selection 보강 (#2) | **진행 중** — 계속 |
| **6** | **core 6건 RuntimeCaseData 변환 (신규)** | **대기** |

#4, #5를 계속 진행하되, **#6 core 6건 변환을 병행**해 주세요. 병렬 배치 러너가 있으므로 기존 작업과 동시 진행 가능할 것으로 보입니다.

### 참고: 나머지 6건 기획서도 곧 나옵니다

스레드 E가 나머지 6건(spouse-05, family-05, friend-07, neighbor-03, partnership-04, workplace-12)의 상세 설계를 진행 중입니다. 완료되면 CT가 전달합니다.

---

## 스레드 E와의 관계

```
스레드 E: 기획서 산출 (사건 훅, 증거 설계, LieState 전이, 판결 딜레마)
    ↓ CT가 전달
스레드 A: RuntimeCaseData + ScriptedText 변환 (파이프라인 실행)
    ↓ 자동 로드
게임: 플레이 가능
```

기획서에 대한 질문이 있으면 CT를 통해 스레드 E에 전달합니다.
