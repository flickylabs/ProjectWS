import { useEffect, useMemo, useRef, useState } from 'react'
import type { PartyId } from '../../types'
import { useGameStore } from '../../store/useGameStore'
import { useActionDispatch } from '../../hooks/useActionDispatch'
import { getAvailableWitnesses, getWitnessPreviewText, determineTestimonyDepth, getDepthSystemMessage } from '../../engine/witnessEngine'
import { canAppraise, getUnlockedQuestions, getLockedQuestions } from '../../engine/evidenceEngine'
import { playClick, playEvidenceUnlock } from '../../engine/soundEngine'
import Emoji from '../common/Emoji'
import EvidenceVisual from '../common/EvidenceVisual'
import { EvidenceAppraisalModal } from '../discovery'
import { getDossierCards, getAvailableDossierQuestions, resolveDossierQuestion } from '../../engine/v3GameLoopLoader'

interface Props {
  target: PartyId | null
  onPresent: (evidenceId: string) => void
  onConfront?: (evidenceId: string, question: string) => void
  onWitnessCalled?: () => void
  llmMode?: boolean
  /** 새로 해금되어 아직 확인하지 않은 증거 ID 목록 */
  newEvidenceIds?: Set<string>
}

/** 증거 우선순위 점수 계산 — 현재 쟁점 관련성, 신규 여부, 조사 진행도 반영 */
function computeEvidenceScore(
  ev: any,
  state: any,
  focusDisputeId: string | null,
  isNew: boolean,
): number {
  let score = 0
  if (focusDisputeId && ev.proves?.includes(focusDisputeId)) score += 100
  if (isNew) score += 40
  if (!state?.presented) score += 30
  if (ev.reliability === 'hard') score += 20
  if ((state?.investigatedActions?.length ?? 0) >= 2) score += 10
  if (state?.presented) score -= 40
  return score
}

/** 추천 사유 텍스트 생성 */
function getRecommendationReason(
  ev: any,
  state: any,
  focusDisputeId: string | null,
): string {
  if (focusDisputeId && ev.proves?.includes(focusDisputeId)) return '현재 쟁점과 직접 연결됩니다'
  if (!state?.presented && ev.reliability === 'hard') return '아직 제시하지 않은 핵심 증거입니다'
  if ((state?.investigatedActions?.length ?? 0) >= 2 && !state?.presented) return '조사가 충분히 진행되어 바로 사용 가능합니다'
  return '관련성 높은 증거입니다'
}

/** investigationResults에서 핵심 3개를 순서대로 추출 */
const KEY_ORDER = ['request_original', 'restore_context', 'check_edits'] as const

