# Codex-Dev B — Tier 3 Guard MVP (의뢰서)

**작성**: CT-Main / 2026-04-27
**기준 HEAD**: `4e0a1b6 docs(policy): tier-3 guard hardening — paraphrase set + uiSurfaceMap surface`
**Baseline anchor**: `a10b801` (`baseline-pre-policy-v1`)
**병행 의뢰**: Codex-Dev A (P1 Stabilization Patch) — write set 분리, 동시 진행 가능

---

## 의뢰 본질

Tier 3 컨트롤 시스템 MVP 1차 구현. **runtime LLM/Fallback guard** — 정책 hardening (commit `4e0a1b6`)의 paraphrase set + gating을 처음으로 runtime에서 작동시키는 영역.

**MVP 핵심**:
- `src/engine/llmDialogueResolver.ts` 단일 진입점
- `VITE_DISCLOSURE_GUARD_MODE` feature flag default `'off'`
- 1차 = log mode 중심 (sanitize/block은 운영 안정 후 단계)
- ScriptedText / caseData / UI 컴포넌트 수정 X (Codex-Dev A 영역)

---

## 시작 조건 (반드시 먼저 실행)

```bash
git status --short --branch
git log --oneline -1                  # HEAD = 4e0a1b6 확인
git diff --quiet && git diff --cached --quiet && echo "tracked clean" || echo "tracked dirty"
npm run check:all                     # hard 0 / warnings 157 (baseline-known)
```

**중단 조건**:
- HEAD ≠ `4e0a1b6` (CT-Main이 갱신했으면 그 기준)
- `tracked dirty` (CT-Main 또는 다른 세션 작업 충돌)
- `npm run check:all` hard issues > 0 (baseline 회귀 의심)

**진행 조건**:
- HEAD = `4e0a1b6`
- tracked clean (untracked `tmp/qa-*` / `tmp/REQUEST-Codex-Dev*` 무시)
- wrapper hard 0 / warnings 157

---

## MVP 영역 정의

### B-1. 단일 진입점

**위치**: `src/engine/llmDialogueResolver.ts`
- 기존 `resolveLLMDialogue` 함수 후처리 영역에 guard hook 삽입
- guard 함수: `blockHiddenTruthLexemes(text, context)` 또는 동등 (이름은 자유 — 의미는 동일)
- 입력: `text: string`, `context: GuardContext`
- 출력: `GuardResult`

```typescript
type GuardContext = {
  channel: ChannelType;          // judge_question / interrogation / ...
  caseId: 'spouse-01' | 'family-01' | 'friend-01';
  lieState?: LieState;           // S0~S5 (NPC 채널 한정)
  evidenceState?: EvidenceState; // unlocked? stage?
  party?: 'a' | 'b';
  disputeId?: string;
};

type GuardResult =
  | { action: 'pass' }
  | { action: 'log'; reason: string; matched: string[] }       // mode='log'
  | { action: 'sanitize'; reason: string; replacement: string } // mode='sanitize'
  | { action: 'block'; reason: string; matched: string[] };     // mode='block'
```

### B-2. Feature flag

**환경 변수**: `VITE_DISCLOSURE_GUARD_MODE`
- 값: `'off'` | `'log'` | `'sanitize'` | `'block'`
- default: `'off'` (반드시)
- `import.meta.env.VITE_DISCLOSURE_GUARD_MODE` 또는 동등 path

**우선순위**:
1. URL query param (테스트용 / `?guard=log`)
2. localStorage (`solomon-disclosure-guard-mode`)
3. env (`VITE_DISCLOSURE_GUARD_MODE`)
4. default `'off'`

### B-3. 1차 결정 영역 (spike, 가장 먼저)

**MVP 적용 범위 결정** — 의뢰 첫 단계:

**옵션 (가)**: LLM/Fallback 응답만 guard
- `tryScriptedDialoguePath` 통과한 영역만 guard 진입
- ScriptedText는 정책 hardening (commit `4e0a1b6`) 영역에서 보호 = 이중 X

**옵션 (나)**: resolver 최종 text 전체 guard (Scripted 포함)
- 모든 resolver 출력 guard 진입
- ScriptedText paraphrase 영역도 runtime에서 한 번 더 검사 (이중 안전)
- 단 false positive 위험 ↑ + 성능 영향 ↑

