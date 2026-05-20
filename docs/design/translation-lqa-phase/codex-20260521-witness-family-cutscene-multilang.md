# Codex 의뢰 — 2026-05-21 witness + family-01 + cutscene KO 변경 다국어 재번역

작성일: 2026-05-21
작성자: Claude (메인 세션)
처리자: Codex thread 1개 (전 4언어 통합 or thread split 자율 판단)
HEAD 기준: cf41ce93 + 본 의뢰 KO 변경 commit (별도 commit으로 분리됨)

---

## §0. 의뢰 배경 / 사용자 강조

본 batch의 KO 변경은 사용자가 직접 정리한 25 witness slot + family-01 case data 진실 보정 + cutscene slip phase 1.5 dismay 14건이다. 적용된 KO는 이미 commit됨 (cf41ce93 다음 commit).

사용자 직접 강조 (인용):

> "맥락과 의도에 맞는지 최대한 상세하게 검토해야 돼. 한국어 특성상 주어나 목적어가 헷갈리기 쉬워. 개념을 명확하게 이해한 상태로 번역에 들어가야 돼."

따라서 본 의뢰서는 단순 KO→XX 매핑이 아니라 **각 변경의 의도/맥락/진실 게이팅 단계까지 상세 기술**한다. Codex는 EN/JA/ZH-CN 번역 시 주어/목적어를 KO에서 모호한 부분이 있다면 본 의뢰서의 "맥락"을 우선해 명시화 (특히 "그분이", "그 사람이", "그 돈이" 같은 무명 지시어).

---

## §1. 작업 범위 (3 카테고리)

### A. Witness testimony 25 slot — KO 텍스트 + 일부 topic/question 변경

영향 파일:
- `src/data/witnessTestimonyData/spouse-01.ts` — w-1 4 slot 수정 + **w1-d1-kid-spotted slot 전체 삭제**, w-2 3 slot 수정
- `src/data/witnessTestimonyData/family-01.ts` — w-1 2 slot 수정 + **w1-d3-avoid-conflict 매핑 d-5 → d-4 변경** (의미 보존), w-2 6 slot 수정 (출장 공증인 sweep), w-3 5 slot 수정
- `src/data/witnessTestimonyData/friend-01.ts` — w-1 5 + w-2 4 + w-3 3 slot 수정

위 KO는 **이미 적용됨**. localized.ts EN/JA/ZH-CN overlay는 stale 상태. Codex가 재번역해 overlay를 새 KO와 일치시킨다.

### B. family-01 case data 진실 보정 + 공장 양보 맥락 추가

영향 파일:
- `src/data/cases/generated/family-01.json` — 한국어 진실 영역 6 지점 수정

핵심 보정:
1. **d-4 truth 수정**: 기존 "윤정후가 배다른 자식" 표현은 case 진실과 모순이었음. 사용자 확정 진실 = **"윤태성이 아버지의 친자가 아니다"** (어머니 입장에선 둘 다 친아들, 아버지에게 태성이 의붓).
2. **공장 양보 맥락 추가**: 친자인 정후가 그 사실을 알면서도 자존심 강한 형을 보호하기 위해 **가업 공장을 형에게 양보**하고 본인은 작은 자동차부품 가게로 시작했다. 이 양보 사실은 어머니 일기에 기록되어 있음.
3. **공증인 출장 변경**: 공증인이 사무실이 아닌 어머님 댁(요양시설)에 출장 방문하는 시나리오. 같은 날 두 번 방문 등.

영향 다국어 파일:
- `src/data/scriptedText/family-01.{en,ja,zh-CN}.json` — 변경된 KO 영역과 일치하는 scripted text 확인 및 필요 시 수정

### C. Cutscene slip phase 2 (dismay) 14 dispute KO 보강

영향 파일:
- `src/data/cutsceneText/spouse-01/d-1.json` (phase2 only)
- `src/data/cutsceneText/spouse-01/d-2.json`
- `src/data/cutsceneText/spouse-01/h-d3.json`
- `src/data/cutsceneText/spouse-01/h-d4.json`
- `src/data/cutsceneText/family-01/d-1.json`
- `src/data/cutsceneText/family-01/d-2.json`
- `src/data/cutsceneText/family-01/d-3.json`
- `src/data/cutsceneText/family-01/d-4.json`
- `src/data/cutsceneText/family-01/d-5.json`
- `src/data/cutsceneText/friend-01/d-1.json`
- `src/data/cutsceneText/friend-01/d-2.json`
- `src/data/cutsceneText/friend-01/d-3.json`
- `src/data/cutsceneText/friend-01/d-4.json`
- `src/data/cutsceneText/friend-01/d-5.json`

각 파일의 `slip_explosive.phase2.{ko}`가 **새 KO**로 보강되어 있음 (기존 "아니, 그런 뜻이 아니라—" 같은 짧은 placeholder → 2-3문장 dismay). EN/JA/ZH-CN은 placeholder 그대로 stale 상태. Codex가 새 KO 의도(아래 §4)에 맞춰 재번역.

