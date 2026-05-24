# Codex Thread — family-01 Cycle 6 Line B 20년 돈 다국어 sync

작성일: 2026-05-24
주체: Codex worktree (baseline anchor 영역)
범위:
1. 신규 entries `emergence_narrative` channel — 2 emergence × 19 KO variant × 3 lang = **57 외국어 variant**
2. **신규 패턴** — dispute_dossier_combined (entry.disputeId + entry.dossierCardId 둘 다 부착)
3. 그룹 2 (정후 돈) surface 영역 다국어 보존 (Cycle 5에서 회피했던 영역, 본 cycle entry 시작점)
4. 미스터리 dynamics 다국어 효과 유지 (B 어머니 뜻 frame / A 의심 frame / 재판관 동기 별도 영역)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/family01-cycle6-multilang ../ws-family01-cycle6-multilang main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean |
| PowerShell 회피 | Write/Edit tool로만 변경 (인코딩 mojibake 회피) |
| 산출 | branch `codex/family01-cycle6-multilang` push |

---

## §1. 작업 배경

family-01 (윤태성 vs 윤정후 형제 유산 다툼)의 **Line B 20년 돈** narrative wrapper cycle. Cycle 5 (Line A 절차/판단) 완료 후 자연 후속.

- KO commit: main HEAD `40fbecf2` 적용 완료
  - `src/data/scriptedText/family-01.json` channels.emergence_narrative 신규 group 2 추가 (emerge-d3-dc3 12 variant + emerge-w-3 7 variant)
  - `src/data/coreCases/family-01.case.ts` d-3 + w-3 narrativeTriggers field 부착
  - `src/data/coreCases/family-01.narrative.ts` d3NarrativeTriggers + w3NarrativeTriggers 신규 export
  - 신규 runtime helper: `forceUnlockDossierNode` (combinationLabSlice) + force-unlock 통합 (narrativeIntegration + useDiscoveryIntegration)
- 본 작업: EN/JA/ZH-CN sync (57 외국어 variant)

### Brief 정독 권장

- `docs/design/core-narrative-cycle6-family01-money-line-20260524/` 전체
  - 특히 `README.md` + `gpt-pro-brief.md` + `family01-tone-samples.md`
  - `result/output-cycle6-family01-line-b.json` (KO 출력 + tag 영역 참조)

### Line B 처리 emergence

| 영역 | id | 자연 명칭 | trigger × variants |
|---|---|---|---|
| **쟁점+단서 통합** | `d-3` + `dc-3` | **오래된 지원의 출처** + **20년의 돈** | 5 × 12 |
| 증인 | `w-3` | 박순애 (어머니의 오랜 지인) | 3 × 7 |
| **합계** | | | **8 × 19** |

### 본 cycle 처리의 *narrative 핵심* — Line A → Line B 자연 후속

```
[Line A 결과 — Cycle 5 완료]
  단서 [수정된 유언장] 등록 → "왜 어머니가 원래 자필로 90:10이었나?" 질문 surface

[Line B — 본 cycle, 첫 답 = 경제적 측면]
  답: "동생 윤정후가 20년간 형 공장 위기 비밀 지원"
  → d-3 (오래된 지원의 출처) + dc-3 (20년의 돈) + w-3 (박순애 증인)

[Line C — Cycle 7, 두 번째 답 = 정체성·관계 측면]
  답: 출생 비밀 + 친자 양보 — 본 cycle 절대 X
```

---

## §2. KO baseline (main HEAD `40fbecf2`)

### 영향 파일 (외국어 작업 영역)

```
src/data/scriptedText/family-01.en.json  channels.emergence_narrative (entries 2 신규 group 추가)
src/data/scriptedText/family-01.ja.json  channels.emergence_narrative (entries 2 신규 group 추가)
src/data/scriptedText/family-01.zh-CN.json  channels.emergence_narrative (entries 2 신규 group 추가)
```

### 19 variant 구조

KO baseline 직접 참조:
```
git show main:src/data/scriptedText/family-01.json | grep -A2 "\"key\": \"emerge-d3-dc3\"\\|\"key\": \"emerge-w-3\""
```

전체 entry id 목록 (canonical order):

#### emerge-d3-dc3 (통합 event — dispute_dossier_combined 신규 패턴) — 12 variants

