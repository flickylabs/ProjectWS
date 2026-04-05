# Thread E 지시 — 84건 수정 + 재실행 + 검증 고도화

> 발신: CT (2026-04-06)
> 수신: Thread E
> 긴급도: 최상 — 한번에 끝내야 함. 토큰 낭비 없이 치밀하게.

---

## 상황

GPT Pro 7세션 분석 결과: 자동 검증 99.5% PASS vs GPT Pro 37% PASS.
근본 원인 5가지가 밝혀졌고, **전부 한번에 수정 후 84건 전체 재실행**한다.

---

## 수정 지시 (P0~P2 전부 한번에)

### P0-1: 재판관 질문 조사 오류

**파일**: `tests/playthrough-runner.cjs`의 `generateScenario()`

**문제**: 증거 질문에서 `${surfaceName}를`로 하드코딩 → "기록를", "메일를" 오류

**수정**: `koreanPostposition.ts`의 `pp을를()` 사용. CJS에서 ESM import가 안 되면, 받침 판정 함수를 인라인으로:

```javascript
function pp을를(word) {
  const last = word.charAt(word.length - 1)
  const code = last.charCodeAt(0)
  if (code >= 0xAC00 && code <= 0xD7A3) {
    return ((code - 0xAC00) % 28 !== 0) ? '을' : '를'
  }
  return '를'
}

// 사용:
question: `${name} 씨, 이 ${surfaceName}${pp을를(surfaceName)} 보시고 설명해 주십시오.`
```

`pp이가`, `pp은는`, `pp과와`도 같은 패턴으로 추가해서 모든 질문 템플릿에 적용.

---

### P0-2: few-shot 예시 금전/비금전 분기

**파일**: `tests/playthrough-runner.cjs`의 `buildPrompt()`

**문제**: spouse-01 기반 예시(송금, 금액)가 하드코딩 → 비금전 사건에 "송금" 오염

**수정**: 금전/비금전 2분류 동적 감지 + 예시 분기

```javascript
const MONETARY_KW = /송금|이체|금액|원\b|돈|비용|계좌|환급|보증금|월세|정산|예치|납부|수당|급여/

function isMonetaryCase(caseData) {
  return (caseData.disputes || []).some(d =>
    MONETARY_KW.test(d.name || '') || MONETARY_KW.test(d.anchorTruth || '') || MONETARY_KW.test(d.truthDescription || '')
  )
}

const MONETARY_EXAMPLES = `
[deny/S1 회피형] "적지 않은 돈이 움직인 건 맞습니다. 그런데 그 숫자만 보고 다른 뜻부터 붙이는 건 순서가 아닙니다."
[hedge/S2] "집안에 급한 일이 생겨 먼저 움직였습니다. 설명을 늦춘 건 제 잘못이지만, 성격이 다른 돈입니다."
[blame/S3] "제가 늦었습니다. 그렇다고 남의 폰을 열고 외도부터 만든 순서까지 사라지진 않습니다."
[emotional/S4] "처가 쪽 돈 앞에서 쩔쩔매는 꼴을 보이기 싫었습니다."
[confess/S5] "280만원은 장모님 추석 연휴 간병 예약금이었습니다. 재가돌봄센터 상담팀장에게 보낸 것이고, 추석 연휴 간병 예약금을 위한 것이었습니다."
`

const NON_MONETARY_EXAMPLES = `
[deny/S1 회피형] "그날 제가 한 건 맞습니다. 하지만 그게 무슨 뜻인지는 맥락이 있습니다."
[hedge/S2] "상황이 급해서 먼저 움직였습니다. 설명이 늦은 건 제 잘못이지만, 의도한 결과는 아닙니다."
[blame/S3] "제가 늦었습니다. 그렇다고 상대방이 한 행동까지 사라지진 않습니다."
[emotional/S4] "체면 때문에 입을 닫고 있었습니다. 그 자리에서 말하면 더 큰일이 날 것 같아서."
[confess/S5] "(사건별 구체적 사실) — 이걸 숨긴 건 제 잘못입니다. 그때는 들킬까봐 무서웠습니다."
`

// buildPrompt() 안에서:
const examples = isMonetaryCase(caseData) ? MONETARY_EXAMPLES : NON_MONETARY_EXAMPLES
```

