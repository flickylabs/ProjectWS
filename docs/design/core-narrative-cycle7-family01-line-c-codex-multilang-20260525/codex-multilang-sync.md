# Codex Thread — family-01 Cycle 7 Line C 비밀+최종 다국어 sync

작성일: 2026-05-25
주체: Codex worktree (baseline anchor 영역)
범위:
1. 신규 entries `emergence_narrative` channel — 6 emergence × 61 KO variant × 3 lang = **183 외국어 variant**
2. **신규 패턴** — 다중 cascade (d-5 priorCard:dc-4 + priorCard:e-7, entry id `-cascade-e7-` 영역 구분) + 다중 recipe (dc-4 combo combine-4 + combine-7, narrative.ts 영역 분리 but ScriptedText 단일 entry pair)
3. 그룹 1 (출생 비밀) + 그룹 4 (친자 양보) + 그룹 5 (보호 명분) surface 영역 다국어 보존 (Cycle 6에서 회피했던 정체성·관계 영역, 본 cycle entry 시작점)
4. **그룹 3 (자필 90:10) + 친부 실명 봉인 정밀 검증** — 본 cycle 가장 엄격 정책
5. 미스터리 dynamics 다국어 효과 유지 (B "보호 명분" frame 첫 명시 / A "장남 당연시 frame" 첫 흔들림 → 책임 인식 / 재판관 "책임 구조 영역 분리 + 정확 비율 봉인")

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/family01-cycle7-multilang ../ws-family01-cycle7-multilang main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean |
| PowerShell 회피 | Write/Edit tool로만 변경 (인코딩 mojibake 회피) |
| 산출 | branch `codex/family01-cycle7-multilang` push |

---

## §1. 작업 배경

family-01 (윤태성 vs 윤정후 형제 유산 다툼)의 **Line C 비밀+최종** narrative wrapper cycle. Cycle 5 (Line A 절차/판단) + Cycle 6 (Line B 20년 돈) 완료 후 자연 후속. 사건 마지막 line.

- KO commit: main HEAD `c7534184` 적용 완료
  - `src/data/scriptedText/family-01.json` channels.emergence_narrative 신규 group 6 추가 (emerge-d-4 12 + emerge-e-7 10 + emerge-dc-4 9 + emerge-d-5 12 + emerge-e-5 9 + emerge-dc-5 9)
  - `src/data/coreCases/family-01.case.ts` d-4 + e-7 + dc-4 + d-5 + e-5 + dc-5 narrativeTriggers field 부착
  - `src/data/coreCases/family-01.narrative.ts` 신규 export 6종 (d4 / e7 / dc4 / d5 / e5 / dc5 NarrativeTriggers)
- 본 작업: EN/JA/ZH-CN sync (183 외국어 variant)

### Brief 정독 권장

- `docs/design/core-narrative-cycle7-family01-line-c-20260525/` 전체
  - 특히 각 batch 폴더 `README.md` + `gpt-pro-brief.md` + `family01-tone-samples.md`
  - 각 batch 폴더 `result/output-cycle7-batch{1,2,3}-*.json` (KO 출력 + tag 영역 참조)

### Line C 처리 emergence (3 batch 통합)

| 영역 | id | 자연 명칭 | trigger × variants |
|---|---|---|---|
| 쟁점 | `d-4` | 가족 기록과 침묵의 이유 | 5 × 12 |
| 증거 | `e-7` | 오래된 노트 사본 (lockedName=어머니 일기장) | 4 × 10 |
| 단서 | `dc-4` | 감춘 이유 | 5 × 9 |
| 쟁점 | `d-5` | 어머니의 숨겨진 마음 | 5 × 12 |
| 증거 | `e-5` | 자필 메모 사본 (lockedName=어머니 자필 유언장 연습본) | 4 × 9 |
| 단서 | `dc-5` | 어머니의 뜻 (최종) | 4 × 9 |
| **합계** | | | **27 × 61** |

### 본 cycle 처리의 *narrative 핵심* — Line B → Line C 자연 후속

```
[Line A 결과 — Cycle 5 완료]
  단서 [수정된 유언장] 등록 → "왜 어머니가 원래 자필로 90:10이었나?" 질문 surface

[Line B 결과 — Cycle 6 완료]
  단서 [20년의 돈] 등록 → 답 = 동생 윤정후 비밀 지원 (경제적 측면)
  → 재판관 "흐름의 동기는 별도 영역으로 둡니다" (d-4 hook 명시)

[Line C — 본 cycle, 두 번째 답 = 정체성·관계 측면]
  답: 출생 비밀 + 친자 양보 + 보호 명분 + 양측 책임축
  → d-4 (가족 기록과 침묵의 이유) + e-7 (오래된 노트 사본) → dc-4 (감춘 이유) →
     d-5 (어머니의 숨겨진 마음) → e-5 (자필 메모 사본) → dc-5 (어머니의 뜻)
  → 단 정확 수치 (자필 90:10 / 공증 60:40)는 d-5 S5 봉인 영역 — 본 cycle 모든 batch 절대 X
```

---

## §2. KO baseline (main HEAD `c7534184`)