| Trigger | entry id | speaker |
|---|---|---|
| cascade_from_card (priorCard:dc-2) | `emerge-d3-dc3-via-cascade-judge-decree-v1` | judge |
|   | `emerge-d3-dc3-via-cascade-b-respond-v1` | b |
| combination_result (recipeId:combine-6) | `emerge-d3-dc3-via-combo-judge-decree-v1` | judge |
|   | `emerge-d3-dc3-via-combo-b-respond-v1` | b |
| npc_interjection (source:a) | `emerge-d3-dc3-via-a-interject-v1` | a |
|   | `emerge-d3-dc3-via-a-interject-judge-react-v1` | judge |
|   | `emerge-d3-dc3-via-a-interject-judge-decree-v1` | judge |
| emotional_outburst (source:b) | `emerge-d3-dc3-via-b-outburst-v1` | b |
|   | `emerge-d3-dc3-via-b-outburst-judge-react-v1` | judge |
|   | `emerge-d3-dc3-via-b-outburst-judge-decree-v1` | judge |
| judge_auto_mention | `emerge-d3-dc3-via-judge-auto-decree-v1` | judge |
|   | `emerge-d3-dc3-via-judge-auto-b-respond-v1` | b |

**Entry meta**: `disputeId:d-3` + `dossierCardId:dc-3` + `linkedParty:b` (한 entry에 두 layer 부착 — 신규 패턴)

#### emerge-w-3 (witness 박순애) — 7 variants

| Trigger | entry id | speaker |
|---|---|---|
| cascade_from_card (priorCard:dc-3) | `emerge-w3-via-cascade-judge-summon-v1` | judge |
|   | `emerge-w3-via-cascade-a-react-v1` | a |
| npc_interjection (source:b) | `emerge-w3-via-b-interject-v1` | b |
|   | `emerge-w3-via-b-interject-judge-react-v1` | judge |
|   | `emerge-w3-via-b-interject-judge-summon-v1` | judge |
| judge_auto_mention | `emerge-w3-via-judge-auto-summon-v1` | judge |
|   | `emerge-w3-via-judge-auto-b-respond-v1` | b |

**Entry meta**: `witnessId:w-3` + `disputeId:d-3` + `linkedParty:b`

---

## §3. 다국어 번역 원칙

### 3.1. 판사 영역 — 본 cycle 미스터리 dynamics 핵심

판사 decree 모두 "동기 영역 별도 분리" 명시 유지 (d-4 hook):

| KO 표현 | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "자금 이동의 동기는 별도 영역으로 둡니다." | "The motive behind the fund transfers will be addressed in a separate domain." | "資金移動の動機については別の領域として扱います。" | "资金转移的动机另立议题处理。" |
| "결정의 동기는 별도 영역으로 둡니다." | "The motive behind that decision will be addressed in a separate domain." | "決定の動機については別の領域として扱います。" | "做出该决定的动机另立议题处理。" |
| "흐름의 동기는 별도 영역으로 둡니다." | "The motive behind this flow will be addressed in a separate domain." | "この流れの動機については別の領域として扱います。" | "这一流向的动机另立议题处理。" |

### 3.2. 윤태성(A) 발화 — 의심 frame 자기방어 dynamics

A는 자존심 frame 첫 흔들림 → 즉시 *의심 frame* (정후가 어머니 통제) 자기방어. 단순 분노 X.

| KO | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "정후 이놈이 어머니한테 무슨 짓 한 거 아니야?" | "Did Jeong-hu pull something with our mother?" | "ジョンフの奴、母さんに何かしたんじゃないか?" | "正厚那家伙是不是对母亲做了什么?" |
| "어머니 명의를 앞세워 자기 돈으로 나를 묶어둔 거잖아!" | "He used Mother's name to tie me down with his own money!" | "母さんの名義を盾に、自分の金で兄を縛っていたんだろう!" | "他借母亲的名义,用自己的钱把我绑住了!" |
| (재판관 대상 격식) "재판관님, 그게 무슨 말씀입니까." | "Your Honor, what do you mean by that?" | "裁判官、それはどういうことですか。" | "审判官,您这话是什么意思?" |
| (어머니 시점) "어머니가 그동안 도와주신 돈인데…" | "It's money our mother has been giving us all this time..." | "母さんが今までずっと助けてくれていたお金なのに…" | "这是母亲一直以来帮我们的钱啊…" |

