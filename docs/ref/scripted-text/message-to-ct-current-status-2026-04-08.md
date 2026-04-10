# Message To CT - 2026-04-08 Current Status

현재 메인 스레드 상태는 아래와 같습니다.

## 1. Headline staged pipeline
- `headline-02`는 이제 generic stage script를 통해 재생성됩니다.
- 현재 경로:
  - [headline-spec-compiler.cjs](/d:/ProjectWS/scripts/lib/headline-spec-compiler.cjs)
  - [headline-stage1a-runtime.cjs](/d:/ProjectWS/scripts/headline-stage1a-runtime.cjs)
  - [headline-stage1b-v3.cjs](/d:/ProjectWS/scripts/headline-stage1b-v3.cjs)
  - [headline-stage2-scripted-bootstrap.cjs](/d:/ProjectWS/scripts/headline-stage2-scripted-bootstrap.cjs)
  - [headline-02-run-pipeline.cjs](/d:/ProjectWS/scripts/headline-02-run-pipeline.cjs)
- 검증 결과:
  - [headline-02-stage3-validate.txt](/d:/ProjectWS/tmp/headline-02-stage3-validate.txt)
  - 결과는 `summary={}` / `PASS`

## 2. Shared scripted stage 상태
- `runtime`과 `V3`는 공용 compiler로 분리 완료입니다.
- `scripted`는 아직 완전 범용 본문 생성기가 아닙니다.
- 현재는 `공용 진입점 + spec builder / legacy stage2 dispatcher` 구조입니다.
  - [build-headline-scripted-bundle.cjs](/d:/ProjectWS/scripts/lib/build-headline-scripted-bundle.cjs)
- 즉, 파이프라인 공용화는 됐고, scripted content의 완전 범용화는 다음 단계입니다.

## 3. Thread-D 결과
- 84개 원안 salvage 분류 완료
  - [thread-d-84-case-salvage-matrix.md](/d:/ProjectWS/docs/ref/scripted-text/thread-d-84-case-salvage-matrix.md)
- top12 및 immediate pilot 6 완료
  - [thread-d-84-case-salvage-top12.md](/d:/ProjectWS/docs/ref/scripted-text/thread-d-84-case-salvage-top12.md)
- immediate pilot 6:
  - `case-spouse-11`
  - `case-friend-03`
  - `case-tenant-02`
  - `case-work-11`
  - `case-partner-09`
  - `case-neighbor-08`

## 4. 지금 막 시작한 다음 작업
- pilot 1인 `case-spouse-11`을 실제 리라이트 입력본으로 내리는 중입니다.
- 산출 대상:
  - [pilot-spouse-11-authoring-spec-v1.json](/d:/ProjectWS/docs/ref/scripted-text/pilot-spouse-11-authoring-spec-v1.json)
- 목표:
  - 기존 원안을 `CaseAuthoringSpec` 기준으로 다시 구조화
  - 빌런 vs 빌런
  - 현재의 불법 접근 공방과 과거의 공동 보험 사기 공모를 분리
  - 재판관 성향 분화가 가능한 딜레마 축 확보

## 5. CT가 지금 보면 되는 것
- staged pipeline 쪽은 `headline-02` PASS가 현재 기준점입니다.
- 84개 salvage 쪽은 Thread-D 산출물 2개가 최신입니다.
- 메인 제작 쪽은 `pilot-spouse-11-authoring-spec-v1.json` 생성 시점부터 다시 follow 하면 됩니다.
