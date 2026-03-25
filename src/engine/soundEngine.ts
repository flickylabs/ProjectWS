/**
 * 사운드 이벤트 시스템.
 * 실제 음원 파일 없이도 Web Audio API로 간단한 효과음을 생성한다.
 * 나중에 음원 파일로 교체 가능.
 */

let audioCtx: AudioContext | null = null
let enabled = true

function getAudioCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioCtx
}

export function setSoundEnabled(v: boolean) { enabled = v }
export function isSoundEnabled() { return enabled }

/** 간단한 톤 재생 */
function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
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
  playTone(523, 0.15, 'sine', 0.1)  // C5
  setTimeout(() => playTone(659, 0.15, 'sine', 0.1), 100)  // E5
  setTimeout(() => playTone(784, 0.2, 'sine', 0.1), 200)  // G5
}

/** 거짓말 붕괴 */
export function playLieCollapse() {
  playTone(880, 0.1, 'sawtooth', 0.08)
  setTimeout(() => playTone(660, 0.1, 'sawtooth', 0.08), 80)
  setTimeout(() => playTone(440, 0.2, 'sawtooth', 0.06), 160)
}

/** 증거 제시 */
export function playEvidencePresent() {
  playTone(440, 0.1, 'triangle', 0.1)
  setTimeout(() => playTone(554, 0.15, 'triangle', 0.1), 100)
}

/** 증거 잠금 해제 */
export function playEvidenceUnlock() {
  playTone(330, 0.08, 'sine', 0.08)
  setTimeout(() => playTone(440, 0.08, 'sine', 0.08), 60)
  setTimeout(() => playTone(660, 0.15, 'sine', 0.1), 120)
}

/** 증거 조합 격상 */
export function playEvidenceUpgrade() {
  playTone(440, 0.1, 'sine', 0.1)
  setTimeout(() => playTone(554, 0.1, 'sine', 0.1), 100)
  setTimeout(() => playTone(660, 0.1, 'sine', 0.1), 200)
  setTimeout(() => playTone(880, 0.2, 'sine', 0.12), 300)
}

/** 판결 확정 */
export function playVerdictConfirm() {
  playTone(262, 0.15, 'sine', 0.1)
  setTimeout(() => playTone(330, 0.15, 'sine', 0.1), 150)
  setTimeout(() => playTone(392, 0.15, 'sine', 0.1), 300)
  setTimeout(() => playTone(523, 0.3, 'sine', 0.12), 450)
}

/** 클릭/선택 */
export function playClick() {
  playTone(800, 0.05, 'sine', 0.05)
}

/** 에러/실패 */
export function playError() {
  playTone(200, 0.15, 'square', 0.06)
  setTimeout(() => playTone(150, 0.2, 'square', 0.04), 120)
}

/** 분리심문 시작 */
export function playSeparation() {
  playTone(392, 0.1, 'triangle', 0.08)
  setTimeout(() => playTone(294, 0.2, 'triangle', 0.06), 100)
}

/** 칭호 획득 */
export function playTitleEarned() {
  playTone(523, 0.1, 'sine', 0.1)
  setTimeout(() => playTone(659, 0.1, 'sine', 0.1), 120)
  setTimeout(() => playTone(784, 0.1, 'sine', 0.1), 240)
  setTimeout(() => playTone(1047, 0.3, 'sine', 0.12), 360)
}
