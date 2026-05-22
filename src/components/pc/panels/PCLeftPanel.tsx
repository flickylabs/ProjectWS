import { useCallback, useEffect, useMemo, useState, type DragEvent } from 'react'
import { createPortal } from 'react-dom'
import { Phase, type CaseData, type EvidenceNode, type PartyId } from '../../../types'
import { computeSurfacedEvidence } from '../../../engine/evidenceEngine'
import { useGameStore, useStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcEvidenceSymbolId } from '../icons/pcIconUtils'
import { HOTBAR_DRAG_TYPE } from '../hotbar/pcHotbarConfig'
import { openPcInteractionPanel, type PcInteractionAction } from '../layout/PCInteractionPanel'
import PCImportantNotesSection, { PC_ADD_COMBINATION_NOTE_EVENT, type PcCombinationPanelEventDetail } from './PCImportantNotesSection'
import PCCaseTimelineSection from './PCCaseTimelineSection'
import JudgeObservationSection from '../observation/JudgeObservationSection'
import JudgeNotebookSection from '../observation/JudgeNotebookSection'
import JudgeObservationHistoryDrawer from '../observation/JudgeObservationHistoryDrawer'
import { translate, useI18n, type MessageKey } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'
import type { UnsafeAny } from '../../../types/lint'


const EVIDENCE_TYPE_LABEL_KEYS: Record<string, MessageKey> = {
  bank: 'pc.left.evidenceType.bank',
  financial_record: 'pc.left.evidenceType.financial_record',
  receipt: 'pc.left.evidenceType.receipt',
  chat: 'pc.left.evidenceType.chat',
  contract: 'pc.left.evidenceType.contract',
  estimate: 'pc.left.evidenceType.estimate',
  document: 'pc.left.evidenceType.document',
  institutional_note: 'pc.left.evidenceType.institutional_note',
  medical_record: 'pc.left.evidenceType.medical_record',
  testimony: 'pc.left.evidenceType.testimony',
  cctv: 'pc.left.evidenceType.cctv',
  photo: 'pc.left.evidenceType.photo',
  photo_video: 'pc.left.evidenceType.photo_video',
  video: 'pc.left.evidenceType.video',
  dashcam: 'pc.left.evidenceType.dashcam',
  log: 'pc.left.evidenceType.log',
  platform_log: 'pc.left.evidenceType.platform_log',
  cloud_log: 'pc.left.evidenceType.cloud_log',
  device_log: 'pc.left.evidenceType.device_log',
  record: 'pc.left.evidenceType.record',
  delivery_record: 'pc.left.evidenceType.delivery_record',
  repair_record: 'pc.left.evidenceType.repair_record',
  email: 'pc.left.evidenceType.email',
  audio: 'pc.left.evidenceType.audio',
  forensic_report: 'pc.left.evidenceType.forensic_report',
  device: 'pc.left.evidenceType.device',
  sns: 'pc.left.evidenceType.sns',
}

