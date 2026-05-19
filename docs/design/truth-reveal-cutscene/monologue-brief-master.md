# Truth Reveal Cutscene — Monologue Master Brief

작성: 2026-05-20
디자인 권위: [tmp/cutscene-mockup-v5.html](../../../tmp/cutscene-mockup-v5.html)

## 배경

진실 발견 경로 3가지(신뢰 자백 / 감정 슬립 / 증인 경로)별 컷씬 시스템 도입. 각 경로별 캐릭터 monologue + closure 카드 truth statement 작성 필요. 4-lang 동시 작성.

## 3 thread 분할

| Thread ID | Case | Output dir |
|---|---|---|
| TR1 | friend-01 | `src/data/cutsceneText/friend-01/` |
| TR2 | family-01 | `src/data/cutsceneText/family-01/` |
| TR3 | spouse-01 | `src/data/cutsceneText/spouse-01/` |

각 thread는 자기 case만 처리.

---

## §0. 작업 범위 (per case)

각 dispute (d-1 ~ d-5 / h-d3 / h-d4)에 대해 다음 entries 작성:

### A. 신뢰 자백 monologue (variant A) — `confession_trust`
- 캐릭터 lieState S5 자연 도달 시 표시
- **본인 마음 열어 100% 진실 자세히 털어놓음** (3~5문장 권장)
- 감정 톤: 차분, 무거움, 체념 후 시인
- 4-lang 동등 의미 + 자연 발화

### B. 감정 슬립 (variant B) — `slip_explosive`
- 격앙 상태에서 실수 누설 (2-phase 구조)
- **phase-1 (`slip_phase1`)**: 진실 일부 흘림 (1~2문장, 말줄임표로 끝남)
- **phase-2 (`slip_phase2`)**: 변명 시도 (짧은 1문장, "아니, 그런 뜻이 아니라—" 같이 끊김)
- 감정 톤: 격앙→당황 전환, italic
- linkedDisputeId: 같은 evidence 공유 다른 dispute (engine 자동 계산)

### C. 증인 경로 시인 (variant C) — `admission_witness`
- 증인 진술 충격 후 시인 (route별 분기: trust / emotion)
- **2 sub-variant**: `admission_witness_trust` (라포 충분) / `admission_witness_emotion` (격앙)
- 본인 인정 형태 (자백보다 짧음, 2~3문장)
- 4-lang 동등

### D. Closure card truth statement — `closure_truth`
- 해당 dispute의 `judgmentStatement` + `truthDescription` 기반
- 컷씬 closure 단계에 표시되는 한 줄 요약 (2~3문장)
- 객관적 톤 (재판관 시점)
- 4-lang 동등

---

## §1. 출력 형식

각 dispute 1개당 단일 JSON file (4-lang nested):

```jsonc
// src/data/cutsceneText/friend-01/d-3.json (예시)
{
  "disputeId": "d-3",
  "case": "friend-01",
  "confession_trust": {
    "ko": "…사실, 저는 다은이 아버지가 또 같은 패턴을 시작했다는 걸 알고 있었어요. 그래서 예비신랑께 직접 경고하려 했습니다. 다은이를 같은 일에서 지키고 싶었습니다.",
    "en": "...",
    "ja": "...",
    "zh-CN": "..."
  },
  "slip_explosive": {
    "phase1": {
      "ko": "…그쪽 아버지가 돈 갚을 마음 없다는 거, 저는 진작부터…",
      "en": "...", "ja": "...", "zh-CN": "..."
    },
    "phase2": {
      "ko": "아니, 그런 뜻이 아니라—",
      "en": "...", "ja": "...", "zh-CN": "..."
    },
    "linkedDisputeId": "d-4"
  },
  "admission_witness_trust": {
    "ko": "…다은이가 그 자리에 있었군요. 인정합니다. 다은이 아버지께서 결혼 자금 얘기를 꺼내신 걸 듣고, 제가 직접 경고에 나섰습니다.",
    "en": "...", "ja": "...", "zh-CN": "..."
  },
  "admission_witness_emotion": {
    "ko": "…더는 못 버티겠어요. 맞아요. 저는 그 자리에서 직접 경고했어요. 다은이를 위해서.",
    "en": "...", "ja": "...", "zh-CN": "..."
  },
  "closure_truth": {
    "ko": "송다은 아버지의 돈 접근 패턴은 과거와 현재가 같았다. 최수민은 과거 경험을 바탕으로 예비신랑에게 경고하려 했다.",
    "en": "...", "ja": "...", "zh-CN": "..."
  }
}
```

### Output paths
```
src/data/cutsceneText/{case}/{disputeId}.json
```

friend-01 d-1 ~ d-5 = 5 files / family-01 d-1 ~ d-5 = 5 files / spouse-01 d-1, d-2, h-d3, h-d4 = 4 files. **총 14 files × 4-lang × 4-5 entry types = ~280 entries**.

