# REQUEST — GPT Pro Stage 1: P0-evidence-stage-gate Patch 본문 생성

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**상위 의뢰서**: `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (commit `3973ac6`)
**기준 SHA**: `439cb5b` Expand runtime QA gate to all cases
**대상 단계**: **Stage 1 / P0-evidence-stage-gate (122건)**
**작업 본질**: Detection 결과 122건 finding × 동형 패턴 7 클러스터 → finding별 patch 본문 생성

---

## 1. 본질

상위 v2 의뢰서의 Stage 1을 닫기 위한 **GPT Pro 단일 세션** 의뢰입니다. Codex-Dev가 122건을 임의로 대량 창작하지 않도록, GPT Pro가 finding별 교체문을 생성하고 Claude/CT가 한국어·게임 정합 보정을 거친 뒤 Codex-Dev가 적용·검증·commit합니다.

scope:
- P0-evidence-stage-gate 122건만
- P0-disclosure-gate / P0-surface-name-gate / RC4 / P1 / P2 X
- runtime 코드 / 정책 docs / Gate runner / baseline anchor X
- 다른 사건(`_LEGACY_84CASES_*`) X

본 의뢰서가 GPT Pro에 전달하는 입력은 dataset JSON 한 건이며, 출력도 Codex-Dev 적용용 JSON 한 건입니다.

---

## 2. 입력 자료

### 2.1 Dataset (필수)
- `tmp/REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate-dataset.json`
- 122 items / 7 cluster 정렬 / finding당 14 필드

### 2.2 정책 / 게임 핵심
- `docs/disclosure-policy.md` v1.1 (§4.1·4.2·4.3 paraphrase / §3.2·3.3 Truth Throttle 매트릭스 / §5.2 lieState)
- `docs/information-surface-policy.md` v1.1 (§2.1 surface-only / §2.6 VFX / §5.5 fallback)
- `CLAUDE.md` (게임 핵심 / 한국어 품질 / "진실은 플레이어가 직접 밝혀낸다" 원칙)
- `docs/spot-check-format.md` (8필드)

### 2.3 Detection / Phase A audit
- `tmp/qa-runtime-gate-results/findings.json` (1,914 findings 전체)
- `tmp/qa-runtime-gate-results/patch-priority.md`
- `tmp/qa-runtime-gate-results/{spouse-01,family-01,friend-01}-summary.md`
- `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md` (RC2 root cause)

### 2.4 Superseded
- `tmp/REQUEST-Codex-Integrated-Script-Patch-Spouse-01-P0.md` (`6643035` / 보존만, 진입 X)

### 2.5 메모리 / 잘못 패턴 (운영 Claude memory — repo-local 파일 X)
> CT-Main이 본 의뢰서를 GPT Pro 세션에 전달할 때 아래 항목 본문을 함께 동봉합니다.

- `feedback_revision_meaning_over_form` (#6 9차원 의미 정확성)
- `feedback_truth_leak_prohibition` (#9 진실 누설 금지)
- `feedback_broad_homologous_detection` (#11 동형 광범위 검출)
- `feedback_use_gpt_pro` / `feedback_gpt_pro_claude_review`

---

## 3. 클러스터 정의 (Hybrid C-lite)

`matchedLexemes` + `caseId` + `evidenceId` 기준 동형 패턴 묶음. 고빈도 4 클러스터 + 사건별 tail 3 묶음 = 총 **7 클러스터 / 122 findings**.

| ID | 클러스터 | count | caseId | matchedLexemes | 주요 evidenceId |
|---|---|---|---|---|---|
| **C1** | friend-money-matter | 32 | friend-01 | `돈 문제` | e-3 외 |
| **C2** | family-notarized-will | 20 | family-01 | `공증 유서` | e-5 외 |
| **C3** | family-original-will | 28 | family-01 | `원본 유서` / `어머니 서랍에서 나온 원본 유서`+`원본 유서` | e-1 / e-3 외 |
| **C4** | friend-money-request | 6 | friend-01 | `돈 부탁` | (다양) |
| **C5-spouse** | tail-spouse-01 | 10 | spouse-01 | 다종 (`범죄`, `돌봄`, `비자금`, `위임장 조작`, `긴급 연락`, `사기 피해`, `투자 사기` 등) | (다양) |
| **C5-family** | tail-family-01 | 12 | family-01 | 다종 (`60:40`, `20년 송금`, `어머니 일기장 사진`, `공증 전 집중 방문` 등) | (다양) |
| **C5-friend** | tail-friend-01 | 14 | friend-01 | 다종 (`예비신랑이 먼저`, `아버지의 돈 접근`, `과거 손절` 등) | (다양) |

**합계**: 32 + 20 + 28 + 6 + 10 + 12 + 14 = **122** ✓

각 finding의 `clusterId` 필드는 dataset JSON에 사전 부여되어 있습니다. GPT Pro는 클러스터 단위로 처리하면서도 finding 단위로 출력해야 합니다 (출력 schema §6).

### 3.1 sourceKind 분포 (참고)
- `scriptedText` 80 / `caseData` 31 / `disclosurePolicy` 11

### 3.2 channel 분포 (참고)
- `evidence_present` 80 / `case_data` 27 / `system_message` 11 / `evidence_discovery` 2 / `judge_question` 2

### 3.3 textField 분포 (참고)
- `text` 79 / `partyContext.implication` 11 / `surfaceName` 9 / `description` 8 / `surfaceDescription` 5 / `v3DepthPlan.summary` 3 / `investigationResults.request_original` 2 / `discoveryText.surfaceFallback` 2 / `investigationStage.question.text` 1 / `behaviorHint` 1 / `partyContext.questionAngle` 1

> 주: `disclosurePolicy.surfaceName` / `surfaceDescription`에서 잡힌 11건은 정책 데이터의 surface 표현이 truth lexeme을 포함한 경우입니다. Stage 3(P0-surface-name-gate, locked evidence name)와 본질이 다르며, 본 Stage에서 surface 표현 전체를 다듬는 작업으로 처리합니다.

---

## 4. Patch 정책

### 4.1 핵심 원칙 — Stage Gate 정합
- `evidenceStage` 1 (early/mid/late × stage 1) 및 그 이전 lieBand = **surface 표현만 허용**. truth lexeme 직접 노출 X.
- `evidenceStage` 2~3 = 단계적 truth 허용 (단 본 sweep findings 122건은 모두 stage gate 위반이므로 전수 surface 처리 대상).
- truth lexeme 자체를 surface 표현으로 대체하면서 발화의 의도·태도·관계를 보존.

### 4.2 surface 표현 가이드 (Truth Throttle 매트릭스 정합)

본 클러스터별 truth lexeme → surface 표현 권장:

| 클러스터 | truth lexeme | early/stage1 surface 권장 |
|---|---|---|
| C1 | `돈 문제` | `그 일`, `그 문제`, `그 상황` |
| C2 | `공증 유서` | `그 서류`, `문제의 서류`, `해당 문서` |
| C3 | `원본 유서` / `어머니 서랍에서 나온 원본 유서` | `그 서류`, `어머니 유품에서 나온 문서` |
| C4 | `돈 부탁` | `그 부탁`, `그 상의`, `그 일` |
| C5-spouse | `범죄` | `그 일`, `이 사건`, `그 상황` |
| C5-spouse | `위임장 조작` | `서류 처리`, `그 서류 일` |
| C5-spouse | `사기 피해` / `투자 사기` | `그 손해`, `그 일`, `해당 거래` |
| C5-spouse | `비자금` | `별도 자금`, `그 자금` |
| C5-family | `60:40` | `정해진 비율`, `합의된 비율` |
| C5-family | `20년 송금` | `장기 송금`, `오랜 기간 송금` |
| C5-family | `어머니 일기장 사진` | `어머니 기록 사진`, `유품 사진` |
| C5-friend | `아버지의 돈 접근` | `아버지 자금 관련 일`, `그 자금 문제` |
| C5-friend | `과거 손절` | `예전 일`, `그 시기 결정` |

> **이 표는 권장 출발점입니다.** GPT Pro는 발화 맥락(speaker / target / channel / lieBand / evidenceStage)에 맞춰 자연스럽게 조정하되, 새로운 truth lexeme이나 새 동기를 도입하지 않습니다.

### 4.3 9차원 의미 정확성 (보존 필수)

각 finding의 patch에서 다음 9 항목을 보존:

1. **화자 / 청자 / 호칭** — `speaker` / `target` / `callTerms.toJudge|toPartner` / 합니다체·반말 톤
2. **상대 인물 / 쟁점 / 증거 target** — `evidenceId` / 발화가 가리키는 인물·관계 그대로
3. **lieState / evidenceStage 진실 노출 단계** — Truth Throttle 표 정합 (stage 1 = surface only)
4. **질문/답변 의도** — fact / motive / empathy 구분 유지
5. **stance 강도** — defensive / confident / shaken / angry / resigned 그대로
6. **judge 톤 단계** — soft vs hard
7. **새 증거 / 새 동기 / 부당한 확신 추가 X**
8. **한국어 자연성** — 조사·어절·문장 경계 자연스럽게 (조사는 후속 `fixPostpositions()` 정합 가능)
9. **scope 한정** — finding의 `sourcePath` / `textField`만 변경. 인접 텍스트 / 다른 사건 / runtime 코드 X.

### 4.4 진실 누설 금지 (`feedback #9` / CLAUDE.md 게임 핵심)
- "진실은 플레이어가 직접 밝혀낸다" 원칙. 어떤 채널도 플레이어보다 먼저 답을 말하면 안 됨.
- evidence는 surfaceName / 추상 표현, dossier 카드 의미는 추상화.
- evidence 자체의 surface 묘사가 진실을 직접 폭로하지 않도록.

