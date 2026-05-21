# Codex 의뢰 — 2026-05-22 번역체 v3 Phase 3 sweep 다국어 sync

작성일: 2026-05-22
작성자: Claude (메인 세션)
처리자: Codex thread 1개 (전 3언어 통합 or thread split 자율)
HEAD 기준: 본 의뢰서 직전 commit (KO 적용 완료 commit)

---

## §0. 의뢰 배경

`v3 자연화` 라운드(2026-05-21) 진행 중, **8개 stock template 문장**이 sweep-inserted filler로 남아 톤이 단조로워진 영역이 사용자 보고로 발견됐다.

> 사용자 인용 (2026-05-22):
> "다시 보니 위 내용들이 문제라기보다 너무 빈번하게 사용되서 문제라는 것 같네? 그럼 배리에이션 하는 것에 이견 없어. 다만, '전적으로'는 좀 어울리지 않아. 그것, 그 상황, 그 사실 등으로 배리에이션 하는게 좋을 것 같아."

총 **366건 sentence-level 변경**이 KO에 적용됨 (별도 commit). 5개 파일:
- `src/data/scriptedText/spouse-01.json` (40)
- `src/data/scriptedAngles/spouse-01_interrogation_answers.json` (125)
- `src/data/scriptedText/family-01.json` (60)
- `src/data/scriptedText/friend-01.json` (30)
- `src/data/scriptedAngles/friend-01_interrogation_answers.json` (111)

본 의뢰서는 EN/JA/ZH-CN 다국어 overlay (`*.en.json`, `*.ja.json`, `*.zh-CN.json`)에 대응하는 sync 적용 가이드이다.

[[feedback_claude_ko_needs_codex_multilang]] 정책: KO 변경 시 다국어 sync 필수.

---

## §1. 작업 범위

### 영향 다국어 파일 (12 = 4 case-file × 3 lang)

```
src/data/scriptedText/spouse-01.{en,ja,zh-CN}.json
src/data/scriptedText/family-01.{en,ja,zh-CN}.json
src/data/scriptedText/friend-01.{en,ja,zh-CN}.json
src/data/scriptedAngles/spouse-01_interrogation_answers.{en,ja,zh-CN}.json
src/data/scriptedAngles/friend-01_interrogation_answers.{en,ja,zh-CN}.json
```

(family-01_interrogation_answers는 변경 영향 없음 — KO 변경 0건)

---

## §2. 8 template 매핑 (find / replace / rotation)

### Template #1 — `rotation` (111건, friend-01_interrogation_answers)

**KO before (단일)**:
> 그 부분은 기록과 제 판단을 나눠 말하겠습니다.

**KO after (4종 rotation, 28/28/28/27)**:
1. 그 부분은 기록과 제 판단을 나눠 말하겠습니다. *(28× — keep)*
2. 그건 기록과 제 판단을 나눠 말씀드리겠습니다. *(28×)*
3. 그 상황은 기록과 제 판단을 나눠 말하겠습니다. *(28×)*
4. 그 사실은 기록과 제 판단을 나눠 말하겠습니다. *(27×)*

**의도**: "그 부분" → 입말 축약 / 상황 지시 / 사실 지시 다양화. **친구 사건 화자(최수민)의 자기 진술 톤**. "기록 vs 판단" 분리 의도(객관 기록과 본인 해석 구분)는 모든 변형 공통 유지.

**다국어 변형 가이드** (각 anchor 대응 EN/JA/ZH 번역):

| KO 변형 | EN | JA | ZH-CN |
|---|---|---|---|
| 그 부분은 ~ | I'll separate the record from my own judgment on that. | その部分は記録と私の判断を分けて申し上げます。 | 那一部分我会把记录和我的判断分开来说。 |
| 그건 ~ | I'll address that by separating the record from my judgment. | それは記録と私の判断を分けて申し上げます。 | 那件事我会把记录和我的判断分开来说。 |
| 그 상황은 ~ | For that situation, I'll separate the record from my judgment. | その状況は記録と私の判断を分けて申し上げます。 | 那种情况下，我会把记录和我的判断分开来说。 |
| 그 사실은 ~ | I'll separate the record from my judgment on that fact. | その事実は記録と私の判断を分けて申し上げます。 | 那个事实我会把记录和我的判断分开来说。 |

**variant ID 매칭 필수**: 각 외국어 파일의 variant id는 KO의 variant id와 동일해야 함. KO 4종 rotation은 `anchor index % 4` 순서로 분배됨 — 외국어도 같은 순서로 매칭.

