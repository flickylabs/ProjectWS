/**
 * LLM 프롬프트용 공통 말투 규칙 모듈.
 * v6: family subtype 기반 speech profile, informal 일괄 판정 폐기.
 */
import type { CaseData, PartyId } from '../types'
import { getRelationshipType } from '../utils/caseHelpers'
import { pp이가 as _pp이가, pp은는 as _pp은는 } from './koreanPostposition'

/* ── 관계 유형 라벨 ─────────────────────── */

const RELATION_LABELS: Record<string, string> = {
  spouse: '부부',
  neighbor: '이웃',
  boss_employee: '직장 상하',
  workplace: '직장 상하',
  family: '가족',
  friend: '친구',
  tenant: '임대인/임차인',
  tenant_landlord: '임대인/임차인',
  partnership: '동업자',
}

RELATION_LABELS.headline = '헤드라인'

export function getRelationLabel(relType: string): string {
  return RELATION_LABELS[relType] ?? relType
}

/* ── 반말/존댓말 판별 (v6: subtype 기반) ── */

/**
 * 양쪽 다 반말인 관계인지 판별.
 * family는 subtype에 따라 다름 — siblings만 양쪽 반말, parent_child/inlaw는 아님.
 */
export function isMutualInformal(caseData: CaseData): boolean {
  const relType = getRelationshipType(caseData)
  if (relType === 'spouse') {
    const state = caseData.meta?.relationshipState
    return state !== 'separated' && state !== 'strained'
  }
  if (relType === 'friend') return true
  if (relType === 'family') {
    const famRel = caseData.meta?.familyRelation
    return famRel === 'siblings'
  }
  return false
}

/**
 * 특정 party가 상대에게 반말을 쓸 수 있는지 판별.
 * parent→child: 반말 가능, child→parent: 존댓말.
 */
export function canUseInformal(caseData: CaseData, party: PartyId): boolean {
  if (isMutualInformal(caseData)) return true

  const relType = getRelationshipType(caseData)
  if (relType === 'family') {
    const famRel = caseData.meta?.familyRelation
    if (famRel === 'parent_child' || famRel === 'inlaw_mother_daughter_in_law') {
      // A가 연상(부모)이면 A만 반말
      const ageA = caseData.duo.partyA.age ?? 0
      const ageB = caseData.duo.partyB.age ?? 0
      if (party === 'a') return ageA > ageB
      return ageB > ageA
    }
  }
  if (relType === 'spouse') {
    // separated/strained도 격해지면 반말 가능
    return true
  }
  // workplace: 상사→부하 반말 가능
  if (relType === 'boss_employee' || relType === 'workplace') {
    // A가 상사인 경우가 많음 (callTerms로 판별)
    if (party === 'a') return true
  }
  return false
}

/** 레거시 호환용 (외부에서 호출하는 곳이 있을 수 있음) */
export function isInformalRelation(relType: string): boolean {
  return ['spouse', 'friend'].includes(relType)
  // family는 더 이상 여기서 true를 반환하지 않음
}

/** 직장 관계 여부 */
export function isWorkplaceRelation(relType: string): boolean {
  return relType === 'workplace' || relType === 'boss_employee'
}

/* ── 호칭 ───────────────────────────────── */

export interface Honorifics {
  aCallsB: string
  bCallsA: string
}

export function getHonorifics(duo: CaseData['duo']): Honorifics {
  // callTerms가 있으면 우선 사용
  const aCall = duo.partyA.callTerms?.toPartner
  const bCall = duo.partyB.callTerms?.toPartner
  if (aCall && bCall) return { aCallsB: aCall, bCallsA: bCall }

  // 폴백
  const relType = duo.relationshipType ?? ''
  if (relType === 'spouse') return { aCallsB: '자기야', bCallsA: '자기야' }
  if (relType === 'friend') {
    const bGiven = duo.partyB.name.slice(1)
    const aGiven = duo.partyA.name.slice(1)
    return { aCallsB: bGiven + '아', bCallsA: aGiven + '아' }
  }
  // 격식 관계
  const aGiven = duo.partyA.name.slice(1)
  const bGiven = duo.partyB.name.slice(1)
  return { aCallsB: bGiven + '씨', bCallsA: aGiven + '씨' }
}

export function getMyCall(duo: CaseData['duo'], party: PartyId): string {
  const h = getHonorifics(duo)
  return party === 'a' ? h.aCallsB : h.bCallsA
}

export function getJudgeReference(duo: CaseData['duo'], party: PartyId): string {
  const ct = party === 'a' ? duo.partyA.callTerms : duo.partyB.callTerms
  return ct?.toJudge ?? '상대방'
}

