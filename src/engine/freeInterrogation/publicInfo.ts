import type { CharacterProfile, PartyId } from '../../types'
import type { FreeInterrogationRuntimeContext } from '../../types/freeInterrogation'

const RELATIONSHIP_LABELS: Record<string, string> = {
  spouse: '배우자',
  neighbor: '이웃',
  boss_employee: '직장 관계',
  workplace: '직장 관계',
  partnership: '동업 관계',
  family: '가족',
  tenant_landlord: '임대차 관계',
  tenant: '임대차 관계',
  friend: '친구',
  headline: '사건 관계자',
}

const JUDGE_COURTROOM_ANSWER =
  '이곳은 양측의 진술과 공개된 증거를 대조해 쟁점을 확인하는 법정입니다. 아직 드러나지 않은 사실은 심문과 증거로 확인해야 합니다.'

const JUDGE_ROLE_ANSWER =
  '재판관은 양측 진술을 정리하고 공개된 증거로 쟁점을 확인합니다. 드러나지 않은 사실은 심문과 증거로 확인합니다.'

export function buildFreeInterrogationPublicAnswer(
  rawText: string,
  context: FreeInterrogationRuntimeContext,
): string {
  const raw = rawText.trim()
  const speaker = resolveFreeInterrogationPublicSpeaker(raw, context)
  const speakerParty = speaker === 'a' || speaker === 'b' ? speaker : null
  const speakerProfile = speakerParty === 'a'
    ? context.caseData.duo.partyA
    : speakerParty === 'b'
      ? context.caseData.duo.partyB
      : null
  const mentionedParty = resolveMentionedParty(raw, context)
  const party = speakerProfile ?? mentionedParty
  const relationLabel = RELATIONSHIP_LABELS[getPublicRelationshipType(context)] ?? '당사자'
  const partyA = context.caseData.duo.partyA
  const partyB = context.caseData.duo.partyB
  const relationshipSubject = formatPublicRelationshipSubject(partyA.name, partyB.name)

  if (speakerProfile) {
    if (isCounterpartPublicQuestion(raw)) {
      return formatPartyCounterpartAnswer(raw, speakerProfile, getCounterpartProfile(context, speakerParty!), relationLabel)
    }
    return formatPartyPublicProfile(raw, speakerProfile)
  }

  if (isCourtroomContextQuestion(raw)) {
    return JUDGE_COURTROOM_ANSWER
  }

  if (isJudgeRoleQuestion(raw)) {
    return JUDGE_ROLE_ANSWER
  }

  if (/(사건\s*(개요|배경|설명|요약)|공개된\s*(사건\s*)?(개요|배경|설명|요약)|현재\s*(사건|상황))/i.test(raw)) {
    return [
      `공개된 사건 배경은 "${context.caseData.context.description}"입니다.`,
      `${relationshipSubject}은 ${relationLabel} 관계입니다.`,
      '세부 쟁점의 진위는 심문과 증거로 확인해야 합니다.',
    ].join(' ')
  }

  if (/(관계|사이|배우자|가족|친구|상대방)/i.test(raw)) {
    const relationshipState = context.caseData.meta?.relationshipState
    return relationshipState
      ? `${relationshipSubject}은 ${relationLabel} 관계입니다. 공개된 관계 상태는 ${relationshipState}입니다. 세부 쟁점은 심문과 증거로 확인해야 합니다.`
      : `${relationshipSubject}은 ${relationLabel} 관계입니다. 공개된 관계만 확인합니다. 세부 쟁점은 심문과 증거로 확인해야 합니다.`
  }

  if (party) {
    return formatSystemPublicProfile(party)
  }

  return [
    `${partyA.name}: ${partyA.age}세, ${partyA.occupation}.`,
    `${partyB.name}: ${partyB.age}세, ${partyB.occupation}.`,
    `${relationshipSubject}은 ${relationLabel} 관계입니다.`,
  ].join(' ')
}

export function buildFreeInterrogationOffTopicRedirect(): string {
  return '그건 사건 밖 질문입니다. 사건, 인물, 증거와 관련해 물어봐 주세요.'
}

export function buildFreeInterrogationNoTokenText(): string {
  return '조사권이 부족합니다. 공개 정보나 사건 범위 확인은 가능하지만, 유효한 심문은 조사권 1개가 필요합니다.'
}

export function buildFreeInterrogationGameplayHelp(): string {
  return '자유 질문은 현재 심문 중인 인물에게 직접 묻는 기능입니다. 사건의 사실, 동기, 감정, 공개된 증거를 기준으로 질문해 주세요. 숨겨진 정답이나 아직 열리지 않은 증거를 요구하면 답변하지 않습니다.'
}

const LIE_STATE_LABELS: Record<string, string> = {
  S0: '부인',
  S1: '회피',
  S2: '부분 인정 전',
  S3: '부분 인정',
  S4: '압박',
  S5: '자백 이후',
}