**A → B 호칭**: 동생 직호 시 *반말* 일관. 재판관 대상은 격식. dynamic 전환 자연 보존.

### 3.3. 윤정후(B) 발화 — "어머니 뜻" frame 회피 dynamics

B는 20년 침묵 처음 입 열음. 단 **본인 동기 일체 표현 X**. "어머니 뜻" frame으로 회피 — *진짜 어머니 뜻인가, 책임 전가인가?* 미스터리 유지.

| KO | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "어머니께서 저를 통해 보내신 일입니다." | "Mother sent it through me." | "母が私を通して送られたものです。" | "是母亲通过我寄出的。" |
| "그 뜻을 다르게 말하기 어렵습니다." | "I cannot put her intent any differently." | "その意を他に言いようがありません。" | "她的意思无法另作他解。" |
| "형이 알게 하고 싶지 않으셨습니다." | "She did not want my brother to know." | "兄に知られたくないとのお考えでした。" | "她不愿让哥哥知道。" |
| "어머니께서 그 시절 자주 만나신 분이 한 분 계십니다." | "There is someone our mother often met with at the time." | "母があの頃よく会われていた方が一人いらっしゃいます。" | "母亲那段时间常会面的一位长辈在。" |
| "제가 보낸 일도 알고 계셨던 분입니다." | "She knew of the transfers I made." | "私の送金のことも知っておられた方です。" | "我寄钱的事她也知道。" |

**B 어머니 시점 표현 핵심**: "어머니께서 ...하셨다" / "어머니께서 ...셨다" 어머니 주체화. *본인 동기 회피 미스터리화*.

**B → A 호칭**: "형 / 형님" 격식 (재판관 대상 발화이므로 격식 유지).

### 3.4. 어머니 호칭 (family-01 특이)

- 양 형제 모두 본인 어머니 = 자기 시점 호칭 (`feedback_family_address_speaker_perspective` 권위)
  - KO: 어머니 / 우리 어머니
  - EN: mother / our mother
  - JA: 母 / お母さん / 母さん
  - ZH-CN: 母亲 / 妈妈
- 판사 → A/B의 어머니 = 외부 시점이므로 *직접 호명* 회피, 본 cycle 영역 X
- w-3 (박순애) → 어머니 = "어머니" 인용 (제3자가 어머니 발화 인용 시 자연 호칭)

### 3.5. 단서/쟁점 명칭 변경 (Cycle 5 신규, 본 cycle 적용)

`feedback_dossier_card_renamed_to_clue.md` 권위. player-visible text에서:

| Layer | KO | EN | JA | ZH-CN |
|---|---|---|---|---|
| 단서 (일반) | 단서 | clue | 手がかり | 线索 |
| evidence (구분) | 증거 | evidence | 証拠 | 证据 |

본 cycle entry text에 등장:
- `[수정된 유언장]` (Cycle 5 baseline 다국어 적용 완료 — 그대로 재사용):
  - EN: `[Amended Will]`
  - JA: `[修正された遺言書]`
  - ZH-CN: `[修订过的遗嘱]`
- `[20년의 돈]` (본 cycle 신규):
  - EN: `[Twenty Years of Money]` 또는 `[The Twenty-Year Money]`
  - JA: `[二十年の金]` 또는 `[二十年分の送金]`
  - ZH-CN: `[二十年的钱]` 또는 `[二十年的资金]`

⚠ `[20년의 돈]` 다국어 라벨은 Codex가 자연성 + dossier 패널 카드 라벨로 적합한 길이 검토 후 결정. 단 case.ts `dc-3.label` 영역의 외국어 표현과 일관 — `git show main:src/data/coreCases/family-01.case.ts` 영역에서 lookup. **만약 case.ts dc-3 label 외국어 표현 baseline이 없으면, 본 작업에서 case.ts 변경 X — entry text에서만 일관 사용**.

### 3.6. cascade_from_card priorCard reference 다국어 보존

본 cycle cascade 사용:
- d-3 cascade (priorCard:dc-2) — text 본문에 `[수정된 유언장]` reference
- w-3 cascade (priorCard:dc-3) — text 본문에 `[20년의 돈]` reference

다국어 번역 시:
- `priorCard:dc-2` / `priorCard:dc-3` tag → 그대로 (번역 X)
- text 본문의 단서 reference는 §3.5 lookup table 일관

