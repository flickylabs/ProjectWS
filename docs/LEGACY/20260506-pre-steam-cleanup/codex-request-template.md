# Codex 의뢰서 표준 템플릿

**버전**: v1 (Tier 1)
**대상**: 모든 Codex 의뢰는 이 템플릿을 따른다.
**작성**: ClaudeCode CT (2026-04-27)

---

## 0. 사용 원칙

1. **"진실 누설 금지"** 섹션을 가장 위에 명시 — `docs/disclosure-policy.md` 참조 강제
2. 잘못 패턴 #6 / #9 / #11 / #12 references 명시
3. 사용자 spot check 사례는 *예시*가 아니라 *동형 패턴 탐지 시작점*임을 명시
4. 분담 (Codex / ClaudeCode / 사용자) 영역 명확화
5. 완료 조건 = 자동 검증 PASS + 상대 모델 리뷰 PASS + 사용자 confirm

---

## 1. 템플릿 본문

```markdown
# REQUEST: <작업명> (<주도자>)

**작성**: <ClaudeCode CT 또는 다른 주도자>
**날짜**: YYYY-MM-DD
**근거**: <메모리 / 사용자 결정 / 합의 출처>
**분담**: <누가 무엇을>

---

## 0. 절대 회피 (가장 위)

- ❌ **진실 누설 금지** — `docs/disclosure-policy.md` 참조
  - 재판관·시스템·dossier 및 **NPC 비자백 채널**에서는 S5 전 진실 lexeme 노출 X
  - 단, 플레이어가 직접 deep investigation으로 획득한 evidence detail은 `evidenceStage` 정책에 따름 (`docs/disclosure-policy.md` §2.3 Player-discovered)
  - `aftermath` 채널은 판결 후 자유 공개 (`§2.4`)
  - 사건별 금지 lexeme list:
    - spouse-01: "형", "조카", "위임장 조작", "투자 사기", "형 빚" 등
    - family-01: "출생 비밀", "배다른", "20년 동안 B 돈" 등
    - friend-01: "예비신랑이 먼저", "아버지의 사기", "같은 패턴 반복" 등
- ❌ ScriptedText 자동 일괄 수정 (잘못 패턴 #6)
- ❌ 사용자 1 사례만 처리 — 동형 검출 강제 (잘못 패턴 #11)
- ❌ 정적 PASS = 완료 단정 (잘못 패턴 #12)
- ❌ baseline-pre-policy-v1 (a10b801) 회귀
- ❌ `useActionDispatch.ts` / `judgeQuestionEngine.ts` 대형 리팩터

---

## 1. 목표

<한 줄로 작업 목적>

---

## 2. 근거

- 사용자 spot check / 결정:
- 메모리 references:
- baseline anchor: `baseline-pre-policy-v1` (a10b801)
- 합의 문서: <handoff / commits>

---

## 3. 분담

| 영역 | 주도 | 검토 |
|---|---|---|
| <작업1> | Codex | ClaudeCode |
| <작업2> | ClaudeCode | Codex |

---

## 4. 산출물

### 4.1 필수 (blocker)

1. `<path>` — 형식: <JSON schema / Markdown 구조 / 코드 patch>
   - 메타: `baselineTargetSha=a10b801` 명시
   - 검증: <자동 검증 스크립트 명시>

2. ...

### 4.2 선택 (best-effort)

1. <30분 timer / skip 표시 절차>

---

## 5. 검증

### 5.1 자동 검증 (Codex 자체)

```bash
node tmp/detect-truth-leak.cjs
node baseline/pre-policy-v1/<관련 precheck>
# Tier 2 진입 후
npm run check:policy
npm run check:all
```

기준: leak 0건 / 8 layer precheck allPass / policy-vs-data cross-check PASS

### 5.2 ClaudeCode CT 검수 영역

- [ ] 한국어 자연체 (잘못 패턴 #6 — 단순 어휘 교체 X)
- [ ] 9차원 의미 정확성 (lieState / archetype / 추궁 차원)
- [ ] 호칭 / 존칭 / 어법 (Claude 분담 영역)
- [ ] 정책 (`docs/disclosure-policy.md`) 일치
- [ ] 사건 fact 보존 (`memory/story_v2_confirmed_3cases.md`)
- [ ] baseline anchor 회귀 X
- [ ] <작업별 추가 항목>

### 5.3 사용자 confirm 영역

- spot check sample 검증 (사용자 직접)
- 최종 제품 판단 (game feel / 자연체 / 발화 흐름)

---

## 6. 완료 조건

세 가지 모두 충족 시:
1. 자동 검증 PASS (이 의뢰서 5.1)
2. 상대 모델 리뷰 PASS (5.2 또는 Codex 역리뷰)
3. 사용자 confirm (5.3)

한 사람이 단독 완료 선언 X.

---

## 7. 참조 자료

- `baseline/pre-policy-v1/` — anchor (a10b801)
- `docs/disclosure-policy.md` — 정책 본문
- `docs/spot-check-format.md` — spot check 접수 포맷
- `tmp/REQUEST-Codex-Tier0-baseline-freeze.md` — 의뢰 패턴 사례
- 메모리 references:
  - `feedback_truth_leak_prohibition.md` (#9)
  - `feedback_revision_meaning_over_form.md` (#6)
  - `feedback_broad_homologous_detection.md` (#11)
  - `feedback_static_analysis_limit.md` (#12)
  - `story_v2_confirmed_3cases.md`
  - `project_active_cases.md`

---

## 8. 진행 절차

1. CT가 의뢰서 초안 작성 → 사용자 검토
2. 사용자 승인 → Codex 전달
3. Codex 산출물 생성 (자동 검증 PASS 후 보고)
4. ClaudeCode CT 검수 (5.2 체크리스트)
5. 사용자 spot check / confirm
6. 한 단위(commit / 의뢰서 lifecycle) 완료
```

