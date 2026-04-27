# 세션 시작 — Script Runtime QA Gate (v3 — Phase A MVP fast simulator 영역 좁힘 영역 / 사용자 결정 영역)

ClaudeCode CT-Main에서 의뢰합니다 (v3 — Phase A 영역 MVP fast simulator 영역 좁힘 영역 / 사용자 결정 영역).

⚠️ **사용자 명시 영역 (v3)**:
- 전체 Gate 영역 한 번에 완성 영역 X
- **Phase A 영역 = lightweight script QA simulator MVP 영역 본질**
- 목적 = 스크립트 체크 속도 빠르게 끌어올림
- 검출 도구 + 결과 영역 본질 (patch 영역 X / 후속 영역)
- spouse-01 Phase 2 영역 끝까지 → CT-Main 보고 → family/friend 확장 영역 후속 (사용자 결정)

⚠️ **선행 영역 commit + push 완료 영역 후 진입**:
- #1 Spoiler Cascade Finalize: `7a2b693` ✅
- #2 Free Question Hygiene v2: `59a26d4` ✅

---

## 1. git pull + 진입 조건 검사

```bash
git pull origin main
git log --oneline -1                     # 최신 main HEAD = 59a26d4 영역 정합 영역 확인
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
npm run build:pc
npx tsc -b --force
```

PASS 후 진행. tracked dirty / hard > 0 / build fail → 즉시 중단 + CT-Main 보고.

**untracked 영역 2개 보존 영역** (사용자 명시 영역 — rm/stash/discard X):
- `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md`
- `tmp/PASTE-Codex-Spouse-01-Phase2-Finalize-FIRST-MESSAGE.md`

---

## 2. 필수 정독

1. `tmp/REQUEST-Codex-Route-Simulator.md` v3 (**의뢰서 — Phase A MVP / 8 검출 / 우선 범위 / 원칙**)
2. `docs/disclosure-policy.md` (truth lexeme / §13 audit 패턴 / §3.2·3.3 매트릭스 / §4.1·4.2·4.3 surface vs truth)
3. `docs/information-surface-policy.md` v1.1 §2.1·2.6·5.1·5.5·6.3
4. `docs/spot-check-format.md` (8필드 + 분류)
5. `CLAUDE.md` (게임 핵심 / Phase 8단계 / 한국어 품질)
6. `src/data/{scriptedText,cases/generated,disclosurePolicy,emergenceHooks}` 영역 — **read-only**
7. `src/data/cases/generated/spouse-01.json` (caseData / disputes / evidence / dossier 영역)
8. `src/data/scriptedText/spouse-01.json` (interrogation / contradiction / evidence_present 영역)
9. `src/data/disclosurePolicy/spouse-01.json` (truth lexeme / surface map / lieState gate 영역)

---

## 3. 작업 본질 (v3 — Phase A MVP)

### 우선 범위 (사용자 명시 5 영역)
- **actual OpenAI 호출 X**
- **browser full playthrough X**
- **src runtime 본체 수정 X**
- **ScriptedText / caseData / disclosurePolicy / emergenceHooks read-only**
- **신규 write 영역 = `scripts/qa-runtime-gate.*` / `tmp/qa-runtime-gate-manifests/*` / `tmp/qa-runtime-gate-results/*` 영역만**

### MVP 기능 (사용자 명시 6 영역)
1. **manifest 영역** — spouse-01 Phase 2 route manifest 영역 read 또는 minimal create
2. **transcript 영역** — scriptedText / caseData / disclosurePolicy / emergenceHooks read → action-by-action transcript 생성
3. **빠른 검출 8 영역**:
   - (a) 응답 누락
   - (b) `[SCRIPT]` / `[FALLBACK]` / `[LLM]` 내부 label 노출
   - (c) locked evidence `name` 노출
   - (d) `surfaceName` 대신 truth `name` 노출
   - (e) S0~S2 truth lexeme 노출 (`docs/disclosure-policy.md` §4.1 영역 정합)
   - (f) `evidenceStage` 이전 hidden / truth description 노출
   - (g) 명백한 Q-A mismatch 후보 (action type / disputeId / target / evidenceId vs response focus)
   - (h) generic fallback / archetype 무관 fallback 후보
