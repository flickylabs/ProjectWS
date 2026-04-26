# Codex Tier 2 Handoff — Validation Wrappers

작성: Codex
작성일: 2026-04-27
범위: Tier 2 검증 wrapper 작업 인계

이 파일은 ClaudeCode CT의 `tmp/CT-HANDOFF-*` 계열과 구분하기 위한 Codex 전용 인계 파일이다. CT 인계 문서를 대체하지 않고, Tier 2 wrapper의 판단 근거와 다음 검수 지점을 보존한다.

---

## 현재 기준

- HEAD before Tier 2 commit: `396b9fa`
- Tier 2 commit: `9036a60 chore(policy): add Tier 2 validation wrappers`
- Latest known HEAD after CT handoff refresh: `acf0c5e chore(handoff): refresh CT-NEXT-START-MESSAGE for Tier 0-2 completion`
- Final Codex handoff update: `013ea3a docs(handoff): update Codex dev handoff for next session`
- Baseline anchor: `baseline-pre-policy-v1` = `a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3`
- Tier 1 완료 commits:
  - `19e4c4e` spouse-01 schema draft
  - `6ee9690` spouse-01 issue progression
  - `2dd17e2` family-01 disclosure policy + progression
  - `396b9fa` friend-01 disclosure policy + progression

---

## 이번 작업 산출물

- `tmp/run-all-checks.cjs`
- `tmp/policy-vs-data-cross-check.cjs`
- `tmp/policy-md-json-sync-check.cjs`
- `package.json`
  - `check:policy`
  - `check:sync`
  - `check:all`
- `tmp/REQUEST-Codex-Tier2-validation-wrappers.md`
- `tmp/CODEX-TIER2-HANDOFF-20260427.md`

런타임 코드, ScriptedText, caseData, Tier 1 정책 JSON은 수정하지 않았다.

---

## 검증 결과

### Syntax

- `node -c tmp/run-all-checks.cjs` PASS
- `node -c tmp/policy-vs-data-cross-check.cjs` PASS
- `node -c tmp/policy-md-json-sync-check.cjs` PASS

### npm scripts

- `npm run check:policy` PASS
- `npm run check:sync` PASS
- `npm run check:all` PASS

### run-all-checks

9개 layer를 순차 실행한다.

- truth-leak: PASS, 0 leaks
- v6-liestate-flow: PASS, 0 hard / 772 candidates
- v6-evidence-unlock: PASS
- v6-archetype-quant: PASS
- v6-meter-timing: PASS
- v3-stage-aware: PASS, 14,931 variants
- v4-qa-coherence: PASS
- v5-broad-detection: PASS
- legacy precheck-matrix: WARN
  - family/friend d-5 `missing_disputeId_in_channel` HIGH 10건은 baseline-known으로 분류
  - hard fail로 올리지 않음

Wrapper는 기존 precheck 결과 JSON을 실행 전 스냅샷하고 실행 후 복원한다. 검증은 하되 working tree를 더럽히지 않는 것이 목적이다.

### policy-vs-data-cross-check

3 cases x 7 checks.

- result: PASS
- hard issue: 0
- warnings: 157

검증 항목:

- `surfaceMap.evidence` vs caseData evidence
- `surfaceMap.disputes` vs caseData disputes
- `surfaceMap.witnesses` vs caseData `duo.socialGraph`
- `forbiddenLexemes` vs ScriptedText surface-only channels
- `lieStateGate.npcPolicies` vs ScriptedText interrogation
- `issueProgression.requiredEvidence/requiredWitness` references
- `discoveryText.entries` vs combinationLab/evidence inputs

### policy-md-json-sync-check

- default `--tier=1`: PASS, warn-only mode
- `--tier=2`: PASS, quality-gate mode
- sync issue: 0

검증 영역:

- section 2 channel taxonomy
- section 3.1 truth throttle
- section 3.3 channel matrix
- section 4.1 spouse-01 surfaceMap
- section 11.1 meter role

---

## 중요한 판단

### forbiddenLexemes surface-only는 기본 WARN

정적 lexeme 검출만으로 hard fail 처리하지 않았다.

이유:

- `dossier` late entries처럼 실제 게임 진행 단계상 unlock 후 노출될 수 있는 후보가 섞여 있다.
- `형` 같은 짧은 lexeme은 일반 문맥과 충돌할 수 있다.
- 잘못 패턴 #12처럼 정적 분석 결과만으로 의미/맥락 판단을 완료하면 false positive가 커진다.

대신:

- 기본 실행은 WARN으로 추적한다.
- 필요 시 `node tmp/policy-vs-data-cross-check.cjs --strict-lexeme`로 hard fail 모드 전환 가능하다.

### surfaceName alias는 WARN

family/friend 정책 JSON의 `surfaceName`은 caseData exact match가 아니라 보호용 alias인 경우가 있다.

예:

- family-01 e-1: policy `공증 유서 사본`, caseData `60:40 유서 사본`
- friend-01 e-1: policy `예비신랑 연락 기록`, caseData `연락 기록`

이 차이는 정책 의도일 수 있으므로 hard fail이 아니라 WARN으로 둔다. 향후 UI surface 정렬 작업에서 사용자/CT 판단이 필요하다.

---

## 불변 조건 확인