---

## §2. Witness testimony 상세 brief (각 slot)

### spouse-01

#### w-1 경비원 (오피스텔)

| slot id | 변경 후 KO | 컨텍스트 / 다국어 주의 |
|---|---|---|
| `w1-d1-resident-info` | "그 층은 대부분 야간에 일하는 분들이 많아서 저녁 시간에도 거의 모든 집이 불이 꺼져있을 때가 많습니다." | **함의**: 박지연이 본 "남편 늦은 귀가가 외도 정황"이라는 단정을 약화. "이 층 사람들이 다 야간 근무라 저녁에 불이 꺼져 있다"는 일반 사실. 다국어: 한국어 "꺼져있을 때가 많다" = 빈번성 강조. EN "the lights are usually off", JA "明かりが消えていることが多い", ZH "灯通常都熄着". |
| `w1-d1-no-single-woman` | "그 층에 여자 혼자 사는 집은 없는 것 같아요. 여자 분들은 커플이 대부분이고, 아니면 남자 혼자 사는 분들이 대부분입니다." | **함의**: 외도 상대 후보 부정. "여자 혼자 사는 집 X" + "커플 or 남자 1인 가구". EN: "There are no homes where a woman lives alone. Most women live as couples, and the rest are men living alone." JA/ZH도 동일 구조. |
| `w1-d1-kid-spotted` | **전체 삭제됨** | 사용자 결정: 아이 동행 정보는 본 케이스에서 leak 위험. **localized.ts에서도 이 키 삭제** (이미 처리됨). 만약 Codex가 다른 외국어 mirror 파일에서 이 키를 발견하면 같이 삭제. |
| `w1-d1-core` ⭐ | "집주인 분께서 숨기시는 듯해서 모르는 척 했지만, 302호는 중학교 교복을 입은 아이와 함께 살고 계신 것으로 알고있습니다. 방문하신 분께 작은아버지라고 부르는 것도 들었구요." | **결정타 ⭐**. "방문하신 분" = 이준호. "집주인 분" = 302호 거주자(이준호 형). 즉 이준호 = 작은아버지 = 그 아이의 삼촌. 외도 X, 형 아이 돌봄. **다국어 주의**: "집주인 분께서 숨기시는 듯" 의역 시 "the resident seemed to be hiding it" (NOT "the landlord"). "방문하신 분께 작은아버지라고 부르는" = "calling the visitor 'uncle'". JA "訪問された方を「叔父さん」と呼ぶ". ZH "称呼来访的人为'叔叔'". |

#### w-2 은행원

| slot id | 변경 후 KO | 컨텍스트 / 다국어 주의 |
|---|---|---|
| `w2-d2-cash-pattern` | "4개월에 걸쳐 나눠서 출금하셨어요. 500, 800, 700, 1000만 원. 금액이 커서 ATM으로 출금이 불가하여 창구에서 직접 출금하셨어요. 계좌 이체를 안 하시는 게 좀 특이하게 느껴졌습니다." | **변경 포인트**: 기존 "전부 같은 지점 ATM" → "금액이 커서 ATM 불가 → 창구 직접 출금". 화폐 단위 KO 만원 → EN 10K KRW 환산 X (원본 유지: "5M, 8M, 7M, 10M won" 가능). JA "500万、800万、700万、1,000万ウォン". ZH "500万、800万、700万、1000万韩元". |
| `w2-hd3-signature-doubt` | "서명이 느낌상 달라보이긴 했는데, 제가 필적 감정사도 아니고 확신할 수는 없었습니다. 다만, 그래도 부부이시고 서류를 모두 갖추셨으니 문제 없을 것이라고 생각했습니다." | **변경 포인트**: 기존 "남편 분의 원래 서명은 좀 더 또박또박" 구체 묘사 → "느낌상 달라보였지만 확신 X / 부부니까 통과". 의미: 은행원의 직무 태만이 살짝 드러남. |
| `w2-hd3-core` ⭐ | "네, 몇 주 뒤에 남편 분이 오셔서 \"적금을 해지한 적이 없다\"고 하셨어요. 상당히 놀라신 표정이었습니다. 그때 저도 \"아, 위임장이 문제였구나\" 싶었습니다." | **변경 포인트**: 기존 "오셔서" 주체 모호 → "남편 분이 오셔서" 명시. **다국어 주의**: 한국어에서 "오셨다" 주어 생략. EN must specify "Mr. Lee came". JA "ご主人がいらっしゃって". ZH "丈夫先生过来". |

#### w-3 박미라

**수정 없음**. 현재 4 slot 모두 유지. EN/JA/ZH-CN overlay 변경 X.

---

### family-01

#### w-1 최복순 (전 요양보호사)

