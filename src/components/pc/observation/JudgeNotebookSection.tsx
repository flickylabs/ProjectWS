import { useMemo, useState, useEffect, useRef } from 'react'
import { useGameStore, useStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
import { openPcInteractionPanel } from '../layout/PCInteractionPanel'
import { jumpToDialogue } from './JudgeObservationSection'
import { JudgeNotebookHistoryDrawer } from './JudgeObservationHistoryDrawer'
import type { JudgeNotebookEntry, JudgeNotebookCategory } from '../../../store/slices/judgeNotebookSlice'
import { translate, useI18n, type MessageKey } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'

const CATEGORY_ICON: Record<JudgeNotebookCategory, string> = {
  confession: 'i-key',
  critical_contradiction: 'i-bolt',
  key_statement: 'i-flame',
  dispute_probe: 'i-eye',
  dispute_emergence: 'i-bolt',
}

const CATEGORY_LABEL_KEYS: Record<JudgeNotebookCategory, MessageKey> = {
  confession: 'pc.notebook.filter.confession',
  critical_contradiction: 'pc.notebook.filter.critical_contradiction',
  key_statement: 'pc.notebook.filter.key_statement',
  dispute_probe: 'pc.notebook.filter.dispute_probe',
  dispute_emergence: 'pc.notebook.filter.dispute_emergence',
}

const CATEGORY_TONE: Record<JudgeNotebookCategory, 'gold' | 'red' | 'blue'> = {
  confession: 'gold',
  critical_contradiction: 'red',
  key_statement: 'blue',
  dispute_probe: 'gold',
  dispute_emergence: 'gold',
}

/** 관찰 카테고리 시각 매핑 — 수첩 카테고리를 관찰 CSS 변수에 맞춰 재사용 */
const CATEGORY_TO_OBS: Record<JudgeNotebookCategory, string> = {
  confession: 'event',
  critical_contradiction: 'contradiction',
  key_statement: 'state',
  dispute_probe: 'event',
  dispute_emergence: 'event',
}

/** 미니 타임라인 표시 개수 */
const TIMELINE_COUNT = 8

export default function JudgeNotebookSection() {
  const { locale, t } = useI18n()
  const entries = useStore((s) => s.notebookEntries ?? [])
  const caseData = useStore((s) => s.caseData)
  const turnCount = useStore((s) => s.turnCount)
  const markEntryRead = useStore((s) => s.markNotebookEntryRead)
  const [badgeFlash, setBadgeFlash] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const prevCountRef = useRef(entries.length)

  // 신규 entry 들어오면 배지 펄스
  useEffect(() => {
    if (entries.length > prevCountRef.current) {
      const latest = entries[entries.length - 1]
      setBadgeFlash(true)
      const vfxTimer = window.setTimeout(() => {
        const store = useGameStore.getState()
        const cutsceneSource = typeof document !== 'undefined'
          ? document.querySelector('[data-resonance-target="cutscene-center"]')
          : null
        store.enqueueAura({
          targetSelector: '[data-resonance-target="judge-notebook"]',
          style: 'archive',
        })
        if (cutsceneSource) {
          store.enqueueResonance({
            fromSelector: '[data-resonance-target="cutscene-center"]',
            toSelector: '[data-resonance-target="judge-notebook"]',
            reason: 'notebook_entry',
            targetKey: `notebook:${latest?.id ?? entries.length}`,
            style: 'archive',
          })
        }
      }, 90)
      const t = window.setTimeout(() => setBadgeFlash(false), 1800)
      prevCountRef.current = entries.length
      return () => {
        window.clearTimeout(vfxTimer)
        window.clearTimeout(t)
      }
    }
    prevCountRef.current = entries.length
  }, [entries.length])

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail !== 'notebook-history') setHistoryOpen(false)
    }
    window.addEventListener('pc-drawer-open', handler)
    return () => window.removeEventListener('pc-drawer-open', handler)
  }, [])

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
      t(CATEGORY_LABEL_KEYS[entry.category]),
      `T${entry.turnCount}`,
      pname,
    ].filter(Boolean)
    openPcInteractionPanel({
      title: localizeRuntimeText(entry.title, locale),
      subtitle: subtitleParts.join(' · '),
      body: localizeRuntimeText(entry.summary || t('pc.notebook.empty'), locale),
      tone: CATEGORY_TONE[entry.category],
      variant: 'feature',
      actions: [
        { kind: 'close', label: t('pc.right.combo.check') },
        ...(entry.linkedDialogueId ? [{ kind: 'close' as const, label: t('pc.dialogue.record') }] : []),
      ],
    })
    if (entry.linkedDialogueId) {
      window.setTimeout(() => jumpToDialogue(entry.linkedDialogueId), 100)
    }
  }

  const toggleHistory = () => {
    const nextOpen = !historyOpen
    if (nextOpen) {
      window.dispatchEvent(new CustomEvent('pc-drawer-open', { detail: 'notebook-history' }))
    }
    setHistoryOpen(nextOpen)
  }

  const isFresh = main ? turnCount - main.turnCount <= 1 : false

  return (
    <>
    <section
      className="sec pc-judge-observation-section pc-judge-observation-section--notebook"
      data-resonance-target="judge-notebook"
      aria-label={t('pc.notebook.title')}
    >
      <div className="sec-h">
        <PCSvgIcon id="i-doc" size={14} />
        <span>{t('pc.notebook.title')}</span>
        {unreadCount > 0 ? (
          <span className={`pc-jobs-badge${badgeFlash ? ' is-flash' : ''}`}>{unreadCount}</span>
        ) : entries.length > 0 ? (
          <span className="cnt">{entries.length}</span>
        ) : null}
        <button
          type="button"
          className={`pc-jobs-history-btn${historyOpen ? ' is-open' : ''}`}
          onClick={toggleHistory}
          title={historyOpen ? t('pc.notebook.historyClose') : t('pc.notebook.historyOpen')}
          aria-label={t('pc.notebook.historyOpen')}
          aria-pressed={historyOpen}
        >
          <PCSvgIcon id="i-doc" size={12} />
        </button>
      </div>

      {/* 미니 타임라인 — 관찰과 동일 클래스 (.pc-jobs-mini-timeline) */}
      <div className="pc-jobs-mini-timeline" role="list" aria-label={t('pc.notebook.recentFlow')}>
        {timeline.length === 0 ? (
          <span className="pc-jobs-mini-timeline__empty" aria-hidden="true">···</span>
        ) : (
          timeline.map((entry, idx) => {
            const isActive = idx === timeline.length - 1
            const obsCategory = CATEGORY_TO_OBS[entry.category]
            return (
              <button
                key={entry.id}
                type="button"
                role="listitem"
                className={`pc-jobs-mini-dot is-${obsCategory}${isActive ? ' is-active' : ''}${entry.read ? '' : ' is-unread'}`}
                onClick={() => openEntryDetail(entry)}
                title={localizeRuntimeText(entry.title, locale)}
              >
                <PCSvgIcon id={entry.iconId ?? CATEGORY_ICON[entry.category]} size={10} />
              </button>
            )
          })
        )}
      </div>

      {/* 메인 슬롯 — 관찰과 동일 클래스 (.pc-jobs-main) */}
      {main ? (
        <button
          type="button"
          key={main.id}
          className={`pc-jobs-main is-${CATEGORY_TO_OBS[main.category]}${isFresh ? ' is-fresh' : ' is-dim'}`}
          onClick={() => openEntryDetail(main)}
        >
          <span className="pc-jobs-main__bar" aria-hidden="true" />
          <span className="pc-jobs-main__icon">
            <PCSvgIcon id={main.iconId ?? CATEGORY_ICON[main.category]} size={20} />
          </span>
          <span className="pc-jobs-main__body">
            <span className="pc-jobs-main__title">{localizeRuntimeText(main.title, locale)}</span>
            {main.summary ? (
              <span className="pc-jobs-main__summary">{localizeRuntimeText(main.summary, locale)}</span>
            ) : (
              <span className="pc-jobs-main__summary">{t(CATEGORY_LABEL_KEYS[main.category])} · T{main.turnCount}</span>
            )}
          </span>
          <span className="pc-jobs-main__time">{formatTurnGap(turnCount, main.turnCount)}</span>
        </button>
      ) : (
        <div className="pc-jobs-main is-empty" aria-hidden="true">
          <span className="pc-jobs-main__empty-text">{t('pc.notebook.empty')}</span>
        </div>
      )}
    </section>
    <JudgeNotebookHistoryDrawer open={historyOpen} onOpenChange={setHistoryOpen} />
    </>
  )
}

function formatTurnGap(now: number, then: number): string {
  const gap = now - then
  if (gap <= 0) return translate('pc.common.justNow')
  return translate('pc.common.turnAgo', { count: gap })
}
