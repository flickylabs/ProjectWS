# REQUEST — Script Polish Audit (P1-A) — read/report only

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: P1 (출시 전 품질 영역)
**병렬**: API Proxy Migration 완료 (`596d235`) / Release QA 재진입 영역 / P0-E·F 완료 영역 — 모두 영역 충돌 X

---

## 1. 목표

활성 3 사건 (spouse-01 / family-01 / friend-01)의 ScriptedText 영역 **핵심 루트 50~100개**를 audit해서 P0/P1/P2 영역을 식별 + 8필드 + severity로 분류 보고. **read/report only** — patch는 별도 의뢰서 영역.

---

## 2. 진입 조건

- HEAD: `596d235` (또는 그 이후 main 최신)
- baseline anchor: `baseline-pre-policy-v1` (a10b801) / `v2` (acf5d27) 보존
- working tree: tracked clean
- `npm run check:all` PASS (hard 0 / warnings 157)

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / 분류 / patch 우선순위 결정 | CT-Main (audit 보고 받은 후) |
| **이 세션 (Script Polish Audit)** | **read 영역 audit + 8필드 분류 + 보고서 작성** |
| Patch 작업 | 별도 의뢰서 (audit 결과 받은 후 — Codex-Dev 영역) |
| 사용자 | 보고 받은 후 patch 우선순위 결정 |

---

## 4. 정독 자료 (필수)

| 우선순위 | 파일 | 영역 |
|---|---|---|
| P0 | `docs/spot-check-format.md` | **8필드 + 분류 카테고리 (P1~P6 / D1~D4 / C1~C5 / P7 / fallback / 누설 / 정책 위반)** |
| P0 | `docs/disclosure-policy.md` | 진실 누설 정책 (활성 3 사건 surface vs 진실 매핑) |
| P0 | `docs/information-surface-policy.md` v1.1 | 7 표면 위상 / 채널 권한 / 기계적 관찰문 회피 |
| P0 | `CLAUDE.md` | 게임 핵심 원칙 / 한국어 품질 / 호칭 규칙 / 톤 |
| P1 | `memory/story_v2_confirmed_3cases.md` 영역 (3 사건 사건 설정 + archetype) | |
| P1 | `src/data/scriptedText/{spouse-01,family-01,friend-01}.json` | audit 대상 (read only) |
| P2 | `memory/feedback_revision_meaning_over_form.md` | 9차원 의미 정확성 |
| P2 | `memory/feedback_judge_question_quality.md` | 재판관 질문 품질 |

---

## 5. Scope

### 5.1 audit 영역 (read only)
- `src/data/scriptedText/spouse-01.json`
- `src/data/scriptedText/family-01.json`
- `src/data/scriptedText/friend-01.json`

### 5.2 핵심 루트 정의 (사건당 50~100 routes)
첫 플레이에서 자주 보는 영역 우선:

| Phase | 영역 |
|---|---|
| Phase 1 | 초기 진술 (양측) |
| Phase 2 | 반박 진술 (양측) |
| Phase 3 | 심문 3종 (`fact_pursuit` / `motive_search` / `empathy_approach`) × 양측 × 핵심 dispute |
| Phase 4 | 증거 조사 (`evidence_present` / `evidence_combine` / `evidence_investigate`) — 핵심 evidence + 핵심 조합 (e-1·e-2·e-4·e-5·e-7 영역) |
| Phase 5 | 재심문 (Phase 3 영역 + meterState 변화 후) |
| Phase 6 | 중재 (양측 화해/충돌 영역) |
| Phase 7 | 판결 (4단계 — 통찰/권위/지혜/책임 분배) |
| Result | 후일담 (aftermath) |

각 Phase 안에서 핵심 루트 = 가장 빈도 높은 routes 또는 lieState 핵심 전이 (S0→S1, S2→S3, S4→S5).

### 5.3 점검 영역 (사용자 명시)

| # | 점검 | 분류 카테고리 |
|---|---|---|
| 1 | 응답 누락 (NPC 답변 빈 / `...` / 1단어) | fallback |
| 2 | fallback 품질 (캐릭터 archetype 무관 / lieState 무관) | fallback / D3 |
| 3 | Q-A 불일치 (정보 질문 → 동기 답변 / 책임 질문 → 감정 답변) | P1 |
| 4 | 진실 누설 (재판관 / 시스템 / dossier 채널 진실 lexeme) | 누설 / P7 |
| 5 | 어색한 문장 (번역체 / 명사형 / 직역 / 시적 결구) | P2 / C1 / C2 |
| 6 | 호칭/존칭/말투 (재판관 → "OOO 씨" / 당사자 → "재판관님" 합니다체 / 반말 / 해요체) | C1 / C3 / 정책 위반 |
| 7 | 진행감 피드백 (`docs/information-surface-policy.md` 표면 정합 — 채팅창/관찰/수첩/발언노트 분리) | 정책 위반 |
| 8 | 판결/후일담 품질 (수첩 3 카테고리 정합 / 판결 직전 요약 / 후일담 자연체) | C2 / C4 |

각 발견 사례는 8필드 + severity (P0/P1/P2) + 분류 카테고리 + 패턴 추출 (정규식 / 키워드).

### 5.4 진행감 피드백 영역 (P1-D 정합)