| slot id | 변경 후 KO | 컨텍스트 / 다국어 주의 |
|---|---|---|
| `w1-d2-before-brother-arrives` | "있었습니다. 윤정후 씨가 \"형님 오시기 전에 마무리하자\"고 했어요. 다만 그 말은 또 큰소리 날까 봐 조심하는 느낌에 가까웠습니다." | **변경 포인트**: 기존 "욕심이라기보다, 그날 또 큰소리 날까 봐" → "다만 그 말은 또 큰소리 날까 봐 조심하는 느낌에 가까웠습니다." 부분 삭제. 정후 의도가 욕심 X / 다툼 회피였음을 어떻게 보여줄지가 핵심. |
| `w1-d3-avoid-conflict` ⭐ | "제가 옆에서 본 바로는 다툼을 피하려는 쪽이었습니다. 형님이 오시면 실제로 말소리가 커졌고, 그때마다 어머님이 어깨를 움츠리셨어요. 그래서 저는 둘째 아들이 어머니를 겁먹지 않게 보호하려 한 걸로 느꼈습니다." | **결정타 ⭐ + 매핑 변경 d-5→d-4**. 정후의 침묵 의도 (d-4 가족 기록과 침묵의 이유) 결정타로 승격. 다국어 변경: "어머님을 겁먹지 않게 보호하려" = "to protect Mother from being frightened" (NOT "to use Mother"). JA "母を怖がらせないように守ろうとした". ZH "保护母亲不受惊". |

#### w-2 김영수 (공증인) — **출장 공증인 sweep 전체 적용**

기존: 사무실 접수창구 / 두 번 서류 제출 시나리오
변경: **공증인이 어머님 댁에 출장 방문**. 같은 날 두 번 방문 (오전 / 저녁). 두 번째 방문 때 어머니 상태 악화.

| slot id | 변경 후 KO | 컨텍스트 / 다국어 주의 |
|---|---|---|
| `w2-d1-two-visits` | "네, 작성을 마치시고 다시 찾으셔서 같은 날 저녁에 다시 방문을 했습니다. 흔한 일은 아닙니다." | **변경 포인트**: 기존 "같은 분이 같은 날 두 번 오셔서" → "작성 마친 후 다시 찾아서 같은 날 저녁에 다시 방문". 주체 = 공증인 본인 (1인칭 시점). topic/question도 "같은 날 두 번 방문하신 일" 형태로 변경됨. 다국어 주의: "찾아서" → "(they) came back to ask me again" 또는 "(I was) requested to come again". 본 시나리오 정확하게는 **공증인이 가족 요청에 따라 두 번째 출장**. EN: "Yes, after finishing the drafting, they asked for me again, so I visited again that evening." |
| `w2-d1-document-balance` | "첫 서류와 두 번째 서류의 내용이 달랐습니다. 아드님들에 대한 상속 비율이 변경되었어요." | **변경 포인트**: 기존 인상 묘사 (한쪽으로 기운 vs 균형) → 직접 사실 ("내용 달랐다 / 비율 변경"). topic도 "처음 작성한 서류와 다시 작성한 서류의 인상" 형태. |
| `w2-d2-same-submitter` | "사실 두 번째 찾아뵀을 때는 어머님 상태가 좋아보이지 않았습니다. 바로 오전에 뵀는데 저를 기억하지 못하시더라구요." | **변경 포인트**: topic/question 모두 변경 — "두 번째 방문 때 어머니 상태" 영역. **다국어 주의**: "바로 오전에 뵀는데 저를 기억하지 못하시더라구요" = 동일 인물(공증인)을 같은 날 오전과 저녁에 만났는데 어머니가 저녁에 기억 못함. EN: "Just that morning I had seen her, but she did not remember me." JA "ほんの午前中にお会いしたばかりなのに、私を覚えていらっしゃらなかったんです". |
| `w2-d2-ratio-change` | "다만 의심을 하지 않았던 게, 두 번째 서류보다 첫 번째 서류 내용이 좀 이상하게 느껴졌었어요. 그래서 조금 더 일반적인 수준으로 바꾸신 거구나 생각만 했습니다." | **변경 포인트**: 기존 "윤정후 90, 윤태성 10 → 60, 40" 구체 숫자 → "첫 서류가 이상해서 두 번째가 일반적이라 의심 안 함" (공증인 시각의 자기 합리화). 다국어 주의: 화자 자기 진술이라 "I" 시점. |
| `w2-d3-benefit-direction` ⭐ | "사실 윤정후 씨가 기억이 희미하신 어머님께 대답을 유도하는 것처럼 느껴졌습니다. 하지만 크게 의심을 하지 않았던 게, 본인 비율을 일부러 낮출 일은 없지 않습니까? 따라서 미리 합의하신 내용일 거라 생각을 했습니다." | **결정타 ⭐**. 핵심: 정후가 어머니에게 답을 유도한 정황 + 자기 비율 낮추니까 의심 안 함 + 사전 합의 추정. 다국어 모호성: "본인 비율" = 윤정후 자기 비율(60→40으로 X. 본인이 받는 몫). EN: "He would not lower his own share on purpose, would he?" JA "ご自身の比率を敢えて下げる方はいませんよね?". ZH "他不会故意降低自己的份额吧?". |

