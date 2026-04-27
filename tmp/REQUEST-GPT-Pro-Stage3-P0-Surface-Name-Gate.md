# REQUEST — Stage 3: P0-surface-name-gate **AUTO-CLOSED** (Final Verification 단계로 전환)

**상태**: **AUTO-CLOSED by Stage 1 cross-effect** — `6d18c63` 시점 detection 재실행에서 P0-surface-name-gate findings = **0** 확인. 별도 patch stage 진행 X. **Final verification 단계로 전환** (Stage 2 closing 시 0 유지 검증).

**원래 SKELETON 상태 (Stage 1 closing 전)**: dataset clustering 23건 / 3 cluster 작성 완료.

**의뢰일**: 2026-04-27 (skeleton v1) → 2026-04-27 (auto-closed v2)
**요청자**: ClaudeCode CT-Main
**상위 의뢰서**: `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (commit `3973ac6`)
**병행 패턴**: `tmp/REQUEST-GPT-Pro-Stage1-*` (commit `10f5aed`) / `tmp/REQUEST-GPT-Pro-Stage2-*`
**대상 단계**: **Stage 3 / P0-surface-name-gate (이전 23건 → 현재 0)**
**작업 본질**: locked evidence 또는 surface 영역에서 truth name이 노출된 패턴 → Stage 1 patch 영역에서 자동 정합화 완료

---

## 0. AUTO-CLOSED 영역 — 사용자 결정 (a) 정합

### 0.1 자동 closing 결과
- **Stage 1 closing** (`de3ad48` + tag `baseline-pre-policy-v3-stage1`) 결과 P0-surface-name-gate 23 → 0 자동 closing
- 사유: Stage 1 patch가 evidence 관련 surface 영역(`scriptedText.evidence_present.text`, `caseData.evidence.surfaceDescription`, `disclosurePolicy.evidence.surfaceName` 등)을 정정하면서 본 detector 영역 자동 해소
- detection 재실행 결과 (`6d18c63` 시점): P0-surface-name-gate 0 / 다른 P0 묶음에 surface-name 영역 newly added 0

### 0.2 처리 결정
- **별도 patch stage 진행 X**
- **GPT Pro 의뢰 X / 패킷 작성 X**
- **Final verification 단계로 전환** — Stage 2 closing 시 final Gate 재실행에서 P0-surface-name-gate 0 유지 검증
- **Final tag 발행** = Stage 2 closing commit에 `baseline-pre-policy-v3-stage2` + `baseline-pre-policy-v3` (final) 두 tag 동시 발행 (사용자 결정 (α) 정합)

### 0.3 Skeleton 보존 사유
- 이력 추적 (Stage 3 처리 결정 + auto-closed 사유)
- Stage 2 patch가 surface 영역 재오염할 가능성 있을 시 본 dataset / cluster 정의 재사용
- 최종 검증 단계에서 본 의뢰서가 Stage 3 처리 trace로 기능

### 0.4 Stage 2 closing 시 final verification 절차
Stage 2 application 세션에서 다음 검증 필수:

```bash
node scripts/qa-runtime-gate.cjs
```

종료 조건 (final closing):
- P0-disclosure-gate 87 → 0 (Stage 2 본 영역)
- **P0-surface-name-gate 0 유지 (Stage 3 auto-closed 영역 / 재오염 X)** ← 본 verification 핵심
- P0-evidence-stage-gate 0 유지 (Stage 1 결과 보존)
- 다른 묶음 (P1 / P2 / RC4) 회귀 0

위 조건 모두 PASS 시 final tag `baseline-pre-policy-v3` 발행.

만약 P0-surface-name-gate가 다시 양수로 돌아오면:
1. 즉시 적용 중단
2. 재오염 finding 분석
3. CT-Main 보고 → Stage 3 의뢰서 재활성화 결정 (skeleton + dataset 그대로 사용 가능)

---

## 1. 본질 (원래 skeleton — 참고용)

> ⚠️ 본 §1 이하는 **auto-closed 전 skeleton 상태** 자료. Stage 2 closing 시 P0-surface-name-gate 0 유지가 확인되면 본 영역은 dead reference로 처리 (자료 보존만).

상위 v2 의뢰서 Stage 3 patch 본문 생성. **Stage 1 + Stage 2 closing 후 진입** (원래 진입 시점 — 현재 X).

scope:
- P0-surface-name-gate 23건만
- Stage 1 / Stage 2 / RC4 / P1 / P2 X
- runtime 코드 / 정책 docs / Gate runner / baseline anchor X

본 단계는 Stage 1/2와 **본질 다름**:
- Stage 1: truth lexeme stage gate (early/stage1에 truth description 노출) — closed
- Stage 2: surface-only 채널 + S0~S2 NPC truth lexeme (RC1+RC3) — 진행 중 (87건)
- **Stage 3: locked evidence의 truth name이 surface 영역에 노출 → `surfaceName`으로 대체** — auto-closed by Stage 1 cross-effect

본 단계는 단순 lexeme 대체보다 **evidence 이름 정합** 영역. dataset에 각 evidence의 `truthName` ↔ `surfaceName` reference가 포함되어 있어 GPT Pro가 정확한 대체 표현을 사용 가능.

---

## 2. 입력 자료

### 2.1 Dataset (필수)
- `tmp/REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate-dataset.json` (23 items / 3 cluster / `evidenceReference` 필드 포함)

### 2.2 정책
- `docs/disclosure-policy.md` v1.1 (§4.1·4.2·4.3 surfaceName 정합)
- `docs/information-surface-policy.md` v1.1 (§2.1 surface-only 영역)
- `CLAUDE.md` (게임 핵심 / 한국어 품질)

### 2.3 Stage 1/2 산출물 (참고 / 진입 시점에 closing 상태)
- `tmp/REQUEST-GPT-Pro-Stage1-*` + `tmp/qa-codex-integrated-script-patch-v2-results/stage1-patch-output.json`
- `tmp/REQUEST-GPT-Pro-Stage2-*` + `tmp/qa-codex-integrated-script-patch-v2-results/stage2-patch-output.json`

### 2.4 Detection
- `tmp/qa-runtime-gate-results/findings.json` / `patch-priority.md` / case별 summary

### 2.5 메모리 (운영 Claude memory — repo-local 파일 X)
- `feedback_revision_meaning_over_form` / `feedback_truth_leak_prohibition` / `feedback_broad_homologous_detection` / `feedback_use_gpt_pro` / `feedback_gpt_pro_claude_review`

---

## 3. 클러스터 정의 (3 cluster — 단순 / 사건 단위)

| ID | 클러스터 | count | caseId | evidenceId | 본질 |
|---|---|---|---|---|---|
| **C1** | family-e5-locked-name | 18 | family-01 | e-5 | `evidence_present.text` 영역에 evidence truth name "어머니 서랍에서 나온 원본 유서"가 노출 → surfaceName "어머니 서랍 원본 유서"로 대체 |
| **C2** | family-tail | 2 | family-01 | e-7 | `case_data.surfaceDescription` 1 + `system_message.surfaceName` 1 — "어머니 일기장 사진" → "어머니 일기장" |
| **C3** | friend-system-surface | 3 | friend-01 | e-2 / e-3 / e-7 | `system_message.surfaceName` 영역 — `surface_name_violation` |

### 3.1 evidence reference 매핑 (dataset에 사전 부여)

| caseId | evidenceId | truthName | surfaceName |
|---|---|---|---|
| family-01 | e-5 | 어머니 서랍에서 나온 원본 유서 | 어머니 서랍 원본 유서 |
| family-01 | e-7 | 어머니 일기장 사진 | 어머니 일기장 |
| friend-01 | e-2 | 공통 친구 단톡방 캡처 | 단톡방 캡처 |
| friend-01 | e-3 | 과거 손절 직전 카톡 | 과거 카톡 |
| friend-01 | e-7 | 과거·현재 대조표 | 대조표 |

### 3.2 detector 분포
- `locked_evidence_name_exposed` 19 (잠금 상태에서 truth name 노출)
- `surface_name_violation` 4 (`disclosurePolicy` / `system_message`의 surfaceName 정합 영역)

### 3.3 channel / sourceKind / textField
- `channel`: `evidence_present` 18 / `system_message` 4 / `case_data` 1
- `sourceKind`: `scriptedText` 18 / `disclosurePolicy` 4 / `caseData` 1
- `textField`: `text` 18 / `surfaceName` 4 / `surfaceDescription` 1

---

## 4. Patch 정책 (skeleton — Stage 2 closing 후 보강)

### 4.1 핵심 원칙

본 단계의 핵심 정합:
- **locked evidence 영역에서 truth name 직접 X** — `surfaceName` 사용
- **`disclosurePolicy.evidence[*].surfaceName` ↔ `caseData.evidence[*].surfaceName` 일치 정합** (`surface_name_violation` 영역)
- **흐름 자연성 보존** — 단순 토큰 치환 X, 조사 / 어절 / 문장 흐름 자연스럽게

### 4.2 9차원 의미 정확성 (Stage 1/2 정합)
- 화자 / 청자 / 호칭 그대로
- evidence target / 발화 의도 그대로
- truth name → surfaceName 대체 외 변경 X

### 4.3 인물 호칭 정책 (Stage 1/2 정합)
- 정책 (a) — 인물 이름 그대로 보존

### 4.4 진실 누설 금지 (`feedback #9`)
- surface 영역에 truth name 직접 노출 X (게임 핵심 위반)

