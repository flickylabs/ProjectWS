# Codex 의뢰서: 번역 용어집 추출 + 20배치 분할

작성일: 2026-05-18
선행 산출물: `scripts/extract-non-dialogue-text.cjs`, `translation_priority_inventory.csv` (19,252행)

## 배경

1차 번역 우선 목록 19,252행을 GPT Pro 5.5 Web에서 4개 언어(ko 원본, en/ja/zh-CN 재번역)로 다시 작업한다. 그러나:

- GPT Pro Web 한 세션에 19k행을 통째로 던질 수 없다.
- 배치별로 나눠 작업하면 배치 간 용어 일관성이 깨진다 (블랙박스 → dashcam vs camera, 윤태성 → Yoon Tae-seong vs Yun Taeseong 등).
- 따라서 **용어집을 먼저 4개 언어로 fix**하고, 본 배치 번역에 모든 배치 공통 컨텍스트로 주입한다.

현재 1차 번역의 실제 오역 사례 (line 14, 17, 3 등):
- `"왜 40이냐"` (유산 비율 40%) → `"why are you 40?"` (나이 40살)
- `증언 축` (testimony axis) → `congratulations`
- `형이 모르던` (older brother) → `タイプが知らなかった` (type)

오역은 단순 어휘 매핑이 게임 도메인/관계/문화 컨텍스트를 무시하고 진행된 결과로 보인다. 용어집을 사전 확정하면 본 번역에서 같은 종류 오류를 차단할 수 있다.

## 산출물 요구

### 1. `scripts/extract-translation-glossary.cjs`

`translation_priority_inventory.csv`를 읽고 다음 카테고리의 용어 후보를 자동 추출한다.

#### 카테고리

| 카테고리 | 추출 소스 | 우선순위 |
|---|---|---|
| `PERSON_NAME` | `src/data/cases/generated/{case}.ko.json` profiles + dialogues + scriptedText에 등장하는 인명 | P0 |
| `EVIDENCE` | `evidence[].label`, `e-N` 패턴 라벨, evidence summary 핵심 명사 | P0 |
| `DISPUTE` | `disputes[].label`, `d-N`/`dc-N`/`h-d-N` 패턴 라벨 | P0 |
| `WITNESS` | `witnesses[].name`, `w-N` 패턴 | P0 |
| `SYSTEM_TERM` | `src/i18n/messages/` 키에 자주 등장하는 한국어 (재판관/심문/추궁/모순/쟁점/단계/판결/조정 등) | P0 |
| `DOMAIN_TERM` | 코퍼스에 N회 이상 등장하는 도메인 한국어 (블랙박스/오피스텔/위임장/공증/적금/이체/유서/유언장/연하장 등) | P1 |
| `PROPER_NOUN` | 지명, 기관명 (요양원, 공증사무소 등) | P2 |

#### 추출 알고리즘

1. CSV의 `ko` 컬럼을 전체 코퍼스로 결합
2. N-gram 기반 명사 후보 추출 (한국어 2~5자, 일본어/한자 키워드 토큰화)
3. 빈도 카운트 + 케이스별 분포
4. 케이스 메타데이터(`src/data/cases/generated/*.ko.json`)에서 명시적 라벨(`profile.name`, `evidence.label`, `dispute.label`, `witness.name`) 직접 추출 (이게 가장 신뢰도 높음)
5. 시스템 키워드 사전 (블랙박스/오피스텔/위임장/공증 등) 하드코딩으로 보강
6. 출력 시 빈도 5회 이상 또는 케이스 메타 명시 항목만 포함

#### 출력 형식

`docs/localization/non-dialogue-extract/glossary_candidates.csv`

```
term_id,category,ko,frequency,case_scope,sample_context_1,sample_context_2,sample_context_3,current_en,current_ja,current_zh,notes
PERSON-001,PERSON_NAME,윤태성,127,family-01,"윤태성의 발언 ""모시고 산 건 나인데...""",...,...,Yoon Tae-seong,ユン・テソン,尹泰成,
EVIDENCE-001,EVIDENCE,블랙박스 GPS 기록,42,spouse-01,...,...,...,Blackbox GPS record,ブラックボックスGPS記録,黑匣子GPS记录,한국 차량용 영상기록장치
SYSTEM-001,SYSTEM_TERM,재판관,2341,(global),...,...,...,Judge,裁判官,法官,중립 adjudicator 톤
...
```

