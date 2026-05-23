/**
 * PCEvidenceViewer — SVG object viewer overlay (read-only)
 *
 * Shows the evidence type-specific sub-viewer (BankViewer, ChatViewer, etc.)
 * in a full overlay. Metadata and investigation stages are shown
 * in PCInteractionPanel instead.
 */
import { useEffect, useCallback, useMemo } from 'react'
import { useStore } from '../../../store/useGameStore'
import { getOriginalViewerData, getOriginalViewerDataByStage } from '../../../data/cases/caseLoader'
import { useI18n } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'
import { shouldBypassSpaceDismiss } from '../../../utils/keyboardDismiss'
import { getPcEvidenceSymbolId } from '../icons/pcIconUtils'
import PCSvgIcon from '../icons/PCSvgIcon'
import {
  ReceiptViewer,
  GpsLogViewer,
  BankViewer,
  ChatViewer,
  ContractViewer,
  TestimonyViewer,
  CCTVViewer,
  LogViewer,
  DeviceViewer,
  SNSViewer,
} from './EvidenceSubViewers'
import type { UnsafeAny } from '../../../types/lint'


export default function PCEvidenceViewer() {
  const { locale, t } = useI18n()
  const pendingEvidenceView = useStore((s) => s.pendingEvidenceView)
  const setPendingEvidenceView = useStore((s) => s.setPendingEvidenceView)
  const caseData = useStore((s) => s.caseData)
  const evidenceStates = useStore((s) => s.evidenceStates)

  const close = useCallback(() => {
    const closingId = pendingEvidenceView
    setPendingEvidenceView(null)
    // 증거 팝업 복귀를 위한 이벤트
    if (closingId) {
      window.dispatchEvent(new CustomEvent('pc:evidence-viewer-closed', { detail: { evidenceId: closingId } }))
    }
  }, [pendingEvidenceView, setPendingEvidenceView])

  useEffect(() => {
    if (!pendingEvidenceView) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.code !== 'Space') return
      if (shouldBypassSpaceDismiss(e.target)) return
      e.preventDefault()
      close()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [pendingEvidenceView, close])

  const evidence = useMemo(() => {
    if (!pendingEvidenceView || !caseData) return null
    return caseData.evidence.find((e) => e.id === pendingEvidenceView) ?? null
  }, [pendingEvidenceView, caseData])

  if (!pendingEvidenceView || !evidence) return null

  const state = evidenceStates[evidence.id]
  const displayName = localizeRuntimeText(evidence.surfaceName ?? evidence.name, locale)
  const currentStage = state?.investigatedActions?.length ?? 0
  const stageCount = evidence.investigationStages?.length || 3
  const boundedStage = Math.min(currentStage, stageCount)
  const openInvestigationPanel = () => {
    setPendingEvidenceView(null)
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('pc:open-interaction-panel', {
        detail: {
          title: displayName,
          subtitle: t('pc.evidenceViewer.investigationTitle'),
          body: t('pc.evidenceViewer.investigationBody'),
          tone: 'gold',
          variant: 'evidence',
          evidenceId: evidence.id,
        },
      }))
    }, 80)
  }
  const baseViewerData = locale === 'ko'
    ? (getOriginalViewerData(caseData!.caseId, evidence.id) ?? evidence.viewerData)
    : evidence.viewerData
  const rawViewerData = (() => {
    const stageMap = locale === 'ko'
      ? (getOriginalViewerDataByStage(caseData!.caseId, evidence.id) ?? (evidence as UnsafeAny).viewerDataByStage)
      : (evidence as UnsafeAny).viewerDataByStage
    if (!stageMap || typeof stageMap !== 'object') return baseViewerData
    const validKeysAsc = Object.keys(stageMap)
      .map((k) => Number(k))
      .filter((k) => !Number.isNaN(k) && k <= currentStage)
      .sort((a, b) => a - b)
    if (validKeysAsc.length === 0) return baseViewerData
    const latest = stageMap[String(validKeysAsc[validKeysAsc.length - 1])] ?? baseViewerData
    // chat/email 타입: 모든 해금된 단계의 메시지를 pages로 누적 노출 (단계 상승 후 이전 단계 회람 가능)
    if ((evidence.type === 'chat' || evidence.type === 'email') && validKeysAsc.length > 1) {
      const latestChat = (latest as UnsafeAny)?.chat
      if (latestChat && Array.isArray(latestChat.messages)) {
        const pages = validKeysAsc
          .map((k) => {
            const stageData = stageMap[String(k)] as UnsafeAny
            const stageChat = stageData?.chat
            if (!stageChat || !Array.isArray(stageChat.messages)) return null
            const stageLabel = stageData?.meta?.stageLabel
            return {
              label: stageLabel ?? t('pc.evidenceViewer.stageLabel', { current: k + 1, total: stageCount }),
              header: stageChat.header,
              messages: stageChat.messages,
            }
          })
          .filter((p): p is NonNullable<typeof p> => p !== null)
        return {
          ...(latest as Record<string, unknown>),
          chat: { ...latestChat, pages },
        }
      }
    }
    return latest
  })()
  const viewerData = locale === 'ko' || !containsHangulDeep(rawViewerData) ? rawViewerData : null
  const hasSubViewer = Boolean(viewerData)
  const hasUntranslatedViewerData = Boolean(rawViewerData && !viewerData)

  return (
    <>
      <div className="pc-ev-backdrop" onClick={close} />

      <div className="pc-panel-wrap pc-panel-wrap--evidence-viewer">
        <div className="pc-panel-pin pc-panel-pin--evidence" aria-hidden="true">
          <PCSvgIcon id="i-doc" size={13} />
        </div>
        <div className="pc-ev-panel pc-ev-panel--viewer">
        {/* Header */}
        <div className="pc-ev-header">
          <span className="pc-ev-header__icon">
            <PCSvgIcon id={getPcEvidenceSymbolId(evidence.type)} size={20} />
          </span>
          <span className="pc-ev-header__name">{displayName}</span>
          <button
            className="pc-ev-header__close"
            data-tutorial-target={evidence.id === 'e-2' ? 'evidence-viewer-close' : undefined}
            onClick={close}
            title={t('pc.evidenceViewer.closeTitle')}
            type="button"
          >
            <PCSvgIcon id="i-plus" size={14} />
          </button>
        </div>

        {/* Body — SVG sub-viewer only */}
        <div className="pc-ev-body">
          {currentStage === 0 ? (
            <div className="pc-ev-placeholder is-locked">
              <PCSvgIcon id={getPcEvidenceSymbolId(evidence.type)} size={64} />
              <p>{t('pc.evidenceViewer.lockedTitle')}</p>
              <span>{t('pc.evidenceViewer.lockedBody')}</span>
              <button className="pc-ev-placeholder__investigate" onClick={openInvestigationPanel} type="button">
                {t('pc.evidenceViewer.openInvestigation')}
              </button>
            </div>
          ) : hasSubViewer ? (
            <>
              <div className="pc-ev-stage-meter" aria-label={t('pc.evidenceViewer.stageAria', { current: boundedStage, total: stageCount })}>
                <span className="pc-ev-stage-meter__label">{t('pc.evidenceViewer.stageLabel', { current: boundedStage, total: stageCount })}</span>
                <span className="pc-ev-stage-meter__track">
                  {Array.from({ length: stageCount }, (_, i) => (
                    <span
                      key={i}
                      className={i < boundedStage ? 'is-on' : ''}
                    />
                  ))}
                </span>
                <span className="pc-ev-stage-meter__hint">
                  {boundedStage < stageCount ? t('pc.evidenceViewer.partialOpen') : t('pc.evidenceViewer.fullOpen')}
                </span>
              </div>
              <EvidenceSubContent type={evidence.type} viewerData={viewerData!} evidenceName={displayName} />
            </>
          ) : (
            <div className="pc-ev-placeholder">
              <PCSvgIcon id={getPcEvidenceSymbolId(evidence.type)} size={64} />
              <p>{displayName}</p>
              <span>{hasUntranslatedViewerData ? t('pc.evidenceViewer.untranslatedData') : t('pc.evidenceViewer.missingData')}</span>
            </div>
          )}
        </div>

        <div className="pc-ev-dismiss-row">
          <button
            type="button"
            className="pc-ev-dismiss pc-event-feedback__dismiss"
            onClick={close}
          >
            <span>{localizeRuntimeText('확인', locale)}</span>
            <kbd className="pc-event-feedback__kbd">Space</kbd>
          </button>
        </div>
        </div>
      </div>
    </>
  )
}

