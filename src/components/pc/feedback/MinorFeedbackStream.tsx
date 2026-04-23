import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useStore } from '../../../store/useGameStore'
import type { EventFeedbackItem } from '../../../store/slices/eventFeedbackSlice'

/**
 * Minor Feedback Stream
 * ─────────────────────
 * state_change / info 같은 자잘 알림을 우측 상단에 스택으로 표시.
 * 여러 개가 동시에 뜰 수 있고 각자 자동 소멸 (2.6초).
 * backdrop 없음, 게임 진행 방해 없음.
 */
export default function MinorFeedbackStream() {
  const stream = useStore((s) => s.minorStream)
  if (stream.length === 0) return null
  // 한 번에 하나만 렌더 — 우측에서 등장, 중앙 머뭄, 좌측으로 사라짐 (티커식)
  const current = stream[0]
  return createPortal(
    <div className="pc-minor-stream" aria-live="polite">
      <MinorCard key={current.id} item={current} />
    </div>,
    document.body,
  )
}

function MinorCard({ item }: { item: EventFeedbackItem }) {
  const dismiss = useStore((s) => s.dismissMinorFeedback)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const duration = item.autoDismissMs ?? 2600
    const t1 = window.setTimeout(() => setLeaving(true), duration)
    const t2 = window.setTimeout(() => dismiss(item.id), duration + 280)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [item.id, item.autoDismissMs, dismiss])

  const tone = item.tone ?? 'gold'
  return (
    <div
      className={`pc-minor-card tone-${tone} kind-${item.kind}${leaving ? ' is-leaving' : ''}`}
      onClick={() => { setLeaving(true); window.setTimeout(() => dismiss(item.id), 260) }}
      role="status"
    >
      {item.eyebrow ? <div className="pc-minor-card__eyebrow">{item.eyebrow}</div> : null}
      {item.body ? <div className="pc-minor-card__body">{item.body}</div> : null}
    </div>
  )
}
