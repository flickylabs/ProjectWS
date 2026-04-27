# 세션 시작 — VFX Hierarchy / Cooldown / Lightning / Interrogation 3종 Micro VFX (P0-E)

ClaudeCode CT-Main에서 의뢰합니다. 출시 전 **VFX 위계 정리** 영역입니다. 신규 컷씬 추가 X / 기존 인프라 빈도·cooldown·번개 사용·심문 3종 변주 정합.

---

## 1. git pull + 진입 조건 검사

```bash
git pull origin main
git log --oneline -1
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
```

PASS 후 진행. tracked dirty / hard > 0 → 즉시 중단 + CT-Main 보고.

**`src/app/pc.css` modified/staged 발견 시 즉시 CT-Main 보고** (UI 서브 스레드 영역 충돌 가능성).

---

## 2. 필수 정독

1. `tmp/UIVFX-Dev-Hierarchy-NEXT-START-MESSAGE.md` (진입 메시지)
2. `tmp/REQUEST-UIVFX-Dev-Hierarchy.md` (**의뢰서 본문 — scope / 회피선 / 종료 조건**)
3. `docs/information-surface-policy.md` v1.1 (정책 — §4 VFX 사용 규칙 / §4.5 기존 컷씬 6종 / §6.4 우선순위 / §8.1 운영 회피선)
4. `CLAUDE.md` (한국어 품질 / 메커닉 명사 X)
5. `tmp/REQUEST-UIVFX-Dev-AIReasoningCutscene.md` (P0-F — write scope 합의)

---

## 3. 작업 본질

- **빈도/cooldown**: cut-in 5턴 / major 사건당 3회 hard cap / phase에 cut-in 5회+ → console warn
- **번개 사용 규칙**: 허용 5영역(AI 매핑/증거 조합/시스템→쟁점/판결 직전/S5) / 축소 5영역(일반/system msg/phase/discovery/카드) → 대체 micro VFX
- **심문 3종 micro VFX 변주 (신규 컷씬 X)**: 사실=crack `모순 생성` / 감정=aura `방어 완화` / 동기=reveal `숨은 쟁점 접근`
- **기존 6 cutscene 정합**: emotional_burst cooldown 강화 / phase_transition 빈도 축소 / verdict_gavel 직전 micro

---

## 4. 진행 순서

Phase A (spike — 빈도 audit + 번개 trigger list + 심문 3종 prototype) → commit + push + CT-Main 보고
→ Phase B (MVP — cooldown/hard cap/번개/심문/6 cutscene 정합) → commit + push + CT-Main 보고

---

## 5. 병렬 영역 / 합의

- P0-F (두뇌 풀가동 컷인) — write scope 엄격 분리
- P0-A·B (자유심문 MVP/Guard) — 별개 트랙
- **P0-F와 합의**: 새 cutscene id 등록은 **이 세션 commit 우선** → P0-F가 그 cooldown/hard cap에 정합

---

## 6. 산출물 위치

`tmp/qa-uivfx-hierarchy-results/`

---

## 7. 절대 회피선

- **`src/app/pc.css` touch X** (UI 서브 스레드 영역)
- 신규 컷씬 추가 X (P0-F 영역)
- ScriptedText / caseData / baseline 회귀 X
- feature flag global default 변경 X
- 기존 큐 시스템 본체 변경 X (분기 정합만)
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- 내부 용어 노출 X (`intent` / `classifier` / `LLM` / `guard` / `policy` / `누설`)

---

**시작 영역**: 진입 조건 검사부터.
