/**
 * 감정 실수 모달 — 격앙 상태에서 NPC가 실수로 자백했을 때
 */
import { useStore } from '../../store/useGameStore'
import { useI18n, type LocaleCode } from '../../i18n'
import { localizeRuntimeText } from '../../i18n/runtimeText'

const SLIP_COPY: Record<LocaleCode, {
  title: string
  subtitle: (name: string) => string
  heated: string
  sourceDispute: string
  linkedDispute: string
  dismiss: string
  accept: string
}> = {
  ko: {
    title: '감정적 실수 포착',
    subtitle: (name) => `${name}가 흥분 상태에서 의미심장한 발언을 했습니다`,
    heated: '격앙 상태',
    sourceDispute: '관련 쟁점:',
    linkedDispute: '연결 쟁점:',
    dismiss: '넘어가기',
    accept: '진실 공방에 활용',
  },
  en: {
    title: 'Emotional Slip Detected',
    subtitle: (name) => `${name} made a revealing remark while agitated.`,
    heated: 'Agitated',
    sourceDispute: 'Related dispute:',
    linkedDispute: 'Linked dispute:',
    dismiss: 'Skip',
    accept: 'Use in Truth Contest',
  },
  ja: {
    title: '感情のほころびを確認',
    subtitle: (name) => `${name}が高ぶった状態で意味深な発言をしました。`,
    heated: '高ぶり状態',
    sourceDispute: '関連争点:',
    linkedDispute: '連結争点:',
    dismiss: '見送る',
    accept: '真実攻防で活用',
  },
  'zh-CN': {
    title: '捕捉到情绪失误',
    subtitle: (name) => `${name}在激动状态下说出了意味深长的话。`,
    heated: '激动状态',
    sourceDispute: '相关争议:',
    linkedDispute: '关联争议:',
    dismiss: '跳过',
    accept: '用于真相攻防',
  },
}

export default function EmotionalSlipModal() {
  const { locale } = useI18n()
  const { discovery, addEmotionalSlip, setPendingSlip, caseData } = useStore((s) => s)
  const slip = discovery.pendingSlip

  if (!slip || !caseData) return null

  const partyData = slip.party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const copy = SLIP_COPY[locale]
  const sourceDispute = caseData.disputes.find((d) => d.id === slip.sourceDisputeId)
  const linkedDispute = slip.linkedDisputeId
    ? caseData.disputes.find((d) => d.id === slip.linkedDisputeId)
    : null

  const handleAccept = () => {
    addEmotionalSlip(slip)
  }

  const handleDismiss = () => {
    setPendingSlip(null)
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4">
      <div
        className="bg-gray-900 border border-red-700/50 rounded-2xl w-full max-w-md animate-shake shadow-2xl shadow-red-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">💢</span>
            <h2 className="text-base font-bold text-red-400">{copy.title}</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {copy.subtitle(partyData.name)}
          </p>
        </div>

        {/* 실수 발언 */}
        <div className="px-5 py-4">
          <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className={`text-xs font-medium ${slip.party === 'a' ? 'text-blue-400' : 'text-rose-400'}`}>
                {partyData.name}
              </span>
              <span className="text-xs text-gray-600">— {copy.heated}</span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed italic">"{localizeRuntimeText(slip.slipText, locale)}"</p>
          </div>
        </div>

        {/* 연결 정보 */}
        <div className="px-5 pb-3 space-y-2">
          {sourceDispute && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-600">{copy.sourceDispute}</span>
              <span className="text-gray-300">{localizeRuntimeText(sourceDispute.name, locale)}</span>
            </div>
          )}
          {linkedDispute && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-amber-600">{copy.linkedDispute}</span>
              <span className="text-amber-300">{localizeRuntimeText(linkedDispute.name, locale)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 pt-2 flex gap-2">
          <button
            onClick={handleDismiss}
            className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-400 text-sm font-medium active:scale-95 hover:bg-gray-700"
          >
            {copy.dismiss}
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold active:scale-95 hover:bg-red-500 transition-all"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
