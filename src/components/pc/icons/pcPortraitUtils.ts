import type { EmotionalPhase, LieState, PartyId } from '../../../types'

/**
 * 사건별 · 당사자별 초상화 파일 접두사 매핑.
 * 신규 사건 에셋이 준비되는 대로 엔트리를 추가한다.
 * 키: 단축 slug(caseId에서 `case-` 접두 제거). 값: 당사자별 파일 접두사.
 */
const PORTRAIT_PREFIX: Record<string, Partial<Record<PartyId, string>>> = {
  'spouse-01': { a: 'park-jiyeon', b: 'lee-junho' },
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
