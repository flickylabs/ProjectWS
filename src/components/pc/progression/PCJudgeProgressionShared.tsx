import { useState, type CSSProperties } from 'react'
import { PERK_TABLE, type PerkDefinition } from '../../../engine/judgePerks'
import type { FragmentId, TraitId } from '../../../engine/judgeProgressionEngine'
import { translate } from '../../../i18n'

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
  reasoning_fragment: { name: '추론의 조각', shortLabel: '논리', color: '#5b8def' },
  inquiry_fragment: { name: '탐구의 조각', shortLabel: '탐구', color: '#8b8b9a' },
  empathy_fragment: { name: '공감의 조각', shortLabel: '공감', color: '#e8c172' },
  severity_fragment: { name: '엄정의 조각', shortLabel: '엄정', color: '#e06060' },
  deliberation_fragment: { name: '숙의의 조각', shortLabel: '숙의', color: '#8b8b9a' },
  leniency_fragment: { name: '관용의 조각', shortLabel: '관용', color: '#5cc97a' },
  jurisprudence_fragment: { name: '법리의 조각', shortLabel: '법리', color: '#d4a24e' },
  balance_fragment: { name: '균형의 조각', shortLabel: '균형', color: '#8b8b9a' },
  reconciliation_fragment: { name: '화해의 조각', shortLabel: '화해', color: '#a78bfa' },
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
    label: '직감',
    axisLabel: '탐구',
    accent: '#e8c172',
    directionFragment: 'empathy_fragment',
    neutralFragment: 'inquiry_fragment',
  },
  strict: {
    label: '엄정',
    axisLabel: '판단',
    accent: '#e06060',
    directionFragment: 'severity_fragment',
    neutralFragment: 'deliberation_fragment',
  },
  lenient: {
    label: '관용',
    axisLabel: '판단',
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
  return `${TRAIT_VISUALS[traitId].label} Lv.${requiredLevel}`
}

export function formatPerkRequirementCopy(traitId: TraitId, requiredLevel: number) {
  return translate('pc.perk.required', { name: formatPerkUnlockCondition(traitId, requiredLevel) })
}

interface FragmentIconProps {
  fragmentId: FragmentId
  size?: number
  className?: string
  style?: CSSProperties
}

const FRAGMENT_PNG_NAME: Record<FragmentId, string> = {
  reasoning_fragment: 'reasoning',
  inquiry_fragment: 'inquiry',
  empathy_fragment: 'empathy',
  severity_fragment: 'severity',
  deliberation_fragment: 'deliberation',
  leniency_fragment: 'leniency',
  jurisprudence_fragment: 'jurisprudence',
  balance_fragment: 'balance',
  reconciliation_fragment: 'reconciliation',
}

export function PCFragmentIcon({
  fragmentId,
  size = 32,
  className,
  style,
}: FragmentIconProps) {
  const visual = FRAGMENT_VISUALS[fragmentId]
  const [pngFailed, setPngFailed] = useState(false)
  const pngName = FRAGMENT_PNG_NAME[fragmentId]

  if (!pngFailed && pngName) {
    return (
      <img
        alt=""
        aria-hidden="true"
        className={className}
        height={size}
        onError={() => setPngFailed(true)}
        src={`/icons/fragment/${pngName}.png`}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 10px rgba(212, 162, 78, 0.18))',
          ...style,
        }}
        width={size}
      />
    )
  }

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
        <circle cx="24" cy="24" fill={visual.color} opacity="0.13" r="22" />
        <path
          d="M24 7L37 17V31L24 41L11 31V17L24 7Z"
          fill="rgba(10, 12, 18, 0.88)"
          stroke={visual.color}
          strokeOpacity="0.7"
          strokeWidth="1.8"
        />
        <path
          d="M24 13L31 19V29L24 35L17 29V19L24 13Z"
          stroke={visual.color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.9"
          strokeWidth="2"
        />
        <text
          fill={visual.color}
          fontFamily="Inter, Pretendard, sans-serif"
          fontSize="7"
          fontWeight="800"
          textAnchor="middle"
          x="24"
          y="27"
        >
          {visual.shortLabel.slice(0, 2)}
        </text>
      </svg>
    </span>
  )
}
