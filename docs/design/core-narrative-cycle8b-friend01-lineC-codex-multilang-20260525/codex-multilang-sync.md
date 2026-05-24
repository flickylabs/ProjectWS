# Codex Thread — friend-01 Cycle 8b Line C narrative wrapper 다국어 sync (주 의뢰서)

작성일: 2026-05-25
주체: Codex worktree (baseline anchor 영역)
범위: Cycle 8b narrative wrapper 6단계 commit (`6e0acaad`)의 EN/JA/ZH-CN 4언어 sync

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/friend01-cycle8b-narrative-multilang ../ws-friend01-cycle8b-narrative-multilang friend-01-cycle-8b` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean + `git log -1 --oneline` = `6e0acaad` 이상 |
| 파일 변경 도구 | Write/Edit tool 사용 (PowerShell 인코딩 mojibake 회피) |
| 산출 | branch `codex/friend01-cycle8b-narrative-multilang` push |

---

## §1. 작업 배경

friend-01 Line C narrative wrapper cycle (Cycle 8b) — 7 emergence × 4 trigger candidate + w-2 dc-3 영역 확장 = 92 KO entries. KO baseline + Authority 변경 (dc-4 label "손절의 이유") + derive sync 모두 main 통합 직전 영역 (friend-01-cycle-8b branch).

### Cycle 8b 6단계 commit 영역 (참고)

| commit | 영역 |
|---|---|
| `0f074395` | docs(friend-01) — GPT Pro 2 batch 의뢰서 폴더 (Cycle 8b 0~3단계) |
| `6e0acaad` | feat(friend-01) — narrativeTriggers 신규 7 emergence + w-2 확장 + dc-4 label + 92 KO entries + derive sync |

본 의뢰서는 위 commit의 다국어 sync. ScriptedText KO baseline anchor = `6e0acaad`.

---

## §2. ScriptedText 변경 영역 (KO baseline `6e0acaad`)

### 2.1 영향 file

```
src/data/scriptedText/friend-01.{en,ja,zh-CN}.json
```

### 2.2 channels.emergence_narrative entries 추가

본 cycle은 emergence_narrative channel에 다음 entries 추가:

| Entry key | type | id field | KO variants count | 외국어 sync 필요 (× 3 lang) |
|---|---|---|---|---|
| `emerge-e-5` | 신규 | evidenceId: "e-5" | 12 | 36 |
| `emerge-dc-3` | 신규 | dossierCardId: "dc-3" | 13 | 39 |
| `emerge-d-3` | 신규 | disputeId: "d-3" | 12 | 36 |
| `emerge-e-6` | 신규 | evidenceId: "e-6" | 12 | 36 |
| `emerge-dc-4` | 신규 | dossierCardId: "dc-4" | 13 | 39 |
| `emerge-d-4` | 신규 | disputeId: "d-4" | 12 | 36 |
| `emerge-w-3` | 신규 | witnessId: "w-3" | 12 | 36 |
| `emerge-w-2` | **확장** | witnessId: "w-2" | 기존 13 + 신규 6 (총 19) | +18 (신규 6만 추가) |
| **합계** | | | **92** | **276** |

⚠ `emerge-w-2` 는 Cycle 7에서 이미 생성된 entry. 본 cycle은 variants 영역에 **dc-3 영역 6 신규 variants 추가**. 외국어 file에서도 동일 패턴 — 기존 13 variants 보존 + 신규 6 외국어 variants append.

⚠ 다른 7개는 **신규 entry** — 외국어 file의 channels.emergence_narrative.entries 배열에 신규 entry 추가.

### 2.3 entry 식별 방법

KO 변경 영역 정확 확인:
```bash
git diff 0f074395..6e0acaad -- src/data/scriptedText/friend-01.json
```

각 KO entry의 id가 외국어 영역의 신규 variants id와 정확히 일치해야 함. tags 영역은 KO와 동일 유지 (시스템 lookup).

### 2.4 KO entry 본질 (번역 frame)

각 entry는 `{ id, text, behaviorHint, tags }` 4 필드. 다음 영역만 외국어로 변환:

- `text` — NPC/판사 발화 본문
- `behaviorHint` — 표현 보조 hint (시연 dynamics)
- `id` / `tags` — 변경 X (시스템 lookup)

### 2.5 캐릭터 frame 다국어 보존 (필수)

본 cycle의 character integrity는 다국어에서도 동일 frame:

| 캐릭터 | KO frame | 다국어 보존 영역 |
|---|---|---|
| **B (최수민)** `affect_flattening` | 자제 톤, 단답, "어쩔 수 없이" frame | EN: brief, restrained / JA: 控えめ、短く / ZH-CN: 克制、简短 |
| **A (송다은)** `premature_summary` | 결론 먼저 + 격앙 부정 | EN: 결론 먼저 + emphatic denial / JA: 結論先・激しい否定 / ZH-CN: 先下结论・激动否认 |
| **판사 (judge)** | 격식·중립·관찰자 어법 | "관련 자료" / "선후관계" / "정황" frame 유지, "선/흐름/낙인" 평가 어휘 회피 |

---

## §3. cascade priorCard reference text 다국어 보존

본 cycle의 cascade trigger entries는 priorCard reference text를 본문에 포함. 다국어 번역 시 referent 단서/쟁점 이름이 정확히 일관해야 함:

| cascade entry prefix | priorCard | referent text (KO 본문) | 다국어 referent 보존 영역 |
|---|---|---|---|
| `emerge-e5-via-cascade-` | d-2 | "앞서 정리된 예비신랑 측 접근 경위" (또는 "[먼저 넘은 선]") | dc-2 label 다국어 동일 |
| `emerge-dc3-via-cascade-` | e-5 | "[떠벌림 흔적과 9일간 메시지]" | e-5 surfaceName 다국어 동일 |
| `emerge-d3-via-cascade-` | dc-3 | "[같은 부탁]" | dc-3 label 다국어 동일 |
| `emerge-e6-via-cascade-` | d-3 | "아버지의 돈 접근 패턴" | d-3 dispute name 다국어 동일 |
| `emerge-dc4-via-cascade-` | e-6 | "[과거 송금 기록과 문자]" | e-6 surfaceName 다국어 동일 |
| `emerge-d4-via-cascade-` | dc-4 | "[손절의 이유]" | dc-4 label 다국어 동일 (변경 후 label) |
| `emerge-w3-via-cascade-` | dc-4 | "[손절의 이유]" | dc-4 label 다국어 동일 |
| `emerge-w2-via-cascade-dc3-` | dc-3 | "[같은 부탁]" | dc-3 label 다국어 동일 |

---

## §4. dc-4 label 다국어 변경 (필수 동반)

### 4.1 변경 영역

dc-4 label "손절의 값" → **"손절의 이유"** ([[feedback_judge_dispassionate_action_focused]] 권위)

| 영역 | KO (변경 후) | EN baseline 제안 | JA baseline 제안 | ZH-CN baseline 제안 |
|---|---|---|---|---|
| dossier label | 손절의 이유 | The Reason for the Breakup | 絶交の理由 | 绝交的原因 |

### 4.2 변경 file

- `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` dossierCards 영역 dc-4.label
- `src/data/scriptedText/friend-01.{en,ja,zh-CN}.json` dossier channel (dc-4 reference 영역) + emergence_narrative channel (dc-4/d-4/w-3 cascade reference text 본문)

기존 다국어 "손절의 값" 영역 모두 grep → 일괄 변경.

---

## §5. 진실 노출 정책 다국어 보존 (그룹 2 surface tier)

[[design_friend01_truth_disclosure_policy]] 권위 — 본 cycle 영역의 surface 단어:

| 영역 | KO surface | EN surface | JA surface | ZH-CN surface |
|---|---|---|---|---|
| e-5 영역 (자료 인용까지) | "결혼 자금을 시도했" / "떠벌림 흔적" | "attempted to bring up wedding money" / "traces of his blurting out" | "結婚資金を試みた" / "口走った痕跡" | "尝试提出婚礼资金" / "脱口而出的痕迹" |
| dc-3/d-3 영역 (패턴 인식) | "같은 흐름 / 같은 부탁" | "the same pattern / the same request" | "同じ流れ / 同じ頼み" | "同样的模式 / 同样的请求" |
| dc-4/d-4 영역 (사기 surface) | "아버지의 사기" / "사기꾼" (A 부정 frame) | "her father's fraud" / "fraud / a fraud" | "父の詐欺" / "詐欺師" | "父亲诈骗" / "骗子" |
| e-6 영역 (자료 인용까지) | "급한 투자금이니 한 달만…" / "차일피일 미상환" (자료 인용 형태만) | "needs the investment urgently" / "delayed repayment" (자료 인용) | "急ぎの投資金" / "返済の遅延" | "急用的投资款" / "拖延偿还" |

⚠ surface 단어 영역의 외국어 baseline은 권장. 기존 ScriptedText 일관성 검토 후 적용.

---

## §6. 검증 (Codex 작업 완료 시점)

작업 완료 후 다음 검증 모두 PASS:

```bash
npx tsc --noEmit
npm run build
npm run -s qa:fast      # RELEASE READY (static P0=0, route P0=0)
node scripts/detect-truth-leak.cjs --strict   # findings=0 (KO/EN/JA/ZH-CN 모두)
```

scriptedVariants 변화: KO baseline (`6e0acaad`) = 15041 → 외국어 sync 완료 시 +276 변화 영역 (외국어 channel 별도 영역).

검증 PASS 후 commit + push:
```bash
git add src/data/cases/generated/friend-01.en.json src/data/cases/generated/friend-01.ja.json src/data/cases/generated/friend-01.zh-CN.json src/data/scriptedText/friend-01.en.json src/data/scriptedText/friend-01.ja.json src/data/scriptedText/friend-01.zh-CN.json
git commit -m "i18n(friend-01): Cycle 8b Line C narrative wrapper 다국어 sync — emergence_narrative 92 entries × 3 lang + dc-4 label"
git push -u origin codex/friend01-cycle8b-narrative-multilang
```

---

## §7. 메인 Claude 세션 사후 통합

본 Codex sync 완료 → 메인 세션(ws-friend-01-cycle worktree, branch `friend-01-cycle-8b`)에서 8단계 사후 통합:
- `git fetch origin` + `git log origin/codex/friend01-cycle8b-narrative-multilang` 확인
- 변경 영역 정합 검증
- 통합 방식:
  - **fast-forward merge** — 본 의뢰서 영역만 single branch면 자연
  - **JSON union script** — [친구-01 e-5 plot revision 다국어 sync](../friend01-plot-revision-codex-multilang-20260525/)와 같은 file의 같은 배열 영역에 변경 누적 시 union 필요. 본 cycle은 emergence_narrative channel 단독 영역이므로 conflict 가능성 낮으나 dc-4 label 영역은 plot revision sync 영역과 겹칠 수 있음 — 차례대로 적용 필요
- 최종 검증 (tsc/build/qa:fast/truth-leak strict)
- main 통합
