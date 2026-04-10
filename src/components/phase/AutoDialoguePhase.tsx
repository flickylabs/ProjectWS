import { useEffect, useRef, useState, useCallback } from 'react'
import { consumePrefetchedPhase1, consumePrefetchedPhase2 } from './Phase0_CaseIntro'
import { useGameStore, useStore } from '../../store/useGameStore'
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
  const advancePhase = useStore((s) => s.advancePhase)
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

      console.log(`[AutoDialogue] phaseKey=${phaseKey}, prefetched=${prefetched?.length ?? 'null'}, dialogues=${dialogues.length}`)

      if (phaseKey === 'phase2' && prefetched && prefetched.length > 0) {
        // Phase2: AI 생성 결과 우선 사용
        console.log('[AutoDialogue] Phase2 → AI prefetch 사용')
        resolvedDialogues.current = prefetched
        setTotalCount(prefetched.length)
      } else if (phaseKey === 'phase2' && llmGenerator) {
        // Phase2: prefetch 비었으면 즉시 LLM 재시도
        console.log('[AutoDialogue] Phase2 → prefetch 비어있음, LLM 즉시 생성 시도')
        setLoading(true)
        try {
          const generated = await llmGenerator()
          if (generated.length > 0) {
            console.log(`[AutoDialogue] Phase2 → LLM 생성 성공 (${generated.length}건)`)
            resolvedDialogues.current = generated
            setTotalCount(generated.length)
          } else {
            console.warn('[AutoDialogue] Phase2 → LLM 생성 빈 결과, 스크립트 폴백')
            resolvedDialogues.current = dialogues
            setTotalCount(dialogues.length)
          }
        } catch (e) {
          console.warn('[AutoDialogue] Phase2 → LLM 생성 실패, 스크립트 폴백:', e)
          resolvedDialogues.current = dialogues
          setTotalCount(dialogues.length)
        }
        setLoading(false)
      } else if (phaseKey === 'phase1' && dialogues.length > 0) {
        // Phase1: 고정 스크립트 사용
        resolvedDialogues.current = dialogues
        setTotalCount(dialogues.length)
      } else if (prefetched && prefetched.length > 0) {
        resolvedDialogues.current = prefetched
        setTotalCount(prefetched.length)
      } else if (dialogues.length > 0) {
        resolvedDialogues.current = dialogues
        setTotalCount(dialogues.length)
      } else if (llmGenerator) {
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
      <div className="pc-dialogue-loading">
        <div className="pc-dialogue-loading__spinner" />
        <span>AI가 진술을 준비하고 있습니다...</span>
      </div>
    )
  }

  // Keyboard shortcut: Space / Enter to advance
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleTap()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleTap])

  // 전환 중 — 중앙 오버레이
  if (transitioning) {
    return (
      <div className="pc-dialogue-transition">
        <span>{nextLabel}...</span>
      </div>
    )
  }

  // 대사 진행 중 — PC 진행 버튼
  return (
    <div className="pc-dialogue-controls">
      <button
        className="pc-dialogue-advance"
        onClick={handleTap}
        type="button"
      >
        <span className="pc-dialogue-advance__label">다음 진술</span>
        <span className="pc-dialogue-advance__count">{displayCount}/{totalCount}</span>
        <kbd>Space</kbd>
      </button>
    </div>
  )
}
