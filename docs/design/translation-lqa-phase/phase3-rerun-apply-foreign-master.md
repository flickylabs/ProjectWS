# LQA Phase 3 Rerun — Foreign-language P0 Apply Brief

작성: 2026-05-20
세션: KO 106 P0 적용 완료 후속 (commits 6b496adf / 2170a2d3 / c4cdb757)

## 배경

`docs/design/translation-lqa-phase/reports/phase3-rerun_{case}_{lang}.csv` 12개 audit 결과 중 KO 106 P0는 Claude가 자동 패치 적용 완료. EN/JA/ZH-CN 73 P0는 *retranslation* 작업 — `recommendation` 컬럼이 새 외국어 텍스트가 아니라 **"이렇게 다시 번역하라"는 작업 지시문**이고, 일부 row는 `variants[0,1,4]` / `variants[*]` wildcard 형태로 묶여 있어 native 4-lang 작성자가 직접 처리해야 한다.

KO 보정분이 이미 main HEAD에 들어가 있으므로 외국어 batch는 KO를 reference로 두고 *의미 동등* + *native 자연도* + *진실 노출 정책*을 살린 새 외국어 텍스트를 작성한다.

## 9 thread 분담

| Thread | Case | Lang | P0 | multi | 변경 파일 |
|---|---|---|---|---|---|
| FA1 | spouse-01 | en | 8 | 6 | `src/data/scriptedText/spouse-01.en.json` |
| FA2 | spouse-01 | ja | 5 | 4 | `src/data/scriptedText/spouse-01.ja.json` + `src/data/scriptedAngles/spouse-01_interrogation_answers.ja.json` |
| FA3 | spouse-01 | zh-CN | 9 | 3 | `src/data/scriptedText/spouse-01.zh-CN.json` + `src/data/dialogues/phase1/spouse-01.zh-CN.json` |
| FA4 | family-01 | en | 10 | 9 | `src/data/scriptedText/family-01.en.json` + `src/data/cases/generated/family-01.en.json` |
| FA5 | family-01 | ja | 6 | 5 | `src/data/scriptedText/family-01.ja.json` + `src/data/cases/generated/family-01.ja.json` |
| FA6 | family-01 | zh-CN | 12 | 0 | `src/data/scriptedText/family-01.zh-CN.json` + `src/data/cases/generated/family-01.zh-CN.json` |
| FA7 | friend-01 | en | 11 | 0 | `src/data/scriptedText/friend-01.en.json` + `src/data/scriptedAngles/friend-01_interrogation_answers.en.json` |
| FA8 | friend-01 | ja | 5 | 3 | `src/data/scriptedText/friend-01.ja.json` + `src/data/scriptedAngles/friend-01_interrogation_answers.ja.json` |
| FA9 | friend-01 | zh-CN | 7 | 5 | `src/data/scriptedText/friend-01.zh-CN.json` + `src/data/cases/generated/friend-01.zh-CN.json` |

총 73 P0. 각 thread는 *자기 case×lang* 영역만 처리. 다른 lang/case 절대 손대지 X.

## 작업 흐름 (per thread)

1. 진입 조건 확인 (§4)
2. 자기 CSV 읽기: `docs/design/translation-lqa-phase/reports/phase3-rerun_{case}_{lang}.csv`. severity=`P0` row만 작업.
3. 각 row에 대해:
   - `row_id`로 변경 위치(JSON path) 식별
   - `target_snippet`(외국어 현재 텍스트) 확인 + `kr_snippet`(KO 원문) 참조
   - `recommendation`(작업 지시문) + `note`(맥락) 읽고 정책 이해
   - 같은 KO 영역의 main HEAD 텍스트를 reference (`src/data/cases/generated/{case}.json` / `src/data/scriptedText/{case}.json` 등). KO는 이미 보정 적용된 상태.
   - **새 외국어 텍스트 작성** — KO 보정과 의미 동등 + native 자연도 + 진실 노출 정책 적용
   - multi-variant (`variants[0,1,4]` 형식): 모든 listed index에 같은 새 텍스트 적용 (다양성 손실 의도 — Codex audit 의도 그대로)
   - wildcard (`variants[*]`): 해당 entries의 *모든* variant에 같은 새 텍스트 적용
4. 변경 사항 commit: `Apply LQA P3 rerun P0 fixes — {case} {LANG} ({P0_count})`
5. 자기 branch에 push: `codex/p3-apply-foreign-{case}-{lang}`

