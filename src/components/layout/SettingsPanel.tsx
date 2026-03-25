import { useState, useEffect } from 'react'
import { getSettings, updateSettings, loadSave } from '../../hooks/useLocalStorage'
import { checkConnection, getProviderName } from '../../engine/llmClient'
import { isSoundEnabled, setSoundEnabled } from '../../engine/soundEngine'

interface Props {
  onClose: () => void
}

export default function SettingsPanel({ onClose }: Props) {
  const [settings, setSettings] = useState(getSettings())
  const [llmStatus, setLlmStatus] = useState<{ connected: boolean; provider?: string; modelId?: string } | null>(null)
  const save = loadSave()

  useEffect(() => {
    checkConnection().then(setLlmStatus)
  }, [])

  const handleChange = (key: string, value: any) => {
    const updated = { ...settings, [key]: value }
    setSettings(updated)
    updateSettings({ [key]: value })
  }

  return (
    <div className="fixed inset-0 z-40 bg-gray-950/90 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-sm font-bold text-amber-400">설정</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-lg">✕</button>
        </div>

        <div className="p-4 space-y-5">
          {/* LLM 상태 */}
          <Section title="AI 연결">
            <div className={`text-xs p-2.5 rounded-lg border ${
              llmStatus?.connected ? 'border-emerald-800 bg-emerald-950/30 text-emerald-400' : 'border-yellow-800 bg-yellow-950/30 text-yellow-400'
            }`}>
              {llmStatus?.connected
                ? `✓ ${getProviderName()} 연결됨`
                : '⚠ LLM 미연결 — 하드코딩 대사로 플레이'}
            </div>
          </Section>

          {/* 게임 설정 */}
          <Section title="게임 설정">
            <Toggle
              label="효과음"
              desc="Phase 전환, 붕괴, 증거 등 효과음"
              checked={isSoundEnabled()}
              onChange={(v) => setSoundEnabled(v)}
            />
            <Toggle
              label="행동 징후 표시"
              desc="캐릭터의 심리 상태 힌트를 표시합니다"
              checked={settings.showBehaviorHints}
              onChange={(v) => handleChange('showBehaviorHints', v)}
            />
            <Toggle
              label="대사 자동 재생"
              desc="초기 진술/반박 단계에서 대사를 자동으로 재생합니다"
              checked={settings.autoAdvanceDialogue}
              onChange={(v) => handleChange('autoAdvanceDialogue', v)}
            />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-200">대사 속도</div>
                <div className="text-xs text-gray-500">타이핑 애니메이션 속도</div>
              </div>
              <select
                value={settings.typingSpeed}
                onChange={(e) => handleChange('typingSpeed', e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-gray-300"
              >
                <option value="fast">빠르게</option>
                <option value="normal">보통</option>
                <option value="slow">느리게</option>
              </select>
            </div>
          </Section>

          {/* 통계 */}
          <Section title="플레이 기록">
            <div className="grid grid-cols-3 gap-2">
              <Stat label="총 플레이" value={`${save.totalGamesPlayed}판`} />
              <Stat label="최고 점수" value={`${save.bestScore}점`} />
              <Stat label="최근 사건" value={`${save.recentCaseIds.length}개`} />
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-gray-500 font-semibold mb-2">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Toggle({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-xs text-gray-200">{label}</div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 rounded-full transition-colors ${checked ? 'bg-amber-600' : 'bg-gray-700'}`}
      >
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-2 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-bold text-gray-200">{value}</div>
    </div>
  )
}