export default function EvidencePresenter({ target, onPresent, onConfront, onWitnessCalled, llmMode, newEvidenceIds }: Props) {
  const evidenceStates = useGameStore((s) => s.evidenceStates)
  const evidenceDefinitions = useGameStore((s) => s.evidenceDefinitions)
  const caseData = useGameStore((s) => s.caseData)
  const resources = useGameStore((s) => s.resources)
  const globalInvest = useGameStore((s) => s.globalInvestTokens)
  const discovery = useGameStore((s) => s.discovery)
  const recommendedEvidenceIds = useGameStore((s) => s.recommendedEvidenceIds)
  const lastFocusedDisputeId = useGameStore((s) => s.lastFocusedDisputeId)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [appraisalTarget, setAppraisalTarget] = useState<string | null>(null)
  const [showOther, setShowOther] = useState(false)
  const dispatch = useActionDispatch()

  // 방어 코드: evidenceDefinitions가 비어있지만 caseData.evidence는 있을 때 자동 복구
  useEffect(() => {
    if (evidenceDefinitions.length === 0 && caseData?.evidence && caseData.evidence.length > 0) {
      console.warn('[EvidencePresenter] evidenceDefinitions 비어있음 — caseData에서 복구')
      useGameStore.getState().initEvidence(caseData.evidence, caseData.evidenceCombinations ?? [])
    }
  }, [evidenceDefinitions.length, caseData])

  const { available, presented, locked } = useMemo(() => {
    // 대상 캐릭터와 관련된 증거만 필터링 (subjectParty 기준)
    const isRelevant = (e: any) => !e.subjectParty || e.subjectParty === 'both' || e.subjectParty === target
    // 이 캐릭터에게 이미 제시했는지 확인 (presentedTo에 target 포함 여부)
    const isPresentedToTarget = (e: any) => (target && evidenceStates[e.id]?.presentedTo?.includes(target)) ?? false
    const avail = evidenceDefinitions.filter((e) => isRelevant(e) && evidenceStates[e.id]?.unlocked && !isPresentedToTarget(e))
    const pres = evidenceDefinitions.filter((e) => isRelevant(e) && isPresentedToTarget(e))
    const lock = evidenceDefinitions.filter((e) => isRelevant(e) && !evidenceStates[e.id]?.unlocked)
    return { available: avail, presented: pres, locked: lock }
  }, [evidenceDefinitions, evidenceStates, target])

  const handleInvestigate = (evidenceId: string) => {
    const state = evidenceStates[evidenceId]
    if (!state) return

    // 다음 조사할 키 찾기
    const nextKey = KEY_ORDER.find(k => !state.investigatedActions.includes(k))
    if (!nextKey) return

    if (globalInvest < 1) {
      useGameStore.getState().addDialogue({
        speaker: 'system', text: '조사 토큰이 모두 소진되었습니다. 충전이 필요합니다.', relatedDisputes: [], turn: useGameStore.getState().turnCount,
      })
      import('../layout/CourtHeader').then(m => m.openResourcePopup('invest'))
      return
    }

    playClick()

    // 모든 조사 단계에서 미니게임/광고/아이템 선택지 제공
    const depth = state.investigatedActions.length + 1 // 1, 2, 3
    useGameStore.getState().spend('investigationTokens', 1)
    useGameStore.getState().setPendingMinigame({ type: 'evidence_depth', evidenceId, depth })
  }

  if (!target) return null

  return (
    <div className="space-y-2 animate-fade-in">
      {/* 증거 감별 모달 */}
      {appraisalTarget && (
        <EvidenceAppraisalModal evidenceId={appraisalTarget} onClose={() => setAppraisalTarget(null)} />
      )}

      {available.length > 0 && (() => {
        // 점수 기반 정렬
        const scored = available.map(ev => ({
          ev,
          score: computeEvidenceScore(ev, evidenceStates[ev.id], lastFocusedDisputeId, !!newEvidenceIds?.has(ev.id)),
        })).sort((a, b) => b.score - a.score)

        const topItem = scored[0]
        const rest = scored.slice(1)
        const relevant = rest.filter(s => s.score > 0)
        const other = rest.filter(s => s.score <= 0)

        const topRecommended = topItem ? (recommendedEvidenceIds.includes(topItem.ev.id) || true) : false
        const recommendationReason = topItem ? getRecommendationReason(topItem.ev, evidenceStates[topItem.ev.id], lastFocusedDisputeId) : ''

        const renderCard = (ev: any, isTop = false) => (
          <EvidenceCard
            key={ev.id} ev={ev} state={evidenceStates[ev.id]}
            isExpanded={expandedId === ev.id}
            onToggle={() => setExpandedId(expandedId === ev.id ? null : ev.id)}
            onPresent={() => onPresent(ev.id)}
            onConfront={onConfront ? (text: string) => onConfront(ev.id, text) : undefined}
            onInvestigate={() => handleInvestigate(ev.id)}
            onAppraise={() => setAppraisalTarget(ev.id)}
            canPresent canInvestigate={globalInvest >= 1}
            appraisal={discovery.appraisals[ev.id]}
            canAppraise={canAppraise(evidenceStates[ev.id])}
            llmMode={llmMode}
            isNew={newEvidenceIds?.has(ev.id)}
            target={target}
            isRecommended={recommendedEvidenceIds.includes(ev.id) || isTop}
          />
        )

        return (
          <>
            <div className="text-xs text-gray-400">제시 가능 ({available.length})</div>

            {/* 추천 증거 */}
            {topItem && (
              <div className="mb-3 p-2 rounded-xl border border-amber-600/30 bg-amber-950/20">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Emoji char="⭐" size={14} />
                  <span className="text-xs font-bold text-amber-400">추천 증거</span>
                  <span className="text-[10px] text-amber-400/60 ml-auto">{recommendationReason}</span>
                </div>
                {renderCard(topItem.ev, true)}
              </div>
            )}

            {/* 관련 증거 */}
            {relevant.length > 0 && (
              <>
                {relevant.map(s => renderCard(s.ev))}
              </>
            )}

            {/* 기타 증거 (접힘) */}
            {other.length > 0 && (
              <div className="mt-1">
                <button
                  onClick={() => setShowOther(!showOther)}
                  className="w-full text-left text-xs text-gray-500 hover:text-gray-400 px-1 py-1 transition-colors"
                >
                  {showOther ? '▼' : '▶'} 기타 증거 ({other.length}건)
                </button>
                {showOther && other.map(s => renderCard(s.ev))}
              </div>
            )}
          </>
        )
      })()}
      {presented.length > 0 && (
        <>
          <div className="text-xs text-gray-500 mt-1">제시 완료 ({presented.length})</div>
          {presented.map((ev) => (
            <EvidenceCard
              key={ev.id} ev={ev} state={evidenceStates[ev.id]}
              isExpanded={expandedId === ev.id}
              onToggle={() => setExpandedId(expandedId === ev.id ? null : ev.id)}
              onInvestigate={() => handleInvestigate(ev.id)}
              onAppraise={() => setAppraisalTarget(ev.id)}
              canPresent={false} canInvestigate={globalInvest >= 1}
              appraisal={discovery.appraisals[ev.id]}
              canAppraise={canAppraise(evidenceStates[ev.id])}
              isRecommended={recommendedEvidenceIds.includes(ev.id)}
            />
          ))}
        </>
      )}
      {locked.length > 0 && (
        <div className="text-xs text-gray-600 bg-gray-800/20 rounded-xl px-3 py-2">
          <Emoji char="🔒" size={14} /> 미확보 증거 {locked.length}개 (선행 증거 필요)
        </div>
      )}

      {/* 증인 소환 섹션 */}
      <WitnessSection dispatch={dispatch} resources={resources} onCalled={onWitnessCalled} />
    </div>
  )
}

