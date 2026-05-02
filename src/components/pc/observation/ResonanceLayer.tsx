import { useEffect, useState, type CSSProperties } from 'react'
import { useGameStore, useStore } from '../../../store/useGameStore'
import type { AuraRequest, ResonanceRequest } from '../../../store/slices/judgeObservationSlice'

/**
 * ResonanceLayer
 * ──────────────
 * 공명선/흡수선 오버레이. 의미가 강한 항목은 번개, 보관/추가 항목은
 * 부드러운 흡수선으로 목적지를 분리해 보여준다.
 */

const BOLT_DURATION_MS = 1200
const FLOW_DURATION_MS = 1250
const AURA_DURATION_MS = 1700

export default function ResonanceLayer() {
  const requests = useStore((s) => s.pendingResonances ?? [])
  const auras = useStore((s) => s.pendingAuras ?? [])

  if (requests.length === 0 && auras.length === 0) return null

  return (
    <svg className="pc-resonance-layer" aria-hidden="true">
      {auras.map((req) => (
        <AuraBolt key={req.id} request={req} />
      ))}
      {requests.map((req) => (
        <ResonanceBolt key={req.id} request={req} />
      ))}
    </svg>
  )
}

/** 요소 주변을 감싸는 3-겹 번개 테두리 */
function AuraBolt({ request }: { request: AuraRequest }) {
  const [paths, setPaths] = useState<string[] | null>(null)
  const style = request.style ?? 'electric'

  useEffect(() => {
    const el = document.querySelector(request.targetSelector) as HTMLElement | null
    if (!el) {
      useGameStore.getState().dismissAura(request.id)
      return
    }
    const rect = el.getBoundingClientRect()
    setPaths(style === 'electric'
      ? [
          buildAuraRect(rect, 5, 3),
          buildAuraRect(rect, 9, 5),
          buildAuraRect(rect, 13, 7),
        ]
      : [
          buildAuraSmoothRect(rect, 7),
          buildAuraSmoothRect(rect, 13),
        ])
    const timer = window.setTimeout(() => {
      useGameStore.getState().dismissAura(request.id)
    }, AURA_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [request.id, request.targetSelector, style])

  if (!paths) return null
  return (
    <g className={`pc-aura-group is-${style}`}>
      {paths.map((d, i) => (
        <path key={i} className={`pc-aura-bolt pc-aura-bolt--layer-${i}`} d={d} />
      ))}
    </g>
  )
}

/** 사각형 rect 주변을 offset만큼 바깥으로 감싸는 zigzag polygon 생성 */
function buildAuraRect(rect: DOMRect, offset: number, amp: number): string {
  const left = rect.left - offset
  const right = rect.right + offset
  const top = rect.top - offset
  const bottom = rect.bottom + offset
  const segPerSide = 8
  const rand = (): number => (Math.random() * 2 - 1) * amp

  let d = `M ${left.toFixed(1)} ${top.toFixed(1)}`
  // top edge (좌→우)
  for (let i = 1; i < segPerSide; i += 1) {
    const t = i / segPerSide
    const x = left + (right - left) * t
    const y = top + rand()
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  d += ` L ${right.toFixed(1)} ${top.toFixed(1)}`
  // right edge (상→하)
  for (let i = 1; i < segPerSide; i += 1) {
    const t = i / segPerSide
    const x = right + rand()
    const y = top + (bottom - top) * t
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  d += ` L ${right.toFixed(1)} ${bottom.toFixed(1)}`
  // bottom edge (우→좌)
  for (let i = 1; i < segPerSide; i += 1) {
    const t = i / segPerSide
    const x = right - (right - left) * t
    const y = bottom + rand()
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  d += ` L ${left.toFixed(1)} ${bottom.toFixed(1)}`
  // left edge (하→상)
  for (let i = 1; i < segPerSide; i += 1) {
    const t = i / segPerSide
    const x = left + rand()
    const y = bottom - (bottom - top) * t
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  d += ' Z'
  return d
}

function buildAuraSmoothRect(rect: DOMRect, offset: number): string {
  const left = rect.left - offset
  const right = rect.right + offset
  const top = rect.top - offset
  const bottom = rect.bottom + offset
  const radius = Math.min(18, Math.max(8, Math.min(rect.width, rect.height) * 0.12))
  return [
    `M ${(left + radius).toFixed(1)} ${top.toFixed(1)}`,
    `L ${(right - radius).toFixed(1)} ${top.toFixed(1)}`,
    `Q ${right.toFixed(1)} ${top.toFixed(1)} ${right.toFixed(1)} ${(top + radius).toFixed(1)}`,
    `L ${right.toFixed(1)} ${(bottom - radius).toFixed(1)}`,
    `Q ${right.toFixed(1)} ${bottom.toFixed(1)} ${(right - radius).toFixed(1)} ${bottom.toFixed(1)}`,
    `L ${(left + radius).toFixed(1)} ${bottom.toFixed(1)}`,
    `Q ${left.toFixed(1)} ${bottom.toFixed(1)} ${left.toFixed(1)} ${(bottom - radius).toFixed(1)}`,
    `L ${left.toFixed(1)} ${(top + radius).toFixed(1)}`,
    `Q ${left.toFixed(1)} ${top.toFixed(1)} ${(left + radius).toFixed(1)} ${top.toFixed(1)}`,
    'Z',
  ].join(' ')
}

interface BoltPath {
  d: string
  length: number
}

function ResonanceBolt({ request }: { request: ResonanceRequest }) {
  const [path, setPath] = useState<BoltPath | null>(null)
  const style = request.style ?? 'lightning'

  useEffect(() => {
    // 렌더 직후 타겟 요소들 bounding rect 계산
    const fromEl = document.querySelector(request.fromSelector) as HTMLElement | null
    const toEl = document.querySelector(request.toSelector) as HTMLElement | null

    if (!fromEl || !toEl) {
      // 타겟 없으면 즉시 정리
      useGameStore.getState().dismissResonance(request.id)
      return
    }

    const fromRect = fromEl.getBoundingClientRect()
    const toRect = toEl.getBoundingClientRect()
    const fromCx = fromRect.left + fromRect.width / 2
    const fromCy = fromRect.top + fromRect.height / 2
    const toCx = toRect.left + toRect.width / 2
    const toCy = toRect.top + toRect.height / 2

    // 테두리 교차점 — 중심 관통 대신 각 요소의 가장자리에서 시작/끝
    const [x1, y1] = edgePointToward(fromRect, toCx, toCy)
    const [x2, y2] = edgePointToward(toRect, fromCx, fromCy)

    setPath(style === 'lightning' ? buildJaggedPath(x1, y1, x2, y2) : buildCurvedPath(x1, y1, x2, y2))

    const timer = window.setTimeout(() => {
      useGameStore.getState().dismissResonance(request.id)
    }, style === 'lightning' ? BOLT_DURATION_MS : FLOW_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [request.id, request.fromSelector, request.toSelector, style])

  if (!path) return null

  const pathStyle = {
    '--path-length': `${path.length}`,
    strokeDasharray: `${path.length}`,
    strokeDashoffset: `${path.length}`,
  } as CSSProperties
  const sparkStyle = {
    '--path-length': `${path.length}`,
  } as CSSProperties

  if (style !== 'lightning') {
    return (
      <g className={`pc-resonance-flow is-${style}`}>
        <path className="pc-resonance-flow__track" d={path.d} />
        <path className="pc-resonance-flow__core" d={path.d} style={pathStyle} />
        <path className="pc-resonance-flow__spark" d={path.d} style={sparkStyle} />
      </g>
    )
  }

  return (
    <g className="pc-resonance-bolt-group">
      <path
        className="pc-resonance-bolt"
        d={path.d}
        style={pathStyle}
      />
    </g>
  )
}

/** rect 중심에서 (towardX, towardY) 방향으로 뻗어 rect 경계와 만나는 점 (rect 가장자리) */
function edgePointToward(rect: DOMRect, towardX: number, towardY: number): [number, number] {
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = towardX - cx
  const dy = towardY - cy
  if (dx === 0 && dy === 0) return [cx, cy]
  const halfW = rect.width / 2
  const halfH = rect.height / 2
  const absDx = Math.abs(dx) || 1e-6
  const absDy = Math.abs(dy) || 1e-6
  const tx = halfW / absDx
  const ty = halfH / absDy
  const t = Math.min(tx, ty)
  return [cx + dx * t, cy + dy * t]
}

/**
 * 진짜 번개 같은 zigzag 생성.
 * - steps 7~9 (너무 촘촘하지 않게, segment가 길어 굴곡이 뚜렷)
 * - jitter 좌우 번갈아 (기본 zigzag 패턴) + 랜덤 강도 증폭
 * - 가끔 강한 spike (전체 3~4개 구간 중 1곳 극단)
 * - 경로 방향축을 따라 위치도 약간 앞뒤로 흔들어 각진 kink 느낌
 */
function buildJaggedPath(x1: number, y1: number, x2: number, y2: number): BoltPath {
  const totalLen = Math.hypot(x2 - x1, y2 - y1)
  const steps = Math.max(6, Math.min(10, Math.round(totalLen / 80)))
  const dx = (x2 - x1) / steps
  const dy = (y2 - y1) / steps
  const angle = Math.atan2(dy, dx)
  const perpX = Math.cos(angle + Math.PI / 2)
  const perpY = Math.sin(angle + Math.PI / 2)
  const alongX = Math.cos(angle)
  const alongY = Math.sin(angle)

  let d = `M ${x1.toFixed(1)} ${y1.toFixed(1)}`
  let length = 0
  let prevX = x1
  let prevY = y1
  // 강한 튐 1곳 (이전보다 완만)
  const spikeIndex = 1 + Math.floor(Math.random() * (steps - 2))

  for (let i = 1; i < steps; i += 1) {
    const baseX = x1 + dx * i
    const baseY = y1 + dy * i
    const sign = i % 2 === 0 ? 1 : -1
    const baseMag = 7 + Math.random() * 8 // 7~15 (이전 12~26의 중간)
    const spikeBoost = i === spikeIndex ? 6 + Math.random() * 6 : 0 // spike +6~12
    const perpOffset = sign * (baseMag + spikeBoost) + (Math.random() * 4 - 2)
    const alongOffset = (Math.random() * 8 - 4) // 축 방향 ±4
    const nx = baseX + perpX * perpOffset + alongX * alongOffset
    const ny = baseY + perpY * perpOffset + alongY * alongOffset
    d += ` L ${nx.toFixed(1)} ${ny.toFixed(1)}`
    length += Math.hypot(nx - prevX, ny - prevY)
    prevX = nx
    prevY = ny
  }
  d += ` L ${x2.toFixed(1)} ${y2.toFixed(1)}`
  length += Math.hypot(x2 - prevX, y2 - prevY)

  return { d, length: Math.ceil(length) }
}

function buildCurvedPath(x1: number, y1: number, x2: number, y2: number): BoltPath {
  const dx = x2 - x1
  const dy = y2 - y1
  const distance = Math.hypot(dx, dy)
  const bend = Math.min(140, Math.max(36, distance * 0.18))
  const angle = Math.atan2(dy, dx)
  const perpX = Math.cos(angle + Math.PI / 2)
  const perpY = Math.sin(angle + Math.PI / 2)
  const c1x = x1 + dx * 0.34 + perpX * bend
  const c1y = y1 + dy * 0.34 + perpY * bend
  const c2x = x1 + dx * 0.72 + perpX * bend * 0.45
  const c2y = y1 + dy * 0.72 + perpY * bend * 0.45
  const d = [
    `M ${x1.toFixed(1)} ${y1.toFixed(1)}`,
    `C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`,
  ].join(' ')
  return { d, length: Math.ceil(distance * 1.2) }
}