**추가**: 비금전 사건에는 반드시 monetaryGuard 삽입:
```javascript
if (!isMonetaryCase(caseData)) {
  systemPrompt += `\n★★★ 이 사건에는 금전 거래가 포함되지 않는다. 송금, 이체, 금액, 돈, 계좌, 환급, 보증금, 월세 등 금전 관련 표현을 절대 사용하지 마. "큰돈", "돈을 보내다" 같은 은유적 표현도 포함된다. 위반 시 출력 무효.\n`
}
```

---

### P1-1: 빈 atoms fallback

**파일**: `tests/playthrough-runner.cjs`의 `run()` 내 LLM 호출 직전

**문제**: 특정 dispute/state 조합에 atoms가 없으면 LLM이 "I'm sorry" 또는 프롬프트 누출

**수정**:
```javascript
const atoms = selectAtoms(policy?.claimAtoms || [], subAction)
if (atoms.length === 0) {
  // atoms가 없으면 기본 방어 응답
  const fallbackResponses = {
    deny: '그 부분은 제가 지금 바로 말씀드리기 어렵습니다.',
    hedge: '여러 사정이 있었습니다. 다만 지금은 정리가 필요합니다.',
    blame: '제 잘못만은 아닙니다. 상대방도 확인해 보셔야 합니다.',
    emotional: '솔직히 그때는 힘들었습니다.',
    confess: '숨긴 건 사실입니다.',
  }
  return { response: fallbackResponses[stance] || '답변을 준비하겠습니다.', issues: ['atoms_empty_fallback'] }
}
```

이렇게 하면 LLM 호출 자체를 스킵하고 안전한 응답을 반환. WARN으로 기록.

---

### P1-2: S5 자백 구조화

**파일**: `tests/playthrough-runner.cjs`의 `buildPrompt()` 내 S5 분기

**문제**: "잘못했습니다" 수준에 머물고 구체적 사실 미포함

**수정**: S5일 때 프롬프트에 필수 체크리스트 삽입:
```javascript
if (state === 'S5') {
  systemPrompt += `
★ 자백 필수 구성 (모두 포함해야 유효한 자백):
1. [핵심 행위] 무엇을 했는지 구체적으로 1문장 (표현 재료의 구체적 정보 반드시 사용)
2. [구체적 정보] 금액/인물/기관/날짜 중 해당하는 것을 전부 실명/실수로 말하라
3. [은폐 이유] 왜 숨겼는지 1문장
4. [현재 심정] 지금 어떤 감정인지 1문장 (두려움/후회/체면/체념 중 택1)
- "인정합니다"로만 끝내면 무효. 최소 4문장 이상.
- "감수하겠습니다", "이로 인해", "해당 금액" 금지.
`
}
```

---

### P2-1: 번역체 금지 강화

**파일**: `tests/playthrough-runner.cjs`의 `buildPrompt()`

**수정**: 프롬프트 절대 규칙 섹션에 번역체 금지 9패턴 + 추가 3패턴 명시:
```javascript
systemPrompt += `
★ 번역체/공문서체 절대 금지:
- "~된 것으로 생각됩니다" → 직접 말하라
- "~인 측면이 있었습니다" → "~한 점은 있습니다"
- "여러 가지 상황이 얽혀" → 구체적 상황 1가지만
- "관련 사항을 간과하게 된" → "놓쳤습니다"
- "부득이하게" → "어쩔 수 없이" 또는 "급해서"
- "해당 건에 대해서는" → "그 일은"
- "~하는 바입니다" → 금지
- "인지하고 있습니다" → "알고 있습니다"
- "~에 기인합니다" → "~ 때문입니다"
- "제 불찰" → "제 잘못"
- "문의를 드린 것이었고" → "물어본 것이고"
- "~하게 되었습니다" → "~했습니다"
- "~만을" → "~만"
`
```