#### w-3 박순애 (어머니 친구)

| slot id | 변경 후 KO | 컨텍스트 / 다국어 주의 |
|---|---|---|
| `w3-d1-living-support` | "돈 걱정을 오래 하셨습니다. 그래도 작은아들이 달마다 용돈을 보내줘서 버틴다고 했어요." | 작은아들 = 윤정후. "용돈"은 한국어 어머니/아들 관계 표현 (small allowance / 仕送り / 零用钱·补贴). |
| `w3-d1-secret-burden` | "있었습니다. 어떤 일은 끝까지 몰라야 한다고 몇 번을 얘기했어요. 그래서 그게 대체 뭐냐고 물어도 말해주지는 않았어요." | "그 아들" 같은 지시어 회피 — 의도적 모호화 (어머니가 누구를 가리키는지 박순애가 모름). 다국어도 모호 유지. |
| `w3-d2-money-nature` | "큰 아들 공장이 어려워서 큰일이라고 하더니, 얼마 지나지 않아 다행히 해결했다고 했어요. 그래서 어떻게 해결했냐고 하니 잘 키운 아들 덕이라고만 하더라구요." | **변경 포인트**: 기존 "3억원이 나갈 때는 '태성이 공장 쪽으로 보내는 돈'" 직접 명시 → "큰 아들 공장 위기 + 작은 아들 덕에 해결" 추상화. 다국어: "잘 키운 아들 덕" = 어머니가 정후를 자랑하는 뉘앙스. EN: "thanks to the son she had raised well". JA "立派に育てた息子のおかげ". ZH "多亏养得好的儿子". |
| `w3-d2-secret-reason` | "정확하게 얘기한 적은 없지만, \"큰 애가 자존심이 강해서 사실을 알게 되면 무너질 거다\"라고 했어요. 그리고 \"둘째가 모든 짐을 혼자 짊어지고 있다\"라고도 했습니다." | "큰 애" = 윤태성. "둘째" = 윤정후. EN: "the older one" / "the second son". JA "上の子" / "下の子". ZH "老大" / "老二". |
| `w3-d3-why-kept-secret` ⭐ | "그저 두 아들 걱정 뿐이었습니다. 큰 아들이 자꾸 사업에 집착하는 게 혹여 본인이 아버지 친자가 아닌 것을 눈치채고 성공에 목을 매는 게 아닌가 걱정을 했고, 작은 아들로부터 받은 돈까지 큰 아들에게 모두 보냈다보니 유산이라도 작은 아들에게 돌려줘야 한다고 말한 적이 있어요." | **결정타 ⭐ + 진실 핵심**. 사용자 강조 변경: "의붓 자식" 표현 (한국어상 부정확) → **"본인이 아버지 친자가 아닌 것"** (정확). 의미: 어머니는 큰아들(태성)이 무의식 중 자기가 아버지 친자가 아닌 것을 눈치챘을까 걱정했음. 큰 아들 본인 시점. **다국어 주의**: "본인이 아버지 친자가 아닌 것" = "that he himself is not Father's biological son". 절대 "the second son" 또는 "his brother" 같은 오역 X. EN: "perhaps he had noticed that he himself is not his father's biological son and was clinging to success because of that". JA "ご自身が父の実子ではないことに気づいたのかと". ZH "察觉到自己不是父亲亲生的". |

---

### friend-01

#### w-1 김세라 (공통 친구)

| slot id | 변경 후 KO | 다국어 주의 |
|---|---|---|
| `w1-d1-chat-mood` | "처음엔 다들 놀랐어요. 연락 횟수만 보이니까 솔직히 저도 수민이가 선을 넘은 걸로 생각했습니다." | "수민이" = 최수민 (애칭 호칭). EN: "Sumin". JA "スミン". ZH "秀敏". |
| `w1-d1-frame-wording` | "그냥 기록만 올린 게 아니라, 예전에도 계속 비슷했다는 식으로 말이 번졌습니다. 그래서 분위기가 더 한쪽으로 쏠렸어요." | "예전에도 계속 비슷했다" = "this had happened before too". |
| `w1-d2-no-one-checked` | "없었습니다. 다들 캡처를 보고 바로 편이 갈렸어요. 저도 그때는 분위기에 눌려서 따로 연락을 못 했습니다." | "편이 갈렸다" = "sides were taken". |
| `w1-d2-blame-spread` | "몇 분 만에 벌어졌어요. 다은이가 \"수민이가 내 남자한테 또 연락하고 있다\"고 올리자, 바로 \"결혼을 앞두고 있는데 왜 또 저러냐\"는 말이 쏟아졌습니다." | "다은이" = 송다은. "내 남자" = 다은이의 약혼자(김태윤). |
| `w1-d3-first-conclusion` ⭐ | "순서가 분명했습니다. 다은이 얘기로만 상황을 판단했고, 그 말이 단톡방 기준이 돼버렸어요. 수민이 얘기는 아무도 듣지 않았습니다." | **결정타 ⭐**. "단톡방 기준" = "group chat standard"/"line in the chat". |

