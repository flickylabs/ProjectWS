/**
 * V4 후일담 LLM 생성기.
 * 플레이어의 판결 내용(쟁점별 판단, 안건별 책임, 해결안)을 반영한 맞춤형 후일담을 생성.
 * 스크립트 후일담(aftermathResolver.ts)을 폴백으로 사용.
 */

import type { CaseData, VerdictInput } from '../types'
import { buildLlmLanguageDirective, getLlmLanguageName, getLlmLocale, hasUnexpectedHangulForLocale } from '../i18n/llmLocale'
import type { LocaleCode } from '../i18n/locales'

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

function localizePromptLabel(locale: LocaleCode, key: 'deferred' | 'minor' | 'moderate' | 'major' | 'none' | 'discovered'): string {
  const labels = {
    ko: { deferred: '판단 보류', minor: '경미', moderate: '보통', major: '중대', none: '특별한 발견 없음', discovered: '발견됨' },
    en: { deferred: 'Deferred', minor: 'minor', moderate: 'moderate', major: 'major', none: 'No special discoveries', discovered: 'discovered' },
    ja: { deferred: '判断保留', minor: '軽微', moderate: '中程度', major: '重大', none: '特別な発見なし', discovered: '発見済み' },
    'zh-CN': { deferred: '暂缓判断', minor: '轻微', moderate: '中等', major: '重大', none: '无特殊发现', discovered: '已发现' },
  } as const
  return labels[locale][key]
}

/**
 * LLM 후일담 생성을 위한 프롬프트를 조립합니다.
 * 실제 LLM 호출은 외부에서 수행합니다.
 */
export function buildAftermathPrompt(input: AftermathLLMInput): string {
  const { caseData, verdictInput, verdictDetails, scores: _scores, title: _title, keyDiscoveries } = input
  const locale = getLlmLocale()
  const language = getLlmLanguageName(locale)
  const partyA = caseData.duo.partyA
  const partyB = caseData.duo.partyB

  const avgResp = computeAverageResponsibility(caseData, verdictInput)
  const respText = avgResp
    ? `${partyA.name} ${avgResp.a}% : ${partyB.name} ${avgResp.b}%`
    : localizePromptLabel(locale, 'deferred')

  const judgmentLines = Object.entries(verdictDetails.disputeJudgments)
    .map(([dId, judgment]) => {
      const dispute = caseData.disputes.find(d => d.id === dId)
      return dispute ? `- ${dispute.name}: "${judgment}"` : null
    })
    .filter(Boolean)
    .join('\n')

  const _issueLines = Object.entries(verdictDetails.issueWeights)
    .map(([issue, weight]) => `- ${issue}: ${weight <= 30 ? localizePromptLabel(locale, 'minor') : weight <= 70 ? localizePromptLabel(locale, 'moderate') : localizePromptLabel(locale, 'major')}`)
    .join('\n')

  const discoveryLines = keyDiscoveries.length > 0
    ? keyDiscoveries.map(d => `- ${d}`).join('\n')
    : `- ${localizePromptLabel(locale, 'none')}`

  const truthLines = caseData.disputes
    .filter(d => !d.hidden && d.v3Visibility !== 'hidden')
    .map(d => `- ${d.name}: ${d.truthDescription ?? d.judgmentStatement ?? ''}`)
    .join('\n')

  const hiddenTruthLines = caseData.disputes
    .filter(d => d.hidden || d.v3Visibility === 'hidden')
    .filter(d => keyDiscoveries.some(k => k.includes(d.name) || k.includes(d.id)))
    .map(d => `- [${localizePromptLabel(locale, 'discovered')}] ${d.name}: ${d.truthDescription ?? ''}`)
    .join('\n')

  return `${buildLlmLanguageDirective(locale)}

You are the narrator for Solomon's courtroom aftermath. Write the post-verdict epilogue in ${language}.

## Characters
${partyA.name} (age ${partyA.age}, ${partyA.occupation})
- Archetype: ${partyA.archetype ?? 'defensive'}
- Fear: ${partyA.fear}

${partyB.name} (age ${partyB.age}, ${partyB.occupation})
- Archetype: ${partyB.archetype ?? 'defensive'}
- Fear: ${partyB.fear}

Relationship type: ${caseData.duo.relationshipType}

## Case Truth
${truthLines}
${hiddenTruthLines ? `\n${hiddenTruthLines}` : ''}

## Verdict
Responsibility: ${respText}
Resolution: ${verdictDetails.selectedResolution}

### Issue Findings
${judgmentLines}

### Discoveries During Questioning
${discoveryLines}

## Writing Instructions
Write in third-person observer narration. The output must be exactly 4 paragraphs: 3 body paragraphs plus 1 separate quoted lesson paragraph.
Each body paragraph should be dense and specific, focused on inner psychology and life after the verdict. Do not end as a short summary.
Do not copy verdict data mechanically. Translate the verdict into concrete actions: whether someone sent a message again, sorted documents, checked accounts or records, swallowed words in front of family/friends/spouse, or reset a boundary.
Use the resolution only as the starting point for behavior inside the epilogue. Do not repeat responsibility ratios or resolution wording as report text.
Describe emotions one step lower than melodrama: hesitation, embarrassment, relief, late regret, remaining distrust, or cautious acceptance.

Paragraph 1: the moment the verdict lands. Show what passes through ${partyA.name}'s and ${partyB.name}'s minds, whether the result was expected, what they read in each other's expressions, and what each person cannot say immediately after the verdict.

Paragraph 2: the emotional effect of what was revealed. Show how the core revealed facts change the weight each person has carried and how their view of each other shifts.

Paragraph 3: a scene several days or weeks later. Show how daily life changes, whether the relationship repairs, separates, or becomes a different distance. End with a restrained lingering sentence.

Paragraph 4: one short lesson sentence wrapped in quotation marks. It must be a separate paragraph and must come from this case's concrete behavior or relationship.
${input.clearancePercent != null && input.clearancePercent >= 100 ? `
## Perfect Trial Bonus
The judge investigated every evidence item, heard every key witness point, and found every combination.
Add two extra paragraphs before the final lesson: one from the judge's perspective, and one showing both parties one year later.
` : ''}

## Naming Rules
- Use real names exactly: ${partyA.name}, ${partyB.name}.
- Do not output A, B, partyA, partyB, plaintiff, defendant, or generic role labels as character names.
- Refer to the judge with the localized equivalent of "judge" in ${language}.

## Truth Throttle
- Use only facts explicitly listed in "Case Truth".
- Do not mention hidden issue truths unless they are marked as discovered.
- Do not imply undiscovered truths indirectly.
- Do not narrate the player's investigation process as meta commentary. Focus on characters, consequences, and behavior.

## Forbidden
- Do not output headings, bullets, labels, markdown, JSON, or paragraph markers.
- Do not produce a technical verdict summary.
- Do not repeat "responsibility ratio", "selected resolution", "next action", or similar report phrases mechanically.
- Do not overuse extreme emotion verbs.
- The final lesson must be one sentence only.
- ${locale === 'ko' ? 'Korean/Hangul is allowed.' : 'Do not output Korean/Hangul in visible text. If any source data is Korean, translate its meaning into the selected language.'}`
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
  /^\*\*\s*\d+문단[^*]*\*\*[\s　]*[—:-]?\s*/gm,
  /^\*\*\s*(교훈|결론|정리|요약|lesson|moral|conclusion|summary|教訓|結論|要約|启示|教训|结论|总结)\s*\*\*[\s　]*[:：]?\s*/gim,
  /^\s*(교훈|결론|정리|요약|lesson|moral|conclusion|summary|教訓|結論|要約|启示|教训|结论|总结)\s*[:：]\s*/gim,
  /^\s*\[\s*(발견됨|미발견|플레이어|discovered|undiscovered|player|発見済み|未発見|已发现|未发现)\s*\]\s*/gim,
]