/** 증인 소환 섹션 — 증거 탭 하단에 표시 */
function WitnessSection({ dispatch, resources, onCalled }: { dispatch: (a: any) => void; resources: any; onCalled?: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const caseData = useGameStore((s) => s.caseData)
  const calledWitnesses = useGameStore((s) => s.calledWitnesses)
  const witGlobalInvest = useGameStore((s) => s.globalInvestTokens)

  const available = useMemo(() => {
    if (!caseData) return []
    return getAvailableWitnesses(calledWitnesses, caseData)
  }, [caseData, calledWitnesses])

  const called = useMemo(() => {
    if (!caseData) return []
    return caseData.duo.socialGraph.filter(tp => calledWitnesses.includes(tp.id))
  }, [caseData, calledWitnesses])

  if (!caseData || (available.length === 0 && called.length === 0)) return null

  const canAfford = witGlobalInvest >= 1

  const biasChar = (bias: string) => {
    if (bias.startsWith('pro_a')) return '🔵'
    if (bias.startsWith('pro_b')) return '🔴'
    if (bias === 'neutral') return '⚪'
    return '⚠️'
  }

  return (
    <div className="mt-2 pt-2 border-t border-gray-800/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left flex items-center justify-between px-1 py-1"
      >
        <div className="flex items-center gap-2">
          <Emoji char="🧑‍⚖️" size={14} />
          <span className="text-xs font-semibold text-purple-300">
            증인 소환 {available.length > 0 && `(${available.length}명 가능)`}
          </span>
        </div>
        <span className={`text-xs text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {expanded && (
        <div className="mt-1 space-y-1.5 animate-fade-in">
          {/* 소환 가능 */}
          {available.map(w => {
            const wp = w.witnessProfile
            const shortName = w.name.split('(')[0].trim()
            const role = w.name.match(/\(([^)]+)\)/)?.[1] ?? ''
            return (
              <div key={w.id} className="border border-purple-800/30 rounded-lg bg-purple-950/10 px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Emoji char={biasChar(w.bias)} size={12} />
                    <div>
                      <div className="text-xs font-semibold text-purple-200">{shortName}</div>
                      <div className="text-xs text-gray-500">{role}{wp ? ` · ${wp.age}세 · ${wp.occupation}` : ''}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => { dispatch({ type: 'call_witness', witnessId: w.id }); onCalled?.() }}
                    disabled={!canAfford}
                    className={`text-xs px-3 py-1 rounded-lg font-semibold transition-all active:scale-95 ${
                      canAfford
                        ? 'bg-purple-700 hover:bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    소환 <Emoji char="🔍" size={12} />1
                  </button>
                </div>
                {wp && (
                  <div className="mt-1 text-xs text-gray-500 leading-relaxed">
                    {w.witnessedDirectly ? '직접 목격' : '전해 들음'} · {getWitnessPreviewText(w)}
                  </div>
                )}
              </div>
            )
          })}

          {/* 소환 완료 */}
          {called.length > 0 && (
            <>
              <div className="text-xs text-gray-600 mt-1">소환 완료 ({called.length})</div>
              {called.map(w => (
                <div key={w.id} className="text-xs text-gray-500 px-3 py-1 bg-gray-900/20 rounded-lg flex items-center gap-2">
                  <Emoji char="✓" size={12} />
                  <span>{w.name.split('(')[0].trim()}</span>
                </div>
              ))}
            </>
          )}

          {available.length === 0 && called.length > 0 && (
            <div className="text-xs text-gray-600 text-center py-1">모든 증인을 소환했다.</div>
          )}
        </div>
      )}
    </div>
  )
}

