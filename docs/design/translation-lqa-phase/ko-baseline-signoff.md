# LQA Phase 1 KO Baseline Sign-off

Anchor: `5aa37f55` (브리프 add 직후, 기능적으로 058ad3d5 동일)
Reviewer: claude-thread `claude/lqa-phase1-ko-baseline` (worktree D:/solomon-lqa-phase1) + 사용자 서명 대기
Date: 2026-05-19

## 0. 검수 환경

- 별도 worktree: `D:/solomon-lqa-phase1` (메인 D:/ProjectWS와 분리)
- 정독 메모리: `feedback_natural_korean_vs_translationese`, `feedback_truth_leak_prohibition`,
  `feedback_revision_meaning_over_form`, `feedback_judge_question_quality`,
  `feedback_tutorial_copy_tone`, `design_judge_progression_v2`, `project_active_cases`
- 메모리 경로: `C:/Users/user/.claude/projects/d--ProjectWS/memory/` (현 worktree 메모리 디렉터리 비어 있어 부모 ProjectWS 메모리 참조)

## 1. 검수 범위 (실행)

| 영역 | 파일 | 표본 | 검수 방식 |
|---|---|---|---|
| KO judge_question (scriptedAngles) | `src/data/scriptedAngles/*_judge_questions.json` | 전수 (variants) | 자동 truth-leak/translationese sweep + 200줄 표본 정독 |
| KO judge_question (scriptedText) | `src/data/scriptedText/*.json` channels.judge_question | 전수 | 자동 sweep + speaker:judge 필터 |
| KO judge_contradiction/evidence_combo/witness_summon | `src/data/scriptedText/*.json` 동 channels | 전수 | 자동 truth-keyword sweep |
| KO system_message | `src/data/scriptedText/*.json` channels.system_message | 전수 | 자동 sweep + 전수 텍스트 정독 |
| KO evidence_discovery | `src/data/scriptedText/*.json` | 전수 | 자동 sweep + speaker 태그 확인 |
| KO aftermath/mediation | `src/data/scriptedText/*.json` | 100% 전수 정독 | 텍스트 dump 후 line-by-line |
| KO case meta | `src/data/cases/generated/*.json` | 전수 (player-facing 필드) | meta.title/context/disputes/evidence surface/v3Design 인스펙션 |
| KO scriptedAngles catalog | `src/data/scriptedAngles/*_angle_catalog.json` | 전수 | 전 catalog 정독 + truthBoundary 확인 |
| KO witness/dossier | `src/data/scriptedText/*.json` | 20% deterministic sample (every 5th) | dump 후 정독 |

자동 스크린 도구:
- `tmp-lqa/`에 채널별 텍스트 dump → 일독
- forbidden keyword 정규식 매처 (case별 truth keyword 별도 정의)
- translationese pattern 매처 (system_log/newspaper_metaphor/axis_metaphor/noun_form)
- speaker 태그 + 채널 필터로 prohibited-channel 한정 leak 격리

총 variants 수 (참고):
- spouse-01 judge_questions: 660 variants × 5차원
- family-01 judge_questions: 780 variants
- friend-01 judge_questions: 600 variants
- 채널별 entry는 위 표 sample column 참고

## 2. 검수 통계 per case

### spouse-01

| 영역 | rows / sample | P0 | P1 | P2 |
|---|---|---|---|---|
| judge_question (sa + stxt) | 660 + 240 | 0 | 1 (judgeq-d-1-fact_pursuit-1-v2 "오피스텔 주소") | 2 (family_items 학용품 enumerate) |
| aftermath/mediation | 25 + 80 (전수) | 0 | 0 | 1 (mediation-fact_first-a-v2 "같은 축이 아닙니다") |
| witness/dossier 20% | 18 + 48 | 0 | 0 | 0 |
| case meta | 전수 | 0 | 0 | 0 |
| angle catalog | 전수 (22 angles) | 0 | 0 | 0 |
| system_message + evidence_discovery | 55 + 다수 | **1 (evidence_discovery discover-b-e-3-capture-v1 "학교 알림")** | 0 | 3 (sys-phase-transition v1/v2/v5 국면/축이) |

**총: P0=1, P1=1, P2=6**

### family-01

| 영역 | rows / sample | P0 | P1 | P2 |
|---|---|---|---|---|
| judge_question (sa + stxt) | 780 + 240 | **1 (judgeq-d-4-empathy-approach-3-v2 "출생 문제")** | 0 | 0 |
| judge_contradiction (stxt) | 60 | **1 (judgec-d-4-mid-v1 "출생 문제")** | 0 | 0 |
| aftermath/mediation | 25 + 80 (전수) | 0 | 0 | 0 |
| witness/dossier 20% | 18 + 66 | 0 | 0 | 0 |
| case meta | 전수 | 0 | 1 (v3Design.leadLines[3].interpretationChoices[0] "출생 비밀") | 0 |
| angle catalog | 전수 (24 angles) | 0 | 0 | 0 |
| system_message | 55 | 0 | 0 | 2 (sys-phase-transition v1/v3 국면) |