---

## 2. 사용 사례

### 2.1 baseline anchor 작성 (Codex 주도)
- `tmp/REQUEST-Codex-Tier0-baseline-freeze.md` 참조
- 산출물: 7 blocker + 1 선택
- 완료 조건: leak 0 / precheck 8 PASS / CT 8 체크리스트 / 사용자 push 승인

### 2.2 광범위 동형 검출 (Codex 주도, 잘못 패턴 #11)
- 사용자 사례 → CT가 패턴 추출 → 의뢰서에 검출 알고리즘 명시
- 합산 목표 명시 (예: "같은 패턴 100건+ 처리")
- 종료 조건: "광범위 매트릭스 PASS"

### 2.3 정적 분석 한계 영역 (Codex 주도, 잘못 패턴 #12)
- D1~D4 차원 specialist 분리
- "정적 PASS = 완료 X" 명시
- 9 specialist 라운드 (필요 시) — 5 기존 + 4 신규

### 2.4 정책 JSON 작성 (Codex 주도, Tier 1)
- 자동 파생 X — 사람이 작성, caseData/v2-atoms cross-check
- runtime import 금지 (Tier 3 진입 전)
- Markdown 정책과 sync 검증

---

## 3. 의뢰서 위치 규칙

- **임시 (작업 진행 중)**: `tmp/REQUEST-Codex-<작업명>.md`
- **commit 시점**: 작업 완료 후 push (영구 기록 — 의뢰 패턴 보존)
- **참고용 (이전 의뢰)**: `tmp/REQUEST-Codex-recovery-v[2,4,5,6].md`, `tmp/REQUEST-Codex-Tier0-*.md`

---

## 4. 메타

**버전 변경 절차**:
- 잘못 패턴 신규 발견 시 0번 섹션 보강
- 분담 변경 시 3번 섹션 갱신
- 검증 영역 추가 시 5번 섹션 확장

**관련 자료**:
- `docs/disclosure-policy.md`
- `docs/spot-check-format.md`
- `baseline/pre-policy-v1/rollback-procedure.md`