### 4.5 채널별 처리
- `evidence_present` (18): scriptedText 안에서 truth name 등장 위치를 surfaceName으로 단순 대체 + 흐름 자연성 보강
- `case_data.surfaceDescription` (1): caseData 영역의 surface 표현이 truth lexeme을 포함 → 다듬기
- `system_message.surfaceName` (4): `disclosurePolicy.evidence.surfaceName` 자체가 정합 위반 → 정합화 (surfaceName 자체를 교정)

---

## 5. 입력 Schema (Dataset JSON 필드)

| field | 의미 |
|---|---|
| `clusterId` | C1 / C2 / C3 |
| `id` | QARG-XXXXX |
| `caseId` | family-01 / friend-01 |
| `evidenceId` | e-X |
| `detectorCategory` | `locked_evidence_name_exposed` / `surface_name_violation` |
| `sourceKind` / `sourcePath` / `textField` / `channel` | 표준 |
| `actual` | 검출 텍스트 |
| `expected` | detector 권장 정책 |
| `evidenceReference.truthName` | evidence의 진실 이름 (대체 source) |
| `evidenceReference.surfaceName` | evidence의 surface 이름 (대체 target) |
| `evidenceReference.surfaceDescription` | evidence의 surface description |

---

## 6. 출력 Schema (Codex-Dev 적용용 — Stage 1/2 정합)

