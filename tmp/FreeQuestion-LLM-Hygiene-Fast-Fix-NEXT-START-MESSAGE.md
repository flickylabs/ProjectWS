# Codex-Dev Free Question Hygiene Fast Fix 진입 메시지 (P0급 — scope 축소 / #1과 병렬)

**세션 영역**: 자유 질문 hygiene fast fix — intent / contextMapper / fallback 품질 / 검증 case
**병렬**: #1 spouse-01 Phase 2 Spoiler Cascade Fast Fix (write scope 분리 영역)
**의뢰서 본문**: `tmp/REQUEST-Codex-FreeQuestion-LLM-Hygiene-Fast-Fix.md` (v2 — scope 축소)

⚠️ **scope 축소 영역**: source label 영역 / pc.css / emergenceHooks / discovery / gating / API proxy 영역 모두 #1 영역 / 본 세션 touch X.

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

**#1 영역 변경 영역 (예: `pc.css` / `llmClient.ts` source label 영역 / `emergenceHooks.ts`) staged 또는 modified 발견 시 즉시 중단 + 보고**.

---

## 2. 필수 정독

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-Codex-FreeQuestion-LLM-Hygiene-Fast-Fix.md` v2 (의뢰서 — 사전 audit / 5 허용 / 4 금지 / 회피선) |
| P0 | `docs/information-surface-policy.md` v1.1 §5.1·6.6 (자유심문 노출 영역) |
| P0 | `docs/disclosure-policy.md` §3.3 매트릭스 |
| P0 | `CLAUDE.md` (게임 핵심 / 한국어 품질) |
| P1 | `src/engine/freeInterrogation/intentClassifier.ts` |
| P1 | `src/engine/freeInterrogation/contextMapper.ts` |
| P1 | `src/engine/freeInterrogation/fallback.ts` (P0-B 매트릭스 — review) |
| P1 | `src/engine/freeInterrogation/heuristic.ts` / `index.ts` |
| P2 | `tmp/REQUEST-Codex-Spouse-01-Phase2-Spoiler-Cascade-Fast-Fix.md` (#1 영역 — 병렬 / 충돌 회피 본질) |
| P2 | `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` / `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md` (P0-A·B 본질 영역) |

---

## 3. 작업 본질 (사용자 명시 5 허용 / 4 금지)

### 허용
1. **intentClassifier 과매칭 축소** — 무관 질문 active intent 강제 분류 회피
2. **meta/off-topic `unmapped` 처리** — 게임 외 / 인사 / 메타 영역
3. **contextMapper 자동 매핑 완화** — `unmapped` / confidence 낮은 영역 active dispute 매핑 X
4. **safe fallback 품질** — archetype / lieState / 한국어 자연체 / 호칭 정합 (P0-B 매트릭스 review)
5. **자유 질문 검증 케이스** — 35 sample (10 무관 + 10 메타 + 10 의도 + 5 confidence)

### 금지
- **source label 영역 수정 X** (`[SCRIPT]` / `[FALLBACK]` / `[LLM]` — #1 영역)
- **pc.css touch X** (#1 단일 소유 영역)
- **emergenceHooks / discovery / meterStaging / gameEventTrigger 수정 X** (#1 영역)
- **API proxy 구조 수정 X** (Proxy Migration `596d235` 정합)

---

## 4. 진행 순서

Phase A (audit + 35 sample case 영역 작성) → 보고
→ Phase B (5 영역 fix) → 보고
→ Phase C (검증 — 35 sample 영역 + regression + 빌드) → commit + push + 보고

---

## 5. 절대 회피선

### 사용자 명시 4 금지
- source label 영역 / pc.css / emergenceHooks·discovery·gating / API proxy 구조 모두 #1 영역 / 본 세션 touch X

### CT 영역
- ScriptedText / caseData / 정책 / baseline anchor / feature flag global default X
- LLM 호출 영역 본체 변경 X
- VITE_OPENAI_API_KEY 참조 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 변경 X (read only)
- 새 큐 / 새 trigger / 새 컷씬 X
- 7 intent taxonomy 변경 X

### #1과 충돌 회피
- write scope = `src/engine/freeInterrogation/*` 만
- 진입 시 #1 영역 변경 영역 stage / modified 발견 시 즉시 중단 + 보고

---

## 6. 산출물 위치

```
tmp/qa-codex-freequestion-hygiene-results/
├── 20260427-phase-a-audit.md
├── 20260427-phase-b-fix-summary.md
├── 20260427-phase-c-verification.md
├── intent-validation-cases.json        (35 sample)
├── unmapped-samples.json
├── mapped-samples.json
├── safe-fallback-quality-review.md
└── 20260427-summary.md
```

---

## 7. 종료 조건

- [ ] intentClassifier 과매칭 축소
- [ ] 무관/메타 20 sample 100% `unmapped`
- [ ] confidence 5 sample `unmapped` 정합
- [ ] 의도 매핑 10 sample regression 0
- [ ] safe fallback 품질 review (archetype / lieState / 자연체 / 호칭)
- [ ] **#1 영역 touch 0건** (source label / pc.css / emergenceHooks / discovery / gating / API proxy)
- [ ] check:all / build:pc / tsc PASS
- [ ] commit + push
- [ ] CT-Main 보고

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A audit + 35 sample → CT-Main 보고 → Phase B·C.
