import type { UnsafeAny } from '../types/lint'
/**
 * 사운드 이벤트 시스템.
 * 실제 MP3 파일 우선, 없으면 Web Audio API 합성음 폴백.
 */

let audioCtx: AudioContext | null = null
let enabled = (() => {
  try { return localStorage.getItem('solomon-sfx') !== 'off' } catch { return true }
})()

function getAudioCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as UnsafeAny).webkitAudioContext)()
  }
  return audioCtx
}

function withAudioContext(run: (ctx: AudioContext) => void) {
  if (!enabled) return
  try {
    const ctx = getAudioCtx()
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
    run(ctx)
  } catch { /* 무시 */ }
}

export function setSoundEnabled(v: boolean) {
  enabled = v
  try { localStorage.setItem('solomon-sfx', v ? 'on' : 'off') } catch { /* */ }
}
export function isSoundEnabled() { return enabled }

// ── MP3 파일 재생 ──

const audioCache: Record<string, HTMLAudioElement> = {}
const sfxCooldowns: Record<string, number> = {}

function playFile(path: string, volume = 0.3) {
  if (!enabled) return
  try {
    if (!audioCache[path]) {
      audioCache[path] = new Audio(path)
    }
    const cached = audioCache[path]
    const audio = cached.paused || cached.ended
      ? cached
      : cached.cloneNode(true) as HTMLAudioElement
    audio.volume = volume
    audio.currentTime = 0
    audio.play().catch(() => {})
  } catch { /* 무시 */ }
}

function playFileDelayed(path: string, volume: number, delayMs: number) {
  if (!enabled) return
  window.setTimeout(() => playFile(path, volume), delayMs)
}

function claimSfxSlot(key: string, cooldownMs: number): boolean {
  const now = Date.now()
  const lastPlayedAt = sfxCooldowns[key] ?? 0
  if (now - lastPlayedAt < cooldownMs) return false
  sfxCooldowns[key] = now
  return true
}

// ── 합성음 폴백 (MP3 로드 실패 시 사용) ──

// @ts-ignore — 향후 폴백용으로 유지
function _playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  if (!enabled) return
  try {
    const ctx = getAudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = frequency
    gain.gain.value = volume
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch { /* 무시 */ }
}

function playFilteredNoise(
  ctx: AudioContext,
  at: number,
  duration: number,
  gainValue: number,
  filterType: BiquadFilterType = 'bandpass',
  frequency = 1800,
  q = 1.8,
) {
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration))
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i += 1) {
    const falloff = 1 - i / bufferSize
    data[i] = (Math.random() * 2 - 1) * falloff
  }
  const source = ctx.createBufferSource()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()
  source.buffer = buffer
  filter.type = filterType
  filter.frequency.setValueAtTime(frequency, at)
  filter.Q.value = q
  gain.gain.setValueAtTime(gainValue, at)
  gain.gain.exponentialRampToValueAtTime(0.001, at + duration)
  source.connect(filter).connect(gain).connect(ctx.destination)
  source.start(at)
  source.stop(at + duration)
}

function playBassDrop(ctx: AudioContext, at: number, from: number, to: number, duration: number, gainValue: number) {
  const osc = ctx.createOscillator()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(from, at)
  osc.frequency.exponentialRampToValueAtTime(to, at + duration)
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(220, at)
  gain.gain.setValueAtTime(0.001, at)
  gain.gain.exponentialRampToValueAtTime(gainValue, at + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.001, at + duration)
  osc.connect(filter).connect(gain).connect(ctx.destination)
  osc.start(at)
  osc.stop(at + duration)
}

function playElectricSnap(ctx: AudioContext, at: number, strength = 1) {
  playFilteredNoise(ctx, at, 0.055, 0.07 * strength, 'bandpass', 3400, 5.5)
  playFilteredNoise(ctx, at + 0.045, 0.085, 0.045 * strength, 'highpass', 2400, 1.1)
  playCourtBeatSweep(ctx, at + 0.008, 1800, 120, 0.13, 'sawtooth', 0.042 * strength)
  playCourtBeatTone(ctx, at + 0.028, 3200, 0.035, 'square', 0.028 * strength)
}

function playSparkCluster(ctx: AudioContext, at: number, frequencies: number[], gainValue: number) {
  frequencies.forEach((frequency, index) => {
    playCourtBeatTone(ctx, at + index * 0.045, frequency, 0.08, index % 2 === 0 ? 'triangle' : 'sine', gainValue)
  })
}

// ── 게임 이벤트별 사운드 ──

/** Phase 전환 */
export function playPhaseTransition() {
  playCutsceneSfx('phase_transition')
}

/** 거짓말 붕괴 */
export function playLieCollapse() {
  playCutsceneSfx('lie_collapse')
}

/** 증거 제시 */
export function playEvidencePresent() {
  playFile('/sfx/stamp.mp3', 0.25)
}

