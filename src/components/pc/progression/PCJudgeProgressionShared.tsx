import type { CSSProperties } from 'react'
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
  symbol: string
  color: string
}> = {
  reasoning_fragment: { name: '추론', symbol: '🔍', color: '#4c8dff' },
  inquiry_fragment: { name: '탐구', symbol: '📖', color: '#97a3b5' },
  empathy_fragment: { name: '공감', symbol: '💡', color: '#ffd166' },
  severity_fragment: { name: '준엄', symbol: '⚔️', color: '#ef5b5b' },
  deliberation_fragment: { name: '심리', symbol: '⚖️', color: '#a8afbc' },
  leniency_fragment: { name: '이해', symbol: '🕊️', color: '#61d08a' },
  jurisprudence_fragment: { name: '법리', symbol: '📜', color: '#b6845a' },
  balance_fragment: { name: '균형', symbol: '🏛️', color: '#9ba4b4' },
  reconciliation_fragment: { name: '봉합', symbol: '🤝', color: '#b082ff' },
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
    accent: '#4c8dff',
    directionFragment: 'reasoning_fragment',
    neutralFragment: 'inquiry_fragment',
  },
  intuitive: {
    label: '직관',
    axisLabel: '탐구',
    accent: '#ffd166',
    directionFragment: 'empathy_fragment',
    neutralFragment: 'inquiry_fragment',
  },
  strict: {
    label: '엄격',
    axisLabel: '재판',
    accent: '#ef5b5b',
    directionFragment: 'severity_fragment',
    neutralFragment: 'deliberation_fragment',
  },
  lenient: {
    label: '관용',
    axisLabel: '재판',
    accent: '#61d08a',
    directionFragment: 'leniency_fragment',
    neutralFragment: 'deliberation_fragment',
  },
  principled: {
    label: '원칙',
    axisLabel: '해결',
    accent: '#b6845a',
    directionFragment: 'jurisprudence_fragment',
    neutralFragment: 'balance_fragment',
  },
  reconciling: {
    label: '화해',
    axisLabel: '해결',
    accent: '#b082ff',
    directionFragment: 'reconciliation_fragment',
    neutralFragment: 'balance_fragment',
  },
}

export const TRAIT_UNLOCK_COPY: Record<TraitId, string> = {
  logical: '논리 성향',
  intuitive: '직관 성향',
  strict: '엄격 성향',
  lenient: '관용 성향',
  principled: '원칙 성향',
  reconciling: '화해 성향',
}

interface FragmentIconProps {
  fragmentId: FragmentId
  size?: number
  className?: string
  style?: CSSProperties
}

