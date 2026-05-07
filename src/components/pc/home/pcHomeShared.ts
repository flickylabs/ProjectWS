import type { CaseData } from '../../../types'
import { hasScriptedTextBundle } from '../../../engine/scriptedTextLoader'
import { normalizeCaseKey } from '../../../utils/caseHelpers'
import { translate, type LocaleCode, type MessageKey } from '../../../i18n'

export const PC_HOME_INTRO_KEY = 'solomon-intro-seen'
export const PC_CASE_PROGRESS_KEY = 'solomon-case-progress'

export const PC_HOME_CATEGORIES = [
  { id: 'random', label: '무작위' },
  { id: 'spouse', label: '부부' },
  { id: 'family', label: '가족' },
  { id: 'friend', label: '친구' },
  { id: 'neighbor', label: '이웃' },
  { id: 'partnership', label: '동업' },
  { id: 'tenant', label: '세입자' },
  { id: 'workplace', label: '직장' },
  { id: 'headline', label: '헤드라인' },
] as const

export type PCHomeCategoryId = (typeof PC_HOME_CATEGORIES)[number]['id']

export const PC_GENERAL_SESSIONS = [
  {
    id: 'spouse',
    label: '부부',
    iconId: 'i-heart',
    tagline: '가장 가깝고도 먼 사이',
    description: '사랑, 생활비, 침묵이 한 식탁에서 부딪힙니다.',
    accent: 'rose',
  },
  {
    id: 'family',
    label: '가족',
    iconId: 'i-shield',
    tagline: '가까워서 더 쉽게 상처가 남는 관계',
    description: '돌봄과 기대, 의무와 애틋함이 서로를 시험합니다.',
    accent: 'emerald',
  },
  {
    id: 'friend',
    label: '친구',
    iconId: 'i-chat',
    tagline: '편함과 선 넘음의 한 끗 차이',
    description: '우정과 거래가 겹치는 순간, 감정의 온도가 달라집니다.',
    accent: 'violet',
  },
  {
    id: 'neighbor',
    label: '이웃',
    iconId: 'i-bulb',
    tagline: '문 하나 사이의 생활 전쟁',
    description: '소음과 시선, 경계와 배려가 일상 전체를 흔듭니다.',
    accent: 'blue',
  },
  {
    id: 'partnership',
    label: '동업',
    iconId: 'i-hand',
    tagline: '돈과 믿음이 어긋나는 순간',
    description: '정산과 분담, 약속과 책임이 서로 다른 계산을 드러냅니다.',
    accent: 'amber',
  },
  {
    id: 'tenant',
    label: '세입자',
    iconId: 'i-doc',
    tagline: '계약서 밖에서 터지는 현실',
    description: '보증금, 하자, 책임 회피가 좁은 공간 안에서 충돌합니다.',
    accent: 'cyan',
  },
  {
    id: 'workplace',
    label: '직장',
    iconId: 'i-ledger',
    tagline: '기록과 관계가 동시에 흔들리는 자리',
    description: '메일과 규정, 평가와 소문이 일의 얼굴을 바꿔 놓습니다.',
    accent: 'indigo',
  },
  {
    id: 'headline',
    label: '헤드라인',
    iconId: 'i-crown',
    tagline: '세상이 보는 사건은 무게가 다르다',
    description: '공개성과 파장이 커질수록 판단은 더 무거워집니다.',
    accent: 'orange',
  },
  {
    id: 'online',
    label: '온라인',
    iconId: 'i-sns',
    tagline: '화면 밖 진실은 더 늦게 드러난다',
    description: '댓글과 게시물, 캡처와 여론이 사건의 흐름을 바꿉니다.',
    accent: 'orange',
  },
  {
    id: 'medical_education',
    label: '의료·교육',
    iconId: 'i-shield',
    tagline: '믿고 맡긴 만큼 더 무거워지는 책임',
    description: '전문성, 보호 의무, 해명의 온도가 정면으로 충돌합니다.',
    accent: 'teal',
  },
  {
    id: 'public_system',
    label: '공공·제도',
    iconId: 'i-scale',
    tagline: '제도가 흔들리면 모두가 불안해진다',
    description: '공적 절차와 개인의 사정이 같은 장면 안에서 맞붙습니다.',
    accent: 'gold',
  },
  {
    id: 'lover',
    label: '연인',
    iconId: 'i-heart',
    tagline: '사랑과 의심 사이, 감정이 증거가 되는 순간',
    description: '약속과 배신, 질투와 진심이 가장 가까운 사이를 시험합니다.',
    accent: 'pink',
  },
] as const

