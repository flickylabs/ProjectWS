import { useMemo, useState } from 'react'
import type { PartyId } from '../../types'
import { useGameStore } from '../../store/useGameStore'
import { useActionDispatch } from '../../hooks/useActionDispatch'
import { getAvailableWitnesses } from '../../engine/witnessEngine'
import { playClick, playEvidenceUnlock } from '../../engine/soundEngine'
import Emoji from '../common/Emoji'

interface Props {
  target: PartyId | null
  onPresent: (evidenceId: string) => void
  onConfront?: (evidenceId: string, question: string) => void
  onWitnessCalled?: () => void
  llmMode?: boolean
  /** 새로 해금되어 아직 확인하지 않은 증거 ID 목록 */
  newEvidenceIds?: Set<string>
}

/** investigationResults에서 핵심 3개를 순서대로 추출 */
const KEY_ORDER = ['request_original', 'restore_context', 'check_edits'] as const

export default function EvidencePresenter({ target, onPresent, onConfront, onWitnessCalled, llmMode, newEvidenceIds }: Props) {
  const evidenceStates = useGameStore((s) => s.evidenceStates)
  const evidenceDefinitions = useGameStore((s) => s.evidenceDefinitions)
  const resources = useGameStore((s) => s.resources)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const dispatch = useActionDispatch()

  const { available, presented, locked } = useMemo(() => {
    const avail = evidenceDefinitions.filter((e) => evidenceStates[e.id]?.unlocked && !evidenceStates[e.id]?.presented)
    const pres = evidenceDefinitions.filter((e) => evidenceStates[e.id]?.presented)
    const lock = evidenceDefinitions.filter((e) => !evidenceStates[e.id]?.unlocked)
    return { available: avail, presented: pres, locked: lock }
  }, [evidenceDefinitions, evidenceStates])

  const handleInvestigate = (evidenceId: string) => {
    const state = evidenceStates[evidenceId]
    if (!state) return

    // 다음 조사할 키 찾기
    const nextKey = KEY_ORDER.find(k => !state.investigatedActions.includes(k))
    if (!nextKey) return

    if (resources.investigationTokens < 1) {
      useGameStore.getState().addDialogue({
        speaker: 'system', text: '조사 토큰이 부족합니다.', relatedDisputes: [], turn: useGameStore.getState().turnCount,
      })
      return
    }

    playClick()

    // 3번째 조사(완료) 시 MatchingPuzzle 미니게임 트리거
    if (state.investigatedActions.length === 2) {
      useGameStore.getState().spend('investigationTokens', 1)
      useGameStore.getState().setPendingMinigame({ type: 'evidence_depth', evidenceId, depth: 3 })
      return
    }

    useGameStore.getState().spend('investigationTokens', 1)
    dispatch({ type: 'evidence_investigate', evidenceId, subAction: nextKey })
  }

  if (!target) return null

  return (
    <div className="space-y-2 animate-fade-in">
      {available.length > 0 && (
        <>
          <div className="text-xs text-gray-400">제시 가능 ({available.length})</div>
          {available.map((ev) => (
            <EvidenceCard
              key={ev.id} ev={ev} state={evidenceStates[ev.id]}
              isExpanded={expandedId === ev.id}
              onToggle={() => setExpandedId(expandedId === ev.id ? null : ev.id)}
              onPresent={() => onPresent(ev.id)}
              onConfront={onConfront ? (text) => onConfront(ev.id, text) : undefined}
              onInvestigate={() => handleInvestigate(ev.id)}
              canPresent canInvestigate={resources.investigationTokens >= 1}
              llmMode={llmMode}
              isNew={newEvidenceIds?.has(ev.id)}
            />
          ))}
        </>
      )}
      {presented.length > 0 && (
        <>
          <div className="text-xs text-gray-500 mt-1">제시 완료 ({presented.length})</div>
          {presented.map((ev) => (
            <EvidenceCard
              key={ev.id} ev={ev} state={evidenceStates[ev.id]}
              isExpanded={expandedId === ev.id}
              onToggle={() => setExpandedId(expandedId === ev.id ? null : ev.id)}
              onInvestigate={() => handleInvestigate(ev.id)}
              canPresent={false} canInvestigate={resources.investigationTokens >= 1}
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

  const available = useMemo(() => {
    if (!caseData) return []
    return getAvailableWitnesses(calledWitnesses, caseData)
  }, [caseData, calledWitnesses])

  const called = useMemo(() => {
    if (!caseData) return []
    return caseData.duo.socialGraph.filter(tp => calledWitnesses.includes(tp.id))
  }, [caseData, calledWitnesses])

  if (!caseData || (available.length === 0 && called.length === 0)) return null

  const canAfford = resources.investigationTokens >= 1

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
                    {w.witnessedDirectly ? '직접 목격' : '전해 들음'} · {w.knowledgeScope.slice(0, 50)}...
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

/** 증거 기반 자동 제안 질문 생성 */
function generateSuggestions(ev: any, state: any): string[] {
  const suggestions: string[] = []
  const investigatedCount = state?.investigatedActions?.filter((a: string) => KEY_ORDER.includes(a as any))?.length ?? 0

  // 증거 유형별 기본 제안
  const typeQuestions: Record<string, string> = {
    bank: '이 거래 내역에 대해 설명해주세요.',
    chat: '이 대화 내용이 사실입니까?',
    cctv: '이 영상에 찍힌 게 본인이 맞습니까?',
    contract: '이 계약 내용을 인정하십니까?',
    testimony: '이 증언 내용에 대해 어떻게 생각하십니까?',
    log: '이 기록에 대해 설명해주세요.',
    device: '이 기기 데이터를 확인하셨습니까?',
    sns: '이 게시물을 직접 올리셨습니까?',
  }
  suggestions.push(typeQuestions[ev.type] ?? '이 증거에 대해 설명해주세요.')

  // 조사 결과 기반 추가 제안
  if (investigatedCount > 0 && ev.investigationResults) {
    const results = KEY_ORDER.slice(0, investigatedCount).map((k: string) => ev.investigationResults[k]).filter(Boolean)
    if (results.length > 0) {
      const lastResult = results[results.length - 1]
      if (lastResult.includes('캡처') || lastResult.includes('발췌') || lastResult.includes('일부'))
        suggestions.push('왜 전체가 아닌 일부만 제출하셨습니까?')
      else if (lastResult.includes('편집') || lastResult.includes('조작'))
        suggestions.push('이 증거가 조작되지 않았다고 확신합니까?')
      else
        suggestions.push('이 증거의 출처를 설명해주세요.')
    }
  }

  // reliability 기반
  if (ev.reliability === 'soft')
    suggestions.push('이 증거만으로는 부족한데, 추가로 증명할 수 있습니까?')

  return suggestions.slice(0, 3)
}

function EvidenceCard({ ev, state, isExpanded, onToggle, onPresent, onConfront, onInvestigate, canPresent, canInvestigate, llmMode, isNew }: {
  ev: any; state: any; isExpanded: boolean
  onToggle: () => void; onPresent?: () => void; onConfront?: (text: string) => void
  onInvestigate: () => void; canPresent: boolean; canInvestigate: boolean; llmMode?: boolean
  isNew?: boolean
}) {
  const [showPresent, setShowPresent] = useState(false)
  const [confrontText, setConfrontText] = useState('')
  const investigatedCount = state?.investigatedActions?.filter((a: string) => KEY_ORDER.includes(a as any))?.length ?? 0
  const fullyInvestigated = investigatedCount >= 3
  const legWarning = ev.legitimacy !== 'lawful'

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      state?.presented
        ? 'border-gray-800 bg-gray-900/30 opacity-70'
        : isExpanded
          ? 'border-amber-700/50 bg-gray-800/60 shadow-lg shadow-amber-500/5'
          : 'border-gray-700 bg-gray-800/40 hover:border-gray-600'
    }`}>
      {/* 헤더 */}
      <button onClick={onToggle} className="w-full text-left px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Emoji char={TYPE_ICON[ev.type] ?? '📄'} size={18} />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-gray-200 truncate font-medium">{ev.name}</span>
              {isNew && <span className="bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0">N</span>}
              {state?.presented && <span className="text-emerald-500 text-xs"><Emoji char="✓" size={10} />제시</span>}
              {legWarning && <Emoji char="⚠" size={12} />}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xs ${ev.reliability === 'hard' ? 'text-emerald-500/60' : 'text-yellow-500/60'}`}>
                {ev.reliability === 'hard' ? 'Hard' : 'Soft'}
              </span>
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
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">{ev.description}</p>

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
            {fullyInvestigated && (
              <div className="flex-1 text-xs py-2 text-center text-emerald-400/60"><Emoji char="✓" size={12} /> 조사 완료</div>
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
                {generateSuggestions(ev, state).map((q, i) => (
                  <button key={i}
                    onClick={() => { onConfront?.(q); setShowPresent(false); setConfrontText('') }}
                    className="w-full text-left text-xs px-3 py-2 rounded-lg bg-gray-800/60 border border-gray-700/40 hover:border-amber-600 hover:bg-amber-950/20 text-gray-300 transition-all active:scale-[0.98]"
                  >
                    <Emoji char="💬" size={12} /> {q}
                  </button>
                ))}
              </div>

              {/* 직접 입력 (고득점) */}
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={confrontText}
                  onChange={e => setConfrontText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && confrontText.trim().length >= 2 && onConfront) { onConfront(confrontText.trim()); setShowPresent(false); setConfrontText('') } }}
                  placeholder="직접 추궁 (고득점)"
                  maxLength={120}
                  className="flex-1 bg-gray-900 border border-amber-800/40 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => { if (confrontText.trim().length >= 2 && onConfront) { onConfront(confrontText.trim()); setShowPresent(false); setConfrontText('') } }}
                  disabled={confrontText.trim().length < 2}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${confrontText.trim().length >= 2 ? 'bg-amber-600 text-gray-950' : 'bg-gray-800 text-gray-600'}`}
                ><Emoji char="⚔️" size={14} /></button>
              </div>

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
