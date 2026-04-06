import type { EvidenceType, Reliability, Completeness } from '../../types/case'

interface EvidenceVisualProps {
  type: EvidenceType
  name: string
  description?: string
  reliability: Reliability
  completeness: Completeness
  highlighted?: boolean
  size?: 'sm' | 'md' | 'lg'
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 유형별 색상 팔레트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TYPE_COLORS: Record<EvidenceType, { bg: string; fg: string; accent: string; border: string }> = {
  bank:      { bg: '#0a2e1a', fg: '#86efac', accent: '#22c55e', border: '#166534' },
  chat:      { bg: '#0c1e3a', fg: '#93c5fd', accent: '#3b82f6', border: '#1e40af' },
  cctv:      { bg: '#1a1a1a', fg: '#a1a1aa', accent: '#71717a', border: '#3f3f46' },
  contract:  { bg: '#1c1510', fg: '#d6c4a5', accent: '#a68a5b', border: '#78593a' },
  testimony: { bg: '#1a0e2e', fg: '#c4b5fd', accent: '#8b5cf6', border: '#5b21b6' },
  log:       { bg: '#1c1308', fg: '#fdba74', accent: '#f97316', border: '#9a3412' },
  device:    { bg: '#0a1628', fg: '#7dd3fc', accent: '#0ea5e9', border: '#0369a1' },
  sns:       { bg: '#2a0e1e', fg: '#f9a8d4', accent: '#ec4899', border: '#9d174d' },
}

const TYPE_LABELS: Record<EvidenceType, string> = {
  bank: '금융 기록', chat: '메시지', cctv: '영상 기록', contract: '계약서',
  testimony: '진술서', log: '기록물', device: '디지털 기기', sns: 'SNS',
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 크기별 설정
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SIZE_CONFIG = {
  sm: { w: 40, h: 30, showName: false, showDesc: false, fontSize: 6 },
  md: { w: 160, h: 120, showName: true, showDesc: false, fontSize: 10 },
  lg: { w: 320, h: 240, showName: true, showDesc: true, fontSize: 12 },
} as const

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 유형별 SVG 배경 렌더러
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BankBg({ w, h, c }: { w: number; h: number; c: typeof TYPE_COLORS.bank }) {
  const rows = Math.floor(h * 0.5 / (h * 0.08))
  return (
    <g>
      {/* 명세서 상단 바 */}
      <rect x={w * 0.05} y={h * 0.08} width={w * 0.9} height={h * 0.12} rx={2} fill={c.accent} opacity={0.15} />
      {/* 카드 아이콘 */}
      <rect x={w * 0.08} y={h * 0.1} width={w * 0.15} height={h * 0.08} rx={1} fill={c.accent} opacity={0.4} />
      {/* 가로줄 (거래 행) */}
      {Array.from({ length: rows }, (_, i) => (
        <g key={i}>
          <line x1={w * 0.05} y1={h * 0.28 + i * h * 0.08} x2={w * 0.95} y2={h * 0.28 + i * h * 0.08}
            stroke={c.accent} strokeOpacity={0.15} strokeWidth={0.5} />
          {/* 금액 영역 */}
          <rect x={w * 0.65} y={h * 0.24 + i * h * 0.08} width={w * 0.25} height={h * 0.04} rx={1}
            fill={c.accent} opacity={0.08} />
        </g>
      ))}
    </g>
  )
}

function ChatBg({ w, h, c }: { w: number; h: number; c: typeof TYPE_COLORS.chat }) {
  return (
    <g>
      {/* 말풍선 1 (좌) */}
      <rect x={w * 0.05} y={h * 0.1} width={w * 0.55} height={h * 0.2} rx={h * 0.04} fill={c.accent} opacity={0.12} />
      <polygon points={`${w * 0.08},${h * 0.3} ${w * 0.05},${h * 0.36} ${w * 0.14},${h * 0.3}`} fill={c.accent} opacity={0.12} />
      {/* 말풍선 2 (우) */}
      <rect x={w * 0.35} y={h * 0.4} width={w * 0.6} height={h * 0.18} rx={h * 0.04} fill={c.accent} opacity={0.18} />
      <polygon points={`${w * 0.88},${h * 0.58} ${w * 0.95},${h * 0.64} ${w * 0.82},${h * 0.58}`} fill={c.accent} opacity={0.18} />
      {/* 말풍선 3 (좌) */}
      <rect x={w * 0.05} y={h * 0.68} width={w * 0.45} height={h * 0.16} rx={h * 0.04} fill={c.accent} opacity={0.1} />
    </g>
  )
}

function CctvBg({ w, h, c }: { w: number; h: number; c: typeof TYPE_COLORS.cctv }) {
  return (
    <g>
      {/* 모니터 프레임 */}
      <rect x={w * 0.03} y={h * 0.03} width={w * 0.94} height={h * 0.8} rx={3} fill="none"
        stroke={c.accent} strokeOpacity={0.3} strokeWidth={1.5} />
      {/* 스캔라인 */}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={0} y1={h * 0.1 + i * h * 0.12} x2={w} y2={h * 0.1 + i * h * 0.12}
          stroke={c.fg} strokeOpacity={0.04} strokeWidth={0.5} />
      ))}
      {/* REC 표시 */}
      <circle cx={w * 0.1} cy={h * 0.12} r={h * 0.025} fill="#ef4444" opacity={0.7} />
      <text x={w * 0.15} y={h * 0.135} fill="#ef4444" opacity={0.6} fontSize={h * 0.06} fontFamily="monospace">REC</text>
      {/* 타임스탬프 */}
      <text x={w * 0.55} y={h * 0.88} fill={c.fg} opacity={0.3} fontSize={h * 0.05} fontFamily="monospace">
        2024.03.15 14:32:07
      </text>
    </g>
  )
}

