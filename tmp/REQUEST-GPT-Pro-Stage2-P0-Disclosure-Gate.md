# REQUEST — GPT Pro Stage 2: P0-disclosure-gate Patch 본문 생성

**의뢰일**: 2026-04-27 (v2 — Stage 1 closing 후 재산정)
**요청자**: ClaudeCode CT-Main
**상위 의뢰서**: `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (commit `3973ac6`)
**병행 패턴**: `tmp/REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate.md` (Stage 1 / commit `10f5aed`) — 본 의뢰서는 동일한 입출력 schema + 정책 사용
**기준 SHA**: **`6d18c63`** (Phase B Route Simulator merge — origin/main 최신)
**Stage 1 closing**: `de3ad48` + tag `baseline-pre-policy-v3-stage1` (P0-evidence-stage-gate 122 → 0)
**대상 단계**: **Stage 2 / P0-disclosure-gate (87건)** ← Stage 1 cross-effect로 98 → 87 자동 감소
**작업 본질**: Detection 결과 87건 finding × 동형 패턴 8 클러스터 → finding별 patch 본문 생성

---

## 1. 본질

상위 v2 의뢰서의 **Stage 2 patch 본문 생성 영역**입니다. Codex-Dev가 87건을 임의로 대량 창작하지 않도록, GPT Pro가 finding별 교체문을 생성하고 Claude/CT가 한국어·게임 정합 보정을 거친 뒤 Codex-Dev가 적용합니다.

**Stage 1 → Stage 2 변화 (재산정)**:
- 이전 Stage 2 dataset: 98건 (`439cb5b` 시점 기준)
- 새 Stage 2 dataset: **87건 (`6d18c63` 시점 기준 / Stage 1 cross-effect로 11건 자동 closing)**
- finding ID 자체가 detection 재실행으로 재발급됨 — 이전 dataset 폐기, 본 의뢰서가 단일 유효 dataset
- cluster 정의 8종은 그대로 유지 (lexeme/case 분포 동일 패턴)
- **P0-surface-name-gate (Stage 3) 23 → 0 자동 closing** → Stage 3은 별도 patch 진행 X / final verification 단계로 전환

scope:
- P0-disclosure-gate 87건만
- P0-evidence-stage-gate (Stage 1 closing 완료) / P0-surface-name-gate (Stage 3 auto-closed) / RC4 / P1 / P2 X
- runtime 코드 / 정책 docs / Gate runner / baseline anchor X
- 다른 사건(`_LEGACY_84CASES_*`) X

본 의뢰서가 GPT Pro에 전달하는 입력은 dataset JSON 한 건, 출력도 Codex-Dev 적용용 JSON 한 건 (Stage 1 schema 정합).

본 단계의 핵심 정합:
- **RC1 + RC3 통합 처리** — Phase A audit 기반 (judge surface-only truth lexeme + NPC S0~S2 truth leak)
- **dossier 채널 비중 큼 (43건 / 87 중 49%)** — surface-only 채널의 패러프레이즈 정합 강조
- **Stage 1 closing 후 detection 재실행 결과 기반** — 본 dataset의 `actual` 필드는 Stage 1 patch 적용 후 source 텍스트 반영. drift 가능성 낮으나 적용 시 spot 검증 필수.

---

## 2. 입력 자료

### 2.1 Dataset (필수 / v2 — `6d18c63` 기준 87건)
- `tmp/REQUEST-GPT-Pro-Stage2-P0-Disclosure-Gate-dataset.json`
- **87 items** / 8 cluster 정렬 / finding당 16 필드 (Stage 1 dataset에 `lieState` + `detectorCategory` 추가)
- 이전 98건 dataset은 폐기 (Stage 1 closing 후 finding ID 재발급)

### 2.2 정책 / 게임 핵심
- `docs/disclosure-policy.md` v1.1 (§4.1·4.2·4.3 paraphrase / §3.2·3.3 Truth Throttle / §5.2 lieState)
- `docs/information-surface-policy.md` v1.1 (§2.1 surface-only / §2.6 VFX / §5.5 fallback)
- `CLAUDE.md` (게임 핵심 / "진실은 플레이어가 직접 밝혀낸다" / 한국어 품질 / 호칭 규칙)
- `docs/spot-check-format.md` (8필드)

### 2.3 Stage 1 산출물 (참고 / schema 정합 baseline)
- `tmp/REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate.md` (Stage 1 의뢰서 / commit `10f5aed`)
- `tmp/REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate-dataset.json`
- `tmp/qa-codex-integrated-script-patch-v2-results/stage1-patch-output.json` (Stage 1 GPT Pro + CT 보정본 / commit `7eaad2e`)

### 2.4 Detection / Phase A audit
- `tmp/qa-runtime-gate-results/findings.json` (1,914 findings 전체 / `439cb5b`)
- `tmp/qa-runtime-gate-results/patch-priority.md`
- `tmp/qa-runtime-gate-results/{spouse-01,family-01,friend-01}-summary.md`
- `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md` (RC1 / RC3 root cause)

### 2.5 Superseded
- `tmp/REQUEST-Codex-Integrated-Script-Patch-Spouse-01-P0.md` (`6643035` / 보존만)

### 2.6 메모리 / 잘못 패턴 (운영 Claude memory — repo-local 파일 X)

> CT-Main이 본 의뢰서를 GPT Pro 세션에 전달할 때 본문 동봉.

- `feedback_revision_meaning_over_form` (#6 9차원 의미 정확성)
- `feedback_truth_leak_prohibition` (#9 진실 누설 금지)
- `feedback_broad_homologous_detection` (#11 동형 광범위 검출)
- `feedback_use_gpt_pro` / `feedback_gpt_pro_claude_review`

---

## 3. 클러스터 정의 (Hybrid C-lite — 5 high-freq + 3 tail / **`6d18c63` 87건 재산정**)

| ID | 클러스터 | new count | old count (98) | diff | caseId | 주 matchedLexemes | 주 detector | 주 channel |
|---|---|---|---|---|---|---|---|---|
| **C1** | spouse-formal-family | 16 | 16 | 0 | spouse-01 | `형네` | surface_only 16 | dossier 16 |
| **C2** | spouse-family-circumstance | 15 | 15 | 0 | spouse-01 | `가족 사정` | surface_only 13 / NPC S0~S2 2 | judge_evidence_combo 6 / judge_question 3 / judge_witness_summon 2 / contradiction_pursuit 1 / trust_action 1 / judge_contradiction 1 / system_message 1 |
| **C3** | family-birth-secret | 17 | 17 | 0 | family-01 | `출생 비밀` 13 / `출생에 관한 사실` 3 / `배다른` 1 | surface_only 13 / early 3 / NPC S0~S2 1 | dossier 13 / judge 3 / interrogation 1 |
| **C4** | family-factory-funds | 8 | 8 | 0 | family-01 | `공장 자금` | truth_lexeme_early_exposure 8 | judge_evidence_combo 4 / judge_witness_summon 3 / judge_question 1 |
| **C5** | spouse-nephew-care | **15** | 18 | **-3** | spouse-01 | `조카` / `조카+형네` / `가족을 돌본` / `가족을 돕는` 등 | surface_only 12 / early 1 / NPC S0~S2 2 | dossier 12 / interrogation 2 / judge_evidence_combo 1 |
| **C6-spouse** | tail-spouse-01 | **2** | 5 | **-3** | spouse-01 | `위임장 조작` 1 / `형에게 전달` 1 | surface_only 2 | judge_contradiction 1 / judge_question 1 |
| **C6-family** | tail-family-01 | **8** | 12 | **-4** | family-01 | `유서를 손댄` 2 / `유서를 고친` 2 / `장기 송금` 2 / `정후 90+태성 10` 1 / `자기 몫을 줄` 1 | NPC S0~S2 3 / early 5 | interrogation 2 / case_data 2 |
| **C6-friend** | tail-friend-01 | **6** | 7 | **-1** | friend-01 | `예비신랑이 먼저` 2 / `거절한 사실` 2 / `아버지의 사기` 1 / `미상환` 1 | NPC S0~S2 1 / surface_only 2 / early 3 | dossier 2 / judge_question 2 |

**합계**: 16 + 15 + 17 + 8 + 15 + 2 + 8 + 6 = **87** ✓

> **고빈도 4 cluster (C1~C4)는 Stage 1 영향 0**. C5와 tail 3종에서 11건 auto-closed (Stage 1 patch가 evidence 관련 surface 영역을 정정한 부수 효과).

dataset의 각 finding `clusterId` 필드는 사전 부여. GPT Pro는 클러스터 단위로 처리하면서 finding 단위로 출력.

### 3.1 sourceKind 분포 (87 기준)
- `scriptedText` (대부분) / `caseData` / `disclosurePolicy` / `emergenceHooks` (소수)

> 주: `disclosurePolicy.surfaceName` / `surfaceDescription` 영역의 일부는 Stage 3 본질이지만 Stage 3 = 0 (auto-closed)이므로 본 단계에서 처리 X.

### 3.2 detector 분포 (87 기준)
- `surface_only_channel_truth_leak` 58 (RC1 일부 / 변화 X)
- `truth_lexeme_early_exposure` 20 (RC1 변형 / 31 → 20 / 11 auto-closed)
- `npc_truth_leak_s0_s2` 9 (RC3 / 변화 X)

---

## 4. Patch 정책

### 4.1 핵심 원칙 — Disclosure Gate 정합

본 단계의 두 가지 본질:

**(A) Surface-only 채널** (`judge_question`, `judge_contradiction`, `judge_evidence_combo`, `judge_witness_summon`, `dossier`)
- truth lexeme 직접 노출 X
- surfaceName + 추상 표현 + paraphrase set 안에서만
- judge가 "진실"을 먼저 말하지 않음 — 플레이어가 추리해야 함 (CLAUDE.md 게임 핵심)

**(B) NPC S0~S2 단계 발화** (`interrogation`, `contradiction_pursuit`)
- S0 (완전 부정) / S1 (일부 인정) / S2 (핑계) 단계에서 truth lexeme 직접 사용 X
- `disclosurePolicy.paraphraseSet` 안에서만 발화
- S3+ (책임 전가 / 감정적 / 자백) 단계에서야 단계적 truth 노출

### 4.2 surface 표현 가이드 (Truth Throttle 매트릭스 정합)

| 클러스터 | truth lexeme | early/dossier surface 권장 |
|---|---|---|
| C1 | `형네` | `그 댁`, `그쪽`, `그 가족` (시동생 가족 영역 / 호칭 보존) |
| C2 | `가족 사정` | `그 일`, `그 사정`, `그쪽 일` |
| C3 | `출생 비밀` / `출생에 관한 사실` / `배다른` | `어머니 과거 한 부분`, `그 사실`, `출생 관련 사정` |
| C4 | `공장 자금` | `공장 운영 자금`, `사업 자금`, `그 자금` |
| C5 | `조카` (인물 — 보존 또는 surface) | 인물 호칭은 정책 (a) — Stage 1 정책 정합 — `조카`는 가족 관계어로 보존 가능. 단 dossier 채널처럼 surface-only인 곳에서는 `친척 아이`, `그 아이`로 surface |
| C5 | `돌봄` / `가족을 돌본` / `가족을 돕는` | `그 시간`, `그 방문`, `어떤 일을 돕는` |
| C5 | `가족을 돕는 일이 급` | `급한 일이 있었습니다`, `그 일이 급했습니다` |
| C6-spouse | `위임장 조작` | `서류 처리`, `그 서류 일` |
| C6-spouse | `투자 사기` | `그 거래`, `그 손해` |
| C6-spouse | `형에게 전달` | `그쪽으로 전달`, `그 댁에 전달` |
| C6-family | `유서를 손댄` / `유서를 고친` | `서류를 만진`, `서류에 손을 댄` |
| C6-family | `정후 90+태성 10` | `정해진 비율`, `합의된 비율` |
| C6-family | `20년 송금` / `장기 송금` | `오랜 기간 송금`, `장기적인 송금` |
| C6-family | `자기 몫을 줄` | `자기에게 불리한 방향` |
| C6-friend | `예비신랑이 먼저` | `접촉의 선후를 다시 보게 하는` (Stage 1 패턴 정합) |
| C6-friend | `거절한 사실` | `그때의 결정`, `그 일` |
| C6-friend | `아버지의 사기` | `아버지의 과거 자금 관련 일` (Stage 1 정합) |

> **이 표는 권장 출발점입니다.** GPT Pro는 발화 맥락(speaker / target / channel / lieState / lieBand / evidenceStage)에 맞춰 자연스럽게 조정. 새로운 truth lexeme 또는 새 동기 도입 X.

### 4.3 인물 호칭 정책 (Stage 1 정책 (a) 정합)

- 인물 이름 / 가족 관계어 (`형`, `아내`, `남편`, `다은이`, `다은이 아버지`, `정후`, `태성` 등)는 `matchedLexemes` 영역이 아닌 한 **그대로 보존**.
- `조카` 같은 가족 관계어는 **lexeme이지만 본질적으로 인물 호칭** — 채널 컨텍스트에 따라 surface 처리 여부 결정:
  - dossier / surface-only 채널: `친척 아이`, `그 아이`로 surface
  - case_data / 발화 내부 (interrogation 등): 보존 가능 (의미 이해상 필수)
- 정책 (b) "핵심 인물명까지 surface 처리"는 본 Stage에서 **채택 X** (Stage 1 정합).

### 4.4 9차원 의미 정확성 (`feedback #6` 기준)