---

## 자동 검증 고도화 (핵심 — 치밀하게)

**파일**: `tests/playthrough-runner.cjs`의 `validateResponse()` 전면 재설계

현재 3개 항목만 체크 → **20개 항목으로 확장**. 아래를 정확히 구현해.

### 카테고리 A: 금지 표현 (즉시 FAIL)

```javascript
function validateResponse(resp, ctx) {
  const issues = []

  // A1: 금전 표현 (비금전 사건만)
  if (!ctx.isMonetary) {
    if (/송금|이체|금액|[0-9,]+원|돈을?\s|비용|계좌|환급|보증금|월세|정산|큰돈|적지\s*않은\s*돈/.test(resp)) {
      issues.push({ code: 'A1', severity: 'CRITICAL', detail: '비금전 사건에 금전 표현' })
    }
  }

  // A2: 번역체 9+3패턴
  const translationPatterns = [
    [/된\s*것으로\s*생각/, '번역체:생각됩니다'],
    [/인\s*측면이\s*있었/, '번역체:측면'],
    [/여러\s*가지.*얽혀/, '번역체:여러가지얽혀'],
    [/간과하게\s*된/, '번역체:간과'],
    [/하는\s*바입니다/, '번역체:바입니다'],
    [/에\s*기인/, '번역체:기인'],
    [/부득이하게/, '번역체:부득이'],
    [/해당\s*건에\s*대해서는/, '번역체:해당건'],
    [/인지하고\s*있습니다/, '번역체:인지'],
    [/제\s*불찰/, '번역체:불찰'],
    [/문의를\s*드린/, '번역체:문의드린'],
    [/하게\s*되었습니다/, '번역체:하게되었'],
  ]
  for (const [pat, code] of translationPatterns) {
    if (pat.test(resp)) issues.push({ code: 'A2', severity: 'FAIL', detail: code })
  }

  // A3: "사전 상의/협의" (S0-S2에서만)
  if (['S0','S1','S2'].includes(ctx.state)) {
    if (/사전\s*(상의|협의)/.test(resp)) {
      issues.push({ code: 'A3', severity: 'FAIL', detail: '사전상의금지' })
    }
  }

  // A4: "미리 말씀드리지 못한"
  if (/미리\s*말씀드리지\s*못한/.test(resp)) {
    issues.push({ code: 'A4', severity: 'FAIL', detail: '클리셰:미리말씀' })
  }

  // A5: "특정 X" 패턴
  if (/특정\s*(기관|인|금액|사람|곳|업체|단체)/.test(resp)) {
    issues.push({ code: 'A5', severity: 'FAIL', detail: '특정X패턴' })
  }
```

### 카테고리 B: Truth Throttle (CRITICAL)

```javascript
  // B1: S0-S1에서 구체적 금액 노출
  if (['S0','S1'].includes(ctx.state) && ctx.isMonetary) {
    if (/[0-9,]+만?\s*원|\d{2,}만\s*원/.test(resp)) {
      issues.push({ code: 'B1', severity: 'CRITICAL', detail: 'S0-S1 금액 노출' })
    }
  }

  // B2: S0-S1에서 인물 실명 노출 (v2-atoms의 S3+ fullName과 대조)
  if (['S0','S1'].includes(ctx.state) && ctx.forbiddenNames) {
    for (const name of ctx.forbiddenNames) {
      if (resp.includes(name)) {
        issues.push({ code: 'B2', severity: 'CRITICAL', detail: `S0-S1 실명 노출: ${name}` })
      }
    }
  }

  // B3: S0-S1에서 기관 정식명칭 노출
  if (['S0','S1'].includes(ctx.state) && ctx.forbiddenInstitutions) {
    for (const inst of ctx.forbiddenInstitutions) {
      if (resp.includes(inst)) {
        issues.push({ code: 'B3', severity: 'CRITICAL', detail: `S0-S1 기관명 노출: ${inst}` })
      }
    }
  }

  // B4: S5에서 구체적 사실 미포함 (최소 4문장 + 구체적 정보 1개 이상)
  if (ctx.state === 'S5') {
    const sentences = resp.split(/[.!?]\s*/).filter(s => s.trim().length > 5)
    if (sentences.length < 4) {
      issues.push({ code: 'B4', severity: 'FAIL', detail: `S5 문장 부족(${sentences.length}/4)` })
    }
    // S5에서 구체적 정보(금액, 이름, 기관) 최소 1개
    if (ctx.isMonetary && !/[0-9]+만?\s*원/.test(resp)) {
      issues.push({ code: 'B4', severity: 'FAIL', detail: 'S5 구체적 금액 미포함' })
    }
  }
```

