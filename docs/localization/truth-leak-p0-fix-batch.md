---
name: truth-leak-p0-fix-batch
description: matrix 확장 후 detect-truth-leak 11 findings 중 6 P0 entries 정밀 추상화 + 4언어 sync 의뢰서. 재판관/시스템 채널 pre-confession 진실 노출 제거. 디자인 의도 5건은 별개 task로 분리.
metadata:
  origin: claude (CT main thread)
  anchor: 6b26fb62
  severity: P0 (게임 핵심 원칙 — feedback_truth_leak_prohibition 위반)
---

# Truth-Leak P0 Fix Batch — 4언어 일괄 의뢰서

Anchor: `6b26fb62`

---

## 1. 배경

`scripts/detect-truth-leak.cjs` 결과 11 findings 발견. 11건 중:
- **P0 정책 위반 6건** (본 의뢰 대상): 재판관 발화(judge_question / dossier questionText)에서 pre-confession 진실 keyword 직접 언급.
- **디자인 의도 5건** (본 의뢰 제외): dossier confession 채널, gated angle truthBoundary 허용, judgeec post-combo unlock 등 정당화됨.

본 의뢰는 P0 6 entries만 KO 원문 추상화 + EN/JA/ZH-CN sync.

기준 메모리:
- [[feedback-truth-leak-prohibition]] — 잘못 패턴 #9. 재판관 / 시스템 메시지 / dossier 안내에서 NPC 자백 전 진실 콘텐츠 직접 언급 X.
- [[feedback-claude-ko-needs-codex-multilang]] — KO 단독 commit 금지, 4언어 sync 필수.

---

## 2. P0 Fix 대상 6 entries

### 2.1. family-01 d-4 dc-4 dossier questionText × 3 bands

**파일**:
- `src/data/scriptedText/family-01.json`
- `src/data/scriptedText/family-01.en.json`
- `src/data/scriptedText/family-01.zh-CN.json`
- `src/data/scriptedText/family-01.ja.json` ⚠ 현재 questionText 필드 없음 (ja schema 갭) — Codex 판단으로 추가 여부 결정

**entry key**: `dc-4.b.q1|early`, `dc-4.b.q1|mid`, `dc-4.b.q1|late` (3 bands, 같은 questionText)

**현재 KO**:
> 윤정후 씨, **형의 출생 비밀**을 언제 알게 되었고, 그 뒤 왜 혼자 감당하려 하셨습니까?

**현재 EN**:
> Jeong-hoo Yoon, when did you find out about **the secret of your brother's birth**, and why did you try to handle it alone after that?

**현재 ZH-CN**:
> 尹正虎，你是什么时候知道**你哥哥出生的秘密**的？之后你为什么要独自处理这件事？

**위반 사유**:
- matrix `family-01.d-4.hidden.ko` = ["출생 비밀", "친자 확인", "윤정후 입양", "다른 부모"].
- dossier 카드 `dc-4` label = "감춘 이유" (추상). 그러나 진입 questionText가 "출생 비밀"을 직접 명시 → judge mention pre-confession.
- dossier 카드 unlock = 증거 e-5+e-6+e-7 combo. 카드 unlock 시점에는 윤정후 lieState가 S5 미달 가능 → 자백 전 누설.

**추상화 권고 패턴**:
- "출생 비밀" → "민감한 가족 사정" / "오랜 가족 사정" / "가족 내력의 한 부분" 등 surface 어휘.
- "secret of your brother's birth" → "sensitive family matter regarding your brother" / "a long-held family matter".
- "你哥哥出生的秘密" → "关于哥哥的敏感家庭往事" / "家中长期未公开的一件事".
- 본 questionText는 dossier interview의 진입 질문. 답변 variants가 stance/lieBand별로 점진 disclosure하도록 두고, 질문 자체는 topic-level surface로 유지.

**핵심 제약**:
- 3 bands(early/mid/late) 모두 같은 questionText 사용 → 한 번에 일관 적용.
- 답변 variants는 본 의뢰에서 건드리지 X. 답변은 dossier confession 채널 디자인 의도로 수용 (4-5 finding 별개 task).

