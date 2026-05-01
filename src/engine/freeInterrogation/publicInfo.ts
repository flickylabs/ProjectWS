import { GamePhase, type CharacterProfile, type PartyId } from '../../types'
import type { FreeInterrogationFallbackContext, FreeInterrogationRuntimeContext } from '../../types/freeInterrogation'

const RELATIONSHIP_LABELS: Record<string, string> = {
  spouse: '배우자',
  family: '가족',
  friend: '친구',
  workplace: '직장 관계',
  boss_employee: '직장 관계',
  tenant_landlord: '임대차 관계',
  partnership: '동업 관계',
}

const LIE_STATE_LABELS: Record<string, string> = {
  S0: '부정',
  S1: '회피',
  S2: '부분 인정',
  S3: '핵심 일부 노출',
  S4: '붕괴 직전',
  S5: '자백 이후',
}

const ARCHETYPE_RESPONSE_GUIDES: Record<string, string> = {
  victim_cosplay: '피해를 먼저 호소하지만, 사실 확인을 피하지는 않는 말투',
  avoidant: '짧게 인정하고 핵심 설명은 단계적으로 미루는 말투',
  confrontational: '단정적이고 방어적이지만 기록 앞에서는 선을 긋는 말투',
  cold_logic: '감정보다 사실 순서를 먼저 정리하는 말투',
  affect_flattening: '감정을 낮게 깔고 필요한 말만 하는 말투',
  premature_summary: '결론부터 정리하려 하지만 성급한 단정은 경계하는 말투',
}

export function buildFreeInterrogationPublicAnswer(
  rawText: string,
  context: FreeInterrogationRuntimeContext,
): string {
  const raw = rawText.trim()
  const speaker = resolveFreeInterrogationPublicSpeaker(raw, context)
  const party = resolveMentionedParty(raw, context)
  const relationLabel = getRelationshipLabel(context)
  const partyA = context.caseData.duo.partyA
  const partyB = context.caseData.duo.partyB
  const subject = formatPairSubject(partyA.name, partyB.name)
  const runtimeBrief = buildFreeInterrogationRuntimeBrief(context, context.target)

  if (speaker !== 'system' && party) {
    if (isCounterpartPublicQuestion(raw)) {
      return formatCounterpartAnswer(raw, party, getCounterpartProfile(context, party.id), relationLabel, runtimeBrief)
    }
    return formatPartyPublicProfile(raw, party, context, runtimeBrief)
  }

  if (/(이곳|여기|여긴|법정|재판정|장소|어디|뭐 하는 곳)/i.test(raw)) {
    return `이곳은 양측의 진술과 공개된 증거를 대조해 쟁점을 확인하는 법정입니다. ${runtimeBrief}`
  }

  if (/(재판관|판사).*(역할|누구|하는 일|무엇|뭘|뭐)/i.test(raw)) {
    return `재판관은 양측 진술을 정리하고 공개된 증거로 쟁점을 확인합니다. 아직 드러나지 않은 사실은 심문과 증거로만 확인합니다. ${runtimeBrief}`
  }

  if (/(사건|상황).*(개요|배경|설명|요약)|공개된\s*(사건|상황|정보)/i.test(raw)) {
    return `공개된 사건 배경은 "${context.caseData.context.description}"입니다. ${subject}은 ${relationLabel} 관계입니다. ${runtimeBrief}`
  }

  if (/(관계|사이|배우자|가족|친구|상대방|형|동생|전\s*친구)/i.test(raw)) {
    const relationshipState = context.caseData.meta?.relationshipState
    return relationshipState
      ? `${subject}은 ${relationLabel} 관계입니다. 공개된 관계 상태는 ${relationshipState}입니다. ${runtimeBrief}`
      : `${subject}은 ${relationLabel} 관계입니다. ${runtimeBrief}`
  }

  if (party) return `${formatSystemPublicProfile(party)} ${runtimeBrief}`
  return `${partyA.name}은 ${partyA.age}세, ${partyA.occupation}입니다. ${partyB.name}은 ${partyB.age}세, ${partyB.occupation}입니다. ${subject}은 ${relationLabel} 관계입니다. ${runtimeBrief}`
}

export function buildFreeInterrogationOffTopicRedirect(): string {
  return '그건 지금 사건과 직접 이어지는 질문이 아닙니다. 인물, 쟁점, 증거, 공개된 사건 배경 안에서 물어봐 주세요.'
}

export function resolveFreeInterrogationPublicSpeaker(
  rawText: string,
  context: FreeInterrogationRuntimeContext,
): PartyId | 'system' {
  if (!context.target) return 'system'
  if (isDirectPartyProfileQuestion(rawText) || isCounterpartPublicQuestion(rawText)) return context.target
  const compact = normalize(rawText)
  const targetProfile = context.target === 'a' ? context.caseData.duo.partyA : context.caseData.duo.partyB
  if (mentionsParty(compact, targetProfile, context.target)) return context.target
  return 'system'
}

