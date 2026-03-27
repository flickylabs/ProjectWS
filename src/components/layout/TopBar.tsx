import { useState, useEffect } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { GamePhase } from '../../types'
import PhaseIndicator from './PhaseIndicator'
import SettingsPanel from './SettingsPanel'
import ResourcePopup from '../shop/ResourcePopup'
import Emoji from '../common/Emoji'

export default function TopBar() {
  const [showSettings, setShowSettings] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showResource, setShowResource] = useState<'invest' | 'skill' | null>(null)

  const globalInvest = useGameStore((s) => s.globalInvestTokens)
  const globalSkill = useGameStore((s) => s.globalSkillPoints)
  const adCountInvest = useGameStore((s) => s.adWatchCountInvest)
  const adCountSkill = useGameStore((s) => s.adWatchCountSkill)
  const tickRecharge = useGameStore((s) => s.tickInvestRecharge)
  const getCountdown = useGameStore((s) => s.getNextRechargeCountdown)
  const watchAdInvest = useGameStore((s) => s.watchAdForInvest)
  const watchAdSkill = useGameStore((s) => s.watchAdForSkill)

  // 1분마다 자동 충전 체크
  useEffect(() => {
    tickRecharge()
    const timer = setInterval(tickRecharge, 60_000)
    return () => clearInterval(timer)
  }, [tickRecharge])

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
          <div className="flex items-center gap-2 ml-2 shrink-0">
            {/* 돋보기 (조사 토큰) */}
            <button onClick={() => setShowResource('invest')} className="flex items-center gap-0.5 text-xs hover:opacity-80 active:scale-95">
              <Emoji char="🔍" size={14} />
              <span className={`font-bold ${globalInvest > 10 ? 'text-purple-400' : 'text-amber-400'}`}>{globalInvest}</span>
            </button>
            {/* 번개 (스킬 포인트) */}
            <button onClick={() => setShowResource('skill')} className="flex items-center gap-0.5 text-xs hover:opacity-80 active:scale-95">
              <Emoji char="⚡" size={14} />
              <span className={`font-bold ${globalSkill > 10 ? 'text-purple-400' : 'text-blue-400'}`}>{globalSkill}</span>
            </button>
            <button onClick={() => setShowSettings(true)} className="text-gray-500 hover:text-white"><Emoji char="⚙️" size={16} /></button>
          </div>
        </div>
      </header>
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

      {/* 돋보기/번개 팝업 */}
      {showResource === 'invest' && (
        <ResourcePopup
          type="invest"
          current={globalInvest}
          countdown={getCountdown()}
          adRemaining={5 - adCountInvest}
          onWatchAd={watchAdInvest}
          onClose={() => setShowResource(null)}
        />
      )}
      {showResource === 'skill' && (
        <ResourcePopup
          type="skill"
          current={globalSkill}
          adRemaining={2 - adCountSkill}
          onWatchAd={watchAdSkill}
          onClose={() => setShowResource(null)}
        />
      )}

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
