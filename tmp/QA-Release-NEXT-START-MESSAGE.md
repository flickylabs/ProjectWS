# Release QA 진입 메시지 — 출시 전 readiness 검증 (P0-C)

**세션 영역**: P0-C Release QA 9 영역 검증
**병렬**: P0-A (Codex-Dev A) / P0-B (Codex-Dev B)
**의뢰서 본문**: `tmp/REQUEST-QA-Release.md`

---

## 1. 진입 조건 (반드시 먼저 실행)

```bash
git status --short --branch
git log --oneline -1                     # HEAD = c6ec522
git diff --quiet && git diff --cached --quiet
echo $?                                  # 0 = tracked clean
npm run check:all                        # hard 0 / warnings ≈ 157 baseline-known
npm run build                            # PASS
npx tsc -b --force                       # PASS
```

**중단 조건**:
- HEAD 불일치
- tracked file modified/staged 있음
- check:all / build / tsc 어느 하나 fail

---

## 2. 정독 자료 (필수)

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-QA-Release.md` (이 세션 의뢰서) |
| P0 | `docs/spot-check-format.md` (8필드 포맷) |
| P0 | `CLAUDE.md` (빌드 / 실행 / Vercel 영역) |
| P1 | `vercel.json` |
| P1 | `package.json` (빌드 스크립트) |
| P2 | `src/store/` (localStorage 영역 — 저장/로드 검증) |

---

## 3. 검증 영역 진행 순서

권장: 빠른 fail-fast 영역부터.

| 순서 | 영역 | 영역 |
|---|---|---|
| 1 | 4.4 API key / env 노출 | build artifact grep `OPENAI_API_KEY` 등 |
| 2 | 4.2 build / packaging | `npm run build` + `dist/` 검증 |
| 3 | 4.6 Phase 0 guard off 안정성 | console.warn/error 0 / 5분 플레이 |
| 4 | 4.5 API 실패 시 게임 멈춤 | DevTools offline / slow 3G / 429 simulation |
| 5 | 4.1 저장 / 로드 | localStorage 영역 + 다른 브라우저 |
| 6 | 4.7 한글 폰트 / 깨짐 | 모든 phase / NPC / 시스템 |
| 7 | 4.8 해상도 / 창 크기 | 4 해상도 + resize |
| 8 | 4.9 브라우저 / PC 빌드 차이 | Chrome / Firefox / Safari / Edge |
| 9 | 4.10 VFX QA (P0-E·F 흡수) | 빈도/cooldown/위계/한글/reduced-motion/내부 용어 0/truth leak 0 |
| 10 | 4.3 Steam 환경 | 사용자 결정 영역 (보류 가능) |

각 영역 종료 시 `tmp/qa-release-results/20260427-domain-{N}-summary.md` 작성.

**§4.10 VFX QA**는 P0-E (Hierarchy) + P0-F (AI Reasoning Cutscene) 결과물 영역. 두 세션이 commit + push 한 후 진행 가능. 그 전에는 다른 영역 우선.

---

## 4. 발견 사례 8필드 + 추가 필드

```yaml
- caseId: spouse-01 / family-01 / friend-01 / N/A
  phase: Phase 0~7 / 외부
  action: 증거 제시 / 자유심문 / 저장 / 빌드 / etc.
  target: 박지연 / 이준호 / UI / system / etc.
  quote: 발견 원문 (있으면)
  expected: 기대 동작
  actual: 실제 발견
  why: severity 근거
  severity: P0 / P1 / P2
  reproSteps: [1, 2, 3...]
  recommendedAction: CT 판단 / Codex 수정 / UI 수정 / QA 재확인
  screenshot: tmp/qa-release-results/screenshots/{filename}.png
```

`tmp/qa-release-results/findings.json` 영역에 list로 누적.

---

## 5. 절대 회피선

- ScriptedText / caseData / pc.css touch X
- baseline anchor 회귀 X
- feature flag default 변경 X
- 정책 자동 변경 X
- ScriptedText 자동 일괄 수정 X
- 자동 보고 무비판 수용 X (직접 검증 영역)

---

## 6. Out of Scope (이 의뢰서)

- 콘텐츠 품질 (P1-A)
- 자유심문 기능 (P0-A·B)
- 자동화 harness 신규 작성 X (Manual + screenshot 우선)

---

## 7. 산출물 위치

```
tmp/qa-release-results/
├── 20260427-overall-summary.md          (종합)
├── 20260427-domain-1-api-key-env.md
├── 20260427-domain-2-build-packaging.md
├── 20260427-domain-3-phase0-guard-off.md
├── 20260427-domain-4-api-failure.md
├── 20260427-domain-5-save-load.md
├── 20260427-domain-6-korean-font.md
├── 20260427-domain-7-resolution.md
├── 20260427-domain-8-browser-pc.md
├── 20260427-domain-9-steam.md           (보류 가능)
├── findings.json                        (8필드 list)
└── screenshots/                         (필요 시)
```

---

## 8. 종료 조건

- [ ] 9 영역 각 P0 0건 (또는 P0 발견 시 즉시 CT-Main 보고)
- [ ] P1 발견 → 8필드 분류 → CT-Main 보고
- [ ] P2 발견 → backlog
- [ ] `npm run check:all` PASS
- [ ] `npm run build` PASS
- [ ] `npx tsc -b --force` PASS
- [ ] 종합 summary commit + push → CT-Main 보고

---

## 9. 보고

- 영역별 종료 시 즉시 CT-Main 보고 (P0 발견 시 작업 중단 + 즉시 보고)
- 9 영역 모두 종료 시 종합 summary commit + push

---

**시작 영역**: 진입 조건 검사 → 정독 → 영역 1 (API key/env) 부터 fail-fast 영역 진행 → CT-Main 보고.
