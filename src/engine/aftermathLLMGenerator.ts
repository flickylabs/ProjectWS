/**
 * V4 후일담 LLM 생성기.
 * 플레이어의 판결 내용(쟁점별 판단, 안건별 책임, 해결안)을 반영한 맞춤형 후일담을 생성.
 * 스크립트 후일담(aftermathResolver.ts)을 폴백으로 사용.
 */

import { pp과와, pp이가, pp은는 } from './koreanPostposition'
import type { CaseData, VerdictInput } from '../types'

export interface AftermathLLMInput {
  caseData: CaseData
  verdictInput: VerdictInput
  /** 판결 4단계에서 플레이어가 선택한 구체 내용 */
  verdictDetails: {
    /** Step 1: 쟁점별 판단 (disputeId → 선택한 옵션 텍스트) */
    disputeJudgments: Record<string, string>
    /** Step 2: 안건별 책임 (안건 설명 → 경미~중대 수치 0~100) */
    issueWeights: Record<string, number>
    /** Step 3: 선택한 해결안 */
    selectedResolution: string
  }
  /** 통찰/권위/지혜 점수 */
  scores: { insight: number; authority: number; wisdom: number }
  /** 칭호 */
  title: string
  /** 핵심 발견 (S5 도달, 숨겨진 쟁점 발견 등) */
  keyDiscoveries: string[]
  /** 100% 클리어 달성률 (0~100) */
  clearancePercent?: number
}

export const AFTERMATH_MAX_TOKENS = 1400

/**
 * LLM 후일담 생성을 위한 프롬프트를 조립합니다.
 * 실제 LLM 호출은 외부에서 수행합니다.
 */
