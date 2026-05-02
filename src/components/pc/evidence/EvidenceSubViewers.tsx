/**
 * 8 evidence type-specific sub-viewer components
 * Each renders the body content for PCEvidenceViewer.
 */
import { useEffect, useState, useCallback, type ReactNode } from 'react'
import type {
  BankRow, ChatMessage, ContractRow, TestimonyData,
  CCTVEvent, LogRow, DeviceSection, SNSData,
  ReceiptSheet, GpsLogEntry,
} from './demoEvidenceData'

type DocumentShellVariant = 'contract' | 'ledger' | 'bank' | 'testimony'

function EvidenceDocumentShell({
  title,
  subtitle,
  stamp,
  variant,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  stamp: string
  variant: DocumentShellVariant
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className={`pc-doc-shell pc-doc-shell--${variant}`}>
      <div className="pc-doc-paper">
        <div className="pc-doc-paper__texture" aria-hidden="true" />
        <span className="pc-doc-paper__clip" aria-hidden="true" />
        <span className="pc-doc-paper__serial" aria-hidden="true">COPY</span>
        <span className="pc-doc-stamp" aria-hidden="true">{stamp}</span>
        <header className="pc-doc-paper__header">
          <span className="pc-doc-paper__eyebrow">증거 사본</span>
          <h3>{title || '문서 사본'}</h3>
          {subtitle ? <p>{subtitle}</p> : null}
        </header>
        <div className="pc-doc-paper__content">
          {children}
        </div>
        {footer ? <footer className="pc-doc-paper__footer">{footer}</footer> : null}
      </div>
    </div>
  )
}

