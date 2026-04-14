import type { CSSProperties } from 'react'
import { PERK_TABLE, type PerkDefinition } from '../../../engine/judgePerks'
import type { FragmentId, TraitId } from '../../../engine/judgeProgressionEngine'

export const TRAIT_ORDER: TraitId[] = [
  'logical',
  'intuitive',
  'strict',
  'lenient',
  'principled',
  'reconciling',
]

export const FRAGMENT_VISUALS: Record<FragmentId, {
  name: string
  shortLabel: string
  color: string
}> = {
  reasoning_fragment: { name: '추론의 조각', shortLabel: '논리 추적', color: '#5b8def' },
  inquiry_fragment: { name: '탐구의 조각', shortLabel: '균형 탐문', color: '#8b8b9a' },
  empathy_fragment: { name: '공감의 조각', shortLabel: '직감 착안', color: '#e8c172' },
  severity_fragment: { name: '준엄의 조각', shortLabel: '엄정 판정', color: '#e06060' },
  deliberation_fragment: { name: '심리의 조각', shortLabel: '숙의 균형', color: '#8b8b9a' },
  leniency_fragment: { name: '이해의 조각', shortLabel: '관용 시선', color: '#5cc97a' },
  jurisprudence_fragment: { name: '법리의 조각', shortLabel: '원칙 해석', color: '#d4a24e' },
  balance_fragment: { name: '균형의 조각', shortLabel: '중심 조율', color: '#8b8b9a' },
  reconciliation_fragment: { name: '봉합의 조각', shortLabel: '화해 봉합', color: '#a78bfa' },
}

export const TRAIT_VISUALS: Record<TraitId, {
  label: string
  axisLabel: string
  accent: string
  directionFragment: FragmentId
  neutralFragment: FragmentId
}> = {
  logical: {
    label: '논리',
    axisLabel: '탐구',
    accent: '#5b8def',
    directionFragment: 'reasoning_fragment',
    neutralFragment: 'inquiry_fragment',
  },
  intuitive: {
    label: '직관',
    axisLabel: '탐구',
    accent: '#e8c172',
    directionFragment: 'empathy_fragment',
    neutralFragment: 'inquiry_fragment',
  },
  strict: {
    label: '엄격',
    axisLabel: '심판',
    accent: '#e06060',
    directionFragment: 'severity_fragment',
    neutralFragment: 'deliberation_fragment',
  },
  lenient: {
    label: '관용',
    axisLabel: '심판',
    accent: '#5cc97a',
    directionFragment: 'leniency_fragment',
    neutralFragment: 'deliberation_fragment',
  },
  principled: {
    label: '원칙',
    axisLabel: '해결',
    accent: '#d4a24e',
    directionFragment: 'jurisprudence_fragment',
    neutralFragment: 'balance_fragment',
  },
  reconciling: {
    label: '화해',
    axisLabel: '해결',
    accent: '#a78bfa',
    directionFragment: 'reconciliation_fragment',
    neutralFragment: 'balance_fragment',
  },
}

const MAJOR_PERK_BY_TRAIT: Partial<Record<TraitId, PerkDefinition>> = {}
for (const perk of PERK_TABLE) {
  if (perk.tier === 'major') {
    MAJOR_PERK_BY_TRAIT[perk.requiredTrait] = perk
  }
}

export function getTraitMajorPerk(traitId: TraitId) {
  return MAJOR_PERK_BY_TRAIT[traitId]
}

export function formatPerkUnlockCondition(traitId: TraitId, requiredLevel: number) {
  return `${TRAIT_VISUALS[traitId].label} Lv${requiredLevel}`
}

export function formatPerkRequirementCopy(traitId: TraitId, requiredLevel: number) {
  return `${formatPerkUnlockCondition(traitId, requiredLevel)} 필요`
}

interface FragmentIconProps {
  fragmentId: FragmentId
  size?: number
  className?: string
  style?: CSSProperties
}

export function PCFragmentIcon({
  fragmentId,
  size = 32,
  className,
  style,
}: FragmentIconProps) {
  const visual = FRAGMENT_VISUALS[fragmentId]

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        alignItems: 'center',
        color: visual.color,
        display: 'inline-flex',
        height: size,
        justifyContent: 'center',
        width: size,
        ...style,
      }}
    >
      <svg fill="none" height={size} viewBox="0 0 48 48" width={size}>
        <defs>
          <radialGradient id={`pc-fragment-halo-${fragmentId}`} cx="50%" cy="50%" r="58%">
            <stop offset="0%" stopColor={visual.color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={visual.color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="24" cy="24" fill={`url(#pc-fragment-halo-${fragmentId})`} r="22" />
        <circle
          cx="24"
          cy="24"
          fill="rgba(10, 12, 18, 0.88)"
          r="18"
          stroke={visual.color}
          strokeOpacity="0.38"
          strokeWidth="1.4"
        />
        {renderFragmentGlyph(fragmentId, visual.color)}
      </svg>
    </span>
  )
}

