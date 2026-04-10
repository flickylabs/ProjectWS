import { useCallback, useMemo, useState, type DragEvent } from 'react'
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
  const recommendedEvidenceIds = useStore((s) => s.recommendedEvidenceIds)
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
    const focusDisputeId = lastFocusedDisputeId ?? evidence.proves[0] ?? caseData?.disputes[0]?.id ?? null
    const canPresent = currentPhase === GamePhase.Phase4_Evidence || currentPhase === GamePhase.Phase5_ReExamination

    const actions: PcInteractionAction[] = [
      { kind: 'open_evidence', label: '증거 열람', evidenceId: evidence.id },
      ...buildPresentActions(evidence, focusDisputeId, canPresent, evidenceStates, caseData),
      ...(focusDisputeId ? [{ kind: 'focus_dispute' as const, label: '관련 쟁점 보기', disputeId: focusDisputeId }] : []),
    ]

    openPcInteractionPanel({
      title: evidence.surfaceName ?? evidence.name,
      subtitle: TYPE_LABELS[evidence.type] ?? '증거 파일',
      tone: 'gold',
      body: [
        evidence.surfaceDescription ?? evidence.description,
        '',
        focusDisputeId
          ? `관련 쟁점: ${caseData?.disputes.find((dispute) => dispute.id === focusDisputeId)?.name ?? '현재 선택된 쟁점'}`
          : '관련 쟁점이 없습니다.',
      ].join('\n'),
      tags: [
        evidence.reliability === 'hard' ? '하드 증거' : '소프트 증거',
        evidenceStates[evidence.id]?.presented ? '제시됨' : '미제시',
      ],
      actions,
    })
  }, [caseData, currentPhase, evidenceStates, lastFocusedDisputeId])

  const sendEvidenceToCombination = useCallback((evidenceId: string) => {
    window.dispatchEvent(new CustomEvent<PcCombinationPanelEventDetail>(PC_ADD_COMBINATION_NOTE_EVENT, { detail: { evidenceId } }))
  }, [])

  const startEvidenceDrag = useCallback((event: DragEvent<HTMLButtonElement>, evidenceId: string, label: string) => {
    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.setData(HOTBAR_DRAG_TYPE, JSON.stringify({ kind: 'evidence', evidenceId }))
    event.dataTransfer.setData('text/plain', label)
  }, [])

  return (
    <div className={`pc-play-left pc-play-left--timeline-host${timelineOpen ? ' is-timeline-open' : ''}`}>
      <button
        aria-expanded={timelineOpen}
        className={`pc-play-timeline-toggle${timelineOpen ? ' is-open' : ''}`}
        onClick={() => setTimelineOpen((current) => !current)}
        title={timelineOpen ? '타임라인 닫기' : '타임라인 열기'}
        type="button"
      >
        <PCSvgIcon id="i-clock" size={14} />
      </button>

      <section className="sec pc-play-evidence-section">
        <div className="sec-h">
          <PCSvgIcon id="i-doc" size={14} />
          <span>증거</span>
          <span className="cnt">{surfaceResult ? evidenceCards.length : 0}</span>
          <span className="sub">{`잠금 ${lockedCount}`}</span>
        </div>

        <div className="pc-play-evidence-list">
          {evidenceCards.map((evidence) => {
            const recommended = recommendedEvidenceIds.includes(evidence.id)
            const surfaced = surfaceResult?.surfacedIds.includes(evidence.id) ?? false
            const state = evidenceStates[evidence.id]
            const label = state?.deepInvestigated ? evidence.name : (evidence.surfaceName ?? evidence.name)

            return (
              <button
                className={`ev-card pc-play-ev-card${recommended || surfaced ? ' rec' : ''}${surfaceResult?.dimmedIds.includes(evidence.id) ? ' is-dim' : ''}`}
                draggable
                key={evidence.id}
                onClick={(event) => {
                  if (event.shiftKey) {
                    sendEvidenceToCombination(evidence.id)
                    return
                  }
                  openEvidenceMenu(evidence)
                }}
                onDoubleClick={() => openEvidenceMenu(evidence)}
                onDragStart={(event) => startEvidenceDrag(event, evidence.id, label)}
                type="button"
              >
                <span className="ev-ico">
                  <PCSvgIcon id={getPcEvidenceSymbolId(evidence.type)} size={18} />
                </span>
                <span className="ev-nm">{label}</span>
                <span className={`ev-badge ${recommended ? 'badge-rec' : 'badge-new'}`}>
                  {TYPE_LABELS[evidence.type] ?? '기록'}
                </span>
              </button>
            )
          })}
        </div>

        {currentPhase !== GamePhase.Phase4_Evidence && currentPhase !== GamePhase.Phase5_ReExamination ? (
          <div className="pc-play-evidence-hint">
            추가 단서는 심문 진행 또는 증거 제시 이후 해금됩니다.
          </div>
        ) : null}
      </section>

      <PCImportantNotesSection />

      <aside className={`pc-play-timeline-panel${timelineOpen ? ' is-open' : ''}`} aria-hidden={!timelineOpen}>
        <PCCaseTimelineSection />
      </aside>
    </div>
  )
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

  const parties: PartyId[] = evidence.subjectParty === 'a'
    ? ['a']
    : evidence.subjectParty === 'b'
      ? ['b']
      : ['a', 'b']

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
        ? '증거 제시는 Phase 4부터 가능합니다.'
        : '이미 이 대상에게 제시한 증거입니다.',
    }
  })
}