/** 증거 잠금 해제 */
export function playEvidenceUnlock() {
  playFile('/sfx/notification.mp3', 0.24)
  playFileDelayed('/sfx/chime.mp3', 0.18, 190)
  playElectricAura()
}

/** 증거 조합 격상 */
export function playEvidenceUpgrade() {
  playFile('/sfx/chime.mp3', 0.32)
  playFileDelayed('/sfx/reveal.mp3', 0.2, 180)
  withAudioContext((ctx) => {
    const start = ctx.currentTime + 0.02
    playSparkCluster(ctx, start, [523, 659, 784, 1047], 0.05)
  })
}

/** 판결 확정 */
export function playVerdictConfirm() {
  playCutsceneSfx('verdict_gavel')
}

/** 클릭/선택 */
export function playClick() {
  playFile('/sfx/click.mp3', 0.15)
}

/** 에러/실패 */
export function playError() {
  playFile('/sfx/alert.mp3', 0.2)
}

/** 조사 토큰 부족 경고: 짧은 차단 이중 비프 */
export function playInvestigationTokenWarning() {
  withAudioContext((ctx) => {
    const start = ctx.currentTime

    const playBeep = (at: number, frequency: number, peakGain: number) => {
      const osc = ctx.createOscillator()
      const filter = ctx.createBiquadFilter()
      const gain = ctx.createGain()

      osc.type = 'square'
      osc.frequency.setValueAtTime(frequency, at)
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(2400, at)
      gain.gain.setValueAtTime(0.001, at)
      gain.gain.exponentialRampToValueAtTime(peakGain, at + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, at + 0.105)

      osc.connect(filter).connect(gain).connect(ctx.destination)
      osc.start(at)
      osc.stop(at + 0.12)
    }

    playBeep(start, 880, 0.075)
    playBeep(start + 0.14, 660, 0.068)

    const body = ctx.createOscillator()
    const bodyGain = ctx.createGain()
    body.type = 'sine'
    body.frequency.setValueAtTime(176, start)
    body.frequency.exponentialRampToValueAtTime(132, start + 0.16)
    bodyGain.gain.setValueAtTime(0.001, start)
    bodyGain.gain.exponentialRampToValueAtTime(0.04, start + 0.008)
    bodyGain.gain.exponentialRampToValueAtTime(0.001, start + 0.18)
    body.connect(bodyGain).connect(ctx.destination)
    body.start(start)
    body.stop(start + 0.2)
  })
}

/** 분리심문 시작 */
export function playSeparation() {
  playFile('/sfx/tension.mp3', 0.25)
}

/** 재판봉 (3회) */
export function playGavel() {
  playFile('/sfx/gavel.mp3', 0.4)
}

/** 칭호 획득 */
export function playTitleEarned() {
  playFile('/sfx/chime.mp3', 0.35)
}

/** 대사 넘기기 (신규) */
export function playDialogueTick() {
  playFile('/sfx/click.mp3', 0.08)
}

/** 이의 제기 (신규) */
export function playObjection() {
  playFile('/sfx/alert.mp3', 0.4)
}

export type CutsceneSfxType =
  | 'lie_collapse'
  | 'contradiction_hit'
  | 'emotional_burst'
  | 'dispute_emergence'
  | 'phase_transition'
  | 'verdict_gavel'
  | 'dramatic_reveal'
  | 'truth_reveal_trust'
  | 'truth_reveal_slip'
  | 'truth_reveal_witness'

export type LightningSfxIntensity = 'minor' | 'major'

export function playElectricAura() {
  if (!enabled || !claimSfxSlot('electric-aura', 120)) return
  withAudioContext((ctx) => {
    const start = ctx.currentTime + 0.012
    playElectricSnap(ctx, start, 0.58)
    playSparkCluster(ctx, start + 0.08, [1320, 1760, 2217], 0.026)
  })
}

export function playLightningStrike(intensity: LightningSfxIntensity = 'major') {
  if (!enabled) return
  const isMajor = intensity === 'major'
  if (!claimSfxSlot(`lightning-${intensity}`, isMajor ? 360 : 135)) return

  duckBgmForCourtBeat(isMajor ? 980 : 520, isMajor ? 0.025 : 0.06)
  playFile(isMajor ? '/sfx/tension.mp3' : '/sfx/whoosh.mp3', isMajor ? 0.3 : 0.18)
  if (isMajor) {
    playFileDelayed('/sfx/alert.mp3', 0.18, 55)
    playFileDelayed('/sfx/reveal.mp3', 0.24, 190)
  }

  withAudioContext((ctx) => {
    const start = ctx.currentTime + 0.018
    playElectricSnap(ctx, start, isMajor ? 1.35 : 0.82)
    playElectricSnap(ctx, start + (isMajor ? 0.12 : 0.085), isMajor ? 0.95 : 0.48)
    playBassDrop(ctx, start + 0.035, isMajor ? 92 : 74, isMajor ? 34 : 46, isMajor ? 0.55 : 0.28, isMajor ? 0.2 : 0.09)
    playFilteredNoise(ctx, start + 0.16, isMajor ? 0.58 : 0.26, isMajor ? 0.045 : 0.018, 'lowpass', isMajor ? 150 : 240, 0.75)
    if (isMajor) {
      playSparkCluster(ctx, start + 0.28, [1480, 1976, 2637, 3520], 0.032)
      playCourtBeatSweep(ctx, start + 0.44, 640, 98, 0.28, 'sawtooth', 0.05)
    }
  })
}

