import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { useStore } from '../../../store/useGameStore'
import {
  playMoleHit,
  playMoleMiss,
  playMoleBossHit,
  playMoleEscape,
  playTimerWarning,
  playMiniGameSuccess,
  playMiniGameFail,
} from '../../../engine/soundEngine'

type MoleKind = 'criminal' | 'civilian' | 'boss'
type MolePhase = 'visible' | 'hit' | 'escaping'
type PlayState = 'running' | 'failed' | 'success'

interface RoundProfile {
  rows: number
  cols: number
  target: number
  durationMs: number
  stayMs: number
  weights: Record<MoleKind, number>
}

interface ActiveMole {
  id: number
  holeIndex: number
  kind: MoleKind
  phase: MolePhase
}

interface HoleEffect {
  id: number
  holeIndex: number
  tone: MoleKind
  label: string
}

interface FloatingFeedback {
  id: number
  tone: MoleKind
  text: string
}

interface HammerCursor {
  x: number
  y: number
  visible: boolean
  swingTick: number
}

interface ImpactMarker {
  id: number
  x: number
  y: number
  tone: MoleKind
}

const ROUND_PROFILES: Record<number, RoundProfile> = {
  1: { rows: 3, cols: 3, target: 10, durationMs: 30_000, stayMs: 750, weights: { criminal: 80, civilian: 20, boss: 0 } },
  2: { rows: 3, cols: 3, target: 14, durationMs: 25_000, stayMs: 600, weights: { criminal: 80, civilian: 20, boss: 0 } },
  3: { rows: 4, cols: 3, target: 18, durationMs: 25_000, stayMs: 500, weights: { criminal: 60, civilian: 25, boss: 15 } },
  4: { rows: 4, cols: 3, target: 22, durationMs: 20_000, stayMs: 400, weights: { criminal: 60, civilian: 25, boss: 15 } },
  5: { rows: 4, cols: 4, target: 26, durationMs: 20_000, stayMs: 300, weights: { criminal: 45, civilian: 40, boss: 15 } },
}

const FEEDBACK_LABELS: Record<MoleKind, string> = {
  criminal: '범인 제압 +1',
  civilian: '시민 오인 타격 -2',
  boss: '보스 범인 제압 +3',
}

const EFFECT_LABELS: Record<MoleKind, string> = {
  criminal: '+1',
  civilian: '-2',
  boss: '+3',
}