### 영향 파일 (외국어 작업 영역)

```
src/data/scriptedText/family-01.en.json   channels.emergence_narrative (entries 6 신규 group 추가)
src/data/scriptedText/family-01.ja.json   channels.emergence_narrative (entries 6 신규 group 추가)
src/data/scriptedText/family-01.zh-CN.json   channels.emergence_narrative (entries 6 신규 group 추가)
```

### 61 variant 구조

KO baseline 직접 참조:
```
git show main:src/data/scriptedText/family-01.json | sed -n '/"key": "emerge-d-4"/,/"key": "emerge-d-5"/p'
```

또는 본 폴더 brief 폴더의 각 batch `result/` 직접 참조:
- `docs/design/core-narrative-cycle7-family01-line-c-20260525/batch1-d4-e7/result/output-cycle7-batch1-d4-e7.json` (22 variants)
- `docs/design/core-narrative-cycle7-family01-line-c-20260525/batch2-dc4-d5/result/output-cycle7-batch2-dc4-d5.json` (21 variants)
- `docs/design/core-narrative-cycle7-family01-line-c-20260525/batch3-e5-dc5/result/output-cycle7-batch3-e5-dc5.json` (18 variants)

⚠ batch result 파일의 tag는 GPT 출력 원본 영역 — apply 시점 normalize 적용됨. main HEAD `c7534184` 영역 family-01.json이 정확 baseline.

### 전체 entry id 목록 (canonical order)

#### emerge-d-4 (Batch 1, dispute) — 12 variants

| Trigger | entry id | speaker |
|---|---|---|
| cascade_from_card (priorCard:dc-3) | `emerge-d4-via-cascade-judge-decree-v1` | judge |
|   | `emerge-d4-via-cascade-b-respond-v1` | b |
| combination_result (recipeId:combine-4) | `emerge-d4-via-combo-judge-decree-v1` | judge |
|   | `emerge-d4-via-combo-b-respond-v1` | b |
| npc_interjection (source:b) | `emerge-d4-via-b-interject-v1` | b |
|   | `emerge-d4-via-b-interject-judge-react-v1` | judge |
|   | `emerge-d4-via-b-interject-judge-decree-v1` | judge |
| emotional_outburst (source:a) | `emerge-d4-via-a-outburst-v1` | a |
|   | `emerge-d4-via-a-outburst-judge-react-v1` | judge |
|   | `emerge-d4-via-a-outburst-judge-decree-v1` | judge |
| judge_auto_mention | `emerge-d4-via-judge-auto-decree-v1` | judge |
|   | `emerge-d4-via-judge-auto-b-respond-v1` | b |

**Entry meta**: `disputeId:d-4` + `linkedParty:b`

#### emerge-e-7 (Batch 1, evidence) — 10 variants

| Trigger | entry id | speaker |
|---|---|---|
| cascade_from_card (priorCard:d-4) | `emerge-e7-via-cascade-judge-decree-v1` | judge |
|   | `emerge-e7-via-cascade-b-respond-v1` | b |
| npc_interjection (source:b) | `emerge-e7-via-b-interject-v1` | b |
|   | `emerge-e7-via-b-interject-judge-react-v1` | judge |
|   | `emerge-e7-via-b-interject-judge-decree-v1` | judge |
| emotional_outburst (source:b) | `emerge-e7-via-b-outburst-v1` | b |
|   | `emerge-e7-via-b-outburst-judge-react-v1` | judge |
|   | `emerge-e7-via-b-outburst-judge-decree-v1` | judge |
| judge_auto_mention | `emerge-e7-via-judge-auto-decree-v1` | judge |
|   | `emerge-e7-via-judge-auto-b-respond-v1` | b |

**Entry meta**: `evidenceId:e-7` + `disputeId:d-4` + `linkedParty:b`

#### emerge-dc-4 (Batch 2, dossier) — 9 variants

| Trigger | entry id | speaker |
|---|---|---|
| cascade_from_card (priorCard:d-4) | `emerge-dc4-via-cascade-judge-decree-v1` | judge |
|   | `emerge-dc4-via-cascade-b-respond-v1` | b |
| combination_result (recipeId:combine-4 — narrative.ts 영역에서 combine-4/combine-7 두 candidate 분리, ScriptedText 단일 pair) | `emerge-dc4-via-combo-judge-decree-v1` | judge |
|   | `emerge-dc4-via-combo-b-respond-v1` | b |
| emotional_outburst (source:b) | `emerge-dc4-via-b-outburst-v1` | b |
|   | `emerge-dc4-via-b-outburst-judge-react-v1` | judge |
|   | `emerge-dc4-via-b-outburst-judge-decree-v1` | judge |
| judge_auto_mention | `emerge-dc4-via-judge-auto-decree-v1` | judge |
|   | `emerge-dc4-via-judge-auto-b-respond-v1` | b |

**Entry meta**: `dossierCardId:dc-4` + `disputeId:d-4` + `linkedParty:b`

#### emerge-d-5 (Batch 2, dispute) — 12 variants

