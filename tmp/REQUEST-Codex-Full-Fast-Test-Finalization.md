# REQUEST — Full Fast Test Finalization (`qa:fast` 통합 + consolidated summary)

**상태**: **DRAFT v1** — Stage 2 closing (Final P0 closing) 후 진입할 후속 트랙. 본 의뢰서는 두 runner의 통합 실행 + 결과 통합 + npm script 추가 + 출시 차단 정합 기준 정리.

**의뢰일**: 2026-04-27 (draft)
**요청자**: ClaudeCode CT-Main
**기준 SHA**: Stage 2 final closing 후 main HEAD (`baseline-pre-policy-v3` tag)
**병행 패턴**: 없음 — final closing 후 단일 트랙
**작업 본질**: 두 fast tester(`qa-runtime-gate.cjs` static + `qa-route-simulator.cjs` runtime route)를 단일 명령으로 통합 실행 + consolidated summary + 출시 차단 fail 기준 일원화

---

## 1. 본질

현재 두 tester는 분리 운영 (사용자 결정 정합):
- `scripts/qa-runtime-gate.cjs` (static / facsimile scan / 14,931 variants)
- `scripts/qa-route-simulator.cjs` (route runtime simulation / 12 routes / 64 actions)

각각 별도 산출 위치 / 별도 npm script (`npm run qa:route`만 존재). 출시 전 검증 시 두 runner 결과를 **수동으로 합쳐 봐야** 출시 차단 여부 판단 가능 — 비효율적.

본 트랙 = **`npm run qa:fast` 단일 명령으로 두 runner 실행 + consolidated summary**. 두 출력을 같이 묶어 단일 출시 차단 fail 기준 적용.

scope:
- 두 runner 통합 entry point (`scripts/qa-fast.cjs` 또는 npm script)
- 두 runner 결과 read + 통합 summary (`tmp/qa-fast-results/`)
- 출시 차단 fail 기준 통합 (P0 hard fail / P1 informational / P2 warning)
- npm script `qa:fast` 등록

비목표 (본 트랙 X):
- runner 본체 변경 (`qa-runtime-gate.cjs` / `qa-route-simulator.cjs` 영역 read-only)
- detector 추가 / scope 확장
- ScriptedText / caseData / 정책 변경
- baseline anchor 변경
- LLM 실호출 / browser harness

---

## 2. 진입 조건

```bash
git pull origin main
git log --oneline -1                    # HEAD = baseline-pre-policy-v3 tag 또는 그 이후
git status --short --branch             # tracked dirty 0
git tag --list 'baseline-pre-policy-v3*'  # v3-stage1 / v3-stage2 / v3 (final) 모두 존재
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all                       # PASS — hard 0
npm run build:pc                        # PASS
npx tsc -b --force                      # PASS
node scripts/qa-runtime-gate.cjs        # static — P0 0 (final closing 후 정합)
node scripts/qa-route-simulator.cjs     # route — P0 0 / P1 9 / P2 0
```

PASS 후 진행. final tag 미발행 / dirty / runner FAIL 시 즉시 중단 + CT-Main 보고.

---

## 3. 분담

| 역할 | 담당 |
|---|---|
| 정책 / 통합 fail 기준 / 의뢰서 | CT-Main |
| **본 의뢰서 구현 (§5 ~ §8)** | **Codex-Dev** |
| 사용자 | npm script 추가 승인 / consolidated fail 기준 결정 |

---

## 4. 입력 자료

### 4.1 기존 runner / 산출물 (read-only / 변경 X)
- `scripts/qa-runtime-gate.cjs` (static gate / 1,757 → expected post-closing findings)
- `scripts/qa-route-simulator.cjs` (route simulator / Phase B-5)
- `tmp/qa-runtime-gate-results/findings.json` / `*-summary.md`
- `tmp/qa-route-simulator-results/findings.json` / `*-summary.md`

### 4.2 정책
- `docs/disclosure-policy.md` v1.1
- `docs/information-surface-policy.md` v1.1
- `docs/spot-check-format.md`
- `CLAUDE.md`

