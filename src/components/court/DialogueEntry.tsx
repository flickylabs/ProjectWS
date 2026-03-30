import { useState, useEffect } from 'react'
import type { DialogueEntry as DialogueEntryType } from '../../types'
import { useGameStore } from '../../store/useGameStore'
import Emoji, { replaceEmojisInText } from '../common/Emoji'

interface Props {
  entry: DialogueEntryType
  animate?: boolean
  onTestimonyClick?: () => void
}

/** 감정 상태 → 이모지 매핑 */
function getEmotionEmoji(speaker: string, emotionPhase?: string): string {
  if (speaker === 'judge') return '⚖️'

  const emojiMap: Record<string, Record<string, string>> = {
    a: {
      defensive: '😐', confident: '😤', shaken: '😰', angry: '😡', resigned: '😞',
    },
    b: {
      defensive: '😐', confident: '😤', shaken: '😰', angry: '😡', resigned: '😞',
    },
  }

  if (!emotionPhase || !emojiMap[speaker]) {
    return speaker === 'a' ? '👨' : '👩'
  }
  return emojiMap[speaker]?.[emotionPhase] ?? (speaker === 'a' ? '👨' : '👩')
}

export default function DialogueEntry({ entry, animate = false, onTestimonyClick }: Props) {
  const caseData = useGameStore((s) => s.caseData)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)
  const nameA = caseData?.duo.partyA.name ?? 'A'
  const nameB = caseData?.duo.partyB.name ?? 'B'
  const [displayText, setDisplayText] = useState(animate ? '' : entry.text)
  const [done, setDone] = useState(!animate)

  // animate가 false로 바뀌면 (새 대사 추가로 더 이상 마지막이 아닌 경우)
  // 전체 텍스트를 즉시 표시하고 완료 처리
  useEffect(() => {
    if (!animate && !done) {
      setDisplayText(entry.text)
      setDone(true)
    }
  }, [animate, done, entry.text])

  useEffect(() => {
    if (!animate) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayText(entry.text.slice(0, i))
      if (i >= entry.text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [animate, entry.text])

  // 시스템 메시지
  if (entry.speaker === 'system') {
    const isEvidence = entry.text.includes('증거') || entry.text.includes('🔓') || entry.text.includes('📄')
    const isCollapse = entry.text.includes('⚡') || entry.text.includes('💥')
    const isMultiHit = entry.text.includes('🎯')
    const isTestimony = entry.text.includes('진술 분석')

    // 진술 분석 — 클릭 가능한 특별 메시지
    if (isTestimony && onTestimonyClick) {
      return (
        <div className="flex justify-center my-2.5">
          <button onClick={onTestimonyClick}
            className="text-xs px-4 py-2 rounded-xl bg-cyan-950/40 text-cyan-300 ring-1 ring-cyan-600/30 hover:ring-cyan-500/50 hover:bg-cyan-900/40 transition-all active:scale-95 flex items-center gap-2">
            <Emoji char="📋" size={16} />
            <span>분석 완료 — 탭해서 확인</span>
          </button>
        </div>
      )
    }

    return (
      <div className={`flex justify-center my-2.5 ${isEvidence ? 'animate-evidence-slam' : isCollapse ? 'animate-shake' : ''}`}>
        <div
          className={`text-xs italic px-5 py-1.5 max-w-[90%] text-center leading-relaxed ${
            isCollapse ? 'bg-gray-950/80 text-amber-400/80 ring-1 ring-gray-600/30' :
            isEvidence ? 'bg-gray-950/80 text-amber-400 ring-1 ring-amber-500/20' :
            isMultiHit ? 'bg-gray-950/80 text-purple-400 ring-1 ring-purple-500/20' :
            'bg-gray-950/60 text-gray-500'
          }`}
          style={{ transform: 'skewX(-4deg)' }}
        >
          <span style={{ display: 'inline-block', transform: 'skewX(4deg)' }}>
            {replaceEmojisInText(displayText, 14)}
          </span>
        </div>
      </div>
    )
  }

  const isA = entry.speaker === 'a'
  const isB = entry.speaker === 'b'
  const isJudge = entry.speaker === 'judge'
  const isWitness = entry.speaker === 'witness'

  // 증인 — 편향 방향에 따라 좌(pro_a)/우(pro_b)/중앙(neutral/mixed) 배치, 녹색 계열
  if (isWitness) {
    const favor = entry.witnessFavor
    const witnessAlign = favor === 'pro_a' ? 'items-start' : favor === 'pro_b' ? 'items-end' : 'items-center'
    const witnessName = entry.witnessName ?? '증인'
    return (
      <div className={`flex flex-col ${witnessAlign} my-2 ${!done ? 'opacity-90' : ''}`}>
        {/* 증인 이름 + 아이콘 */}
        <div className={`flex items-center gap-1.5 mb-1 ${favor === 'pro_b' ? 'flex-row-reverse' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-gray-800 ring-2 ring-emerald-500/40 flex items-center justify-center text-sm">
            <Emoji char="🧑‍⚖️" size={18} />
          </div>
          <span className="text-xs font-semibold text-emerald-400">{witnessName}</span>
          <span className="text-[10px] text-emerald-600">증인</span>
        </div>
        {/* 증인 말풍선 — 녹색 계열 */}
        <div className={`border rounded-2xl ${favor === 'pro_a' ? 'rounded-tl-sm' : favor === 'pro_b' ? 'rounded-tr-sm' : ''} px-3.5 py-2.5 max-w-[85%] bg-emerald-950/40 border-emerald-800/30`}>
          <p className="text-sm text-gray-200 leading-relaxed">{displayText}{!done && <span className="animate-pulse text-emerald-400">|</span>}</p>
          {done && entry.behaviorHint && (
            <p className="text-xs text-emerald-500/50 mt-1.5 italic leading-relaxed border-t border-emerald-800/30 pt-1.5">
              {entry.behaviorHint}
            </p>
          )}
        </div>
      </div>
    )
  }

  // 재판관은 아이콘/라벨 없이 구분선 + 둥근 말풍선 (어두운 갈색, 중앙)
  if (isJudge) {
    return (
      <div className="my-3">
        <div className="border-t border-gray-700/40 mb-3" />
        <div className="flex justify-center">
          <div className="bg-amber-950/40 border border-amber-800/30 rounded-2xl px-4 py-2.5 max-w-[85%]">
            <p className="text-sm text-gray-200 leading-relaxed">{displayText}{!done && <span className="animate-pulse text-amber-400">|</span>}</p>
          </div>
        </div>
      </div>
    )
  }

  const name = isA ? nameA : nameB
  const align = isA ? 'items-start' : 'items-end'

  // 감정 기반 이모지
  const emotionPhase = isA ? agentA?.emotionalState?.phase : isB ? agentB?.emotionalState?.phase : undefined
  const avatar = getEmotionEmoji(entry.speaker, emotionPhase)

  // 감정 강도에 따른 말풍선 효과
  const isAngry = emotionPhase === 'angry'
  const isShaken = emotionPhase === 'shaken'

  const config = isA ? {
    nameColor: 'text-blue-400',
    bubble: isAngry ? 'bg-blue-950/70 border-blue-600/50' : 'bg-blue-950/50 border-blue-800/30',
    avatarRing: isAngry ? 'ring-red-500/60' : isShaken ? 'ring-yellow-500/40' : 'ring-blue-500/40',
  } : {
    nameColor: 'text-rose-400',
    bubble: isAngry ? 'bg-rose-950/70 border-rose-600/50' : 'bg-rose-950/50 border-rose-800/30',
    avatarRing: isAngry ? 'ring-red-500/60' : isShaken ? 'ring-yellow-500/40' : 'ring-rose-500/40',
  }

  return (
    <div className={`flex flex-col ${align} my-2 ${!done ? 'opacity-90' : ''} ${isAngry ? 'animate-shake' : ''}`}>
      {/* 이름 + 아바타 */}
      <div className={`flex items-center gap-1.5 mb-1 ${isB ? 'flex-row-reverse' : ''}`}>
        <div className={`w-7 h-7 rounded-full bg-gray-800 ring-2 ${config.avatarRing} flex items-center justify-center text-sm transition-all duration-300`}>
          <Emoji char={avatar} size={18} />
        </div>
        <span className={`text-xs font-semibold ${config.nameColor}`}>{name}</span>
        {emotionPhase && emotionPhase !== 'defensive' && (
          <span className={`text-xs ${
            emotionPhase === 'angry' ? 'text-red-400/60' :
            emotionPhase === 'shaken' ? 'text-yellow-400/60' :
            emotionPhase === 'confident' ? 'text-emerald-400/60' :
            'text-gray-600'
          }`}>
            {emotionPhase === 'angry' ? '격앙' :
             emotionPhase === 'shaken' ? '동요' :
             emotionPhase === 'confident' ? '자신감' :
             emotionPhase === 'resigned' ? '체념' : ''}
          </span>
        )}
      </div>

      {/* 말풍선 */}
      <div className={`border rounded-2xl ${isA ? 'rounded-tl-sm' : 'rounded-tr-sm'} px-3.5 py-2.5 max-w-[85%] transition-colors duration-300 ${entry.isConfidential ? 'bg-purple-950/40 border-purple-700/50' : config.bubble}`}>
        {entry.isConfidential && (
          <div className="flex items-center gap-1 mb-1.5 text-purple-400 text-xs font-semibold">
            <span>🔒</span><span>비공개 진술</span>
          </div>
        )}
        <p className="text-sm text-gray-200 leading-relaxed">{displayText}{!done && <span className="animate-pulse text-amber-400">|</span>}</p>
        {done && entry.behaviorHint && (
          <p className="text-xs text-gray-500/60 mt-1.5 italic leading-relaxed border-t border-gray-800/50 pt-1.5">
            {entry.behaviorHint}
          </p>
        )}
      </div>
    </div>
  )
}
