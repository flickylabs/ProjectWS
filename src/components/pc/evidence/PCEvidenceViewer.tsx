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

export default function PCEvidenceViewer() {
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
  const displayName = evidence.surfaceName ?? evidence.name
  const currentStage = state?.investigatedActions?.length ?? 0
  const stageCount = evidence.investigationStages?.length || 3
  const boundedStage = Math.min(currentStage, stageCount)
  const openInvestigationPanel = () => {
    setPendingEvidenceView(null)
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('pc:open-interaction-panel', {
        detail: {
          title: displayName,
          subtitle: '증거 조사',
          body: '증거를 조사하면 열람 내용과 제시 질문이 단계적으로 열립니다.',
          tone: 'gold',
          variant: 'evidence',
          evidenceId: evidence.id,
        },
      }))
    }, 80)
  }
  // 원본 JSON의 viewerData를 항상 우선 사용 (sessionStorage 캐시가 오래된 구조일 수 있음)
  const baseViewerData = getOriginalViewerData(caseData!.caseId, evidence.id) ?? evidence.viewerData
  // 단계별 오버라이드 — currentStage 이하 중 가장 큰 key 선택 (원본 JSON 우선)
  const viewerData = (() => {
    const stageMap = getOriginalViewerDataByStage(caseData!.caseId, evidence.id)
      ?? (evidence as any).viewerDataByStage
    if (!stageMap || typeof stageMap !== 'object') return baseViewerData
    const validKeys = Object.keys(stageMap)
      .map((k) => Number(k))
      .filter((k) => !Number.isNaN(k) && k <= currentStage)
      .sort((a, b) => b - a)
    if (validKeys.length === 0) return baseViewerData
    return stageMap[String(validKeys[0])] ?? baseViewerData
  })()
  const hasSubViewer = Boolean(viewerData)

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
          {currentStage === 0 ? (
            <div className="pc-ev-placeholder is-locked">
              <PCSvgIcon id={getPcEvidenceSymbolId(evidence.type)} size={64} />
              <p>아직 열람할 수 없습니다</p>
              <span>증거를 <b>조사</b>하면 내용이 공개됩니다 (첫 조사는 토큰 소모 없음)</span>
              <button className="pc-ev-placeholder__investigate" onClick={openInvestigationPanel} type="button">
                증거조사 바로가기
              </button>
            </div>
          ) : hasSubViewer ? (
            <>
              <div className="pc-ev-stage-meter" aria-label={`조사 ${boundedStage}단계 / ${stageCount}단계`}>
                <span className="pc-ev-stage-meter__label">조사 {boundedStage}단계 / {stageCount}단계</span>
                <span className="pc-ev-stage-meter__track">
                  {Array.from({ length: stageCount }, (_, i) => (
                    <span
                      key={i}
                      className={i < boundedStage ? 'is-on' : ''}
                    />
                  ))}
                </span>
                <span className="pc-ev-stage-meter__hint">
                  {boundedStage < stageCount ? '부분 공개' : '전체 공개'}
                </span>
              </div>
              <EvidenceSubContent type={evidence.type} viewerData={viewerData!} />
            </>
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
  // viewerData의 실제 content key를 기준으로 뷰어를 선택 (type과 content key가 불일치할 수 있음)
  const contentKey = Object.keys(viewerData).find(k => k !== 'meta' && k !== 'media') ?? type
  const data = viewerData[contentKey] ?? viewerData[type]
  if (!data) return null

  switch (contentKey) {
    case 'receipt':
      return <ReceiptViewer sheets={Array.isArray(data) ? data as any : [data]} />
    case 'gps_log':
      return <GpsLogViewer entries={Array.isArray(data) ? data as any : [data]} />
    case 'bank':
    case 'financial_record':
      return <BankViewer rows={Array.isArray(data) ? data as any : [data]} />
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
      return <CCTVViewer events={Array.isArray(data) ? data as any : [data]} />
    case 'log':
    case 'platform_log':
    case 'cloud_log':
    case 'device_log':
      return <LogViewer rows={(data as any).rows ?? []} note={(data as any).note ?? ''} />
    case 'device':
      return <DeviceViewer ownerName={(data as any).ownerName ?? ''} sections={(data as any).sections ?? []} />
    case 'sns':
      return <SNSViewer data={data as any} />
    default:
      return null
  }
}
