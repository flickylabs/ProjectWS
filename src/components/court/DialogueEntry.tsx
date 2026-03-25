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

  if (entry.speaker === 'system') {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-gray-800/60 text-gray-400 text-xs px-3 py-1.5 rounded-full max-w-[90%] text-center">
          {displayText}
        </div>
      </div>
    )
  }

  const isA = entry.speaker === 'a'
  const isB = entry.speaker === 'b'
  const name = isA ? nameA : isB ? nameB : '재판관'
  const align = isA ? 'items-start' : isB ? 'items-end' : 'items-center'
  const bubbleColor = isA
    ? 'bg-blue-950/60 border-blue-800/40'
    : isB
      ? 'bg-rose-950/60 border-rose-800/40'
      : 'bg-amber-950/60 border-amber-800/40'
  const nameColor = isA ? 'text-blue-400' : isB ? 'text-rose-400' : 'text-amber-400'

  return (
    <div className={`flex flex-col ${align} my-1.5 ${!done ? 'opacity-90' : ''}`}>
      <span className={`text-xs font-semibold mb-0.5 ${nameColor}`}>{name}</span>
      <div className={`border rounded-lg px-3 py-2 max-w-[85%] ${bubbleColor}`}>
        <p className="text-sm text-gray-200 leading-relaxed">{displayText}{!done && <span className="animate-pulse">|</span>}</p>
        {done && entry.behaviorHint && (
          <p className="text-xs text-gray-500 mt-1 italic">💡 {entry.behaviorHint}</p>
        )}
      </div>
    </div>
  )
}