function getDocumentStamp(title: string, fallback: string) {
  if (/유서|유언|공증/.test(title)) return '원본대조'
  if (/방문|기록|대장|로그/.test(title)) return '기관확인'
  if (/송금|계좌|금융|영수/.test(title)) return '거래확인'
  return fallback
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 0. ReceiptViewer — 영수증 묶음 (좌우 넘기기)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ReceiptViewer({ sheets }: { sheets: ReceiptSheet[] }) {
  const [current, setCurrent] = useState(0)
  const sheet = sheets[current]
  if (!sheet) return null
  const receiptNo = String(current + 1).padStart(2, '0')

  return (
    <div className="pc-receipt-viewer">
      <div className="pc-receipt-viewer__header">
        <div className="pc-receipt-viewer__header-copy">
          <span>RECEIPT BUNDLE</span>
          <strong>영수증 {current + 1} / {sheets.length}</strong>
        </div>
        <div className="pc-receipt-viewer__dots" aria-label="영수증 페이지 선택">
          {sheets.map((_, i) => (
            <button
              key={i}
              aria-label={`${i + 1}번째 영수증 보기`}
              className={i === current ? 'is-active' : ''}
              onClick={() => setCurrent(i)}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className="pc-receipt-strip" aria-label="영수증 묶음 목록">
        {sheets.map((candidate, i) => (
          <button
            className={`pc-receipt-thumb${i === current ? ' is-active' : ''}${candidate.suspicious ? ' is-suspicious' : ''}`}
            key={`${candidate.storeName}-${candidate.date}-${i}`}
            onClick={() => setCurrent(i)}
            type="button"
          >
            <span>{String(i + 1).padStart(2, '0')}</span>
            <strong>{candidate.storeName}</strong>
            <em>{candidate.date}</em>
            <b>{candidate.total}</b>
          </button>
        ))}
      </div>

      <div className={`pc-receipt-paper${sheet.suspicious ? ' is-suspicious' : ''}`}>
        <span className="pc-receipt-paper__texture" aria-hidden="true" />
        <span className="pc-receipt-paper__perforation is-top" aria-hidden="true" />
        <span className="pc-receipt-paper__perforation is-bottom" aria-hidden="true" />
        {sheet.suspicious ? <span className="pc-receipt-paper__stamp" aria-hidden="true">대조 필요</span> : null}

        <header className="pc-receipt-paper__head">
          <div className="pc-receipt-paper__mark" aria-hidden="true">
            <svg viewBox="0 0 54 54" role="img">
              <rect x="8" y="6" width="38" height="42" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M16 17h22M16 25h22M16 33h13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M12 47l5-4 5 4 5-4 5 4 5-4 5 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          <span>RECEIPT NO. {receiptNo}</span>
          <h3>{sheet.storeName}</h3>
          {sheet.storeAddr ? <p>{sheet.storeAddr}</p> : null}
          <time>{sheet.date}</time>
        </header>

        <div className="pc-receipt-separator" aria-hidden="true" />

        <div className="pc-receipt-header-row">
          <span>상품명</span>
          <span>단가</span>
          <span>수량</span>
          <span>금액</span>
        </div>

        <div className="pc-receipt-item-list">
          {sheet.items.map((item, i) => (
            <div key={`${item.name}-${i}`} className="pc-receipt-item-row">
              <div className="pc-receipt-item-row__name">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{item.name}</strong>
                {item.code ? <em>상품코드 {item.code}</em> : null}
              </div>
              <span className="tabular-nums">{item.unitPrice}</span>
              <span className="tabular-nums">{item.qty}</span>
              <span className="tabular-nums">{item.amount}</span>
            </div>
          ))}
        </div>

        <div className="pc-receipt-separator" aria-hidden="true" />

        <div className="pc-receipt-total-row">
          <span>합계</span><strong className="tabular-nums">{sheet.subtotal}</strong>
        </div>
        <div className="pc-receipt-total-row is-muted">
          <span>부가세</span><strong className="tabular-nums">{sheet.tax}</strong>
        </div>
        <div className="pc-receipt-total-row is-final">
          <span>결제금액</span><strong className="tabular-nums">{sheet.total}</strong>
        </div>

        <div className="pc-receipt-payment">
          <span>{sheet.paymentMethod}</span>
          <div className="pc-receipt-barcode" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>
          <small>원본 영수증 사본 · 조사 단계별 열람 기록</small>
        </div>
      </div>

      <div className="pc-receipt-nav">
        <button
          disabled={current === 0}
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
          type="button"
        >
          ← 이전
        </button>
        <button
          disabled={current === sheets.length - 1}
          onClick={() => setCurrent((p) => Math.min(sheets.length - 1, p + 1))}
          type="button"
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
  const period = rows.length > 0
    ? `${rows[0].date} - ${rows[rows.length - 1].date}`
    : '조회 기간 미상'
  const suspiciousCount = rows.filter((row) => row.suspicious).length

  return (
    <EvidenceDocumentShell
      title="금융거래 내역 조회표"
      subtitle={`${period} / 거래 원장 출력본`}
      stamp="거래확인"
      variant="bank"
      footer={<span>중점 거래 {suspiciousCount}건 표시 · 제출용 사본</span>}
    >
      <div className="pc-doc-bank-summary">
        <span>조회 계좌</span>
        <strong>제출자 보관 계좌</strong>
        <span>표시 기준</span>
        <strong>입출금·잔액 대조</strong>
      </div>
      <div className="pc-doc-table pc-doc-table--bank" role="table" aria-label="금융거래 내역">
        <div className="pc-doc-table__head" role="row">
          <span>거래일</span>
          <span>적요</span>
          <span>거래금액</span>
          <span>잔액</span>
        </div>
        {rows.map((r, i) => {
          const isNeg = r.amount.startsWith('-')
          return (
            <div
              key={`${r.date}-${i}`}
              className={`pc-doc-table__row${r.suspicious ? ' is-focus' : ''}`}
              role="row"
            >
              <span className="tabular-nums">{r.date}</span>
              <span>{r.desc}</span>
              <span className={`tabular-nums pc-doc-amount${isNeg ? ' is-negative' : ' is-positive'}`}>{r.amount}</span>
              <span className="tabular-nums">{r.balance}</span>
            </div>
          )
        })}
      </div>
    </EvidenceDocumentShell>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. ChatViewer — 카카오톡 대화
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ChatViewer({ header, messages, pages: rawPages }: { header: string; messages: ChatMessage[]; pages?: ChatPage[] }) {
  const pages = normalizeChatPages(header, messages, rawPages)
  const [currentPage, setCurrentPage] = useState(Math.max(0, pages.length - 1))
  useEffect(() => {
    setCurrentPage(Math.max(0, pages.length - 1))
  }, [header, pages.length])

  const page = pages[Math.min(currentPage, pages.length - 1)] ?? pages[0]
  const activeHeader = page?.header ?? header
  const activeMessages = page?.messages ?? messages
  const contactLabel = resolveChatContactLabel(activeHeader, activeMessages)
  const isGroupChat = resolveIsGroupChat(activeHeader, activeMessages)
  const isKakaoChat = !isGroupChat && resolveIsKakaoChat(activeHeader)
  return (
    <div className={`pc-phone-chat${isGroupChat ? ' is-group-dm' : ''}${isKakaoChat ? ' is-kakao-talk' : ''}`}>
      <div className="pc-phone-chat__shell">
        <div className="pc-phone-chat__top">
          {isGroupChat ? <span className="pc-phone-chat__group-stack" aria-hidden="true">{buildGroupAvatarStack(activeMessages)}</span> : null}
          <span className="pc-phone-chat__contact">{contactLabel}</span>
        </div>
        {pages.length > 1 ? (
          <div className="pc-phone-chat__pager" aria-label="대화 캡처 페이지">
            {pages.map((p, i) => (
              <button
                key={`${p.label ?? 'page'}-${i}`}
                className={i === currentPage ? 'is-active' : ''}
                type="button"
                onClick={() => setCurrentPage(i)}
              >
                {p.label ?? `${i + 1}쪽`}
              </button>
            ))}
          </div>
        ) : null}
        <div className="pc-phone-chat__messages">
        {activeMessages.map((m, i) => {
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
          const sender = m.sender?.trim() || (isLeft ? '상대방' : '나')
          const group = getMessageGroup(activeMessages, i)
          if (isGroupChat) {
            return (
              <div
                key={i}
                className={`pc-phone-chat__dm-row ${isLeft ? 'is-left' : 'is-right'} is-${group.position}${group.prevSame ? ' is-tight' : ''}`}
              >
                {isLeft ? (
                  <span className={`pc-phone-chat__avatar ${getSenderTone(sender)}${group.nextSame ? ' is-placeholder' : ''}`} aria-hidden="true">
                    {getSenderInitial(sender)}
                  </span>
                ) : null}
                <span className="pc-phone-chat__dm-content">
                  {isLeft && !group.prevSame ? <span className="pc-phone-chat__sender">{sender}</span> : null}
                  <span className="pc-phone-chat__bubble">{m.text}</span>
                </span>
              </div>
            )
          }

          if (isKakaoChat) {
            return (
              <div
                key={i}
                className={`pc-kakao-row ${isLeft ? 'is-left' : 'is-right'} is-${group.position}${group.prevSame ? ' is-tight' : ''}`}
              >
                {isLeft ? (
                  <span className={`pc-kakao-avatar${group.nextSame ? ' is-placeholder' : ''}`} aria-hidden="true" />
                ) : null}
                <span className="pc-kakao-stack">
                  {isLeft && !group.prevSame ? <span className="pc-kakao-name">{sender}</span> : null}
                  <span className="pc-kakao-line">
                    {!isLeft && m.time ? <span className="pc-kakao-time">{m.time}</span> : null}
                    <span className="pc-kakao-bubble">{m.text}</span>
                    {isLeft && m.time ? <span className="pc-kakao-time">{m.time}</span> : null}
                  </span>
                </span>
              </div>
            )
          }

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

type ChatPage = {
  label?: string
  header?: string
  messages?: ChatMessage[]
}

function normalizeChatPages(header: string, messages: ChatMessage[], pages?: ChatPage[]): Array<{ label?: string; header: string; messages: ChatMessage[] }> {
  if (Array.isArray(pages) && pages.length > 0) {
    return pages
      .filter((page) => Array.isArray(page.messages) && page.messages.length > 0)
      .map((page, index) => ({
        label: page.label ?? `${index + 1}쪽`,
        header: page.header ?? header,
        messages: page.messages!,
      }))
  }
  return [{ header, messages }]
}

function getMessageGroup(messages: ChatMessage[], index: number): { position: 'single' | 'first' | 'middle' | 'last'; prevSame: boolean; nextSame: boolean } {
  const prevSame = isSameChatSender(messages[index - 1], messages[index])
  const nextSame = isSameChatSender(messages[index + 1], messages[index])
  if (!prevSame && !nextSame) return { position: 'single', prevSame, nextSame }
  if (!prevSame && nextSame) return { position: 'first', prevSame, nextSame }
  if (prevSame && nextSame) return { position: 'middle', prevSame, nextSame }
  return { position: 'last', prevSame, nextSame }
}

function isSameChatSender(a?: ChatMessage, b?: ChatMessage): boolean {
  if (!a || !b || a.type || b.type) return false
  return (a.side ?? 'left') === (b.side ?? 'left')
    && (a.sender?.trim() ?? '') === (b.sender?.trim() ?? '')
}

function resolveIsKakaoChat(header: string): boolean {
  return /카카오톡|카톡/i.test(header)
}

function resolveIsGroupChat(header: string, messages: ChatMessage[]): boolean {
  if (/단체채팅|단톡|단톡방|오픈채팅|그룹|group/i.test(header)) return true
  const senders = new Set(
    messages
      .map((message) => message.sender?.trim())
      .filter((sender): sender is string => Boolean(sender)),
  )
  return senders.size >= 3
}

function resolveChatContactLabel(header: string, messages: ChatMessage[]): string {
  if (resolveIsGroupChat(header, messages)) {
    const quoted = header.match(/[“"']([^“"']+)[”"']/)?.[1]
    if (quoted) return quoted
    const compact = header
      .replace(/카카오톡|단체채팅|오픈채팅|대화\s*기록|발췌|확대|—.*$/g, '')
      .replace(/[()]/g, '')
      .trim()
    return compact || '단체 대화방'
  }
  const phoneMatch = header.match(/010-\*{4}-\d{4}/)
  if (phoneMatch) return phoneMatch[0]
  const messagePhone = messages
    .map((message) => message.sender?.match(/010-\*{4}-\d{4}/)?.[0])
    .find((value): value is string => Boolean(value))
  if (messagePhone) return messagePhone
  if (resolveIsKakaoChat(header)) {
    const compact = header
      .replace(/\s*—.*$/g, '')
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/\s*(?:1:1\s*)?카톡\s*/g, ' ')
      .trim()
    if (compact) return compact
  }
  if (/발신자\s*미상/.test(header)) return '발신자 미상'
  return '발신자 미상'
}

function getSenderInitial(sender: string): string {
  const normalized = sender.replace(/\([^)]*\)/g, '').trim()
  if (!normalized) return '?'
  const koreanName = normalized.match(/[가-힣]{2,4}/)?.[0]
  if (koreanName) return koreanName.slice(-2)
  return normalized.slice(0, 2).toUpperCase()
}

function getSenderTone(sender: string): string {
  let sum = 0
  for (const char of sender) sum += char.charCodeAt(0)
  return `is-tone-${(sum % 5) + 1}`
}

function buildGroupAvatarStack(messages: ChatMessage[]): ReactNode {
  const senders = Array.from(new Set(
    messages
      .map((message) => message.sender?.trim())
      .filter((sender): sender is string => Boolean(sender)),
  )).slice(0, 3)
  if (senders.length === 0) return null
  return (
    <>
      {senders.map((sender) => (
        <span className={`pc-phone-chat__stack-avatar ${getSenderTone(sender)}`} key={sender}>
          {getSenderInitial(sender)}
        </span>
      ))}
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. ContractViewer — 계약서/가계부
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ContractViewer({ title, subtitle, rows, signature }: {
  title: string; subtitle: string; rows: ContractRow[]; signature?: string
}) {
  return (
    <EvidenceDocumentShell
      title={title}
      subtitle={subtitle}
      stamp={getDocumentStamp(title, '확인')}
      variant="contract"
      footer={signature ? <span>{signature}</span> : null}
    >
      <div className="pc-doc-form">
        {rows.map((r, i) => (
          <div
            key={`${r.date}-${i}`}
            className={`pc-doc-form__row${r.missing ? ' is-focus' : ''}${r.amount ? '' : ' has-no-amount'}`}
          >
            <span className="pc-doc-form__label">{r.date || '항목'}</span>
            <span className="pc-doc-form__content">{r.content}</span>
            {r.amount ? <span className="pc-doc-form__amount tabular-nums">{r.amount}</span> : null}
          </div>
        ))}
      </div>
    </EvidenceDocumentShell>
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

const LOG_TYPE_FALLBACK_LABELS: Record<string, string> = {
  out: '발신',
  in: '수신·방문',
  miss: '부재중·변경',
}

function buildLogFilterOptions(rows: LogRow[]) {
  const types = new Map<string, string>()
  rows.forEach((row) => {
    if (!types.has(row.type)) {
      types.set(row.type, row.typeLabel || LOG_TYPE_FALLBACK_LABELS[row.type] || row.type)
    }
  })
  return [
    { key: 'all', label: '전체' },
    ...Array.from(types, ([key, label]) => ({ key, label })),
  ]
}

export function LogViewer({ rows, note, title }: { rows: LogRow[]; note: string; title?: string }) {
  const [filter, setFilter] = useState<string>('all')
  const filterOptions = buildLogFilterOptions(rows)

  const filtered = filter === 'all' ? rows : rows.filter((r) => r.type === filter)
  const logTitle = title && /통화|전화/.test(title)
    ? '통화 기록 대장'
    : title || '기록 대장'
  const isCallLog = /통화|전화|발신|수신|부재중/.test(`${logTitle} ${rows.map((r) => r.typeLabel).join(' ')}`)

  return (
    <div>
      <div className="pc-doc-toolrow" role="tablist" aria-label="기록 필터">
        {filterOptions.map((f) => (
          <button
            key={f.key}
            className={filter === f.key ? 'is-active' : ''}
            onClick={() => setFilter(f.key)}
            role="tab"
            type="button"
          >
            {f.label}
          </button>
        ))}
      </div>

      <EvidenceDocumentShell
        title={logTitle}
        subtitle={`${rows.length}건 중 ${filtered.length}건 표시 / ${isCallLog ? '통신사' : '기관'} 제출 사본`}
        stamp={isCallLog ? '통신확인' : '기관확인'}
        variant="ledger"
        footer={note ? <span>{note}</span> : null}
      >
        <div className="pc-doc-table pc-doc-table--ledger" role="table" aria-label={isCallLog ? '통화 기록' : '방문 및 처리 기록'}>
          <div className="pc-doc-table__head" role="row">
            <span>일자·시각</span>
            <span>분류</span>
            <span>{isCallLog ? '상대·번호' : '대상·내용'}</span>
            <span>{isCallLog ? '통화시간' : '소요시간'}</span>
          </div>
          {filtered.map((r, i) => {
            const typeStyle = LOG_TYPE_STYLES[r.type] ?? LOG_TYPE_STYLES.out
            return (
              <div
                key={`${r.date}-${i}`}
                className={`pc-doc-table__row${r.suspicious ? ' is-focus' : ''}`}
                role="row"
              >
                <span className="tabular-nums">
                  {r.date}
                </span>
                <span>
                  <span
                    className="pc-doc-table__type"
                    style={{ background: typeStyle.bg, color: typeStyle.color }}
                  >
                    {r.typeLabel}
                  </span>
                </span>
                <span>
                  {r.target}
                </span>
                <span className="tabular-nums">
                  {r.duration}
                </span>
              </div>
            )
          })}
        </div>
      </EvidenceDocumentShell>
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
