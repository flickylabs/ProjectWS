/**
 * 감정 안내 팝업 — 감정 아이콘 클릭 시 감정 상태별 설명 표시
 */
import { EMOTION_TIER_CONFIG, getEmotionTier } from '../../engine/discoveryEngine'
import Emoji from '../common/Emoji'
import type { EmotionTier } from '../../types'
import { useI18n, type LocaleCode } from '../../i18n'
import { localizeRuntimeText } from '../../i18n/runtimeText'

interface Props {
  partyName: string
  emotionValue: number
  onClose: () => void
}

const TIER_STYLES: Record<EmotionTier, { bg: string; border: string; text: string; icon: string }> = {
  calm: { bg: 'bg-blue-950/40', border: 'border-blue-700/40', text: 'text-blue-400', icon: '🛡️' },
  agitated: { bg: 'bg-yellow-950/40', border: 'border-yellow-700/40', text: 'text-yellow-400', icon: '😰' },
  explosive: { bg: 'bg-red-950/40', border: 'border-red-700/40', text: 'text-red-400', icon: '💢' },
  shutdown: { bg: 'bg-gray-800/40', border: 'border-gray-600/40', text: 'text-gray-400', icon: '🔒' },
}

const EMOTION_COPY: Record<LocaleCode, {
  title: (name: string) => string
  value: string
  tiers: Record<EmotionTier, string>
  current: string
  slipChance: string
  lieTransition: string
  close: string
}> = {
  ko: {
    title: (name) => `${name} 감정 상태`,
    value: '감정 수치',
    tiers: { calm: '침착', agitated: '동요', explosive: '격앙', shutdown: '체념' },
    current: '현재',
    slipChance: '실수 자백 확률',
    lieTransition: '거짓말 전이',
    close: '닫기',
  },
  en: {
    title: (name) => `${name}'s Emotional State`,
    value: 'Emotion Level',
    tiers: { calm: 'Calm', agitated: 'Shaken', explosive: 'Agitated', shutdown: 'Resigned' },
    current: 'Current',
    slipChance: 'Slip confession chance',
    lieTransition: 'Lie transition',
    close: 'Close',
  },
  ja: {
    title: (name) => `${name} 感情状態`,
    value: '感情値',
    tiers: { calm: '冷静', agitated: '動揺', explosive: '激昂', shutdown: '諦め' },
    current: '現在',
    slipChance: '失言による告白確率',
    lieTransition: '嘘の遷移',
    close: '閉じる',
  },
  'zh-CN': {
    title: (name) => `${name}的情绪状态`,
    value: '情绪数值',
    tiers: { calm: '冷静', agitated: '动摇', explosive: '激动', shutdown: '放弃' },
    current: '当前',
    slipChance: '失言承认概率',
    lieTransition: '谎言转移',
    close: '关闭',
  },
}

export default function EmotionGuidePopup({ partyName, emotionValue, onClose }: Props) {
  const { locale } = useI18n()
  const copy = EMOTION_COPY[locale]
  const currentTier = getEmotionTier(emotionValue)

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/80 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm animate-fade-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Emoji char={TIER_STYLES[currentTier.tier].icon} size={20} />
            <h2 className="text-sm font-bold text-gray-200">{copy.title(partyName)}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 active:scale-95">✕</button>
        </div>

        {/* 현재 수치 바 */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500">{copy.value}</span>
            <span className={`text-xs font-bold ${TIER_STYLES[currentTier.tier].text}`}>
              {Math.round(emotionValue)} / 100
            </span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            {/* 구간 표시 배경 */}
            <div className="relative w-full h-full">
              <div className="absolute inset-y-0 left-0 bg-blue-600/40" style={{ width: '30%' }} />
              <div className="absolute inset-y-0 left-[30%] bg-yellow-600/40" style={{ width: '30%' }} />
              <div className="absolute inset-y-0 left-[60%] bg-red-600/40" style={{ width: '25%' }} />
              <div className="absolute inset-y-0 left-[85%] bg-gray-600/40" style={{ width: '15%' }} />
              {/* 현재 위치 */}
              <div
                className="absolute top-0 h-full w-1 bg-white rounded-full shadow-lg shadow-white/50"
                style={{ left: `${Math.min(emotionValue, 100)}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-blue-500">{copy.tiers.calm}</span>
            <span className="text-[10px] text-yellow-500">{copy.tiers.agitated}</span>
            <span className="text-[10px] text-red-500">{copy.tiers.explosive}</span>
            <span className="text-[10px] text-gray-500">{copy.tiers.shutdown}</span>
          </div>
        </div>

        {/* 모든 구간 설명 */}
        <div className="px-4 py-3 space-y-2">
          {EMOTION_TIER_CONFIG.map((tier) => {
            const style = TIER_STYLES[tier.tier]
            const isCurrent = currentTier.tier === tier.tier
            return (
              <div
                key={tier.tier}
                className={`rounded-xl border p-3 transition-all ${style.border} ${
                  isCurrent ? `${style.bg} ring-1 ring-white/10` : 'bg-gray-800/20 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Emoji char={style.icon} size={16} />
                  <span className={`text-xs font-bold ${isCurrent ? style.text : 'text-gray-500'}`}>
                    {localizeRuntimeText(tier.label, locale)} ({tier.min}~{tier.max})
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] bg-white/10 text-white/70 px-1.5 py-0.5 rounded-full">{copy.current}</span>
                  )}
                </div>
                <p className={`text-xs leading-relaxed ${isCurrent ? 'text-gray-300' : 'text-gray-600'}`}>
                  {localizeRuntimeText(tier.description, locale)}
                </p>
                {tier.tier === 'explosive' && isCurrent && (
                  <div className="mt-2 text-[10px] text-red-400 bg-red-950/30 rounded-lg px-2 py-1">
                    {copy.slipChance}: {Math.round(tier.slipChance * 100)}% | {copy.lieTransition} {tier.lieTransitionMultiplier}x
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* 닫기 */}
        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-800 text-gray-300 text-sm font-medium active:scale-95 hover:bg-gray-700"
          >
            {copy.close}
          </button>
        </div>
      </div>
    </div>
  )
}