const SCORE_BY_KIND: Record<MoleKind, number> = {
  criminal: 1,
  civilian: -2,
  boss: 3,
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function chooseWeightedKind(weights: Record<MoleKind, number>): MoleKind {
  const total = weights.criminal + weights.civilian + weights.boss
  let roll = Math.random() * total
  const orderedKinds: MoleKind[] = ['criminal', 'civilian', 'boss']

  for (const kind of orderedKinds) {
    roll -= weights[kind]
    if (roll <= 0) return kind
  }

  return 'criminal'
}

function chooseHole(total: number, lastHole: number | null): number {
  if (total <= 1) return 0

  let next = randomBetween(0, total - 1)
  if (lastHole === null) return next

  while (next === lastHole) {
    next = randomBetween(0, total - 1)
  }

  return next
}

function formatClock(timeLeftMs: number): string {
  const seconds = timeLeftMs / 1000
  if (seconds <= 10) return `${seconds.toFixed(1)}초`
  return `${Math.ceil(seconds)}초`
}

function MoleFigure({ kind }: { kind: MoleKind }) {
  const isBoss = kind === 'boss'
  const isCivilian = kind === 'civilian'

  return (
    <svg viewBox="0 0 120 120" className="pc-whack-a-mole__mole-svg" aria-hidden="true">
      {isBoss ? (
        <>
          <ellipse cx="60" cy="100" rx="30" ry="8" fill="rgba(212,162,78,0.36)" />
          <circle cx="60" cy="58" r="40" fill="none" stroke="#d4a24e" strokeWidth="6" />
        </>
      ) : null}
      <ellipse cx="60" cy="102" rx="28" ry="7" fill={isCivilian ? 'rgba(91,141,239,0.22)' : 'rgba(0,0,0,0.22)'} />
      <path d="M26 68c0-22 15-40 34-40s34 18 34 40v19H26V68Z" fill={isCivilian ? '#5b8def' : '#111318'} />
      <ellipse cx="60" cy="41" rx="24" ry="23" fill={isCivilian ? '#74a7ff' : '#17191f'} />
      <path d="M37 79h46v8H37z" fill={isCivilian ? '#82b3ff' : '#f4f4f4'} opacity={isCivilian ? 0.18 : 0.85} />
      <path d="M37 67h46v8H37z" fill={isCivilian ? '#82b3ff' : '#f4f4f4'} opacity={isCivilian ? 0.16 : 0.85} />
      <path d="M46 82h6V60h-6zm22 0h6V60h-6z" fill={isCivilian ? '#9dc2ff' : '#121212'} opacity={isCivilian ? 0.25 : 0.9} />
      <path d="M34 66c-9-2-12 10-8 14 5 5 11 1 12-3m48-11c9-2 12 10 8 14-5 5-11 1-12-3" fill="none" stroke={isCivilian ? '#5b8def' : '#111318'} strokeWidth="10" strokeLinecap="round" />
      <circle cx="51" cy="39" r="4" fill={isCivilian ? '#0f244f' : '#ff4d5f'} />
      <circle cx="69" cy="39" r="4" fill={isCivilian ? '#0f244f' : '#ff4d5f'} />
      {isCivilian ? (
        <path d="M49 52c5 5 17 5 22 0" fill="none" stroke="#17316c" strokeWidth="4" strokeLinecap="round" />
      ) : (
        <path d="M48 52c4-3 20-3 24 0" fill="none" stroke="#8d949f" strokeWidth="4" strokeLinecap="round" />
      )}
      {isBoss ? (
        <path d="M40 21 52 8l8 8 8-8 12 13" fill="none" stroke="#f5d27d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      ) : null}
    </svg>
  )
}

function ImpactParticles({ tone }: { tone: MoleKind }) {
  const stroke = tone === 'boss' ? '#f1d274' : tone === 'civilian' ? '#ff8e8e' : '#ff5d6c'
  const fill = tone === 'boss' ? 'rgba(241,210,116,0.28)' : 'rgba(255,255,255,0.14)'

  return (
    <svg viewBox="0 0 120 120" className="pc-whack-a-mole__impact-svg" aria-hidden="true">
      <circle cx="60" cy="60" r="16" fill={fill} />
      <path d="M60 11v18M60 91v18M11 60h18M91 60h18M29 29l12 12M79 79l12 12M91 29 79 41M29 91l12-12" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
      <circle cx="37" cy="52" r="4" fill={stroke} />
      <circle cx="84" cy="47" r="4" fill={stroke} />
      <circle cx="45" cy="83" r="4" fill={stroke} />
      <circle cx="74" cy="78" r="4" fill={stroke} />
    </svg>
  )
}

function HammerGraphic() {
  return (
    <svg viewBox="0 0 96 96" className="pc-whack-a-mole__hammer-svg" aria-hidden="true">
      <path d="M55 18c5-5 16-3 21 2s7 15 2 20l-9 9-23-23 9-8Z" fill="#c9ced7" />
      <path d="m62 26 11 11" stroke="#8f97a3" strokeWidth="7" strokeLinecap="round" />
      <path d="M22 58c2-2 6-2 8 0l8 8c2 2 2 6 0 8L20 92c-2 2-6 2-8 0l-8-8c-2-2-2-6 0-8l18-18Z" fill="#8a5a2d" />
      <path d="M16 66 30 80" stroke="rgba(255,255,255,0.35)" strokeWidth="5" strokeLinecap="round" />
      <path d="M39 55 57 37" stroke="#a86f38" strokeWidth="10" strokeLinecap="round" />
    </svg>
  )
}

export default function WhackAMoleGame() {
  const activeMinigame = useStore((s) => s.activeMinigame)
  const completeMinigame = useStore((s) => s.completeMinigame)
  const cancelMinigame = useStore((s) => s.cancelMinigame)

  const round = activeMinigame?.round ?? 1
  const profile = ROUND_PROFILES[round] ?? ROUND_PROFILES[1]
  const totalHoles = profile.rows * profile.cols
  const holeIndices = useMemo(() => Array.from({ length: totalHoles }, (_, index) => index), [totalHoles])

  const [playState, setPlayState] = useState<PlayState>('running')
  const [score, setScore] = useState(0)
  const [timeLeftMs, setTimeLeftMs] = useState(profile.durationMs)
  const [activeMole, setActiveMole] = useState<ActiveMole | null>(null)
  const [holeEffects, setHoleEffects] = useState<HoleEffect[]>([])
  const [feedback, setFeedback] = useState<FloatingFeedback | null>(null)
  const [cursor, setCursor] = useState<HammerCursor>({ x: 0, y: 0, visible: false, swingTick: 0 })
  const [impactMarker, setImpactMarker] = useState<ImpactMarker | null>(null)
  const [dangerPulse, setDangerPulse] = useState(0)
  const [goldPulse, setGoldPulse] = useState(0)
  const [shakePulse, setShakePulse] = useState(0)

  const playfieldRef = useRef<HTMLDivElement | null>(null)
  const lastHoleRef = useRef<number | null>(null)
  const nextIdRef = useRef(1)
  const transientTimeoutsRef = useRef<number[]>([])

  const clearTransientTimeouts = useCallback(() => {
    for (const timeoutId of transientTimeoutsRef.current) {
      window.clearTimeout(timeoutId)
    }
    transientTimeoutsRef.current = []
  }, [])

  const scheduleTransient = useCallback((task: () => void, delay: number) => {
    const timeoutId = window.setTimeout(() => {
      transientTimeoutsRef.current = transientTimeoutsRef.current.filter((id) => id !== timeoutId)
      task()
    }, delay)
    transientTimeoutsRef.current.push(timeoutId)
  }, [])

  const showFeedback = useCallback((tone: MoleKind, text: string) => {
    const id = nextIdRef.current++
    setFeedback({ id, tone, text })
    scheduleTransient(() => {
      setFeedback((current) => (current?.id === id ? null : current))
    }, 900)
  }, [scheduleTransient])

  const spawnHoleEffect = useCallback((holeIndex: number, tone: MoleKind) => {
    const id = nextIdRef.current++
    setHoleEffects((current) => [...current, { id, holeIndex, tone, label: EFFECT_LABELS[tone] }])
    scheduleTransient(() => {
      setHoleEffects((current) => current.filter((effect) => effect.id !== id))
    }, 520)
  }, [scheduleTransient])

  const placeImpactMarker = useCallback((x: number, y: number, tone: MoleKind) => {
    const id = nextIdRef.current++
    setImpactMarker({ id, x, y, tone })
    scheduleTransient(() => {
      setImpactMarker((current) => (current?.id === id ? null : current))
    }, 260)
  }, [scheduleTransient])

  const resetRound = useCallback(() => {
    clearTransientTimeouts()
    lastHoleRef.current = null
    setPlayState('running')
    setScore(0)
    setTimeLeftMs(profile.durationMs)
    setActiveMole(null)
    setHoleEffects([])
    setFeedback(null)
    setImpactMarker(null)
    setDangerPulse(0)
    setGoldPulse(0)
    setShakePulse(0)
    setCursor((current) => ({ ...current, visible: false }))
  }, [clearTransientTimeouts, profile.durationMs])

  const hammerRef = useRef<HTMLDivElement>(null)

  const updateCursorPosition = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (playState !== 'running') return null

    const rect = playfieldRef.current?.getBoundingClientRect()
    if (!rect) return null

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    // DOM 직접 업데이트 — setState 리렌더 없이 즉시 반영
    if (hammerRef.current) {
      hammerRef.current.style.transform = `translate(${x - 26}px, ${y - 18}px)`
      hammerRef.current.style.display = ''
    }
    // visible 상태만 필요할 때 업데이트 (매 move마다 리렌더 방지)
    setCursor((current) => current.visible ? current : { ...current, x, y, visible: true })
    return { x, y }
  }, [playState])

  const triggerHammerSwing = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (playState !== 'running') return

    const nextPosition = updateCursorPosition(event)
    if (!nextPosition) return

    setCursor((current) => ({
      ...current,
      x: nextPosition.x,
      y: nextPosition.y,
      visible: true,
      swingTick: current.swingTick + 1,
    }))
    const hitTone = activeMole?.phase === 'visible' ? activeMole.kind : 'criminal'
    placeImpactMarker(nextPosition.x, nextPosition.y, hitTone)
  }, [placeImpactMarker, playState, updateCursorPosition])

  const handleHoleClick = useCallback((holeIndex: number) => {
    if (!activeMole || playState !== 'running') return
    if (activeMole.holeIndex !== holeIndex || activeMole.phase !== 'visible') return

    const delta = SCORE_BY_KIND[activeMole.kind]
    setScore((current) => Math.max(0, current + delta))
    setActiveMole((current) => (
      current && current.id === activeMole.id
        ? { ...current, phase: 'hit' }
        : current
    ))
    setImpactMarker((current) => (current ? { ...current, tone: activeMole.kind } : current))
    spawnHoleEffect(holeIndex, activeMole.kind)
    showFeedback(activeMole.kind, FEEDBACK_LABELS[activeMole.kind])

    if (activeMole.kind === 'civilian') {
      playMoleMiss()
      setDangerPulse((current) => current + 1)
      setShakePulse((current) => current + 1)
      return
    }

    if (activeMole.kind === 'boss') {
      playMoleBossHit()
      setGoldPulse((current) => current + 1)
      return
    }

    playMoleHit()
  }, [activeMole, playState, showFeedback, spawnHoleEffect])

  useEffect(() => {
    resetRound()
    return clearTransientTimeouts
  }, [clearTransientTimeouts, resetRound])

  useEffect(() => {
    if (playState !== 'running') return undefined

    const deadline = Date.now() + profile.durationMs
    let lastWarnSec = -1
    const intervalId = window.setInterval(() => {
      const nextLeft = Math.max(0, deadline - Date.now())
      setTimeLeftMs(nextLeft)

      const sec = Math.ceil(nextLeft / 1000)
      if (nextLeft > 0 && sec <= 8 && sec !== lastWarnSec) {
        lastWarnSec = sec
        playTimerWarning()
      }

      if (nextLeft <= 0) {
        window.clearInterval(intervalId)
        playMiniGameFail()
        setPlayState('failed')
        setActiveMole(null)
        showFeedback('civilian', '시간 종료')
        completeMinigame(false)
      }
    }, 100)

    return () => window.clearInterval(intervalId)
  }, [completeMinigame, playState, profile.durationMs, showFeedback])

  useEffect(() => {
    if (playState !== 'running' || activeMole) return undefined

    const gapMin = Math.max(60, Math.floor(profile.stayMs * 0.08))
    const gapMax = Math.max(gapMin + 50, Math.floor(profile.stayMs * 0.18))
    const timeoutId = window.setTimeout(() => {
      const kind = chooseWeightedKind(profile.weights)
      const holeIndex = chooseHole(totalHoles, lastHoleRef.current)
      lastHoleRef.current = holeIndex
      setActiveMole({
        id: nextIdRef.current++,
        holeIndex,
        kind,
        phase: 'visible',
      })
    }, randomBetween(gapMin, gapMax))

    return () => window.clearTimeout(timeoutId)
  }, [activeMole, playState, profile.stayMs, profile.weights, totalHoles])

  useEffect(() => {
    if (!activeMole || playState !== 'running' || activeMole.phase !== 'visible') return undefined

    const visibleDuration = activeMole.kind === 'boss'
      ? Math.min(profile.stayMs, 600)
      : profile.stayMs

    const timeoutId = window.setTimeout(() => {
      setActiveMole((current) => {
        if (current && current.id === activeMole.id && current.phase === 'visible') {
          playMoleEscape()
          return { ...current, phase: 'escaping' }
        }
        return current
      })
    }, visibleDuration)

    return () => window.clearTimeout(timeoutId)
  }, [activeMole, playState, profile.stayMs])

  useEffect(() => {
    if (!activeMole || activeMole.phase === 'visible') return undefined

    const timeoutId = window.setTimeout(() => {
      setActiveMole((current) => (current?.id === activeMole.id ? null : current))
    }, activeMole.phase === 'hit' ? 180 : 220)

    return () => window.clearTimeout(timeoutId)
  }, [activeMole])

  useEffect(() => {
    if (playState !== 'running' || score < profile.target) return
    playMiniGameSuccess()
    setPlayState('success')
  }, [playState, profile.target, score])

  useEffect(() => {
    if (playState !== 'success') return undefined
    const timer = window.setTimeout(() => completeMinigame(true), 1200)
    return () => window.clearTimeout(timer)
  }, [completeMinigame, playState])

  const rootClassName = [
    'pc-whack-a-mole',
    dangerPulse > 0 ? `is-danger-flash-${dangerPulse % 2}` : '',
    goldPulse > 0 ? `is-gold-flash-${goldPulse % 2}` : '',
    shakePulse > 0 ? `is-shake-${shakePulse % 2}` : '',
  ].filter(Boolean).join(' ')

  const hammerClassName = [
    'pc-whack-a-mole__hammer',
    cursor.visible ? 'is-visible' : '',
    cursor.swingTick > 0 ? `is-swing-${cursor.swingTick % 2}` : '',
  ].filter(Boolean).join(' ')

  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${profile.cols}, minmax(0, 1fr))`,
  }

  const scoreRatio = Math.min(100, (score / profile.target) * 100)
  const timeRatio = Math.max(0, (timeLeftMs / profile.durationMs) * 100)
  const scoreLeft = Math.max(0, profile.target - score)

  if (!activeMinigame) return null

  return (
    <div className={rootClassName}>
      <div className="pc-whack-a-mole__hud">
        <div className="pc-whack-a-mole__card pc-whack-a-mole__card--score">
          <div className="pc-whack-a-mole__value">{score} / {profile.target}</div>
          <div className="pc-whack-a-mole__meter">
            <span className="pc-whack-a-mole__meter-fill is-score" style={{ width: `${scoreRatio}%` }} />
          </div>
        </div>

        <div className="pc-whack-a-mole__card pc-whack-a-mole__card--timer">
          <div className="pc-whack-a-mole__value">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline',verticalAlign:'middle',marginRight:4}}><circle cx="12" cy="13" r="9"/><polyline points="12 9 12 13 15 15"/><path d="M9 2h6"/><path d="M12 2v2"/></svg>
            {formatClock(timeLeftMs)}
          </div>
          <div className="pc-whack-a-mole__meter">
            <span className={`pc-whack-a-mole__meter-fill is-time${timeLeftMs <= 8_000 ? ' is-urgent' : ''}`} style={{ width: `${timeRatio}%` }} />
          </div>
        </div>
      </div>

      <div className="pc-whack-a-mole__legend">
        <span className="pc-whack-a-mole__legend-pill is-criminal">범인 +1</span>
        <span className="pc-whack-a-mole__legend-pill is-boss">보스 +3</span>
        <span className="pc-whack-a-mole__legend-pill is-civilian">시민 -2</span>
      </div>

      <div
        className="pc-whack-a-mole__playfield"
        onPointerDownCapture={triggerHammerSwing}
        onPointerEnter={updateCursorPosition}
        onPointerLeave={() => setCursor((current) => ({ ...current, visible: false }))}
        onPointerMove={updateCursorPosition}
        ref={playfieldRef}
      >
        <div className="pc-whack-a-mole__grid" style={gridStyle}>
          {holeIndices.map((holeIndex) => {
            const mole = activeMole?.holeIndex === holeIndex ? activeMole : null
            const effects = holeEffects.filter((effect) => effect.holeIndex === holeIndex)

            return (
              <button
                key={holeIndex}
                className={`pc-whack-a-mole__hole${mole ? ' is-occupied' : ''}`}
                disabled={playState !== 'running'}
                onClick={() => handleHoleClick(holeIndex)}
                type="button"
                aria-label={`${holeIndex + 1}번 구멍`}
              >
                <span className="pc-whack-a-mole__pit" />
                <span className="pc-whack-a-mole__pit-highlight" />
                <span className="pc-whack-a-mole__stage">
                  {mole ? (
                    <span className={`pc-whack-a-mole__mole is-${mole.kind} is-${mole.phase}`}>
                      <MoleFigure kind={mole.kind} />
                    </span>
                  ) : null}

                  {effects.map((effect) => (
                    <span key={effect.id} className={`pc-whack-a-mole__effect is-${effect.tone}`}>
                      <ImpactParticles tone={effect.tone} />
                      {effect.tone === 'criminal' ? <span className="pc-whack-a-mole__effect-cross">X</span> : null}
                      <span className="pc-whack-a-mole__effect-label">{effect.label}</span>
                    </span>
                  ))}
                </span>
              </button>
            )
          })}
        </div>

        <div
          className={hammerClassName}
          ref={hammerRef}
          style={{ transform: `translate(${cursor.x - 26}px, ${cursor.y - 18}px)` }}
        >
          <HammerGraphic />
        </div>

        {impactMarker ? (
          <div
            className="pc-whack-a-mole__impact"
            style={{ left: impactMarker.x, top: impactMarker.y }}
          >
            <ImpactParticles tone={impactMarker.tone} />
          </div>
        ) : null}

        {feedback ? (
          <div className={`pc-whack-a-mole__floating-feedback is-${feedback.tone}`}>
            {feedback.text}
          </div>
        ) : null}

        {playState === 'success' ? (
          <div className="pc-whack-a-mole__result">
            <div className="pc-whack-a-mole__result-card" style={{borderColor:'rgba(212,162,78,0.4)'}}>
              <div className="pc-whack-a-mole__result-title" style={{color:'#e8c172'}}>클리어!</div>
              <p className="pc-whack-a-mole__result-copy">
                법정 지배력을 확보했습니다.
              </p>
            </div>
          </div>
        ) : null}

        {playState === 'failed' ? (
          <div className="pc-whack-a-mole__result">
            <div className="pc-whack-a-mole__result-card">
              <div className="pc-whack-a-mole__result-title">시간 종료</div>
              <p className="pc-whack-a-mole__result-copy">
                현재 점수는 {score}점입니다. 목표까지 {scoreLeft}점 남았습니다.
              </p>
              <div className="pc-whack-a-mole__result-actions">
                <button className="pc-whack-a-mole__result-btn is-primary" onClick={resetRound} type="button">
                  다시 도전
                </button>
                <button className="pc-whack-a-mole__result-btn" onClick={cancelMinigame} type="button">
                  스킵
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
