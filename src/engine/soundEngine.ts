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
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
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

function playFile(path: string, volume = 0.3) {
  if (!enabled) return
  try {
    if (!audioCache[path]) {
      audioCache[path] = new Audio(path)
    }
    const audio = audioCache[path]
    audio.volume = volume
    audio.currentTime = 0
    audio.play().catch(() => {})
  } catch { /* 무시 */ }
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

// ── 게임 이벤트별 사운드 ──

/** Phase 전환 */
export function playPhaseTransition() {
  playFile('/sfx/whoosh.mp3', 0.25)
}

/** 거짓말 붕괴 */
export function playLieCollapse() {
  playFile('/sfx/reveal.mp3', 0.35)
}

/** 증거 제시 */
export function playEvidencePresent() {
  playFile('/sfx/stamp.mp3', 0.25)
}

/** 증거 잠금 해제 */
export function playEvidenceUnlock() {
  playFile('/sfx/notification.mp3', 0.2)
}

/** 증거 조합 격상 */
export function playEvidenceUpgrade() {
  playFile('/sfx/chime.mp3', 0.3)
}

/** 판결 확정 */
export function playVerdictConfirm() {
  playFile('/sfx/chime.mp3', 0.35)
}

/** 클릭/선택 */
export function playClick() {
  playFile('/sfx/click.mp3', 0.15)
}

/** 에러/실패 */
export function playError() {
  playFile('/sfx/alert.mp3', 0.2)
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

// ── V4 연출 사운드 ──

/** #1 NEW FACT 발견 — 밝은 2음 상승 (C5→E5) */
export function playNewFactDiscovery() {
  if (!enabled) return
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
  if (!enabled) return
  try {
    const ctx = getAudioCtx()
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    const lfo = ctx.createOscillator()
    const lfoG = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = 110 // A2
    g.gain.value = 0.15
    lfo.type = 'sine'
    lfo.frequency.value = 8
    lfoG.gain.value = 0.06
    lfo.connect(lfoG).connect(g.gain)
    osc.connect(g).connect(ctx.destination)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.6)
    osc.start(t)
    lfo.start(t)
    osc.stop(t + 0.6)
    lfo.stop(t + 0.6)
  } catch { /* */ }
}

/** #4 모순 발견 — 경고 2음 하강 */
export function playContradiction() {
  if (!enabled) return
  try {
    const ctx = getAudioCtx()
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(440, t)
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.25)
    g.gain.setValueAtTime(0.08, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
    osc.connect(g).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.3)
  } catch { /* */ }
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
  playFile('/sfx/tension.mp3', 0.3)
}

/** #3 조합 성공 */
export function playCombinationSuccess() {
  withAudioContext((ctx) => {
    const start = ctx.currentTime
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
