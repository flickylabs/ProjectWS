import { useMemo, useState, useEffect, useRef } from 'react'
import { useStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
import { openPcInteractionPanel } from '../layout/PCInteractionPanel'
import { jumpToDialogue } from './JudgeObservationSection'
import type { JudgeNotebookEntry, JudgeNotebookCategory } from '../../../store/slices/judgeNotebookSlice'

const CATEGORY_ICON: Record<JudgeNotebookCategory, string> = {
  confession: 'i-key',
  critical_contradiction: 'i-bolt',
  key_statement: 'i-flame',
}

const CATEGORY_LABEL: Record<JudgeNotebookCategory, string> = {
  confession: '자백',
  critical_contradiction: '결정적 모순',
  key_statement: '핵심 발화',
}

const CATEGORY_TONE: Record<JudgeNotebookCategory, 'gold' | 'red' | 'blue'> = {
  confession: 'gold',
  critical_contradiction: 'red',
  key_statement: 'blue',
}

/** 미니 타임라인 표시 개수 */
const TIMELINE_COUNT = 8

export default function JudgeNotebookSection() {
  const entries = useStore((s) => s.notebookEntries ?? [])
  const caseData = useStore((s) => s.caseData)
  const turnCount = useStore((s) => s.turnCount)
  const markEntryRead = useStore((s) => s.markNotebookEntryRead)
  const [badgeFlash, setBadgeFlash] = useState(false)
  const prevCountRef = useRef(entries.length)

  // 신규 entry 들어오면 배지 펄스
  useEffect(() => {
    if (entries.length > prevCountRef.current) {
      setBadgeFlash(true)
      const t = window.setTimeout(() => setBadgeFlash(false), 700)
      prevCountRef.current = entries.length
      return () => window.clearTimeout(t)
    }
    prevCountRef.current = entries.length
  }, [entries.length])

  // 메인 슬롯 = 가장 최근 entry
  const main = entries.length > 0 ? entries[entries.length - 1] : null
  // 미니 타임라인 = 최근 N개 (오래된 → 최신 순)
  const timeline = useMemo<JudgeNotebookEntry[]>(() => {
    return entries.slice(-TIMELINE_COUNT)
  }, [entries])

  const unreadCount = useMemo(
    () => entries.filter((entry) => !entry.read).length,
    [entries],
  )

  const partyName = (party?: 'a' | 'b') => {
    if (!party || !caseData) return undefined
    return party === 'a' ? caseData.duo?.partyA?.name : caseData.duo?.partyB?.name
  }

  const openEntryDetail = (entry: JudgeNotebookEntry) => {
    markEntryRead(entry.id)
    const pname = partyName(entry.party)
    const subtitleParts = [
      CATEGORY_LABEL[entry.category],
      `턴 ${entry.turnCount}`,
      pname,
    ].filter(Boolean)
    openPcInteractionPanel({
      title: entry.title,
      subtitle: subtitleParts.join(' · '),
      body: entry.summary || '결정적 사건 기록입니다.',
      tone: CATEGORY_TONE[entry.category],
      variant: 'feature',
      actions: [
        { kind: 'close', label: '확인' },
        ...(entry.linkedDialogueId ? [{ kind: 'close' as const, label: '발화로 이동' }] : []),
      ],
    })
    // 발화 점프 (관찰 동일 패턴 — 별도 함수 호출)
    if (entry.linkedDialogueId) {
      window.setTimeout(() => jumpToDialogue(entry.linkedDialogueId), 100)
    }
  }

  const isFresh = main ? turnCount - main.turnCount <= 1 : false

  return (
    <section className="sec pc-play-notebook-section" aria-label="재판관의 수첩">
      <div className="sec-h">
        <PCSvgIcon id="i-doc" size={14} />
        <span>재판관의 수첩</span>
        {unreadCount > 0 ? (
          <span className={`pc-jobs-badge${badgeFlash ? ' is-flash' : ''}`}>{unreadCount}</span>
        ) : entries.length > 0 ? (
          <span className="cnt">{entries.length}</span>
        ) : null}
        <span className="pc-evidence-help" title="자백·결정적 모순·핵심 발화 등 게임에 영향을 주는 결정적 사건이 기록됩니다">?</span>
      </div>

      {/* 미니 타임라인 — 최근 항목 도트 */}
      <div className="pc-notebook-mini-timeline" role="list" aria-label="최근 수첩 흐름">
        {timeline.length === 0 ? (
          <span className="pc-notebook-mini-timeline__empty" aria-hidden="true">···</span>
        ) : (
          timeline.map((entry, idx) => {
            const isActive = idx === timeline.length - 1
            return (
              <button
                key={entry.id}
                type="button"
                role="listitem"
                className={`pc-notebook-mini-dot is-${entry.category}${isActive ? ' is-active' : ''}${entry.read ? '' : ' is-unread'}`}
                onClick={() => openEntryDetail(entry)}
                title={entry.title}
              >
                <PCSvgIcon id={entry.iconId ?? CATEGORY_ICON[entry.category]} size={10} />
              </button>
            )
          })
        )}
      </div>

      {/* 메인 슬롯 — 가장 최근 결정적 사건 (관찰 동일 구조) */}
      {main ? (
        <button
          type="button"
          key={main.id}
          className={`pc-notebook-main is-${main.category}${isFresh ? ' is-fresh' : ' is-dim'}${main.read ? '' : ' is-unread'}`}
          onClick={() => openEntryDetail(main)}
        >
          <span className="pc-notebook-main__bar" aria-hidden="true" />
          <span className="pc-notebook-main__icon">
            <PCSvgIcon id={main.iconId ?? CATEGORY_ICON[main.category]} size={20} />
          </span>
          <span className="pc-notebook-main__body">
            <span className="pc-notebook-main__title">{main.title}</span>
            {main.summary ? (
              <span className="pc-notebook-main__summary">{main.summary}</span>
            ) : (
              <span className="pc-notebook-main__summary">{CATEGORY_LABEL[main.category]} · 턴 {main.turnCount}</span>
            )}
          </span>
          <span className="pc-notebook-main__time">{formatTurnGap(turnCount, main.turnCount)}</span>
        </button>
      ) : (
        <div className="pc-notebook-main is-empty" aria-hidden="true">
          <span className="pc-notebook-main__empty-text">결정적 사건이 일어나면 여기에 기록됩니다.</span>
        </div>
      )}
    </section>
  )
}

function formatTurnGap(now: number, then: number): string {
  const gap = now - then
  if (gap <= 0) return '방금'
  if (gap === 1) return '1턴 전'
  return `${gap}턴 전`
}
