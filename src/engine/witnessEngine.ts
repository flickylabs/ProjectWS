/**
 * 증인 소환 시스템.
 * socialGraph의 제3자를 증인으로 소환해 증언을 생성한다.
 * Phase 4(증거 심리)부터 사용 가능, 조사 토큰 1개 소모.
 *
 * v3: witness_testimony 에이전트 블록 조합 사용
 */
import { chatCompletion, MODEL_DIALOGUE } from './llmClient'
import { buildAgentPrompt, getAgentConfig, isAgentLoaded } from '../api/agentManager'
import { getRelationLabel } from './llmSpeechGuide'
import { WITNESS_BUDGETS } from '../data/witnessBudget'
import { buildWitnessFewShotBlock, buildHiddenAgendaPatternBlock, type WitnessSlot } from '../data/witnessFewShotExamples'
import { normalizeCaseKey } from '../utils/caseHelpers'
import { getWitnessSpeechSamples } from '../data/caseEnrichment'
import { getScriptedWitness } from './scriptedTextLoader'
import { pp과와 } from './koreanPostposition'
import { buildLlmLanguageDirective, getLlmLocale } from '../i18n/llmLocale'
import { getRuntimeTextLocale } from '../i18n/runtimeText'
import { repairVisibleLlmTextLocale } from './llmLocaleGuard'
import type { LocaleCode } from '../i18n/locales'
import type { CaseData } from '../types'
import type { AgentState } from '../types'
import type { LieState } from '../types/agent'
import type { ThirdParty } from '../types/character'

/** 증인의 증언 깊이 단계 */
export type TestimonyDepth = 'vague' | 'partial' | 'full'

export interface WitnessTestimony {
  witnessId: string
  witnessName: string
  testimony: string
  behaviorHint: string
  relatedDisputes: string[]
  /** 증언이 어느 쪽에 유리한지 */
  favorDirection: 'pro_a' | 'pro_b' | 'neutral' | 'mixed'
  /** 왜곡 위험이 실현됐는지 */
  distorted: boolean
  /** 증언 깊이 (lieState 기반 게이팅 결과) */
  depth: TestimonyDepth
  /** 깊이 제한 시 표시되는 시스템 메시지 */
  depthMessage?: string
}

/* ── 증언 깊이 게이팅 ─────────────────── */

const LIE_STATE_ORDER: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']

/** lieState 문자열을 숫자 인덱스로 변환 */
function lieStateToNum(s: LieState): number {
  return LIE_STATE_ORDER.indexOf(s)
}

/**
 * 증인의 관련 쟁점들의 lieState를 종합하여 증언 깊이를 결정한다.
 * - 최고 lieState가 S2 미만: vague (모호한 답변)
 * - S2 이상 S4 미만: partial (부분 공개)
 * - S4 이상: full (전체 공개, 기존 동작)
 */
export function determineTestimonyDepth(
  witness: ThirdParty,
  getLieStateFn: (party: 'a' | 'b', disputeId: string) => LieState | undefined,
): TestimonyDepth {
  const disputeIds = witness.relatedDisputeIds ?? []
  if (disputeIds.length === 0) return 'full' // 관련 쟁점 없으면 제한 없음

  let maxState = 0
  for (const dId of disputeIds) {
    // 양쪽 파티 모두 확인하여 가장 높은 값 사용
    const stateA = getLieStateFn('a', dId)
    const stateB = getLieStateFn('b', dId)
    if (stateA) maxState = Math.max(maxState, lieStateToNum(stateA))
    if (stateB) maxState = Math.max(maxState, lieStateToNum(stateB))
  }

  // 결정4: 기관 증인은 partial 깊이에서 자기 업무 범위 사실 공개 허용
  if (witness.slot === 'institutional' && maxState >= lieStateToNum('S2')) return 'full'

  if (maxState >= lieStateToNum('S4')) return 'full'
  if (maxState >= lieStateToNum('S2')) return 'partial'
  return 'vague'
}

