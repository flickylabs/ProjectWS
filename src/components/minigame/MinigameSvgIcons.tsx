/**
 * 미니게임 전용 SVG 아이콘 — 이모지 대체용
 * PC/모바일 공용. 크기는 size prop으로 조절.
 */

interface IconProps {
  size?: number
  className?: string
  style?: React.CSSProperties
}

/** 성공 — 체크마크 원형 (기존 🎯 대체) */
export function IconSuccess({ size = 48, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} style={style}>
      <circle cx="24" cy="24" r="22" stroke="#5cc97a" strokeWidth="2.5" opacity="0.3" />
      <circle cx="24" cy="24" r="16" fill="#5cc97a" opacity="0.15" />
      <path d="M16 24.5L21.5 30L32 18" stroke="#5cc97a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** 실패 — 물음표 구름 (기존 💭 대체) */
export function IconFail({ size = 48, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} style={style}>
      <circle cx="24" cy="24" r="20" fill="#4e4e5c" opacity="0.15" />
      <circle cx="24" cy="24" r="20" stroke="#4e4e5c" strokeWidth="2" opacity="0.3" />
      <path d="M20 19c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.5-.8 2.8-2 3.5-.7.4-1.2 1.1-1.2 1.9V26" stroke="#8b8b9a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24.5" cy="30" r="1.5" fill="#8b8b9a" />
    </svg>
  )
}

/** 시간 초과 — 모래시계 (기존 ⏳ 대체) */
export function IconTimeout({ size = 48, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} style={style}>
      <path d="M16 8h16v8l-5.5 8L32 32v8H16v-8l5.5-8L16 16V8z" stroke="#e8c172" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M20 12h8v3l-4 5-4-5v-3z" fill="#e8c172" opacity="0.3" />
      <path d="M20 36h8v-3l-4-5-4 5v3z" fill="#e8c172" opacity="0.5" />
      <line x1="14" y1="8" x2="34" y2="8" stroke="#e8c172" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="40" x2="34" y2="40" stroke="#e8c172" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MatchingPuzzle 카드 앞면 SVG — 법정 테마 14종
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 카드 뒷면 (물음표) */
export function IconCardBack({ size = 36, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className} style={style}>
      <rect x="2" y="2" width="32" height="32" rx="6" stroke="#4e4e5c" strokeWidth="1.5" />
      <text x="18" y="22" textAnchor="middle" fontSize="16" fill="#4e4e5c" fontWeight="bold">?</text>
    </svg>
  )
}

type _CardIconId = typeof CARD_ICON_IDS[number]
export const CARD_ICON_IDS = [
  'scale', 'magnifier', 'clipboard', 'lock', 'briefcase', 'house', 'handshake',
  'flame', 'star', 'target', 'document', 'bolt', 'bulb', 'trophy',
] as const

/** 카드 앞면 아이콘 (14종) — index로 선택 */
export function CardIcon({ index, size = 36, className, style }: IconProps & { index: number }) {
  const paths = CARD_PATHS[index % CARD_PATHS.length]
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className} style={style}>
      {paths}
    </svg>
  )
}

const GOLD = '#d4a24e'
const GOLD_L = '#e8c172'

