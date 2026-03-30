import { useEffect, useRef, useState, useCallback } from 'react'
import { consumePrefetchedPhase1, consumePrefetchedPhase2 } from './Phase0_CaseIntro'
import { useGameStore } from '../../store/useGameStore'
import { playPhaseTransition } from '../../engine/soundEngine'
import type { DialogueEntry } from '../../types'
import type { GamePhase } from '../../types'

/** 외부에서 탭 이벤트를 트리거하기 위한 전역 콜백 */
let globalTapHandler: (() => void) | null = null
export function triggerDialogueTap() { globalTapHandler?.() }

interface Props {
  dialogues: Omit<DialogueEntry, 'id'>[]
  llmGenerator?: () => Promise<Omit<DialogueEntry, 'id'>[]>
  nextPhase: GamePhase
  nextLabel: string
  phaseKey?: 'phase1' | 'phase2'
}

export default function AutoDialoguePhase({ dialogues, llmGenerator, nextPhase, nextLabel, phaseKey }: Props) {
  const advancePhase = useGameStore((s) => s.advancePhase)
  const [allDone, setAllDone] = useState(false)
  const [displayCount, setDisplayCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(dialogues.length)
  const [transitioning, setTransitioning] = useState(false)
  const indexRef = useRef(0)
  const resolvedDialogues = useRef<Omit<DialogueEntry, 'id'>[]>(dialogues)
  const startedRef = useRef(false)
  const readyRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const init = async () => {
      // Phase2는 AI prefetch 결과를 우선 사용, Phase1은 고정 스크립트 우선
      const prefetched = phaseKey === 'phase1' ? consumePrefetchedPhase1()
        : phaseKey === 'phase2' ? consumePrefetchedPhase2()
        : null

      if (phaseKey === 'phase2' && prefetched && prefetched.length > 0) {
        // Phase2: AI 생성 결과 우선 사용
        resolvedDialogues.current = prefetched
        setTotalCount(prefetched.length)
      } else if (phaseKey === 'phase1' && dialogues.length > 0) {
        // Phase1: 고정 스크립트 사용, prefetch 결과 버림
        resolvedDialogues.current = dialogues
        setTotalCount(dialogues.length)
      } else if (prefetched && prefetched.length > 0) {
        // 기타: prefetch 결과 사용
        resolvedDialogues.current = prefetched
        setTotalCount(prefetched.length)
      } else if (dialogues.length > 0) {
        // 스크립트 폴백
        resolvedDialogues.current = dialogues
        setTotalCount(dialogues.length)
      } else if (llmGenerator) {
        // 마지막 수단: 즉시 LLM 생성
        setLoading(true)
        try {
          const generated = await llmGenerator()
          if (generated.length > 0) {
            resolvedDialogues.current = generated
            setTotalCount(generated.length)
          }
        } catch { /* 폴백 */ }
        setLoading(false)
      }

      // 첫 대사
      const dlgs = resolvedDialogues.current
      if (dlgs.length === 0) {
        const state = useGameStore.getState()
        state.addDialogue({ speaker: 'system', text: '진술이 준비되지 않았습니다.', relatedDisputes: [], turn: state.turnCount })
        setAllDone(true)
        return
      }

      const state = useGameStore.getState()
      state.addDialogue({ ...dlgs[0], turn: state.turnCount })
      indexRef.current = 1
      setDisplayCount(1)
      readyRef.current = true

      if (dlgs.length === 1) setAllDone(true)
    }

    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 대사 완료 → 자동 전환 연출
  useEffect(() => {
    if (!allDone) return
    setTransitioning(true)
    playPhaseTransition()
    const timer = setTimeout(() => {
      advancePhase(nextPhase)
    }, 1500)
    return () => clearTimeout(timer)
  }, [allDone, advancePhase, nextPhase])

  const handleTap = useCallback(() => {
    if (!readyRef.current || allDone) return
    const dlgs = resolvedDialogues.current
    const i = indexRef.current
    if (i >= dlgs.length) { setAllDone(true); return }

    const state = useGameStore.getState()
    state.addDialogue({ ...dlgs[i], turn: state.turnCount })
    indexRef.current = i + 1
    setDisplayCount(i + 1)
    if (i + 1 >= dlgs.length) setAllDone(true)
  }, [allDone])

  useEffect(() => {
    globalTapHandler = handleTap
    return () => { globalTapHandler = null }
  }, [handleTap])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-3 gap-2">
        <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-gray-400">AI가 진술을 준비하고 있습니다...</span>
      </div>
    )
  }

  // 전환 중 — 중앙 오버레이
  if (transitioning) {
    return (
      <div className="flex items-center justify-center py-2">
        <span className="text-xs text-amber-400/60">{nextLabel}...</span>
      </div>
    )
  }

  // 대사 진행 중 — 탭 안내
  return (
    <div className="flex items-center justify-center py-2">
      <button
        onClick={handleTap}
        className="flex items-center gap-2 text-gray-400 hover:text-amber-400 active:scale-95 transition-all"
      >
        <span className="text-xs">탭하여 다음 진술</span>
        <span className="text-xs text-gray-600">({displayCount}/{totalCount})</span>
        <span className="animate-bounce text-amber-500/60 text-xs">▼</span>
      </button>
    </div>
  )
}