const ARCHETYPE_RESPONSE_GUIDES: Record<string, string> = {
  avoidant: '짧게 인정하고 설명을 미루는 회피 톤',
  confrontational: '맞받아치되 사실은 선명히 가르는 톤',
  victim_cosplay: '피해 감정과 자기 정당화가 섞인 톤',
  cold_logic: '감정보다 사실과 순서를 앞세우는 톤',
  affect_flattening: '감정을 누르고 짧게 답하는 톤',
  premature_summary: '성급히 정리하려는 톤',
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
  const parts = ['현재 자유 질문 응답은 공개된 사건 정보와 진행 중인 심문 맥락 안에서만 작성합니다.']

  if (party) {
    parts.push(`현재 답변 대상은 ${party.name}입니다.`)
    if (opponent) {
      const opponentRef = party.callTerms?.toJudge ?? opponent.name
      parts.push(`재판관 앞에서 상대를 말할 때는 "${opponentRef}" 기준으로 부릅니다.`)
    }
    const persona = ARCHETYPE_RESPONSE_GUIDES[party.archetype]
    if (persona) parts.push(`말투 기준은 ${persona}입니다.`)
    if (party.speechStyle) parts.push(`캐릭터 말투는 ${party.speechStyle}`)
    const tells = party.verbalTells?.map((tell) => `${tell.trigger}:${tell.pattern}`).slice(0, 2) ?? []
    if (tells.length > 0) parts.push(`말버릇 참고는 ${tells.join(' / ')}입니다.`)
  }

  if (dispute) {
    parts.push(`중심 쟁점은 "${dispute.name}"입니다.`)
    if (lieState) {
      parts.push(`현재 공개 단계는 ${lieState}(${LIE_STATE_LABELS[lieState] ?? '진행 중'})입니다.`)
      parts.push(buildDisclosureInstruction(lieState))
    }
  }

  if (evidenceLine) parts.push(evidenceLine)
  parts.push('숨겨진 진실은 직접 말하지 않고, 공개된 정보와 현재 심문 단계 안에서만 답합니다.')
  return parts.join(' ')
}

function resolveRuntimeDispute(
  context: FreeInterrogationRuntimeContext,
  target: PartyId | null,
  preferredDisputeId?: string | null,
) {
  if (preferredDisputeId) {
    const direct = context.caseData.disputes.find((item) => item.id === preferredDisputeId)
    if (direct) return direct
  }
  if (!target) return null
  const agent = target === 'a' ? context.agentA : context.agentB
  const activeDisputeId = Object.entries(agent.lieStateMap)
    .find(([, entry]) => entry.currentState !== 'S0')?.[0]
  return activeDisputeId
    ? context.caseData.disputes.find((item) => item.id === activeDisputeId) ?? null
    : null
}

function resolveRuntimeLieState(
  context: FreeInterrogationRuntimeContext,
  target: PartyId,
  disputeId: string,
): string | null {
  const agent = target === 'a' ? context.agentA : context.agentB
  return agent.lieStateMap[disputeId]?.currentState ?? null
}

function buildEvidenceSurfaceLine(context: FreeInterrogationRuntimeContext): string | null {
  const unlocked = context.caseData.evidence
    .filter((item) => context.evidenceStates[item.id]?.unlocked || context.evidenceStates[item.id]?.presented)
    .map((item) => item.surfaceName ?? item.name)
    .slice(0, 3)
  return unlocked.length > 0 ? `현재 공개 증거는 ${unlocked.join(', ')}입니다.` : null
}

