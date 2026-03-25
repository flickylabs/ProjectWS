import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import type { DialogueEntry } from '../../types'
import type { GamePhase } from '../../types'

interface Props {
  dialogues: Omit<DialogueEntry, 'id'>[]
  llmGenerator?: () => Promise<Omit<DialogueEntry, 'id'>[]>
  nextPhase: GamePhase
  nextLabel: string
}

export default function AutoDialoguePhase({ dialogues, llmGenerator, nextPhase, nextLabel }: Props) {
  const advancePhase = useGameStore((s) => s.advancePhase)
  const [allDone, setAllDone] = useState(false)
  const [displayCount, setDisplayCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(dialogues.length)
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resolvedDialogues = useRef<Omit<DialogueEntry, 'id'>[]>(dialogues)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const init = async () => {
      // LLM 생성 시도
      if (llmGenerator) {
        setLoading(true)
        try {
          const generated = await llmGenerator()
          if (generated.length > 0) {
            resolvedDialogues.current = generated
            setTotalCount(generated.length)
          }
        } catch { /* 폴백 사용 */ }
        setLoading(false)
      }

      // 첫 대사
      startPlayback()
    }

    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const startPlayback = () => {
    const dlgs = resolvedDialogues.current
    if (dlgs.length === 0) {
      setAllDone(true)
      return
    }

    // 첫 대사 즉시
    const addDialogue = useGameStore.getState().addDialogue
    const turnCount = useGameStore.getState().turnCount
    addDialogue({ ...dlgs[0], turn: turnCount })
    indexRef.current = 1
    setDisplayCount(1)

    if (dlgs.length === 1) {
      setAllDone(true)
      return
    }

    timerRef.current = setInterval(() => {
      const i = indexRef.current
      if (i >= dlgs.length) {
        if (timerRef.current) clearInterval(timerRef.current)
        setAllDone(true)
        return
      }
      const state = useGameStore.getState()
      state.addDialogue({ ...dlgs[i], turn: state.turnCount })
      indexRef.current = i + 1
      setDisplayCount(i + 1)

      if (i + 1 >= dlgs.length) {
        if (timerRef.current) clearInterval(timerRef.current)
        setAllDone(true)
      }
    }, 1500)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-3 gap-2">
        <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-gray-400">AI가 진술을 준비하고 있습니다...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div className="text-xs text-gray-500">
        {allDone ? '진술이 완료되었습니다.' : `진술 진행 중... (${displayCount}/${totalCount})`}
      </div>
      {allDone && (
        <button
          onClick={() => advancePhase(nextPhase)}
          className="bg-amber-600 hover:bg-amber-500 text-gray-950 font-semibold px-6 py-2 rounded-lg transition-colors text-sm"
        >
          {nextLabel} →
        </button>
      )}
    </div>
  )
}
