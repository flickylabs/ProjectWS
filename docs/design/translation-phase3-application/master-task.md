# 마스터 의뢰서: 번역 Phase 3 — Source 파일 반영

작성일: 2026-05-18 (최종 업데이트: 2026-05-18 야간)
선행 자료:
- `docs/localization/non-dialogue-extract/batches/GPT_Result/` — 본 번역 라운드 1~5 결과 + batch_21 + batch_22
- `docs/localization/non-dialogue-extract/GPT_Result/glossary_locked.csv` — 용어집 (영구 참조)
- `scripts/verify-translations.cjs` — 자동 검증 스크립트
- `docs/design/impact-enhancement/storyboard.md` — 임팩트 카피 §10
- `docs/design/tutorial-spouse01/copy-ko.json` — 튜토리얼 카피
- `docs/localization/non-dialogue-extract/batches/PROGRESS.md` — 22개 batch 전체 status 일람

---

## §0. 진입 조건 (반드시 확인)

| 항목 | 상태 |
|---|---|
| 모든 라운드 GPT_Result 도착 (batch_01~22) | ✓ 22개 retranslated CSV 전부 GPT_Result 위치 |
| 라운드별 verify (glossary 위배 0 / placeholder 0 / CJK 잔류 0 / 빈칸 0) | ✓ 누적 19,241행 P0 위배 0 |
| working tree clean | ⏳ 작업 시작 시 점검 필수 (현재 dirty 다수 — 사용자가 정리 후 진입) |
| 사용자 PC QA (튜토리얼 + 임팩트 한국어) | ⏳ 진행 중 (Phase 3와 병행 가능) |

**검증 결과 요약**: 라운드 1~5(19,203행) + batch_21(27행) + batch_22(11행) = 19,241 verified rows, P0 위배 누적 0건. 단 length spike는 정보성 경고 (KR→EN 자연 확장).

## §1. 작업 범위

본 번역 결과 약 19,230행(20 batches + batch_21 mini)을 4개 카테고리로 분류해 source 파일에 적용한다.

### §1.1. 결과 파일 구조

```
docs/localization/non-dialogue-extract/batches/GPT_Result/
├─ batch_01_spouse01_part1_retranslated.csv    1,137행
├─ batch_02_spouse01_part2_retranslated.csv    1,459행
├─ batch_03_spouse01_part3_retranslated.csv    1,349행
├─ batch_04_spouse01_part4_retranslated.csv    564행
├─ batch_05~08_family01_partN_retranslated.csv 4,859행
├─ batch_09~12_friend01_partN_retranslated.csv 5,434행
├─ batch_13~14_global_ui_partN_retranslated.csv 1,129행 (UI + 일부 hardcoded)
├─ batch_15~16_global_hardcoded_partN_retranslated.csv 1,092행
├─ batch_17~20_global_scripted_partN_retranslated.csv 2,180행 (hardcoded overflow)
├─ batch_21_tutorial_impact_addendum_retranslated.csv  27행 (튜토리얼 22 + 임팩트 5)
├─ batch_22_consolidated_retranslation_retranslated.csv 11행 (telemetry 10 + friend-01 truncation fix 1)
└─ (각 batch마다 verify-report.json 사용 가능)
```

총 22개 retranslated CSV / 19,241 verified rows.

### §1.2. 카테고리별 source 파일 적용 전략

| category | source 파일 패턴 | 적용 방법 |
|---|---|---|
| `ui_i18n_message` | `src/i18n/messages/*.ts` | 키 매핑 기반. 기존 `tutorialPlaceholders` 패턴처럼 한국어/영어/일본어/중국어 객체에 키-값 박음 |
| `case_surface_content` | `src/data/cases/generated/{case}.{locale}.json` | 케이스별 locale 파일. ko 행은 `*.ko.json`, en 행은 `*.en.json`처럼 매핑 |
| `judge_question_script` | `src/data/scriptedAngles/*_judge_questions.{locale}.json` | 케이스별 locale 분리 |
| `non_party_scripted_text` | `src/data/scriptedText/{case}.{locale}.json` | 케이스별 locale 분리. `system/judge/witness/dossier/mediation/aftermath/milestone` 채널 |
| `question_angle_catalog` | `src/data/scriptedAngles/*_angle_catalog.{locale}.json` | 키 기반 매핑 |
| `witness_testimony` | `src/data/cases/generated/{case}.{locale}.json` (witnesses 영역) | 케이스 메타 일부 |
| `mediation_judge_line` | `src/data/scriptedText/{case}.{locale}.json` (mediation 채널) | 케이스 메타 일부 |
| `phase_dialogue_judge_choice` | Phase 1 시스템 내레이션 + 재판관 선택지 | speaker가 judge인 행만 |
| `hardcoded_source_literal` | `.ts` / `.tsx` 파일 직접 (`src/i18n` 밖) | 두 가지 옵션: A) 그대로 두고 i18n 마이그레이션 / B) 직접 교체 |