각 finding의 patch에서 9 항목 보존:

1. **화자 / 청자 / 호칭** — `speaker` / `target` / `callTerms.toJudge|toPartner` / 합니다체·반말 톤
2. **상대 인물 / 쟁점 / 증거 target** — `evidenceId` / 발화가 가리키는 인물·관계 그대로
3. **lieState / evidenceStage 진실 노출 단계** — Truth Throttle 표 정합
   - **본 단계 핵심**: dossier / judge 채널 = surface-only / S0~S2 = paraphrase set
4. **질문/답변 의도** — fact / motive / empathy / surface_only 묘사 / 모순 추궁 등 구분 유지
5. **stance 강도** — defensive / confident / shaken / angry / resigned 그대로
6. **judge 톤 단계** — soft vs hard
7. **새 증거 / 새 동기 / 부당한 확신 추가 X**
8. **한국어 자연성** — 조사·어절·문장 경계 자연스럽게
9. **scope 한정** — finding의 `sourcePath` / `textField`만 변경. 인접 텍스트 / 다른 사건 / runtime 코드 X.

### 4.5 진실 누설 금지 (`feedback #9` / CLAUDE.md 게임 핵심)
- "진실은 플레이어가 직접 밝혀낸다" — 어떤 채널도 플레이어보다 먼저 답을 말하면 X.
- judge surface-only 채널: surfaceName + 추상 / 단계별 진실 노출 X.
- NPC S0~S2 (interrogation / contradiction_pursuit): paraphrase set 안 / truth lexeme 직접 X.

