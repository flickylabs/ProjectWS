# CT 확인 요청용 메시지

CT는 이번 확인에서 아래 문서 하나만 먼저 보면 됩니다.

- [codex-to-ct-headline-status-response.md](/d:/ProjectWS/docs/ref/리뉴얼참고/codex-to-ct-headline-status-response.md)

그리고 `headline-01`의 현재 실물 상태는 아래처럼 이해하면 됩니다.

## 현재 상태
- `headline-01 scriptedText`는 현재 `PASS`입니다.
- 최신 validator 로그는 [headline-01-stage3-validate.txt](/d:/ProjectWS/tmp/headline-01-stage3-validate.txt)입니다.
- `headline-01 runtime case data`에는 이제 `baseEvidenceIds`, `monetaryDisputeIds`뿐 아니라 `evidence.meta`, `evidence.viewerData`도 들어가 있습니다.
- PC 증거 뷰어는 더 이상 데모 데이터만 보지 않고, runtime case data의 `viewerData/meta`를 우선 읽습니다.

## CT가 지금 확인하면 되는 것
1. `headline-01`을 실제로 로드했을 때 게임이 뜨는지
2. 증거 6개가 PC 증거 뷰어에서 runtime data로 열리는지
3. scripted line이 실제 gameplay에서 key mismatch 없이 붙는지
4. 이후 `headline-02`로 넘어가기 전에 `headline-01`을 기준 케이스로 승인할 수 있는지

## 참고
- 진행 상태 파일은 [codex-progress-status.json](/d:/ProjectWS/tmp/codex-progress-status.json)입니다.
- 다만 이번부터는 상태 파일만 보지 말고, 위의 `codex-to-ct-headline-status-response.md`를 같이 보십시오.
- 이유는 상태 파일은 단계/로그 중심이고, 실제 완성도 판정은 설명 문서 쪽이 더 정확하기 때문입니다.

## headline-01 현재 판정
- `scripted`: 검증 완료
- `runtime`: 통합 실행 가능
- `viewer`: runtime data 연결 완료
- `final content sign-off`: 아직 CT gameplay smoke test가 남아 있음

즉, CT는 지금 `headline-01`을 실제로 돌려 보는 단계로 들어가면 됩니다.
