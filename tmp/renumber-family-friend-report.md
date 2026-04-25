# Family/Friend Stage 재넘버링 결과

## 작업 요약
- 대상: `src/data/cases/generated/family-01.json`, `src/data/cases/generated/friend-01.json`
- 범위: `investigationStages[].stage` 필드 값만 0→1, 1→2, 2→3 시프트 (surgical)
- 베이스 커밋: `8d18a39` (branch: main)

## 사전 확인

### stage 참조 하드코딩
- `grep "stage === 0|1|2"` / `stage > 0|stage >= 0` / `viewerDataByStage[...]` 검색 결과:
  - 유일한 매치: `src/components/actions/EvidencePresenter.tsx:656,661` — `q.stage && q.stage > 0`
  - 이 조건은 "stage 라벨을 보일지" 결정 (stage 0이면 라벨 숨김). 0→1 시프트 후 모든 stage가 `> 0`이 되어 라벨이 항상 표시됨 — spouse-01 동작과 동일해짐. 수정 불필요.
- 엔진 로직: `evidenceEngine.ts`의 `.filter(s => s.stage <= investigatedCount)` 은 일반화된 비교라 값 변경에도 안전.
- **CT 보고 필요: 아니오** (기존 코드 모두 1/2/3 체계와 호환)

### stage 값 분포 (pre)
| 파일 | stage 0 | stage 1 | stage 2 | stage 3+ |
|---|---|---|---|---|
| family-01.json | 7 | 13 (7 inv + 6 meta) | 10 (7 inv + 3 meta) | 5 (meta only: 3=2, 4=2, 5=1) |
| friend-01.json | 7 | 13 (7 inv + 6 meta) | 7 (7 inv + 0 meta) | 8 (meta only: 4=4, 5=4 등) |

(`inv` = investigationStages 배열 entry, `meta` = 증거의 meta.stage / viewerData.meta.stage)

### 범위 축소 (doc 대비)
- **viewerDataByStage 없음**: family/friend 두 파일 모두 `viewerDataByStage` 키 0건 (spouse-01만 4건). 키 치환 대상 없음.
- **meta.stage 미변경**: doc의 scope(“investigationStages + viewerDataByStage + unlockAtStage/stageGate/requiredStage/presentStage”)에 `meta.stage`는 없고, spouse-01도 meta.stage를 독립 값(1~7)으로 유지 중. surgical 정규식(`\{\s*"stage":`)로 investigationStages entry만 타겟.

## 치환 건수

| 파일 | stage 0→1 | stage 1→2 | stage 2→3 | 합계 |
|---|---|---|---|---|
| family-01.json | 7 | 7 | 7 | 21 |
| friend-01.json | 7 | 7 | 7 | 21 |
| **총** | **14** | **14** | **14** | **42** |

- 예상치(7 evidence × 3 stage × 2 file = 42) 정확히 일치.
- viewerDataByStage 키 치환: **0건** (필드 부재로 해당 없음)

## 검증

### stage 값 분포 (post)
| 파일 | stage 0 | stage 1 | stage 2 | stage 3 | stage 4 | stage 5 |
|---|---|---|---|---|---|---|
| family-01.json | 0 | 13 | 10 | 9 | 2 | 1 |
| friend-01.json | 0 | 13 | 7 | 7 | 4 | 4(+) |

- stage 0 완전 제거 ✓
- stage 3 증가분 = 이전 stage 2 (inv)의 7건 + 기존 meta stage 3 유지분 ✓
- meta stage 4, 5 값 불변 ✓

### 3사건 일관성
- spouse-01 investigationStages 모두 stage 1/2/3 체계 (기존 1/2/3).
- family/friend 이제 동일 체계로 통일 ✓

### 타입/런타임
- `npx tsc -b --force`: ✓ (에러 없음)
- 헤드리스 family-01: ✓ (PASS 18 / WARN 2 / ERR 0, 성공 1 / 실패 0)
- 헤드리스 friend-01: ✓ (PASS 18 / WARN 2 / ERR 0, 성공 1 / 실패 0)
- 헤드리스 spouse-01 (회귀): ✓ (PASS 18 / WARN 2 / ERR 0, 성공 1 / 실패 0)

(WARN은 기존부터 존재하던 S5 문장 수/금액 포함 품질 경고로 이번 작업과 무관)

## diff 요약

```
 src/data/cases/generated/family-01.json | 42 +++++++++-----------------
 src/data/cases/generated/friend-01.json | 42 +++++++++-----------------
 2 files changed, 42 insertions(+), 42 deletions(-)
```

- 모든 변경 라인 = `"stage": N` 값 시프트만 (N=0→1, 1→2, 2→3)
- 의도 외 변경 **없음** (meta.stage/phase/lieState/기타 필드 불변)

## 이슈
- **없음** — 사전 확인에서 발견된 유일한 하드코딩 참조(`q.stage > 0`)는 라벨 표시 boolean이라 수정 없이 일관 동작.

## 결정 사항
- **surgical 접근 채택** (doc의 blanket regex 스크립트 대신):
  - 이유: family/friend의 meta.stage 값(1,2,3,4,5)이 existing 1-indexed evidence meta로, doc의 “phase/lieState 보존” 원칙과 scope 명세(investigationStages + viewerDataByStage 한정)를 엄수하려면 meta.stage를 건드리면 안 됨. blanket regex는 meta.stage 1→2, 2→3도 바꿔버려 evidence meta 일관성을 깸.
  - 정규식 `/(\{\s*)"stage":\s*(\d+)/g` 은 stage가 객체 첫 필드인 경우(= investigationStages entry)만 매칭. meta.stage는 `trustLevel`/`legalLabel` 등 앞선 필드가 있어 제외됨.

## 후속
- **CT 커밋 대기**.
- 커밋 메시지 제안: `fix: family-01/friend-01 investigationStages stage 0/1/2 → 1/2/3 재넘버링 (spouse-01과 일관성)`

## 산출물
- 수정된 파일: 2개 (family-01.json, friend-01.json)
- 생성 후 제거된 임시 파일: `tmp/renumber-stages.cjs`
- 이 리포트: `tmp/renumber-family-friend-report.md`
