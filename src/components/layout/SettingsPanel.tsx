import { useState, useEffect } from 'react'
import { getSettings, updateSettings, loadSave } from '../../hooks/useLocalStorage'
import { checkConnection, getProviderName } from '../../engine/llmClient'
import { isSoundEnabled, setSoundEnabled, isBgmEnabled, setBgmEnabled } from '../../engine/soundEngine'
import { useGameStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'

interface Props {
  onClose: () => void
}

export default function SettingsPanel({ onClose }: Props) {
  const [settings, setSettings] = useState(getSettings())
  const [llmStatus, setLlmStatus] = useState<{ connected: boolean; provider?: string; modelId?: string } | null>(null)
  const [bgmOn, setBgmOn] = useState(isBgmEnabled())
  const [sfxOn, setSfxOn] = useState(isSoundEnabled())
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
          <button onClick={onClose} className="text-gray-500 hover:text-white text-lg"><Emoji char="✕" size={16} /></button>
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
              label="배경음악"
              desc="게임 플레이 중 배경 음악"
              checked={bgmOn}
              onChange={(v) => { setBgmOn(v); setBgmEnabled(v) }}
            />
            <Toggle
              label="효과음"
              desc="Phase 전환, 붕괴, 증거 등 효과음"
              checked={sfxOn}
              onChange={(v) => { setSfxOn(v); setSoundEnabled(v) }}
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

          {/* DEV: 치트키 (출시 시 제거) */}
          <CheatSection />
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
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
        className={`w-11 h-[22px] rounded-full transition-colors duration-200 relative shrink-0 ${checked ? 'bg-amber-600' : 'bg-gray-700'}`}
      >
        <div className={`w-[18px] h-[18px] rounded-full bg-white shadow-sm absolute top-[2px] transition-all duration-200 ${checked ? 'left-[24px]' : 'left-[2px]'}`} />
        <span className={`absolute text-[8px] font-bold top-[5px] ${checked ? 'left-[4px] text-amber-200' : 'right-[3px] text-gray-500'}`}>
          {checked ? 'ON' : 'OFF'}
        </span>
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

/** DEV 전용 — 출시 시 제거 */
function CheatSection() {
  const resources = useGameStore((s) => s.resources)
  const gain = useGameStore((s) => s.gain)
  const caseData = useGameStore((s) => s.caseData)

  // 대기 중인 변경사항 (확인 누르기 전까지 적용 안 됨)
  const [pending, setPending] = useState<{ invest: number; skill: number; court: number }>({ invest: 0, skill: 0, court: 0 })
  const hasPending = pending.invest !== 0 || pending.skill !== 0 || pending.court !== 0

  const addPending = (key: 'invest' | 'skill' | 'court', amount: number) => {
    setPending(prev => ({ ...prev, [key]: prev[key] + amount }))
  }

  const applyPending = () => {
    if (pending.invest > 0) gain('investigationTokens', pending.invest)
    if (pending.skill > 0) gain('skillPoints', pending.skill)
    if (pending.court > 0) gain('courtControl', pending.court)
    setPending({ invest: 0, skill: 0, court: 0 })
  }

  const resetPending = () => setPending({ invest: 0, skill: 0, court: 0 })

  return (
    <Section title={<><Emoji char="🛠" size={14} /> DEV 치트키</>}>
      <div className="bg-yellow-950/20 border border-yellow-800/30 rounded-lg p-2.5 space-y-2">
        <p className="text-xs text-yellow-600">테스트용 — 출시 시 제거 예정</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-300">
            <Emoji char="🔍" size={12} /> 조사 토큰: {resources.investigationTokens}
            {pending.invest > 0 && <span className="text-emerald-400"> (+{pending.invest})</span>}
          </span>
          <div className="flex gap-1">
            <button onClick={() => addPending('invest', 1)} className="px-2 py-0.5 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-200 active:scale-95">+1</button>
            <button onClick={() => addPending('invest', 5)} className="px-2 py-0.5 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-200 active:scale-95">+5</button>
            <button onClick={() => addPending('invest', 99)} className="px-2 py-0.5 text-xs rounded bg-amber-800 hover:bg-amber-700 text-amber-200 active:scale-95">MAX</button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-300">
            <Emoji char="⚡" size={12} /> 스킬 포인트: {resources.skillPoints}
            {pending.skill > 0 && <span className="text-emerald-400"> (+{pending.skill})</span>}
          </span>
          <div className="flex gap-1">
            <button onClick={() => addPending('skill', 1)} className="px-2 py-0.5 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-200 active:scale-95">+1</button>
            <button onClick={() => addPending('skill', 5)} className="px-2 py-0.5 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-200 active:scale-95">+5</button>
            <button onClick={() => addPending('skill', 99)} className="px-2 py-0.5 text-xs rounded bg-amber-800 hover:bg-amber-700 text-amber-200 active:scale-95">MAX</button>
          </div>
        </div>

        {caseData && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-300">
              <Emoji char="⚖️" size={12} /> 법정 통제력: {resources.courtControl}
              {pending.court > 0 && <span className="text-emerald-400"> (+{pending.court})</span>}
            </span>
            <div className="flex gap-1">
              <button onClick={() => addPending('court', 5)} className="px-2 py-0.5 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-200 active:scale-95">+5</button>
            </div>
          </div>
        )}

        {/* 확인/취소 버튼 — 변경사항이 있을 때만 표시 */}
        {hasPending && (
          <div className="flex gap-2 pt-1 border-t border-yellow-800/20">
            <button onClick={resetPending} className="flex-1 py-1.5 text-xs rounded bg-gray-800 text-gray-400 hover:bg-gray-700 active:scale-95">취소</button>
            <button onClick={applyPending} className="flex-1 py-1.5 text-xs rounded bg-emerald-700 text-white font-bold hover:bg-emerald-600 active:scale-95">확인 적용</button>
          </div>
        )}
      </div>
    </Section>
  )
}
