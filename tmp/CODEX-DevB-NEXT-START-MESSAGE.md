# Codex-Dev B 진입 메시지 — Free Interrogation Guard / Fallback (P0-B)

**세션 영역**: P0-B 자유심문 안전장치
**병렬**: P0-A (Codex-Dev A) / P0-C (Release QA)
**의뢰서 본문**: `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md`

---

## 1. 진입 조건 (반드시 먼저 실행)

```bash
git status --short --branch
git log --oneline -1                     # HEAD = c6ec522
git diff --quiet && git diff --cached --quiet
echo $?                                  # 0 = tracked clean
npm run check:all                        # hard 0 / warnings ≈ 157 baseline-known
```

**중단 조건**:
- HEAD 불일치
- tracked file modified/staged 있음
- `npm run check:all` hard issues > 0

---

## 2. 정독 자료 (필수)

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md` (이 세션 의뢰서) |
| P0 | `CLAUDE.md` (게임 핵심 원칙 + 한국어 품질 규칙) |
| P0 | `docs/disclosure-policy.md` (재활용 정책) |
| P0 | `src/engine/disclosureGuard.ts` (재활용 — `blockHiddenTruthLexemes`) |
| P0 | `src/engine/disclosurePolicyLoader.ts` (paraphrase set loader 재활용) |
| P1 | `src/data/disclosurePolicy/{spouse-01,family-01,friend-01}.json` (정책 데이터) |
| P1 | `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A — hook 인터페이스 합의) |
| P2 | `memory/feedback_truth_leak_prohibition.md` 영역 (CT 메모 — 본질) |

---

## 3. 작업 순서 (권장)

### Phase A — Spike
1. `freeInterrogationGuard` 1차 prototype (기존 `blockHiddenTruthLexemes` wrap)
2. fallback lookup 1차 prototype (spouse-01 박지연·이준호만 — 8 cell × 3 variants = 24 entries)
3. API 실패 simulation (timeout 5초 + retry 1회 + fallback)
4. 산출물: `tmp/qa-codex-dev-b-freeinterrogation-guard-results/20260427-spike-summary.md`

### Phase B — MVP 구현
1. `freeInterrogationGuard` 정식 (위험 lexeme + paraphrase + heuristic 통합)
2. fallback lookup 매트릭스 (6 NPC × 4 lieState bucket × 3+ variants = 72+ entries)
3. heuristic 검출 (캐릭터 무관 / intent 불일치 / 빈 응답)
4. feature flag `VITE_FREE_INTERROGATION_GUARD_MODE` default `fallback`
5. log mode = QA 전용 / 자동 진입 X
6. 위험 lexeme 50건 sample × API 실패 5회 × 빈 응답 3회 검증
7. 산출물: `tmp/qa-codex-dev-b-freeinterrogation-guard-results/20260427-mvp-summary.md`

---

## 4. 절대 회피선

- global `VITE_DISCLOSURE_GUARD_MODE` default 변경 X (`off` 유지)
- log/sanitize/block global 자동 진입 X (Phase 0 운영 영역 변경 X)
- 기존 `disclosureGuard.ts` 본체 변경 X (재사용만)
- ScriptedText / caseData / pc.css touch X
- baseline anchor 회귀 X
- `llmDialogueResolver.ts` 본체 변경 X (P0-A의 hook 자리만)
- 정책 (`docs/disclosure-policy.md`) 자동 변경 X

---

## 5. 산출물 위치

```
tmp/qa-codex-dev-b-freeinterrogation-guard-results/
├── 20260427-spike-summary.md
├── 20260427-mvp-summary.md
├── fallback-matrix.json              (72+ entries)
├── api-failure-simulation.log
├── lexeme-sample-results.json        (50건)
└── heuristic-detection-samples.json
```

---

## 6. 종료 조건

- [ ] `VITE_FREE_INTERROGATION_GUARD_MODE=fallback` (default) 동작 검증
- [ ] 위험 lexeme 50건 → fallback 100% pass
- [ ] API timeout × 5 / 빈 응답 × 3 → 게임 정지 X
- [ ] fallback 매트릭스 6 NPC × 4 lieState × 3+ variants 정합 검토
- [ ] log mode 자동 진입 X
- [ ] `npm run check:all` PASS / `npm run build` PASS / `npx tsc -b --force` PASS

---

## 7. 보고 / 협조

- Phase A 완료: spike summary commit + push → CT-Main 보고 + P0-A 인터페이스 합의
- Phase B 완료: MVP summary commit + push → CT-Main 보고

P0-A 인터페이스 합의 영역:
- `freeInterrogationFallback(text, ctx) → {action: 'pass'|'fallback', text: string}` 합의
- guard 진입점 위치 (LLM 응답 직후 / scripted path 우회 X)
- ctx schema (caseId / target / disputeId / lieState / interrogationType / evidence)

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A spike → CT-Main 보고.
