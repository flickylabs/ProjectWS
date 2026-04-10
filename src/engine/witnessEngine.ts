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
  if (depth === 'vague') return '증인의 증언은 심문 진행에 따라 더 구체적인 내용을 확인할 수 있습니다.'
  if (depth === 'partial') return '증인이 일부 내용을 더 밝히고 있지만, 아직 핵심 정보는 조심스러워합니다.'
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
): { available: boolean; reason?: string } {
  const tp = caseData.duo.socialGraph.find(t => t.id === witnessId)
  if (!tp) return { available: false, reason: '존재하지 않는 증인' }
  if (calledWitnesses.includes(witnessId)) return { available: false, reason: '이미 소환한 증인' }
  return { available: true }
}

/** 소환 가능한 증인 목록 반환 */
export function getAvailableWitnesses(
  calledWitnesses: string[],
  caseData: CaseData,
): ThirdParty[] {
  return caseData.duo.socialGraph.filter(tp => !calledWitnesses.includes(tp.id))
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
  vars.witnessDepthInstruction = buildDepthInstruction(depth)

  // few-shot 예시 주입 (증인 유형 × depth 기반)
  const witnessSlot = normalizeWitnessSlot(witness)
  vars.witnessFewShotExamples = buildWitnessFewShotBlock(witnessSlot, depth, 2)

  // Agent 블록 조합 우선, 폴백으로 하드코딩 프롬프트
  const systemPrompt = isAgentLoaded()
    ? buildAgentPrompt('witness_testimony', vars)
    : buildFallbackWitnessPrompt(witness, caseData, recentDialogues, depth)

  const config = isAgentLoaded()
    ? getAgentConfig('witness_testimony')
    : { temperature: 1.0, maxTokens: 400 }

  try {
    const raw = await chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `재판관: "${witness.name} 증인, 이 사건에 대해 아는 바를 말씀해 주십시오."` },
      ],
      { temperature: config.temperature, maxTokens: config.maxTokens, model: MODEL_DIALOGUE },
    )

    const result = parseWitnessResponse(raw, witness)
    result.depth = depth
    result.depthMessage = getDepthSystemMessage(depth)
    return result
  } catch {
    const fallback = generateFallbackTestimony(witness, caseData, depth)
    return fallback
  }
}

/** 깊이별 LLM 프롬프트 지시 생성 */
function buildDepthInstruction(depth: TestimonyDepth): string {
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
): string {
  const vars = buildWitnessVars(witness, caseData, recentDialogues)
  const depthInstruction = buildDepthInstruction(depth)
  return `당신은 이 사건의 증인 "${vars.witnessName}"입니다.

## 증인 프로필
- 이름: ${vars.witnessName}
- 나이/직업: ${vars.witnessAge}, ${vars.witnessOccupation}
- ${vars.nameA}와의 관계: ${vars.witnessRelationToA}
- ${vars.nameB}와의 관계: ${vars.witnessRelationToB}
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
  const biasText: Record<string, string> = {
    pro_a: '제가 본 바로는 그쪽 말이 맞는 것 같습니다.',
    pro_b: '제가 알기로는 이쪽 사정이 있었습니다.',
    neutral: '제가 아는 건 이것뿐입니다.',
  }

  // 깊이별 폴백 증언 생성
  let testimony: string
  let behaviorHint: string

  switch (depth) {
    case 'vague':
      testimony = `재판관님, 네... 그런 일이 있었던 것 같습니다만, 자세한 내용은 잘 기억이 나지 않습니다.`
      behaviorHint = '눈을 피하며 조심스럽게 말한다.'
      break
    case 'partial':
      testimony = `재판관님, 네, 그 건에 대해서는 어느 정도 알고 있습니다. ${biasText[witness.bias] ?? biasText.neutral} 다만 자세한 사정까지는 모르겠습니다.`
      behaviorHint = '신중하게 말을 고르며 답한다.'
      break
    default:
      testimony = `재판관님, ${witness.knowledgeScope.slice(0, 80)}... ${biasText[witness.bias] ?? biasText.neutral}`
      behaviorHint = witness.witnessedDirectly ? '또렷한 기억을 더듬으며 말한다.' : '전해 들은 이야기를 조심스럽게 전한다.'
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
