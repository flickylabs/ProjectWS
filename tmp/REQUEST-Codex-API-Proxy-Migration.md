# REQUEST — Codex-Dev: OpenAI API Server-Side Proxy Migration (P0 — 출시 차단 영역)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: **P0 출시 차단 영역** (Release QA 도메인 1 발견 — `dist-pc/assets/*.js`에 OpenAI key literal 노출)
**병렬**: P0-E (UI/VFX Hierarchy) — 영향 X / Release QA 동일 세션 — 도메인 1 fix 후 재검증 대기

---

## 1. 목표

Vite client bundle의 `VITE_OPENAI_API_KEY` 직접 read 영역을 **server-side proxy로 전부 이동**. client bundle에 secret literal 0건 + Release QA 도메인 1 artifact grep 재검증 통과.

---

## 2. 진입 조건

- HEAD: `6a4846b` (또는 그 이후 main 최신)
- baseline anchor: `baseline-pre-policy-v1` / `v2` 보존
- working tree: tracked clean
- `npm run check:all` PASS / `npm run build:pc` PASS / `npx tsc -b --force` PASS
- **사용자가 OpenAI key rotate 완료** (이 의뢰서 진입 전 사용자 영역 — 새 key는 server env에만)

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / scope / 검증 기준 | CT-Main |
| **이 세션 (Codex-Dev)** | **server-side proxy + client 호출 변경 + tmp/debug 정리 + grep 재검증** |
| OpenAI key rotate / Vercel env update | 사용자 직접 |
| Release QA 도메인 1 재검증 | 같은 Release QA 세션 (fix 후) |

---

## 4. 사전 audit 결과 (CT 사전 영역)

CT가 의뢰서 작성 전 grep으로 사전 식별한 영역. Codex-Dev는 진입 시 재확인 + 추가 영역 발견 시 보고.

### 4.1 client bundle 노출 영역 (P0 — 반드시 처리)
- `src/engine/llmClient.ts:36` `getRuntimeEnv('VITE_OPENAI_API_KEY')`
- `src/engine/llmClient.ts:4` 주석 — `환경변수 VITE_OPENAI_API_KEY` 영역 정합 update 필요
- `src/engine/llmClient.ts:78` console.warn 메시지 — `VITE_OPENAI_API_KEY` 명시 영역 update
- `src/components/pc/result/PCResultScreen.tsx:233` `(import.meta as any).env?.VITE_OPENAI_API_KEY`
- `src/components/pc/result/PCResultScreen.tsx:960` 동
- `src/components/pc/result/PCResultScreen.tsx:962` console.warn 영역

### 4.2 server 영역 (이미 OK / 참조)
- `server/routes/eval.js:106 / :107 / :204 / :607 / :608` — `process.env.OPENAI_API_KEY` 우선 / `VITE_OPENAI_API_KEY` fallback. server-side OK / 단 fallback 영역 제거 권장 (혼란 방지).

### 4.3 script 영역 (개발 전용, deploy X)
- `scripts/generate-judgment-questions.cjs:7·12·17·18·21`
- `scripts/generate-case-names.cjs:8·12`
- → script는 deploy artifact X. `VITE_*` fallback 영역만 정리 (`OPENAI_API_KEY` 단일화).

### 4.4 docs 영역 (sample placeholder — 검토 영역)
- `docs/gdd/solomon-server.html:921 / :930 / :934 / :965` — `sk-xxxxx` 영역 placeholder 확인
- `docs/ref/참고용3_확인후제거요망/GDD/index.html:3147 / :3252` — **legacy / 폐기 영역** ("확인후제거요망")
- `README.md:21 / :55` — `sk-your-key` placeholder
- `HANDOFF.md:14 / :123` — `sk-proj-...` 영역. **실제 키 값인지 확인 필수** (placeholder면 OK / 실제면 즉시 redaction)

