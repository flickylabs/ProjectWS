# Codex Main Handoff — Tier 3 Guard MVP / Phase 0

작성: Codex Main Dev
작성일: 2026-04-27
범위: Tier 0/1/2 완료 이후 QA, P1 stabilization, Tier 3 disclosure guard MVP, Phase 0 운영 진입 인계

이 문서는 Codex-Dev A/B 작업 세션이 아니라, 사용자와 CT 사이에서 조율한 메인 Codex-Dev 세션의 최종 이관 문서다.

---

## 현재 Git 상태

- 최종 HEAD: `bd46418 fix(disclosureGuard): catch 보내신 honorific inflection in family-01 paraphrase`
- `origin/main` sync 완료: `main...origin/main`, ahead 0
- 최근 흐름:
  - `bd46418` Dev-B follow-up FN 1건 정밀 catch
  - `f03f49f` Tier 3 disclosure guard MVP
  - `acf5d27` Dev-A ScriptedText P1 stabilization
  - `2e527bd` Dev-A UI surface labels + archetype fallback
  - `4e0a1b6` policy hardening + uiSurfaceMap surface
  - `db0130e` Tier 2 QA TC 문서화
  - `5378700` 이전 handoff 기준
- baseline tags:
  - `baseline-pre-policy-v1` -> target `a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3`
  - `baseline-pre-policy-v2` -> target `acf5d27bd45fe8a43d03c0d2a35b16ad1ae6dfa8`

현재 dirty / untracked:

- `M src/app/pc.css`
  - UI 서브 스레드 토큰 일괄 통일 작업 영역.
  - Dev-B follow-up 검수 중 CT가 의미 변화 0 형식 정정 영역으로 확인.
  - 메인 Dev / Tier 3 / disclosure guard 작업에서 건드리면 안 됨.
- `tmp/REQUEST-Codex-DevA-P1-Stabilization.md`
- `tmp/REQUEST-Codex-DevB-Tier3-Guard-MVP.md`
- `tmp/REQUEST-Codex-DevB-followup-fn-fix.md`
- `tmp/qa-*` 결과 디렉터리 / CT-Cross detector 임시 파일들
- `tmp/cutscene-mockup-v1.html`
  - 별도 untracked 산출물. 다음 세션에서 필요 시 사용자에게 성격 확인.

---

## 완료 상태

### Tier 0/1/2

- Tier 0 baseline freeze 완료.
- Tier 1 disclosure policy 3 active case 완료.
- Tier 2 validation wrappers 완료.
- `npm run check:all` 기준:
  - hard 0
  - policy warnings 157 baseline-known
  - legacy precheck warn 1 baseline-known

중요 판단:

- warning 157건은 hard fail 아님.
- `forbiddenLexemes.surfaceOnly`는 기본 WARN.
- `surfaceName alias`는 보호 alias일 수 있어 hard fail 아님.
- wrapper의 실제 ScriptedText 비교 기준은 git HEAD. working tree ScriptedText 변경은 v3-stage-aware hard를 낼 수 있으나 commit 후 새 HEAD 기준으로 PASS 가능.

### QA / Policy Hardening

- Tier 3 전 QA에서 paraphrase truth-leak exact-match 한계 확인.
- CT-Main이 `docs/disclosure-policy.md`에 paraphrase set, gating 조건, uiSurfaceMap surface 보강.
- Thread-QC 검수 WARN 8건 반영 완료.
- `CLAUDE.md` / `docs/qa-functional.md` TC-A3 stale spec 정정:
  - 현재 엔진은 soft/hard 2 tone.
  - mid tone은 Tier 4+ 보류.
  - evidence_present는 depth 0~2.

### Dev-A: P1 Stabilization

완료 commits:

- `2e527bd fix(ui): stabilize surface labels and archetype fallback`
- `acf5d27 fix(scripted): correct p1 stabilization text variants`

내용:

- ScriptedText 23 unique entries 보정.
- UI 무분기 P1 누설 후보 안정화.
- archetype 영문 fallback mapping 헬퍼 추가.
- `baseline-pre-policy-v2` tag는 `acf5d27` 기준.

검증:

- `npm run check:all` PASS hard 0 / warnings 157.
- 9차원 의미 보존 sample 검수 PASS.

### Dev-B: Tier 3 Disclosure Guard MVP

완료 commit:

- `f03f49f feat(engine): tier-3 disclosure guard MVP — log mode + feature flag default off`

핵심:

- `src/engine/llmDialogueResolver.ts`에 LLM/Fallback only guard hook.
- `tryScriptedDialoguePath` 성공 결과는 guard 진입 없이 즉시 return.
- 신규 파일:
  - `src/engine/disclosureGuard.ts`
  - `src/engine/disclosurePolicyLoader.ts`
  - `src/types/disclosure.ts`
- feature flag:
  - `VITE_DISCLOSURE_GUARD_MODE=off|log|sanitize|block`
  - priority: URL > localStorage > env > default `off`
- mode `off`:
  - policy import 없음
  - scan 없음
  - text mutation 없음
  - 게임 흐름 영향 0
