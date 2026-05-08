/**
 * 증거 감별 모달 — 증거의 신뢰도를 플레이어가 직접 판단
 */
import { useState } from 'react'
import { useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'
import type { AppraisalVerdict, PartialTrustDetail } from '../../types/discovery'
import type { EvidenceNode } from '../../types'
import { useI18n, type LocaleCode } from '../../i18n'
import { localizeRuntimeText } from '../../i18n/runtimeText'

interface Props {
  evidenceId: string
  onClose: () => void
}

const VERDICT_OPTIONS: { value: AppraisalVerdict; label: Record<LocaleCode, string>; icon: string; color: string }[] = [
  { value: 'trustworthy', label: { ko: '신뢰할 수 있는 증거', en: 'Reliable Evidence', ja: '信頼できる証拠', 'zh-CN': '可信证据' }, icon: '✅', color: 'emerald' },
  { value: 'partial', label: { ko: '부분적으로만 신뢰', en: 'Partially Reliable', ja: '部分的にのみ信頼', 'zh-CN': '仅部分可信' }, icon: '⚠️', color: 'amber' },
  { value: 'suspicious', label: { ko: '의심스러운 증거', en: 'Suspicious Evidence', ja: '疑わしい証拠', 'zh-CN': '可疑证据' }, icon: '❌', color: 'red' },
]

const SUB_ACTION_LABELS: Record<string, Record<LocaleCode, string>> = {
  request_original: { ko: '원본 확인', en: 'Original Check', ja: '原本確認', 'zh-CN': '原件确认' },
  check_metadata: { ko: '메타데이터', en: 'Metadata', ja: 'メタデータ', 'zh-CN': '元数据' },
  restore_context: { ko: '맥락 복원', en: 'Context Recovery', ja: '文脈復元', 'zh-CN': '语境还原' },
  verify_source: { ko: '출처 확인', en: 'Source Verification', ja: '出典確認', 'zh-CN': '来源确认' },
  check_edits: { ko: '편집 검사', en: 'Edit Check', ja: '編集検査', 'zh-CN': '编辑检查' },
  question_acquisition: { ko: '취득 경위', en: 'Acquisition Context', ja: '取得経緯', 'zh-CN': '取得经过' },
}

const APPRAISAL_COPY: Record<LocaleCode, {
  title: string
  evidence: string
  investigationResults: (count: number) => string
  noResult: string
  prompt: string
  partialPrompt: string
  cancel: string
  confirm: string
}> = {
  ko: {
    title: '증거 감별',
    evidence: '증거',
    investigationResults: (count) => `조사 결과 (${count}건)`,
    noResult: '(결과 없음)',
    prompt: '이 증거를 어떻게 판단합니까?',
    partialPrompt: '어떤 조사 결과를 신뢰합니까?',
    cancel: '취소',
    confirm: '감별 확정',
  },
  en: {
    title: 'Evidence Appraisal',
    evidence: 'Evidence',
    investigationResults: (count) => `Investigation Results (${count})`,
    noResult: '(No result)',
    prompt: 'How do you judge this evidence?',
    partialPrompt: 'Which investigation results do you trust?',
    cancel: 'Cancel',
    confirm: 'Confirm Appraisal',
  },
  ja: {
    title: '証拠鑑別',
    evidence: '証拠',
    investigationResults: (count) => `調査結果 (${count}件)`,
    noResult: '(結果なし)',
    prompt: 'この証拠をどう判断しますか？',
    partialPrompt: 'どの調査結果を信頼しますか？',
    cancel: 'キャンセル',
    confirm: '鑑別を確定',
  },
  'zh-CN': {
    title: '证据鉴别',
    evidence: '证据',
    investigationResults: (count) => `调查结果 (${count}项)`,
    noResult: '(无结果)',
    prompt: '你如何判断这项证据？',
    partialPrompt: '你信任哪些调查结果？',
    cancel: '取消',
    confirm: '确认鉴别',
  },
}

function getEvidenceDisplay(evidence: EvidenceNode, state?: { deepInvestigated?: boolean }) {
  return {
    name: state?.deepInvestigated ? evidence.name : (evidence.surfaceName ?? evidence.name),
    description: state?.deepInvestigated ? evidence.description : (evidence.surfaceDescription ?? evidence.description),
  }
}

export default function EvidenceAppraisalModal({ evidenceId, onClose }: Props) {
  const { locale } = useI18n()
  const { caseData, evidenceStates, submitAppraisal, turnCount } = useStore((s) => s)
  const [verdict, setVerdict] = useState<AppraisalVerdict | null>(null)
  const [partialChecks, setPartialChecks] = useState<Record<string, boolean>>({})

  if (!caseData) return null

  const evidence = caseData.evidence.find((e) => e.id === evidenceId)
  const state = evidenceStates[evidenceId]
  if (!evidence || !state) return null
  const evidenceDisplay = getEvidenceDisplay(evidence, state)
  const copy = APPRAISAL_COPY[locale]

  // 조사 완료된 항목만 감별 대상
  const investigatedActions = state.investigatedActions

  const handlePartialToggle = (subAction: string) => {
    setPartialChecks((prev) => ({ ...prev, [subAction]: !prev[subAction] }))
  }

  const handleSubmit = () => {
    if (!verdict) return
    const partialDetails: PartialTrustDetail[] = verdict === 'partial'
      ? investigatedActions.map((sa) => ({ subAction: sa, trusted: !!partialChecks[sa] }))
      : []
    submitAppraisal(evidenceId, verdict, partialDetails, turnCount)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto animate-scale-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Emoji char="🔍" size={22} />
            <h2 className="text-base font-bold text-cyan-400">{copy.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-lg active:scale-95">✕</button>
        </div>

        {/* 증거 정보 */}
        <div className="px-5 pt-4 pb-2">
          <div className="text-xs text-gray-500 mb-1">{copy.evidence}</div>
          <div className="text-sm font-medium text-gray-200">{localizeRuntimeText(evidenceDisplay.name, locale)}</div>
          <div className="text-xs text-gray-500 mt-1">{localizeRuntimeText(evidenceDisplay.description, locale)}</div>
        </div>

        {/* 조사 결과 목록 */}
        <div className="px-5 py-3 space-y-2">
          <div className="text-xs text-gray-500 mb-1">{copy.investigationResults(investigatedActions.length)}</div>
          {investigatedActions.map((sa) => (
            <div key={sa} className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-2.5">
              <div className="text-xs font-medium text-gray-400 mb-1">
                {SUB_ACTION_LABELS[sa]?.[locale] ?? sa}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {localizeRuntimeText(evidence.investigationResults[sa] ?? copy.noResult, locale)}
              </p>
            </div>
          ))}
        </div>

        {/* 감별 선택 */}
        <div className="px-5 py-3 space-y-2">
          <div className="text-xs text-gray-500 mb-2">{copy.prompt}</div>
          {VERDICT_OPTIONS.map((opt) => {
            const isSelected = verdict === opt.value
            const borderColor = isSelected
              ? opt.color === 'emerald' ? 'border-emerald-600/60 ring-1 ring-emerald-500/30'
              : opt.color === 'amber' ? 'border-amber-600/60 ring-1 ring-amber-500/30'
              : 'border-red-600/60 ring-1 ring-red-500/30'
              : 'border-gray-700/40'
            const bgColor = isSelected
              ? opt.color === 'emerald' ? 'bg-emerald-950/40'
              : opt.color === 'amber' ? 'bg-amber-950/40'
              : 'bg-red-950/40'
              : 'bg-gray-800/40'

            return (
              <button
                key={opt.value}
                onClick={() => setVerdict(opt.value)}
                className={`w-full text-left rounded-xl border p-3 transition-all active:scale-[0.98] ${borderColor} ${bgColor} hover:bg-gray-800/60`}
              >
                <div className="flex items-center gap-2">
                  <Emoji char={opt.icon} size={16} />
                  <span className={`text-sm font-medium ${isSelected ? 'text-gray-200' : 'text-gray-400'}`}>
                    {opt.label[locale]}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* 부분 신뢰 — 세부 체크 */}
        {verdict === 'partial' && investigatedActions.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-800/40">
            <div className="text-xs text-amber-400 mb-2">{copy.partialPrompt}</div>
            <div className="space-y-1.5">
              {investigatedActions.map((sa) => (
                <label
                  key={sa}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!!partialChecks[sa]}
                    onChange={() => handlePartialToggle(sa)}
                    className="w-4 h-4 rounded border-gray-600 text-amber-500 focus:ring-amber-500/30 bg-gray-700"
                  />
                  <span className="text-xs text-gray-300">{SUB_ACTION_LABELS[sa]?.[locale] ?? sa}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="px-5 pb-5 pt-2 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-400 text-sm font-medium active:scale-95 hover:bg-gray-700"
          >
            {copy.cancel}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!verdict}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold active:scale-95 transition-all ${
              verdict
                ? 'bg-cyan-600 text-gray-950 hover:bg-cyan-500'
                : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
            }`}
          >
            {copy.confirm}
          </button>
        </div>
      </div>
    </div>
  )
}
