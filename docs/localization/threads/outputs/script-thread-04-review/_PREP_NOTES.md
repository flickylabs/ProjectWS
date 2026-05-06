# Thread-04 Script Localization Review — 사전 준비 메모

작성: 2026-05-06 (intake 3종 도착 전 사전 정찰)
역할: review 전용 (`src/data/**` 수정 X, bulk 번역 X). Brief = `docs/localization/threads/script-04-claudecode-script-localization-review.md`.

---

## 1. 입력 상태 (2026-05-06 시점)

| Input | Path | 상태 |
|---|---|---|
| SCRIPT_EN intake | `docs/localization/threads/outputs/script-thread-01-en-intake/` | **미생성 — 사용자 전달 대기** |
| SCRIPT_JA intake | `docs/localization/threads/outputs/script-thread-02-ja-intake/` | **미생성 — 사용자 전달 대기** |
| SCRIPT_ZH_CN intake | `docs/localization/threads/outputs/script-thread-03-zh-cn-intake/` | **미생성 — 사용자 전달 대기** |
| UI restart-05 consistency | `docs/localization/threads/outputs/restart-thread-05-consistency/CONSISTENCY_FINDINGS.csv` | ✅ 1건 (47 rows) |

3종 intake가 도착하면 본 리뷰의 cross-locale 분석/glossary 충돌/번역 품질 채점이 가능해진다.

---

## 2. 사전 정찰로 확정한 사항

### 2.1 활성 케이스 — 3건 한정

`spouse-01` / `family-01` / `friend-01`만 활성. 나머지 81건 (cases/generated 외 mediation 120여종, scriptedText는 3건뿐) = legacy. 메모리 `project_active_cases.md` + `disclosure-policy.md` §4 모두 일치.

### 2.2 Locked 브랜드 규칙 (이미 결정됨)

```
internal     : Project_Solomon
ko full      : 솔로몬의 딜레마: 진실의 재판
en full      : Verdict Zero: Trial of Truth
ja full      : ソロモンのジレンマ：真実の裁き
zh-CN full   : 真相裁决：零点审判
```

intake 3종이 reject 후보(`Project Solomon / Solomon's Dilemma / Solomon Court / ソロモン法廷 / 所罗门의...`)를 사용했는지 = pilot 품질 P0 검사 항목.

### 2.3 Active 스크립트 표면 (사이즈 포함)

| Path | Size (bytes) | 용도 |
|---|---:|---|
| `src/data/scriptedText/spouse-01.json` | 9,013,831 | NPC 대사 6채널 (interrogation/evidence_present/dossier/witness/aftermath/system_message) |
| `src/data/scriptedText/family-01.json` | 10,029,637 | 동일 |
| `src/data/scriptedText/friend-01.json` | 9,700,502 | 동일 |
| `src/data/scriptedAngles/{case}_angle_catalog.json` | 20–28KB | 쟁점/앵글 카탈로그 |
| `src/data/scriptedAngles/{case}_judge_questions.json` | 380–530KB | 재판관 질문 (surface-only 채널) |
| `src/data/scriptedAngles/{case}_interrogation_answers.json` | 4.2–6.8MB | 앵글별 NPC 답변 (lieState 게이트) |
| `src/data/scriptedAngles/{case}_special_scripts.json` | 60–104KB | confession/interjection/emotional/trust/discovery/combo/witness summon/dossier prompts |
| `src/data/dialogues/phase1/{case}.json` | ~13KB | Phase1 시나리오 대사 |
| `src/data/dialogues/mediation/*.json` | ~3.5–4KB × 123건 | **spouse-01 mediation 부재 — family-05/family-09 등 legacy 위주** |
| `src/data/cases/generated/{case}.json` | 145–253KB | 사건 메타 + dispute/evidence name·surfaceName·description 등 텍스트 다수 |
| `src/data/cases/refined/{case}_texts.json` | 28–37KB | refined 텍스트 |
| `src/data/witnessTestimonyData/{case}.ts` | ~12KB | 증인 증언 (TS — JSON 아님) |
| `src/data/evidencePresentationScripts.ts` | 31KB | TS module |
| `src/data/confessionScripts.ts` | 9KB | TS module |
| `src/data/combinationComments.ts` | 5KB | TS module |