| Trigger | entry id | speaker |
|---|---|---|
| cascade_from_card (priorCard:dc-4) ← 메인 | `emerge-d5-via-cascade-judge-decree-v1` | judge |
|   | `emerge-d5-via-cascade-b-respond-v1` | b |
| cascade_from_card (priorCard:e-7) ← 차선 | `emerge-d5-via-cascade-e7-judge-decree-v1` | judge |
|   | `emerge-d5-via-cascade-e7-b-respond-v1` | b |
| npc_interjection (source:a) | `emerge-d5-via-a-interject-v1` | a |
|   | `emerge-d5-via-a-interject-judge-react-v1` | judge |
|   | `emerge-d5-via-a-interject-judge-decree-v1` | judge |
| emotional_outburst (source:b) | `emerge-d5-via-b-outburst-v1` | b |
|   | `emerge-d5-via-b-outburst-judge-react-v1` | judge |
|   | `emerge-d5-via-b-outburst-judge-decree-v1` | judge |
| judge_auto_mention | `emerge-d5-via-judge-auto-decree-v1` | judge |
|   | `emerge-d5-via-judge-auto-b-respond-v1` | b |

**Entry meta**: `disputeId:d-5` + `linkedParty:both` (d-5는 case.ts quadrant='both_know' — 양측 책임)

#### emerge-e-5 (Batch 3, evidence) — 9 variants

| Trigger | entry id | speaker |
|---|---|---|
| cascade_from_card (priorCard:dc-4) | `emerge-e5-via-cascade-judge-decree-v1` | judge |
|   | `emerge-e5-via-cascade-b-respond-v1` | b |
| combination_result (recipeId:combine-2) | `emerge-e5-via-combo-judge-decree-v1` | judge |
|   | `emerge-e5-via-combo-b-respond-v1` | b |
| npc_interjection (source:b) | `emerge-e5-via-b-interject-v1` | b |
|   | `emerge-e5-via-b-interject-judge-react-v1` | judge |
|   | `emerge-e5-via-b-interject-judge-decree-v1` | judge |
| judge_auto_mention | `emerge-e5-via-judge-auto-decree-v1` | judge |
|   | `emerge-e5-via-judge-auto-b-respond-v1` | b |

**Entry meta**: `evidenceId:e-5` + `disputeId:d-5` + `linkedParty:b`

#### emerge-dc-5 (Batch 3, dossier 최종) — 9 variants

| Trigger | entry id | speaker |
|---|---|---|
| cascade_from_card (priorCard:d-5) | `emerge-dc5-via-cascade-judge-decree-v1` | judge |
|   | `emerge-dc5-via-cascade-b-respond-v1` | b |
| combination_result (recipeId:combine-2) | `emerge-dc5-via-combo-judge-decree-v1` | judge |
|   | `emerge-dc5-via-combo-b-respond-v1` | b |
| emotional_outburst (source:a) ← **A 책임 인식 첫 진입** | `emerge-dc5-via-a-outburst-v1` | a |
|   | `emerge-dc5-via-a-outburst-judge-react-v1` | judge |
|   | `emerge-dc5-via-a-outburst-judge-decree-v1` | judge |
| judge_auto_mention | `emerge-dc5-via-judge-auto-decree-v1` | judge |
|   | `emerge-dc5-via-judge-auto-b-respond-v1` | b |

**Entry meta**: `dossierCardId:dc-5` + `disputeId:d-5` + `linkedParty:b`

---

## §3. 다국어 번역 원칙

### 3.1. 판사 영역 — 본 cycle 미스터리 dynamics 핵심

판사 decree 모두 두 핵심 어휘 일관 명시:

#### "본 영역의 책임 구조 영역은 별도로 둡니다" (Batch 1/2 — d-5 hook)

| KO 표현 | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "본 가족 영역과 책임 구조 영역은 별도로 둡니다." | "The family-record matters and the question of responsibility will remain in separate domains." | "本件の家族領域と責任構造の領域は別の領域として扱います。" | "本案的家庭领域与责任结构议题分别处理。" |
| "본 영역의 책임 구조 영역은 별도로 둡니다." | "The matter of responsibility within this domain will be addressed separately." | "本領域の責任構造については別の領域として扱います。" | "本议题中的责任结构另立处理。" |

#### "정확한 비율 영역은 단계별로만 공개합니다" (Batch 2/3 — 그룹 3 봉인 자연어 명시)

| KO 표현 | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "정확한 비율 영역은 단계별로만 공개합니다." | "The exact ratios will only be disclosed in stages." | "正確な比率の領域については段階的にのみ開示します。" | "具体比例仅按阶段披露。" |
| "민감 영역은 단계별로만 공개합니다." (e-7 surface 시) | "Sensitive matters will only be disclosed in stages." | "機微な領域については段階的にのみ開示します。" | "敏感内容仅按阶段披露。" |

### 3.2. 윤태성(A) 발화 — Cycle 5/6 의심 frame → Cycle 7 자기 frame 균열 → 책임 인식

A는 Cycle 5/6의 자존심+의심 frame 영역에서 본 cycle에 **자기 frame 첫 흔들림** (Batch 1 d-4 outburst — 의문 충격 영역) → **책임 인식 첫 진입** (Batch 3 dc-5 outburst — "본인" 주체화 첫 발화).

