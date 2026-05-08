/**
 * 숨겨진 쟁점 발현 모달 — 새로운 쟁점이 드러났을 때
 */
import { useStore } from '../../store/useGameStore'
import { getSafeEmergenceTitle } from '../../data/safeEmergenceCopy'
import Emoji from '../common/Emoji'
import { useI18n, type LocaleCode } from '../../i18n'
import { localizeRuntimeText } from '../../i18n/runtimeText'

const ROUTE_LABELS: Record<string, { icon: string; label: Record<LocaleCode, string> }> = {
  evidence: { icon: '📄', label: { ko: '증거를 통해 발견', en: 'Found through evidence', ja: '証拠から発見', 'zh-CN': '通过证据发现' } },
  truth_confrontation: { icon: '⚖️', label: { ko: '진실 공방을 통해 발견', en: 'Found through truth confrontation', ja: '真実攻防から発見', 'zh-CN': '通过真相攻防发现' } },
  witness: { icon: '🗣️', label: { ko: '증인 증언을 통해 발견', en: 'Found through witness testimony', ja: '証人証言から発見', 'zh-CN': '通过证人证言发现' } },
  lie_collapse: { icon: '💥', label: { ko: '거짓말 붕괴를 통해 발견', en: 'Found through a lie collapse', ja: '嘘の崩壊から発見', 'zh-CN': '通过谎言瓦解发现' } },
  emotional_slip: { icon: '💢', label: { ko: '감정적 실수를 통해 발견', en: 'Found through an emotional slip', ja: '感情のほころびから発見', 'zh-CN': '通过情绪失误发现' } },
}

const EMERGENCE_COPY: Record<LocaleCode, {
  fallbackRoute: string
  title: string
  neitherKnows: string
  sharedMisconception: string
  confirm: string
}> = {
  ko: {
    fallbackRoute: '발견',
    title: '새로운 쟁점이 드러났습니다',
    neitherKnows: '양측 모두 이 사실을 알지 못했습니다. 이 발견은 사건의 전제를 근본적으로 바꿀 수 있습니다.',
    sharedMisconception: '양측 모두 이 사안에 대해 잘못 알고 있었습니다. 진실은 양쪽 주장과 다릅니다.',
    confirm: '확인 — 쟁점 목록에 추가됨',
  },
  en: {
    fallbackRoute: 'Found',
    title: 'A New Dispute Has Emerged',
    neitherKnows: 'Neither side knew this fact. This discovery may fundamentally change the premise of the case.',
    sharedMisconception: 'Both sides misunderstood this matter. The truth differs from both claims.',
    confirm: 'Confirm — Added to Disputes',
  },
  ja: {
    fallbackRoute: '発見',
    title: '新しい争点が明らかになりました',
    neitherKnows: '双方ともこの事実を知りませんでした。この発見は事件の前提を根本から変える可能性があります。',
    sharedMisconception: '双方ともこの件について誤解していました。真実は双方の主張と異なります。',
    confirm: '確認 — 争点リストに追加',
  },
  'zh-CN': {
    fallbackRoute: '发现',
    title: '新的争议点已经浮现',
    neitherKnows: '双方都不知道这一事实。这个发现可能从根本上改变案件前提。',
    sharedMisconception: '双方都误解了这件事。真相与双方主张都不同。',
    confirm: '确认 — 已加入争议列表',
  },
}

export default function DisputeEmergenceModal() {
  const { locale } = useI18n()
  const { discovery, acknowledgeEmergence, caseData } = useStore((s) => s)
  const event = discovery.pendingEmergence

  if (!event || !caseData) return null

  const dispute = caseData.disputes.find((d) => d.id === event.disputeId)
  const copy = EMERGENCE_COPY[locale]
  const routeInfo = ROUTE_LABELS[event.route] ?? { icon: '💡', label: { ko: copy.fallbackRoute, en: copy.fallbackRoute, ja: copy.fallbackRoute, 'zh-CN': copy.fallbackRoute } }
  const disputeTitle = localizeRuntimeText(getSafeEmergenceTitle(caseData.caseId, event.disputeId, dispute?.name ?? event.disputeId), locale)

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/90 flex items-center justify-center px-4">
      <div
        className="bg-gray-900 border border-amber-600/50 rounded-2xl w-full max-w-md animate-scale-in shadow-2xl shadow-amber-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — 극적 연출 */}
        <div className="px-5 pt-6 pb-3 text-center">
          <div className="mb-2 animate-shake"><Emoji char="💡" size={32} /></div>
          <h2 className="text-lg font-bold text-amber-400">{copy.title}</h2>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <Emoji char={routeInfo.icon} size={14} />
            <span className="text-xs text-gray-500">{routeInfo.label[locale]}</span>
          </div>
        </div>

        {/* 쟁점 내용 */}
        <div className="px-5 py-4">
          <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-4">
            <div className="text-sm font-bold text-amber-300 mb-2">{disputeTitle}</div>
            <p className="text-sm text-gray-300 leading-relaxed">{localizeRuntimeText(event.description, locale)}</p>
          </div>
        </div>

        {/* quadrant 설명 */}
        {dispute && (dispute.quadrant === 'neither_knows' || dispute.quadrant === 'shared_misconception') && (
          <div className="px-5 pb-3">
            <div className={`rounded-lg p-3 ${
              dispute.quadrant === 'neither_knows'
                ? 'bg-purple-950/30 border border-purple-800/30'
                : 'bg-orange-950/30 border border-orange-800/30'
            }`}>
              <p className="text-xs text-gray-400 leading-relaxed">
                {dispute.quadrant === 'neither_knows'
                  ? copy.neitherKnows
                  : copy.sharedMisconception}
              </p>
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="px-5 pb-5 pt-2">
          <button
            onClick={() => acknowledgeEmergence(event.disputeId)}
            className="w-full py-3 rounded-xl bg-amber-600 text-gray-950 text-sm font-bold active:scale-95 hover:bg-amber-500 transition-all"
          >
            {copy.confirm}
          </button>
        </div>
      </div>
    </div>
  )
}
