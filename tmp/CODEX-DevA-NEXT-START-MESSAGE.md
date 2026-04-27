# Codex-Dev A 진입 메시지 — Limited Free Interrogation MVP (P0-A)

**세션 영역**: P0-A 자유심문 MVP 구현
**병렬**: P0-B (Codex-Dev B) / P0-C (Release QA)
**의뢰서 본문**: `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md`

---

## 1. 진입 조건 (반드시 먼저 실행)

```bash
git status --short --branch
git log --oneline -1                     # HEAD = c6ec522
git diff --quiet && git diff --cached --quiet
echo $?                                  # 0 = tracked clean / non-zero = 중단
npm run check:all                        # hard 0 / warnings ≈ 157 baseline-known
```

**중단 조건** (즉시 작업 중단 + CT-Main 보고):
- HEAD 불일치
- tracked file modified/staged 있음 (untracked는 무시 — 자기 영역 결과 파일 정상)
- `npm run check:all` hard issues > 0

---

## 2. 정독 자료 (필수)

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (이 세션 의뢰서) |
| P0 | `CLAUDE.md` (게임 핵심 원칙 + 한국어 품질 규칙) |
| P0 | `docs/disclosure-policy.md` (재활용 정책 — guard pipeline 입력) |
| P1 | `src/engine/disclosureGuard.ts` (Tier 3 guard MVP — 재활용) |
| P1 | `src/engine/llmDialogueResolver.ts` (LLM pipeline — 재활용) |
| P1 | `src/engine/blueprintPromptBuilderV2.ts` (프롬프트 조립 — 재활용) |
| P1 | `src/engine/atomSelectionEngine.ts` (atom 선택 — 재활용) |
| P2 | `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md` (P0-B 인터페이스 합의 영역) |

---

## 3. 작업 순서 (권장)

### Phase A — Spike (1차 검증)
1. intent classifier 1차 prototype (rule-based 7 intent)
2. contextMapper 1차 prototype (caseId × target × disputeId × type × evidence)
3. spouse-01 Phase 3 interrogation 단계에서 자유 질문 5개 sample 처리
4. 산출물: `tmp/qa-codex-dev-a-freeinterrogation-results/20260427-spike-summary.md`

### Phase B — MVP 구현
1. UI: `FreeQuestionInput.tsx` (interrogation 단계 노출, max 100자)
2. intent classifier 2차 (rule + LLM-aided 조합)
3. contextMapper 정식 (3 case 모두 대응)
4. fallback hook 자리 (P0-B 인터페이스)
5. feature flag `VITE_FREE_INTERROGATION_MODE` default `off`
6. 7 intent × 5 sample = 35건 검증
7. 산출물: `tmp/qa-codex-dev-a-freeinterrogation-results/20260427-mvp-summary.md`

---

## 4. 절대 회피선

- ScriptedText / caseData 직접 수정 X
- baseline anchor (v1·v2) 회귀 X
- feature flag global default 변경 X (`VITE_DISCLOSURE_GUARD_MODE=off` 유지)
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- pc.css touch X (UI 서브 스레드 영역)
- 정책 자동 변경 X
- 무제한 자유심문 X

---

## 5. 산출물 위치

```
tmp/qa-codex-dev-a-freeinterrogation-results/
├── 20260427-spike-summary.md          (Phase A)
├── 20260427-mvp-summary.md            (Phase B)
├── intent-classifier-samples.json     (35건)
├── api-failure-simulation.log         (timeout / drop / empty)
└── screenshots/                       (preview mode UI)
```

---

## 6. 종료 조건

- [ ] feature flag `preview` 모드 spouse/family/friend 각 5 sample 7 intent 처리 PASS
- [ ] 실패 기준 7종 각 0건
- [ ] API 실패 시 게임 정지 X
- [ ] feature flag default `off` 시 자유심문 UI 비노출
- [ ] `npm run check:all` PASS (hard 0)
- [ ] `npm run build` PASS / `npx tsc -b --force` PASS

---

## 7. 보고

- Phase A 완료: spike summary commit + push (별도 brunch 또는 `tmp/` 영역 commit) → CT-Main 보고
- Phase B 완료: MVP summary commit + push → CT-Main 보고 + P0-B 인터페이스 합의

협조 영역 (P0-B와 합의):
- `freeInterrogationFallback(text, ctx) → {action: 'pass'|'fallback', text: string}` 인터페이스 합의
- guard 진입점 위치 (P0-A의 LLM 응답 직후 hook)

---

**시작 영역**: 위 진입 조건 검사 → 정독 자료 → Phase A spike → CT-Main 보고.