### 4.5 동형 검출 (`feedback #11`)
- 같은 클러스터 안에서 동일 truth lexeme은 가급적 같은 surface 표현으로 일관 처리.
- 단, 발화 맥락(soft/hard, 화자 archetype)에 따라 자연스러운 변주는 허용.

---

## 5. 입력 Schema (Dataset JSON 필드)

각 finding 객체의 필드:

| field | 의미 |
|---|---|
| `clusterId` | C1~C5-* (사전 부여) |
| `id` | QARG-XXXXX |
| `caseId` | spouse-01 / family-01 / friend-01 |
| `evidenceId` | e-X |
| `evidenceStage` | 1 / 2 / 3 (1이 dominant) |
| `lieBand` | early / mid / late |
| `matchedLexemes` | 검출된 truth lexeme 배열 |
| `sourceKind` | scriptedText / caseData / disclosurePolicy |
| `sourcePath` | 적용 경로 (Codex-Dev 적용용) |
| `textField` | 변경 대상 필드 (text / surfaceName / description 등) |
| `channel` | evidence_present / case_data / system_message 등 |
| `speaker` | a / b / null |
| `target` | a / b / null |
| `actual` | 현재 텍스트 (검출 시점) |
| `expected` | detector 권장 정책 |

---

## 6. 출력 Schema (Codex-Dev 적용용)