### 4.6 동형 검출 (`feedback #11`)
- 같은 클러스터 안에서 동일 truth lexeme은 가급적 같은 surface 표현으로 일관 처리.
- 단, 발화 맥락(soft/hard, 화자 archetype, lieState 단계)에 따라 자연스러운 변주는 허용.

### 4.7 Stage 1 closing 후 detection 재실행 결과 기반 (drift 영역 정리)

본 GPT Pro 산출물은 **`6d18c63` 시점 detection 기준** (Stage 1 closing `de3ad48` + Phase B merge 후 재실행 결과). 즉:
- 본 dataset의 각 finding `actual` 필드는 **Stage 1 patch 적용 후 source 텍스트** 반영
- finding ID는 Stage 1 closing 후 detection 재실행으로 재발급 — 이전 98건 ID와 매칭 X
- Codex-Dev 적용 시 `original` 정합 검증은 여전히 필수 — Stage 2 진입과 적용 사이에 source 변경이 없어야 함
- drift 발생 시 즉시 중단 + CT-Main 보고

---

## 5. 입력 Schema (Dataset JSON 필드)

각 finding 객체:

| field | 의미 |
|---|---|
| `clusterId` | C1~C6-* (사전 부여) |
| `id` | QARG-XXXXX |
| `caseId` | spouse-01 / family-01 / friend-01 |
| `evidenceId` | e-X 또는 null |
| `evidenceStage` | 1 / 2 / 3 또는 null |
| `lieBand` | early / mid / late 또는 null |
| `lieState` | S0 / S1 / S2 / S3 / S4 / S5 또는 null |
| `matchedLexemes` | 검출된 truth lexeme 배열 |
| `detectorCategory` | `surface_only_channel_truth_leak` / `truth_lexeme_early_exposure` / `npc_truth_leak_s0_s2` |
| `sourceKind` | scriptedText / caseData / disclosurePolicy / emergenceHooks |
| `sourcePath` | 적용 경로 (Codex-Dev 적용용) |
| `textField` | 변경 대상 필드 |
| `channel` | dossier / judge_* / interrogation 등 |
| `speaker` | a / b / null |
| `target` | a / b / null |
| `actual` | 현재 텍스트 (검출 시점) |
| `expected` | detector 권장 정책 |

