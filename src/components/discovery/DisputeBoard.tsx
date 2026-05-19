/**
 * Dispute Board — 쟁점 현황판
 * ─────────────────────────────────
 * 플레이어가 심문 중 한눈에 현재 상황을 파악할 수 있는 보드.
 * GPT 의견 4 기반: 3단 정보 구조 + 칩/배지 방식.
 *
 * Tier 1 (항상 보임): 상태 + 양측 주장 1줄 + 증거 배지
 * Tier 2 (확장 시): 관련 증거 칩 + 최근 진전
 * 한 번에 1개만 확장.
 */

import { useState } from 'react'
import { useGameStore, useStore } from '../../store/useGameStore'
import type { CaseData, PartyId } from '../../types'
import type { LieState } from '../../types'
import type { DisputeDepthLayer as _DisputeDepthLayer } from '../../types'
import { QuestionMeterHUD } from './StateTransitionFeedback'
import Emoji from '../common/Emoji'
import { getDisputeV2, getActiveLayer, getBeatRuntimeState, hasStructureV2 } from '../../engine/v2DataLoader'
import { getMisconceptionState } from '../../engine/misconceptionEngine'
import { normalizeCaseKey } from '../../utils/caseHelpers'
import CombinationLabPanel from './CombinationLabPanel'
import { useI18n, type LocaleCode } from '../../i18n'
import { localizeRuntimeText } from '../../i18n/runtimeText'

type DisputeStatus = 'unopened' | 'contested' | 'cracked' | 'resolved'

interface DisputeCardData {
  disputeId: string
  name: string
  status: DisputeStatus
  aState: LieState | null
  bState: LieState | null
  aClaim: string
  bClaim: string
  evidenceSupport: number
  evidenceConflict: number
  isNew: boolean
  isHidden: boolean
}

const DISPUTE_SURFACE_LABELS: Record<string, Record<string, string>> = {
  'spouse-01': {
    'd-1': '방문 이유와 통화 맥락',
    'd-2': '개인 계좌 출금의 사용처',
    'h-d3': '공동 적금 해지 경위',
    'h-d4': '무엇을 먼저 숨겼는지',
  },
  'family-01': {
    'd-1': '말년 유서 작성 경위와 개입 정도',
    'd-2': '유서 비율 변경의 방향과 동기',
    'd-3': '장기 지원금의 실제 출처',
    'd-4': '오래된 가족 사정과 침묵의 이유',
    'd-5': '누가 어머니의 뜻을 왜곡했는지',
  },
  'friend-01': {
    'd-1': '반복 연락의 목적과 방식',
    'd-2': '예비신랑과 최수민 사이의 선후관계',
    'd-3': '아버지의 현재 부탁과 과거 유사성',
    'd-4': '과거 손절의 진짜 원인',
    'd-5': '단톡방 발언의 확인 여부와 확산 책임',
  },
}

const STATE_LABELS: Record<LocaleCode, Record<string, string>> = {
  ko: { S0: '방어', S1: '동요', S2: '변명', S3: '궁지', S4: '한계', S5: '고백' },
  en: { S0: 'Defense', S1: 'Shaken', S2: 'Excuse', S3: 'Cornered', S4: 'Limit', S5: 'Confession' },
  ja: { S0: '防御', S1: '動揺', S2: '弁明', S3: '窮地', S4: '限界', S5: '告白' },
  'zh-CN': { S0: '防备', S1: '动摇', S2: '辩解', S3: '被逼入角', S4: '极限', S5: '承认' },
}