export function playCutsceneSfx(type: CutsceneSfxType) {
  if (!enabled || !claimSfxSlot(`cutscene-${type}`, 280)) return

  switch (type) {
    case 'lie_collapse':
      duckBgmForCourtBeat(1200, 0.02)
      playFile('/sfx/reveal.mp3', 0.42)
      playFileDelayed('/sfx/tension.mp3', 0.26, 70)
      withAudioContext((ctx) => {
        const start = ctx.currentTime + 0.025
        playBassDrop(ctx, start, 118, 38, 0.62, 0.2)
        playFilteredNoise(ctx, start + 0.12, 0.16, 0.06, 'bandpass', 1400, 3.2)
        playCourtBeatSweep(ctx, start + 0.22, 820, 146, 0.34, 'sawtooth', 0.06)
      })
      break
    case 'contradiction_hit':
      playLightningStrike('major')
      playFileDelayed('/sfx/gavel.mp3', 0.38, 430)
      break
    case 'emotional_burst':
      duckBgmForCourtBeat(850, 0.035)
      playFile('/sfx/alert.mp3', 0.26)
      playFileDelayed('/sfx/tension.mp3', 0.22, 120)
      withAudioContext((ctx) => {
        const start = ctx.currentTime + 0.02
        playBassDrop(ctx, start, 154, 72, 0.32, 0.15)
        playCourtBeatSweep(ctx, start + 0.09, 240, 520, 0.22, 'triangle', 0.055)
        playFilteredNoise(ctx, start + 0.16, 0.12, 0.034, 'bandpass', 980, 2.4)
      })
      break
    case 'dispute_emergence':
      duckBgmForCourtBeat(1000, 0.03)
      playFile('/sfx/tension.mp3', 0.32)
      playFileDelayed('/sfx/reveal.mp3', 0.24, 230)
      withAudioContext((ctx) => {
        const start = ctx.currentTime + 0.02
        playBassDrop(ctx, start, 98, 52, 0.45, 0.13)
        playElectricSnap(ctx, start + 0.16, 0.72)
        playSparkCluster(ctx, start + 0.27, [392, 523, 784, 1047], 0.042)
      })
      break
    case 'phase_transition':
      duckBgmForCourtBeat(720, 0.055)
      playFile('/sfx/whoosh.mp3', 0.34)
      playFileDelayed('/sfx/chime.mp3', 0.25, 330)
      withAudioContext((ctx) => {
        const start = ctx.currentTime + 0.02
        playCourtBeatSweep(ctx, start, 220, 980, 0.46, 'triangle', 0.06)
        playSparkCluster(ctx, start + 0.35, [659, 880, 1175], 0.032)
      })
      break
    case 'verdict_gavel':
      duckBgmForCourtBeat(1250, 0.025)
      playFile('/sfx/gavel.mp3', 0.48)
      playFileDelayed('/sfx/stamp.mp3', 0.3, 190)
      playFileDelayed('/sfx/gavel.mp3', 0.38, 560)
      withAudioContext((ctx) => {
        const start = ctx.currentTime + 0.028
        playBassDrop(ctx, start, 92, 38, 0.36, 0.18)
        playBassDrop(ctx, start + 0.55, 86, 42, 0.34, 0.14)
        playFilteredNoise(ctx, start + 0.025, 0.09, 0.038, 'bandpass', 760, 2.2)
      })
      break
    case 'dramatic_reveal':
      duckBgmForCourtBeat(1100, 0.025)
      playFile('/sfx/tension.mp3', 0.34)
      playFileDelayed('/sfx/reveal.mp3', 0.3, 160)
      playLightningStrike('major')
      break
  }
}

// ── V4 연출 사운드 ──

/** #1 NEW FACT 발견 — 밝은 2음 상승 (C5→E5) */
export function playNewFactDiscovery() {
  if (!enabled) return
  playFile('/sfx/notification.mp3', 0.22)
  playFileDelayed('/sfx/chime.mp3', 0.2, 120)
  try {
    const ctx = getAudioCtx()
    const t = ctx.currentTime
    // 1st note: C5 (523Hz)
    const osc1 = ctx.createOscillator()
    const g1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.value = 523
    g1.gain.setValueAtTime(0.12, t)
    g1.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
    osc1.connect(g1).connect(ctx.destination)
    osc1.start(t)
    osc1.stop(t + 0.15)
    // 2nd note: E5 (659Hz)
    const osc2 = ctx.createOscillator()
    const g2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.value = 659
    g2.gain.setValueAtTime(0.14, t + 0.1)
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
    osc2.connect(g2).connect(ctx.destination)
    osc2.start(t + 0.1)
    osc2.stop(t + 0.3)
  } catch { /* */ }
}