### §1.3.0. batch_22 통합 재번역 특수 처리

batch_22는 11행으로 구성된 정리용 mini-batch:

**텔레메트리 10키 (settings.consent.telemetry.* 7건 + settings.data.telemetry.* 3건)**:
- **이미 src/i18n/messages/settings.ts에 메인 세션이 1차 작성한 ko/en/ja/zh-CN이 박혀있음** (commit 6d2a46d8 참조)
- batch_22 결과의 en/ja/zh-CN은 **GPT Pro 정식 재검증·다듬기 버전**이라 더 자연스러움
- 따라서 Phase 3 작업은 settings.ts의 해당 10키 en/ja/zh-CN 값만 batch_22 retranslated 결과로 **교체** (ko는 그대로)
- 모달 컴포넌트 / 설정 패널 / 홈 DATA 카드는 이미 t() 사용 중이라 추가 코드 변경 불필요

**friend-01 truncation fix 1건**:
- key_path: `channels[aftermath].entries[protective_resolution].variants[protective_resolution-v3].text`
- batch_11 row 503의 EN/JA/ZH-CN truncation 문제를 batch_22가 완전 재번역
- src/data/scriptedText/friend-01.{en,ja,zh-CN}.json의 해당 키만 batch_22 값으로 **교체** (batch_11 값 덮어쓰기)

### §1.3. tutorial + impact 특수 처리 (batch_21)

batch_21 27행은 일반 적용과 별도 처리:

#### Tutorial (22행)
- `src/i18n/messages/tutorial.ts`의 4개 객체(`ko/en/ja/zh-CN`)에 en/ja/zh-CN 한국어 매핑된 형태로 박기
- 기존 `tutorialKo` 패턴 그대로 `tutorialEn / tutorialJa / tutorialZhCN` 추가
- `as Record<keyof typeof tutorialPlaceholders, string>` 타입 유지
- `tutorialMessages` 객체에서 4개 locale 매핑 업데이트

