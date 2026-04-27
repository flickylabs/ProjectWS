# 세션 시작 — Free Interrogation Guard / Fallback (P0-B)

ClaudeCode CT-Main에서 의뢰합니다. 자유심문 LLM 응답 경로 **launch-safe gate** 구축 영역입니다.

---

## 1. git pull + 진입 조건 검사 (먼저 실행)

```bash
git pull origin main
git log --oneline -1
git status --short
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
```

PASS 후 진행. tracked dirty / hard > 0 → 즉시 중단 + CT-Main 보고.

---

## 2. 필수 정독 (순서대로)

1. `tmp/CODEX-DevB-NEXT-START-MESSAGE.md` (진입 메시지)
2. `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md` (**의뢰서 본문 — guard 차원 / fallback 매트릭스 / 실패 기준**)
3. `CLAUDE.md` (게임 핵심 원칙 + 한국어 품질 규칙)
4. `docs/disclosure-policy.md` (재활용 정책)
5. `src/engine/disclosureGuard.ts` / `src/engine/disclosurePolicyLoader.ts` (**재활용** — `blockHiddenTruthLexemes` 그대로 호출)
6. `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A — hook 인터페이스 합의)

---

## 3. 작업 본질

- `src/engine/freeInterrogation/guard.ts` (기존 `blockHiddenTruthLexemes` wrap + 자유심문 추가 차원)
- `src/engine/freeInterrogation/fallback.ts` (**6 NPC × 4 lieState bucket × 3+ variants = 72+ entries**)
- `src/engine/freeInterrogation/heuristic.ts` (캐릭터 무관 / intent 불일치 / 빈 응답 검출)
- API 실패 / timeout / 빈 응답 → 안전 fallback (게임 정지 X)
- Feature flag: `VITE_FREE_INTERROGATION_GUARD_MODE=off|log|fallback` default `fallback`
- log mode = QA 전용 / 자동 진입 X

---

## 4. Fallback 매트릭스 영역

| NPC (6) | lieState bucket (4) | variants (3+) |
|---|---|---|
| spouse-01 박지연 (victim_cosplay) | S0~S1 / S2 / S3+ / S4·S5 | 각 3+ |
| spouse-01 이준호 (avoidant) | 〃 | 〃 |
| family-01 윤태성 (confrontational) | 〃 | 〃 |
| family-01 윤정후 (affect_flattening) | 〃 | 〃 |
| friend-01 송다은 (premature_summary) | 〃 | 〃 |
| friend-01 최수민 (affect_flattening) | 〃 | 〃 |

조건: archetype 정합 / lieState 정합 / 한국어 자연체 (번역체 9패턴 X) / 호칭·존칭 정합.

---

## 5. 진행 순서

Phase A (spike — 박지연·이준호 fallback 24 entries + lexeme 1차) → commit + push + CT-Main 보고 + P0-A hook 인터페이스 합의
→ Phase B (MVP — 매트릭스 72+ / heuristic / API 실패 시뮬) → commit + push + CT-Main 보고

---

## 6. 병렬 영역

- **P0-A** (Codex-Dev A, 자유심문 MVP) — `freeInterrogationFallback(text, ctx) → {action, text}` 인터페이스 합의
- **P0-C** (Release QA) — 별개 트랙

---

## 7. 산출물 위치

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

## 8. 절대 회피선

- `VITE_DISCLOSURE_GUARD_MODE` global default 변경 X (`off` 유지 — Phase 0 운영 영역 변경 X)
- log/sanitize/block global 자동 진입 X
- 기존 `disclosureGuard.ts` 본체 변경 X (재사용만 / 새 영역은 `freeInterrogation/` 하위)
- `llmDialogueResolver.ts` 본체 변경 X (P0-A의 hook 자리만)
- ScriptedText / caseData / pc.css / baseline anchor 회귀 X
- 정책 (`docs/disclosure-policy.md`) 자동 변경 X
- log mode 자동 진입 X (사용자 명시 영역)

---

**시작 영역**: 진입 조건 검사부터.
