/**
 * LLM 프롬프트용 공통 말투 규칙 모듈.
 * 모든 Phase(1~5, 자유질문)에서 동일한 규칙을 사용한다.
 */
import type { CaseData, PartyId } from '../types'

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

/* ── 반말 관계 판별 ─────────────────────── */

export function isInformalRelation(relType: string): boolean {
  return ['spouse', 'family', 'friend'].includes(relType)
}

/** 직장 관계(상사↔부하) 여부 */
export function isWorkplaceRelation(relType: string): boolean {
  return relType === 'workplace' || relType === 'boss_employee'
}

/* ── 호칭 ───────────────────────────────── */

export interface Honorifics {
  aCallsB: string // A가 B를 부르는 호칭
  bCallsA: string // B가 A를 부르는 호칭
}

export function getHonorifics(duo: CaseData['duo']): Honorifics {
  // callTerms가 있으면 우선 사용
  const aCall = duo.partyA.callTerms?.toPartner
  const bCall = duo.partyB.callTerms?.toPartner
  if (aCall && bCall) return { aCallsB: aCall, bCallsA: bCall }

  // 폴백: 관계 유형별 기본값
  if (duo.relationshipType === 'spouse') return { aCallsB: '자기', bCallsA: '자기' }
  if (duo.relationshipType === 'friend') {
    const aGiven = duo.partyA.name.slice(1)
    const bGiven = duo.partyB.name.slice(1)
    return { aCallsB: bGiven + '아', bCallsA: aGiven + '아' }
  }
  // 격식 관계: 이름씨
  const aGiven = duo.partyA.name.slice(1)
  const bGiven = duo.partyB.name.slice(1)
  return { aCallsB: bGiven + '씨', bCallsA: aGiven + '씨' }
}

export function getMyCall(duo: CaseData['duo'], party: PartyId): string {
  const h = getHonorifics(duo)
  return party === 'a' ? h.aCallsB : h.bCallsA
}

/** 재판관에게 상대를 언급할 때의 호칭 */
export function getJudgeReference(duo: CaseData['duo'], party: PartyId): string {
  const ct = party === 'a' ? duo.partyA.callTerms : duo.partyB.callTerms
  return ct?.toJudge ?? '상대방'
}

/** 감정이 격해질 때의 호칭 */
export function getAngryCall(duo: CaseData['duo'], party: PartyId): string {
  const ct = party === 'a' ? duo.partyA.callTerms : duo.partyB.callTerms
  return ct?.angry ?? duo[party === 'a' ? 'partyB' : 'partyA'].name + ' 씨!'
}

/* ── 말투 규칙 프롬프트 블록 ────────────── */

type Phase = 'phase1' | 'phase2' | 'interrogation' | 'free'

/**
 * 공통 말투 가이드를 생성한다.
 * - phase1/phase2 : 양쪽 대화 (A↔B 호칭 모두 안내)
 * - interrogation/free : 단일 캐릭터 응답 (party 필수)
 */
export function buildSpeechGuide(
  duo: CaseData['duo'],
  phase: Phase,
  party?: PartyId,
): string {
  const { partyA, partyB, relationshipType: relType } = duo
  const { aCallsB, bCallsA } = getHonorifics(duo)
  const informal = isInformalRelation(relType)
  const isSingle = phase === 'interrogation' || phase === 'free'

  const lines: string[] = ['## 말투 규칙 (매우 중요)']

  // ① 공통: 대사 1개 = 대상 1명
  lines.push('1. 한 대사 = 한 대상. 재판관에게 하는 말과 상대에게 하는 말을 절대 한 문장 안에 섞지 마세요.')

  if (informal) {
    // ② 호칭
    if (isSingle && party) {
      const myCall = party === 'a' ? aCallsB : bCallsA
      lines.push(`2. 호칭: 상대를 항상 "${myCall}"로만 부르세요. 재판관은 "재판관님".`)
    } else {
      lines.push(`2. 호칭 고정 (다른 호칭 사용 금지):`)
      lines.push(`   - ${partyA.name} → "${aCallsB}" / ${partyB.name} → "${bCallsA}"`)
      lines.push(`   - 재판관 → "재판관님"`)
    }

    // ③ 반말 · 존댓말
    lines.push('3. 상대에게: 반말 (~야, ~잖아, ~거야, ~했어)')
    lines.push('   - "~냐?" 금지 → "~야?"로. "~했느냐?" 금지 → "~한 거야?"로.')
    lines.push('4. 재판관에게: 존댓말 (~입니다, ~했습니다)')

    // ④ Phase별 보충
    if (phase === 'phase1') {
      lines.push('5. 흐름: 초반 2~3개는 재판관에게 진술(존댓말) → 중반부터 서로 따지기(반말) → 후반 거의 전부 반말')
    } else if (phase === 'phase2') {
      lines.push('5. 반박 단계 → 거의 전부 반말. 재판관에게 호소할 때만 존댓말("재판관님, 이 사람이~").')
    }
    // interrogation/free: 추가 흐름 안내 불필요

    // ⑤ 예시 (Phase1에만 — 토큰 절약)
    if (phase === 'phase1') {
      const exCall = isSingle ? (party === 'a' ? aCallsB : bCallsA) : aCallsB
      lines.push('')
      lines.push(`나쁜 예: "${exCall}, 말씀드리면 그 송금은 필요했습니다." → 호칭은 반말인데 존댓말 혼합`)
      lines.push(`좋은 예: "${exCall}, 다시 말하지만 오해야. 정말 급해서 그랬어."`)
      lines.push(`좋은 예: "재판관님, 제가 숨긴 게 아닙니다."`)
    }
  } else {
    // 격식 관계 (이웃, 직장, 임대인, 동업자)
    if (isSingle && party) {
      const myCall = party === 'a' ? aCallsB : bCallsA
      const judgeRef = getJudgeReference(duo, party)
      const angryCall = getAngryCall(duo, party)
      lines.push(`2. 호칭: 상대를 "${myCall}"로 부르세요. 재판관은 "재판관님". 재판관에게 상대 언급 시 "${judgeRef}".`)
      lines.push(`   감정이 격해지면 "${angryCall}"로 전환 가능.`)
    } else {
      lines.push(`2. 호칭:`)
      lines.push(`   - ${partyA.name} → "${aCallsB}" / ${partyB.name} → "${bCallsA}"`)
      lines.push(`   - 재판관 → "재판관님"`)
    }
    lines.push('3. 상대에게: 존댓말 기본. 감정 격해지면 반말 전환 가능.')
    lines.push('4. 재판관에게: 항상 존댓말 (~입니다/~했습니다).')

    if (isWorkplaceRelation(relType)) {
      lines.push('5. 직장 관계 추가: 부하→상사는 직급+님, 상사→부하는 이름+씨. 상사가 감정적일 때 반말 가능.')
    }
  }

  return lines.join('\n')
}
