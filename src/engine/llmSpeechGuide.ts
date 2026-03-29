/**
 * LLM 프롬프트용 공통 말투 규칙 모듈.
 * v6: family subtype 기반 speech profile, informal 일괄 판정 폐기.
 */
import type { CaseData, PartyId } from '../types'
import { getRelationshipType } from '../utils/caseHelpers'

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

  const lines: string[] = ['## 말투 규칙 (매우 중요)']
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

  return lines.join('\n')
}
