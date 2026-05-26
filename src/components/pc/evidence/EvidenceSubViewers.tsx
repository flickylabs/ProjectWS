/**
 * 8 evidence type-specific sub-viewer components
 * Each renders the body content for PCEvidenceViewer.
 */
import { useEffect, useState, useCallback, type ReactNode } from 'react'
import { useI18n, type LocaleCode } from '../../../i18n'
import type {
  BankRow, ChatMessage, ContractRow, TestimonyData,
  CCTVEvent, LogRow, DeviceSection, SNSData,
  ReceiptSheet, GpsLogEntry, LogPage,
  BookData,
} from './demoEvidenceData'

type DocumentShellVariant = 'contract' | 'ledger' | 'bank' | 'testimony' | 'book'

const VIEWER_COPY = {
  ko: {
    evidenceCopy: '증거 사본',
    documentCopy: '문서 사본',
    originalCheck: '원본대조',
    institutionCheck: '기관확인',
    transactionCheck: '거래확인',
    receiptItem: '영수증 {current} / {total}',
    receiptPageSelect: '영수증 페이지 선택',
    receiptView: '{index}번째 영수증 보기',
    receiptList: '영수증 묶음 목록',
    needsCompare: '대조 필요',
    productName: '상품명',
    unitPrice: '단가',
    quantity: '수량',
    amount: '금액',
    productCode: '상품코드',
    subtotal: '합계',
    tax: '부가세',
    paymentAmount: '결제금액',
    receiptFooter: '원본 영수증 사본 · 조사 단계별 열람 기록',
    previous: '← 이전',
    next: '다음 →',
    gpsLogCount: '블랙박스 GPS 로그 — {count}건',
    all: '전체',
    flagged: '주목',
    time: '시각',
    location: '위치',
    coordinates: '위도/경도',
    speed: '속도',
    unknownPeriod: '조회 기간 미상',
    bankTitle: '금융거래 내역 조회표',
    bankSubtitle: '{period} / 거래 원장 출력본',
    bankStamp: '거래확인',
    bankFooter: '중점 거래 {count}건 표시 · 제출용 사본',
    accountLookup: '조회 계좌',
    submittedAccount: '제출자 보관 계좌',
    displayBasis: '표시 기준',
    debitCreditBalance: '입출금·잔액 대조',
    bankTable: '금융거래 내역',
    transactionDate: '거래일',
    description: '적요',
    transactionAmount: '거래금액',
    balance: '잔액',
    chatPages: '대화 캡처 페이지',
    page: '{index}쪽',
    counterparty: '상대방',
    me: '나',
    chatInputStatus: '채팅 입력 상태',
    groupChatRoom: '단체 대화방',
    unknownSender: '발신자 미상',
    confirm: '확인',
    item: '항목',
    testimonyStamp: '공증',
    testimonyTitle: '전 요양보호사 음성증언',
    testimonySubtitle: '속기사 녹취 요약 / 음성 원본 대조',
    testimonyInfo: '증언 정보',
    witness: '증언자',
    relation: '관계',
    confidence: '확실도',
    bias: '편향도',
    biasA: 'A편',
    biasNeutral: '중립',
    biasB: 'B편',
    transcriptContent: '속기사 녹취 내용',
    directWitness: '직접 목격 진술',
    hearsayIncluded: '전언 포함',
    relatedRef: '관련 참조',
    previousFrame: '← 이전 프레임',
    nextFrame: '다음 프레임 →',
    logOut: '발신',
    logIn: '수신·방문',
    logMiss: '부재중·변경',
    logFilter_first: '1차 접수',
    logFilter_amend: '수정 접수',
    logFilter_status: '상태 메모',
    callLogTitle: '통화 기록 대장',
    recordLogTitle: '기록 대장',
    recordPages: '기록 페이지',
    recordFilter: '기록 필터',
    logSubtitle: '{total}건 중 {shown}건 표시 / {source} 제출 사본',
    carrier: '통신사',
    institution: '기관',
    callStamp: '통신확인',
    institutionStamp: '기관확인',
    callLogAria: '통화 기록',
    visitLogAria: '방문 및 처리 기록',
    dateTime: '일자·시각',
    category: '분류',
    counterNumber: '상대 번호',
    targetContent: '대상·내용',
    callDurationMessage: '통화시간',
    duration: '소요시간',
    diaryFallback: '어머니의 공책',
    handwrittenCopy: '자필 사본',
    phoneOf: '{owner}의 휴대폰',
    privacy: '공개범위',
    comments: '댓글',
    // 2026-05-26: e-10 「예비 부모 정서 도서」 BookSubView i18n key
    purchaseStore: '구매 매장',
    purchaseDate: '구매일',
    bookToc: '목차',
    bookChapter: '챕터',
    bookBookmark: '책갈피·강조',
    bookDogearedPages: '접힌 페이지',
    bookHandwritingOwnerA: '필체 = 본인 (A)',
    bookHandwritingOwnerB: '필체 = 본인 (B)',
    bookNoteUnderline: '밑줄',
    bookNoteMargin: '여백 메모',
  },
  en: {
    evidenceCopy: 'Evidence Copy',
    documentCopy: 'Document Copy',
    originalCheck: 'Original Check',
    institutionCheck: 'Institution Check',
    transactionCheck: 'Transaction Check',
    receiptItem: 'Receipt {current} / {total}',
    receiptPageSelect: 'Select receipt page',
    receiptView: 'View receipt {index}',
    receiptList: 'Receipt bundle list',
    needsCompare: 'Needs Review',
    productName: 'Item',
    unitPrice: 'Unit',
    quantity: 'Qty',
    amount: 'Amount',
    productCode: 'SKU',
    subtotal: 'Subtotal',
    tax: 'Tax',
    paymentAmount: 'Paid',
    receiptFooter: 'Original receipt copy · staged investigation view log',
    previous: '← Previous',
    next: 'Next →',
    gpsLogCount: 'Dashcam GPS Log — {count} entries',
    all: 'All',
    flagged: 'Flagged',
    time: 'Time',
    location: 'Location',
    coordinates: 'Latitude/Longitude',
    speed: 'Speed',
    unknownPeriod: 'Unknown inquiry period',
    bankTitle: 'Financial Transaction Statement',
    bankSubtitle: '{period} / Ledger printout',
    bankStamp: 'Transaction Check',
    bankFooter: '{count} key transactions marked · submitted copy',
    accountLookup: 'Account',
    submittedAccount: 'Submitted holder account',
    displayBasis: 'Display Basis',
    debitCreditBalance: 'Debit/Credit/Balance Check',
    bankTable: 'Financial transactions',
    transactionDate: 'Date',
    description: 'Description',
    transactionAmount: 'Amount',
    balance: 'Balance',
    chatPages: 'Chat capture pages',
    page: 'Page {index}',
    counterparty: 'Counterparty',
    me: 'Me',
    chatInputStatus: 'Chat input status',
    groupChatRoom: 'Group Chat',
    unknownSender: 'Unknown Sender',
    confirm: 'Verified',
    item: 'Item',
    testimonyStamp: 'Notarized',
    testimonyTitle: 'Former Caregiver Audio Testimony',
    testimonySubtitle: 'Transcript summary / audio original check',
    testimonyInfo: 'Testimony info',
    witness: 'Witness',
    relation: 'Relation',
    confidence: 'Confidence',
    bias: 'Bias',
    biasA: 'A-leaning',
    biasNeutral: 'Neutral',
    biasB: 'B-leaning',
    transcriptContent: 'Transcript',
    directWitness: 'Direct witness statement',
    hearsayIncluded: 'Includes hearsay',
    relatedRef: 'Related reference',
    previousFrame: '← Previous Frame',
    nextFrame: 'Next Frame →',
    logOut: 'Outgoing',
    logIn: 'Incoming/Visit',
    logMiss: 'Missed/Changed',
    logFilter_first: 'Morning Intake',
    logFilter_amend: 'Afternoon Amendment',
    logFilter_status: 'Status Notes',
    callLogTitle: 'Call Log Register',
    recordLogTitle: 'Record Register',
    recordPages: 'Record pages',
    recordFilter: 'Record filter',
    logSubtitle: '{shown} of {total} entries shown / {source} submitted copy',
    carrier: 'Carrier',
    institution: 'Institution',
    callStamp: 'Carrier Check',
    institutionStamp: 'Institution Check',
    callLogAria: 'Call log',
    visitLogAria: 'Visit and handling log',
    dateTime: 'Date/Time',
    category: 'Type',
    counterNumber: 'Counterparty/Number',
    targetContent: 'Target/Content',
    callDurationMessage: 'Call Time/Message',
    duration: 'Duration',
    diaryFallback: "Mother's Notebook",
    handwrittenCopy: 'Handwritten Copy',
    phoneOf: "{owner}'s Phone",
    privacy: 'Privacy',
    comments: 'Comments',
    purchaseStore: 'Purchase Store',
    purchaseDate: 'Purchase Date',
    bookToc: 'Table of Contents',
    bookChapter: 'Chapter',
    bookBookmark: 'Bookmarked/Highlighted',
    bookDogearedPages: 'Dog-eared Pages',
    bookHandwritingOwnerA: 'Handwriting · A',
    bookHandwritingOwnerB: 'Handwriting · B',
    bookNoteUnderline: 'Underline',
    bookNoteMargin: 'Margin Note',
  },
  ja: {
    evidenceCopy: '証拠写し',
    documentCopy: '文書写し',
    originalCheck: '原本照合',
    institutionCheck: '機関確認',
    transactionCheck: '取引確認',
    receiptItem: 'レシート {current} / {total}',
    receiptPageSelect: 'レシートページ選択',
    receiptView: '{index}枚目のレシートを見る',
    receiptList: 'レシート束一覧',
    needsCompare: '照合必要',
    productName: '品名',
    unitPrice: '単価',
    quantity: '数量',
    amount: '金額',
    productCode: '商品コード',
    subtotal: '小計',
    tax: '消費税',
    paymentAmount: '支払額',
    receiptFooter: '原本レシート写し · 調査段階別閲覧記録',
    previous: '← 前へ',
    next: '次へ →',
    gpsLogCount: 'ドライブレコーダーGPSログ — {count}件',
    all: '全体',
    flagged: '注目',
    time: '時刻',
    location: '位置',
    coordinates: '緯度/経度',
    speed: '速度',
    unknownPeriod: '照会期間不明',
    bankTitle: '金融取引明細照会表',
    bankSubtitle: '{period} / 取引台帳出力本',
    bankStamp: '取引確認',
    bankFooter: '重点取引 {count}件表示 · 提出用写し',
    accountLookup: '照会口座',
    submittedAccount: '提出者保管口座',
    displayBasis: '表示基準',
    debitCreditBalance: '入出金·残高照合',
    bankTable: '金融取引明細',
    transactionDate: '取引日',
    description: '摘要',
    transactionAmount: '取引金額',
    balance: '残高',
    chatPages: '会話キャプチャページ',
    page: '{index}ページ',
    counterparty: '相手',
    me: '自分',
    chatInputStatus: 'チャット入力状態',
    groupChatRoom: 'グループチャット',
    unknownSender: '送信者不明',
    confirm: '確認',
    item: '項目',
    testimonyStamp: '公証',
    testimonyTitle: '元介護職員の音声証言',
    testimonySubtitle: '速記録要約 / 音声原本照合',
    testimonyInfo: '証言情報',
    witness: '証言者',
    relation: '関係',
    confidence: '確度',
    bias: '偏向度',
    biasA: 'A寄り',
    biasNeutral: '中立',
    biasB: 'B寄り',
    transcriptContent: '速記録内容',
    directWitness: '直接目撃証言',
    hearsayIncluded: '伝聞を含む',
    relatedRef: '関連参照',
    previousFrame: '← 前のフレーム',
    nextFrame: '次のフレーム →',
    logOut: '発信',
    logIn: '受信·訪問',
    logMiss: '不在·変更',
    logFilter_first: '一次受付',
    logFilter_amend: '修正受付',
    logFilter_status: '状態メモ',
    callLogTitle: '通話記録台帳',
    recordLogTitle: '記録台帳',
    recordPages: '記録ページ',
    recordFilter: '記録フィルター',
    logSubtitle: '{total}件中{shown}件表示 / {source}提出写し',
    carrier: '通信会社',
    institution: '機関',
    callStamp: '通信確認',
    institutionStamp: '機関確認',
    callLogAria: '通話記録',
    visitLogAria: '訪問および処理記録',
    dateTime: '日付·時刻',
    category: '分類',
    counterNumber: '相手·番号',
    targetContent: '対象·内容',
    callDurationMessage: '通話時間·メッセージ',
    duration: '所要時間',
    diaryFallback: '母のノート',
    handwrittenCopy: '自筆写し',
    phoneOf: '{owner}の携帯電話',
    privacy: '公開範囲',
    comments: 'コメント',
    purchaseStore: '購入店',
    purchaseDate: '購入日',
    bookToc: '目次',
    bookChapter: '章',
    bookBookmark: '栞・強調',
    bookDogearedPages: '折り目のページ',
    bookHandwritingOwnerA: '筆跡 · A',
    bookHandwritingOwnerB: '筆跡 · B',
    bookNoteUnderline: '下線',
    bookNoteMargin: '余白メモ',
  },
  'zh-CN': {
    evidenceCopy: '证据副本',
    documentCopy: '文件副本',
    originalCheck: '原件核对',
    institutionCheck: '机构核验',
    transactionCheck: '交易核验',
    receiptItem: '收据 {current} / {total}',
    receiptPageSelect: '选择收据页',
    receiptView: '查看第 {index} 张收据',
    receiptList: '收据组列表',
    needsCompare: '需要核对',
    productName: '商品名',
    unitPrice: '单价',
    quantity: '数量',
    amount: '金额',
    productCode: '商品代码',
    subtotal: '合计',
    tax: '增值税',
    paymentAmount: '支付金额',
    receiptFooter: '原始收据副本 · 按调查阶段开放的阅览记录',
    previous: '← 上一页',
    next: '下一页 →',
    gpsLogCount: '行车记录仪 GPS 日志 — {count}条',
    all: '全部',
    flagged: '重点',
    time: '时间',
    location: '位置',
    coordinates: '纬度/经度',
    speed: '速度',
    unknownPeriod: '查询期间不明',
    bankTitle: '金融交易明细查询表',
    bankSubtitle: '{period} / 交易台账打印件',
    bankStamp: '交易核验',
    bankFooter: '标记重点交易 {count}条 · 提交用副本',
    accountLookup: '查询账户',
    submittedAccount: '提交人保管账户',
    displayBasis: '显示依据',
    debitCreditBalance: '收支·余额核对',
    bankTable: '金融交易明细',
    transactionDate: '交易日',
    description: '摘要',
    transactionAmount: '交易金额',
    balance: '余额',
    chatPages: '聊天截图页',
    page: '第 {index} 页',
    counterparty: '对方',
    me: '我',
    chatInputStatus: '聊天输入状态',
    groupChatRoom: '群聊',
    unknownSender: '未知发件人',
    confirm: '确认',
    item: '项目',
    testimonyStamp: '公证',
    testimonyTitle: '前护理员音频证言',
    testimonySubtitle: '速记摘要 / 音频原件核对',
    testimonyInfo: '证言信息',
    witness: '证言人',
    relation: '关系',
    confidence: '可信度',
    bias: '偏向度',
    biasA: '偏A',
    biasNeutral: '中立',
    biasB: '偏B',
    transcriptContent: '速记内容',
    directWitness: '直接目击陈述',
    hearsayIncluded: '含转述',
    relatedRef: '相关参照',
    previousFrame: '← 上一帧',
    nextFrame: '下一帧 →',
    logOut: '呼出',
    logIn: '呼入·访问',
    logMiss: '未接·变更',
    logFilter_first: '初次受理',
    logFilter_amend: '修订受理',
    logFilter_status: '状态备注',
    callLogTitle: '通话记录台账',
    recordLogTitle: '记录台账',
    recordPages: '记录页面',
    recordFilter: '记录筛选',
    logSubtitle: '共{total}条，显示{shown}条 / {source}提交副本',
    carrier: '通信商',
    institution: '机构',
    callStamp: '通信核验',
    institutionStamp: '机构核验',
    callLogAria: '通话记录',
    visitLogAria: '访问及处理记录',
    dateTime: '日期·时间',
    category: '分类',
    counterNumber: '对方·号码',
    targetContent: '对象·内容',
    callDurationMessage: '通话时间·消息',
    duration: '耗时',
    diaryFallback: '母亲的笔记本',
    handwrittenCopy: '手写副本',
    phoneOf: '{owner}的手机',
    privacy: '公开范围',
    comments: '评论',
    purchaseStore: '购买店',
    purchaseDate: '购买日期',
    bookToc: '目录',
    bookChapter: '章',
    bookBookmark: '书签·重点',
    bookDogearedPages: '折角页面',
    bookHandwritingOwnerA: '笔迹 · A',
    bookHandwritingOwnerB: '笔迹 · B',
    bookNoteUnderline: '下划线',
    bookNoteMargin: '页边批注',
  },
} satisfies Record<LocaleCode, Record<string, string>>

