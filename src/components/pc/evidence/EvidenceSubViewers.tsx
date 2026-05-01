/**
 * 8 evidence type-specific sub-viewer components
 * Each renders the body content for PCEvidenceViewer.
 */
import { useState, useCallback } from 'react'
import type {
  BankRow, ChatMessage, ContractRow, TestimonyData,
  CCTVEvent, LogRow, DeviceSection, SNSData,
  ReceiptSheet, GpsLogEntry,
} from './demoEvidenceData'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 0. ReceiptViewer — 영수증 묶음 (좌우 넘기기)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ReceiptViewer({ sheets }: { sheets: ReceiptSheet[] }) {
  const [current, setCurrent] = useState(0)
  const sheet = sheets[current]
  if (!sheet) return null

  return (
    <div className="pc-receipt-viewer">
      {/* Header: page indicator */}
      <div className="pc-receipt-viewer__header flex items-center justify-between mb-3">
        <span className="text-xs font-semibold" style={{ color: '#8b8b9a' }}>
          영수증 {current + 1} / {sheets.length}
        </span>
        <div className="flex gap-1">
          {sheets.map((_, i) => (
            <button
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-150"
              style={{
                background: i === current ? 'var(--pc-gold, #d4a24e)' : 'rgba(255,255,255,0.1)',
                cursor: 'pointer',
                border: 'none',
              }}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      {/* Receipt paper */}
      <div
        className="pc-receipt-paper rounded-xl px-5 mb-3"
        style={{
          background: sheet.suspicious ? 'rgba(224,96,96,0.04)' : 'rgba(255,255,255,0.02)',
          border: sheet.suspicious ? '1px solid rgba(224,96,96,0.15)' : '1px solid rgba(255,255,255,0.06)',
          paddingTop: 20,
          paddingBottom: 20,
          maxWidth: 420,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* Store name */}
        <div className="text-center text-sm font-bold tracking-wider mb-0.5" style={{ color: '#dcdce0' }}>
          {sheet.storeName}
        </div>
        {sheet.storeAddr ? (
          <div className="text-center text-xs mb-2" style={{ color: '#4e4e5c' }}>{sheet.storeAddr}</div>
        ) : null}
        <div className="text-center text-xs mb-3" style={{ color: '#4e4e5c' }}>{sheet.date}</div>

        {/* Separator */}
        <div className="mb-2" style={{ borderTop: '1px dashed rgba(255,255,255,0.1)' }} />

        {/* Items header */}
        <div className="pc-receipt-header-row flex text-xs font-semibold mb-2 px-1" style={{ color: '#4e4e5c', paddingTop: 6, paddingBottom: 6 }}>
          <span className="flex-1">상품명</span>
          <span className="w-14 text-right">단가</span>
          <span className="w-8 text-center">수량</span>
          <span className="w-16 text-right">금액</span>
        </div>

        {/* Items */}
        {sheet.items.map((item, i) => (
          <div key={i} className="pc-receipt-item-row flex text-sm px-1" style={{ color: '#8b8b9a', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingTop: 12, paddingBottom: 12 }}>
            <div className="flex-1 min-w-0">
              <div className="truncate">{item.name}</div>
              {item.code ? <div className="text-xs" style={{ color: '#3a3a48' }}>{item.code}</div> : null}
            </div>
            <span className="w-14 text-right tabular-nums shrink-0">{item.unitPrice}</span>
            <span className="w-8 text-center tabular-nums shrink-0">{item.qty}</span>
            <span className="w-16 text-right tabular-nums shrink-0 font-medium" style={{ color: '#dcdce0' }}>{item.amount}</span>
          </div>
        ))}

        {/* Separator */}
        <div className="my-2" style={{ borderTop: '1px dashed rgba(255,255,255,0.1)' }} />

        {/* Totals */}
        <div className="pc-receipt-total-row flex justify-between text-sm px-1" style={{ color: '#8b8b9a', paddingTop: 8, paddingBottom: 8 }}>
          <span>합계</span><span className="tabular-nums">{sheet.subtotal}</span>
        </div>
        <div className="pc-receipt-total-row flex justify-between text-sm px-1" style={{ color: '#4e4e5c', paddingTop: 8, paddingBottom: 8 }}>
          <span>부가세</span><span className="tabular-nums">{sheet.tax}</span>
        </div>
        <div className="pc-receipt-total-row is-final flex justify-between text-sm font-bold px-1" style={{ color: '#dcdce0', paddingTop: 10, paddingBottom: 10 }}>
          <span>결제금액</span><span className="tabular-nums">{sheet.total}</span>
        </div>

        {/* Separator */}
        <div className="mb-2" style={{ borderTop: '1px dashed rgba(255,255,255,0.1)' }} />

        {/* Payment method */}
        <div className="text-xs text-center" style={{ color: '#4e4e5c' }}>
          {sheet.paymentMethod}
        </div>
      </div>

      {/* Prev/Next */}
      <div className="pc-receipt-nav flex justify-center gap-4">
        <button
          className="text-sm px-4 py-2 rounded-lg transition-colors duration-150"
          style={{
            background: 'var(--pc-p3, #18181f)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: current > 0 ? '#8b8b9a' : '#3a3a48',
            cursor: current > 0 ? 'pointer' : 'default',
          }}
          disabled={current === 0}
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
        >
          ← 이전
        </button>
        <button
          className="text-sm px-4 py-2 rounded-lg transition-colors duration-150"
          style={{
            background: 'var(--pc-p3, #18181f)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: current < sheets.length - 1 ? '#8b8b9a' : '#3a3a48',
            cursor: current < sheets.length - 1 ? 'pointer' : 'default',
          }}
          disabled={current === sheets.length - 1}
          onClick={() => setCurrent((p) => Math.min(sheets.length - 1, p + 1))}
        >
          다음 →
        </button>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 0b. GpsLogViewer — GPS/블랙박스 로그
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function GpsLogViewer({ entries }: { entries: GpsLogEntry[] }) {
  const [filter, setFilter] = useState<'all' | 'suspicious'>('all')
  const filtered = filter === 'all' ? entries : entries.filter((e) => e.suspicious)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold px-2 py-1 rounded" style={{ background: 'rgba(92,201,122,0.1)', color: '#5cc97a' }}>GPS</span>
        <span className="text-xs" style={{ color: '#4e4e5c' }}>블랙박스 GPS 로그 — {entries.length}건</span>
        <div className="ml-auto flex gap-1.5">
          {(['all', 'suspicious'] as const).map((f) => (
            <button
              key={f}
              className="text-xs px-2.5 py-1 rounded-lg font-medium transition-colors duration-150"
              style={{
                background: filter === f ? 'rgba(212,162,78,0.1)' : 'transparent',
                border: filter === f ? '1px solid rgba(212,162,78,0.18)' : '1px solid rgba(255,255,255,0.05)',
                color: filter === f ? 'var(--pc-gold-light, #e8c172)' : '#4e4e5c',
              }}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '전체' : '주목'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['시각', '위치', '위도/경도', '속도'].map((h) => (
              <th
                key={h}
                className="text-left text-xs font-semibold px-2"
                style={{ color: '#4e4e5c', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, paddingBottom: 12 }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((e, i) => (
            <tr
              key={i}
              style={{
                background: e.suspicious ? 'rgba(212,162,78,0.06)' : 'transparent',
              }}
            >
              <td className="px-2 tabular-nums whitespace-nowrap" style={{ color: e.suspicious ? 'var(--pc-gold-light, #e8c172)' : '#8b8b9a', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: 12, paddingTop: 14, paddingBottom: 14 }}>
                {e.timestamp}
              </td>
              <td className="px-2" style={{ color: e.suspicious ? '#dcdce0' : '#8b8b9a', borderBottom: '1px solid rgba(255,255,255,0.03)', fontWeight: e.suspicious ? 600 : 400, paddingTop: 14, paddingBottom: 14 }}>
                {e.location}
              </td>
              <td className="px-2 tabular-nums" style={{ color: '#4e4e5c', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: 12, paddingTop: 14, paddingBottom: 14 }}>
                {e.lat}, {e.lng}
              </td>
              <td className="px-2 tabular-nums" style={{ color: '#8b8b9a', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingTop: 14, paddingBottom: 14 }}>
                {e.speed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. BankViewer — 계좌 이체 내역
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function BankViewer({ rows }: { rows: BankRow[] }) {
  return (
    <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {['날짜', '내용', '금액', '잔액'].map((h) => (
            <th
              key={h}
              className="text-left text-xs font-semibold py-2 px-3"
              style={{ color: '#4e4e5c', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => {
          const isNeg = r.amount.startsWith('-')
          return (
            <tr
              key={i}
              className="transition-colors duration-150"
              style={{
                background: r.suspicious ? 'rgba(224,96,96,0.06)' : 'transparent',
                cursor: r.suspicious ? 'pointer' : 'default',
              }}
              onMouseEnter={(e) => {
                if (r.suspicious) (e.currentTarget as HTMLElement).style.background = 'rgba(224,96,96,0.12)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = r.suspicious ? 'rgba(224,96,96,0.06)' : 'transparent'
              }}
            >
              <td className="py-2 px-3 tabular-nums" style={{ color: r.suspicious ? '#dcdce0' : '#8b8b9a', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                {r.date}
              </td>
              <td className="py-2 px-3 relative" style={{ color: r.suspicious ? '#dcdce0' : '#8b8b9a', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                {r.desc}
              </td>
              <td
                className="py-2 px-3 font-semibold tabular-nums"
                style={{
                  color: isNeg ? '#e06060' : '#5cc97a',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                }}
              >
                {r.amount}
              </td>
              <td className="py-2 px-3 tabular-nums" style={{ color: '#8b8b9a', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                {r.balance}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. ChatViewer — 카카오톡 대화
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ChatViewer({ header, messages }: { header: string; messages: ChatMessage[] }) {
  const contactLabel = resolveChatContactLabel(header, messages)
  return (
    <div className="pc-phone-chat">
      <div className="pc-phone-chat__shell">
        <div className="pc-phone-chat__top">
          <span className="pc-phone-chat__contact">{contactLabel}</span>
        </div>
        <div className="pc-phone-chat__messages">
        {messages.map((m, i) => {
          if (m.type === 'deleted') {
            return (
              <div
                key={i}
                className="pc-phone-chat__system"
              >
                {'... [' + m.text + '] ...'}
              </div>
            )
          }

          if (m.type === 'read' || m.type === 'note') {
            return (
              <div
                key={i}
                className="pc-phone-chat__system"
              >
                {m.text}
              </div>
            )
          }

          const isLeft = m.side === 'left'
          return (
            <div
              key={i}
              className={`pc-phone-chat__bubble ${isLeft ? 'is-left' : 'is-right'}`}
            >
              {m.text}
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}

function resolveChatContactLabel(header: string, messages: ChatMessage[]): string {
  const phoneMatch = header.match(/010-\*{4}-\d{4}/)
  if (phoneMatch) return phoneMatch[0]
  const messagePhone = messages
    .map((message) => message.sender?.match(/010-\*{4}-\d{4}/)?.[0])
    .find((value): value is string => Boolean(value))
  if (messagePhone) return messagePhone
  if (/발신자\s*미상/.test(header)) return '발신자 미상'
  return '발신자 미상'
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. ContractViewer — 계약서/가계부
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ContractViewer({ title, subtitle, rows, signature }: {
  title: string; subtitle: string; rows: ContractRow[]; signature: string
}) {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: 'rgba(212,162,78,0.03)',
        border: '1px solid rgba(212,162,78,0.1)',
      }}
    >
      <div className="text-center text-lg font-bold tracking-widest mb-1" style={{ color: '#dcdce0' }}>
        {title}
      </div>
      <div className="text-center text-sm mb-5" style={{ color: '#4e4e5c' }}>
        {subtitle}
      </div>

      {rows.map((r, i) => (
        <div
          key={i}
          className="flex items-center py-2.5 px-3"
          style={{
            borderBottom: r.missing ? 'none' : '1px solid rgba(255,255,255,0.04)',
            background: r.missing ? 'rgba(212,162,78,0.08)' : 'transparent',
            borderRadius: r.missing ? 6 : 0,
            margin: r.missing ? '4px 0' : 0,
          }}
        >
          <span className="tabular-nums text-sm" style={{ color: '#4e4e5c', minWidth: 60 }}>
            {r.date}
          </span>
          <span
            className="flex-1 mx-4 text-sm"
            style={{
              color: r.missing ? 'var(--pc-gold-light, #e8c172)' : '#8b8b9a',
              fontWeight: r.missing ? 600 : 400,
            }}
          >
            {r.content}
          </span>
          <span className="tabular-nums text-sm text-right" style={{ color: '#8b8b9a', minWidth: 80 }}>
            {r.amount}
          </span>
        </div>
      ))}

      <div
        className="text-center text-sm mt-6 pt-4"
        style={{
          color: '#4e4e5c',
          borderTop: '1px dashed rgba(255,255,255,0.08)',
          fontStyle: 'italic',
        }}
      >
        {signature}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. TestimonyViewer — 증인 증언
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CONFIDENCE_COLORS: Record<string, string> = { high: '#5cc97a', mid: '#e8c172', low: '#e06060' }
const BIAS_COLORS: Record<string, string> = { a: '#e06060', neutral: '#5b8def', b: '#5b8def' }
const BIAS_LABELS: Record<string, string> = { a: 'A편', neutral: '중립', b: 'B편' }

export function TestimonyViewer({ data }: { data: TestimonyData }) {
  return (
    <div>
      {/* Witness info */}
      <div
        className="text-sm px-4 py-3 rounded-lg mb-4"
        style={{ background: 'rgba(255,255,255,0.02)', color: '#8b8b9a' }}
      >
        <strong style={{ color: '#dcdce0', fontWeight: 600 }}>증인: {data.witnessName}</strong>
        {' '}({data.witnessDesc})
      </div>

      {/* Quote */}
      <div
        className="text-base leading-relaxed px-5 py-5 mb-5 rounded-lg"
        style={{
          background: 'rgba(212,162,78,0.04)',
          border: '1px solid rgba(212,162,78,0.1)',
          color: '#dcdce0',
        }}
      >
        <span className="text-2xl align-middle mr-1" style={{ color: 'var(--pc-gold, #d4a24e)', lineHeight: 0 }}>{'\u201C'}</span>
        {data.quote}
        <span className="text-2xl align-middle ml-1" style={{ color: 'var(--pc-gold, #d4a24e)', lineHeight: 0 }}>{'\u201D'}</span>
      </div>

      {/* Assessment tags */}
      <div className="flex gap-3 flex-wrap mb-5">
        <AssessmentTag label="확신도" value={data.confidenceLabel} color={CONFIDENCE_COLORS[data.confidence] ?? '#8b8b9a'} />
        <AssessmentTag label="편향도" value={BIAS_LABELS[data.bias] ?? data.biasLabel} color={BIAS_COLORS[data.bias] ?? '#8b8b9a'} />
        <AssessmentTag label="직접 목격" value={data.directWitness ? '예' : '아니오'} color={data.directWitness ? '#5cc97a' : '#4e4e5c'} />
      </div>

      {/* Related ref */}
      <button
        className="flex items-center gap-2 text-sm px-3.5 py-2.5 rounded-lg transition-colors duration-150"
        style={{
          color: '#8b8b9a',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(212,162,78,0.06)'
          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,162,78,0.18)'
          ;(e.currentTarget as HTMLElement).style.color = 'var(--pc-gold-light, #e8c172)'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'
          ;(e.currentTarget as HTMLElement).style.color = '#8b8b9a'
        }}
      >
        <span style={{ fontSize: 14 }}>📌</span>
        관련 발언: {data.relatedRef}
      </button>
    </div>
  )
}

function AssessmentTag({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="flex flex-col items-center gap-1 px-4 py-2.5 rounded-lg"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', minWidth: 80 }}
    >
      <span className="text-xs font-medium" style={{ color: '#4e4e5c' }}>{label}</span>
      <span className="text-sm font-bold" style={{ color }}>{value}</span>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. CCTVViewer — CCTV 캡처
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CCTVViewer({ events }: { events: CCTVEvent[] }) {
  const [current, setCurrent] = useState(0)
  const ev = events[current]

  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = ((e.clientX - rect.left) / rect.width) * 100
    let closest = 0
    let minDist = Infinity
    events.forEach((evt, i) => {
      const d = Math.abs(evt.pct - pct)
      if (d < minDist) { minDist = d; closest = i }
    })
    setCurrent(closest)
  }, [events])

  return (
    <div>
      {/* Frame */}
      <div
        className="relative flex flex-col items-center justify-center py-10 px-6 rounded-xl mb-4"
        style={{
          background: 'var(--pc-p3, #18181f)',
          border: '1px solid rgba(255,255,255,0.04)',
          minHeight: 160,
        }}
      >
        {/* Scanlines effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)',
          }}
        />
        {/* REC indicator */}
        <div className="absolute top-3 left-4 flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#e06060' }}>
          <span className="w-2 h-2 rounded-full" style={{ background: '#e06060' }} />
          REC
        </div>
        {/* Timestamp */}
        <div className="absolute top-3 right-4 text-xs font-semibold tabular-nums" style={{ color: '#4e4e5c' }}>
          {ev.time}
        </div>
        {/* Icon */}
        <div className="text-4xl mb-2" style={{ color: '#4e4e5c' }}>
          {ev.suspicious ? '🔍' : '👤'}
        </div>
        {/* Description */}
        <div
          className="text-base text-center leading-relaxed"
          style={{
            color: ev.suspicious ? 'var(--pc-gold-light, #e8c172)' : '#dcdce0',
            fontWeight: ev.suspicious ? 600 : 400,
          }}
        >
          {ev.desc}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mx-2 mb-4">
        <div
          className="relative w-full h-1.5 rounded-full cursor-pointer"
          style={{ background: 'var(--pc-p4, #1f1f28)' }}
          onClick={handleTrackClick}
        >
          {/* Fill */}
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-200"
            style={{ width: `${ev.pct}%`, background: 'var(--pc-gold-dark, #8b6914)' }}
          />
          {/* Markers */}
          {events.map((evt, i) => (
            <button
              key={i}
              className="absolute top-1/2 w-3 h-3 rounded-full transition-all duration-150"
              style={{
                left: `${evt.pct}%`,
                transform: 'translate(-50%, -50%)',
                background: i === current ? 'var(--pc-gold, #d4a24e)' : 'var(--pc-p5, #282832)',
                border: '2px solid ' + (i === current ? 'var(--pc-gold, #d4a24e)' : 'rgba(255,255,255,0.1)'),
                boxShadow: i === current ? '0 0 10px rgba(212,162,78,0.5)' : 'none',
                cursor: 'pointer',
                zIndex: 2,
              }}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
            />
          ))}
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-2.5">
          {events.map((evt, i) => (
            <button
              key={i}
              className="text-xs font-medium cursor-pointer transition-colors duration-150"
              style={{
                color: i === current ? 'var(--pc-gold-light, #e8c172)' : '#4e4e5c',
                fontWeight: i === current ? 700 : 500,
                background: 'none',
                border: 'none',
                padding: 0,
              }}
              onClick={() => setCurrent(i)}
            >
              {evt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prev/Next buttons */}
      <div className="flex justify-center gap-4">
        <button
          className="text-sm px-4 py-2 rounded-lg transition-colors duration-150"
          style={{
            background: 'var(--pc-p3, #18181f)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: current > 0 ? '#8b8b9a' : '#3a3a48',
            cursor: current > 0 ? 'pointer' : 'default',
          }}
          disabled={current === 0}
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
        >
          ← 이전 프레임
        </button>
        <button
          className="text-sm px-4 py-2 rounded-lg transition-colors duration-150"
          style={{
            background: 'var(--pc-p3, #18181f)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: current < events.length - 1 ? '#8b8b9a' : '#3a3a48',
            cursor: current < events.length - 1 ? 'pointer' : 'default',
          }}
          disabled={current === events.length - 1}
          onClick={() => setCurrent((p) => Math.min(events.length - 1, p + 1))}
        >
          다음 프레임 →
        </button>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. LogViewer — 시스템 기록 (통화 등)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LOG_TYPE_STYLES: Record<string, { bg: string; color: string }> = {
  out: { bg: 'rgba(91,141,239,0.1)', color: '#5b8def' },
  in: { bg: 'rgba(92,201,122,0.1)', color: '#5cc97a' },
  miss: { bg: 'rgba(224,96,96,0.1)', color: '#e06060' },
}

const FILTER_OPTIONS = [
  { key: 'all', label: '전체' },
  { key: 'out', label: '발신' },
  { key: 'in', label: '수신' },
  { key: 'miss', label: '부재중' },
] as const

export function LogViewer({ rows, note }: { rows: LogRow[]; note: string }) {
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all' ? rows : rows.filter((r) => r.type === filter)

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-1.5 flex-wrap mb-4">
        {FILTER_OPTIONS.map((f) => (
          <button
            key={f.key}
            className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors duration-150"
            style={{
              background: filter === f.key ? 'rgba(212,162,78,0.1)' : 'transparent',
              border: filter === f.key
                ? '1px solid rgba(212,162,78,0.18)'
                : '1px solid rgba(255,255,255,0.05)',
              color: filter === f.key ? 'var(--pc-gold-light, #e8c172)' : '#4e4e5c',
            }}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['시각', '유형', '상대', '통화시간'].map((h) => (
              <th
                key={h}
                className="text-left text-xs font-semibold px-3"
                style={{ color: '#4e4e5c', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, paddingBottom: 12 }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((r, i) => {
            const typeStyle = LOG_TYPE_STYLES[r.type] ?? LOG_TYPE_STYLES.out
            return (
              <tr
                key={i}
                style={{ background: r.suspicious ? 'rgba(212,162,78,0.06)' : 'transparent' }}
              >
                <td className="px-3 tabular-nums" style={{ color: r.suspicious ? 'var(--pc-gold-light, #e8c172)' : '#8b8b9a', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingTop: 14, paddingBottom: 14 }}>
                  {r.date}
                </td>
                <td className="px-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', paddingTop: 14, paddingBottom: 14 }}>
                  <span
                    className="text-xs font-semibold rounded-full whitespace-nowrap"
                    style={{ background: typeStyle.bg, color: typeStyle.color, paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3 }}
                  >
                    {r.typeLabel}
                  </span>
                </td>
                <td className="px-3" style={{ color: r.suspicious ? 'var(--pc-gold-light, #e8c172)' : '#8b8b9a', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingTop: 14, paddingBottom: 14 }}>
                  {r.target}
                </td>
                <td className="px-3 tabular-nums" style={{ color: r.suspicious ? 'var(--pc-gold-light, #e8c172)' : '#8b8b9a', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingTop: 14, paddingBottom: 14, fontWeight: r.suspicious ? 600 : 400 }}>
                  {r.duration}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Note */}
      <div
        className="mt-4 px-4 py-3 rounded-lg text-sm leading-relaxed"
        style={{
          background: 'rgba(212,162,78,0.06)',
          border: '1px solid rgba(212,162,78,0.18)',
          color: 'var(--pc-gold-light, #e8c172)',
        }}
      >
        {note}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. DeviceViewer — 디바이스
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function DeviceViewer({ ownerName, sections }: { ownerName: string; sections: DeviceSection[] }) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = useCallback((id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  return (
    <div
      className="rounded-2xl overflow-hidden mx-auto"
      style={{
        background: 'var(--pc-p2, #111119)',
        border: '2px solid rgba(255,255,255,0.06)',
        maxWidth: 340,
      }}
    >
      {/* Notch */}
      <div
        className="mx-auto mt-2 rounded-full"
        style={{ width: 80, height: 6, background: 'rgba(255,255,255,0.06)' }}
      />

      {/* Top bar */}
      <div
        className="flex items-center justify-center gap-2 text-sm font-semibold py-3"
        style={{ color: '#8b8b9a', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <span>📱</span>
        {ownerName}의 휴대폰
      </div>

      {/* Sections */}
      <div className="py-2 px-3" style={{ maxHeight: 380, overflowY: 'auto' }}>
        {sections.map((s) => {
          const isCollapsed = !!collapsed[s.id]
          return (
            <div key={s.id} className="mb-1">
              {/* Section header */}
              <button
                className="w-full flex items-center gap-2 text-sm font-semibold py-2.5 px-3 rounded-lg transition-colors duration-150"
                style={{ color: '#8b8b9a', background: 'transparent' }}
                onClick={() => toggle(s.id)}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#a0a0b0' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8b8b9a' }}
              >
                <span
                  className="text-[10px] transition-transform duration-200 inline-block"
                  style={{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
                >
                  ▼
                </span>
                {s.title}
              </button>

              {/* Section body */}
              <div
                className="overflow-hidden transition-all duration-250"
                style={{
                  maxHeight: isCollapsed ? 0 : 300,
                  opacity: isCollapsed ? 0 : 1,
                }}
              >
                {s.items.map((item, i) => (
                  <div
                    key={i}
                    className="text-sm py-2 px-3 ml-2"
                    style={{
                      borderLeft: item.suspicious
                        ? '3px solid var(--pc-gold, #d4a24e)'
                        : '3px solid transparent',
                      background: item.suspicious ? 'rgba(212,162,78,0.04)' : 'transparent',
                      color: item.suspicious ? 'var(--pc-gold-light, #e8c172)' : '#8b8b9a',
                      fontWeight: item.suspicious ? 500 : 400,
                    }}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Home button */}
      <div className="flex justify-center py-3">
        <div
          className="rounded-full"
          style={{ width: 36, height: 36, border: '2px solid rgba(255,255,255,0.06)' }}
        />
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. SNSViewer — SNS 게시글
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function SNSViewer({ data }: { data: SNSData }) {
  // Highlight hashtags in text
  const renderText = (text: string) => {
    const parts = text.split(/(#\S+)/g)
    return parts.map((part, i) =>
      part.startsWith('#')
        ? <span key={i} style={{ color: '#5b8def', fontWeight: 500 }}>{part}</span>
        : <span key={i}>{part}</span>,
    )
  }

  return (
    <div>
      {/* Post card */}
      <div
        className="rounded-xl p-5 mb-4"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
      >
        {/* Profile */}
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'var(--pc-p4, #1f1f28)', color: '#8b8b9a' }}
          >
            👤
          </div>
          <div>
            <span className="text-sm font-bold" style={{ color: '#dcdce0' }}>{data.username}</span>
            <span className="text-sm ml-1" style={{ color: '#4e4e5c' }}>{data.handle}</span>
          </div>
          <span className="text-xs ml-auto" style={{ color: '#4e4e5c' }}>{data.date}</span>
        </div>

        {/* Privacy scope */}
        <div className="text-xs mb-3 pl-11" style={{ color: '#4e4e5c' }}>
          🔒 공개범위: {data.privacy}
        </div>

        {/* Text */}
        <div className="text-base leading-relaxed mb-3" style={{ color: '#dcdce0' }}>
          {renderText(data.text)}
        </div>

        {/* Engagement */}
        <div className="flex gap-6 text-sm pt-2" style={{ color: '#4e4e5c' }}>
          <span className="flex items-center gap-1.5">♡ {data.likes}</span>
          <span className="flex items-center gap-1.5">💬 {data.comments.length}</span>
          <span className="flex items-center gap-1.5">↗ 0</span>
        </div>
      </div>

      {/* Comments */}
      <div className="mb-4">
        <div className="text-sm font-bold mb-2.5 flex items-center gap-1.5" style={{ color: '#a0a0b0' }}>
          💬 댓글
        </div>
        {data.comments.map((c, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 text-sm py-2.5 px-1"
            style={{
              borderBottom: i < data.comments.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
              color: '#8b8b9a',
            }}
          >
            <span className="font-bold whitespace-nowrap" style={{ color: '#dcdce0', minWidth: 48 }}>
              {c.name}
            </span>
            <span>{c.text}</span>
          </div>
        ))}
      </div>

      {/* Warnings */}
      <div className="flex flex-col gap-2">
        {data.warnings.map((w, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 text-sm px-4 py-3 rounded-lg"
            style={{
              background: 'rgba(224,96,96,0.04)',
              border: '1px solid rgba(224,96,96,0.12)',
              color: '#e06060',
            }}
          >
            <span className="shrink-0 mt-0.5">{i === 0 ? '🛡' : '🔍'}</span>
            {w}
          </div>
        ))}
      </div>
    </div>
  )
}