const CARD_PATHS: React.ReactNode[] = [
  // 0: scale (저울) — ⚖️
  <>
    <line x1="18" y1="6" x2="18" y2="18" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="12" x2="28" y2="12" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 12l-2 8h8l-2-8" stroke={GOLD_L} strokeWidth="1.5" fill={GOLD} opacity="0.2" />
    <path d="M28 12l-2 8h8l-2-8" stroke={GOLD_L} strokeWidth="1.5" fill={GOLD} opacity="0.2" />
    <line x1="12" y1="28" x2="24" y2="28" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
  </>,
  // 1: magnifier (돋보기) — 🔍
  <>
    <circle cx="16" cy="16" r="8" stroke={GOLD} strokeWidth="2" />
    <line x1="22" y1="22" x2="30" y2="30" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
  </>,
  // 2: clipboard (문서보드) — 📋
  <>
    <rect x="8" y="6" width="20" height="26" rx="3" stroke={GOLD} strokeWidth="2" />
    <rect x="14" y="3" width="8" height="6" rx="2" stroke={GOLD} strokeWidth="1.5" fill="rgba(12,12,20,0.9)" />
    <line x1="12" y1="16" x2="24" y2="16" stroke={GOLD_L} strokeWidth="1.5" opacity="0.5" />
    <line x1="12" y1="20" x2="22" y2="20" stroke={GOLD_L} strokeWidth="1.5" opacity="0.5" />
    <line x1="12" y1="24" x2="20" y2="24" stroke={GOLD_L} strokeWidth="1.5" opacity="0.5" />
  </>,
  // 3: lock (자물쇠) — 🔒
  <>
    <rect x="10" y="16" width="16" height="14" rx="3" stroke={GOLD} strokeWidth="2" />
    <path d="M14 16v-4a4 4 0 018 0v4" stroke={GOLD} strokeWidth="2" fill="none" />
    <circle cx="18" cy="23" r="2" fill={GOLD_L} />
  </>,
  // 4: briefcase (가방) — 💼
  <>
    <rect x="6" y="14" width="24" height="16" rx="3" stroke={GOLD} strokeWidth="2" />
    <path d="M14 14v-4a2 2 0 012-2h4a2 2 0 012 2v4" stroke={GOLD} strokeWidth="2" fill="none" />
    <line x1="6" y1="22" x2="30" y2="22" stroke={GOLD_L} strokeWidth="1.5" opacity="0.4" />
  </>,
  // 5: house (집) — 🏠
  <>
    <path d="M18 6L4 18h4v12h8v-8h4v8h8V18h4L18 6z" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" fill={GOLD} fillOpacity="0.1" />
  </>,
  // 6: handshake (악수) — 🤝
  <>
    <path d="M6 20l6-6 4 2 4-2 6 6" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 14l-6 2v8l4-2" stroke={GOLD_L} strokeWidth="1.5" opacity="0.6" />
    <path d="M24 14l6 2v8l-4-2" stroke={GOLD_L} strokeWidth="1.5" opacity="0.6" />
  </>,
  // 7: flame (불꽃) — 🔥
  <>
    <path d="M18 4c0 0-8 10-8 18a8 8 0 0016 0c0-8-8-18-8-18z" stroke={GOLD} strokeWidth="2" fill={GOLD} fillOpacity="0.15" />
    <path d="M18 14c0 0-3 4-3 8a3 3 0 006 0c0-4-3-8-3-8z" fill={GOLD_L} opacity="0.4" />
  </>,
  // 8: star (별) — ⭐
  <>
    <path d="M18 4l4.3 8.7 9.6 1.4-7 6.8 1.6 9.6L18 26l-8.5 4.5 1.6-9.6-7-6.8 9.6-1.4z" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" fill={GOLD} fillOpacity="0.15" />
  </>,
  // 9: target (과녁) — 🎯
  <>
    <circle cx="18" cy="18" r="12" stroke={GOLD} strokeWidth="1.5" />
    <circle cx="18" cy="18" r="8" stroke={GOLD_L} strokeWidth="1.5" opacity="0.6" />
    <circle cx="18" cy="18" r="4" stroke={GOLD} strokeWidth="1.5" />
    <circle cx="18" cy="18" r="1.5" fill={GOLD_L} />
  </>,
  // 10: document (서류) — 📄
  <>
    <path d="M10 4h12l6 6v20a2 2 0 01-2 2H10a2 2 0 01-2-2V6a2 2 0 012-2z" stroke={GOLD} strokeWidth="2" />
    <path d="M22 4v6h6" stroke={GOLD} strokeWidth="1.5" />
    <line x1="13" y1="16" x2="23" y2="16" stroke={GOLD_L} strokeWidth="1.5" opacity="0.5" />
    <line x1="13" y1="20" x2="21" y2="20" stroke={GOLD_L} strokeWidth="1.5" opacity="0.5" />
    <line x1="13" y1="24" x2="19" y2="24" stroke={GOLD_L} strokeWidth="1.5" opacity="0.5" />
  </>,
  // 11: bolt (번개) — ⚡
  <>
    <path d="M20 4L10 20h8l-2 12 12-18h-8l2-10z" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" fill={GOLD} fillOpacity="0.2" />
  </>,
  // 12: bulb (전구) — 💡
  <>
    <path d="M18 4a10 10 0 00-6 18v4h12v-4a10 10 0 00-6-18z" stroke={GOLD} strokeWidth="2" fill={GOLD} fillOpacity="0.1" />
    <line x1="14" y1="28" x2="22" y2="28" stroke={GOLD_L} strokeWidth="1.5" />
    <line x1="15" y1="31" x2="21" y2="31" stroke={GOLD_L} strokeWidth="1.5" />
    <circle cx="18" cy="14" r="2" fill={GOLD_L} opacity="0.5" />
  </>,
  // 13: trophy (트로피) — 🏆
  <>
    <path d="M12 6h12v6a6 6 0 01-12 0V6z" stroke={GOLD} strokeWidth="2" fill={GOLD} fillOpacity="0.15" />
    <path d="M12 8H8a2 2 0 00-2 2v2a4 4 0 004 4h2" stroke={GOLD_L} strokeWidth="1.5" opacity="0.6" />
    <path d="M24 8h4a2 2 0 012 2v2a4 4 0 01-4 4h-2" stroke={GOLD_L} strokeWidth="1.5" opacity="0.6" />
    <line x1="18" y1="18" x2="18" y2="24" stroke={GOLD} strokeWidth="2" />
    <rect x="13" y="24" width="10" height="4" rx="1" stroke={GOLD} strokeWidth="1.5" />
  </>,
]