총 active script 텍스트 추정 부피: **~50MB JSON + ~70KB TS** (6 채널 × 3 case 기준).
`spouse-01` 단일은 ~22MB (scriptedText 9MB + answers 6.8MB + judge_q 440KB + special 60KB + case 184KB + refined 36KB + phase1 13KB + witness 11KB).

### 2.4 비활성 / 정책 / legacy 영역

- `src/data/legacy/dialogues/{phase1,phase2,phase3-5}.ts` — legacy
- `src/data/cases/refined/spouse-01_backup.json` — backup
- `src/data/cases/refined/manifest.json` — meta
- `src/data/scriptedAngles/free_interrogation_*` — **test/policy 입력 (mapping_schema, response_policy, prompt_blocks.md, test_cases) — bulk 번역 X**
- `src/data/dialogues/mediation/*` 중 active 3 case 외 120여건 = legacy (단 spouse-01 mediation은 부재 — 별도 처리 결정 필요)
- `src/data/dialogues/phase1/*` 중 active 3 case 외 = legacy

### 2.5 런타임 로더 (locale-aware 변환 영향)

- `src/engine/scriptedTextLoader.ts` — `bundleCache: Map<caseId, ScriptedTextBundle>` 단일 locale 가정
- `src/engine/scriptedAngleTextLoader.ts`
- `src/data/dialogues/phaseScriptLoader.ts` / `mediationScriptLoader.ts`
- `src/data/cases/caseLoader.ts`
- `src/engine/disclosurePolicyLoader.ts` — runtime import 금지 (Tier 3 이전)
- `src/engine/v2DataLoader.ts` / `v3GameLoopLoader.ts`

**저장 모델 결정 핵심**: bundle을 `{caseId, locale}` 키로 확장 (locale별 별도 파일) vs variant 객체 안에 `text_locales: { ko, en, ja, zh-CN }` 인라인 필드 추가. 두 옵션 모두 IDs / variantId / sourceRefs / behaviorHint / tags는 locale-invariant 유지가 전제.

### 2.6 truth-boundary 직결 텍스트 필드

`disclosure-policy.md` §4.1/§4.2/§4.3 / §13.1 정합 — pilot 평가 시 필수 점검:

- `evidence.{id}.name` (진실) vs `evidence.{id}.surfaceName` (UI 허용)
- `evidence.{id}.description` (진실어 포함)
- `evidence.{id}.v3DepthPlan.{stage}.summary` (uiSurfaceMap 보강 영역)
- `dispute.{id}.title` / `dossier.{id}.label / summary / noteText`
- `combinationLab.nodes.*.label` / `combinationLab.outputs.*.summary / judgeHint`
- `v3Design.authorityPlacements[*].purpose`
- ScriptedText `judge_question` / `judge_contradiction` / `system_message` / dossier 안내 → surface-only 채널 (lieState 무관, 자백 전 진실 lexeme 0건)

타깃 언어 번역이 한국어 surface 표현보다 더 많이 누설하면 P0.

### 2.7 UI glossary 확정 영역 (script 영역과 충돌 후보)

`glossary.csv` 137행 중 script 채널 빈출 용어:
- `judge` = Judge / 裁判官 / 裁判官 — UI/Script 통일 필수
- `verdict` (판결) — zh-CN 한정 분리 (`裁决` 동작 / `判决` 기록 — restart-05 P1 row)
- `truth` = Truth / 真相 / 真相 — JA `真実` 구방언 → `真相` 통일 (restart-05 P1)
- `objection` 3-tier (UI noun `异议` / button `提出异议` / bark `反对！`) — script bark 채널 영향
- `emotion_resigned` = Resigned / 諦観 / 认命 (放弃/默许 거절)
- `lie_state_s0..s5` (방어/동요/변명/궁지/붕괴/자백) — script 메타 영역 사용 가능성 점검 필요
- `axis_*_pole` / `fragment_*` — 결과/판결 화면 ↔ script aftermath 정합
- `score_axis_insight/authority/wisdom` (탐구/판결/해결) — `needs-rework` 상태, JA/zh-CN intake 결정 필요

### 2.8 UI restart-05 누적 P0/P1 (cross-reference 완료)

