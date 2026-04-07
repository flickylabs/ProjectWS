/**
 * PCEvidenceViewer — Evidence detail overlay for PC layout
 *
 * Triggered by pendingEvidenceView in the store.
 * Shows a dark backdrop + centered viewer with type-specific sub-component.
 */
import { useEffect, useCallback } from 'react'
import { useStore } from '../../../store/useGameStore'
import { getEvidenceIconEmoji } from '../../../utils/evidenceIcons'
import { DEMO_EVIDENCE_DATA } from './demoEvidenceData'
import type { EvidenceMeta, TrustLevel, LegalStatus } from './demoEvidenceData'
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

// ── Trust level colors ──
const TRUST_COLORS: Record<TrustLevel, { bg: string; text: string }> = {
  high: { bg: 'rgba(92,201,122,0.1)', text: '#5cc97a' },
  mid: { bg: 'rgba(212,162,78,0.1)', text: '#e8c172' },
  low: { bg: 'rgba(224,96,96,0.1)', text: '#e06060' },
}

// ── Source colors ──
const SOURCE_COLORS: Record<string, { bg: string; text: string }> = {
  a: { bg: 'rgba(224,96,96,0.1)', text: '#e06060' },
  b: { bg: 'rgba(91,141,239,0.1)', text: '#5b8def' },
  org: { bg: 'rgba(155,123,232,0.1)', text: '#b9a0f0' },
  third: { bg: 'rgba(139,139,154,0.12)', text: '#8b8b9a' },
}

// ── Legality colors ──
const LEGAL_COLORS: Record<LegalStatus, { bg: string; text: string }> = {
  ok: { bg: 'rgba(92,201,122,0.1)', text: '#5cc97a' },
  sus: { bg: 'rgba(224,96,96,0.1)', text: '#e06060' },
  unlawful: { bg: 'rgba(224,96,96,0.15)', text: '#e06060' },
}

function MetaTag({ label, value, colors }: { label: string; value: string; colors: { bg: string; text: string } }) {
  return (
    <span
      className="text-xs font-medium px-2.5 py-1 rounded-md whitespace-nowrap"
      style={{ background: colors.bg, color: colors.text }}
    >
      {label}: {value}
    </span>
  )
}

export default function PCEvidenceViewer() {
  const pendingEvidenceView = useStore((s) => s.pendingEvidenceView)
  const setPendingEvidenceView = useStore((s) => s.setPendingEvidenceView)

  const close = useCallback(() => {
    setPendingEvidenceView(null)
  }, [setPendingEvidenceView])

  // Esc key handler
  useEffect(() => {
    if (!pendingEvidenceView) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [pendingEvidenceView, close])

  if (!pendingEvidenceView) return null

  const data = DEMO_EVIDENCE_DATA[pendingEvidenceView]
  if (!data) return null

  const { meta } = data
  const trustColors = TRUST_COLORS[meta.trustLevel] ?? TRUST_COLORS.mid
  const sourceColors = SOURCE_COLORS[meta.source] ?? SOURCE_COLORS.third
  const legalColors = LEGAL_COLORS[meta.legality] ?? LEGAL_COLORS.ok

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-200"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
        onClick={close}
      />

      {/* Viewer panel */}
      <div
        className="fixed z-50 flex flex-col rounded-2xl overflow-hidden"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 672,
          maxHeight: '80vh',
          background: 'var(--pc-p1, #0c0c14)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* ── Header ── */}
        <div
          className="shrink-0 px-6 py-4 flex items-center gap-3 flex-wrap"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          {/* Icon */}
          <span
            className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
            style={{ background: 'var(--pc-p3, #18181f)', color: '#8b8b9a' }}
          >
            {getEvidenceIconEmoji(meta.type)}
          </span>

          {/* Name */}
          <span className="text-lg font-bold flex-1" style={{ color: '#dcdce0' }}>
            {meta.name}
          </span>

          {/* Close button */}
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 transition-colors duration-150"
            style={{
              color: '#4e4e5c',
              background: 'rgba(255,255,255,0.03)',
            }}
            onClick={close}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'
              ;(e.currentTarget as HTMLElement).style.color = '#dcdce0'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
              ;(e.currentTarget as HTMLElement).style.color = '#4e4e5c'
            }}
            title="닫기 (Esc)"
          >
            ✕
          </button>

          {/* Meta tags */}
          <div className="w-full flex gap-2 flex-wrap mt-1">
            <MetaTag label="신뢰도" value={meta.trustLabel} colors={trustColors} />
            <MetaTag label="출처" value={meta.sourceLabel} colors={sourceColors} />
            <MetaTag label="적법성" value={meta.legalLabel} colors={legalColors} />
            <MetaTag
              label="공개단계"
              value={`stage ${meta.stage}`}
              colors={{ bg: 'rgba(139,139,154,0.08)', text: '#8b8b9a' }}
            />
          </div>
        </div>

        {/* ── Body ── */}
        <div
          className="flex-1 min-h-0 overflow-y-auto px-6 py-5"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--pc-p5, #282832) transparent',
          }}
        >
          <EvidenceBody type={meta.type} evidenceId={pendingEvidenceView} />
        </div>
      </div>
    </>
  )
}

// ── Body dispatcher ──
function EvidenceBody({ type, evidenceId }: { type: string; evidenceId: string }) {
  const data = DEMO_EVIDENCE_DATA[evidenceId]
  if (!data) return <div className="text-sm" style={{ color: '#4e4e5c' }}>데이터를 불러올 수 없습니다</div>

  switch (type) {
    case 'bank':
      return data.bank ? <BankViewer rows={data.bank} /> : null
    case 'chat':
      return data.chat ? <ChatViewer header={data.chat.header} messages={data.chat.messages} /> : null
    case 'contract':
      return data.contract ? (
        <ContractViewer
          title={data.contract.title}
          subtitle={data.contract.subtitle}
          rows={data.contract.rows}
          signature={data.contract.signature}
        />
      ) : null
    case 'testimony':
      return data.testimony ? <TestimonyViewer data={data.testimony} /> : null
    case 'cctv':
      return data.cctv ? <CCTVViewer events={data.cctv} /> : null
    case 'log':
      return data.log ? <LogViewer rows={data.log.rows} note={data.log.note} /> : null
    case 'device':
      return data.device ? <DeviceViewer ownerName={data.device.ownerName} sections={data.device.sections} /> : null
    case 'sns':
      return data.sns ? <SNSViewer data={data.sns} /> : null
    default:
      return <div className="text-sm" style={{ color: '#4e4e5c' }}>지원하지 않는 증거 유형입니다</div>
  }
}
