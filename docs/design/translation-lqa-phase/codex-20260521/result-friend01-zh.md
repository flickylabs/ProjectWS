# friend-01 zh-CN 적용 결과

작성일: 2026-05-21
브랜치: `codex/witness-cutscene-friend-zh`
대상: friend-01 ZH-CN witness overlay + cutscene slip phase2

## 변경 요약

- `src/data/witnessTestimonyData/localized.ts`
  - `FRIEND_01_OVERLAYS["zh-CN"]` 12개 slot을 새 KO 맥락에 맞게 갱신.
  - 호칭은 친근 발화에서 `多恩`, `秀敏`으로 정리.
  - 박준혁 증언의 `w2-d2-flirt-remark`에 `早就追了她` 반영.
  - 박준혁 증언의 `w2-d3-rejection-ignored`에 `故意装清高拒人` / `她迟早会松口的` 반영.
  - 오미경 증언의 `w3-d2-overheard-phrase`에서 주체를 `年长男性` / `年轻女子`로 명확화.

- `src/data/cutsceneText/friend-01/d-1.json` ~ `d-5.json`
  - `slip_explosive.phase2["zh-CN"]` placeholder를 새 dismay 톤으로 교체.
  - d-1~d-4는 최수민 시점, d-5는 송다은 시점으로 분리 반영.
  - 톤 가이드에 맞춰 `那个...` / `其实...`와 trailing `...` 유지.

- `src/data/scriptedText/friend-01.zh-CN.json`
  - mirror 검색 검토 완료.
  - 동일 stale placeholder, 박준혁 지정 오역, 오미경 주체 오역 패턴은 발견되지 않아 수정 없음.

## 검증

- `npx tsc -b --noEmit`: PASS
- `npm run qa:fast`: PASS
  - static P0=0
  - route P0=0
  - combined P0=0
- `node scripts/detect-truth-leak.cjs`: PASS
  - truth leak findings: 0
  - byLang: `{"ko":0,"en":0,"ja":0,"zh-CN":0}`

## 비고

- 최초 `npx tsc -b --noEmit` 실행 시 현재 worktree의 `node_modules`에 TypeScript가 없어 npx placeholder가 실행되었다.
- `package-lock.json` 기준 `npm ci`로 의존성을 설치한 뒤 동일 명령을 재실행해 통과 확인했다.
