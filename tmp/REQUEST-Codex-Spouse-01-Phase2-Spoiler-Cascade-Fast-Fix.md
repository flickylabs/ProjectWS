# REQUEST — Codex-Dev spouse-01 Phase 2 Spoiler Cascade Fast Fix (P0 — 출시 차단)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main (사용자 spot check 명시 영역)
**우선순위**: **P0 출시 차단** (Route Simulator 우선 / Free Question Hygiene Fast Fix와 병렬 영역)
**병렬**: Free Question / LLM Hygiene Fast Fix (write scope 다른 영역) / Domain 4 Manual QA (사용자 직접 영역)

---

## 1. 사용자 spot check 본문 (재현 보고)

재현 절차:
1. spouse-01 / Phase 2 심문
2. 캐릭터A (박지연) 기준 쟁점1에 대해 `사실 추궁`만 반복
3. 새 증거 unlock
4. 새 증거명 = **`형 문자 스레드`** (기대: `발신자 미상 문자` — 여러 번 수정한 surfaceName 회귀 영역)
5. 이어서 새 쟁점 연속 오픈
6. 새 쟁점 확인 시 쟁점2 + 캐릭터B (이준호) 메시지 노출
7. 캐릭터B 메시지: **"형 사정 때문에 현금으로 전한 겁니다"** (S0~S2 영역 진실 직접 노출 금지)

추가 영역:
- 추궁하기 / 모순 감지 팝업 패널 좌우 여백 거의 0 — 레이아웃 깨짐
- `[SCRIPT]` / `[FALLBACK]` / `[LLM]` 내부 source label UI 노출

---

## 2. 진입 조건

- HEAD: 최신 main (cd5f17c 또는 그 이후 — `09a1915` Release QA / `ea6ff31` Script Polish 영역 모두 정합)
- baseline anchor: `baseline-pre-policy-v1` / `v2` 보존
- working tree: tracked clean
- `npm run check:all` PASS / `npm run build:pc` PASS / `npx tsc -b --force` PASS

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / 영역 검수 | CT-Main |
| **이 세션 (Codex-Dev Spoiler Cascade Fast Fix)** | **5 fix 영역 + 검증 + commit** |
| Script Polish 14건 통합 patch | 후속 영역 (이번 fix 후) |
| Route Simulator | 후속 영역 (이번 fix 후) |
| Free Question / LLM Hygiene Fast Fix | 별도 트랙 (`[SCRIPT]` / `[FALLBACK]` / `[LLM]` 영역 — 본 세션이 처리 영역으로 흡수 가능 / 사용자 명시 영역 정합) |

---

## 4. 사전 audit 결과 (CT 영역)

### 4.1 `형 문자 스레드` / `형 사정 때문에 현금으로 전` 영역 6 파일
- `src/data/disclosurePolicy/spouse-01.json` — 정책 영역 `name` (의도 OK)
- `src/data/cases/generated/spouse-01.json` — caseData `name` (의도 OK)
- `src/data/disclosurePolicy/spouse-01-cross-check.md` / `_schema.md` — docs (의도 OK)
- **`src/data/emergenceHooks.ts`** — runtime 영역 (P0 영역 후보 — 진실 직접 발화 영역)
- **`src/data/claimPolicies/spouse-01-structure-v2.json`** — runtime 영역 (P0 영역 후보 — `name` 영역 노출 의심)

→ Phase A에서 정확한 line + 영역 식별. UI 영역 (NPC 응답 / 시스템 / discovery feedback / 새 증거 unlock 영역) 추적.

### 4.2 source label 영역
- `[SCRIPT]` 태그 src/ 영역에 0건 검출 — `src/data/scriptedText/*.json` 또는 LLM 응답 후처리 영역 또는 ScriptedText loader 영역
- `[LLM]` / `[FALLBACK]` 영역 — `src/engine/llmClient.ts` / `src/hooks/useActionDispatch.ts`

→ Phase A에서 노출 경로 추적.

### 4.3 자동 unlock 흐름 영역
- `src/data/emergenceHooks.ts` (early discovery hook 영역)
- `src/engine/discoveryEngine.ts` (unlock trigger)
- `src/engine/meterStagingV2.ts` (dossier 단계 영역)
- `src/engine/gameEventTriggerEngine.ts` (event chain 영역)

→ Phase A에서 사실 추궁 반복 → chain unlock trigger 영역 식별 + gating 정합.

### 4.4 UI 영역
- 추궁하기 팝업 / 모순 감지 팝업 영역 — `src/components/pc/*` 또는 modal 영역
- pc.css 단일 소유 영역 (사용자 명시)

---

## 5. Scope (사용자 명시 5 fix)

### 5.1 증거 unlock 영역 surfaceName 사용 (P0)

**기대**: locked / early 단계 영역에서 **반드시 `surfaceName`** 사용. `형 문자 스레드` UI 노출 0건. 기대 표시: `발신자 미상 문자`.