**spike 산출물** (`tmp/qa-codex-dev-b-results/spike-guard-scope.md`):
- (가) vs (나) 비교 (성능 / FP 위험 / 안전성)
- 권장 옵션 + 사유
- 결정 후 CT-Main / 사용자 confirm 받음 → MVP 구현 진입

### B-4. log mode MVP 구현 (spike 결과 후)

**필수 영역**:
1. 정책 JSON lazy import (`src/data/disclosurePolicy/{caseId}.json` 첫 진입)
2. `blockHiddenTruthLexemes` 함수 — log mode 중심 (sanitize/block은 stub 또는 throw)
3. log 출력 형식:
   - `console.warn('[disclosure-guard]', { variant, channel, lieState, matched, text })` (브라우저)
   - 옵션: `tmp/qa-guard-log/{YYYYMMDD}.jsonl` append (개발 모드)
4. 기존 resolver 흐름에 영향 X (mode='off' 또는 'log' 모두 LLM 응답 그대로 반환)

**lexeme/paraphrase rule 입력**:
- `src/data/disclosurePolicy/{caseId}.json`의 `forbiddenLexemes`
- + 정책 hardening (`docs/disclosure-policy.md` §4.1·4.2·4.3) paraphrase set
- → JSON에 paraphrase 영역 추가는 별도 의뢰 (CT-Main + Codex 분담 영역). 1차 MVP는 기존 JSON `forbiddenLexemes` + 정책 본문 paraphrase set 양쪽 union으로 시작 가능

**gating 적용**:
- 정책 §4.1 "Tier 3 guard 적용 조건 (gating)" 박스 그대로 구현
- 차단 대상: `judge_question` / `judge_contradiction` / `judge_evidence_combo` / `judge_witness_summon` / `system_message` / `dossier`(안내) / `evidence_discovery` + NPC `interrogation`·`contradiction_pursuit` lieState ∈ {S0, S1, S2}
- 통과 대상: `aftermath` / `emotional_overload` / `mediation` / witness `*full*` + NPC S3+ (gated) / S4+ 자유 / S5 자백
- `evidence_present`: stage 0/1 차단 / late stage gated
- `dossier`: early 차단 / mid·late gated

### B-5. 검증

**MVP 검증 (구현 후)**:
1. `npm run build` PASS / `npx tsc -b --force` PASS
2. `npm run check:all` PASS 유지 (baseline 회귀 X)
3. `import.meta.env.VITE_DISCLOSURE_GUARD_MODE` 미설정 = `mode='off'` 동작 확인 (게임 흐름 영향 0)
4. `mode='log'` 설정 시 `console.warn` 출력 확인 (CT-Cross 발견 14 P1 + S-1 6 P0 영역에서 트리거)
5. resolver 최종 text 변경 X (log mode은 read-only)

**MVP 단계에서 제외**:
- `mode='sanitize'` 구현 (stub 또는 throw로 표시 — log mode 안정 후 단계)
- `mode='block'` 구현 (동일)
- LLM dynamic sampling harness (P-5 / TC-I2 영역, 별도 의뢰)
- 30일 안정 운영 자동화

---

## 작업 영역 분리

### 변경 가능 영역 (B 단독)
- `src/engine/llmDialogueResolver.ts` (수정)
- 신규 파일 OK:
  - `src/engine/disclosureGuard.ts` (guard 함수 + lexeme/gating 로직)
  - `src/engine/disclosurePolicyLoader.ts` (정책 JSON lazy import + memo)
  - `src/types/disclosure.ts` (GuardContext / GuardResult 타입)
- env / config 영역 (`vite.config.ts` 등 — 필요 시)

### 결과 파일
- `tmp/qa-codex-dev-b-results/` 하위만

### 절대 금지선
- **Codex-Dev A 영역 침범 X**:
  - `src/data/scriptedText/{caseId}.json` 수정 X (A 영역)
  - `src/components/**` 수정 X (A 영역)
  - `src/utils/archetypeLabel.ts` 신규 X (A 영역)
- **CT-Main 영역 침범 X**:
  - `docs/disclosure-policy.md` 수정 X
  - `src/data/disclosurePolicy/*.json` 수정 X (Codex 다른 의뢰 영역)
  - TC 문서 (`docs/qa-*.md`) 수정 X
