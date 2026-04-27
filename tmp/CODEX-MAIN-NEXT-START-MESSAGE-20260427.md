# 다음 Codex Main Dev 세션 첫 메시지

아래 메시지를 새 Codex Main Dev 세션에 전달.

```md
이 세션은 Codex Main Dev / 조율 Dev 세션이야.
Codex-Dev A/B 같은 단일 작업 세션이 아니라, CT 의견 검토, 사용자 결정 정리, 실제 작업 세션 이관 메시지 작성, 컨텍스트 관리가 주 역할이야.

먼저 다음 파일을 읽고 현재 상태를 복원해줘:

1. tmp/CODEX-MAIN-HANDOFF-20260427-TIER3-PHASE0.md
2. tmp/CODEX-TIER2-HANDOFF-20260427.md
3. docs/disclosure-policy.md
4. docs/qa-test-cases.md
5. docs/qa-functional.md
6. docs/qa-scripted.md
7. package.json의 check:* scripts

시작 시 반드시 실행:

- `git status --short --branch`
- `git log --oneline -8`
- `git tag -l "baseline-pre-policy-*"`
- `npm run check:all`
- `npm run build`
- `npx tsc -b --force`

현재 기준:

- 최신 HEAD는 `bd46418 fix(disclosureGuard): catch 보내신 honorific inflection in family-01 paraphrase`
- origin/main sync 완료 상태여야 함.
- Tier 0 baseline freeze 완료.
- Tier 1 disclosure policy 3 active case 완료.
- Tier 2 validation wrappers 완료.
- Dev-A P1 stabilization 완료.
- Dev-B Tier 3 disclosure guard MVP 완료.
- Dev-B follow-up FN 1건 완료.
- Tier 3 운영 단계는 Phase 0 default off.

중요 상태:

- `npm run check:all` PASS, hard 0 / warnings 157이 기준.
- warning 157은 baseline-known이고 hard fail 아님.
- `baseline-pre-policy-v1` target은 `a10b801`.
- `baseline-pre-policy-v2` target은 `acf5d27`.
- 현재 tracked dirty로 `src/app/pc.css`가 있을 수 있음.
  - 이 파일은 UI 서브 스레드 토큰 일괄 통일 작업 영역.
  - 사용자/CT 명시 없이 수정, format, stash, discard, add 금지.
- `tmp/qa-*`, `tmp/REQUEST-Codex-Dev*`, `tmp/cutscene-mockup-v1.html` 등 untracked 산출물이 있을 수 있음.

Tier 3 guard 상태:

- `llmDialogueResolver.ts` 중심 LLM/Fallback only guard MVP 설치 완료.
- `tryScriptedDialoguePath` 성공 결과는 guard 진입 X.
- feature flag:
  - `VITE_DISCLOSURE_GUARD_MODE=off|log|sanitize|block`
  - default는 반드시 `off`.
- log mode는 QA/dev spot check 전용.
- sanitize/block은 stub 단계라 운영 금지.

다음 목표:

이번 주 Steam 유료 출시를 위해, 중앙 guard 개발은 완료로 보고 출시용 체감 품질 개선으로 전환.

우선 후보:

1. Manual play spot check 결과 수집 및 P0/P1 처리
2. P1 script polish
3. 제한형 자유 질문 MVP 설계/구현
4. 컷씬/피드백 MVP 설계/구현

보류:

- full playthrough harness 신규 작성
- LLM sampling harness
- sanitize/block 본 구현
- targetParty:both 168
- S-3 archetype REVIEW
- A/B fallback P2
- surfaceName alias 정합 결정
- 자유 심문 전면 개방

작업 전에는 항상 범위와 금지선을 짧게 확인하고, 구현 후에는 CT 검수용 보고를 남겨줘.
컨텍스트가 커지면 새 작업 세션으로 분리할지 먼저 판단해줘.
```