/** 깊이 단계별 시스템 메시지 */
export function getDepthSystemMessage(depth: TestimonyDepth): string | undefined {
  const locale = getRuntimeTextLocale()
  const copy: Record<LocaleCode, Record<Exclude<TestimonyDepth, 'full'>, string>> = {
    ko: {
      vague: '증인의 증언은 심문 진행에 따라 더 구체적인 내용을 확인할 수 있습니다.',
      partial: '증인이 일부 내용을 더 밝히고 있지만, 아직 핵심 정보는 조심스러워합니다.',
    },
    en: {
      vague: 'The witness can provide more specific testimony as the examination progresses.',
      partial: 'The witness is revealing some details, but remains cautious about the core information.',
    },
    ja: {
      vague: '証人の証言は、尋問が進むにつれてより具体的な内容を確認できます。',
      partial: '証人は一部の内容を明かしていますが、核心情報にはまだ慎重です。',
    },
    'zh-CN': {
      vague: '随着讯问推进，证人的证言可以确认更具体的内容。',
      partial: '证人正在透露部分内容，但对核心信息仍很谨慎。',
    },
  }
  if (depth === 'vague') return copy[locale].vague
  if (depth === 'partial') return copy[locale].partial
  return undefined
}

/** 소환 전 표시할 증인 프리뷰 텍스트 (surfaceKnowledge 우선, 없으면 자동 생성) */
export function getWitnessPreviewText(witness: ThirdParty): string {
  if (witness.surfaceKnowledge) return witness.surfaceKnowledge
  // surfaceKnowledge가 없으면 knowledgeScope에서 모호한 힌트를 자동 생성
  const scope = witness.knowledgeScope
  if (scope.includes('금') || scope.includes('송금') || scope.includes('돈') || scope.includes('원')) {
    return '이 증인은 당사자 간 금전 거래에 대해 알고 있을 수 있습니다.'
  }
  if (scope.includes('만남') || scope.includes('접촉') || scope.includes('목격')) {
    return '이 증인은 당사자의 행동에 대해 목격한 바가 있을 수 있습니다.'
  }
  if (scope.includes('대화') || scope.includes('메시지') || scope.includes('통화')) {
    return '이 증인은 당사자 간 소통 내용에 대해 알고 있을 수 있습니다.'
  }
  return '이 증인은 사건과 관련된 정보를 일부 알고 있을 수 있습니다.'
}

/** 증인이 소환 가능한지 체크 */
export function canCallWitness(
  witnessId: string,
  calledWitnesses: string[],
  caseData: CaseData,
  /** 다층 증언: 남은 슬롯이 있으면 재소환 허용 */
  hasRemainingSlots?: boolean,
  /** 조합으로 해금된 증인 ID 목록 — 전달되지 않으면 게이팅 스킵 (구버전 호환) */
  unlockedWitnessIds?: string[],
): { available: boolean; reason?: string; isResummon?: boolean } {
  const tp = caseData.duo.socialGraph.find(t => t.id === witnessId)
  if (!tp) return { available: false, reason: '존재하지 않는 증인' }
  // 해금 게이팅: unlockedByDossier가 있으면 unlockedWitnessIds에 포함되어야 소환 가능
  const gate = tp.unlockedByDossier ?? []
  if (gate.length > 0 && unlockedWitnessIds && !unlockedWitnessIds.includes(witnessId)) {
    return { available: false, reason: '조합으로 단서를 확보해야 소환 가능합니다' }
  }
  if (calledWitnesses.includes(witnessId)) {
    // 다층 증언에서 남은 슬롯이 있으면 재소환 허용
    if (hasRemainingSlots) return { available: true, isResummon: true }
    return { available: false, reason: '더 이상 물어볼 것이 없습니다' }
  }
  return { available: true }
}