#### w-2 박준혁

| slot id | 변경 후 KO | 다국어 주의 |
|---|---|---|
| `w2-d1-contact-reaction` | "겉으로는 귀찮다는 식이었어요. 그런데 억울해서 화내는 사람보다는, 불편해하는 쪽에 더 가까워 보였습니다." | "선배" = 박준혁 시점의 김태윤 (회사 선배). |
| `w2-d2-flirt-remark` | "선배가 \"그 필라테스 하는 친구 괜찮더라\", \"다은이 친구만 아니었어도 진작 꼬셨을 텐데\" 이런 말을 했습니다. 약혼한 사람이 할 말은 아니었어요." | "꼬셨을 텐데" = vulgar 톤. EN: "I would have hit on her by now". JA "口説いていただろうに". ZH "早就追了她". |
| `w2-d2-why-looked-caught` | "선배가 저한테 \"괜히 잘못 건드렸다가 일이 커졌다\"는 식으로 툭 말한 적이 있어요. 그래서 저는 최수민 씨 연락이 갑자기 시작된 건 아니라고 봤습니다." | "괜히 잘못 건드렸다가" = "I shouldn't have stirred this up". |
| `w2-d3-rejection-ignored` ⭐ | "있었습니다. 선배가 휴대폰을 보여주면서 \"친구 남자친구니까 이러지 말라네\" 하고 웃어넘긴 적이 있어요. 거절 답장을 받고도 \"도도한 척 튕기네. 결국 넘어 올 거면서\"라고 했습니다. 제가 본 건 최수민 씨 집착이 아니라, 선배 쪽의 가벼운 들이댐이었습니다." | **결정타 ⭐**. "도도한 척 튕기네" = "she's just playing hard to get". JA "気取って跳ね返してる". ZH "故意装清高拒人". "넘어 올 거면서" = "she'll come around in the end". |

#### w-3 오미경 (분식집 사장)

| slot id | 변경 후 KO | 다국어 주의 |
|---|---|---|
| `w3-d2-overheard-phrase` | "네. 그 남성분이 \"한 번만 더 도와달라\"고 했습니다. 그 젊은 분은 \"왜 저한테 그러세요\"라고 했고요. 한두 번 있었던 일 같지 않았습니다." | "그 남성분" = 송다은 아버지. "그 젊은 분" = 최수민. 다국어 화자/대상 명확화 필요. EN: "The older man said... The younger woman said...". |
| `w3-d2-father-identity` | "나중에 듣고 다은 씨 아버님인 걸 알았습니다. 며칠 뒤 제가 다은 씨한테 요새 자주 안 오시냐고 무슨 일 있으시냐고 묻자, \"수민이랑 절교했다\"는 말만 짧게 했습니다." | "절교" = "we cut ties" / "we broke off". 강한 단절 표현. |
| `w3-d3-breakup-cause` ⭐ | "제가 본 건 돈 문제였습니다. 다은 씨 아버님이 수민 씨에게 무리한 부탁을 한 듯하고, 수민 씨 혼자 무너진 것 같아요. 이건 두 친구가 아니라 아버님 쪽에 문제가 있었다고 생각해요." | **결정타 ⭐**. "무리한 부탁" = "unreasonable request". |

---

## §3. family-01 case data 진실 보정 (다국어 검토)

KO 변경 6 지점:

### 3.1. partyB(윤정후) dailyRoutine (line 82)

**기존**: "가게를 운영하며 틈틈이 어머니에게 송금하고, 형 몰래 정기 지원금과 병원비를 대 왔다."
**변경**: "본래 부모님이 자신에게 물려주려던 가업 공장을 형에게 양보하고 본인은 작은 자동차부품 가게로 시작했으며, 그 가게를 운영하며 틈틈이 어머니에게 송금하고 형 몰래 정기 지원금과 병원비를 대 왔다."

**다국어 다음 의도 준수**:
- "본래 부모님이 자신에게 물려주려던 가업 공장" = "the family factory that their parents originally intended to pass to him"
- "형에게 양보하고" = "yielded it to his older brother" (자발적 양보, 강요 X)
- "본인은 작은 자동차부품 가게로 시작했으며" = "and started a small auto-parts shop himself"

### 3.2. d-3 truthDescription (line 338)

**기존**: "윤정후는 어머니 통장으로 월 단위 정기 지원금을 보냈고, 형의 공장 위기 때 3억원도 어머니 통장을 거쳐 전달했다. 윤태성은 그 돈이 어머니 돈이라고 믿고 있었다."
**변경**: "윤정후는 본인이 양보한 가업 공장이 형의 손에서 위기에 빠지자 3억원을 어머니 통장을 거쳐 전달했고, 그 이전부터 월 단위 정기 지원금도 같은 방식으로 보내 왔다. 윤태성은 그 돈이 어머니 돈이라고 믿고 있었다."

