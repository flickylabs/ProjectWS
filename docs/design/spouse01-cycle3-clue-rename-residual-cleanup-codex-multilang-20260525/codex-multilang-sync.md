# Codex 다국어 의뢰서 — spouse-01 Cycle 3 cross-cycle 단서 명칭 변경 잔존 영역 정리

작성일: 2026-05-25
주체: Codex worktree 세션 (사용자가 spawn한 별도 ClaudeCode 세션)
선행: Cycle 3 종료 HEAD `17080b6a` 시점 cross-cycle 정책 [[feedback_dossier_card_renamed_to_clue]] 부분 적용 누락

---

## §1. 작업 영역 명확

### 1.1 영향 파일

- `src/data/scriptedText/spouse-01.json` (KO base — 자연 보정)
- `src/data/scriptedText/spouse-01.en.json` (EN — 자연 보정)
- `src/data/scriptedText/spouse-01.ja.json` (JA — 옛 명칭 제거)
- `src/data/scriptedText/spouse-01.zh-CN.json` (ZH-CN — 옛 명칭 제거)

### 1.2 영향 채널

`judge_evidence_combo` 채널 — dossier challenge query behaviorHint 영역만.
다른 채널 (interrogation / judge_question / contradiction_pursuit / evidence_present / dossier / mediation / aftermath / emergence_narrative) 변경 X.

### 1.3 영향 entry / variant 매트릭스

- entry key 패턴: `dc-N.{party}.q{M}|{tone}` (예: `dc-1.b.q1|hard`)
- variant id 패턴: `judgecombo-dc-N-{party}-qM-{tone}-vK`
- 매트릭스: dossier (dc-1 / dc-2 / dc-3 / dc-4 / dc-7) × party (a/b) × question (q1/q2/q3) × tone (hard/mid/soft) × variant (v1~v5) = 약 120 instance
- 정확한 수: `grep -c '"behaviorHint":.*事件カード' spouse-01.ja.json` → **120 hit**

---

## §2. 변경 매트릭스 (4언어 동일 위치 + 표현만 다름)

### 2.1 KO (자연 보정)

| 잔존 표현 | 변경 후 표현 | 영향 |
|---|---|---|
| `"behaviorHint": "사건카드 단서 확인 뒤 증거 조합의 의미를 재판관이 정리한다."` | `"behaviorHint": "단서 확인 뒤 증거 조합의 의미를 재판관이 정리한다."` | 120 hit |

**근거:**
- "사건카드 단서" 합성 표현은 cycle 3 변경 시 "사건 카드" → "단서" 부분 치환 잔재
- 단어 단독 "단서" 가 자연 ([[feedback_dossier_card_renamed_to_clue]] + [[feedback_natural_korean_npc_active_voice]])

### 2.2 EN (자연 보정)

| 잔존 표현 | 변경 후 표현 | 영향 |
|---|---|---|
| `"behaviorHint": "After checking the case-card clue, the Judge summarizes the meaning of the evidence combination."` | `"behaviorHint": "After checking the clue, the Judge summarizes the meaning of the evidence combination."` | 120 hit |

**근거:**
- "case-card clue" 합성 표현은 cycle 3 변경 시 "case card" → "clue" 부분 치환 잔재
- 단어 단독 "clue" 가 자연

### 2.3 JA (옛 명칭 제거)

| 잔존 표현 | 변경 후 표현 | 영향 |
|---|---|---|
| `"behaviorHint": "事件カードの手がかり確認後、証拠の組み合わせの意味を裁判官が整理する。"` | `"behaviorHint": "手がかりの確認後、証拠の組み合わせの意味を裁判官が整理する。"` | 120 hit |

**근거:**
- "事件カード" 옛 명칭 제거 ([[feedback_dossier_card_renamed_to_clue]])
- "手がかり" 단독 단어 사용 (자연)

### 2.4 ZH-CN (옛 명칭 제거)

| 잔존 표현 | 변경 후 표현 | 영향 |
|---|---|---|
| `"behaviorHint": "确认案件卡线索后，法官整理证据组合的意义。"` | `"behaviorHint": "确认线索后，法官整理证据组合的意义。"` | 120 hit |