/** 소환 가능한 증인 목록 반환 (재소환 포함) */
export function getAvailableWitnesses(
  calledWitnesses: string[],
  caseData: CaseData,
  /** 다층 증언: 증인별 남은 슬롯 여부 */
  witnessHasSlots?: Record<string, boolean>,
): ThirdParty[] {
  return caseData.duo.socialGraph.filter(tp => {
    if (!calledWitnesses.includes(tp.id)) return true
    // 재소환 가능 여부
    return witnessHasSlots?.[tp.id] ?? false
  })
}

/** LLM으로 증인 증언 생성 (lieState 기반 깊이 게이팅 적용) */
export async function generateWitnessTestimony(
  witness: ThirdParty,
  caseData: CaseData,
  _agentA: AgentState,
  _agentB: AgentState,
  recentDialogues: { speaker: string; text: string }[],
  depth: TestimonyDepth = 'full',
): Promise<WitnessTestimony> {
  const caseKey = normalizeCaseKey(caseData)
  const locale = getLlmLocale()
  const scripted = getScriptedWitness(caseKey, witness.id, depth)
  if (scripted) {
    return {
      witnessId: witness.id,
      witnessName: witness.name,
      testimony: scripted.text,
      behaviorHint: scripted.behaviorHint,
      relatedDisputes: witness.relatedDisputeIds ?? [],
      favorDirection: witness.bias === 'pro_a'
        ? 'pro_a'
        : witness.bias === 'pro_b'
          ? 'pro_b'
          : witness.bias === 'neutral'
            ? 'neutral'
            : 'mixed',
      distorted: witness.distortionRisk !== 'accurate',
      depth,
      depthMessage: getDepthSystemMessage(depth),
    }
  }

  const vars = buildWitnessVars(witness, caseData, recentDialogues)

  // 깊이 게이팅 지시를 변수에 추가
  vars.witnessDepthInstruction = buildDepthInstruction(depth, locale)

  // few-shot 예시 주입 (증인 유형 × depth 기반)
  const witnessSlot = normalizeWitnessSlot(witness)
  vars.witnessFewShotExamples = buildWitnessFewShotBlock(witnessSlot, depth, 2)

  // Agent 블록 조합 우선, 폴백으로 하드코딩 프롬프트
  const systemPrompt = isAgentLoaded()
    ? buildAgentPrompt('witness_testimony', vars)
    : buildFallbackWitnessPrompt(witness, caseData, recentDialogues, depth, locale)

  const config = isAgentLoaded()
    ? getAgentConfig('witness_testimony')
    : { temperature: 1.0, maxTokens: 400 }

  try {
    const raw = await chatCompletion(
      [
        { role: 'system', content: `${buildLlmLanguageDirective(locale)}\n\n${systemPrompt}` },
        { role: 'user', content: buildWitnessUserPrompt(witness.name, locale) },
      ],
      { temperature: config.temperature, maxTokens: config.maxTokens, model: MODEL_DIALOGUE },
    )

    const result = parseWitnessResponse(raw, witness)
    result.testimony = await repairVisibleLlmTextLocale(result.testimony, locale, {
      fieldName: 'witness.testimony',
      fallbackReason: 'default',
    })
    result.behaviorHint = await repairVisibleLlmTextLocale(result.behaviorHint, locale, {
      fieldName: 'witness.behaviorHint',
      fallbackReason: 'default',
    })
    result.depth = depth
    result.depthMessage = getDepthSystemMessage(depth)
    return result
  } catch {
    const fallback = generateFallbackTestimony(witness, caseData, depth)
    return fallback
  }
}

/** 깊이별 LLM 프롬프트 지시 생성 */
function buildWitnessUserPrompt(witnessName: string, locale: LocaleCode): string {
  if (locale === 'en') return `Judge: "Witness ${witnessName}, please tell the court what you know about this case."`
  if (locale === 'ja') return `裁判官: 「${witnessName}証人、この事件について知っていることを話してください。」`
  if (locale === 'zh-CN') return `裁判官：“${witnessName}证人，请说明你对本案所知的内容。”`
  return `재판관: "${witnessName} 증인, 이 사건에 대해 아는 바를 말씀해 주십시오."`
}