#### Batch 1 d-4 outburst (의문 충격 영역) — A 자존심 frame 시작 균열

| KO | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "잠깐. 어머니가 우리 둘을 똑같이 보셨다?" | "Wait. Mother saw the two of us as equals?" | "ちょっと待ってください。母さんが私たち二人を同じように見ていた?" | "等等。母亲是把我们俩看作一样的?" |
| "그게 무슨 말이야." | "What does that mean." | "それはどういう意味なんだ。" | "这话是什么意思。" |
| "재판관님, 어머니가 평생 저를 장남으로 두고 키우셨는데, 똑같이 보셨다는 게 무슨 의미입니까." | "Your Honor, our mother raised me as the eldest son all her life — what does it mean that she saw us as equals?" | "裁判官、母さんは私を長男として育ててくださったのに、同じように見ていたとはどういう意味でしょうか。" | "审判官,母亲一生把我当作长子来养,这'看作一样'到底是什么意思?" |

#### Batch 2 d-5 interject (자기 frame 첫 흔들림 + 격식 요청)

| KO | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "…어머니가 동생을 더 보셨을 수도 있다는 말, 처음 들었어." | "...That Mother might have favored my younger brother more — that's the first I've heard." | "…母さんが弟を、より気にかけていたかもしれないという話は、初めて聞きました。" | "…母亲可能更看重弟弟,这话我是头一回听到。" |
| "그러면 어머니가 직접 남기신 비중도 동생 쪽이 더 컸을 수 있다는 거잖아." | "Which would mean the ratio Mother wrote in her own hand might have favored my younger brother as well." | "それなら、母さんが自筆で残された比重も、弟の方が大きかった可能性があるということじゃないか。" | "那么母亲亲笔留下的分配比例,也可能更偏向弟弟。" |
| "재판관님, 어머니가 남기신 그 비중을 확인해야 합니다." | "Your Honor, that ratio our mother left needs to be examined." | "裁判官、母さんが残されたその比重を確認しなければなりません。" | "审判官,必须查明母亲留下的那个比例。" |

#### Batch 3 dc-5 outburst (책임 인식 첫 진입 — **A "본인" 주체화 첫 발화**)

| KO | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "…내가 평생 모셨다는 말이… 그게 당연한 건 아니었어." | "...That I cared for her all those years... that wasn't something to be taken for granted." | "…私が母さんを長年世話してきたという話が…それは当然のことではなかった。" | "…我说'我侍奉母亲一辈子'…那并不是理所当然的。" |
| "어머니가 동생을 더 마음에 두고 계셨다면, 내가 받아온 영역이 당연한 게 아니라 동생이 양보해 둔 영역이었던 거잖아." | "If Mother had held my younger brother closer to her heart, what I have been receiving was not my entitlement but ground my brother set aside for me." | "母さんが弟を心により深くお持ちだったなら、私が受け取ってきた分は当然のものではなく、弟が譲ってくれていた分だったということじゃないか。" | "如果母亲心里更装着弟弟,那么我一直接受的,就不是理所应得,而是弟弟让给我的。" |
| "재판관님, 본인이 그 영역을 똑바로 보지 못했습니다." | "Your Honor, I failed to look at that matter clearly." | "裁判官、私はその領域を正しく見られていませんでした。" | "审判官,我没能把那部分看清楚。" |

**A "본인" 주체화 표현 핵심**: A 자기 책임 인식 영역에서 "본인이 그 영역을 똑바로 보지 못했다" 직접 단정. 다국어 동일 grammar 변화 보존 — EN: "I failed" (능동 책임 단정) / JA: "私は正しく見られていませんでした" (能動責任 명시) / ZH-CN: "我没能把那部分看清楚" (能動責任 명시).

**A → B 호칭**: 본 cycle에서 A는 *재판관 대상 격식 발화 위주* (B 직접 호명 영역 X). 호칭 정책은 Cycle 5/6 영역 계승.

### 3.3. 윤정후(B) 발화 — Cycle 6 "어머니 뜻" frame → Cycle 7 "본인" 결정 주체화 첫 사용

B는 Cycle 6의 "어머니 뜻 + 한 줄 영역 hook" 회피 frame 영역에서 본 cycle에 **"본인" 주체화 첫 사용** (dc-4 outburst + d-5 outburst 영역). **회피 frame 완전 깨짐**.

#### Batch 1 — 여전히 회피 frame 유지 (d-4 영역 hook)

| KO | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "어머니께서 그 시절 남기신 글 한 줄이 있습니다." | "There is a line our mother left from that time." | "母さんが当時残された一行があります。" | "母亲那段时间留下过一行字。" |
| "그 한 줄 때문에 제가 형에게 말하지 못한 부분이 있습니다." | "Because of that single line, there was something I could not tell my brother." | "その一行のせいで、私が兄に話せなかった部分があります。" | "正因为那一行字,我有一些话没法告诉哥哥。" |
| "어머니께서 그 공책을 가장 걱정하셨습니다." | "Our mother worried about that notebook more than anything." | "母さんは、そのノートのことを最も心配されていました。" | "母亲最为这本本子担心。" |
| "한쪽이 무너지면 형제가 멀어진다고 적으셨습니다." | "She wrote that if one of us were to break, the brothers would grow apart." | "一方が崩れれば兄弟が離れていく、と書かれていました。" | "她写道,一方若崩塌,兄弟便会疏远。" |