function ContractBg({ w, h, c }: { w: number; h: number; c: typeof TYPE_COLORS.contract }) {
  return (
    <g>
      {/* 문서 제목줄 */}
      <rect x={w * 0.2} y={h * 0.08} width={w * 0.6} height={h * 0.06} rx={1} fill={c.accent} opacity={0.2} />
      {/* 본문 줄 */}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={w * 0.1} y={h * 0.2 + i * h * 0.07} width={w * (0.6 + Math.random() * 0.2)} height={h * 0.02}
          rx={1} fill={c.fg} opacity={0.08} />
      ))}
      {/* 서명란 */}
      <line x1={w * 0.5} y1={h * 0.85} x2={w * 0.9} y2={h * 0.85} stroke={c.accent} strokeOpacity={0.25} strokeWidth={0.5} />
      <text x={w * 0.55} y={h * 0.93} fill={c.fg} opacity={0.15} fontSize={h * 0.04}>서명</text>
    </g>
  )
}

function TestimonyBg({ w, h, c }: { w: number; h: number; c: typeof TYPE_COLORS.testimony }) {
  return (
    <g>
      {/* 진술서 헤더 */}
      <rect x={w * 0.15} y={h * 0.06} width={w * 0.7} height={h * 0.1} rx={2} fill={c.accent} opacity={0.15} />
      <text x={w * 0.5} y={h * 0.13} textAnchor="middle" fill={c.fg} opacity={0.3} fontSize={h * 0.06} fontWeight="bold">
        진 술 서
      </text>
      {/* 인적사항 칸 */}
      <rect x={w * 0.08} y={h * 0.2} width={w * 0.84} height={h * 0.12} rx={1} fill={c.accent} opacity={0.06}
        stroke={c.accent} strokeOpacity={0.12} strokeWidth={0.5} />
      {/* 본문 줄 */}
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={w * 0.1} y={h * 0.38 + i * h * 0.08} width={w * (0.5 + Math.random() * 0.3)} height={h * 0.02}
          rx={1} fill={c.fg} opacity={0.07} />
      ))}
    </g>
  )
}

function LogBg({ w, h, c }: { w: number; h: number; c: typeof TYPE_COLORS.log }) {
  const rows = Math.floor(h * 0.65 / (h * 0.09))
  return (
    <g>
      {/* 표 헤더 */}
      <rect x={w * 0.05} y={h * 0.08} width={w * 0.9} height={h * 0.1} rx={2} fill={c.accent} opacity={0.12} />
      {/* 세로 구분선 */}
      <line x1={w * 0.25} y1={h * 0.08} x2={w * 0.25} y2={h * 0.08 + (rows + 1) * h * 0.09}
        stroke={c.accent} strokeOpacity={0.15} strokeWidth={0.5} />
      <line x1={w * 0.5} y1={h * 0.08} x2={w * 0.5} y2={h * 0.08 + (rows + 1) * h * 0.09}
        stroke={c.accent} strokeOpacity={0.15} strokeWidth={0.5} />
      {/* 가로 행 */}
      {Array.from({ length: rows }, (_, i) => (
        <line key={i} x1={w * 0.05} y1={h * 0.18 + i * h * 0.09} x2={w * 0.95} y2={h * 0.18 + i * h * 0.09}
          stroke={c.accent} strokeOpacity={0.1} strokeWidth={0.5} />
      ))}
    </g>
  )
}

