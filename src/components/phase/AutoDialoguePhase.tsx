import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { consumePrefetchedPhase1, consumePrefetchedPhase2 } from './Phase0_CaseIntro'
import { useGameStore, useStore } from '../../store/useGameStore'
import { playPhaseTransition, playClick } from '../../engine/soundEngine'
import type { DialogueEntry } from '../../types'
import type { GamePhase } from '../../types'

/** 외부에서 탭 이벤트를 트리거하기 위한 전역 콜백 */
let globalTapHandler: (() => void) | null = null
export function triggerDialogueTap() { globalTapHandler?.() }

interface ChoiceOption {
  id: string
  text: string
}

interface BranchDialogue extends Omit<DialogueEntry, 'id' | 'speaker'> {
  speaker: DialogueEntry['speaker'] | 'choice'
  branchCondition?: string
  choiceId?: string
  options?: ChoiceOption[]
}

interface Props {
  dialogues: BranchDialogue[]
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
  const [totalCount, setTotalCount] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [activeChoice, setActiveChoice] = useState<{ choiceId: string; options: ChoiceOption[] } | null>(null)

  const indexRef = useRef(0)
  const resolvedDialogues = useRef<BranchDialogue[]>(dialogues)
  const choicesRef = useRef<Record<string, string>>({})
  const startedRef = useRef(false)
  const readyRef = useRef(false)
  const allDoneRef = useRef(false)
  const activeChoiceRef = useRef<{ choiceId: string; options: ChoiceOption[] } | null>(null)

  // state와 ref를 동기화
  const setActiveChoiceSync = (v: { choiceId: string; options: ChoiceOption[] } | null) => {
    activeChoiceRef.current = v
    setActiveChoice(v)
  }
  const setAllDoneSync = (v: boolean) => {
    allDoneRef.current = v
    setAllDone(v)
  }

  // branchCondition 매칭 확인
  function isVisible(d: BranchDialogue): boolean {
    if (!d.branchCondition) return true
    const choicePrefix = d.branchCondition.split('_')[0]
    const selected = choicesRef.current[choicePrefix]
    return selected === d.branchCondition
  }

  // 다음에 표시할 대사 인덱스
  function getNextVisibleIndex(dlgs: BranchDialogue[], fromIndex: number): number {
    for (let i = fromIndex; i < dlgs.length; i++) {
      const d = dlgs[i]
      if (d.speaker === 'choice') return i
      if (isVisible(d)) return i
    }
    return dlgs.length
  }

  // 표시 가능한 대사 수
  function countVisibleDialogues(dlgs: BranchDialogue[]): number {
    let count = 0
    for (const d of dlgs) {
      if (d.speaker === 'choice') continue
      if (isVisible(d)) count++
    }
    return count
  }

  // 대사 추가 헬퍼
  function addDialogueEntry(d: BranchDialogue) {
    const state = useGameStore.getState()
    state.addDialogue({
      ...d,
      speaker: d.speaker as DialogueEntry['speaker'],
      turn: state.turnCount,
    })
  }

  // 다음 대사로 진행
  function advanceToNext() {
    const dlgs = resolvedDialogues.current
    const nextIdx = getNextVisibleIndex(dlgs, indexRef.current)

    if (nextIdx >= dlgs.length) {
      setAllDoneSync(true)
      return
    }

    const next = dlgs[nextIdx]
    console.log('[AutoDialogue] advanceToNext idx:', nextIdx, 'speaker:', next.speaker, 'choiceId:', (next as any).choiceId, 'options:', (next as any).options?.length)
    if (next.speaker === 'choice' && next.options && next.choiceId) {
      console.log('[AutoDialogue] → SHOWING CHOICE PANEL:', next.choiceId)
      setActiveChoiceSync({ choiceId: next.choiceId, options: next.options })
      indexRef.current = nextIdx + 1
    } else {
      addDialogueEntry(next)
      indexRef.current = nextIdx + 1
      setDisplayCount(prev => prev + 1)

      const afterNext = getNextVisibleIndex(dlgs, indexRef.current)
      if (afterNext >= dlgs.length) setAllDoneSync(true)
    }
  }

  // 초기화
  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    if (phaseKey === 'phase1') {
      useGameStore.getState().clearDialogue()
    }

