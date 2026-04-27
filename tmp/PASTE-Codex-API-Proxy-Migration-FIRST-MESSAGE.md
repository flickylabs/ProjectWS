# 세션 시작 — OpenAI API Server-Side Proxy Migration (P0 — 출시 차단 영역)

ClaudeCode CT-Main에서 의뢰합니다. **Release QA 도메인 1 발견 P0** — `dist-pc/assets/*.js`에 `VITE_OPENAI_API_KEY` 영역 secret literal 노출. server-side proxy 이동 + client 영역 직접 read 제거 + tmp/debug redaction.

⚠️ **사전 조건 (사용자 영역)**: OpenAI key rotate 완료 + Vercel env `OPENAI_API_KEY` (server-only) 등록 — 이 세션 진입 전 확인.

---

## 1. git pull + 진입 조건 검사

```bash
git pull origin main
git log --oneline -1
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
npm run build:pc
npx tsc -b --force
```

PASS 후 진행. tracked dirty / hard > 0 / build fail → 즉시 중단 + CT-Main 보고.

---

## 2. 필수 정독

1. `tmp/Codex-API-Proxy-Migration-NEXT-START-MESSAGE.md` (진입 메시지 — Phase A~F)
2. `tmp/REQUEST-Codex-API-Proxy-Migration.md` (**의뢰서 본문 — 사전 audit 결과 + scope + 검증**)
3. `tmp/qa-release-results/20260427-domain-1-api-key-env.md` (Release QA 발견 보고)
4. `tmp/qa-release-results/findings.json`
5. `vercel.json`
6. `src/engine/llmClient.ts` / `src/components/pc/result/PCResultScreen.tsx` (직접 read 영역)
7. `memory/feedback_ct_audit_before_request.md` (CT 사전 audit 학습)

---

## 3. 작업 본질

| Phase | 영역 |
|---|---|
| A | CT 사전 audit (의뢰서 §4) 재확인 + tmp 영역 grep 재실행 + 보고 |
| B | server route 신설 (`api/llm/dialogue` / `api/llm/aftermath`) |
| C | client 변경 (`llmClient.ts` + `PCResultScreen.tsx` 직접 read 제거 → proxy fetch) |
| D | server / script / docs 정리 (fallback 제거 / sample placeholder update) |
| E | tmp/debug redaction (사용자 명시) — `workplace-new-02-vite-debug.txt` 등 |
| F | 검증 + commit (build artifact grep 0건 필수) |

### 검증 P0 통과 조건
```bash
npm run build:pc
grep -r "sk-\|VITE_OPENAI\|OPENAI_API_KEY" dist-pc/   # 0건 필수
```

---

## 4. 절대 회피선

- **실제 key 값을 어떤 보고서 / 문서 / 메모리 / commit message / 응답에 X**
- secret 영역 발견 시 `[REDACTED]` 또는 file path / line number만
- ScriptedText / caseData / baseline anchor / pc.css touch X
- feature flag global default 변경 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- LLM 모델 / prompt 본체 변경 X

---

## 5. 산출물

`tmp/qa-codex-api-proxy-migration-results/`

---

## 6. 종료 조건

- [ ] build artifact grep 0건 (`sk-` / `VITE_OPENAI` / `OPENAI_API_KEY`)
- [ ] proxy 동작 검증 (LLM 호출 / 후일담)
- [ ] check:all / build / tsc PASS
- [ ] tmp/debug redaction 완료
- [ ] commit + push
- [ ] CT-Main 보고 → Release QA 도메인 1 재진입 가능 안내

---

**시작 영역**: 진입 조건 검사 → Phase A 사전 audit 재확인 → CT-Main 보고 → Phase B~F.
