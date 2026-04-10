import { useState } from 'react'
import { useGameStore, useStore } from '../../../store/useGameStore'
import AdCountdown from '../../minigame/AdCountdown'
import HeartbeatDetector from '../../minigame/HeartbeatDetector'
import MatchingPuzzle from '../../minigame/MatchingPuzzle'
import MemoryPuzzle from '../../minigame/MemoryPuzzle'
import WordScramble from '../../minigame/WordScramble'
import {
  actuallyDiscoverEvidence,
  applyContradictionFail,
  applyContradictionSuccess,
  applyLieCollapseFail,
  applyLieCollapseSuccess,
} from '../../../hooks/useActionDispatch'

function splitToWords(text: string): string[] {
  let words = text.split(/\s+/).filter((word) => word.length > 0)
  if (words.length > 7) {
    words = words.slice(0, 7)
  }
  while (words.length < 4) {
    words.push('확인')
  }
  return words
}

export default function PCMinigameOverlay() {
  const pendingMinigame = useStore((s) => s.pendingMinigame)
  const clearPendingMinigame = useStore((s) => s.setPendingMinigame)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const [chosenMethod, setChosenMethod] = useState<'minigame' | null>(null)
  const [adSuccessCallback, setAdSuccessCallback] = useState<(() => void) | null>(null)

  const showAdCountdown = (successFn: () => void) => {
    setAdSuccessCallback(() => successFn)
  }

  if (adSuccessCallback) {
    return (
      <AdCountdown
        onCancel={() => setAdSuccessCallback(null)}
        onComplete={() => {
          const callback = adSuccessCallback
          setAdSuccessCallback(null)
          callback()
        }}
      />
    )
  }

  if (!pendingMinigame) {
    return null
  }

  if (pendingMinigame.type === 'evidence_discovery') {
    const { clues, evidenceId, minigameVariant } = pendingMinigame

    const handleSuccess = () => {
      actuallyDiscoverEvidence(evidenceId)
      clearPendingMinigame(null)
    }
    const handleFail = () => clearPendingMinigame(null)
    const handleWatchAd = () => showAdCountdown(handleSuccess)

    if (minigameVariant === 'heartbeat') {
      return <HeartbeatDetector onFail={handleFail} onSuccess={handleSuccess} onWatchAd={handleWatchAd} />
    }

    if (minigameVariant === 'matching') {
      return <MatchingPuzzle onFail={handleFail} onSuccess={handleSuccess} onWatchAd={handleWatchAd} />
    }

    if (minigameVariant === 'word_scramble') {
      const evidenceName = evidenceDefinitions.find((item) => item.id === evidenceId)?.name ?? '새 증거'
      return (
        <WordScramble
          words={splitToWords(evidenceName)}
          onFail={handleFail}
          onSuccess={handleSuccess}
          onWatchAd={handleWatchAd}
        />
      )
    }

    return <MemoryPuzzle clues={clues} onFail={handleFail} onSuccess={handleSuccess} onWatchAd={handleWatchAd} />
  }

  if (pendingMinigame.type === 'evidence_depth') {
    const { depth, evidenceId } = pendingMinigame
    const evidence = evidenceDefinitions.find((item) => item.id === evidenceId)
    const evidenceState = evidenceStates[evidenceId]
    const nextKey = (['request_original', 'restore_context', 'check_edits'] as const)
      .find((key) => !evidenceState?.investigatedActions?.includes(key)) ?? 'check_edits'

    const handleSuccess = () => {
      const { addDialogue, investigateEvidence, turnCount } = useGameStore.getState()
      const result = investigateEvidence(evidenceId, nextKey)
      if (result) {
        addDialogue({
          speaker: 'system',
          text: `조사 결과: ${result}`,
          relatedDisputes: evidence?.proves ?? [],
          turn: turnCount,
        })
      }
      clearPendingMinigame(null)
      setChosenMethod(null)
    }

    const handleFail = () => {
      useGameStore.getState().addDialogue({
        speaker: 'system',
        text: '조사에 실패했습니다. 단서를 다시 정리해야 합니다.',
        relatedDisputes: evidence?.proves ?? [],
        turn: useGameStore.getState().turnCount,
      })
      clearPendingMinigame(null)
      setChosenMethod(null)
    }

    const handleWatchAd = () => showAdCountdown(handleSuccess)

    if (!chosenMethod) {
      const depthLabel = depth === 1 ? '1단계 조사' : depth === 2 ? '2단계 조사' : '3단계 조사'
      const minigameLabel = depth === 1 ? '리듬 읽기' : depth === 2 ? '매칭 퍼즐' : '단어 정렬'

      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/78 px-6 backdrop-blur-sm"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)', paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="w-full max-w-md rounded-[28px] border border-[rgba(212,162,78,0.18)] bg-[rgba(12,12,20,0.96)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
            <div className="text-center">
              <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[rgba(232,193,114,0.72)]">Evidence Depth</div>
              <h2 className="mt-4 text-[30px] font-black tracking-[-0.04em] text-[#f4ede1]">{depthLabel}</h2>
              <p className="mt-2 text-sm text-[#8f8f9c]">{evidence?.name ?? '선택한 증거'}의 조사 방식을 선택하세요.</p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                className="w-full rounded-2xl border border-[rgba(212,162,78,0.2)] bg-[rgba(212,162,78,0.12)] px-4 py-4 text-sm font-bold text-[#f2d08d]"
                onClick={() => setChosenMethod('minigame')}
                type="button"
              >
                미니게임으로 진행
                <span className="ml-2 text-xs text-[rgba(242,208,141,0.72)]">{minigameLabel}</span>
              </button>

              <button
                className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-sm font-semibold text-[#d4d0c6]"
                onClick={() => handleWatchAd()}
                type="button"
              >
                광고 보고 완료 처리
              </button>

              <button
                className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-sm font-semibold text-[#d4d0c6]"
                onClick={handleSuccess}
                type="button"
              >
                토큰만 사용하고 즉시 완료
              </button>
            </div>

            <button
              className="mt-4 w-full py-2 text-xs font-semibold text-[#6f6f7d]"
              onClick={() => {
                clearPendingMinigame(null)
                setChosenMethod(null)
              }}
              type="button"
            >
              닫기
            </button>
          </div>
        </div>
      )
    }

    if (depth === 1) {
      return (
        <HeartbeatDetector
          onFail={handleFail}
          onSuccess={handleSuccess}
          onWatchAd={() => {
            setChosenMethod(null)
            handleWatchAd()
          }}
        />
      )
    }

    if (depth === 2) {
      return (
        <MatchingPuzzle
          onFail={handleFail}
          onSuccess={handleSuccess}
          onWatchAd={() => {
            setChosenMethod(null)
            handleWatchAd()
          }}
        />
      )
    }

    return (
      <WordScramble
        words={splitToWords(evidence?.name ?? '증거 조사')}
        onFail={handleFail}
        onSuccess={handleSuccess}
        onWatchAd={() => {
          setChosenMethod(null)
          handleWatchAd()
        }}
      />
    )
  }

  if (pendingMinigame.type === 'lie_collapse') {
    const { disputeId, party } = pendingMinigame

    const handleSuccess = () => {
      applyLieCollapseSuccess(disputeId, party)
      clearPendingMinigame(null)
    }

    const handleFail = () => {
      applyLieCollapseFail(disputeId)
      clearPendingMinigame(null)
    }

    return <HeartbeatDetector onFail={handleFail} onSuccess={handleSuccess} onWatchAd={() => showAdCountdown(handleSuccess)} />
  }

  if (pendingMinigame.type === 'contradiction') {
    const { disputeId, target, text } = pendingMinigame

    const handleSuccess = () => {
      applyContradictionSuccess(disputeId, target)
      clearPendingMinigame(null)
    }

    const handleFail = () => {
      applyContradictionFail(disputeId)
      clearPendingMinigame(null)
    }

    return (
      <WordScramble
        words={splitToWords(text)}
        onFail={handleFail}
        onSuccess={handleSuccess}
        onWatchAd={() => showAdCountdown(handleSuccess)}
      />
    )
  }

  return null
}
