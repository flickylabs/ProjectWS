# Thread W → CT: Initial Deliverables

> 작성일: 2026-04-10
> 상태: 준비 산출물 작성 완료

## 제출 산출물
- 표준 ScriptedText 템플릿:
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- Phase 1/2 생성 템플릿:
  - `docs/ref/scripted-text/thread-w-phase12-gpt-pro-template.md`
- `spouse-05` 수동 품질 샘플링:
  - `docs/ref/scripted-text/thread-w-spouse-05-level4-audit-2026-04-10.md`

## 판정

### 1. 표준 템플릿
- 판정: **PASS**
- 의미:
  - Thread W가 사건별 intake만 채우면 바로 GPT Pro 세션 4개로 분할 실행 가능
  - spouse-01 파일럿 규칙을 범용화했음
  - `질문 원문 복붙`, `witness 서술자 문장`, `aftermath 요약문`을 금지 규칙으로 명시했음

### 2. Phase 1/2 템플릿
- 판정: **PASS**
- 의미:
  - 초기 진술/반박 진술을 별도 경로로 생성 가능
  - `anchorTruth` 스포일러 차단, `phase1 < phase2` 감정 곡선, `callTerms` 규칙을 고정함

### 3. spouse-05 샘플링
- 판정: **REVISE**
- 의미:
  - 현재 `src/data/scriptedText/spouse-05.json`은 validator PASS지만 Level 4는 FAIL
  - 반복 scaffold, dossier 질문 복붙, witness narrator voice, aftermath 범용 요약문이 확인됨
  - 이 케이스는 Thread W의 첫 번째 **재생성 회귀 테스트**로 쓰는 것이 적절함

## 권고
- Story Gate 통과 사건이 들어오면, 현 생성기 산출물을 그대로 polish하지 말고 **GPT Pro 재생성 + 로컬 merge** 방식으로 진행하는 것이 맞다.
- 첫 파일럿은 `spouse-05`가 적절하다.
  - 활성 사건
  - 실패 패턴이 명확함
  - 배우자 카테고리라 callTerms/톤 규칙 검증이 쉽다

## 다음 액션 제안
1. CT 또는 Thread S가 `spouse-05` Story Gate 시작 여부를 확정한다.
2. Thread W가 `thread-w-gpt-pro-standard-template.md` 기준으로 Session 1~4를 실행한다.
3. Thread W가 `thread-w-phase12-gpt-pro-template.md` 기준으로 Phase 1/2를 생성한다.
4. Thread G는 CT가 지정한 주입 경로가 확정된 뒤 merge/assembly를 수행한다.

## 한 줄 결론
- **Thread W는 준비 완료**다.
- **현재 spouse-05 번들은 출시 품질이 아니므로 그대로 쓰면 안 된다.**