---

### Template #2 — `rotation` (100건, spouse-01_interrogation_answers)

**KO before**:
> 설명을 줄이거나 피한 부분이 있었고, 그 부분은 사실 그대로 따로 답하겠습니다.

**KO after (4종 rotation, 25/25/25/25)**:
1. 설명을 줄이거나 피한 부분이 있었고, 그 부분은 사실 그대로 따로 답하겠습니다. *(keep)*
2. 설명을 줄이거나 피한 부분이 있었고, 그건 사실 그대로 따로 답하겠습니다.
3. 설명을 줄이거나 피한 부분이 있었고, 그 상황은 사실 그대로 따로 답하겠습니다.
4. 설명을 줄이거나 피한 부분이 있었고, 그 일은 사실 그대로 따로 답하겠습니다.

**의도**: 화자(이준호)의 자기 통찰 톤. "설명을 줄이거나 피한 부분" = 자기 회피 행위 시인 → "사실 그대로 따로 답하겠습니다" = 회피 부분만 따로 솔직 답변하겠다는 약속.

**다국어 변형 가이드**:

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| ~ 그 부분은 사실 그대로 따로 답하겠습니다. | There were places I shortened or avoided in my explanation; I'll answer those parts separately, exactly as they happened. | 説明を縮めたり避けた部分があり、その部分は事実そのまま別途お答えします。 | 我说明时有所省略或回避，那一部分我会照实另作回答。 |
| ~ 그건 사실 그대로 따로 답하겠습니다. | ... I'll answer that separately, exactly as it happened. | ... それは事実そのまま別途お答えします。 | ... 那件事我会照实另作回答。 |
| ~ 그 상황은 사실 그대로 따로 답하겠습니다. | ... I'll describe that situation separately, exactly as it happened. | ... その状況は事実そのまま別途お答えします。 | ... 那种情况我会照实另作回答。 |
| ~ 그 일은 사실 그대로 따로 답하겠습니다. | ... I'll answer for that matter separately, exactly as it happened. | ... その件は事実そのまま別途お答えします。 | ... 那件事我会照实另作回答。 |

---

### Template #3 — `rotation` (35건, family-01 scriptedText)

**KO before**:
> 그 부분을 부정하지 않겠습니다.

**KO after (4종 rotation, 9/9/9/8)**:
1. 그 부분을 부정하지 않겠습니다. *(keep)*
2. 그것을 부정하지 않겠습니다.
3. 그 사실을 부정하지 않겠습니다.
4. 그 상황을 부정하지 않겠습니다.

**의도**: 가족 사건 화자가 자기 책임/사실 인정 의지 표명. "부정"은 단정체 keep (사용자 정책).

**다국어 변형 가이드**:

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| 그 부분을 부정하지 않겠습니다. | I will not deny that part. | その部分を否定はいたしません。 | 我不会否认那一部分。 |
| 그것을 부정하지 않겠습니다. | I will not deny it. | それを否定はいたしません。 | 我不会否认这一点。 |
| 그 사실을 부정하지 않겠습니다. | I will not deny that fact. | その事実を否定はいたしません。 | 我不会否认那个事实。 |
| 그 상황을 부정하지 않겠습니다. | I will not deny that situation. | その状況を否定はいたしません。 | 我不会否认那种情况。 |

---

### Template #4 — `replace` (30건, friend-01 scriptedText)

| KO before | KO after |
|---|---|
| 그 부분은 짧게 말씀드리겠습니다. | 그것과 관련해서 짧게 말씀드리겠습니다. |

**의도**: "그 부분은 X" 일방 진술 → "그것과 관련해서 X" 토픽 도입형. 친구 사건 화자가 화제를 명확히 짚으며 들어가는 톤.

**다국어**:
- EN: `I'll keep this brief regarding that.`
- JA: `それについては手短に申し上げます。`
- ZH-CN: `关于那件事，我简短地说一下。`

---

### Template #5 — `replace` (25건, spouse-01_interrogation_answers)

| KO before | KO after |
|---|---|
| 이제 그 부분을 부인하지 않겠습니다. | 그걸 부인하진 않겠습니다. |

**의도**: "이제 ~ 부인하지 않겠습니다" 격식체 → "그걸 부인하진" 입말 축약 + "않겠습니다" 단정체 keep. "이제"(이제까지와 달리) nuance 자연스럽게 제거 — "부인하진"의 강조 보조사 "ㄴ"가 같은 어감 흡수.