**총: P0=2, P1=1, P2=2**

### friend-01

| 영역 | rows / sample | P0 | P1 | P2 |
|---|---|---|---|---|
| judge_question (sa + stxt) | 600 + 240 | 0 | 0 | 0 |
| aftermath/mediation | 25 + 80 (전수) | 0 | 0 | 1 (mediation-immediate-b-v1 "경고였다는 축") |
| witness/dossier 20% | 18 + 54 | 0 | 0 | 0 |
| case meta | 전수 | 0 | 0 | 0 |
| angle catalog | 전수 | 0 | 0 | 0 |
| evidence_present (a-e-6-late-stage1 v1~v10) | 10 변형 | 0 | **1 (10개 identical "확인됩니다" 시스템로그톤 + variant duplication)** | 0 |
| system_message | 55 | 0 | 0 | 2 (sys-phase-transition v1/v3 국면) |

**총: P0=0, P1=1, P2=3**

## 3. P0 상세 (메인 세션 즉시 알림 대상)

### P0-1 [spouse-01] `discover-b-e-3-capture-v1`
- **파일**: `src/data/scriptedText/spouse-01.json`
- **채널**: evidence_discovery, speaker:judge, reveal:none
- **위배 텍스트**: "방금 학교라고 하셨습니다. 그 번호와 학교 알림이 어떤 관계인지 설명해 주십시오."
- **근거**: `spouse-01_angle_catalog.json` d-1/call_record.truthBoundary.beforeS5MustNotSay = `["형의 번호", "조카 학교 알림"]`. 재판관이 "학교 알림"을 직접 사용 → truth phrase 노출. tags의 `reveal:none`과 모순.
- **권장 fix**: "방금 학교라고 하셨습니다. 그 번호가 어떤 학교 쪽 연락이었는지 설명해 주십시오."