**다국어 핵심**: "본인이 양보한 가업 공장이 형의 손에서 위기에 빠지자" = "when the family factory he had yielded ran into crisis in his brother's hands".

### 3.3. d-4 truthDescription (line 376) — **진실 핵심 수정**

**기존 (오류)**: "어머니 일기장에는 윤정후가 배다른 자식이라는 사실과, 그래도 똑같은 자식으로 더 마음이 갔다는 기록이 남아 있다. 윤정후는 이 사실이 형을 무너뜨릴까 봐 침묵했다."

**변경 (정확)**: "어머니 일기장에는 윤태성이 아버지의 친자가 아니라는 사실, 어머니 입장에서는 두 아들 모두 똑같은 자식이라는 기록, 그리고 친자인 윤정후가 그 사실을 알고도 가업 공장을 형에게 양보했다는 사실이 남아 있다. 윤정후는 이 비밀이 자존심 강한 형을 무너뜨릴까 봐 끝까지 침묵했다."

**다국어 핵심 주의**:
- "윤태성이 아버지의 친자가 아니라는" — 절대 윤정후를 가리키게 X. EN: "that **Yoon Tae-seong** (the older brother) is not Father's biological son".
- "어머니 입장에서는 두 아들 모두 똑같은 자식" = "from Mother's perspective, both sons were equally her children".
- "친자인 윤정후가 그 사실을 알고도 가업 공장을 형에게 양보했다" = "Yoon Jeong-hu, who is the biological son, yielded the family factory to his brother despite knowing this".
- "자존심 강한 형" = "his proud older brother".

### 3.4. evidence e-7 restore_context (line 2663)

**기존**: "윤정후에게 미안하다는 문장, 윤정후가 배다른 자식이라는 확정 문장, 그래도 똑같은 자식이었고 오히려 더 아꼈다는 뉘앙스가 함께 남아 있다."

**변경**: "윤정후에게 미안하다는 문장, 윤태성이 아버지의 친자가 아니라는 확정 문장, 그래도 어머니 입장에서는 두 아들 모두 똑같은 자식이라는 뉘앙스, 그리고 친자인 정후가 그 사실을 알고도 가업 공장을 형에게 양보했다는 기록이 함께 남아 있다."

(같은 진실 의미. EN/JA/ZH-CN 일관 검토.)

### 3.5. truthTable t-4 (line 3016)

**기존**: "어머니 일기장은 윤정후가 배다른 자식이라는 사실과, 그래도 똑같은 자식으로 더 아꼈던 뉘앙스를 함께 남긴다."

**변경**: "어머니 일기장은 윤태성이 아버지의 친자가 아니라는 사실과 어머니 입장에서는 두 아들 모두 똑같은 자식이라는 뉘앙스, 그리고 친자인 윤정후가 그 사실을 알고도 가업 공장을 형에게 양보했다는 사실을 함께 남긴다."

### 3.6. officialRecordRecommendations 4 (line 4145)

**기존**: "윤태성은 아버지의 친자가 아니며 윤정후는 이 사실을 알고 형을 보호하기 위해 유서를 조작했다."

**변경**: "윤태성은 아버지의 친자가 아니며 윤정후는 이 사실을 알고도 가업 공장을 형에게 양보했고, 자존심 강한 형을 보호하기 위해 유서까지 손대 자기 몫을 줄였다."

### 3.7. evidence e-7 v3DepthPlan summary (line 2722, 2727)

- "윤정후 걱정과 배다른 자식 암시를 확인한다" → "윤정후 걱정과 친자 관계 암시를 확인한다"
- "배다른 자식 확정 문장과 어머니의 미안함을 연결한다" → "친자 관계 확정 문장과 어머니의 미안함, 공장 양보 기록을 연결한다"

### 3.8. evidence-2 restore_context (line 863)

- "공증인 동행" → "출장 공증인 방문"

### 3.9. 외국어 mirror 영역 자율 검토

`src/data/scriptedText/family-01.{en,ja,zh-CN}.json` 안에 위 진실 영역 (특히 공장 양보 / 친자 / 일기) 관련 문장이 있다면 새 KO 의도와 일치하는지 검토하고 어긋나는 부분만 수정. KO 원문이 그대로 있는 영역(예: 변경 X인 d-1, d-2 일반 진술)은 건드리지 X.

---

## §4. Cutscene slip phase 2 dismay 14 dispute 다국어 brief

각 phase2는 phase1 격앙 폭로 직후의 **자기 막힘 / 변명 시도 / 침묵** 1.5단계. confession_trust 직전 톤. 2-3문장. "그게..." 시작 패턴.

다국어 톤 가이드:
- EN: "It's just that..." / "The thing is..." / "I mean..." → trailing ellipsis
- JA: "それは…" / "そのことは…" → 트레일링 "…"
- ZH-CN: "那个..." / "其实..." → 트레일링 "..."

