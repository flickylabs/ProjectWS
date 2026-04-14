# Codex 작업 지시

## 먼저 읽을 파일 (순서대로)
1. `docs/requests/codex-trait-ui/메시지.md` — 전체 작업 명세
2. `src/engine/judgeProgressionEngine.ts` — 조각/인벤토리/강화/변환 API
3. `src/engine/judgePerks.ts` — 퍼크 정의 및 해금 조건
4. `src/data/leaderboard.ts` — loadProgressionState/saveProgressionState
5. `src/app/pc.css` 하단 — 기존 미니게임/이펙트 CSS 스타일 참고

## 작업 내용
3개 React 컴포넌트 신규 생성:
1. `src/components/pc/profile/PCTraitEnhancePanel.tsx` — 6성향 강화 + 조각 변환
2. `src/components/pc/profile/PCPerkEquipPanel.tsx` — 퍼크 장착/해제
3. `src/components/pc/result/PCFragmentRewardOverlay.tsx` — 결과 화면 조각 획득 연출

9종 조각 SVG 아이콘 inline 제작 포함.
CSS는 `src/app/pc.css` 하단에 추가.

## 주의사항
- `src/store/` 파일은 수정하지 마세요 — 스토어 변경은 CT가 직접 처리합니다
- 컴포넌트는 `loadProgressionState()` / `saveProgressionState()`로 직접 localStorage 읽기/쓰기
- 빌드 확인: `npx tsc -b --force` 통과 필수
