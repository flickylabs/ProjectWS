import { useState, useEffect } from 'react'
import type { DialogueEntry as DialogueEntryType } from '../../types'
import { useGameStore } from '../../store/useGameStore'

interface Props {
  entry: DialogueEntryType
  animate?: boolean
}

export default function DialogueEntry({ entry, animate = false }: Props) {
  const caseData = useGameStore((s) => s.caseData)
  const nameA = caseData?.duo.partyA.name ?? 'A'
  const nameB = caseData?.duo.partyB.name ?? 'B'
  const [displayText, setDisplayText] = useState(animate ? '' : entry.text)
  const [done, setDone] = useState(!animate)

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
    return (
      <div className="flex justify-center my-2.5">
        <div className="bg-gray-800/50 text-gray-500 text-xs px-4 py-1.5 rounded-full max-w-[90%] text-center leading-relaxed">
          {displayText}
        </div>
      </div>
    )
  }

  const isA = entry.speaker === 'a'
  const isB = entry.speaker === 'b'
  const name = isA ? nameA : isB ? nameB : '재판관'
  const align = isA ? 'items-start' : isB ? 'items-end' : 'items-center'

  // 컬러 시스템 — 팔레트 기반
  const config = isA ? {
    nameColor: 'text-blue-400',
    bubble: 'bg-blue-950/50 border-blue-800/30',
    bar: 'bg-blue-500',
    avatar: '👨',
    avatarRing: 'ring-blue-500/40',
  } : isB ? {
    nameColor: 'text-rose-400',
    bubble: 'bg-rose-950/50 border-rose-800/30',
    bar: 'bg-rose-500',
    avatar: '👩',
    avatarRing: 'ring-rose-500/40',
  } : {
    nameColor: 'text-amber-400',
    bubble: 'bg-amber-950/40 border-amber-800/30',
    bar: 'bg-amber-500',
    avatar: '⚖️',
    avatarRing: 'ring-amber-500/40',
  }

  return (
    <div className={`flex flex-col ${align} my-2 ${!done ? 'opacity-90' : ''}`}>
      {/* 이름 + 아바타 */}
      <div className={`flex items-center gap-1.5 mb-1 ${isB ? 'flex-row-reverse' : ''}`}>
        <div className={`w-5 h-5 rounded-full bg-gray-800 ring-1 ${config.avatarRing} flex items-center justify-center text-xs`}>
          {config.avatar}
        </div>
        <span className={`text-xs font-semibold ${config.nameColor}`}>{name}</span>
      </div>

      {/* 말풍선 */}
      <div className={`border rounded-2xl ${isA ? 'rounded-tl-sm' : isB ? 'rounded-tr-sm' : ''} px-3.5 py-2.5 max-w-[85%] ${config.bubble}`}>
        <p className="text-sm text-gray-200 leading-relaxed">{displayText}{!done && <span className="animate-pulse text-amber-400">|</span>}</p>
        {done && entry.behaviorHint && (
          <p className="text-xs text-gray-500/80 mt-1.5 italic leading-relaxed">💡 {entry.behaviorHint}</p>
        )}
      </div>
    </div>
  )
}
