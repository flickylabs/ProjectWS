import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useStore } from '../../../store/useGameStore'
import type { GameEvent } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
import { jumpToDialogue } from '../observation/JudgeObservationSection'
import { useI18n } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'

interface Props {
  /** 타임라인 항목 클릭 시 호출 (패널 닫기 등) */
  onItemClick?: () => void
}

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

function summarizeEvent(event: GameEvent, locale: ReturnType<typeof useI18n>['locale']): string {
  const msg = localizeRuntimeText(event.message, locale).replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim()
  if (msg.length <= 40) return msg
  return `${msg.slice(0, 39).trim()}…`
}

export default function PCCaseTimelineSection({ onItemClick }: Props = {}) {
  const { locale, t } = useI18n()
  const gameEventLog = useStore((s) => s.gameEventLog)
  const dialogueLog = useStore((s) => s.dialogueLog)
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const scrollRef = useRef<HTMLDivElement>(null)

  const timelineItems = useMemo<TimelineItem[]>(() => {
    return gameEventLog.map((event) => ({
      ...event,
      summary: summarizeEvent(event, locale),
      iconId: EVENT_ICON_MAP[event.type] ?? 'i-doc',
      tone: TONE_MAP[event.type] ?? 'neutral',
    }))
  }, [gameEventLog, locale])

  const mysteryPoints = useMemo(() => {
    if (!caseData) return []
    const LIE_ORDER = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
    return caseData.disputes
      .filter((d) => {
        const stA = agentA?.lieStateMap[d.id]?.currentState ?? 'S0'
        const stB = agentB?.lieStateMap[d.id]?.currentState ?? 'S0'
        return Math.max(LIE_ORDER.indexOf(stA), LIE_ORDER.indexOf(stB)) < 3
      })
      .map((d) => ({ id: `mystery-${d.id}`, hint: t('pc.court.timeline.mystery') }))
      .slice(0, 3)
  }, [caseData, agentA, agentB, t])

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

  const handleItemClick = useCallback((turn: number) => {
    const entry = dialogueLog.find((d) => d.turn === turn && !d.isHidden)
    if (!entry) return
    // 패널 닫기 애니메이션과 jump pulse 타이밍 맞춤 — 관찰 드로어와 동일 패턴(220ms)
    if (onItemClick) onItemClick()
    window.setTimeout(() => jumpToDialogue(entry.id), 220)
  }, [dialogueLog, onItemClick])

  return (
    <section className="sec pc-case-timeline-section">
      <div className="sec-h">
        <PCSvgIcon id="i-clock" size={14} />
        <span>{t('pc.court.timeline.title')}</span>
        <span className="cnt">{timelineItems.length}</span>
        <button
          className="pc-timeline-top-btn"
          onClick={scrollToTop}
          title={t('pc.court.timeline.recentTitle')}
          type="button"
        >
          {t('pc.court.timeline.recent')}
        </button>
      </div>

      <div className="sec-content">
        <div className="pc-timeline__scroll" ref={scrollRef}>
          {timelineItems.length === 0 ? (
            <div className="pc-timeline__empty">{t('pc.court.timeline.empty')}</div>
          ) : (
            <div className="pc-timeline__track">
              {/* 최신이 위로 — 역순 표시 */}
              {[...timelineItems].reverse().map((item, index, arr) => (
                <button
                  className={`pc-timeline__item is-${item.tone}`}
                  key={item.id}
                  onClick={() => handleItemClick(item.turn)}
                  title={t('pc.court.timeline.clickToJump')}
                  type="button"
                >
                  <span className="pc-timeline__rail">
                    {index > 0 ? <span className="pc-timeline__line" /> : null}
                    <span className={`pc-timeline__dot is-${item.tone}`}>
                      <PCSvgIcon id={item.iconId} size={10} />
                    </span>
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
