import { useMemo } from 'react'
import { useStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
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

/** 메인 슬롯에 표시할 최근 항목 개수 */
const RECENT_COUNT = 5

export default function JudgeNotebookSection() {
  const entries = useStore((s) => s.notebookEntries ?? [])
  const caseData = useStore((s) => s.caseData)
  const markEntryRead = useStore((s) => s.markNotebookEntryRead)

  const recent = useMemo<JudgeNotebookEntry[]>(() => {
    return entries.slice(-RECENT_COUNT).reverse()
  }, [entries])

  const unreadCount = useMemo(
    () => entries.filter((entry) => !entry.read).length,
    [entries],
  )

  const partyName = (party?: 'a' | 'b') => {
    if (!party || !caseData) return undefined
    return party === 'a' ? caseData.duo?.partyA?.name : caseData.duo?.partyB?.name
  }

  const handleEntryClick = (entry: JudgeNotebookEntry) => {
    markEntryRead(entry.id)
    // dialogue 점프
    if (entry.linkedDialogueId && typeof document !== 'undefined') {
      const safeId = (typeof CSS !== 'undefined' && typeof CSS.escape === 'function')
        ? CSS.escape(entry.linkedDialogueId)
        : entry.linkedDialogueId
      const row = document.querySelector<HTMLElement>(`[data-dialogue-id="${safeId}"]`)
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' })
        row.classList.add('pc-dialogue-jump-pulse')
        window.setTimeout(() => row.classList.remove('pc-dialogue-jump-pulse'), 1600)
      }
    }
  }

  return (
    <section className="sec pc-play-notebook-section">
      <div className="sec-h">
        <PCSvgIcon id="i-doc" size={14} />
        <span>재판관의 수첩</span>
        <span className="cnt">{entries.length}</span>
        {unreadCount > 0 ? <span className="sub">{`— 새 ${unreadCount}`}</span> : null}
        <span className="pc-evidence-help" title="자백·결정적 모순·핵심 발화 등 게임에 영향을 주는 결정적 사건이 기록됩니다">?</span>
      </div>

      <div className="pc-play-notebook-list">
        {recent.length === 0 ? (
          <div className="pc-play-notebook-empty">
            결정적 사건이 일어나면 여기에 기록됩니다.
          </div>
        ) : (
          recent.map((entry) => {
            const iconId = entry.iconId ?? CATEGORY_ICON[entry.category]
            const label = CATEGORY_LABEL[entry.category]
            const pname = partyName(entry.party)
            return (
              <button
                className={`pc-notebook-item is-${entry.category}${entry.read ? ' is-read' : ' is-unread'}`}
                key={entry.id}
                onClick={() => handleEntryClick(entry)}
                title={entry.summary ?? entry.title}
                type="button"
              >
                <span className="pc-notebook-item__head">
                  <span className="pc-notebook-item__icon">
                    <PCSvgIcon id={iconId} size={14} />
                  </span>
                  <span className="pc-notebook-item__category">{label}</span>
                  <span className="pc-notebook-item__turn">턴 {entry.turnCount}</span>
                </span>
                <span className="pc-notebook-item__title">{entry.title}</span>
                {(pname || entry.summary) ? (
                  <span className="pc-notebook-item__sub">
                    {pname ? <span className="pc-notebook-item__party">{pname}</span> : null}
                    {entry.summary ? <span className="pc-notebook-item__summary"> · {entry.summary}</span> : null}
                  </span>
                ) : null}
              </button>
            )
          })
        )}
      </div>
    </section>
  )
}
