# C스레드 → 다음 스레드 인수인계 (C2)

> 작성일: 2026-04-03
> 이전 문서: thread-handoff-C.md
> 브랜치: `ui-phase3-overhaul` (main + A스레드 V2 엔진 + C스레드 데이터)

---

## 1. V1 배치 현황 — 완료

- 84개 사건 전체 등록 + 검증 + 교정 완료
- tells-beats 재생성 18건 완료 (round-1 ~ round-6)
- 최종 커밋: `e1d3556`
- 미커밋 변경:
  - 정밀검수 교정 136건
  - "다만" 과용 60건 제거
  - round-6 교체

---

## 2. V2 방향 변경

- **beats-v2-full 사용 안 함** (보존만)
- **structure-v2만 사용** → V2 메커닉 활성화
- LLM이 대사 생성, 엔진이 톤/층위/모드 제어

---

## 3. V2 structure-v2 검증 현황

84건 전수 검증 완료.

### 정규화 완료

| 항목 | 건수 |
|------|------|
| caseId 하이픈 정규화 | 16파일 |
| core층 S4 상향 | 51건 |
| clarifyOutcomeLabel | 104건 |
| atomId V1 매핑 | 1,357건 (64사건) |

### 미해결

- **red_herring 부재 41건** → GPT 재생성 준비 완료 (`gpt-batch-v2-regen/` 11라운드)
- **spouse-01, family-01 atomId 매핑 불가** — V1 atoms 파일 부재

---

## 4. 주의사항 — 놓치기 쉬운 것

### 4-1. V2 등록 모듈이 아직 없음
- V1 등록 모듈(84개)은 완료. `src/data/claimPolicies/{{CASE}}.ts`에 `registerXXXData()` 함수로 V1 데이터를 등록
- **V2 structure-v2는 아직 코드에 통합되지 않음**
- 각 등록 모듈에 `registerStructureV2()` 호출을 추가해야 함
- `import { registerStructureV2 } from '../../engine/v2DataLoader'` 필요
- structure-v2 파일은 현재 `gpt-batch-v2/round-XX/output/`에 있으므로, `src/data/claimPolicies/`로 이동하거나 import 경로 결정 필요

### 4-2. spouse-01, family-01은 별도 구조
- 이 2개는 GPT 배치가 아닌 수동으로 만든 V1 데이터
- V1 tells-beats: `gpt-batch/` 폴더에 없고 `gpt-session1/output/` 등에 위치
- V1 v2-atoms: `src/data/claimPolicies/spouse-01-v2-atoms.json` 또는 별도 경로
- V2 atomId 매핑 스크립트가 이 2개를 SKIP했으므로 수동 처리 필요
- 다만 spouse-01, family-01은 A스레드에서 V2 파일럿으로 이미 적용돼 있으므로 별도 확인

### 4-3. beats-v2-full은 보존만
- 삭제하지 않음
- 등록 모듈에서 `registerBeatsV2()` 호출을 **넣지 않아야 함** (V2 방향 변경)
- 향후 V3에서 점진 적용 예정

### 4-4. 브랜치 상태
```
main:
  e1d3556  feat: V1 84개 사건 완료 + 재생성 18건 + 정밀검수 교정 + V2 배치 준비
  34d3dbb  feat: V2 하이브리드 전환 (A스레드)

ui-phase3-overhaul (현재):
  d5734a4  feat: V2 structure-v2 84건 검증+정규화 + red_herring 재생성 준비
```
- 이 브랜치에 V1 정밀검수 교정 + V2 정규화가 모두 포함됨
- main 머지 전 빌드 확인 필요

---

## 5. 다음 스레드에서 할 일

1. **V2 red_herring 재생성** GPT 실행 (11라운드, `gpt-batch-v2-regen/`)
2. 재생성 결과 교체 + 검증 (structure-v2 내 disputeKind + misconception 블록)
3. **spouse-01, family-01 atomId 수동 매핑** (V1 atoms 경로 확인 후)
4. **V2 structure-v2 파일 배치 결정** — `src/data/claimPolicies/`로 이동 or import 경로 설정
5. **V2 등록 모듈 업데이트** — 84개 등록 함수에 `registerStructureV2()` 조건부 호출 추가
6. 빌드 확인 + main 머지 + 커밋
7. A스레드에 전달 → 엔진 시뮬레이션 2차 검증

---

## 5. 파일 위치 요약

```
V1 배치 데이터:       docs/ref/리뉴얼참고/gpt-batch/
V1 재생성:           docs/ref/리뉴얼참고/gpt-batch-regen/
V2 배치 데이터:       docs/ref/리뉴얼참고/gpt-batch-v2/round-{01~21}/output/
V2 재생성 준비:       docs/ref/리뉴얼참고/gpt-batch-v2-regen/regen-round-{01~11}/
등록 모듈:           src/data/claimPolicies/
Store:              src/store/useGameStore.ts
정규화 스크립트:      tests/normalize-gpt-batch.cjs
atomId 매핑 스크립트:  scripts/map-atom-ids.py
교정 가이드:         docs/ref/리뉴얼참고/gpt-batch/correction-guide.md
V2 검증 보고서:       docs/ref/리뉴얼참고/gpt-batch-v2/V2-structure-검증-보고서.md
V2 beats 검증 보고서:  docs/ref/리뉴얼참고/gpt-batch-v2/V2-검증-보고서.md
스레드 A 연동 문서:    docs/ref/리뉴얼참고/thread-sync-V2-requirements.md
```

---

## 6. 참고 문서 목록

- `thread-handoff-B.md` — 원본 배치 계획
- `thread-handoff-C.md` — C스레드 초기 인수인계
- `gpt-regen-needed.md` — V1 재생성 목록
- `correction-guide.md` — V1 대사 교정 기준