- P0 8건 (brand_full_title verification PASS / `pcHomeShared.ts:134` 하드코딩 KO Solomon 누설 / 결과·판결 numeric prefix 충돌 / Settings 카테고리·About 미번역 / Verdict·Hotbar t() 0건 / pc.css uppercase·tracking · h1 nowrap / language fallback 부재)
- P1 23건 — 대부분 UI 영역. **script 영역에 직접 의존: court_control 검증 PASS / verdict 用語 zh-CN 분리 / objection 3 form / objection_bark 채널 정합 / score_axis_* 상태**
- P2 13건 — 영문 typography / JA needs_native_review / em-dash polish / Steam Deck CJK floor

---

## 3. 사전 가설 (intake 도착 후 검증할 것)

### H1. 저장 모델 권장안 (Codex 의뢰서 영역)

가장 안전한 저장 모델 = **per-locale 사이드카 파일**. 즉:

```
src/data/scriptedText/spouse-01.json              # KO source (현행)
src/data/scriptedText/spouse-01.en.json           # EN locale overlay
src/data/scriptedText/spouse-01.ja.json
src/data/scriptedText/spouse-01.zh-CN.json
```

각 overlay는 같은 schema이지만 variant 안에서 `id` / `behaviorHint` / `tags` / `sourceRefs` / lieState / questionType / disputeId 등 메타는 보존하고 `text` 필드만 locale 텍스트로 교체. KO source 파일은 fallback locale로 그대로 유지. Loader는 `{caseId, locale}` 키로 cache + KO fallback chain.

이유:
- KO source diff/검증 도구 (qa:fast/qa:deep/qa:visual 영역) 변경 최소
- baseline anchor (`baseline-pre-policy-v2/v3`) 영역과 분리 — locale overlay 회귀는 KO baseline 무관
- runtime loader 1점 변경 (`scriptedTextLoader.ts`에 locale param 추가)
- truth-boundary 검증 wrapper (`check:policy`) locale별 반복 가능

대안 = 인라인 `text_locales` 필드. **거부 권장** — KO 파일 사이즈 4배, diff 폭증, baseline anchor 영역 회귀 위험.

이 가설은 Codex 의뢰서 입력으로 cross-check, intake 3종의 `IMPLEMENTATION_NOTES_FOR_CODEX.md`와 정합 검증 후 권장.

### H2. Bulk 번역 안전성 → 조건부 GO

UI glossary consistency (`restart-thread-05-consistency`)가 P0/P1 대부분 완료된 후라면, script bulk 번역 진입 가능. 단:
- score_axis_* JA/zh-CN 확정 (`needs-rework` 해소)
- objection 3-tier 정착
- verdict zh-CN process/record 분리 glossary note 추가
- pcHomeShared.ts:134 KO 하드코딩 i18n 승격 (UI 영역이지만 script 톤 정합 영향)

이 4건 + intake 3종 pilot 품질 ≥ `accepted_with_notes` 평균 → bulk GO.

### H3. mediation 영역 spouse-01 부재 처리

`src/data/dialogues/mediation/spouse-01.json` 부재 — script 04 review의 user-decision 항목으로 surface 필요. 옵션:
- (a) spouse-01 mediation 신규 작성 (KO source 추가 후 bulk 진입)
- (b) mediation 영역 활성 cases 한정 정리 (legacy 120건 분리 + spouse-01 보유 여부 결정)
- (c) bulk 번역 대상에서 mediation 채널 자체 제외 (Phase 진행상 mediation이 활성 cases에 unused면 가능)

intake 3종이 mediation surface를 어떻게 분류했는지(authoritative_status) → 결정 입력.

### H4. legacy 격리 상태

메모리 `session_handoff_20260428_v3_correction.md` = 84건 Legacy `_LEGACY_*` 격리 완료 (commit 574d563). 이후 신규 추가 영역은 `cases/generated`나 `mediation`에 추가됐지만 active = 3건 한정. intake 3종이 legacy 영역을 silent에 무시한 게 아니라 `exclude_legacy` 분류로 잡았는지 검증.

---

## 4. 산출물 골격 (intake 도착 후 채울 것)

### 4.1 `SCRIPT_REVIEW_FINDINGS.csv` (priority,locale,path_or_surface,issue,recommendation)