function DeviceBg({ w, h, c }: { w: number; h: number; c: typeof TYPE_COLORS.device }) {
  return (
    <g>
      {/* 스마트폰 프레임 */}
      <rect x={w * 0.2} y={h * 0.05} width={w * 0.6} height={h * 0.85} rx={h * 0.06}
        fill="none" stroke={c.accent} strokeOpacity={0.25} strokeWidth={1.5} />
      {/* 스크린 */}
      <rect x={w * 0.24} y={h * 0.12} width={w * 0.52} height={h * 0.68} rx={2}
        fill={c.accent} opacity={0.06} />
      {/* 상단 노치 */}
      <rect x={w * 0.38} y={h * 0.07} width={w * 0.24} height={h * 0.03} rx={h * 0.015}
        fill={c.accent} opacity={0.15} />
      {/* 화면 내용 줄 */}
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={w * 0.28} y={h * 0.2 + i * h * 0.1} width={w * (0.3 + Math.random() * 0.14)} height={h * 0.025}
          rx={1} fill={c.fg} opacity={0.08} />
      ))}
      {/* 하단 바 */}
      <rect x={w * 0.38} y={h * 0.83} width={w * 0.24} height={h * 0.015} rx={h * 0.008}
        fill={c.accent} opacity={0.2} />
    </g>
  )
}

function SnsBg({ w, h, c }: { w: number; h: number; c: typeof TYPE_COLORS.sns }) {
  return (
    <g>
      {/* 포스트 카드 */}
      <rect x={w * 0.06} y={h * 0.06} width={w * 0.88} height={h * 0.88} rx={4}
        fill={c.accent} opacity={0.05} stroke={c.accent} strokeOpacity={0.12} strokeWidth={0.5} />
      {/* 프로필 영역 */}
      <circle cx={w * 0.15} cy={h * 0.16} r={h * 0.06} fill={c.accent} opacity={0.2} />
      <rect x={w * 0.24} y={h * 0.12} width={w * 0.3} height={h * 0.03} rx={1} fill={c.fg} opacity={0.12} />
      <rect x={w * 0.24} y={h * 0.17} width={w * 0.2} height={h * 0.02} rx={1} fill={c.fg} opacity={0.06} />
      {/* 본문 */}
      {Array.from({ length: 4 }, (_, i) => (
        <rect key={i} x={w * 0.1} y={h * 0.28 + i * h * 0.07} width={w * (0.5 + Math.random() * 0.25)} height={h * 0.02}
          rx={1} fill={c.fg} opacity={0.07} />
      ))}
      {/* 좋아요/댓글 바 */}
      <circle cx={w * 0.14} cy={h * 0.78} r={h * 0.025} fill={c.accent} opacity={0.2} />
      <circle cx={w * 0.26} cy={h * 0.78} r={h * 0.025} fill={c.accent} opacity={0.12} />
      <circle cx={w * 0.38} cy={h * 0.78} r={h * 0.025} fill={c.accent} opacity={0.08} />
    </g>
  )
}

