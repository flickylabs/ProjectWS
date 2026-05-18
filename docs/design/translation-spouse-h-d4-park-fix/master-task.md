# 마스터 의뢰서: spouse-01 h-d4 박지연 측 judgeQuestions placeholder leak fix

작성일: 2026-05-19
대상: Codex
선행 자료:
- `src/data/scriptedAngles/spouse-01_judge_questions.json` — KO 원본 (절대 변경 금지, baseline)
- `src/data/scriptedAngles/spouse-01_judge_questions.en.json` — fix 대상
- `src/data/scriptedAngles/spouse-01_judge_questions.ja.json` — fix 대상
- `src/data/scriptedAngles/spouse-01_judge_questions.zh-CN.json` — fix 대상
- `docs/localization/non-dialogue-extract/GPT_Result/glossary_locked.csv` — 용어집 (인명 표기 등)
- `scripts/verify-translations.cjs` — 작업 후 검증

---

## §0. 진입 조건

| 항목 | 상태 |
|---|---|
| working tree clean (translation-round2 split 6 commit 적용 완료) | ✓ (현재 HEAD = 8e6cd0ed) |
| 베이스 anchor 보존 | ✓ `pre-translation-round2-split` 태그 유지 |
| KO 원본 무결성 | ✓ spouse-01_judge_questions.json 변경 없음 |
| 사용자 PC QA 시작 전 또는 병행 | ⏳ |

진입 시 working tree clean. 작업 후 별도 commit 분리.

## §1. 배경

Phase 3 번역 라운드 적용 후 자동 QA에서 spouse-01 h-d4 박지연 측 motive·empathy 질문 3개 index가 **EN/JA/ZH-CN 3언어 동일하게** generic placeholder로 fallback된 회귀 발견.

### 1.1. 증상 요약

KO 원본 [102][104][106]은 박지연이 "**남편이 무엇을 가장 먼저 숨겼다고 보는지**" 등 **남편의 은폐를 박지연이 어떻게 판단했는지**를 묻는 추상/메타 질문. 외국어 3종이 모두 "**what you hid and when**" / "**何をいつ隠したのか**" / "**你在何时隐瞒了什么**" 일반 placeholder를 그대로 박아 박지연 본인의 은폐를 추궁하는 의미로 뒤바뀜.

### 1.2. 원인 추정

번역 pipeline이 motive-probe/empathy 질문의 v[0]/v[4]를 "X를 둘러싼 결정의 동기" 균일 template로 변환할 때, KO 원문이 추상/메타 형태(주제어가 상대측 행동을 가리킴)이면 topic 추출에 실패해 generic placeholder fallback. 같은 dispute(h-d4) 이준호 측 [97][99][101]은 "은폐·현금인출·이후침묵" 구체 명사구로 정확 치환됨. 박지연 측 d-1/d-2/h-d3 motive 질문(idx 9/15/45/74 등)도 "오피스텔/새벽 통화/현금 출금/공동 적금 해지" 구체 치환 정상. → **target=a 측 메타 질문**에서만 발생한 국소 회귀.

### 1.3. 영향 평가

전체 226 indices 중 **3 index × 3 lang = 9 노드**, **21 string**.
- pipeline-wide 스캔 (`docs/design/translation-lqa-phase/master-task.md` 참조 검출 알고리즘 활용) 결과 **광범위 leak 없음 확인**.
- KO 원본 무결성 OK.
- 빌드/타입체크/lint/qa:fast 모두 통과.
- 잠재 player 노출: spouse-01에서 박지연 측 h-d4 motive·empathy 추궁 시 외국어 사용 시 의미 뒤바뀜 발생.

## §2. 작업 범위

### 2.1. 정확 수정 대상

`src/data/scriptedAngles/spouse-01_judge_questions.{en,ja,zh-CN}.json` 의 다음 index만 `variants[*].text` 재번역:

| index | disputeId | target | intent (KO 의도) | variants 수 |
|---|---|---|---|---|
| 102 | h-d4 | a (박지연) | 사실 추궁 — 박지연이 본 남편의 은폐와 박지연 본인이 본 침묵의 분리 | 5 |
| 104 | h-d4 | a (박지연) | 동기 탐색 — 박지연 쪽 숨김 동기 (상대 선후 단정 X) | 5 |
| 106 | h-d4 | a (박지연) | 공감 접근 — 박지연이 상대 침묵을 알아챈 감정 + 본인 행동 책임 | 5 |

각 index의 `behaviorHint`는 **변경 금지** (이미 의도 가이드를 정확히 담고 있음). `text`만 재작성.

### 2.2. KO 원본 (절대 baseline, 의미 그대로 재번역)

#### [102] 사실 추궁 — target=a 박지연

```
v[0] 박지연 씨, 남편이 무엇을 가장 먼저 숨겼다고 보는지, 그 판단의 근거 자료부터 답해 주십시오.
v[1] 본인이 직접 확인한 침묵과 다른 사람에게 듣고 알게 된 침묵을 나눠 정리해 주십시오.
v[2] 이준호 씨가 침묵의 출발점에 대해 다르게 설명하는 부분과 본인의 시점 사이에 어긋나는 지점을 짚어 주십시오.
v[3] 같은 시기 본인 쪽에서 말하지 않은 항목이 있었는지, 양쪽 침묵을 자료 기준으로 시간순으로 정리해 주십시오.
v[4] 박지연 씨, 본인이 직접 확인하지 못한 채 추정으로 남은 침묵이 있다면 그 부분부터 답해 주십시오.
```

behaviorHint: `사실 추궁. 본인이 본 침묵과 들어 알게 된 침묵을 분리해 답하게 한다.`

→ 핵심: 박지연이 묻는 대상은 **남편의 은폐 + 박지연이 직접 확인한 침묵 vs 들어 알게 된 침묵**. 박지연 본인이 무엇을 숨겼는지를 추궁하는 질문이 아님.

#### [104] 동기 탐색 — target=a 박지연

```
v[0] 박지연 씨, 본인이 어떤 부분을 가장 먼저 숨겼는지, 그 시점의 동기가 무엇이었는지 본인 기준에서 답해 주십시오.
v[1] 남편의 숨김을 마주한 뒤 본인 쪽 숨김을 시작했는지, 그보다 앞서 시작한 숨김이 따로 있었는지 나눠 말씀해 주십시오.
v[2] 본인의 숨김에 어떤 자기방어 또는 응징의 측면이 있었는지 설명해 주십시오.
v[3] 그 숨김을 풀 수 있었던 시점이 있었음에도 풀지 않은 결정의 동기를 답해 주십시오.
v[4] 지금 공개할 수 있는 범위 안에서, 본인이 가장 늦게 꺼낸 숨김이 어떤 종류였는지 말씀해 주십시오.
```

behaviorHint: `동기 탐색. 본인 쪽 숨김의 시작 동기를 묻되 상대가 먼저 숨겼다는 단정은 열지 않는다.`

→ 핵심: 박지연 본인의 숨김 동기를 묻지만 **"상대가 먼저 숨겼다"는 단정은 회피**해야 함. 상대 선후를 단정하면 진실 누설 위험. KO는 "남편의 숨김을 마주한 뒤 본인 쪽 숨김을 시작했는지, 그보다 앞서 시작한 숨김이 따로 있었는지" 가정형 분리.

#### [106] 공감 접근 — target=a 박지연

