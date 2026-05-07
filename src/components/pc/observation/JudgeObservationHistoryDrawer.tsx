import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useGameStore, useStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
import type { JudgeObservation, JudgeObservationCategory } from '../../../store/slices/judgeObservationSlice'
import type { JudgeNotebookCategory, JudgeNotebookEntry } from '../../../store/slices/judgeNotebookSlice'
import { jumpToDialogue } from './JudgeObservationSection'
import { useI18n, type MessageKey } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'

const CATEGORY_ICON: Record<JudgeObservationCategory, string> = {
  archetype: 'i-eye',
  state: 'i-person',
  contradiction: 'i-bolt',
  slip: 'i-heart',
  evidence: 'i-doc',
  event: 'i-gavel',
}

type FilterKey = 'all' | JudgeObservationCategory

const FILTER_LABEL_KEYS: Record<FilterKey, MessageKey> = {
  all: 'pc.observation.filter.all',
  archetype: 'pc.observation.filter.archetype',
  state: 'pc.observation.filter.state',
  contradiction: 'pc.observation.filter.contradiction',
  slip: 'pc.observation.filter.slip',
  evidence: 'pc.observation.filter.evidence',
  event: 'pc.observation.filter.event',
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

const NOTEBOOK_FILTER_LABEL_KEYS: Record<NotebookFilterKey, MessageKey> = {
  all: 'pc.notebook.filter.all',
  confession: 'pc.notebook.filter.confession',
  critical_contradiction: 'pc.notebook.filter.critical_contradiction',
  key_statement: 'pc.notebook.filter.key_statement',
  dispute_probe: 'pc.notebook.filter.dispute_probe',
  dispute_emergence: 'pc.notebook.filter.dispute_emergence',
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
  const { locale, t } = useI18n()
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
      aria-label={t('pc.observation.historyAria')}
      aria-hidden={!open}
    >
        <header className="pc-jobs-drawer__header">
          <div className="pc-jobs-drawer__title">
            <PCSvgIcon id="i-eye" size={16} />
            <span>{t('pc.observation.historyTitle')}</span>
          </div>
          <button
            type="button"
            className="pc-jobs-drawer__close"
            onClick={() => setOpen(false)}
            aria-label={t('pc.common.close')}
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
              {t(FILTER_LABEL_KEYS[key])}
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
            {t('pc.observation.markAllRead')}
          </button>
        </div>

        <ol className="pc-jobs-drawer__timeline">
          {sorted.length === 0 ? (
            <li className="pc-jobs-drawer__empty">{t('pc.observation.historyEmpty')}</li>
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
                      <span className="pc-jobs-drawer__item-turn">{t('pc.observation.turn', { turn: obs.turnCount })}</span>
                      <span className="pc-jobs-drawer__item-cat">{t(FILTER_LABEL_KEYS[obs.category])}</span>
                    </span>
                    <span className="pc-jobs-drawer__item-title">{localizeRuntimeText(obs.title, locale)}</span>
                    {obs.summary ? (
                      <span className="pc-jobs-drawer__item-summary">{localizeRuntimeText(obs.summary, locale)}</span>
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
  const { locale, t } = useI18n()
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
      aria-label={t('pc.notebook.historyAria')}
      aria-hidden={!open}
    >
      <header className="pc-jobs-drawer__header">
        <div className="pc-jobs-drawer__title">
          <PCSvgIcon id="i-doc" size={16} />
          <span>{t('pc.notebook.historyTitle')}</span>
        </div>
        <button
          type="button"
          className="pc-jobs-drawer__close"
          onClick={() => onOpenChange(false)}
          aria-label={t('pc.common.close')}
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
            {t(NOTEBOOK_FILTER_LABEL_KEYS[key])}
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
          {t('pc.notebook.markAllRead')}
        </button>
      </div>

      <ol className="pc-jobs-drawer__timeline">
        {sorted.length === 0 ? (
          <li className="pc-jobs-drawer__empty">{t('pc.notebook.historyEmpty')}</li>
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
                      <span className="pc-jobs-drawer__item-turn">{t('pc.notebook.turn', { turn: entry.turnCount })}</span>
                      <span className="pc-jobs-drawer__item-cat">{t(NOTEBOOK_FILTER_LABEL_KEYS[entry.category])}</span>
                    </span>
                    <span className="pc-jobs-drawer__item-title">{localizeRuntimeText(entry.title, locale)}</span>
                    {entry.summary ? (
                      <span className="pc-jobs-drawer__item-summary">{localizeRuntimeText(entry.summary, locale)}</span>
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
