import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type DragEvent, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { GamePhase, type CaseData, type EvidenceNode, type PartyId } from '../../../types'
import { computeSurfacedEvidence } from '../../../engine/evidenceEngine'
import { useStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcEvidenceSymbolId } from '../icons/pcIconUtils'
import { HOTBAR_DRAG_TYPE } from '../hotbar/pcHotbarConfig'
import { openPcInteractionPanel, type PcInteractionAction } from '../layout/PCInteractionPanel'
import PCImportantNotesSection, { PC_ADD_COMBINATION_NOTE_EVENT, type PcCombinationPanelEventDetail } from './PCImportantNotesSection'
import PCCaseTimelineSection from './PCCaseTimelineSection'

const TYPE_LABELS: Record<string, string> = {
  bank: '금융',
  financial_record: '금융',
  receipt: '영수증',
  chat: '메신저',
  contract: '계약',
  estimate: '견적',
  document: '문서',
  institutional_note: '기관 문서',
  medical_record: '의료 기록',
  testimony: '증언',
  cctv: '영상',
  photo: '사진',
  photo_video: '사진·영상',
  video: '영상',
  dashcam: '블랙박스',
  log: '기록',
  platform_log: '플랫폼 로그',
  cloud_log: '클라우드 로그',
  device_log: '기기 로그',
  record: '기록',
  delivery_record: '배달 기록',
  repair_record: '수리 기록',
  email: '메일',
  audio: '오디오',
  forensic_report: '감정',
  device: '기기',
  sns: 'SNS',
}