export function buildAftermathPrompt(input: AftermathLLMInput): string {
  const { caseData, verdictInput, verdictDetails, scores, title, keyDiscoveries } = input
  const partyA = caseData.duo.partyA
  const partyB = caseData.duo.partyB

  // 책임 비율 계산
  const avgResp = computeAverageResponsibility(caseData, verdictInput)
  const respText = avgResp
    ? `${partyA.name} ${avgResp.a}% : ${partyB.name} ${avgResp.b}%`
    : '판단 보류'

  // 쟁점별 판단 정리
  const judgmentLines = Object.entries(verdictDetails.disputeJudgments)
    .map(([dId, judgment]) => {
      const dispute = caseData.disputes.find(d => d.id === dId)
      return dispute ? `- ${dispute.name}: "${judgment}"` : null
    })
    .filter(Boolean)
    .join('\n')

  // 안건별 책임 정리
  const issueLines = Object.entries(verdictDetails.issueWeights)
    .map(([issue, weight]) => `- ${issue}: ${weight <= 30 ? '경미' : weight <= 70 ? '보통' : '중대'}`)
    .join('\n')

  // 핵심 발견 정리
  const discoveryLines = keyDiscoveries.length > 0
    ? keyDiscoveries.map(d => `- ${d}`).join('\n')
    : '- 특별한 발견 없음'

  // 쟁점별 진실 요약 (truthDescription)
  const truthLines = caseData.disputes
    .filter(d => !d.hidden && d.v3Visibility !== 'hidden')
    .map(d => `- ${d.name}: ${d.truthDescription ?? d.judgmentStatement ?? ''}`)
    .join('\n')

  // 숨겨진 쟁점의 진실
  const hiddenTruthLines = caseData.disputes
    .filter(d => d.hidden || d.v3Visibility === 'hidden')
    .filter(d => keyDiscoveries.some(k => k.includes(d.name) || k.includes(d.id)))
    .map(d => `- [발견됨] ${d.name}: ${d.truthDescription ?? ''}`)
    .join('\n')

  return `당신은 한국 법정 드라마의 내레이터입니다. 재판이 끝난 뒤 후일담을 작성합니다.

## 등장인물
${partyA.name} (${partyA.age}세, ${partyA.occupation})
- 성격: ${partyA.archetype ?? '방어적'}
- 두려움: ${partyA.fear}

${partyB.name} (${partyB.age}세, ${partyB.occupation})
- 성격: ${partyB.archetype ?? '방어적'}
- 두려움: ${partyB.fear}

관계: ${caseData.duo.relationshipType}

## 사건의 진실
${truthLines}
${hiddenTruthLines ? `\n${hiddenTruthLines}` : ''}

## 재판관의 판결
책임 비율: ${respText}
해결안: ${verdictDetails.selectedResolution}

### 쟁점별 판단
${judgmentLines}

### 심문에서 밝혀진 것들
${discoveryLines}

## 작성 지시
3인칭 관찰자 시점. 서술체("~했다", "~였다"). 출력은 반드시 **본문 3문단 + 교훈 1문장 별도 문단**, 총 4개 문단으로 작성하세요.
본문 3문단은 각 문단 4~6문장, 전체 900~1300자 분량을 목표로 합니다. 짧은 요약문으로 끝내지 말고, **인물의 내면 심리와 판결 이후의 생활 변화**를 밀도 있게 서술하세요.

**1문단 — 판결이 떨어진 순간의 심리**
${partyA.name}${pp과와(partyA.name)} ${partyB.name}${pp이가(partyB.name)} 판결 내용을 듣는 순간, 각자의 머릿속에서 어떤 생각이 스쳤는지. 예상했던 결과인지, 예상 밖이었는지. 상대방의 표정을 보며 무엇을 느꼈는지. 판결 직후 입을 열지 못하는 침묵 속에서 두 사람 각각이 삼킨 말은 무엇이었는지. 표면적 반응(끄덕임, 입술 깨물기)과 내면의 괴리를 구체적으로 묘사.

**2문단 — 숨겨온 것이 드러난 뒤의 감정**
심문 과정에서 밝혀진 핵심 사실이 두 사람에게 어떤 심리적 충격이었는지. "${partyA.name}${pp은는(partyA.name)} 그 사실을 알았을 때 무엇을 느꼈을까", "${partyB.name}${pp은는(partyB.name)} 비밀이 드러나는 순간 무엇을 생각했을까"의 관점으로 서술. 오랫동안 숨겨왔던 것의 무게가 내려놓아졌을 때의 해방감, 또는 알고 싶지 않았던 것을 알게 된 상실감. 두 사람이 서로를 다시 보는 시선이 어떻게 달라졌는지.

**3문단 — 며칠 뒤, 남은 감정**
며칠이 지난 뒤의 장면. 일상으로 돌아갔지만 판결 전과는 다른 하루. 상대방에 대한 감정이 분노에서 무엇으로 변했는지 — 이해인지, 체념인지, 새로운 경계인지. 관계가 회복되는지 끊어지는지, 또는 예전과 다른 형태로 재편되는지. 마지막 문장은 여운을 남기되 과장 없이 마무리.

줄바꿈 후 이 사건만의 교훈 한 문장. 교훈은 반드시 큰따옴표로 감싼 별도 문단으로 작성하세요. 격언이 아니라 이 사건에서만 나올 수 있는 구체적 통찰이어야 합니다.
예: "숨기는 것이 지키는 것이 되는 순간, 관계는 이미 무너지고 있었다."
${input.clearancePercent != null && input.clearancePercent >= 100 ? `
## 완벽한 재판 (100% 달성)
이 재판관은 모든 증거를 조사하고, 모든 증인의 핵심 증언을 청취하고, 모든 조합을 발견했습니다.
**추가 4문단 — 재판관의 시선**을 작성하세요.
재판관으로서 이 사건을 처음부터 끝까지 파헤친 사람만이 볼 수 있는 풍경. 두 당사자가 미처 모르는 진실의 전체 그림을 재판관이 조용히 정리하는 장면. 법정을 나서며 이 사건이 자신에게 남긴 것.

**추가 5문단 — 1년 뒤**
1년이 지난 뒤 두 사람의 모습. 구체적 장면(장소, 행동, 표정)으로 묘사. 판결이 만든 변화가 일상에 어떻게 스며들었는지. 완전한 화해인지, 거리를 둔 공존인지, 각자의 방식으로 전진하는 것인지.
` : ''}

## 톤·호칭 규칙 (필수)
- 3인칭 관찰자 시점 서술체 ("~했다", "~였다"). 1·2인칭·합니다체 금지.
- 인물 호칭은 **실명** 그대로 사용 (${partyA.name}, ${partyB.name}). "A", "B", "partyA", "상대방" 같은 리터럴·대명사 금지.
- 상대 지칭이 필요할 때는 "상대측" 또는 실명 재언급. "그" / "그녀" 남발 금지.
- 재판관 언급 시 "재판관" 그대로. "판사" / "당신" 금지.

## Truth Throttle (스포일러 방지)
- 위 "## 사건의 진실" 섹션에 명시된 사실만 서술 가능.
- [발견됨] 표시가 없는 hidden 쟁점의 진실은 **언급 금지**. 재판관이 밝히지 못한 것은 후일담에서도 미지(未知)로 남겨둘 것.
- 미발견 사실을 "그 일", "그때의 진실" 같은 암시로 우회하여 노출하는 것도 금지.
- 플레이어/재판관의 조사 과정을 메타적으로 서술 금지 ("증거를 찾아냈다", "심문으로 밝혀냈다" 같은 메타 구조 금지). 인물의 심리와 결과에 집중.

## 금지 (엄수)
- **번역체 9패턴**: "~된 것으로 생각됩니다", "~인 측면이 있었다", "부득이하게", "~에 대한 부분", "해당 [명사]", "상기 [명사]", "미리 말씀드리지 못한", "특정 [명사]", "사전 상의·협의"
- **합니다체·해요체**: 서술체 외 금지
- **감정 과잉 반복**: 울었다/소리쳤다/흐느꼈다 연속 사용 금지. 한 문단에 같은 강한 감정 동사 2회 이상 반복 금지.
- **"~만을"** 사용 금지 → "~만"으로
- **"상대방"** 사용 금지 → 실명 또는 "상대측"
- **메타 레이블**: "**1문단**:", "**교훈**:", "결론:" 같은 문단 표시 출력 금지 (순수 서술 텍스트만)
- **추상 구호**: "진실의 무게", "사랑의 본질" 같은 공허한 추상 금지. 항상 이 사건의 구체 사실·행동·심리에서 출발.
- **과도한 교훈**: 마지막 교훈 문장은 1개만. 격언 톤 금지. 이 사건 고유의 구체 통찰.
- **형식 위반 금지**: 본문이 1~2문단으로 줄어들면 실패입니다. 반드시 본문 3문단을 모두 작성한 뒤, 마지막에 따옴표로 감싼 교훈 한 문장을 별도 문단으로 둡니다.`
}