    const init = async () => {
      const prefetched = phaseKey === 'phase1' ? consumePrefetchedPhase1()
        : phaseKey === 'phase2' ? consumePrefetchedPhase2()
        : null

      if (phaseKey === 'phase2' && prefetched && prefetched.length > 0) {
        resolvedDialogues.current = prefetched as BranchDialogue[]
      } else if (phaseKey === 'phase2' && llmGenerator) {
        setLoading(true)
        try {
          const generated = await llmGenerator()
          if (generated.length > 0) resolvedDialogues.current = generated as BranchDialogue[]
        } catch { /* 폴백 */ }
        setLoading(false)
      } else if (dialogues.length > 0) {
        resolvedDialogues.current = dialogues
      } else if (prefetched && prefetched.length > 0) {
        resolvedDialogues.current = prefetched as BranchDialogue[]
      } else if (llmGenerator) {
        setLoading(true)
        try {
          const generated = await llmGenerator()
          if (generated.length > 0) resolvedDialogues.current = generated as BranchDialogue[]
        } catch { /* 폴백 */ }
        setLoading(false)
      }

      const dlgs = resolvedDialogues.current
      console.log('[AutoDialogue] init: total dialogues:', dlgs.length, 'choice nodes:', dlgs.filter(d => d.speaker === 'choice').length)
      // 디버그: choice 노드 상세
      dlgs.forEach((d, i) => { if (d.speaker === 'choice') console.log('[AutoDialogue] choice at idx', i, 'choiceId:', d.choiceId, 'options:', d.options?.length) })
      if (dlgs.length === 0) {
        const state = useGameStore.getState()
        state.addDialogue({ speaker: 'system', text: '진술이 준비되지 않았습니다.', relatedDisputes: [], turn: state.turnCount })
        setAllDoneSync(true)
        return
      }

      // 첫 대사
      const firstIdx = getNextVisibleIndex(dlgs, 0)
      if (firstIdx >= dlgs.length) { setAllDoneSync(true); return }

      const first = dlgs[firstIdx]
      if (first.speaker === 'choice' && first.options && first.choiceId) {
        setActiveChoiceSync({ choiceId: first.choiceId, options: first.options })
        indexRef.current = firstIdx + 1
      } else {
        addDialogueEntry(first)
        indexRef.current = firstIdx + 1
      }

      setTotalCount(countVisibleDialogues(dlgs))
      setDisplayCount(1)
      readyRef.current = true
    }

    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 대사 완료 → 자동 전환
  useEffect(() => {
    if (!allDone) return
    setTransitioning(true)
    playPhaseTransition()
    const timer = setTimeout(() => advancePhase(nextPhase), 1500)
    return () => clearTimeout(timer)
  }, [allDone, advancePhase, nextPhase])

  // 선택지 처리
  const handleChoice = useCallback((choiceId: string, optionId: string) => {
    playClick()
    choicesRef.current[choiceId] = optionId
    setActiveChoiceSync(null)

    // 선택한 옵션을 재판관 대사로 추가
    const dlgs = resolvedDialogues.current
    const choiceNode = dlgs.find(d => d.speaker === 'choice' && d.choiceId === choiceId)
    const selectedOption = choiceNode?.options?.find(o => o.id === optionId)
    if (selectedOption) {
      const state = useGameStore.getState()
      state.addDialogue({
        speaker: 'judge',
        text: selectedOption.text,
        relatedDisputes: choiceNode?.relatedDisputes ?? [],
        turn: state.turnCount,
      })
    }

    setTotalCount(countVisibleDialogues(dlgs))

    // 다음 대사로
    advanceToNext()
  }, [])

  // 탭 처리
  const handleTap = useCallback(() => {
    if (!readyRef.current || allDoneRef.current || activeChoiceRef.current) return
    advanceToNext()
  }, [])

  useEffect(() => {
    globalTapHandler = handleTap
    return () => { globalTapHandler = null }
  }, [handleTap])

  // 키보드 (선택지 표시 중에는 차단)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeChoiceRef.current) return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleTap()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleTap])

  // 선택지 표시 중 숫자키로 선택
  useEffect(() => {
    if (!activeChoice) return
    const onKey = (e: KeyboardEvent) => {
      const num = parseInt(e.key)
      if (num >= 1 && num <= activeChoice.options.length) {
        e.preventDefault()
        handleChoice(activeChoice.choiceId, activeChoice.options[num - 1].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeChoice, handleChoice])

  if (loading) {
    return (
      <div className="pc-dialogue-loading">
        <div className="pc-dialogue-loading__spinner" />
        <span>AI가 진술을 준비하고 있습니다...</span>
      </div>
    )
  }

  if (transitioning) {
    return (
      <div className="pc-dialogue-transition">
        <span>{nextLabel}...</span>
      </div>
    )
  }

  // 선택지 패널 — Portal로 body에 직접 렌더링 (레이아웃 slot에 갇히지 않도록)
  if (activeChoice) {
    return createPortal(
      <div className="v4-choice-overlay">
        <div className="v4-choice-panel">
          <div className="v4-choice-panel__label">재판관의 판단</div>
          {activeChoice.options.map((option, idx) => (
            <button
              key={option.id}
              className="v4-choice-panel__option"
              onClick={() => handleChoice(activeChoice.choiceId, option.id)}
              type="button"
            >
              <span className="v4-choice-panel__number">{idx + 1}</span>
              <span className="v4-choice-panel__text">{option.text}</span>
            </button>
          ))}
        </div>
      </div>,
      document.body,
    )
  }

  // 진행 버튼
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
