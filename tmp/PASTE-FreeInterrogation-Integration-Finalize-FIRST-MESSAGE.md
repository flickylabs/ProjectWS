# 세션 시작 — FreeInterrogation Integration Finalize (Fallback 세션)

ClaudeCode CT-Main에서 의뢰합니다. **Codex-Dev A·B가 본인 작업 commit 회수 실패한 영역**의 working tree dirty를 단일 통합 commit으로 정리하는 영역입니다.

⚠️ **이 의뢰서는 다른 의뢰서와 진입 조건이 다릅니다** — working tree dirty 영역이 **정상 진입 상태**입니다.

---

## 1. 진입 조건 검사

```bash
git pull origin main
git log --oneline -1
git status --short --branch
```

**기대 상태**: working tree에 11 파일 + 2 산출물 디렉토리 dirty 잔존 (의뢰서 §4 영역).

**중단 조건**:
- HEAD 불일치 (CT-Main 안내 SHA와 다름)
- §4 외 추가 dirty 발견 → 즉시 CT-Main 보고
- `pc.css` modified/staged 발견 → 즉시 CT-Main 보고
- Codex-Dev A·B 세션이 아직 활성 상태 → 사용자 확인

---

## 2. 필수 정독

1. `tmp/FreeInterrogation-Integration-Finalize-NEXT-START-MESSAGE.md` (진입 메시지)
2. `tmp/REQUEST-FreeInterrogation-Integration-Finalize.md` (**의뢰서 본문**)
3. `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A 본질 + 종료 조건)
4. `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md` (P0-B 본질 + 종료 조건)
5. `tmp/qa-codex-dev-a-freeinterrogation-results/*` (Codex-Dev A 산출물 read)
6. `tmp/qa-codex-dev-b-freeinterrogation-guard-results/*` (Codex-Dev B 산출물 read)
7. `CLAUDE.md` (게임 핵심 원칙 / 한국어 품질)

---

## 3. 작업 본질

### Phase A — 분석 (read-only)
- 7 modified 파일 diff 분석 → P0-A / P0-B / 양측 섞임 분류
- 4 untracked (`src/components/freeInterrogation/` 등) 영역 매핑
- Codex-Dev A·B 산출물 read → 작업 완성도 판정
- 보고서: `tmp/qa-finalize-results/20260427-dirty-classification.md`

### Phase B — 마무리
- 분석 결과 기반 build 가능 상태로 마무리
- P0-A·B 의뢰서 §8 종료 조건 누락 영역 보강
- 검증 PASS:
  - `npm run check:all` (hard 0)
  - `npm run build`
  - `npx tsc -b --force`
- **단일 통합 commit + push**
- CT-Main 보고

### Phase C — 사후
- 산출물 commit
- CT-Main에 commit SHA + 진입 가능 영역 (Thread-QA + P0-E + P0-F) 안내

---

## 4. 절대 회피선

- **`stash` / `discard` / `reset` 절대 X** (작업 영역 손실 — 사용자 명시)
- **`src/app/pc.css` touch X** (UI 서브 스레드 영역)
- ScriptedText / caseData / baseline anchor 회귀 X
- feature flag global default 변경 X
- 의뢰서 scope 외 영역 추가 X
- 무제한 자유심문 X
- 정책 자동 변경 X

---

## 5. 산출물 위치

```
tmp/qa-finalize-results/
├── 20260427-dirty-classification.md   (Phase A 분석)
├── 20260427-finalize-summary.md       (Phase B 영역)
├── diff-analysis-per-file.md
└── coverage-vs-request.md
```

---

**시작 영역**: 진입 조건 검사 → Phase A 분석 (read-only) → CT-Main 보고 → Phase B 진입.