```
v[0] 박지연 씨, 상대의 침묵을 알아챘을 때 본인 안에서도 어떤 결심이 빠르게 굳어졌을 것입니다. 그때의 마음을 말씀해 주실 수 있습니까.
v[1] 박지연 씨, 상대가 먼저 숨겼다고 본인이 판단한 근거와 그 판단을 직접 확인한 부분의 경계를 정리해 주십시오.
v[2] 박지연 씨, 상대의 침묵을 알아챈 첫 시점의 감정과 그 후 본인 행동으로 옮겨진 시점 사이가 얼마나 가까웠습니까.
v[3] 박지연 씨, 상대 침묵에 대한 분노는 잠시 두고, 그 분노 위에 본인이 시작한 일의 책임을 인정할 수 있는 만큼 말씀해 주십시오.
v[4] 박지연 씨, 침묵의 선후를 지금 결론짓자는 뜻은 아닙니다. 상대 침묵을 본인이 처음 알아챈 한 시점만이라도 다시 짚어 주실 수 있겠습니까.
```

behaviorHint: `공감 접근. 상대 침묵에 대한 분노를 인정하되 그 위에 시작한 본인 행동의 책임을 받게 한다.`

→ 핵심: 박지연이 **상대(남편)의 침묵을 알아챘을 때의 감정**과 **그 위에 박지연 본인이 시작한 행동의 책임**을 분리. KO는 "상대 침묵에 대한 분노 → 그 분노 위에 본인이 시작한 일의 책임" 두 단계 구조.

### 2.3. 현재 외국어 (회귀 상태 — 교체 대상)

#### [102] EN/JA/ZH-CN (placeholder leak)

```
EN v[0] Ms. Park Ji-yeon, please answer first when and through which material you confirmed what you hid and when.
JA v[0] パク・ジヨンさん、何をいつ隠したのかをいつ、どの資料で確認したのかから答えてください。
ZH v[0] 朴智妍女士，请先回答你是在何时、通过什么资料确认你在何时隐瞒了什么的。
```

문제: "what you hid and when" / "何をいつ隠したのか" / "你在何时隐瞒了什么" 가 박지연 본인의 은폐를 단정. KO는 "남편이 무엇을 가장 먼저 숨겼다고 보는지"(남편의 은폐를 박지연이 판단).

[104][106]도 동일 generic placeholder 패턴.

### 2.4. 재번역 가이드

#### 의미 보존 원칙

1. **주체 정확성**: KO [102]/[106]은 박지연이 **남편의 은폐/침묵을 어떻게 판단·인지했는지** 묻는 질문. 박지연 본인의 은폐를 추궁하지 말 것. [104]만 박지연 본인 숨김 동기 묻는 질문.
2. **진실 단정 회피**: behaviorHint의 가이드라인 충실 반영. 특히 [104]는 "상대가 먼저 숨겼다는 단정은 열지 않는다" 준수.
3. **변이성 보존**: KO는 각 variant가 고유 어휘/구문. 외국어도 "X를 둘러싼 결정의 동기" 균일 template로 변환하지 말고 variant마다 다른 어휘.
4. **인명/호칭**: glossary 준수
   - 박지연 → Ms. Park Ji-yeon / パク・ジヨンさん / 朴智妍女士
   - 이준호 → Mr. Lee Jun-ho / イ・ジュノさん / 李俊浩先生

#### 톤

- 재판관 톤 유지: 정중·중립·추궁의 형식
- 박지연을 향한 호칭은 v[0]·v[4]에만 (KO 패턴 일치, 중간 variant는 호칭 생략)
- empathy 접근([106])은 부드러운 어조, 사실 추궁([102])은 객관적 어조, 동기 탐색([104])은 신중 분리 어조

#### 참고 자료

- 동 dispute 이준호 측 [97][99][101] 외국어는 **정상 번역** (구체 topic 명사구가 정확 치환됨). 참고 가능하나 박지연 측은 의미가 다름.
- d-1/d-2/h-d3 박지연 측 motive 질문 (idx 9/15/45/74)도 정상. 그러나 그들은 구체 명사구가 KO에 있어서 정상화된 케이스.
- [102][104][106]은 KO 자체가 메타 질문이라 외국어도 메타 구조 유지하되 placeholder가 아닌 실제 의미를 담아야 함.

