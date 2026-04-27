# REQUEST — FreeInterrogation Integration Finalize (Fallback 세션)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**상태**: 사전 작성 (Codex-Dev A·B 회수 실패 시점에만 진입)
**우선순위**: P0 (출시 전 — Thread-QA 진입 차단 영역 해소)

---

## 1. 진입 조건

이 의뢰서는 **다른 의뢰서와 진입 조건이 다름**. 일반 의뢰서는 "tracked clean"에서 진입하지만, **이 의뢰서는 working tree dirty 영역을 정리하기 위한 영역**.

### 1.1 진입 트리거 (다음 중 하나 충족 시 활성)
- (a) Codex-Dev A·B 두 세션 모두 회수 실패 ("not mine" 또는 무응답)
- (b) Codex-Dev A·B 한쪽만 일부 영역 회수 + 나머지 dirty 잔류
- (c) 같은 파일에 A·B 변경이 섞여 있어 분리 commit 불가 — Codex-Dev 보고
- (d) 사용자 명시로 이 세션 신설

### 1.2 진입 영역
- HEAD: 현재 main 최신 (`git pull origin main`)
- working tree: **dirty 영역이 정상** (이 영역을 정리하기 위한 세션)
- `pc.css` modified/staged 발견 시 → 별도 검토 영역 / 임의 stage X
- Codex-Dev A·B 두 세션 닫힘 또는 정지 상태 확인 (충돌 회피)

---

## 2. 목표

현재 working tree에 남은 Free Interrogation MVP/Guard 작업 영역(11 파일 + 2 산출물 디렉토리)을 **단일 통합 commit**으로 정리. discard / stash X.

목표 시나리오 1순위:
- 코드 build 가능 + check:all PASS + 통합 commit + push
- 기존 P0-A (`REQUEST-Codex-DevA-FreeInterrogation-MVP.md`) + P0-B (`REQUEST-Codex-DevB-FreeInterrogation-Guard.md`) 의뢰서 본질에 정합
- Thread-QA + P0-E + P0-F 진입 차단 해소

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / 의뢰서 본질 검수 | CT-Main |
| **이 세션 (Integration Finalize)** | **dirty 분석 / 마무리 / 통합 commit** |
| 회수 안 된 Codex-Dev A·B | 닫힘 또는 보고 받음 |
| 검증 후 진입 | Thread-QA + P0-E + P0-F |

---

## 4. 대상 영역 (사전 식별 — 진입 시 재확인 필수)

### 4.1 Modified
- `src/components/actions/QuestionSelector.tsx`
- `src/components/pc/hotbar/PCBottomDock.tsx`
- `src/engine/llmDialogueResolver.ts`
- `src/engine/llmFreeQuestion.ts`
- `src/hooks/useActionDispatch.ts`
- `src/types/dialogue.ts`
- `src/types/index.ts`

### 4.2 Untracked (신규)
- `src/components/freeInterrogation/` (P0-A `FreeQuestionInput` 영역)
- `src/engine/freeInterrogation/` (P0-A intent/contextMapper + P0-B guard/fallback/heuristic)
- `src/types/freeInterrogation.ts` (P0-A 타입)
- `src/types/freeInterrogationGuard.ts` (P0-B 타입)

### 4.3 산출물
- `tmp/qa-codex-dev-a-freeinterrogation-results/`
- `tmp/qa-codex-dev-b-freeinterrogation-guard-results/`

### 4.4 진입 시 재확인
- `git status --short --branch` 결과가 위 13 영역과 일치하는지 확인
- 추가 영역 발견 시 분석 + CT-Main 보고
- 누락 영역 발견 시 분석 + CT-Main 보고

---

## 5. 작업 순서

### Phase A — 분석 (read-only)

1. **각 modified 파일 diff 분석**
   - `git diff src/components/actions/QuestionSelector.tsx` 등 각 파일별
   - 변경 내용이 P0-A 영역인지 / P0-B 영역인지 / 양측 섞여 있는지 분류
   - 분류 결과: `tmp/qa-finalize-results/20260427-dirty-classification.md`

2. **신규 디렉토리 / 파일 분석**
   - `src/components/freeInterrogation/` 안 파일 list + 의뢰서 영역 매핑
   - `src/engine/freeInterrogation/` 안 파일 list + 의뢰서 영역 매핑
   - `src/types/freeInterrogation*.ts` 영역 매핑