### spouse-01

**d-1**: "그게... 형 일을 끌어들이지 않으려고 입을 닫은 건데, 그렇게 보일 수 있다는 걸 저도 알았어요. 그래서 더 설명을 못 했고..."
- 의도: 형 사업 영역을 결혼생활에 끌어들이지 않으려 침묵 → 외도 의심 키운 결과 인정
- "그렇게 보일 수 있다는 걸" = "I knew it could be seen that way" (the affair)

**d-2**: "그게... 처음엔 잠깐만 막아주고 갚을 거라 했어요. 그러다 한 번이 두 번이 되고, 지연이한테 말할 타이밍은 자꾸 미뤄지고..."
- 의도: 형 사업 자금 비자금 인정. 한 번 → 반복.

**h-d3**: "그게... 수익만 받고 바로 빼낼 생각이었어요. 그런데 그 채팅방이 사라지고 나서야, 제가 한 짓의 무게가 보이기 시작했고..."
- 의도: 박지연 시점. 투자 사기방 → 수익만 뽑고 빠질 줄 → 채팅방 사라진 후 후회

**h-d4**: "그게... 신혼 초부터 계좌를 본 건 사실이에요. 그래도 그게 다 준호 탓이라고는 못 하겠어요. 마지막 서류를 움직인 건 결국 제 손이었고..."
- 의도: 박지연 자기 인정. 계좌 감시 = 본인이 먼저 시작했다는 책임

### family-01 (윤정후 시점 — 1차/2차 자백 단계 모두 그)

**d-1**: "그게... 어머니가 헷갈리실 때마다 옆에서 정리해드리려던 것뿐인데, 형님은 일로 바쁘셨고 종이 정도는 제가 충분히... 아닙니다, 그건 변명이 되네요."
- 의도: 변명 시도 → 자기 차단

**d-2**: "그게... 어머니 자필이 그대로 남았으면 형이 그걸 보고 무너졌을 거예요. 그래서 일반적인 수준으로 낮춘 거였는데, 그래도 손댄 건 손댄 거고..."
- 의도: 비율 낮춘 동기(형 보호) + 그래도 손댄 책임 인정

**d-3**: "그게... 형이 어머니 돈으로 받았다고 믿어야 자존심이 안 무너졌어요. 제 이름이 보이는 순간 다른 질문이 따라왔을 거고, 그게 결국 형의..."
- 의도: 형 자존심 = 핵심 동기. 다른 질문 → 친자 비밀 누설로 이어질 위험

**d-4**: "그게... 일기장 그 한 줄은 형이 보면 안 됐어요. 형이 자존심으로 평생 버텨온 자리인데, 그걸 한 번에 잃으면 형은 더 이상..."
- 의도: 친자 비밀 직접 언급 자제 + 형 정체성 붕괴 두려움
- **다국어 주의**: "일기장 그 한 줄"이 어떤 줄인지 모호 — d-4 confession에서 명시. EN: "that one line in the diary".

**d-5**: "그게... 저도 어머니 뜻을 그대로 두지 못한 건 마찬가지예요. 형을 보호한다고 했지만, 결국 어머니 글씨 위에 제 글씨를 얹은 것이고..."
- 의도: 자기 책임 인정. 형만 비난 X.

### friend-01 (최수민 시점)

**d-1**: "그게... 다은이한테 직접 말했어야 했는데, 그 아버지 일을 어떻게 꺼내야 할지 모르겠어서 태윤 씨만 붙잡은 거예요. 그게 더 의심을 키운 거였고..."
- 의도: 직접 말하지 못한 이유 + 태윤만 연락한 결과 의심 증폭

**d-2**: "그게... 원본을 보여주면 결혼이 무너질 게 뻔했어요. 그래서 거절만 하고 끝내려 했는데, 다은이가 캡처를 들고 나오는 순간 입이 막혔고..."
- 의도: 원본 메시지 = 태윤이 먼저 보낸 사적 접근. 그걸 보여주면 결혼 파탄 → 침묵 선택.

**d-3**: "그게... 그 돈 얘긴 다은이도 모르는 일이고, 제가 다은이한테 말하면 가족 전부를 흔드는 거잖아요. 그래서 끝까지 입을 다물려고 했는데..."
- 의도: 다은 아버지 돈 부탁 = 다은 모르는 가족 영역.

**d-4**: "그게... 금액을 말하면 다은이가 아버지를 의심해야 했어요. 그건 친구로서 시킬 수 없는 일이라, 차라리 제가 변한 사람이 되는 게 나았는데..."
- 의도: 빌려준 돈 금액 = 다은이를 아버지 의심으로 몰 도구. 친구로서 침묵 선택.

**d-5**: "그게... 그 캡처를 보자마자 머리에 다른 그림이 떠올랐어요. 제가 먼저 결론을 정해두고 친구들 동조를 받으려고 한 거고, 수민이한테 묻는 순서는 처음부터 빠져 있었어요..."
- 의도: 송다은 시점. 캡처 본 순간 이미 결론 정함 + 친구 동조 동원 → 수민이 측 입장 처음부터 누락 인정.
- **주의**: d-5는 송다은 자백 (다른 dispute는 최수민 자백). 시점 전환 주의.

