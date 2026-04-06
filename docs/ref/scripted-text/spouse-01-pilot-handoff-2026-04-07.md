# spouse-01 Scripted Text Pilot Handoff

## 목적
- `spouse-01` 파일럿을 다른 PC에서 동일하게 이어서 작업할 수 있도록 현재 상태를 기록한다.
- 이번 파일럿의 목표는 `LLM 0건` 전환을 위한 첫 케이스 번들, 스키마, validator를 확정하는 것이다.

## 완료된 산출물
- 스키마: [src/types/scriptedText.ts](/E:/GameProject/ProjectWS/src/types/scriptedText.ts)
- 타입 export 추가: [src/types/index.ts](/E:/GameProject/ProjectWS/src/types/index.ts)
- validator: [tests/validate-scripted-text.cjs](/E:/GameProject/ProjectWS/tests/validate-scripted-text.cjs)
- GPT Pro 프롬프트: [docs/ref/scripted-text/spouse-01-gpt-pro-prompt.md](/E:/GameProject/ProjectWS/docs/ref/scripted-text/spouse-01-gpt-pro-prompt.md)
- 참고 대사 패키지: [docs/ref/scripted-text/spouse-01-reference.json](/E:/GameProject/ProjectWS/docs/ref/scripted-text/spouse-01-reference.json)
- 파일럿 번들: [src/data/scriptedText/spouse-01.json](/E:/GameProject/ProjectWS/src/data/scriptedText/spouse-01.json)

## 현재 검증 상태
- 실행 명령:
```powershell
node tests/validate-scripted-text.cjs --case spouse-01
```
- 현재 결과:
```text
summary={"WARN":185}
```
- 의미:
  - `FAIL 0`
  - `ERROR 0`
  - `CRITICAL 0`
  - 남은 것은 전부 `D2 variant 유사도` 경고
- 추가 확인:
  - `spouse-01.json` 안의 `?` placeholder는 제거 완료
  - `validator` 기준으로 파일럿 통과 상태

## 이번 파일럿에서 확정된 채널 키 구조
- `interrogation`: `party|disputeId|lieState|questionType`
- `evidence_present`: `party|evidenceId|lieBand|subjectRole`
- `dossier`: `party|dossierQuestionId|lieBand`
- `witness`: `witnessId|depth`
- `aftermath`: `resultClass`
- `system_message`: `context|eventType`

## validator가 현재 검사하는 항목
- schema coverage
- key uniqueness
- Truth Throttle
- 비금전 사건 금전 오염
- 해요체 잔존
- 번역체/클리셰
- 호칭 규칙
- 문장 수
- `evidence_present`의 증거 직접 반응 여부
- variant trigram similarity 경고

## 참고 자료 생성 원칙
- 기반 transcript: `tests/transcripts/spouse-01-r1-v3.json`
- 포함 기준:
  - `PASS` 또는 `WARN`
  - `fallback`, `401`, `too short` 제외
  - `questionType`와 `lieState` 기준으로 참고용 선별

## spouse-01 번들 상태 요약
- `interrogation`: 180 keys, key당 5 variants
- `evidence_present`: 36 keys, key당 5 variants
- `dossier`: 54 keys, key당 3 variants
- `witness`: 12 keys, key당 3 variants
- `aftermath`: 5 keys, key당 2 variants
- `system_message`: 6 keys, key당 2 variants

## 다음 작업 권장 순서
1. CT가 [src/engine/scriptedTextLoader.ts](/E:/GameProject/ProjectWS/src/engine/scriptedTextLoader.ts)에 lazy load + recent exclusion 로더를 붙인다.
2. CT가 [src/engine/llmDialogueResolver.ts](/E:/GameProject/ProjectWS/src/engine/llmDialogueResolver.ts) 최상단에 `tryScriptedDialoguePath()`를 연결한다.
3. CT가 [src/store/useGameStore.ts](/E:/GameProject/ProjectWS/src/store/useGameStore.ts)에 `recentScriptIds` 추적을 붙인다.
4. spouse-01 통합 테스트 후, 같은 파이프라인을 `spouse-*` 카테고리로 확장한다.

## 다른 PC에서 바로 재현하는 방법
1. repo를 같은 commit/working tree 상태로 가져온다.
2. 아래 파일들이 모두 존재하는지 확인한다.
```powershell
dir src\types\scriptedText.ts
dir tests\validate-scripted-text.cjs
dir docs\ref\scripted-text\spouse-01-gpt-pro-prompt.md
dir docs\ref\scripted-text\spouse-01-reference.json
dir src\data\scriptedText\spouse-01.json
```
3. validator를 다시 실행한다.
```powershell
node tests/validate-scripted-text.cjs --case spouse-01
```
4. `summary={"WARN":185}` 또는 경고만 남는 상태면 동일 상태다.

## 주의점
- `npx tsc -b --pretty false`는 현재 repo 전체의 기존 타입 오류 때문에 실패한다.
- 이번 파일럿 산출물 자체 문제라기보다 아래 파일들에 이미 누적된 타입 이슈가 크게 존재한다.
  - [src/app/App.tsx](/E:/GameProject/ProjectWS/src/app/App.tsx)
  - [src/store/useGameStore.ts](/E:/GameProject/ProjectWS/src/store/useGameStore.ts)
  - 그 외 다수 UI/스토어 파일
- 따라서 다른 PC에서 빌드 실패가 나와도, 우선 `scriptedText` 파일럿 상태와는 분리해서 봐야 한다.

## git 상태 메모
- 이번 작업 외에도 worktree에는 다른 변경이 섞여 있을 수 있다.
- 파일럿 자체의 핵심 산출물은 위 5개 파일과 `src/types/index.ts` export 추가다.

## Codex 연속성 메모
- Codex가 클라우드에서 같은 방식으로 작업을 이어갈 수는 있다.
- 다만 자동으로 “현재 PC의 로컬 워크스페이스 상태”가 새 PC에 복제되지는 않는다.
- 따라서 아래 두 가지가 필요하다.
  - repo 변경분이 새 PC에도 존재할 것
  - 이 handoff 문서 같은 작업 기록이 남아 있을 것
- 대화 세션이 그대로 이어지지 않더라도, 이 문서와 파일 산출물이 있으면 다른 PC에서 거의 같은 지점부터 다시 시작할 수 있다.

## 한 줄 요약
- `spouse-01` 파일럿은 스키마, validator, reference, GPT Pro prompt, bundle까지 완료
- validator 기준 통과
- 다음 단계는 CT의 로더/훅 연동과 `spouse` 카테고리 확장
