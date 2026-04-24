import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {
  bucketFromPreset,
  readStoredPreset,
  writeStoredPreset,
  type ScreenBucket,
  type ScreenPresetId,
} from '../utils/screenPresets'

const CHANGE_EVENT = 'solomon:screen-preset-change'

/**
 * 전역 해상도 프리셋 상태 훅.
 * - localStorage persist
 * - Auto 모드: viewport resize 감지
 * - body[data-screen-bucket]에 현재 bucket 반영
 * - 인스턴스끼리 CustomEvent로 동기화 (한 곳에서 setPreset 하면 모든 훅이 재렌더)
 */
export function useScreenPreset(): {
  preset: ScreenPresetId
  bucket: ScreenBucket
  setPreset: (id: ScreenPresetId) => void
} {
  const [preset, setPresetState] = useState<ScreenPresetId>(() => readStoredPreset())
  const [viewportHeight, setViewportHeight] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerHeight : 1080,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onResize = () => setViewportHeight(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onChange = (ev: Event) => {
      const custom = ev as CustomEvent<ScreenPresetId>
      if (custom.detail) setPresetState(custom.detail)
    }
    window.addEventListener(CHANGE_EVENT, onChange as EventListener)
    return () => window.removeEventListener(CHANGE_EVENT, onChange as EventListener)
  }, [])

  const bucket = bucketFromPreset(preset, viewportHeight)

  // body에 data-screen-bucket / data-screen-preset attr 반영 — layout 단계에서 동기 반영
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return
    document.body.dataset.screenBucket = bucket
    document.body.dataset.screenPreset = preset
  }, [bucket, preset])

  const setPreset = useCallback((id: ScreenPresetId) => {
    writeStoredPreset(id)
    setPresetState(id)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent<ScreenPresetId>(CHANGE_EVENT, { detail: id }))
    }
  }, [])

  return { preset, bucket, setPreset }
}