/** #2 숨겨진 쟁점 발견 — 낮은 떨림 (A2 tremolo) */
export function playDisputeDiscovery() {
  playCutsceneSfx('dispute_emergence')
}

/** #4 모순 발견 — 경고 2음 하강 */
export function playContradiction() {
  playCutsceneSfx('contradiction_hit')
}

/** #8 점수 카운터 틱 */
export function playScoreTick() {
  if (!enabled) return
  try {
    const ctx = getAudioCtx()
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 1200
    g.gain.setValueAtTime(0.04, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.02)
    osc.connect(g).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.02)
  } catch { /* */ }
}

/** #14 계좌 감시 폭로 — tension + shake */
export function playDramaticReveal() {
  playCutsceneSfx('dramatic_reveal')
}

/** #3 조합 성공 */
export function playCombinationSuccess() {
  withAudioContext((ctx) => {
    const start = ctx.currentTime
    const body = ctx.createOscillator()
    const bodyGain = ctx.createGain()
    body.type = 'triangle'
    body.frequency.setValueAtTime(196, start)
    body.frequency.exponentialRampToValueAtTime(294, start + 0.16)
    bodyGain.gain.setValueAtTime(0.001, start)
    bodyGain.gain.exponentialRampToValueAtTime(0.04, start + 0.012)
    bodyGain.gain.exponentialRampToValueAtTime(0.001, start + 0.2)
    body.connect(bodyGain).connect(ctx.destination)
    body.start(start)
    body.stop(start + 0.22)

    const notes = [
      { frequency: 523, offset: 0, duration: 0.08, gain: 0.06 },
      { frequency: 659, offset: 0.06, duration: 0.1, gain: 0.08 },
      { frequency: 784, offset: 0.14, duration: 0.14, gain: 0.09 },
    ]

    for (const note of notes) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const noteStart = start + note.offset
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(note.frequency, noteStart)
      gain.gain.setValueAtTime(0.001, noteStart)
      gain.gain.exponentialRampToValueAtTime(note.gain, noteStart + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + note.duration)
      osc.connect(gain).connect(ctx.destination)
      osc.start(noteStart)
      osc.stop(noteStart + note.duration)
    }
  })
}

export function playCombineSuccess() {
  playCombinationSuccess()
}

/** Combination failure */
export function playCombinationFailure() {
  withAudioContext((ctx) => {
    const start = ctx.currentTime

    const tap = ctx.createOscillator()
    const tapFilter = ctx.createBiquadFilter()
    const tapGain = ctx.createGain()
    tap.type = 'triangle'
    tap.frequency.setValueAtTime(170, start)
    tap.frequency.exponentialRampToValueAtTime(90, start + 0.14)
    tapFilter.type = 'lowpass'
    tapFilter.frequency.setValueAtTime(700, start)
    tapGain.gain.setValueAtTime(0.001, start)
    tapGain.gain.exponentialRampToValueAtTime(0.05, start + 0.008)
    tapGain.gain.exponentialRampToValueAtTime(0.001, start + 0.16)
    tap.connect(tapFilter).connect(tapGain).connect(ctx.destination)
    tap.start(start)
    tap.stop(start + 0.18)

    const playBeep = (offset: number, frequency: number, peakGain: number) => {
      const at = start + offset
      const osc = ctx.createOscillator()
      const filter = ctx.createBiquadFilter()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.setValueAtTime(frequency, at)
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1800, at)
      gain.gain.setValueAtTime(0.001, at)
      gain.gain.exponentialRampToValueAtTime(peakGain, at + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, at + 0.11)
      osc.connect(filter).connect(gain).connect(ctx.destination)
      osc.start(at)
      osc.stop(at + 0.13)
    }

    playBeep(0.04, 392, 0.035)
    playBeep(0.17, 294, 0.032)
  })
}

export function playCombineFailure() {
  playCombinationFailure()
}

/** 법정 지배력 사용 */
export function playCourtControl() {
  withAudioContext((ctx) => {
    const start = ctx.currentTime

    const body = ctx.createOscillator()
    const bodyGain = ctx.createGain()
    body.type = 'triangle'
    body.frequency.setValueAtTime(180, start)
    body.frequency.exponentialRampToValueAtTime(58, start + 0.16)
    bodyGain.gain.setValueAtTime(0.001, start)
    bodyGain.gain.exponentialRampToValueAtTime(0.16, start + 0.01)
    bodyGain.gain.exponentialRampToValueAtTime(0.001, start + 0.2)
    body.connect(bodyGain).connect(ctx.destination)
    body.start(start)
    body.stop(start + 0.2)

    const strike = ctx.createOscillator()
    const strikeGain = ctx.createGain()
    const strikeStart = start + 0.012
    strike.type = 'square'
    strike.frequency.setValueAtTime(960, strikeStart)
    strike.frequency.exponentialRampToValueAtTime(220, strikeStart + 0.05)
    strikeGain.gain.setValueAtTime(0.08, strikeStart)
    strikeGain.gain.exponentialRampToValueAtTime(0.001, strikeStart + 0.08)
    strike.connect(strikeGain).connect(ctx.destination)
    strike.start(strikeStart)
    strike.stop(strikeStart + 0.08)
  })
}