---

## §5. localized.ts overlay 처리 (자율 적용)

`src/data/witnessTestimonyData/localized.ts`의 EN/JA/ZH-CN overlay 중 위 §2에서 KO가 변경된 모든 slot은 **stale 상태**. Codex가 직접 새 KO에 일치하는 외국어로 overlay를 갱신.

확정 대상 (변경된 slot id):
- spouse-01: `w1-d1-resident-info`, `w1-d1-no-single-woman`, `w1-d1-core`, `w2-d2-cash-pattern`, `w2-hd3-signature-doubt`, `w2-hd3-core` (6 slot × 3 lang = 18 overlay)
- family-01: `w1-d2-before-brother-arrives`, `w1-d3-avoid-conflict` (lieStateNudge dispute 변경됨), `w2-d1-two-visits` (topic/question/testimony 모두), `w2-d1-document-balance` (topic/question/testimony), `w2-d2-same-submitter` (topic/question/testimony), `w2-d2-ratio-change` (topic/question/testimony), `w2-d3-benefit-direction` (topic/question/testimony), `w3-d1-living-support`, `w3-d1-secret-burden`, `w3-d2-money-nature` (topic/question/testimony), `w3-d2-secret-reason`, `w3-d3-why-kept-secret` (13 slot × 3 lang = 39 overlay)
- friend-01: `w1-d1-chat-mood`, `w1-d1-frame-wording`, `w1-d2-no-one-checked`, `w1-d2-blame-spread`, `w1-d3-first-conclusion`, `w2-d1-contact-reaction`, `w2-d2-flirt-remark`, `w2-d2-why-looked-caught`, `w2-d3-rejection-ignored`, `w3-d2-overheard-phrase`, `w3-d2-father-identity`, `w3-d3-breakup-cause` (12 slot × 3 lang = 36 overlay)

총 = 31 KO slot × 3 lang = **93 overlay** (이 중 일부는 topic/question까지 변경되어 더 큼).

추가: spouse-01 `w1-d1-kid-spotted` overlay는 이미 3 lang 모두 삭제됨. mirror 영역 검토.

---

## §6. 진실 누설 검출 (D5)

본 변경은 **truth 영역**을 직접 손댐 (family-01 d-4 진실 명시 + 공장 양보 명시). 다국어 적용 후 `npm run detect-truth-leak` 통과 확인 필수.

위험 영역:
- family-01 d-4 truthDescription / e-7 restore_context / truthTable t-4 / officialRecordRecommendations — 모두 hidden dispute h-d4 또는 d-4 진실 영역. **재판관 / 시스템 메시지 / dossier 안내**에는 직접 노출 X 확인.
- 변경된 박순애 w3-d3-why-kept-secret testimony — "본인이 아버지 친자가 아닌 것을 눈치채고" = 박순애 추측 형태. 직접 진실 단정 X. truth-leak-matrix `hidden` 영역 위반 X 검증.

---

## §7. 검증

Codex 적용 후 다음 명령 통과 필수:

```bash
npm run typecheck
npm run qa:fast
npm run qa:lqa
npm run detect-truth-leak
```

`detect-truth-leak` 결과는 baseline (0건) 유지. 회귀 발견 시 stop + 메인 세션에 알림.

---

## §8. 산출물

- 직접 EN/JA/ZH-CN 적용 (src/ 파일 수정 — 본 의뢰는 단순 LQA가 아니라 KO 변경의 다국어 mirror 적용이라 shared worktree 규칙 면제). 별도 result md (`result-20260521-witness-cutscene.md`)에 변경 요약 + leak 검증 결과 첨부.
- 4 lang × 3 영역 (witness / case data / cutscene) 모두 통합 일관 적용. cherry-pick 단위 분리 X (의미 일관성 유지).
- HEAD baseline = 본 의뢰 KO commit (cf41ce93 + N).

---

## §9. 사용자 결정 사항 요약 (Codex 의문 시 참조)

사용자(메인 세션 owner)가 본 batch에서 명시한 결정:

1. **family-01 w1-d3-avoid-conflict 매핑**: d-5 → d-4 (이미 적용됨)
2. **"의붓 자식" 표현 변경**: → "아버지 친자가 아님" (윤태성 영역)
3. **공장 양보 맥락 추가 범위**: case truth 영역 전체 (이미 적용됨)
4. **공장 양보 인지 시점**: **윤정후가 친자임을 알면서 양보 (수동 자광)**
5. **공장 양보 동기**: **형 멸망 방지** (자존심 강한 형이 무너지지 않게)
6. **spouse-01 w-3 박미라**: 현재 그대로 유지 (수정 X)

위 결정은 모든 다국어 적용에 일관 반영.
