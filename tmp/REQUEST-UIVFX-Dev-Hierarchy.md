# REQUEST — UI/VFX Dev: VFX Hierarchy / Cooldown / Lightning / Interrogation 3종 Micro VFX (P0-E)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: P0 (출시 전 — AI 차별점 영역과 짝)
**병렬**: P0-F (두뇌 풀가동 컷인) — write scope 엄격 분리

---

## 1. 목표

기존 VFX/컷씬 인프라를 **빈도 + 위계 + cooldown 정리**한다. 신규 컷씬 대량 추가 X. 출시 전 핵심:
1. 번개 빈도 정리 (현재 과다 → "중요 연결"에만)
2. cooldown 강제 (한 액션 1회 / 5턴 같은 target 반복 X / 사건당 major 3회 hard cap)
3. 심문 3종(사실 추궁 / 감정 접근 / 동기 탐색) **micro VFX 변주** — 신규 컷씬 X / 기존 VFX 재구성
4. `phase_transition` 빈도 축소 / `emotional_burst` cooldown 강화

---

## 2. 진입 조건

- HEAD: `dba045d` (또는 그 이후 main 최신)
- baseline anchor: `baseline-pre-policy-v1` / `v2` 보존
- feature flag global default: `VITE_DISCLOSURE_GUARD_MODE=off` 유지
- working tree: tracked clean
- `npm run check:all` PASS / `npm run build` PASS / `npx tsc -b --force` PASS

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / 위계 / 한국어 톤 검수 | CT-Main (`docs/information-surface-policy.md` 영역 — v1.1) |
| **이 세션 (UI/VFX Dev — Hierarchy)** | **빈도 / cooldown / 번개 사용 규칙 / 심문 3종 micro VFX 정합** |
| 두뇌 풀가동 컷인 prototype | UI/VFX Dev (P0-F) — 별도 세션, write scope 분리 |
| 검증 | Release QA §4.10 VFX 섹션 흡수 |

---

## 4. 정책 입력 (read-only)

- `docs/information-surface-policy.md` v1.1 — 특히 §4 (VFX 사용 규칙) / §4.5 (기존 컷씬 6종 재정리) / §6.4 (우선순위) / §8.1 (운영 회피선)
- `memory/design_vfx_inventory_pc.md` — 기존 VFX 9 + Cutscene 6 + queue 인벤토리
- `memory/reference_resonance_selectors.md` — `data-*` selector 영역
- `CLAUDE.md` — 한국어 품질 / 메커닉 명사 X

---

## 5. Scope (이 의뢰서 영역)

### 5.1 빈도 / cooldown 정합

| 영역 | 변경 |
|---|---|
| Level 2 cut-in cooldown | 같은 종류 5턴 |
| Level 3 major hard cap | 사건당 3회 (첫 AI 자유심문 1 + 자백 1 + 판결 1) |
| 같은 액션 동시 출력 | 위계 우선순위 따라 낮은 영역 skip (VFX > 채팅창 > 관찰 > 수첩) |
| 한 phase에 cut-in 5회 이상 | 콘솔 warn (cooldown 검증) |

### 5.2 번개 사용 규칙

**허용**:
- AI 자유심문 분석 → 쟁점/증거 연결
- 증거 조합 성공 → 새 쟁점 열림
- 시스템 메시지 → 실제 쟁점 카드 점프
- 판결 직전 핵심 증거 → 판결 보드 모임
- S5 / 방어 붕괴

**축소** (대체 micro VFX로):
- 일반 질문 성공 → aura / soft glow / card pulse
- 단순 system message → chip slide / line draw
- 반복 phase 안내 → meter tick
- 모든 discovery 결과 → small crack / pulse
- 단순 카드 강조 → border glow

**Cooldown**:
- 한 액션에 번개 sequence 1회만
- 같은 target에 5턴 이내 반복 X
- 3연속 번개는 새 쟁점 unlock 같은 명확한 보상 순간만

### 5.3 심문 3종 Micro VFX 변주 (신규 컷씬 X)

기존 VFX 재구성으로 처리:

| 심문 | 기존 VFX 활용 | 문구 |
|---|---|---|
| 사실 추궁 | crack / `contradiction_hit` 계열 (소형) | `모순 생성` |
| 감정 접근 | red/gold aura / 방어막 낮아지는 micro | `방어 완화` |
| 동기 탐색 | 어두운 카드 reveal / 숨은 쟁점 glow | `숨은 쟁점 접근` |

신규 keyframe X / 기존 keyframe 변주 (duration / scale / color hint 변경).

### 5.4 기존 컷씬 6종 재정리 (정책 §4.5 정합)

