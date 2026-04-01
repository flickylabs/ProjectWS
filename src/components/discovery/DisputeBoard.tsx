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
import { useGameStore } from '../../store/useGameStore'
import type { CaseData, PartyId } from '../../types'
import type { LieState } from '../../types'
import { QuestionMeterHUD } from './StateTransitionFeedback'

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

export default function DisputeBoard({ onClose, onSelectDispute }: {
  onClose: () => void
  onSelectDispute?: (disputeId: string, party: PartyId) => void
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const caseData = useGameStore((s) => s.caseData)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)
  const readinessState = useGameStore((s) => s.readinessState)
  const separationTarget = useGameStore((s) => s.separationTarget)

  if (!caseData) return null

  const cards = buildCards(caseData, agentA.lieStateMap, agentB.lieStateMap)
  const activeParty: PartyId = separationTarget ?? 'a'

  return (
    <div className="fixed inset-0 z-40 bg-gray-950/85 flex flex-col" onClick={onClose}>
      <div className="max-w-lg mx-auto w-full flex flex-col h-full px-3 pt-2 pb-4" onClick={e => e.stopPropagation()}>

        {/* 상단 바 */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-amber-400">쟁점 현황</h2>
          {readinessState && (
            <div className="flex items-center gap-2">
              <StatusChip label="균열" value={readinessState.crackedDisputeCount + readinessState.resolvedDisputeCount} target={2} />
              <StatusChip label="조사" value={readinessState.investigationSuccessCount} target={2} />
              <StatusChip label="돌파" value={readinessState.resolvedDisputeCount + readinessState.fullCollapseCount + readinessState.confessionCount} target={1} />
            </div>
          )}
          <button onClick={onClose} className="text-gray-500 text-xs hover:text-white">닫기</button>
        </div>

        {/* 미터 HUD — 현재 심문 대상 */}
        <div className="mb-3 px-1 py-1.5 bg-gray-900/60 rounded-lg border border-gray-800/40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500">
              {activeParty === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name} 심문 미터
            </span>
            <QuestionMeterHUD party={activeParty} />
          </div>
        </div>

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
}: {
  card: DisputeCardData
  isExpanded: boolean
  onToggle: () => void
  caseData: CaseData
  onSelectDispute?: (disputeId: string, party: PartyId) => void
}) {
  if (card.isHidden) {
    return (
      <div className="bg-gray-900/60 border border-gray-800/40 rounded-xl px-3 py-2 opacity-40">
        <span className="text-xs text-gray-600">??? 숨겨진 쟁점</span>
      </div>
    )
  }

  const statusStyles: Record<DisputeStatus, string> = {
    unopened: 'border-gray-700/30 bg-gray-900/40',
    contested: 'border-yellow-600/40 bg-gray-900/60',
    cracked: 'border-orange-500/50 bg-orange-950/20',
    resolved: 'border-emerald-600/40 bg-emerald-950/20',
  }

  const statusLabels: Record<DisputeStatus, string> = {
    unopened: '미개시',
    contested: '공방 중',
    cracked: '균열',
    resolved: '확정',
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
          </div>
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${statusColors[card.status]}`}>
            {statusLabels[card.status]}
          </span>
        </div>

        <div className="space-y-1">
          <ClaimLine party="a" text={card.aClaim} name={caseData.duo.partyA.name} />
          <ClaimLine party="b" text={card.bClaim} name={caseData.duo.partyB.name} />
        </div>

        {/* 증거 배지 */}
        <div className="flex items-center gap-2 mt-1.5">
          {card.evidenceSupport > 0 && (
            <span className="text-[10px] text-emerald-500/80">지지 {card.evidenceSupport}</span>
          )}
          {card.evidenceConflict > 0 && (
            <span className="text-[10px] text-red-400/80">충돌 {card.evidenceConflict}</span>
          )}
          <span className="text-[10px] text-gray-600 ml-auto">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Tier 2: 확장 시 보이는 정보 */}
      {isExpanded && (
        <div className="border-t border-gray-800/40 px-3 py-2 animate-fade-in">
          {/* 관련 증거 칩 */}
          {relatedEvidence.length > 0 && (
            <div className="mb-2">
              <span className="text-[10px] text-gray-500 block mb-1">관련 증거</span>
              <div className="flex flex-wrap gap-1">
                {relatedEvidence.map(e => (
                  <span key={e.id} className={`text-[10px] px-1.5 py-0.5 rounded border ${
                    e.reliability === 'hard'
                      ? 'border-amber-600/40 text-amber-400/80 bg-amber-950/20'
                      : 'border-gray-700/40 text-gray-400/80 bg-gray-900/40'
                  }`}>
                    {e.name.slice(0, 12)}{e.name.length > 12 ? '…' : ''}
                  </span>
                ))}
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
                {caseData.duo.partyA.name.slice(0, 3)}에게 질문
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onSelectDispute(card.disputeId, 'b') }}
                className="flex-1 text-[10px] py-1.5 rounded-lg bg-rose-900/30 text-rose-400 hover:bg-rose-900/50 border border-rose-800/30 font-semibold transition-colors"
              >
                {caseData.duo.partyB.name.slice(0, 3)}에게 질문
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
  if (!state) return null
  const stateLabels: Record<string, string> = {
    S0: '완전 부정', S1: '흔들림', S2: '부분 인정', S3: '전가', S4: '감정 호소', S5: '인정',
  }
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
): DisputeCardData[] {
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

    // 양측 주장 요약 (Board용 압축 — publicClaim 첫 번째 항목 또는 truthDescription)
    const aClaim = d.truthDescription ? `${d.name}에 대해 해명 중` : d.name
    const bClaim = d.truthDescription ? `${d.name}에 대해 반박 중` : d.name

    // 증거 수
    const related = caseData.evidence.filter(e => e.proves.includes(d.id))
    const evidenceSupport = related.filter(e => e.reliability === 'hard').length
    const evidenceConflict = related.filter(e => e.isTrap).length

    return {
      disputeId: d.id,
      name: d.name,
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