/** #12 DossierCard 해금 */
export function playDossierUnlock() {
  playFile('/sfx/notification.mp3', 0.25)
}

// ── 미니게임 SFX (Web Audio 합성음) ──

/** 미니게임 시작 카운트다운 틱 */
export function playMiniGameCountdown() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.type = 'sine'; osc.frequency.value = 880
    gain.gain.setValueAtTime(0.12, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12)
    osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t + 0.12)
  })
}

/** 미니게임 시작 "Go!" */
export function playMiniGameStart() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    ;[523, 659, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.type = 'sine'; osc.frequency.value = freq
      gain.gain.setValueAtTime(0.15, t + i * 0.08); gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.15)
      osc.connect(gain); gain.connect(ctx.destination); osc.start(t + i * 0.08); osc.stop(t + i * 0.08 + 0.15)
    })
  })
}

/** 짝맞추기: 카드 뒤집기 */
export function playCardFlip() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.type = 'sine'; osc.frequency.value = 600
    gain.gain.setValueAtTime(0.08, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
    osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t + 0.06)
  })
}

/** 짝맞추기: 짝 맞음 */
export function playCardMatch() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    ;[523, 659].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.type = 'sine'; osc.frequency.value = freq
      gain.gain.setValueAtTime(0.12, t + i * 0.1); gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.15)
      osc.connect(gain); gain.connect(ctx.destination); osc.start(t + i * 0.1); osc.stop(t + i * 0.1 + 0.15)
    })
  })
}

/** 짝맞추기: 짝 틀림 */
export function playCardMismatch() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.type = 'square'; osc.frequency.value = 200
    gain.gain.setValueAtTime(0.08, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
    osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t + 0.15)
  })
}

/** 러너: 스킬 조각 수집 */
export function playRunnerCollect() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.type = 'sine'; osc.frequency.value = 1047
    gain.gain.setValueAtTime(0.1, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08)
    osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t + 0.08)
  })
}

/** 러너: 장애물 피격 */
export function playRunnerHit() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.type = 'sawtooth'; osc.frequency.value = 150
    gain.gain.setValueAtTime(0.12, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2)
    osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t + 0.2)
  })
}

/** 러너: 점프 */
export function playRunnerJump() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.type = 'sine'; osc.frequency.setValueAtTime(300, t); osc.frequency.exponentialRampToValueAtTime(600, t + 0.1)
    gain.gain.setValueAtTime(0.06, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1)
    osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t + 0.1)
  })
}

/** 두더지: 범인 적중 */
export function playMoleHit() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.type = 'sine'; osc.frequency.value = 700
    gain.gain.setValueAtTime(0.12, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1)
    osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t + 0.1)
  })
}

/** 두더지: 시민 오타격 */
export function playMoleMiss() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    ;[300, 200].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.type = 'square'; osc.frequency.value = freq
      gain.gain.setValueAtTime(0.08, t + i * 0.1); gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.12)
      osc.connect(gain); gain.connect(ctx.destination); osc.start(t + i * 0.1); osc.stop(t + i * 0.1 + 0.12)
    })
  })
}

/** 두더지: 보스 적중 */
export function playMoleBossHit() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    ;[523, 659, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.type = 'sine'; osc.frequency.value = freq
      gain.gain.setValueAtTime(0.14, t + i * 0.06); gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.12)
      osc.connect(gain); gain.connect(ctx.destination); osc.start(t + i * 0.06); osc.stop(t + i * 0.06 + 0.12)
    })
  })
}

/** 두더지: 시민 잡음 (경고음) */
export function playMoleCivilianHit() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    ;[400, 300, 200].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.type = 'sawtooth'; osc.frequency.value = freq
      gain.gain.setValueAtTime(0.1, t + i * 0.08); gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.1)
      osc.connect(gain); gain.connect(ctx.destination); osc.start(t + i * 0.08); osc.stop(t + i * 0.08 + 0.1)
    })
  })
}

/** 두더지: 두더지 놓침 (시간 초과로 내려감) */
export function playMoleEscape() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.type = 'sine'; osc.frequency.setValueAtTime(400, t); osc.frequency.exponentialRampToValueAtTime(200, t + 0.15)
    gain.gain.setValueAtTime(0.05, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
    osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t + 0.15)
  })
}

/** 타이머 경고 (10초 이하) */
export function playTimerWarning() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.type = 'sine'; osc.frequency.value = 880
    gain.gain.setValueAtTime(0.06, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08)
    osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t + 0.08)
  })
}

