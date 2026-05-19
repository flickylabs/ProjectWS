# PC QA Round 2 Follow-up Batch Result

- 기준 브랜치: `main`
- 기준 커밋: `0cecfde9`
- 작업 브랜치: `codex/pc-qa-round2-followup`
- 작업 worktree: `d:\ProjectWS-codex-pc-qa-round2-followup`

## 요약

요청된 3개 영역을 통합 처리했다.

- B-7 `combine-3` 체인을 `e-5 + e-3`에서 `e-5 + e-6`으로 변경했다. 통화기록 `e-3`은 더 이상 은행 직원 unlock chain에 관여하지 않는다.
- B-5 `a-e-5-*` variants는 KO/EN/JA/ZH-CN 각각 105개를 전수 확인하고 동기화했다. KO는 목적지 확정처럼 읽히던 `a-e-5-late-both-v1`만 보정했고, EN/JA/ZH-CN은 KO 의미에 맞춰 자연화했다.
- 64724457에서 KO만 반영됐던 PC UI/LQA 문구를 EN/JA/ZH-CN에 동기화했다.
- `Phase6_Mediation.tsx`의 인라인 KO는 i18n 키로 추출했다. `DiscoveryFeedbackWatcher.tsx`는 현재 렌더링 경로가 runtime localization을 거치므로 이번 batch에서는 별도 추출하지 않고 후속 권장으로 남겼다.

## 영역 3 - B-7

대상:

- `src/data/cases/generated/spouse-01.json`
- `src/data/cases/generated/spouse-01.en.json`
- `src/data/cases/generated/spouse-01.ja.json`
- `src/data/cases/generated/spouse-01.zh-CN.json`

변경:

- `combine-3.inputs`: `["e-5", "e-3"]` -> `["e-5", "e-6"]`
- `combine-3.discoveryText`: 개인 계좌 출금과 투자방 송금의 자금 흐름 비교로 4언어 재작성

확인:

- `dc-4` output recipe는 1개로 유지된다.
- `w-2` 은행 직원은 `unlockedByDossier: ["dc-3", "dc-4"]` 상태로 유지된다.
- 기존 통화기록 기반 문구는 generated sidecar에서 제거됐다.
- truth-leak 검사는 기준선인 `family-01` 3건만 유지됐다.

## 영역 2 - B-5

대상:

- `src/data/scriptedText/spouse-01.json`
- `src/data/scriptedText/spouse-01.en.json`
- `src/data/scriptedText/spouse-01.ja.json`
- `src/data/scriptedText/spouse-01.zh-CN.json`

변경:

- 각 언어 `a-e-5-*` variant 105개 유지 확인.
- EN/JA/ZH-CN은 기존 반복형 문장을 KO 원문의 lieState 흐름에 맞춰 전수 교체했다.
- KO `a-e-5-late-both-v1`은 "돈이 어디로 갔는지"를 이미 안다는 식의 확정 뉘앙스를 제거하고, "돈이 빠져나간 사실"을 알고 있었다는 표현으로 수정했다.
- 이준호 개인 계좌 출금 사실을 알고 있는 박지연의 캐릭터 일관성은 유지하되, 돈의 최종 행선지를 선공개하지 않도록 정리했다.

## 영역 1 - 다국어 Sync

64724457 KO 적용분 중 다국어 동기화가 필요한 문구를 반영했다.

- `src/data/scriptedText/spouse-01*.json`: `judgeq-d-1-motive_search-2-v1` 4언어 sync
- `src/i18n/messages/court.ts`: verdict advance 문구 sync 및 mediation entry 신규 키 추가
- `src/i18n/messages/hotbar.ts`: ZH-CN 판결 진행 문구 sync
- `src/i18n/messages/layout.ts`: combination mediation summary sync
- `src/i18n/messages/tutorial.ts`: 질문 선택/증거 제시 튜토리얼 문구 sync

인라인 KO 컴포넌트 결정:

- `DiscoveryFeedbackWatcher.tsx`: PC가 KO-only라는 뜻은 아니다. 이 컴포넌트가 생성한 runtime feedback/dialogue 텍스트는 `EventFeedbackCard`와 `PCDialogueLog`에서 `localizeRuntimeText(...)`를 거친다. 다만 message-key 기반 i18n보다 추적성이 낮으므로 후속으로 runtime pattern coverage 점검 또는 key migration을 권장한다.
- `Phase6_Mediation.tsx`: 직접 JSX와 dialogue에 KO literal을 렌더링하고 있어 i18n 추출이 필요하다고 판단했다. 이번 batch에서 `useI18n()`과 `pc.mediation.entry.*` 키로 추출 완료했다.

## 검증

| 명령 | 결과 | 비고 |
| --- | --- | --- |
| `npm ci` | 통과 | worktree에 `node_modules`가 없어 lockfile 기준 설치. npm audit은 기존 의존성 취약점 3건을 보고함. |
| `npx tsc -b --noEmit` | 통과 | TypeScript 오류 없음. |
| `npm run qa:fast` | 통과 | static P0=0, route P0=0, combined P0=0. |
| `node scripts/detect-truth-leak.cjs` | 통과 | findings=3, `byCase={"family-01":3}`, `byLang={"ko":3,"en":0,"ja":0,"zh-CN":0}`. |
| `npm run qa:lqa` | 실패(기존 strict 이슈) | `verify-translations.cjs --strict --scan-applied`에서 누적 LQA 이슈 60,463건으로 실패. placeholder/glossary/system tone 문제는 0건. |

## 비고

- `qa:lqa` 실패로 생성된 `verify-report.json`/`truth-leak-report.json` 부산물은 커밋 대상에서 제외했다.
- 메인 worktree의 기존 untracked `docs/localization/non-dialogue-extract/truth-leak-report.json`은 건드리지 않았다.