export function getAngryCall(duo: CaseData['duo'], party: PartyId): string {
  const ct = party === 'a' ? duo.partyA.callTerms : duo.partyB.callTerms
  return ct?.angry ?? duo[party === 'a' ? 'partyB' : 'partyA'].name + ' 씨!'
}

export interface OpponentReferenceForms {
  mentionPrimary: string
  mentionAlt: string
  directPrimary: string
  directAlt: string
  forbidden: string[]
}

function normalizeDirectCall(call: string): string {
  return call === '자기' ? '자기야' : call
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function uniqueValues(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))]
}

function hasFinalConsonant(value: string): boolean {
  const trimmed = value.trim()
  const last = trimmed.charAt(trimmed.length - 1)
  if (!last) return false
  const code = last.charCodeAt(0) - 0xac00
  return code >= 0 && code <= 11171 && code % 28 !== 0
}

function attachKoreanParticle(noun: string, particle: string): string {
  const hasBatchim = hasFinalConsonant(noun)
  switch (particle) {
    case '은':
    case '는':
      return `${noun}${hasBatchim ? '은' : '는'}`
    case '이':
    case '가':
      return `${noun}${hasBatchim ? '이' : '가'}`
    case '을':
    case '를':
      return `${noun}${hasBatchim ? '을' : '를'}`
    case '과':
    case '와':
      return `${noun}${hasBatchim ? '과' : '와'}`
    default:
      return `${noun}${particle}`
  }
}

export function getOpponentReferenceForms(caseData: CaseData, party: PartyId): OpponentReferenceForms {
  const relType = getRelationshipType(caseData)
  const speaker = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const opponent = party === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  const directAlt = getMyCall(caseData.duo, party)
  const directPrimary = normalizeDirectCall(directAlt)

  if (relType === 'spouse') {
    const mentionPrimary = speaker.callTerms?.toJudge ?? (party === 'a' ? '제 남편' : '제 아내')
    const mentionAlt = party === 'a' ? '남편' : '아내'
    const givenName = opponent.name.slice(1)
    return {
      mentionPrimary,
      mentionAlt,
      directPrimary,
      directAlt,
      forbidden: uniqueValues([
        `${opponent.name} 씨`,
        `${opponent.name}씨`,
        `${givenName} 씨`,
        `${givenName}씨`,
        opponent.name,
        givenName,
        '상대방',
        '그 사람',
      ]),
    }
  }

  const mentionPrimary = getJudgeReference(caseData.duo, party)
  return {
    mentionPrimary,
    mentionAlt: mentionPrimary,
    directPrimary,
    directAlt,
    forbidden: [],
  }
}

export function buildOpponentReferenceGuide(caseData: CaseData, party: PartyId): string {
  const opponent = party === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  const forms = getOpponentReferenceForms(caseData, party)
  const forbidden = forms.forbidden.length > 0 ? forms.forbidden.map(v => `"${v}"`).join(', ') : '(없음)'
  return `\n★ 상대 지칭 규칙 (최우선, 출력 위반 시 무효):
- 지금 발화자가 재판관에게 ${opponent.name}을/를 3인칭으로 언급할 때는 반드시 "${forms.mentionPrimary}" 또는 "${forms.mentionAlt}"만 사용한다.
- ${opponent.name}에게 직접 부를 때만 "${forms.directPrimary}" 또는 "${forms.directAlt}"를 사용할 수 있다.
- 재판관에게 보고하는 문장에서는 실명+씨/이름+씨를 쓰지 않는다.
- 금지 표현: ${forbidden}`
}

export function enforceOpponentReferenceForms(text: string, caseData: CaseData, party: PartyId): string {
  if (!text) return text
  if (getRelationshipType(caseData) !== 'spouse') return text

  const opponent = party === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  const forms = getOpponentReferenceForms(caseData, party)
  const name = escapeRegex(opponent.name)
  const givenName = escapeRegex(opponent.name.slice(1))
  const direct = forms.directPrimary
  const mention = forms.mentionPrimary

  let output = text

  const directPatterns = [
    new RegExp(`${name}\\s*씨\\s*([,，])`, 'g'),
    new RegExp(`${givenName}\\s*씨\\s*([,，])`, 'g'),
    new RegExp(`${name}\\s*([,，])`, 'g'),
  ]
  for (const pattern of directPatterns) {
    output = output.replace(pattern, `${direct}$1`)
  }

  const mentionPatterns = [
    new RegExp(`${name}\\s*씨`, 'g'),
    new RegExp(`${givenName}\\s*씨`, 'g'),
    new RegExp(`${name}(?=\\s*(?:께|에게|한테|와|과|은|는|이|가|을|를|도|만|의|처럼|보다|에게는|에게도|에게만|에게서|께서|께는|께도|께만|께서는|한테는|한테도|한테만|한테서))`, 'g'),
  ]
  for (const pattern of mentionPatterns) {
    output = output.replace(pattern, mention)
  }

  const genericMentionPattern = /(상대방|그 사람)\s*(에게는|에게도|에게만|에게서|한테는|한테도|한테만|한테서|께서는|께서|께는|께도|께만|에게|한테|께|은|는|이|가|을|를|와|과|도|만|의|처럼|보다)?/g
  output = output.replace(genericMentionPattern, (_match, _generic, particle = '') => {
    if (!particle) return mention
    return attachKoreanParticle(mention, particle)
  })

  return output
}

