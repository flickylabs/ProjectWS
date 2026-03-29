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

// ── BGM 시스템 ──

let bgmAudio: HTMLAudioElement | null = null
let bgmEnabled = (() => {
  try { return localStorage.getItem('solomon-bgm') !== 'off' } catch { return true }
})()
let currentBgmTrack = ''

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
  if (!bgmEnabled) { currentBgmTrack = track; return }
  try {
    bgmAudio = new Audio(track)
    bgmAudio.loop = true
    bgmAudio.volume = volume
    bgmAudio.play().catch(() => {})
    currentBgmTrack = track
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
