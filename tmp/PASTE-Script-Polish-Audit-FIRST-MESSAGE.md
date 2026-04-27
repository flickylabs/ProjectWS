# 세션 시작 — Script Polish Audit (P1-A — read/report only)

ClaudeCode CT-Main에서 의뢰합니다. 활성 3 사건 (spouse-01 → family-01 → friend-01) ScriptedText 핵심 루트 50~100개 audit 영역입니다.

⚠️ **read/report only** — patch 영역 X / ScriptedText·caseData·정책 직접 수정 X.

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

---

## 2. 필수 정독

1. `tmp/Script-Polish-Audit-NEXT-START-MESSAGE.md` (진입 메시지 — 작업 순서)
2. `tmp/REQUEST-Script-Polish-Audit.md` (**의뢰서 본문 — scope / 점검 / 회피선 / 종료 조건**)
3. `docs/spot-check-format.md` (8필드 + 분류 카테고리)
4. `docs/disclosure-policy.md` (진실 누설 정책)
5. `docs/information-surface-policy.md` v1.1 (표면 위상)
6. `CLAUDE.md` (한국어 품질)

---

## 3. 작업 본질

### 점검 영역 8개
응답 누락 / fallback 품질 / Q-A 불일치 / 진실 누설 / 어색한 문장 / 호칭·존칭·말투 / 진행감 피드백 / 판결·후일담 품질

### 분류 카테고리 (`docs/spot-check-format.md`)
P1~P6 / D1~D4 / C1~C5 / P7 / fallback / 누설 / 정책 위반

### 핵심 루트 (사건당 50~100)
Phase 1·2 (초기·반박) / Phase 3·5 (심문 3종) / Phase 4 (증거 / 조합) / Phase 6 (중재) / Phase 7 (판결) / Result (후일담)

---

## 4. 진행 순서

Phase A (spouse-01) → commit + push + CT-Main 보고
→ Phase B (family-01) → commit + push + CT-Main 보고
→ Phase C (friend-01) → commit + push + CT-Main 보고
→ Phase D (통합 보고) → commit + push + CT-Main 보고

---

## 5. 산출물 위치

`tmp/qa-script-polish-audit-results/`

각 발견 사례 8필드 + severity (P0/P1/P2) + 분류 카테고리 + 패턴 추출 (정규식 / 키워드 / 의미 indicator) + variantId.

---

## 6. 절대 회피선

- **ScriptedText / caseData / 정책 직접 수정 X** (patch는 별도 의뢰서)
- **`src/app/pc.css` touch X**
- baseline anchor (v1·v2) 회귀 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 변경 X
- LLM / API 영역 변경 X
- 14,931 전수 X (핵심 루트 50~100만)
- 정적 분석 도구만 X (수동 read + 의미 검증 본질)
- 실제 키 / secret 표시 X

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A spouse-01 진입.
