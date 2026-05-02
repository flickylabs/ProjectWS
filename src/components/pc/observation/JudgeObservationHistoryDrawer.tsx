import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useGameStore, useStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
import type { JudgeObservation, JudgeObservationCategory } from '../../../store/slices/judgeObservationSlice'
import type { JudgeNotebookCategory, JudgeNotebookEntry } from '../../../store/slices/judgeNotebookSlice'
import { jumpToDialogue } from './JudgeObservationSection'

const CATEGORY_ICON: Record<JudgeObservationCategory, string> = {
  archetype: 'i-eye',
  state: 'i-person',
  contradiction: 'i-bolt',
  slip: 'i-heart',
  evidence: 'i-doc',
  event: 'i-gavel',
}

type FilterKey = 'all' | JudgeObservationCategory

const FILTER_LABELS: Record<FilterKey, string> = {
  all: '전체',
  archetype: '관찰',
  state: '단계',
  contradiction: '모순',
  slip: '감정',
  evidence: '증거',
  event: '이벤트',
}

const FILTER_ORDER: FilterKey[] = ['all', 'archetype', 'state', 'contradiction', 'slip', 'evidence', 'event']

const NOTEBOOK_CATEGORY_ICON: Record<JudgeNotebookCategory, string> = {
  confession: 'i-key',
  critical_contradiction: 'i-bolt',
  key_statement: 'i-flame',
  dispute_probe: 'i-eye',
  dispute_emergence: 'i-bolt',
}

type NotebookFilterKey = 'all' | JudgeNotebookCategory

const NOTEBOOK_FILTER_LABELS: Record<NotebookFilterKey, string> = {
  all: '전체',
  confession: '자백',
  critical_contradiction: '결정적 모순',
  key_statement: '핵심 발화',
  dispute_probe: '쟁점 파악',
  dispute_emergence: '쟁점 발현',
}

const NOTEBOOK_FILTER_ORDER: NotebookFilterKey[] = ['all', 'confession', 'critical_contradiction', 'key_statement', 'dispute_probe', 'dispute_emergence']

const NOTEBOOK_TO_OBSERVATION_CATEGORY: Record<JudgeNotebookCategory, JudgeObservationCategory> = {
  confession: 'event',
  critical_contradiction: 'contradiction',
  key_statement: 'state',
  dispute_probe: 'event',
  dispute_emergence: 'event',
}

