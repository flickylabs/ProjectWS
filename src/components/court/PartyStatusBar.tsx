import { useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { INITIAL_RESOURCES } from '../../utils/constants'
import Emoji from '../common/Emoji'

const EMOTION_EMOJI: Record<string, string> = {
  defensive: '😐', confident: '😤', shaken: '😰', angry: '😡', resigned: '😞',
}


export default function PartyStatusBar() {
  const caseData = useGameStore((s) => s.caseData)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)
  const resources = useGameStore((s) => s.resources)
  const separationTarget = useGameStore((s) => s.separationTarget)
  const [showInfo, setShowInfo] = useState<'a' | 'b' | null>(null)

  if (!caseData) return null

  const phaseA = agentA.emotionalState.phase
  const phaseB = agentB.emotionalState.phase
  const aExcluded = separationTarget === 'b'
  const bExcluded = separationTarget === 'a'

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-800/60 bg-gray-900/50 px-4 h-11 shrink-0">
        {/* A */}
        <button
          onClick={() => setShowInfo('a')}
          className={`flex items-center gap-2 active:scale-95 transition-all ${aExcluded ? 'opacity-30' : ''}`}
        >
          <Emoji char={aExcluded ? '🚪' : (EMOTION_EMOJI[phaseA] ?? '😐')} size={20} />
          <span className="text-sm font-bold text-blue-400">{caseData.duo.partyA.name}</span>
        </button>

        {/* 중앙: Stat */}
        <div className="flex items-center gap-3">
          <StatPill icon="🔍" value={resources.investigationTokens} max={INITIAL_RESOURCES.investigationTokens} color="text-blue-400" />
          <StatPill icon="⚡" value={resources.skillPoints} max={INITIAL_RESOURCES.skillPoints} color="text-amber-400" />
        </div>

        {/* B */}
        <button
          onClick={() => setShowInfo('b')}
          className={`flex items-center gap-2 active:scale-95 transition-all ${bExcluded ? 'opacity-30' : ''}`}
        >
          <span className="text-sm font-bold text-rose-400">{caseData.duo.partyB.name}</span>
          <Emoji char={bExcluded ? '🚪' : (EMOTION_EMOJI[phaseB] ?? '😐')} size={20} />
        </button>
      </div>

      {/* 캐릭터 정보 팝업 */}
      {showInfo && (
        <CharacterPopup
          party={showInfo}
          caseData={caseData}
          agent={showInfo === 'a' ? agentA : agentB}
          onClose={() => setShowInfo(null)}
        />
      )}
    </>
  )
}

function StatPill({ icon, value, max, color }: { icon: string; value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-1">
      <Emoji char={icon} size={14} />
      <span className={`text-sm font-bold ${value === 0 ? 'text-red-400' : color}`}>{value}<span className="text-gray-600 font-normal">/{max}</span></span>
    </div>
  )
}

