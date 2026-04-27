# Codex-Dev A · B 공통 — 본인 작업 영역 commit + push 요청

(사용자 명시 메시지 — 그대로 두 세션에 전달)

---

현재 working tree에 Free Interrogation MVP/Guard 작업 결과가 남아 있습니다. 산출물 리포트상 구현과 검증은 거의 완료된 것으로 보이지만 commit이 되지 않아 다른 세션 진입 조건이 실패하고 있습니다.

각자 본인 작업 영역을 확인하고 commit + push 해 주세요.

## 필수 검증
- `git status --short --branch`
- `npm run check:all`
- `npm run build`
- `npx tsc -b --force`

## 대상 dirty
- `src/components/actions/QuestionSelector.tsx`
- `src/components/pc/hotbar/PCBottomDock.tsx`
- `src/engine/llmDialogueResolver.ts`
- `src/engine/llmFreeQuestion.ts`
- `src/hooks/useActionDispatch.ts`
- `src/types/dialogue.ts`
- `src/types/index.ts`
- `src/components/freeInterrogation/`
- `src/engine/freeInterrogation/`
- `src/types/freeInterrogation.ts`
- `src/types/freeInterrogationGuard.ts`
- `tmp/qa-codex-dev-a-freeinterrogation-results/`
- `tmp/qa-codex-dev-b-freeinterrogation-guard-results/`

## 주의
- 상대 세션 영역을 임의로 stage하지 마세요.
- 같은 파일에 A/B 변경이 섞여 있으면 **분리하지 말고 CT-Main에 보고**하세요.
- `stash`, `discard`, `reset` 금지.
- `pc.css`는 건드리지 마세요.

검증 PASS 후 commit + push하고 CT-Main에 결과 보고해 주세요.

## Fallback (이 영역 도달 시 보고만, 직접 진행 X)

본인 회수 불가 또는 파일 단위 분리 불가 시 → 별도 `FreeInterrogation Integration Finalize` 세션이 통합 commit으로 정리합니다. (의뢰서 영역: `tmp/REQUEST-FreeInterrogation-Integration-Finalize.md`)
