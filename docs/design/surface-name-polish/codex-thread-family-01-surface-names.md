# Codex Thread — Phase 2 Surface Polish / family-01 e-2~e-7 surfaceName 분리

작성일: 2026-05-23
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)
상위 메모리: [session_handoff_20260523_core_case_phase3_family01_complete](../../../memory/session_handoff_20260523_core_case_phase3_family01_complete.md) "Phase 2 backlog"
관련 정책: [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
관련 정책: [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)

---

## §0. 진입 조건 (절대 준수)

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add ../ws-phase2-surface-family01 main` — 별도 worktree에서 작업. main 직접 X |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 작업 디렉토리 상태 기록 |
| working tree clean | 진입 시 dirty 0 (untracked 포함). 다른 thread와 충돌 차단 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI 디코딩이 한국어 mojibake 생성. Write/Edit tool로만 변경 |
| Authority 변경 후 derive | `npx tsx scripts/build-core-case.mjs --case family-01 --write` 필수 |
| 산출 | branch `phase2-surface-family01` push + PR 생성 또는 patch file |

---

## §1. 작업 범위

### 1.1. 사건 + 영역

family-01의 e-2~e-7 (6 evidence)에서 `name === surfaceName` (surface 보호 효과 0). Authority + scriptedText 4 lang sync.

현재 상태:

| Evidence | name | surfaceName (현재) | scriptedText KO hits | 권장 surfaceName |
|---|---|---|---|---|
| e-2 | 요양원 방문기록 | 요양원 방문기록 ⚠ | 0 | 시설 방문 기록 |
| e-3 | 전 요양보호사 음성증언 | 전 요양보호사 음성증언 ⚠ | 0 | 전 돌봄 직원 음성 |
| e-4 | 공증인 메모 기록 | 공증인 메모 기록 ⚠ | 13 | 인증 절차 메모 |
| e-5 | 어머니 자필 유언장 연습본 | 어머니 자필 유언장 연습본 ⚠ | 0 | 자필 메모 사본 |
| e-6 | 오래된 계좌 흐름 | 오래된 계좌 흐름 ⚠ | 29 | 오래된 송금 내역 묶음 |
| e-7 | 어머니 일기장 | 어머니 일기장 ⚠ | 65 | 오래된 노트 사본 |

**중요**: 권장 surfaceName은 의뢰 시작점. 실제 작업 시 사용자/시나리오 담당자와 surfaceName 영역 재확정 권장. surfaceName은 surface 보호 영역으로 stage 0~2 노출 가능한 표현이어야 한다. 본 의뢰서의 권장은 예시 (e-6은 사용자 사전 결정 영역).

### 1.2. 영향 파일 (모두 변경)

```
src/data/coreCases/family-01.case.ts                           ← Authority surfaceName 6 영역
src/data/cases/generated/family-01.json                        ← L1 derive (자동)
src/data/disclosurePolicy/family-01.json                       ← L4 derive (자동, surfaceMap.evidence sync)
src/data/scriptedText/family-01.json                           ← KO (e-4 13건 + e-6 29건 + e-7 65건 = 107 hits)
src/data/scriptedText/family-01.en.json                        ← EN sync
src/data/scriptedText/family-01.ja.json                        ← JA sync
src/data/scriptedText/family-01.zh-CN.json                     ← ZH-CN sync
```

### 1.3. 작업 영역 외

- e-1 `60:40 유서 사본` / `분배 비율이 적힌 서류 사본` — 이미 surface 분리 완료. 변경 X
- spouse-01 / friend-01 — baseline 정합 (별도 의뢰 X)

---

## §2. 작업 순서

### Step 1: Authority surfaceName 분리

`src/data/coreCases/family-01.case.ts` 의 evidence 영역 e-2~e-7에서:

```typescript
// 변경 전
{
  id: 'e-6',
  name: ko('오래된 계좌 흐름'),
  surfaceName: ko('오래된 계좌 흐름'),  // ← name과 동일
  ...
}

// 변경 후
{
  id: 'e-6',
  name: ko('오래된 계좌 흐름'),
  surfaceName: ko('오래된 송금 내역 묶음'),  // ← 별도 분리
  ...
}
```

권장 surfaceName 영역 (§1.1 표 참조)을 6 evidence 모두 적용.

### Step 2: derive

```bash
npx tsx scripts/build-core-case.mjs --case family-01 --write
```

L1 (cases/generated) + L4 (disclosurePolicy surfaceMap) 자동 sync. L3 / L5 변경 없음.

### Step 3: scriptedText KO 변경 (4 evidence 영역 = 107 hits)

`src/data/scriptedText/family-01.json` (KO) 정독. 다음 영역 변경:

| 검출 패턴 | 치환 영역 |
|---|---|
| `공증인 메모 기록` | `인증 절차 메모` (또는 합의된 surfaceName) |
| `오래된 계좌 흐름` | `오래된 송금 내역 묶음` (사용자 사전 결정) |
| `어머니 일기장` | `오래된 노트 사본` |

**주의**:
- 권장 surfaceName은 surface 보호 영역. 단 deep stage (S3+ 또는 evidence depth=context+)에서는 name (`공증인 메모 기록` / `어머니 일기장` 등) 노출 허용
- scriptedText variant의 `lieState` / `evidenceStage` tag 확인 → surface 영역 (S0~S2 또는 depth=stub/excerpt)에서만 치환
- behaviorHint 영역은 권위자 디렉팅 노트 (player 비노출)이라 변경 X — text/questionText/title 등 player-visible 영역만

### Step 4: scriptedText 외국어 sync (EN/JA/ZH-CN)

각 외국어 file에서 동일 영역 sync.

| 영역 | EN | JA | ZH-CN |
|---|---|---|---|
| 공증인 메모 기록 | notary memo record | 公証人メモ記録 | 公证人备忘录 |
| 인증 절차 메모 | notarization procedure memo | 認証手続メモ | 认证程序备忘 |
| 오래된 계좌 흐름 | older account history | 古い口座の動き | 旧账户流水 |
| 오래된 송금 내역 묶음 | older transfer-history bundle | 古い送金履歴のまとめ | 旧汇款记录汇编 |
| 어머니 일기장 | mother's diary | 母の日記帳 | 母亲的日记本 |
| 오래된 노트 사본 | older notebook copy | 古いノート写し | 旧笔记本副本 |

**번역 영역**: 외국어 영역은 KO 의미 보존 + 자연스러운 surface 표현. KO 권위.

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
const ev = require('./src/data/cases/generated/family-01.json').evidence;
for (const e of ev) {
  console.log(\`\${e.id}: name='\${e.name}' / surfaceName='\${e.surfaceName}' \${e.name === e.surfaceName ? '⚠ STILL SAME' : 'OK separated'}\`);
}"
# 모두 OK separated 확인
```

### Step 6: commit + PR

```bash
git add src/data/coreCases/family-01.case.ts \
        src/data/cases/generated/family-01.json \
        src/data/disclosurePolicy/family-01.json \
        src/data/scriptedText/family-01.json \
        src/data/scriptedText/family-01.en.json \
        src/data/scriptedText/family-01.ja.json \
        src/data/scriptedText/family-01.zh-CN.json

git commit -m "polish(family-01): e-2~e-7 surfaceName 분리 + scriptedText 4 lang sync (Phase 2)"

# branch push
git push -u origin phase2-surface-family01
```

---

## §3. 회피 영역 (Phase 3 학습)

### PowerShell file swap 절대 금지

[feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md) 참조.

- 한국어 file은 Write/Edit tool로만 변경
- PowerShell `Get-Content` 사용 시 `-Encoding UTF8` 명시 + `[System.IO.File]::WriteAllLines + UTF8Encoding(false)`
- 부주의 시 ~3000 line file 전체 corruption 영역 (friend-01 작성 시 ~60분 사고 학습)

### scriptedText variant lieState/evidenceStage 영역 보존

- surfaceName 영역 적용은 surface 영역 (lieState S0~S2 또는 evidence depth=stub/excerpt) 한정
- deep stage (S3+ 또는 context+ evidence depth)에서는 name (`공증인 메모 기록` / `어머니 일기장` 등) 직접 노출 허용
- 변경 전 variant.tags에서 `evidenceStage:*` / `lieState:*` 영역 확인

### designIntentTags whitelist 영역 보존

- truth-leak-matrix.json `family-01.{disputeId}._designIntentTags` 영역 변경 X
- derive 정책 union (2026-05-23 보강)으로 baseline 자동 보존됨
- 추가 truthLeakOverride 변경 시 [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md) 영역 회피 정책 준수

### Authority text polish (Step 6) 영역과 분리

본 의뢰는 **surfaceName 영역만**. Authority의 `evidence.partyContext / depthStages.summary / trustStates.summary` 영역 (Step 6 polish)은 별도 영역으로 본 의뢰 외.

---

## §4. 산출

| 항목 | 내용 |
|---|---|
| **branch** | `phase2-surface-family01` (또는 합의된 branch) |
| **commit** | 1 commit (또는 단계별 분할 commit) |
| **변경 file** | 7 (Authority 1 + derive 2 + scriptedText 4 lang) |
| **PR 또는 patch** | main session에 보고. main session이 main으로 cherry-pick / merge |
| **회귀 결과** | tsc PASS / qa:fast P0=0 / detect-truth-leak 0 |
| **boundary** | 본 작업은 family-01 한정. spouse/friend는 별도 의뢰 |

산출 후 main session이 다음 영역 진행:
1. 본 변경 cherry-pick / merge
2. baseline anchor 업데이트 (필요 시)
3. spouse-01 / friend-01 동일 audit + 의뢰 (필요 시)

---

## §5. 진행 추정 시간

| Step | 추정 |
|---|---|
| Step 1 Authority 변경 | 30분 |
| Step 2 derive + 검증 | 15분 |
| Step 3 scriptedText KO 변경 (107 hits) | 1시간 (검증 + variant별 영역 분류) |
| Step 4 외국어 sync (3 lang × ~107 hits) | 1시간 |
| Step 5 검증 | 30분 |
| Step 6 commit | 15분 |
| **합계** | **~3.5시간** |

---

## §6. 참조

- 회귀 영역 정책: [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- PowerShell 인코딩: [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
- family-01 진실 노출 정책: [design_family01_truth_disclosure_policy](../../../memory/design_family01_truth_disclosure_policy.md)
- core-case 작성 가이드: [core-case-authoring-guide](../core-case-authoring-guide.md)
- worktree 정책: [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)
