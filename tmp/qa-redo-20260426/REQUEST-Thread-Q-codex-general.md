# Thread-Q (Codex) — 일반 QA 300 tasks

## 작업 목표
**3 사건 통합본 (9 세션 GPT Pro 적용 + null text 복구 완료) 광범위 일반 QA**.
형식/구조/통계/자동 검출 + 사건 설정 일치 검증 + 코드 레벨 fallback 표현.

Codex 토큰 충분 → 다양한 경우의 수 광범위 검출. **300 tasks** 권장 (Part 1 형식 100 + Part 2 콘텐츠 자동 검출 100 + Part 3 채널간 일관성 + 코드 레벨 100).

## 대상 파일

### 활성 데이터 (3 사건)
| 사건 | ScriptedText | Case Data | 합산 |
|---|---|---|---|
| spouse-01 | `src/data/scriptedText/spouse-01.json` | `src/data/cases/generated/spouse-01.json` | 4,677v / 18ch |
| family-01 | `src/data/scriptedText/family-01.json` | `src/data/cases/generated/family-01.json` | 5,172v / 18ch |
| friend-01 | `src/data/scriptedText/friend-01.json` | `src/data/cases/generated/friend-01.json` | 5,082v / 18ch |

총 **14,931 variants / 54 channels** 대상.

### 추가 검토
- `src/data/claimPolicies/{caseId}-{v2-atoms,structure-v2,game-events-v2,dossier-cards}.json`
- `src/hooks/useActionDispatch.ts` — fallback 문자열 (이번 "증인 씨" 버그 같은 추가 발굴)
- `src/components/` UI 텍스트 fallback
- `src/engine/{llmDialogueResolver,llmFreeQuestion,judgeQuestionEngine,judgeProfileEngine}.ts` — 동적 메시지 템플릿

## 적용 규칙: _LEGACY_84CASES_DO_NOT_REFERENCE/ 폴더 절대 무시

활성 사건 = 3 사건만. `_LEGACY_*` 경로 등장 시 즉시 스킵.

---

## Part 1: 형식/스키마/카운트 정합성 (100 tasks)

### 1.1 JSON 스키마 (30 tasks)
- 18 channels 모두 존재 (3 사건 동일 구조)
- 각 channel.entries 배열 유효
- variant {id, text, behaviorHint, tags[], sourceRefs[]} 모두 존재
- text === null / undefined / empty 0건 (이미 fix 했음 — 회귀 검증)
- behaviorHint / tags / sourceRefs 누락 0건

### 1.2 카운트 정합성 (30 tasks)
- 채널별 cells × variants 곱 정확
- variant id 형식 일관:
  - interrogation: `{party}-{disputeId}-{lieState}-{questionType}-v{n}`
  - dossier: `dc-{n}-{party}-q{m}-{lieBand}-v{n}` (party 가운데)
  - judge_*: `judgeq-` / `judgec-` / `judgeec-` / `judgew-` prefix
- sourceRefs / dispute / evidenceId 참조 무결성

### 1.3 dimensionMatrix 정합성 (40 tasks)
- interrogation: party × disputeId × lieState × questionType (5 disputes / 6 lieState / 4 questionType)
- evidence_present: party × evidenceId × lieBand × (subjectRole | stage | action)
  - 168 cells = 42 base (subjectRole) + 90 stage (1/2/3) + 36 action
- dossier: question_id × lieBand
- 신규 4 채널 (judge_evidence_combo / judge_witness_summon / rapport_milestone / contradict_milestone) cells 수 일관
- subjectRole/subjectParty 매핑 (case data evidence.subjectParty와 정합)

---

## Part 2: 콘텐츠 자동 검출 (100 tasks)

### 2.1 잘못 패턴 #6 (30 tasks)
- **명사형 어색**: `(\S+)\s+돌봄|지원|처리|회피|은폐` (단 동사 결합형은 false positive)
- **약한 단어 "쪽"**: 재판관 발언만 검출 (NPC voice 보존 영역 제외)
- **번역체 9패턴**: "된 것으로 생각", "측면이 있", "부득이하게", "미리 말씀드리지 못한", "특정 X", "을 통하여", "에 대해서", "만을"
- **사용자 모범 4 patch 잔존 잘못**:
  - "쪽이었는데" / "쪽으로 말씀하셨" → 보정 안 됨 → 검출
  - "무엇을 알고" / "무엇을 보고" → 보정 안 됨
  - "흐리면" / "흐릴 수 없"
  - "{X} 돌봄/지원" 명사형

### 2.2 깨진 조사 / 자동 보정 artifact (10 tasks)
- "것는", "것를", "것와", "것였", "것로"
- "X을를", "X을은", "X은가"
- "X 것로" 조사 오류 (Codex P0 사례)
- "있었고를", "단순한을" 류 합성 깨짐