const BG_RENDERERS: Record<EvidenceType, React.FC<{ w: number; h: number; c: typeof TYPE_COLORS.bank }>> = {
  bank: BankBg,
  chat: ChatBg,
  cctv: CctvBg,
  contract: ContractBg,
  testimony: TestimonyBg,
  log: LogBg,
  device: DeviceBg,
  sns: SnsBg,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// completeness 효과용 SVG defs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CompletenessEffects({ w, h, completeness, reliability, uid }: {
  w: number; h: number; completeness: Completeness; reliability: Reliability; uid: string
}) {
  const isHard = reliability === 'hard'

  return (
    <>
      <defs>
        {/* 찢어진 모서리 clip-path (soft + partial) */}
        {!isHard && completeness === 'partial' && (
          <clipPath id={`torn-${uid}`}>
            <polygon points={`
              0,0
              ${w},0
              ${w},${h * 0.75}
              ${w * 0.92},${h * 0.8}
              ${w * 0.95},${h * 0.85}
              ${w * 0.88},${h * 0.9}
              ${w * 0.9},${h * 0.95}
              ${w * 0.85},${h}
              0,${h}
            `} />
          </clipPath>
        )}
        {/* 빗금 패턴 (edited) */}
        {completeness === 'edited' && (
          <pattern id={`hatch-${uid}`} width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1={0} y1={0} x2={0} y2={6} stroke={isHard ? '#f59e0b' : '#ef4444'} strokeWidth={0.8} strokeOpacity={0.3} />
          </pattern>
        )}
      </defs>

      {/* edited: 빗금 오버레이 (일부 영역) */}
      {completeness === 'edited' && (
        <rect x={w * 0.4} y={h * 0.3} width={w * 0.5} height={h * 0.4}
          fill={`url(#hatch-${uid})`} />
      )}

      {/* context_missing: "?" 표시 */}
      {completeness === 'context_missing' && (
        <>
          <rect x={w * 0.6} y={h * 0.5} width={w * 0.35} height={h * 0.35} rx={3}
            fill="#000" opacity={0.3} />
          <text x={w * 0.775} y={h * 0.73} textAnchor="middle" fill="#fff" opacity={0.4}
            fontSize={h * 0.15} fontWeight="bold">?</text>
        </>
      )}

      {/* 원본 뱃지 (hard + original) */}
      {isHard && completeness === 'original' && w > 50 && (
        <g>
          <rect x={w * 0.7} y={h * 0.02} width={w * 0.28} height={h * 0.1} rx={2}
            fill="#22c55e" opacity={0.8} />
          <text x={w * 0.84} y={h * 0.085} textAnchor="middle" fill="#fff"
            fontSize={Math.max(h * 0.05, 7)} fontWeight="bold">원본</text>
        </g>
      )}
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 메인 컴포넌트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let uidCounter = 0

export default function EvidenceVisual({
  type, name, description, reliability, completeness, highlighted, size = 'md',
}: EvidenceVisualProps) {
  const config = SIZE_CONFIG[size]
  const { w, h } = config
  const c = TYPE_COLORS[type]
  const BgRenderer = BG_RENDERERS[type]

  // 고유 ID (SVG defs 충돌 방지)
  const uid = `ev-${++uidCounter}`

  // soft + partial => clip-path 적용
  const useTornClip = reliability === 'soft' && completeness === 'partial'
  // soft 계열 흐림 효과
  const isBlurry = reliability === 'soft' && (completeness === 'partial' || completeness === 'context_missing')

  const containerClass = [
    'inline-block rounded overflow-hidden flex-shrink-0',
    highlighted ? 'ring-2 ring-amber-500/60' : '',
    isBlurry ? 'opacity-80' : '',
  ].filter(Boolean).join(' ')

  // 테두리 스타일: hard=실선, soft=점선
  const borderStyle = reliability === 'hard' ? 'solid' : 'dashed'

  return (
    <div
      className={containerClass}
      style={{ width: w, height: h, border: `1px ${borderStyle} ${c.border}80` }}
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* 배경 */}
        <rect width={w} height={h} fill={c.bg} />

        {/* 유형별 배경 패턴 (clip 적용) */}
        <g clipPath={useTornClip ? `url(#torn-${uid})` : undefined}
          filter={isBlurry ? `url(#blur-${uid})` : undefined}>
          <BgRenderer w={w} h={h} c={c} />
        </g>

        {/* 블러 필터 */}
        {isBlurry && (
          <defs>
            <filter id={`blur-${uid}`}>
              <feGaussianBlur stdDeviation={1.2} />
            </filter>
          </defs>
        )}

        {/* completeness/reliability 효과 */}
        <CompletenessEffects w={w} h={h} completeness={completeness} reliability={reliability} uid={uid} />

        {/* 유형 라벨 (sm에서도 표시) */}
        {size === 'sm' && (
          <text x={w * 0.5} y={h * 0.65} textAnchor="middle" fill={c.fg} opacity={0.6}
            fontSize={Math.max(config.fontSize, 6)} fontWeight="bold">
            {TYPE_LABELS[type]}
          </text>
        )}

        {/* 증거명 (md, lg) */}
        {config.showName && (
          <text x={w * 0.5} y={h * 0.92} textAnchor="middle" fill={c.fg} opacity={0.7}
            fontSize={config.fontSize} fontWeight="600">
            {name.length > (size === 'md' ? 12 : 24) ? name.slice(0, size === 'md' ? 11 : 23) + '...' : name}
          </text>
        )}

        {/* 설명 (lg) */}
        {config.showDesc && description && (
          <text x={w * 0.5} y={h * 0.97} textAnchor="middle" fill={c.fg} opacity={0.4}
            fontSize={config.fontSize * 0.75}>
            {description.length > 40 ? description.slice(0, 39) + '...' : description}
          </text>
        )}

        {/* 강조 효과 */}
        {highlighted && (
          <rect width={w} height={h} fill="none" stroke="#f59e0b" strokeWidth={2} strokeOpacity={0.5} rx={2}>
            <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
          </rect>
        )}
      </svg>
    </div>
  )
}