3. **산출물 분석**
   - `tmp/qa-codex-dev-a-freeinterrogation-results/` 안 summary.md / sample / 검증 결과 read
   - `tmp/qa-codex-dev-b-freeinterrogation-guard-results/` 안 summary.md / fallback 매트릭스 등 read
   - 각 작업 완성도 / Phase A spike 단계 / Phase B MVP 단계 판정

4. **결정 (사용자 명시 영역)**:
   - 살릴 영역 vs 폐기 영역 vs 보강 영역 분리
   - 보강 영역이면 어디까지 마무리할지 정의

### Phase B — 마무리 (write 영역)

1. 분석 결과 기반 마무리 (코드 build 가능 + 의뢰서 본질 정합)
2. **추가 작업 영역**: P0-A 의뢰서 §8 종료 조건 / P0-B 의뢰서 §8 종료 조건 영역에서 누락된 영역 보강
3. 검증:
   - `npm run check:all` PASS (hard 0)
   - `npm run build` PASS
   - `npx tsc -b --force` PASS
4. **단일 통합 commit**:
   - message 권장: `feat(freeInterrogation): integration finalize — P0-A MVP + P0-B Guard merged`
   - 또는 영역별 분할 commit (P0-A 영역 + P0-B 영역) — 같은 파일 충돌 시 분리 불가능 → 단일 commit
5. push origin main
6. CT-Main 보고

### Phase C — 사후

1. 산출물 영역 (`tmp/qa-codex-dev-a-freeinterrogation-results/` + `tmp/qa-codex-dev-b-freeinterrogation-guard-results/`)을 별도 commit 또는 같은 commit 영역
2. CT-Main 보고: 통합 commit SHA + 진입 가능 영역 (Thread-QA + P0-E + P0-F)

---

## 6. 절대 회피선

- **`stash` / `discard` / `reset` 절대 X** (작업 영역 손실 위험 — 사용자 명시)
- **`src/app/pc.css` touch X** (UI 서브 스레드 영역)
- ScriptedText / caseData / baseline anchor 회귀 X
- feature flag global default 변경 X (`VITE_DISCLOSURE_GUARD_MODE=off` 유지)
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` **대형 리팩터 X** (단 P0-A·B 의뢰서가 명시한 hook 영역 변경은 OK — 분석 후 의뢰서 본질 정합 영역만)
- 정책 (`docs/disclosure-policy.md` / `docs/information-surface-policy.md`) 자동 변경 X
- 무제한 자유심문 X
- 의뢰서 본질 외 영역 추가 X (P0-A·B 의뢰서가 정의한 scope만 마무리)

---

## 7. 종료 조건

- [ ] Phase A 분석 결과 `tmp/qa-finalize-results/20260427-dirty-classification.md` 작성
- [ ] Phase B 마무리 코드 build 가능
- [ ] `npm run check:all` PASS (hard 0)
- [ ] `npm run build` PASS
- [ ] `npx tsc -b --force` PASS
- [ ] 통합 commit + push 완료
- [ ] working tree tracked clean (untracked만 남음 / 또는 0)
- [ ] CT-Main 보고: commit SHA + 진입 가능 영역 안내
- [ ] 산출물: `tmp/qa-finalize-results/20260427-finalize-summary.md`

---

## 8. 산출물

```
tmp/qa-finalize-results/
├── 20260427-dirty-classification.md   (Phase A 분석)
├── 20260427-finalize-summary.md       (Phase B 마무리 영역 + 검증 결과)
├── diff-analysis-per-file.md          (modified 7 파일 diff 분류)
└── coverage-vs-request.md             (P0-A·B 의뢰서 종료 조건 대비 coverage)
```

---

## 9. 관련 자료

- `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A 의뢰서 본질)
- `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md` (P0-B 의뢰서 본질)
- `tmp/qa-codex-dev-a-freeinterrogation-results/` (Codex-Dev A 산출물 — Phase A 분석 영역)
- `tmp/qa-codex-dev-b-freeinterrogation-guard-results/` (Codex-Dev B 산출물 — 동)
- `docs/disclosure-policy.md` / `docs/information-surface-policy.md` v1.1 (정책 영역)
- `CLAUDE.md` (게임 핵심 원칙 / 한국어 품질)
- 본 세션 진입 메시지: `tmp/FreeInterrogation-Integration-Finalize-NEXT-START-MESSAGE.md`

---

**상태**: 사전 작성 완료. **Codex-Dev A·B 회수 결과 확인 후에만 진입** (사용자 명시 영역).
