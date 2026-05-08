/**
 * 판결 준비 상태 배너
 * - 불충분 심리 경고 (16턴 초과 + verdictEligible 미달)
 * - 일반 readiness 힌트 (숫자 숨김, 텍스트만)
 */

import { useStore } from '../../store/useGameStore'
import { getReadinessHint } from '../../engine/meterStagingV2'
import Emoji from '../common/Emoji'
import { useI18n, type LocaleCode } from '../../i18n'
import { localizeRuntimeText } from '../../i18n/runtimeText'

const FORCED_COPY: Record<LocaleCode, { title: string; body: string }> = {
  ko: {
    title: '불충분 심리',
    body: '핵심 쟁점이 충분히 정리되지 않았습니다. 판결은 가능하지만 신뢰도 감점이 적용됩니다.',
  },
  en: {
    title: 'Insufficient Examination',
    body: 'The key disputes have not been organized enough. A verdict is possible, but a reliability penalty will apply.',
  },
  ja: {
    title: '審理不十分',
    body: '核心争点が十分に整理されていません。判決は可能ですが、信頼度の減点が適用されます。',
  },
  'zh-CN': {
    title: '审理不足',
    body: '核心争议点尚未充分整理。可以作出裁决，但会受到可信度扣分。',
  },
}

export default function ForcedVerdictBanner() {
  const { locale } = useI18n()
  const verdictMode = useStore((s) => s.verdictMode)
  const turnCount = useStore((s) => s.turnCount)
  const readinessState = useStore((s) => s.readinessState)

  // 강제 판결 경고 (최우선)
  if (verdictMode === 'forced_incomplete') {
    return (
      <div className="bg-red-950/40 border border-red-700/40 rounded-xl px-3 py-2 mx-3 mb-2 animate-fade-in">
        <div className="flex items-start gap-2">
          <span className="mt-0.5"><Emoji char="⚠️" size={16} /></span>
          <div>
            <p className="text-xs font-semibold text-red-400">{FORCED_COPY[locale].title}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {FORCED_COPY[locale].body}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // readiness 힌트 (일반 진행)
  if (!readinessState || turnCount < 3) return null

  const hint = getReadinessHint(turnCount, readinessState)

  const bgMap = {
    muted: 'bg-zinc-900/40 border-zinc-700/30',
    info: 'bg-blue-950/30 border-blue-700/30',
    ready: 'bg-emerald-950/30 border-emerald-600/30',
  }
  const textMap = {
    muted: 'text-zinc-400',
    info: 'text-blue-400',
    ready: 'text-emerald-400',
  }
  const iconMap = {
    muted: '📋',
    info: '🔍',
    ready: '✅',
  }

  return (
    <div className={`${bgMap[hint.highlight]} border rounded-xl px-3 py-2 mx-3 mb-2`}>
      <div className="flex items-start gap-2">
        <span className="mt-0.5"><Emoji char={iconMap[hint.highlight]} size={16} /></span>
        <div>
          <p className={`text-xs font-semibold ${textMap[hint.highlight]}`}>{localizeRuntimeText(hint.label, locale)}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{localizeRuntimeText(hint.detail, locale)}</p>
        </div>
      </div>
    </div>
  )
}