4. **findings.json 영역** — `tmp/qa-runtime-gate-results/findings.json`
5. **route transcript 영역** — `tmp/qa-runtime-gate-results/route-transcripts/spouse-01-phase2-fast.md`
6. **spike summary 영역** — `tmp/qa-runtime-gate-results/20260427-spike-summary.md` (한계 + 다음 확장 계획 영역 명시)

### 우선 대상
- **spouse-01 Phase 2 영역 끝까지** (`fact_pursuit` 반복 / evidence unlock / dispute emergence / NPC B response cascade 영역)
- 끝까지 돌리고 → CT-Main 보고 → family-01 / friend-01 확장 영역 = **사용자 결정 영역 후 진입**

### 원칙 (사용자 명시)
- **개별 문장 patch 금지**
- **root cause 없이 ScriptedText 수정 금지**
- **"검출 도구 + 결과"가 목적 영역 본질** (patch 영역 X / 후속 영역)

---

## 4. 진행 순서 (v3 — Phase A MVP만 이번 세션 영역)

```
Phase A MVP — spouse-01 Phase 2 끝까지
   ├─ manifest 영역 (read 또는 minimal create)
   ├─ transcript 영역 (action-by-action)
   ├─ 8 검출 영역 (빠르게)
   ├─ findings.json + route-transcript + spike-summary
   ├─ check:all + build:pc + tsc PASS
   ├─ commit + push
   └─ CT-Main 보고

→ Phase B (family/friend 확장) / Phase C (통합) = 사용자 결정 영역 후 진입
```

---

## 5. 산출물 위치 (Phase A MVP)

```
scripts/
└── qa-runtime-gate.{cjs|mjs|ts}                      (기술 영역 Codex-Dev 결정)

tmp/qa-runtime-gate-manifests/
└── spouse-01.json                                    (Phase 2 영역 minimal manifest)

tmp/qa-runtime-gate-results/
├── findings.json                                     (8필드 + severity + category)
├── route-transcripts/
│   └── spouse-01-phase2-fast.md                     (action-by-action 영역)
└── 20260427-spike-summary.md                         (한계 + 다음 확장 계획)
```

---

## 6. 절대 회피선

### 사용자 명시 (v3 영역)
- 개별 문장 patch X
- root cause 없이 ScriptedText 수정 X
- Script Patch 대량 진입 X (Gate 영역 결과 입력 영역 후속 영역 본질)

### 우선 범위 외 영역 (사용자 명시)
- actual OpenAI 호출 X (mock / fallback 영역만)
- browser full playthrough harness X
- src runtime 본체 수정 X
- ScriptedText / caseData / disclosurePolicy / emergenceHooks 영역 write X (read-only)

### CT 영역
- ScriptedText / caseData / 정책 / pc.css / baseline anchor / feature flag global default X
- gameplay runtime 대형 리팩터 X
- VITE_OPENAI_API_KEY / OPENAI_API_KEY 참조 X (Proxy `596d235` 정합)
- LLM sampling harness X / browser full playthrough harness X
- Release QA / Script Polish / Spoiler Cascade / Free Question Hygiene 산출물 영역 섞기 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 본체 변경 X (read only)
- secret / 실제 키 / 사용자 PII 영역 출력 X

### untracked 2개 영역 (사용자 명시)
- `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md` — **보존 영역**
- `tmp/PASTE-Codex-Spouse-01-Phase2-Finalize-FIRST-MESSAGE.md` — **보존 영역**
- rm / stash / discard / git clean / 정리 영역 X

---

**시작 영역**: 진입 조건 검사 → HEAD `59a26d4` 정합 확인 → 정독 → Phase A MVP fast simulator → spouse-01 Phase 2 끝까지 → check:all + build:pc + tsc PASS → commit + push → CT-Main 보고.
