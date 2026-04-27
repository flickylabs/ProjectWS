# Script Polish Audit 진입 메시지 (P1-A — read/report only)

**세션 영역**: 활성 3 사건 ScriptedText 핵심 루트 50~100 audit
**병렬**: Release QA Domain 1 재진입 / P0-E·F·API Proxy 완료 영역 — 영역 충돌 X
**의뢰서 본문**: `tmp/REQUEST-Script-Polish-Audit.md`

---

## 1. 진입 조건 (먼저 실행)

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

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-Script-Polish-Audit.md` (의뢰서 본문) |
| P0 | `docs/spot-check-format.md` (8필드 + 분류 카테고리 P1~P6 / D1~D4 / C1~C5 / P7 / fallback / 누설 / 정책 위반) |
| P0 | `docs/disclosure-policy.md` (진실 누설 정책 / 활성 3 사건 surface vs 진실 매핑) |
| P0 | `docs/information-surface-policy.md` v1.1 (7 표면 위상 / 채널 권한 / 진행감 피드백 영역) |
| P0 | `CLAUDE.md` (게임 핵심 원칙 / 한국어 품질 / 호칭 규칙) |
| P1 | `memory/feedback_revision_meaning_over_form.md` (9차원 의미 정확성) |
| P1 | `memory/feedback_truth_leak_prohibition.md` (진실 누설 영역) |
| P1 | `memory/feedback_judge_question_quality.md` |
| P2 | `src/data/scriptedText/{caseId}.json` (audit 대상 — read only) |

---

## 3. 작업 본질

### 점검 영역 (8개)
1. 응답 누락 (`...` / 빈 / 1단어)
2. fallback 품질 (캐릭터·lieState 무관)
3. Q-A 불일치 (정보 ↔ 동기 ↔ 책임 ↔ 감정 차원 mismatch)
4. 진실 누설 (재판관·시스템·dossier 채널)
5. 어색한 문장 (번역체 / 명사형 / 직역 / 시적 결구)
6. 호칭·존칭·말투
7. 진행감 피드백 (정책 v1.1 표면 정합)
8. 판결·후일담 품질

### 핵심 루트 (사건당 50~100)
- Phase 1·2 (초기·반박 진술)
- Phase 3·5 심문 3종 (`fact_pursuit` / `motive_search` / `empathy_approach`)
- Phase 4 증거 조사 (핵심 evidence + 조합)
- Phase 6 중재
- Phase 7 판결 (4단계)
- Result 후일담

### 분류 카테고리 (`docs/spot-check-format.md` 정합)
- P1~P6 / D1~D4 / C1~C5 / P7 / fallback / 누설 / 정책 위반

---

## 4. 진행 순서

Phase A (spouse-01) → 산출물 commit + push + CT-Main 보고
→ Phase B (family-01) → 산출물 commit + push + CT-Main 보고
→ Phase C (friend-01) → 산출물 commit + push + CT-Main 보고
→ Phase D (통합 보고) → 산출물 commit + push + CT-Main 보고

---

## 5. 산출물 위치

```
tmp/qa-script-polish-audit-results/
├── 20260427-spouse-01-summary.md
├── 20260427-family-01-summary.md
├── 20260427-friend-01-summary.md
├── 20260427-overall-summary.md
├── findings.json
├── pattern-extraction.md
└── recommended-patch-priority.md
```

---

## 6. 절대 회피선

- **ScriptedText / caseData / 정책 직접 수정 X** (read only / patch는 별도 의뢰서)
- **`src/app/pc.css` touch X**
- baseline anchor (v1·v2) 회귀 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 변경 X
- LLM / API 영역 변경 X
- 14,931 전수 X (핵심 루트 50~100만)
- 정적 분석 도구만 X (수동 read + 의미 검증 본질)
- 실제 키 / secret 영역 표시 X

---

## 7. 종료 조건

- [ ] Phase A·B·C·D 완료
- [ ] 사건당 50~100 routes audit
- [ ] 점검 영역 8개 모두 적용
- [ ] 발견 사례 8필드 + severity + 분류 카테고리 명시
- [ ] 동형 패턴 추출
- [ ] 통합 보고 + findings.json
- [ ] working tree 영역 변경 X (산출물만 추가)
- [ ] CT-Main 보고

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A spouse-01 진입.
