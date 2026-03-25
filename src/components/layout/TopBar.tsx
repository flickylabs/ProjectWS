import { useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import PhaseIndicator from './PhaseIndicator'
import SettingsPanel from './SettingsPanel'

export default function TopBar() {
  const resources = useGameStore((s) => s.resources)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-800 px-3 py-1.5">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-sm font-bold text-amber-400">⚖️ 솔로몬</h1>
          <div className="flex items-center gap-3 text-xs">
            <span>🔍 <span className="text-blue-400 font-bold">{resources.investigationTokens}</span></span>
            <span>⚡ <span className="text-amber-400 font-bold">{resources.skillPoints}</span></span>
            <span>⚖️ <span className="text-emerald-400 font-bold">{resources.courtControl}</span></span>
            <button onClick={() => setShowSettings(true)} className="text-gray-500 hover:text-white ml-1">⚙️</button>
          </div>
        </div>
        <PhaseIndicator />
      </header>
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </>
  )
}
