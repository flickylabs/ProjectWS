# LQA 실행 계획 v2 — 출시 품질 게이트

작성일: 2026-05-19
선행 문서: [translation-lqa-phase/master-task.md](master-task.md) (v1 governance/framework)
주체: 메인 세션 + Codex + ClaudeCode 별도 스레드 + (선택) 인간 freelancer
목표 일정: **3~4주**

---

## §0. 진입 조건

| 항목 | 상태 |
|---|---|
| Phase 3 본 번역 적용 완료 (HEAD = 8e6cd0ed) | ✓ |
| spouse-01 h-d4 박지연 placeholder leak Codex 의뢰 (별도) | ⏳ 대기 (적용 후 LQA Phase 2 진입 가능) |
| working tree clean | ⏳ Codex fix commit 완료 시점 |
| 자동 게이트 빌드 (tsc/qa:fast/build/lint) | ✓ 모두 EXIT=0 |

---

## §1. v1 framework와의 차이

v1 master-task.md는 **거버넌스/리소스 프레임**(5 Step + 우선순위 매트릭스). v2는 **실행 사양**:
- 표본 stratification 구체화 (% + 조건 + 합격 기준)
- Step B 산출 CSV 스키마 명시
- truth-leak audit을 Phase 0 verify 통합
- **KO baseline 재검수 Phase 1 추가** (v1은 §1.3에서 KO 제외했으나 사용자 재요청)
- 정량 pass/fail 게이트 6종

---

## §2. Phase 0 — verify-translations v2 강화

**책임**: Codex 1 스레드 / **기간**: 2일

### 2.1. 산출
`scripts/verify-translations.cjs` 확장 + `scripts/detect-truth-leak.cjs` 정식 통합.

### 2.2. 추가 검출 패턴 7종

| ID | 패턴 | 검출 방법 | 합격 기준 |
|---|---|---|---|
| V01 | 영문 직역 명사구 | 사전 30종 (`the X figure`, `X bracket`, `X track`, …) | 위배 0건 |
| V02 | cross-batch 일관성 | 동일 KO 행이 batch별로 다른 EN/JA/ZH 분기 | divergent ≤ 5% |
| V03 | JA 조사 휴리스틱 | が/は/を 단순 패턴 (e.g., 명사+を+명사 nonsense) | 위배 ≤ 10건 (수동 spot) |
| V04 | ZH-CN 한국어식 어순 | "X的Y是", "X与Y之间的Z", "对X的Y来说" | 위배 ≤ 15건 |
| V05 | 인명 표기 분기 | glossary 외 인명 (Park vs Pak vs パク vs パーク) | 0건 (glossary 강제) |
| V06 | 시스템 톤 잔류 | 외국어에 해요체/합쇼체 한글 잔류 | 0건 |
| V07 | **placeholder leak regex** (NEW) | EN: `/what you (hid\|concealed\|decided) (and\|when)/i` / JA: `/何をいつ(隠した\|決めた)/` / ZH: `/你在何时(隐瞒\|决定)了什么/` | 0건 |

### 2.3. truth-leak 통합

기존 `tmp/detect-truth-leak.cjs` → `scripts/detect-truth-leak.cjs`로 승격 + 4언어 키워드 매트릭스 확장:
- 케이스별 surface 키워드 (공개) vs 진실 키워드 (자백 전 노출 금지) 매트릭스
- 4언어 동시 매칭 (KO surface ↔ EN/JA/ZH-CN 등가어)
- 합격 기준: judge_question_script / aftermath / mediation 채널에서 진실 키워드 매칭 0건

### 2.4. 출력 형식
JSON 리포트 (`docs/localization/non-dialogue-extract/verify-report-v2.json`):
```
{
  "summary": { "rows": N, "violations": { V01: x, V02: y, ... } },
  "issues": { V01: [...], ... },
  "truthLeakMatches": [ { lang, file, key, keyword, snippet } ]
}
```

### 2.5. CI 통합
`package.json`에 `qa:lqa` 스크립트 추가 → `verify-translations.cjs --strict && detect-truth-leak.cjs --strict`. exit 0이 게이트.

---

## §3. Phase 1 — KO baseline 재검수 + 사인오프

**책임**: 사용자 + ClaudeCode 1 스레드 / **기간**: 3~5일

### 3.1. 산출
`docs/design/translation-lqa-phase/ko-baseline-signoff.md` (서명자: 사용자) + 발견 issue 시 정정 commit.

### 3.2. 대상 + 표본 전략

