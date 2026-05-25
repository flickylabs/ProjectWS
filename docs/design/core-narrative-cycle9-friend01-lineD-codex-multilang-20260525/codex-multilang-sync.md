# Codex Thread — friend-01 Cycle 9 Line D narrative wrapper 다국어 sync (주 의뢰서)

작성일: 2026-05-25
주체: Codex worktree (baseline anchor 영역)
범위: Cycle 9 Line D narrative wrapper 6단계 commit (`df326a17`)의 EN/JA/ZH-CN 4언어 sync
**의의**: friend-01 narrative wrapper 영역 마지막 cycle (사건 전체 종료)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/friend01-cycle9-narrative-multilang ../ws-friend01-cycle9-narrative-multilang friend-01-cycle-9` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean + `git log -1 --oneline` = `df326a17` 이상 |
| 파일 변경 도구 | Write/Edit tool 사용 (PowerShell 인코딩 mojibake 회피) |
| 산출 | branch `codex/friend01-cycle9-narrative-multilang` push |

---

## §1. 작업 배경

friend-01 Line D narrative wrapper cycle (Cycle 9) — 3 emergence × 4 trigger candidate = 36 KO entries. KO baseline + Authority 변경 (e-7 / d-5 / dc-5 narrativeTriggers 부착) + derive sync 모두 friend-01-cycle-9 branch에 통합 상태.

### Cycle 9 commit chain (참고)

| commit | 영역 |
|---|---|
| (merge) | origin/friend-01-cycle-8b 영역 통합 base |
| `3a1c2b79` | docs(friend-01) — Cycle 9 0~3단계 GPT Pro 의뢰서 폴더 |
| `df326a17` | **feat(friend-01) — narrativeTriggers 신규 3 emergence + 36 KO entries (본 의뢰서 baseline anchor)** |

본 의뢰서는 `df326a17` 다국어 sync. ScriptedText KO baseline anchor = `df326a17`.

---

## §2. ScriptedText 변경 영역 (KO baseline `df326a17`)

### 2.1 영향 file

```
src/data/scriptedText/friend-01.en.json
src/data/scriptedText/friend-01.ja.json
src/data/scriptedText/friend-01.zh-CN.json
```

본 cycle은 `cases/generated/friend-01.{en,ja,zh-CN}.json` 영역 **변경 없음** — Authority 변경이 narrativeTriggers field 부착만이고 dossier label 또는 dispute name 변경은 없음.

### 2.2 channels.emergence_narrative entries 추가

본 cycle은 emergence_narrative channel에 다음 3 entries 추가:

| Entry key | type | id field | KO variants count | 외국어 sync 필요 (× 3 lang) |
|---|---|---|---|---|
| `emerge-e-7` | 신규 | evidenceId: "e-7" | 12 | 36 |
| `emerge-d-5` | 신규 | disputeId: "d-5" | 12 | 36 |
| `emerge-dc-5` | 신규 | dossierCardId: "dc-5" | 12 | 36 |
| **합계** | | | **36** | **108** |

⚠ 3 entries 모두 **신규 entry** — 외국어 file의 `channels.emergence_narrative.entries` 배열에 신규 entry append.

### 2.3 entry 식별 방법

KO 변경 영역 정확 확인:
```bash
git diff (merge-base)..df326a17 -- src/data/scriptedText/friend-01.json
# 또는
git show df326a17 -- src/data/scriptedText/friend-01.json
```

각 KO entry의 id가 외국어 영역의 신규 variants id와 정확히 일치해야 함. tags 영역은 KO와 동일 유지 (시스템 lookup).

### 2.4 KO entry 본질 (번역 frame)

각 variant는 `{ id, text, behaviorHint, tags }` 4 필드. 다음 영역만 외국어로 변환:

- `text` — NPC/판사 발화 본문
- `behaviorHint` — 표현 보조 hint (시연 dynamics)
- `id` / `tags` — 변경 X (시스템 lookup)

### 2.5 캐릭터 frame 다국어 보존 (필수)

본 cycle의 character integrity는 다국어에서도 동일 frame:

| 캐릭터 | KO frame | 다국어 보존 영역 |
|---|---|---|
| **B (최수민)** `affect_flattening` | 자제·단답 frame. e-7 outburst-b는 1문장 단발 격앙 (이례적 허용) | EN: restrained / single brief outburst at e-7 T3 / JA: 控えめ / e-7 T3だけ短い激しい一言 / ZH-CN: 克制 / e-7 T3只一句激动 |
| **A (송다은)** `premature_summary` | 결론 먼저 + 단정 방어 frame (본 cycle은 점진적 약화) | EN: assertive denial → softening / JA: 結論先・断定防御 → 弱化 / ZH-CN: 先下结论・坚持防御 → 软化 |
| **판사 (judge)** | 격식·중립·관찰자 어법 — "정리/분리/등재/채택" 행위 어휘. "선/흐름/낙인/매도" 평가 어휘 회피 (단서명/쟁점명 인용은 OK) | EN: dispassionate procedural / JA: 格式・中立・観察者 / ZH-CN: 格式・中立・观察者 |

### 2.6 본 cycle 종결감 보존 (dc-5 영역)

본 cycle은 friend-01 narrative wrapper 영역 마지막 cycle = **사건 전체 종료**. dc-5 cascade-d5 영역의 종결감을 다국어에서도 보존:

| Entry id | KO 종결감 표현 | 다국어 보존 영역 |
|---|---|---|
| `emerge-dc5-via-cascade-d5-judge-decree-v1` | "본 법정에 [낙인의 순서] 단서를 등록합니다" | 단서명 인용 + 격식 |
| `emerge-dc5-via-cascade-d5-a-react-v1` | behaviorHint "송다은의 어깨가 처음으로 내려간다" | 행위 hint 일관 (단정 책임 인지 시작) |
| `emerge-dc5-via-cascade-d5-b-react-v1` | behaviorHint "최수민의 시선이 처음으로 송다은을 정면으로 향한다" | 행위 hint 일관 (직시 시작) |

---

## §3. cascade priorCard reference text 다국어 보존

본 cycle의 cascade trigger entries는 priorCard reference text를 본문에 포함. 다국어 번역 시 referent 단서/쟁점/증거/증인 이름이 정확히 일관해야 함:

| cascade entry prefix | priorCard | referent text (KO 본문) | 다국어 referent 보존 영역 |
|---|---|---|---|
| `emerge-e7-via-cascade-d4-` | d-4 | "[과거 손절과 아버지의 사기] 쟁점" / "[같은 부탁] 단서" | d-4 dispute name + dc-3 label 다국어 동일 |
| `emerge-e7-via-cascade-w3-` | w-3 | "오미경 씨" (w-3 name) | w-3 witness name 다국어 동일 |
| `emerge-d5-via-cascade-e7-` | e-7 | "[두 시점 대조표]" (e-7 surfaceName) | e-7 surfaceName 다국어 신규 baseline |
| `emerge-d5-via-cascade-dc4-` | dc-4 | "[손절의 이유] 단서" (dc-4 label) | dc-4 label 다국어 동일 (Cycle 8b 영역) |
| `emerge-dc5-via-cascade-d5-` | d-5 | "[단톡방 매도와 명예훼손] 쟁점" 직접 인용 X — "현재 단톡방 발언 쟁점" 행위 frame | d-5 dispute name 직접 인용 회피 (그룹 5 단어 봉인) |
| `emerge-dc5-via-combo-` | (combine-7) | "[공통 대화방 캡처]" (e-2 surfaceName) + "[두 시점 대조표]" (e-7 surfaceName) | e-2 surfaceName "공통 대화방 캡처" + e-7 surfaceName 다국어 일관 |

### 3.1 surfaceName 다국어 baseline (신규 — e-7 / 기존 — e-2)

e-7 surfaceName "두 시점 대조표" 신규 baseline 제안:
| 영역 | KO | EN baseline 제안 | JA baseline 제안 | ZH-CN baseline 제안 |
|---|---|---|---|---|
| e-7 surfaceName | 두 시점 대조표 | Then-and-Now Comparison | 二つの時点の対比表 | 两个时点对照表 |

e-2 surfaceName "공통 대화방 캡처" 기존 baseline 검토 (기존 다국어 file에 어떤 표현 있는지 확인 + 일관):
| 영역 | KO | 기존 baseline (검토) |
|---|---|---|
| e-2 surfaceName | 공통 대화방 캡처 | EN/JA/ZH-CN file `friend-01` 영역에서 grep 후 일관 |

### 3.2 dossier label 다국어 baseline (신규 — dc-5)

dc-5 label "낙인의 순서" 신규 baseline 제안:
| 영역 | KO | EN baseline 제안 | JA baseline 제안 | ZH-CN baseline 제안 |
|---|---|---|---|---|
| dc-5 label | 낙인의 순서 | The Order of Public Judgment | 烙印の順序 | 烙印的顺序 |

**주의**: "낙인" 단어 자체는 다국어에서도 그룹 5 keyword 영역이지만, **단서명 직접 인용**은 정책 권위로 허용 (KO에서도 `feedback_judge_dispassionate_action_focused` 권위 — 본문 평가 어휘 X, 단서명 인용은 OK).

### 3.3 dispute name 다국어 baseline (신규 — d-5)

d-5 dispute name "단톡방 매도와 명예훼손" 다국어 baseline 제안:
| 영역 | KO | EN baseline 제안 | JA baseline 제안 | ZH-CN baseline 제안 |
|---|---|---|---|---|
| d-5 dispute name | 단톡방 매도와 명예훼손 | Group Chat Denunciation and Defamation | グループチャットでの非難と名誉毀損 | 群聊指责与名誉毁损 |

**주의**: d-5 dispute name 자체에 그룹 5 단어 ("매도" / "명예훼손") 포함. **본 cycle entry text 본문에서는 d-5 dispute name 직접 인용 회피** — KO에서도 entry text는 "단톡방 발언" / "공개 매도" 행위 frame으로 처리. 다국어에서도 동일 패턴.

---

## §4. 진실 노출 정책 다국어 보존 (그룹 5 surface tier 단독)

[[design_friend01_truth_disclosure_policy]] 권위 — 본 cycle 영역의 그룹 5 단어 다국어 baseline:

| 영역 | KO | EN | JA | ZH-CN |
|---|---|---|---|---|
| 확인 없이 매도 | 확인 없이 매도 | denunciation without verification | 確認なしの非難 | 未经核实的指责 |
| 명예훼손 | 명예훼손 | defamation | 名誉毀損 | 名誉毁损 |
| 먼저 낙인 | 먼저 낙인 | first stigmatized | 先に烙印を押す | 先打烙印 |
| B 또 악역 | B 또 악역 | B as the villain again | Bがまた悪役に | B又当恶人 |
| 반복 침묵 | 반복 침묵 | repeated silence | 繰り返しの沈黙 | 反复沉默 |

⚠ 본 cycle 36 entry text 본문에는 위 단어들이 **등장 X** (d-5 S0~S2 surface 영역 봉인). 다국어 번역 시에도 동일 봉인 — 본문에 위 단어 다국어 표현 직접 등장 X. 단 단서명 (dc-5 "[낙인의 순서]") + dispute name 인용은 위 §3.2 / §3.3 영역만 OK.

### 그룹 2 단어 다국어 (본 cycle reference 영역만 OK)

| 영역 | KO | EN | JA | ZH-CN |
|---|---|---|---|---|
| 아버지의 사기 | 아버지의 사기 | her father's fraud | 父の詐欺 | 父亲诈骗 |

본 cycle entry text 중 `emerge-e7-via-cascade-d4-judge-decree-v1` 영역에 "[과거 손절과 아버지의 사기] 쟁점" 인용 1건 (d-4 dispute name 인용). 다국어에서도 동일 인용 — d-4 dispute name 다국어 baseline 그대로.

---

## §5. 검증 (Codex 작업 완료 시점)

작업 완료 후 다음 검증 모두 PASS:

```bash
npx tsc --noEmit
npm run build               # vite worktree issue 시 사용자가 main worktree에서 확인
npm run -s qa:fast          # RELEASE READY (static P0=0, route P0=0)
node scripts/detect-truth-leak.cjs --strict   # findings=0 (KO/EN/JA/ZH-CN 모두)
```

scriptedVariants 변화: KO baseline (`df326a17`) = 15077 → 외국어 sync 완료 시 +108 변화 영역 (외국어 channel 별도 영역).

### 보고 시 검증 출력 4종 강제

`feedback_codex_ide_parallel_same_worktree` 권위:
1. `git diff --stat` (변경 line 수 정량)
2. Node script 결과 — 각 lang file의 `emerge-e-7` / `emerge-d-5` / `emerge-dc-5` 각 12 외국어 variants 확인:
   ```bash
   node -e "for (const lang of ['en','ja','zh-CN']) { const f=require('./src/data/scriptedText/friend-01.'+lang+'.json'); const c=f.channels.emergence_narrative; const e7=c.entries.find(e=>e.key==='emerge-e-7'); const d5=c.entries.find(e=>e.key==='emerge-d-5'); const dc5=c.entries.find(e=>e.key==='emerge-dc-5'); console.log(lang+':', e7?.variants.length, d5?.variants.length, dc5?.variants.length); }"
   ```
3. 검증 명령 결과 (tsc/qa:fast/truth-leak)
4. `ls -la --time-style=full-iso src/data/scriptedText/friend-01.*.json` (file 수정 시각 확인)

### 검증 PASS 후 commit + push

```bash
git add src/data/scriptedText/friend-01.en.json src/data/scriptedText/friend-01.ja.json src/data/scriptedText/friend-01.zh-CN.json
git commit -m "i18n(friend-01): Cycle 9 Line D narrative wrapper 다국어 sync — emergence_narrative 36 entries × 3 lang (e-7/d-5/dc-5)"
git push -u origin codex/friend01-cycle9-narrative-multilang
```

---

## §6. 메인 Claude 세션 사후 통합

본 Codex sync 완료 → 메인 세션(ws-friend-01-cycle-9 worktree, branch `friend-01-cycle-9`)에서 8단계 사후 통합:
- `git fetch origin` + `git log origin/codex/friend01-cycle9-narrative-multilang` 확인
- 변경 영역 정합 검증 (3 file × 36 외국어 variants = 108 외국어 variants)
- 통합 방식: 본 cycle은 단일 thread + 단일 channel 영역 → **fast-forward merge** 가능
- 최종 검증 (tsc/qa:fast/truth-leak strict 4 lang)
- 사용자가 main 통합

### 통합 후 사건 종결

본 통합 완료 = friend-01 사건의 narrative wrapper 영역 전체 완료. Cycle 10 영역은 family-01 또는 spouse-01 다른 영역 cycle.