`docs/information-surface-policy.md` v1.1 §3 매트릭스 정합 검증:
- 채팅창 시스템 메시지 길이 (≤ 30자 / ≤ 60자 / 세 줄 이상 X)
- 관찰 영역 사용 (현재 phase 동안만)
- 수첩 자동 저장 트리거 (자백 / 결정적 모순 추궁 확정 / 핵심 evidence 조합)
- 발언노트 4 트리거 (자백 / 증인 핵심 / 결정적 모순 전후 / `key_statement`)
- 내부 용어 노출 X (`intent` / `classifier` / `LLM` / `guard` / `policy` / `누설`)

---

## 6. 절대 회피선

- **ScriptedText / caseData / 정책 영역 직접 수정 X** (read only)
- **`src/app/pc.css` touch X**
- baseline anchor (v1·v2) 회귀 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 변경 X
- LLM / API 호출 영역 변경 X (Proxy Migration 정합)
- patch 영역 X (별도 의뢰서)
- 14,931 변종 전수 audit X (핵심 루트 50~100만)
- 자동 검증 도구로 일괄 분류 X — 수동 read + 의미 검증 본질 (잘못 패턴 #12 — 정적 분석 한계)
- 실제 키 / secret 영역에 표시 X (Proxy Migration 학습 영역 정합)

---

## 7. 진행 순서

### Phase A — spouse-01 (핵심 루트 50~100)
1. ScriptedText spouse-01 read
2. Phase 1·2·3·4·5·6·7·Result 영역 핵심 루트 식별
3. 8 점검 영역 적용
4. 발견 사례 8필드 + severity + 분류 보고
5. 산출물: `tmp/qa-script-polish-audit-results/20260427-spouse-01-summary.md`
6. CT-Main 보고

### Phase B — family-01
1. spouse-01 audit 패턴 재활용
2. 동일 절차
3. 산출물: `tmp/qa-script-polish-audit-results/20260427-family-01-summary.md`

### Phase C — friend-01
1. 동일 절차
2. 산출물: `tmp/qa-script-polish-audit-results/20260427-friend-01-summary.md`

### Phase D — 통합 보고
1. 3 사건 통합 발견 사례 + 동형 패턴 추출
2. P0/P1/P2 영역 우선순위 list
3. 분류 카테고리별 통계
4. patch 의뢰서 영역 권장 (CT-Main 별도 영역)
5. 산출물: `tmp/qa-script-polish-audit-results/20260427-overall-summary.md` + `findings.json`

---

## 8. 종료 조건

- [ ] Phase A·B·C·D 완료
- [ ] 사건당 50~100 routes audit
- [ ] 점검 영역 8개 모두 적용
- [ ] 발견 사례 8필드 + severity + 분류 카테고리 명시
- [ ] 동형 패턴 추출 (정규식 / 키워드 / 의미 indicator)
- [ ] 통합 보고 + findings.json
- [ ] `npm run check:all` PASS (working tree 변경 X — 산출물만 추가)
- [ ] CT-Main 보고

---

## 9. 산출물

```
tmp/qa-script-polish-audit-results/
├── 20260427-spouse-01-summary.md
├── 20260427-family-01-summary.md
├── 20260427-friend-01-summary.md
├── 20260427-overall-summary.md
├── findings.json                      (8필드 + severity 구조화 list)
├── pattern-extraction.md              (동형 패턴)
└── recommended-patch-priority.md      (CT-Main patch 의뢰서 영역 입력)
```

---

## 10. 발견 사례 8필드 + 추가 필드 (`docs/spot-check-format.md` 정합)

각 사례 다음 영역:

```yaml
- caseId: spouse-01 / family-01 / friend-01
  phase: 0~7 / Result
  action: fact_pursuit / motive_search / empathy_approach / evidence_* / witness_* / contradiction_pursuit / system_message / phase_transition / dossier_unlock / 기타
  target: 박지연 / 이준호 / 윤태성 / 윤정후 / 송다은 / 최수민 / w-1 / system / N/A
  disputeOrEvidence:
    disputeId: d-1 / d-2 / h-d3 / h-d4
    evidenceId: e-1 ~ e-7
    investigationStage: 0 / 1 / 2 / N/A
    meterState: rapport / contradiction / leak (해당 시)
  quote: 발견 원문 (full quote)
  why: 이상 이유 (진실 누설 / 의미 불일치 / lieState 흐름 / 자연체 / archetype / evidence stage)
  expected: 기대 방향 (대안 표현 또는 의미 / 직접 patch 제시는 선택)
  severity: P0 / P1 / P2
  category: P1 ~ P6 / D1 ~ D4 / C1 ~ C5 / P7 / fallback / 누설 / 정책 위반
  patternHint: 정규식 / 키워드 list / 의미 indicator
  variantId: ScriptedText 영역 variant ID (해당 시)
```

---

## 11. 관련 자료

- `docs/spot-check-format.md` (8필드 + 분류 카테고리)
- `docs/disclosure-policy.md`
- `docs/information-surface-policy.md` v1.1
- `CLAUDE.md`
- `memory/feedback_revision_meaning_over_form.md` (#6)
- `memory/feedback_truth_leak_prohibition.md` (#9)
- `memory/feedback_broad_homologous_detection.md` (#11)
- `memory/feedback_static_analysis_limit.md` (#12)
- `memory/feedback_judge_question_quality.md`
- 본 세션 진입 메시지: `tmp/Script-Polish-Audit-NEXT-START-MESSAGE.md`

---

**상태**: 초안 작성 완료. 세션 검토 + Phase A 진입 대기.