| ID | 변경 |
|---|---|
| `lie_collapse` | 유지 / 문구 정합 ("방어 붕괴" / "진술 한계" / "자백 임계치" — `누설` 회피) |
| `contradiction_hit` | 유지 / 문구 정합 ("진술 균열" / "모순 기록" / "새 추궁점 발견") |
| `emotional_burst` | **cooldown 강화** (반복 시 가장 피로) |
| `dispute_emergence` | 유지 / full cutscene 추가 X / modal dismiss 후 aura·resonance로 카드 강조 |
| `phase_transition` | **빈도 축소** — 초반 1~2회만 강하게 / 이후 토스트 축약 |
| `verdict_gavel` | 유지 / 직전 핵심 증거·쟁점 정렬 micro cutscene 추가 권장 |

---

## 6. Write Scope (P0-F와 엄격 분리)

### 6.1 이 세션 영역 (write OK)
- `src/engine/presentationEngine.ts` (또는 동등 영역) — cooldown 강제 / hard cap
- `src/engine/v4Effects/*` — 빈도 / 변주 / 번개 사용 정합
- 기존 큐 시스템 (`eventFeedback` / `observation` / `resonance`) — **분기 정합만 / 본체 변경 X**
- 기존 trigger 등록 영역 (`gameEventTriggerEngine.ts`) — 빈도 / cooldown 정합
- **신규 CSS는 별도 모듈** (예: `src/styles/vfxHierarchy.css`)
- 콘솔 warn 로직 (cut-in 5회/phase / major 4회/사건)

### 6.2 절대 touch X
- **`src/app/pc.css`** — UI 서브 스레드 영역 / 단일 소유 / format / stash / discard / add 모두 X
- 두뇌 풀가동 prototype 영역 (`CutsceneOverlay` 확장 / ResonanceLayer 신규 영역) → P0-F 세션 영역
- ScriptedText / caseData / baseline anchor / `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts`

### 6.3 충돌 회피 영역 (P0-F와 합의)
- 기존 cutscene id 등록 — 이 세션에서 빈도 정합 / P0-F는 새 cutscene id 추가
- ResonanceLayer queue API — 이 세션에서 cooldown 추가 / P0-F는 그 API 재활용

순서: **이 세션 commit 우선 → P0-F가 새 trigger 등록**.

---

## 7. 진행 순서

### Phase A — Spike
1. 현재 VFX 빈도 / cooldown 영역 audit (기존 코드 read)
2. 번개 사용 영역 audit (lightning trigger 위치 list)
3. 심문 3종 micro VFX 변주 prototype (1 case 영역)
4. 산출물: `tmp/qa-uivfx-hierarchy-results/20260427-spike-summary.md`

### Phase B — MVP
1. cooldown / hard cap 정식 등록
2. 번개 사용 규칙 적용 (허용/축소 영역)
3. 심문 3종 micro VFX 정식
4. 기존 6 cutscene 정합 (cooldown / 문구 / 빈도 축소)
5. 콘솔 warn 로직
6. 산출물: `tmp/qa-uivfx-hierarchy-results/20260427-mvp-summary.md`

---

## 8. 절대 회피선

- **`src/app/pc.css` touch X** (UI 서브 스레드 영역)
- ScriptedText / caseData / baseline anchor 회귀 X
- feature flag global default 변경 X
- 기존 큐 시스템 본체 변경 X (분기 정합만)
- 새 큐 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- 신규 컷씬 추가 X (P0-F 두뇌 컷인은 별도 세션)
- 내부 용어 노출 X (`intent` / `classifier` / `LLM` / `guard` / `policy` / `누설`)

---

## 9. 종료 조건

- [ ] 빈도 / cooldown 정합 코드 등록 + 콘솔 warn 동작
- [ ] 번개 사용 규칙 적용 (허용 5 영역 / 축소 5 영역)
- [ ] 심문 3종 micro VFX 변주 정식
- [ ] 기존 6 cutscene 정합 (cooldown / 문구)
- [ ] `npm run check:all` PASS / `npm run build` PASS / `npx tsc -b --force` PASS
- [ ] 산출물: `tmp/qa-uivfx-hierarchy-results/` + summary.md

---

## 10. 산출물

```
tmp/qa-uivfx-hierarchy-results/
├── 20260427-spike-summary.md
├── 20260427-mvp-summary.md
├── current-vfx-frequency-audit.json    (기존 영역 분석)
├── lightning-trigger-list.json
└── interrogation-3-micro-vfx-samples/  (sample screenshot 또는 video)
```

---

## 11. 관련 자료

- `docs/information-surface-policy.md` v1.1 — 특히 §4
- `memory/design_vfx_inventory_pc.md`
- `memory/reference_resonance_selectors.md`
- 본 세션 진입 메시지: `tmp/UIVFX-Dev-Hierarchy-NEXT-START-MESSAGE.md`
- 협조 의뢰서: `tmp/REQUEST-UIVFX-Dev-AIReasoningCutscene.md` (P0-F)

---

**상태**: 초안 작성 완료. UI/VFX Dev 검토 + 1차 spike 진입 대기.