---

### 2.2. friend-01 d-4 judge_question motive_search depth 4 v4

**파일**: `src/data/scriptedText/friend-01.json` + `.en.json` + `.ja.json` + `.zh-CN.json`

**entry key**: `d-4|motive_search|4`, variant id `judgeq-d-4-motive_search-4-v4` (variants[3])

**tags**: `revealScope:all_present, targetParty:b, emotion:measured, continuity:question_depth_4, reveal:none, revealGuard:open, disclosure:guarded, depth:4`

**현재 KO**:
> 최수민 씨, **악역을 자처**한 방식이 반복된 이유를 설명하십시오.

**현재 EN**:
> Ms. Choi, explain why the pattern of making yourself the villain repeated.

**현재 JA**:
> チェ・スミンさん、悪役を自ら引き受けるやり方が繰り返された理由を説明してください。

**현재 ZH-CN**:
> 崔秀敏女士，请说明为什么自愿承担坏人角色的方式反复出现。

**위반 사유**:
- matrix `friend-01.d-4.hidden.ko` = ["차용금 미상환", "...", "악역을 자처"].
- variant tags `reveal:none, disclosure:guarded` — 질문 자체는 진실 노출 금지 명시. 그러나 텍스트가 "악역을 자처"를 사실 전제로 추궁.
- depth=4 dispatch는 lieState gate 없이 history count 기반 → S0~S2 단계에서도 dispatch 가능.

**추상화 권고 패턴**:
- "악역을 자처한 방식" → "스스로 책임을 떠안은 입장" / "자신을 불리한 위치에 둔 선택" / "같은 입장 표명을 반복한 방식" 등.
- "making yourself the villain" → "putting yourself in the difficult position" / "taking the burden alone".
- "悪役を自ら引き受ける" → "自ら不利な立場を引き受ける" / "自分が責任を抱える形を選ぶ".
- "自愿承担坏人角色" → "主动承担不利位置" / "选择独自背负压力".

---

### 2.3. friend-01 d-4 judge_question empathy_approach depth 3 v2

**파일**: 동상 4언어

**entry key**: `d-4|empathy_approach|3`, variant id `judgeq-d-4-empathy_approach-3-v2` (variants[1])

**tags**: `revealScope:all_present, targetParty:a, reveal:none, revealGuard:open, disclosure:guarded, depth:3`

**현재 KO**:
> 송다은 씨, 최수민 씨가 **악역을 자처**했다는 말이 어떻게 들립니까.

**현재 EN**:
> Ms. Song, how does it sound to hear that Ms. Choi chose to be the villain?

**현재 JA**:
> ソン・ダウンさん、チェ・スミンさんが悪役を引き受けたという言葉は、どう聞こえますか。

**현재 ZH-CN**:
> 宋多恩女士，听到崔秀敏女士自愿承担坏人角色这句话，你是什么感受？

**위반 사유**: 2.2와 동일. 재판관이 송다은에게 "최수민 = 악역 자처" 사실 전제로 청취. d-4 진실 keyword 노출.

**추상화 권고 패턴**:
- "최수민 씨가 악역을 자처했다는 말" → "최수민 씨가 책임을 떠안았다는 시각" / "최수민 씨의 입장 표명 방식" / "최수민 씨가 침묵으로 책임을 안았다는 해석".
- 4언어 sync 마찬가지로 추상 어휘.

---

### 2.4. friend-01 d-3 judge_question fact_pursuit depth 2 v3

**파일**: 동상 4언어

**entry key**: `d-3|fact_pursuit|2`, variant id `judgeq-d-3-fact_pursuit-2-v3` (variants[2])

**tags**: `revealScope:all_present, targetParty:both, emotion:measured, continuity:question_depth_2, reveal:none, revealGuard:open, disclosure:guarded, depth:2`