---

## §2. Source 참조 (READ-ONLY)

각 thread는 다음 파일을 참조 (수정 절대 X):

```
src/data/cases/generated/{case}.json  ← truth, truthDescription, judgmentStatement, hidden, surface, party archetype, verbalTells
src/data/scriptedText/{case}.json     ← dossier confession late variants 톤 참고
src/data/scriptedText/{case}.{lang}.json  ← 외국어 톤 일관 참고
docs/localization/non-dialogue-extract/truth-leak-matrix.json  ← hidden keyword 본성 정책
```

매트릭스 hidden keyword를 그대로 텍스트에 사용 가능 — 자백/시인은 진실 노출 영역이므로 leak 정책 적용 X. **단 phase1 slip은 linkedDispute 영역 추론 단서이지 직접 누설 X (모호한 흘림 형태)**.

---

## §3. 작성 정책

### 3.1. 9차원 의미 보존
- lieState S5 = 완전 시인 / mid-band partial 자백 텍스트 X
- archetype 일관: victim_cosplay / avoidant / dom 등 캐릭터 본성 유지
- 9차원 = lieState / archetype / tone / register / disclosure / continuity / rapport / emotion / stance

### 3.2. 자연 한국어
- "축이 뒤집힌다 / 구도가 무너진다" 신문체 절대 회피
- 일상 발화 우선

### 3.3. 진실 노출 정책 (case별 다름)
- **spouse-01**: `가족 돌봄` / `개인회생 중인 형` / `형사 절차` 직접 사용 X. confession_trust에서는 행위(위임장 조작, 비자금, 형 사업 영역) 중심으로 노출
- **family-01**: 형 보호하려 어머니 뜻 고쳐 쓰려 함 — 행위 중심
- **friend-01**: 예비신랑 돈 얘기 + 과거 패턴 — 행위 중심

### 3.4. 4-lang 동등 의미
- 직역 X. paraphrase 허용 단 의미 손실 0
- 외국어 자연 발화 (블랙박스 등 문화 해석 차이 어휘 audit)
- 존댓말 시스템: KO 존댓말 → EN flat 자연 / JA 敬語 / ZH 礼貌语 적절 매핑
- 인명/지명 glossary 100% 준수

### 3.5. 길이 가이드
- confession_trust: 60~120자 KO (3~5문장)
- slip_phase1: 30~60자 KO (1~2문장 + 말줄임)
- slip_phase2: 10~25자 KO (변명 끊김)
- admission_witness_*: 40~80자 KO (2~3문장)
- closure_truth: 50~100자 KO (객관 진술)

각 외국어 길이는 KO 대비 +20% 허용.

---

## §4. 진입 조건

| 항목 | 조건 |
|---|---|
| **shared worktree 안전** | `src/data/cutsceneText/{case}/` 신규 디렉토리에만 작성. 다른 src/ 수정 절대 X. |
| 작업 시작 전 | `git status --short` 결과 기록 |
| source 파일 | `src/data/cases/generated/{case}.json` 존재 + `src/data/scriptedText/{case}.json` 존재 |
| 다른 thread 충돌 | 다른 case 디렉토리 절대 손대지 X |

---

## §5. 작업 흐름

1. 진입 조건 확인 (§4)
2. case data 파악 — disputes 목록 / truthDescription / hidden 매트릭스 / archetype / verbalTells
3. 각 dispute에 대해 §0 A~D entries 4-lang 작성
4. JSON 파일 출력 (`src/data/cutsceneText/{case}/{disputeId}.json`)
5. 자기 thread 완료 commit — `git add src/data/cutsceneText/{case}/` + commit `Add truth-reveal cutscene monologues — {case}`

**절대 X**:
- 다른 src/ 파일 수정
- 다른 case 디렉토리 손대기
- truth-leak hidden keyword 매트릭스 수정
- glossary 수정

---

## §6. 검토 흐름

각 thread 완료 시:
1. Codex worktree commit + push
2. Claude 메인 검토 (9차원 의미 보존 + 4-lang 동등 + 길이 가이드 준수)
3. 승인 후 cherry-pick → main
4. cherry-pick 후 회귀 검증 (verify-translations / detect-truth-leak 변동 X)

---

## §7. 메모리 참조

- `feedback_truth_leak_prohibition.md` — 진실 누설 금지
- `design_truth_leak_keyword_nature.md` — hidden keyword 본성 (행위/사실)
- `design_spouse01_truth_disclosure_policy.md` — spouse-01 정책
- `feedback_revision_meaning_over_form.md` — 9차원 의미 보존
- `feedback_natural_korean_vs_translationese.md` — 자연 한국어
- `feedback_claude_ko_needs_codex_multilang.md` — 4-lang 일관 정책