| 영역 | 파일 | 표본 |
|---|---|---|
| KO judge_question 채널 | `src/data/scriptedAngles/{spouse,family,friend}-01_judge_questions.json` | **100% 전수** (재판관 톤 + 누설 critical) |
| KO aftermath/mediation 채널 | `src/data/scriptedText/{spouse,family,friend}-01.json` (aftermath/mediation 영역) | **100% 전수** (서술 톤 critical) |
| KO witness/dossier 채널 | 동상 (witness/dossier 영역) | 무작위 20% + 의심 spot |
| KO case 메타 | `src/data/cases/generated/{spouse,family,friend}-01.json` | 전수 (양적 적음) |
| KO scriptedAngles catalog | `src/data/scriptedAngles/*_angle_catalog.json` | 전수 |

### 3.3. 검수 차원 (각 행에서)

| 차원 | 기준 | 합격 |
|---|---|---|
| 자연 한국어 | [feedback_natural_korean_vs_translationese](memory) 정책 — 번역체 신문체 회피 | 위배 0건 |
| 진실 누설 | [feedback_truth_leak_prohibition](memory) — surface 키워드만 사용, 진실 직접 언급 금지 | 위배 0건 |
| 9차원 의미 정확성 | [feedback_revision_meaning_over_form](memory) — lieState × archetype × tone × emotion | 위배 ≤ 5%, P0 0건 |
| 재판관 톤 일관 | 합쇼체 + 정중 추궁 + 단정 회피 | 위배 0건 |
| 캐릭터 발화 톤 | NPC archetype에 일치 | 위배 ≤ 5%, P0 0건 |

### 3.4. 검수 진행
- ClaudeCode 별도 스레드 1개가 카테고리별 batch 순회 (메모리 컨텍스트 활용)
- 발견 issue → CSV 출력 (P0/P1/P2 + 정정 옵션 3안)
- P0/P1 → 사용자 확인 → 즉시 수정 commit
- P2 → batch 종료 후 일괄 처리

### 3.5. 실패 처리
한 carbon area에서 P0 ≥ 10건 또는 위배율 ≥ 10%면 해당 area를 GPT Pro 재의뢰 (배치 단위, 한국어 다시 생성).

### 3.6. 사인오프 조건
모든 영역 합격 기준 통과 → ko-baseline-signoff.md에 사용자 서명 (commit) → Phase 2 진입 게이트 통과.

---

## §4. Phase 2 — 외국어 stratified 표본 LQA

**책임**: ClaudeCode 별도 스레드 6개 (병렬) / **기간**: 5~7일

### 4.1. 산출
카테고리 × 언어별 LQA 리포트 CSV (총 18개 슬롯).
파일 경로: `docs/design/translation-lqa-phase/reports/{category}_{lang}.csv`

### 4.2. 6 카테고리 × 3 언어 = 18 슬롯 표본 전략

| Category | 표본 방법 | 사이즈 추정 |
|---|---|---|
| ui_i18n_message | **100% 전수** (소량) | ~979 rows × 3 lang = 2,937 cells |
| case_surface_content | 10% 무작위 + 위배 의심 100% (Phase 0 자동 검출 결과) | ~600 rows × 3 |
| **judge_question_script** | stratified 15% 무작위 + **100% truth-leak** + **100% meta-question 검출** (v[0]·v[4] 우선) | ~2,000 rows × 3 |
| non_party_scripted_text | 10% 무작위 + 의심 100% | ~800 rows × 3 |
| question_angle_catalog | 20% 무작위 (작은 메타 텍스트) | ~300 rows × 3 |
| witness_testimony | 20% 무작위 + 의심 100% | ~400 rows × 3 |

총 검수 cell 수: **~15,000~20,000** (3 lang 합산).

### 4.3. 검수 차원

| 차원 | 기준 |
|---|---|
| 자연성 | 모국어 화자 입장에서 어색하지 않음 (직역/번역체 회피) |
| 의미 보존 | KO 의미 정확 (paraphrase 허용 단, nuance loss 0) |
| 톤 일관 | 같은 NPC/배치 내 발화 톤 통일 |
| 문화 컨텍스트 | 한국식 표현이 각국 자연 표현으로 치환 |
| 진실 누설 | 4언어 detect-truth-leak 매트릭스 통과 |
| 인명/용어 일관 | glossary 준수 |

### 4.4. Step B 출력 CSV 스키마

