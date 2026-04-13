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

const SPEAKER_COLORS: Record<string, string> = {
  a: '#e06060',
  b: '#6090e0',
  judge: '#d9a654',
  system: '#787c8a',
  witness: '#60c090',
}

export default function PCImportantNotesSection() {
  const dialogueLog = useStore((s) => s.dialogueLog)
  const caseData = useStore((s) => s.caseData)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)
  const [pinnedNotes, setPinnedNotes] = useState<PcPinnedNote[]>([])
  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null)
  const [noteOrder, setNoteOrder] = useState<string[]>([])

  // 확장 패널 상태
  const [expanded, setExpanded] = useState(false)
  const [disputeTab, setDisputeTab] = useState<string | null>(null)

  const speakerNameMap = useMemo(() => {
    return new Map<DialogueEntry['speaker'], string>([
      ['a', caseData?.duo.partyA.name ?? '당사자 A'],
      ['b', caseData?.duo.partyB.name ?? '당사자 B'],
      ['judge', '재판관'],
      ['system', '시스템'],
      ['witness', '증인'],
    ])
  }, [caseData?.duo.partyA.name, caseData?.duo.partyB.name])

  const disputeNameMap = useMemo(() => {
    return new Map((caseData?.disputes ?? []).map((dispute) => [dispute.id, dispute.name]))
  }, [caseData?.disputes])

  const visibleDisputes = useMemo(() => {
    if (!caseData) return []
    return caseData.disputes.filter((d) => {
      const vis = disputeVisibility[d.id]
      return !vis || vis.visibility !== 'hidden'
    })
  }, [caseData, disputeVisibility])

  // 쟁점 번호 매핑: disputeId → 1-based index (visible 순서 기준)
  const disputeIndexMap = useMemo(() => {
    return new Map(visibleDisputes.map((d, i) => [d.id, i + 1]))
  }, [visibleDisputes])

  const importantEntries = useMemo(() => {
    return dialogueLog
      .filter(
        (entry) => !entry.isHidden
          && (entry.contradictionMeta || entry.behaviorHint || entry.speaker === 'a' || entry.speaker === 'b' || entry.speaker === 'judge'),
      )
      .slice(-30)
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
      if (exists) return current.filter((note) => note.dialogueId !== nextNote.dialogueId)
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
    if (!draggingNoteId) return
    setNoteOrder((current) => {
      const filtered = current.filter((id) => id !== draggingNoteId)
      if (!targetId) return [...filtered, draggingNoteId]
      const targetIndex = filtered.indexOf(targetId)
      if (targetIndex < 0) return [...filtered, draggingNoteId]
      filtered.splice(targetIndex, 0, draggingNoteId)
      return filtered
    })
    setDraggingNoteId(null)
  }, [draggingNoteId])

  const openNotePanel = useCallback((note: PcPinnedNote, isPinned = false) => {
    openPcInteractionPanel({
      title: `Turn ${note.turn}`,
      subtitle: isPinned ? '중요 발언' : '발언 기록',
      tone: note.speaker === 'a' ? 'red' : note.speaker === 'b' ? 'blue' : 'gold',
      variant: 'dialogue',
      body: note.text,
      dialogueTurn: note.turn,
      dialogueSpeaker: note.speaker,
      dialogueSpeakerName: speakerNameMap.get(note.speaker) ?? '발언',
      dialogueDisputeIds: note.relatedDisputes,
    })
  }, [speakerNameMap])

  // 그룹화: 같은 턴의 발언을 묶음
  const groupedByTurn = useMemo(() => {
    const groups: { turn: number; notes: VisibleNote[] }[] = []
    for (const note of filteredNotes) {
      const last = groups[groups.length - 1]
      if (last && last.turn === note.turn) {
        last.notes.push(note)
      } else {
        groups.push({ turn: note.turn, notes: [note] })
      }
    }
    return groups
  }, [filteredNotes])

  return (
    <>
      {/* ━━━ 기본 영역: 전체 발언 컴팩트 리스트 ━━━ */}
      <section className="sec collapsible pc-important-notes-section">
        <div className="sec-h">
          <PCSvgIcon id="i-pin" size={14} />
          <span>발언 노트</span>
          <span className="cnt">{visibleNotes.length}</span>
          <button className="pc-notes-expand-btn" onClick={() => setExpanded(true)} title="발언 노트 확장" type="button">
            <PCSvgIcon id="i-eye" size={12} />
          </button>
        </div>

        <div className="sec-content">
          <div className="pc-important-notes__scroll"
            onDragOver={(event) => { if (draggingNoteId) event.preventDefault() }}
            onDrop={() => reorderNote(null)}
          >
            {orderedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                speakerName={speakerNameMap.get(note.speaker) ?? ''}
                disputeIndices={note.relatedDisputes.map((id) => disputeIndexMap.get(id)).filter((v): v is number => v != null)}
                dragging={draggingNoteId === note.id}
                onClickNote={() => openNotePanel(note, note.pinned)}
                onShiftClick={() => addToCombination(note)}
                onPin={() => togglePin(note)}
                onDragStart={(e) => startNoteDrag(e, note)}
                onDragEnd={() => setDraggingNoteId(null)}
                onDragOver={() => { /* handled by parent */ }}
                onDrop={() => reorderNote(note.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 확장 패널: 쟁점별 필터 + A/B 대조 + 큰 카드 ━━━ */}
      {expanded ? (
        <div className="pc-notes-expanded-backdrop" onClick={() => setExpanded(false)}>
          <div className="pc-notes-expanded" onClick={(e) => e.stopPropagation()}>
            <div className="pc-notes-expanded__header">
              <span className="pc-notes-expanded__title">발언 노트</span>
              <button className="pc-notes-expanded__close" onClick={() => setExpanded(false)} type="button">
                <PCSvgIcon id="i-plus" size={14} />
              </button>
            </div>

            {/* 쟁점별 토글 */}
            <div className="pc-notes-tabs">
              <button className={`pc-notes-tab${disputeTab === null ? ' is-active' : ''}`} onClick={() => setDisputeTab(null)} type="button">
                전체
              </button>
              {visibleDisputes.map((d) => (
                <button
                  className={`pc-notes-tab${disputeTab === d.id ? ' is-active' : ''}`}
                  key={d.id}
                  onClick={() => setDisputeTab(disputeTab === d.id ? null : d.id)}
                  type="button"
                >
                  {d.name.length > 10 ? d.name.slice(0, 10) + '…' : d.name}
                </button>
              ))}
            </div>

            {/* 내용: 쟁점 선택 시 A/B 대조, 전체 시 턴별 그룹 */}
            <div className="pc-notes-expanded__content">
              {disputeTab ? (
                <div className="pc-notes-compare">
                  <div className="pc-notes-compare__col is-a">
                    <span className="pc-notes-compare__header">{caseData?.duo.partyA.name ?? 'A'}</span>
                    {sortPinnedFirst(filteredNotes.filter((n) => n.speaker === 'a')).map((n) => (
                      <div className={`pc-notes-compare__entry${n.pinned ? ' is-pinned' : ''}${n.contradictionMeta ? ' is-contradiction' : ''}`} key={n.id} onClick={() => openNotePanel(n, n.pinned)}>
                        <span className="pc-notes-compare__turn">T{n.turn}</span>
                        <span className="pc-notes-compare__text">{n.text}</span>
                        {n.contradictionMeta ? <span className="pc-notes-compare__flash">⚡</span> : null}
                        <button className="pc-notes-compare__pin" onClick={(event) => { event.stopPropagation(); togglePin(n) }} type="button">
                          <PCSvgIcon id="i-pin" size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="pc-notes-compare__col is-b">
                    <span className="pc-notes-compare__header">{caseData?.duo.partyB.name ?? 'B'}</span>
                    {sortPinnedFirst(filteredNotes.filter((n) => n.speaker === 'b')).map((n) => (
                      <div className={`pc-notes-compare__entry${n.pinned ? ' is-pinned' : ''}${n.contradictionMeta ? ' is-contradiction' : ''}`} key={n.id} onClick={() => openNotePanel(n, n.pinned)}>
                        <span className="pc-notes-compare__turn">T{n.turn}</span>
                        <span className="pc-notes-compare__text">{n.text}</span>
                        {n.contradictionMeta ? <span className="pc-notes-compare__flash">⚡</span> : null}
                        <button className="pc-notes-compare__pin" onClick={(event) => { event.stopPropagation(); togglePin(n) }} type="button">
                          <PCSvgIcon id="i-pin" size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="pc-notes-expanded__list">
                  {groupedByTurn.map((group) => (
                    <div className="pc-notes-turn-group" key={group.turn}>
                      <div className="pc-notes-turn-group__label">Turn {group.turn}</div>
                      {sortPinnedFirst(group.notes).map((n) => (
                        <ExpandedNoteCard
                          key={n.id}
                          note={n}
                          speakerName={speakerNameMap.get(n.speaker) ?? ''}
                          disputeIndices={n.relatedDisputes.map((id) => disputeIndexMap.get(id)).filter((v): v is number => v != null)}
                          onClickNote={() => openNotePanel(n, n.pinned)}
                          onPin={() => togglePin(n)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

/* ━━━ 컴팩트 카드 (기본 영역) ━━━ */
function NoteCard({
  note, speakerName, disputeIndices, dragging,
  onClickNote, onShiftClick, onPin, onDragStart, onDragEnd, onDragOver, onDrop,
}: {
  note: VisibleNote; speakerName: string; disputeIndices: number[]; dragging: boolean
  onClickNote: () => void; onShiftClick: () => void; onPin: () => void
  onDragStart: (e: DragEvent<HTMLDivElement>) => void; onDragEnd: () => void; onDragOver: () => void; onDrop: () => void
}) {
  const color = SPEAKER_COLORS[note.speaker] ?? '#787c8a'
  const tag = disputeIndices.length > 0
    ? `T${note.turn} | S${disputeIndices.join(',')}`
    : `T${note.turn}`
  return (
    <div
      className={`pc-note-card${note.pinned ? ' is-pinned' : ''}${dragging ? ' is-dragging' : ''}${note.contradictionMeta ? ' is-contradiction' : ''}`}
      draggable
      onClick={(event) => { if (event.shiftKey) { onShiftClick(); return }; onClickNote() }}
      onDragEnd={onDragEnd}
      onDragOver={(event) => { event.preventDefault(); onDragOver() }}
      onDragStart={onDragStart}
      onDrop={(event) => { event.preventDefault(); onDrop() }}
    >
      <div className="pc-note-card__indicator" style={{ borderLeftColor: color }}>
        <span className="pc-note-card__speaker" style={{ color }}>{speakerName.slice(0, 3)}</span>
        <span className="pc-note-card__tag">{tag}</span>
      </div>
      <div className="pc-note-card__body">
        <div className="pc-note-card__summary">{getNoteSummary(note.text)}</div>
      </div>
      {note.contradictionMeta ? <span className="pc-note-card__flash">⚡</span> : null}
      <button className="pc-note-card__pin" onClick={(event) => { event.stopPropagation(); onPin() }} type="button">
        <PCSvgIcon id="i-pin" size={14} />
      </button>
    </div>
  )
}

/* ━━━ 확장 카드 (확장 패널) ━━━ */
function ExpandedNoteCard({
  note, speakerName, disputeIndices, onClickNote, onPin,
}: {
  note: VisibleNote; speakerName: string; disputeIndices: number[]
  onClickNote: () => void; onPin: () => void
}) {
  const color = SPEAKER_COLORS[note.speaker] ?? '#787c8a'
  const tag = disputeIndices.length > 0 ? `S${disputeIndices.join(',')}` : null
  return (
    <div
      className={`pc-note-expanded-card${note.pinned ? ' is-pinned' : ''}${note.contradictionMeta ? ' is-contradiction' : ''}`}
      onClick={onClickNote}
    >
      <div className="pc-note-expanded-card__head">
        <span className="pc-note-expanded-card__speaker" style={{ color }}>{speakerName}</span>
        {tag ? <span className="pc-note-expanded-card__disputes">{tag}</span> : null}
        {note.contradictionMeta ? <span className="pc-note-expanded-card__flash">⚡ 모순</span> : null}
        <button className="pc-note-expanded-card__pin" onClick={(event) => { event.stopPropagation(); onPin() }} type="button">
          <PCSvgIcon id="i-pin" size={12} />
        </button>
      </div>
      <div className="pc-note-expanded-card__text">{note.text}</div>
    </div>
  )
}

function sortPinnedFirst(notes: VisibleNote[]): VisibleNote[] {
  return [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })
}

export function getNoteSummary(text: string): string {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (!normalized) return '요약 없음'
  const firstSentence = normalized.split(/(?<=[.!?])\s+/).find(Boolean) ?? normalized
  return firstSentence.length > 42 ? `${firstSentence.slice(0, 42).trim()}…` : firstSentence
}
