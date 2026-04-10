import { useMemo } from 'react'
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

export default function PCCaseTimelineSection() {
  const dialogueLog = useStore((s) => s.dialogueLog)
  const gameEventLog = useStore((s) => s.gameEventLog)

  const timelineEntries = useMemo<TimelineEntry[]>(() => {
    const dialogueEntries = dialogueLog
      .filter((entry) => !entry.isHidden && (entry.speaker === 'system' || entry.relatedDisputes.length > 0))
      .slice(-12)
      .map((entry) => ({
        id: entry.id,
        turn: entry.turn,
        text: entry.text,
        summary: getNoteSummary(entry.text),
        speaker: entry.speaker,
      }))

    const eventEntries = gameEventLog.slice(-8).map((event, index) => ({
      id: `evt-${event.turn}-${index}`,
      turn: event.turn,
      text: event.message,
      summary: getNoteSummary(event.message),
      speaker: 'system' as TimelineSpeaker,
    }))

    return [...dialogueEntries, ...eventEntries]
      .sort((left, right) => {
        if (right.turn !== left.turn) {
          return right.turn - left.turn
        }
        return right.id.localeCompare(left.id)
      })
      .slice(0, 14)
  }, [dialogueLog, gameEventLog])

  return (
    <section className="sec pc-case-timeline-section">
      <div className="sec-h">
        <PCSvgIcon id="i-clock" size={14} />
        <span>사건 타임라인</span>
        <span className="cnt">{timelineEntries.length}</span>
      </div>

      <div className="sec-content">
        <div className="pc-case-timeline__scroll">
          {timelineEntries.length === 0 ? (
            <div className="pc-case-timeline__empty">아직 기록된 사건 타임라인이 없습니다.</div>
          ) : (
            timelineEntries.map((entry) => (
              <button
                className={`pc-case-timeline__item speaker-${entry.speaker}`}
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
                <span className="pc-case-timeline__rail" />
                <span className="pc-case-timeline__dot" />
                <span className="pc-case-timeline__copy">
                  <span className="pc-case-timeline__turn">T{entry.turn}</span>
                  <span className="pc-case-timeline__summary">{entry.summary}</span>
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
