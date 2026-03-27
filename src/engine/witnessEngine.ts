/**
 * 증인 소환 시스템.
 * socialGraph의 제3자를 증인으로 소환해 증언을 생성한다.
 * Phase 4(증거 심리)부터 사용 가능, 조사 토큰 1개 소모.
 */
import { chatCompletion } from './llmClient'
import { buildSpeechGuide, getRelationLabel } from './llmSpeechGuide'
import { iga, eunneun } from '../utils/korean'
import type { CaseData, PartyId } from '../types'
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
  agentA: AgentState,
  agentB: AgentState,
  recentDialogues: { speaker: string; text: string }[],
): Promise<WitnessTestimony> {
  const relType = getRelationLabel(caseData.duo.relationshipType ?? '')
  const disputes = caseData.disputes.map(d => `${d.id}: ${d.name}`).join('\n')

  // 편향에 따른 증언 방향 지시
  const biasGuide: Record<string, string> = {
    pro_a: `${caseData.duo.partyA.name} 편에 가깝다. 자연스럽게 A에 유리한 정보를 강조하되, 노골적이면 안 된다.`,
    pro_b: `${caseData.duo.partyB.name} 편에 가깝다. 자연스럽게 B에 유리한 정보를 강조하되, 노골적이면 안 된다.`,
    neutral: '중립적이다. 자신이 아는 사실만 말한다.',
    self_interest: '자기 이익이 우선이다. 자기에게 불리한 부분은 축소한다.',
  }

  // 왜곡 위험에 따른 지시
  const distortionGuide: Record<string, string> = {
    accurate: '기억이 정확하다. 사실을 있는 그대로 전달한다.',
    unconscious: '의도는 없지만 기억이 편향돼 있다. 한쪽에 유리하게 해석된 사실을 말한다.',
    intentional: '의도적으로 일부를 숨기거나 과장한다. 플레이어가 잘 들어야 빈틈을 찾을 수 있다.',
    strategic: '전략적으로 정보를 취사선택한다. 불리한 사실은 빼고 유리한 것만 내놓는다.',
  }

  // witnessProfile 활용
  const wp = witness.witnessProfile
  const ageInfo = wp ? `${wp.age}세, ${wp.occupation}` : '정보 없음'
  const relA = wp?.relationToA ?? (witness.relationTo === 'a' ? `${caseData.duo.partyA.name}쪽 인물` : '간접적으로 아는 사이')
  const relB = wp?.relationToB ?? (witness.relationTo === 'b' ? `${caseData.duo.partyB.name}쪽 인물` : '간접적으로 아는 사이')
  const sentA = wp?.sentimentToA ?? 0
  const sentB = wp?.sentimentToB ?? 0
  const speechStyle = wp?.speechStyle ?? '조심스럽게 사실 위주로 말한다.'
  const addrJudge = wp?.addressJudge ?? '재판관님'
  const addrA = wp?.addressA ?? caseData.duo.partyA.name + '씨'
  const addrB = wp?.addressB ?? caseData.duo.partyB.name + '씨'
  const hidden = wp?.hiddenAgenda ?? ''

  // 감정을 자연어로 변환
  const sentimentDesc = (val: number, name: string) => {
    if (val >= 50) return `${name}에게 호의적이다. 자연스럽게 편을 든다.`
    if (val >= 20) return `${name}에게 약한 호감이 있다.`
    if (val <= -30) return `${name}에게 적대감이 있다. 은근히 불리한 말을 섞는다.`
    if (val <= -10) return `${name}에게 약간 불편한 감정이 있다.`
    return `${name}에 대해 특별한 감정은 없다.`
  }

  const systemPrompt = `당신은 법정 심문 게임의 증인 "${witness.name}"입니다.

## 증인 프로필
- 이름: ${witness.name}
- 나이/직업: ${ageInfo}
- ${caseData.duo.partyA.name}와의 관계: ${relA}
- ${caseData.duo.partyB.name}와의 관계: ${relB}
- 직접 목격: ${witness.witnessedDirectly ? '예 — 구체적 장면을 묘사할 수 있다' : '아니오 — 전해 들은 이야기로 답한다'}
- 아는 내용: ${witness.knowledgeScope}

## 감정과 태도
- ${sentimentDesc(sentA, caseData.duo.partyA.name)}
- ${sentimentDesc(sentB, caseData.duo.partyB.name)}
- 편향: ${biasGuide[witness.bias] ?? biasGuide.neutral}
- 왜곡 위험: ${distortionGuide[witness.distortionRisk] ?? distortionGuide.accurate}
${hidden ? `- 숨기고 싶은 것: ${hidden}` : ''}

## 말투
${speechStyle}

## 호칭 (매우 중요)
- 재판관: "${addrJudge}"
- ${caseData.duo.partyA.name}: "${addrA}"
- ${caseData.duo.partyB.name}: "${addrB}"
- 재판관에게는 항상 존댓말. A/B를 언급할 때 위 호칭을 사용하세요.

## 사건 쟁점
${disputes}

## 배경
${relType} 관계. ${caseData.context.description}

## 최근 대화 (맥락 참고)
${recentDialogues.slice(-5).map(d => `${d.speaker}: ${d.text.slice(0, 60)}`).join('\n')}

## 규칙
1. "${addrJudge}"에게 존댓말로 증언. 자신이 아는 범위 안에서만 답하세요.
2. 모르는 건 "그 부분은 잘 모르겠습니다"로. 추측을 사실처럼 말하지 마세요.
3. 감정이 있으면 자연스럽게 드러나되 노골적이면 안 됩니다.
4. 왜곡 위험이 있으면 사실의 일부를 빠뜨리거나 순서를 바꾸세요.
5. 증언은 3~4문장. 구체적 날짜/시각/금액을 포함해 신뢰감을 주세요.
6. 말투를 반드시 반영하세요 — 기관 담당자는 건조하게, 가족은 감정적으로, 친구는 편하게.

## 출력 (JSON만)
{"testimony":"증언 내용 (3~4문장)","behaviorHint":"행동/표정 묘사","relatedDisputes":["d-1"등],"favorDirection":"pro_a|pro_b|neutral|mixed"}`

  try {
    const raw = await chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `재판관: "${witness.name} 증인, 이 사건에 대해 아는 바를 말씀해 주십시오."` },
      ],
      { temperature: 0.7, maxTokens: 300 },
    )

    return parseWitnessResponse(raw, witness)
  } catch {
    return generateFallbackTestimony(witness, caseData)
  }
}

/** LLM 응답 파싱 */
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

/** LLM 실패 시 폴백 증언 */
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
