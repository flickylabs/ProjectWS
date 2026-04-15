import { useCallback, useEffect, useRef, useState } from 'react'
import { useStore } from '../../../store/useGameStore'
import {
  playRunnerJump,
  playRunnerCollect,
  playRunnerHit,
  playMiniGameSuccess,
  playMiniGameFail,
} from '../../../engine/soundEngine'

const VIEW_WIDTH = 1200
const VIEW_HEIGHT = 560
const GROUND_Y = 480
const PLAYER_X = 180
const PLAYER_WIDTH = 24
const PLAYER_HEIGHT = 48
const GRAVITY = 0.55
const JUMP_VELOCITY = -11
const EXTRA_JUMP_BOOST = 3.5
const MAX_FRAME_STEP = 2.5
const MAX_AIR_JUMPS = 1 // 이중점프
const PLATFORM_Y = 320 // 2층 플랫폼 높이

type RunnerStatus = 'running' | 'paused' | 'success' | 'failed'
type ItemKind = 'book' | 'scales' | 'pen'
type ObstacleKind = 'spike' | 'barricade'

interface RoundConfig {
  target: number
  baseSpeed: number
  accelEvery10s: number
  obstacleChance: number
  gapChance: number
  itemChance: number
}

interface GroundSegment {
  id: number
  x: number
  width: number
  y?: number // 기본값=GROUND_Y, 2층 플랫폼은 PLATFORM_Y
}

interface Collectible {
  id: number
  kind: ItemKind
  x: number
  y: number
  width: number
  height: number
  bobPhase: number
  collected: boolean
}

interface Obstacle {
  id: number
  kind: ObstacleKind
  x: number
  y: number
  width: number
  height: number
}

interface PlayerState {
  y: number
  velocityY: number
  grounded: boolean
  jumpBoostRemaining: number
  hitTimer: number
  invulnerableTimer: number
  landingTimer: number
  knockback: number
  runClock: number
  airJumps: number
}

interface GameState {
  status: RunnerStatus
  round: number
  target: number
  collected: number
  lives: number
  speed: number
  elapsed: number
  cameraX: number
  nextTerrainX: number
  nextSpawnX: number
  nextId: number
  segments: GroundSegment[]
  items: Collectible[]
  obstacles: Obstacle[]
  player: PlayerState
  screenShake: number
  note: string
  sfxEvents: string[]
}

interface InputState {
  jumpHeld: boolean
  jumpPressed: boolean
}

interface UiState {
  status: RunnerStatus
  lives: number
  collected: number
  target: number
  speed: number
  note: string
}

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

const ROUND_CONFIGS: RoundConfig[] = [
  { target: 50, baseSpeed: 15, accelEvery10s: 0.05, obstacleChance: 0.18, gapChance: 0.08, itemChance: 0.85 },
  { target: 100, baseSpeed: 18, accelEvery10s: 0.05, obstacleChance: 0.22, gapChance: 0.1, itemChance: 0.82 },
  { target: 150, baseSpeed: 22, accelEvery10s: 0.07, obstacleChance: 0.24, gapChance: 0.115, itemChance: 0.80 },
  { target: 200, baseSpeed: 25, accelEvery10s: 0.07, obstacleChance: 0.27, gapChance: 0.13, itemChance: 0.78 },
  { target: 250, baseSpeed: 28, accelEvery10s: 0.1, obstacleChance: 0.3, gapChance: 0.145, itemChance: 0.76 },
]

const ITEM_KINDS: ItemKind[] = ['book', 'scales', 'pen']

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function nextId(state: GameState) {
  const id = state.nextId
  state.nextId += 1
  return id
}

function getRoundConfig(round: number) {
  return ROUND_CONFIGS[clamp(round - 1, 0, ROUND_CONFIGS.length - 1)]
}

function makeUiState(state: GameState): UiState {
  return {
    status: state.status,
    lives: state.lives,
    collected: state.collected,
    target: state.target,
    speed: state.speed,
    note: state.note,
  }
}

function rectsOverlap(a: Rect, b: Rect) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}

function pointAt(x: number, y: number, length: number, angle: number) {
  return {
    x: x + Math.cos(angle) * length,
    y: y + Math.sin(angle) * length,
  }
}

function createInitialState(round: number): GameState {
  const config = getRoundConfig(round)
  const initialSegment: GroundSegment = { id: 1, x: -400, width: 1800 }
  const state: GameState = {
    status: 'running',
    round,
    target: config.target,
    collected: 0,
    lives: 3,
    speed: config.baseSpeed,
    elapsed: 0,
    cameraX: 0,
    nextTerrainX: initialSegment.x + initialSegment.width,
    nextSpawnX: 460,
    nextId: 2,
    segments: [initialSegment],
    items: [],
    obstacles: [],
    player: {
      y: GROUND_Y - PLAYER_HEIGHT,
      velocityY: 0,
      grounded: true,
      jumpBoostRemaining: 0,
      hitTimer: 0,
      invulnerableTimer: 0,
      landingTimer: 0,
      knockback: 0,
      runClock: 0,
      airJumps: 0,
    },
    screenShake: 0,
    note: '',
    sfxEvents: [],
  }

  spawnSegmentContent(state, config, initialSegment, 480, 120)
  ensureTerrain(state, config)
  return state
}