export default function PCLeftPanel() {
  const { locale, t } = useI18n()
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const getCombinableEvidenceIds = useStore((s) => s.getCombinableEvidenceIds)
  const getCombinationPartnerHints = useStore((s) => s.getCombinationPartnerHints)
  const combinationLabRuntime = useStore((s) => (s as UnsafeAny).combinationLabRuntime)
  const migrateCombinationLabRuntime = useStore((s) => s.migrateCombinationLabRuntime)
  const combinableIds = useMemo(() => getCombinableEvidenceIds(), [getCombinableEvidenceIds, evidenceStates])
  const partnerHints = useMemo(() => getCombinationPartnerHints(), [getCombinationPartnerHints, evidenceStates, combinationLabRuntime])
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const [timelineOpen, setTimelineOpen] = useState(false)

  useEffect(() => {
    migrateCombinationLabRuntime()
  }, [migrateCombinationLabRuntime, caseData?.caseId])

  // Phase 1 (사전진술) 등에서는 증거 인터랙션 차단 — 스크립트 흐름 보존.
  // 활성 Phase 체계: 0(브리핑) → 1(사전진술) → 2(심문 = Phase.Interrogation) → 3a(판결 진입) → 3b(판결)
  const evidenceInteractionAllowed = currentPhase === Phase.Interrogation

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
    // Tutorial: complete the "select evidence" step when the e-2 card is opened.
    if (evidence.id === 'e-2') {
      useGameStore.getState().markStepComplete('evidence-select')
    }
    const state = evidenceStates[evidence.id]
    const label = state?.deepInvestigated ? evidence.name : (evidence.surfaceName ?? evidence.name)
    const stages = evidence.investigationStages ?? []
    const investigatedKeys = new Set(state?.investigatedActions ?? [])

    // 사용자 요청 2026-05-21 (12th): evidence modal body 완전 제거.
    // description 텍스트 노출 X — title + 조사 단계 stack만. body는 counter만 남기고
    // "증거 열람" 버튼이 같은 행에 inline.
    const bodyParts: string[] = []
    if (stages.length > 0) {
      const revealedCount = stages.filter((s) => investigatedKeys.has(s.revealKey)).length
      bodyParts.push(`${t('pc.left.evidence.foundContent')} ${revealedCount}/${stages.length}`)
    }

    const actions: PcInteractionAction[] = [
      { kind: 'open_evidence', label: t('pc.left.evidence.open'), evidenceId: evidence.id },
    ]

    const metaTags = buildEvidenceMetaTags(evidence.meta, t)

    openPcInteractionPanel({
      title: label,
      subtitle: getEvidenceTypeLabel(evidence.type, t),
      tone: 'gold',
      variant: 'evidence',
      evidenceId: evidence.id,
      evidenceTypeLabel: getEvidenceTypeLabel(evidence.type, t),
      evidenceMetaTags: metaTags,
      body: bodyParts.join('\n'),
      actions,
    })
  }, [evidenceStates, locale, t])

  const sendEvidenceToCombination = useCallback((evidenceId: string) => {
    window.dispatchEvent(new CustomEvent<PcCombinationPanelEventDetail>(PC_ADD_COMBINATION_NOTE_EVENT, { detail: { evidenceId } }))
  }, [])

  const startEvidenceDrag = useCallback((event: DragEvent<HTMLElement>, evidenceId: string, label: string) => {
    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.setData(HOTBAR_DRAG_TYPE, JSON.stringify({ kind: 'evidence', evidenceId }))
    event.dataTransfer.setData('text/plain', label)
  }, [])

  // 드로어 상호 배타 — 다른 drawer 열리면 timeline 닫기
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail !== 'timeline') setTimelineOpen(false)
    }
    window.addEventListener('pc-drawer-open', handler)
    return () => window.removeEventListener('pc-drawer-open', handler)
  }, [])

  const toggleTimeline = useCallback(() => {
    setTimelineOpen((prev) => {
      const next = !prev
      if (next) {
        window.dispatchEvent(new CustomEvent('pc-drawer-open', { detail: 'timeline' }))
      }
      return next
    })
  }, [])

  return (
    <div className={`pc-play-left pc-play-left--timeline-host${timelineOpen ? ' is-timeline-open' : ''}`}>
      <button
        aria-expanded={timelineOpen}
        className={`pc-play-timeline-toggle${timelineOpen ? ' is-open' : ''}`}
        onClick={toggleTimeline}
        title={timelineOpen ? t('pc.left.timeline.close') : t('pc.left.timeline.open')}
        type="button"
      >
        <PCSvgIcon id="i-clock" size={14} />
      </button>

      <section
        className="sec pc-play-evidence-section"
        style={!evidenceInteractionAllowed ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
        aria-disabled={!evidenceInteractionAllowed}
        title={!evidenceInteractionAllowed ? t('pc.left.evidence.interrogationOnly') : undefined}
      >
        <div className="sec-h">
          <PCSvgIcon id="i-doc" size={14} />
          <span>{t('pc.left.evidence.title')}</span>
          <span className="cnt">{surfaceResult ? evidenceCards.length : 0}</span>
          <span className="sub">{`— ${t('pc.left.evidence.lockedCount', { count: lockedCount })}`}</span>
          <span className="pc-evidence-help" title={t('pc.left.evidence.help')}>?</span>
        </div>

        <div className="pc-play-evidence-list">
          {evidenceCards.map((evidence) => {
            const state = evidenceStates[evidence.id]
            const label = localizeRuntimeText(state?.deepInvestigated ? evidence.name : (evidence.surfaceName ?? evidence.name), locale)
            const hint = partnerHints.get(evidence.id)
            const comboTitle = hint
              ? buildComboHintTitle(hint)
              : undefined

            return (
              <div
                className={`pc-ev-notebook${combinableIds.has(evidence.id) ? ' is-combinable' : ''}`}
                data-evidence-id={evidence.id}
                data-resonance-target={`evidence-${evidence.id}`}
                data-tutorial-target={evidence.id === 'e-2' ? 'evidence-e2-card' : undefined}
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
                          <PCSvgIcon id="i-link" size={12} /> {hint.readyCount}
                        </span>
                      ) : null}
                      {hint.recipeCount - hint.readyCount > 0 ? (
                        <span className="pc-ev-notebook__combo-badge is-potential">
                          <PCSvgIcon id="i-search" size={12} /> {hint.recipeCount - hint.readyCount}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                  <span className="pc-ev-notebook__badge">{getEvidenceTypeLabel(evidence.type, t, t('pc.left.evidence.record'))}</span>
                </button>
              </div>
            )
          })}
        </div>

      </section>

      <PCImportantNotesSection />

      <JudgeObservationSection />

      <JudgeNotebookSection />

      {typeof document !== 'undefined' && createPortal(
        <aside className={`pc-play-timeline-panel${timelineOpen ? ' is-open' : ''}`} aria-hidden={!timelineOpen}>
          <button
            className="pc-drawer-close"
            onClick={() => setTimelineOpen(false)}
            type="button"
            aria-label={t('pc.common.close')}
          >
            ✕
          </button>
          <PCCaseTimelineSection onItemClick={() => setTimelineOpen(false)} />
        </aside>,
        document.body,
      )}

      <JudgeObservationHistoryDrawer />
    </div>
  )
}