function buildDisclosureInstruction(lieState: string): string {
  if (lieState === 'S0' || lieState === 'S1') {
    return '이 단계에서는 핵심 인물, 금액, 장소, 목적을 직접 열지 말고 공개된 표면 사실과 회피/부정 톤만 유지합니다.'
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

function resolveMentionedParty(
  raw: string,
  context: FreeInterrogationRuntimeContext,
): CharacterProfile | null {
  const compact = raw.toLowerCase().replace(/\s+/g, '')
  const partyA = context.caseData.duo.partyA
  const partyB = context.caseData.duo.partyB

  if (compact.includes('partya') || compact.includes('a의') || compact.includes('a는') || compact.includes('a가')) {
    return partyA
  }
  if (compact.includes('partyb') || compact.includes('b의') || compact.includes('b는') || compact.includes('b가')) {
    return partyB
  }
  if (compact.includes(partyA.name.toLowerCase().replace(/\s+/g, ''))) return partyA
  if (compact.includes(partyB.name.toLowerCase().replace(/\s+/g, ''))) return partyB
  if (isCounterpartPublicQuestion(raw)) return getTargetProfile(context)
  if (isDirectPartyProfileQuestion(raw)) return getTargetProfile(context)
  return null
}

export function resolveFreeInterrogationPublicSpeaker(
  rawText: string,
  context: FreeInterrogationRuntimeContext,
): PartyId | 'system' {
  if (!context.target) return 'system'
  if (isDirectPartyProfileQuestion(rawText)) return context.target
  if (isCounterpartPublicQuestion(rawText)) return context.target
  if (isCourtroomContextQuestion(rawText) || isJudgeRoleQuestion(rawText)) return 'system'
  const raw = rawText.toLowerCase().replace(/\s+/g, '')
  const targetProfile = context.target === 'a' ? context.caseData.duo.partyA : context.caseData.duo.partyB
  if (mentionsParty(raw, targetProfile, context.target)) return context.target
  return 'system'
}

function isCourtroomContextQuestion(raw: string): boolean {
  return /(이곳|여기|여긴|법정|재판정|이\s*법정|이\s*재판).*(어떤 곳|뭐 하는 곳|어디|장소)/i.test(raw)
}

function isJudgeRoleQuestion(raw: string): boolean {
  return /(재판관|판사).*(역할|누구|하는 일|무엇|뭘|뭐)/i.test(raw)
}

function isCounterpartPublicQuestion(raw: string): boolean {
  return /(상대방|배우자|남편|아내|파트너).*(누구|관계|사이|무슨|뭐|공개\s*정보|프로필)/i.test(raw)
}

function isDirectPartyProfileQuestion(raw: string): boolean {
  const compact = raw.replace(/\s+/g, '')
  const hasProfileToken = /(누구|이름|나이|직업|프로필)/i.test(compact)
  if (!hasProfileToken) return false
  if (/(당신|본인|증인|당사자|너|네|자네|그쪽)/i.test(compact)) return true
  return /^(이름|나이|직업|프로필)(은|는|이|가|을|를)?/i.test(compact)
}

function mentionsParty(rawCompact: string, profile: CharacterProfile, partyId: PartyId): boolean {
  const profileName = profile.name.toLowerCase().replace(/\s+/g, '')
  return rawCompact.includes(profileName) ||
    rawCompact.includes(`party${partyId}`) ||
    rawCompact.includes(`${partyId}의`) ||
    rawCompact.includes(`${partyId}는`) ||
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

function getPublicRelationshipType(context: FreeInterrogationRuntimeContext): string {
  return context.caseData.duo.relationshipType ||
    context.caseData.meta?.relationshipType ||
    context.caseData.context.contextType
}

function formatPartyPublicProfile(raw: string, profile: CharacterProfile): string {
  const profileLine = formatPartyProfileLine(profile)
  if (isCourtroomContextQuestion(raw)) {
    return `${profileLine} 여기는 재판정이고, 드러나지 않은 사실은 심문과 증거로 확인해야 합니다.`
  }
  return profileLine
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

function formatPartyCounterpartAnswer(
  raw: string,
  profile: CharacterProfile,
  counterpart: CharacterProfile,
  relationLabel: string,
): string {
  const relationTerm = profile.callTerms?.toJudge ?? relationLabel
  const counterpartSubject = `${relationTerm}인 ${counterpart.name}`
  const publicProfile = formatCounterpartPublicProfile(raw, counterpart)
  switch (profile.archetype) {
    case 'victim_cosplay':
      return `재판관님, ${counterpartSubject}입니다. 공개된 관계는 ${relationLabel}입니다.${publicProfile}`
    case 'avoidant':
      return `${counterpartSubject}입니다. 공개된 관계는 ${relationLabel}입니다.${publicProfile} 더 자세한 사정은 심문에서 확인해 주십시오.`
    case 'confrontational':
      return `${counterpartSubject}입니다. 공개된 관계는 ${relationLabel}로 확인하시면 됩니다.${publicProfile}`
    case 'cold_logic':
      return `${counterpartSubject}입니다. 공개 기록상 관계는 ${relationLabel}입니다.${publicProfile}`
    case 'affect_flattening':
      return `${counterpartSubject}입니다. 공개된 관계는 ${relationLabel}입니다.${publicProfile}`
    case 'premature_summary':
      return `정리하면 ${counterpartSubject}, 공개된 관계는 ${relationLabel}입니다.${publicProfile}`
    default:
      return `${counterpartSubject}입니다. 공개된 관계는 ${relationLabel}입니다.${publicProfile}`
  }
}

function formatCounterpartPublicProfile(raw: string, counterpart: CharacterProfile): string {
  if (!/(공개\s*정보|프로필|직업|나이)/i.test(raw)) return ''
  return ` 공개 프로필로는 ${counterpart.age}세, ${counterpart.occupation}입니다.`
}

function formatPublicRelationshipSubject(partyAName: string, partyBName: string): string {
  return `${partyAName}${hasKoreanFinalConsonant(partyAName) ? '과' : '와'} ${partyBName}`
}

function hasKoreanFinalConsonant(value: string): boolean {
  const letters = [...value.trim()]
  const last = letters[letters.length - 1]
  if (!last) return false
  const code = last.charCodeAt(0) - 0xac00
  return code >= 0 && code <= 11171 && code % 28 !== 0
}

function formatSystemPublicProfile(profile: CharacterProfile): string {
  return `${profile.name}은 ${profile.age}세, 직업은 ${profile.occupation}입니다. 공개 프로필 범위만 확인합니다.`
}