### 2.3 기계적 관찰문 / 직접 인용 결합 (10 tasks)
- "태도에 변화가 감지됩니다", "내용이 확인됩니다", "흐름이 나타납니다"
- "변화가 감지됩니다", "동요가 보입니다"
- 직접 인용 + 시스템 관찰 결합: `'[^']{2,}'.*라고\s*하셨`
- "{prev}라고 하셨는데, {curr}라고 하시네요" 패턴

### 2.4 호칭 / 어법 위반 (10 tasks)
- 재판관 → 당사자 "OOO 씨" (절대 "제 아내/남편" X)
- 재판관 → 증인 실명 (절대 "증인 씨" / "증언자" X)
- 합니다체 위반 (재판관 발언 종결)
- "부인" 동사 (사용자 권장: "부정"으로 교체)

### 2.5 Truth Throttle 위반 (S0~S2에서 핵심 lexeme 노출) (20 tasks)
- spouse-01 S0~S2: "3,000만원", "위임장", "박미라", "투자 사기"
- family-01 S0~S2: 비율 "60", "40", "90", "출생 비밀", "일기장", "20년"
- friend-01 S0~S2: "9일", "6번", "11번", "아버지 돈", "사기"
- (단 재판관/시스템 메시지 제외)

### 2.6 사건 설정 충돌 검출 (20 tasks)
- **family-01 비율 반대 패턴** (이전 GPT 잘못):
  - "형 60, 제 40" / "제가 60, 동생 40" / "90을 40으로"
  - 정확: A 40 / B 60 (B가 자기 몫 90→60 줄임)
- **다른 사건 인물 혼입**:
  - spouse-01에 "윤태성/윤정후/송다은/최수민/최복순/김세라" 등장 X
  - family-01에 "박지연/이준호/송다은/최수민/박미라" 등장 X
  - friend-01에 "박지연/이준호/윤태성/윤정후/박미라/최복순" 등장 X
- **대상 사건 핵심 fact 정합** (사건 메모와 일치)
  - spouse: 5,000만원 증발 (3,000 적금 + 2,000 사기)
  - family: B 90→60 (A 40 / B 60), 출생 비밀
  - friend: 예비신랑 선 넘은 메시지 / A 아버지 돈 갈취

---

## Part 3: 채널간 일관성 + 코드 레벨 (100 tasks)

### 3.1 채널간 의미 일관성 (40 tasks)
- **interrogation ↔ contradiction_pursuit**: 같은 (party, disputeId)에서 lieState 진행 자연스러운지
- **dossier ↔ judge_evidence_combo**: dossier 카드 unlock 시 evidence_combo cells 매핑 정확 (두 증거 함의가 본문에 녹음)
- **judge_question ↔ judge_contradiction**: 같은 disputeId에서 질문 → 모순 추궁 흐름 자연스러운지
- **신규 stage cells (S2/S3) ↔ base 42 cells**: subjectParty/Role 매핑 일관
- **interrogation ↔ evidence_present**: 같은 (party, disputeId, lieState)에서 톤 차이 자연스러운지
- **trust_action ↔ aftermath**: trust 단계 → 결과 narrative 일관
- **mediation ↔ contradict_milestone**: 양측 균형 / 단계별 차별

### 3.2 사건간 일관성 (20 tasks)
- 채널 카운트 매트릭스 (3 사건 비교)
- 동일 채널의 톤 가이드 적용도
- 신규 4 채널 (judge_evidence_combo / judge_witness_summon / rapport_milestone / contradict_milestone) 사건간 카운트 차이 (사건별 dossier 카드 수 차이 반영)

### 3.3 코드 레벨 fallback 표현 검사 (40 tasks) ★
**이번 "증인 씨" 버그 같은 추가 발굴**:
- `src/hooks/useActionDispatch.ts` — `${npcName} 씨` 류 fallback ('증인', '당사자', '대상')
- `src/engine/llmDialogueResolver.ts` / `llmFreeQuestion.ts` — 변수 fallback
- `src/engine/judgeQuestionEngine.ts` — 동적 질문 템플릿
- `src/components/` — UI 텍스트 fallback ('이름 없음', '미상' 등)
- 정규식: `\s*\?\s*['"][^'"]*['"]` 형식 fallback 검출
- ScriptedText에 "${...}" 같은 미치환 변수 잔존 검사

---

## 사건별 핵심 설정 (절대 충돌 금지)

(자세한 내용은 `gpt-pro-runs/script-redo-20260426/source/04-story-v2-3cases.md` 참조)