function spawnSegmentContent(state: GameState, config: RoundConfig, segment: GroundSegment, startPadding = 120, endPadding = 90) {
  let cursor = Math.max(segment.x + startPadding, state.nextSpawnX)
  const limit = segment.x + segment.width - endPadding

  while (cursor < limit) {
    const roll = Math.random()
    if (roll < config.obstacleChance) {
      const kind: ObstacleKind = Math.random() < 0.58 ? 'spike' : 'barricade'
      const width = kind === 'spike' ? randomBetween(34, 50) : randomBetween(46, 64)
      const height = kind === 'spike' ? randomBetween(24, 34) : randomBetween(34, 52)
      state.obstacles.push({
        id: nextId(state),
        kind,
        x: cursor,
        y: GROUND_Y - height,
        width,
        height,
      })
    } else if (roll < config.obstacleChance + config.itemChance) {
      const cluster = Math.random() < 0.4 ? (Math.random() < 0.55 ? 2 : 3) : 1
      // 바닥(30%) vs 점프 높이(70%) — 확실히 구분
      const isGroundLevel = Math.random() < 0.3
      const baseY = isGroundLevel
        ? GROUND_Y - randomBetween(32, 48) // 바닥 바로 위 — 점프 없이 수집
        : GROUND_Y - randomBetween(110, 180) // 점프 필요 높이

      for (let index = 0; index < cluster; index += 1) {
        const offsetX = index * 34
        const arcLift = cluster > 1 ? Math.sin((index / Math.max(1, cluster - 1)) * Math.PI) * 14 : 0
        state.items.push({
          id: nextId(state),
          kind: ITEM_KINDS[Math.floor(Math.random() * ITEM_KINDS.length)],
          x: cursor + offsetX,
          y: baseY - arcLift,
          width: 32,
          height: 32,
          bobPhase: randomBetween(0, Math.PI * 2),
          collected: false,
        })
      }
    }

    cursor += randomBetween(150, 228)
  }

  state.nextSpawnX = Math.max(state.nextSpawnX, cursor)
}

function spawnGapRewards(state: GameState, gapStart: number, gapWidth: number) {
  const count = clamp(Math.round(gapWidth / 78), 2, 4)
  for (let index = 0; index < count; index += 1) {
    const t = count === 1 ? 0.5 : index / (count - 1)
    state.items.push({
      id: nextId(state),
      kind: ITEM_KINDS[Math.floor(Math.random() * ITEM_KINDS.length)],
      x: gapStart + 22 + t * Math.max(10, gapWidth - 44),
      y: GROUND_Y - 80 - Math.sin(t * Math.PI) * (30 + gapWidth * 0.12),
      width: 32,
      height: 32,
      bobPhase: randomBetween(0, Math.PI * 2),
      collected: false,
    })
  }
}

function ensureTerrain(state: GameState, config: RoundConfig) {
  const gapRanges: Array<[number, number]> = [
    [118, 160],
    [128, 188],
    [140, 214],
    [150, 228],
    [165, 248],
  ]
  const [minGap, maxGap] = gapRanges[clamp(state.round - 1, 0, gapRanges.length - 1)]

  while (state.nextTerrainX - state.cameraX < VIEW_WIDTH + 950) {
    const gapChance = config.gapChance + Math.min(0.03, state.elapsed * 0.00045)
    const gapWidth = Math.random() < gapChance ? randomBetween(minGap, maxGap) : 0
    const segmentX = state.nextTerrainX + gapWidth
    const segmentWidth = randomBetween(320, 560)

    if (gapWidth > 0) {
      spawnGapRewards(state, state.nextTerrainX, gapWidth)
    }

    const segment: GroundSegment = {
      id: nextId(state),
      x: segmentX,
      width: segmentWidth,
    }

    state.segments.push(segment)
    spawnSegmentContent(state, config, segment, gapWidth > 0 ? 190 : 120, 90)

    // 확률적으로 2층 플랫폼 생성 (30%)
    if (Math.random() < 0.3 && segmentWidth >= 360) {
      const platWidth = randomBetween(160, 280)
      const platX = segmentX + randomBetween(40, segmentWidth - platWidth - 40)
      const platform: GroundSegment = {
        id: nextId(state),
        x: platX,
        width: platWidth,
        y: PLATFORM_Y,
      }
      state.segments.push(platform)
      // 2층에도 아이템 배치
      const platItemCount = clamp(Math.floor(platWidth / 60), 1, 4)
      for (let pi = 0; pi < platItemCount; pi++) {
        state.items.push({
          id: nextId(state),
          kind: ITEM_KINDS[Math.floor(Math.random() * ITEM_KINDS.length)],
          x: platX + 20 + pi * (platWidth - 40) / Math.max(1, platItemCount - 1),
          y: PLATFORM_Y - randomBetween(50, 80),
          width: 48,
          height: 48,
          bobPhase: randomBetween(0, Math.PI * 2),
          collected: false,
        })
      }
    }

    state.nextTerrainX = segmentX + segmentWidth
  }
}

function getPlayerScreenX(player: PlayerState) {
  return PLAYER_X + player.knockback
}

