import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import type { CaseData } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getDifficultyLabel, sortCasesForBrowser } from './pcHomeShared'

const CLEAR_SCORE_THRESHOLD = 40
const EDGE_SCROLL_THRESHOLD = 88
const EDGE_SCROLL_STEP = 14

type PreviewPosition = { top: number; left: number; side: 'left' | 'right' }
type StageNode = { caseData: CaseData; index: number; stageNumber: string; score: number; cleared: boolean; unlocked: boolean; side: 'left' | 'right' }

interface Props {
  accentIconId?: string
  eyebrow?: string
  title: string
  description: string
  progressLabel?: string
  cases: CaseData[]
  onBack: () => void
  onSelectCase: (caseData: CaseData) => void
  showCompletedFilter?: boolean
  emptyTitle?: string
  emptyDescription?: string
}

export default function PCCaseBrowser({
  accentIconId,
  eyebrow,
  title,
  description,
  progressLabel,
  cases,
  onBack,
  onSelectCase,
  showCompletedFilter = false,
  emptyTitle = '현재 조건에 맞는 사건이 없습니다.',
  emptyDescription = '다른 세션을 고르거나 필터를 조정한 뒤 다시 확인해 주세요.',
}: Props) {
  const [showCompletedOnly, setShowCompletedOnly] = useState(false)
  const [hoveredCaseId, setHoveredCaseId] = useState<string | null>(null)
  const [pinnedCaseId, setPinnedCaseId] = useState<string | null>(null)
  const [previewPosition, setPreviewPosition] = useState<PreviewPosition | null>(null)
  const [autoScrollDirection, setAutoScrollDirection] = useState<-1 | 0 | 1>(0)

  const routeScrollRef = useRef<HTMLDivElement | null>(null)
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const progressMap = useMemo(() => {
    try {
      const raw = localStorage.getItem('solomon-case-progress')
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }, [])

  const filteredCases = useMemo(() => {
    const sorted = sortCasesForBrowser(cases)
    if (!showCompletedFilter || !showCompletedOnly) return sorted
    return sorted.filter((caseData) => (progressMap[caseData.caseId]?.bestScore ?? 0) >= CLEAR_SCORE_THRESHOLD)
  }, [cases, progressMap, showCompletedFilter, showCompletedOnly])

  const stageNodes = useMemo<StageNode[]>(() => {
    let previousCleared = true
    return filteredCases.map((caseData, index) => {
      const score = progressMap[caseData.caseId]?.bestScore ?? 0
      const cleared = score >= CLEAR_SCORE_THRESHOLD
      const unlocked = index === 0 ? true : previousCleared
      previousCleared = cleared
      return { caseData, index, stageNumber: String(index + 1).padStart(2, '0'), score, cleared, unlocked, side: index % 2 === 0 ? 'left' : 'right' }
    })
  }, [filteredCases, progressMap])

  const defaultCaseId = useMemo(() => {
    if (stageNodes.length === 0) return null
    let latestUnlocked = stageNodes[0].caseData.caseId
    for (const node of stageNodes) {
      if (!node.unlocked) break
      latestUnlocked = node.caseData.caseId
    }
    return latestUnlocked
  }, [stageNodes])

  const activeCaseId = pinnedCaseId ?? hoveredCaseId ?? defaultCaseId
  const activeNode = stageNodes.find((node) => node.caseData.caseId === activeCaseId) ?? null
  const activeCase = activeNode?.caseData ?? null

  const updatePreviewPosition = () => {
    if (!routeScrollRef.current || !activeNode) {
      setPreviewPosition(null)
      return
    }
    const nodeEl = nodeRefs.current[activeNode.caseData.caseId]
    if (!nodeEl) {
      setPreviewPosition(null)
      return
    }

    const routeEl = routeScrollRef.current
    const previewHeight = 248
    const previewWidth = Math.min(420, Math.max(340, routeEl.clientWidth - 176))
    const top = clamp(nodeEl.offsetTop + nodeEl.offsetHeight / 2 - previewHeight / 2, 20, Math.max(20, routeEl.scrollHeight - previewHeight - 20))
    const rawLeft = activeNode.side === 'left' ? nodeEl.offsetLeft + nodeEl.offsetWidth + 28 : nodeEl.offsetLeft - previewWidth - 28
    const left = clamp(rawLeft, 24, Math.max(24, routeEl.clientWidth - previewWidth - 24))
    setPreviewPosition({ top, left, side: activeNode.side })
  }

  useEffect(() => {
    if (!defaultCaseId || pinnedCaseId || hoveredCaseId || !routeScrollRef.current) return
    const nodeEl = nodeRefs.current[defaultCaseId]
    if (!nodeEl) return
    const routeEl = routeScrollRef.current
    const targetTop = clamp(nodeEl.offsetTop - routeEl.clientHeight * 0.5 + nodeEl.offsetHeight * 0.5, 0, Math.max(0, routeEl.scrollHeight - routeEl.clientHeight))
    routeEl.scrollTo({ top: targetTop, behavior: 'smooth' })
  }, [defaultCaseId, hoveredCaseId, pinnedCaseId, stageNodes.length])

  useEffect(() => { updatePreviewPosition() }, [activeCaseId, stageNodes.length])
  useEffect(() => {
    const onResize = () => updatePreviewPosition()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeCaseId, stageNodes.length])
  useEffect(() => {
    if (autoScrollDirection === 0) return
    let frameId = 0
    const tick = () => {
      const routeEl = routeScrollRef.current
      if (routeEl) {
        routeEl.scrollTop += autoScrollDirection * EDGE_SCROLL_STEP
        updatePreviewPosition()
        frameId = window.requestAnimationFrame(tick)
      }
    }
    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [activeCaseId, autoScrollDirection])

  const handleRouteMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const routeEl = routeScrollRef.current
    if (!routeEl) return
    const bounds = routeEl.getBoundingClientRect()
    const relativeY = event.clientY - bounds.top
    if (relativeY <= EDGE_SCROLL_THRESHOLD) setAutoScrollDirection(-1)
    else if (relativeY >= bounds.height - EDGE_SCROLL_THRESHOLD) setAutoScrollDirection(1)
    else setAutoScrollDirection(0)
  }

  const handleRouteMouseLeave = () => {
    setAutoScrollDirection(0)
    if (!pinnedCaseId) setHoveredCaseId(null)
  }

  return (
    <div className="pc-case-browser-v2">
      <header className="pc-depth-header">
        <button className="pc-depth-back" onClick={onBack} type="button"><span aria-hidden="true">‹</span>뒤로</button>
        <div className="pc-depth-header__copy">
          <span>{eyebrow ?? 'CASE BROWSER'}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="pc-case-browser-v2__header-tools">
          {showCompletedFilter ? (
            <button className={`pc-filter-pill-v2${showCompletedOnly ? ' is-active' : ''}`} onClick={() => setShowCompletedOnly((current) => !current)} type="button">
              완료 기록만
            </button>
          ) : null}
          <div className="pc-case-browser-v2__summary">
            <span>표시 중</span>
            <strong>{progressLabel ?? `${filteredCases.length}건`}</strong>
          </div>
        </div>
      </header>

      {stageNodes.length === 0 ? (
        <div className="pc-panel-card-v2"><div className="pc-empty-block"><span className="pc-empty-block__icon"><PCSvgIcon id="i-doc" size={24} /></span><strong>{emptyTitle}</strong><p>{emptyDescription}</p></div></div>
      ) : (
        <section className="pc-stage-map-v2">
          <div className="pc-stage-map-v2__scroll" onMouseLeave={handleRouteMouseLeave} onMouseMove={handleRouteMouseMove} onScroll={updatePreviewPosition} ref={routeScrollRef}>
            <div className="pc-stage-map-v2__route">
              <div className="pc-stage-map-v2__line" />
              {stageNodes.map((node) => {
                const isActive = activeCaseId === node.caseData.caseId
                const isPinned = pinnedCaseId === node.caseData.caseId
                return (
                  <div className={`pc-stage-map-v2__row ${node.side}`} key={node.caseData.caseId}>
                    <button
                      className={['pc-stage-node-v2', isActive ? 'is-active' : '', isPinned ? 'is-pinned' : '', node.cleared ? 'is-cleared' : '', !node.unlocked ? 'is-locked' : ''].filter(Boolean).join(' ')}
                      disabled={!node.unlocked}
                      onClick={() => setPinnedCaseId((current) => current === node.caseData.caseId ? null : node.caseData.caseId)}
                      onMouseEnter={() => { if (!pinnedCaseId) setHoveredCaseId(node.caseData.caseId) }}
                      ref={(element) => { nodeRefs.current[node.caseData.caseId] = element }}
                      type="button"
                    >
                      <span className="pc-stage-node-v2__number">{node.stageNumber}</span>
                      <span className="pc-stage-node-v2__title">{truncate(node.caseData.meta?.title ?? node.caseData.disputes[0]?.name ?? '', 18)}</span>
                      <span className="pc-stage-node-v2__state">{node.score > 0 ? `${node.score}점` : <PCSvgIcon id="i-lock" size={14} />}</span>
                    </button>
                  </div>
                )
              })}

              {activeCase && activeNode && previewPosition ? (
                <article className={`pc-stage-preview-v2 ${previewPosition.side === 'left' ? 'is-left' : 'is-right'}${pinnedCaseId ? ' is-pinned' : ''}`} style={{ top: `${previewPosition.top}px`, left: `${previewPosition.left}px` }}>
                  <span className="pc-stage-preview-v2__eyebrow">STAGE {activeNode.stageNumber}</span>
                  <h3>{buildStageTitle(activeCase)}</h3>
                  <div className="pc-stage-preview-v2__meta">
                    <span>난이도 <b>{getDifficultyLabel(activeCase.meta?.difficulty ?? 'medium')}</b></span>
                    <span>획득 점수 <b>{activeNode.score > 0 ? `${activeNode.score}점` : '\u00A0'}</b></span>
                  </div>
                  <p>{buildCaseSummary(activeCase)}</p>
                  <button className="pc-stage-preview-v2__action" onClick={() => onSelectCase(activeCase)} type="button">상세 보기 &gt;</button>
                </article>
              ) : null}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function buildStageTitle(caseData: CaseData) {
  const title = caseData.meta?.title
  if (title) return truncate(compactText(title), 42)
  const dispute = compactText(caseData.disputes[0]?.name ?? '')
  if (dispute) return truncate(dispute, 42)
  return truncate(compactText(caseData.meta?.emotionalBait ?? caseData.context.description), 42)
}

function buildCaseSummary(caseData: CaseData) {
  const teaser = compactText(caseData.meta?.emotionalBait ?? '')
  if (teaser) return truncate(teaser, 96)
  return truncate(compactText(caseData.context.description), 96)
}

function compactText(text: string) { return text.replace(/\s+/g, ' ').trim() }
function truncate(text: string, maxLength: number) { return text.length > maxLength ? `${text.slice(0, Math.max(0, maxLength - 1)).trim()}…` : text }
function clamp(value: number, min: number, max: number) { return Math.max(min, Math.min(max, value)) }
