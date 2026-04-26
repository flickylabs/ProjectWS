# Codex Tier 2 Handoff — Validation Wrappers

작성: Codex
작성일: 2026-04-27
범위: Tier 2 검증 wrapper 작업 인계

이 파일은 ClaudeCode CT의 `tmp/CT-HANDOFF-*` 계열과 구분하기 위한 Codex 전용 인계 파일이다. CT 인계 문서를 대체하지 않고, Tier 2 wrapper의 판단 근거와 다음 검수 지점을 보존한다.

---

## 현재 기준

- HEAD before Tier 2 commit: `396b9fa`
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

1. CT 재검수 결과가 이미 PASS라면 단일 commit:
   - `chore(policy): add Tier 2 validation wrappers`
2. Push to `origin/main`.
3. Tier 2 완료 선언.
4. 다음 작업은 새 세션에서 시작 권장.

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