GPT Pro는 입력 dataset의 **각 finding마다** 아래 객체를 생성. 출력은 단일 JSON 배열, 입력과 동일한 순서.

```json
[
  {
    "id": "QARG-00114",
    "clusterId": "C5-tail-spouse-01",
    "sourcePath": "src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-7|early|request_original].variants[id=a-e-7-early-request_original-v4]",
    "textField": "text",
    "caseId": "spouse-01",
    "evidenceId": "e-7",
    "evidenceStage": 1,
    "lieBand": "early",
    "matchedLexemes": ["범죄"],
    "original": "서류만 보고 제가 범죄를 저질렀다고 몰아가면 너무 가혹합니다.",
    "patched": "서류만 보고 제가 그런 일을 저질렀다고 몰아가면 너무 가혹합니다.",
    "preservation": {
      "speaker": "a (피청구인) — 합니다체 / 재판관 대상 톤 유지",
      "target": "재판관 (toJudge)",
      "lieState": "stage 1 surface — truth lexeme 제거 후 추상 표현",
      "evidenceStage": "stage 1 정합 — '범죄' truth lexeme을 '그런 일'로 대체",
      "intent": "방어적 항변 톤 / stance 강도 유지"
    },
    "rationale": "'범죄'는 stage 2~3에서 노출되어야 할 truth lexeme이므로 stage 1에서는 '그런 일'로 추상 표현. 발화 의도(부당함 항변)와 톤 보존.",
    "confidenceFlags": []
  }
]
```