export function buildFreeInterrogationRuntimeBrief(
  context: FreeInterrogationRuntimeContext,
  target: PartyId | null = context.target,
  preferredDisputeId?: string | null,
): string {
  const party = target === 'a' ? context.caseData.duo.partyA : target === 'b' ? context.caseData.duo.partyB : null
  const opponent = target === 'a' ? context.caseData.duo.partyB : target === 'b' ? context.caseData.duo.partyA : null
  const dispute = resolveRuntimeDispute(context, target, preferredDisputeId ?? context.activeDisputeId ?? null)
  const lieState = target && dispute ? resolveRuntimeLieState(context, target, dispute.id) : null
  const evidenceLine = buildEvidenceSurfaceLine(context)
  const phaseLine = context.currentPhase === GamePhase.Phase3_Interrogation
    ? '지금은 심문 중입니다.'
    : '지금은 공개 정보만 짧게 확인하는 흐름입니다.'

  const parts = [phaseLine]
  if (party) {
    parts.push(`현재 답변 대상은 ${party.name}입니다.`)
    if (opponent) {
      const opponentRef = party.callTerms?.toJudge ?? opponent.name
      parts.push(`재판관 앞에서 상대를 말할 때는 "${opponentRef}" 기준으로 부릅니다.`)
    }
    const persona = ARCHETYPE_RESPONSE_GUIDES[party.archetype]
    if (persona) parts.push(`말투 기준은 ${persona}입니다.`)
    if (party.speechStyle) parts.push(`캐릭터 말투는 ${party.speechStyle}`)
    const tells = party.verbalTells
      .map((tell) => `${tell.trigger}:${tell.pattern}`)
      .slice(0, 2)
    if (tells.length > 0) parts.push(`말버릇 참고는 ${tells.join(' / ')}입니다.`)
    if (party.sensitivePoints?.length) {
      parts.push(`민감점은 ${party.sensitivePoints.slice(0, 2).join(', ')}입니다.`)
    }
  }
  if (dispute) {
    parts.push(`중심 쟁점은 "${dispute.name}"입니다.`)
    if (lieState) {
      parts.push(`현재 공개 단계는 ${lieState}(${LIE_STATE_LABELS[lieState] ?? '진행 중'})입니다.`)
      parts.push(buildDisclosureInstruction(lieState))
    }
  } else {
    parts.push('아직 특정 쟁점으로 좁혀지지 않았습니다.')
  }
  if (evidenceLine) parts.push(evidenceLine)
  parts.push('숨겨진 진실은 직접 말하지 않고, 공개된 정보와 현재 심문 단계 안에서만 답합니다.')
  return parts.join(' ')
}

function buildDisclosureInstruction(lieState: string): string {
  if (lieState === 'S0' || lieState === 'S1') {
    return '이 단계에서는 핵심 인물·금액·장소·목적을 직접 열지 말고, 공개된 표면 사실과 회피/부정 톤만 유지합니다.'
  }
  if (lieState === 'S2') {
    return '이 단계에서는 일부 인정은 가능하지만 핵심 결론을 단정하지 않고, 왜곡된 해석과 확인된 사실을 분리합니다.'
  }
  if (lieState === 'S3' || lieState === 'S4') {
    return '이 단계에서는 드러난 관계와 일부 사실을 말할 수 있지만, 증거로 열리지 않은 세부는 추정처럼 말하지 않습니다.'
  }
  if (lieState === 'S5') {
    return '이 단계에서는 자백 이후이므로 이미 공개된 핵심 사실을 명확히 말하되, 사건 밖 정보는 만들지 않습니다.'
  }
  return '현재 공개된 범위 안에서만 답합니다.'
}