const TYPE_ICON: Record<string, string> = {
  bank: '🏦', chat: '💬', cctv: '📹', contract: '📑',
  testimony: '🗣️', log: '📋', device: '📱', sns: '📲',
}

const INVESTIGATION_LABELS: Record<string, string> = {
  request_original: '원본 확인',
  restore_context: '맥락 복원',
  check_edits: '조작 여부',
}

/** 증거 기반 자동 제안 질문 생성 — investigationStages가 있으면 단계별 해금 질문 사용, 없으면 기존 유형별 폴백 */
function generateSuggestions(ev: any, state: any, target?: PartyId | null): { text: string; stage?: number; locked?: boolean; hint?: string }[] {
  // investigationStages가 있으면 staged 시스템 사용
  if (ev.investigationStages && state) {
    const unlocked = getUnlockedQuestions(ev, state)
    const locked = getLockedQuestions(ev, state)

    const results: { text: string; stage?: number; locked?: boolean; hint?: string }[] = []

    // 해금된 질문
    for (const q of unlocked) {
      results.push({ text: q.text, stage: q.stage })
    }

    // 잠긴 질문 힌트
    for (const l of locked) {
      results.push({ text: '', stage: l.stage, locked: true, hint: l.hint })
    }

    return results
  }

  // 폴백: 기존 유형별 제안
  const suggestions: { text: string }[] = []
  const investigatedCount = state?.investigatedActions?.filter((a: string) => KEY_ORDER.includes(a as any))?.length ?? 0

  const typeQuestions: Record<string, string> = {
    bank: '이 거래 내역에 대해 설명하십시오.',
    chat: '이 대화 내용이 사실입니까?',
    cctv: '이 영상에 찍힌 게 본인이 맞습니까?',
    contract: '이 계약 내용을 인정하십니까?',
    testimony: '이 증언 내용에 대해 어떻게 생각하십니까?',
    log: '이 기록에 대해 설명하십시오.',
    device: '이 기기 데이터를 확인하셨습니까?',
    sns: '이 게시물을 직접 올리셨습니까?',
  }
  suggestions.push({ text: typeQuestions[ev.type] ?? '이 증거에 대해 설명하십시오.' })

  if (investigatedCount > 0 && ev.investigationResults) {
    const results = KEY_ORDER.slice(0, investigatedCount).map((k: string) => ev.investigationResults[k]).filter(Boolean)
    if (results.length > 0) {
      const lastResult = results[results.length - 1]
      if (lastResult.includes('캡처') || lastResult.includes('발췌') || lastResult.includes('일부'))
        suggestions.push({ text: '왜 전체가 아닌 일부만 제출하셨습니까?' })
      else if (lastResult.includes('편집') || lastResult.includes('조작'))
        suggestions.push({ text: '이 증거가 조작되지 않았다고 확신합니까?' })
      else
        suggestions.push({ text: '이 증거의 출처를 설명하십시오.' })
    }
  }

  if (ev.reliability === 'soft')
    suggestions.push({ text: '이 증거만으로는 부족한데, 추가로 증명할 수 있습니까?' })

  return suggestions.slice(0, 3)
}