**대상**:
- 새 증거 unlock UI 영역 (discovery / event feedback / 시스템 영역)
- `src/data/claimPolicies/spouse-01-structure-v2.json` 영역에서 `name` 사용 영역 → `surfaceName` 영역 정합 (단 정책 영역 직접 수정 X — runtime 변환 영역)
- runtime 영역에서 evidence object access 시 `surfaceName` 우선 / `name` fallback X (early 단계)
- evidenceStage 영역 정합 (`docs/disclosure-policy.md` §3.2 정합)

**검증**: `발신자 미상 문자` 영역만 노출 / `형 문자 스레드` 0건.

### 5.2 spouse-01 early discovery / emergence hook gating (P0)

**기대**: Phase 2에서 `사실 추궁` 반복만으로 새 증거 + 새 쟁점이 연쇄 오픈 X. evidenceStage / truthStage / required evidence 조건 충족 후만 unlock.

**대상**:
- `src/data/emergenceHooks.ts` (early hook 영역 — 조건 강화)
- `src/engine/discoveryEngine.ts` (unlock 조건 영역)
- `src/engine/meterStagingV2.ts` (dossier 단계 영역)
- `src/engine/gameEventTriggerEngine.ts` (event chain 영역)

**조건 강화**:
- 단순 `fact_pursuit` 반복 → 자동 unlock X
- evidenceStage 조건 충족 (사용자가 직접 evidence 영역 조사 영역)
- 또는 명확한 contradiction_pursuit 영역 + lieState 전이
- 새 쟁점 unlock = 명확한 evidence 영역 + 단계 조건 충족

**회피선 (사용자 명시 정합)**:
- 대형 리팩터 X / minimal gating 정합만
- 기존 chain 흐름 영역 본체 변경 X (조건만 강화)

### 5.3 emergenceHooks.ts 캐릭터B 진실 직접 발화 영역 조정 (P0)

**기대**: 해당 단계에서 다음 영역 금지:
- `형` (관계 noun)
- `형 사정` (관계 + 정황)
- `현금으로 전했다` (행동 진실)
- 기타 §4.1 spouse-01 globalTruthLexemes 영역 (formal lexeme 영역 — `docs/disclosure-policy.md` §4.1)

**조정 방향**:
- early 단계 → 모호한 방어 / 회피 문장으로 대체 (캐릭터 archetype 정합 — 이준호 avoidant)
- full truth → evidenceStage 영역 적절 영역 이후 (`docs/disclosure-policy.md` §3.3 매트릭스 정합 — S3+ gated / S5 자유)

**대안 sample (avoidant archetype 정합)**:
- `"제가 사정이 좀 복잡해서요. 자세한 건 말씀드리기가..."` (S0~S1)
- `"가족 일이라 한 번에 설명드리기 어렵습니다."` (S2)
- → S5 자백 영역에서 형/현금 lexeme 자유

### 5.4 내부 source label UI 노출 제거 (P0)

**기대**: 다음 영역 UI 노출 0건:
- `[SCRIPT]`
- `[FALLBACK]`
- `[LLM]`
- 변형 (`[script]` / `[fallback]` / `[llm]` / `[LLM:dialogue]` 등)

**대상**: 코드 debug log 영역 (`console.log`)은 OK / 사용자 영역 (NPC 응답 / 시스템 / 채팅창 / 관찰 / 수첩 / 발언노트 / VFX / 추궁 영역 / 모순 영역) 0건.

→ Free Question / LLM Hygiene Fast Fix 의뢰서 영역과 정합 (사용자 명시 영역 — 본 세션이 같이 처리 영역).

### 5.5 추궁하기 / 모순 감지 팝업 좌우 여백 (P1 → P0 묶음)

**기대**: modal content padding / max-width / mobile layout 정합. 좌우 여백 영역 정상화.

**대상**:
- 추궁하기 팝업 컴포넌트 영역 (`src/components/pc/*` 영역)
- 모순 감지 팝업 컴포넌트 영역
- `src/app/pc.css` (단일 소유 영역 — 사용자 명시)

**회피선**: pc.css 단일 소유 영역 / 다른 UI 세션 병렬 touch X.

---

## 6. 절대 회피선 (사용자 명시 + CT 영역)

### 6.1 사용자 명시
- `VITE_OPENAI_API_KEY` 재도입 X (Proxy Migration `596d235` 정합)
- API proxy 구조 변경 X
- Script Polish 대량 patch 영역과 섞기 X
- Route Simulator 영역과 섞기 X

### 6.2 CT 영역
- ScriptedText (`src/data/scriptedText/*.json`) 직접 수정 X (Patch 의뢰서 영역)
- caseData (`src/data/cases/generated/*.json`) 직접 수정 X
- 정책 (`src/data/disclosurePolicy/*` / `docs/disclosure-policy.md`) 직접 수정 X
- baseline anchor (v1·v2) 회귀 X
- feature flag global default 변경 X
- LLM 호출 영역 본체 변경 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 대형 리팩터 X (단 source label UI 노출 영역만 minimal 정합)

### 6.3 단일 소유
- **`src/app/pc.css`** — 본 세션 단일 소유 영역 (사용자 명시) / 다른 UI 세션 병렬 touch 영역 X

---

## 7. 검증 (사용자 명시)