/** 미니게임 성공 */
export function playMiniGameSuccess() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    ;[523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.type = 'sine'; osc.frequency.value = freq
      gain.gain.setValueAtTime(0.12, t + i * 0.1); gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.25)
      osc.connect(gain); gain.connect(ctx.destination); osc.start(t + i * 0.1); osc.stop(t + i * 0.1 + 0.25)
    })
  })
}

/** 미니게임 실패 */
export function playMiniGameFail() {
  withAudioContext((ctx) => {
    const t = ctx.currentTime
    ;[400, 300, 200].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.type = 'triangle'; osc.frequency.value = freq
      gain.gain.setValueAtTime(0.1, t + i * 0.12); gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.2)
      osc.connect(gain); gain.connect(ctx.destination); osc.start(t + i * 0.12); osc.stop(t + i * 0.12 + 0.2)
    })
  })
}

// ── BGM 시스템 ──

let bgmAudio: HTMLAudioElement | null = null
let bgmEnabled = (() => {
  try { return localStorage.getItem('solomon-bgm') !== 'off' } catch { return true }
})()
let currentBgmTrack = ''
let audioUnlocked = false

// 브라우저 Autoplay Policy 해제 — 첫 유저 인터랙션 시 실행
function unlockAudio() {
  if (audioUnlocked) return
  audioUnlocked = true
  // 무음 AudioContext 생성으로 오디오 잠금 해제
  try {
    const ctx = new AudioContext()
    const buf = ctx.createBuffer(1, 1, 22050)
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.connect(ctx.destination)
    src.start(0)
    ctx.resume().catch(() => {})
  } catch { /* */ }
  // 대기 중인 BGM이 있으면 재생
  if (currentBgmTrack && bgmEnabled && bgmAudio) {
    bgmAudio.play().catch(() => {})
  }
  document.removeEventListener('click', unlockAudio)
  document.removeEventListener('touchstart', unlockAudio)
}
document.addEventListener('click', unlockAudio, { passive: true })
document.addEventListener('touchstart', unlockAudio, { passive: true })

export function setBgmEnabled(v: boolean) {
  bgmEnabled = v
  try { localStorage.setItem('solomon-bgm', v ? 'on' : 'off') } catch { /* */ }
  if (!v && bgmAudio) {
    bgmAudio.pause()
  } else if (v && bgmAudio && currentBgmTrack) {
    bgmAudio.play().catch(() => {})
  }
}
export function isBgmEnabled() { return bgmEnabled }

/** BGM 재생 (루프). 같은 트랙이면 무시. */
export function playBgm(track: string, volume = 0.15) {
  if (currentBgmTrack === track && bgmAudio && !bgmAudio.paused) return
  stopBgm()
  currentBgmTrack = track
  if (!bgmEnabled) return
  try {
    bgmAudio = new Audio(track)
    bgmAudio.loop = true
    bgmAudio.volume = volume
    if (audioUnlocked) {
      bgmAudio.play().catch(() => {})
    }
    // audioUnlocked가 false면 unlockAudio에서 자동 재생
  } catch { /* */ }
}

/** BGM 정지 */
export function stopBgm() {
  if (bgmAudio) {
    bgmAudio.pause()
    bgmAudio.currentTime = 0
    bgmAudio = null
  }
  currentBgmTrack = ''
}

export type CourtBeatCue =
  | 'silent'
  | 'evidence'
  | 'contradiction'
  | 'dispute'
  | 'witness'
  | 'notebook'
  | 'truth'
  | 'emotion'
  | 'choice'

export type CourtBeatLevel = 'focus' | 'impact' | 'breakthrough'

let courtBeatBgmRestoreTimer: number | null = null

function duckBgmForCourtBeat(durationMs: number, volume: number) {
  if (!bgmAudio || !bgmEnabled) return
  const originalVolume = bgmAudio.volume
  bgmAudio.volume = Math.min(originalVolume, volume)
  if (courtBeatBgmRestoreTimer != null) {
    window.clearTimeout(courtBeatBgmRestoreTimer)
  }
  courtBeatBgmRestoreTimer = window.setTimeout(() => {
    if (bgmAudio) bgmAudio.volume = originalVolume
    courtBeatBgmRestoreTimer = null
  }, durationMs)
}

export function duckBgmForImpact(durationMs: number, reductionDb = -30) {
  if (!bgmAudio || !bgmEnabled) return
  const targetVolume = bgmAudio.volume * Math.pow(10, reductionDb / 20)
  duckBgmForCourtBeat(durationMs, targetVolume)
}

function playCourtBeatTone(
  ctx: AudioContext,
  at: number,
  frequency: number,
  duration: number,
  type: OscillatorType,
  gainValue: number,
  destination: AudioNode = ctx.destination,
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, at)
  gain.gain.setValueAtTime(0.001, at)
  gain.gain.exponentialRampToValueAtTime(gainValue, at + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.001, at + duration)
  osc.connect(gain).connect(destination)
  osc.start(at)
  osc.stop(at + duration)
}