function computeAverageResponsibility(caseData: CaseData, verdictInput: VerdictInput): { a: number; b: number } | null {
  let totalA = 0, totalB = 0, count = 0
  for (const dispute of caseData.disputes) {
    const r = verdictInput.responsibility[dispute.id]
    if (!r) continue
    totalA += r.a
    totalB += r.b
    count++
  }
  if (count === 0) return null
  return { a: Math.round(totalA / count), b: Math.round(totalB / count) }
}

// 번역체 9패턴 (교정 가능한 것만 치환, 의미 깨지는 것은 로그)
const TRANSLATION_PATTERNS: Array<{ pattern: RegExp; replace?: string; loggable: string }> = [
  { pattern: /된\s*것으로\s*생각됩니다/g, loggable: '번역체1' },
  { pattern: /인\s*측면이\s*있었습니다/g, loggable: '번역체2' },
  { pattern: /부득이하게/g, replace: '어쩔 수 없이', loggable: '번역체3' },
  { pattern: /에\s*대한\s*부분/g, loggable: '번역체4' },
  { pattern: /해당\s*(금액|건|사실)/g, loggable: '번역체5' },
  { pattern: /상기\s*(내용|사실|건)/g, loggable: '번역체6' },
  { pattern: /미리\s*말씀드리지\s*못한/g, replace: '말씀 못 드린', loggable: '번역체8' },
  { pattern: /특정\s+([\w가-힣]+)/g, replace: '그 $1', loggable: '번역체9' },
]

