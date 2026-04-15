import { useCallback, useEffect, useMemo, useState, type DragEvent } from 'react'
import { useStore, useGameStore } from '../../../store/useGameStore'
import type { DialogueEntry } from '../../../types'
import { HOTBAR_DRAG_TYPE } from '../hotbar/pcHotbarConfig'
import PCSvgIcon from '../icons/PCSvgIcon'
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
  a: '#6090e0',
  b: '#e06060',
  judge: '#d9a654',
  system: '#787c8a',
  witness: '#60c090',
}

const NOTE_DRAG_TYPE = 'application/x-pc-note'

/* ━━━ Inline star SVG (no sprite symbol available) ━━━ */
function StarIcon({ size = 14, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function PCImportantNotesSection() {
  const dialogueLog = useStore((s) => s.dialogueLog)
  const caseData = useStore((s) => s.caseData)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)

  // Favorites = pinned notes (local state, no persistence needed)
  const [favorites, setFavorites] = useState<PcPinnedNote[]>([])
  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null)
  const [favDragOver, setFavDragOver] = useState(false)
  const [favReorderTarget, setFavReorderTarget] = useState<string | null>(null)

  // Expanded popup
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

  const visibleDisputes = useMemo(() => {
    if (!caseData) return []
    return caseData.disputes.filter((d) => {
      const vis = disputeVisibility[d.id]
      return !vis || vis.visibility !== 'hidden'
    })
  }, [caseData, disputeVisibility])

  // 조합 가능 발언 텍스트 — 즐겨찾기 shimmer용
  const combinableStatementTexts = useMemo(() => {
    const labRuntime = (useGameStore.getState() as any).combinationLabRuntime
    if (!labRuntime?.config?.nodes) return new Set<string>()
    const combinableIds = useGameStore.getState().getCombinableEvidenceIds()
    const texts = new Set<string>()
    for (const node of labRuntime.config.nodes) {
      if (node.type === 'statement' && combinableIds.has(node.id)) {
        const match = node.label?.match(/"([^"]+)"/)
        if (match) texts.add(match[1])
      }
    }
    return texts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogueLog.length])

  const disputeIndexMap = useMemo(() => {
    return new Map(visibleDisputes.map((d, i) => [d.id, i + 1]))
  }, [visibleDisputes])

  const importantEntries = useMemo(() => {
    return dialogueLog
      .filter(
        (entry) => !entry.isHidden
          && (entry.autoPin || entry.contradictionMeta || entry.behaviorHint || entry.speaker === 'a' || entry.speaker === 'b' || entry.speaker === 'judge'),
      )
      .slice(-30)
  }, [dialogueLog])

  // autoPin 엔트리 자동 즐겨찾기 등록 (중복 방지: current 기준 체크, favorites deps 제거)
  useEffect(() => {
    setFavorites((current) => {
      const newPins = dialogueLog
        .filter((e) => e.autoPin && !current.some((f) => f.dialogueId === e.id))
        .map((e) => ({
          id: `pin-${e.id}`,
          dialogueId: e.id,
          speaker: e.speaker,
          text: e.text,
          turn: e.turn,
          relatedDisputes: e.relatedDisputes,
          behaviorHint: e.behaviorHint,
          contradictionMeta: e.contradictionMeta,
        }))
      return newPins.length > 0 ? [...current, ...newPins] : current
    })
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

  const isFavorited = useCallback((dialogueId: string) => {
    return favorites.some((note) => note.dialogueId === dialogueId)
  }, [favorites])

  const toggleFavorite = useCallback((entry: DialogueEntry | PcPinnedNote) => {
    const nextNote = toPinnedNote(entry)
    setFavorites((current) => {
      const exists = current.some((note) => note.dialogueId === nextNote.dialogueId)
      if (exists) return current.filter((note) => note.dialogueId !== nextNote.dialogueId)
      return [...current, nextNote]
    })
  }, [toPinnedNote])

  const addFavorite = useCallback((entry: DialogueEntry | PcPinnedNote) => {
    const nextNote = toPinnedNote(entry)
    setFavorites((current) => {
      if (current.some((note) => note.dialogueId === nextNote.dialogueId)) return current
      return [...current, nextNote]
    })
  }, [toPinnedNote])

  const removeFavorite = useCallback((dialogueId: string) => {
    setFavorites((current) => current.filter((note) => note.dialogueId !== dialogueId))
  }, [])

  // All visible notes for expanded popup (chronological, with favorite flag)
  const allNotes = useMemo<VisibleNote[]>(() => {
    return importantEntries.map((entry) => ({
      ...toPinnedNote(entry),
      pinned: isFavorited(entry.id),
    }))
  }, [importantEntries, isFavorited, toPinnedNote])

  const filteredNotes = useMemo(() => {
    if (!disputeTab) return allNotes
    return allNotes.filter((n) => n.relatedDisputes.includes(disputeTab))
  }, [disputeTab, allNotes])

  // Turn groups for expanded panel
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

  const addToCombination = useCallback((note: PcPinnedNote) => {
    window.dispatchEvent(new CustomEvent<PcCombinationPanelEventDetail>(PC_ADD_COMBINATION_NOTE_EVENT, { detail: { note } }))
  }, [])

  const openNotePanel = useCallback((note: PcPinnedNote, isPinned = false) => {
    openPcInteractionPanel({
      title: `Turn ${note.turn}`,
      subtitle: isPinned ? '즐겨찾기' : '발언 기록',
      tone: note.speaker === 'a' ? 'red' : note.speaker === 'b' ? 'blue' : 'gold',
      variant: 'dialogue',
      body: note.text,
      dialogueTurn: note.turn,
      dialogueSpeaker: note.speaker,
      dialogueSpeakerName: speakerNameMap.get(note.speaker) ?? '발언',
      dialogueDisputeIds: note.relatedDisputes,
    })
  }, [speakerNameMap])

  /* ━━━ Drag: from note cards (both favorites area and popup) ━━━ */
  const startNoteDrag = useCallback((event: DragEvent<HTMLDivElement>, note: PcPinnedNote) => {
    setDraggingNoteId(note.id)
    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.setData(HOTBAR_DRAG_TYPE, JSON.stringify({ kind: 'note', note }))
    event.dataTransfer.setData(NOTE_DRAG_TYPE, JSON.stringify(note))
    event.dataTransfer.setData('text/plain', getNoteSummary(note.text))
  }, [])

  /* ━━━ Favorites reorder via drag ━━━ */
  const reorderFavorite = useCallback((draggedId: string, targetId: string | null) => {
    setFavorites((current) => {
      const idx = current.findIndex((n) => n.id === draggedId)
      if (idx < 0) return current
      const next = [...current]
      const [moved] = next.splice(idx, 1)
      if (!targetId) {
        next.push(moved)
      } else {
        const targetIdx = next.findIndex((n) => n.id === targetId)
        if (targetIdx < 0) next.push(moved)
        else next.splice(targetIdx, 0, moved)
      }
      return next
    })
  }, [])

  /* ━━━ Drop on favorites area: add from popup or reorder ━━━ */
  const handleFavDrop = useCallback((event: DragEvent<HTMLDivElement>, targetId?: string) => {
    event.preventDefault()
    setFavDragOver(false)
    setFavReorderTarget(null)

    // NOTE_DRAG_TYPE 우선, 없으면 HOTBAR_DRAG_TYPE에서 note 추출
    let noteJson = event.dataTransfer.getData(NOTE_DRAG_TYPE)
    if (!noteJson) {
      const hotbarJson = event.dataTransfer.getData(HOTBAR_DRAG_TYPE)
      if (hotbarJson) {
        try {
          const parsed = JSON.parse(hotbarJson)
          if (parsed.kind === 'note' && parsed.note) noteJson = JSON.stringify(parsed.note)
        } catch { /* ignore */ }
      }
    }
    if (noteJson) {
      try {
        const note = JSON.parse(noteJson) as PcPinnedNote
        // If already a favorite, reorder
        if (note.id && favorites.some((f) => f.id === note.id)) {
          reorderFavorite(note.id, targetId ?? null)
        } else {
          // Add as new favorite
          addFavorite(note)
        }
      } catch { /* ignore */ }
    }
    setDraggingNoteId(null)
  }, [addFavorite, favorites, reorderFavorite])

  const handleFavDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    // NOTE_DRAG_TYPE 또는 HOTBAR_DRAG_TYPE 또는 text/plain이 있으면 드롭 허용
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
    setFavDragOver(true)
  }, [])

  return (
    <>
      {/* ━━━ Left panel: 발언노트 즐겨찾기 ━━━ */}
      <section className="sec collapsible pc-important-notes-section">
        <div className="sec-h">
          <StarIcon size={14} filled />
          <span>발언노트 즐겨찾기</span>
          <span className="cnt">{favorites.length}</span>
          <button className="pc-notes-expand-btn" onClick={() => setExpanded(true)} title="발언 노트 전체 보기" type="button">
            <PCSvgIcon id="i-eye" size={12} />
          </button>
        </div>

        <div className="sec-content">
          <div
            className={`pc-fav-notes__drop-zone${favDragOver ? ' is-drag-over' : ''}`}
            onDragOver={handleFavDragOver}
            onDragLeave={() => setFavDragOver(false)}
            onDrop={(e) => handleFavDrop(e)}
          >
            {/* 즐겨찾기 목록 + 드롭 영역 통합 — 하나의 스크롤 영역 */}
            <div className="pc-fav-notes__scroll">
              {favorites.map((note) => {
                const isCombinable = combinableStatementTexts.size > 0 && [...combinableStatementTexts].some((t) => note.text.includes(t))
                return (
                  <FavoriteCard
                    key={note.id}
                    note={note}
                    speakerName={speakerNameMap.get(note.speaker) ?? ''}
                    disputeIndices={note.relatedDisputes.map((id) => disputeIndexMap.get(id)).filter((v): v is number => v != null)}
                    dragging={draggingNoteId === note.id}
                    reorderTarget={favReorderTarget === note.id}
                    isCombinable={isCombinable}
                    onClickNote={() => openNotePanel(note, true)}
                    onShiftClick={() => addToCombination(note)}
                    onRemove={() => removeFavorite(note.dialogueId)}
                    onDragStart={(e) => startNoteDrag(e, note)}
                    onDragEnd={() => { setDraggingNoteId(null); setFavReorderTarget(null) }}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setFavReorderTarget(note.id)
                    }}
                    onDrop={(e) => handleFavDrop(e, note.id)}
                  />
                )
              })}
              {/* 빈 공간 — 드롭 안내 (목록 아래에 항상 표시, 남은 공간 채움) */}
              <div className="pc-fav-notes__placeholder">
                <StarIcon size={14} />
                <span>{favorites.length === 0 ? '발언을 끌어다 놓으세요' : '추가'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Expanded popup: full note list with star toggle ━━━ */}
      {expanded ? (
        <div className="pc-notes-expanded-backdrop" onClick={() => setExpanded(false)}>
          <div className="pc-notes-expanded" onClick={(e) => e.stopPropagation()}>
            <div className="pc-notes-expanded__header">
              <span className="pc-notes-expanded__title">발언 노트</span>
              <button className="pc-notes-expanded__close" onClick={() => setExpanded(false)} type="button">
                <PCSvgIcon id="i-plus" size={14} />
              </button>
            </div>

            {/* Dispute tabs */}
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
                  {d.name.length > 10 ? d.name.slice(0, 10) + '\u2026' : d.name}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="pc-notes-expanded__content">
              {disputeTab ? (
                <div className="pc-notes-compare">
                  <div className="pc-notes-compare__col is-a">
                    <span className="pc-notes-compare__header">{caseData?.duo.partyA.name ?? 'A'}</span>
                    {filteredNotes.filter((n) => n.speaker === 'a').map((n) => (
                      <ExpandedNoteEntry
                        key={n.id}
                        note={n}
                        isFav={isFavorited(n.dialogueId)}
                        onClickNote={() => openNotePanel(n, n.pinned)}
                        onToggleFav={() => toggleFavorite(n)}
                        onDragStart={(e) => startNoteDrag(e, n)}
                        onDragEnd={() => setDraggingNoteId(null)}

                      />
                    ))}
                  </div>
                  <div className="pc-notes-compare__col is-b">
                    <span className="pc-notes-compare__header">{caseData?.duo.partyB.name ?? 'B'}</span>
                    {filteredNotes.filter((n) => n.speaker === 'b').map((n) => (
                      <ExpandedNoteEntry
                        key={n.id}
                        note={n}
                        isFav={isFavorited(n.dialogueId)}
                        onClickNote={() => openNotePanel(n, n.pinned)}
                        onToggleFav={() => toggleFavorite(n)}
                        onDragStart={(e) => startNoteDrag(e, n)}
                        onDragEnd={() => setDraggingNoteId(null)}

                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="pc-notes-expanded__list">
                  {groupedByTurn.map((group) => (
                    <div className="pc-notes-turn-group" key={group.turn}>
                      <div className="pc-notes-turn-group__label">Turn {group.turn}</div>
                      {group.notes.map((n) => (
                        <ExpandedNoteCard
                          key={n.id}
                          note={n}
                          speakerName={speakerNameMap.get(n.speaker) ?? ''}
                          disputeIndices={n.relatedDisputes.map((id) => disputeIndexMap.get(id)).filter((v): v is number => v != null)}
                          isFav={isFavorited(n.dialogueId)}
                          onClickNote={() => openNotePanel(n, n.pinned)}
                          onToggleFav={() => toggleFavorite(n)}
                          onDragStart={(e) => startNoteDrag(e, n)}
                          onDragEnd={() => setDraggingNoteId(null)}
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

/* ━━━ Favorite compact card (left panel) ━━━ */
function FavoriteCard({
  note, speakerName, disputeIndices, dragging, reorderTarget, isCombinable,
  onClickNote, onShiftClick, onRemove, onDragStart, onDragEnd, onDragOver, onDrop,
}: {
  note: PcPinnedNote; speakerName: string; disputeIndices: number[]; dragging: boolean; reorderTarget: boolean; isCombinable?: boolean
  onClickNote: () => void; onShiftClick: () => void; onRemove: () => void
  onDragStart: (e: DragEvent<HTMLDivElement>) => void; onDragEnd: () => void
  onDragOver: (e: DragEvent<HTMLDivElement>) => void; onDrop: (e: DragEvent<HTMLDivElement>) => void
}) {
  const color = SPEAKER_COLORS[note.speaker] ?? '#787c8a'
  const tag = disputeIndices.length > 0
    ? `T${note.turn} | S${disputeIndices.join(',')}`
    : `T${note.turn}`

  return (
    <div
      className={`pc-note-card is-pinned${dragging ? ' is-dragging' : ''}${reorderTarget ? ' is-reorder-target' : ''}${note.contradictionMeta ? ' is-contradiction' : ''}${isCombinable ? ' is-combinable' : ''}`}
      draggable
      onClick={(event) => { if (event.shiftKey) { onShiftClick(); return }; onClickNote() }}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      onDrop={onDrop}
    >
      <div className="pc-note-card__indicator" style={{ borderLeftColor: color }}>
        <span className="pc-note-card__speaker" style={{ color }}>{speakerName.slice(0, 3)}</span>
        <span className="pc-note-card__tag">{tag}</span>
      </div>
      <div className="pc-note-card__body">
        <div className="pc-note-card__summary">{getNoteSummary(note.text)}</div>
      </div>
      {note.contradictionMeta ? <span className="pc-note-card__flash">&#x26A1;</span> : null}
      <button className="pc-note-card__pin pc-note-card__unfav" onClick={(event) => { event.stopPropagation(); onRemove() }} title="즐겨찾기 해제" type="button">
        <StarIcon size={16} filled />
      </button>
    </div>
  )
}

/* ━━━ Expanded note card (full view, turn-grouped) ━━━ */
function ExpandedNoteCard({
  note, speakerName, disputeIndices, isFav, onClickNote, onToggleFav, onDragStart, onDragEnd,
}: {
  note: VisibleNote; speakerName: string; disputeIndices: number[]; isFav: boolean
  onClickNote: () => void; onToggleFav: () => void
  onDragStart: (e: DragEvent<HTMLDivElement>) => void; onDragEnd: () => void
}) {
  const color = SPEAKER_COLORS[note.speaker] ?? '#787c8a'
  const tag = disputeIndices.length > 0 ? `S${disputeIndices.join(',')}` : null

  return (
    <div
      className={`pc-note-expanded-card${isFav ? ' is-pinned' : ''}${note.contradictionMeta ? ' is-contradiction' : ''}`}
      draggable
      onClick={onClickNote}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="pc-note-expanded-card__head">
        <span className="pc-note-expanded-card__speaker" style={{ color }}>{speakerName}</span>
        {tag ? <span className="pc-note-expanded-card__disputes">{tag}</span> : null}
        {note.contradictionMeta ? <span className="pc-note-expanded-card__flash">&#x26A1; 모순</span> : null}
        <button className={`pc-note-expanded-card__pin${isFav ? ' is-fav' : ''}`} onClick={(event) => { event.stopPropagation(); onToggleFav() }} title={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'} type="button">
          <StarIcon size={14} filled={isFav} />
        </button>
      </div>
      <div className="pc-note-expanded-card__text">{note.text}</div>
    </div>
  )
}

/* ━━━ Compare view entry (with star + drag) ━━━ */
function ExpandedNoteEntry({
  note, isFav, onClickNote, onToggleFav, onDragStart, onDragEnd,
}: {
  note: VisibleNote; isFav: boolean
  onClickNote: () => void; onToggleFav: () => void
  onDragStart: (e: DragEvent<HTMLDivElement>) => void; onDragEnd: () => void
}) {
  return (
    <div
      className={`pc-notes-compare__entry${isFav ? ' is-pinned' : ''}${note.contradictionMeta ? ' is-contradiction' : ''}`}
      draggable
      onClick={onClickNote}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <span className="pc-notes-compare__turn">T{note.turn}</span>
      <span className="pc-notes-compare__text">{note.text}</span>
      {note.contradictionMeta ? <span className="pc-notes-compare__flash">&#x26A1;</span> : null}
      <button className={`pc-notes-compare__pin${isFav ? ' is-fav' : ''}`} onClick={(event) => { event.stopPropagation(); onToggleFav() }} title={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'} type="button">
        <StarIcon size={12} filled={isFav} />
      </button>
    </div>
  )
}

export function getNoteSummary(text: string): string {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (!normalized) return '요약 없음'
  const firstSentence = normalized.split(/(?<=[.!?])\s+/).find(Boolean) ?? normalized
  return firstSentence.length > 42 ? `${firstSentence.slice(0, 42).trim()}\u2026` : firstSentence
}