function getSupportingSegment(state: GameState) {
  const playerScreenX = getPlayerScreenX(state.player)
  const footLeft = state.cameraX + playerScreenX + 8
  const footRight = state.cameraX + playerScreenX + PLAYER_WIDTH - 8
  const playerFoot = state.player.y + PLAYER_HEIGHT

  // 아래로 떨어지고 있을 때만 플랫폼 착지 (위로 올라갈 때는 통과)
  const falling = state.player.velocityY >= 0

  let bestSegment: GroundSegment | null = null
  let bestY = Infinity

  for (const segment of state.segments) {
    if (footRight <= segment.x || footLeft >= segment.x + segment.width) continue
    const segY = segment.y ?? GROUND_Y
    // 플레이어 발이 플랫폼 근처이고 떨어지는 중이면 착지
    if (falling && playerFoot >= segY - 6 && playerFoot <= segY + 12 && segY < bestY) {
      bestSegment = segment
      bestY = segY
    }
    // 바닥(GROUND_Y)은 항상 지지
    if (segY === GROUND_Y && playerFoot >= GROUND_Y - 6) {
      if (GROUND_Y < bestY) {
        bestSegment = segment
        bestY = GROUND_Y
      }
    }
  }
  return bestSegment
}

function setGameResult(state: GameState, status: Extract<RunnerStatus, 'success' | 'failed'>, note: string) {
  if (state.status === 'success' || state.status === 'failed') return
  state.status = status
  state.note = note
}

function updateGame(state: GameState, config: RoundConfig, input: InputState, frameDelta: number) {
  const dtSeconds = frameDelta / 60
  state.elapsed += dtSeconds
  state.speed = config.baseSpeed * ((1 + config.accelEvery10s) ** Math.floor(state.elapsed / 10))

  const player = state.player
  player.hitTimer = Math.max(0, player.hitTimer - dtSeconds)
  player.invulnerableTimer = Math.max(0, player.invulnerableTimer - dtSeconds)
  player.landingTimer = Math.max(0, player.landingTimer - dtSeconds)
  player.knockback *= Math.pow(0.82, frameDelta)
  state.screenShake *= Math.pow(0.78, frameDelta)

  if (state.status !== 'running') {
    input.jumpPressed = false
    return
  }

  state.cameraX += state.speed * frameDelta
  player.runClock += frameDelta * (0.19 + state.speed * 0.032)

  let support = getSupportingSegment(state)
  if (player.grounded && !support) {
    player.grounded = false
  }

  if (input.jumpPressed) {
    if (player.grounded) {
      player.grounded = false
      player.velocityY = JUMP_VELOCITY
      player.jumpBoostRemaining = EXTRA_JUMP_BOOST
      player.airJumps = 0
      player.landingTimer = 0
      state.sfxEvents.push('jump')
    } else if (player.airJumps < MAX_AIR_JUMPS) {
      // 이중점프 — 더 높이, 더 멀리
      player.velocityY = JUMP_VELOCITY * 1.15
      player.jumpBoostRemaining = EXTRA_JUMP_BOOST * 0.7
      player.airJumps += 1
      state.sfxEvents.push('jump')
    }
  }
  input.jumpPressed = false

  if (!input.jumpHeld) {
    player.jumpBoostRemaining = 0
  }

  if (!player.grounded && input.jumpHeld && player.jumpBoostRemaining > 0 && player.velocityY < 0) {
    const boost = Math.min(player.jumpBoostRemaining, 0.28 * frameDelta)
    player.velocityY -= boost
    player.jumpBoostRemaining -= boost
  }

  if (!player.grounded) {
    player.velocityY += GRAVITY * frameDelta
    player.y += player.velocityY * frameDelta
  } else {
    // 현재 서 있는 세그먼트의 높이에 맞춤
    const standOn = getSupportingSegment(state)
    const standY = standOn?.y ?? GROUND_Y
    player.y = standY - PLAYER_HEIGHT
    player.velocityY = 0
    player.airJumps = 0
  }

  support = getSupportingSegment(state)
  if (support) {
    const feetY = player.y + PLAYER_HEIGHT
    const supportY = support.y ?? GROUND_Y
    if (player.velocityY >= 0 && feetY >= supportY - 4) {
      if (!player.grounded) {
        const impact = clamp(Math.abs(player.velocityY) / 18, 0.25, 1)
        player.landingTimer = Math.max(player.landingTimer, 0.09 + impact * 0.12)
      }
      player.grounded = true
      player.y = supportY - PLAYER_HEIGHT
      player.velocityY = 0
      player.jumpBoostRemaining = 0
    }
  }

  // 구멍에 빠져 화면 밖으로 떨어지면 라이프 -1
  if (player.y > VIEW_HEIGHT + 20) {
    state.lives -= 1
    state.sfxEvents.push('hit')
    if (state.lives <= 0) {
      setGameResult(state, 'failed', '구멍에 빠졌습니다')
    } else {
      // 부활: 현재 카메라 위치에서 안전한 세그먼트 위로 리셋
      player.y = GROUND_Y - PLAYER_HEIGHT - 60
      player.velocityY = 0
      player.grounded = false
      player.airJumps = 0
      player.hitTimer = 0.3
      player.invulnerableTimer = 1.5
      state.screenShake = 8
    }
  }

  const cullLeft = state.cameraX - 240
  state.segments = state.segments.filter((segment) => segment.x + segment.width > cullLeft)
  state.obstacles = state.obstacles.filter((obstacle) => obstacle.x + obstacle.width > cullLeft)
  state.items = state.items.filter((item) => !item.collected && item.x + item.width > cullLeft)
  ensureTerrain(state, config)

  const playerRect: Rect = {
    x: state.cameraX + getPlayerScreenX(player) + 8,
    y: player.y + 4,
    width: PLAYER_WIDTH - 16,
    height: PLAYER_HEIGHT - 8,
  }

  for (const item of state.items) {
    const bob = Math.sin(state.elapsed * 4.2 + item.bobPhase) * 6
    const itemRect: Rect = { x: item.x, y: item.y + bob, width: item.width, height: item.height }
    if (rectsOverlap(playerRect, itemRect)) {
      item.collected = true
      state.collected += 1
      state.sfxEvents.push('collect')
      if (state.collected >= state.target) {
        state.sfxEvents.push('success')
        setGameResult(state, 'success', `목표 ${state.target}개를 모두 모았습니다.`)
        return
      }
    }
  }

  if (player.invulnerableTimer <= 0) {
    for (const obstacle of state.obstacles) {
      const obstacleRect: Rect = { x: obstacle.x, y: obstacle.y, width: obstacle.width, height: obstacle.height }
      if (!rectsOverlap(playerRect, obstacleRect)) continue

      state.lives = Math.max(0, state.lives - 1)
      player.invulnerableTimer = 0.95
      player.hitTimer = 0.2
      player.knockback = -18
      state.screenShake = 9
      player.landingTimer = Math.max(player.landingTimer, 0.12)
      state.sfxEvents.push('hit')

      if (state.lives <= 0) {
        state.sfxEvents.push('fail')
        setGameResult(state, 'failed', '장애물에 연속으로 걸려 스킬 조각을 놓쳤습니다.')
      }
      break
    }
  }

  if (player.y > VIEW_HEIGHT + 40) {
    state.sfxEvents.push('fail')
    setGameResult(state, 'failed', '낭떠러지로 떨어져 재판이 중단되었습니다.')
  }
}