**현재 KO**:
> 두 분, **돈을 빌려 달라는 말**과 **경고 연락**이 겹친 시점을 자료에 맞춰 말씀하십시오.

**현재 EN**:
> Both of you, match the point where **the money request** and **the warning contact** overlapped to the materials.

**현재 JA**:
> お二人とも、**お金を貸してほしいという話**と**警告の連絡**が重なった時点を、資料に沿って話してください。

**현재 ZH-CN**:
> 两位，请根据资料说明**借钱的话**与**警告联系**重叠的时间点。

**위반 사유**:
- 단일 entry에서 **d-1 진실 (경고 연락 / warning contact)** + **d-3 진실 (돈을 빌려 달라는 말 / money request)** 양쪽 keyword 동시 노출.
- matrix `friend-01.d-1.hidden.en` includes "warning contact"; `friend-01.d-3.hidden.ko` includes "돈을 빌려달라고 접근" (text와 다른 phrasing이라 ko miss, en hit).
- depth=2는 초기 추궁. lieState S0 가능성 높음. `reveal:none` 명시인데 텍스트가 두 dispute 진실 노출.

**추상화 권고 패턴**:
- "돈을 빌려 달라는 말" → "자금 관련 의사 전달" / "금전 관련 발언" / "금전 부탁의 정황".
- "경고 연락" → "연속된 연락" / "특정 목적의 연락" / "반복 시도된 연락".
- "money request" → "the financial discussion" / "the money-related conversation".
- "warning contact" → "the persistent contact" / "the repeated outreach" / "the targeted contact".

핵심: 두 진실 keyword 모두 surface 어휘로 치환. 시점 일치 여부 질문 의도는 유지.

---

## 3. 4언어 sync 요구사항

각 entry의 4언어 text가 같은 추상도/뉘앙스를 유지해야 함 ([[feedback-claude-ko-needs-codex-multilang]] 정책):
- KO 어휘 추상도 = EN/JA/ZH-CN 추상도. (예: KO만 "민감한 가족 사정"으로 두고 EN은 "secret of brother's birth" 유지 X)
- ja file의 dossier questionText 필드 갭 (family-01 d-4 영역): Codex 판단으로 추가하거나 ja runtime 렌더링 검증 후 결정.

---

## 4. 검증

```powershell
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs
```

**기대 결과**:
- truth-leak findings: 11 → **5** (P0 6건 제거, 디자인 의도 5건만 잔존)
- 잔존 5건 = family-01 d-5 zh-CN ×2 + family-01 d-3 zh-CN ×1 + friend-01 d-4 ko ×2 (dossier dc-5 late + scriptedAngles protective_silence)
- qa:fast P0=0 유지

---

## 5. 작업 환경

### 5.1. 별도 worktree

```powershell
git fetch
git worktree add D:/solomon-truth-leak-p0 -b codex/truth-leak-p0-fix 6b26fb62
```

### 5.2. 산출물

- Fix commits (entry별 또는 일괄)
- `docs/localization/truth-leak-p0-fix-result.md` 작성
  - 각 entry 변경 전/후 KO/EN/JA/ZH-CN
  - 추상화 패턴 결정 근거
  - detect-truth-leak before/after count
  - ja schema 갭 처리 방식

---

## 6. 안전 규칙

- ✅ READ from `src/data/scriptedText/family-01*.json`, `friend-01*.json`
- ✅ WRITE to 6 entries 위 표시된 위치만 (questionText 또는 variants[N].text)
- ❌ matrix 파일 (`truth-leak-matrix.json`) 수정 — 별개 task
- ❌ 디자인 의도 5건 (family-01 d-5 dossier, family-01 d-3 judgeec, friend-01 d-4 dc-5 late, protective_silence) 건드리지 X
- ❌ 답변 variants 수정 — 본 의뢰는 질문 채널만
- ❌ origin/main push
- ❌ glossary 수정

---

## 7. 우선순위

**P0** — 게임 핵심 원칙 위반. matrix 확장으로 신규 발견. 본 의뢰 완료 시 truth-leak baseline 5로 안정화.
