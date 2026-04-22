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
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const scrollRef = useRef<HTMLDivElement>(null)

  const timelineItems = useMemo<TimelineItem[]>(() => {
    return gameEventLog.map((event) => ({
      ...event,
      summary: summarizeEvent(event),
      iconId: EVENT_ICON_MAP[event.type] ?? 'i-doc',
      tone: TONE_MAP[event.type] ?? 'neutral',
    }))
  }, [gameEventLog])

  const mysteryPoints = useMemo(() => {
    if (!caseData) return []
    const LIE_ORDER = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
    return caseData.disputes
      .filter((d) => {
        const stA = agentA?.lieStateMap[d.id]?.currentState ?? 'S0'
        const stB = agentB?.lieStateMap[d.id]?.currentState ?? 'S0'
        return Math.max(LIE_ORDER.indexOf(stA), LIE_ORDER.indexOf(stB)) < 3
      })
      .map((d) => ({ id: `mystery-${d.id}`, hint: `이 시기에 무언가 있었을 것 같다` }))
      .slice(0, 3)
  }, [caseData, agentA, agentB])

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = 0 // 최신이 위이므로 맨 위로
    }
  }, [timelineItems.length])

  const scrollToTop = useCallback(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' })
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
    <section
      className="sec pc-case-timeline-section"
      style={{
        // CSS cascade 경합 방지 — inner도 완전 불투명 강제.
        background: '#0a0a10',
        backgroundImage: 'none',
      }}
    >
      <div className="sec-h">
        <PCSvgIcon id="i-clock" size={14} />
        <span>사건 타임라인</span>
        <span className="cnt">{timelineItems.length}</span>
        <button
          className="pc-timeline-top-btn"
          onClick={scrollToTop}
          title="최근으로 이동"
          type="button"
        >
          최근 ↑
        </button>
      </div>

      <div className="sec-content">
        <div className="pc-timeline__scroll" ref={scrollRef}>
          {timelineItems.length === 0 ? (
            <div className="pc-timeline__empty">이벤트가 발생하면 여기에 기록됩니다.</div>
          ) : (
            <div className="pc-timeline__track">
              {/* 최신이 위로 — 역순 표시 */}
              {[...timelineItems].reverse().map((item, index, arr) => (
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
                    {index < arr.length - 1 ? <span className="pc-timeline__line" /> : null}
                  </span>
                  <span className="pc-timeline__content">
                    <span className="pc-timeline__turn">T{item.turn}</span>
                    <span className="pc-timeline__summary">{item.summary}</span>
                  </span>
                </button>
              ))}
              {/* Mystery points */}
              {mysteryPoints.map((mp) => (
                <div className="pc-timeline__item is-mystery" key={mp.id}>
                  <span className="pc-timeline__rail">
                    <span className="pc-timeline__line" />
                    <span className="pc-timeline__dot is-mystery" />
                    <span className="pc-timeline__line" />
                  </span>
                  <span className="pc-timeline__content">
                    <span className="pc-timeline__turn">???</span>
                    <span className="pc-timeline__summary">{mp.hint}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