function prepareCanvas(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  if (!context) return null

  const dpr = window.devicePixelRatio || 1
  canvas.width = VIEW_WIDTH * dpr
  canvas.height = VIEW_HEIGHT * dpr
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.imageSmoothingEnabled = true
  return context
}

function drawBackdrop(ctx: CanvasRenderingContext2D, state: GameState) {
  const sky = ctx.createLinearGradient(0, 0, 0, VIEW_HEIGHT)
  sky.addColorStop(0, '#10111a')
  sky.addColorStop(0.55, '#151725')
  sky.addColorStop(1, '#0a0b10')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)

  ctx.fillStyle = 'rgba(212,162,78,0.08)'
  ctx.beginPath()
  ctx.arc(VIEW_WIDTH * 0.7, 76, 140, 0, Math.PI * 2)
  ctx.fill()

  const courtSpacing = 240
  const courtOffset = -((state.cameraX * 0.18) % courtSpacing)
  ctx.fillStyle = '#1a1a24'
  for (let x = courtOffset - courtSpacing; x < VIEW_WIDTH + courtSpacing; x += courtSpacing) {
    ctx.fillRect(x + 36, 78, 18, 210)
    ctx.fillRect(x + 168, 78, 18, 210)
    ctx.beginPath()
    ctx.moveTo(x + 24, 110)
    ctx.quadraticCurveTo(x + 111, 18, x + 198, 110)
    ctx.lineTo(x + 198, 128)
    ctx.quadraticCurveTo(x + 111, 48, x + 24, 128)
    ctx.closePath()
    ctx.fill()
  }

  const archiveSpacing = 170
  const archiveOffset = -((state.cameraX * 0.42) % archiveSpacing)
  for (let x = archiveOffset - archiveSpacing; x < VIEW_WIDTH + archiveSpacing; x += archiveSpacing) {
    const shelfHeight = 100 + ((Math.floor((x + state.cameraX) / archiveSpacing) % 3) * 18)
    const top = 182 - shelfHeight * 0.18

    ctx.fillStyle = '#222230'
    ctx.fillRect(x + 18, top, 102, shelfHeight)
    ctx.fillRect(x + 128, top + 20, 44, shelfHeight - 20)

    ctx.fillStyle = 'rgba(255,255,255,0.07)'
    for (let stripe = 0; stripe < 6; stripe += 1) {
      ctx.fillRect(x + 28 + stripe * 14, top + 14, 4, shelfHeight - 28)
    }
  }

  ctx.fillStyle = '#07080d'
  ctx.fillRect(0, GROUND_Y, VIEW_WIDTH, VIEW_HEIGHT - GROUND_Y)
}