### 3.7. dynamics 차별성 보존

각 trigger마다 NPC 인지 상태가 다름:
- cascade_from_card: 이전 단서 결과의 자연 연속 — 판사 정리적 톤 (이전 reference 명시 인용)
- combination_result (combine-6): B의 "어머니 뜻" 진술 + e-6 송금 자료 조합 — 판사 분석적 톤 + B respond에 "어머니 뜻" frame 보강 ("어머니께서 저를 통해 보내신 일입니다")
- npc_interjection (a): A의 자존심 frame 첫 흔들림 → 의심 자기방어 (부정→충격→의심 3단계)
- emotional_outburst (b): B의 20년 침묵 처음 입 열음 — 무거운 톤, 어머니 주체화 표현
- judge_auto_mention: 일정 turn fallback — 판사 결정·종결 (사실 진술, 평가 어휘 회피)

각 NPC/판사 발화 entry는 위 dynamics를 다국어에서 손실 X.

### 3.8. 재판관 어법 (`feedback_judge_dispassionate_action_focused`)

다국어 판사 entry에서도 정책 준수:

- 감정·가치 어휘 회피 ("선을 넘다" / "흐름" 단순 평가 등)
- 사실/행위/선후관계 중심 어휘
- "반증" → "관련" 중립 표현
- 증인 호출 동사 다양화 — w-3 호출 3 trigger에 다양화 (KO baseline: cascade=모시겠습니다 / interject=확인하겠습니다+모시겠습니다 / auto=들어보겠습니다)
  - EN: cascade="bring before the court" / interject="have her testimony heard / call her forward" / auto="hear directly from"
  - JA: cascade="証人としてお迎えいたします" / interject="その方の証言を確認します + お招きいたします" / auto="直接お聞きします"
  - ZH-CN: cascade="请...作为证人出庭" / interject="确认其陈述 + 请...到庭" / auto="直接听取...的证词"
- "단정" 평가 어휘 회피 — 본 cycle entry에서 판사 발화는 *fact* 영역만 명시. *동기*는 분리.

### 3.9. 진실 노출 정책 (Line B 영역)

`design_family01_truth_disclosure_policy.md` 권위. **본 cycle은 그룹 2 surface 진입** (정후 돈 영역). 단 그룹 1/3/4 + 그룹 2 hidden은 절대 금지:

| 그룹 | KO 금지 표현 (다국어 모두 회피) |
|---|---|
| **1 출생 비밀** (d-4 영역) | 출생 비밀 / 친자가 아니다 / 배다른 / 아버지 피 |
| **2 hidden** (S5만, 본 cycle X) | 3억원 / 20년 비밀 지원 / 월 단위 정기 지원금 |
| **3 자필 90:10** (d-5 S5만) | 자필 90:10 / 공증 60:40으로 축소 |
| **4 공장 양보** (d-4 영역) | 공장 양보 / 친자가 양보 / 형 자존심 |
| **5 보호 명분** (d-5 영역) | 유산 당연시 / 보호 명분 / 두 번 왜곡 |

| 그룹 2 **OK (본 cycle 영역)** |
|---|
| 윤정후 측에서 보낸 자금 / 어머니 통장을 거친 자금 / 어머니 명의 자금의 상당수가 윤정후 측 자금 |

KO에서는 이 영역 모두 처리됨. 다국어 번역 시 위 표현 직역 또는 우회 등장 회피.

---

## §4. surface-name gate 외국어 회귀 검출

**e-6 surfaceName 영역 핵심**:
- KO baseline lockedName: `오래된 계좌 흐름` (entry text 등장 금지)
- KO baseline surfaceName: `오래된 송금 내역 묶음` (entry text 사용 OK)
- 외국어 baseline e-6 lockedName/surfaceName 영역 직접 확인:
  ```
  git show main:src/data/coreCases/family-01.case.ts | grep -B2 -A8 "id: 'e-6'"
  ```
  ※ case.ts는 KO 영역만 — 외국어 baseline은 ScriptedText의 evidence label 영역 lookup:
  ```
  git show main:src/data/scriptedText/family-01.en.json | grep "오래된\|account\|transfer"
  ```

### 외국어 entry 생성 시 self-check

