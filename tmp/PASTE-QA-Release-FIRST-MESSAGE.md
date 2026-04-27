# 세션 시작 — Release QA (P0-C)

ClaudeCode CT-Main에서 의뢰합니다. 유료 출시 전 **release readiness 9 영역** 검증 영역입니다. 콘텐츠 품질(P1)과 별개 트랙으로 즉시 진행.

---

## 1. git pull + 진입 조건 검사 (먼저 실행)

```bash
git pull origin main
git log --oneline -1
git status --short
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
npm run build
npx tsc -b --force
```

모두 PASS 후 진행. 어느 하나라도 fail → 즉시 중단 + CT-Main 보고.

---

## 2. 필수 정독 (순서대로)

1. `tmp/QA-Release-NEXT-START-MESSAGE.md` (진입 메시지)
2. `tmp/REQUEST-QA-Release.md` (**의뢰서 본문 — 9 영역 / 리포트 8필드 + 추가 / 산출물**)
3. `docs/spot-check-format.md` (8필드 포맷)
4. `CLAUDE.md` (빌드 / 실행 / Vercel 영역)
5. `vercel.json` / `package.json` (빌드 스크립트)

---

## 3. 검증 9 영역 (fail-fast 순서 권장)

| 순서 | 영역 | 영역 검증 |
|---|---|---|
| 1 | API key / env 노출 | build artifact grep `OPENAI_API_KEY` / network tab 검사 |
| 2 | build / packaging | `npm run build` artifact + Vercel 배포 |
| 3 | Phase 0 guard off 안정성 | console.warn/error 0 / 5분 연속 플레이 |
| 4 | API 실패 시 게임 멈춤 | DevTools offline / slow 3G / 429 simulation |
| 5 | 저장 / 로드 | localStorage 영역 + 다른 브라우저 + 빌드 후 |
| 6 | 한글 폰트 / 깨짐 | 모든 phase / NPC / 시스템 메시지 |
| 7 | 해상도 / 창 크기 | 1280×720 / 1920×1080 / 2560×1440 / 4K + resize |
| 8 | 브라우저 / PC 빌드 차이 | Chrome / Firefox / Safari / Edge / Electron |
| 9 | Steam | 사용자 결정 영역 (보류 가능) |

---

## 4. 발견 사례 기록 (8필드 + 추가 필드)

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

## 5. 진행

- 영역별 종료 시 즉시 CT-Main 보고
- **P0 발견 시 작업 중단 + 즉시 보고** (P1 작업보다 우선 처리)
- 9 영역 모두 종료 후 종합 summary commit + push

---

## 6. 병렬 영역

- **P0-A** (Codex-Dev A, 자유심문 MVP) — 별개 트랙
- **P0-B** (Codex-Dev B, 자유심문 안전장치) — 별개 트랙

---

## 7. 산출물 위치

```
tmp/qa-release-results/
├── 20260427-overall-summary.md
├── 20260427-domain-1-api-key-env.md
├── 20260427-domain-2-build-packaging.md
├── 20260427-domain-3-phase0-guard-off.md
├── 20260427-domain-4-api-failure.md
├── 20260427-domain-5-save-load.md
├── 20260427-domain-6-korean-font.md
├── 20260427-domain-7-resolution.md
├── 20260427-domain-8-browser-pc.md
├── 20260427-domain-9-steam.md         (보류 가능)
├── findings.json                      (8필드 list)
└── screenshots/                       (필요 시)
```

---

## 8. Out of Scope

- 콘텐츠 품질 (P1-A 영역)
- 자유심문 기능 자체 (P0-A·B 영역)
- 자동화 harness 신규 작성 X (Manual + screenshot 우선)

---

## 9. 절대 회피선

- ScriptedText / caseData / pc.css 직접 수정 X
- baseline anchor 회귀 X
- feature flag default 변경 X
- 정책 자동 변경 X
- ScriptedText 자동 일괄 수정 X
- 자동 보고 무비판 수용 X (직접 검증 영역)

---

**시작 영역**: 진입 조건 검사 → 정독 → 영역 1 (API key/env) 부터 fail-fast 진행.