function drawGround(ctx: CanvasRenderingContext2D, state: GameState) {
  for (const segment of state.segments) {
    const screenX = segment.x - state.cameraX
    if (screenX > VIEW_WIDTH || screenX + segment.width < -80) continue
    const segY = segment.y ?? GROUND_Y

    if (segY === GROUND_Y) {
      // 바닥 세그먼트
      ctx.fillStyle = '#2a2a36'
      ctx.fillRect(screenX, GROUND_Y, segment.width, VIEW_HEIGHT - GROUND_Y)

      ctx.fillStyle = '#393645'
      ctx.fillRect(screenX, GROUND_Y, segment.width, 8)

      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.lineWidth = 1
      for (let x = screenX + ((state.cameraX * 0.8) % 38); x < screenX + segment.width; x += 38) {
        ctx.beginPath()
        ctx.moveTo(x, GROUND_Y + 8)
        ctx.lineTo(x - 12, VIEW_HEIGHT)
        ctx.stroke()
      }

      ctx.strokeStyle = 'rgba(212,162,78,0.15)'
      for (let y = GROUND_Y + 20; y < VIEW_HEIGHT; y += 22) {
        ctx.beginPath()
        ctx.moveTo(screenX, y)
        ctx.lineTo(screenX + segment.width, y)
        ctx.stroke()
      }
    } else {
      // 2층 플랫폼
      ctx.fillStyle = 'rgba(212,162,78,0.18)'
      ctx.fillRect(screenX, segY, segment.width, 10)

      ctx.fillStyle = 'rgba(212,162,78,0.08)'
      ctx.fillRect(screenX, segY + 10, segment.width, 4)

      // 플랫폼 상단 하이라이트
      ctx.strokeStyle = 'rgba(212,162,78,0.4)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(screenX, segY)
      ctx.lineTo(screenX + segment.width, segY)
      ctx.stroke()

      // 지지대
      ctx.strokeStyle = 'rgba(255,255,255,0.05)'
      ctx.lineWidth = 1
      const pillarSpacing = 60
      for (let px = screenX + pillarSpacing / 2; px < screenX + segment.width; px += pillarSpacing) {
        ctx.beginPath()
        ctx.moveTo(px, segY + 14)
        ctx.lineTo(px, GROUND_Y)
        ctx.stroke()
      }
    }
  }
}

function drawCollectible(ctx: CanvasRenderingContext2D, x: number, y: number, kind: ItemKind, pulse: number) {
  ctx.save()
  ctx.translate(x, y)

  ctx.fillStyle = `rgba(212,162,78,${0.18 + Math.sin(pulse) * 0.05})`
  ctx.beginPath()
  ctx.arc(0, 0, 18, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = '#f0d28d'
  ctx.fillStyle = '#d4a24e'
  ctx.lineWidth = 2.6
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  if (kind === 'book') {
    ctx.beginPath()
    ctx.moveTo(-10, -8)
    ctx.lineTo(-2, -10)
    ctx.lineTo(-2, 10)
    ctx.lineTo(-10, 8)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(2, -10)
    ctx.lineTo(10, -8)
    ctx.lineTo(10, 8)
    ctx.lineTo(2, 10)
    ctx.closePath()
    ctx.fill()

    ctx.strokeStyle = '#f6e0a9'
    ctx.beginPath()
    ctx.moveTo(0, -10)
    ctx.lineTo(0, 10)
    ctx.stroke()
  } else if (kind === 'scales') {
    ctx.beginPath()
    ctx.moveTo(0, -10)
    ctx.lineTo(0, 10)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(-10, -4)
    ctx.lineTo(10, -4)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(-6, -4)
    ctx.lineTo(-10, 4)
    ctx.lineTo(-2, 4)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(6, -4)
    ctx.lineTo(2, 4)
    ctx.lineTo(10, 4)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(-4, 10)
    ctx.lineTo(4, 10)
    ctx.stroke()
  } else {
    ctx.beginPath()
    ctx.moveTo(-9, 8)
    ctx.lineTo(4, -10)
    ctx.lineTo(8, -6)
    ctx.lineTo(-4, 12)
    ctx.closePath()
    ctx.fill()

    ctx.strokeStyle = '#f6e0a9'
    ctx.beginPath()
    ctx.moveTo(-2, 5)
    ctx.lineTo(5, -4)
    ctx.stroke()
  }

  ctx.restore()
}

function drawObstacle(ctx: CanvasRenderingContext2D, obstacle: Obstacle, screenX: number) {
  ctx.save()
  ctx.translate(screenX, obstacle.y)
  ctx.lineJoin = 'round'

  if (obstacle.kind === 'spike') {
    ctx.fillStyle = '#e06060'
    ctx.strokeStyle = '#ff9090'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, obstacle.height)
    ctx.lineTo(obstacle.width * 0.22, obstacle.height * 0.2)
    ctx.lineTo(obstacle.width * 0.38, obstacle.height)
    ctx.lineTo(obstacle.width * 0.56, obstacle.height * 0.3)
    ctx.lineTo(obstacle.width * 0.74, obstacle.height)
    ctx.lineTo(obstacle.width * 0.92, obstacle.height * 0.16)
    ctx.lineTo(obstacle.width, obstacle.height)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  } else {
    ctx.fillStyle = '#e06060'
    ctx.fillRect(6, 8, obstacle.width - 12, obstacle.height - 18)
    ctx.strokeStyle = '#ffb3b3'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(12, 14)
    ctx.lineTo(obstacle.width - 12, obstacle.height - 16)
    ctx.moveTo(obstacle.width - 12, 14)
    ctx.lineTo(12, obstacle.height - 16)
    ctx.stroke()

    ctx.fillStyle = '#a74242'
    ctx.fillRect(0, obstacle.height - 14, obstacle.width, 10)
  }

  ctx.restore()
}

