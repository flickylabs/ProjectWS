import type { EmotionalPhase, LieState, PartyId } from '../../../types'

/**
 * 사건별 · 당사자별 초상화 파일 접두사 매핑.
 * 신규 사건 에셋이 준비되는 대로 엔트리를 추가한다.
 * 키: 단축 slug(caseId에서 `case-` 접두 제거). 값: 당사자별 파일 접두사.
 */
const PORTRAIT_PREFIX: Record<string, Partial<Record<PartyId, string>>> = {
  'spouse-01': { a: 'park-jiyeon', b: 'lee-junho' },
  'family-01': { a: 'yoon-taesung', b: 'yoon-jeonghu' },
  'friend-01': { a: 'song-daeun', b: 'choi-sumin' },
}

/** 엔진 EmotionalPhase → 초상화 파일 접미사. `confident`는 `defensive`로 집약. */
const EMOTION_TO_SUFFIX: Record<EmotionalPhase, 'defensive' | 'shaken' | 'angry' | 'resigned'> = {
  defensive: 'defensive',
  confident: 'defensive',
  shaken: 'shaken',
  angry: 'angry',
  resigned: 'resigned',
}

function normalizeCaseSlug(caseId: string | undefined | null): string | null {
  if (!caseId) return null
  return caseId.replace(/^case-/, '')
}

/**
 * 초상화 PNG URL을 반환한다. 사건/당사자에 초상화 에셋이 등록되어 있지 않으면 null.
 * `confession`이 true이면 자백 표정(-confessing)을 사용하고, 아니면 emotion을 매핑한다.
 */
export function getPcPortraitUrl(
  caseId: string | undefined | null,
  party: PartyId,
  emotion: EmotionalPhase | undefined,
  lieState?: LieState | null,
): string | null {
  const slug = normalizeCaseSlug(caseId)
  if (!slug) return null
  const prefix = PORTRAIT_PREFIX[slug]?.[party]
  if (!prefix) return null
  const suffix = lieState === 'S5' ? 'confessing' : EMOTION_TO_SUFFIX[emotion ?? 'defensive']
  return `/characters/${slug}/${prefix}-${suffix}.png`
}

/** 초상화 에셋이 준비된 사건인지 여부. */
export function hasPcPortrait(caseId: string | undefined | null, party: PartyId): boolean {
  const slug = normalizeCaseSlug(caseId)
  if (!slug) return false
  return Boolean(PORTRAIT_PREFIX[slug]?.[party])
}

/**
 * 증인 초상화 매핑. `public/assets/character/witness/{slug}-{witnessId}-{name}.png` 패턴.
 * 3 사건 × 3 증인 = 9명 전체 PNG 에셋 존재.
 * caseData의 witness id는 'w-1' 형식 (하이픈 포함), PNG 파일명은 'w1' 형식 — normalize 필요.
 */
const WITNESS_PORTRAITS: Record<string, string> = {
  'spouse-01:w1': 'spouse-01-w1-security-guard',
  'spouse-01:w2': 'spouse-01-w2-bank-clerk',
  'spouse-01:w3': 'spouse-01-w3-cafe-owner',
  'family-01:w1': 'family-01-w1-choi-boksoon',
  'family-01:w2': 'family-01-w2-kim-youngsoo',
  'family-01:w3': 'family-01-w3-park-soonae',
  'friend-01:w1': 'friend-01-w1-kim-sera',
  'friend-01:w2': 'friend-01-w2-park-junhyuk',
  'friend-01:w3': 'friend-01-w3-oh-mikyung',
}

export function getWitnessPortraitUrl(
  caseId: string | undefined | null,
  witnessId: string | undefined | null,
): string | null {
  const slug = normalizeCaseSlug(caseId)
  if (!slug || !witnessId) return null
  // caseData id "w-1" → PNG 키 "w1"
  const normalizedId = witnessId.replace('-', '')
  const prefix = WITNESS_PORTRAITS[`${slug}:${normalizedId}`]
  if (!prefix) return null
  return `/assets/character/witness/${prefix}.png`
}