- **wrapper 스크립트 수정 X** (`tmp/run-all-checks.cjs` 등)
- **`useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X** (Tier 4+ 보류)
- **`tryScriptedDialoguePath` 우회 X** (옵션 (가) 채택 시 정상 흐름 유지)
- **baseline anchor (a10b801) 회귀 X**
- **feature flag default 변경 X** (반드시 `'off'`로 시작)
- **runtime guard 강제 적용 X** (mode='off'면 게임 흐름 영향 0)

---

## 결과 보고 형식

각 단계 산출물 → `tmp/qa-codex-dev-b-results/`:

### Phase 1 spike 보고
`tmp/qa-codex-dev-b-results/{YYYYMMDD}-spike-guard-scope.md`:
- 옵션 (가) vs (나) 비교 (성능 / FP / 안전성)
- 권장 옵션 + 사유
- CT-Main / 사용자 결정 대기 영역

### Phase 2 MVP 구현 보고
`tmp/qa-codex-dev-b-results/{YYYYMMDD}-mvp-summary.md`:
- HEAD / Scope / Commands run
- 신규 파일 list + 변경 영역
- API spec (GuardContext / GuardResult / blockHiddenTruthLexemes)
- feature flag spec + 우선순위
- gating 구현 영역 + 정책 본문 정합 검증
- `npm run build` / `npm run check:all` 결과 (baseline 보존 검증)
- mode='off' 시 게임 흐름 영향 0 확인
- mode='log' 시 출력 sample (CT-Cross 14 P1 영역 트리거)

---

## 합격 조건

### Phase 1
- spike 보고 산출 + 권장 옵션 + CT-Main 결정 영역 명시

### Phase 2 MVP
- guard 함수 단일 진입점 구현
- feature flag default `'off'` + 4 모드 인식 (off/log/sanitize/block)
- log mode 동작 (sanitize/block은 stub OK)
- gating 정책 본문 정합 (§4.1 박스 그대로)
- `npm run build` PASS
- `npm run check:all` PASS (baseline 회귀 X)
- mode='off' 시 resolver 최종 text 변경 X
- mode='log' 시 console.warn 출력

---

## 분담

| 영역 | Codex-Dev B | CT-Main 결정 | CT-Cross 검수 |
|---|---|---|---|
| Phase 1 spike (적용 범위) | 실행 | 옵션 결정 | (선택) |
| Phase 2 MVP 구현 | 실행 (Phase 1 결정 후) | spike 보고 검토 | API spec / gating 정합 검수 |
| 최종 commit | (Codex-Dev B 또는 CT-Main) | 사용자 confirm 후 | — |

---

## 30일 운영 계획 (MVP 진입 후 — Codex-Dev B 영역 외)

| 단계 | mode | 기간 | 진입 조건 |
|---|---|---|---|
| 0 | off (default) | 7일+ | MVP 통과 + 운영 안정 |
| 1 | log | 7일 | mode='log' 운영 + console.warn 영역 검토 |
| 2 | sanitize 구현 + log → sanitize | 7일 | mode='log' 결과 분석 + sanitize 안전성 검증 |
| 3 | block 구현 + sanitize → block | 7일+ | sanitize 운영 안정 |
| 4 | default 전환 (off → log) | — | 사용자 명시 승인 |

→ Tier 3 default 진입은 30일+ 안정 후. 사용자 명시 승인 영역.

---

## 참조 자료

- `docs/disclosure-policy.md` §4.1·4.2·4.3 (paraphrase set + gating + uiSurfaceMap surface)
- `src/data/disclosurePolicy/{caseId}.json` (현 forbiddenLexemes + lieStateGate + surfaceMap)
- `src/engine/llmDialogueResolver.ts` (현 resolver 흐름)
- `src/engine/llmClient.ts` (LLM 호출 path)
- `src/engine/blueprintPromptBuilderV2.ts` (system prompt 구조)
- `tmp/qa-functional-results/20260427-p5-summary.md` (P-5 BLOCKED 사유 — `tryScriptedDialoguePath` 영역)
- `CLAUDE.md` (게임 핵심 원칙: "진실은 플레이어가 직접 밝혀낸다")
- `memory/feedback_static_analysis_limit.md` (잘못 패턴 #12 — 정적 분석 한계)