function playCourtBeatSweep(
  ctx: AudioContext,
  at: number,
  from: number,
  to: number,
  duration: number,
  type: OscillatorType,
  gainValue: number,
  destination: AudioNode = ctx.destination,
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(from, at)
  osc.frequency.exponentialRampToValueAtTime(to, at + duration)
  gain.gain.setValueAtTime(0.001, at)
  gain.gain.exponentialRampToValueAtTime(gainValue, at + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.001, at + duration)
  osc.connect(gain).connect(destination)
  osc.start(at)
  osc.stop(at + duration)
}

function playCourtBeatNoise(ctx: AudioContext, at: number, duration: number, gainValue: number) {
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration))
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i += 1) {
    const falloff = 1 - i / bufferSize
    data[i] = (Math.random() * 2 - 1) * falloff
  }
  const source = ctx.createBufferSource()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()
  source.buffer = buffer
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(1800, at)
  filter.Q.value = 2.4
  gain.gain.setValueAtTime(gainValue, at)
  gain.gain.exponentialRampToValueAtTime(0.001, at + duration)
  source.connect(filter).connect(gain).connect(ctx.destination)
  source.start(at)
  source.stop(at + duration)
}

function playEvidenceHitMajorSound(ctx: AudioContext, at: number) {
  const body = ctx.createOscillator()
  const bodyGain = ctx.createGain()
  body.type = 'sine'
  body.frequency.setValueAtTime(82, at)
  body.frequency.exponentialRampToValueAtTime(58, at + 0.22)
  bodyGain.gain.setValueAtTime(0.001, at)
  bodyGain.gain.exponentialRampToValueAtTime(0.2, at + 0.006)
  bodyGain.gain.exponentialRampToValueAtTime(0.001, at + 0.26)
  body.connect(bodyGain).connect(ctx.destination)
  body.start(at)
  body.stop(at + 0.28)

  const click = ctx.createOscillator()
  const clickGain = ctx.createGain()
  click.type = 'triangle'
  click.frequency.setValueAtTime(3900, at + 0.018)
  clickGain.gain.setValueAtTime(0.001, at + 0.018)
  clickGain.gain.exponentialRampToValueAtTime(0.11, at + 0.022)
  clickGain.gain.exponentialRampToValueAtTime(0.001, at + 0.062)
  click.connect(clickGain).connect(ctx.destination)
  click.start(at + 0.018)
  click.stop(at + 0.08)

  playCourtBeatNoise(ctx, at + 0.05, 0.09, 0.05)
}

function playJudicialStampSound(ctx: AudioContext, at: number) {
  const thump = ctx.createOscillator()
  const gain = ctx.createGain()
  thump.type = 'sine'
  thump.frequency.setValueAtTime(116, at)
  thump.frequency.exponentialRampToValueAtTime(72, at + 0.1)
  gain.gain.setValueAtTime(0.001, at)
  gain.gain.exponentialRampToValueAtTime(0.13, at + 0.005)
  gain.gain.exponentialRampToValueAtTime(0.001, at + 0.16)
  thump.connect(gain).connect(ctx.destination)
  thump.start(at)
  thump.stop(at + 0.18)

  const tick = ctx.createOscillator()
  const tickGain = ctx.createGain()
  tick.type = 'square'
  tick.frequency.setValueAtTime(2700, at + 0.01)
  tickGain.gain.setValueAtTime(0.001, at + 0.01)
  tickGain.gain.exponentialRampToValueAtTime(0.045, at + 0.016)
  tickGain.gain.exponentialRampToValueAtTime(0.001, at + 0.04)
  tick.connect(tickGain).connect(ctx.destination)
  tick.start(at + 0.01)
  tick.stop(at + 0.055)
}

function playEvidenceMissSound(ctx: AudioContext, at: number) {
  const tap = ctx.createOscillator()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()
  tap.type = 'sine'
  tap.frequency.setValueAtTime(176, at)
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(560, at)
  gain.gain.setValueAtTime(0.001, at)
  gain.gain.exponentialRampToValueAtTime(0.075, at + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.001, at + 0.14)
  tap.connect(filter).connect(gain).connect(ctx.destination)
  tap.start(at)
  tap.stop(at + 0.16)
}