---

## 6. 출력 Schema (Codex-Dev 적용용 — Stage 1 정합)

GPT Pro는 입력 dataset의 **각 finding마다** 아래 객체 생성. 출력은 단일 JSON 배열, 입력 동일 순서.

```json
[
  {
    "id": "QARG-00121",
    "clusterId": "C1-spouse-formal-family",
    "sourcePath": "src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v1]",
    "textField": "text",
    "caseId": "spouse-01",
    "evidenceId": null,
    "evidenceStage": null,
    "lieBand": null,
    "lieState": null,
    "matchedLexemes": ["조카", "형네"],
    "detectorCategory": "surface_only_channel_truth_leak",
    "channel": "dossier",
    "original": "형네 사정이 걸려 있었습니다. 조카가 혼자 있는 날이 많았고, 제가 그걸 외면하지 못했습니다.",
    "patched": "그 댁 사정이 걸려 있었습니다. 친척 아이가 혼자 있는 날이 많았고, 제가 그걸 외면하지 못했습니다.",
    "preservation": {
      "speaker": "a 발화 — 합니다체 / 재판관 톤 유지",
      "target": "재판관 (toJudge)",
      "lieState": "dossier 채널 surface-only — 진실 lexeme 제거 후 추상 표현",
      "evidenceStage": "N/A (dossier)",
      "intent": "방어적 항변 — 외면하지 못한 이유 강조"
    },
    "rationale": "dossier는 surface-only 채널이므로 truth lexeme '형네' / '조카' 직접 노출 X. '그 댁' / '친척 아이'로 추상화. 발화 의도와 톤 보존.",
    "confidenceFlags": []
  }
]
```

