# GPT Pro 5.5 Web 번역 작업 가이드

작성일: 2026-05-18
사용자가 직접 GPT Pro 5.5 Web에서 진행하기 위한 단계별 가이드.

## 전체 흐름

```
Phase 0: 사전 준비
  └─ Codex에 "codex-glossary-and-batch-task.md" 의뢰 → 산출물 받기
      ├─ glossary_candidates.csv (~500행)
      ├─ batches/batch_01~20.csv (각 ~1,000행)
      └─ scripts/verify-translations.cjs

Phase 1: 용어집 fix (1세션)
  └─ GPT Pro Web 새 대화 1회
      → glossary_locked.csv 받기
      → Codex에 검토 의뢰 (선택)

Phase 2: 본 번역 (20세션)
  └─ GPT Pro Web 배치 × 20회
      → 배치마다 *_translated.csv 받기
      → 누적 진행

Phase 3: 반영 + 자동 검증
  └─ Codex에 모든 번역 반영 + verify 의뢰
      → npm run check:all
      → PC 화면 QA
```

총 예상: GPT Pro Web 세션 약 21회.

---

## Phase 1: 용어집 fix

### Step 1-1. 새 대화 시작

GPT Pro Web에서 새 대화를 연다. 모델은 GPT-5 또는 5.5 (Pro 구독 한도 내 최고 모델).

### Step 1-2. 시스템 프롬프트 / 첫 메시지

아래를 복사해 첫 메시지에 붙여넣는다.

```
당신은 한국어 법정 추리 게임 "솔로몬"의 다국어 현지화 전문가다.

게임 컨텍스트:
- 플레이어는 재판관 역할로 두 당사자(A/B)의 심문, 증거 분석, 판결을 진행한다.
- 케이스 3종: spouse-01(부부 외도/금전 의혹), family-01(유산 분쟁), friend-01(친구 간 갈등).
- 톤은 진중한 법정 미스터리. 기계 번역 같은 직역체 금지.

이번 작업: 게임 전반에서 반복되는 핵심 용어집을 4개 언어로 fix한다.

대상 언어:
- en: 자연스러운 게임 UI/시스템 영어. 과한 legalese 금지.
- ja: 일본 법정 추리물 톤. 인명은 가타카나 또는 한자 음독 중 일관 선택.
- zh-CN: 간체 중국어. 인명은 한자 표기 통일.

규칙:
1. 인명: 케이스마다 한 캐릭터는 한 표기만. en은 hyphen 표기 통일 (예: Yoon Tae-seong).
2. 증거명: 게임 내 아이템처럼 들리게. 법률 문서 톤 금지.
3. 도메인 용어: 한국식 표현을 각국 현지화. 예시:
   - 블랙박스 (차량용) → en: dashcam / ja: ドライブレコーダー / zh: 行车记录仪
   - 오피스텔 → en: studio apartment (officetel) / ja: オフィステル / zh: 公寓办公楼 — 한국 설정이 중요한 경우만 officetel 유지
   - 재판관 → en: Judge (혹은 Adjudicator 단일 선택) / ja: 裁判官 / zh: 法官
   - 위임장 → en: power of attorney / ja: 委任状 / zh: 委托书
4. 시스템 용어 (심문/추궁/모순/쟁점/lieState 단계 등): 게임 메커니즘 용어로 짧고 명확하게.

지금 첨부하는 glossary_candidates.csv를 보고:
- 각 행의 ko를 game-natural 4언어로 번역
- 같은 행에 current_en/current_ja/current_zh가 있으면 참고하되 오역이면 교체
- 결과는 동일한 CSV 컬럼 구조로 반환 (term_id 순서 유지)
- 각 행 끝에 짧은 reviewer note (한국어) 추가 가능
```

### Step 1-3. CSV 첨부

`docs/localization/non-dialogue-extract/glossary_candidates.csv` 파일을 첨부한다.

### Step 1-4. 결과 받기

GPT Pro가 4개 언어 번역을 채운 CSV를 출력한다. 다운로드 또는 복사해 저장:

```
docs/localization/non-dialogue-extract/glossary_locked.csv
```

### Step 1-5. (선택) 검토 요청

Codex 또는 본 ClaudeCode 세션에 "glossary_locked.csv를 spot check해줘"라고 의뢰. 명백한 오역 또는 인명 표기 불일치 확인.

### Phase 1 완료 조건

- `glossary_locked.csv` 파일 존재
- 모든 P0 카테고리 항목 채워짐
- 명백한 오역 없음 (spot check 통과)

---

## Phase 2: 본 번역 (20배치)

### 배치별 동일 워크플로우

각 배치마다 GPT Pro Web 새 대화를 연다. 한 세션에 여러 배치 처리하면 컨텍스트 오염 위험.

### Step 2-1. 새 대화 시작 + 시스템 프롬프트