**다국어**:
- EN: `I won't deny that.`
- JA: `それを否認はいたしません。` (or `それは否定しません。`)
- ZH-CN: `我不否认这一点。`

---

### Template #6 — `replace` (25건, family-01 scriptedText)

| KO before | KO after |
|---|---|
| 그 부분은 감정으로 설명하기 어렵습니다. | 그건 감정으로 설명하기 어렵습니다. |

**의도**: "그 부분은" → "그건" 입말 축약. 감정/이성 분리 표명 유지.

**다국어**:
- EN: `That's hard to explain through emotion.` (or `... in terms of feelings.`)
- JA: `それは感情で説明するのが難しいです。`
- ZH-CN: `那件事很难用情绪来说明。`

---

### Template #7 — `replace` (20건, spouse-01 scriptedText)

| KO before | KO after |
|---|---|
| 그래서 제가 한 박자씩 미뤘습니다. | 그래서 매번 말할 타이밍을 놓쳤습니다. |

**의도**: "한 박자씩 미뤘" = 음악 메타포 번역체. → "매번 말할 타이밍을 놓쳤" = 구체적 행동 묘사 + 한국어 일상 표현. 화자(이준호)의 자기 통찰 톤 유지.

**다국어**:
- EN: `So I kept missing the moment to bring it up.` (or `So I missed the chance to speak each time.`)
- JA: `だから話すタイミングを毎回逃しました。`
- ZH-CN: `所以我每次都错过了开口的时机。`

---

### Template #8 — `replace` (20건, spouse-01 scriptedText)

| KO before | KO after |
|---|---|
| 그때는 설명보다 대비가 먼저라고 느꼈습니다. | 그때는 설명보다 방어기재가 먼저 발동했던 것 같습니다. |

**의도**: 사용자 precision guide 차원 2 ("~것 같다" 완곡 추측) + "방어기재" 심리학 용어 도입. 화자가 자기 행동을 사후 통찰하는 톤. "대비" → "방어기재"가 더 정확한 의도 표현(불안에서 나온 방어 반사).

**다국어** (`것 같다` = self-monitoring 완곡 추측):
- EN: `At that moment, my defensive instinct seemed to take over before any explanation could.` (or `... my guard went up before any explanation.`)
- JA: `あのときは、説明よりも防衛機制が先に働いていたようです。`
- ZH-CN: `那个时候，与其说是解释，更像是防御机制先一步启动了。`

---

## §3. 작업 순서 (제안)

1. **각 외국어 파일 12개에서 각 template의 기존 EN/JA/ZH-CN 매칭을 grep** — 새 KO variant id와 정확히 매칭되는 외국어 entry 식별
2. variant id 단위로 outdated 외국어 텍스트 → 새 다국어 번역으로 교체
3. rotation 케이스(template 1, 2, 3)는 **anchor 순서 보존** 필수. KO 파일의 anchor 순서대로 외국어 파일도 4종 cycle 매칭.
4. 적용 후 다음 검증:
   - `./node_modules/.bin/tsc -b --force` PASS
   - `npm run qa:fast` static P0=0 / route P0=0
   - `node scripts/detect-truth-leak.cjs --strict` findings 0 유지
   - `node scripts/verify-scripted-mapping.cjs` PASS

---

## §4. 다국어 톤 정책 (재확인)

- **EN**: 격식체 + 1인칭 ("I"). 화자가 법정에서 자기 진술하는 톤. "I won't"보다 "I will not" 비격식 회피. 단 입말 축약("그건/그걸") 대응은 자연스럽게 contraction 허용.
- **JA**: 「ます/ました」 격식체 baseline. "~いたします" / "~ております" 정중체 선호. 사용자 precision guide 차원 2 "것 같다" → "ようです" / "気がします".
- **ZH-CN**: 정중체. "我" 1인칭 + "了" 시제 적절 활용. 격식 어조 유지하되 자연스러움 우선.

---

## §5. 사용자 직접 강조 — 종합

- 의미 보존이 어휘 치환보다 우선.
- variant id 단위 정합성 (KO 파일 anchor 순서 = 외국어 파일 entry 순서) 필수. rotation 케이스는 cycle 분배 정확.
- 단조로움 해소가 본 라운드의 목적. 외국어 번역도 동일 cycle 분배로 다양성 확보.

---

## §6. 변경 commit 정보 (cherry-pick 대상)

본 의뢰 직전 commit (KO sweep): main HEAD = 본 commit 시점에서 `git log --oneline -1`로 확인. Codex worktree에서 base 잡을 때 해당 SHA를 시작점으로.