### 4.5 tmp/debug 영역 (사용자 명시 — 정리/redaction 필수)
- `tmp/workplace-new-02-vite-debug.txt` — debug artifact. **실제 secret 포함 가능성**. 진입 시 read + 실제 키면 redaction 또는 파일 삭제.
- `tmp/qa-functional-results/20260427-p5-summary.md` — 보고서 영역. 키 표기 영역 검토.
- `tmp/qa-release-results/20260427-domain-1-api-key-env.md` / `findings.json` / `overall-summary.md` — Release QA 보고서. 사용자가 redacted 처리 명시 — 재확인.
- `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md` — handoff 영역 / 키 표기 영역 검토.

---

## 5. Scope

### 5.1 신규 영역 (server route)
- `api/llm/dialogue.ts` — OpenAI dialogue API server-side proxy
- `api/llm/aftermath.ts` — 후일담 영역 server-side proxy (PCResultScreen.tsx:960 영역)
- 또는 단일 `api/llm/[...path].ts` (동적 route — Vercel Functions 영역)
- server-only env: `OPENAI_API_KEY`
- 기존 `vercel.json` 영역 정합 / API route 등록

### 5.2 client 변경
- `src/engine/llmClient.ts`:
  - `VITE_OPENAI_API_KEY` 직접 read 제거 (line 36)
  - 주석 영역 update (line 4)
  - console.warn 영역 update (line 78)
  - `getConfig()` provider 영역: `openai` (proxy) / `local` (LM Studio)
  - proxy URL: `/api/llm/dialogue` (production) / `http://localhost:1234/v1` (local 개발 영역)
  - LLM 호출 영역 fetch URL 변경 (server proxy)
- `src/components/pc/result/PCResultScreen.tsx`:
  - `VITE_OPENAI_API_KEY` 직접 read 제거 (line 233 / 960)
  - console.warn 영역 update (line 962)
  - 후일담 영역 fetch → `/api/llm/aftermath` proxy

### 5.3 server route 영역 정리
- `server/routes/eval.js` — `VITE_OPENAI_API_KEY` fallback 제거 / `OPENAI_API_KEY` 단일화 (line 106·107·204·607·608)

### 5.4 script 영역 정리
- `scripts/generate-judgment-questions.cjs` / `generate-case-names.cjs` — `VITE_OPENAI_API_KEY` fallback 제거 / `.env.local` parsing 영역 제거 (개발자 직접 export 영역)

### 5.5 docs 영역 정리
- `README.md:55` `VITE_OPENAI_API_KEY=sk-your-key` → `OPENAI_API_KEY=sk-your-key` (server-only 명시)
- `HANDOFF.md:14·123` 동
- `docs/gdd/solomon-server.html:930·934·965` 동
- `docs/ref/참고용3_확인후제거요망/GDD/` — legacy 영역 / 폐기 결정 영역 (사용자 명시 시)