function EvidenceCard({ ev, state, isExpanded, onToggle, onPresent, onConfront, onInvestigate, onAppraise, canPresent, canInvestigate, appraisal, canAppraise: canDoAppraise, llmMode, isNew, target, isRecommended }: {
  ev: any; state: any; isExpanded: boolean
  onToggle: () => void; onPresent?: () => void; onConfront?: (text: string) => void
  onInvestigate: () => void; onAppraise?: () => void; canPresent: boolean; canInvestigate: boolean
  appraisal?: any; canAppraise?: boolean; llmMode?: boolean
  isNew?: boolean; target?: PartyId | null; isRecommended?: boolean
}) {
  const [showPresent, setShowPresent] = useState(false)
  const [confrontText, setConfrontText] = useState('')
  const [showRevealAnim, setShowRevealAnim] = useState(false)
  const investigatedCount = state?.investigatedActions?.filter((a: string) => KEY_ORDER.includes(a as any))?.length ?? 0
  const fullyInvestigated = investigatedCount >= 3
  const legWarning = ev.legitimacy !== 'lawful'

  // 2-tier evidence: surface vs deep
  const hasSurfaceInfo = !!(ev.surfaceName || ev.surfaceDescription)
  const isDeepRevealed = !!(state?.deepInvestigated)
  const showSurface = hasSurfaceInfo && !isDeepRevealed
  const displayName = showSurface ? (ev.surfaceName ?? ev.name) : ev.name
  const displayDescription = showSurface ? (ev.surfaceDescription ?? ev.description) : ev.description

  // Trigger reveal animation when transitioning from surface to deep
  const prevDeepRef = useRef(isDeepRevealed)
  useEffect(() => {
    if (isDeepRevealed && !prevDeepRef.current && hasSurfaceInfo) {
      setShowRevealAnim(true)
      const timer = setTimeout(() => setShowRevealAnim(false), 3000)
      return () => clearTimeout(timer)
    }
    prevDeepRef.current = isDeepRevealed
  }, [isDeepRevealed, hasSurfaceInfo])

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      state?.presented
        ? 'border-gray-800 bg-gray-900/30 opacity-70'
        : showSurface
          ? isExpanded
            ? 'border-blue-700/50 bg-gray-800/60 shadow-lg shadow-blue-500/5'
            : 'border-blue-800/30 bg-gray-800/40 hover:border-blue-700/40'
          : isExpanded
            ? 'border-amber-700/50 bg-gray-800/60 shadow-lg shadow-amber-500/5'
            : 'border-gray-700 bg-gray-800/40 hover:border-gray-600'
    }`}>
      {/* 헤더 */}
      <button onClick={onToggle} className="w-full text-left px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Emoji char={TYPE_ICON[ev.type] ?? '📄'} size={18} />
          <EvidenceVisual type={ev.type} name={displayName} reliability={ev.reliability} completeness={ev.completeness} size="sm" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className={`text-sm truncate font-medium ${showSurface ? 'text-blue-200' : 'text-gray-200'}`}>{displayName}</span>
              {showSurface && <span className="bg-blue-600 text-blue-100 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">조사 필요</span>}
              {isRecommended && <span className="bg-amber-600 text-amber-100 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">추천</span>}
              {isNew && <span className="bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0">N</span>}
              {state?.presented && <span className="text-emerald-500 text-xs"><Emoji char="✓" size={10} />제시</span>}
              {legWarning && <Emoji char="⚠" size={12} />}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              {/* 감별 상태에 따른 신뢰도 표시 */}
              {appraisal ? (
                <span className={`text-xs flex items-center gap-0.5 ${
                  appraisal.verdict === 'trustworthy' ? 'text-emerald-400/80' :
                  appraisal.verdict === 'suspicious' ? 'text-red-400/80' :
                  appraisal.verdict === 'partial' ? 'text-amber-400/80' :
                  'text-gray-500'
                }`}>
                  {appraisal.verdict === 'trustworthy' ? <><Emoji char="✅" size={12} /> 신뢰</> :
                   appraisal.verdict === 'suspicious' ? <><Emoji char="❌" size={12} /> 의심</> :
                   appraisal.verdict === 'partial' ? <><Emoji char="⚠️" size={12} /> 부분 신뢰</> : '미감별'}
                </span>
              ) : (
                <span className="text-xs text-gray-600 flex items-center gap-0.5">
                  {investigatedCount >= 2 ? <><Emoji char="🔍" size={12} /> 감별 가능</> : '미감별'}
                </span>
              )}
              {/* 조사 진행도 */}
              <div className="flex gap-0.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < investigatedCount ? 'bg-amber-500' : 'bg-gray-700'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <span className={`text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {/* 확장 */}
      {isExpanded && (
        <div className="px-3 pb-3 space-y-2 border-t border-gray-800">
          {/* 증거 비주얼 미리보기 */}
          <div className="flex justify-center pt-2">
            <EvidenceVisual
              type={ev.type} name={displayName} description={displayDescription}
              reliability={ev.reliability} completeness={ev.completeness}
              highlighted={isRecommended} size="md"
            />
          </div>
          {/* 심층 조사로 실체가 드러났을 때 알림 */}
          {hasSurfaceInfo && isDeepRevealed && (
            <div className={`bg-amber-900/30 border border-amber-700/40 rounded-lg px-2.5 py-1.5 text-xs text-amber-300 mt-2 animate-fade-in ${showRevealAnim ? 'animate-pulse' : ''}`}>
              <Emoji char="🔓" size={12} /> 조사를 통해 증거의 실체가 드러났습니다
            </div>
          )}
          {showSurface && (
            <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg px-2.5 py-1.5 text-xs text-blue-300/80 mt-2">
              <Emoji char="🔎" size={12} /> 표면 정보만 확인 가능합니다. 조사하면 상세 내용이 드러납니다.
            </div>
          )}
          <p className={`text-xs mt-2 leading-relaxed ${showSurface ? 'text-blue-300/70' : 'text-gray-400'}`}>{displayDescription}</p>

          {/* 조사 결과 (공개된 것만) */}
          {investigatedCount > 0 && (
            <div className="space-y-1">
              {KEY_ORDER.slice(0, investigatedCount).map(key => {
                const result = ev.investigationResults?.[key]
                if (!result) return null
                return (
                  <div key={key} className="bg-gray-800/60 rounded-lg px-2.5 py-1.5 text-xs">
                    <span className="text-amber-400/80 font-semibold">{INVESTIGATION_LABELS[key]}: </span>
                    <span className="text-gray-300">{result}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* 버튼 영역 */}
          <div className="flex gap-2">
            {!fullyInvestigated && (
              <button
                onClick={onInvestigate}
                disabled={!canInvestigate}
                className={`flex-1 text-xs py-2 rounded-xl font-semibold transition-all active:scale-95 ${
                  canInvestigate
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    : 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                }`}
              >
                <Emoji char="🔍" size={12} /> 조사 ({investigatedCount}/3) {canInvestigate ? '· 토큰 1' : '· 토큰 부족'}
              </button>
            )}
            {fullyInvestigated && !appraisal && (
              <div className="flex-1 text-xs py-2 text-center text-emerald-400/60"><Emoji char="✓" size={12} /> 조사 완료</div>
            )}
            {/* 감별 버튼 — 조사 2회 이상 + 아직 미감별 */}
            {canDoAppraise && !appraisal && onAppraise && (
              <button
                onClick={onAppraise}
                className="flex-1 text-xs py-2 rounded-xl font-bold bg-cyan-800 hover:bg-cyan-700 text-cyan-100 transition-all active:scale-95"
              >
                <Emoji char="🔍" size={12} /> 증거 감별
              </button>
            )}
            {appraisal && (
              <div className={`flex-1 text-xs py-2 text-center rounded-xl ${
                appraisal.verdict === 'trustworthy' ? 'text-emerald-400/80 bg-emerald-950/20' :
                appraisal.verdict === 'suspicious' ? 'text-red-400/80 bg-red-950/20' :
                'text-amber-400/80 bg-amber-950/20'
              }`}>
                {appraisal.verdict === 'trustworthy' ? <><Emoji char="✅" size={12} /> 신뢰 판정</> :
                 appraisal.verdict === 'suspicious' ? <><Emoji char="❌" size={12} /> 의심 판정</> :
                 <><Emoji char="⚠️" size={12} /> 부분 신뢰</>}
              </div>
            )}
            {canPresent && onPresent && !showPresent && (
              <button
                onClick={() => { if (llmMode && onConfront) setShowPresent(true); else onPresent() }}
                className="flex-1 text-xs py-2 rounded-xl font-bold bg-amber-700 hover:bg-amber-600 text-white transition-all active:scale-95"
              >
                <Emoji char="📤" size={12} /> 제시
              </button>
            )}
          </div>

          {/* 증거 제시 패널 — 자동 제안 + 직접 입력 */}
          {showPresent && (
            <div className="space-y-2 mt-1 animate-fade-in">
              {/* 자동 제안 질문 */}
              <p className="text-xs text-gray-400">질문과 함께 제시하면 더 효과적입니다:</p>
              <div className="space-y-1">
                {generateSuggestions(ev, state, target).map((q, i) => (
                  q.locked ? (
                    <div key={i}
                      className="w-full text-left text-xs px-3 py-2 rounded-lg bg-gray-800/30 border border-gray-700/20 text-gray-600"
                    >
                      <Emoji char="🔒" size={12} /> {q.hint}
                    </div>
                  ) : (
                    <button key={i}
                      onClick={() => { onConfront?.(q.text); setShowPresent(false); setConfrontText('') }}
                      className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all active:scale-[0.98] ${
                        q.stage && q.stage > 0
                          ? 'bg-amber-950/30 border-amber-600/40 hover:border-amber-500 hover:bg-amber-950/40 text-amber-200'
                          : 'bg-gray-800/60 border-gray-700/40 hover:border-amber-600 hover:bg-amber-950/20 text-gray-300'
                      }`}
                    >
                      {q.stage && q.stage > 0 && (
                        <span className="inline-block mr-1.5 text-[10px] font-bold bg-amber-600/30 text-amber-400 px-1.5 py-0.5 rounded">
                          <Emoji char="🔍" size={10} /> 조사 {q.stage}단계
                        </span>
                      )}
                      <Emoji char="💬" size={12} /> {q.text}
                    </button>
                  )
                ))}
              </div>

              {/* 직접 입력 제거 — V3 Blueprint 우회 방지 */}

              {/* 질문 없이 제시 */}
              <div className="flex gap-2">
                <button onClick={() => { setShowPresent(false); setConfrontText('') }}
                  className="flex-1 text-xs py-1.5 rounded-lg bg-gray-800/40 text-gray-500">취소</button>
                <button onClick={() => { onPresent?.(); setShowPresent(false); setConfrontText('') }}
                  className="flex-1 text-xs py-1.5 rounded-lg bg-gray-700/60 text-gray-400">질문 없이 제시</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