```
당신은 한국어 법정 추리 게임 "솔로몬"의 다국어 현지화 전문가다.

이번 작업: 비대화(non-dialogue) 텍스트 배치 번역.

게임 컨텍스트, 톤, 규칙은 첨부 파일 "gpt-pro-translation-brief.md" 참조.

용어 일관성:
첨부 "glossary_locked.csv"는 모든 배치 공통 용어집이다.
이 용어집에 정의된 ko 항목이 본문에 나타나면 반드시 glossary 매핑을 따른다.
예: glossary가 "블랙박스" → "dashcam"으로 정의했으면 "blackbox" 사용 금지.

작업:
첨부 "batch_NN_*.csv"의 모든 행에 대해 en/ja/zh-CN 컬럼을 재번역한다.

규칙:
1. id, category, source, case_id, key_path, ko 컬럼은 절대 수정 금지
2. placeholder {count}, {party}, {name}, {phase} 등은 모든 언어에서 정확히 보존
3. e-N, d-N, dc-N, w-N 같은 ID 접두는 그대로 유지하고 뒤 텍스트만 번역
4. 빈 ko에 대해서는 영어/일본어/중국어도 빈 칸 유지
5. UI 라벨은 짧고 명확. 시스템/재판관 텍스트는 자연스럽되 통제된 톤.
6. 같은 한국어 문구가 같은 배치 안에 여러 번 나오면 같은 번역 사용

결과는 입력과 동일한 컬럼 구조, 동일 행 순서로 반환.
출력 형식: CSV. 셀에 쉼표/줄바꿈 포함 시 큰따옴표 escape 준수.
```

### Step 2-2. 3개 파일 첨부

1. `gpt-pro-translation-brief.md` (Codex가 이미 만든 brief)
2. `glossary_locked.csv` (Phase 1 결과)
3. `batches/batch_NN_*.csv` (이번 배치)

### Step 2-3. 결과 받기

결과 CSV를 다음 위치에 저장:

```
docs/localization/non-dialogue-extract/batches/translated/batch_NN_*_translated.csv
```

### Step 2-4. 진행 추적

`batches/PROGRESS.md`의 해당 배치 status를 `translated`로 업데이트.

### 배치 순서 (출시 우선순위)

| 차수 | 배치 | 케이스 | 소요 추정 (GPT Pro 1세션당 약 30~60분) |
|---|---|---|---|
| 1 | 01~04 | spouse-01 | 약 2~4시간 |
| 2 | 05~08 | family-01 | 약 2~4시간 |
| 3 | 09~12 | friend-01 | 약 2~4시간 |
| 4 | 13~16 | global UI / hardcoded | 약 2~4시간 |
| 5 | 17~20 | global scripted | 약 2~4시간 |

**spouse-01 4배치만 완료해도 핵심 출시 흐름은 번역 가능.** 차수별로 끊어서 진행해도 됨.

### 중간 중단 안전성

- 배치 단위 독립이라 언제든 중단/재개 가능
- 다음날 이어가도 glossary가 fix되어 있어 일관성 유지

### Phase 2 완료 조건

- 20개 `*_translated.csv` 파일 존재
- `PROGRESS.md`의 모든 배치 status가 `translated`

---

## Phase 3: 반영 + 자동 검증

### Step 3-1. Codex 반영 의뢰

Codex에 아래 의뢰서를 던진다.

```
의뢰: 번역 반영 + 자동 검증

선행: docs/localization/non-dialogue-extract/batches/translated/*.csv 20개
사용 스크립트: scripts/verify-translations.cjs (선행 의뢰에서 작성)

작업:
1. 20개 translated CSV를 원본 source 파일에 반영
   - src/i18n/messages/*.ts: 키 매핑 기반
   - src/i18n/runtimeText.ts: 키 매핑 기반
   - src/data/cases/generated/{case}.{locale}.json: 경로 기반
   - hardcoded literal: 해당 .ts/.tsx 파일 직접 교체
2. verify-translations.cjs 실행 → verify-report.json 확인
3. 위반 사항 (placeholder 누락 / CJK 잔류 / 용어집 위배 / 빈칸) 수정
4. npm run check:all 실행
5. npm run dev:pc 띄우고 spouse-01 핵심 화면 5종 PC QA
   (홈 / 사건 선택 / Phase 1 진술 / 핫바 심문 / 판결 화면)

진입 조건: working tree clean
산출 commit은 사용자가 직접 (Codex는 staged 상태로 둠)
```

### Step 3-2. PC QA spot check (사용자 직접)

Codex 작업 완료 후 사용자가 직접 확인:
- spouse-01 진입 → 화면 5종 시각 확인
- 언어 전환 메뉴에서 en/ja/zh-CN 전환 → 핵심 라벨 자연스러운지
- UI overflow 없는지

### Phase 3 완료 조건

- verify-report.json 위반 0
- npm run check:all 통과
- PC QA spot check 통과
- commit 완료 (사용자)

---

## 트러블슈팅

### GPT Pro Web 출력이 잘렸을 때
- "이어서 동일 형식으로 continue" 요청
- 또는 배치를 더 작게 (500행) 다시 자르기

### 용어집 위배가 검출됐을 때
- verify-report.json에서 위배 행 확인
- 해당 배치만 다시 GPT Pro에 던져서 재번역
- glossary_locked.csv 자체에 누락 있으면 Phase 1 보강 후 영향 배치 재작업

### 빈칸이 그대로 남았을 때
- 원본 `ko`가 비어있는 경우는 의도적 — 그대로 둠
- 원본 `ko`가 있는데 빈칸이면 해당 배치 재번역

### 인명 표기 불일치 (같은 인물 다른 표기)
- glossary_locked.csv를 권위로 두고 일괄 교체
- Codex에 "case_id={X}의 인명 ko={Y}는 모든 언어에서 glossary 표기 강제" 의뢰

---

## 참고 파일

- `gpt-pro-translation-brief.md` — Codex가 만든 원본 brief (Phase 2에서 첨부)
- `translation_priority_inventory.csv` — 원본 19,252행 (Codex가 만든 1차)
- `codex-glossary-and-batch-task.md` — Codex 의뢰서 (Phase 0)
- `README.md` — 추출 스크립트 사용법
