/**
 * Screen resolution preset system
 * ───────────────────────────────
 * 유저가 '설정'에서 해상도를 선택하면 body에 data-screen-bucket attr을 부여해
 * 각 UI 영역이 세로 높이에 맞춰 단계적으로 축소됩니다.
 *
 * Auto 모드는 viewport 크기를 가장 가까운 프리셋으로 자동 매칭.
 */

export type ScreenPresetId =
  | 'auto'
  | '1366x768'
  | '1440x900'
  | '1920x1080'
  | '2560x1080'
  | '2560x1440'
  | '2560x1600'
  | '3440x1440'
  | '3840x2160'

export type ScreenBucket = 'L' | 'M' | 'S' | 'XS'

export interface ScreenPreset {
  id: Exclude<ScreenPresetId, 'auto'>
  label: string
  width: number
  height: number
  note?: string
}

export const SCREEN_PRESETS: ScreenPreset[] = [
  { id: '1366x768', label: '1366 x 768', width: 1366, height: 768, note: 'HD' },
  { id: '1440x900', label: '1440 x 900', width: 1440, height: 900, note: '16:10' },
  { id: '1920x1080', label: '1920 x 1080', width: 1920, height: 1080, note: 'FHD' },
  { id: '2560x1080', label: '2560 x 1080', width: 2560, height: 1080, note: '21:9' },
  { id: '2560x1440', label: '2560 x 1440', width: 2560, height: 1440, note: 'QHD' },
  { id: '2560x1600', label: '2560 x 1600', width: 2560, height: 1600, note: '16:10' },
  { id: '3440x1440', label: '3440 x 1440', width: 3440, height: 1440, note: 'UWQHD' },
  { id: '3840x2160', label: '3840 x 2160', width: 3840, height: 2160, note: '4K' },
]

export const DEFAULT_PRESET: ScreenPresetId = 'auto'
export const STORAGE_KEY = 'solomon-screen-preset'

/** 세로 높이 → bucket 매핑 */
export function bucketFromHeight(h: number): ScreenBucket {
  if (h >= 1080) return 'L'
  if (h >= 900) return 'M'
  if (h >= 768) return 'S'
  return 'XS'
}

/** 프리셋 id → bucket */
export function bucketFromPreset(id: ScreenPresetId, viewportHeight: number): ScreenBucket {
  if (id === 'auto') return bucketFromHeight(viewportHeight)
  const p = SCREEN_PRESETS.find((x) => x.id === id)
  if (!p) return bucketFromHeight(viewportHeight)
  return bucketFromHeight(p.height)
}

/** viewport 크기와 가장 가까운 프리셋 자동 매칭 (Auto 모드에서 라벨 표시용) */
export function nearestPreset(vw: number, vh: number): ScreenPreset {
  let best = SCREEN_PRESETS[0]
  let bestDiff = Infinity
  for (const p of SCREEN_PRESETS) {
    // 세로 차이에 가중치 2배 (세로 기준 반응형이므로)
    const diff = Math.abs(p.height - vh) * 2 + Math.abs(p.width - vw)
    if (diff < bestDiff) {
      best = p
      bestDiff = diff
    }
  }
  return best
}

export function readStoredPreset(): ScreenPresetId {
  if (typeof window === 'undefined') return DEFAULT_PRESET
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw === 'auto') return 'auto'
    if (raw && SCREEN_PRESETS.some((p) => p.id === raw)) return raw as ScreenPresetId
  } catch {
    /* ignore */
  }
  return DEFAULT_PRESET
}

export function writeStoredPreset(id: ScreenPresetId): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* ignore */
  }
}
