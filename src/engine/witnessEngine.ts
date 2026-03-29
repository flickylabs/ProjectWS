/**
 * 증인 소환 시스템.
 * socialGraph의 제3자를 증인으로 소환해 증언을 생성한다.
 * Phase 4(증거 심리)부터 사용 가능, 조사 토큰 1개 소모.
 *
 * v3: witness_testimony 에이전트 블록 조합 사용
 */
import { chatCompletion } from './llmClient'
import { buildAgentPrompt, getAgentConfig, isAgentLoaded } from '../api/agentManager'
import { getRelationLabel } from './llmSpeechGuide'
import { WITNESS_BUDGETS } from '../data/witnessBudget'
import { normalizeCaseKey } from '../utils/caseHelpers'
import { getWitnessSpeechSamples } from '../data/caseEnrichment'
import type { CaseData } from '../types'
import type { AgentState } from '../types'
import type { ThirdParty } from '../types/character'

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

/** LLM으로 증인 증언 생성 */
export async function generateWitnessTestimony(
  witness: ThirdParty,
  caseData: CaseData,
  _agentA: AgentState,
  _agentB: AgentState,
  recentDialogues: { speaker: string; text: string }[],
): Promise<WitnessTestimony> {
  const vars = buildWitnessVars(witness, caseData, recentDialogues)

  // Agent 블록 조합 우선, 폴백으로 하드코딩 프롬프트
  const systemPrompt = isAgentLoaded()
    ? buildAgentPrompt('witness_testimony', vars)
    : buildFallbackWitnessPrompt(witness, caseData, recentDialogues)

  const config = isAgentLoaded()
    ? getAgentConfig('witness_testimony')
    : { temperature: 0.7, maxTokens: 300 }

  try {
    const raw = await chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `재판관: "${witness.name} 증인, 이 사건에 대해 아는 바를 말씀해 주십시오."` },
      ],
      { temperature: config.temperature, maxTokens: config.maxTokens },
    )

    return parseWitnessResponse(raw, witness)
  } catch {
    return generateFallbackTestimony(witness, caseData)
  }
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
    witnessAddressA: wp?.addressA ?? caseData.duo.partyA.name + '씨',
    witnessAddressB: wp?.addressB ?? caseData.duo.partyB.name + '씨',
    witnessSpeechStyle: wp?.speechStyle ?? '조심스럽게 사실 위주로 말한다.',
    // few-shot 증언 예시 (보강 데이터)
    witnessSpeechSamples: buildSpeechSampleBlock(caseData, witness.id),
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
): string {
  const vars = buildWitnessVars(witness, caseData, recentDialogues)
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
${vars.witnessHiddenAgenda ? `숨기고 싶은 것: ${vars.witnessHiddenAgenda}` : ''}

## 말투/호칭
${vars.witnessSpeechStyle}
- 재판관: "${vars.witnessAddressJudge}"
- ${vars.nameA}: "${vars.witnessAddressA}"
- ${vars.nameB}: "${vars.witnessAddressB}"

## 사건 쟁점
${vars.disputeList}

## 규칙
- 재판관에게 존댓말로 3~4문장 증언.
- 모르는 것은 "잘 모르겠습니다"로.
- 증언 안에 괄호 행동묘사 넣지 말고 behaviorHint에만.

## 출력 (JSON만)
{"testimony":"증언 내용","behaviorHint":"행동/표정 묘사","relatedDisputes":["d-1"],"favorDirection":"pro_a|pro_b|neutral|mixed","certainty":"direct|hearsay|inferred","mentionedTruthIds":[]}`
}

/* ── witnessBudget 포매팅 (v4 데이터) ────── */

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

function generateFallbackTestimony(witness: ThirdParty, _caseData: CaseData): WitnessTestimony {
  const biasText: Record<string, string> = {
    pro_a: '제가 본 바로는 그쪽 말이 맞는 것 같습니다.',
    pro_b: '제가 알기로는 이쪽 사정이 있었습니다.',
    neutral: '제가 아는 건 이것뿐입니다.',
  }

  return {
    witnessId: witness.id,
    witnessName: witness.name,
    testimony: `재판관님, ${witness.knowledgeScope.slice(0, 80)}... ${biasText[witness.bias] ?? biasText.neutral}`,
    behaviorHint: witness.witnessedDirectly ? '또렷한 기억을 더듬으며 말한다.' : '전해 들은 이야기를 조심스럽게 전한다.',
    relatedDisputes: [],
    favorDirection: witness.bias === 'pro_a' ? 'pro_a' : witness.bias === 'pro_b' ? 'pro_b' : 'neutral',
    distorted: witness.distortionRisk !== 'accurate',
  }
}