```json
[
  {
    "id": "QARG-00822",
    "clusterId": "C1-family-e5-locked-name",
    "sourcePath": "src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-5|early|1].variants[id=a-e-5-early-stage1-v1]",
    "textField": "text",
    "caseId": "family-01",
    "evidenceId": "e-5",
    "detectorCategory": "locked_evidence_name_exposed",
    "channel": "evidence_present",
    "evidenceReference": {
      "truthName": "어머니 서랍에서 나온 원본 유서",
      "surfaceName": "어머니 서랍 원본 유서"
    },
    "original": "<actual 본문>",
    "patched": "<truth name → surfaceName으로 자연스럽게 대체>",
    "preservation": {
      "speaker": "...",
      "target": "...",
      "evidenceTarget": "evidenceId 그대로",
      "intent": "발화 의도 보존"
    },
    "rationale": "...",
    "confidenceFlags": []
  }
]
```

### 6.1 출력 규칙 (Stage 1/2 정합)
- 단일 JSON 배열, 23 objects
- 입력 dataset 순서·`id`·`sourcePath` 그대로
- `original` ≠ `patched`
- 한국어 자연성 우선

---

## 7. 진행 절차 (skeleton)

1. **CT-Main**: Stage 2 closing 후 본 의뢰서 보강 → 패킷 (`tmp/GPT-Pro-Stage3-P0-Surface-Name-Gate-PACKET/`) 작성 → GPT Pro 세션
2. **GPT Pro 세션**: 클러스터 단위 처리 (C1 → C2 → C3)
3. **Claude 보정**: `confidenceFlags` resolve / 흐름 자연성 / `surfaceName` 정합
4. **Codex-Dev 적용** (Stage 2 closing 후): 보정본 적용 → Gate 재실행 → P0-surface-name-gate findings = 0 / 다른 묶음 회귀 0 → commit `fix(scripts): close P0-surface-name-gate findings (23 -> 0)` → tag `baseline-pre-policy-v3` (final) → push → CT-Main 보고

---

## 8. 절대 회피선