const BOARD_COPY: Record<LocaleCode, {
  title: string
  cracked: string
  investigation: string
  breakthrough: string
  close: string
  meter: (name: string) => string
  compareLocker: string
  compareConfirm: string
  slot: (index: number) => string
  clickToPin: string
  compareHeader: string
  sideA: string
  sideB: string
  claimA: string
  claimB: string
  hiddenDispute: string
  statuses: Record<DisputeStatus, string>
  pinned: string
  compare: string
  support: string
  conflict: string
  relatedEvidence: string
  ask: (name: string) => string
  claimExplaining: (name: string) => string
  claimCountering: (name: string) => string
  depth: string
  current: string
  lockedLayer: string
  misconception: string
}> = {
  ko: {
    title: '쟁점 현황',
    cracked: '균열',
    investigation: '조사',
    breakthrough: '돌파',
    close: '닫기',
    meter: (name) => `${name} 심문 미터`,
    compareLocker: '비교 보관함 (퍼크 1회)',
    compareConfirm: '비교 확정',
    slot: (index) => `슬롯 ${index}`,
    clickToPin: '쟁점 클릭하여 고정',
    compareHeader: '[비교 보관함] 쟁점 비교:',
    sideA: 'A 측',
    sideB: 'B 측',
    claimA: 'A 주장',
    claimB: 'B 주장',
    hiddenDispute: '??? 숨겨진 쟁점',
    statuses: { unopened: '미개시', contested: '공방 중', cracked: '균열', resolved: '확정' },
    pinned: '고정됨',
    compare: '비교',
    support: '지지',
    conflict: '충돌',
    relatedEvidence: '관련 증거',
    ask: (name) => `${name}에게 질문`,
    claimExplaining: (name) => `${name}에 대해 해명 중`,
    claimCountering: (name) => `${name}에 대해 반박 중`,
    depth: '쟁점 깊이',
    current: '현재',
    lockedLayer: '아직 이 층은 잠겨 있습니다.',
    misconception: '오해 상태',
  },
  en: {
    title: 'Dispute Status',
    cracked: 'Crack',
    investigation: 'Investigate',
    breakthrough: 'Breakthrough',
    close: 'Close',
    meter: (name) => `${name} Interrogation Meter`,
    compareLocker: 'Comparison Locker (1 perk use)',
    compareConfirm: 'Confirm Compare',
    slot: (index) => `Slot ${index}`,
    clickToPin: 'Click a dispute to pin',
    compareHeader: '[Comparison Locker] Dispute Comparison:',
    sideA: 'A side',
    sideB: 'B side',
    claimA: 'A claim',
    claimB: 'B claim',
    hiddenDispute: '??? Hidden Dispute',
    statuses: { unopened: 'Unopened', contested: 'Contested', cracked: 'Cracked', resolved: 'Resolved' },
    pinned: 'Pinned',
    compare: 'Compare',
    support: 'Support',
    conflict: 'Conflict',
    relatedEvidence: 'Related Evidence',
    ask: (name) => `Ask ${name}`,
    claimExplaining: (name) => `Explaining ${name}`,
    claimCountering: (name) => `Countering ${name}`,
    depth: 'Dispute Depth',
    current: 'Current',
    lockedLayer: 'This layer is still locked.',
    misconception: 'Misconception State',
  },
  ja: {
    title: '争点状況',
    cracked: '亀裂',
    investigation: '調査',
    breakthrough: '突破',
    close: '閉じる',
    meter: (name) => `${name} 尋問メーター`,
    compareLocker: '比較保管庫 (パーク1回)',
    compareConfirm: '比較確定',
    slot: (index) => `スロット ${index}`,
    clickToPin: '争点をクリックして固定',
    compareHeader: '[比較保管庫] 争点比較:',
    sideA: 'A側',
    sideB: 'B側',
    claimA: 'A主張',
    claimB: 'B主張',
    hiddenDispute: '??? 隠れた争点',
    statuses: { unopened: '未開始', contested: '攻防中', cracked: '亀裂', resolved: '確定' },
    pinned: '固定済み',
    compare: '比較',
    support: '支持',
    conflict: '衝突',
    relatedEvidence: '関連証拠',
    ask: (name) => `${name}に質問`,
    claimExplaining: (name) => `${name}について釈明中`,
    claimCountering: (name) => `${name}について反論中`,
    depth: '争点の深度',
    current: '現在',
    lockedLayer: 'まだこの層はロックされています。',
    misconception: '誤解状態',
  },
  'zh-CN': {
    title: '争议状态',
    cracked: '裂痕',
    investigation: '调查',
    breakthrough: '突破',
    close: '关闭',
    meter: (name) => `${name} 讯问计量`,
    compareLocker: '比较保管室 (特权1次)',
    compareConfirm: '确认比较',
    slot: (index) => `槽位 ${index}`,
    clickToPin: '点击争议点固定',
    compareHeader: '[比较保管室] 争议比较:',
    sideA: 'A方',
    sideB: 'B方',
    claimA: 'A主张',
    claimB: 'B主张',
    hiddenDispute: '??? 隐藏争议',
    statuses: { unopened: '未开启', contested: '交锋中', cracked: '裂痕', resolved: '确定' },
    pinned: '已固定',
    compare: '比较',
    support: '支持',
    conflict: '冲突',
    relatedEvidence: '相关证据',
    ask: (name) => `询问${name}`,
    claimExplaining: (name) => `正在说明${name}`,
    claimCountering: (name) => `正在反驳${name}`,
    depth: '争议深度',
    current: '当前',
    lockedLayer: '这一层尚未解锁。',
    misconception: '误解状态',
  },
}