export type PCGeneralSessionId = (typeof PC_GENERAL_SESSIONS)[number]['id']
export type PCGeneralSession = (typeof PC_GENERAL_SESSIONS)[number]
export type LocalizedPCGeneralSession = Omit<PCGeneralSession, 'label' | 'tagline' | 'description'> & {
  label: string
  tagline: string
  description: string
}

export interface PCCaseProgressEntry {
  bestScore: number
  stars: number
  reputation: number
  clearedAt: string
}

export const PC_HOME_INTRO_SLIDES = [
  {
    kicker: 'DIGITAL COURT',
    titleKey: 'pc.home.intro.slide.digitalCourt.title',
    bodyKey: 'pc.home.intro.slide.digitalCourt.body',
  },
  {
    kicker: 'CONFLICT',
    titleKey: 'pc.home.intro.slide.conflict.title',
    bodyKey: 'pc.home.intro.slide.conflict.body',
  },
  {
    kicker: 'INTERROGATION',
    titleKey: 'pc.home.intro.slide.interrogation.title',
    bodyKey: 'pc.home.intro.slide.interrogation.body',
  },
  {
    kicker: 'READY',
    titleKey: 'pc.home.intro.slide.ready.title',
    bodyKey: 'pc.home.intro.slide.ready.body',
  },
] as const satisfies ReadonlyArray<{
  kicker: string
  titleKey: MessageKey
  bodyKey: MessageKey
}>

const PC_DROPPED_CASE_KEYS = new Set(['neighbor-new-10', 'civic-new-07'])

const PC_GENERAL_SESSION_PREFIXES: Record<PCGeneralSessionId, readonly string[]> = {
  spouse: ['spouse-', 'spouse-new-'],
  family: ['family-', 'family-new-'],
  friend: ['friend-', 'friend-new-'],
  neighbor: ['neighbor-', 'neighbor-new-'],
  partnership: ['partnership-', 'partnership-new-'],
  tenant: ['tenant-', 'tenant-new-'],
  workplace: ['workplace-', 'workplace-new-'],
  headline: ['headline-'],
  online: ['online-new-'],
  medical_education: ['professional-new-'],
  public_system: ['civic-new-'],
  lover: ['lover-', 'lover-new-'],
}

export function hasSeenPcIntro(): boolean {
  try {
    return localStorage.getItem(PC_HOME_INTRO_KEY) === 'true'
  } catch {
    return false
  }
}

export function markPcIntroSeen(): void {
  try {
    localStorage.setItem(PC_HOME_INTRO_KEY, 'true')
  } catch {
    // ignore
  }
}