### 6.1 필드 정의 (Stage 1 동일 + Stage 2 추가)

| field | 의미 | 필수 |
|---|---|---|
| `id`, `clusterId`, `sourcePath`, `textField`, `caseId`, `evidenceId`, `evidenceStage`, `lieBand`, `lieState`, `matchedLexemes`, `detectorCategory`, `channel` | 입력 그대로 echo | ✓ |
| `original` | 입력 `actual`의 본문 부분 (`stage=...; matched=...; text=` 접두 제거 후) | ✓ |
| `patched` | 수정문 (truth lexeme 제거 / surface 표현 / 9차원 보존) | ✓ |
| `preservation` | 5 항목 보존 근거 (speaker / target / lieState / evidenceStage / intent) 각 1~2 문장 | ✓ |
| `rationale` | 왜 이렇게 수정했는지 1~2 문장 | ✓ |
| `confidenceFlags` | 보정·검토 요청 사유. 빈 배열 = 자신 있음 | ✓ |

### 6.2 출력 형식 규칙
- 단일 JSON 배열, 98개 객체.
- 입력 dataset의 순서·`id`·`sourcePath`·`textField` 그대로 유지.
- `original`과 `patched`가 동일하면 안 됨.
- 한국어 자연성 우선.
- 마크다운 코드 블록 안에 JSON 배열만.

---

## 7. 진행 절차

1. **CT-Main**: 본 의뢰서 + dataset JSON + 정책 docs(§2.2) + Stage 1 산출물(§2.3) + 메모리(§2.6)를 GPT Pro 세션에 동봉 전달.
2. **GPT Pro 세션**:
   - 클러스터 단위 처리 (C1 → C2 → C3 → C4 → C5 → C6-spouse → C6-family → C6-friend)
   - finding별 §6 schema로 출력
   - 동형 lexeme은 같은 클러스터에서 일관 surface (§4.6)
3. **Claude (CT-Main)**: GPT Pro 산출물 보정
   - 한국어 자연성 (조사 / 어절 / 어투)
   - 9차원 의미 정확성 (§4.4)
   - 진실 누설 위반 spot check (§4.5)
   - dossier / judge 채널 surface 정합 강도 검토
   - NPC S0~S2 paraphrase 정합 검토
   - `confidenceFlags` 항목 우선 검토
