import { useEffect, useRef } from 'react'
import { useGameStore } from '../../store/useGameStore'
import DialogueEntry from './DialogueEntry'

export default function DialogueLog() {
  const dialogueLog = useGameStore((s) => s.dialogueLog)
  const isLLMLoading = useGameStore((s) => s.isLLMLoading)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [dialogueLog.length, isLLMLoading])

  return (
    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
      {dialogueLog.length === 0 && !isLLMLoading && (
        <div className="flex items-center justify-center h-full text-gray-600 text-sm">
          사건이 시작되면 대화가 여기에 표시됩니다.
        </div>
      )}
      {dialogueLog.map((entry, i) => (
        <DialogueEntry
          key={entry.id}
          entry={entry}
          animate={i === dialogueLog.length - 1}
        />
      ))}
      {isLLMLoading && (
        <div className="flex items-center gap-2 my-2 px-3 py-2">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-xs text-gray-500">응답 중...</span>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
