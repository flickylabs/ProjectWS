# QA Thread A 의뢰 — 일반 QA (Codex)

## 작업 목표
**3 사건 통합본 (spouse-01 / family-01 / friend-01)에 대한 일반 QA**.
기술/형식/카운트/구조 정합성 + 통계 분석 + 자동 검출.

## 대상 파일 (3 사건)

| 사건 | ScriptedText | Case Data | 메모 |
|---|---|---|---|
| spouse-01 | `src/data/scriptedText/spouse-01.json` | `src/data/cases/generated/spouse-01.json` | 4,677v / 18ch + P0 22 patch + 메인 13 patch + QA 9 patch |
| family-01 | `src/data/scriptedText/family-01.json` | `src/data/cases/generated/family-01.json` | 5,172v / 18ch (1차 통합) |
| friend-01 | `src/data/scriptedText/friend-01.json` | `src/data/cases/generated/friend-01.json` | 5,082v / 18ch (1차 통합) |

추가 데이터:
- `src/data/claimPolicies/{caseId}-v2-atoms.json`
- `src/data/claimPolicies/{caseId}-structure-v2.json`
- `src/data/claimPolicies/{caseId}-game-events-v2.json`
- `src/data/claimPolicies/{caseId}-dossier-cards.json`

## QA 항목 (200회 task)

### Part 1: 형식/카운트 검증 (50 tasks)

1. **JSON 스키마 정합성**
   - 18 channels 모두 존재
   - 각 channel.entries 구조 유효
   - variant {id, text, behaviorHint, tags[], sourceRefs[]} 구조 유효

2. **카운트 정합성**
   - 채널별 cells × variants 곱 정확
   - tags 누락 0
   - variant id 형식 일관 (`{party}-{disputeId}-{lieState}-{questionType}-v{n}` 등)
   - sourceRefs missing 0

3. **dimensionMatrix 검증**
   - interrogation: party × disputeId × lieState × questionType
   - evidence_present: party × evidenceId × lieBand × (subjectRole | stage | action)
   - dossier: question_id × lieBand
   - 누락된 cell 0

4. **신규 4 채널** (judge_evidence_combo / judge_witness_summon / rapport_milestone / contradict_milestone)
   - 각 사건의 신규 채널 수 일관
   - dossier 카드 수와 evidence_combo cells 매핑 정확

### Part 2: 콘텐츠 자동 검출 (100 tasks)

#### 잘못 패턴 #6 검출
1. 명사형 어색 — `(\S+)\s+돌봄|지원|처리|회피|은폐` 패턴
2. 약한 단어 "쪽" — `쪽이었|쪽인|쪽은|쪽으로의`
3. 번역체 9패턴 — "된 것으로 생각", "측면이 있", "부득이하게" 등
4. 기계적 관찰문 — "태도에 변화가 감지", "내용이 확인됩니다"
5. 시스템 관찰 + 직접 인용 결합 — `'[^']{2,}'.*라고 하셨`
6. 부인 동사 (부정으로 교체 권장) — `\b부인\b`
7. 깨진 조사 — "것는", "것를", "것와", "것였", "것로"

#### Truth Throttle 위반
- S0~S2에서 사건 핵심 사실(금액/이름/시각) 노출
- 사건별:
  - spouse: "3,000만원", "위임장", "박미라" S0~S2 노출 X
  - family: "60", "40", "90", "출생 비밀", "일기장" S0~S2 노출 X
  - friend: "9일", "6번", "11번", "아버지 돈", "사기" S0~S2 노출 X

#### 호칭 위반
- 재판관 → "제 아내/남편" 사용 0 (반드시 "OOO 씨")
- 당사자 → 재판관 호칭 정중

#### 합니다체 위반
- 재판관 발언 모두 합니다체
- 당사자 발언 emotional/confession beat 외 합니다체 (NPC는 반말 가능)