// 메타 레이블 — 모델이 문단 구조를 노출시키려 할 때 제거
const META_LABEL_PATTERNS: RegExp[] = [
  /^\*\*\s*\d+문단[^*]*\*\*[\s　]*[—:\-]?\s*/gm,
  /^\*\*\s*(교훈|결론|정리|요약)\s*\*\*[\s　]*[:：]?\s*/gm,
  /^\s*(교훈|결론|정리|요약)\s*[:：]\s*/gm,
  /^\s*\[\s*(발견됨|미발견|플레이어)\s*\]\s*/gm,
]

/**
 * 후일담 텍스트 후처리.
 * - 마크다운 헤더/메타 레이블 제거
 * - 번역체·A/B 리터럴·"상대방" 등 규칙 위반 패턴 교정
 * - 연속 빈 줄 정리
 * - 부작용 방지: 치환은 안전한 패턴만. 의미가 바뀔 수 있는 것은 console.warn으로 감지만.
 */
export function postProcessAftermath(raw: string, partyNames?: { a: string; b: string }): string {
  let text = raw.trim()
  const issues: string[] = []

  // 1. 마크다운 헤더 제거
  text = text.replace(/^#{1,3}\s+.+$/gm, '').trim()

  // 2. 메타 레이블 제거
  for (const pat of META_LABEL_PATTERNS) {
    if (pat.test(text)) issues.push(`meta-label`)
    text = text.replace(pat, '')
  }

  // 3. 번역체 9패턴 교정/감지
  for (const { pattern, replace, loggable } of TRANSLATION_PATTERNS) {
    if (pattern.test(text)) {
      issues.push(loggable)
      if (replace !== undefined) text = text.replace(pattern, replace)
      // replace 미제공 항목은 감지만 (의미 훼손 위험)
    }
  }

  // 4. 기타 고정 치환
  text = text.replace(/상대방/g, '상대측')
  text = text.replace(/([가-힣]+)만을(\s)/g, '$1만$2')

  // 5. A/B 리터럴 잔존 검사 (단어 경계로, 실명 교정 보조)
  if (partyNames) {
    const abLiteralCount = (text.match(/\b(partyA|partyB|party_a|party_b)\b/g) || []).length
    if (abLiteralCount > 0) {
      issues.push(`ab-literal(${abLiteralCount})`)
      text = text.replace(/\bpartyA\b|\bparty_a\b/g, partyNames.a)
      text = text.replace(/\bpartyB\b|\bparty_b\b/g, partyNames.b)
    }
    // 단독 "A" 또는 "B"가 사람 지시어로 쓰인 경우 — 위험하니 경고만
    if (/([^가-힣\w])(A|B)([이가을를은는와과에]\s|\s)/.test(text)) {
      issues.push('single-letter-party-suspected')
    }
  }

  // 6. 빈 줄 정리
  text = text.replace(/\n{3,}/g, '\n\n').trim()

  // 7. 감지된 이슈 경고 (치환 불가능한 것 포함)
  if (issues.length > 0) {
    try {
      // eslint-disable-next-line no-console
      console.warn('[aftermath post-process] issues:', issues.join(', '))
    } catch { /* noop */ }
  }

  return text
}