P0 후보 (사전 추정):
- locale=all, path=`src/data/scriptedText/spouse-01.json` (judge channels), 채널/lieState 게이트 위반 후보 — intake 3종이 같은 위반을 다른 locale로 옮겼는지 cross-check
- locale=all, path=`src/data/dialogues/mediation/`, spouse-01 부재 — bulk 진입 차단
- locale=all, path=`src/data/scriptedAngles/free_interrogation_*`, 정책/test 영역인데 intake가 `localize`로 처리했다면 P0
- locale=*, brand title — pilot이 reject 후보 사용했는가?

P1 후보:
- 저장 모델 결정 미합의 (Codex 의뢰서 진입 차단)
- score_axis_* JA/zh-CN 확정 안 됨
- objection 3-tier script 채널 적용 안 됨
- pilot 품질 `revise_before_bulk` 비율

P2 후보:
- typography polish (em-dash, apostrophe)
- needs_native_review 누적

### 4.2 `AUTHORITATIVE_SURFACE_DECISION_TABLE.csv` (path_pattern,surface_type,decision,reason,next_action)

골격:

| path_pattern | surface_type | decision | reason | next_action |
|---|---|---|---|---|
| `src/data/scriptedText/{spouse-01,family-01,friend-01}.json` | scripted_npc_lines | localize | active 3 case 핵심 | full bulk 진입 (조건부) |
| `src/data/scriptedAngles/{case}_angle_catalog.json` | angle_meta | localize | label/description/keywords surface | bulk 가능 |
| `src/data/scriptedAngles/{case}_judge_questions.json` | judge_questions | localize | surface-only 채널 — truth-boundary 강검사 | bulk + check:policy |
| `src/data/scriptedAngles/{case}_interrogation_answers.json` | npc_answers_by_angle | localize | NPC 발화 (lieState 게이트) | bulk + check:policy |
| `src/data/scriptedAngles/{case}_special_scripts.json` | special_npc_scripts | localize | confession/interjection 등 | bulk + check:policy |
| `src/data/scriptedAngles/free_interrogation_*` | policy_test_inputs | exclude_test_policy | runtime 미사용 + 정책 입력 | 번역 X / KO 유지 |
| `src/data/dialogues/phase1/{active 3}.json` | phase1_dialogue | localize | active phase1 시나리오 | bulk 가능 |
| `src/data/dialogues/phase1/{others}` | phase1_legacy | exclude_legacy | active 외 | 번역 X |
| `src/data/dialogues/mediation/{active 3}.json` | mediation_dialogue | needs_user_decision | spouse-01 부재 + 활성성 의문 | mediation 영역 결정 |
| `src/data/dialogues/mediation/{others}` | mediation_legacy | exclude_legacy | active 외 | 번역 X |
| `src/data/cases/generated/{active 3}.json` | case_meta_text | localize | dispute/evidence surface 텍스트 | uiSurfaceMap 정합 검증 후 bulk |
| `src/data/cases/refined/{active 3}_texts.json` | refined_texts | localize | refined surface 텍스트 | bulk |
| `src/data/cases/refined/spouse-01_backup.json` | backup | exclude_legacy | backup 파일 | 번역 X |
| `src/data/witnessTestimonyData/{active 3}.ts` | witness_ts | needs_codex_investigation | TS 모듈 — JSON loader 별도 | TS i18n 패턴 결정 |
| `src/data/evidencePresentationScripts.ts` | ts_module | needs_codex_investigation | TS module text fields | i18n 추출 패턴 결정 |
| `src/data/confessionScripts.ts` | ts_module | needs_codex_investigation | 동일 | 동일 |
| `src/data/combinationComments.ts` | ts_module | needs_codex_investigation | 동일 | 동일 |
| `src/data/legacy/**` | legacy | exclude_legacy | 명시적 legacy 격리 | 번역 X |

intake 3종의 `SCRIPT_SURFACE_INVENTORY.csv` 분류와 cross-check.

### 4.3 `SCRIPT_GLOSSARY_CONFLICTS.csv` (source_ko,en,ja,zh_cn,issue,recommendation,blocks_bulk_translation)