const MISCONCEPTION_LABELS: Record<LocaleCode, Record<string, string>> = {
  ko: { M0: '외형상 의심', M1: '방어/당황', M2: '오해 고착', M3: '확신 약화', M4: '오해 해소' },
  en: { M0: 'Surface Suspicion', M1: 'Defensive / Flustered', M2: 'Misconception Fixed', M3: 'Certainty Weakening', M4: 'Misconception Resolved' },
  ja: { M0: '表面的な疑い', M1: '防御/動揺', M2: '誤解の固定', M3: '確信の弱まり', M4: '誤解解消' },
  'zh-CN': { M0: '表面怀疑', M1: '防备/慌张', M2: '误解固着', M3: '确信减弱', M4: '误解解除' },
}

function getDisputeSurfaceLabel(caseData: CaseData, disputeId: string, fallback: string, locale: LocaleCode) {
  const caseKey = normalizeCaseKey(caseData)
  return localizeRuntimeText(DISPUTE_SURFACE_LABELS[caseKey]?.[disputeId] ?? fallback, locale)
}

export default function DisputeBoard({ onClose, onSelectDispute }: {
  onClose: () => void
  onSelectDispute?: (disputeId: string, party: PartyId) => void
}) {
  const { locale } = useI18n()
  const copy = BOARD_COPY[locale]
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [compareSlots, setCompareSlots] = useState<[string | null, string | null]>([null, null])

  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const readinessState = useStore((s) => s.readinessState)
  const separationTarget = useStore((s) => s.separationTarget)
  const compareLockerAvailable = useStore(s => s.activePerks.compareLockerAvailable > 0)

  if (!caseData) return null

  const cards = buildCards(caseData, agentA.lieStateMap, agentB.lieStateMap, locale)
  const activeParty: PartyId = separationTarget ?? 'a'

  // 비교 보관함: 쟁점 핀 토글
  const handleComparePin = (disputeId: string) => {
    setCompareSlots(prev => {
      if (prev[0] === disputeId) return [prev[1], null]
      if (prev[1] === disputeId) return [prev[0], null]
      if (!prev[0]) return [disputeId, prev[1]]
      if (!prev[1]) return [prev[0], disputeId]
      return [disputeId, prev[1]]  // 꽉 찬 경우 첫 번째 교체
    })
  }

  // 비교 확정 시 퍼크 소비 + 시스템 메시지
  const handleCompareConfirm = () => {
    if (!compareSlots[0] || !compareSlots[1]) return
    const store = useGameStore.getState()
    store.consumePerkUse('compareLockerAvailable')

    const card0 = cards.find(c => c.disputeId === compareSlots[0])
    const card1 = cards.find(c => c.disputeId === compareSlots[1])

    const stateLabels = STATE_LABELS[locale]

    const lines = [
      copy.compareHeader,
      ``,
      `■ ${card0?.name ?? compareSlots[0]}`,
      `  ${copy.sideA}: ${card0?.aState ? stateLabels[card0.aState] ?? card0.aState : '?'} / ${copy.sideB}: ${card0?.bState ? stateLabels[card0.bState] ?? card0.bState : '?'}`,
      `  ${copy.claimA}: ${card0?.aClaim ?? '-'}`,
      `  ${copy.claimB}: ${card0?.bClaim ?? '-'}`,
      ``,
      `■ ${card1?.name ?? compareSlots[1]}`,
      `  ${copy.sideA}: ${card1?.aState ? stateLabels[card1.aState] ?? card1.aState : '?'} / ${copy.sideB}: ${card1?.bState ? stateLabels[card1.bState] ?? card1.bState : '?'}`,
      `  ${copy.claimA}: ${card1?.aClaim ?? '-'}`,
      `  ${copy.claimB}: ${card1?.bClaim ?? '-'}`,
    ]

    store.addDialogue({
      speaker: 'system',
      text: lines.join('\n'),
      relatedDisputes: [compareSlots[0], compareSlots[1]],
      turn: store.turnCount,
    })

    setCompareSlots([null, null])
  }

  return (
    <div className="fixed inset-0 z-40 bg-gray-950/85 flex flex-col" onClick={onClose}>
      <div className="max-w-lg mx-auto w-full flex flex-col h-full px-3 pt-2 pb-4" onClick={e => e.stopPropagation()}>

        {/* 상단 바 */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-amber-400">{copy.title}</h2>
          {readinessState && (
            <div className="flex items-center gap-2">
              <StatusChip label={copy.cracked} value={readinessState.crackedDisputeCount + readinessState.resolvedDisputeCount} target={2} />
              <StatusChip label={copy.investigation} value={readinessState.investigationSuccessCount} target={2} />
              <StatusChip label={copy.breakthrough} value={readinessState.resolvedDisputeCount + readinessState.fullCollapseCount + readinessState.confessionCount} target={1} />
            </div>
          )}
          <button onClick={onClose} className="text-gray-500 text-xs hover:text-white">{copy.close}</button>
        </div>

        {/* 미터 HUD — 현재 심문 대상 */}
        <div className="mb-3 px-1 py-1.5 bg-gray-900/60 rounded-lg border border-gray-800/40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500">
              {copy.meter(activeParty === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name)}
            </span>
            <QuestionMeterHUD party={activeParty} />
          </div>
        </div>

        {/* 비교 보관함 — compare_locker 퍼크 활성 시 */}
        {compareLockerAvailable && (
          <div className="mb-2 px-2 py-1.5 bg-violet-950/30 border border-violet-700/40 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-violet-300 font-semibold">{copy.compareLocker}</span>
              <button
                onClick={handleCompareConfirm}
                disabled={!compareSlots[0] || !compareSlots[1]}
                className={`text-[10px] px-2 py-0.5 rounded font-semibold transition-all ${
                  compareSlots[0] && compareSlots[1]
                    ? 'bg-violet-600 text-white hover:bg-violet-500 active:scale-95'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                }`}
              >
                {copy.compareConfirm}
              </button>
            </div>
            <div className="flex gap-2">
              <div className={`flex-1 text-[10px] px-2 py-1 rounded border ${compareSlots[0] ? 'border-violet-500/50 bg-violet-900/20 text-violet-200' : 'border-gray-700/30 bg-gray-900/30 text-gray-600'}`}>
                {compareSlots[0] ? cards.find(c => c.disputeId === compareSlots[0])?.name ?? copy.slot(1) : copy.clickToPin}
              </div>
              <div className={`flex-1 text-[10px] px-2 py-1 rounded border ${compareSlots[1] ? 'border-violet-500/50 bg-violet-900/20 text-violet-200' : 'border-gray-700/30 bg-gray-900/30 text-gray-600'}`}>
                {compareSlots[1] ? cards.find(c => c.disputeId === compareSlots[1])?.name ?? copy.slot(2) : copy.clickToPin}
              </div>
            </div>
          </div>
        )}

        {caseData.combinationLab ? <CombinationLabPanel /> : null}

        {/* 쟁점 카드 목록 */}
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2">
          {cards.map(card => (
            <DisputeCard
              key={card.disputeId}
              card={card}
              isExpanded={expandedId === card.disputeId}
              onToggle={() => setExpandedId(expandedId === card.disputeId ? null : card.disputeId)}
              caseData={caseData}
              onSelectDispute={onSelectDispute}
              compareLockerActive={compareLockerAvailable}
              isPinned={compareSlots[0] === card.disputeId || compareSlots[1] === card.disputeId}
              onComparePin={handleComparePin}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/** 개별 쟁점 카드 */
function DisputeCard({
  card, isExpanded, onToggle, caseData, onSelectDispute,
  compareLockerActive, isPinned, onComparePin,
}: {
  card: DisputeCardData
  isExpanded: boolean
  onToggle: () => void
  caseData: CaseData
  onSelectDispute?: (disputeId: string, party: PartyId) => void
  compareLockerActive?: boolean
  isPinned?: boolean
  onComparePin?: (disputeId: string) => void
}) {
  const { locale } = useI18n()
  const copy = BOARD_COPY[locale]
  if (card.isHidden) {
    return (
      <div className="bg-gray-900/60 border border-gray-800/40 rounded-xl px-3 py-2 opacity-40">
        <span className="text-xs text-gray-600">{copy.hiddenDispute}</span>
      </div>
    )
  }

  const statusStyles: Record<DisputeStatus, string> = {
    unopened: 'border-gray-700/30 bg-gray-900/40',
    contested: 'border-yellow-600/40 bg-gray-900/60',
    cracked: 'border-orange-500/50 bg-orange-950/20',
    resolved: 'border-emerald-600/40 bg-emerald-950/20',
  }

  const statusColors: Record<DisputeStatus, string> = {
    unopened: 'text-gray-500 bg-gray-800/60',
    contested: 'text-yellow-400 bg-yellow-900/40',
    cracked: 'text-orange-400 bg-orange-900/40',
    resolved: 'text-emerald-400 bg-emerald-900/40',
  }

  // 관련 증거 목록 (확장 시)
  const relatedEvidence = caseData.evidence.filter(e => e.proves.includes(card.disputeId))

  return (
    <div
      className={`border rounded-xl transition-all cursor-pointer ${statusStyles[card.status]}`}
      onClick={onToggle}
    >
      {/* Tier 1: 항상 보이는 정보 */}
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-200">{card.name}</span>
            {card.isNew && <span className="text-[9px] px-1 py-0.5 bg-red-600 text-white rounded font-bold">NEW</span>}
            {compareLockerActive && (
              <button
                onClick={(e) => { e.stopPropagation(); onComparePin?.(card.disputeId) }}
                className={`text-[9px] px-1.5 py-0.5 rounded font-semibold transition-all ${
                  isPinned
                    ? 'bg-violet-600 text-white ring-1 ring-violet-400'
                    : 'bg-gray-800/60 text-gray-500 hover:bg-violet-900/40 hover:text-violet-300'
                }`}
              >
                {isPinned ? copy.pinned : copy.compare}
              </button>
            )}
          </div>
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${statusColors[card.status]}`}>
            {copy.statuses[card.status]}
          </span>
        </div>

        <div className="space-y-1">
          <ClaimLine party="a" text={card.aClaim} name={caseData.duo.partyA.name} />
          <ClaimLine party="b" text={card.bClaim} name={caseData.duo.partyB.name} />
        </div>

        {/* 증거 배지 */}
        <div className="flex items-center gap-2 mt-1.5">
          {card.evidenceSupport > 0 && (
            <span className="text-[10px] text-emerald-500/80">{copy.support} {card.evidenceSupport}</span>
          )}
          {card.evidenceConflict > 0 && (
            <span className="text-[10px] text-red-400/80">{copy.conflict} {card.evidenceConflict}</span>
          )}
          <span className="text-[10px] text-gray-600 ml-auto">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Tier 2: 확장 시 보이는 정보 */}
      {isExpanded && (
        <div className="border-t border-gray-800/40 px-3 py-2 animate-fade-in">

          {/* 쟁점 층위 (V2 데이터가 있을 때만) */}
          <DepthLayerDisplay disputeId={card.disputeId} caseData={caseData} aState={card.aState} />

          {/* Misconception 상태 (red_herring만) */}
          <MisconceptionDisplay disputeId={card.disputeId} />

          {/* 관련 증거 칩 */}
          {relatedEvidence.length > 0 && (
            <div className="mb-2">
              <span className="text-[10px] text-gray-500 block mb-1">{copy.relatedEvidence}</span>
              <div className="flex flex-wrap gap-1">
                {relatedEvidence.map(e => {
                  const label = localizeRuntimeText(e.surfaceName ?? e.id, locale)
                  return (
                    <span key={e.id} className={`text-[10px] px-1.5 py-0.5 rounded border ${
                      e.reliability === 'hard'
                        ? 'border-amber-600/40 text-amber-400/80 bg-amber-950/20'
                        : 'border-gray-700/40 text-gray-400/80 bg-gray-900/40'
                    }`}>
                      {label.slice(0, 12)}{label.length > 12 ? '…' : ''}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {/* 양측 상태 */}
          <div className="flex items-center gap-4">
            <StateTag label={caseData.duo.partyA.name} state={card.aState} color="blue" />
            <StateTag label={caseData.duo.partyB.name} state={card.bState} color="rose" />
          </div>

          {/* 쟁점 선택 버튼 */}
          {onSelectDispute && card.status !== 'resolved' && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={(e) => { e.stopPropagation(); onSelectDispute(card.disputeId, 'a') }}
                className="flex-1 text-[10px] py-1.5 rounded-lg bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 border border-blue-800/30 font-semibold transition-colors"
              >
                {copy.ask(caseData.duo.partyA.name.slice(0, 3))}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onSelectDispute(card.disputeId, 'b') }}
                className="flex-1 text-[10px] py-1.5 rounded-lg bg-rose-900/30 text-rose-400 hover:bg-rose-900/50 border border-rose-800/30 font-semibold transition-colors"
              >
                {copy.ask(caseData.duo.partyB.name.slice(0, 3))}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/** 양측 주장 1줄 */
function ClaimLine({ party, text, name }: { party: PartyId; text: string; name: string }) {
  const color = party === 'a' ? 'text-blue-400/70' : 'text-rose-400/70'
  return (
    <div className="flex items-start gap-1.5">
      <span className={`text-[10px] font-semibold shrink-0 mt-0.5 ${color}`}>{name.slice(0, 3)}</span>
      <span className="text-[11px] text-gray-400 leading-tight line-clamp-1">{text}</span>
    </div>
  )
}

/** 상태 태그 (S0~S5) */
function StateTag({ label, state, color }: { label: string; state: LieState | null; color: 'blue' | 'rose' }) {
  const { locale } = useI18n()
  if (!state) return null
  const stateLabels = STATE_LABELS[locale]
  const colorClass = color === 'blue' ? 'text-blue-400/60' : 'text-rose-400/60'
  return (
    <span className={`text-[10px] ${colorClass}`}>
      {label.slice(0, 3)} {state} {stateLabels[state] ?? ''}
    </span>
  )
}

/** 준비도 칩 */
function StatusChip({ label, value, target }: { label: string; value: number; target: number }) {
  const met = value >= target
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
      met ? 'bg-emerald-900/50 text-emerald-400' : 'bg-gray-800/60 text-gray-500'
    }`}>
      {label} {value}/{target}
    </span>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 데이터 빌더
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STATE_RANK: Record<LieState, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }

function buildCards(
  caseData: CaseData,
  aLieMap: Record<string, { currentState: LieState }>,
  bLieMap: Record<string, { currentState: LieState }>,
  locale: LocaleCode,
): DisputeCardData[] {
  const copy = BOARD_COPY[locale]
  return caseData.disputes.map(d => {
    const aState = aLieMap[d.id]?.currentState ?? null
    const bState = bLieMap[d.id]?.currentState ?? null

    // 상태 결정
    const maxRank = Math.max(
      aState ? STATE_RANK[aState] : 0,
      bState ? STATE_RANK[bState] : 0,
    )
    let status: DisputeStatus = 'unopened'
    if (maxRank >= 4) status = 'resolved'
    else if (maxRank >= 2) status = 'cracked'
    else if (maxRank >= 1) status = 'contested'

    // 양측 주장 요약 (Board용 압축 — surface label만 사용)
    const displayName = getDisputeSurfaceLabel(caseData, d.id, d.name, locale)
    const aClaim = d.truthDescription ? copy.claimExplaining(displayName) : displayName
    const bClaim = d.truthDescription ? copy.claimCountering(displayName) : displayName

    // 증거 수
    const related = caseData.evidence.filter(e => e.proves.includes(d.id))
    const evidenceSupport = related.filter(e => e.reliability === 'hard').length
    const evidenceConflict = related.filter(e => e.isTrap).length

    return {
      disputeId: d.id,
      name: displayName,
      status,
      aState,
      bState,
      aClaim,
      bClaim,
      evidenceSupport,
      evidenceConflict,
      isNew: false,
      isHidden: false,
    }
  })
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 쟁점 층위 표시 (카드 펼침)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LAYER_STYLES = {
  surface: { icon: '📄', activeClass: 'border-amber-500/50 bg-amber-950/30 text-amber-300', lockedClass: 'border-gray-700/30 bg-gray-900/30 text-gray-500' },
  motive: { icon: '🔍', activeClass: 'border-blue-500/50 bg-blue-950/30 text-blue-300', lockedClass: 'border-gray-700/30 bg-gray-900/30 text-gray-500' },
  core: { icon: '💎', activeClass: 'border-purple-500/50 bg-purple-950/30 text-purple-300', lockedClass: 'border-gray-700/30 bg-gray-900/30 text-gray-500' },
} as const

function DepthLayerDisplay({ disputeId, caseData, aState }: {
  disputeId: string
  caseData: CaseData
  aState: LieState | null
}) {
  const { locale } = useI18n()
  const copy = BOARD_COPY[locale]
  const caseKey = normalizeCaseKey(caseData)
  if (!hasStructureV2(caseKey)) return null

  const disputeV2 = getDisputeV2(caseKey, disputeId)
  if (!disputeV2?.depthLayers || disputeV2.depthLayers.length === 0) return null

  const runtimeState = getBeatRuntimeState(caseKey)
  const currentLieState = aState ?? 'S0'
  const activeLayerId = getActiveLayer(caseKey, disputeId, currentLieState, runtimeState.flags, new Set())

  const layers = disputeV2.depthLayers
  const activeRank = { surface: 0, motive: 1, core: 2 }[activeLayerId] ?? 0

  return (
    <div className="mb-2">
      <span className="text-[10px] text-gray-500 block mb-1">{copy.depth}</span>
      <div className="space-y-1">
        {layers.map((layer, _i) => {
          const layerRank = { surface: 0, motive: 1, core: 2 }[layer.id] ?? 0
          const isUnlocked = layerRank <= activeRank
          const isCurrent = layer.id === activeLayerId
          const style = LAYER_STYLES[layer.id as keyof typeof LAYER_STYLES] ?? LAYER_STYLES.surface

          return (
            <div
              key={layer.id}
              className={`flex items-start gap-2 px-2 py-1.5 rounded-lg border transition-all ${
                isUnlocked ? style.activeClass : style.lockedClass
              } ${isCurrent ? 'ring-1 ring-white/20' : ''}`}
            >
              <span className="shrink-0"><Emoji char={isUnlocked ? style.icon : '🔒'} size={16} /></span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold">{localizeRuntimeText(layer.label, locale)}</span>
                  {isCurrent && <span className="text-[8px] px-1 py-0.5 bg-white/10 rounded font-semibold">{copy.current}</span>}
                </div>
                <p className="text-[10px] leading-tight mt-0.5 opacity-80">
                  {isUnlocked ? localizeRuntimeText(layer.summary, locale) : localizeRuntimeText(layer.lockedSummary ?? copy.lockedLayer, locale)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Misconception 상태 표시 (red_herring / shared_misconception만)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const M_LABEL_COLORS: Record<string, string> = {
  M0: 'text-red-400/70',
  M1: 'text-orange-400/70',
  M2: 'text-yellow-400/70',
  M3: 'text-blue-400/70',
  M4: 'text-emerald-400/70',
}

function MisconceptionDisplay({ disputeId }: { disputeId: string }) {
  const { locale } = useI18n()
  const mState = getMisconceptionState(disputeId)
  if (!mState) return null

  const label = MISCONCEPTION_LABELS[locale][mState] ?? mState
  const color = M_LABEL_COLORS[mState] ?? 'text-gray-400'
  const rank = { M0: 0, M1: 1, M2: 2, M3: 3, M4: 4 }[mState] ?? 0

  return (
    <div className="mb-2">
      <span className="text-[10px] text-gray-500 block mb-1">{BOARD_COPY[locale].misconception}</span>
      <div className="flex items-center gap-1">
        {['M0', 'M1', 'M2', 'M3', 'M4'].map((m, i) => {
          const isActive = i <= rank
          const isCurrent = m === mState
          return (
            <div
              key={m}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                isActive
                  ? i <= 1 ? 'bg-red-500/60' : i <= 2 ? 'bg-yellow-500/60' : 'bg-emerald-500/60'
                  : 'bg-gray-800'
              } ${isCurrent ? 'ring-1 ring-white/30' : ''}`}
            />
          )
        })}
      </div>
      <span className={`text-[10px] mt-1 block ${color}`}>{label}</span>
    </div>
  )
}
