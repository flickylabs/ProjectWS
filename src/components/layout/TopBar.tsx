import { useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import PhaseIndicator from './PhaseIndicator'
import SettingsPanel from './SettingsPanel'

export default function TopBar() {
  const resources = useGameStore((s) => s.resources)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800/60 px-3 py-1.5">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-sm font-bold text-amber-400 tracking-tight">⚖️ 솔로몬</h1>
          <div className="flex items-center gap-2.5">
            <ResourceMini icon="🔍" value={resources.investigationTokens} max={3} color="#60a5fa" />
            <ResourceMini icon="⚡" value={resources.skillPoints} max={5} color="#fbbf24" />
            <ResourceMini icon="⚖️" value={resources.courtControl} max={3} color="#34d399" />
            <button onClick={() => setShowSettings(true)} className="text-gray-500 hover:text-white ml-0.5 text-sm">⚙️</button>
          </div>
        </div>
        <PhaseIndicator />
      </header>
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </>
  )
}

function ResourceMini({ icon, value, max, color }: { icon: string; value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="flex items-center gap-1" title={`${value}/${max}`}>
      <span className="text-xs">{icon}</span>
      <div className="w-8 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold" style={{ color }}>{value}</span>
    </div>
  )
}