### 카테고리 C: 호칭/조사 (CRITICAL~FAIL)

```javascript
  // C1: 재판관 시점 오류 (재판관 질문에 "제 아내/남편" 포함)
  if (ctx.isJudgeQuestion) {
    if (/제\s*(아내|남편|형|동생|누나|언니|오빠|어머니|아버지|친구|동업자|팀장|팀원)/.test(resp)) {
      issues.push({ code: 'C1', severity: 'CRITICAL', detail: '재판관이 당사자 관점 호칭 사용' })
    }
  }

  // C2: 조사 이중 오류 ("사실이입니다", "이름만을")
  if (/이입니다|이습니다/.test(resp)) {
    issues.push({ code: 'C2', severity: 'FAIL', detail: '이중 조사: 이입니다' })
  }
  if (/만을\s/.test(resp)) {
    issues.push({ code: 'C2', severity: 'WARN', detail: '이중 조사: 만을' })
  }

  // C3: 반말 종결 (재판관 대상 발화에서)
  if (ctx.speakingToJudge) {
    const banmalEndings = /(?:했어|했지|했다|같아|없어|있어|봐|해줘|할게|인데|거야|잖아|거든)\s*[.!?]?\s*$/m
    if (banmalEndings.test(resp)) {
      issues.push({ code: 'C3', severity: 'FAIL', detail: '재판관에게 반말' })
    }
  }

  // C4: 해요체 잔존 (emotional/confession 제외)
  if (!['emotional','confess'].includes(ctx.stance)) {
    if (/에요[.!?\s]|해요[.!?\s]|거예요[.!?\s]|했어요[.!?\s]|있어요[.!?\s]|같아요[.!?\s]/.test(resp)) {
      issues.push({ code: 'C4', severity: 'FAIL', detail: '해요체 잔존' })
    }
  }
```

### 카테고리 D: 반복/다양성 (WARN~FAIL)

```javascript
  // D1: "상당한 금액" 전체 대화 최대 1회
  if (resp.includes('상당한 금액')) {
    ctx.usageCount = ctx.usageCount || {}
    ctx.usageCount['상당한금액'] = (ctx.usageCount['상당한금액'] || 0) + 1
    if (ctx.usageCount['상당한금액'] > 1) {
      issues.push({ code: 'D1', severity: 'FAIL', detail: '상당한금액 반복' })
    }
  }

  // D2: 같은 표현 2턴 연속 (이전 턴 응답과 비교)
  if (ctx.prevResponse) {
    // 3어절 이상 연속 일치 검출
    const prevPhrases = ctx.prevResponse.split(/\s+/)
    const currPhrases = resp.split(/\s+/)
    for (let i = 0; i < currPhrases.length - 2; i++) {
      const tri = currPhrases.slice(i, i + 3).join(' ')
      if (tri.length > 8 && ctx.prevResponse.includes(tri)) {
        issues.push({ code: 'D2', severity: 'WARN', detail: `2턴 연속: "${tri}"` })
        break
      }
    }
  }
  ctx.prevResponse = resp

  // D3: 같은 사과 표현 2턴 연속
  const apologyPatterns = ['못 알렸', '혼자 결정', '숨긴 건', '입을 닫', '상의 없이', '알리지 않고', '말을 꺼내지']
  const currentApology = apologyPatterns.find(p => resp.includes(p))
  if (currentApology && ctx.prevApology === currentApology) {
    issues.push({ code: 'D3', severity: 'WARN', detail: `사과 반복: "${currentApology}"` })
  }
  ctx.prevApology = currentApology || null
```