### spouse-01 — "새벽 통화기록"
- A 박지연 (학원 데스크) — victim_cosplay
- B 이준호 (가전매장) — avoidant
- 5,000만원 증발 / 형 빚 / 조카 돌봄 / 시댁 갈등 / 위임장 / 투자 사기
- 증인: w-1 오피스텔 경비 / w-2 은행 직원 / w-3 박미라

### family-01 — "치매 어머니의 유서" ⚠️
- A 윤태성 (공장 대표) — confrontational
- B 윤정후 (자동차부품) — affect_flattening
- **유서 비율 A 40 / B 60** (B가 자기 몫 90→60 줄임). 절대 반대 X.
- 출생 비밀 / 20년 지원 / 어머니 일기장
- 증인: w-1 최복순 / w-2 김영수 / w-3 박순애

### friend-01 — "손절한 절친"
- A 송다은 (온라인 쇼핑몰 CS) — premature_summary
- B 최수민 (필라테스 강사) — affect_flattening
- 예비신랑 선 넘은 메시지 / A 아버지 돈 갈취 / 같은 패턴 반복
- 증인: w-1 김세라 / w-2 박준혁 / w-3 오미경

---

## 출력 포맷

### 산출물 1: `tmp/qa-redo-20260426/QA-Q-codex-report.json`

```json
{
  "meta": {
    "generatedAt": "2026-04-26T...",
    "totalTasks": 300,
    "activeCases": ["spouse-01", "family-01", "friend-01"],
    "scope": "ScriptedText 14931 variants + case data + 코드 fallback"
  },
  "part1_schema": {
    "totalTasks": 100,
    "passed": N, "failed": M,
    "schemaIssues": [/* JSON 스키마 위반 */],
    "countIssues": [/* 카운트 정합성 위반 */],
    "dimensionIssues": [/* dimensionMatrix 위반 */]
  },
  "part2_content": {
    "totalTasks": 100,
    "patternHits": {
      "noun_action": N,
      "weak_쪽": N,
      "trans_style": N,
      "user_pattern_1_쪽이었": N,
      "user_pattern_2_무엇을_알고": N,
      "user_pattern_3_흐리면": N,
      "user_pattern_4_명사형": N,
      "broken_particle": N,
      "mechanical_observ": N,
      "direct_quote_combo": N,
      "judge_call_violation": N,
      "witness_title_violation": N,
      "honor_buin": N,
      "haeyo_violation": N,
      "truth_throttle_violation": N,
      "case_setting_conflict": N,
      "other_case_name_intrusion": N
    },
    "samples": [/* 패턴별 5건 sample */]
  },
  "part3_consistency": {
    "totalTasks": 100,
    "channelConsistency": [/* 채널간 불일치 */],
    "caseComparison": [/* 사건간 비교 */],
    "codeFallbacks": [/* 코드 레벨 fallback 발견 */]
  },
  "p0Patches": [/* 즉시 수정 필요 — 사건 설정 충돌 / null text / 호칭 위반 / 코드 fallback */],
  "p1Patches": [/* Truth Throttle / 잘못 패턴 #6 / 변수 치환 / 깨진 조사 */],
  "p2Patches": [/* 표현 다양성 부족 / archetype voice 약함 */]
}
```

### 산출물 2: `tmp/qa-redo-20260426/QA-Q-codex-summary.md`
- 핵심 통계 + 차트
- P0/P1/P2 분류 + 추천 액션
- 사건별 비교 매트릭스
- 코드 레벨 발굴 항목

### 산출물 3: `tmp/qa-redo-20260426/QA-Q-codex-audit.cjs`
- 재현 가능한 audit 스크립트

---

## 잘못 패턴 #1~#8 (절대 회피)

QA 자체에도 적용:
1. 데이터 직접 read 검증 (sample 확인 X 결과 무비판 보고 X)
2. 임의 정보 보고 X
3. 다른 사건 정보 혼입 X (검출 시 P0)
4. 신규 작성 X — 검출만
5. 사용자 detail 메시지 = 항상 보완 방향
6. **9차원 맥락-의미 정확성 검토**
7. 단순 확인은 짧게
8. **사건 설정 일치 검증** (P0 우선)

## 메모리 참조
- `gpt-pro-runs/script-redo-20260426/source/04-story-v2-3cases.md` — 사건 설정
- `gpt-pro-runs/script-redo-20260426/source/05-user-pattern-correction.md` — 사용자 모범 patch 4
- `gpt-pro-runs/script-redo-20260426/source/06-korean-quality-rules.md` — 한국어 품질 규칙
- `gpt-pro-runs/script-redo-20260426/source/07-mistake-patterns.md` — 잘못 패턴 #1~#8
- `CLAUDE.md` — 전체 가이드