### 5.6 tmp/debug 영역 redaction (사용자 명시 영역)
- `tmp/workplace-new-02-vite-debug.txt` — read 후 실제 키 영역 redaction (`[REDACTED]` 또는 파일 삭제)
- `tmp/qa-functional-results/20260427-p5-summary.md` — 키 영역 검토 / redaction
- `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md` — 키 영역 검토 / redaction
- 다른 tmp/* 영역 grep 재실행 + 발견 시 redaction

### 5.7 환경 변수 영역
- `.env` / `.env.local` 영역에서 `VITE_OPENAI_API_KEY` 제거 (개발자 안내 영역)
- `OPENAI_API_KEY` (server-only) 사용
- Vercel dashboard env update — 사용자 영역

---

## 6. 절대 회피선

- **실제 key 값을 보고서 / 문서 / 메모리 / commit message / git log / 응답에 다시 X** (사용자 명시 영역)
- secret 영역 발견 시 `[REDACTED]` 또는 file path / line number만 표시
- ScriptedText / caseData / baseline anchor / pc.css touch X
- feature flag global default 변경 X (`VITE_DISCLOSURE_GUARD_MODE=off` 유지)
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- 기존 server/routes/eval.js 본체 변경 X (fallback 영역만 제거)
- LLM 모델 변경 X (gpt-4o / gpt-4o-mini 영역 그대로)
- prompt 본체 변경 X (proxy는 client→server 통과만)

---

## 7. 검증

### 7.1 build artifact grep (P0 통과 조건)
```bash
npm run build:pc
grep -r "sk-" dist-pc/         # 0건 (또는 sk-xxxxx placeholder X / 실제 패턴 X)
grep -r "VITE_OPENAI" dist-pc/ # 0건
grep -r "OPENAI_API_KEY" dist-pc/  # 0건
```

### 7.2 client 동작 검증
- production build 영역 LLM 호출 동작 (proxy 통과)
- LLM 응답 정상 (Phase 3 심문 / 후일담 영역)
- API key 영역 client에서 fetch X / network tab에 plain key X

### 7.3 server route 영역 동작
- `api/llm/dialogue` POST → OpenAI 호출 → 응답
- `api/llm/aftermath` POST → 동
- API key는 server env (process.env.OPENAI_API_KEY)에서만 read

### 7.4 fallback 영역
- `OPENAI_API_KEY` 미설정 시 → 로컬 LM Studio 모드 fallback (기존 영역 유지)
- 또는 안전 fallback 응답 (P0-B 영역과 정합)

### 7.5 일반 검증
- `npm run check:all` PASS (hard 0)
- `npm run build` PASS / `npm run build:pc` PASS
- `npx tsc -b --force` PASS

---

## 8. 종료 조건

- [ ] §5.1 server route 신설 + 동작 검증
- [ ] §5.2 client `VITE_OPENAI_API_KEY` 직접 read 영역 0건
- [ ] §5.3 server fallback 영역 정리
- [ ] §5.4 script 영역 정리
- [ ] §5.5 docs sample 영역 update
- [ ] §5.6 tmp/debug redaction (사용자 명시 영역)
- [ ] §5.7 환경 영역 정리 안내
- [ ] §7.1 build artifact grep 0건 (3 패턴 — `sk-` / `VITE_OPENAI` / `OPENAI_API_KEY`)
- [ ] §7.2~7.5 검증 PASS
- [ ] commit + push
- [ ] CT-Main 보고: commit SHA + Release QA 도메인 1 재진입 가능 안내

---

## 9. 산출물

```
tmp/qa-codex-api-proxy-migration-results/
├── 20260427-summary.md
├── audit-results.md           (사전 audit 영역 재확인)
├── build-artifact-grep.txt    (검증 7.1)
├── network-tab-verification.md (검증 7.2 — proxy 통과 확인)
└── tmp-debug-redaction.md     (§5.6 영역 redaction 결과)
```

---

## 10. 후속 영역

- Release QA 도메인 1 재진입 — 같은 Release QA 세션 (사용자 안내 영역)
- 이 의뢰서 commit 후 → Release QA 도메인 1 grep PASS 확인 → 도메인 2~10 진행
- P0-A 자유심문 LLM 호출 영역 — proxy 정합 자동 (llmClient 영역 정합)
- P0-F 두뇌 풀가동 컷인 LLM 영역 — proxy fix 이후 정합 (사용자 명시 영역)

---

## 11. 관련 자료

- `tmp/qa-release-results/20260427-domain-1-api-key-env.md` (Release QA 보고)
- `tmp/qa-release-results/findings.json` (P0 영역)
- `vercel.json` (배포 영역)
- `package.json` (build 스크립트)
- `memory/feedback_ct_audit_before_request.md` (CT 사전 audit 학습 영역)
- 본 세션 진입 메시지: `tmp/Codex-API-Proxy-Migration-NEXT-START-MESSAGE.md`

---

**상태**: 초안 작성 완료. **사용자 OpenAI key rotate 완료 후 Codex-Dev 진입 대기**.
