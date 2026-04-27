# FreeInterrogation Integration Finalize 진입 메시지 (Fallback 세션)

**세션 영역**: Free Interrogation MVP/Guard dirty 영역 통합 commit
**진입 조건**: Codex-Dev A·B 회수 실패 시점에만 진입 (CT-Main 명시 후)
**의뢰서 본문**: `tmp/REQUEST-FreeInterrogation-Integration-Finalize.md`

---

## 1. 진입 조건 (이 의뢰서는 다른 의뢰서와 다름)

```bash
git pull origin main
git log --oneline -1
git status --short --branch
```

**기대 상태**: working tree에 다음 영역 dirty 잔존 (이 영역을 정리하기 위한 세션):
- `src/components/actions/QuestionSelector.tsx`
- `src/components/pc/hotbar/PCBottomDock.tsx`
- `src/engine/llmDialogueResolver.ts`
- `src/engine/llmFreeQuestion.ts`
- `src/hooks/useActionDispatch.ts`
- `src/types/dialogue.ts`
- `src/types/index.ts`
- `src/components/freeInterrogation/` (untracked)
- `src/engine/freeInterrogation/` (untracked)
- `src/types/freeInterrogation.ts` (untracked)
- `src/types/freeInterrogationGuard.ts` (untracked)
- `tmp/qa-codex-dev-a-freeinterrogation-results/` (untracked)
- `tmp/qa-codex-dev-b-freeinterrogation-guard-results/` (untracked)

**중단 조건**:
- HEAD 불일치 (CT-Main 안내 SHA와 다름)
- 위 영역 외 추가 dirty 발견 → 즉시 CT-Main 보고
- `pc.css` modified/staged 발견 → 즉시 CT-Main 보고 (UI 서브 스레드 영역 충돌 가능성)
- Codex-Dev A·B 세션이 아직 활성 상태로 보임 → 충돌 회피 / 사용자 확인

---

## 2. 필수 정독

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-FreeInterrogation-Integration-Finalize.md` (이 세션 의뢰서) |
| P0 | `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A 본질 + 종료 조건) |
| P0 | `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md` (P0-B 본질 + 종료 조건) |
| P0 | `tmp/qa-codex-dev-a-freeinterrogation-results/*` (Codex-Dev A 산출물) |
| P0 | `tmp/qa-codex-dev-b-freeinterrogation-guard-results/*` (Codex-Dev B 산출물) |
| P1 | `CLAUDE.md` (게임 핵심 원칙 / 한국어 품질) |
| P1 | `docs/disclosure-policy.md` / `docs/information-surface-policy.md` v1.1 |

---

## 3. 작업 순서

### Phase A — 분석 (read-only)
1. 각 modified 파일 `git diff` 분석 + P0-A·P0-B 영역 분류
2. 신규 디렉토리 / 파일 list + 의뢰서 영역 매핑
3. 산출물 read + 작업 완성도 판정
4. 산출물: `tmp/qa-finalize-results/20260427-dirty-classification.md`

### Phase B — 마무리 (write OK)
1. 분석 결과 기반 마무리 (코드 build 가능 + 의뢰서 본질 정합)
2. P0-A·B 의뢰서 §8 종료 조건 누락 영역 보강
3. 검증: `npm run check:all` PASS / `npm run build` PASS / `npx tsc -b --force` PASS
4. **단일 통합 commit + push**
5. CT-Main 보고

### Phase C — 사후
1. 산출물 영역 commit (같은 commit 또는 별도)
2. CT-Main에 commit SHA + 진입 가능 영역 (Thread-QA + P0-E + P0-F) 안내

---

## 4. 절대 회피선

- **`stash` / `discard` / `reset` 절대 X**
- **`src/app/pc.css` touch X**
- ScriptedText / caseData / baseline anchor 회귀 X
- feature flag global default 변경 X (`VITE_DISCLOSURE_GUARD_MODE=off` 유지)
- 의뢰서 scope 외 영역 추가 X
- 무제한 자유심문 X
- 정책 자동 변경 X

---

## 5. 종료 조건

- [ ] Phase A 분석 보고서 작성
- [ ] Phase B 마무리 + 통합 commit + push
- [ ] working tree tracked clean
- [ ] `npm run check:all` / `npm run build` / `npx tsc -b --force` PASS
- [ ] CT-Main 보고

---

**시작 영역**: 진입 조건 검사 → Phase A 분석 (read-only) → CT-Main 보고 → Phase B 진입.
