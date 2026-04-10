import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useStore } from '../../../store/useGameStore'
import type { DialogueEntry } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { openPcInteractionPanel } from '../layout/PCInteractionPanel'
import { getNoteSummary } from './PCImportantNotesSection'

type TimelineSpeaker = DialogueEntry['speaker']

interface TimelineEntry {
  id: string
  turn: number
  text: string
  summary: string
  speaker: TimelineSpeaker
}

function getDotClass(speaker: TimelineSpeaker): string {
  if (speaker === 'a') return 'is-a'
  if (speaker === 'b') return 'is-b'
  return 'is-sys'
}

export default function PCCaseTimelineSection() {
  const dialogueLog = useStore((s) => s.dialogueLog)
  const gameEventLog = useStore((s) => s.gameEventLog)
  const scrollRef = useRef<HTMLDivElement>(null)

  const timelineEntries = useMemo<TimelineEntry[]>(() => {
    const dialogueEntries = dialogueLog
      .filter((entry) => !entry.isHidden && (entry.speaker === 'system' || entry.relatedDisputes.length > 0))
      .map((entry) => ({
        id: entry.id,
        turn: entry.turn,
        text: entry.text,
        summary: getNoteSummary(entry.text),
        speaker: entry.speaker,
      }))

    const eventEntries = gameEventLog.map((event, index) => ({
      id: `evt-${event.turn}-${index}`,
      turn: event.turn,
      text: event.message,
      summary: getNoteSummary(event.message),
      speaker: 'system' as TimelineSpeaker,
    }))

    return [...dialogueEntries, ...eventEntries]
      .sort((left, right) => {
        if (left.turn !== right.turn) return left.turn - right.turn
        return left.id.localeCompare(right.id)
      })
  }, [dialogueLog, gameEventLog])

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [])

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    }
  }, [])

  return (
    <section className="sec pc-case-timeline-section">
      <div className="sec-h">
        <PCSvgIcon id="i-clock" size={14} />
        <span>사건 타임라인</span>
        <span className="cnt">{timelineEntries.length}</span>
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
          {timelineEntries.length === 0 ? (
            <div className="pc-timeline__empty">아직 기록된 타임라인이 없습니다.</div>
          ) : (
            <div className="pc-timeline__track">
              {timelineEntries.map((entry, index) => (
                <button
                  className="pc-timeline__item"
                  key={entry.id}
                  onClick={() => {
                    openPcInteractionPanel({
                      title: `T${entry.turn} 사건 기록`,
                      subtitle: '사건 타임라인',
                      tone: entry.speaker === 'a' ? 'blue' : entry.speaker === 'b' ? 'red' : 'gold',
                      body: entry.text,
                    })
                  }}
                  type="button"
                >
                  <span className="pc-timeline__rail">
                    {index > 0 ? <span className="pc-timeline__line" /> : null}
                    <span className={`pc-timeline__dot ${getDotClass(entry.speaker)}`} />
                    {index < timelineEntries.length - 1 ? <span className="pc-timeline__line" /> : null}
                  </span>
                  <span className="pc-timeline__content">
                    <span className="pc-timeline__turn">T{entry.turn}</span>
                    <span className="pc-timeline__summary">{entry.summary}</span>
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