- `git diff 396b9fa -- src/data/disclosurePolicy docs/disclosure-policy.md docs/codex-request-template.md docs/spot-check-format.md` = empty
- `rg -n "src/" tmp/run-all-checks.cjs tmp/policy-vs-data-cross-check.cjs tmp/policy-md-json-sync-check.cjs` = 0 match
- wrapper `require(...)`는 Node stdlib만 사용
- baseline checksum 6개 일치:
  - spouse ScriptedText: `8298EAD7A41C5245998808E03CC87AD3C4B3C534860BCB04470081493F0BC4F7`
  - family ScriptedText: `C0393287B94B282C56B445F8B278350715E4B0C4FF65D9E56DC623696DBCD940`
  - friend ScriptedText: `4135DFB8D90C9C9B40FCBEB3815E668029AB35723AF725D699F22A2F4831DB97`
  - spouse caseData: `D3C1377FD8EC0222C4F5761E0FF46C31117BE4D097D31B905DFF82F40D25E48A`
  - family caseData: `281B8741EEE0C6FA6198BE0F034F33EB3CA7AE679511E680BD0F875391F172FF`
  - friend caseData: `4B742B920EE1572BD577DDEFC496E4B7BE5E2F764CD3F642253B3AF29A0BE911`

---

## 다음 액션

1. Tier 2는 `9036a60`에서 commit/push 완료.
2. ClaudeCode CT가 `acf0c5e`에서 `tmp/CT-NEXT-START-MESSAGE.md`를 갱신함.
3. Codex가 `013ea3a`에서 이 인계 문서를 최신화함.
4. 다음 작업은 새 Codex-Dev 세션에서 시작 권장.
5. QA/playtest 세션과 Codex-Dev 세션은 분리한다.

다음 후보:

- 30일 안정 운영 시작
- stale identifier cleanup
  - friend-01 `game-events-v2`의 stale `h-d3` / `h-d4`
  - spouse-01 v3 loop-data 충돌 4건
- 사용자 spot check sample 검증
- Tier 3 LLM/Fallback Guard는 Tier 2 안정 운영 후 별도 승인 필요

---

## ClaudeCode 결정 응답 권장

- 결정 1: A
- 결정 2: A
- 결정 3: A
- 결정 4: A + 인계 파일 갱신 포함

즉, CT PASS 수용 후 단일 commit/push를 진행하고, 이후 작업은 컨텍스트 리스크 때문에 새 세션에서 시작한다.

---

## 세션 분리 원칙

다음부터는 개발 세션과 QA 세션을 분리한다.

- Codex-Dev 세션:
  - 구현, 검증, commit/push 전용
  - Tier 3 LLM/Fallback Guard
  - stale identifier cleanup
  - policy wrapper 조정
  - ClaudeCode CT 검수 대응
- QA / Thread-Q / Thread-QW:
  - 플레이 테스트
  - spot check 수집
  - UX 감상, 이상한 대사, 누설 의심 사례 기록
  - `docs/spot-check-format.md`에 맞춘 사례 정리

QA에서 나온 사례는 바로 개발 세션으로 던지지 않는다. CT 또는 QW에서 분류한 뒤 Codex-Dev에는 정리된 작업 요청만 전달한다.

---

## 현재 완료/미완료 구분

완료:

- Tier 0 baseline freeze
- Tier 1 disclosure policy + 3 case schema/progression
- Tier 2 validation wrappers

미완료:

- 런타임 중앙 컨트롤러 적용
- Tier 3 LLM/Fallback Guard
- `blockHiddenTruthLexemes(...)`
- feature flag default-off runtime guard
- stale identifier cleanup
- 사용자 playtest 기반 spot check 처리

따라서 현재 상태는 "중앙 기준과 검증망 완성"이지 "런타임 중앙 컨트롤러 적용 완료"가 아니다.

---

## 다음 Codex-Dev 세션 첫 메시지

아래 메시지를 새 Codex 개발 전용 세션 첫 메시지로 사용한다.

```md
이 세션은 Codex-Dev 전용 세션이야. QA/플레이테스트 로그를 직접 처리하는 세션이 아니라, 정리된 개발 작업만 수행해줘.

먼저 다음 파일을 읽고 현재 상태를 복원해줘:

1. tmp/CODEX-TIER2-HANDOFF-20260427.md
2. tmp/CT-NEXT-START-MESSAGE.md
3. docs/disclosure-policy.md
4. docs/spot-check-format.md
5. package.json의 check:* scripts

현재 기준:
- 최신 HEAD는 `013ea3a` 근처여야 함.
- Tier 0 baseline freeze 완료.
- Tier 1 disclosure policy 3 active case 완료.
- Tier 2 validation wrappers 완료.
- `npm run check:all` PASS가 기준.
- Tier 3 runtime guard는 아직 미진입.

시작 시 반드시:
- `git status --short --branch`
- `git log --oneline -6`
- `npm run check:all`
을 실행해서 상태를 확인해줘.

중요한 판단:
- Tier 2의 warning 157건은 hard fail이 아님.
- `forbiddenLexemes.surfaceOnly`는 기본 WARN이고, 필요 시 `--strict-lexeme`로 승격 가능.
- surfaceName alias는 정책상 보호 alias일 수 있으므로 hard fail 아님.
- 런타임 코드, ScriptedText, caseData는 사용자 승인 없이 건드리지 말 것.
- `useActionDispatch`, `scriptedTextLoader`, `judgeQuestionEngine` 대형 리팩터는 금지선 유지.

다음 작업 후보는 CT/사용자 지시에 따라 하나만 선택:
1. Tier 2 안정 운영 시작 및 warning triage 계획 수립
2. stale identifier cleanup 의뢰 처리
3. 사용자 spot check 사례를 정책/검증 작업으로 번역
4. Tier 3 LLM/Fallback Guard 설계 의뢰 검토

작업 전에는 항상 범위와 금지선을 짧게 확인하고, 구현 후에는 CT 검수용 보고를 남겨줘.
```