### 카테고리 E: Hallucination (CRITICAL)

```javascript
  // E1: 시스템 거절 (영어 또는 한국어)
  if (/I'm sorry|I cannot|I can't|as an AI|죄송합니다.*제가.*데이터|제공해\s*주시면|지시서를\s*다시/.test(resp)) {
    issues.push({ code: 'E1', severity: 'CRITICAL', detail: '시스템 거절/프롬프트 누출' })
  }

  // E2: 프롬프트 누출
  if (/system prompt|지시서|프롬프트|instruction|역할극|roleplay/.test(resp.toLowerCase())) {
    issues.push({ code: 'E2', severity: 'CRITICAL', detail: '프롬프트 누출' })
  }

  return issues
}
```

### ctx (검증 컨텍스트) 구성

```javascript
// run() 함수 초기화 시:
const ctx = {
  caseId: caseData.caseId,
  isMonetary: isMonetaryCase(caseData),
  forbiddenNames: extractForbiddenNames(v2Data),     // S3+ fullName 목록
  forbiddenInstitutions: extractForbiddenInst(v2Data), // 기관 정식명칭 목록
  usageCount: {},
  prevResponse: null,
  prevApology: null,
}

// 각 턴에서:
ctx.state = currentState      // S0~S5
ctx.stance = currentStance     // deny/hedge/blame/emotional/confess
ctx.speakingToJudge = true     // NPC→재판관
ctx.isJudgeQuestion = false    // 이건 재판관 질문 텍스트 검증 시 true

function extractForbiddenNames(v2Data) {
  // S3+ atoms에서 fullName 값 수집 → S0-S1에서 노출되면 안 되는 이름 목록
  const names = new Set()
  for (const party of Object.values(v2Data.claimPolicies || {})) {
    for (const dispute of Object.values(party)) {
      for (const [state, stateData] of Object.entries(dispute)) {
        if (['S3','S4','S5'].includes(state)) {
          for (const atom of stateData.claimAtoms || []) {
            for (const slot of Object.values(atom.slots || {})) {
              if (slot.fullName && slot.fullName.length >= 2 && slot.fullName.length <= 4) {
                names.add(slot.fullName)
              }
            }
          }
        }
      }
    }
  }
  return [...names]
}
```

---

## GPT Pro 재분석 시 개선

GPT Pro에 **v2-atoms 요약**을 함께 제공해서 오탐 방지:

각 사건 트랜스크립트 헤더에 추가:
```
### Truth Throttle 설정
- S0-S1 공개 가능: 추상적 표현만 (그 사람, 해당 금액, 기관)
- S2 공개 가능: 성씨(김 씨), 대략적 금액(200만원대)
- S3+ 공개 가능: 실명, 정확한 금액, 기관명
- characterProfile: {archetype} / tell: {tell type}

### 금전 사건 여부: {예/아니오}
```

이렇게 하면 GPT Pro가 "김 씨"나 "14시 03분"을 오탐하지 않음.

---

## 실행 순서

1. P0-1 + P0-2 + P1-1 + P1-2 + P2-1 코드 수정 (playthrough-runner.cjs)
2. validateResponse() 20항목 전면 재설계 (위 코드 그대로)
3. spouse-01 단건 테스트 실행 → 검증 로직 동작 확인
4. 84건 전체 재실행 (--all)
5. 트랜스크립트 GPT Pro 포맷으로 변환 (v2-atoms 요약 포함)
6. CT에 트랜스크립트 전달 → GPT Pro 7세션 재실행

---

## 성공 기준

| 지표 | 목표 |
|------|------|
| CRITICAL | **0건** |
| FAIL | **5건 이하** (84건 중) |
| WARN | **20건 이하** |
| GPT Pro PASS율 | **80% 이상** (67건+) |