function renderFragmentGlyph(fragmentId: FragmentId, color: string) {
  switch (fragmentId) {
    case 'reasoning_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="21" cy="21" r="7.5" strokeWidth="2.3" />
          <path d="M27 27L33.5 33.5" strokeWidth="2.7" />
          <path d="M18.7 21.2L20.9 23.4L24.6 18.9" strokeWidth="1.8" />
        </g>
      )
    case 'inquiry_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.5 16C16 13.9 20 13.2 24 14.4V33.8C20.1 32.5 16.2 33.1 12.5 35.2V16Z" strokeWidth="2" />
          <path d="M35.5 16C32 13.9 28 13.2 24 14.4V33.8C27.9 32.5 31.8 33.1 35.5 35.2V16Z" strokeWidth="2" />
          <path d="M18 20.3H23" strokeWidth="1.5" />
          <path d="M18 24.8H23" strokeWidth="1.5" />
        </g>
      )
    case 'empathy_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 12.5C19.1 12.5 15.2 16.4 15.2 21.1C15.2 24.4 17.1 27.2 20 28.7V32.5H28V28.7C30.9 27.2 32.8 24.4 32.8 21.1C32.8 16.4 28.9 12.5 24 12.5Z" strokeWidth="2" />
          <path d="M20.6 35H27.4" strokeWidth="1.8" />
          <path d="M21.8 38H26.2" strokeWidth="1.8" />
          <path d="M24 9.5V7.5" strokeWidth="1.8" />
          <path d="M16.7 11.9L15 10.2" strokeWidth="1.6" />
          <path d="M31.3 11.9L33 10.2" strokeWidth="1.6" />
        </g>
      )
    case 'severity_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 10.2L28.8 15L24 19.8L19.2 15L24 10.2Z" strokeWidth="2" />
          <path d="M24 19.8V31.8" strokeWidth="2.4" />
          <path d="M18.4 23.2H29.6" strokeWidth="2" />
          <path d="M21.4 31.8H26.6" strokeWidth="1.9" />
          <path d="M20.2 35.4H27.8" strokeWidth="1.9" />
        </g>
      )
    case 'deliberation_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 11V33" strokeWidth="2" />
          <path d="M15 15H33" strokeWidth="2" />
          <path d="M15 15L11.3 23.2H18.7L15 15Z" strokeWidth="1.8" />
          <path d="M33 15L29.3 23.2H36.7L33 15Z" strokeWidth="1.8" />
          <path d="M18.7 36H29.3" strokeWidth="2" />
        </g>
      )
    case 'leniency_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 25.8C17.1 18.2 22 15.4 28.6 15.4C30.6 15.4 32.5 15.9 34.1 16.9C32.4 19 31.5 20.7 31.4 22C33.1 21.8 34.7 22.2 36 23.3C33.8 28.2 29.8 30.6 24.2 30.6C20.6 30.6 16.9 29 13 25.8Z" strokeWidth="1.9" />
          <path d="M13.5 26L9.7 29.8" strokeWidth="1.8" />
          <circle cx="24.9" cy="19.8" fill={color} r="1.2" stroke="none" />
        </g>
      )
    case 'jurisprudence_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 11.5H28.8L33 16.2V33.5H16.5Z" strokeWidth="2" />
          <path d="M28.8 11.5V16.2H33" strokeWidth="1.8" />
          <path d="M20 20H29.2" strokeWidth="1.6" />
          <path d="M20 24.8H29.2" strokeWidth="1.6" />
          <path d="M20 29.6H26.7" strokeWidth="1.6" />
        </g>
      )
    case 'balance_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 18H36" strokeWidth="2.2" />
          <path d="M15 18L24 12L33 18" strokeWidth="2" />
          <path d="M18.5 20.8V31.5" strokeWidth="1.8" />
          <path d="M24 20.8V31.5" strokeWidth="1.8" />
          <path d="M29.5 20.8V31.5" strokeWidth="1.8" />
          <path d="M15.2 34.5H32.8" strokeWidth="2.2" />
        </g>
      )
    case 'reconciliation_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 25L17.8 20.5C19.1 19.2 21.3 19.2 22.7 20.5L25.4 23.1" strokeWidth="2" />
          <path d="M35 25L30.2 20.5C28.9 19.2 26.7 19.2 25.3 20.5L22.6 23.1" strokeWidth="2" />
          <path d="M12.6 25L18.4 30.8C19.8 32.2 22 32.2 23.4 30.8L25 29.2" strokeWidth="2" />
          <path d="M35.4 25L29.6 30.8C28.2 32.2 26 32.2 24.6 30.8L23 29.2" strokeWidth="2" />
        </g>
      )
  }
}