#### Batch 2 dc-4 outburst — **B "본인" 주체화 첫 사용**

| KO | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "…형이 흔들리지 않게 하려 했습니다." | "...I wanted to keep my brother steady." | "…兄が揺らがないようにと思っていました。" | "…我想让哥哥别动摇。" |
| "본인이 친자라는 사실을 알고 있었습니다." | "I knew that I was Father's biological son." | "私は自分が実子であることを知っていました。" | "我知道自己才是亲生的儿子。" |
| "그래서 가업의 자리를 형에게 두는 결정을 했습니다." | "So I made the decision to leave the family business in my brother's name." | "ですから家業の座を兄に残す決断をしました。" | "因此我决定把家业的位置留给哥哥。" |

#### Batch 2 d-5 outburst — **B 보호 명분 + 자기 비중 다듬음 첫 명시**

| KO | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "…어머니가 남기신 비중을 본인이 다른 방향으로 다듬었습니다." | "...I reshaped the proportion Mother had left in a different direction." | "…母さんが残された比重を、私が別の方向に整え直しました。" | "…母亲留下的比例,我让它走了另一个方向。" |
| "형을 흔들지 않으려 한 본인의 선택이었습니다." | "It was my own choice, made to keep my brother from being shaken." | "兄を揺るがさないためにと、私自身が選んだことです。" | "这是我自己的选择,为了不让哥哥动摇。" |
| "어머니 뜻을 있는 그대로 두지 못한 책임은 본인에게 있습니다." | "The responsibility for not leaving Mother's intent as it was lies with me." | "母さんの意をそのまま遺せなかった責任は、私にあります。" | "未能让母亲的意愿原样留下,这份责任在我。" |

**B "본인" 주체화 표현 핵심**: Cycle 6의 회피 frame ("어머니께서 ...하셨다") → 본 cycle 결정 주체화 ("본인이 ...했습니다"). 다국어 동일 grammar 변화 보존:
- EN: 어머니 주체 ("Mother sent it through me") → 본인 주체 ("I made the decision" / "I knew")
- JA: 母さん 주체 ("母が私を通して送られた") → 私 주체 ("私は知っていました" / "私自身が選んだ")
- ZH-CN: 母亲 주체 ("是母亲通过我寄出的") → 我 주체 ("我知道" / "我决定")

**B → A 호칭**: "형 / 형님" 격식 (재판관 대상 발화이므로 격식 유지).

### 3.4. e-7 자료 surface 영역 (Batch 1) — B 무거운 첫 진술

e-7 evidence는 B 측 제출 어머니 유품 영역. "오래된 노트 사본" surfaceName 사용. B 측 자기지시 자연도 영역에서 "공책" / "어머니가 곁에 두고 쓰신 공책" 같은 인격적 어휘는 OK.

| KO | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "어머니께서 평생 곁에 두고 쓰신 공책이 한 권 있습니다." | "There is one notebook our mother kept beside her and wrote in all her life." | "母さんが生涯、傍に置いて綴っておられたノートが一冊あります。" | "母亲一生放在身边写下的笔记,有一本。" |
| "그 공책에 가족 일이 적혀 있는 줄을 본 사람은 저뿐입니다." | "I am the only one who has seen that the notebook holds family matters." | "そのノートに家族のことが記されていることを見たのは、私だけです。" | "知道那本笔记里记着家事的人,只有我。" |

### 3.5. e-5 자필 자료 surface 영역 (Batch 3) — 정확 수치 절대 X 핵심

e-5 evidence는 B 측 보관 어머니 자필 자료. "자필 메모 사본" surfaceName 사용. 본 cycle 가장 엄격 정책 — **정확 수치 (90:10 / 60:40) 절대 X**.

| KO | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "어머니께서 공증본과 별개로 직접 정리하신 메모가 있습니다." | "There is a memo our mother put together herself, separate from the notarized version." | "母さんが公証本とは別にご自身で整理されたメモがあります。" | "母亲在公证本之外,亲自整理过一份备忘。" |
| "제가 그 자료를 가지고 있습니다." | "I have that document." | "私がその資料を持っています。" | "我手里有那份资料。" |
| "자필 본에 남은 분배의 흔적이..." (재판관 발화 — 모호 표현) | "Traces of distribution left in her own handwriting..." | "自筆本に残された分配の痕跡が..." | "亲笔本上残留的分配痕迹..." |

**금지 영역** (다국어 모두 회피):
- "90:10" / "60:40" / "정후 90 태성 10" — 모든 lang에서 정확 수치 절대 X
- "비율을 줄였다" / "축소했다" 같은 수치 방향 단정 — "다른 방향으로 다듬은" 모호 표현 유지

### 3.6. dc-5 종합 단서 영역 (Batch 3) — 양측 책임축 종합

