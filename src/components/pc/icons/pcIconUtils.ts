import type { CharacterProfile, EmotionalPhase, PartyId } from '../../../types'

type FaceProfile = Pick<CharacterProfile, 'pcFaceType' | 'callTerms' | 'name'>

const FACE_VARIANTS: Record<'man' | 'woman', Partial<Record<EmotionalPhase, string>>> = {
  man: {
    confident: 'i-man-confident',
    defensive: 'i-man-defensive',
  },
  woman: {
    shaken: 'i-woman-shaken',
    angry: 'i-woman-angry',
    resigned: 'i-woman-resigned',
  },
}

const FEMALE_BY_CALL_TERM = ['\uC544\uB0B4', '\uC5B8\uB2C8', '\uB204\uB098']
const MALE_BY_CALL_TERM = ['\uB0A8\uD3B8', '\uC624\uBE60', '\uD615']

const FEMALE_NAME_SUFFIXES = [
  '\uD76C',
  '\uC9C4',
  '\uC544',
  '\uC601',
  '\uC120',
  '\uC5F0',
  '\uD61C',
  '\uC724',
  '\uBBFC\uC544',
  '\uC720\uC9C4',
  '\uC11C\uC5F0',
  '\uB2E4\uD61C',
  '\uC218\uC544',
]

const MALE_NAME_SUFFIXES = [
  '\uD638',
  '\uC900',
  '\uD601',
  '\uD604',
  '\uD0DC',
  '\uD658',
  '\uC9C4\uC6B0',
  '\uBBFC\uC900',
  '\uC778\uD638',
  '\uAE30\uD604',
  '\uC6B0\uB78C',
  '\uD0DC\uC900',
]

export function getPcFaceSymbolId(
  party: PartyId,
  profile: FaceProfile | null | undefined,
  emotion: EmotionalPhase | undefined,
): string {
  const faceType = profile?.pcFaceType ?? inferFaceType(profile) ?? (party === 'a' ? 'man' : 'woman')
  const variant = emotion ? FACE_VARIANTS[faceType][emotion] : undefined
  return variant ?? (faceType === 'man' ? 'i-man' : 'i-woman')
}

function inferFaceType(profile: FaceProfile | null | undefined): 'man' | 'woman' | null {
  const hints = [
    normalizeFaceHint(profile?.callTerms?.toJudge),
    normalizeFaceHint(profile?.callTerms?.toPartner),
    normalizeFaceHint(profile?.callTerms?.angry),
  ]

  if (containsAny(hints, MALE_BY_CALL_TERM)) {
    return 'woman'
  }

  if (containsAny(hints, FEMALE_BY_CALL_TERM)) {
    return 'man'
  }

  const name = normalizeFaceHint(profile?.name)

  if (endsWithAny(name, FEMALE_NAME_SUFFIXES)) {
    return 'woman'
  }

  if (endsWithAny(name, MALE_NAME_SUFFIXES)) {
    return 'man'
  }

  return null
}

function containsAny(hints: string[], keywords: readonly string[]): boolean {
  return hints.some((hint) => keywords.some((keyword) => hint.includes(keyword)))
}

function endsWithAny(name: string, suffixes: readonly string[]): boolean {
  return suffixes.some((suffix) => name.endsWith(suffix))
}

function normalizeFaceHint(value: string | null | undefined): string {
  return (value ?? '').trim()
}

export function getPcEvidenceSymbolId(type: string): string {
  switch (type) {
    case 'bank':
    case 'financial_record':
    case 'receipt':
      return 'i-doc'
    case 'chat':
    case 'email':
      return 'i-chat'
    case 'contract':
    case 'estimate':
    case 'document':
    case 'institutional_note':
    case 'medical_record':
    case 'forensic_report':
      return 'i-doc'
    case 'testimony':
      return 'i-person'
    case 'cctv':
    case 'photo':
    case 'photo_video':
    case 'video':
    case 'dashcam':
      return 'i-cam'
    case 'log':
    case 'platform_log':
    case 'cloud_log':
    case 'device_log':
    case 'record':
    case 'delivery_record':
    case 'repair_record':
      return 'i-ledger'
    case 'audio':
    case 'device':
      return 'i-smartphone'
    case 'sns':
      return 'i-sns'
    default:
      return 'i-doc'
  }
}