**근거:**
- "案件卡" 옛 명칭 제거
- "线索" 단독 단어 사용 (자연)

---

## §3. 실행 방식 (Codex 권장 — 단순 일괄 치환)

각 4언어 동일 위치 동일 패턴이라 **단순 일괄 치환** 가능. 자연성 영역만 추가 검증.

### 3.1 PowerShell 권장 X — UTF-8 인코딩 이슈 ([[feedback_powershell_encoding_utf8.md]])

PowerShell `Get-Content` 기본 ANSI = mojibake. **JSON 파일은 UTF-8 인코딩 필수**. 다음 방식 권장:

### 3.2 Node script 또는 git Bash 권장

옵션 A — Node script (가장 안전):
```javascript
const fs = require('fs')

const replacements = [
  { file: 'src/data/scriptedText/spouse-01.json', from: '사건카드 단서 확인 뒤 증거 조합의 의미를 재판관이 정리한다.', to: '단서 확인 뒤 증거 조합의 의미를 재판관이 정리한다.' },
  { file: 'src/data/scriptedText/spouse-01.en.json', from: 'After checking the case-card clue, the Judge summarizes the meaning of the evidence combination.', to: 'After checking the clue, the Judge summarizes the meaning of the evidence combination.' },
  { file: 'src/data/scriptedText/spouse-01.ja.json', from: '事件カードの手がかり確認後、証拠の組み合わせの意味を裁判官が整理する。', to: '手がかりの確認後、証拠の組み合わせの意味を裁判官が整理する。' },
  { file: 'src/data/scriptedText/spouse-01.zh-CN.json', from: '确认案件卡线索后，法官整理证据组合的意义。', to: '确认线索后，法官整理证据组合的意义。' },
]

for (const { file, from, to } of replacements) {
  const before = fs.readFileSync(file, 'utf8')
  const count = (before.match(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length
  const after = before.split(from).join(to)
  fs.writeFileSync(file, after, 'utf8')
  console.log(`${file}: ${count} replaced`)
}
```

옵션 B — sed (git Bash):
```bash
sed -i 's/사건카드 단서 확인 뒤/단서 확인 뒤/g' src/data/scriptedText/spouse-01.json
sed -i 's/After checking the case-card clue/After checking the clue/g' src/data/scriptedText/spouse-01.en.json
sed -i 's/事件カードの手がかり確認後/手がかりの確認後/g' src/data/scriptedText/spouse-01.ja.json
sed -i 's/确认案件卡线索后/确认线索后/g' src/data/scriptedText/spouse-01.zh-CN.json
```

### 3.3 expected diff

각 파일에 120 line 변경 (behaviorHint 1 line만 변경, 다른 모든 line 동일). 4 file × 120 = 480 line 변경.

---

## §4. 검증

### 4.1 잔존 0건 확인

```bash
grep -c '사건카드 단서' src/data/scriptedText/spouse-01.json       # 0 기대
grep -c 'case-card clue' src/data/scriptedText/spouse-01.en.json    # 0 기대
grep -c '事件カード' src/data/scriptedText/spouse-01.ja.json         # 0 기대
grep -c '案件卡' src/data/scriptedText/spouse-01.zh-CN.json          # 0 기대
```

### 4.2 변경 후 표현 정상 확인

```bash
grep -c '"behaviorHint": "단서 확인 뒤 증거' src/data/scriptedText/spouse-01.json       # 120 기대
grep -c '"behaviorHint": "After checking the clue' src/data/scriptedText/spouse-01.en.json    # 120 기대
grep -c '"behaviorHint": "手がかりの確認後' src/data/scriptedText/spouse-01.ja.json    # 120 기대
grep -c '"behaviorHint": "确认线索后' src/data/scriptedText/spouse-01.zh-CN.json       # 120 기대
```

### 4.3 검증 명령

```bash
npx tsc --noEmit       # PASS
npm run build          # PASS (✓ built in ~7s)
npm run -s qa:fast     # RELEASE READY (static P0=0, route P0=0, combined P0=0)
```

### 4.4 cross-case 검증 (재발 방지)