**절대 X**:
- 다른 case 디렉토리 손대기
- KO 파일(`{case}.json` 그 자체) 수정 (이미 main에 적용됨)
- glossary.csv 수정
- truth-leak-matrix.json 수정
- src/ 코드 파일 수정

## 정책

### 1. 의미 동등 + native 자연도
- KO 보정안(main HEAD)과 같은 의미를 외국어로 paraphrase. 직역 X.
- native 자연 발화. EN 신문체 / JA 翻訳調 / ZH 翻译腔 회피.
- KO 존댓말 시스템 → EN flat respectful / JA 敬語 / ZH 礼貌语 자연 매핑.

### 2. Glossary 100% 준수
- `docs/localization/glossary.csv` 인명/지명/사건명 일관성 유지.

### 3. 진실 노출 정책 (case별)
- **spouse-01**: `family` / `personal rehabilitation (개인회생)` / `criminal procedure (형사 절차)` / `in-laws (시댁)` keyword는 reveal:none 영역에서 사용 X. recommendation의 note 컬럼에 정책 위반 본성 명시되어 있음.
- **family-01**: 형 보호 동기 keyword는 reveal:none에서 사용 X.
- **friend-01**: "예비신랑이 먼저 사적인 말을 꺼냈다" 같은 d-2 접근 주체/거절 행위는 reveal:partial 이상에서만.
- 자세한 본성: `recommendation` 컬럼 + `note` 컬럼 참조.

### 4. Multi-variant 처리
- 한 row에 `variants[0,1,4].text` 형태 → 3 variant 모두 *같은* 새 외국어 텍스트로 통일.
- 다양성 손실은 *의도된 정책* — audit이 통일 권고로 처리한 것이라 보존.

### 5. Wildcard 처리
- `variants[*].text` → 해당 entry의 *모든* variant에 같은 새 텍스트 적용.

### 6. 금액 정정 (case spouse-01)
- A의 공동 적금 해지액: `2,000만 원` (다른 금액 등장 시 정정)
- B의 개인 계좌 현금 인출: `3,000만 원`
- KO 보정분에 이미 적용. 외국어도 동일하게 적용 (e.g., EN: "20 million won" / "30 million won", JA: "2,000万ウォン" / "3,000万ウォン", ZH: "2000万韩元" / "3000万韩元").

## 진입 조건

| 항목 | 조건 |
|---|---|
| **shared worktree 안전** | `src/data/{scriptedText,scriptedAngles,cases/generated,dialogues/phase1}/{case}.{lang}.json`만 수정. 다른 src/ 영역 절대 X. |
| 시작 전 | `git status --short` 결과 clean (`git pull` 필수, base=main HEAD c4cdb757 이상) |
| Reference | KO 보정 분은 main HEAD에 이미 적용. KO 텍스트를 *현재 상태*로 읽고 의미 동등 외국어 작성. |
| 다른 thread | 다른 case×lang 디렉토리 절대 손대기 X (병렬 9 thread shared base 가능) |

## 출력

각 thread 1 commit:

```
Apply LQA P3 rerun P0 fixes — {case} {LANG} ({P0_count})

Applies all {P0_count} P0 rows from phase3-rerun_{case}_{lang}.csv via
retranslation. Each row's existing target_snippet is replaced with a
native {LANG} text equivalent to the KO main-HEAD revision, following
the recommendation note's policy guidance.

Multi-variant rows ({multi_count}) apply the same new text to every
listed variant index — unification is intentional per audit guidance.

Sources touched:
  {list of files + counts}
```

## 검토 흐름

각 thread 완료 시:
1. Codex worktree commit + push
2. Claude 메인 검토 (의미 동등 + native 자연도 + glossary + 정책 + 길이)
3. 승인 후 cherry-pick → main
4. cherry-pick 후 `npm run qa:lqa` strict + `npm run qa:fast` 검증

## 관련 메모리

- `feedback-truth-leak-prohibition` — 진실 누설 금지 핵심 원칙
- `design-truth-leak-keyword-nature` — hidden keyword 본성 분류
- `design-spouse01-truth-disclosure-policy` — spouse-01 정책
- `feedback-revision-meaning-over-form` — 9차원 의미 보존
- `feedback-natural-korean-vs-translationese` — translationese 회피 (외국어도 동일 원칙)
- `feedback-claude-ko-needs-codex-multilang` — KO 단독 변경 후 외국어 후속 batch 표준
