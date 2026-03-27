import { useGameStore } from '../../store/useGameStore'
import DialogueEntry from './DialogueEntry'

interface Props {
  onTestimonyClick?: () => void
}

export default function DialogueLog({ onTestimonyClick }: Props) {
  const dialogueLog = useGameStore((s) => s.dialogueLog)
  const isLLMLoading = useGameStore((s) => s.isLLMLoading)
  const llmTarget = useGameStore((s) => s.llmLoadingTarget)

  return (
    <div className="px-3 py-2">
      {dialogueLog.length === 0 && !isLLMLoading && (
        <div className="text-center text-gray-600 text-sm py-20">
          사건이 시작되면 대화가 여기에 표시됩니다.
        </div>
      )}

      <div className="space-y-1">
        {dialogueLog.map((entry, i) => (
          <DialogueEntry key={entry.id} entry={entry} animate={i === dialogueLog.length - 1} onTestimonyClick={onTestimonyClick} />
        ))}
      </div>

      {isLLMLoading && (
        <div className={`flex items-center gap-2 my-2 px-3 py-2 ${llmTarget === 'b' ? 'justify-end' : ''}`}>
          <div className="flex gap-1">
            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${llmTarget === 'b' ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ animationDelay: '0ms' }} />
            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${llmTarget === 'b' ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ animationDelay: '150ms' }} />
            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${llmTarget === 'b' ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-xs text-gray-500">응답 중...</span>
        </div>
      )}
    </div>
  )
}
