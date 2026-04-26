# Codex 종합 수습 의뢰 — 5 Phase

ClaudeCode CT가 5번 실수해서 누적된 데이터 품질 문제를 Codex가 수습. CT는 ClaudeCode가 계속 담당, Codex는 Worker로 광범위 검증/수정 자동화.

## 작업 원칙

1. **데이터 직접 read 검증** (메인 잘못 패턴 #1)
2. **9차원 맥락-의미 정확성** (#6)
3. **사건 설정 일치** (#8)
4. **진실 누설 금지** (#9 NEW — 게임 핵심 원칙)
5. **표면 변경 X — 의미 보존** (단순 어휘 교체로 회귀 X)

## 게임 핵심 원칙 (CLAUDE.md 인용)

> "진실은 플레이어가 직접 밝혀낸다" — 어떤 채널도 NPC 자백 전에 진실 콘텐츠 직접 언급 X

## Phase 1: 진실 누설 70건 P0 즉시 fix

상세 의뢰서: `tmp/REQUEST-Codex-truth-leak-fix.md` (이미 작성됨)
검출 raw: `tmp/truth-leak-detection.json`

- spouse-01: 65건 (judge_evidence_combo 44 + judge_question 10 + judge_contradiction 10 + judge_witness_summon 1)
- family-01: 1건 (judge_question)
- friend-01: 4건 (judge_question 2 + judge_evidence_combo 1 + judge_witness_summon 1)

수정 대상: `src/data/scriptedText/{caseId}.json` 직접 수정

산출물:
- `tmp/codex-recovery/phase1-truth-leak-fix-result.json`
- `tmp/codex-recovery/phase1-summary.md`

검증: `node tmp/detect-truth-leak.cjs` → 0건 PASS

## Phase 2: 광범위 누설 재검출 (사용자 우려 영역)

사용자 지적: "지적한 몇십건이 아니라 모든 스크립트가 다 이모양"

Phase 1의 ClaudeCode 검출 패턴은 좁음 (사건별 키워드 규칙 위주). Codex가 더 광범위 패턴으로 재검출:

### 검출 대상 채널 (확장)
- 재판관 4 채널 (Phase 1과 동일)
- system_message
- mediation
- evidence_discovery
- trust_action
- **NPC 채널 (NEW)**: interrogation / contradiction_pursuit / dossier / evidence_present
  - 단 lieState 단계별 정합 검증 — S0~S2에서 진실 노출 X
  - S3+ 단계는 점진 노출이 정상
- **interjection / emotional_overload**: 격앙 시 진실 누설 위험

### 검출 패턴 확장
1. **evidence 진실 호칭**: case data evidence.name (진실) 키워드 vs evidence.surfaceName (surface) — surface만 사용 보장
2. **dossier 카드 의미**: case data dossierCards에 정의된 의미 콘텐츠 직접 언급 검출
3. **dispute truthDescription**: case data disputes[].truthDescription의 핵심 키워드 — NPC 자백 전 (S0~S2) 시점에 누가 노출하는지 검출
4. **사건별 진실 lexeme 광범위**:
   - spouse: 형 / 조카 / 친형 / 시댁 갈등 / 위임장 조작 / 투자 사기 / 형 빚
   - family: 출생 비밀 / 배다른 / 일기장 진실 / 20년 송금 / 90→60 동기
   - friend: 아버지 사기 / 아버지 돈 갈취 / 같은 패턴 반복 / 예비신랑 먼저
5. **간접 누설**: 진실 본질을 돌려 표현하지만 명백한 노출 (예: "혈연이 다르다", "어머니 뜻을 거꾸로 해석")

산출물:
- `tmp/codex-recovery/phase2-wide-leak-detection.json` (전수 검출 결과)
- `tmp/codex-recovery/phase2-summary.md` (사건별/채널별/lieState별 통계)
- `tmp/codex-recovery/phase2-p0-list.json` (즉시 fix 권장)

## Phase 3: 9차원 광범위 audit (전수)

14,931 variants 전수 9차원 + α 검증. ClaudeCode QA-QW의 sample 검토 (1,200) 보완.

### 검증 차원
1. **사건 설정 일치** — 모든 facts 매트릭스 (family A 40/B 60, friend 아버지 패턴, spouse 5,000만원 등)
2. **archetype voice** — 사건별 인물 톤 일관 (예: family 윤정후 affect_flattening — 격앙 표현이 가능한 emotional_overload에서도 평면 유지)
3. **호칭 / 존칭 / 합니다체** — 재판관 / 당사자 / 증인 별
4. **Truth Throttle** — lieState × 사건 fact 노출 매트릭스
5. **다른 사건 인물 혼입** — 사건간 격리
6. **변수 치환 패턴** — 단조 / boilerplate
7. **사용자 모범 4 patch 적용도** — 인지 단계 / 동기 / 직접 행동 / 동사형
8. **단순 기계식 표현 / 의미 모호** (사용자 강조 영역)
9. **깨진 조사 / 번역체 / 부인 동사 / 직접 인용 결합**
10. **null/empty text** + variant id 형식 + 메타 필드 보존

### P0 즉시 fix
사건 설정 충돌 / 호칭 위반 / 합니다체 위반 / 누설 / null text — Codex 직접 수정 (의미 보존 우선)

### P1/P2 권장
ClaudeCode CT가 의미 검토 후 결정

산출물:
- `tmp/codex-recovery/phase3-9dim-audit.json`
- `tmp/codex-recovery/phase3-p0-fix-result.json` (Codex 직접 수정 결과)
- `tmp/codex-recovery/phase3-p1-p2-pending.json` (CT 결정 대기)

## Phase 4: 코드 fallback 23건 정리

상세: `tmp/qa-redo-20260426/QA-Q-codex-report.json` part3.codeFallbacks (50건 중 P0 23건)

작업:
- `?? '당사자'` / `?? '상대방'` → caseData null guard 강화
- `entry.witnessName ?? '증인'` → witnessName 누락 방지 + fallback 명확화
- `myCallTerms?.toJudge ?? '상대방'` → 적절한 fallback
- false positive 3건 (정상 라벨) 제외

수정 파일:
- `src/hooks/useActionDispatch.ts`
- `src/engine/llmDialogueResolver.ts`
- `src/components/actions/ActionPanel.tsx`
- `src/components/court/DialogueEntry.tsx`
- `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx`
- `src/components/pc/layout/PCDialogueLog.tsx`
- `src/components/pc/layout/PCInteractionPanel.tsx`
- `src/components/pc/panels/PCImportantNotesSection.tsx`

검증: 빌드 + tsc 통과

산출물:
- `tmp/codex-recovery/phase4-fallback-fix-result.json`

## Phase 5: 검증 시스템 보강

Codex가 ClaudeCode가 만든 검증 스크립트 보완:

### 기존 스크립트 (강화 대상)
- `tmp/precheck-matrix.cjs` — 10항목 사전 검증 (h-d 매핑 / null text / 호칭 / 깨진 조사 / 매트릭스 등)
- `tmp/detect-truth-leak.cjs` — 진실 누설 검출 (좁은 키워드 패턴)

### Codex 보강 영역
1. **누설 검출 광범위화** — Phase 2 패턴 통합
2. **9차원 자동 검증** — Phase 3 차원 통합
3. **사건 설정 충돌 자동** — case data fact ↔ ScriptedText 매트릭스 cross-check
4. **archetype voice 정량 검출** — 사건별 verbal tell 분포 자동
5. **Truth Throttle 곡선** — lieState × fact 매트릭스 자동
6. **PASS/FAIL 자동 게이트** — 적용 전후 필수 실행

산출물:
- `tmp/codex-recovery/precheck-comprehensive.cjs` (통합 사전 검증)
- `tmp/codex-recovery/phase5-validation-system-doc.md` (사용 가이드)

새 ClaudeCode CT는 모든 적용 전후 `precheck-comprehensive.cjs` 실행 → 0 PASS만 적용.

## 적용 절차 (Phase별)

각 Phase 완료 시:
1. Codex가 산출물 저장 (`tmp/codex-recovery/`)
2. Codex가 자체 검증 (빌드 + tsc + 사전 검증)
3. PASS 후 다음 Phase 진행
4. FAIL 시 즉시 보고 + 보정

전체 완료 후:
- `tmp/codex-recovery/FINAL-REPORT.md` (5 Phase 종합 결과)
- 새 ClaudeCode CT가 회수 + 시각 검증 + commit

## 사건별 핵심 설정 (절대 충돌 금지)

### spouse-01 — "새벽 통화기록"
- A 박지연 victim_cosplay / B 이준호 avoidant
- 5,000만원 증발 (3,000 적금 + 2,000 사기) / 형 빚 / 조카 돌봄 / 시댁 갈등 / 위임장 조작 / 투자 사기

### family-01 — "치매 어머니의 유서" ⚠️
- A 윤태성 confrontational / B 윤정후 affect_flattening
- **유서 비율 A 40 / B 60** (B가 90→60 줄임). 절대 반대 X.
- 출생 비밀 / 20년 지원 / 어머니 일기장 / 1억 막음

### friend-01 — "손절한 절친"
- A 송다은 premature_summary / B 최수민 affect_flattening
- 예비신랑 선 넘은 메시지 / A 아버지 돈 갈취 / 같은 패턴 반복

## 사용자 모범 4 patch (필수 일관)

| Patch | 차원 |
|---|---|
| 1 | "쪽이었는데" → "주장이었는데" (인지 단계 약화) |
| 2 | "무엇을 알고" → "왜 그렇게 확신하고" (정보 → 동기) |
| 3 | "흐리면" → "밝히지 않으면" (추상 → 직접 행동) |
| 4 | "{X} 돌봄/지원" → "{X}을 돌본/도운 것" (명사형 → 동사형) |

## 잘못 패턴 #1~#9 모두 회피

1. Agent 보고 무비판 수용 X
2. 임의 정보 작성 X
3. 다른 사건 정보 혼입 X
4. 신규 작성 vs 보완 혼동 X
5. 사용자 detail 메시지 = 항상 보완 방향
6. 9차원 맥락-의미 정확성
7. 단순 확인 옵션 X
8. GPT 산출물 사건 설정 일치 검증
9. **(NEW) 진실 누설 금지** — 게임 핵심 원칙

## 출력 폴더

`tmp/codex-recovery/` (새로 생성)
- `phase1-*` — 누설 70건 fix
- `phase2-*` — 광범위 누설 재검출
- `phase3-*` — 9차원 audit
- `phase4-*` — fallback 정리
- `phase5-*` — 검증 시스템 보강
- `FINAL-REPORT.md` — 종합

## 참고 자료 (모두 정독)

### 데이터
- `src/data/cases/generated/{caseId}.json` (case data — 진실 / surface)
- `src/data/scriptedText/{caseId}.json` (수정 대상)
- `src/data/claimPolicies/{caseId}-{v2-atoms,structure-v2,game-events-v2,dossier-cards}.json`

### 메모리 (도메인)
- `CLAUDE.md` — 게임 구조 + 핵심 원칙
- `gpt-pro-runs/script-redo-20260426/source/04-story-v2-3cases.md` — 사건 핵심
- `gpt-pro-runs/script-redo-20260426/source/05-user-pattern-correction.md` — 사용자 모범 4
- `gpt-pro-runs/script-redo-20260426/source/06-korean-quality-rules.md` — 한국어 품질
- `gpt-pro-runs/script-redo-20260426/source/07-mistake-patterns.md` — 잘못 패턴 #1~#8 (#9는 아래)
- (NEW) `~/.claude/projects/d--ProjectWS/memory/feedback_truth_leak_prohibition.md` — 잘못 패턴 #9 진실 누설 금지

### 이전 audit 결과
- `tmp/qa-redo-20260426/QA-{Q,QW,QW-Cross}-*` — Thread별 QA 결과
- `tmp/truth-leak-detection.json` — Phase 1 raw
- `tmp/precheck-result.json` — 매트릭스 검증