### 7.1 spot check
- spouse-01 Phase 2에서 캐릭터A 쟁점1 사실추궁 반복
- 새 증거 표시명 = `발신자 미상 문자` (확인)
- `형 문자 스레드` UI 노출 0건 (검증)
- 새 쟁점 연쇄 오픈 — 조건 없이 발생 X (검증)
- 캐릭터B early 단계 영역 — `형 사정` / `현금으로 전했다` 영역 발화 X (검증)
- `[SCRIPT]` / `[FALLBACK]` / `[LLM]` UI 노출 0건 (검증)
- 추궁 / 모순 팝업 좌우 여백 screenshot (전후 비교)

### 7.2 빌드 / 검증
- `npm run check:all` PASS
- `npm run build:pc` PASS
- `npx tsc -b --force` PASS

### 7.3 Regression 검증
- 의도된 매핑 영역 (S3+ / S5 자백 영역) 진실 영역 노출 정상 (gated 영역 정합)
- 다른 case (family-01 / friend-01) 영역 영향 X (spouse-01 단독 fix)

---

## 8. 진행 순서

### Phase A — 사전 audit + 영역 식별
1. `형 문자 스레드` 영역 runtime 노출 경로 추적 (`structure-v2.json` 영역 → discoveryEngine → UI)
2. `emergenceHooks.ts` 영역 진실 발화 영역 list (5.3 영역 후보)
3. 사실 추궁 반복 → chain unlock 영역 trigger 식별 (5.2 영역)
4. `[SCRIPT]` / `[FALLBACK]` / `[LLM]` UI 노출 경로 grep
5. 추궁 / 모순 팝업 컴포넌트 영역 식별
6. 산출물: `tmp/qa-spouse-01-phase2-spoiler-cascade-results/20260427-phase-a-audit.md`
7. CT-Main 보고

### Phase B — 5 fix 적용
1. (5.1) surfaceName runtime 정합
2. (5.2) gating 강화 (minimal)
3. (5.3) emergenceHooks 진실 발화 영역 조정 (avoidant archetype 정합)
4. (5.4) source label UI 노출 차단
5. (5.5) 추궁 / 모순 팝업 좌우 여백 (pc.css 단일 소유)
6. screenshot 영역 (전후)
7. CT-Main 보고

### Phase C — 검증
1. spot check (사용자 명시 영역 7.1)
2. 빌드 / 검증 (7.2)
3. Regression (7.3)
4. commit + push
5. CT-Main 보고

---

## 9. 종료 조건

- [ ] (5.1) 새 증거 표시명 `발신자 미상 문자` / `형 문자 스레드` 0건
- [ ] (5.2) 사실 추궁 반복 → chain unlock 조건 영역 충족 후만 발생
- [ ] (5.3) 캐릭터B early 단계 영역 진실 lexeme 영역 0건 (S0~S2)
- [ ] (5.4) `[SCRIPT]` / `[FALLBACK]` / `[LLM]` UI 노출 0건
- [ ] (5.5) 추궁 / 모순 팝업 좌우 여백 정상 (screenshot 전후)
- [ ] regression 0 (S3+ / S5 영역 / 다른 case 영역)
- [ ] `npm run check:all` PASS
- [ ] `npm run build:pc` PASS
- [ ] `npx tsc -b --force` PASS
- [ ] commit + push
- [ ] CT-Main 보고

---

## 10. 산출물

```
tmp/qa-spouse-01-phase2-spoiler-cascade-results/
├── 20260427-phase-a-audit.md
├── 20260427-phase-b-fix-summary.md
├── 20260427-phase-c-verification.md
├── 20260427-summary.md
├── surfacename-leak-grep-before-after.txt
├── source-label-grep-before-after.txt
├── chain-unlock-flow-diagram.md
└── screenshots/
    ├── before/  (추궁 / 모순 팝업 / 새 증거 / 새 쟁점 / 캐릭터B 메시지)
    └── after/
```

---

## 11. 관련 자료

- `docs/disclosure-policy.md` §4.1 (spouse-01 globalTruthLexemes / surface 영역) / §3.2 (evidenceStage gating) / §3.3 매트릭스 / §13 (audit 검출 패턴 v1.1)
- `docs/information-surface-policy.md` v1.1 §2.6 (내부 용어 X) / §6.3 (메시지 길이)
- `tmp/REQUEST-Codex-FreeQuestion-LLM-Hygiene-Fast-Fix.md` (병렬 영역 / source label 정합)
- `tmp/qa-script-polish-audit-results/findings.json` (P0 14건 영역 — 본 fix와 본질 정합 영역)
- `tmp/qa-release-results/` (Release QA 영역 정합)
- `CLAUDE.md` (게임 핵심 원칙 / 한국어 품질)
- 본 세션 진입 메시지: `tmp/Spouse-01-Phase2-Spoiler-Cascade-Fast-Fix-NEXT-START-MESSAGE.md`

---

**상태**: 초안 작성 완료. Codex-Dev 검토 + Phase A 진입 대기. (Route Simulator / Script Polish 통합 patch 영역보다 우선)