4. **Codex-Dev (Stage 2 적용 세션)**: 본 의뢰서는 Stage 1 closing 완료 (`de3ad48`) 이후 진입
   - 보정된 출력 JSON을 받아 적용 (`sourcePath` + `textField`)
   - drift 영역 spot 검증 (§4.7)
   - `node scripts/qa-runtime-gate.cjs` 재실행
   - **종료 조건**:
     - **P0-disclosure-gate findings = 0 (87 → 0)**
     - **P0-evidence-stage-gate 회귀 0 (Stage 1 결과 보존)**
     - **P0-surface-name-gate 0 유지 (Stage 1 cross-effect로 auto-closed 영역 / 재오염 X)**
     - 다른 묶음 (P1 / P2 / RC4) 회귀 0
   - 검증 PASS (`npm run check:all` / `build:pc` / `tsc -b --force`)
   - **commit + tag (단일 commit에 두 tag 동시 / final closing)**:
     ```bash
     git commit -m "fix(scripts): close P0-disclosure-gate findings (87 -> 0)"
     git tag baseline-pre-policy-v3-stage2
     git tag baseline-pre-policy-v3
     git push origin main
     git push origin baseline-pre-policy-v3-stage2
     git push origin baseline-pre-policy-v3
     ```
     - tag `baseline-pre-policy-v3-stage2` — 단계 tag
     - tag `baseline-pre-policy-v3` — final tag (Stage 1/2/3 closing 누적)
   - CT-Main 보고 (commit hash + 두 tag + Gate findings 변화 + 회귀 검증 결과)

---

## 8. 절대 회피선

### Stage 2 scope
- P0-evidence-stage-gate / P0-surface-name-gate / RC4 / P1 / P2 변경 X
- 다른 finding의 텍스트(인접 variant)도 패치 X — `id` / `sourcePath` 매칭만
- 새로운 truth lexeme / 새 동기 / 새 증거 도입 X
- runtime 코드 / Gate runner / 정책 docs / pc.css / API proxy 변경 X
- baseline anchor v1 / v2 / v3-stage1 변경 X
- `_LEGACY_84CASES_DO_NOT_REFERENCE/` 어떤 자료도 참조 X

### 한국어 / 게임 정합
- 번역체 9패턴 X
- 재판관이 당사자에게 "제 아내/남편" 등 호칭 사용 X
- callTerms.toJudge / toPartner 구분 위반 X
- 합니다체 / 반말 톤 위반 X
- 시스템 / 재판관 채널에서 NPC 자백 이전 truth 직접 언급 X (`feedback #9`)
- dossier 카드 의미 추상화 (`feedback #9` / `feedback_truth_leak_prohibition`)

### 운영
- finding의 `original`을 임의 추정 X — `actual` 필드 본문만 사용
- `id` 누락 / 중복 / 순서 변경 X
- `confidenceFlags`는 배열 (빈 배열 OK / 빈 문자열 X)

---

## 9. 종료 조건

- [ ] GPT Pro 출력 JSON 87 objects (입력 순서·id 정합)
- [ ] 모든 finding `original` ≠ `patched`
- [ ] 모든 finding `preservation` 5 항목 + `rationale`
- [ ] 클러스터별 일관 surface 적용 (C1~C5 고빈도)
- [ ] dossier / judge 채널 surface 정합 (RC1)
- [ ] NPC S0~S2 paraphrase 정합 (RC3)
- [ ] 인물 호칭 정책 (a) 정합
- [ ] Claude 보정 완료 (`confidenceFlags` resolve)
- [ ] Codex-Dev 적용 → **P0-disclosure-gate findings = 0 (87 → 0)**
- [ ] **P0-evidence-stage-gate 회귀 0 (Stage 1 결과 보존)**
- [ ] **P0-surface-name-gate 0 유지 (Stage 3 auto-closed / 재오염 X)**
- [ ] 다른 묶음 (P1 / P2 / RC4) 회귀 0
- [ ] `npm run check:all` / `npm run build:pc` / `npx tsc -b --force` PASS
- [ ] commit `fix(scripts): close P0-disclosure-gate findings (87 -> 0)` + push
- [ ] tag `baseline-pre-policy-v3-stage2` + push
- [ ] **tag `baseline-pre-policy-v3` (final / 단일 commit에 두 tag 동시) + push**
- [ ] CT-Main 보고 (commit hash + 두 tag + Gate findings 변화 + 회귀 검증 결과)