- Stage 1 / Stage 2 / RC4 / P1 / P2 변경 X
- runtime 코드 / Gate runner / 정책 docs / pc.css / API proxy 변경 X
- baseline anchor v1 / v2 / v3-stage1 / v3-stage2 변경 X
- `_LEGACY_84CASES_DO_NOT_REFERENCE/` 자료 참조 X
- `surfaceName` 정합 위반 X (`disclosurePolicy` ↔ `caseData` 일치 유지)
- 새로운 truth name / 새 evidence / 새 동기 도입 X

---

## 9. 종료 조건

- [ ] GPT Pro 출력 JSON 23 objects (입력 순서·id 정합)
- [ ] 모든 finding `original` ≠ `patched`
- [ ] truthName → surfaceName 대체 정합 (surface_name_violation 영역은 `surfaceName` 자체 정합화)
- [ ] 9차원 의미 정확성 보존
- [ ] **Stage 2 closing 후 적용** → P0-surface-name-gate findings = 0
- [ ] 다른 묶음 회귀 0 (Stage 1 / Stage 2 / P1 / P2 / RC4)
- [ ] `npm run check:all` / `build:pc` / `tsc -b --force` PASS
- [ ] commit `fix(scripts): close P0-surface-name-gate findings (23 -> 0)` + tag `baseline-pre-policy-v3` (final) + push
- [ ] CT-Main 보고

---

## 10. 산출물 위치 (예상)

```
tmp/
├── REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate.md            (본 skeleton — Stage 2 closing 후 보강 영역)
├── REQUEST-GPT-Pro-Stage3-P0-Surface-Name-Gate-dataset.json  (입력 dataset / 23 items)
├── GPT-Pro-Stage3-P0-Surface-Name-Gate-PACKET/               (Stage 2 closing 후 작성)
│   └── ...
└── qa-codex-integrated-script-patch-v2-results/
    └── stage3-patch-output.json                               (GPT Pro → Claude 보정본 / Codex-Dev 적용 입력)
```

---

## 11. Skeleton 한정 — 본격 보강 영역 (Stage 2 closing 후)

다음 영역은 Stage 2 closing 보고 + 사용자 정책 결정 후 본격 작성/보강:

1. **§4 Patch 정책 상세** — 흐름 자연성 / 조사 / 어절 / `surface_name_violation` 영역 정합화 절차
2. **§7 진행 절차 상세** — Codex-Dev 적용 알고리즘 / drift 영역 처리 / Stage 1/2 회귀 검증
3. **§4.5 채널별 처리 상세** — `evidence_present` 단순 대체 vs `disclosurePolicy.surfaceName` 정합화 차이
4. **GPT Pro 패킷** (`tmp/GPT-Pro-Stage3-P0-Surface-Name-Gate-PACKET/`) — 의뢰서/dataset/정책/메모리/Stage 1·2 컨텍스트 동봉
5. **README-UPLOAD** — 업로드 가이드 (Stage 1/2 패턴 정합)
6. **commit message / tag final 정합** — `baseline-pre-policy-v3` (final / Stage 1/2/3 closing 누적)

---

## 12. 관련 자료

- 상위 의뢰서: `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (commit `3973ac6`)
- Stage 1: `tmp/REQUEST-GPT-Pro-Stage1-*` (commit `10f5aed`) / `tmp/qa-codex-integrated-script-patch-v2-results/stage1-patch-output.json` (commit `7eaad2e`)
- Stage 2: `tmp/REQUEST-GPT-Pro-Stage2-*`
- Detection: `tmp/qa-runtime-gate-results/findings.json` / `patch-priority.md`
- 정책: `docs/disclosure-policy.md` / `docs/information-surface-policy.md` / `docs/spot-check-format.md` / `CLAUDE.md`
- 메모리(운영 Claude memory — repo-local 파일 X)

---

**상태 (auto-closed v2)**: Stage 1 cross-effect로 P0-surface-name-gate 23 → 0 (`6d18c63` 검증). 별도 patch stage 진행 X. Skeleton + dataset 보존 (이력 + 재오염 시 재활성화 자료).

**Final verification 단계로 전환**: Stage 2 closing 세션에서 P0-surface-name-gate 0 유지 검증 후 final tag `baseline-pre-policy-v3` 발행 (Stage 2 commit과 동시 / 사용자 결정 (α) 정합).

**병렬화 정책 정합** (참고): Stage 1 closing → Stage 2 진행 (87건 GPT Pro 세션 → Codex-Dev 적용) → Stage 2 commit 시 final tag 동시 발행 (Stage 3 별도 적용 X).