### Part 3: 채널간 일관성 (50 tasks)

1. **interrogation ↔ evidence_present**
   - 같은 (party, disputeId, lieState) 조합에서 톤 차이 자연스러운지
   
2. **dossier ↔ contradiction_pursuit**
   - 같은 dossier 카드 unlock 후 contradiction_pursuit이 일관된 사실 base 사용

3. **judge_question ↔ judge_contradiction**
   - 같은 disputeId에서 질문 → 모순 추궁 흐름 자연스러운지

4. **judge_evidence_combo ↔ dossier**
   - dossier 카드 unlock 시 evidence_combo cells 매핑 정확
   - 두 증거의 함의 본문에 정확히 반영

5. **신규 stage cells (S2/S3) ↔ base 42 cells**
   - subjectParty/subjectRole 매핑 일관
   - lieBand 차원 정합

## 사건 설정 검증 (절대 충돌 금지)

### spouse-01 — "새벽 통화기록"
- 5,000만 원 증발 (3,000 적금 해지 + 2,000 사기 손실)
- 형 빚 / 조카 돌봄 / 시댁 갈등 / 위임장 조작
- A 박지연 (victim_cosplay) / B 이준호 (avoidant)

### family-01 — "치매 어머니의 유서" ⚠️
- 유서 비율: **A 40 / B 60** (B가 자기 몫 90→60 줄임). 절대 반대 X.
- A 윤태성 (confrontational) / B 윤정후 (affect_flattening)
- 출생 비밀 / 20년 지원 / 어머니 일기장

### friend-01 — "손절한 절친"
- 예비신랑 선 넘은 메시지 / A 아버지 돈 갈취 / B 출생 비밀 X
- A 송다은 (premature_summary) / B 최수민 (affect_flattening)

## 출력 포맷

### 산출물 1: `tmp/QA-A-general-report.json`
```json
{
  "meta": {
    "generatedAt": "...",
    "totalTasks": 200,
    "activeCases": ["spouse-01", "family-01", "friend-01"]
  },
  "part1_schema": {
    "totalTasks": 50,
    "passed": N, "failed": M,
    "issues": [/* 카운트/스키마 위반 */]
  },
  "part2_content": {
    "totalTasks": 100,
    "patternHits": {
      "noun_action": N,
      "weak_쪽": N,
      "trans_style": N,
      "mechanical_observ": N,
      "direct_quote_combo": N,
      "honor_부인": N,
      "particle_ending": N,
      "truth_throttle_violation": N,
      "honor_violation": N,
      "register_violation": N
    },
    "samples": [/* 각 패턴 5개 샘플 */]
  },
  "part3_consistency": {
    "totalTasks": 50,
    "issues": [/* 채널간 불일치 */]
  },
  "p0Patches": [/* 명백한 비문/오류 — 즉시 수정 권장 */],
  "p1Patches": [/* 보정 권장 */],
  "p2Patches": [/* 검토 권장 */]
}
```

### 산출물 2: `tmp/QA-A-general-summary.md`
- 핵심 통계
- P0/P1/P2 분류
- 사건별 비교

### 산출물 3: `tmp/QA-A-general-audit.cjs`
- 재현 가능한 audit 스크립트

## 검증 절차

1. 각 task 자동 검출 (정규식 / 통계)
2. 검출 결과 false positive 필터 (패턴별 5건 sample 수동 검증)
3. P0/P1/P2 분류
4. 사건 설정 충돌 우선 P0
5. JSON 형식 위반 P0
6. Truth Throttle 위반 P1
7. 잘못 패턴 #6 P2 (메인 9차원 검토 후 결정)

## 메모리 참조
- `memory/story_v2_confirmed_3cases.md` — 사건 설정
- `memory/feedback_revision_meaning_over_form.md` — 잘못 패턴 #6
- `CLAUDE.md` — 한국어 품질 규칙 / Truth Throttle / 호칭 규칙