#### Impact (5행)
**현 상태:** 5개 카피 중 4개가 하드코딩 ([§A.1.5의 carrier 표 참조](#A.1.5))
- "새로운 쟁점" — `DiscoveryFeedbackWatcher.tsx:402` 하드코딩
- "결정적 단서" — `useActionDispatch.ts:679` 하드코딩 chipLabel
- "VS" — `DiscoveryFeedbackWatcher.tsx:307` 하드코딩 (번역 면제, 그대로)
- "최종 판단" — `presentationEngine.ts:336` `localizeRuntimeText('최종 판단', locale)` (이미 i18n 시스템)
- "사건이 완전히 다르게 보인다" — `DiscoveryFeedbackWatcher.tsx:385` 하드코딩
- "어디서부터 어긋났을까" — `DiscoveryFeedbackWatcher.tsx:390` 하드코딩

**전략 (Codex 결정):**

옵션 A — runtimeText.ts 시스템 활용 (권장)
- `src/i18n/runtimeText.ts`에 임팩트 카피 4건 매핑 추가 (en/ja/zh-CN)
- 하드코딩 부분을 `localizeRuntimeText('...', locale)` 호출로 변경
- Beat 4 패턴 동일 적용
- 코드 변경 작음 + 일관성 유지

옵션 B — 신규 `src/i18n/messages/impact.ts` 생성
- tutorial.ts와 동일 패턴
- `pc.impact.*` 키 정의
- DiscoveryFeedbackWatcher / useActionDispatch에서 `useI18n` + `t()` 호출로 변경
- 코드 변경 큼 / 더 명시적

**A안 권장.** 4건만이라 작음. 시스템 일관 (Beat 4 이미 이 방식). 다국어 적용 단순.

## §2. 적용 절차

### §2.1. 적용 순서

```
1. translated CSV 모두 readCsv → 카테고리별 그룹화
2. ui_i18n_message 적용 (가장 영향 작음, 안전 영역)
3. case_surface_content 적용 (locale json 파일 생성/업데이트)
4. judge_question_script / non_party_scripted_text 적용 (locale json)
5. batch_21 tutorial 적용 (i18n/messages/tutorial.ts 다국어 객체)
6. batch_21 impact 적용 (runtimeText.ts 또는 i18n 시스템)
7. hardcoded_source_literal 적용 (.ts/.tsx 직접)
8. 일괄 verify-translations.cjs 실행
9. npm run check:all
10. npm run dev:pc + npm run server — 4언어 spouse-01 진입 시각 확인
```

### §2.2. locale 파일 분리 패턴

기존 `src/data/cases/generated/spouse-01.json` 같은 단일 ko 파일이 있다면, locale별 분리 필요:
- `spouse-01.ko.json` (기존 = 한국어 base)
- `spouse-01.en.json` (신규)
- `spouse-01.ja.json` (신규)
- `spouse-01.zh-CN.json` (신규)

또는 단일 파일에 locale 객체 통합:
```json
{
  "i18n": {
    "ko": { ... },
    "en": { ... },
    "ja": { ... },
    "zh-CN": { ... }
  }
}
```

**기존 데이터 구조에 따라 결정** (Codex 점검 필요). 기존 case 로딩 코드 (`src/i18n/scriptLocale.ts`)를 따르되 변경 최소화.

### §2.3. hardcoded literal 적용 정책

`src/i18n` 외부 .ts/.tsx 파일에 박힌 한국어/CJK 리터럴 약 3,422행:

**옵션 A (적극 추천):** i18n 마이그레이션
- 각 hardcoded 한국어 → `src/i18n/messages/runtime-literals.ts` 또는 `runtimeText.ts`에 키-값 매핑
- 소스 파일에서 `t('runtime.xxx')` 또는 `localizeRuntimeText('한국어', locale)` 호출로 교체
- 변경 PR 크지만 4언어 빌드 시 자동 다국어

**옵션 B (단기 수용):** ko 빌드는 그대로, en/ja/zh 빌드 시점에 자동 교체 스크립트
- 빌드 스크립트가 hardcoded 한국어를 detected language로 일괄 sed 교체
- 위험: source-of-truth가 빌드 시점에 갈림

**A안 권장.** Steam 출시 전 1회 리팩토링. 후속 유지보수 단순.

다만 hardcoded 영역이 3,422행이라 작업 규모 큼. Codex 판단에 따라 분할 PR 가능.

## §3. 검증 / QA

### §3.1. 자동 검증

```bash
# 각 batch별 verify-translations.cjs (이미 라운드별 수행됨)
node scripts/verify-translations.cjs --input batches/GPT_Result/<batch>_retranslated.csv \
  --glossary GPT_Result/glossary_locked.csv \
  --out batches/GPT_Result/<batch>_verify-report.json

# 적용 후 일괄 검증
node scripts/verify-translations.cjs --input batches/GPT_Result/<all> --strict
```

위반 사항 (placeholder / 빈칸 / CJK 잔류 / glossary 위배) 0 보장.

### §3.2. 코드 검증

- `npx tsc -p tsconfig.app.json --noEmit` 통과
- `npm run check:all` 통과 (lint + type + test)
- `npm run dev:pc` 실행 + 4언어 모드 전환 동작

### §3.3. PC QA (사용자 직접)

각 locale (ko/en/ja/zh-CN)에 대해 spouse-01 진입 시 확인:
- 사건 선택 화면 — 사건명/요약 자연
- Phase 1 진술 — 캐릭터 대화 (이미 GPT Pro로 처리됨, 변경 X)
- 심문 진행 — 재판관 멘트 / 시스템 메시지 자연
- 증거 카드 — 증거명 / 설명 자연
- Beat 1~5 임팩트 카피 — 4언어 모두 자연
- 튜토리얼 10단계 — 4언어 자연
- 판결 화면 — 자연
- UI overflow 검출 (특히 영어가 한국어 대비 2~3배 길 수 있음)

## §4. 위험 / 주의

### §4.1. 캐릭터 대화 스크립트 절대 건드리지 않음
[CLAUDE.md / feedback 메모리 항목] party A/B 대화 (`speaker: "a"`, `speaker: "b"`, `party: "a"`, `party: "b"`)는 별도 GPT Pro 작업으로 이미 처리됨. **본 의뢰는 캐릭터 대화 스크립트 X**.

### §4.2. 진실 누설 재검증
- batch_17~20 (global scripted) = 재판관 / 시스템 / 증인 멘트. 진실 누설 가장 위험.
- 적용 후 영어/일본어/중국어 빌드에서 spouse-01 h-d3 영역 spot check 필요 — "위임장 조작" 같은 결과 어휘 잔류 검출

### §4.3. UI overflow
영어 / 중국어가 한국어 대비 길어 카드 / 버튼 / 메뉴에서 overflow 가능. 발견 시:
- CSS에서 텍스트 줄바꿈 또는 글꼴 크기 조정
- 또는 해당 행 GPT Pro 재의뢰로 짧은 변형 받기

### §4.4. 본 의뢰 범위 밖
- 캐릭터 대화 스크립트 (이미 처리됨)
- 빌드/배포 (Vercel / Electron / Steam)
- 분석 대시보드
- 다국어 폰트 임베드 (한자/카나 추가 폰트 필요 시 별도)

## §5. 산출 / 완료 조건

### §5.1. 산출
- 모든 source 파일에 4언어 매핑 박힘 (ko/en/ja/zh-CN)
- 임팩트 카피 i18n 마이그레이션 (runtimeText 또는 messages)
- 튜토리얼 22키 4언어 매핑
- hardcoded literal 3,422행 i18n 마이그레이션 (또는 분할 PR)
- 적용 후 verify-report 위반 0
- check:all 통과
- 4언어 dev:pc 실행 가능

### §5.2. 진입 / 마무리
- 진입 조건: working tree clean
- 작업 후 staged 상태로 두고 commit은 사용자가 직접
- 본 의뢰는 분할 PR 가능 (locale별 또는 카테고리별)

### §5.3. 일정 추정
- 자동 적용 스크립트 작성: 0.5일
- 카테고리별 적용 + 검증: 1~2일
- hardcoded literal 마이그레이션: 1~2일 (분할)
- 통합 QA: 0.5일
- 총 약 3~5일

## §6. 분담

본 의뢰는 단일 Codex 트랙. ClaudeCode 보조 작업 없음.

## §7. 발송 메시지 (Codex)

본 의뢰서를 그대로 첨부하거나 경로 안내 + 짧은 지시:

```
docs/design/translation-phase3-application/master-task.md
의뢰서대로 진행해주세요.

핵심:
- 모든 라운드 GPT_Result 도착 + verify 통과 후 시작
- 19,230행을 카테고리별 source 파일에 적용
- batch_21 tutorial은 i18n/messages/tutorial.ts 4언어 객체 확장
- batch_21 impact는 runtimeText.ts 매핑 추가 + 하드코딩 → localizeRuntimeText 변경 (옵션 A 권장)
- hardcoded literal 3,422행 i18n 마이그레이션 (옵션 A 권장, 분할 PR 가능)
- check:all 통과 + 4언어 dev:pc 실행 + PC QA 시각 확인

진입 조건: working tree clean + 모든 batch verify-report 위반 0
산출은 staged 상태. commit은 사용자가 직접.
분할 PR 가능 (locale별 또는 카테고리별).
```

## §8. 발송 시점

- ✓ 모든 라운드(1~5 + 21 + 22) GPT_Result 도착 완료 (2026-05-18 야간)
- ✓ 라운드별 verify 일괄 통과 (P0 위배 0건)
- ⏳ 사용자 PC QA (한국어): 진행 중 (Phase 3와 병행 가능)
- ✓ 사용자가 Phase 3 진행 결정 (2026-05-18)

**발송 가능 상태.** 본 의뢰는 본 번역 파이프라인 마지막 단계. 출시 전 가장 큰 코드 변경 PR.