family-01 / friend-01 영역 동일 누락 없음 확인 (이미 본 spouse-01 main 세션 검증 완료):
```bash
grep -c '事件カード' src/data/scriptedText/family-01.ja.json src/data/scriptedText/friend-01.ja.json
grep -c '案件卡' src/data/scriptedText/family-01.zh-CN.json src/data/scriptedText/friend-01.zh-CN.json
# 모두 0 기대
```

---

## §5. commit + push

```bash
git add src/data/scriptedText/spouse-01.json src/data/scriptedText/spouse-01.en.json src/data/scriptedText/spouse-01.ja.json src/data/scriptedText/spouse-01.zh-CN.json

git commit -m "i18n(spouse-01): Cycle 3 cross-cycle 단서 명칭 변경 잔존 영역 정리 — 4언어 × 120 hit

judge_evidence_combo 채널 dossier challenge query behaviorHint 영역 일괄 치환.

- KO: '사건카드 단서' → '단서' (cycle 3 부분 치환 잔재 자연 보정)
- EN: 'case-card clue' → 'clue' (자연 보정)
- JA: '事件カード' 옛 명칭 제거 + '手がかり' 단독 (cross-cycle 미적용 해소)
- ZH-CN: '案件卡' 옛 명칭 제거 + '线索' 단독

영향: 4 lang × 120 hit = 480 string. text 필드 영향 X (이미 0건). behaviorHint만.

검증: tsc / build / qa:fast PASS"

git push -u origin codex/spouse01-clue-rename-cleanup-20260525
```

---

## §6. 사후 통합 (main 세션 영역)

본 worktree 작업 완료 후 spouse-01 main 세션에 알림 → fast-forward merge 진행.

```bash
# main 세션 worktree
git fetch origin
git merge --ff-only origin/codex/spouse01-clue-rename-cleanup-20260525
git push origin main

# worktree 정리 (IDE 창 닫은 후)
git worktree remove --force D:/ws-spouse01-clue-rename-cleanup
git branch -D codex/spouse01-clue-rename-cleanup-20260525  # 선택
```

---

## §7. 권위 정책 (정독 필수 — memory/ 폴더 사본)

- `feedback_dossier_card_renamed_to_clue.md` — cross-cycle 명칭 변경 권위
- `feedback_natural_korean_npc_active_voice.md` — KO 자연 보정 권위
- `feedback_external_brief_self_contained_folder.md` — self-contained 폴더 정책
- `feedback_powershell_encoding_utf8.md` — PowerShell UTF-8 인코딩 (file 작업 시 필수)
- `design_core_narrative_cycle_procedure.md` — cycle 8단계 절차

---

## §8. 본 작업 영역 외 (진행 X)

- 다른 채널 (interrogation / judge_question 등) 변경 X
- text 필드 변경 X (이미 0건)
- case.ts / narrative.ts / runtime 코드 영역 X
- family-01 / friend-01 영역 X (이미 0건 검증 완료)
- 새 cycle / 새 entity 작업 X

영역 외 요청 시 [[feedback_session_separation_cycle_vs_ct]] 권위로 거절 + main 세션 안내.

---

## §9. 본 의뢰서 검증 사전 자료

영역 정확성 사전 검증 (Claude main 세션이 의뢰서 작성 시점에 실행한 grep):

| 검증 | 결과 |
|---|---|
| KO `사건카드 단서` 잔존 | 120 hit |
| EN `case-card clue` 잔존 | 120 hit |
| JA `事件カード` 잔존 | 120 hit (모두 behaviorHint) |
| ZH-CN `案件卡` 잔존 | 120 hit (모두 behaviorHint) |
| KO `사건 카드` text 잔존 | 0 hit |
| EN `case card` text 잔존 | 0 hit |
| JA `事件カード` text 잔존 | 0 hit (text 0, behaviorHint 120) |
| ZH-CN `案件卡` text 잔존 | 0 hit (text 0, behaviorHint 120) |
| family-01 잔존 (3 lang) | 0 hit |
| friend-01 잔존 (3 lang) | 0 hit |

본 의뢰서는 영역이 **spouse-01 ScriptedText 4언어 behaviorHint 480 string** 으로 정확히 한정됨.
