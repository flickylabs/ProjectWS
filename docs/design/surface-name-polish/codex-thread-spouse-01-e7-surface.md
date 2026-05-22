# Codex Thread — Phase 2 Surface Polish / spouse-01 e-7 surfaceName 분리

작성일: 2026-05-23
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)
상위 메모리: [session_handoff_20260523_core_case_p0_script_reinforcement](../../../memory/session_handoff_20260523_core_case_p0_script_reinforcement.md)
관련 정책: [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
관련 정책: [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
관련 정책: [design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md)

---

## §0. 진입 조건 (절대 준수)

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add ../ws-phase2-surface-spouse01-e7 main` — 별도 worktree에서 작업. main 직접 X |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 작업 디렉토리 상태 기록 |
| working tree clean | 진입 시 dirty 0 (untracked 포함). 다른 thread와 충돌 차단 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI 디코딩이 한국어 mojibake 생성. Write/Edit tool로만 변경 |
| Authority 변경 후 derive | `npx tsx scripts/build-core-case.mjs --case spouse-01 --write` 필수 |
| 산출 | branch `phase2-surface-spouse01-e7` push + PR 생성 또는 patch file |

---

## §1. 작업 범위

### 1.1. 사건 + 영역

spouse-01의 **e-7 한정** (단일 evidence). `name === surfaceName` 영역으로 surface 보호 효과 0. h-d3 dispute (공동 적금 2,000만 원 해지)의 진실 hint를 stage 0에서 직접 노출.

| Evidence | name | surfaceName (현재) | scriptedText KO hits | 권장 surfaceName |
|---|---|---|---|---|
| e-7 | 공동 적금 해지 서류 | 공동 적금 해지 서류 ⚠ | 20 | **공동 적금 처리 서류** |

**중요**: 권장 surfaceName 영역은 의뢰 시작점. 실제 작업 시 사용자/시나리오 담당자와 재확정 권장. "처리"로 '해지' 행위 모호화. h-d3 진실 (위임장 조작 단독 해지) hint 차단.

**spouse-01 e-3 ("통화기록"), e-4 ("발신자 미상 문자")**: 본 의뢰 외. 이미 generic surface 표현으로 분리 의미 약함 (사용자 audit 결정).

**friend-01**: 7 evidence 모두 surface 분리 완료. 별도 의뢰 X.

### 1.2. 영향 파일 (모두 변경)

```
src/data/coreCases/spouse-01.case.ts                            ← Authority surfaceName + surfaceDescription + depthStages.stub/excerpt
src/data/cases/generated/spouse-01.json                         ← L1 derive (자동)
src/data/disclosurePolicy/spouse-01.json                        ← L4 derive (자동, surfaceMap.evidence sync)
src/data/scriptedText/spouse-01.json                            ← KO (20 hits)
src/data/scriptedText/spouse-01.en.json                         ← EN sync
src/data/scriptedText/spouse-01.ja.json                         ← JA sync
src/data/scriptedText/spouse-01.zh-CN.json                      ← ZH-CN sync
```

### 1.3. 작업 영역 외

- spouse-01 e-1~e-6 — 이미 surface 분리 또는 generic surface 표현. 본 의뢰 외
- spouse-01 e-3 / e-4 — generic surface 표현 (사용자 audit 결정 시 분리 의미 약함)
- family-01 — 별도 의뢰서 (`codex-thread-family-01-surface-names.md`)
- friend-01 — 분리 완료, 의뢰 X

---

## §2. 작업 순서

### Step 1: Authority surfaceName 분리

`src/data/coreCases/spouse-01.case.ts` line 1475~1517 e-7 영역:

```typescript
// 변경 전
{
  id: 'e-7',
  name: ko('공동 적금 해지 서류'),
  surfaceName: ko('공동 적금 해지 서류'),                     // ← name과 동일 ⚠
  description: ko(
    '공동 적금 해지 서류와 처리 기록. A가 해지 절차를 어떻게 진행했는지 가리키는 자료.',
  ),
  surfaceDescription: ko('공동 적금 해지 처리 서류.'),        // ← "해지" 노출 ⚠
  ...
  depthStages: [
    { id: 'stub', summary: ko('공동 적금 해지 서류 1건 존재 표시.') },        // ← surface ⚠
    { id: 'excerpt', summary: ko('해지일과 2,012만원만 보임.') },             // ← surface ⚠
    { id: 'original', summary: ko('해지일 + 위임장 + 박지연 개인계좌 즉시 입금까지 확인.') },   // deep (유지)
    { id: 'context', summary: ko('위임장의 이준호 서명이 본인 필적과 불일치 (대필 흔적) 복원.') }, // deep (유지)
    { id: 'established', summary: ko('박지연이 위임장 위조로 공동 적금을 단독 해지했다고 공식기록 채택.') }, // deep (유지)
  ],
  ...
}

// 변경 후
{
  id: 'e-7',
  name: ko('공동 적금 해지 서류'),
  surfaceName: ko('공동 적금 처리 서류'),                     // ← '처리'로 행위 모호화
  description: ko(
    '공동 적금 해지 서류와 처리 기록. A가 해지 절차를 어떻게 진행했는지 가리키는 자료.',
  ),
  surfaceDescription: ko('공동 적금 처리 서류.'),             // ← surface표현 분리
  ...
  depthStages: [
    { id: 'stub', summary: ko('공동 적금 처리 서류 1건 존재 표시.') },        // ← surface 정합
    { id: 'excerpt', summary: ko('거래일과 2,012만원만 보임.') },             // ← surface 정합
    { id: 'original', summary: ko('해지일 + 위임장 + 박지연 개인계좌 즉시 입금까지 확인.') },   // 유지
    { id: 'context', summary: ko('위임장의 이준호 서명이 본인 필적과 불일치 (대필 흔적) 복원.') }, // 유지
    { id: 'established', summary: ko('박지연이 위임장 위조로 공동 적금을 단독 해지했다고 공식기록 채택.') }, // 유지
  ],
  ...
}
```

**변경 영역 4개**:
1. `surfaceName`: 공동 적금 해지 서류 → 공동 적금 **처리** 서류
2. `surfaceDescription`: 공동 적금 **해지** 처리 서류 → 공동 적금 **처리** 서류
3. `depthStages[0].stub.summary`: 공동 적금 **해지** 서류 1건 존재 표시 → 공동 적금 **처리** 서류 1건 존재 표시
4. `depthStages[1].excerpt.summary`: **해지일**과 2,012만원만 보임 → **거래일**과 2,012만원만 보임

`name` / `depthStages.original/context/established` / 기타 deep stage는 유지.

### Step 2: derive

```bash
npx tsx scripts/build-core-case.mjs --case spouse-01 --write
```

L1 (cases/generated) + L4 (disclosurePolicy surfaceMap) 자동 sync. L3 / L5 변경 없음.

### Step 3: scriptedText KO 변경 (20 hits)

`src/data/scriptedText/spouse-01.json` (KO) 정독. 다음 영역 변경:

#### 3.1. `channels.evidence_present.entries[150]~[167]` (18 hits) — evidenceName 필드

모든 entries의 `evidenceName: "공동 적금 해지 서류"` → `"공동 적금 처리 서류"`로 일괄 변경.

**주의**:
- `evidenceName` 필드는 evidence 표시 영역. surface 분리 후 stub/excerpt 단계에서 surfaceName, context+ 단계에서 name 노출이 이상적이나 entries에 lieState/evidenceStage metadata 없음 → surface 우선 통일
- 자백 영역 variant (151, 154, 156~158, 165, 167)의 `variants[*].text` 내부 "해지 서류" 표현은 deep 영역이라 **유지** (자백 단계 name 노출 OK)
- surface 영역 variant (150, 159, 160, 162, 163)의 `variants[*].text` 내부 "해지 서류"는 **변경 권장** ("처리 서류" 또는 일반 표현)
  - 단 텍스트 의미 보존 필수. e.g. "해지 서류는 제가 냈습니다." (153) → "처리 서류는 제가 냈습니다." 또는 의미 보존 영역에서 surface 처리

#### 3.2. `channels.judge_evidence_combo.entries[18].variants[0,3].text` (2 hits) — judge 발화

| variant | 변경 전 | 변경 후 권장 |
|---|---|---|
| [0] | "이준호 씨, 개인 출금 내역과 투자방 송금 기록, **공동 적금 해지 서류**를 함께 보겠습니다..." | "이준호 씨, 개인 출금 내역과 투자방 송금 기록, **공동 적금 처리 서류**를 함께 보겠습니다..." |
| [3] | "이준호 씨, 현금 출금은 이준호 씨 쪽에서, **공동 적금 해지 서류**는 박지연 씨 쪽에서 드러납니다..." | "이준호 씨, 현금 출금은 이준호 씨 쪽에서, **공동 적금 처리 서류**는 박지연 씨 쪽에서 드러납니다..." |

**주의**: judge_evidence_combo는 evidence 제시 시점 영역 (combination route). judge는 surface 표현 사용 권장. variant[0/3]은 일반 entry, variant[1/2]는 progression 영역일 가능성 — variants 5종 모두 정독 후 surface vs deep 분기 확인 권장.

### Step 4: scriptedText 외국어 sync (EN/JA/ZH-CN)

각 외국어 file에서 동일 영역 sync.

| 영역 | KO | EN | JA | ZH-CN |
|---|---|---|---|---|
| 변경 전 (name) | 공동 적금 해지 서류 | joint savings cancellation document | 共同積立解約書類 | 共同储蓄解约文件 |
| 변경 후 (surface) | 공동 적금 처리 서류 | joint savings processing document | 共同積立処理書類 | 共同储蓄处理文件 |
| 보조 | 해지일 → 거래일 | cancellation date → transaction date | 解約日 → 取引日 | 解约日 → 交易日 |

**번역 영역**: 외국어 영역은 KO 의미 보존 + 자연스러운 surface 표현. KO 권위. "처리" 영역의 모호화 의도 (해지/입출금 모두 포괄) 유지.

각 lang file에서 동일 path (`channels.evidence_present.entries[150~167].evidenceName` + `channels.judge_evidence_combo.entries[18].variants[0,3].text`) 동기.

### Step 5: 3종 검증

```bash
npx tsc -b --force                                       # silent = PASS
npm run qa:fast                                           # static/route/combined P0 = 0
node scripts/detect-truth-leak.cjs --strict               # 0 findings
```

추가 검증:

```bash
# 분리 결과 확인
node -e "
const e = require('./src/data/cases/generated/spouse-01.json').evidence.find(x => x.id === 'e-7');
console.log('e-7:');
console.log('  name:', e.name);
console.log('  surfaceName:', e.surfaceName);
console.log('  separated:', e.name !== e.surfaceName ? 'YES' : 'NO ⚠');
console.log('  surfaceDescription:', e.surfaceDescription);
console.log('  depthStages[0]:', e.depthStages[0].summary);
console.log('  depthStages[1]:', e.depthStages[1].summary);
"

# scriptedText sweep 결과 확인
node -e "
const txt = require('./src/data/scriptedText/spouse-01.json');
let oldHits = 0, newHits = 0;
function walk(obj) {
  if (typeof obj === 'string') {
    if (obj.includes('공동 적금 해지 서류')) oldHits++;
    if (obj.includes('공동 적금 처리 서류')) newHits++;
    return;
  }
  if (Array.isArray(obj)) { obj.forEach(v=>walk(v)); return; }
  if (obj && typeof obj === 'object') for (const k of Object.keys(obj)) walk(obj[k]);
}
walk(txt);
console.log('old:', oldHits, '(deep stage 영역 유지 OK)');
console.log('new:', newHits, '(surface 영역)');
"
```

### Step 6: commit + PR

```bash
git add src/data/coreCases/spouse-01.case.ts \
        src/data/cases/generated/spouse-01.json \
        src/data/disclosurePolicy/spouse-01.json \
        src/data/scriptedText/spouse-01.json \
        src/data/scriptedText/spouse-01.en.json \
        src/data/scriptedText/spouse-01.ja.json \
        src/data/scriptedText/spouse-01.zh-CN.json

git commit -m "polish(spouse-01): e-7 surfaceName 분리 + scriptedText 4 lang sync (Phase 2)"

# branch push
git push -u origin phase2-surface-spouse01-e7
```

---

## §3. 회피 영역 (Phase 3 학습)

### PowerShell file swap 절대 금지

[feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md) 참조.

- 한국어 file은 Write/Edit tool로만 변경
- PowerShell `Get-Content` 사용 시 `-Encoding UTF8` 명시 + `[System.IO.File]::WriteAllLines + UTF8Encoding(false)`
- 부주의 시 ~3000 line file 전체 corruption 영역 (friend-01 작성 시 ~60분 사고 학습)

### scriptedText variant 영역 보존

- evidence_present entries[150~167]에 lieState/evidenceStage metadata 없음 → evidenceName 필드 일괄 변경 (surface 우선)
- variant.text 내부 "해지 서류" 표현은 자백 영역 (151/154/156~158/165/167)에서 **유지**, surface 영역 (150/153/159/162/163)에서 변경 권장
- 자백 영역 검출: text 내 "위임장 위조" / "범죄 인정" / "2,000만원 해지했습니다" 등 confess marker — 이 variant는 deep 영역 (name 노출 OK)
- behaviorHint 영역은 권위자 디렉팅 노트 (player 비노출) — 변경 X

### designIntentTags whitelist 영역 보존

- `truth-leak-matrix.json` `spouse-01.{disputeId}._designIntentTags` 영역 변경 X
- derive 정책 union (2026-05-23 보강)으로 baseline 자동 보존됨
- 추가 truthLeakOverride 변경 시 [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md) 영역 회피 정책 준수

### spouse-01 진실 노출 정책 영역 보존

[design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md) 참조.

- `가족` / `개인회생` / `형사 절차` 영역 keyword는 진실 노출 전 등장 X
- 본 의뢰는 e-7 surfaceName 영역만. 위 keyword 영역과 무관
- 단, scriptedText variant 정독 시 위 keyword 등장 영역 변경 시 [design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md) 정책 위반 여부 self-check

### Authority text polish (Step 6) 영역과 분리

본 의뢰는 **surfaceName + surfaceDescription + depthStages.stub/excerpt 영역만**. Authority의 `evidence.partyContext / depthStages.original+context+established summary / trustStates.summary` 영역 (Step 6 polish)은 별도 영역으로 본 의뢰 외.

---

## §4. 산출

| 항목 | 내용 |
|---|---|
| **branch** | `phase2-surface-spouse01-e7` (또는 합의된 branch) |
| **commit** | 1 commit (또는 단계별 분할 commit) |
| **변경 file** | 7 (Authority 1 + derive 2 + scriptedText 4 lang) |
| **PR 또는 patch** | main session에 보고. main session이 main으로 cherry-pick / merge |
| **회귀 결과** | tsc PASS / qa:fast P0=0 / detect-truth-leak 0 |
| **boundary** | 본 작업은 spouse-01 e-7 한정. family-01 / friend-01은 별도 |

산출 후 main session이 다음 영역 진행:
1. 본 변경 cherry-pick / merge
2. baseline anchor 업데이트 (필요 시)
3. family-01 의뢰서 (`codex-thread-family-01-surface-names.md`) 진행 모니터링

---

## §5. 진행 추정 시간

| Step | 추정 |
|---|---|
| Step 1 Authority 변경 (4 영역) | 15분 |
| Step 2 derive + 검증 | 10분 |
| Step 3 scriptedText KO 변경 (20 hits + variant surface/deep 분류) | 30분 |
| Step 4 외국어 sync (3 lang × ~20 hits) | 30분 |
| Step 5 검증 | 20분 |
| Step 6 commit | 10분 |
| **합계** | **~2시간** |

family-01 의뢰 (~3.5시간) 대비 작은 영역. 단일 evidence + 20 hits + surfaceDescription/depthStages 4 영역.

---

## §6. 참조

- 회귀 영역 정책: [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- PowerShell 인코딩: [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
- spouse-01 진실 노출 정책: [design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md)
- core-case 작성 가이드: [core-case-authoring-guide](../core-case-authoring-guide.md)
- worktree 정책: [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)
- family-01 동급 의뢰서: [codex-thread-family-01-surface-names](./codex-thread-family-01-surface-names.md)