export function PCFragmentIcon({
  fragmentId,
  size = 30,
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
      <svg fill="none" height={size} viewBox="0 0 32 32" width={size}>
        <defs>
          <radialGradient id={`pc-fragment-glow-${fragmentId}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={visual.color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={visual.color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="16" cy="16" fill={`url(#pc-fragment-glow-${fragmentId})`} r="15" />
        <circle cx="16" cy="16" fill="rgba(10, 12, 18, 0.88)" r="13" stroke={visual.color} strokeOpacity="0.42" strokeWidth="1.2" />
        {renderFragmentSymbol(fragmentId, visual.color)}
      </svg>
    </span>
  )
}

function renderFragmentSymbol(fragmentId: FragmentId, color: string) {
  switch (fragmentId) {
    case 'reasoning_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="14" cy="14" r="5.5" strokeWidth="1.9" />
          <path d="M18.8 18.8L23.7 23.7" strokeWidth="2.2" />
          <path d="M13.6 11.2L15.2 13.1L18 10.4" strokeWidth="1.4" />
        </g>
      )
    case 'inquiry_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 10.2C11.9 8.8 14.6 8.4 17.6 9.1V22.8C14.8 22 12.1 22.4 9.5 23.8V10.2Z" strokeWidth="1.7" />
          <path d="M22.5 10.2C20.1 8.8 17.4 8.4 14.4 9.1V22.8C17.2 22 19.9 22.4 22.5 23.8V10.2Z" strokeWidth="1.7" />
          <path d="M12.4 12.8H15.8" strokeWidth="1.2" />
          <path d="M12.4 15.6H15.8" strokeWidth="1.2" />
        </g>
      )
    case 'empathy_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8C12.7 8 10 10.7 10 14C10 16.3 11.3 18.2 13.2 19.2V22H18.8V19.2C20.7 18.2 22 16.3 22 14C22 10.7 19.3 8 16 8Z" strokeWidth="1.7" />
          <path d="M13.6 24.2H18.4" strokeWidth="1.5" />
          <path d="M14.5 26H17.5" strokeWidth="1.5" />
        </g>
      )
    case 'severity_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 9L21 19" strokeWidth="1.9" />
          <path d="M13 7L25 19" strokeWidth="1.5" />
          <path d="M9 11L21 23" strokeWidth="1.5" />
          <path d="M10 22L22 10" strokeWidth="1.6" opacity="0.7" />
        </g>
      )
    case 'deliberation_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8V23" strokeWidth="1.6" />
          <path d="M10 11H22" strokeWidth="1.6" />
          <path d="M10 11L7.5 17H12.5L10 11Z" strokeWidth="1.4" />
          <path d="M22 11L19.5 17H24.5L22 11Z" strokeWidth="1.4" />
          <path d="M11.8 24.6H20.2" strokeWidth="1.6" />
        </g>
      )
    case 'leniency_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18C11.6 12.4 15 10 19.8 10C21.1 10 22.2 10.3 23 10.8C21.8 12.2 21.1 13.3 20.9 14.2C22.1 14.1 23.2 14.3 24.1 15C22.5 18.4 19.9 20.1 16.1 20.1C13.7 20.1 11.3 19.4 9 18Z" strokeWidth="1.5" />
          <path d="M9.3 18.2L6.9 20.6" strokeWidth="1.5" />
          <circle cx="16.5" cy="13.4" fill={color} r="0.9" stroke="none" />
        </g>
      )
    case 'jurisprudence_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 8.8H20.3L22.5 11.4V22.6H10Z" strokeWidth="1.6" />
          <path d="M20.3 8.8V11.4H22.5" strokeWidth="1.4" />
          <path d="M12.5 14H19.2" strokeWidth="1.2" />
          <path d="M12.5 17H19.2" strokeWidth="1.2" />
          <path d="M12.5 20H17" strokeWidth="1.2" />
        </g>
      )
    case 'balance_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 12H24" strokeWidth="1.8" />
          <path d="M10.5 12L16 8L21.5 12" strokeWidth="1.6" />
          <path d="M11.8 14.8V21.5" strokeWidth="1.4" />
          <path d="M16 14.8V21.5" strokeWidth="1.4" />
          <path d="M20.2 14.8V21.5" strokeWidth="1.4" />
          <path d="M9.5 22.8H22.5" strokeWidth="1.8" />
        </g>
      )
    case 'reconciliation_fragment':
      return (
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.2 16.3L12.2 13.5C13.2 12.6 14.6 12.6 15.6 13.5L17.1 14.9" strokeWidth="1.6" />
          <path d="M22.8 16.3L19.8 13.5C18.8 12.6 17.4 12.6 16.4 13.5L14.9 14.9" strokeWidth="1.6" />
          <path d="M8.8 16.3L12.4 19.9C13.4 20.9 15 20.9 16 19.9L17 18.9" strokeWidth="1.6" />
          <path d="M23.2 16.3L19.6 19.9C18.6 20.9 17 20.9 16 19.9L15 18.9" strokeWidth="1.6" />
        </g>
      )
  }
}

export function formatPerkUnlockCondition(traitId: TraitId, requiredLevel: number) {
  return `${TRAIT_UNLOCK_COPY[traitId]} Lv${requiredLevel}`
}