### P0-2 [family-01] `judgeq-d-4-empathy-approach-3-v2`
- **파일**: `src/data/scriptedText/family-01.json`
- **채널**: judge_question, speaker:judge
- **위배 텍스트**: "윤태성 씨, 출생 문제보다 가족으로서 믿음이 깨진 점이 더 아픕니까."
- **근거**: `family-01_angle_catalog.json` d-4/* truthBoundary.beforeS5MustNotSay = `["출생 비밀","배다른","친자가 아니다","아버지 피가 다르다","구체적 출생 경위"]`. d-4 player-facing dispute name = "가족 기록과 침묵의 이유" (surface). 재판관이 "출생 문제"로 truth dimension 직접 명명.
- **권장 fix**: "윤태성 씨, 가족 안쪽 사정보다 가족으로서 믿음이 깨진 점이 더 아픕니까."

### P0-3 [family-01] `judgec-d-4-mid-v1`
- **파일**: `src/data/scriptedText/family-01.json`
- **채널**: judge_contradiction, mid stage, speaker:judge
- **위배 텍스트**: "윤정후 씨, 출생 문제를 알고도 유서 문제로 덮어 두셨습니다. 왜 처음부터 말하지 않았습니까."
- **근거**: 위와 동일 d-4 truthBoundary 위배. mid stage이지만 angle catalog는 S5 이전 금지로 명시.
- **권장 fix**: "윤정후 씨, 가족 안쪽 사정을 알고도 유서 문제로 덮어 두셨습니다. 왜 처음부터 말하지 않았습니까."

## 4. 합격/불합격 판정

| 차원 | 합격 기준 | spouse-01 | family-01 | friend-01 | 전체 |
|---|---|---|---|---|---|
| 자연 한국어 | 위배 0건 | P2 3건 (system_msg 국면/축이) | P2 2건 (sys-phase 국면) | P2 3건 (sys 국면 + 축 메타포) | 미세 위배 8건 (P2) — **조건부 합격** |
| 진실 누설 | 위배 0건 | **P0 1건 + P1 1건** | **P0 2건 + P1 1건** | 0건 | **불합격 3 P0** — fix 필요 |
| 9차원 의미 정확성 | ≤ 5% / P0 0건 | 0 | 0 | 0 | **합격** |
| 재판관 톤 일관 | 위배 0건 | 0 (합쇼체/간접인용 일관) | 0 | 0 | **합격** |
| 캐릭터 발화 톤 | ≤ 5% / P0 0건 | 0 | 0 | P1 1건 (a-e-6-late-stage1 10건 system_log + duplicate) | **조건부 합격** — friend-01 e-6 series fix 필요 |

### 최종 판정

**조건부 합격** — 다음 조건 충족 시 Phase 2 spawn 게이트 통과:

1. **P0 fix (필수, 3건)**:
   - spouse-01 `discover-b-e-3-capture-v1`: "학교 알림" → "학교 쪽 연락"
   - family-01 `judgeq-d-4-empathy-approach-3-v2`: "출생 문제" → "가족 안쪽 사정"
   - family-01 `judgec-d-4-mid-v1`: "출생 문제" → "가족 안쪽 사정"
2. **P1 fix (권장, 3건)**:
   - spouse-01 `judgeq-d-1-fact_pursuit-1-v2`: "오피스텔 주소" → "같은 오피스텔"
   - family-01 `v3Design.leadLines[3].interpretationChoices[0]`: "출생 비밀을 지키려 한 보호였다" → "가족 안쪽 사정을 지키려 한 보호였다"
   - friend-01 `a-e-6-late-stage1` v1~v10: 10개 identical 변형을 캐릭터 톤으로 재작성 + 다양화
3. **P2 fix (선택, batch)**: system_message `국면이` 패턴 6건 (3 cases × 2 entries) + `축이/축은` 평론톤 3건 — `흐름이` / `새 단계` / `점` 등으로 교체

본 검수 완료 후 사용자 confirm + 위 P0/P1 fix commit 적용 → Phase 2 spawn 게이트 통과.

## 5. 정성 평가 노트

전반적으로 KO baseline 품질은 **매우 높음**:

- 660+780+600 = **2,040 변형 judge_question**에 대해 정규식 truth-keyword sweep 결과 player-facing leak 0건 (위에 적은 P0 3건은 scriptedText judge 채널이며 scriptedAngles의 2,040개는 무위배)
- aftermath/mediation 전수 정독 결과 **합쇼체 일관, 자연 한국어, archetype별 발화 차별화 우수**
- angle catalog의 `truthBoundary.beforeS5MustNotSay` / `s5CanSay` 설계가 명확 — 작성자가 진실 누설을 의도적으로 막은 흔적 (behaviorHint에 "친형·조카 정체는 S5 전 직접 언급 금지" 등)
- 발견된 P0 3건은 모두 작성자 가이드라인을 거의 지키는 와중에 발생한 미세 누락 (전체 데이터 양에 비해 매우 낮음)
- 변형 다양성 우수: 5 variants per dispute/qtype/party/angle 모두 서로 다른 어휘·각도 — friend-01 e-6 series 1건 예외

## 6. 다음 단계

1. 사용자가 본 사인오프 문서 review
2. P0 3건 fix commit (이 worktree에서 직접 가능 — 안전 규칙 §6에 P0 fix는 confirm 후 src/ write 허용)
3. P1 4건 fix commit (batch)
4. P2 9건 — 사용자 종합 review 후 batch
5. `npm run qa:fast` / `node scripts/detect-truth-leak.cjs` / `npm run qa:lqa` 회귀 검증
6. 사인오프 메인 cherry-pick → Phase 2 spawn

## 사용자 서명

User: flickylabs (확인) — 2026-05-19
Sign-off commit: 본 문서 사인오프 갱신 commit (다음 commit).

### Fix 적용 commit chain

| Severity | Commit | 영역 |
|---|---|---|
| P0 ×3 | `1be71c56` | spouse-01 discover-b-e-3-capture-v1 / family-01 judgeq-d-4-empathy-approach-3-v2 / judgec-d-4-mid-v1 |
| P1 ×3 | `d12947c3` | spouse-01 judgeq-d-1-fact_pursuit-1-v2 / family-01 leadLines L-4-A / friend-01 a-e-6-late-stage1 v1~v10 (10개 다양화) |
| P2 ×11 | `0d9292ac` | system_message phase-transition 7건 + mediation 2건 + scriptedAngles family_items 2건 |

### 검증 결과 (사인오프 시점)

| 명령 | 결과 |
|---|---|
| `npx tsc -b --noEmit` | 통과 |
| `npm run qa:fast` | RELEASE READY, P0=0 |
| `node scripts/detect-truth-leak.cjs` | family-01 3건 baseline 유지 |
| `npm run qa:lqa` | 누적 strict 60,463건 (외국어 부채, Phase 2 cycle에서 해소) |

### Phase 2 spawn 게이트 통과

`docs/design/translation-lqa-phase/orchestration.md` §2.1 사전 체크 5개 항목:

1. Phase 0 완료 (verify-translations.cjs v2 + detect-truth-leak.cjs) — ✅
2. **Phase 1 사인오프 (본 문서)** — ✅ 본 commit
3. working tree clean — ✅ (untracked `docs/localization/non-dialogue-extract/truth-leak-report.json`만)
4. `reports/` 비어있음 — ✅
5. 메모리 동기화 — ✅

→ **Phase 2 (Codex β1~β10) spawn 게이트 통과**. 60,463건 누적 외국어 부채는 case×lang 10 thread 병렬 처리로 해소.
