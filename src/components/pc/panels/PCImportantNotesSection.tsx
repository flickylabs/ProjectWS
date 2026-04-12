import { useCallback, useEffect, useMemo, useState, type DragEvent } from 'react'
import { useStore } from '../../../store/useGameStore'
import type { CaseData, DialogueEntry } from '../../../types'
import type { DisputeVisibilityEntry } from '../../../types/discovery'
import { HOTBAR_DRAG_TYPE } from '../hotbar/pcHotbarConfig'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcFaceSymbolId } from '../icons/pcIconUtils'
import { openPcInteractionPanel } from '../layout/PCInteractionPanel'

export const PC_ADD_COMBINATION_NOTE_EVENT = 'pc:add-combination-note'

export interface PcPinnedNote {
  id: string
  dialogueId: string
  speaker: DialogueEntry['speaker']
  text: string
  turn: number
  relatedDisputes: string[]
  behaviorHint?: string
  contradictionMeta?: DialogueEntry['contradictionMeta']
}

export interface PcCombinationPanelEventDetail {
  note?: PcPinnedNote
  evidenceId?: string
}

interface VisibleNote extends PcPinnedNote {
  pinned: boolean
}

const COPY = {
  sectionTitle: '중요 발언 노트',
  sectionSummary: '핀 고정 · 드래그 정렬 · Shift+클릭 조합',
  judge: '재판관',
  witness: '증인',
  system: '시스템',
  unknown: '발언',
} as const