/* ── 말투 규칙 프롬프트 블록 (v6) ────────── */

type Phase = 'phase1' | 'phase2' | 'interrogation' | 'free'

export function buildSpeechGuide(
  duo: CaseData['duo'],
  phase: Phase,
  party?: PartyId,
  caseData?: CaseData,
): string {
  const { partyA, partyB } = duo
  const { aCallsB, bCallsA } = getHonorifics(duo)
  const isSingle = phase === 'interrogation' || phase === 'free'

  const lines: string[] = ['## 말투 규칙 (최우선 — 위반 시 출력 무효)']
  lines.push('★ 절대 규칙: 재판관에게는 어떤 상황에서도 반드시 존댓말(~습니다, ~요, ~입니다)만 사용. 반말 절대 금지.')
  lines.push('1. 한 대사 = 한 대상. 재판관에게 하는 말과 상대에게 하는 말을 절대 한 문장 안에 섞지 마세요.')

  // 호칭
  if (isSingle && party) {
    const myCall = party === 'a' ? aCallsB : bCallsA
    lines.push(`2. 호칭: 상대를 항상 "${myCall}"로만 부르세요. 재판관은 "재판관님".`)
  } else {
    lines.push(`2. 호칭 고정 (다른 호칭 사용 금지):`)
    lines.push(`   - ${partyA.name} → "${aCallsB}" / ${partyB.name} → "${bCallsA}"`)
    lines.push(`   - 재판관 → "재판관님"`)
  }

  // 반말/존댓말 — subtype 기반
  if (caseData) {
    const mutual = isMutualInformal(caseData)
    if (mutual) {
      lines.push('3. 상대에게: 반말 (~야, ~잖아, ~거야, ~했어)')
      lines.push('   - "~냐?" 금지 → "~야?"로. "~했느냐?" 금지 → "~한 거야?"로.')
      lines.push('4. 재판관에게: 존댓말 (~입니다, ~했습니다)')
    } else if (isSingle && party) {
      const canInformal = canUseInformal(caseData, party)
      if (canInformal) {
        lines.push('3. 상대에게: 반말 가능 (~야, ~잖아). 감정이 격해지면 더 강한 반말.')
        lines.push('4. 재판관에게: 존댓말 (~입니다, ~했습니다)')
      } else {
        lines.push('3. 상대에게: 존댓말 기본 (~요, ~습니다). 감정이 격해지면 반말 전환 가능.')
        lines.push('4. 재판관에게: 존댓말 (~입니다, ~했습니다)')
      }
    } else {
      // Phase 1/2 양쪽: 각자 다를 수 있음
      lines.push('3. 말투: 각 인물의 호칭과 관계에 맞는 말투를 사용하세요.')
      lines.push('4. 재판관에게: 항상 존댓말.')
    }
  } else {
    // caseData 없는 폴백
    lines.push('3. 상대에게: 관계에 맞는 말투.')
    lines.push('4. 재판관에게: 항상 존댓말.')
  }

  // Phase별 보충
  if (phase === 'phase1') {
    lines.push('5. 흐름: 초반은 재판관에게 진술(존댓말) → 중반부터 서로 따지기 → 후반 감정 격화')
  } else if (phase === 'phase2') {
    lines.push('5. 반박 단계 → 서로에게 직접 반박. 재판관에게 호소할 때만 존댓말.')
  }

  // Phase 1 예시
  if (phase === 'phase1') {
    const exCall = isSingle ? (party === 'a' ? aCallsB : bCallsA) : aCallsB
    lines.push('')
    lines.push(`나쁜 예: "${exCall}, 말씀드리면 그 송금은 필요했습니다." → 호칭은 반말인데 존댓말 혼합`)
    lines.push(`좋은 예: "${exCall}, 다시 말하지만 오해야. 정말 급해서 그랬어."`)
    lines.push(`좋은 예: "재판관님, 제가 숨긴 게 아닙니다."`)
  }

  if (caseData && party) {
    lines.push(buildOpponentReferenceGuide(caseData, party))
  }

  return lines.join('\n')
}