export function loadPcCaseProgress(): Record<string, PCCaseProgressEntry> {
  try {
    const raw = localStorage.getItem(PC_CASE_PROGRESS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function formatCountdown(seconds: number): string {
  if (seconds <= 0) return translate('pc.home.countdown.ready')
  const minutes = Math.floor(seconds / 60)
  const remainSeconds = seconds % 60
  if (minutes > 0) {
    return translate('pc.home.countdown.minutesSeconds', { minutes, seconds: String(remainSeconds).padStart(2, '0') })
  }
  return translate('pc.home.countdown.seconds', { seconds: remainSeconds })
}

export function getCasesForPcHomeCategory(cases: CaseData[], category: PCHomeCategoryId): CaseData[] {
  if (category === 'random') return cases

  return cases.filter((caseData) => {
    const relation = caseData.meta?.relationshipType ?? caseData.duo.relationshipType
    const caseKey = normalizeCaseKey(caseData)
    switch (category) {
      case 'workplace':
        return relation === 'boss_employee' || relation === 'workplace'
      case 'tenant':
        return relation === 'tenant_landlord' || relation === 'tenant'
      case 'headline':
        return (
          caseKey.startsWith('headline-')
          || caseKey.startsWith('online-')
          || caseKey.startsWith('professional-')
          || caseKey.startsWith('civic-')
        )
      default:
        return relation === category
    }
  })
}

export function getCasesForPcGeneralSession(cases: CaseData[], sessionId: PCGeneralSessionId): CaseData[] {
  const allowedPrefixes = PC_GENERAL_SESSION_PREFIXES[sessionId]

  return cases.filter((caseData) => {
    const caseKey = normalizeCaseKey(caseData)
    if (PC_DROPPED_CASE_KEYS.has(caseKey)) return false
    if (!hasPcScriptedCase(caseData)) return false
    return allowedPrefixes.some((prefix) => caseKey.startsWith(prefix))
  })
}

export function getLocalizedPcGeneralSession(session: PCGeneralSession, locale?: LocaleCode): LocalizedPCGeneralSession {
  return {
    ...session,
    label: translate(`pc.home.session.${session.id}.label` as MessageKey, undefined, locale),
    tagline: translate(`pc.home.session.${session.id}.tagline` as MessageKey, undefined, locale),
    description: translate(`pc.home.session.${session.id}.description` as MessageKey, undefined, locale),
  }
}

export function getSeasonCases(cases: CaseData[]): CaseData[] {
  void cases
  return []
}

export function hasPcScriptedCase(caseDataOrCaseId: CaseData | string): boolean {
  return hasScriptedTextBundle(normalizeCaseKey(caseDataOrCaseId))
}

export function getRelationshipLabel(relationshipType?: string): string {
  switch (relationshipType) {
    case 'spouse':
      return translate('pc.home.relationship.spouse')
    case 'family':
      return translate('pc.home.relationship.family')
    case 'friend':
      return translate('pc.home.relationship.friend')
    case 'neighbor':
      return translate('pc.home.relationship.neighbor')
    case 'partnership':
      return translate('pc.home.relationship.partnership')
    case 'workplace':
    case 'boss_employee':
      return translate('pc.home.relationship.workplace')
    case 'tenant':
      return translate('pc.home.relationship.tenant')
    case 'tenant_landlord':
      return translate('pc.home.relationship.tenantLandlord')
    case 'headline':
      return translate('pc.home.relationship.headline')
    case 'online':
      return translate('pc.home.relationship.online')
    case 'professional':
    case 'medical_education':
      return translate('pc.home.relationship.medicalEducation')
    case 'civic':
    case 'public_system':
      return translate('pc.home.relationship.publicSystem')
    case 'lover':
      return translate('pc.home.relationship.lover')
    default:
      return translate('pc.home.relationship.random')
  }
}

export function getDifficultyLevel(difficulty: string): number {
  switch (difficulty) {
    case 'easy':
      return 1
    case 'hard':
      return 3
    default:
      return 2
  }
}

export function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return translate('pc.home.difficulty.easy')
    case 'hard':
      return translate('pc.home.difficulty.hard')
    default:
      return translate('pc.home.difficulty.medium')
  }
}

export function getCaseStageTitle(caseData: CaseData): string {
  const primaryDispute = compactText(caseData.disputes[0]?.name ?? '')
  if (primaryDispute) return truncate(primaryDispute, 28)

  const emotionalBait = compactText(caseData.meta?.emotionalBait ?? '')
  if (emotionalBait) return truncate(emotionalBait, 28)

  return `${caseData.duo.partyA.name} vs ${caseData.duo.partyB.name}`
}

export function getCaseTeaser(caseData: CaseData): string {
  const emotionalBait = compactText(caseData.meta?.emotionalBait ?? '')
  if (emotionalBait) return truncate(emotionalBait, 72)
  return truncate(compactText(caseData.context.description), 72)
}

export function getCaseDetailPreview(caseData: CaseData): string {
  return truncate(compactText(caseData.context.description), 180)
}

export function getCaseIssuePreview(caseData: CaseData, limit = 3): string[] {
  const items = caseData.disputes
    .slice(0, limit)
    .map((dispute) => truncate(compactText(dispute.name), 28))
  const remaining = Math.max(0, caseData.disputes.length - limit)
  if (remaining > 0) {
    items.push(translate('pc.home.moreCases', { count: remaining }))
  }
  return items
}

export function sortCasesForBrowser(cases: CaseData[]): CaseData[] {
  const difficultyOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 }
  return [...cases].sort((a, b) => {
    const difficultyGap =
      (difficultyOrder[a.meta?.difficulty ?? 'medium'] ?? 1)
      - (difficultyOrder[b.meta?.difficulty ?? 'medium'] ?? 1)
    if (difficultyGap !== 0) return difficultyGap
    return a.caseId.localeCompare(b.caseId)
  })
}

function compactText(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, Math.max(0, maxLength - 1)).trim()}…`
}