export default function PCImportantNotesSection() {
  const dialogueLog = useStore((s) => s.dialogueLog)
  const caseData = useStore((s) => s.caseData)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)
  const [pinnedNotes, setPinnedNotes] = useState<PcPinnedNote[]>([])
  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null)
  const [noteOrder, setNoteOrder] = useState<string[]>([])
  const [disputeTab, setDisputeTab] = useState<string | null>(null)

  const speakerNameMap = useMemo(() => {
    return new Map<DialogueEntry['speaker'], string>([
      ['a', caseData?.duo.partyA.name ?? '당사자 A'],
      ['b', caseData?.duo.partyB.name ?? '당사자 B'],
      ['judge', COPY.judge],
      ['system', COPY.system],
      ['witness', COPY.witness],
    ])
  }, [caseData?.duo.partyA.name, caseData?.duo.partyB.name])

  const disputeNameMap = useMemo(() => {
    return new Map((caseData?.disputes ?? []).map((dispute) => [dispute.id, dispute.name]))
  }, [caseData?.disputes])

  const importantEntries = useMemo(() => {
    return dialogueLog
      .filter(
        (entry) => !entry.isHidden
          && (
            entry.contradictionMeta
            || entry.behaviorHint
            || entry.speaker === 'a'
            || entry.speaker === 'b'
            || entry.speaker === 'judge'
          ),
      )
      .slice(-18)
  }, [dialogueLog])

  const toPinnedNote = useCallback((entry: DialogueEntry | PcPinnedNote): PcPinnedNote => {
    const dialogueId = 'dialogueId' in entry ? entry.dialogueId : entry.id
    return {
      id: `pin-${dialogueId}`,
      dialogueId,
      speaker: entry.speaker,
      text: entry.text,
      turn: entry.turn,
      relatedDisputes: entry.relatedDisputes,
      behaviorHint: entry.behaviorHint,
      contradictionMeta: entry.contradictionMeta,
    }
  }, [])

  const togglePin = useCallback((entry: DialogueEntry | PcPinnedNote) => {
    const nextNote = toPinnedNote(entry)
    setPinnedNotes((current) => {
      const exists = current.some((note) => note.dialogueId === nextNote.dialogueId)
      if (exists) {
        return current.filter((note) => note.dialogueId !== nextNote.dialogueId)
      }
      return [...current, nextNote]
    })
  }, [toPinnedNote])

  const isPinned = useCallback((dialogueId: string) => {
    return pinnedNotes.some((note) => note.dialogueId === dialogueId)
  }, [pinnedNotes])

  const visibleNotes = useMemo<VisibleNote[]>(() => {
    const pinned = pinnedNotes.map((note) => ({ ...note, pinned: true }))
    const rest = importantEntries
      .filter((entry) => !isPinned(entry.id))
      .map((entry) => ({ ...toPinnedNote(entry), pinned: false }))
    return [...pinned, ...rest]
  }, [importantEntries, isPinned, pinnedNotes, toPinnedNote])

  useEffect(() => {
    setNoteOrder((current) => {
      const known = current.filter((id) => visibleNotes.some((note) => note.id === id))
      const missing = visibleNotes.map((note) => note.id).filter((id) => !known.includes(id))
      return [...known, ...missing]
    })
  }, [visibleNotes])

  const orderedNotes = useMemo(() => {
    const rank = new Map(noteOrder.map((id, index) => [id, index]))
    return [...visibleNotes].sort((left, right) => (rank.get(left.id) ?? 999) - (rank.get(right.id) ?? 999))
  }, [noteOrder, visibleNotes])

  const filteredNotes = useMemo(() => {
    if (!disputeTab) return orderedNotes
    return orderedNotes.filter((n) => n.relatedDisputes.includes(disputeTab))
  }, [disputeTab, orderedNotes])

  const addToCombination = useCallback((note: PcPinnedNote) => {
    window.dispatchEvent(new CustomEvent<PcCombinationPanelEventDetail>(PC_ADD_COMBINATION_NOTE_EVENT, { detail: { note } }))
  }, [])

  const startNoteDrag = useCallback((event: DragEvent<HTMLDivElement>, note: PcPinnedNote) => {
    setDraggingNoteId(note.id)
    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.setData(HOTBAR_DRAG_TYPE, JSON.stringify({ kind: 'note', note }))
    event.dataTransfer.setData('text/plain', getNoteSummary(note.text))
  }, [])

  const reorderNote = useCallback((targetId: string | null) => {
    if (!draggingNoteId) {
      return
    }

    setNoteOrder((current) => {
      const filtered = current.filter((id) => id !== draggingNoteId)
      if (!targetId) {
        return [...filtered, draggingNoteId]
      }
      const targetIndex = filtered.indexOf(targetId)
      if (targetIndex < 0) {
        return [...filtered, draggingNoteId]
      }
      filtered.splice(targetIndex, 0, draggingNoteId)
      return filtered
    })
    setDraggingNoteId(null)
  }, [draggingNoteId])

  const openNotePanel = useCallback((note: PcPinnedNote, isPinned = false) => {
    const speakerLabel = getSpeakerLabel(note.speaker, speakerNameMap)

    openPcInteractionPanel({
      title: `Turn ${note.turn}`,
      subtitle: isPinned ? '중요 발언' : '발언 기록',
      tone: note.speaker === 'a' ? 'red' : note.speaker === 'b' ? 'blue' : 'gold',
      variant: 'dialogue',
      body: note.text,
      dialogueTurn: note.turn,
      dialogueSpeaker: note.speaker,
      dialogueSpeakerName: speakerLabel,
      dialogueDisputeIds: note.relatedDisputes,
    })
  }, [speakerNameMap])

  return (
    <section className="sec collapsible pc-important-notes-section">
      <div className="sec-h">
        <PCSvgIcon id="i-pin" size={14} />
        <span>발언 노트</span>
        <span className="cnt">{visibleNotes.length}</span>
        <span className="pc-notes-help" title="쟁점별 탭을 클릭하면 양측 발언을 대조할 수 있습니다">?</span>
      </div>

      <div className="sec-content">
        {/* Dispute tabs */}
        <div className="pc-notes-tabs">
          {caseData?.disputes.filter((d) => { const v = disputeVisibility[d.id]; return !v || v.visibility !== 'hidden' }).map((d) => (
            <button
              className={`pc-notes-tab${disputeTab === d.id ? ' is-active' : ''}`}
              key={d.id}
              onClick={() => setDisputeTab(disputeTab === d.id ? null : d.id)}
              type="button"
            >
              {d.name.length > 8 ? d.name.slice(0, 8) + '…' : d.name}
            </button>
          ))}
          <button
            className={`pc-notes-tab${disputeTab === null ? ' is-active' : ''}`}
            onClick={() => setDisputeTab(null)}
            type="button"
          >
            전체
          </button>
        </div>

        {/* Content */}
        {disputeTab ? (
          /* Expanded: A/B comparison */
          <div className="pc-notes-compare">
            <div className="pc-notes-compare__col is-a">
              <span className="pc-notes-compare__header">{caseData?.duo.partyA.name ?? 'A'}</span>
              {filteredNotes.filter((n) => n.speaker === 'a').map((n) => (
                <div className={`pc-notes-compare__entry${n.contradictionMeta ? ' is-contradiction' : ''}`} key={n.id}
                  onClick={() => openNotePanel(n, n.pinned)}
                >
                  <span className="pc-notes-compare__text">{getNoteSummary(n.text)}</span>
                  {n.contradictionMeta ? <span className="pc-notes-compare__flash">⚡</span> : null}
                </div>
              ))}
            </div>
            <div className="pc-notes-compare__col is-b">
              <span className="pc-notes-compare__header">{caseData?.duo.partyB.name ?? 'B'}</span>
              {filteredNotes.filter((n) => n.speaker === 'b').map((n) => (
                <div className={`pc-notes-compare__entry${n.contradictionMeta ? ' is-contradiction' : ''}`} key={n.id}
                  onClick={() => openNotePanel(n, n.pinned)}
                >
                  <span className="pc-notes-compare__text">{getNoteSummary(n.text)}</span>
                  {n.contradictionMeta ? <span className="pc-notes-compare__flash">⚡</span> : null}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Default: compact list */
          <div className="pc-important-notes__scroll"
            onDragOver={(event) => { if (draggingNoteId) event.preventDefault() }}
            onDrop={() => reorderNote(null)}
          >
            {orderedNotes.map((note) => {
              const dotClass = note.speaker === 'b' ? 'is-b' : 'is-a'
              return (
                <div
                  className={`pc-note-card${note.pinned ? ' is-pinned' : ''}${draggingNoteId === note.id ? ' is-dragging' : ''}`}
                  draggable
                  key={note.id}
                  onClick={(event) => {
                    if (event.shiftKey) { addToCombination(note); return }
                    openNotePanel(note, note.pinned)
                  }}
                  onDragEnd={() => setDraggingNoteId(null)}
                  onDragOver={(event) => { if (draggingNoteId && draggingNoteId !== note.id) event.preventDefault() }}
                  onDragStart={(event) => startNoteDrag(event, note)}
                  onDrop={(event) => { event.preventDefault(); reorderNote(note.id) }}
                >
                  <div className={`pc-note-card__indicator ${dotClass}`}>
                    <span className="pc-note-card__dot" />
                    <span className="pc-note-card__turn">T{note.turn}</span>
                  </div>
                  <div className="pc-note-card__body">
                    <div className="pc-note-card__summary">{getNoteSummary(note.text)}</div>
                  </div>
                  <button className="pc-note-card__pin" onClick={(event) => { event.stopPropagation(); togglePin(note) }} type="button">
                    <PCSvgIcon id="i-pin" size={12} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function getSpeakerFaceId(note: PcPinnedNote, caseData: CaseData | null): string {
  if (!caseData) {
    return 'i-person'
  }

  if (note.speaker === 'a') {
    return getPcFaceSymbolId('a', caseData.duo.partyA, 'defensive')
  }
  if (note.speaker === 'b') {
    return getPcFaceSymbolId('b', caseData.duo.partyB, 'defensive')
  }
  if (note.speaker === 'judge') {
    return 'i-scale'
  }
  if (note.speaker === 'system') {
    return 'i-bulb'
  }
  return 'i-person'
}

function getSpeakerLabel(speaker: DialogueEntry['speaker'], speakerNameMap: Map<DialogueEntry['speaker'], string>): string {
  return speakerNameMap.get(speaker) ?? COPY.unknown
}

function getPrimaryDisputeName(note: PcPinnedNote, disputeNameMap: Map<string, string>): string {
  const firstDisputeId = note.relatedDisputes[0]
  if (!firstDisputeId) {
    return '중요 발언'
  }
  return disputeNameMap.get(firstDisputeId) ?? '중요 발언'
}

export function getNoteSummary(text: string): string {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (!normalized) {
    return '요약 없음'
  }

  const firstSentence = normalized.split(/(?<=[.!?])\s+/).find(Boolean) ?? normalized
  return firstSentence.length > 42 ? `${firstSentence.slice(0, 42).trim()}…` : firstSentence
}
