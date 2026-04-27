# Codex-Dev (API Proxy Migration) 진입 메시지 (P0 — 출시 차단 영역)

**세션 영역**: OpenAI API server-side proxy 이동 + client `VITE_OPENAI_API_KEY` 직접 read 제거
**우선순위**: P0 출시 차단 (Release QA 도메인 1에서 발견)
**의뢰서 본문**: `tmp/REQUEST-Codex-API-Proxy-Migration.md`

---

## 1. 진입 조건 (먼저 실행)

```bash
git pull origin main
git log --oneline -1
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
npm run build:pc
npx tsc -b --force
```

모두 PASS 후 진행. 어느 하나 fail → 즉시 중단 + CT-Main 보고.

**사전 조건 (사용자 영역)**: OpenAI key rotate 완료 + Vercel env `OPENAI_API_KEY` (server-only) 등록 + `VITE_OPENAI_API_KEY` 영역 제거 영역 — 이 세션 진입 전 사용자 영역 확인.

---

## 2. 필수 정독

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-Codex-API-Proxy-Migration.md` (의뢰서 본문 — sample audit 결과 + scope + 검증) |
| P0 | `tmp/qa-release-results/20260427-domain-1-api-key-env.md` (Release QA 보고 — 발견 영역) |
| P0 | `tmp/qa-release-results/findings.json` |
| P0 | `vercel.json` (배포 + API route 영역) |
| P1 | `src/engine/llmClient.ts` (현재 client 호출 영역) |
| P1 | `src/components/pc/result/PCResultScreen.tsx` (line 233·960·962) |
| P1 | `server/routes/eval.js` (server-side OK 영역 — 참조) |
| P2 | `memory/feedback_ct_audit_before_request.md` (CT 사전 audit 학습) |

---

## 3. 작업 순서

### Phase A — 사전 audit 재확인
1. CT 사전 audit 결과 (의뢰서 §4) 재확인 — 추가 영역 / 누락 영역 발견 시 즉시 보고
2. **`tmp/workplace-new-02-vite-debug.txt` read + 실제 키 포함 여부 확인** (사용자 명시 redaction 영역)
3. `HANDOFF.md:123` `sk-proj-...` 영역 — placeholder 영역 확인 / 실제면 즉시 redaction
4. tmp/* 영역 grep 재실행 (`grep -rn "sk-proj-\|sk-[A-Za-z0-9]\{20,\}" tmp/`) — 발견 영역 list
5. 산출물: `tmp/qa-codex-api-proxy-migration-results/audit-results.md`

### Phase B — server route 신설
1. `api/llm/dialogue.ts` (Vercel Functions) — OpenAI dialogue 호출 server-side
2. `api/llm/aftermath.ts` — 후일담 영역 server-side
3. server env: `OPENAI_API_KEY`
4. vercel.json 영역 정합

### Phase C — client 변경
1. `src/engine/llmClient.ts`:
   - `VITE_OPENAI_API_KEY` 직접 read 제거
   - proxy URL fetch (`/api/llm/dialogue`)
   - 주석 / console.warn 영역 update
2. `src/components/pc/result/PCResultScreen.tsx`:
   - line 233 / 960 / 962 영역 update
   - 후일담 영역 proxy fetch (`/api/llm/aftermath`)

### Phase D — server / script / docs 정리
1. `server/routes/eval.js` `VITE_OPENAI_API_KEY` fallback 제거 (5 영역)
2. `scripts/*.cjs` `VITE_*` fallback 제거 (.env.local parsing 영역 제거)
3. `README.md` / `HANDOFF.md` / `docs/gdd/solomon-server.html` sample placeholder update (`OPENAI_API_KEY` 영역으로)

### Phase E — tmp/debug redaction (사용자 명시)
1. `tmp/workplace-new-02-vite-debug.txt` redaction 또는 삭제
2. `tmp/qa-functional-results/20260427-p5-summary.md` 검토 / redaction
3. `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md` 검토 / redaction
4. 산출물: `tmp/qa-codex-api-proxy-migration-results/tmp-debug-redaction.md`

### Phase F — 검증 + commit
1. `npm run build:pc` + `grep -r "sk-\|VITE_OPENAI\|OPENAI_API_KEY" dist-pc/` → **0건 필수**
2. production build proxy 동작 검증 (LLM 호출 / 후일담)
3. `npm run check:all` PASS / `npm run build` PASS / `npx tsc -b --force` PASS
4. commit + push
5. CT-Main 보고: commit SHA + Release QA 도메인 1 재진입 가능

---

## 4. 절대 회피선

- **실제 key 값 어떤 보고서 / 문서 / 메모리 / commit message / git log / 응답에 X** (사용자 명시 영역)
- secret 영역 발견 시 `[REDACTED]` 또는 file path / line number만 표시
- ScriptedText / caseData / baseline anchor / pc.css touch X
- feature flag global default 변경 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- LLM 모델 변경 X
- prompt 본체 변경 X

---

## 5. 산출물 위치

```
tmp/qa-codex-api-proxy-migration-results/
├── 20260427-summary.md
├── audit-results.md
├── build-artifact-grep.txt
├── network-tab-verification.md
└── tmp-debug-redaction.md
```

---

## 6. 종료 조건

- [ ] Phase A~F 완료
- [ ] §7.1 build artifact grep 3 패턴 0건 (`sk-` / `VITE_OPENAI` / `OPENAI_API_KEY`)
- [ ] §7.2~7.5 검증 PASS
- [ ] tmp/debug redaction 완료
- [ ] commit + push
- [ ] CT-Main 보고

---

**시작 영역**: 진입 조건 검사 → Phase A audit 재확인 → CT-Main 보고 → Phase B~F 진입.
