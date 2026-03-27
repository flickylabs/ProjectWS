import { useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { GamePhase } from '../../types'
import PhaseIndicator from './PhaseIndicator'
import SettingsPanel from './SettingsPanel'

export default function TopBar() {
  const [showSettings, setShowSettings] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  const handleExit = () => {
    // 게임 상태 초기화 → 홈으로 돌아감
    useGameStore.setState({ caseData: null })
    useGameStore.getState().setPhase(GamePhase.Phase0_CaseIntro)
    useGameStore.getState().clearDialogue()
  }

  return (
    <>
      <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800/60 px-3 h-9 flex items-center shrink-0">
        <div className="flex items-center justify-between w-full">
          <button onClick={() => setShowExitConfirm(true)}
            className="text-gray-500 hover:text-white text-xs mr-2 shrink-0">
            ← 나가기
          </button>
          <PhaseIndicator />
          <button onClick={() => setShowSettings(true)} className="text-gray-500 hover:text-white text-sm ml-2 shrink-0">⚙️</button>
        </div>
      </header>
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

      {/* 나가기 확인 */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-gray-950/80 flex items-center justify-center px-4" onClick={() => setShowExitConfirm(false)}>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 w-full max-w-xs animate-fade-in" onClick={e => e.stopPropagation()}>
            <p className="text-sm text-gray-200 mb-1 font-semibold">사건을 중단하시겠습니까?</p>
            <p className="text-xs text-gray-500 mb-4">현재 진행 상황은 저장되지 않습니다.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowExitConfirm(false)}
                className="flex-1 text-xs py-2 rounded-xl bg-gray-800 text-gray-400">계속하기</button>
              <button onClick={handleExit}
                className="flex-1 text-xs py-2 rounded-xl bg-red-700 text-white font-bold">나가기</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
