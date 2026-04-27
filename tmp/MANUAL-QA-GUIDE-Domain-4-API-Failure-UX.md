# Manual QA Guide — Domain 4 API Failure UX (출시 전 사용자 spot check)

**작성**: ClaudeCode CT-Main (2026-04-27)
**대상**: 사용자 직접 spot check 영역
**원인**: Release QA Domain 4 자동화 경로에서 실제 LLM 요청까지 도달 X / partial 결과
**사전 조건**: API Proxy Migration `596d235` 완료 / `OPENAI_API_KEY` server-only 영역 / production build artifact

---

## 1. 목표

API 호출 실패 시 다음 영역 확인:
- 게임이 멈추지 X
- 안전 fallback / 오류 메시지 노출
- client secret / Authorization header 영역 X
- 재시도 / 다른 행동 가능

---

## 2. 검증 4 영역 (사용자 명시)

### 2.1 API 429 / 500 / server proxy 실패 시 게임 멈춤 X

**시뮬 방법**:
- (a) DevTools Network tab에서 `api/llm/dialogue` 또는 `api/llm/aftermath` URL Block (right click → Block request URL)
- (b) Vercel preview 영역에서 환경 변수 `OPENAI_API_KEY` 일시 invalid (production deploy 영향 X)
- (c) OpenAI dashboard에서 quota 일시 reduce (429 trigger)
- (d) localhost dev server에서 server route mock 500 return

**확인**:
- ✅ 게임 흐름 멈춤 X (loading spinner 영구 X / unrecoverable 영역 X)
- ✅ 다음 행동 영역 가능 (Phase 진행 / 다른 액션 dispatch / 저장 / 로드)

### 2.2 안전 fallback / 오류 메시지 노출

**확인 영역**:
- NPC 응답 자리에 fallback 텍스트 노출 (`docs/information-surface-policy.md` v1.1 §5.5 정합)
  - 캐릭터 archetype 정합 (박지연 victim_cosplay / 이준호 avoidant / etc.)
  - lieState 정합 (S0~S2 영역에서 진실 누설 X)
  - 한국어 자연체 (번역체 9패턴 X / 명사형 어색 X)
  - 호칭 정합 (재판관 → "OOO 씨" / 당사자 → 합니다체)
- 또는 시스템 영역 오류 메시지 (`docs/information-surface-policy.md` v1.1 §2.1 정합)
  - 단일 줄 ≤ 30자 / 두 줄 ≤ 60자
  - 내부 용어 노출 X (`intent` / `classifier` / `LLM` / `guard` / `policy` / `누설`)
- 자유심문 영역 fallback (P0-B `freeInterrogation/fallback.ts` 매트릭스 정합)

### 2.3 client secret / Authorization header 영역 X

**시뮬 방법**: DevTools Network tab → `api/llm/dialogue` 또는 `api/llm/aftermath` request 영역 read

**확인**:
- ✅ Request header `Authorization` 영역 X (또는 server proxy → OpenAI 영역만 / client → server 영역에는 X)
- ✅ Request body에 `OPENAI_API_KEY` / `VITE_OPENAI_API_KEY` / `sk-*` 영역 X
- ✅ Response에 secret 영역 X
- ✅ Browser localStorage / sessionStorage / cookie 영역에 secret 영역 X
- ✅ Production build artifact (`npm run build:pc` 결과) 영역 grep: `sk-` / `VITE_OPENAI` / `OPENAI_API_KEY` 모두 0건 (사전 검증 영역 — `596d235` 정합 / Release QA Domain 1 영역에서 0건 확인)

### 2.4 재시도 / 다른 행동 가능

**확인**:
- ✅ Fallback 응답 후 같은 액션 재시도 가능 (5초 timeout 후 또는 즉시)
- ✅ 다른 액션 (다른 NPC / 다른 evidence / 다른 phase / 다른 dispute) 가능
- ✅ Phase 전환 영역 동작
- ✅ 저장 / 로드 영역 정상

---

## 3. 시뮬 환경 권장

### 3.1 가장 본질 영역 (출시 환경)
- Vercel preview deployment 영역 (production deploy 영역과 정합)
- Browser: Chrome / Firefox / Safari / Edge (Release QA Domain 8 영역과 정합)
- DevTools Network throttle 영역

### 3.2 보조 영역
- Localhost dev server 영역 (`npm run dev`)
- Mock server route 영역 (필요 시)

---

## 4. 발견 사례 기록 (`docs/spot-check-format.md` 8필드 정합)

```yaml
- caseId: spouse-01 / family-01 / friend-01 / N/A
  phase: 0~7 / Result
  action: 자유심문 / 후일담 / 일반 LLM 호출 / system 영역
  target: NPC 영역 또는 system
  quote: 발견 fallback 텍스트 또는 오류 메시지
  expected: 안전 fallback / archetype 정합 / 게임 흐름 정상
  actual: 발견 영역
  why: severity 근거
  severity: P0 / P1 / P2
  reproSteps: [DevTools 영역 시뮬 절차]
  recommendedAction: CT 판단 / Codex 수정 / UI 수정 / QA 재확인
  screenshot: tmp/qa-manual-domain-4-results/screenshots/{filename}.png (필요 시)
```

---

## 5. Severity 분류

### P0 (출시 차단)
- 게임 멈춤 (loading spinner 영구 / unrecoverable / 재시도 X)
- Client에 secret 노출 (Authorization header / network response / localStorage)
- Production build artifact 영역에 secret literal 영역 (`596d235` 검증 영역과 모순)
- 안전 fallback 동작 X (NPC 응답 X / undefined / 오류 화면 영구)

### P1 (출시 후 보강)
- Fallback 텍스트 한국어 자연체 어색 (번역체 / 명사형)
- Fallback 응답이 archetype / lieState 무관 영역
- 재시도 후 같은 오류 반복 영역
- 시스템 오류 메시지 길이 위반 (`docs/information-surface-policy.md` §6.3)
- 내부 용어 노출 (`intent` / `classifier` / `LLM` / `guard` / `policy`)

### P2 (출시 후 영역)
- UX 디자인 / 톤 영역 미세 보정
- 메시지 빈도 영역
- VFX 영역 (P0-E·F follow-up 가능)

---

## 6. 산출물 (사용자 직접 영역)

```
tmp/qa-manual-domain-4-results/
├── findings.md (또는 findings.json)
└── screenshots/  (필요 시)
```

---

## 7. 관련 자료

- `tmp/REQUEST-Codex-API-Proxy-Migration.md` (`596d235` Proxy 본질)
- `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md` (P0-B 안전 fallback 매트릭스 영역)
- `tmp/REQUEST-QA-Release.md` (Domain 4 본문)
- `tmp/qa-release-results/20260427-domain-4-*.md` (자동화 영역 partial 보고 — 보존 영역)
- `docs/spot-check-format.md` (8필드)
- `docs/information-surface-policy.md` v1.1 §2.1·5.5·6.3
- `src/engine/freeInterrogation/fallback.ts` (P0-B 매트릭스)
- `src/engine/llmClient.ts` / `src/engine/llmDialogueResolver.ts` (proxy 영역 — read 영역)

---

## 8. 사용자 영역 결정

- (a) 즉시 spot check 영역 진입 (출시 전)
- (b) 출시 후 영역 (P0 발견 시 차단 영역 본질 — 권장 X)

추천: **(a) 즉시 진입** — 출시 차단 P0 영역 가능성 영역 본질.

---

**상태**: Manual QA spot check guide 작성 완료. 사용자 직접 진입 영역.