export default function PCLeftPanel() {
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const getCombinableEvidenceIds = useStore((s) => s.getCombinableEvidenceIds)
  const getCombinationPartnerHints = useStore((s) => s.getCombinationPartnerHints)
  const combinationLabRuntime = useStore((s) => (s as any).combinationLabRuntime)
  const combinableIds = useMemo(() => getCombinableEvidenceIds(), [getCombinableEvidenceIds, evidenceStates])
  const partnerHints = useMemo(() => getCombinationPartnerHints(), [getCombinationPartnerHints, evidenceStates, combinationLabRuntime])
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const [timelineOpen, setTimelineOpen] = useState(false)

  const surfaceResult = useMemo(() => {
    if (!caseData || evidenceDefinitions.length === 0) {
      return null
    }

    const unlockedIds = evidenceDefinitions
      .filter((evidence) => evidenceStates[evidence.id]?.unlocked)
      .map((evidence) => evidence.id)

    const baseEvidenceIds = caseData.baseEvidenceIds
      ? [...caseData.baseEvidenceIds]
      : unlockedIds.slice(0, 3)

    return computeSurfacedEvidence(evidenceStates, evidenceDefinitions, lastFocusedDisputeId, baseEvidenceIds)
  }, [caseData, evidenceDefinitions, evidenceStates, lastFocusedDisputeId])

  const lockedCount = useMemo(() => {
    return evidenceDefinitions.filter((evidence) => !evidenceStates[evidence.id]?.unlocked).length
  }, [evidenceDefinitions, evidenceStates])

  const evidenceCards = useMemo(() => {
    if (!surfaceResult) {
      return []
    }

    const allIds = [...surfaceResult.surfacedIds, ...surfaceResult.dimmedIds]
    return allIds
      .map((id) => evidenceDefinitions.find((evidence) => evidence.id === id))
      .filter((evidence): evidence is EvidenceNode => Boolean(evidence))
  }, [evidenceDefinitions, surfaceResult])

  const openEvidenceMenu = useCallback((evidence: EvidenceNode) => {
    const state = evidenceStates[evidence.id]
    const label = state?.deepInvestigated ? evidence.name : (evidence.surfaceName ?? evidence.name)
    const desc = state?.deepInvestigated ? evidence.description : (evidence.surfaceDescription ?? evidence.description)
    const stages = evidence.investigationStages ?? []
    const investigatedKeys = new Set(state?.investigatedActions ?? [])

    const bodyParts: string[] = [desc]
    const revealedFindings = stages
      .filter((s) => investigatedKeys.has(s.revealKey))
      .map((s) => evidence.investigationResults[s.revealKey])
      .filter(Boolean)
    const hiddenCount = stages.filter((s) => !investigatedKeys.has(s.revealKey)).length

    if (revealedFindings.length > 0 || hiddenCount > 0) {
      bodyParts.push('')
      bodyParts.push('발견한 내용:')
      revealedFindings.forEach((f) => bodyParts.push(`• ${f}`))
      if (hiddenCount > 0) bodyParts.push(`(미확인 항목 ${hiddenCount}개)`)
    }

    const actions: PcInteractionAction[] = [
      { kind: 'open_evidence', label: '증거 열람', evidenceId: evidence.id },
    ]

    const meta = evidence.meta
    const metaTags: string[] = []
    if (meta?.trustLabel) metaTags.push(meta.trustLabel)
    if (meta?.sourceLabel) metaTags.push(meta.sourceLabel)

    openPcInteractionPanel({
      title: label,
      subtitle: TYPE_LABELS[evidence.type] ?? '증거 파일',
      tone: 'gold',
      variant: 'evidence',
      evidenceId: evidence.id,
      evidenceTypeLabel: TYPE_LABELS[evidence.type] ?? '증거 파일',
      evidenceMetaTags: metaTags,
      body: bodyParts.join('\n'),
      actions,
    })
  }, [evidenceStates])

  const sendEvidenceToCombination = useCallback((evidenceId: string) => {
    window.dispatchEvent(new CustomEvent<PcCombinationPanelEventDetail>(PC_ADD_COMBINATION_NOTE_EVENT, { detail: { evidenceId } }))
  }, [])

  const startEvidenceDrag = useCallback((event: DragEvent<HTMLElement>, evidenceId: string, label: string) => {
    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.setData(HOTBAR_DRAG_TYPE, JSON.stringify({ kind: 'evidence', evidenceId }))
    event.dataTransfer.setData('text/plain', label)
  }, [])

  const hostRef = useRef<HTMLDivElement>(null)
  const [portalAnchor, setPortalAnchor] = useState<{ left: number; top: number; height: number }>({
    // 첫 클릭 시에도 즉시 렌더되도록 합리적 기본값 제공.
    // useLayoutEffect에서 실제 좌측 패널 경계로 재측정됨.
    left: 380,
    top: 80,
    height: Math.max(400, (typeof window !== 'undefined' ? window.innerHeight : 800) - 160),
  })

  // 좌측 패널의 우측 경계 + 16px 지점이 타임라인 토스트 시작점. 뷰포트 기준.
  useLayoutEffect(() => {
    if (!timelineOpen) return
    const host = hostRef.current
    if (!host) return
    const update = () => {
      const rect = host.getBoundingClientRect()
      setPortalAnchor({
        left: Math.round(rect.right + 16),
        top: Math.round(rect.top + 8),
        height: Math.round(rect.height - 16),
      })
    }
    update()
    window.addEventListener('resize', update)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    if (ro) ro.observe(host)
    return () => {
      window.removeEventListener('resize', update)
      if (ro) ro.disconnect()
    }
  }, [timelineOpen])

  // 스크롤 시에도 재측정 (좌측 패널이 스크롤 컨테이너 안이면 대응)
  useEffect(() => {
    if (!timelineOpen) return
    const onScroll = () => {
      const host = hostRef.current
      if (!host) return
      const rect = host.getBoundingClientRect()
      setPortalAnchor({
        left: Math.round(rect.right + 16),
        top: Math.round(rect.top + 8),
        height: Math.round(rect.height - 16),
      })
    }
    window.addEventListener('scroll', onScroll, true)
    return () => window.removeEventListener('scroll', onScroll, true)
  }, [timelineOpen])

  // 토글 버튼 클릭 시 열기 전에 즉시 anchor 측정 (첫 렌더에도 정확한 위치 보장)
  const handleToggleTimeline = useCallback(() => {
    if (!timelineOpen) {
      const host = hostRef.current
      if (host) {
        const rect = host.getBoundingClientRect()
        setPortalAnchor({
          left: Math.round(rect.right + 16),
          top: Math.round(rect.top + 8),
          height: Math.round(rect.height - 16),
        })
      }
    }
    setTimelineOpen((current) => !current)
  }, [timelineOpen])

  return (
    <div
      ref={hostRef}
      className={`pc-play-left pc-play-left--timeline-host${timelineOpen ? ' is-timeline-open' : ''}`}
    >
      <button
        aria-expanded={timelineOpen}
        className={`pc-play-timeline-toggle${timelineOpen ? ' is-open' : ''}`}
        onClick={handleToggleTimeline}
        title={timelineOpen ? '타임라인 닫기' : '타임라인 열기'}
        type="button"
      >
        <PCSvgIcon id="i-clock" size={14} />
      </button>

      <section className="sec pc-play-evidence-section">
        <div className="sec-h">
          <PCSvgIcon id="i-doc" size={14} />
          <span>증거 수첩</span>
          <span className="cnt">{surfaceResult ? evidenceCards.length : 0}</span>
          <span className="sub">{`— 잠금 ${lockedCount}`}</span>
          <span className="pc-evidence-help" title="단서는 심문 진행 또는 증거 제시 이후 추가로 등장합니다">?</span>
        </div>

        <div className="pc-play-evidence-list">
          {evidenceCards.map((evidence) => {
            const state = evidenceStates[evidence.id]
            const label = state?.deepInvestigated ? evidence.name : (evidence.surfaceName ?? evidence.name)
            const hint = partnerHints.get(evidence.id)
            const comboTitle = hint
              ? buildComboHintTitle(hint)
              : undefined

            return (
              <div
                className={`pc-ev-notebook${combinableIds.has(evidence.id) ? ' is-combinable' : ''}`}
                draggable
                key={evidence.id}
                onDragStart={(event) => startEvidenceDrag(event, evidence.id, label)}
              >
                <button
                  className="pc-ev-notebook__header"
                  onClick={(event) => {
                    if (event.shiftKey) {
                      sendEvidenceToCombination(evidence.id)
                      return
                    }
                    openEvidenceMenu(evidence)
                  }}
                  type="button"
                >
                  <span className="pc-ev-notebook__icon">
                    <PCSvgIcon id={getPcEvidenceSymbolId(evidence.type)} size={16} />
                  </span>
                  <span className="pc-ev-notebook__name">{label}</span>
                  {hint && hint.recipeCount > 0 ? (
                    <span className="pc-ev-notebook__combo-wrap" title={comboTitle}>
                      {hint.readyCount > 0 ? (
                        <span className="pc-ev-notebook__combo-badge is-ready">
                          🔗 {hint.readyCount}
                        </span>
                      ) : null}
                      {hint.recipeCount - hint.readyCount > 0 ? (
                        <span className="pc-ev-notebook__combo-badge is-potential">
                          🔍 {hint.recipeCount - hint.readyCount}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                  <span className="pc-ev-notebook__badge">{TYPE_LABELS[evidence.type] ?? '기록'}</span>
                </button>
              </div>
            )
          })}
        </div>

      </section>

      <PCImportantNotesSection />

      {/* 타임라인은 Portal로 body에 mount. 좌측 패널 stacking context를 완전히 벗어나
          채팅·발언대 등 어떤 요소에도 가려지지 않음 (모달 9000+보다는 아래로 유지). */}
      {timelineOpen && createPortal(
        <aside
          className="pc-play-timeline-panel is-open is-portal"
          style={{
            position: 'fixed',
            left: portalAnchor.left,
            top: portalAnchor.top,
            height: portalAnchor.height,
            width: 360,
            maxWidth: 360,
            zIndex: 80,
            background: '#0a0a10',
            backgroundImage: 'none',
            borderRadius: 24,
            border: '1px solid rgba(212, 162, 78, 0.16)',
            boxShadow: '0 28px 60px rgba(0, 0, 0, 0.58)',
            overflow: 'hidden',
          } as CSSProperties}
        >
          <PCCaseTimelineSection />
        </aside>,
        document.body,
      )}
    </div>
  )
}

function buildComboHintTitle(hint: { recipeCount: number; readyCount: number; partnersByCategory: { evidence: number; statement: number; other: number } }): string {
  const potential = hint.recipeCount - hint.readyCount
  const parts: string[] = []
  if (hint.readyCount > 0) {
    parts.push(`조합 가능 ${hint.readyCount}개 — 지금 바로 연결 가능`)
  }
  if (potential > 0) {
    parts.push(`실마리 필요 ${potential}개 — 아직 찾지 못한 단서가 있는 듯`)
  }
  const { evidence, statement } = hint.partnersByCategory
  const categories: string[] = []
  if (evidence > 0) categories.push(`증거 ${evidence}`)
  if (statement > 0) categories.push(`발언 ${statement}`)
  if (categories.length > 0) {
    parts.push(`짝 후보: ${categories.join(' · ')}`)
  }
  return parts.join('\n')
}

function buildPresentActions(
  evidence: EvidenceNode,
  focusDisputeId: string | null,
  canPresent: boolean,
  evidenceStates: Record<string, { presentedTo?: PartyId[] }>,
  caseData: CaseData | null,
): PcInteractionAction[] {
  if (!caseData || !focusDisputeId) {
    return []
  }

  // 양쪽 모두에게 제시 가능 — 대상 교체 허용
  const parties: PartyId[] = ['a', 'b']

  return parties.map((party) => {
    const partyName = party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
    const alreadyPresented = evidenceStates[evidence.id]?.presentedTo?.includes(party) ?? false

    return {
      kind: 'open_evidence_selection',
      label: `${partyName}에게 증거 제시`,
      party,
      disputeId: focusDisputeId,
      disabled: !canPresent || alreadyPresented,
      disabledReason: !canPresent
        ? '증거 제시는 증거 정리 단계부터 가능합니다.'
        : '이미 이 대상에게 제시한 증거입니다.',
    }
  })
}
