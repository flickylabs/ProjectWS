import { useCallback, useEffect, useMemo, useState, type DragEvent } from 'react'
import { useStore } from '../../../store/useGameStore'
import type { CaseData, DialogueEntry } from '../../../types'
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
  const [pinnedNotes, setPinnedNotes] = useState<PcPinnedNote[]>([])
  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null)
  const [noteOrder, setNoteOrder] = useState<string[]>([])

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

  const openNotePanel = useCallback((note: PcPinnedNote) => {
    const disputeName = getPrimaryDisputeName(note, disputeNameMap)
    const speakerLabel = getSpeakerLabel(note.speaker, speakerNameMap)

    openPcInteractionPanel({
      title: `${disputeName} + ${speakerLabel}`,
      subtitle: `T${note.turn} 중요 발언`,
      tone: note.speaker === 'a' ? 'blue' : note.speaker === 'b' ? 'red' : 'gold',
      body: [getNoteSummary(note.text), '', note.text].join('\n'),
      tags: note.relatedDisputes.length > 0 ? note.relatedDisputes.map((_, index) => `쟁점 ${index + 1}`) : undefined,
    })
  }, [disputeNameMap, speakerNameMap])

  return (
    <section className="sec collapsible pc-important-notes-section">
      <div className="sec-h">
        <PCSvgIcon id="i-pin" size={14} />
        {COPY.sectionTitle}
        <span className="cnt">{pinnedNotes.length}</span>
        <span className="sec-summary">{COPY.sectionSummary}</span>
      </div>

      <div className="sec-content">
        <div
          className="pc-important-notes__scroll"
          onDragOver={(event) => {
            if (draggingNoteId) {
              event.preventDefault()
            }
          }}
          onDrop={() => reorderNote(null)}
        >
          {orderedNotes.map((note) => {
            const speakerSide = note.speaker === 'b' ? 'right' : 'left'
            const faceId = getSpeakerFaceId(note, caseData)
            const summary = getNoteSummary(note.text)

            return (
              <div
                className={`pc-note-card side-${speakerSide}${note.pinned ? ' is-pinned' : ''}${draggingNoteId === note.id ? ' is-dragging' : ''}`}
                draggable
                key={note.id}
                onClick={(event) => {
                  if (event.shiftKey) {
                    addToCombination(note)
                    return
                  }
                  openNotePanel(note)
                }}
                onDragEnd={() => setDraggingNoteId(null)}
                onDragOver={(event) => {
                  if (!draggingNoteId || draggingNoteId === note.id) {
                    return
                  }
                  event.preventDefault()
                }}
                onDragStart={(event) => startNoteDrag(event, note)}
                onDrop={(event) => {
                  event.preventDefault()
                  reorderNote(note.id)
                }}
              >
                {speakerSide === 'left' ? (
                  <>
                    <NoteAvatar faceId={faceId} speaker={note.speaker} />
                    <div className="pc-note-card__body">
                      <div className="pc-note-card__meta">
                        <span className="pc-note-card__turn">T{note.turn}</span>
                        <span className="pc-note-card__speaker">{getSpeakerLabel(note.speaker, speakerNameMap)}</span>
                      </div>
                      <div className="pc-note-card__summary">{summary}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="pc-note-card__body">
                      <div className="pc-note-card__meta">
                        <span className="pc-note-card__turn">T{note.turn}</span>
                        <span className="pc-note-card__speaker">{getSpeakerLabel(note.speaker, speakerNameMap)}</span>
                      </div>
                      <div className="pc-note-card__summary">{summary}</div>
                    </div>
                    <NoteAvatar faceId={faceId} speaker={note.speaker} />
                  </>
                )}

                <button
                  className="pc-note-card__pin"
                  onClick={(event) => {
                    event.stopPropagation()
                    togglePin(note)
                  }}
                  type="button"
                >
                  <PCSvgIcon id="i-pin" size={14} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function NoteAvatar({
  faceId,
  speaker,
}: {
  faceId: string
  speaker: DialogueEntry['speaker']
}) {
  return (
    <span className={`pc-note-card__avatar speaker-${speaker}`}>
      <PCSvgIcon id={faceId} size={26} />
    </span>
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