dc-5는 최종 종합 단서. 양측 책임축 종합 영역 — A의 "장남 당연시" + B의 "보호 명분" + 어머니 뜻 두 번 비틀음 영역.

| KO | EN 권장 | JA 권장 | ZH-CN 권장 |
|---|---|---|---|
| "윤태성 측이 어머니의 평생 돌봄을 자기 몫의 당연한 근거로 받아온 영역과..." | "Yun Tae-seong receiving Mother's lifelong care as the natural basis for his own share, and..." | "ユン・テソン側が母さんの生涯の介護を自らの取り分の当然の根拠として受け入れてきた領域と..." | "尹泰成一方将母亲一生的照料视为自己应得份额的当然依据,以及..." |
| "윤정후 측이 어머니 뜻을 보호한다는 명분으로 다른 방향으로 다듬은 영역이 함께 본 영역에 모입니다." | "Yun Jeong-hu reshaping Mother's intent in a different direction in the name of protection — both come together in this matter." | "ユン・ジョンフ側が母さんの意を保護するという名分で別の方向に整え直した領域が、共に本領域に集まります。" | "尹正厚一方以保护母亲意愿之名,把它整向另一个方向——两者一同汇入本议题。" |
| "두 형제 모두 어머니 뜻을 있는 그대로 두지 못한 영역으로, 종합 단서 [어머니의 뜻]을 본 법정에 등록합니다." | "Recognizing that neither brother left Mother's intent as it was, the consolidated clue [Mother's Will] is hereby entered before this court." | "両兄弟ともに母さんの意をそのまま遺せなかった領域として、総合手がかり[母の意]を本法廷に登録します。" | "因两兄弟皆未能让母亲的意愿原样留存,综合线索[母亲的意愿]在此法庭登记。" |

### 3.7. 어머니 호칭 (family-01 특이 — Cycle 6 영역 계승)

- 양 형제 모두 본인 어머니 = 자기 시점 호칭 (`feedback_family_address_speaker_perspective` 권위)
  - KO: 어머니 / 우리 어머니
  - EN: mother / our mother
  - JA: 母 / お母さん / 母さん
  - ZH-CN: 母亲 / 妈妈
- **친부 실명 절대 X** (본 cycle 모든 entry 모든 lang — 영구 봉인)
- 친부 / 친자가 아니다 직접 표현 — Batch 2 dc-4 영역 "본인이 친자임을 알고 있었습니다" (= "I knew that I was Father's biological son" / "私は自分が実子であることを知っていました" / "我知道自己才是亲生的儿子") 영역만 OK

### 3.8. 단서/쟁점 명칭 변경 (Cycle 5 신규, 본 cycle 적용 — dc-4 / dc-5 추가)

`feedback_dossier_card_renamed_to_clue.md` 권위. player-visible text에서:

| Layer | KO | EN | JA | ZH-CN |
|---|---|---|---|---|
| 단서 (일반) | 단서 | clue | 手がかり | 线索 |
| evidence (구분) | 증거 | evidence | 証拠 | 证据 |

본 cycle entry text에 등장:
- `[20년의 돈]` (Cycle 6 baseline 다국어 적용 완료 — 그대로 재사용)
- `[감춘 이유]` (본 cycle 신규 — dc-4 label):
  - EN: `[The Hidden Reason]` 또는 `[Hidden Reason]`
  - JA: `[隠された理由]`
  - ZH-CN: `[隐藏的缘由]` 또는 `[藏起的理由]`
- `[어머니의 뜻]` (본 cycle 신규 — dc-5 label):
  - EN: `[Mother's Will]` 또는 `[Mother's Intent]`
  - JA: `[母の意]` 또는 `[母の意志]`
  - ZH-CN: `[母亲的意愿]` 또는 `[母亲的心意]`
- `[수정된 유언장]` (Cycle 5 영역 그대로 재사용)

⚠ 다국어 라벨은 Codex가 자연성 + dossier 패널 카드 라벨 적합 길이 검토 후 결정. case.ts `dc-4.label` / `dc-5.label` 외국어 baseline 영역 lookup:
```
git show main:src/data/coreCases/family-01.case.ts | sed -n '/id: '"'"'dc-4'"'"'/,/id: '"'"'dc-5'"'"'/p'
git show main:src/data/coreCases/family-01.case.ts | sed -n '/id: '"'"'dc-5'"'"'/,/combinationRecipes/p'
```
※ case.ts KO 영역만 — 외국어 baseline은 본 작업에서 entry text 영역 일관 사용 (case.ts 변경 X).

### 3.9. cascade_from_card priorCard reference 다국어 보존

본 cycle cascade 사용:
- d-4 cascade (priorCard:dc-3) — text 본문에 `[20년의 돈]` reference (Cycle 6 baseline 재사용)
- e-7 cascade (priorCard:d-4) — text 본문에 "가족 기록 영역" reference (단서 reference X)
- dc-4 cascade (priorCard:d-4) — text 본문에 "가족 기록 영역" / "오래된 노트 사본" reference
- d-5 cascade (priorCard:dc-4) — text 본문에 `[감춘 이유]` reference (본 cycle 신규)
- d-5 cascade (priorCard:e-7) — text 본문에 "오래된 노트 사본" reference (lockedName X)
- e-5 cascade (priorCard:dc-4) — text 본문에 `[감춘 이유]` reference
- dc-5 cascade (priorCard:d-5) — text 본문에 "어머니의 숨겨진 마음 영역" reference