/**
 * 후일담 텍스트 후처리.
 * - 마크다운 헤더/메타 레이블 제거
 * - 번역체·A/B 리터럴·"상대방" 등 규칙 위반 패턴 교정
 * - 연속 빈 줄 정리
 * - 부작용 방지: 치환은 안전한 패턴만. 의미가 바뀔 수 있는 것은 console.warn으로 감지만.
 */
export function postProcessAftermath(raw: string, partyNames?: { a: string; b: string }, locale: LocaleCode = getLlmLocale()): string {
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
  if (locale === 'ko') {
    for (const { pattern, replace, loggable } of TRANSLATION_PATTERNS) {
      if (pattern.test(text)) {
        issues.push(loggable)
        if (replace !== undefined) text = text.replace(pattern, replace)
        // replace 미제공 항목은 감지만 (의미 훼손 위험)
      }
    }
  }

  // 4. 기타 고정 치환
  if (locale === 'ko') {
    text = text.replace(/상대방/g, '상대측')
    text = text.replace(/([가-힣]+)만을(\s)/g, '$1만$2')
    const softened = removeMechanicalAftermathSentences(text)
    if (softened !== text) {
      issues.push('mechanical-verdict-summary')
      text = softened
    }
  }

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

  if (hasUnexpectedHangulForLocale(text, locale)) {
    issues.push('unexpected-hangul')
  }

  // 7. 감지된 이슈 경고 (치환 불가능한 것 포함)
  if (issues.length > 0) {
    try {
       
      console.warn('[aftermath post-process] issues:', issues.join(', '))
    } catch { /* noop */ }
  }

  return text
}

function removeMechanicalAftermathSentences(text: string): string {
  const bannedSentencePatterns = [
    /책임\s*비율/,
    /책임.*배분.*판결/,
    /판결.*받아들/,
    /판결문에\s*적힌\s*해결\s*방향/,
    /해결\s*방향은\s*다음\s*조치/,
    /후일담의\s*방향/,
    /총\s*\d+\s*턴/,
    /선택한\s*해결책/,
  ]

  return text
    .split(/\n\n+/)
    .map((paragraph) => {
      const sentences = paragraph.match(/[^.!?。]+[.!?。]?/g) ?? [paragraph]
      const filtered = sentences
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence && !bannedSentencePatterns.some((pattern) => pattern.test(sentence)))
      return filtered.join(' ')
    })
    .filter(Boolean)
    .join('\n\n')
    .trim()
}
