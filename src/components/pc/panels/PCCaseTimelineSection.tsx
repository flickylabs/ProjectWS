import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useStore } from '../../../store/useGameStore'
import type { GameEvent } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'

type TimelineItem = GameEvent & { summary: string; iconId: string; tone: 'gold' | 'red' | 'blue' | 'green' | 'neutral' }

const EVENT_ICON_MAP: Record<string, string> = {
  state_transition: 'i-bolt',
  event_trigger: 'i-flame',
  discovery: 'i-search',
  question_effect: 'i-gavel',
}

const TONE_MAP: Record<string, TimelineItem['tone']> = {
  state_transition: 'red',
  event_trigger: 'gold',
  discovery: 'blue',
  question_effect: 'neutral',
}

function summarizeEvent(event: GameEvent): string {
  const msg = event.message.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim()
  if (msg.length <= 40) return msg
  return `${msg.slice(0, 39).trim()}…`
}

export default function PCCaseTimelineSection() {
  const gameEventLog = useStore((s) => s.gameEventLog)
  const dialogueLog = useStore((s) => s.dialogueLog)
  const scrollRef = useRef<HTMLDivElement>(null)

  const timelineItems = useMemo<TimelineItem[]>(() => {
    return gameEventLog.map((event) => ({
      ...event,
      summary: summarizeEvent(event),
      iconId: EVENT_ICON_MAP[event.type] ?? 'i-doc',
      tone: TONE_MAP[event.type] ?? 'neutral',
    }))
  }, [gameEventLog])

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [timelineItems.length])

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    }
  }, [])

  const scrollChatToTurn = useCallback((turn: number) => {
    const entry = dialogueLog.find((d) => d.turn === turn && !d.isHidden)
    if (!entry) return

    const chatArea = document.querySelector('.pc-play-chat')
    if (!chatArea) return

    const messageEl = chatArea.querySelector(`[data-dialogue-id="${entry.id}"]`)
    if (messageEl) {
      messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
      messageEl.classList.add('is-highlight')
      setTimeout(() => messageEl.classList.remove('is-highlight'), 1500)
    }
  }, [dialogueLog])

  return (
    <section className="sec pc-case-timeline-section">
      <div className="sec-h">
        <PCSvgIcon id="i-clock" size={14} />
        <span>사건 타임라인</span>
        <span className="cnt">{timelineItems.length}</span>
        <button
          className="pc-timeline-top-btn"
          onClick={scrollToBottom}
          title="최근으로 이동"
          type="button"
        >
          Top ↓
        </button>
      </div>

      <div className="sec-content">
        <div className="pc-timeline__scroll" ref={scrollRef}>
          {timelineItems.length === 0 ? (
            <div className="pc-timeline__empty">이벤트가 발생하면 여기에 기록됩니다.</div>
          ) : (
            <div className="pc-timeline__track">
              {timelineItems.map((item, index) => (
                <button
                  className={`pc-timeline__item is-${item.tone}`}
                  key={item.id}
                  onClick={() => scrollChatToTurn(item.turn)}
                  title="클릭하면 해당 시점으로 이동합니다"
                  type="button"
                >
                  <span className="pc-timeline__rail">
                    {index > 0 ? <span className="pc-timeline__line" /> : null}
                    <span className={`pc-timeline__dot is-${item.tone}`} />
                    {index < timelineItems.length - 1 ? <span className="pc-timeline__line" /> : null}
                  </span>
                  <span className="pc-timeline__content">
                    <span className="pc-timeline__turn">T{item.turn}</span>
                    <span className="pc-timeline__summary">{item.summary}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
