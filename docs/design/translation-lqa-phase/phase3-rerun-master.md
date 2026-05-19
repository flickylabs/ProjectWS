# Phase 3 LQA Rerun — Master Brief (12 thread)

작성: 2026-05-20
상위 문서: [execution-plan-v2.md](execution-plan-v2.md)
선행: Phase 2 cycle 완료 (truth-leak baseline 0, verify-report 60,333 issues).

## 배경 (Why this rerun)

Phase 2 LQA에서 (1) spouse-01은 반복 검증되었으나 friend-01 / family-01 검증 깊이 부족, (2) 본 세션에서 truth-leak hidden keyword 본성 분류 정책 변경 (16건 제거 + mid-band tag 정리 + stance:admit redundant 제거), (3) spouse-01 진실 노출 정책 명확화 (가족/개인회생/형사 절차 = 진실 노출 전 등장 X). 이 정책 변경 후 전체 3 case × 4-lang 일관 재검증 필요.

## 12 thread 분할

| Thread ID | Case | Lang | Output |
|---|---|---|---|
| T1  | friend-01 | KO    | `reports/phase3-rerun_friend-01_ko.csv` |
| T2  | friend-01 | EN    | `reports/phase3-rerun_friend-01_en.csv` |
| T3  | friend-01 | JA    | `reports/phase3-rerun_friend-01_ja.csv` |
| T4  | friend-01 | ZH-CN | `reports/phase3-rerun_friend-01_zh-CN.csv` |
| T5  | family-01 | KO    | `reports/phase3-rerun_family-01_ko.csv` |
| T6  | family-01 | EN    | `reports/phase3-rerun_family-01_en.csv` |
| T7  | family-01 | JA    | `reports/phase3-rerun_family-01_ja.csv` |
| T8  | family-01 | ZH-CN | `reports/phase3-rerun_family-01_zh-CN.csv` |
| T9  | spouse-01 | KO    | `reports/phase3-rerun_spouse-01_ko.csv` |
| T10 | spouse-01 | EN    | `reports/phase3-rerun_spouse-01_en.csv` |
| T11 | spouse-01 | JA    | `reports/phase3-rerun_spouse-01_ja.csv` |
| T12 | spouse-01 | ZH-CN | `reports/phase3-rerun_spouse-01_zh-CN.csv` |

각 thread는 자기 (case, lang) 한 쌍만 처리. 다른 thread output에 절대 손대지 않음.

---

## §0. 진입 조건 (모든 thread 공통)

| 항목 | 조건 |
|---|---|
| **shared worktree 안전** | `src/` 절대 수정 X. 출력은 단일 CSV 파일 1개 + 선택적으로 thread별 summary md 1개. |
| 작업 시작 전 | `git status --short` 결과 기록 |
| 도구 | `scripts/verify-translations.cjs` + `scripts/detect-truth-leak.cjs` 둘 다 존재 |
| KO baseline | `docs/design/translation-lqa-phase/ko-baseline-signoff.md` 존재 |
| glossary | `docs/localization/non-dialogue-extract/GPT_Result/glossary_locked.csv` 존재 |
| matrix | `docs/localization/non-dialogue-extract/truth-leak-matrix.json` 최신본 (HEAD `b3e9a716`+ 영역) |
| 충돌 | 다른 thread 출력 (`reports/phase3-rerun_*.csv`) 절대 수정 X |

진입 조건 미충족 시 즉시 중단 + 메인 세션에 알림.

---

## §1. 검수 차원 (3 영역)

### (1) 한국어 기준 상세 체크 (KO thread = T1/T5/T9 중점, 외국어 thread는 KO 기준 의미 보존 확인)

**본 세션 학습 영역 (2026-05-20 신규 정책)**:

1. **truth-leak hidden keyword 본성**: 행위/사실만 등록. 동기/태도/자기방어 진술/해석은 제거됨. 신규 검출 시 분류 기준:
   - 행위(act) / 사실(fact) = leak 검증 대상 ✅
   - 동기/태도/자기방어/해석/내심/추상 패턴 = 검출 영역 아님 ❌
   - 자세한 분류는 [design_truth_leak_keyword_nature.md](../../localization/non-dialogue-extract/truth-leak-matrix.json#L4) authoring_rules 참조

2. **자연 한국어 vs 번역체**: 임팩트 카피/시스템 메시지에서 "축이 뒤집힌다 / 구도가 무너진다" 신문체 절대 회피.

3. **자백 본질**: 행위 시인 = 자백. 가치관/태도 표명 ≠ 자백.

4. **9차원 보정 기준**: lieState 단계 / archetype / tone / register / disclosure / continuity / rapport / emotion / stance.

### (2) 외국어 적용 검사 (T2/T3/T4 등 외국어 thread 중점)

**문화 해석 차이 영역 audit (필수)**:

- **블랙박스(blackbox)** 같은 외국어 흡수 어휘: KO에서 의미 명확하지만 EN/JA/ZH-CN 화자에게 다른 해석 가능성. **case별 등장 키워드 audit + 적절한 대체어 또는 설명 부여**
- **법률 용어**: 한국 민사 분쟁 frame이 EN common law / JA 民事訴訟 / ZH 民事诉讼 frame에서 동등하지 X. 의미 보존 + 문화 자연성 균형
- **인명/지명**: glossary 100% 준수. 분기 0건
- **존댓말 시스템**: KO 존댓말이 EN flat / JA 敬語 / ZH 礼貌语에 1:1 매핑 X. archetype별 적절 톤 매핑
- **추궁 표현**: 재판관의 추궁 문체가 외국어 화자에 무례하지 않게

### (3) 진실 누설 정적 분석 한계 영역 (모든 thread 필수)

`detect-truth-leak.cjs`는 substring 매칭 한계. 정적 분석으로 못 잡는 영역:

- **lieState 단계**: 같은 keyword라도 S5 자백 vs S2 사전 진술 등장 의미 다름. variant id로 단계 추정 + 단계별 적절성 검수
- **evidence unlock 단계**: 증거 조합/제시 전 vs 후 등장 정합성
- **archetype 일관**: victim_cosplay / avoidant 등 캐릭터별 표현 일관성
- **lieBand 진행**: early/mid/late 표현 차이 (예: late만 행위 시인 OK)
- **dossier confession path**: late confession only인 영역에서 mid-band 자백 등장 검출
- **spouse-01 특별 정책**: `가족 돌봄` / `개인회생 중인 형` / `형사 절차` = 진실 노출 전 등장 X. 가족 언급 = 형 사업으로 부모님 재산 영역에서만. (자세히는 [design_spouse01_truth_disclosure_policy.md](../../../C:/Users/user/.claude/projects/d--ProjectWS/memory/design_spouse01_truth_disclosure_policy.md) 참조)

---

## §2. 출력 양식

각 thread = 단일 CSV (`reports/phase3-rerun_{case}_{lang}.csv`):

```
row_id,channel,key,severity,issue_dim,kr_snippet,target_snippet,recommendation,note
```

- `row_id`: 파일 경로 + JSON path
- `channel`: dialogue / scriptedText / scriptedAngles / mediation / aftermath / dossier / etc
- `key`: variant id 또는 entry key
- `severity`: P0 (진실 누설/의미 뒤바뀜) / P1 (톤/nuance/일관) / P2 (자연성/스타일)
- `issue_dim`: D1~D6 + 추가 (lieState / archetype / cultural)
- `kr_snippet`: KO 원문 발췌 (외국어 thread는 비교 기준)
- `target_snippet`: 대상 언어 발췌 (KO thread는 동일 KO)
- `recommendation`: 제안 수정안 (직접 적용 가능 형태)
- `note`: 검수 근거 짧게

각 thread 끝에 summary md 1개도 가능 (선택): `phase3-rerun-{case}-{lang}-summary.md` — 발견 영역 정성 정리, ~50줄.

---

## §3. 표본 사이즈 (참고)

- **KO thread (T1/T5/T9)**: 전수 (자체 자연성 + 본 세션 정책 일치 audit)
- **외국어 thread (T2~T4, T6~T8, T10~T12)**: KO baseline에 매핑되는 외국어 전 entries. 표본 X, 전수.

각 thread 작업량 (대략):
- friend-01: 5 disputes × ~30 variants × 5 channels ≈ 750~1500 entries
- family-01: 5 disputes × ~30 variants × 5 channels ≈ 750~1500 entries
- spouse-01: 4 disputes × ~30 variants × 5 channels ≈ 600~1200 entries

→ thread당 P0 발견 추정 5~30 entries / P1 30~80 entries / P2 30~80 entries.

---

## §4. 작업 진행 흐름

1. **진입 조건 확인** (§0)
2. **scope 파일 파악** — `src/data/scriptedText/{case}.{lang}.json` + `src/data/scriptedAngles/{case}_*.{lang}.json` + `src/data/dialogues/phase1/{case}.{lang}.json` + `src/data/dialogues/mediation/{case}-v3-01.{lang}.json` + `src/data/cases/generated/{case}.{lang}.json`
3. **§1.(1) KO 영역 audit** (KO thread만, 외국어 thread는 skip 또는 KO 비교 영역만)
4. **§1.(2) 외국어 적용 검사** (외국어 thread만)
5. **§1.(3) 진실 누설 정적 분석 한계 영역 audit** (모든 thread)
6. **CSV 출력 + summary md** (`reports/`)
7. **자기 thread 완료 commit** — `git add reports/phase3-rerun_{case}_{lang}.csv` + commit `LQA Phase 3 rerun audit — {case} {lang}`

**절대 X**:
- `src/` 수정
- 다른 thread 출력 손대기
- glossary 임의 변경
- matrix 수정

---

## §5. 검토·승인 흐름

각 thread 완료 시:
1. Codex가 worktree commit + push
2. Claude 메인이 결과 CSV 검토
3. 승인 후 cherry-pick → main
4. cherry-pick 후 자동 회귀 검증 (verify-translations 회귀 X / detect-truth-leak baseline 유지)
5. **CSV의 recommendation을 실제 src/ 적용**은 별도 cycle (다른 Codex thread 또는 Claude 직접) — 본 thread 영역 X

---

## §6. 의문 영역 처리

검수 중 의문이 들면:
- 정책 의문: KO thread (T1/T5/T9) 결과 우선 참조
- 외국어 의문: 다른 외국어 thread와 일관 (예: friend-01 EN의 표현이 friend-01 JA에서도 동일 패턴 보이는지)
- 명확하지 않으면 `note` 컬럼에 "FOR-REVIEW: ..." 표시 + Claude 메인 검토 대기

---

## §7. 메모리 참조

본 세션 학습 영역 (Codex가 KO/외국어 audit 시 활용):

- `feedback_truth_leak_prohibition.md` — 진실 누설 금지 핵심 원칙
- `design_truth_leak_keyword_nature.md` — hidden keyword 본성 분류 (행위/사실 vs 동기/태도) **신규 2026-05-20**
- `design_spouse01_truth_disclosure_policy.md` — spouse-01 가족/개인회생/형사 절차 정책 **신규 2026-05-20**
- `feedback_natural_korean_vs_translationese.md` — 자연 한국어 vs 번역체
- `feedback_revision_meaning_over_form.md` — 9차원 의미 보존
- `feedback_translation_pipeline_placeholder_leak.md` — 번역 pipeline placeholder fallback 패턴
