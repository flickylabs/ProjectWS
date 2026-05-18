# Codex Thread β9 — LQA Phase 2 / friend-01 / Chinese (Simplified) (zh-CN)

작성일: 2026-05-19 (자동 생성)
상위 문서: [translation-lqa-phase/execution-plan-v2.md](../execution-plan-v2.md) §4
오케스트레이션: [translation-lqa-phase/orchestration.md](../orchestration.md)
주체: Codex thread β9 (병렬 10 thread 중 하나)

---

## §0. 진입 조건 (절대 준수)

| 항목 | 조건 |
|---|---|
| **shared worktree 안전 규칙** | 본 thread는 read-only on `src/`. **어떤 `src/` 파일도 수정 금지.** 출력은 오직 `docs/design/translation-lqa-phase/reports/friend-01_zh-CN.csv` 1개 파일. |
| 작업 시작 전 | `git status --short` 실행해 작업 디렉토리 상태 기록 |
| LQA 도구 v2 사용 가능 | `scripts/verify-translations.cjs` v2 (Phase 0 산출) + `scripts/detect-truth-leak.cjs` 둘 다 존재 + 정상 동작 (없으면 stop) |
| KO baseline 사인오프 | `docs/design/translation-lqa-phase/ko-baseline-signoff.md` 존재 (Phase 1 완료) |
| glossary | `docs/localization/non-dialogue-extract/GPT_Result/glossary_locked.csv` 존재 |
| 다른 thread와 충돌 | 다른 thread의 출력 CSV (`reports/*.csv`) 절대 수정 금지 |

진입 시 위 항목 누락 발견하면 즉시 중단하고 메인 세션에 알림.

---

## §1. 작업 범위

### 1.1. 대상 (case, lang) 쌍
- **케이스**: `friend-01`
- **언어**: `Chinese (Simplified)` (`zh-CN`)
- **출력 단일 파일**: `docs/design/translation-lqa-phase/reports/friend-01_zh-CN.csv`

### 1.2. 검수 대상 source 파일 (READ-ONLY)

KO baseline (비교 기준):
- `src/data/cases/generated/friend-01.json`
- `src/data/scriptedAngles/friend-01_angle_catalog.json`
- `src/data/scriptedAngles/friend-01_judge_questions.json`
- `src/data/scriptedText/friend-01.json`

Chinese (Simplified) 검수 대상:
- `src/data/cases/generated/friend-01.zh-CN.json`
- `src/data/dialogues/mediation/friend-v3-01.zh-CN.json`
- `src/data/dialogues/phase1/friend-01.zh-CN.json`
- `src/data/scriptedAngles/friend-01_angle_catalog.zh-CN.json`
- `src/data/scriptedAngles/friend-01_judge_questions.zh-CN.json`
- `src/data/scriptedText/friend-01.zh-CN.json`

### 1.3. 카테고리별 표본 사이즈

| Category | 표본 방법 | 추정 cell |
|---|---|---|
| case_surface_content | 10% 무작위 + 위배 의심(Phase 0 검출) 100% | ~200 sampled |
| judge_question_script | stratified 15% 무작위 + 100% truth-leak 키워드 + 100% meta-question 검출 (v[0]·v[last] 우선) | ~600-800 sampled |
| non_party_scripted_text | 10% 무작위 + 의심 100% | ~300 sampled |
| question_angle_catalog | 20% 무작위 | ~80 sampled |
| witness_testimony | 20% 무작위 + 의심 100% | ~150 sampled |


표본 추출 시 seed = `friend-01-zh-CN-2026-05-19` 사용 (재현성). `node -e "..."` 로 randomization 시 `Math.seedrandom` 또는 hash 기반 stratification.

---

## §2. 검수 차원 (각 행에서 6가지)

| ID | 차원 | 기준 | 위배 시 severity |
|---|---|---|---|
| D1 | **자연성** | 모국어(Chinese (Simplified)) 화자 입장에서 어색하지 않음. 직역/번역체 회피. | 어색 = P2, 명백한 번역체 = P1 |
| D2 | **의미 보존** | KO 원문의 의미·nuance 정확. paraphrase 허용 단, lieState/archetype/tone 9차원 손실 0. | 의미 뒤바뀜 = P0, nuance 손실 = P1 |
| D3 | **톤 일관** | 같은 NPC/카테고리 내 발화 톤 통일. 재판관 발화는 정중·중립·추궁 유지. | 톤 어긋남 = P1 |
| D4 | **문화 컨텍스트** | 한국식 표현이 Chinese (Simplified) 자연 표현으로 치환됨. | 부자연 = P2 |
| D5 | **진실 누설** | `detect-truth-leak.cjs` 매트릭스 통과. NPC 자백 전 진실 콘텐츠 직접 언급 0. | 누설 = **P0** (zero tolerance) |
| D6 | **인명/용어 일관** | glossary 준수. 인명 표기 분기 0. | 분기 = P1 |

### 2.1. zh-CN-specific 추가 검출 패턴

- 한국어식 어순 (X的Y是, X与Y之间的Z, 对X的Y来说) 회피
- 简化字 통일 (繁體字 잔류 0)
- 호칭 "先生" / "女士" 일관

---

## §3. CSV 출력 스키마

`docs/design/translation-lqa-phase/reports/friend-01_zh-CN.csv` 파일 형식:

```csv
row_id,source_ko,target_text,category,issue_dim,severity,option_a,option_b,recommendation,confidence,notes
spouse-01-q97-v0,"이준호 씨, 가족 사정과 자금 이동...","李俊浩先生，请按时间顺序说明关于隐瞒...",judge_question_script,D2,P1,"options text a","options text b",a,0.85,"uniform template — 변이성 손실"
```

