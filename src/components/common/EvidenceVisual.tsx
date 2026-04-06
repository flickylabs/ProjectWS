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
// 유형별 SVG 매핑
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const EVIDENCE_SVG_MAP: Record<EvidenceType, string> = {
  bank:      '/evidence/bank_statement.svg',
  chat:      '/evidence/chat_messenger.svg',
  cctv:      '/evidence/cctv_capture.svg',
  contract:  '/evidence/contract_agreement.svg',
  testimony: '/evidence/testimony_statement.svg',
  log:       '/evidence/log_record.svg',
  device:    '/evidence/device_phone.svg',
  sns:       '/evidence/sns_post.svg',
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 유형별 색상 팔레트 (테두리/텍스트용)
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
// 메인 컴포넌트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function EvidenceVisual({
  type, name, description, reliability, completeness, highlighted, size = 'md',
}: EvidenceVisualProps) {
  const config = SIZE_CONFIG[size]
  const { w, h } = config
  const c = TYPE_COLORS[type]

  const isHard = reliability === 'hard'
  const isSoft = reliability === 'soft'

  // ── CSS filter 결정 ──
  const filters: string[] = []
  if (completeness === 'edited') filters.push('contrast(0.8)')
  if (isSoft && completeness === 'partial') filters.push('blur(1px)')
  if (isSoft && completeness === 'context_missing') filters.push('blur(1.5px)')

  // ── clip-path: 찢어진 모서리 (soft + partial) ──
  const useTornClip = isSoft && completeness === 'partial'
  const tornClipPath = useTornClip
    ? 'polygon(0 0, 100% 0, 100% 75%, 92% 80%, 95% 85%, 88% 90%, 90% 95%, 85% 100%, 0 100%)'
    : undefined

  // ── 테두리 스타일 ──
  const borderStyle = isHard ? 'solid' : 'dashed'

  // ── 컨테이너 클래스 ──
  const containerClass = [
    'inline-block rounded overflow-hidden flex-shrink-0 relative',
    highlighted ? 'ring-2 ring-amber-500/60 animate-pulse' : '',
    isSoft && (completeness === 'partial' || completeness === 'context_missing') ? 'opacity-80' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={containerClass}
      style={{
        width: w,
        height: h,
        border: `1px ${borderStyle} ${c.border}80`,
        backgroundColor: c.bg,
      }}
    >
      {/* SVG 이미지 */}
      <img
        src={EVIDENCE_SVG_MAP[type]}
        alt={TYPE_LABELS[type]}
        width={w}
        height={h}
        draggable={false}
        style={{
          display: 'block',
          width: w,
          height: h,
          objectFit: 'cover',
          filter: filters.length > 0 ? filters.join(' ') : undefined,
          clipPath: tornClipPath,
        }}
      />

      {/* edited: 빗금 오버레이 */}
      {completeness === 'edited' && (
        <div
          style={{
            position: 'absolute',
            left: '40%', top: '25%',
            width: '50%', height: '40%',
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 3px,
              ${isHard ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'} 3px,
              ${isHard ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'} 4px
            )`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* context_missing: "?" 오버레이 */}
      {completeness === 'context_missing' && (
        <div
          style={{
            position: 'absolute',
            right: '5%', bottom: '15%',
            width: '35%', height: '35%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 3,
            pointerEvents: 'none',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: h * 0.15, fontWeight: 'bold' }}>?</span>
        </div>
      )}

      {/* 원본 뱃지 (hard + original, md/lg만) */}
      {isHard && completeness === 'original' && w > 50 && (
        <div
          style={{
            position: 'absolute',
            top: 2, right: 2,
            padding: '1px 6px',
            backgroundColor: 'rgba(34,197,94,0.8)',
            borderRadius: 2,
            color: '#fff',
            fontSize: Math.max(h * 0.05, 7),
            fontWeight: 'bold',
            lineHeight: 1.6,
            pointerEvents: 'none',
          }}
        >
          원본
        </div>
      )}

      {/* 유형 라벨 (sm) */}
      {size === 'sm' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: c.fg,
            opacity: 0.6,
            fontSize: Math.max(config.fontSize, 6),
            fontWeight: 'bold',
            pointerEvents: 'none',
          }}
        >
          {TYPE_LABELS[type]}
        </div>
      )}

      {/* 증거명 (md, lg) */}
      {config.showName && (
        <div
          style={{
            position: 'absolute',
            bottom: config.showDesc && description ? '8%' : '2%',
            left: 0, right: 0,
            textAlign: 'center',
            color: c.fg,
            opacity: 0.7,
            fontSize: config.fontSize,
            fontWeight: 600,
            pointerEvents: 'none',
            textShadow: `0 1px 3px ${c.bg}`,
          }}
        >
          {name.length > (size === 'md' ? 12 : 24) ? name.slice(0, size === 'md' ? 11 : 23) + '...' : name}
        </div>
      )}

      {/* 설명 (lg) */}
      {config.showDesc && description && (
        <div
          style={{
            position: 'absolute',
            bottom: '1%',
            left: 0, right: 0,
            textAlign: 'center',
            color: c.fg,
            opacity: 0.4,
            fontSize: config.fontSize * 0.75,
            pointerEvents: 'none',
            textShadow: `0 1px 3px ${c.bg}`,
          }}
        >
          {description.length > 40 ? description.slice(0, 39) + '...' : description}
        </div>
      )}

      {/* 강조 효과 (amber ring 애니메이션) — ring은 tailwind로 처리, 여기는 내부 glow */}
      {highlighted && (
        <div
          className="animate-pulse"
          style={{
            position: 'absolute',
            inset: 0,
            border: '2px solid rgba(245,158,11,0.5)',
            borderRadius: 2,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}
