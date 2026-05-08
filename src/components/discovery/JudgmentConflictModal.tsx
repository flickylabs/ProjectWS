/**
 * 판단 충돌 모달 — 기존 판단과 새 정보가 충돌할 때 수정 여부 결정
 */
import { useStore } from '../../store/useGameStore'
import type { TruthJudgment } from '../../types/discovery'
import { useI18n, type LocaleCode } from '../../i18n'
import { localizeRuntimeText } from '../../i18n/runtimeText'

const JUDGMENT_LABELS: Record<LocaleCode, Record<TruthJudgment, (nameA: string, nameB: string) => string>> = {
  ko: {
    believe_a: (nameA) => `${nameA}의 주장이 진실`,
    believe_b: (_nameA, nameB) => `${nameB}의 주장이 진실`,
    both_partial: () => '양쪽 다 일부만 사실',
    undetermined: () => '판단 보류',
  },
  en: {
    believe_a: (nameA) => `${nameA}'s claim is true`,
    believe_b: (_nameA, nameB) => `${nameB}'s claim is true`,
    both_partial: () => 'Both sides are only partly true',
    undetermined: () => 'Judgment deferred',
  },
  ja: {
    believe_a: (nameA) => `${nameA}側の主張が真実`,
    believe_b: (_nameA, nameB) => `${nameB}側の主張が真実`,
    both_partial: () => '双方とも一部のみ事実',
    undetermined: () => '判断保留',
  },
  'zh-CN': {
    believe_a: (nameA) => `${nameA}一方的主张属实`,
    believe_b: (_nameA, nameB) => `${nameB}一方的主张属实`,
    both_partial: () => '双方都只有部分属实',
    undetermined: () => '暂缓判断',
  },
}

const SOURCE_LABELS: Record<string, Record<LocaleCode, string>> = {
  evidence: { ko: '새로운 증거', en: 'New evidence', ja: '新しい証拠', 'zh-CN': '新证据' },
  testimony: { ko: '증인 증언', en: 'Witness testimony', ja: '証人証言', 'zh-CN': '证人证言' },
  lie_collapse: { ko: '거짓말 붕괴', en: 'Lie collapse', ja: '嘘の崩壊', 'zh-CN': '谎言瓦解' },
  emotional_slip: { ko: '감정적 실수', en: 'Emotional slip', ja: '感情のほころび', 'zh-CN': '情绪失误' },
}

const CONFLICT_COPY: Record<LocaleCode, {
  title: string
  previous: string
  body: string
  keep: string
  revise: string
}> = {
  ko: {
    title: '기존 판단과 충돌',
    previous: '기존 판단',
    body: '새로운 정보가 기존 판단과 다른 방향을 가리킵니다. 판단을 수정하시겠습니까?',
    keep: '현재 판단 유지',
    revise: '판단 수정',
  },
  en: {
    title: 'Conflicts With Previous Judgment',
    previous: 'Previous Judgment',
    body: 'The new information points in a different direction from your previous judgment. Revise it?',
    keep: 'Keep Current Judgment',
    revise: 'Revise Judgment',
  },
  ja: {
    title: '既存判断と衝突',
    previous: '既存判断',
    body: '新しい情報が既存判断とは異なる方向を示しています。判断を修正しますか？',
    keep: '現在の判断を維持',
    revise: '判断を修正',
  },
  'zh-CN': {
    title: '与既有判断冲突',
    previous: '既有判断',
    body: '新的信息指向与既有判断不同的方向。要修正判断吗？',
    keep: '维持当前判断',
    revise: '修正判断',
  },
}

export default function JudgmentConflictModal() {
  const { locale } = useI18n()
  const { discovery, setPendingConflict, reviseJudgment, turnCount, caseData } = useStore((s) => s)
  const event = discovery.pendingConflict

  if (!event || !caseData) return null

  const dispute = caseData.disputes.find((d) => d.id === event.disputeId)
  const partyAName = caseData.duo.partyA.name
  const partyBName = caseData.duo.partyB.name
  const copy = CONFLICT_COPY[locale]

  const currentLabel = JUDGMENT_LABELS[locale][event.currentJudgment](partyAName, partyBName)

  const handleKeep = () => setPendingConflict(null)

  const handleRevise = () => {
    // 기존 판단의 반대로 수정 (간단한 기본 로직)
    let newJudgment: TruthJudgment = 'both_partial'
    if (event.currentJudgment === 'believe_a') newJudgment = 'believe_b'
    else if (event.currentJudgment === 'believe_b') newJudgment = 'believe_a'
    reviseJudgment(event.disputeId, newJudgment, turnCount)
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4" onClick={handleKeep}>
      <div
        className="bg-gray-900 border border-amber-700/50 rounded-2xl w-full max-w-md animate-scale-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-5 pt-5 pb-3 border-b border-gray-800">
          <span className="text-xl">⚠️</span>
          <h2 className="text-base font-bold text-amber-400">{copy.title}</h2>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-4">
          {/* 기존 판단 */}
          <div className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-3">
            <div className="text-xs text-gray-500 mb-1">{localizeRuntimeText(dispute?.name, locale)} — {copy.previous}</div>
            <div className="text-sm font-medium text-gray-300">{currentLabel}</div>
          </div>

          {/* 충돌 정보 */}
          <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-3">
            <div className="text-xs text-amber-500 mb-1">{SOURCE_LABELS[event.source]?.[locale] ?? event.source}</div>
            <p className="text-sm text-gray-300 leading-relaxed">{localizeRuntimeText(event.conflictingInfo, locale)}</p>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            {copy.body}
          </p>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-2">
          <button
            onClick={handleKeep}
            className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-400 text-sm font-medium active:scale-95 hover:bg-gray-700"
          >
            {copy.keep}
          </button>
          <button
            onClick={handleRevise}
            className="flex-1 py-2.5 rounded-xl bg-amber-600 text-gray-950 text-sm font-bold active:scale-95 hover:bg-amber-500"
          >
            {copy.revise}
          </button>
        </div>
      </div>
    </div>
  )
}
