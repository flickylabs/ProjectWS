/**
 * PCEvidenceViewer — SVG object viewer overlay (read-only)
 *
 * Shows the evidence type-specific sub-viewer (BankViewer, ChatViewer, etc.)
 * in a full overlay. Metadata and investigation stages are shown
 * in PCInteractionPanel instead.
 */
import { useEffect, useCallback, useMemo } from 'react'
import { useStore } from '../../../store/useGameStore'
import { getPcEvidenceSymbolId } from '../icons/pcIconUtils'
import PCSvgIcon from '../icons/PCSvgIcon'
import {
  BankViewer,
  ChatViewer,
  ContractViewer,
  TestimonyViewer,
  CCTVViewer,
  LogViewer,
  DeviceViewer,
  SNSViewer,
} from './EvidenceSubViewers'

export default function PCEvidenceViewer() {
  const pendingEvidenceView = useStore((s) => s.pendingEvidenceView)
  const setPendingEvidenceView = useStore((s) => s.setPendingEvidenceView)
  const caseData = useStore((s) => s.caseData)
  const evidenceStates = useStore((s) => s.evidenceStates)

  const close = useCallback(() => {
    setPendingEvidenceView(null)
  }, [setPendingEvidenceView])

  useEffect(() => {
    if (!pendingEvidenceView) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
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
  const displayName = state?.deepInvestigated ? evidence.name : (evidence.surfaceName ?? evidence.name)
  const hasSubViewer = Boolean(evidence.viewerData)

  return (
    <>
      <div className="pc-ev-backdrop" onClick={close} />

      <div className="pc-ev-panel pc-ev-panel--viewer">
        {/* Header */}
        <div className="pc-ev-header">
          <span className="pc-ev-header__icon">
            <PCSvgIcon id={getPcEvidenceSymbolId(evidence.type)} size={20} />
          </span>
          <span className="pc-ev-header__name">{displayName}</span>
          <button className="pc-ev-header__close" onClick={close} title="닫기 (Esc)" type="button">
            <PCSvgIcon id="i-plus" size={14} />
          </button>
        </div>

        {/* Body — SVG sub-viewer only */}
        <div className="pc-ev-body">
          {hasSubViewer ? (
            <EvidenceSubContent type={evidence.type} viewerData={evidence.viewerData!} />
          ) : (
            <div className="pc-ev-placeholder">
              <PCSvgIcon id={getPcEvidenceSymbolId(evidence.type)} size={64} />
              <p>{displayName}</p>
              <span>상세 열람 데이터가 아직 준비되지 않았습니다</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function EvidenceSubContent({ type, viewerData }: { type: string; viewerData: Record<string, unknown> }) {
  const data = viewerData[type] ?? viewerData.bank ?? viewerData.chat ?? viewerData.log
  if (!data) return null

  switch (type) {
    case 'bank':
    case 'financial_record':
    case 'receipt':
      return <BankViewer rows={data as any} />
    case 'chat':
    case 'email':
      return <ChatViewer header={(data as any).header ?? ''} messages={(data as any).messages ?? []} />
    case 'contract':
    case 'estimate':
    case 'document':
      return <ContractViewer title={(data as any).title ?? ''} subtitle={(data as any).subtitle ?? ''} rows={(data as any).rows ?? []} signature={(data as any).signature} />
    case 'testimony':
      return <TestimonyViewer data={data as any} />
    case 'cctv':
    case 'photo':
    case 'video':
    case 'dashcam':
      return <CCTVViewer events={data as any} />
    case 'log':
    case 'platform_log':
    case 'cloud_log':
    case 'device_log':
      return <LogViewer rows={(data as any).rows ?? []} note={(data as any).note} />
    case 'device':
      return <DeviceViewer ownerName={(data as any).ownerName ?? ''} sections={(data as any).sections ?? []} />
    case 'sns':
      return <SNSViewer data={data as any} />
    default:
      return null
  }
}