function drawPlayer(ctx: CanvasRenderingContext2D, state: GameState, config: RoundConfig) {
  const player = state.player
  const screenX = getPlayerScreenX(player)
  const speedRatio = clamp(state.speed / config.baseSpeed, 1, 2.2)
  const runPhase = player.runClock
  const stride = player.grounded ? Math.sin(runPhase) * (0.9 + (speedRatio - 1) * 0.35) : Math.sin(runPhase * 0.55) * 0.18
  const armSwing = player.grounded ? Math.sin(runPhase + Math.PI / 2) * (0.58 + speedRatio * 0.08) : 0
  const crouch = player.grounded ? player.landingTimer * 26 : 0
  const lean = (player.grounded ? 0.11 + (speedRatio - 1) * 0.08 : 0.03) + (-player.velocityY * 0.004)
  const bodyColor = player.hitTimer > 0 && Math.floor(player.hitTimer * 30) % 2 === 0 ? '#ff7f7f' : '#d4a24e'
  const rearColor = player.hitTimer > 0 && Math.floor(player.hitTimer * 30) % 2 === 0 ? 'rgba(255,127,127,0.52)' : 'rgba(212,162,78,0.42)'
  const capeColor = player.hitTimer > 0 && Math.floor(player.hitTimer * 30) % 2 === 0 ? 'rgba(128,42,42,0.9)' : 'rgba(159,116,49,0.9)'

  const feetY = player.y + PLAYER_HEIGHT
  const hip = { x: screenX + PLAYER_WIDTH * 0.46, y: feetY - 32 - crouch }
  const shoulder = pointAt(hip.x, hip.y, 42, -Math.PI / 2 + lean)
  const head = pointAt(shoulder.x, shoulder.y, 20, -Math.PI / 2 + lean)

  const leftShoulder = { x: shoulder.x - 7, y: shoulder.y + 2 }
  const rightShoulder = { x: shoulder.x + 7, y: shoulder.y + 2 }
  const leftHip = { x: hip.x - 5, y: hip.y + 2 }
  const rightHip = { x: hip.x + 5, y: hip.y + 2 }

  let leftUpperArmAngle = 2.0 - armSwing
  let rightUpperArmAngle = 1.16 + armSwing
  let leftLowerArmAngle = leftUpperArmAngle + 0.34 + Math.max(0, -armSwing) * 0.22
  let rightLowerArmAngle = rightUpperArmAngle - 0.34 - Math.max(0, armSwing) * 0.22
  let leftThighAngle = 1.95 + stride
  let rightThighAngle = 1.2 - stride
  let leftCalfAngle = 1.56 + Math.max(0, -stride) * 0.95 + crouch * 0.012
  let rightCalfAngle = 1.62 - Math.min(0, stride) * 0.95 + crouch * 0.012

  if (!player.grounded) {
    const jumpLift = clamp(-player.velocityY / 14, 0, 1)
    leftUpperArmAngle = -2.25 - jumpLift * 0.2
    rightUpperArmAngle = -0.92 + jumpLift * 0.2
    leftLowerArmAngle = leftUpperArmAngle - 0.3
    rightLowerArmAngle = rightUpperArmAngle + 0.3
    leftThighAngle = 1.86 - jumpLift * 0.24
    rightThighAngle = 1.28 + jumpLift * 0.24
    leftCalfAngle = 1.46 + jumpLift * 0.5
    rightCalfAngle = 1.34 - jumpLift * 0.32
  }

  const leftElbow = pointAt(leftShoulder.x, leftShoulder.y, 20, leftUpperArmAngle)
  const leftHand = pointAt(leftElbow.x, leftElbow.y, 18, leftLowerArmAngle)
  const rightElbow = pointAt(rightShoulder.x, rightShoulder.y, 20, rightUpperArmAngle)
  const rightHand = pointAt(rightElbow.x, rightElbow.y, 18, rightLowerArmAngle)
  const leftKnee = pointAt(leftHip.x, leftHip.y, 23, leftThighAngle)
  const leftFoot = pointAt(leftKnee.x, leftKnee.y, 23, leftCalfAngle)
  const rightKnee = pointAt(rightHip.x, rightHip.y, 23, rightThighAngle)
  const rightFoot = pointAt(rightKnee.x, rightKnee.y, 23, rightCalfAngle)

  const capeFlutter = 12 + (speedRatio - 1) * 10 + Math.abs(Math.sin(runPhase * 0.7)) * 8 + (player.grounded ? 0 : 12)

  ctx.save()
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  if (player.grounded) {
    ctx.fillStyle = 'rgba(0,0,0,0.28)'
    ctx.beginPath()
    ctx.ellipse(screenX + PLAYER_WIDTH * 0.46, GROUND_Y + 8, 32, 9, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.fillStyle = capeColor
  ctx.beginPath()
  ctx.moveTo(shoulder.x - 6, shoulder.y + 6)
  ctx.quadraticCurveTo(hip.x - 20 - capeFlutter, shoulder.y + 20, hip.x - 42 - capeFlutter, hip.y + 24)
  ctx.quadraticCurveTo(hip.x - 14, hip.y + 20, hip.x - 6, hip.y + 10)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = 'rgba(212,162,78,0.22)'
  ctx.beginPath()
  ctx.moveTo(shoulder.x - 18, shoulder.y + 5)
  ctx.lineTo(shoulder.x + 18, shoulder.y + 5)
  ctx.lineTo(hip.x + 12, hip.y + 18)
  ctx.lineTo(hip.x - 14, hip.y + 18)
  ctx.closePath()
  ctx.fill()

  ctx.strokeStyle = rearColor
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(leftShoulder.x, leftShoulder.y)
  ctx.lineTo(leftElbow.x, leftElbow.y)
  ctx.lineTo(leftHand.x, leftHand.y)
  ctx.moveTo(leftHip.x, leftHip.y)
  ctx.lineTo(leftKnee.x, leftKnee.y)
  ctx.lineTo(leftFoot.x, leftFoot.y)
  ctx.stroke()

  ctx.strokeStyle = bodyColor
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.moveTo(shoulder.x, shoulder.y)
  ctx.lineTo(hip.x, hip.y)
  ctx.stroke()

  ctx.fillStyle = bodyColor
  ctx.beginPath()
  ctx.arc(head.x, head.y, 12, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = '#f4d69a'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(head.x - 5, head.y + 2)
  ctx.lineTo(head.x + 5, head.y + 2)
  ctx.stroke()

  ctx.strokeStyle = bodyColor
  ctx.lineWidth = 5.5
  ctx.beginPath()
  ctx.moveTo(rightShoulder.x, rightShoulder.y)
  ctx.lineTo(rightElbow.x, rightElbow.y)
  ctx.lineTo(rightHand.x, rightHand.y)
  ctx.moveTo(rightHip.x, rightHip.y)
  ctx.lineTo(rightKnee.x, rightKnee.y)
  ctx.lineTo(rightFoot.x, rightFoot.y)
  ctx.stroke()

  ctx.strokeStyle = 'rgba(244,214,154,0.65)'
  ctx.lineWidth = 2.2
  ctx.beginPath()
  ctx.moveTo(rightFoot.x - 4, rightFoot.y + 2)
  ctx.lineTo(rightFoot.x + 6, rightFoot.y + 2)
  ctx.moveTo(leftFoot.x - 6, leftFoot.y + 2)
  ctx.lineTo(leftFoot.x + 4, leftFoot.y + 2)
  ctx.stroke()

  ctx.restore()
}

function drawScene(ctx: CanvasRenderingContext2D, state: GameState, config: RoundConfig) {
  ctx.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
  drawBackdrop(ctx, state)

  ctx.save()
  if (state.screenShake > 0.1) {
    ctx.translate(randomBetween(-state.screenShake * 0.3, state.screenShake * 0.3), randomBetween(-state.screenShake * 0.18, state.screenShake * 0.18))
  }

  drawGround(ctx, state)

  for (const item of state.items) {
    const screenX = item.x - state.cameraX
    if (screenX > VIEW_WIDTH + 40 || screenX < -60) continue
    const bob = Math.sin(state.elapsed * 4.2 + item.bobPhase) * 6
    drawCollectible(ctx, screenX + item.width * 0.5, item.y + bob + item.height * 0.5, item.kind, state.elapsed * 4.2 + item.bobPhase)
  }

  for (const obstacle of state.obstacles) {
    const screenX = obstacle.x - state.cameraX
    if (screenX > VIEW_WIDTH + 40 || screenX + obstacle.width < -40) continue
    drawObstacle(ctx, obstacle, screenX)
  }

  drawPlayer(ctx, state, config)
  ctx.restore()
}

export default function SkillRunnerGame() {
  const activeMinigame = useStore((store) => store.activeMinigame)
  const completeMinigame = useStore((store) => store.completeMinigame)
  const cancelMinigame = useStore((store) => store.cancelMinigame)

  const round = activeMinigame?.round ?? 1
  const config = getRoundConfig(round)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const stateRef = useRef<GameState | null>(null)
  const inputRef = useRef<InputState>({ jumpHeld: false, jumpPressed: false })
  const uiRef = useRef<UiState>(makeUiState(createInitialState(round)))
  const [runToken, setRunToken] = useState(0)
  const [ui, setUi] = useState<UiState>(() => uiRef.current)

  const syncUiRef = useRef((game: GameState, force = false) => {
    const next = makeUiState(game)
    const previous = uiRef.current
    const speedBucket = Math.round(next.speed * 10) !== Math.round(previous.speed * 10)

    if (
      force
      || next.status !== previous.status
      || next.lives !== previous.lives
      || next.collected !== previous.collected
      || next.target !== previous.target
      || next.note !== previous.note
      || speedBucket
    ) {
      uiRef.current = next
      setUi(next)
    }
  })
  const syncUi = useCallback((game: GameState, force = false) => syncUiRef.current(game, force), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = prepareCanvas(canvas)
    if (!ctx) return

    const game = createInitialState(round)
    stateRef.current = game
    uiRef.current = makeUiState(game)
    setUi(uiRef.current)

    let frameId = 0
    let lastTime = performance.now()

    const tick = (now: number) => {
      const state = stateRef.current
      if (!state) return

      const frameDelta = clamp((now - lastTime) / (1000 / 60), 0.55, MAX_FRAME_STEP)
      lastTime = now

      updateGame(state, config, inputRef.current, frameDelta)

      for (const sfx of state.sfxEvents) {
        if (sfx === 'jump') playRunnerJump()
        else if (sfx === 'collect') playRunnerCollect()
        else if (sfx === 'hit') playRunnerHit()
        else if (sfx === 'success') playMiniGameSuccess()
        else if (sfx === 'fail') playMiniGameFail()
      }
      state.sfxEvents.length = 0

      drawScene(ctx, state, config)
      syncUi(state)

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
      stateRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- config is derived from round, syncUi is stable ref
  }, [round, runToken])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'KeyW') {
        event.preventDefault()
        if (!inputRef.current.jumpHeld) {
          inputRef.current.jumpPressed = true
        }
        inputRef.current.jumpHeld = true

        const state = stateRef.current
        if (state?.status === 'paused') {
          state.status = 'running'
          state.note = ''
          syncUi(state, true)
        }
        return
      }

      if (event.code === 'Escape') {
        const state = stateRef.current
        if (!state) return
        event.preventDefault()
        if (state.status === 'running') {
          state.status = 'paused'
          state.note = '일시정지'
          syncUi(state, true)
        } else if (state.status === 'paused') {
          state.status = 'running'
          state.note = ''
          syncUi(state, true)
        }
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'KeyW') {
        event.preventDefault()
        inputRef.current.jumpHeld = false
      }
    }

    const handleVisibility = () => {
      const state = stateRef.current
      if (!state || state.status !== 'running') return
      state.status = 'paused'
      state.note = '포커스가 이동해 잠시 멈췄습니다.'
      syncUi(state, true)
    }

    window.addEventListener('keydown', handleKeyDown, { passive: false })
    window.addEventListener('keyup', handleKeyUp, { passive: false })
    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('blur', handleVisibility)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('blur', handleVisibility)
    }
  }, [syncUi])

  const handleRetry = () => {
    inputRef.current = { jumpHeld: false, jumpPressed: false }
    setRunToken((value) => value + 1)
  }

  const handleResume = () => {
    const state = stateRef.current
    if (!state || state.status !== 'paused') return
    state.status = 'running'
    state.note = ''
    syncUi(state, true)
  }

  const progressPercent = Math.min(100, (ui.collected / ui.target) * 100)
  const speedMultiplier = ui.speed / config.baseSpeed

  return (
    <div className="pc-skill-runner">
      <div className="pc-skill-runner__stage">
        <canvas
          aria-label="스킬 러너 게임 화면"
          className="pc-skill-runner__canvas"
          ref={canvasRef}
          width={VIEW_WIDTH}
          height={VIEW_HEIGHT}
        />

        <div className="pc-skill-runner__hud">
          <div className="pc-skill-runner__panel">
            <div className="pc-skill-runner__hearts" aria-label={`남은 생명 ${ui.lives}`}>
              {Array.from({ length: 3 }).map((_, index) => (
                <span className={index < ui.lives ? 'is-on' : 'is-off'} key={index}>❤</span>
              ))}
            </div>
          </div>

          <div className="pc-skill-runner__panel pc-skill-runner__panel--count">
            <strong>{ui.collected} / {ui.target}</strong>
          </div>
        </div>

        <div className="pc-skill-runner__progress">
          <div className="pc-skill-runner__progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        {ui.status !== 'running' && (
          <div className="pc-skill-runner__overlay">
            <div className="pc-skill-runner__overlay-card">
              <span className="pc-skill-runner__overlay-kicker">
                {ui.status === 'success' ? 'Round Clear' : ui.status === 'failed' ? 'Round Failed' : 'Paused'}
              </span>
              <h3>
                {ui.status === 'success' ? '스킬 포인트 확보' : ui.status === 'failed' ? '다시 도전할 수 있습니다' : '게임 일시정지'}
              </h3>
              <p>{ui.note || 'Space로 다시 시작할 수 있습니다.'}</p>

              <div className="pc-skill-runner__actions">
                {ui.status === 'success' && (
                  <button className="pc-skill-runner__button pc-skill-runner__button--gold" onClick={() => completeMinigame(true)} type="button">
                    보상 획득
                  </button>
                )}

                {ui.status === 'failed' && (
                  <>
                    <button className="pc-skill-runner__button pc-skill-runner__button--gold" onClick={handleRetry} type="button">
                      다시 도전
                    </button>
                    <button className="pc-skill-runner__button pc-skill-runner__button--ghost" onClick={cancelMinigame} type="button">
                      스킵
                    </button>
                  </>
                )}

                {ui.status === 'paused' && (
                  <>
                    <button className="pc-skill-runner__button pc-skill-runner__button--gold" onClick={handleResume} type="button">
                      계속
                    </button>
                    <button className="pc-skill-runner__button pc-skill-runner__button--ghost" onClick={cancelMinigame} type="button">
                      종료
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pc-skill-runner__footer">
        <span>Space/↑/W를 짧게 누르면 낮게, 길게 누르면 더 높이 점프합니다.</span>
      </div>
    </div>
  )
}
