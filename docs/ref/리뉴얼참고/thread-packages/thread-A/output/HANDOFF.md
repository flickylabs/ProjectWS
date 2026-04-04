# 스레드 A 산출물 — 증거 시스템 데이터 완성

> 작성일: 2026-04-04
> 담당: 스레드 A (증거 investigationStages 작성)
> 상태: **완료 — 컨트롤 타워 통합 대기**

---

## 1. 산출물 목록

| 파일 | 사건 | 증거 수 | 질문 수 |
|---|---|---|---|
| `family-01-stages.json` | family-01 | 6 | 18 |
| `friend-01-stages.json` | friend-01 | 6 | 18 |
| `neighbor-01-stages.json` | neighbor-01 | 6 | 18 |
| `partnership-01-stages.json` | partnership-01 | 6 | 18 |
| `tenant-01-stages.json` | tenant-01 | 6 | 18 |
| `workplace-01-stages.json` | workplace-01 | 6 | 18 |
| **합계** | **6건** | **36** | **108** |

파일 위치: `docs/ref/리뉴얼참고/thread-packages/thread-A/output/`

---

## 2. 통합 방법

각 사건 JSON(`src/data/cases/generated/{case}.json`)의 evidence 배열에서
해당 증거의 `investigationStages` 필드에 배열을 삽입합니다.

```jsonc
// 예: family-01.json의 e-1
{
  "id": "e-1",
  "name": "부모 관리계좌 거래내역과 서아 개인계좌 입금확인서",
  // ... 기존 필드 ...
  "investigationStages": [    // ← 이 배열을 삽입
    { "stage": 0, "revealKey": "request_original", "question": { "text": "...", "attackVector": "..." } },
    { "stage": 1, "revealKey": "check_metadata", "question": { "text": "...", "attackVector": "..." } },
    { "stage": 2, "revealKey": "restore_context", "question": { "text": "...", "attackVector": "..." } }
  ]
}
```

산출물 JSON의 `evidenceStages` 객체에서 `e-1` ~ `e-6` 키로 각 증거의 배열을 매칭합니다.

---

## 3. 검증 결과

108개 질문 전수 검증 **2회** 실시 (작성 에이전트 ≠ 검증 에이전트).

| 검증 항목 | 1차 결과 | 수정 후 2차 결과 |
|---|---|---|
| Stage 0 진실 미노출 | PASS | PASS |
| Stage 1 check_metadata 근거 | PASS | PASS |
| Stage 2 핵심 근접 + 답 미공개 | FAIL x1 | **PASS** |
| 합니다체 25~60자 | FAIL x18 | **PASS** |
| revealKey 실존 | PASS | PASS |
| attackVector 유효 (4종) | PASS | PASS |

1차에서 발견된 19건(글자수 18 + 답 공개 1)을 수정하고, 2차에서 전원 PASS 확인.

---

## 4. requiredLieState 검토 결과

현재 자동 배정 상태를 사건 맥락과 대조한 결과, **조정 불필요**.

| 등급 | 기준 | 해당 증거 (6건 공통 패턴) |
|---|---|---|
| S3 | 결정적 진실, 충분히 심문 후 접근 | requires+hard 증거 (family e-5, friend e-2/e-6, neighbor e-2/e-4, partnership e-2/e-5/e-6, tenant e-4/e-6, workplace e-3/e-6) |
| S2 | 맥락 확장 보조 증거 | requires+soft 증거 (family e-2, friend e-4, partnership e-4) |
| 없음 | 의심 유발 출발점 | 나머지 (게이팅 없이 즉시 접근 가능) |

각 사건의 서사 흐름상 S3 증거가 핵심 반전 포인트에 위치하고, S2 증거가 중간 맥락을 보강하며, 게이팅 없는 증거가 초반 의심을 유발하는 구조가 적절합니다.

---

## 5. 설계 패턴 요약

### revealKey 배정
- **stage 0** → `request_original` (36/36): 증거 원본 존재 확인
- **stage 1** → `check_metadata` (36/36): 시각/단말/주체 등 메타 속성
- **stage 2** → `restore_context` (30/36) 또는 `check_edits` (6/36): 숨겨진 맥락 또는 편집 흔적

### attackVector 분포
- `context` (상황/시간): 가장 많이 사용 — stage 0/1에서 주력
- `authenticity` (진위/조작): stage 2에서 주력
- `identity` (인물/주체): 주체 특정이 핵심인 증거에 사용
- `legality` (적법성): 취득 경위가 쟁점인 증거에 제한 사용

### check_edits를 stage 2에 사용한 증거 (6건)
- partnership-01 e-3 (크롭된 메신저 캡처)
- tenant-01 e-3 (중개사 포함 카톡 캡처)
- workplace-01 e-2 (태성 제출 PDF)
- workplace-01 e-5 (서윤 슬랙 캡처)

이 4개 증거는 "선택적 크롭/편집"이 핵심 발견이므로 restore_context 대신 check_edits가 적합합니다.

---

## 6. 미완료 / 후속 작업

- [ ] 컨트롤 타워: 6개 산출물을 case JSON에 병합
- [ ] spouse-01은 이미 완성됨 (참조 예시)
- [ ] 나머지 78건(84 - 6)은 별도 배치 작업 필요