- mode `log`:
  - `console.warn('[disclosure-guard]', ...)`
  - text 변경 없음
- `sanitize` / `block`:
  - stub 단계. 운영 금지.

### Dev-B Follow-up

완료 commit:

- `bd46418 fix(disclosureGuard): catch 보내신 honorific inflection in family-01 paraphrase`

내용:

- family-01 paraphrase rule 1건 정밀 matcher로 보강.
- `보낸` substring이 `보내신`을 놓치는 FN 수정.
- 일반 표현 `"어머니께 돈을 보내셨습니까."`는 pass 확인.

검증:

- `npm run build` PASS
- `npx tsc -b --force` PASS
- `npm run check:all` PASS hard 0 / warnings 157
- targeted GuardLog PASS

---

## Tier 3 운영 상태

현재 상태:

- Tier 3 Guard MVP 설치 완료.
- Phase 0: default off 안정 운영 단계.
- 기본 플레이는 guard off.
- QA/dev spot check에서만 필요 시 log mode 사용.

log mode 사용:

- URL: `?guard=log`
- 또는 localStorage: `localStorage['solomon-disclosure-guard-mode']='log'`

아직 하지 말 것:

- sanitize/block 운영 진입
- feature flag default 변경
- 자유 심문 전면 개방
- resolver 최종 text 전체 guard 적용
- `tryScriptedDialoguePath` 우회

---

## 최근 QA 결과

### QA-T3-Functional-Off

- Static scan 10회 PASS.
- Unit/resolver smoke 2회 PASS.
- Scripted matrix audit 14,931 variants PASS.
- Browser/UI headless 1회 PASS:
  - 실제 Vite + Playwright chromium
  - spouse-01 Phase 0 -> Phase 1 -> Phase 2 심문 메뉴
  - `[disclosure-guard]` console warning 0
- Full playthrough simulation: BLOCKED
  - `tests/run-84-headless.cjs` 없음
- Manual play spot check: not run.

### QA-T3-GuardLog

- mode=off sample PASS.
- targeted log sample PASS after `bd46418`.
- gating matrix PASS.
- Browser/UI guard-log harness: BLOCKED.
- Full playthrough: BLOCKED.

중요:

- 기존 빠른 테스트는 static/unit/resolver/matrix가 많다.
- full playthrough harness는 아직 없음.
- 출시 전에는 harness 개발보다 manual spot check와 출시용 품질 개선 우선.

---

## 보류 영역

중앙 guard MVP 이후에도 아래는 보류:

- JSON 정책 paraphrase 통합.
- 동적 LLM sampling harness.
- full playthrough headless harness.
- targetParty:both 168 dead variants.
- S-3 archetype REVIEW.
- A/B fallback P2.
- surfaceName alias baseline 12건 정합 결정.
- sanitize/block 본 구현.
- 자유 심문 전면 개방.
- Tier 3.5 resolver 최종 text 전체 guard.

---

## 출시 전 우선순위 제안

사용자 목표: 이번 주 Steam 유료 출시.

중앙 컨트롤 개발은 끝났으므로, 다음은 출시 체감 품질 개선으로 전환.

추천 순서:

1. Manual play spot check
   - 기본 mode=off.
   - 필요 시 `?guard=log`.
   - P0/P1은 출시 전 처리, P2는 backlog.
2. P1 script polish
   - 전체 대수정 금지.
   - 실제 플레이에서 자주 보이는 route / spouse-01 핵심 route / judge/system/NPC S0~S2 우선.
3. 제한형 자유 질문 MVP
   - 완전 자유 심문 아님.
   - 자유 입력 -> intent classify -> 기존 심문 타입/쟁점 매핑 -> guard 적용.
4. 컷씬/피드백 MVP
   - 대형 컷씬 시스템이 아니라 짧은 event overlay.
   - 진술 균열, hidden issue unlock, evidence combo success, S4, S5, 판결 직전 등.

---

## 절대 금지선

- `src/app/pc.css`는 UI 서브 스레드 영역. 명시 없이는 수정/format/stash/discard/add 금지.
- `useActionDispatch.ts`, `scriptedTextLoader.ts`, `judgeQuestionEngine.ts` 대형 리팩터 금지.
- ScriptedText 자동 일괄 수정 금지.
- 사용자 1사례만 처리하고 완료 단정 금지.
- 정적 PASS만으로 의미 품질 완료 단정 금지.
- baseline-pre-policy-v1/v2 tag 변경 금지.
- sanitize/block/default log 전환은 사용자 명시 승인 전 금지.
- raw `tmp/qa-*` 결과물은 임의 commit 금지.

---

## 다음 세션 시작 시 필수 확인

```bash
git status --short --branch
git log --oneline -8
git tag -l "baseline-pre-policy-*"
npm run check:all
npm run build
npx tsc -b --force
```

예상:

- HEAD: `bd46418`
- `main...origin/main`
- tracked dirty: `M src/app/pc.css`만 있을 수 있음
- untracked tmp 결과물 다수 존재 가능
- `check:all`: PASS hard 0 / warnings 157

