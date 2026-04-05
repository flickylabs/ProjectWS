# Thread B 전달 메시지 — 77건 확장 미션

> 발신: 컨트롤 타워
> 수신: Thread B
> 일시: 2026-04-05

---

## 상황

Stage-1(대표 7건) evidence 안전성 교정과 DossierCard 검증이 완료되었다.
이제 나머지 77건(-02~-12)에 동일 작업을 확장한다.

## 미션

**미션 문서**: `thread-packages/thread-B/mission-77expansion.md`

두 가지 작업을 배치 단위(7건/배치, 총 11배치)로 동시 처리해라:

1. **evidence 안전성 교정** — surfaceName/surfaceDescription에서 기관명, 실명, 핵심 진실, 번역체 제거
2. **DossierCard 질문 검증** — q1/q2/q3 단계별 truthLevel 정합성, requiredLieState 적절성, 번역체/금지어 검수

## 핵심 규칙

- **기준본(-01)은 건드리지 마라** — 이미 완료
- GPT Pro 프롬프트는 미션 문서에 복사용으로 준비해 뒀다
- GPT Pro 출력은 반드시 이중 검증 (특히 번역체 탐지)
- 배치별로 검증 체크리스트 7항목 전부 확인 후 다음 배치로

## 참조 파일

| 파일 | 용도 |
|------|------|
| `src/data/cases/generated/{case}.json` | evidence 필드 교정 대상 |
| `docs/ref/리뉴얼참고/gpt-batch/{case}/{case}-v3-game-loop-data.json` | DossierCard 검증 대상 |
| `src/data/cases/generated/spouse-01.json` | evidence 기준본 |
| `docs/ref/리뉴얼참고/gpt-batch/spouse-01/` | DossierCard 기준본 |
| `docs/ref/리뉴얼참고/stage1-master-guide-for-expansion.md` | Stage-1 교정 전체 내역 |

## 배치 순서

spouse-02~08 부터 시작. 미션 문서의 배치표 참조.

## 보고

배치 완료 시마다 교정 건수와 주요 패턴을 CT에 보고.
전체 완료 후 최종 리포트 제출.

---

작업 시작해라.