intake 3종의 `SCRIPT_GLOSSARY_CANDIDATES.csv` 비교 후 작성. 사전 후보:
- `판결` (verdict) — en `Verdict` 단일 vs zh-CN `裁决/判决` 분리 / ja `判決` 단일 — script aftermath 채널 정합
- `진실 / 真相 / Truth` — ja intake가 `真実` 권장하면 conflict (locked = `真相`)
- `친형 / 조카 / 형` (spouse-01 진실어) — surface-only 채널 locale별 surface 표현 합의
- `objection_bark` (이의 있습니다 / 反对！/ 異議あり！) — script `interjection` / `confession` 채널 사용 시 dialogue 채널 통일
- `emotion_resigned` — 체념 / 諦観 / 认命 (放弃 거절)
- `lie_state_s*` — script 채널 메타 사용 시 (보통 enum이라 번역 X — pilot에서 우발 노출 검사)

### 4.4 `PILOT_SAMPLE_REVIEW.csv` (locale,path,key_or_id,quality,truth_boundary_risk,tone_risk,recommendation)

각 locale 8개 sample (interrogation / evidence_present / witness / system_message / judge_q / answer / phase1 / mediation) × 3 locale = 24행. 각 행에:
- quality ∈ {accepted, accepted_with_notes, revise_before_bulk, reject}
- truth_boundary_risk = 진실 lexeme 노출 여부 / surface name 정합
- tone_risk = lieState 정합 / register / 화자 관계
- recommendation = 패치 제안

intake `PILOT_TRANSLATION_SAMPLES.json` + `TRUTH_BOUNDARY_RISKS.csv`가 입력.

### 4.5 `IMPLEMENTATION_PLAN_FOR_CODEX.md` (5단계)

1. 저장 모델 (per-locale overlay 권장 — H1) — schema 정의 + loader 변경 spec
2. 추출/검증 도구 — `scripts/extract-script-text.cjs` (KO → translation queue) + `scripts/validate-script-locale.cjs` (overlay schema sync / id/meta 무결성 / disclosure-policy lexeme grep per locale)
3. glossary 업데이트 — score_axis_* JA/zh-CN 확정 / objection 3-tier 노트 / verdict zh-CN 분리 / 신규 script 전용 term 등록
4. 전체 번역 batching — case별 (spouse-01 → family-01 → friend-01) × locale별 (en → ja → zh-CN) × 채널별 (interrogation → evidence_present → dossier → witness → aftermath → system_message → angle → phase1 → mediation → cases meta → TS modules) 순차. 한 batch ≤ ~5,000 strings, baseline anchor 회귀 검증.
5. QA/build — `qa:fast` / `check:policy` (locale 인자 추가) / `qa:deep` / `qa:visual` / Steam Deck UI 회귀 / TypeScript build / Vercel/Electron build

### 4.6 `SUMMARY.md`

- intake 3종 점검 여부
- P0/P1 blockers count
- 권장 authoritative surfaces
- bulk 진입 GO/NO-GO + 조건
- PROJECT_CONTROL_TOWER / 사용자 결정 항목 (mediation spouse-01 부재 / score_axis JA-zh-CN / 저장 모델 / TS module i18n 패턴)

---

## 5. 다음 단계 (intake 3종 도착 시)

1. 3개 디렉토리 ls → 각 6 산출물 점검
2. `SCRIPT_SURFACE_INVENTORY.csv` 3종 비교 → §4.2 decision table 확정
3. `PILOT_TRANSLATION_SAMPLES.json` 3종 + `TRUTH_BOUNDARY_RISKS.csv` 3종 → §4.4 pilot review
4. `SCRIPT_GLOSSARY_CANDIDATES.csv` 3종 + `glossary.csv` cross-check → §4.3 conflicts
5. `IMPLEMENTATION_NOTES_FOR_CODEX.md` 3종 + H1 가설 cross-check → §4.5 plan
6. `SUMMARY.md` 3종 + restart-05 P0/P1 → §4.6 종합 + go/no-go

각 산출물은 `docs/localization/threads/outputs/script-thread-04-review/` 안에 직접 작성. 본 노트(`_PREP_NOTES.md`)는 작업 완료 후 archive 영역으로 이동 또는 final SUMMARY.md에 반영.