function containsHangulDeep(value: unknown): boolean {
  if (typeof value === 'string') return /[\uAC00-\uD7A3]/.test(value)
  if (Array.isArray(value)) return value.some(containsHangulDeep)
  if (value && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).some(containsHangulDeep)
  }
  return false
}

function EvidenceSubContent({
  type,
  viewerData,
  evidenceName,
}: {
  type: string
  viewerData: Record<string, unknown>
  evidenceName?: string
}) {
  // viewerData의 실제 content key를 기준으로 뷰어를 선택 (type과 content key가 불일치할 수 있음)
  const contentKey = Object.keys(viewerData).find(k => k !== 'meta' && k !== 'media') ?? type
  const data = viewerData[contentKey] ?? viewerData[type]
  if (!data) return null

  switch (contentKey) {
    case 'receipt':
      return <ReceiptViewer sheets={Array.isArray(data) ? data as UnsafeAny : [data]} />
    case 'gps_log':
      return <GpsLogViewer entries={Array.isArray(data) ? data as UnsafeAny : [data]} />
    case 'bank':
    case 'financial_record':
      return <BankViewer rows={Array.isArray(data) ? data as UnsafeAny : [data]} />
    case 'chat':
    case 'email':
      return <ChatViewer header={(data as UnsafeAny).header ?? ''} messages={(data as UnsafeAny).messages ?? []} pages={(data as UnsafeAny).pages} inputStatus={(data as UnsafeAny).inputStatus} />
    case 'contract':
    case 'estimate':
    case 'document':
      return <ContractViewer title={(data as UnsafeAny).title ?? ''} subtitle={(data as UnsafeAny).subtitle ?? ''} rows={(data as UnsafeAny).rows ?? []} signature={(data as UnsafeAny).signature} />
    case 'testimony':
      return <TestimonyViewer data={data as UnsafeAny} />
    case 'cctv':
    case 'photo':
    case 'video':
    case 'dashcam':
      return <CCTVViewer events={Array.isArray(data) ? data as UnsafeAny : [data]} />
    case 'log':
    case 'platform_log':
    case 'cloud_log':
    case 'device_log':
      return <LogViewer rows={(data as UnsafeAny).rows ?? []} note={(data as UnsafeAny).note ?? ''} title={(data as UnsafeAny).title ?? evidenceName} pages={(data as UnsafeAny).pages} />
    case 'device':
      return <DeviceViewer ownerName={(data as UnsafeAny).ownerName ?? ''} sections={(data as UnsafeAny).sections ?? []} />
    case 'sns':
      return <SNSViewer data={data as UnsafeAny} />
    default:
      return null
  }
}