- e-6 entry text 작성 시 surfaceName 사용 (lockedName 직접 X) — 본 cycle 영역 핵심
- 다른 evidence (e-1, e-2, e-4, e-5, e-7)도 동일 정책

---

## §5. 작업 단계

### 5.1. KO baseline 확인

```
git show main:src/data/scriptedText/family-01.json | grep -B2 -A60 "emerge-d3-dc3\|emerge-w-3"
```

또는 본 폴더 brief 폴더 `docs/design/core-narrative-cycle6-family01-money-line-20260524/result/output-cycle6-family01-line-b.json` 직접 참조 (KO 출력 + tag 영역).

### 5.2. 외국어 emergence_narrative entries 추가

`src/data/scriptedText/family-01.en.json`, `.ja.json`, `.zh-CN.json` 모두 `channels.emergence_narrative.entries` 영역에 신규 2 group append (KO와 동일 구조 — id 동일, text 번역, behaviorHint 번역, tags 그대로).

기존 Cycle 5 6 group 보존, 새로 2 group 끝에 추가.

### 5.3. tag 영역

본 cycle entry 모두 다음 tag 일관 (KO baseline 영역 normalize 적용):
- `channel:emergence_narrative`
- `caseId:family-01`
- `disputeId:d-3` (모든 entry)
- `dossierCardId:dc-3` (emerge-d3-dc3 group만)
- `witnessId:w-3` (emerge-w-3 group만)
- `linkedParty:b`
- `scope:all_present`
- `revealScope:all_present`
- `register:formal`
- `honorific:formal`
- `relationship:family`
- `reveal:none`
- `disclosure:guarded`
- `trigger:<trigger_type>` (entry별)
- `priorCard:<id>` (cascade entry만)
- `recipeId:<id>` (combo entry만)
- `source:a` 또는 `source:b` (npc_interjection / emotional_outburst entry만)
- `emotion:<value>` / `continuity:<value>` (KO baseline 영역 그대로)

⚠ KO normalize 영역에서 다음 tag는 *제거*되어 있음 (Cycle 5 normalize 영역 적용):
- `case:family-01` (→ `caseId:family-01`로 변환)
- `firstFiredWins:true` (default)
- `emergenceType:...` (제거)
- `targetClue:...` / `clueLabel:...` / `targetWitness:...` / `targetDispute:...` (제거)
- `scope:judge_only` (→ `scope:all_present`로 변환)
- `revealScope:judge_only` (→ `revealScope:all_present`로 변환)

다국어도 KO baseline tag 영역 그대로 사용 (normalize 영역 보존).

### 5.4. 검증

```
git status --short  # 외국어 3 file만 modified 기대
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/family-01.en.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/family-01.ja.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/family-01.zh-CN.json','utf8'))"
npx tsc --noEmit
npm run build  # tsc -b --force + vite build
npm run -s qa:fast 2>&1 | tail -20  # static P0=0, route P0=0 확인 — RELEASE READY
```

⚠ qa:fast P0 발생 시 surface-name gate / truth-leak gate 위반일 가능성 높음. `tmp/qa-runtime-gate-results/findings.json` 에서 severity:"P0" filter로 정확한 위치/메시지 식별 후 fix.

---

## §6. 산출

```
git add src/data/scriptedText/family-01.en.json \
        src/data/scriptedText/family-01.ja.json \
        src/data/scriptedText/family-01.zh-CN.json
git commit -m "i18n(family-01): sync Cycle 6 Line B — 20년 돈 2 emergence narrative (19 variant × 3 lang) + 통합 event 패턴 + 그룹 2 surface 진입 외국어"
git push -u origin codex/family01-cycle6-multilang
```

main session이 fast-forward merge 처리.

---

## §7. 참고 — Cycle 7 진입 시 처리 예정

본 cycle 다국어 sync 완료 후 다음 cycle 진입 시 처리 예정:

| Cycle | Line | emergence | 처리 영역 |
|---|---|---|---|
| **7** | C (비밀+최종) | d-4, e-7, dc-4, d-5, e-5, dc-5 (6개) | 그룹 1/3/4/5 본격 진입 (출생 비밀 + 자필 90:10 + 공장 양보 + 유산 당연시). 진실 노출 정책 가장 민감 영역 |

본 cycle은 그룹 2 (정후 돈) surface 시작점. 그룹 1/3/4/5는 Cycle 7 영역.