### 2.5. 산출물

- `src/data/scriptedAngles/spouse-01_judge_questions.en.json` — [102][104][106] variants[0..4].text 재번역, behaviorHint 보존
- `src/data/scriptedAngles/spouse-01_judge_questions.ja.json` — 동
- `src/data/scriptedAngles/spouse-01_judge_questions.zh-CN.json` — 동
- (KO 원본 `spouse-01_judge_questions.json` 절대 변경 금지)

## §3. 검증

### 3.1. 자동 검증

작업 후 다음 모두 통과:

```bash
npx tsc -b --noEmit   # EXIT=0
npm run qa:fast       # EXIT=0
```

placeholder 잔류 검증 (모두 0건이어야 함):

```bash
node -e "
const fs = require('fs');
const files = ['en', 'ja', 'zh-CN'].map(l => 'src/data/scriptedAngles/spouse-01_judge_questions.' + l + '.json');
const patterns = {
  en: /what you (hid|concealed) (and|when)/i,
  ja: /何をいつ(隠した|決めた)/,
  'zh-CN': /你在何时(隐瞒|决定)了什么/,
};
for (const f of files) {
  const lang = f.match(/\.([\w-]+)\.json\$/)[1];
  const data = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const idx of [102, 104, 106]) {
    const node = data.judgeQuestions[idx];
    for (let vi = 0; vi < node.variants.length; vi++) {
      const text = node.variants[vi].text;
      if (patterns[lang].test(text)) {
        console.error('REGRESSION: ' + f + ' [' + idx + '].v[' + vi + ']: ' + text);
        process.exit(1);
      }
    }
  }
}
console.log('OK — no placeholder leak in [102][104][106]');
"
```

### 3.2. 의미 보존 spot check (사람 검토 필수)

다음 4가지 차원에서 KO ↔ 외국어 의미 일치 확인:

1. **주체 정확성**: [102]/[106]은 남편 은폐 인지 / 박지연 자기 행동 책임 (둘 다), [104]는 박지연 본인 숨김 동기
2. **단정 회피**: [104] 어디에도 "상대가 먼저 숨겼다"는 단정 없음
3. **variant 다양성**: 각 variant가 고유 어휘 (균일 template 회귀 방지)
4. **자연성**: 모국어 화자가 어색하다고 느끼지 않음 ([잘못 패턴 #2: 보정 = 9차원 맥락-의미 정확성](feedback_revision_meaning_over_form.md) 기준)

## §4. 적용 / 커밋 전략

1. 작업 후 working tree에 변경 보존
2. 사용자 spot check 통과 후 단일 commit 생성:
   - 메시지 제목: `Fix placeholder leak in spouse-01 h-d4 Park Jiyeon judge questions`
   - 본문: 회귀 원인 + 적용 범위 + 검증 통과 명시
3. push 없음 (사용자 결정 대기)

## §5. 비-범위 (이번 작업에서 하지 않는 것)

- KO 원본 수정 (절대 금지)
- spouse-01 h-d4 외 dispute의 외국어 변경
- family-01 / friend-01 외국어 변경
- behaviorHint 변경
- judgeQuestions 외 데이터(case JSON, dialogue, scriptedText 등) 변경
- pipeline 스크립트(`apply-translation-phase3.cjs`) 수정 — 별도 Phase 4에서 처리

## §6. 작업 자원 / 예상 시간

- Codex 1 스레드
- 9 노드 × 5 variants = 45 string 재번역 (3언어 × 3 index × 5 variants)
- 의미 보존 + variant 다양성 + behaviorHint 준수 = 약 30~60분

---

**참조 메모리**: [잘못 패턴 #9: 진실 누설 금지](feedback_truth_leak_prohibition.md), [잘못 패턴 #2: 보정 = 의미 정확성](feedback_revision_meaning_over_form.md), [번역 pipeline placeholder fallback 패턴](feedback_translation_pipeline_placeholder_leak.md)