function buildComboHintTitle(hint: { recipeCount: number; readyCount: number; partnersByCategory: { evidence: number; statement: number; other: number } }): string {
  const potential = hint.recipeCount - hint.readyCount
  const parts: string[] = []
  if (hint.readyCount > 0) {
    parts.push(translate('pc.combo.ready', { count: hint.readyCount }))
  }
  if (potential > 0) {
    parts.push(translate('pc.combo.potential', { count: potential }))
  }
  const { evidence, statement } = hint.partnersByCategory
  const categories: string[] = []
  if (evidence > 0) categories.push(translate('pc.left.combo.evidencePartner', { count: evidence }))
  if (statement > 0) categories.push(translate('pc.left.combo.statementPartner', { count: statement }))
  if (categories.length > 0) {
    parts.push(translate('pc.left.combo.partnerCandidates', { items: categories.join(' · ') }))
  }
  return parts.join('\n')
}

function getEvidenceTypeLabel(
  type: string,
  t: (key: MessageKey, values?: Record<string, string | number | boolean | null | undefined>) => string,
  fallback = t('pc.left.evidence.file'),
): string {
  const key = EVIDENCE_TYPE_LABEL_KEYS[type]
  return key ? t(key) : fallback
}

function buildEvidenceMetaTags(
  meta: EvidenceNode['meta'] | undefined,
  t: (key: MessageKey, values?: Record<string, string | number | boolean | null | undefined>) => string,
): string[] {
  const tags: string[] = []
  if (meta?.trustLevel) tags.push(t(`pc.evidenceMeta.trust.${meta.trustLevel}` as MessageKey))
  if (meta?.source) tags.push(t(`pc.evidenceMeta.source.${meta.source}` as MessageKey))
  return tags
}

function _formatLocalizedCaseText(
  value: string,
  locale: string,
  t: (key: MessageKey, values?: Record<string, string | number | boolean | null | undefined>) => string,
): string {
  if (locale === 'ko' || !/[\uAC00-\uD7A3]/.test(value)) return value
  return t('pc.evidenceViewer.untranslatedData')
}

function _buildPresentActions(
  evidence: EvidenceNode,
  focusDisputeId: string | null,
  canPresent: boolean,
  evidenceStates: Record<string, { presentedTo?: PartyId[]; investigatedActions?: string[]; presentedStagesByParty?: Partial<Record<PartyId, number[]>> }>,
  caseData: CaseData | null,
): PcInteractionAction[] {
  if (!caseData || !focusDisputeId) {
    return []
  }

  // subjectParty 분기 — 비매칭 측은 disabled + 사유 표시
  const parties: PartyId[] = ['a', 'b']
  const subjectParty = evidence.subjectParty ?? 'both'

  return parties.map((party) => {
    const partyName = party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
    const otherName = party === 'a' ? caseData.duo.partyB.name : caseData.duo.partyA.name
    const evidenceState = evidenceStates[evidence.id]
    const currentStage = evidenceState?.investigatedActions?.length ?? 0
    const alreadyPresented = currentStage > 0 && (evidenceState?.presentedStagesByParty?.[party] ?? []).includes(currentStage)
    const relevant = subjectParty === 'both' || subjectParty === party

    return {
      kind: 'open_evidence_selection',
      label: `${partyName}에게 증거 제시${currentStage > 0 ? ` · 조사 ${currentStage}단계` : ''}`,
      party,
      disputeId: focusDisputeId,
      disabled: !canPresent || currentStage <= 0 || alreadyPresented || !relevant,
      disabledReason: !canPresent
        ? '증거 제시는 증거 정리 단계부터 가능합니다.'
        : currentStage <= 0
          ? '증거를 1단계 이상 조사한 뒤 제시할 수 있습니다.'
        : alreadyPresented
          ? `조사 ${currentStage}단계 답변은 이미 받았습니다. 다음 조사 단계가 열리면 다시 제시할 수 있습니다.`
          : !relevant
            ? `${otherName} 측 증거입니다. ${partyName}에게는 추궁 효과가 없습니다.`
            : undefined,
    }
  })
}