function buildDepthInstruction(depth: TestimonyDepth, locale: LocaleCode = getLlmLocale()): string {
  if (locale !== 'ko') {
    const copy = {
      en: {
        vague: `## Testimony depth limit: vague
The witness is still cautious and must not state core information directly.
- Do not mention specific amounts, dates, or names.
- Give only vague confirmation within 2 sentences.`,
        partial: `## Testimony depth limit: partial
The witness reveals some facts but withholds the most important details.
- Explain the broad situation, but say exact details are not known.
- Answer in about 3 sentences.`,
      },
      ja: {
        vague: `## 証言深度制限: 曖昧
証人はまだ慎重で、核心情報を直接話してはいけません。
- 具体的な金額、日付、名前には触れないこと。
- 2文以内の曖昧な確認に留めること。`,
        partial: `## 証言深度制限: 部分公開
証人は一部の事実を明かしますが、最重要の詳細はまだ話しません。
- 大まかな状況は説明し、正確な詳細は分からないと述べること。
- 3文程度で答えること。`,
      },
      'zh-CN': {
        vague: `## 证言深度限制：模糊
证人仍然谨慎，不得直接说出核心信息。
- 不要提及具体金额、日期或姓名。
- 只做两句以内的模糊确认。`,
        partial: `## 证言深度限制：部分公开
证人会透露部分事实，但仍保留最核心细节。
- 可以说明大致情况，但表示不清楚准确细节。
- 用约三句话回答。`,
      },
    } as const
    if (depth === 'vague') return copy[locale].vague
    if (depth === 'partial') return copy[locale].partial
    return ''
  }
  switch (depth) {
    case 'vague':
      return `## 증언 깊이 제한: 모호
증인은 아직 조심스러워하며 핵심 정보를 직접 말하지 않는다.
- 구체적인 금액, 날짜, 이름을 언급하지 마라.
- "네, 그런 일이 있었던 것 같습니다만..." 수준의 모호한 확인만 한다.
- 핵심 사실은 "잘 기억이..." 또는 "자세한 건..." 으로 회피한다.
- 2문장 이내로 짧게 답한다.`
    case 'partial':
      return `## 증언 깊이 제한: 부분 공개
증인은 일부 사실을 밝히지만 가장 핵심적인 세부사항은 아직 말하지 않는다.
- 대략적인 상황은 설명하되, 정확한 금액이나 구체적 목적은 "자세히는 모르겠습니다"로 넘긴다.
- 행위가 있었다는 것은 인정하되 전체 맥락은 드러내지 않는다.
- 3문장 정도로 답한다.`
    case 'full':
      return '' // 제한 없음
  }
}

/** 증인의 slot 문자열을 WitnessSlot 타입으로 정규화 */
function normalizeWitnessSlot(witness: ThirdParty): WitnessSlot {
  const raw = (witness as any).slot ?? (witness.witnessProfile as any)?.role ?? ''
  if (raw === 'institutional' || raw === 'colleague' || raw === 'family' || raw === 'friend') return raw
  // 관계 기반 추론
  if (witness.relationTo && witness.witnessProfile?.relationToA?.includes('가족')) return 'family'
  if (witness.witnessProfile?.occupation?.includes('사회복지사') || witness.witnessProfile?.occupation?.includes('은행')) return 'institutional'
  return 'friend'
}

/* ── 증인 변수 맵 생성 ──────────────────── */

