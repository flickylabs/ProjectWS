# CT Message — Combination Lab V2.1 Update

조합 실험실 V2.1 관련 변경을 반영했습니다.

핵심은 세 가지입니다.

1. `CaseData.combinationLab` 타입과 V2.1 결과 타입을 추가했습니다.
   - unlock-only가 아니라 `upgrade / reframe / split / merge`까지 포함합니다.

2. `headline-01`에 실제 `combinationLab` 파일럿 데이터를 넣었습니다.
   - `analysisPointsBase 8`
   - `nodes 25 / outputs 12 / recipes 12`
   - 입력/출력 참조 누락은 `0`입니다.

3. store 최소 동작과 UI 최소 경로를 연결했습니다.
   - `runCombinationRecipe()`로 노트/질문/진술/증거/쟁점 변화가 기록됩니다.
   - UI는 `DisputeBoard` 아래의 임시 `CombinationLabPanel`로 최소 실행만 붙였습니다.
   - 최종 UX 확장은 Thread B가 이어받도록 별도 인계 문서를 작성했습니다.

상세 보고:
- [D:\ProjectWS\docs\ref\scripted-text\message-to-ct-combination-lab-detailed-2026-04-10.md](D:/ProjectWS/docs/ref/scripted-text/message-to-ct-combination-lab-detailed-2026-04-10.md)

Thread B 인계:
- [D:\ProjectWS\docs\ref\scripted-text\message-to-thread-b-combination-lab-ui-handoff-2026-04-09.md](D:/ProjectWS/docs/ref/scripted-text/message-to-thread-b-combination-lab-ui-handoff-2026-04-09.md)

누적 로그:
- [D:\ProjectWS\docs\ref\scripted-text\thread-a-combination-lab-worklog.md](D:/ProjectWS/docs/ref/scripted-text/thread-a-combination-lab-worklog.md)

주의:
- 이번 변경은 조합 실험실 데이터/store/UI 최소 경로 기준으로 정리한 것이고, 전체 타입체크/전체 빌드는 워크스페이스의 기존 오류와 분리해서 봐야 합니다.

