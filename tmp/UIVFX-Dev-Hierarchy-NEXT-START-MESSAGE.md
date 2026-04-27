# UI/VFX Dev (Hierarchy) 진입 메시지 — VFX 빈도/cooldown/번개/심문 3종 (P0-E)

**세션 영역**: P0-E VFX 위계 정리
**병렬**: P0-F (UI/VFX Dev — AI Reasoning Cutscene) — write scope 엄격 분리
**의뢰서 본문**: `tmp/REQUEST-UIVFX-Dev-Hierarchy.md`

---

## 1. git pull + 진입 조건 검사 (먼저 실행)

```bash
git pull origin main
git log --oneline -1                     # 최신 main HEAD 확인
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all                        # hard 0 / warnings ≈ 157 baseline-known
```

**중단 조건**:
- HEAD 불일치
- tracked file modified/staged 있음 (untracked 무시)
- `npm run check:all` hard issues > 0
- **`src/app/pc.css` modified/staged 발견 → 반드시 CT-Main 보고 후 진입** (UI 서브 스레드 영역 충돌 가능성)

---

## 2. 필수 정독

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-UIVFX-Dev-Hierarchy.md` (의뢰서 본문) |
| P0 | `docs/information-surface-policy.md` v1.1 — 특히 §4 (VFX 사용 규칙) / §4.5 (기존 컷씬 6종) / §6.4 (우선순위) / §8.1 (운영 회피선) |
| P0 | `CLAUDE.md` (한국어 품질 / 메커닉 명사 X) |
| P1 | `memory/design_vfx_inventory_pc.md` 영역 (기존 9 + 6 + queue 인벤토리) |
| P1 | `memory/reference_resonance_selectors.md` (`data-*` selector) |
| P1 | `tmp/REQUEST-UIVFX-Dev-AIReasoningCutscene.md` (P0-F — write scope 합의) |

---

## 3. 작업 본질

### 빈도 / cooldown 정합
- Level 2 cut-in cooldown: 같은 종류 5턴
- Level 3 major hard cap: 사건당 3회
- 한 phase에 cut-in 5회 이상 → 콘솔 warn

### 번개 사용 규칙
- **허용** 5 영역: AI 자유심문 매핑 / 증거 조합 unlock / 시스템 메시지→쟁점 카드 / 판결 직전 / S5
- **축소** 5 영역: 일반 질문 / 단순 system message / phase 안내 / discovery / 카드 강조 → 대체 micro VFX (aura / pulse / line draw 등)
- 한 액션 1 sequence / 같은 target 5턴 반복 X

### 심문 3종 micro VFX 변주 (신규 컷씬 X)
- 사실 추궁: crack/contradiction_hit 소형 — `모순 생성`
- 감정 접근: red/gold aura — `방어 완화`
- 동기 탐색: dark card reveal — `숨은 쟁점 접근`

### 기존 6 컷씬 정합
- `lie_collapse` 유지 / 문구 정합
- `contradiction_hit` 유지 / 문구 정합
- `emotional_burst` cooldown 강화
- `dispute_emergence` modal 후 aura·resonance
- `phase_transition` 빈도 축소
- `verdict_gavel` 직전 micro 추가 권장

---

## 4. 진행 순서

Phase A (spike — VFX 빈도 audit + 번개 trigger list + 심문 3종 prototype) → commit + push + CT-Main 보고
→ Phase B (MVP — cooldown/hard cap 정식 + 번개 규칙 + 심문 3종 정식 + 6 cutscene 정합) → commit + push + CT-Main 보고

---

## 5. 병렬 영역

- **P0-F** (UI/VFX Dev — AI Reasoning Cutscene) — write scope 엄격 분리
- **P0-A·B** (Codex-Dev A/B) — Free Interrogation MVP/Guard
- **P0-C** (Release QA) — VFX QA §4.10 영역 흡수

**P0-F와 합의 영역**:
- 새 cutscene id 등록 — **이 세션 commit 우선** → P0-F가 새 trigger 등록
- ResonanceLayer API — 이 세션 cooldown 추가 / P0-F 재활용

---

## 6. 산출물 위치

```
tmp/qa-uivfx-hierarchy-results/
├── 20260427-spike-summary.md
├── 20260427-mvp-summary.md
├── current-vfx-frequency-audit.json
├── lightning-trigger-list.json
└── interrogation-3-micro-vfx-samples/
```

---

## 7. 절대 회피선

- **`src/app/pc.css` touch X** (UI 서브 스레드 영역)
- 신규 컷씬 추가 X (P0-F 두뇌 컷인은 별도 세션)
- ScriptedText / caseData / baseline 회귀 X
- feature flag global default 변경 X
- 기존 큐 시스템 본체 변경 X (분기 정합만)
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- 내부 용어 노출 X

---

**시작 영역**: 진입 조건 검사부터.