function playCourtBeatFileLayers(cue: CourtBeatCue, level: CourtBeatLevel) {
  if (level === 'focus') return

  if (cue === 'contradiction') {
    playFile('/sfx/reveal.mp3', level === 'breakthrough' ? 0.36 : 0.26)
    playFileDelayed('/sfx/gavel.mp3', level === 'breakthrough' ? 0.36 : 0.26, level === 'breakthrough' ? 520 : 360)
    playLightningStrike(level === 'breakthrough' ? 'major' : 'minor')
    return
  }

  if (cue === 'dispute') {
    playFile('/sfx/tension.mp3', level === 'breakthrough' ? 0.32 : 0.22)
    playFileDelayed('/sfx/reveal.mp3', level === 'breakthrough' ? 0.26 : 0.18, 210)
    if (level === 'breakthrough') playLightningStrike('major')
    return
  }

  if (cue === 'evidence') {
    playFile('/sfx/whoosh.mp3', 0.2)
    playFileDelayed('/sfx/stamp.mp3', 0.28, 120)
    playFileDelayed('/sfx/chime.mp3', level === 'breakthrough' ? 0.24 : 0.16, 360)
    if (level === 'breakthrough') playLightningStrike('minor')
    return
  }

  if (cue === 'witness') {
    playFile('/sfx/notification.mp3', 0.22)
    playFileDelayed('/sfx/chime.mp3', 0.2, 220)
    return
  }

  if (cue === 'emotion') {
    playFile('/sfx/alert.mp3', level === 'breakthrough' ? 0.24 : 0.18)
    playFileDelayed('/sfx/tension.mp3', level === 'breakthrough' ? 0.26 : 0.18, 110)
    return
  }

  if (cue === 'truth') {
    playFile('/sfx/reveal.mp3', level === 'breakthrough' ? 0.34 : 0.22)
    if (level === 'breakthrough') playFileDelayed('/sfx/chime.mp3', 0.24, 280)
    return
  }

  if (cue === 'choice') {
    playFile('/sfx/whoosh.mp3', 0.18)
    playFileDelayed('/sfx/stamp.mp3', 0.18, 170)
  }
}

export function playCourtBeat(cue: CourtBeatCue, level: CourtBeatLevel = 'impact') {
  if (!enabled || cue === 'silent') return

  const duckDuration = level === 'breakthrough' ? 1150 : level === 'impact' ? 820 : 420
  const duckVolume = level === 'breakthrough' ? 0.02 : level === 'impact' ? 0.035 : 0.075
  duckBgmForCourtBeat(duckDuration, duckVolume)
  playCourtBeatFileLayers(cue, level)

  withAudioContext((ctx) => {
    const start = ctx.currentTime + 0.035
    const accentByCue: Record<CourtBeatCue, number> = {
      silent: 440,
      evidence: 780,
      contradiction: 260,
      dispute: 118,
      witness: 620,
      notebook: 420,
      truth: 520,
      emotion: 196,
      choice: 360,
    }
    const accent = accentByCue[cue]

    if (cue === 'contradiction' && level !== 'focus') {
      playEvidenceHitMajorSound(ctx, start)
      playJudicialStampSound(ctx, start + 0.64)
      return
    }

    if (cue === 'notebook') {
      playJudicialStampSound(ctx, start)
      return
    }

    if (cue === 'evidence' && level === 'focus') {
      playEvidenceMissSound(ctx, start)
      return
    }

    if (level === 'focus') {
      playCourtBeatTone(ctx, start, 132, 0.09, 'triangle', 0.05)
      playCourtBeatTone(ctx, start + 0.12, accent, 0.08, 'sine', 0.045)
      return
    }

    playCourtBeatSweep(ctx, start, 180, level === 'breakthrough' ? 46 : 62, 0.22, 'triangle', level === 'breakthrough' ? 0.17 : 0.12)
    playCourtBeatTone(ctx, start + 0.025, 880, 0.055, 'square', 0.045)

    if (cue === 'contradiction') {
      playCourtBeatSweep(ctx, start + 0.1, 520, 180, 0.18, 'sawtooth', 0.055)
      playCourtBeatNoise(ctx, start + 0.12, 0.12, 0.028)
    } else if (cue === 'dispute') {
      playCourtBeatSweep(ctx, start + 0.08, 1500, 260, 0.24, 'sawtooth', 0.04)
      playCourtBeatNoise(ctx, start + 0.18, 0.16, 0.035)
    } else if (cue === 'evidence') {
      playCourtBeatTone(ctx, start + 0.11, 740, 0.12, 'triangle', 0.05)
      playCourtBeatTone(ctx, start + 0.19, 1110, 0.1, 'sine', 0.035)
    } else if (cue === 'witness') {
      playCourtBeatTone(ctx, start + 0.11, 620, 0.1, 'triangle', 0.04)
      playCourtBeatTone(ctx, start + 0.19, 780, 0.11, 'triangle', 0.04)
    } else if (cue === 'emotion') {
      playCourtBeatSweep(ctx, start + 0.1, 230, 155, 0.2, 'triangle', 0.06)
    } else {
      playCourtBeatTone(ctx, start + 0.13, accent, 0.12, 'sine', 0.045)
    }

    if (level === 'breakthrough') {
      playCourtBeatNoise(ctx, start + 0.28, 0.18, 0.04)
      playCourtBeatTone(ctx, start + 0.31, accent * 1.5, 0.16, 'triangle', 0.055)
      playCourtBeatTone(ctx, start + 0.46, accent * 2, 0.2, 'sine', 0.035)
    }
  })
}