function buildWitnessVars(
  witness: ThirdParty,
  caseData: CaseData,
  recentDialogues: { speaker: string; text: string }[],
): Record<string, string> {
  const wp = witness.witnessProfile
  const disputes = caseData.disputes.map(d => `${d.id}: ${d.name}`).join('\n')

  // 편향 가이드
  const biasGuide: Record<string, string> = {
    pro_a: `${caseData.duo.partyA.name} 편에 가깝다. 자연스럽게 A에 유리한 정보를 강조하되, 노골적이면 안 된다.`,
    pro_b: `${caseData.duo.partyB.name} 편에 가깝다. 자연스럽게 B에 유리한 정보를 강조하되, 노골적이면 안 된다.`,
    neutral: '중립적이다. 자신이 아는 사실만 말한다.',
    self_interest: '자기 이익이 우선이다. 자기에게 불리한 부분은 축소한다.',
  }

  // 왜곡 가이드
  const distortionGuide: Record<string, string> = {
    accurate: '기억이 정확하다. 사실을 있는 그대로 전달한다.',
    unconscious: '의도는 없지만 기억이 편향돼 있다. 한쪽에 유리하게 해석된 사실을 말한다.',
    intentional: '의도적으로 일부를 숨기거나 과장한다.',
    strategic: '전략적으로 정보를 취사선택한다. 불리한 사실은 빼고 유리한 것만 내놓는다.',
  }

  // 감정 기반 편향 설명
  const sentA = wp?.sentimentToA ?? 0
  const sentB = wp?.sentimentToB ?? 0
  const sentimentDesc = (val: number, name: string) => {
    if (val >= 50) return `${name}에게 호의적이다.`
    if (val >= 20) return `${name}에게 약한 호감이 있다.`
    if (val <= -30) return `${name}에게 적대감이 있다.`
    if (val <= -10) return `${name}에게 약간 불편한 감정이 있다.`
    return `${name}에 대해 특별한 감정은 없다.`
  }
  const fullBiasGuide = [
    sentimentDesc(sentA, caseData.duo.partyA.name),
    sentimentDesc(sentB, caseData.duo.partyB.name),
    biasGuide[witness.bias] ?? biasGuide.neutral,
  ].join('\n')

  // 최근 대화 (맥락)
  const recentDialogueStr = recentDialogues.slice(-5)
    .map(d => `${d.speaker}: ${d.text.slice(0, 60)}`)
    .join('\n')

  return {
    witnessName: witness.name,
    witnessAge: wp ? `${wp.age}세` : '정보 없음',
    witnessOccupation: wp?.occupation ?? '정보 없음',
    nameA: caseData.duo.partyA.name,
    nameB: caseData.duo.partyB.name,
    witnessRelationToA: wp?.relationToA ?? (witness.relationTo === 'a' ? `${caseData.duo.partyA.name}쪽 인물` : '간접적으로 아는 사이'),
    witnessRelationToB: wp?.relationToB ?? (witness.relationTo === 'b' ? `${caseData.duo.partyB.name}쪽 인물` : '간접적으로 아는 사이'),
    witnessWitnessedDirectly: witness.witnessedDirectly ? '예 — 직접 본 장면이 있다' : '아니오 — 전해 들은 이야기로 답한다',
    context: caseData.context.description,
    disputeList: disputes,
    witnessKnowledgeScope: witness.knowledgeScope,
    witnessBudget: formatWitnessBudget(caseData, witness.id),
    witnessBiasGuide: fullBiasGuide,
    witnessDistortionGuide: distortionGuide[witness.distortionRisk] ?? distortionGuide.accurate,
    witnessHiddenAgenda: wp?.hiddenAgenda ?? '',
    witnessAddressJudge: wp?.addressJudge ?? '재판관님',
    witnessAddressA: wp?.addressA ?? inferWitnessAddress(witness, caseData.duo.partyA.name, 'a'),
    witnessAddressB: wp?.addressB ?? inferWitnessAddress(witness, caseData.duo.partyB.name, 'b'),
    witnessSpeechStyle: wp?.speechStyle ?? '조심스럽게 사실 위주로 말한다.',
    // few-shot 증언 예시 (보강 데이터)
    witnessSpeechSamples: buildSpeechSampleBlock(caseData, witness.id),
    // few-shot 유형별 예시 (증인 유형 × depth 기반)
    witnessFewShotExamples: '',  // generateWitnessTestimony에서 depth 결정 후 주입
    // hiddenAgenda 적극적 회피 패턴
    witnessHiddenAgendaPatterns: buildHiddenAgendaPatternBlock(normalizeWitnessSlot(witness)),
    // 최근 대화 (witness_dialogue_rules에서는 사용 안 하지만 참고용)
    recentDialogue: recentDialogueStr,
  }
}

