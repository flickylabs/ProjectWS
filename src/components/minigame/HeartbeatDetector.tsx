/**
 * 미니게임: 거짓말 탐지기
 * 원형 게이지가 회전하며 히트 존(12시 방향 ±30도)을 통과할 때 버튼을 눌러야 함.
 * 3번 연속 성공하면 통과. 실패 시 처음부터 다시.
 */
import { useState, useEffect, useRef, useCallback } from 'react'

interface Props {
  onSuccess: () => void
  onFail: () => void
  onWatchAd: () => void
}

const RADIUS = 80
const CENTER = 100
const HIT_ZONE_START = 330
const HIT_ZONE_END = 30   // wraps around 0
const SPEED = 180          // degrees per second
const TARGET_HITS = 3

function isInHitZone(angle: number): boolean {
  // 히트 존: 330~360 또는 0~30
  return angle >= HIT_ZONE_START || angle <= HIT_ZONE_END
}

/** 각도 → SVG 원 위의 좌표 (12시 방향이 0도, 시계방향) */
function polarToXY(angleDeg: number, r: number, cx: number, cy: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

/** SVG arc path: center(cx,cy), 반지름 r, startDeg~endDeg (시계방향, 12시=0) */
function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const start = polarToXY(startDeg, r, cx, cy)
  const end = polarToXY(endDeg, r, cx, cy)
  const span = ((endDeg - startDeg) + 360) % 360
  const largeArc = span > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

export default function HeartbeatDetector({ onSuccess, onFail, onWatchAd }: Props) {
  const [angle, setAngle] = useState(0)
  const [hits, setHits] = useState(0)
  const [phase, setPhase] = useState<'play' | 'result'>('play')
  const [result, setResult] = useState<'success' | 'fail' | null>(null)

  const angleRef = useRef(0)
  const hitsRef = useRef(0)
  const phaseRef = useRef<'play' | 'result'>('play')
  const lastTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  // RAF 애니메이션 루프
  useEffect(() => {
    if (phase !== 'play') return

    const tick = (now: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now
      const dt = (now - lastTimeRef.current) / 1000
      lastTimeRef.current = now

      angleRef.current = (angleRef.current + SPEED * dt) % 360
      setAngle(angleRef.current)

      if (phaseRef.current === 'play') {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      lastTimeRef.current = null
    }
  }, [phase])

  const handleTap = useCallback(() => {
    if (phaseRef.current !== 'play') return

    if (isInHitZone(angleRef.current)) {
      const newHits = hitsRef.current + 1
      hitsRef.current = newHits
      setHits(newHits)
      if (newHits >= TARGET_HITS) {
        phaseRef.current = 'result'
        setPhase('result')
        setResult('success')
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      }
    } else {
      // 실패 — 리셋
      hitsRef.current = 0
      setHits(0)
      phaseRef.current = 'result'
      setPhase('result')
      setResult('fail')
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleRetry = useCallback(() => {
    hitsRef.current = 0
    angleRef.current = 0
    lastTimeRef.current = null
    setHits(0)
    setAngle(0)
    setResult(null)
    phaseRef.current = 'play'
    setPhase('play')
  }, [])

  // 현재 점(빨간 점) 좌표
  const dotPos = polarToXY(angle, RADIUS, CENTER, CENTER)
  // 히트존 arc
  const hitArc = arcPath(CENTER, CENTER, RADIUS, HIT_ZONE_START, HIT_ZONE_END + 360) // 330→390(=30)

  // 심장 크기: hits에 따라 커짐
  const heartSize = 28 + hits * 8

  if (phase === 'result') {
    return (
      <div
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 16, padding: 24, userSelect: 'none',
        }}
      >
        {result === 'success' ? (
          <>
            <div style={{ fontSize: 32 }}>🎯</div>
            <p style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>거짓말을 간파했다!</p>
            <button
              onClick={onSuccess}
              style={{
                padding: '10px 28px', borderRadius: 8, border: 'none',
                background: '#4caf50', color: '#fff', fontSize: 16, cursor: 'pointer',
              }}
            >
              계속하기
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 32 }}>💭</div>
            <p style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>놓쳤다...</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleRetry}
                style={{
                  padding: '10px 20px', borderRadius: 8, border: 'none',
                  background: '#2196f3', color: '#fff', fontSize: 15, cursor: 'pointer',
                }}
              >
                다시 시도
              </button>
              <button
                onClick={onWatchAd}
                style={{
                  padding: '10px 20px', borderRadius: 8, border: 'none',
                  background: '#ff9800', color: '#fff', fontSize: 15, cursor: 'pointer',
                }}
              >
                광고 보기
              </button>
              <button
                onClick={onFail}
                style={{
                  padding: '10px 20px', borderRadius: 8, border: 'none',
                  background: '#9e9e9e', color: '#fff', fontSize: 15, cursor: 'pointer',
                }}
              >
                포기
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)', userSelect: 'none' }}>
      {/* 포기 버튼 */}
      <div className="absolute top-4 right-4">
        <button onClick={onFail} className="text-xs text-gray-500 hover:text-gray-300 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700">✕ 포기</button>
      </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 24 }}>
      {/* 원형 SVG 게이지 */}
      <div
        onClick={handleTap}
        style={{ cursor: 'pointer', touchAction: 'manipulation' }}
        role="button"
        aria-label="탐지 버튼"
      >
        <svg width={CENTER * 2} height={CENTER * 2} style={{ overflow: 'visible' }}>
          {/* 배경 원 */}
          <circle
            cx={CENTER} cy={CENTER} r={RADIUS}
            fill="none" stroke="#e0e0e0" strokeWidth={8}
          />
          {/* 히트 존 (초록 arc) */}
          <path
            d={hitArc}
            fill="none" stroke="#4caf50" strokeWidth={10}
            strokeLinecap="round"
          />
          {/* 현재 위치 (빨간 점) */}
          <circle
            cx={dotPos.x} cy={dotPos.y} r={7}
            fill="#f44336"
          />
          {/* 가운데 심장 */}
          <text
            x={CENTER} y={CENTER + heartSize * 0.35}
            textAnchor="middle"
            fontSize={heartSize}
            style={{ userSelect: 'none' }}
          >
            ❤️
          </text>
        </svg>
      </div>

      {/* 안내 텍스트 */}
      <p style={{ margin: 0, fontSize: 15, color: '#555' }}>
        초록 구간에서 탭하세요! {hits}/{TARGET_HITS}
      </p>
      <p style={{ margin: 0, fontSize: 13, color: '#888' }}>
        3번 맞추세요! {hits}/{TARGET_HITS}
      </p>

      {/* 히트 인디케이터 */}
      <div style={{ display: 'flex', gap: 8 }}>
        {Array.from({ length: TARGET_HITS }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 16, height: 16, borderRadius: '50%',
              background: i < hits ? '#4caf50' : '#e0e0e0',
              border: '2px solid #bdbdbd',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
    </div>
  )
}