다국어 번역 시:
- `priorCard:X` tag → 그대로 (번역 X)
- text 본문의 단서/쟁점 reference는 §3.8 lookup table 일관

### 3.10. dynamics 차별성 보존

각 trigger마다 NPC 인지 상태가 다름:

- **cascade_from_card**: 이전 단서/쟁점 결과의 자연 연속 — 판사 정리적 톤
- **combination_result**: 자료 결합 — 판사 분석적 톤
- **npc_interjection (b)**: B의 회피 frame 자발 surface (Batch 1 d-4/e-7) — 무거운 평정 톤
- **npc_interjection (a)**: A의 자기 frame 첫 흔들림 (Batch 2 d-5) — 흔들림 → 의문 → 격식 요청 (3단계)
- **emotional_outburst (b)**: B의 결정 주체화 첫 명시 (Batch 2 dc-4/d-5) — 무거운 단정 톤, **"본인" 주체화 grammar 첫 사용** (다국어 보존 필수)
- **emotional_outburst (a)**: A의 책임 인식 첫 진입 (Batch 3 dc-5) — 무거운 인정 톤, **"본인" 주체화 grammar 첫 사용**
- **judge_auto_mention**: 일정 turn fallback — 판사 결정·종결 (사실 진술, 평가 어휘 회피)

각 NPC/판사 발화 entry는 위 dynamics를 다국어에서 손실 X.

### 3.11. 재판관 어법 (`feedback_judge_dispassionate_action_focused`)

다국어 판사 entry에서도 정책 준수:

- 감정·가치 어휘 회피
- 사실/행위/선후관계 중심 어휘
- "반증" → "관련" 중립 표현
- "단정" 평가 어휘 회피 — 본 cycle entry에서 판사 발화는 *fact* 영역만 명시. *책임 구조*는 분리 명시.
- 호출 동사 다양화 — e-7 / e-5 자료 호출 trigger에 다양화:
  - cascade: KO baseline "받아들입니다" → EN "received as evidence" / "entered as evidence" / JA "受け入れます" / ZH-CN "予以采纳"
  - interject: KO baseline "직접 받아 정리하겠습니다" / "직접 확인해 보겠습니다" → 다양화
  - outburst (e-7만): KO baseline "받아들입니다" → 다양화
  - judge-auto: KO baseline "직접 확인해 보겠습니다" / "직접 들어보겠습니다" → 다양화 (cascade와 다른 동사)

### 3.12. 진실 노출 정책 (Line C 영역 — 본 cycle 가장 엄격)

`design_family01_truth_disclosure_policy.md` 권위. **본 cycle은 그룹 1/4/5 surface 진입 + 그룹 3 가장 엄격 봉인**:

| 그룹 | KO 금지 표현 (다국어 모두 회피) |
|---|---|
| **1 출생 비밀 직접 단어** (단 dc-4 영역 "본인이 친자임을 알고도" 예외 OK) | 친부 실명 (영구 봉인) / 친부 / 구체적 출생 경위 / "아버지 피는 아니다" 직접 표현 |
| **3 자필 90:10** (d-5 S5만, **본 cycle 모든 batch 절대 X — 가장 엄격**) | 자필 90:10 / 공증 60:40으로 축소 / 자기 몫 양보 정확 수치 |

| 그룹 1/4/5 **OK (본 cycle 영역)** |
|---|
| 그룹 1: "어머니의 평등 마음" / "두 아들 똑같이 보셨다" (Batch 1 hook) / "본인이 친자임을 알고도" (Batch 2 dc-4) |
| 그룹 4: "가업의 자리를 형에게 두는 결정" (Batch 2 dc-4) |
| 그룹 5: "어머니 뜻을 본인이 다른 방향으로 다듬었습니다" / "형을 흔들지 않으려 한 본인의 선택" / "어머니 뜻을 있는 그대로 두지 못한 책임은 본인에게 있습니다" (Batch 2 d-5 + Batch 3 dc-5) |

KO에서는 이 영역 모두 처리됨. 다국어 번역 시 위 표현 직역 또는 우회 등장 회피.

---

## §4. surface-name gate 외국어 회귀 검출

**e-7 / e-5 surfaceName 영역 핵심** (본 cycle P0 위험 영역):

| Evidence | KO baseline lockedName (entry text 금지) | KO baseline surfaceName (entry text 사용 OK) |
|---|---|---|
| e-7 | 어머니 일기장 | **오래된 노트 사본** |
| e-5 | 어머니 자필 유언장 연습본 | **자필 메모 사본** |
| e-6 | 오래된 계좌 흐름 | 오래된 송금 내역 묶음 (Cycle 6 적용 완료) |

