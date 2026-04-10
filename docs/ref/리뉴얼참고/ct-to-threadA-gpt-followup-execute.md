# CT → 스레드 A: GPT 후속 — 재생성 + 대체 생성 실행

> 발신: CT
> 수신: 스레드 A (스크립트 생성)
> 일시: 2026-04-09
> 유형: 재생성 + 신규 생성

---

## 스레드 E 수정 완료 — 실행 가능

스레드 E가 3단계 작업을 모두 완료했습니다. 아래 작업을 **병렬 실행**해 주세요.

---

## 작업 1: DROP 2건 대체 생성

| 삭제 대상 | 대체 케이스 | 카테고리 |
|-----------|-----------|---------|
| neighbor-new-10 (공동텃밭 pH센서) | **맘카페 공지의 17분** | 이웃 |
| civic-new-07 (1365의 18시간) | **안전수당의 마지막 배달** | 공공/제도 |

기획서: `docs/ref/리뉴얼참고/thread-e-drop2-replacement-plan.md`

새 caseId를 부여하고 (예: `neighbor-new-11`, `civic-new-11` 또는 적절한 ID), 기존 파이프라인으로 생성해 주세요.

기존 `neighbor-new-10`, `civic-new-07` 파일은 유지하되 manifest에서 제외 상태를 유지합니다.

## 작업 2: DEVELOP P1 8건 재생성

스레드 E가 기획서를 수정했습니다. **수정된 배치 파일**을 참조하여 재생성해 주세요.

수정 요약: `docs/ref/리뉴얼참고/thread-e-develop-priority1-fixes.md`

수정된 기획서가 반영된 배치 파일:
- `thread-e-100-new-cases-batch-02-family.md`
- `thread-e-100-new-cases-batch-03-friend.md`
- `thread-e-100-new-cases-batch-04-neighbor.md`
- `thread-e-100-new-cases-batch-06-tenant.md`
- `thread-e-100-new-cases-batch-07-workplace.md`
- `thread-e-100-new-cases-batch-09-professional.md`

**중요**: 8건 중 어떤 caseId가 DEVELOP P1인지는 `thread-e-develop-priority1-fixes.md`에 명시되어 있습니다. 해당 케이스만 재생성하면 됩니다. KEEP 케이스는 건드리지 마세요.

## 작업 3: Wave B DEVELOP 1건

`thread-e-wave-b-develop-list.md` 기준, Wave B에서 실제 DEVELOP는 `neighbor-new-10` 1건뿐이고, 이건 이미 DROP 대체 대상이므로 **작업 1에서 처리됩니다.** 별도 작업 불필요.

---

## 실행 방법

준비해 둔 manifest 활용:

```bash
# DROP 대체 2건 (새 caseId)
node scripts/run-parallel-case-batch.cjs --cases [새 neighbor ID],[새 civic ID]

# DEVELOP P1 재생성 (기존 caseId 덮어쓰기)
node scripts/run-parallel-case-batch.cjs --cases [P1 8건 caseId 나열]
```

총 **10건 병렬 실행** (대체 2 + 재생성 8). 동시에 돌리거나, 대체 2건 먼저 → P1 8건 순서도 가능합니다.

## 검증 기준

각 케이스: runtime template PASS / scripted template PASS / semantic PASS / stage3 PASS

## 완료 보고

```
DROP 대체: [caseId] PASS/FAIL
DEVELOP P1 재생성: [caseId] PASS/FAIL (각각)
전체 소요 시간: NN분
```
