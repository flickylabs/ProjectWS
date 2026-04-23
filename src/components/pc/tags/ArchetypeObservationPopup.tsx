import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ARCHETYPE_OBSERVATION_EVENT,
  type ArchetypeObservationDetail,
} from '../../../hooks/useActionDispatch'
import { ARCHETYPE_META } from '../../../engine/archetypeHintEngine'
import { useGameStore } from '../../../store/useGameStore'

type Phase = 'appearing' | 'visible' | 'converging' | 'done'

interface PopupState {
  id: number
  detail: ArchetypeObservationDetail
  phase: Phase
  convergeTransform?: string
}

let nextId = 0

/**
 * Archetype 관찰 팝업
 * - 커스텀 이벤트 `pc:archetype-observation` 수신
 * - 화면 중앙 상단에 등장(scale+fade)
 * - 약 1.2초 표시 후 해당 캐릭터 태그(`[data-archetype-tag="p:a"]`)로 수렴
 * - 태그가 DOM에 없으면 그냥 fade-out
 */
export default function ArchetypeObservationPopup() {
  const [popup, setPopup] = useState<PopupState | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<ArchetypeObservationDetail>).detail
      if (!detail) return
      // 다른 모달/팝업 활성 시 관찰 표시 skip (겹침 방지)
      const s = useGameStore.getState() as any
      const busy = Boolean(
        s.discovery?.pendingSlip
        || s.discovery?.pendingEmergence
        || s.discovery?.pendingConfrontation
        || s.discovery?.pendingConflict
        || s.pendingGameEvent
        || s.pendingPerkChoice
        || s.pendingWitnessChoice
        || s.pendingTransitionChoice
        || s.pendingEvidenceResult,
      )
      if (busy) return
      setPopup({ id: ++nextId, detail, phase: 'appearing' })
    }
    window.addEventListener(ARCHETYPE_OBSERVATION_EVENT, handler)
    return () => window.removeEventListener(ARCHETYPE_OBSERVATION_EVENT, handler)
  }, [])

  useEffect(() => {
    if (!popup) return

    let visibleTimer: number | null = null
    let convergeTimer: number | null = null
    let doneTimer: number | null = null

    if (popup.phase === 'appearing') {
      // 등장 애니메이션이 끝난 후 visible로
      const id = window.setTimeout(() => {
        setPopup((prev) => (prev && prev.id === popup.id ? { ...prev, phase: 'visible' } : prev))
      }, 40)
      return () => window.clearTimeout(id)
    }

    if (popup.phase === 'visible') {
      visibleTimer = window.setTimeout(() => {
        // 태그 위치 계산
        const tagKey = `${popup.detail.party}:${popup.detail.archetype}`
        const targetEl = document.querySelector<HTMLElement>(`[data-archetype-tag="${tagKey}"]`)
        const popupEl = popupRef.current
        let transform = 'translate(0, -20px) scale(0.2)'
        if (targetEl && popupEl) {
          const targetRect = targetEl.getBoundingClientRect()
          const popupRect = popupEl.getBoundingClientRect()
          const targetCenterX = targetRect.left + targetRect.width / 2
          const targetCenterY = targetRect.top + targetRect.height / 2
          const popupCenterX = popupRect.left + popupRect.width / 2
          const popupCenterY = popupRect.top + popupRect.height / 2
          const dx = targetCenterX - popupCenterX
          const dy = targetCenterY - popupCenterY
          transform = `translate(${dx}px, ${dy}px) scale(0.15)`
        }
        setPopup((prev) => (prev && prev.id === popup.id ? { ...prev, phase: 'converging', convergeTransform: transform } : prev))
      }, 3500)
      return () => { if (visibleTimer) window.clearTimeout(visibleTimer) }
    }

    if (popup.phase === 'converging') {
      convergeTimer = window.setTimeout(() => {
        setPopup((prev) => (prev && prev.id === popup.id ? { ...prev, phase: 'done' } : prev))
      }, 500)
      return () => { if (convergeTimer) window.clearTimeout(convergeTimer) }
    }

    if (popup.phase === 'done') {
      doneTimer = window.setTimeout(() => {
        setPopup((prev) => (prev && prev.id === popup.id ? null : prev))
      }, 50)
      return () => { if (doneTimer) window.clearTimeout(doneTimer) }
    }
  }, [popup])

  if (!popup) return null

  const meta = ARCHETYPE_META[popup.detail.archetype]
  const tagLabel = meta?.tagLabel ?? popup.detail.archetype

  return createPortal(
    <div className="pc-archetype-popup-root" aria-live="polite">
      <div
        ref={popupRef}
        className={`pc-archetype-popup is-phase-${popup.phase}`}
        style={popup.phase === 'converging' && popup.convergeTransform
          ? { transform: popup.convergeTransform, opacity: 0 }
          : undefined}
      >
        <span className="pc-archetype-popup__eyebrow">재판관의 관찰</span>
        <span className="pc-archetype-popup__hint">{popup.detail.hintText}</span>
        <span className="pc-archetype-popup__tag">{tagLabel}</span>
      </div>
    </div>,
    document.body,
  )
}
