/**
 * PCEvidenceViewer — Evidence detail overlay for PC layout
 *
 * Reads real evidence data from store (caseData.evidence + evidenceStates).
 * Falls back to description text if viewerData is not available.
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

type TrustLevel = 'high' | 'mid' | 'low'
type LegalStatus = 'ok' | 'sus' | 'unlawful'

const TRUST_COLORS: Record<TrustLevel, { bg: string; text: string }> = {
  high: { bg: 'rgba(92,201,122,0.1)', text: '#5cc97a' },
  mid: { bg: 'rgba(212,162,78,0.1)', text: '#e8c172' },
  low: { bg: 'rgba(224,96,96,0.1)', text: '#e06060' },
}

const SOURCE_COLORS: Record<string, { bg: string; text: string }> = {
  a: { bg: 'rgba(91,141,239,0.1)', text: '#5b8def' },
  b: { bg: 'rgba(224,96,96,0.1)', text: '#e06060' },
  org: { bg: 'rgba(155,123,232,0.1)', text: '#b9a0f0' },
  third: { bg: 'rgba(139,139,154,0.12)', text: '#8b8b9a' },
}

const LEGAL_COLORS: Record<LegalStatus, { bg: string; text: string }> = {
  ok: { bg: 'rgba(92,201,122,0.1)', text: '#5cc97a' },
  sus: { bg: 'rgba(224,96,96,0.1)', text: '#e06060' },
  unlawful: { bg: 'rgba(224,96,96,0.15)', text: '#e06060' },
}

const RELIABILITY_LABELS: Record<string, string> = { hard: '하드 증거', soft: '소프트 증거' }
const PROVENANCE_LABELS: Record<string, string> = {
  self_possessed: '본인 보유', third_party: '제3자', anonymous: '익명', institutional: '기관',
}

function MetaTag({ label, value, colors }: { label: string; value: string; colors: { bg: string; text: string } }) {
  return (
    <span className="pc-ev-meta-tag" style={{ background: colors.bg, color: colors.text }}>
      {label}: {value}
    </span>
  )
}

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
  const meta = evidence.meta
  const trustLevel: TrustLevel = meta?.trustLevel ?? (evidence.reliability === 'hard' ? 'high' : 'mid')
  const trustLabel = meta?.trustLabel ?? RELIABILITY_LABELS[evidence.reliability] ?? '미확인'
  const sourceKey = meta?.source ?? (evidence.provenance === 'institutional' ? 'org' : 'third')
  const sourceLabel = meta?.sourceLabel ?? PROVENANCE_LABELS[evidence.provenance] ?? '불명'
  const legalKey: LegalStatus = meta?.legality ?? 'ok'
  const legalLabel = meta?.legalLabel ?? (evidence.legitimacy === 'lawful' ? '적법' : evidence.legitimacy === 'privacy_concern' ? '의심' : '위법')
  const displayName = state?.deepInvestigated ? evidence.name : (evidence.surfaceName ?? evidence.name)
  const displayDesc = state?.deepInvestigated ? evidence.description : (evidence.surfaceDescription ?? evidence.description)
  const disputes = caseData?.disputes.filter((d) => evidence.proves.includes(d.id)) ?? []

  return (
    <>
      <div className="pc-ev-backdrop" onClick={close} />

      <div className="pc-ev-panel">
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

        {/* Meta tags */}
        <div className="pc-ev-tags">
          <MetaTag label="신뢰도" value={trustLabel} colors={TRUST_COLORS[trustLevel]} />
          <MetaTag label="출처" value={sourceLabel} colors={SOURCE_COLORS[sourceKey] ?? SOURCE_COLORS.third} />
          <MetaTag label="적법성" value={legalLabel} colors={LEGAL_COLORS[legalKey]} />
          {state?.presented ? (
            <MetaTag label="상태" value="제시됨" colors={{ bg: 'rgba(92,201,122,0.1)', text: '#5cc97a' }} />
          ) : null}
        </div>

        {/* Body */}
        <div className="pc-ev-body">
          {/* Description */}
          <p className="pc-ev-desc">{displayDesc}</p>

          {/* Related disputes */}
          {disputes.length > 0 ? (
            <div className="pc-ev-disputes">
              <span className="pc-ev-disputes__label">관련 쟁점</span>
              {disputes.map((d) => (
                <span className="pc-ev-disputes__chip" key={d.id}>{d.name}</span>
              ))}
            </div>
          ) : null}

          {/* Investigation stages */}
          {evidence.investigationStages && evidence.investigationStages.length > 0 ? (
            <div className="pc-ev-stages">
              <span className="pc-ev-stages__label">조사 단계</span>
              {evidence.investigationStages.map((stage, i) => {
                const revealed = evidence.investigationResults[stage.revealKey]
                return (
                  <div className={`pc-ev-stage ${revealed ? 'is-revealed' : 'is-locked'}`} key={i}>
                    <span className="pc-ev-stage__num">{stage.stage}</span>
                    <div className="pc-ev-stage__body">
                      <span className="pc-ev-stage__question">{stage.question.text}</span>
                      {revealed ? (
                        <span className="pc-ev-stage__result">{revealed}</span>
                      ) : (
                        <span className="pc-ev-stage__locked">추가 조사 필요</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : null}

          {/* ViewerData sub-viewer */}
          <EvidenceSubContent type={evidence.type} viewerData={evidence.viewerData} />
        </div>
      </div>
    </>
  )
}

function EvidenceSubContent({ type, viewerData }: { type: string; viewerData?: Record<string, unknown> }) {
  if (!viewerData) return null

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