외국어 baseline e-5 / e-7 surfaceName 영역 직접 확인:
```
git show main:src/data/coreCases/family-01.case.ts | sed -n '/id: '"'"'e-5'"'"'/,/id: '"'"'e-6'"'"'/p'
git show main:src/data/coreCases/family-01.case.ts | sed -n '/id: '"'"'e-7'"'"'/,/witnesses:/p'
```
※ case.ts는 KO 영역만 — 외국어 baseline은 ScriptedText의 evidence label 영역 lookup.

### 외국어 entry 생성 시 self-check

- e-7 entry text 작성 시 surfaceName 사용 (lockedName "어머니 일기장" 직접 X)
- e-5 entry text 작성 시 surfaceName 사용 (lockedName "어머니 자필 유언장 연습본" 직접 X)
- 다른 evidence (e-1, e-2, e-3, e-4, e-6)도 동일 정책

### 정확 수치 (그룹 3) 영역 회귀 검출 — 본 cycle 가장 엄격

- 모든 외국어 entry에서 정확 수치 (90:10 / 60:40 / 90% / 60% 등) 등장 X
- 자필 본의 분배 흔적은 *모호 표현*만 OK ("자필 본에 남은 분배의 흔적" / "Mother's handwritten distribution traces" 등)
- "비율을 줄였다" / "축소했다" / "reduced" / "縮小した" / "缩减" 같은 수치 방향 단정 표현 X
- "다른 방향으로 다듬은" / "reshaped in a different direction" / "別の方向に整え直した" / "向另一个方向" 같은 모호 표현 OK

---

## §5. 작업 단계

### 5.1. KO baseline 확인

```
git show main:src/data/scriptedText/family-01.json | sed -n '/"key": "emerge-d-4"/,/"key": "emerge-d-5"/p' | head -200
```

또는 본 폴더 brief 폴더 각 batch `result/` 직접 참조 (KO 출력 + tag 영역).

### 5.2. 외국어 emergence_narrative entries 추가

`src/data/scriptedText/family-01.en.json`, `.ja.json`, `.zh-CN.json` 모두 `channels.emergence_narrative.entries` 영역에 신규 6 group append (KO와 동일 구조 — id 동일, text 번역, behaviorHint 번역, tags 그대로).

기존 Cycle 5 6 group + Cycle 6 2 group 보존, 새로 6 group 끝에 추가.

### 5.3. tag 영역

본 cycle entry 모두 다음 tag 일관 (KO baseline 영역 normalize 적용):
- `channel:emergence_narrative`
- `caseId:family-01`
- `disputeId:d-4` (emerge-d-4 / emerge-e-7 / emerge-dc-4 group)
- `disputeId:d-5` (emerge-d-5 / emerge-e-5 / emerge-dc-5 group)
- `evidenceId:e-7` (emerge-e-7 group만)
- `evidenceId:e-5` (emerge-e-5 group만)
- `dossierCardId:dc-4` (emerge-dc-4 group만)
- `dossierCardId:dc-5` (emerge-dc-5 group만)
- `linkedParty:b` (대부분) / `linkedParty:both` (emerge-d-5 group만 — 양측 책임축)
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

⚠ KO normalize 영역에서 다음 tag는 *제거*되어 있음 (Cycle 5/6 normalize 영역 적용):
- `case:family-01` (→ `caseId:family-01`로 변환)
- `firstFiredWins:true` (default)
- `emergenceType:*` (제거)
- `targetClue:*` / `clueLabel:*` / `targetEvidence:*` / `targetDispute:*` (제거)
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

⚠ 본 cycle 가장 위험 영역 — **그룹 3 (자필 90:10 / 공증 60:40) 외국어 등장 영역 정밀 self-check**. truth-leak-matrix hidden 영역에 등록돼 있어 자동 검출되지만, hidden 영역에 등록 X인 모호 표현 ("reduced" / "縮小" / "缩减" 같은 수치 방향 단정 표현)이 자연도 영역에서 surface 됐다면 별도 self-check 필요.

---

## §6. 산출

```
git add src/data/scriptedText/family-01.en.json \
        src/data/scriptedText/family-01.ja.json \
        src/data/scriptedText/family-01.zh-CN.json
git commit -m "i18n(family-01): sync Cycle 7 Line C — 비밀+최종 6 emergence narrative (61 variant × 3 lang) + 다중 cascade/recipe 패턴 + 그룹 1/4/5 surface 진입 외국어 + 그룹 3 봉인 정밀 검증"
git push -u origin codex/family01-cycle7-multilang
```

main session이 fast-forward merge 처리.

---

## §7. 참고 — Cycle 8 진입 시 처리 예정

본 cycle 다국어 sync 완료 후 다음 cycle 진입 시 처리 예정:

| Cycle | 사건 | 처리 영역 |
|---|---|---|
| **8** | friend-01 잔여 line 또는 다른 사건 | family-01 사건 본 cycle로 narrative wrapper 완료 — 사건 단위 완료. Cycle 8은 사용자 결정 (별도 사건 narrative wrapper 또는 family-01 사후 polish) |

본 cycle은 family-01 narrative wrapper **마지막 cycle**. Line A (Cycle 5) + Line B (Cycle 6) + Line C (본 cycle) 모두 완료.