```
row_id        | source_ko          | target_lang | target_text          | category | issue_type           | severity | claude_option_a       | claude_option_b       | recommendation | confidence | notes
spouse-01-q97 | "이준호 씨, …"    | ja          | "イ・ジュノさん…" | judge_q | uniform_template     | P1       | "…自然 variation a"  | "…自然 variation b"  | a              | 0.85       | ""
…
```

### 4.5. 합격 기준 (per category × lang)

| Severity | 정의 | 합격 |
|---|---|---|
| P0 | 진실 누설 / 의미 뒤바뀜 / 핵심 오류 | 0건 |
| P1 | 자연성 심각 / 톤 어긋남 / 변이성 손실 | ≤ 3% rows |
| P2 | 미세 어휘 / 표기 분기 | ≤ 10% rows |

### 4.6. 충돌 처리
한 행에 Claude 옵션 a/b 충돌 시 → 사용자 결정 (메인 세션 confirm) → recommendation 갱신.

---

## §5. Phase 3 — 인간 freelancer 표본 검수 (선택)

**책임**: 외주 / **기간**: 1~2주

### 5.1. 표본
- Phase 2에서 P0 또는 P1 표시된 모든 행
- 추가 무작위 5% (raw quality cross-check)

### 5.2. SLA
- 3-day turnaround per batch
- Max 2 revision cycles
- 카테고리 1개당 vendor 1명 권장 (일관성)

### 5.3. 충돌 해결 우선순위
**human > Claude > GPT** (사용자 결정 단일화).

### 5.4. 산출
vendor 정정 CSV → Phase 4 통합.

---

## §6. Phase 4 — 통합/재검증/PC QA

**책임**: 메인 세션 + Codex / **기간**: 3일

### 6.1. 정정 적용
- 정정 merge script 작성 (`scripts/apply-lqa-corrections.cjs`)
- Phase 2/3 CSV → source 파일 자동 적용
- conflict 자동 검출 (한 행에 두 옵션) → 사용자 결정

### 6.2. 자동 게이트 재실행
```bash
npm run qa:lqa        # Phase 0 v2 스트릭트
npx tsc -b --noEmit   # 타입
npm run qa:fast       # 기존 fast
npm run build         # Vite 풀빌드
npm run lint
```
모두 EXIT=0.

### 6.3. PC QA (사용자 직접)
- 3 케이스 × 4 언어 = 12 playthrough
- 각 playthrough: 튜토리얼 11step + impact beat + verdict cutscene + 자유심문 5~10 질의
- 발견 issue → 즉시 메인 세션에 알림 → fix

### 6.4. 사인오프
모든 게이트 통과 + 사용자 PC QA 합격 → tag `lqa-phase-complete`.

---

## §7. 일정 (Gantt)

```
Week 1 │ Phase 0 (verify v2) ████░░ │ Phase 1 (KO baseline) ████████░░░
       │                              │
Week 2 │ Phase 1 마무리 ░░░░██     │ Phase 2 (외국어 LQA) ████████░░░░░░
       │                              │
Week 3 │ Phase 2 마무리 ░░░░░░░██░  │ Phase 3 freelancer (선택) ░░░░░░██████
       │                              │
Week 4 │ Phase 4 (통합/PC QA) ░░░░░░░░░░░░██████████
```

병렬 가능: Phase 0 + Phase 1, Phase 2 + Phase 3, [[free-interrogation-categorization-v2]] 와 병행 가능.

---

## §8. 비-범위 / 후속

- 캐릭터 대화 스크립트 자체 재설계 (v1 §1.3 동일)
- 신규 컨텐츠 추가
- gameplay 메커닉 변경
- Steam 출시 마케팅/문구 LQA (별도 트랙)

후속 Phase 5 후보:
- 4언어 음성 더빙 (출시 후 expansion)
- 콘솔 한정 lokalisierung (PS/XBOX 인증 별도)

---

**참조 메모리**:
- [feedback_natural_korean_vs_translationese](memory) — 자연 한국어 정책
- [feedback_truth_leak_prohibition](memory) — 잘못 패턴 #9
- [feedback_revision_meaning_over_form](memory) — 잘못 패턴 #6 (9차원 정확성)
- [feedback_translation_pipeline_placeholder_leak](memory) — 잘못 패턴 (신규, 박지연 사례)
- [feedback_broad_homologous_detection](memory) — 잘못 패턴 #11 (광범위 검출)
- [feedback_static_analysis_limit](memory) — 잘못 패턴 #12
- [feedback_gpt_pro_claude_review](memory) — GPT 산출물 Claude 보정 필수
