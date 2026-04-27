# Codex-Dev spouse-01 Phase 2 Spoiler Cascade Fast Fix 진입 메시지 (P0 — 출시 차단)

**세션 영역**: spouse-01 Phase 2 영역 spot check 발견 P0 5 fix
**우선순위**: P0 출시 차단 (Route Simulator / Script Polish 통합 patch 영역보다 우선)
**의뢰서 본문**: `tmp/REQUEST-Codex-Spouse-01-Phase2-Spoiler-Cascade-Fast-Fix.md`

---

## 1. 진입 조건 (먼저 실행)

```bash
git pull origin main
git log --oneline -1
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
npm run build:pc
npx tsc -b --force
```

PASS 후 진행. 어느 하나 fail → 즉시 중단 + CT-Main 보고.

**`src/app/pc.css` modified/staged 발견 시 즉시 CT-Main 보고** — 본 세션 단일 소유 영역.

---

## 2. 필수 정독

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-Codex-Spouse-01-Phase2-Spoiler-Cascade-Fast-Fix.md` (의뢰서 — 사전 audit §4 / 5 fix §5 / 회피선 §6 / 검증 §7) |
| P0 | `docs/disclosure-policy.md` §4.1 (spouse-01) / §3.2·3.3 매트릭스 / §13 audit 패턴 v1.1 |
| P0 | `docs/information-surface-policy.md` v1.1 §2.6 (내부 용어) / §6.3 (메시지 길이) |
| P0 | `CLAUDE.md` (게임 핵심 원칙 / 한국어 품질 / archetype) |
| P0 | `src/data/emergenceHooks.ts` (진실 발화 영역 조정 — 사용자 명시) |
| P0 | `src/data/claimPolicies/spouse-01-structure-v2.json` (`name` 영역 / runtime 노출 추적) |
| P1 | `src/engine/discoveryEngine.ts` / `meterStagingV2.ts` / `gameEventTriggerEngine.ts` (chain unlock gating) |
| P1 | `src/engine/llmClient.ts` / `src/hooks/useActionDispatch.ts` (source label 영역 — minimal touch) |
| P1 | `src/components/pc/*` (추궁 / 모순 팝업 영역) |
| P1 | `src/app/pc.css` (단일 소유 영역) |
| P2 | `tmp/qa-script-polish-audit-results/findings.json` (P0 14건 정합) |
| P2 | `tmp/REQUEST-Codex-FreeQuestion-LLM-Hygiene-Fast-Fix.md` (병렬 영역) |

---

## 3. 작업 본질 (사용자 명시 5 fix)

### 5.1 증거 unlock surfaceName 사용
- `발신자 미상 문자` 영역만 노출 / `형 문자 스레드` 0건
- runtime 영역에서 `surfaceName` 우선 / `name` 직접 노출 X

### 5.2 chain unlock gating
- 사실 추궁 반복 → 자동 chain unlock X
- evidenceStage / truthStage / required evidence 조건 충족 후만
- minimal gating 정합 / 대형 리팩터 X

### 5.3 emergenceHooks.ts NPC B 진실 발화 조정
- 금지 lexeme: `형` / `형 사정` / `현금으로 전했다` / 기타 §4.1
- early 단계 → 모호한 방어 / 회피 (avoidant archetype)
- full truth → evidenceStage 적절 영역 이후 (S3+ gated / S5 자유)

### 5.4 내부 source label UI 노출 제거
- `[SCRIPT]` / `[FALLBACK]` / `[LLM]` UI 영역 0건
- 코드 debug log OK / UI 영역만 차단

### 5.5 추궁 / 모순 팝업 좌우 여백
- modal padding / max-width / mobile layout 정합
- pc.css 단일 소유 영역 (본 세션 owner)

---

## 4. 진행 순서

Phase A (사전 audit + 5 영역 식별) → 산출물 + 보고
→ Phase B (5 fix 적용 + screenshot 전후) → 보고
→ Phase C (사용자 명시 검증 7.1·7.2·7.3 + commit + push) → 보고

---

## 5. 절대 회피선 (사용자 명시 + CT)

### 사용자 명시
- `VITE_OPENAI_API_KEY` 재도입 X
- API proxy 구조 변경 X
- Script Polish 대량 patch 영역과 섞기 X
- Route Simulator 영역과 섞기 X

### CT 영역
- ScriptedText / caseData / 정책 영역 직접 수정 X (Patch 의뢰서 영역)
- baseline anchor / feature flag global default X
- LLM 호출 영역 본체 변경 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 대형 리팩터 X (source label 영역만 minimal)

### 단일 소유
- `src/app/pc.css` — 본 세션 단일 소유 / 다른 UI 세션 병렬 touch X

---

## 6. 산출물 위치

```
tmp/qa-spouse-01-phase2-spoiler-cascade-results/
├── 20260427-phase-a-audit.md
├── 20260427-phase-b-fix-summary.md
├── 20260427-phase-c-verification.md
├── 20260427-summary.md
├── surfacename-leak-grep-before-after.txt
├── source-label-grep-before-after.txt
├── chain-unlock-flow-diagram.md
└── screenshots/before/ + screenshots/after/
```

---

## 7. 종료 조건

- [ ] surfaceName 영역 정합 / `형 문자 스레드` UI 0건
- [ ] chain unlock 영역 조건 충족 후만 발생
- [ ] NPC B early 단계 영역 진실 lexeme 0건
- [ ] `[SCRIPT]` / `[FALLBACK]` / `[LLM]` UI 0건
- [ ] 추궁 / 모순 팝업 여백 정상 (screenshot 전후)
- [ ] regression 0 (S3+ / S5 / 다른 case)
- [ ] check:all / build:pc / tsc PASS
- [ ] commit + push
- [ ] CT-Main 보고

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A audit + 영역 식별 → CT-Main 보고 → Phase B·C.
