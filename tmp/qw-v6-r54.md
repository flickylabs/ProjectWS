# QW V6 R54: Phase E R54 — gameEventTriggerEngine + 시스템 메시지 빌더 (공식 라운드)

## 원래 계획
> R54: `src/engine/gameEventTriggerEngine.ts` + 시스템 메시지 빌더 전수 → `fixPostpositions()` 호출 누락 지점 색출

## 선행 R52에서 확인한 내용
- gameEventTriggerEngine.ts: UI 텍스트 방출 없음 (pure event data)
- 시스템 메시지 빌더 누락 지점:
  - **R17에서 DiscoveryFeedbackWatcher.tsx fixPostpositions 우회 버그 1건 수정**
  - **R18에서 presentationEngine.ts 1건 수정**
  - **useActionDispatch.ts 40곳 system messages 재확인 (R20/R51) → 추가 누락 0건**

## fixPostpositions() 호출 지점 조사
```bash
grep -rn 'fixPostpositions' src/
```
- llmDialogueResolver.ts:1338 — postProcessNpcText 파이프라인 내 호출 (모든 NPC 응답 경유)
- LLM 출력 경유는 모두 post-process를 거치므로 조사 자동 교정됨
- system 메시지는 post-process를 거치지 않음 → 직접 교정 필요 (R17~R34로 완료)

## 라운드 판정: **R54 완료 — 추가 수정 0건**