export function buildFreeInterrogationContextualFallback(
  context: FreeInterrogationRuntimeContext,
  fallbackContext: FreeInterrogationFallbackContext,
  reason: string,
  baseText?: string,
): string {
  const target = fallbackContext.target
  if (target !== 'a' && target !== 'b') {
    return baseText || '지금은 공개된 사건 정보 안에서만 답할 수 있습니다. 인물, 쟁점, 증거 중 하나로 질문을 좁혀 주세요.'
  }

  const party = target === 'a' ? context.caseData.duo.partyA : context.caseData.duo.partyB
  const dispute = resolveRuntimeDispute(context, target, fallbackContext.disputeId ?? context.activeDisputeId ?? null)
  const lieState = dispute ? resolveRuntimeLieState(context, target, dispute.id) : fallbackContext.lieState
  const disputeName = dispute?.name ?? '지금 다루는 쟁점'
  const stateLabel = lieState ? `${lieState}(${LIE_STATE_LABELS[lieState] ?? '진행 중'})` : '현재 단계'

  if (reason === 'leak_probe') {
    return `${addressJudge(party)} 그 질문은 아직 공개되지 않은 사실을 직접 묻는 방식입니다. ${disputeName}에 대해서는 ${stateLabel} 범위에서만 답하겠습니다. 증거로 확인된 부분부터 물어봐 주십시오.`
  }

  if (reason === 'phase_not_interrogation') {
    return `${addressJudge(party)} 지금은 정식 심문 흐름이 아니라서 깊게 답하긴 어렵습니다. ${disputeName}에 관한 질문은 심문 단계에서 다시 물어봐 주십시오.`
  }

  if (reason === 'evidence_unavailable') {
    return `${addressJudge(party)} 그 증거는 제가 지금 확인한 범위와 바로 연결되지 않습니다. ${disputeName}에서 확인된 기록을 기준으로 다시 물어봐 주십시오.`
  }

  if (reason === 'low_confidence_mapping' || reason === 'unmapped_intent') {
    return `${addressJudge(party)} 질문의 초점이 아직 분명하지 않습니다. ${disputeName}에 대해 날짜나 행동을 묻는지, 이유를 묻는지, 제 감정을 묻는지로 좁혀 주십시오.`
  }

  return baseText || `${addressJudge(party)} ${disputeName}에 대해서는 ${stateLabel} 범위에서만 답하겠습니다. 질문을 조금 더 구체적으로 해 주십시오.`
}

function resolveMentionedParty(raw: string, context: FreeInterrogationRuntimeContext): CharacterProfile | null {
  const compact = normalize(raw)
  const partyA = context.caseData.duo.partyA
  const partyB = context.caseData.duo.partyB

  if (mentionsParty(compact, partyA, 'a')) return partyA
  if (mentionsParty(compact, partyB, 'b')) return partyB
  if (isCounterpartPublicQuestion(raw) || isDirectPartyProfileQuestion(raw)) return getTargetProfile(context)
  return null
}

function isCounterpartPublicQuestion(raw: string): boolean {
  return /(상대방|배우자|남편|아내|파트너|형|동생|친구|전\s*친구|예비신랑).*(누구|관계|사이|무슨|뭐|공개\s*정보|프로필)/i.test(raw)
}

function isDirectPartyProfileQuestion(raw: string): boolean {
  const compact = raw.replace(/\s+/g, '')
  const hasProfileToken = /(누구|누구십니까|이름|나이|직업|프로필|정체|소개)/i.test(compact)
  return hasProfileToken && /(당신|본인|너|네|자네|그쪽)/i.test(compact)
}

function mentionsParty(rawCompact: string, profile: CharacterProfile, partyId: PartyId): boolean {
  const profileName = normalize(profile.name)
  return rawCompact.includes(profileName) ||
    rawCompact.includes(`party${partyId}`) ||
    rawCompact.includes(`${partyId}는`) ||
    rawCompact.includes(`${partyId}은`) ||
    rawCompact.includes(`${partyId}가`)
}

function getTargetProfile(context: FreeInterrogationRuntimeContext): CharacterProfile | null {
  if (context.target === 'a') return context.caseData.duo.partyA
  if (context.target === 'b') return context.caseData.duo.partyB
  return null
}

function getCounterpartProfile(context: FreeInterrogationRuntimeContext, partyId: PartyId): CharacterProfile {
  return partyId === 'a' ? context.caseData.duo.partyB : context.caseData.duo.partyA
}

function getRelationshipLabel(context: FreeInterrogationRuntimeContext): string {
  const type = context.caseData.duo.relationshipType ||
    context.caseData.meta?.relationshipType ||
    context.caseData.context.contextType
  return RELATIONSHIP_LABELS[type] ?? '사건 관계자'
}

function formatPartyPublicProfile(
  raw: string,
  profile: CharacterProfile,
  context: FreeInterrogationRuntimeContext,
  runtimeBrief: string,
): string {
  const profileLine = formatPartyProfileLine(profile)
  if (/(이곳|여기|법정|재판정)/i.test(raw)) {
    return `${profileLine} 이 법정에서는 공개 프로필과 확인된 증거 범위에서만 말하겠습니다. ${runtimeBrief}`
  }
  return `${profileLine} ${runtimeBrief}`
}