function useViewerCopy() {
  const { locale } = useI18n()
  return VIEWER_COPY[locale] ?? VIEWER_COPY.ko
}

function formatCopy(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''))
}

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
  const copy = useViewerCopy()
  const isBook = variant === 'book'
  return (
    <div className={`pc-doc-shell pc-doc-shell--${variant}`}>
      <div className="pc-doc-paper">
        <div className="pc-doc-paper__texture" aria-hidden="true" />
        {!isBook ? <span className="pc-doc-paper__clip" aria-hidden="true" /> : null}
        {!isBook ? <span className="pc-doc-paper__serial" aria-hidden="true">COPY</span> : null}
        {!isBook ? <span className="pc-doc-stamp" aria-hidden="true">{stamp}</span> : null}
        <header className="pc-doc-paper__header">
          {!isBook ? <span className="pc-doc-paper__eyebrow">{copy.evidenceCopy}</span> : null}
          <h3>{title || copy.documentCopy}</h3>
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

function getDocumentStamp(title: string, fallback: string, copy: typeof VIEWER_COPY[LocaleCode]) {
  if (/유서|유언|공증|will|notary|公証|遺言|公证|遗嘱/i.test(title)) return copy.originalCheck
  if (/방문|기록|대장|로그|visit|record|log|訪問|記録|台帳|日志|记录|访问/i.test(title)) return copy.institutionCheck
  if (/송금|계좌|금융|영수|transfer|account|bank|receipt|送金|口座|金融|領収|汇款|账户|金融|收据/i.test(title)) return copy.transactionCheck
  return fallback
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 0. ReceiptViewer — 영수증 묶음 (좌우 넘기기)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ReceiptViewer({ sheets }: { sheets: ReceiptSheet[] }) {
  const copy = useViewerCopy()
  const [current, setCurrent] = useState(0)
  const sheet = sheets[current]
  if (!sheet) return null
  const receiptNo = String(current + 1).padStart(2, '0')

  return (
    <div className="pc-receipt-viewer">
      <div className="pc-receipt-viewer__header">
        <div className="pc-receipt-viewer__header-copy">
          <span>RECEIPT BUNDLE</span>
          <strong>{formatCopy(copy.receiptItem, { current: current + 1, total: sheets.length })}</strong>
        </div>
        {sheets.length > 1 ? (
          <div className="pc-receipt-viewer__dots" aria-label={copy.receiptPageSelect}>
            {sheets.map((_, i) => (
              <button
                key={i}
                aria-label={formatCopy(copy.receiptView, { index: i + 1 })}
                className={i === current ? 'is-active' : ''}
                onClick={() => setCurrent(i)}
                type="button"
              />
            ))}
          </div>
        ) : null}
      </div>

      {sheets.length > 1 ? (
        <div className="pc-receipt-strip" aria-label={copy.receiptList}>
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
      ) : null}

      <div className={`pc-receipt-paper${sheet.suspicious ? ' is-suspicious' : ''}`}>
        <span className="pc-receipt-paper__texture" aria-hidden="true" />
        <span className="pc-receipt-paper__perforation is-top" aria-hidden="true" />
        <span className="pc-receipt-paper__perforation is-bottom" aria-hidden="true" />
        {sheet.suspicious ? <span className="pc-receipt-paper__stamp" aria-hidden="true">{copy.needsCompare}</span> : null}
        {sheet.investigationNote ? (
          <div className="pc-receipt-postit" role="note">
            {sheet.investigationNote.label ? <strong className="pc-receipt-postit__label">{sheet.investigationNote.label}</strong> : null}
            <p>{sheet.investigationNote.text}</p>
          </div>
        ) : null}

        <header className="pc-receipt-paper__head">
          <div className="pc-receipt-paper__mark" aria-hidden="true">
            <svg viewBox="0 0 54 54" role="img">
              <rect x="8" y="6" width="38" height="42" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M16 17h22M16 25h22M16 33h13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M12 47l5-4 5 4 5-4 5 4 5-4 5 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          <span>RECEIPT NO. {receiptNo}</span>
          <h3 className="pc-receipt-paper__store-name">
            <span className="pc-receipt-paper__store-name-text">{sheet.storeName}</span>
            {sheet.smudge && (sheet.smudge.targets?.includes('storeName') ?? true) ? (
              <span className={`pc-receipt-paper__smudge pc-receipt-paper__smudge--${sheet.smudge.level}`} aria-hidden="true" />
            ) : null}
          </h3>
          {sheet.storeAddr ? (
            <p className="pc-receipt-paper__store-addr">
              <span className="pc-receipt-paper__store-addr-text">{sheet.storeAddr}</span>
              {sheet.smudge && sheet.smudge.targets?.includes('storeAddr') ? (
                <span className={`pc-receipt-paper__smudge pc-receipt-paper__smudge--${sheet.smudge.level}`} aria-hidden="true" />
              ) : null}
            </p>
          ) : null}
          <time>{sheet.date}</time>
        </header>

        <div className="pc-receipt-separator" aria-hidden="true" />

        <div className="pc-receipt-header-row">
          <span>{copy.productName}</span>
          <span>{copy.unitPrice}</span>
          <span>{copy.quantity}</span>
          <span>{copy.amount}</span>
        </div>

        <div className="pc-receipt-item-list">
          {sheet.items.map((item, i) => (
            <div key={`${item.name}-${i}`} className="pc-receipt-item-row">
              <div className="pc-receipt-item-row__name">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{item.name}</strong>
                {item.code ? <em>{copy.productCode} {item.code}</em> : null}
              </div>
              <span className="tabular-nums">{item.unitPrice}</span>
              <span className="tabular-nums">{item.qty}</span>
              <span className="tabular-nums">{item.amount}</span>
            </div>
          ))}
        </div>

        <div className="pc-receipt-separator" aria-hidden="true" />

        <div className="pc-receipt-total-row">
          <span>{copy.subtotal}</span><strong className="tabular-nums">{sheet.subtotal}</strong>
        </div>
        <div className="pc-receipt-total-row is-muted">
          <span>{copy.tax}</span><strong className="tabular-nums">{sheet.tax}</strong>
        </div>
        <div className="pc-receipt-total-row is-final">
          <span>{copy.paymentAmount}</span><strong className="tabular-nums">{sheet.total}</strong>
        </div>

        <div className="pc-receipt-payment">
          <span>{sheet.paymentMethod}</span>
          <div className="pc-receipt-barcode" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>
          <small>{copy.receiptFooter}</small>
        </div>
      </div>

      {sheets.length > 1 ? (
        <div className="pc-receipt-nav">
          <button
            disabled={current === 0}
            onClick={() => setCurrent((p) => Math.max(0, p - 1))}
            type="button"
          >
            {copy.previous}
          </button>
          <button
            disabled={current === sheets.length - 1}
            onClick={() => setCurrent((p) => Math.min(sheets.length - 1, p + 1))}
            type="button"
          >
            {copy.next}
          </button>
        </div>
      ) : null}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 0b. GpsLogViewer — GPS/블랙박스 로그
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function GpsLogViewer({ entries }: { entries: GpsLogEntry[] }) {
  const copy = useViewerCopy()
  const [filter, setFilter] = useState<'all' | 'suspicious'>('all')
  const filtered = filter === 'all' ? entries : entries.filter((e) => e.suspicious)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold px-2 py-1 rounded" style={{ background: 'rgba(92,201,122,0.1)', color: '#5cc97a' }}>GPS</span>
        <span className="text-xs" style={{ color: '#4e4e5c' }}>{formatCopy(copy.gpsLogCount, { count: entries.length })}</span>
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
              {f === 'all' ? copy.all : copy.flagged}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {[copy.time, copy.location, copy.coordinates, copy.speed].map((h) => (
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
  const copy = useViewerCopy()
  const period = rows.length > 0
    ? `${rows[0].date} - ${rows[rows.length - 1].date}`
    : copy.unknownPeriod
  const suspiciousCount = rows.filter((row) => row.suspicious).length

  return (
    <EvidenceDocumentShell
      title={copy.bankTitle}
      subtitle={formatCopy(copy.bankSubtitle, { period })}
      stamp={copy.bankStamp}
      variant="bank"
      footer={<span>{formatCopy(copy.bankFooter, { count: suspiciousCount })}</span>}
    >
      <div className="pc-doc-bank-summary">
        <span>{copy.accountLookup}</span>
        <strong>{copy.submittedAccount}</strong>
        <span>{copy.displayBasis}</span>
        <strong>{copy.debitCreditBalance}</strong>
      </div>
      <div className="pc-doc-table pc-doc-table--bank" role="table" aria-label={copy.bankTable}>
        <div className="pc-doc-table__head" role="row">
          <span>{copy.transactionDate}</span>
          <span>{copy.description}</span>
          <span>{copy.transactionAmount}</span>
          <span>{copy.balance}</span>
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

export function ChatViewer({
  header,
  messages,
  pages: rawPages,
  inputStatus,
}: {
  header: string
  messages: ChatMessage[]
  pages?: ChatPage[]
  inputStatus?: string
}) {
  const copy = useViewerCopy()
  const pages = normalizeChatPages(header, messages, rawPages, copy)
  const [currentPage, setCurrentPage] = useState(Math.max(0, pages.length - 1))
  useEffect(() => {
    setCurrentPage(Math.max(0, pages.length - 1))
  }, [header, pages.length])

  const page = pages[Math.min(currentPage, pages.length - 1)] ?? pages[0]
  const activeHeader = page?.header ?? header
  const activeMessages = page?.messages ?? messages
  const contactLabel = resolveChatContactLabel(activeHeader, activeMessages, copy)
  const isGroupChat = resolveIsGroupChat(activeHeader, activeMessages)
  const isKakaoChat = !isGroupChat && resolveIsKakaoChat(activeHeader)
  const isTelegramChat = resolveIsTelegramChat(activeHeader)
  return (
    <div className={`pc-phone-chat${isGroupChat ? ' is-group-dm' : ''}${isKakaoChat ? ' is-kakao-talk' : ''}${isTelegramChat ? ' is-telegram' : ''}`}>
      <div className="pc-phone-chat__shell">
        <div className="pc-phone-chat__top">
          {isGroupChat ? <span className="pc-phone-chat__group-stack" aria-hidden="true">{buildGroupAvatarStack(activeMessages)}</span> : null}
          <span className="pc-phone-chat__contact">{contactLabel}</span>
        </div>
        {pages.length > 1 ? (
          <div className="pc-phone-chat__pager" aria-label={copy.chatPages}>
            <button
              className="pc-phone-chat__pager-arrow"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              type="button"
              aria-label={copy.previous}
            >
              ◀
            </button>
            {pages.map((p, i) => (
              <button
                key={`${p.label ?? 'page'}-${i}`}
                className={i === currentPage ? 'is-active' : ''}
                type="button"
                onClick={() => setCurrentPage(i)}
              >
                {p.label ?? formatCopy(copy.page, { index: i + 1 })}
              </button>
            ))}
            <button
              className="pc-phone-chat__pager-arrow"
              disabled={currentPage === pages.length - 1}
              onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
              type="button"
              aria-label={copy.next}
            >
              ▶
            </button>
          </div>
        ) : null}
        <div className="pc-phone-chat__messages">
        {page?.label ? (
          <div className="pc-phone-chat__system pc-phone-chat__date-marker">
            {page.label}
          </div>
        ) : null}
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
          const sender = m.sender?.trim() || (isLeft ? copy.counterparty : copy.me)
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
        {inputStatus ? (
          <div className="pc-phone-chat__input-status" aria-label={copy.chatInputStatus}>
            {inputStatus}
          </div>
        ) : null}
      </div>
    </div>
  )
}

type ChatPage = {
  label?: string
  header?: string
  messages?: ChatMessage[]
}

function normalizeChatPages(header: string, messages: ChatMessage[], pages: ChatPage[] | undefined, copy: Record<string, string>): Array<{ label?: string; header: string; messages: ChatMessage[] }> {
  if (Array.isArray(pages) && pages.length > 0) {
    return pages
      .filter((page) => Array.isArray(page.messages) && page.messages.length > 0)
      .map((page, index) => ({
        label: page.label ?? formatCopy(copy.page, { index: index + 1 }),
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

function resolveIsTelegramChat(header: string): boolean {
  return /텔레그램|telegram/i.test(header)
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

function resolveChatContactLabel(header: string, messages: ChatMessage[], copy: Record<string, string>): string {
  if (resolveIsGroupChat(header, messages)) {
    const quoted = header.match(/[“"']([^“"']+)[”"']/)?.[1]
    if (quoted) return quoted
    const compact = header
      .replace(/카카오톡|단체채팅|오픈채팅|대화\s*기록|발췌|확대|—.*$/g, '')
      .replace(/[()]/g, '')
      .trim()
    return compact || copy.groupChatRoom
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
  if (/발신자\s*미상/.test(header)) return copy.unknownSender
  return copy.unknownSender
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

export function ContractViewer({ title, subtitle, rows, signature, book }: {
  title: string; subtitle: string; rows: ContractRow[]; signature?: string; book?: BookData
}) {
  const copy = useViewerCopy()
  // 2026-05-26: e-10 「예비 부모 정서 도서」 evidence — subtype 'book' 영역 분기.
  //   기존 ContractViewer rows form 영역 대신 BookSubView 렌더 (cover / toc / dogeared).
  if (book) {
    return <BookSubView data={book} />
  }
  return (
    <EvidenceDocumentShell
      title={title}
      subtitle={subtitle}
      stamp={getDocumentStamp(title, copy.confirm, copy)}
      variant="contract"
      footer={signature ? <span>{signature}</span> : null}
    >
      <div className="pc-doc-form">
        {rows.map((r, i) => (
          <div
            key={`${r.date}-${i}`}
            className={`pc-doc-form__row${r.missing ? ' is-focus' : ''}${r.amount ? '' : ' has-no-amount'}`}
          >
            <span className="pc-doc-form__label">{r.date || copy.item}</span>
            <span className="pc-doc-form__content">{r.content}</span>
            {r.amount ? <span className="pc-doc-form__amount tabular-nums">{r.amount}</span> : null}
          </div>
        ))}
      </div>
    </EvidenceDocumentShell>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3-B. BookSubView — 책 evidence (e-10 「예비 부모 정서 도서」)
//   ContractViewer 영역의 book subtype 분기. view 영역 = 'cover' / 'toc' / 'dogeared'.
//   stage별 점진 노출: 1=표지 / 2=목차 강조 / 3=접힌 페이지 + 본인 필체 메모.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function renderExcerptWithUnderline(excerpt: string, pageKey: string | number): ReactNode {
  // Parses __phrase__ markers as inline underlines.
  const parts = excerpt.split(/(__[^_]+__)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('__') && part.endsWith('__')) {
      const text = part.slice(2, -2)
      return (
        <span key={`u-${pageKey}-${idx}`} className="pc-doc-book__underline">{text}</span>
      )
    }
    return <span key={`t-${pageKey}-${idx}`}>{part}</span>
  })
}

function BookSubView({ data }: { data: BookData }) {
  const copy = useViewerCopy()
  const view = data.view ?? 'cover'
  const cover = data.cover
  const docTitle = cover.title || copy.documentCopy
  const docSubtitle = cover.subtitle
  return (
    <EvidenceDocumentShell
      title={docTitle}
      subtitle={docSubtitle}
      stamp={copy.originalCheck}
      variant="book"
      footer={
        <span>
          {cover.author}{cover.publisher ? ` · ${cover.publisher}` : ''}
          {cover.isbn ? ` · ISBN ${cover.isbn}` : ''}
        </span>
      }
    >
      <div className={`pc-doc-book pc-doc-book--view-${view}`}>
        <div className="pc-doc-book__meta">
          {cover.purchaseStore ? (
            <div className="pc-doc-book__meta-row">
              <span className="pc-doc-book__meta-label">{copy.purchaseStore}</span>
              <span className="pc-doc-book__meta-value">{cover.purchaseStore}</span>
            </div>
          ) : null}
          {cover.purchaseDate ? (
            <div className="pc-doc-book__meta-row">
              <span className="pc-doc-book__meta-label">{copy.purchaseDate}</span>
              <span className="pc-doc-book__meta-value">{cover.purchaseDate}</span>
            </div>
          ) : null}
        </div>

        {view !== 'cover' && data.toc && data.toc.length > 0 ? (
          <section className="pc-doc-book__toc">
            <h4 className="pc-doc-book__section-title">{copy.bookToc}</h4>
            <ul className="pc-doc-book__toc-list">
              {data.toc.map((entry) => (
                <li
                  key={`toc-${entry.chapter}`}
                  className={`pc-doc-book__toc-item${entry.highlighted ? ' is-highlighted' : ''}`}
                >
                  <span className="pc-doc-book__toc-chapter">{copy.bookChapter} {entry.chapter}</span>
                  <span className="pc-doc-book__toc-title">{entry.title}</span>
                  {entry.highlighted ? (
                    <span className="pc-doc-book__toc-bookmark" aria-label={copy.bookBookmark}>★</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {view === 'dogeared' && data.dogearedPages && data.dogearedPages.length > 0 ? (
          <section className="pc-doc-book__dogeared">
            <h4 className="pc-doc-book__section-title">
              {copy.bookDogearedPages}
              {data.handwritingOwner === 'b' ? (
                <span className="pc-doc-book__handwriting-tag">{copy.bookHandwritingOwnerB}</span>
              ) : data.handwritingOwner === 'a' ? (
                <span className="pc-doc-book__handwriting-tag">{copy.bookHandwritingOwnerA}</span>
              ) : null}
            </h4>
            <div className="pc-doc-book__pages">
              {data.dogearedPages.map((page) => (
                <article key={`page-${page.page}`} className="pc-doc-book__page">
                  <header className="pc-doc-book__page-header">
                    <span className="pc-doc-book__page-num">p. {page.page}</span>
                    <span className="pc-doc-book__page-chapter">{copy.bookChapter} {page.chapter}</span>
                  </header>
                  {page.excerpt ? (
                    <p className="pc-doc-book__page-excerpt">
                      {renderExcerptWithUnderline(page.excerpt, page.page)}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </EvidenceDocumentShell>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. TestimonyViewer — 증인 증언
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const _BIAS_LABELS: Record<string, string> = { a: 'A편', neutral: '중립', b: 'B편' }

function splitTestimonyTranscript(value: string) {
  const normalized = String(value ?? '').replace(/\s+/g, ' ').trim()
  if (!normalized) return []
  const matches = normalized.match(/[^.!?。？！]+[.!?。？！]?/g)
  return (matches ?? [normalized])
    .map((part) => part.trim())
    .filter(Boolean)
}

export function TestimonyViewer({ data }: { data: TestimonyData }) {
  const copy = useViewerCopy()
  const transcriptLines = splitTestimonyTranscript(data.quote)
  const biasLabels: Record<string, string> = { a: copy.biasA, neutral: copy.biasNeutral, b: copy.biasB }

  return (
    <div className="pc-testimony-transcript-viewer">
      <article className="pc-testimony-paper">
        <div className="pc-testimony-paper__texture" aria-hidden="true" />
        <span className="pc-testimony-paper__clip" aria-hidden="true" />
        <span className="pc-testimony-paper__serial" aria-hidden="true">COPY</span>
        <span className="pc-testimony-paper__stamp" aria-hidden="true">{copy.testimonyStamp}</span>

        <header className="pc-testimony-paper__header">
          <span>{copy.evidenceCopy}</span>
          <h3>{copy.testimonyTitle}</h3>
          <p>{copy.testimonySubtitle}</p>
        </header>

        <section className="pc-testimony-paper__meta" aria-label={copy.testimonyInfo}>
          <div><span>{copy.witness}</span><strong>{data.witnessName}</strong></div>
          <div><span>{copy.relation}</span><strong>{data.witnessDesc}</strong></div>
          <div><span>{copy.confidence}</span><strong>{data.confidenceLabel}</strong></div>
          <div><span>{copy.bias}</span><strong>{biasLabels[data.bias] ?? data.biasLabel}</strong></div>
        </section>

        <section className="pc-testimony-paper__body">
          <div className="pc-testimony-paper__body-head">
            <span>{copy.transcriptContent}</span>
            <small>{data.directWitness ? copy.directWitness : copy.hearsayIncluded}</small>
          </div>
          <div className="pc-testimony-paper__lines">
            {(transcriptLines.length > 0 ? transcriptLines : [data.quote]).map((line, index) => (
              <p key={`${line}-${index}`}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <span>{line}</span>
              </p>
            ))}
          </div>
        </section>

        <footer className="pc-testimony-paper__footer">
          <span>{copy.relatedRef}</span>
          <strong>{data.relatedRef}</strong>
        </footer>
      </article>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. CCTVViewer — CCTV 캡처
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CCTVViewer({ events }: { events: CCTVEvent[] }) {
  const copy = useViewerCopy()
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
          {copy.previousFrame}
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
          {copy.nextFrame}
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

const _LOG_TYPE_FALLBACK_LABELS: Record<string, string> = {
  out: '발신',
  in: '수신·방문',
  miss: '부재중·변경',
}

function buildLogFilterOptions(rows: LogRow[], copy: Record<string, string>) {
  // 2026-05-21 (14th): rows에 filterGroup이 하나라도 있으면 그 기준으로 묶음 (e-5 공증인 메모 등).
  // 없으면 기존 type(out/in/miss) 기준 폴백.
  const hasFilterGroup = rows.some((r) => Boolean(r.filterGroup))
  if (hasFilterGroup) {
    const groups = new Map<string, string>()
    rows.forEach((r) => {
      if (r.filterGroup && !groups.has(r.filterGroup)) {
        const key = `logFilter_${r.filterGroup}`
        groups.set(r.filterGroup, copy[key] ?? r.filterGroup)
      }
    })
    return [
      { key: 'all', label: copy.all },
      ...Array.from(groups, ([key, label]) => ({ key, label })),
    ]
  }
  const fallbackLabels: Record<string, string> = { out: copy.logOut, in: copy.logIn, miss: copy.logMiss }
  const types = new Map<string, string>()
  rows.forEach((row) => {
    if (!types.has(row.type)) {
      types.set(row.type, row.typeLabel || fallbackLabels[row.type] || row.type)
    }
  })
  return [
    { key: 'all', label: copy.all },
    ...Array.from(types, ([key, label]) => ({ key, label })),
  ]
}

export function LogViewer({ rows, note, title, pages: rawPages }: { rows: LogRow[]; note: string; title?: string; pages?: LogPage[] }) {
  const copy = useViewerCopy()
  const pages = normalizeLogPages(title, rows, note, rawPages, copy)
  const [currentPage, setCurrentPage] = useState(Math.max(0, pages.length - 1))
  const [filter, setFilter] = useState<string>('all')
  useEffect(() => {
    setCurrentPage(Math.max(0, pages.length - 1))
    setFilter('all')
  }, [pages.length, title])

  const page = pages[Math.min(currentPage, pages.length - 1)] ?? pages[0]
  const activeRows = page?.rows ?? rows
  const activeNote = page?.note ?? note
  const activeTitle = page?.title ?? title
  const filterOptions = buildLogFilterOptions(activeRows, copy)

  const filterByGroup = activeRows.some((r) => Boolean(r.filterGroup))
  const filtered = filter === 'all'
    ? activeRows
    : (filterByGroup
        ? activeRows.filter((r) => r.filterGroup === filter)
        : activeRows.filter((r) => r.type === filter))
  const logTitle = activeTitle && /통화|전화/.test(activeTitle)
    ? copy.callLogTitle
    : activeTitle || copy.recordLogTitle
  const isCallLog = /통화|전화|발신|수신|부재중/.test(`${logTitle} ${activeRows.map((r) => r.typeLabel).join(' ')}`)

  return (
    <div>
      {pages.length > 1 ? (
        <div className="pc-doc-toolrow pc-doc-toolrow--pages" role="tablist" aria-label={copy.recordPages}>
          {pages.map((p, i) => (
            <button
              key={`${p.label ?? 'page'}-${i}`}
              className={i === currentPage ? 'is-active' : ''}
              onClick={() => {
                setCurrentPage(i)
                setFilter('all')
              }}
              role="tab"
              type="button"
            >
              {p.label ?? formatCopy(copy.page, { index: i + 1 })}
            </button>
          ))}
        </div>
      ) : null}
      <div className="pc-doc-toolrow" role="tablist" aria-label={copy.recordFilter}>
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
        subtitle={formatCopy(copy.logSubtitle, { total: activeRows.length, shown: filtered.length, source: isCallLog ? copy.carrier : copy.institution })}
        stamp={isCallLog ? copy.callStamp : copy.institutionStamp}
        variant="ledger"
        footer={activeNote ? <span>{activeNote}</span> : null}
      >
        <div className={`pc-doc-table pc-doc-table--ledger${isCallLog ? ' is-call-log' : ''}`} role="table" aria-label={isCallLog ? copy.callLogAria : copy.visitLogAria}>
          <div className="pc-doc-table__head" role="row">
            <span>{copy.dateTime}</span>
            <span>{copy.category}</span>
            <span>{isCallLog ? copy.counterNumber : copy.targetContent}</span>
            <span>{isCallLog ? copy.callDurationMessage : copy.duration}</span>
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

function normalizeLogPages(title: string | undefined, rows: LogRow[], note: string, pages: LogPage[] | undefined, copy: Record<string, string>): LogPage[] {
  if (Array.isArray(pages) && pages.length > 0) {
    return pages
      .filter((page) => Array.isArray(page.rows) && page.rows.length > 0)
      .map((page, index) => ({
        label: page.label ?? formatCopy(copy.page, { index: index + 1 }),
        title: page.title ?? title,
        rows: page.rows,
        note: page.note ?? note,
      }))
  }
  return [{ title, rows, note }]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. DeviceViewer — 디바이스
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function DeviceViewer({ ownerName, sections }: { ownerName: string; sections: DeviceSection[] }) {
  const copy = useViewerCopy()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = useCallback((id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const diarySignal = `${ownerName} ${sections.map((s) => s.title).join(' ')}`
  const isDiary = /일기|공책|어머니/.test(diarySignal)

  if (isDiary) {
    return (
      <div className="pc-diary-viewer">
        <article className="pc-diary-paper">
          <header className="pc-diary-paper__header">
            <div>
              <span className="pc-diary-paper__label">DIARY NOTEBOOK</span>
              <strong>{ownerName || copy.diaryFallback}</strong>
            </div>
            <span>{copy.handwrittenCopy}</span>
          </header>
          <div className="pc-diary-paper__body">
            {sections.map((section) => (
              <section className="pc-diary-entry" key={section.id || section.title}>
                <h4>{section.title}</h4>
                {section.items.map((item, i) => (
                  <p className={`pc-diary-line${item.suspicious ? ' is-suspicious' : ''}`} key={i}>
                    {item.text}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </div>
    )
  }

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
        {formatCopy(copy.phoneOf, { owner: ownerName })}
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
  const copy = useViewerCopy()
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
          🔒 {copy.privacy}: {data.privacy}
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
          💬 {copy.comments}
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