규모 목표: 약 300~600 행. 너무 많으면 GPT Pro 한 세션 처리 어려움.

### 2. `scripts/split-translation-batches.cjs`

`translation_priority_inventory.csv` 19,252행을 다음 순서로 20개 배치 CSV로 분할한다.

| Batch | 행수 목표 | 묶음 |
|---|---|---|
| 01~04 | 약 1,000행씩 | **spouse-01** (모든 카테고리) — 출시 1순위 |
| 05~08 | 약 1,000행씩 | **family-01** |
| 09~12 | 약 1,000행씩 | **friend-01** |
| 13~14 | 약 1,000행씩 | global `ui_i18n_message` (979행) + 일부 `hardcoded_source_literal` |
| 15~16 | 약 1,000행씩 | global `hardcoded_source_literal` 잔여 |
| 17~20 | 약 1,000행씩 | global `non_party_scripted_text` + `judge_question_script` 잔여 |

원칙:
- 같은 카테고리/같은 `source` 파일은 같은 배치에 묶기 (컨텍스트 일관성)
- 같은 케이스의 같은 dispute/evidence 관련 항목은 같은 배치
- 행 순서는 원본 CSV 순서 유지 (반영 시 다시 합치기 쉽게)

출력:
- `docs/localization/non-dialogue-extract/batches/batch_01_spouse01_part1.csv` (1000행)
- `batch_02_spouse01_part2.csv` ...
- `batch_20_global_scripted_part4.csv`
- 각 배치 CSV에 `glossary-translation-brief.md`와 동일한 컬럼 구조 유지

추가 산출:
- `docs/localization/non-dialogue-extract/batches/MANIFEST.csv` — batch_id, file, rows, case_scope, categories 요약
- `docs/localization/non-dialogue-extract/batches/PROGRESS.md` — 진행 추적 템플릿 (각 배치 status: pending/in-gpt-pro/translated/applied/verified)

### 3. `scripts/verify-translations.cjs` (선행 작업)

번역 결과 반영 후 자동 검증할 스크립트의 기본 골격. 이번 의뢰에서 만들어두면 Phase 3에서 즉시 활용 가능.

검사 항목:
- placeholder 보존: `{count}`, `{party}`, `{name}`, `{phase}` 등이 모든 언어에 존재
- 빈칸 잔류: `en`/`ja`/`zh-CN` 컬럼 빈 행 카운트 (현재 다수 존재)
- CJK 잔류: `en` 컬럼에 한글/한자/카나 잔류 검출
- 글자수 폭증: `en` 길이가 `ko` 대비 250% 초과 (UI overflow 위험)
- 용어집 위배: `glossary_locked.csv` 기준 강제 매핑이 본문에 적용되지 않은 경우 검출

출력: 콘솔 요약 + `verify-report.json`

## 작업 제약

- ScriptedText 캐릭터 대화(`speaker: "a"`/`"b"`, `party: "a"`/`"b"`)는 절대 건드리지 않는다. 이미 `extract-non-dialogue-text.cjs`가 필터링했으므로 그 결과 CSV만 입력으로 사용한다.
- 새 의존성 추가 없이 Node 표준 라이브러리 + 기존 utility만 사용
- 모든 출력 파일은 `docs/localization/non-dialogue-extract/` 하위에 배치 (기존 structure 유지)
- npm run check:all 영향 0 (스크립트와 산출물만 추가)

## 진입 조건 / 마무리

- 작업 시작 전 `git status`로 working tree clean 확인 (untracked 포함)
- 작업 후 staged 상태로 두고 commit은 사용자가 직접
- 산출물 manifest: 위 3개 스크립트 + glossary_candidates.csv + 20개 batch CSV + MANIFEST.csv + PROGRESS.md

## 의뢰서 끝

문의: 이 의뢰서가 명확하지 않거나 추가 결정 필요 시 메인 ClaudeCode 세션으로 회신.
