import { useState, useEffect } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { GamePhase } from '../../types'
import type { DialogueEntry } from '../../types'
import { isLLMMode } from '../../hooks/useActionDispatch'
import { generatePhase1Dialogues, generatePhase2Dialogues } from '../../engine/llmPhaseDialogue'
import { stopBgm } from '../../engine/soundEngine'
import Emoji from '../common/Emoji'

type Step = 'parties' | 'context' | 'disputes' | 'history' | 'ready'
const STEPS: Step[] = ['parties', 'context', 'disputes', 'history', 'ready']

/** AI 사전 로딩 결과를 전역에 캐시 — Phase 1/2에서 사용 */
let prefetchedPhase1: Omit<DialogueEntry, 'id'>[] | null = null
let prefetchedPhase2: Omit<DialogueEntry, 'id'>[] | null = null
let prefetchStarted = false

/** AutoDialoguePhase 내부에서 호출 — 소비 후 null 처리 */
export function consumePrefetchedPhase1(): Omit<import('../../types').DialogueEntry, 'id'>[] | null {
  const result = prefetchedPhase1
  prefetchedPhase1 = null
  return result
}

export function consumePrefetchedPhase2(): Omit<import('../../types').DialogueEntry, 'id'>[] | null {
  const result = prefetchedPhase2
  prefetchedPhase2 = null
  return result
}

export function resetPrefetch() {
  prefetchedPhase1 = null
  prefetchedPhase2 = null
  prefetchStarted = false
}