### 6.1 필드 정의

| field | 의미 | 필수 |
|---|---|---|
| `id`, `clusterId`, `sourcePath`, `textField`, `caseId`, `evidenceId`, `evidenceStage`, `lieBand`, `matchedLexemes` | 입력 그대로 echo | ✓ |
| `original` | 입력 `actual`의 본문 부분 (`stage=...; matched=...; text=` 접두 제거 후) | ✓ |
| `patched` | 수정문 (truth lexeme 제거 / surface 표현 / 9차원 보존) | ✓ |
| `preservation` | 5 항목 보존 근거 (speaker / target / lieState / evidenceStage / intent) 각 1~2 문장 | ✓ |
| `rationale` | 왜 이렇게 수정했는지 1~2 문장 | ✓ |
| `confidenceFlags` | 보정·검토 요청 사유. 빈 배열 = 자신 있음. 예: `["context-uncertain"]`, `["alt-surface-needed"]`, `["adjacent-leak-suspect"]` | ✓ (빈 배열도 OK) |

### 6.2 출력 형식 규칙
- 단일 JSON 배열, 122개 객체.
- 입력 dataset의 순서·`id`·`sourcePath`·`textField` 그대로 유지 (Codex-Dev가 sourcePath로 직접 적용).
- `original`과 `patched`가 동일하면 안 됨 (truth lexeme이 반드시 surface로 대체되어야 함).
- 한국어 자연성 우선 — 조사 / 어절 / 문장 경계 자연스럽게. 단순 단어 치환 X.
- 마크다운 코드 블록 안에 JSON 배열만 (설명 텍스트 외부 X).

---

## 7. 진행 절차

1. **CT-Main**: 본 의뢰서 + dataset JSON + 정책 docs(§2.2) + 메모리(§2.5)를 GPT Pro 세션에 동봉 전달.
2. **GPT Pro 세션**:
   - 클러스터 단위로 패턴 처리 (C1 → C2 → C3 → C4 → C5-spouse → C5-family → C5-friend)
   - finding별 §6 schema로 출력
   - 동형 lexeme은 같은 클러스터에서 일관 surface 사용 (§4.5)
3. **Claude (CT-Main)**: GPT Pro 산출물 보정
   - 한국어 자연성 (`fixPostpositions()` 정합 / 조사 / 어절 / 어투)
   - 9차원 의미 정확성 (§4.3 9 항목 검증)
   - 진실 누설 위반 spot check (§4.4)
   - `confidenceFlags` 항목 우선 검토
4. **Codex-Dev (Stage 1 적용 세션)**:
   - 보정된 출력 JSON을 받아 적용 (`sourcePath` + `textField` 기준)
   - `node scripts/qa-runtime-gate.cjs` 재실행
   - P0-evidence-stage-gate findings = 0 / 다른 묶음 회귀 0
   - 검증 PASS → commit `fix(scripts): close P0-evidence-stage-gate findings (122 → 0)` → tag `baseline-pre-policy-v3-stage1` → push → CT-Main 보고