### 컬럼 정의

- `row_id`: 안정적 ID (case-노드-인덱스-variant 형태). 예: `spouse-01-q97-v0`, `family-01-aftermath-protective_v3`, `ui-pc.home.tagline`
- `source_ko`: KO 원본 문자열 (snippet 그대로, 50자 이상은 ... 생략 X — 전체 포함)
- `target_text`: 검수 대상 Chinese (Simplified) 문자열
- `category`: ui_i18n_message / case_surface_content / judge_question_script / non_party_scripted_text / question_angle_catalog / witness_testimony
- `issue_dim`: D1~D6 (위 §2 차원)
- `severity`: P0 / P1 / P2
- `option_a`: 정정 후보 A (Chinese (Simplified), 권장안)
- `option_b`: 정정 후보 B (Chinese (Simplified), 대안 — 미확신 시 빈칸)
- `recommendation`: `a` / `b` / `keep` (정정 불요)
- `confidence`: 0.0~1.0 (Codex 자체 평가)
- `notes`: 자유 (KO와 의미 비교 / glossary 참조 / etc.)

P0/P1/P2 명확 행만 포함. 무문제 행은 CSV에 추가 X (volume 보호).

---

## §4. 합격 기준 (thread 종료 게이트)

| 메트릭 | 합격 |
|---|---|
| CSV 생성 + 컬럼 형식 일치 | ✓ |
| 표본 추출 완료 (§1.3 사이즈 충족) | ✓ |
| P0 발견 시 메인 세션 즉시 알림 (작업 중단 X, 계속 진행) | ✓ |
| 종료 시 `git status --short`로 src/ 변경 0건 확인 | ✓ |
| docs/design/translation-lqa-phase/reports/friend-01_zh-CN.csv 외 다른 파일 staged/modified 0건 | ✓ |

---

## §5. 종료 시 작업

1. CSV 마무리 (`docs/design/translation-lqa-phase/reports/friend-01_zh-CN.csv` 저장)
2. `git status --short` 실행 → 출력 확인
3. `git add docs/design/translation-lqa-phase/reports/friend-01_zh-CN.csv` (다른 파일 add 금지)
4. commit 메시지:
   ```
   LQA Phase 2 / friend-01 / zh-CN — <thread 종료 시 채울 것: P0/P1/P2 카운트 + hot category>
   
   Thread β9, <thread 종료 시 채울 것> issues found (<채울 것> P0, <채울 것> P1, <채울 것> P2).
   No src/ changes.
   
   Co-Authored-By: Codex
   ```
5. 메인 세션에 종료 알림 (요약: P0/P1/P2 카운트, 주목할 hot category)

---

## §6. 비-범위 (절대 금지)

이 thread는 다음을 하지 않는다:

- ❌ `src/` 어떤 파일도 수정 (정정 적용은 Phase 4)
- ❌ 다른 thread의 CSV 수정
- ❌ glossary 변경
- ❌ KO baseline 변경
- ❌ 빌드/타입체크 실행 (read-only 작업)
- ❌ 새 directory 생성
- ❌ commit에 src/ 또는 다른 thread 파일 포함
- ❌ origin/main push
- ❌ KO 원본 의미 임의 재해석 (검수만, 정정 옵션은 KO 의미 충실 보존)

---

## §7. 참조

### 7.1. 메모리 컨텍스트 (Codex 사전 읽기 권장)
- [feedback_truth_leak_prohibition](../../../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/feedback_truth_leak_prohibition.md) — 잘못 패턴 #9
- [feedback_natural_korean_vs_translationese](../../../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/feedback_natural_korean_vs_translationese.md) — 자연 한국어 정책 (외국어에도 동일 원칙)
- [feedback_revision_meaning_over_form](../../../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/feedback_revision_meaning_over_form.md) — 9차원 의미 정확성
- [feedback_translation_pipeline_placeholder_leak](../../../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/feedback_translation_pipeline_placeholder_leak.md) — placeholder fallback 패턴

### 7.2. 도구
- `scripts/verify-translations.cjs` v2 — 자동 검출 (실행은 메인 세션이 통합 단계에서)
- `scripts/detect-truth-leak.cjs` — 누설 매트릭스 (D5 차원 자동 검증 보조 가능)
- `docs/localization/non-dialogue-extract/GPT_Result/glossary_locked.csv` — 용어집

### 7.3. 다른 thread와의 cross-reference
- 본 thread는 단일 (case, lang) 쌍만 검수
- 동일 case 다른 lang thread 결과는 종료 후 메인 세션이 cross-lang 일관성 통합 검증
- 발견한 P0 패턴이 다른 case에도 적용될 가능성 있으면 `notes` 컬럼에 명시 ("h-d4 박지연 placeholder 패턴과 유사 — friend-01에도 확인 권장")

---

## §8. 예상 소요

- 표본 검수: cell당 평균 3~5초 (LLM 보조 시) → 5,000~7,000 cell × 5초 = 약 7~10시간
- 1.5~2일 wall-clock (LLM rate limit + 휴식 포함)

---

**메인 세션 협의 채널**: 본 thread는 메인 세션에 다음 상황에서 즉시 알림:
- P0 발견 (실시간)
- src/ 변경 의도치 않게 발생 (즉시 중단)
- KO baseline에서 새 issue 발견 (Phase 1 재진입 필요할 수 있음)
- glossary 위배 발견 (glossary 업데이트 의사결정 필요)