### 4.3 메모리 (운영 Claude memory — repo-local 파일 X)
- `feedback_static_analysis_limit` (#12 — 두 mode 통합 본질)
- `feedback_broad_homologous_detection` (#11)
- `feedback_truth_leak_prohibition` (#9)

---

## 5. 통합 fail 기준 (사용자 결정 영역 / draft)

### 5.1 출시 차단 (P0 hard fail) — 어느 한 쪽이라도 P0 > 0이면 fail
- `qa-runtime-gate.cjs` static P0 (truth leak / disclosure-gate / surface-name-gate 등)
- `qa-route-simulator.cjs` route P0 (route_action_unhandled / qa_mismatch_runtime / lie_state_regression / evidence_stage_skip / truth_leak_runtime)

### 5.2 P1 informational — fail X / report
- static P1 (script-focus 822 / metadata 36 / surface-copy-hygiene 128 / evidence-stage-review 62)
- route P1 (`evidence_investigate_no_npc_followup` 9 / 옵션 (ii) 정합)

### 5.3 P2 warning — fail X / report
- static P2 (fallback-polish 82 / korean-polish 540)
- route P2 (safe_fallback_used 등)

### 5.4 출시 차단 결정
- **P0 = 0 (양 runner 모두)** → release ready
- **P0 > 0 (어느 쪽이든)** → release block
- **P1 / P2** → informational only

> 사용자 결정 필요: P1 임계값 (예: P1 > N건이면 release warning 또는 block). 현재 default = informational only.

---

## 6. 통합 entry point 설계

### 6.1 옵션 (Codex-Dev 결정 영역)

#### 옵션 A: 신규 통합 runner `scripts/qa-fast.cjs`
- node 자식 프로세스로 두 runner 실행 (또는 module require)
- 두 산출물 read + 통합 summary write
- exit code = max(static fail, route fail)

#### 옵션 B: npm script 체이닝
```json
"scripts": {
  "qa:gate": "node scripts/qa-runtime-gate.cjs",
  "qa:route": "node scripts/qa-route-simulator.cjs",
  "qa:fast": "npm run qa:gate && npm run qa:route && node scripts/qa-fast-summary.cjs"
}
```
- 단순 / runner 독립 / `qa-fast-summary.cjs`만 신규
- 한 쪽 실패 시 다음 단계 실행 X (체인 중단) — 완전한 통합 summary 안 나옴

#### 옵션 C: 단일 runner + 분리 entry
```json
"scripts": {
  "qa:fast": "node scripts/qa-fast.cjs"
}
```
`qa-fast.cjs` 안에서 두 runner 실행 (실패 무시 / 실행 모두 시도) → 통합 summary → max exit code.

권장: **옵션 C** (실패 무시 / 통합 summary 항상 생성 / exit code로 fail 신호).

### 6.2 신규 entry — `scripts/qa-fast.cjs`

```
1. Static gate 실행 → 결과 read (findings.json)
2. Route simulator 실행 → 결과 read (findings.json)
3. 두 결과 통합:
   - severity 별 합산 (P0 / P1 / P2)
   - patchPriority 별 합산
   - mode 별 분리 표시 (static / route)
4. tmp/qa-fast-results/ 산출물 작성
5. exit code:
   - P0 = 0 (양쪽) → exit 0
   - P0 > 0 (어느 쪽이든) → exit 1
   - 출력에 release block / release ready 표시
```

### 6.3 공유 헬퍼 (선택)
- `scripts/qa-runner-shared/severity-merge.cjs` — 두 findings.json 병합 로직

---

## 7. 산출물 위치

```
scripts/
├── qa-fast.cjs                              (신규 / 옵션 C entry)
└── qa-runner-shared/                         (옵션 / 공유 헬퍼)
    └── severity-merge.cjs                    (선택)

tmp/qa-fast-results/
├── consolidated-findings.json                (병합 / mode 별 분리)
├── consolidated-summary.md                   (P0 / P1 / P2 / mode별 / patchPriority별)
├── release-readiness.md                      (release block / ready 결정)
└── 20260427-fast-summary.md                  (실행 시점 summary)

package.json
└── scripts.qa:fast                           (신규)
```

---

## 8. 통합 summary 형식

### 8.1 `consolidated-summary.md` 예
```markdown
# QA Fast Test Consolidated Summary

## Mode totals
- static gate: total <N> / P0 <N> / P1 <N> / P2 <N>
- route simulator: total <N> / P0 <N> / P1 <N> / P2 <N>

## Combined severity
- total P0: <N>
- total P1: <N>
- total P2: <N>

## By patchPriority (P0 only)
- P0-disclosure-gate (static): <N>
- P0-evidence-stage-gate (static): <N>
- P0-surface-name-gate (static): <N>
- P0-runtime-coverage (route, deprecated by option ii): <N>
- ...

## Release readiness
- P0 = 0 ✓ → RELEASE READY
- 또는
- P0 = <N> ✗ → RELEASE BLOCK

## Run timestamps
- static: <ts>
- route: <ts>
```

### 8.2 `release-readiness.md`
```markdown
# Release Readiness Decision

## Status: RELEASE READY / RELEASE BLOCK

## Reasoning
- P0 hard count: <N>
- P1 informational count: <N> (informational, not blocking)
- P2 warning count: <N> (warning, not blocking)

## Tag verification
- baseline-pre-policy-v3-stage1: <hash> ✓
- baseline-pre-policy-v3-stage2: <hash> ✓
- baseline-pre-policy-v3 (final): <hash> ✓

## Mode comparison
- static gate (latest): <ts>
- route simulator (latest): <ts>

## Notes
- evidence_investigate_no_npc_followup (P1, route) — option (ii) 결정 결과 정합 / 무시 가능
```

---

## 9. 진행 절차

### Phase F-1 — 통합 entry 작성
1. `scripts/qa-fast.cjs` 신규 (옵션 C 권장)
2. 두 runner 실행 + 결과 read + 통합
3. `tmp/qa-fast-results/` 산출물 schema 확정
4. node --check / eslint PASS

### Phase F-2 — npm script 추가
1. `package.json` `scripts.qa:fast` 추가
2. 실행 결과 검증 — Stage 2 closing 후 P0 = 0 정합 / exit 0
3. `release-readiness.md` 자동 생성 + RELEASE READY 표시

### Phase F-3 — 검증 + commit + push
1. `npm run qa:fast` PASS — exit 0 / RELEASE READY
2. `npm run check:all` / `build:pc` / `tsc -b --force` PASS
3. static / route runner 결과 동일성 (회귀 0) — 통합 mode가 단일 mode와 결과 일치
4. commit `feat(scripts): add qa:fast consolidated runner` + push
5. CT-Main 보고

---

## 10. Write Scope

### 10.1 변경 OK
- `scripts/qa-fast.cjs` (신규)
- `scripts/qa-runner-shared/*.cjs` (옵션 / 신규)
- `tmp/qa-fast-results/*` (산출물)
- `package.json` `scripts.qa:fast` 추가

### 10.2 read-only / 변경 X
- `scripts/qa-runtime-gate.cjs` (static gate)
- `scripts/qa-route-simulator.cjs` (route simulator)
- `tmp/qa-runtime-gate-results/*` / `tmp/qa-route-simulator-results/*` (각 runner 산출물)
- runtime 본체 / `src/data/*` / 정책 docs / pc.css / API proxy

### 10.3 절대 변경 X
- 두 runner 본체 동작 (read-only / 회귀 0 정합)
- baseline anchor v1 / v2 / v3-stage1 / v3-stage2 / v3 (final)
- ScriptedText / caseData / 정책 docs / `src/data/emergenceHooks.ts`
- VITE_OPENAI_API_KEY / OPENAI_API_KEY 참조 X
- `_LEGACY_84CASES_DO_NOT_REFERENCE/` 참조

---

## 11. 절대 회피선

### 사용자 명시
- 두 runner 본체 변경 X — 통합 entry는 read-only orchestrator
- LLM 실호출 X
- browser harness X
- runtime 본체 import X

### 운영
- final tag (`baseline-pre-policy-v3`) 미발행 시 본 트랙 진입 X
- 두 runner 결과 동일성 위반 시 즉시 원복

---

## 12. 종료 조건 (Phase F-3)

- [ ] `scripts/qa-fast.cjs` 신규 entry 작성
- [ ] 두 runner 결과 통합 + consolidated summary 산출
- [ ] `release-readiness.md` 자동 생성 (RELEASE READY / BLOCK 표시)
- [ ] `package.json` `scripts.qa:fast` 등록
- [ ] `npm run qa:fast` PASS — exit 0 (Stage 2 closing 후 P0 = 0 정합)
- [ ] static / route runner 결과 동일성 (회귀 0)
- [ ] `node --check` / `npx eslint` / `npm run check:all` / `build:pc` / `tsc -b --force` PASS
- [ ] commit `feat(scripts): add qa:fast consolidated runner` + push
- [ ] CT-Main 보고 (commit hash + 통합 summary + release readiness)

---

## 13. 후속 (CT 영역 / Phase F-3 closing 후)

1. **출시 전 final QA 운영 절차 정립**:
   - `npm run qa:fast` → release-readiness.md 검토 → 빌드 → 배포 흐름 표준화
   - PR 검증 hook 추가 영역 (선택)
2. **P1 / P2 트랙 의뢰서** (Stage 2 closing 후 후속):
   - P1-script-focus-review (qa_mismatch_candidate 822) — intent classifier / disputeId 매핑 검토
   - P1-script-metadata-review (36)
   - P1-surface-copy-hygiene (128)
   - P2-fallback-polish (82) / P2-korean-polish (540)
3. **RC4 별도 의뢰서** (현재 옵션 (ii) closing) — 옵션 (i)/(iii) 진입 결정 시
4. **wip branch cleanup** (사용자 명시 보류 → 사용자 승인 후)
5. **`6643035` superseded 표시 commit**

---

## 14. 관련 자료

- `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (상위 / commit `3973ac6`)
- `tmp/REQUEST-Codex-Stage1-Application-P0-Evidence-Stage-Gate.md` (Stage 1 application / commit `7eaad2e`)
- `tmp/REQUEST-Codex-Stage2-Application-P0-Disclosure-Gate.md` (Stage 2 application skeleton)
- `tmp/REQUEST-Codex-Stage3-Final-Verification.md` (Stage 3 verification 절차)
- `tmp/REQUEST-Codex-Fast-Tester-Phase-B-Route-Simulator.md` (Phase B / merged at `6d18c63`)
- Static runner: `scripts/qa-runtime-gate.cjs`
- Route runner: `scripts/qa-route-simulator.cjs`
- 정책: `docs/disclosure-policy.md` / `docs/information-surface-policy.md` / `CLAUDE.md`
- 메모리 (운영 Claude memory — repo-local 파일 X)

---

**상태**: Full Fast Test Finalization 의뢰서 v1 draft 작성 완료. Stage 2 closing (Final P0 closing) 후 진입. CT 추가 보강 영역:
- §5.4 P1 임계값 결정 (사용자 영역)
- §6.1 옵션 A/B/C 중 Codex-Dev 결정
- final tag 정합 후 본격 commit/push