---

## 8. 절대 회피선

### Stage 1 scope
- P0-disclosure-gate / P0-surface-name-gate / RC4 / P1 / P2 변경 X
- 다른 finding의 텍스트(인접 variant)도 패치 X — `id` / `sourcePath` 매칭만
- 새로운 truth lexeme / 새 동기 / 새 증거 도입 X
- runtime 코드 / Gate runner / 정책 docs / pc.css / API proxy 변경 X
- baseline anchor v1 / v2 변경 X
- `_LEGACY_84CASES_DO_NOT_REFERENCE/` 어떤 자료도 참조 X

### 한국어 / 게임 정합
- 번역체 9패턴 ("~된 것으로 생각됩니다", "~인 측면이 있었습니다" 등) X
- 재판관이 당사자에게 "제 아내/남편" 등 호칭 사용 X
- callTerms.toJudge / toPartner 구분 위반 X
- 합니다체 / 반말 톤 위반 X (재판관 대상 = 합니다체 / 당사자 간 = 반말)
- 시스템/재판관 채널에서 NPC 자백 이전 truth 직접 언급 X (`feedback #9`)

### 운영
- finding의 `original`을 임의 추정 X — `actual` 필드 본문만 사용
- `id` 누락 / 중복 / 순서 변경 X
- `confidenceFlags`에 빈 문자열 X (배열, 빈 배열 OK)

---

## 9. 종료 조건

- [ ] GPT Pro 출력 JSON 122 objects (입력 순서·id 정합)
- [ ] 모든 finding에 `original` ≠ `patched`
- [ ] 모든 finding에 `preservation` 5 항목 + `rationale`
- [ ] 클러스터별 일관 surface 적용 (C1~C4)
- [ ] Claude 보정 완료 (`confidenceFlags` resolve)
- [ ] Codex-Dev 적용 후 P0-evidence-stage-gate findings = 0
- [ ] 다른 묶음(P0-disclosure-gate / P0-surface-name-gate / P1 / P2) 회귀 0
- [ ] `npm run check:all` / `npm run build:pc` / `npx tsc -b --force` PASS
- [ ] commit `fix(scripts): close P0-evidence-stage-gate findings (122 → 0)` + tag `baseline-pre-policy-v3-stage1` + push
- [ ] CT-Main 보고 (commit hash + Gate findings 변화 + tag)

---

## 10. 산출물 위치

```
tmp/
├── REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate.md            (본 의뢰서)
├── REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate-dataset.json  (입력 dataset / 122 items)
└── qa-codex-integrated-script-patch-v2-results/
    └── stage1-patch-output.json                                (GPT Pro → Claude 보정 후 / Codex-Dev 적용 입력)
```

---

## 11. 관련 자료

- 상위 의뢰서: `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (commit `3973ac6`)
- Detection: `tmp/qa-runtime-gate-results/findings.json` / `patch-priority.md` / case별 summary
- Phase A audit: `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md`
- 정책: `docs/disclosure-policy.md` / `docs/information-surface-policy.md` / `docs/spot-check-format.md` / `CLAUDE.md`
- 메모리(운영 Claude memory — repo-local 파일 X): `feedback_revision_meaning_over_form` / `feedback_truth_leak_prohibition` / `feedback_broad_homologous_detection` / `feedback_use_gpt_pro` / `feedback_gpt_pro_claude_review`

---

**상태**: GPT Pro Stage 1 의뢰서 v1 작성 완료. CT-Main 검토 / 사용자 승인 대기.

**다음 단계 옵션**:
- (1) 본 의뢰서 + dataset JSON commit + 사용자 GPT Pro 세션 진입 준비
- (2) 의뢰서 / dataset 보강 / scope 조정
- (3) 본 의뢰서 commit + Stage 2/3 GPT Pro 의뢰서 사전 골격 작성 (Stage 1 closing 후 본격 작성)