export default function Phase0_CaseIntro() {
  const caseData = useGameStore((s) => s.caseData)
  const advancePhase = useGameStore((s) => s.advancePhase)
  const [step, setStep] = useState<Step>('parties')
  const [aiReady, setAiReady] = useState(false)

  // 타이틀 BGM 정지 — Stage 진입 시
  useEffect(() => { stopBgm() }, [])

  // AI 사전 로딩 — 첫 스텝부터 백그라운드 시작
  useEffect(() => {
    if (!caseData || prefetchStarted || !isLLMMode()) return
    prefetchStarted = true

    // Phase2 AI prefetch — 백그라운드 (유저 대기 없음)
    generatePhase2Dialogues(caseData)
      .then(r => { prefetchedPhase2 = r })
      .catch(() => { /* 실패해도 폴백 사용 */ })
  }, [caseData])

  if (!caseData) return null

  const { duo, context } = caseData
  const currentIdx = STEPS.indexOf(step)
  const isLast = step === 'ready'

  const goNext = () => {
    const nextIdx = currentIdx + 1
    // history 스텝 스킵 조건: ledger가 없으면
    if (STEPS[nextIdx] === 'history' && duo.relationshipLedger.length === 0) {
      setStep('ready')
    } else if (nextIdx < STEPS.length) {
      setStep(STEPS[nextIdx])
    }
  }

  const goBack = () => {
    if (currentIdx > 0) {
      const prevIdx = currentIdx - 1
      if (STEPS[prevIdx] === 'history' && duo.relationshipLedger.length === 0) {
        setStep('disputes')
      } else {
        setStep(STEPS[prevIdx])
      }
    }
  }

  const handleStart = () => {
    advancePhase(GamePhase.Phase1_InitialStatement)
  }

  const handleExit = () => {
    useGameStore.getState().clearSavedGame?.()
    useGameStore.setState({ caseData: null })
    useGameStore.getState().setPhase(GamePhase.Phase0_CaseIntro)
    useGameStore.getState().clearDialogue()
  }

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto">
      {/* 상단: 나가기 + 진행 표시 */}
      <div className="flex items-center px-4 pt-3 pb-1">
        <button onClick={handleExit} className="text-gray-500 hover:text-white text-xs mr-2 shrink-0">← 나가기</button>
        <div className="flex-1" />
      </div>
      <div className="px-5 pt-1 pb-2">
        <div className="flex items-center gap-1 justify-center">
          {STEPS.filter(s => s !== 'history' || duo.relationshipLedger.length > 0).map((s, i) => (
            <div key={s} className={`h-1 rounded-full transition-all duration-300 ${
              STEPS.indexOf(s) <= currentIdx ? 'bg-amber-500 w-8' : 'bg-gray-700 w-4'
            }`} />
          ))}
        </div>
        <div className="text-center mt-2">
          <span className="text-amber-500/80 text-xs font-semibold tracking-[0.15em]">사건 개요</span>
          <span className="text-xs text-gray-600 ml-2">{getRelationLabel(duo.relationshipType)}</span>
        </div>
      </div>

      {/* 중앙: 컨텐츠 */}
      <div className="flex-1 flex flex-col justify-center px-5 overflow-y-auto">
        <div className="animate-fade-in" key={step}>

          {step === 'parties' && (
            <div className="space-y-4">
              <h3 className="text-center text-sm text-gray-400 mb-4">당사자 소개</h3>
              <PersonCard
                name={duo.partyA.name}
                age={duo.partyA.age}
                occupation={duo.partyA.occupation}
                trait={getArchetypeLabel(duo.partyA.archetype)}
                emoji="👨"
                color="blue"
                side="A측"
              />
              <div className="text-center text-gray-600 font-black text-sm">VS</div>
              <PersonCard
                name={duo.partyB.name}
                age={duo.partyB.age}
                occupation={duo.partyB.occupation}
                trait={getArchetypeLabel(duo.partyB.archetype)}
                emoji="👩"
                color="rose"
                side="B측"
              />
            </div>
          )}

          {step === 'context' && (
            <div className="space-y-4">
              <div className="text-center">
                <Emoji char="📍" size={30} />
                <h3 className="text-sm font-bold text-gray-300 mt-2">배경 상황</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed bg-gray-900/60 border border-gray-800/60 rounded-xl p-4">
                {context.description}
              </p>
              {context.triggerAmplifier && (
                <p className="text-xs text-amber-400/70 bg-amber-950/20 border border-amber-800/20 rounded-lg p-3 leading-relaxed">
                  <Emoji char="⚡" size={12} /> {context.triggerAmplifier}
                </p>
              )}
              {/* 관련 인물 */}
              {duo.socialGraph.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs text-gray-500 mb-2"><Emoji char="👥" size={12} /> 관련 인물</div>
                  <div className="flex flex-wrap gap-2">
                    {duo.socialGraph
                      .filter(tp => tp.slot === 'family_1' || tp.slot === 'family_2' || tp.slot === 'acquaintance_1')
                      .slice(0, 3)
                      .map((tp) => {
                        // 이름에서 역할/직업 제거 (진실 스포일러 방지)
                        const displayName = tp.name.replace(/\s*[（(][^)）]+[)）]\s*$/, '')
                        // 관계만 표시: 가족이면 슬롯 기반, 아니면 중립
                        const relation = tp.relationTo === 'a' ? `${caseData.duo.partyA.name.slice(0, 3)} 측`
                          : tp.relationTo === 'b' ? `${caseData.duo.partyB.name.slice(0, 3)} 측`
                          : '관련인'
                        return (
                          <div key={tp.id} className="flex items-center gap-1.5 text-xs bg-gray-800/60 ring-1 ring-gray-700/50 rounded-full px-3 py-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              tp.bias === 'pro_a' ? 'bg-blue-400' :
                              tp.bias === 'pro_b' ? 'bg-rose-400' : 'bg-gray-400'
                            }`} />
                            <span className="text-gray-300">{displayName}</span>
                            <span className="text-gray-600">({relation})</span>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'disputes' && (() => {
            // 초기에는 핵심(high) 쟁점 최대 2개만 노출, 나머지는 숨김
            const initialDisputes = caseData.disputes
              .filter(d => d.weight === 'high' && d.quadrant !== 'neither_knows' && d.quadrant !== 'shared_misconception')
              .slice(0, 2)
            const remainingCount = caseData.disputes.length - initialDisputes.length
            return (
            <div className="space-y-3">
              <div className="text-center">
                <Emoji char="⚡" size={30} />
                <h3 className="text-sm font-bold text-gray-300 mt-2">주요 쟁점</h3>
                <p className="text-xs text-gray-600 mt-1">심문을 통해 진실을 밝혀야 합니다</p>
              </div>
              <div className="space-y-2">
                {initialDisputes.map((d, i) => (
                  <div key={d.id} className="flex items-center gap-3 rounded-xl p-3 bg-red-950/30 border border-red-800/30">
                    <span className="text-lg font-bold w-7 text-center text-red-400">{i + 1}</span>
                    <div className="flex-1">
                      <span className="text-sm text-gray-200">{d.name}</span>
                      <span className="ml-2 text-xs text-red-400/60">핵심</span>
                    </div>
                  </div>
                ))}
              </div>
              {remainingCount > 0 && (
                <p className="text-xs text-gray-600 text-center mt-2">
                  심문 과정에서 추가 쟁점이 드러날 수 있습니다
                </p>
              )}
            </div>
            )
          })()}

          {step === 'history' && (
            <div className="space-y-3">
              <div className="text-center">
                <Emoji char="📂" size={30} />
                <h3 className="text-sm font-bold text-gray-300 mt-2">과거 이력</h3>
                <p className="text-xs text-gray-600 mt-1">두 사람 사이에 쌓인 감정의 역사</p>
              </div>
              <div className="space-y-2">
                {duo.relationshipLedger
                  .filter((l) => caseData.activeLedgerEntries.includes(l.id) || l.connectionToCurrent === 'direct')
                  .slice(0, 3)
                  .map((l) => (
                    <div key={l.id} className="bg-gray-900/60 border border-gray-800/60 rounded-xl p-3">
                      <div className="flex items-start gap-2">
                        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          l.category === 'confirmed' ? 'bg-emerald-500/15 text-emerald-400' :
                          l.category === 'distorted' ? 'bg-amber-500/15 text-amber-400' :
                          'bg-gray-500/15 text-gray-400'
                        }`}>{l.category === 'confirmed' ? '✓' : l.category === 'distorted' ? '?' : '…'}</span>
                        <div>
                          <span className="text-xs text-gray-400 leading-relaxed">{l.description}</span>
                          <span className={`block text-xs mt-1 ${
                            l.category === 'confirmed' ? 'text-emerald-500/50' :
                            l.category === 'distorted' ? 'text-amber-500/50' : 'text-gray-600'
                          }`}>{l.category === 'confirmed' ? '양쪽 일치' : l.category === 'distorted' ? '기억이 다름' : '묻어둔 일'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {step === 'ready' && (
            <div className="text-center space-y-6">
              <div>
                <Emoji char="⚖️" size={48} />
                <h3 className="text-lg font-bold text-amber-400 mt-3">재판 준비 완료</h3>
                <p className="text-sm text-gray-500 mt-2">
                  {duo.partyA.name}과 {duo.partyB.name}의<br />초기 진술을 들을 준비가 되셨습니까?
                </p>
              </div>
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-950 font-bold px-12 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-600/20 active:scale-95 text-base"
              >
                초기 진술 듣기 →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 하단: 네비게이션 */}
      {!isLast && (
        <div className="px-5 pb-6 pt-2">
          <div className="flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={currentIdx === 0}
              className={`text-sm px-4 py-2 rounded-lg ${currentIdx === 0 ? 'text-gray-700' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              ← 이전
            </button>
            <button
              onClick={goNext}
              className="text-sm px-6 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-semibold"
            >
              다음 →
            </button>
          </div>
        </div>
      )}
      {isLast && (
        <div className="px-5 pb-6 pt-2">
          <button
            onClick={() => setStep('parties')}
            className="w-full text-xs text-gray-600 hover:text-gray-400 py-2"
          >
            ← 사건 정보 다시 보기
          </button>
        </div>
      )}
    </div>
  )
}

function PersonCard({ name, age, occupation, trait, emoji, color, side }: {
  name: string; age: number; occupation: string; trait: string; emoji: string; color: string; side: string
}) {
  const ring = color === 'blue' ? 'ring-blue-500/40' : 'ring-rose-500/40'
  const bg = color === 'blue' ? 'bg-blue-950/30' : 'bg-rose-950/30'
  const nameColor = color === 'blue' ? 'text-blue-400' : 'text-rose-400'
  const gradient = color === 'blue' ? 'from-blue-600/15 to-transparent' : 'from-rose-600/15 to-transparent'

  return (
    <div className={`rounded-xl p-4 ring-1 ${ring} ${bg} bg-gradient-to-b ${gradient}`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full bg-gray-800 ring-2 ${ring} flex items-center justify-center text-xl`}>
          <Emoji char={emoji} size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-base font-bold ${nameColor}`}>{name}</span>
            <span className="text-xs text-gray-500">{age}세</span>
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{occupation}</div>
          <div className="text-xs text-gray-500 mt-0.5">{trait}</div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded ${color === 'blue' ? 'bg-blue-500/15 text-blue-400' : 'bg-rose-500/15 text-rose-400'}`}>{side}</span>
      </div>
    </div>
  )
}

function getRelationLabel(type: string) {
  const map: Record<string, string> = {
    spouse: '부부', neighbor: '이웃', boss_employee: '직장', partnership: '동업',
    family: '가족', tenant_landlord: '세입자-집주인', friend: '친구',
  }
  return map[type] ?? type
}

function getArchetypeLabel(type: string) {
  const map: Record<string, string> = {
    avoidant: '회피형', confrontational: '정면돌파형', victim_cosplay: '피해자형', cold_logic: '냉정논리형',
  }
  return map[type] ?? type
}