/* ── LLM 응답 파싱 ──────────────────────── */

function parseWitnessResponse(raw: string, witness: ThirdParty): WitnessTestimony {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON')
    const parsed = JSON.parse(jsonMatch[0])

    return {
      witnessId: witness.id,
      witnessName: witness.name,
      testimony: parsed.testimony ?? '',
      behaviorHint: parsed.behaviorHint ?? '',
      relatedDisputes: parsed.relatedDisputes ?? [],
      favorDirection: parsed.favorDirection ?? 'neutral',
      distorted: witness.distortionRisk !== 'accurate',
      depth: 'full', // will be overwritten by caller
    }
  } catch {
    return generateFallbackTestimony(witness, {} as CaseData)
  }
}

/* ── 폴백: 에이전트 미로드 시 하드코딩 프롬프트 ── */

function buildFallbackWitnessPrompt(
  witness: ThirdParty,
  caseData: CaseData,
  recentDialogues: { speaker: string; text: string }[],
  depth: TestimonyDepth = 'full',
  locale: LocaleCode = getLlmLocale(),
): string {
  const vars = buildWitnessVars(witness, caseData, recentDialogues)
  const depthInstruction = buildDepthInstruction(depth, locale)
  return `${buildLlmLanguageDirective(locale)}

당신은 이 사건의 증인 "${vars.witnessName}"입니다.

## 증인 프로필
- 이름: ${vars.witnessName}
- 나이/직업: ${vars.witnessAge}, ${vars.witnessOccupation}
- ${vars.nameA}${pp과와(vars.nameA)}의 관계: ${vars.witnessRelationToA}
- ${vars.nameB}${pp과와(vars.nameB)}의 관계: ${vars.witnessRelationToB}
- 직접 목격: ${vars.witnessWitnessedDirectly}
- 아는 내용: ${vars.witnessKnowledgeScope}

## 감정/편향
${vars.witnessBiasGuide}
왜곡 위험: ${vars.witnessDistortionGuide}
${vars.witnessHiddenAgenda ? `숨기고 싶은 것: ${vars.witnessHiddenAgenda}\n${vars.witnessHiddenAgendaPatterns ? `\n## 숨기는 방식 (참고 패턴)\n${vars.witnessHiddenAgendaPatterns}` : ''}` : ''}

## 말투/호칭
${vars.witnessSpeechStyle}
- 재판관: "${vars.witnessAddressJudge}"
- ${vars.nameA}: "${vars.witnessAddressA}"
- ${vars.nameB}: "${vars.witnessAddressB}"

## 사건 쟁점
${vars.disputeList}
${depthInstruction ? '\n' + depthInstruction : ''}

${vars.witnessFewShotExamples ? `## 증언 톤 예시 (이 톤을 참고하세요)\n${vars.witnessFewShotExamples}\n` : ''}## 규칙
- 재판관에게 존댓말로 증언. vague는 2문장 이내, partial은 3문장 정도, full은 필요한 만큼.
- 모르는 것은 "잘 모르겠습니다"로.
- 증언 안에 괄호 행동묘사 넣지 말고 behaviorHint에만.

★ 번역체/보고서 톤 금지:
- "~된 것으로 생각됩니다" → 자연스럽게 말하라
- "여러 가지 상황이 얽혀" → 구체적 상황 1가지를 말하라
- "해당 건에 대해서는" → "그 일은"
- "~만을" → "~만" 또는 "~만으로" (이중 조사. "이름만을 보고" ❌ → "이름만 보고" ✅)
- 실제 법정에서 증인이 하는 말을 떠올려라. 긴장하면서도 아는 것을 말하려는 사람이다.
★ 증인은 사건의 당사자가 아니다. 자기가 본 것, 들은 것, 아는 것만 말하라.

## 출력 (JSON만)
{"testimony":"증언 내용","behaviorHint":"행동/표정 묘사","relatedDisputes":["d-1"],"favorDirection":"pro_a|pro_b|neutral|mixed","certainty":"direct|hearsay|inferred","mentionedTruthIds":[]}`
}

/* ── witnessBudget 포매팅 (v4 데이터) ────── */

/** 증인의 관계에서 호칭 자동 추론 */
function inferWitnessAddress(witness: any, partyName: string, _party: 'a' | 'b'): string {
  const wName = witness.name ?? ''
  const givenName = partyName.slice(1) // 성 제거

  // 괄호 안 관계 정보 추출: "윤복순 (어머니)" → "어머니"
  const relMatch = wName.match(/\((.+?)\)/)
  const rel = relMatch?.[1] ?? ''

  // 가족 관계 — 증인이 부모/조부모면 당사자를 "우리 [이름]"으로
  if (rel.includes('어머니') || rel.includes('엄마') || rel.includes('아버지') || rel.includes('아빠')) return `우리 ${givenName}`
  if (rel.includes('할머니') || rel.includes('할아버지')) return `우리 ${givenName}`
  // 형제자매
  if (rel.includes('누나') || rel.includes('언니') || rel.includes('형') || rel.includes('오빠') || rel.includes('동생')) return givenName
  // 배우자
  if (rel.includes('배우자') || rel.includes('남편') || rel.includes('아내')) return givenName

  // 직장/사회 관계
  if (rel.includes('동료') || rel.includes('동기')) return `${givenName}씨`
  if (rel.includes('상사') || rel.includes('팀장') || rel.includes('부장')) return `${givenName}씨`
  if (rel.includes('부하') || rel.includes('후배')) return `${givenName}씨`

  // 기본 폴백
  return `${partyName}씨`
}

function formatWitnessBudget(caseData: CaseData, witnessId: string): string {
  const caseKey = normalizeCaseKey(caseData)
  const budget = WITNESS_BUDGETS[caseKey]?.[witnessId]
  if (!budget) return ''

  const parts: string[] = []
  if (budget.canState.length > 0) {
    parts.push('말할 수 있는 것:')
    budget.canState.forEach(s => parts.push(`- ${s}`))
  }
  if (budget.uncertain.length > 0) {
    parts.push('불확실한 것 (추측하지 마):')
    budget.uncertain.forEach(s => parts.push(`- ${s}`))
  }
  if (budget.forbidden.length > 0) {
    parts.push('절대 말하면 안 되는 것:')
    budget.forbidden.forEach(s => parts.push(`- ${s}`))
  }
  return parts.join('\n')
}

/* ── 증인 말투 few-shot 예시 (보강 데이터) ── */

function buildSpeechSampleBlock(caseData: CaseData, witnessId: string): string {
  const caseKey = normalizeCaseKey(caseData)
  const samples = getWitnessSpeechSamples(caseKey, witnessId)
  if (!samples || samples.length === 0) return ''

  const lines = ['## 이 증인의 말투 예시 (이 톤을 참고하세요)']
  samples.forEach((s, i) => lines.push(`예시${i + 1}: "${s}"`))
  return lines.join('\n')
}

/* ── LLM 실패 시 폴백 증언 ──────────────── */

function generateFallbackTestimony(witness: ThirdParty, _caseData: CaseData, depth: TestimonyDepth = 'full'): WitnessTestimony {
  const locale = getRuntimeTextLocale()
  const copy = {
    ko: {
      bias: {
        pro_a: '제가 본 바로는 그쪽 말이 맞는 것 같습니다.',
        pro_b: '제가 알기로는 이쪽 사정이 있었습니다.',
        neutral: '제가 아는 건 이것뿐입니다.',
      },
      vague: '재판관님, 네... 그런 일이 있었던 것 같습니다만, 자세한 내용은 잘 기억이 나지 않습니다.',
      vagueHint: '눈을 피하며 조심스럽게 말한다.',
      partial: (bias: string) => `재판관님, 네, 그 건에 대해서는 어느 정도 알고 있습니다. ${bias} 다만 자세한 사정까지는 모르겠습니다.`,
      partialHint: '신중하게 말을 고르며 답한다.',
      full: (scope: string, bias: string) => `재판관님, ${scope.slice(0, 80)}... ${bias}`,
      fullHintDirect: '또렷한 기억을 더듬으며 말한다.',
      fullHintHeard: '전해 들은 이야기를 조심스럽게 전한다.',
    },
    en: {
      bias: {
        pro_a: 'From what I saw, that side seems correct.',
        pro_b: 'As far as I know, there were circumstances on this side.',
        neutral: 'That is all I know.',
      },
      vague: 'Judge, yes... I think something like that happened, but I do not remember the details clearly.',
      vagueHint: 'Avoids eye contact and speaks cautiously.',
      partial: (bias: string) => `Judge, yes, I know something about that matter. ${bias} But I do not know the detailed circumstances.`,
      partialHint: 'Chooses words carefully before answering.',
      full: (scope: string, bias: string) => `Judge, ${scope.slice(0, 80)}... ${bias}`,
      fullHintDirect: 'Searches a clear memory while speaking.',
      fullHintHeard: 'Carefully relays what they heard.',
    },
    ja: {
      bias: {
        pro_a: '私が見た限りでは、そちらの言い分が正しいように思います。',
        pro_b: '私の知る限りでは、こちら側にも事情がありました。',
        neutral: '私が知っているのはこれだけです。',
      },
      vague: '裁判官、はい……そのようなことはあったと思いますが、詳しい内容はよく覚えていません。',
      vagueHint: '目をそらしながら慎重に話す。',
      partial: (bias: string) => `裁判官、はい、その件についてはある程度知っています。${bias} ただ、詳しい事情までは分かりません。`,
      partialHint: '慎重に言葉を選びながら答える。',
      full: (scope: string, bias: string) => `裁判官、${scope.slice(0, 80)}……${bias}`,
      fullHintDirect: 'はっきりした記憶をたどりながら話す。',
      fullHintHeard: '聞いた話を慎重に伝える。',
    },
    'zh-CN': {
      bias: {
        pro_a: '就我看到的情况，那一方说得更接近事实。',
        pro_b: '据我所知，这一方也有自己的情况。',
        neutral: '我知道的只有这些。',
      },
      vague: '裁判官，是的……好像发生过那样的事，但细节我记不太清了。',
      vagueHint: '避开视线，谨慎地说。',
      partial: (bias: string) => `裁判官，是的，那件事我知道一些。${bias} 但具体情况我并不清楚。`,
      partialHint: '谨慎斟酌措辞后回答。',
      full: (scope: string, bias: string) => `裁判官，${scope.slice(0, 80)}……${bias}`,
      fullHintDirect: '一边回忆清晰记忆一边作证。',
      fullHintHeard: '谨慎转述听来的事情。',
    },
  }
  const text = copy[locale]
  const biasText = text.bias
  const bias = witness.bias in biasText
    ? biasText[witness.bias as keyof typeof biasText]
    : biasText.neutral

  // 깊이별 폴백 증언 생성
  let testimony: string
  let behaviorHint: string

  switch (depth) {
    case 'vague':
      testimony = text.vague
      behaviorHint = text.vagueHint
      break
    case 'partial':
      testimony = text.partial(bias)
      behaviorHint = text.partialHint
      break
    default:
      testimony = text.full(witness.knowledgeScope, bias)
      behaviorHint = witness.witnessedDirectly ? text.fullHintDirect : text.fullHintHeard
  }

  return {
    witnessId: witness.id,
    witnessName: witness.name,
    testimony,
    behaviorHint,
    relatedDisputes: [],
    favorDirection: witness.bias === 'pro_a' ? 'pro_a' : witness.bias === 'pro_b' ? 'pro_b' : 'neutral',
    distorted: witness.distortionRisk !== 'accurate',
    depth,
    depthMessage: getDepthSystemMessage(depth),
  }
}