export default function JudgeObservationHistoryDrawer() {
  const open = useStore((s) => s.observationHistoryOpen)
  const observations = useStore((s) => s.judgeObservations ?? [])
  const setOpen = useStore((s) => s.setObservationHistoryOpen)
  const [filter, setFilter] = useState<FilterKey>('all')

  // 드로어 상호 배타 — 다른 drawer 열리면 닫기
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail !== 'observation-history') setOpen(false)
    }
    window.addEventListener('pc-drawer-open', handler)
    return () => window.removeEventListener('pc-drawer-open', handler)
  }, [setOpen])

  const sorted = useMemo(() => {
    const reversed = [...observations].reverse()
    return filter === 'all' ? reversed : reversed.filter((o) => o.category === filter)
  }, [observations, filter])

  const categoryCounts = useMemo(() => {
    const counts: Record<FilterKey, number> = {
      all: observations.length,
      archetype: 0, state: 0, contradiction: 0, slip: 0, evidence: 0, event: 0,
    }
    for (const obs of observations) counts[obs.category] += 1
    return counts
  }, [observations])

  const handleItemClick = (obs: JudgeObservation) => {
    useGameStore.getState().markObservationRead(obs.id)
    if (obs.linkedDialogueId) {
      setOpen(false)
      // 드로어 애니메이션 직후 jump
      window.setTimeout(() => jumpToDialogue(obs.linkedDialogueId), 220)
    }
  }

  const markAllRead = () => {
    useGameStore.getState().markAllObservationsRead()
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <aside
      className={`pc-jobs-drawer${open ? ' is-open' : ''}`}
      role="dialog"
      aria-label="재판관의 관찰 전체 기록"
      aria-hidden={!open}
    >
        <header className="pc-jobs-drawer__header">
          <div className="pc-jobs-drawer__title">
            <PCSvgIcon id="i-eye" size={16} />
            <span>재판관의 관찰 — 전체 기록</span>
          </div>
          <button
            type="button"
            className="pc-jobs-drawer__close"
            onClick={() => setOpen(false)}
            aria-label="닫기"
          >
            ✕
          </button>
        </header>

        <div className="pc-jobs-drawer__filter-row">
          {FILTER_ORDER.map((key) => (
            <button
              key={key}
              type="button"
              className={`pc-jobs-drawer__filter${filter === key ? ' is-active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {FILTER_LABELS[key]}
              {categoryCounts[key] > 0 ? (
                <span className="pc-jobs-drawer__filter-count">{categoryCounts[key]}</span>
              ) : null}
            </button>
          ))}
          <button
            type="button"
            className="pc-jobs-drawer__mark-all"
            onClick={markAllRead}
          >
            모두 읽음
          </button>
        </div>

        <ol className="pc-jobs-drawer__timeline">
          {sorted.length === 0 ? (
            <li className="pc-jobs-drawer__empty">해당 조건의 기록이 없습니다.</li>
          ) : (
            sorted.map((obs) => (
              <li
                key={obs.id}
                data-observation-id={obs.id}
                className={`pc-jobs-drawer__item is-${obs.category}${obs.read ? '' : ' is-unread'}${obs.linkedDialogueId ? ' is-linked' : ''}`}
              >
                <button
                  type="button"
                  className="pc-jobs-drawer__item-btn"
                  onClick={() => handleItemClick(obs)}
                >
                  <span className="pc-jobs-drawer__rail" aria-hidden="true">
                    <span className="pc-jobs-drawer__dot">
                      <PCSvgIcon id={obs.iconId ?? CATEGORY_ICON[obs.category]} size={10} />
                    </span>
                  </span>
                  <span className="pc-jobs-drawer__item-body">
                    <span className="pc-jobs-drawer__item-meta">
                      <span className="pc-jobs-drawer__item-turn">턴 {obs.turnCount}</span>
                      <span className="pc-jobs-drawer__item-cat">{FILTER_LABELS[obs.category]}</span>
                    </span>
                    <span className="pc-jobs-drawer__item-title">{obs.title}</span>
                    {obs.summary ? (
                      <span className="pc-jobs-drawer__item-summary">{obs.summary}</span>
                    ) : null}
                  </span>
                </button>
              </li>
            ))
          )}
        </ol>
    </aside>,
    document.body,
  )
}

export function JudgeNotebookHistoryDrawer({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const entries = useStore((s) => s.notebookEntries ?? [])
  const [filter, setFilter] = useState<NotebookFilterKey>('all')

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail !== 'notebook-history') onOpenChange(false)
    }
    window.addEventListener('pc-drawer-open', handler)
    return () => window.removeEventListener('pc-drawer-open', handler)
  }, [onOpenChange])

  const sorted = useMemo(() => {
    const reversed = [...entries].reverse()
    return filter === 'all' ? reversed : reversed.filter((entry) => entry.category === filter)
  }, [entries, filter])

  const categoryCounts = useMemo(() => {
    const counts: Record<NotebookFilterKey, number> = {
      all: entries.length,
      confession: 0,
      critical_contradiction: 0,
      key_statement: 0,
      dispute_probe: 0,
      dispute_emergence: 0,
    }
    for (const entry of entries) counts[entry.category] += 1
    return counts
  }, [entries])

  const handleItemClick = (entry: JudgeNotebookEntry) => {
    useGameStore.getState().markNotebookEntryRead(entry.id)
    if (entry.linkedDialogueId) {
      onOpenChange(false)
      window.setTimeout(() => jumpToDialogue(entry.linkedDialogueId), 220)
    }
  }

  const markAllRead = () => {
    useGameStore.getState().markAllNotebookRead()
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <aside
      className={`pc-jobs-drawer pc-jobs-drawer--notebook${open ? ' is-open' : ''}`}
      role="dialog"
      aria-label="재판관의 수첩 전체 기록"
      aria-hidden={!open}
    >
      <header className="pc-jobs-drawer__header">
        <div className="pc-jobs-drawer__title">
          <PCSvgIcon id="i-doc" size={16} />
          <span>재판관의 수첩 — 전체 기록</span>
        </div>
        <button
          type="button"
          className="pc-jobs-drawer__close"
          onClick={() => onOpenChange(false)}
          aria-label="닫기"
        >
          ✕
        </button>
      </header>

      <div className="pc-jobs-drawer__filter-row">
        {NOTEBOOK_FILTER_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            className={`pc-jobs-drawer__filter${filter === key ? ' is-active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {NOTEBOOK_FILTER_LABELS[key]}
            {categoryCounts[key] > 0 ? (
              <span className="pc-jobs-drawer__filter-count">{categoryCounts[key]}</span>
            ) : null}
          </button>
        ))}
        <button
          type="button"
          className="pc-jobs-drawer__mark-all"
          onClick={markAllRead}
        >
          모두 읽음
        </button>
      </div>

      <ol className="pc-jobs-drawer__timeline">
        {sorted.length === 0 ? (
          <li className="pc-jobs-drawer__empty">해당 조건의 기록이 없습니다.</li>
        ) : (
          sorted.map((entry) => {
            const obsCategory = NOTEBOOK_TO_OBSERVATION_CATEGORY[entry.category]
            return (
              <li
                key={entry.id}
                className={`pc-jobs-drawer__item is-${obsCategory}${entry.read ? '' : ' is-unread'}${entry.linkedDialogueId ? ' is-linked' : ''}`}
              >
                <button
                  type="button"
                  className="pc-jobs-drawer__item-btn"
                  onClick={() => handleItemClick(entry)}
                >
                  <span className="pc-jobs-drawer__rail" aria-hidden="true">
                    <span className="pc-jobs-drawer__dot">
                      <PCSvgIcon id={entry.iconId ?? NOTEBOOK_CATEGORY_ICON[entry.category]} size={10} />
                    </span>
                  </span>
                  <span className="pc-jobs-drawer__item-body">
                    <span className="pc-jobs-drawer__item-meta">
                      <span className="pc-jobs-drawer__item-turn">턴 {entry.turnCount}</span>
                      <span className="pc-jobs-drawer__item-cat">{NOTEBOOK_FILTER_LABELS[entry.category]}</span>
                    </span>
                    <span className="pc-jobs-drawer__item-title">{entry.title}</span>
                    {entry.summary ? (
                      <span className="pc-jobs-drawer__item-summary">{entry.summary}</span>
                    ) : null}
                  </span>
                </button>
              </li>
            )
          })
        )}
      </ol>
    </aside>,
    document.body,
  )
}