function CharacterPopup({ party, caseData, agent, onClose }: {
  party: 'a' | 'b'; caseData: any; agent: any; onClose: () => void
}) {
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const nameColor = party === 'a' ? 'text-blue-400' : 'text-rose-400'
  const ringColor = party === 'a' ? 'ring-blue-500/40' : 'ring-rose-500/40'
  const emo = agent.emotionalState
  const lieEntries = Object.entries(agent.lieStateMap) as [string, any][]
  const turnCount = useGameStore.getState().turnCount

  // 해금 조건
  const hasAnyCollapse = lieEntries.some(([, e]) => e.currentState === 'S5')
  const hasShaken = emo.phase === 'shaken' || emo.phase === 'angry' || emo.phase === 'resigned'
  const advancedTurns = turnCount >= 5

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/80 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm max-h-[75vh] overflow-y-auto p-4 animate-fade-in" onClick={e => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-11 h-11 rounded-full bg-gray-800 ring-2 ${ringColor} flex items-center justify-center text-xl`}>
            <Emoji char={EMOTION_EMOJI[emo.phase] ?? '😐'} size={20} />
          </div>
          <div className="flex-1">
            <h3 className={`text-base font-bold ${nameColor}`}>{profile.name}</h3>
            <p className="text-xs text-gray-500">{profile.age}세 · {profile.occupation}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-lg"><Emoji char="✕" size={16} /></button>
        </div>

        {/* 기본 정보 — 항상 표시 */}
        <InfoRow label="성격" value={getArchetypeLabel(profile.archetype)} />

        {/* 해금: 5턴 이상 */}
        {advancedTurns ? (
          <InfoRow label="말투" value={profile.speechStyle} />
        ) : (
          <LockedRow label="말투" hint="5턴 이상 진행 시 해금" />
        )}

        {/* 해금: 동요/격앙/체념 감정 도달 */}
        {hasShaken ? (
          <InfoRow label="두려움" value={profile.fear} />
        ) : (
          <LockedRow label="두려움" hint="감정 변화 유발 시 해금" />
        )}

        {/* 현재 감정 — 항상 표시 */}
        <div className="bg-gray-800/60 rounded-xl p-3 my-3">
          <div className="text-xs text-gray-500 mb-0.5">현재 감정</div>
          <div className="text-sm font-bold text-gray-200">{getEmotionLabel(emo.phase)}</div>
        </div>

        {/* 쟁점별 상태 — 항상 표시 */}
        <div className="space-y-1">
          <div className="text-xs text-gray-500 mb-1">쟁점별 상태</div>
          {lieEntries.map(([dId, entry]) => {
            const dispute = caseData.disputes.find((d: any) => d.id === dId)
            return (
              <div key={dId} className="flex items-center justify-between text-xs bg-gray-800/40 rounded-lg px-2.5 py-2">
                <span className="text-gray-300">{dispute?.name ?? dId}</span>
                <span className={entry.currentState === 'S5' ? 'text-emerald-400 font-bold' : 'text-gray-500'}>
                  {getLieStateLabel(entry.currentState)}
                </span>
              </div>
            )
          })}
        </div>

        {/* 해금: 붕괴 달성 시 민감 포인트 */}
        {hasAnyCollapse ? (
          <div className="mt-3">
            <div className="text-xs text-gray-500 mb-1">민감 포인트</div>
            <div className="flex flex-wrap gap-1">
              {profile.sensitivePoints?.map((sp: string, i: number) => (
                <span key={i} className="text-xs bg-red-950/30 text-red-400 border border-red-800/30 rounded-full px-2 py-0.5">{sp}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <LockedRow label="민감 포인트" hint="거짓말 붕괴 달성 시 해금" />
          </div>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-xs text-gray-400 py-1.5 border-b border-gray-800/40">
      <span className="text-gray-300 font-semibold">{label}:</span> {value}
    </div>
  )
}

function LockedRow({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="text-xs text-gray-600 py-1.5 border-b border-gray-800/40">
      <span className="font-semibold">{label}:</span> <Emoji char="🔒" size={12} /> <span className="text-gray-700">{hint}</span>
    </div>
  )
}

function getArchetypeLabel(type: string) {
  const map: Record<string, string> = {
    avoidant: '회피형', confrontational: '정면돌파형', victim_cosplay: '피해자형', cold_logic: '냉정논리형',
  }
  return map[type] ?? type
}

function getEmotionLabel(phase: string) {
  const map: Record<string, string> = {
    defensive: '방어적 — 신중하게 말을 고르고 있습니다',
    confident: '자신감 — 자기 주장에 확신을 가지고 있습니다',
    shaken: '동요 — 흔들리고 있지만 아직 부정하고 있습니다',
    angry: '격앙 — 감정이 격해져 있습니다',
    resigned: '체념 — 더 이상 숨기려 하지 않습니다',
  }
  return map[phase] ?? phase
}

function getLieStateLabel(state: string) {
  const map: Record<string, string> = {
    S0: '완강히 부정', S1: '동요 시작', S2: '일부 인정', S3: '책임 전가', S4: '감정 호소', S5: '붕괴',
  }
  return map[state] ?? state
}