---

## 10. 산출물 위치

```
tmp/
├── REQUEST-GPT-Pro-Stage2-P0-Disclosure-Gate.md            (본 의뢰서)
├── REQUEST-GPT-Pro-Stage2-P0-Disclosure-Gate-dataset.json  (입력 dataset / 98 items)
├── GPT-Pro-Stage2-P0-Disclosure-Gate-PACKET/               (업로드 패킷 / 사용자 또는 CT 작성)
│   ├── README-UPLOAD.md
│   ├── REQUEST.md (의뢰서 사본)
│   ├── dataset.json (사본)
│   ├── policy/ (정책 docs)
│   ├── memory/ (운영 메모리 본문)
│   ├── stage1-context/ (Stage 1 산출물)
│   └── output/ (GPT Pro 산출물 회수 위치)
└── qa-codex-integrated-script-patch-v2-results/
    └── stage2-patch-output.json                            (GPT Pro → Claude 보정본 / Codex-Dev 적용 입력)
```

---

## 11. 관련 자료

- 상위 의뢰서: `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (commit `3973ac6`)
- Stage 1 의뢰서 / dataset / 산출물: `tmp/REQUEST-GPT-Pro-Stage1-*` (commit `10f5aed`) / `tmp/qa-codex-integrated-script-patch-v2-results/stage1-patch-output.json` (commit `7eaad2e`)
- **Stage 1 closing**: `de3ad48 fix(scripts): close P0-evidence-stage-gate findings (122 -> 0)` + tag `baseline-pre-policy-v3-stage1`
- **Stage 3 처리**: `tmp/REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate.md` — auto-closed by Stage 1 cross-effect (23 → 0). 별도 patch 진행 X / final verification 단계로 전환 (Stage 2 closing 시 0 유지 검증).
- 병행 트랙: `tmp/REQUEST-Codex-Fast-Tester-Phase-B-Route-Simulator.md` (commit `434fdba`) / Phase B merge `6d18c63 feat(scripts): add Fast Tester Phase B route/runtime simulator`
- Detection: `tmp/qa-runtime-gate-results/findings.json` (1,757 findings @ `6d18c63`) / `patch-priority.md` / case별 summary
- Phase A audit: `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md`
- 정책: `docs/disclosure-policy.md` / `docs/information-surface-policy.md` / `docs/spot-check-format.md` / `CLAUDE.md`
- 메모리(운영 Claude memory — repo-local 파일 X): `feedback_revision_meaning_over_form` / `feedback_truth_leak_prohibition` / `feedback_broad_homologous_detection` / `feedback_use_gpt_pro` / `feedback_gpt_pro_claude_review`

---

**상태**: GPT Pro Stage 2 의뢰서 **v2 갱신 완료** (Stage 1 closing 후 87건 재산정 / 단일 final closing tag 발행 정책 정합). CT-Main 검토 / 사용자 승인 / commit 대기.

**v1 → v2 변경 요약**:
- 기준 SHA `439cb5b` → `6d18c63` (Phase B merge 후)
- 대상 finding 98건 → **87건** (Stage 1 cross-effect로 11건 auto-closed)
- §3 cluster 표 count 갱신 (C5 / C6-tail 영역)
- §4.7 drift 영역 갱신 (Stage 1 closing 후 detection 재실행 결과 기반 명시)
- §7 commit message `98 → 87` / **§7 단일 commit에 두 tag 동시 발행 (final closing 정책)**
- §11 Stage 1 closing + Stage 3 auto-closed 영역 명시

**다음 단계 (CT 영역)**:
- (1) 본 의뢰서 + dataset JSON + 갱신된 패킷 commit (별도 main worktree에서 / 사용자 승인 시)
- (2) Stage 1 closing 보고 받았으므로 사용자 GPT Pro 세션 진입 가능
- (3) Stage 3은 별도 patch X / Stage 2 closing 시 final tag `baseline-pre-policy-v3` 동시 발행