function formatPartyProfileLine(profile: CharacterProfile): string {
  switch (profile.archetype) {
    case 'victim_cosplay':
      return `재판관님, 저는 ${profile.name}입니다. ${profile.age}세이고 ${profile.occupation}으로 일합니다. 공개된 프로필로는 그게 전부입니다.`
    case 'avoidant':
      return `저는 ${profile.name}입니다. ${profile.age}세, ${profile.occupation}입니다. 공개된 프로필은 그 정도로 말씀드리겠습니다.`
    case 'confrontational':
      return `저는 ${profile.name}입니다. ${profile.age}세, ${profile.occupation}입니다. 공개된 사실은 그렇게 확인하시면 됩니다.`
    case 'cold_logic':
      return `저는 ${profile.name}입니다. ${profile.age}세, 직업은 ${profile.occupation}입니다. 공개 프로필 기준입니다.`
    case 'affect_flattening':
      return `저는 ${profile.name}입니다. ${profile.age}세, ${profile.occupation}입니다. 공개된 정보만 말씀드립니다.`
    case 'premature_summary':
      return `정리하면 저는 ${profile.name}, ${profile.age}세, ${profile.occupation}입니다. 공개 프로필 범위입니다.`
    default:
      return `저는 ${profile.name}입니다. 직업은 ${profile.occupation}, 나이는 ${profile.age}세입니다.`
  }
}

function formatCounterpartAnswer(
  raw: string,
  profile: CharacterProfile,
  counterpart: CharacterProfile,
  relationLabel: string,
  runtimeBrief: string,
): string {
  const relationTerm = profile.callTerms?.toJudge ?? relationLabel
  const subject = `${relationTerm} ${counterpart.name}`
  const profileSuffix = /(공개\s*정보|프로필|직업|나이)/i.test(raw)
    ? ` 공개 프로필로는 ${counterpart.age}세, ${counterpart.occupation}입니다.`
    : ''
  if (profile.archetype === 'avoidant' || profile.archetype === 'affect_flattening') {
    return `${subject}입니다. 공개된 관계는 ${relationLabel}입니다.${profileSuffix} 더 자세한 사정은 심문에서 확인해 주십시오. ${runtimeBrief}`
  }
  if (profile.archetype === 'premature_summary') {
    return `정리하면 ${subject}, 공개된 관계는 ${relationLabel}입니다.${profileSuffix} ${runtimeBrief}`
  }
  return `재판관님, ${subject}입니다. 공개된 관계는 ${relationLabel}입니다.${profileSuffix} ${runtimeBrief}`
}

function formatPairSubject(partyAName: string, partyBName: string): string {
  return `${partyAName}${hasKoreanFinalConsonant(partyAName) ? '과' : '와'} ${partyBName}`
}

function hasKoreanFinalConsonant(value: string): boolean {
  const last = [...value.trim()].pop()
  if (!last) return false
  const code = last.charCodeAt(0) - 0xac00
  return code >= 0 && code <= 11171 && code % 28 !== 0
}

function formatSystemPublicProfile(profile: CharacterProfile): string {
  return `${profile.name}은 ${profile.age}세, 직업은 ${profile.occupation}입니다. 공개 프로필 범위만 확인합니다.`
}

function resolveRuntimeDispute(
  context: FreeInterrogationRuntimeContext,
  target: PartyId | null,
  preferredDisputeId?: string | null,
) {
  const fromPreferred = preferredDisputeId
    ? context.caseData.disputes.find((dispute) => dispute.id === preferredDisputeId)
    : null
  if (fromPreferred) return fromPreferred
  if (!target) return null
  const agent = target === 'a' ? context.agentA : context.agentB
  const firstDisputeId = Object.keys(agent.lieStateMap)[0]
  return context.caseData.disputes.find((dispute) => dispute.id === firstDisputeId) ?? null
}

function resolveRuntimeLieState(context: FreeInterrogationRuntimeContext, target: PartyId, disputeId: string): string | null {
  const agent = target === 'a' ? context.agentA : context.agentB
  return agent.lieStateMap[disputeId]?.currentState ?? null
}

function buildEvidenceSurfaceLine(context: FreeInterrogationRuntimeContext): string | null {
  const presented = context.caseData.evidence
    .filter((evidence) => context.evidenceStates[evidence.id]?.presented)
    .map((evidence) => evidence.surfaceName ?? evidence.name)
    .slice(0, 2)
  if (presented.length > 0) {
    return `이미 제시된 증거는 ${presented.join(', ')}입니다.`
  }
  const unlocked = context.caseData.evidence
    .filter((evidence) => context.evidenceStates[evidence.id]?.unlocked)
    .map((evidence) => evidence.surfaceName ?? evidence.name)
    .slice(0, 2)
  return unlocked.length > 0 ? `현재 확인 가능한 증거는 ${unlocked.join(', ')}입니다.` : null
}

function addressJudge(profile: CharacterProfile): string {
  return profile.archetype === 'premature_summary' ? '재판관님,' : '재판관님,'
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '')
}
